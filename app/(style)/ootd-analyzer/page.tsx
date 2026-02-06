'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadZone from '@/components/ootd/UploadZone';
import ResultCard from '@/components/ootd/ResultCard';
import { analyzeMood, MoodAnalysisResult } from '@/utils/ootd/moodAnalyzer';
import { SparklesIcon } from '@heroicons/react/24/solid';

type AnalysisState = 'landing' | 'upload' | 'analyzing' | 'result';

export default function OOTDAnalyzerPage() {
    const [state, setState] = useState<AnalysisState>('landing');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [result, setResult] = useState<MoodAnalysisResult | null>(null);

    const handleStart = () => {
        setState('upload');
    };

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setState('analyzing');

        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 2500));

        try {
            const analysisResult = await analyzeMood(selectedFile);
            setResult(analysisResult);
            setState('result');
        } catch (error) {
            console.error('Analysis failed:', error);
            setState('upload');
            alert('분석에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setResult(null);
        setState('landing');
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="fixed inset-0 -z-10">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-luxury-cream via-luxury-rose/20 to-luxury-gold/30"
                    animate={{
                        background: [
                            'linear-gradient(to bottom right, #FAF8F3, rgba(183, 110, 121, 0.2), rgba(212, 175, 55, 0.3))',
                            'linear-gradient(to bottom right, #FAF8F3, rgba(212, 175, 55, 0.3), rgba(183, 110, 121, 0.2))',
                            'linear-gradient(to bottom right, #FAF8F3, rgba(183, 110, 121, 0.2), rgba(212, 175, 55, 0.3))',
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
                <AnimatePresence mode="wait">
                    {/* Landing State */}
                    {state === 'landing' && (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="inline-block mb-8"
                            >
                                <div className="w-32 h-32 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-full flex items-center justify-center" style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' }}>
                                    <SparklesIcon className="w-16 h-16 text-white" />
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl font-bold text-luxury-navy mb-6"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                OOTD Mood Analyzer
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl md:text-2xl text-luxury-navy/70 mb-4 leading-relaxed"
                            >
                                사진 한 장으로 분석하는
                                <br />
                                <span className="font-bold text-luxury-rose">나의 OOTD 무드</span>
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-base text-luxury-navy/50 mb-12 max-w-2xl mx-auto"
                            >
                                오늘의 코디에 담긴 당신만의 스타일을 8가지 무드로 분석해드립니다.
                                <br />
                                AI가 읽어내는 당신의 패션 감성을 확인해보세요.
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: 'spring' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleStart}
                                className="group bg-luxury-navy text-white px-12 py-5 rounded-full text-xl font-bold transition-all duration-200"
                                style={{ boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)' }}
                            >
                                <span className="flex items-center gap-3">
                                    분석 시작하기
                                    <SparklesIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                </span>
                            </motion.button>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-16 text-sm text-luxury-navy/40"
                            >
                                <p>✨ 무료 분석 • 💾 결과 다운로드 가능 • 📱 인스타 공유 OK</p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Upload State */}
                    {state === 'upload' && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-3">
                                    OOTD 사진 업로드
                                </h2>
                                <p className="text-luxury-navy/60">
                                    전신 코디 사진을 올려주시면 더 정확한 분석이 가능합니다
                                </p>
                            </div>

                            <UploadZone
                                onFileSelect={handleFileSelect}
                                selectedFile={selectedFile}
                            />

                            <div className="flex gap-4 justify-center mt-8">
                                <button
                                    onClick={handleReset}
                                    className="px-8 py-3 rounded-full border-2 border-luxury-navy/30 text-luxury-navy font-semibold hover:border-luxury-navy hover:bg-luxury-navy/5 transition-all duration-200"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={!selectedFile}
                                    className="px-12 py-3 rounded-full bg-luxury-rose text-white font-bold hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    style={{ boxShadow: selectedFile ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none' }}
                                >
                                    분석 시작
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Analyzing State */}
                    {state === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-[500px]"
                        >
                            <motion.div
                                className="relative w-64 h-64 mb-8"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            >
                                <div className="absolute inset-0 border-8 border-luxury-gold/30 rounded-full" />
                                <motion.div
                                    className="absolute inset-4 border-8 border-luxury-rose rounded-full"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <SparklesIcon className="w-24 h-24 text-luxury-navy" />
                                </div>
                            </motion.div>

                            <motion.h3
                                className="text-2xl font-bold text-luxury-navy mb-3"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                스타일 분석 중...
                            </motion.h3>

                            <motion.div
                                className="flex gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {['AI가 색상을 추출하고 있어요', '무드를 매칭하는 중이에요', '위트 있는 라벨을 찾고 있어요'].map((text, idx) => (
                                    <motion.p
                                        key={idx}
                                        className="text-luxury-navy/60 text-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{
                                            duration: 2,
                                            delay: idx * 0.7,
                                            repeat: Infinity,
                                            repeatDelay: 0.5,
                                        }}
                                    >
                                        {idx === Math.floor(Date.now() / 800) % 3 ? text : ''}
                                    </motion.p>
                                ))}
                            </motion.div>

                            {/* Laser scan animation */}
                            <motion.div
                                className="mt-12 w-full max-w-md h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                        </motion.div>
                    )}

                    {/* Result State */}
                    {state === 'result' && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ResultCard result={result} onReset={handleReset} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
