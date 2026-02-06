'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FaceUploadZone from '@/components/joseon/FaceUploadZone';
import JoseonResultCard from '@/components/joseon/JoseonResultCard';
import { extractFaceFeatures, matchJoseonJob, loadFaceDetectionModels } from '@/utils/joseon/faceAnalyzer';
import { JoseonAnalysisResult } from '@/utils/joseon/jobData';

// face-api.js는 브라우저 환경에서만 작동하므로 동적 렌더링 강제
export const dynamic = 'force-dynamic';

type PageState = 'landing' | 'upload' | 'analyzing' | 'result';

export default function JoseonFacePage() {
    const [state, setState] = useState<PageState>('landing');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [result, setResult] = useState<JoseonAnalysisResult | null>(null);
    const [error, setError] = useState<string>('');

    const handleStart = () => {
        setState('upload');
    };

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setError('');
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setState('analyzing');
        setError('');

        try {
            // 모델 로딩
            await loadFaceDetectionModels();

            // 얼굴 특징 추출
            const features = await extractFaceFeatures(selectedFile);

            // 직업 매칭
            const analysisResult = matchJoseonJob(features);

            // 결과 표시 전 약간의 지연 (극적 효과)
            await new Promise(resolve => setTimeout(resolve, 2000));

            setResult(analysisResult);
            setState('result');
        } catch (err: any) {
            console.error('Analysis error:', err);
            setError(err.message || '분석 중 오류가 발생했습니다.');
            setState('upload');
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setResult(null);
        setError('');
        setState('landing');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #78350f 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #78350f 0px, transparent 1px, transparent 40px)',
                }}
            />

            <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {/* Landing State */}
                    {state === 'landing' && (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-4xl w-full text-center"
                        >
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-12"
                            >
                                <div className="text-8xl md:text-9xl mb-8">📜</div>
                                <h1 className="text-5xl md:text-7xl font-black text-amber-950 mb-6" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                    조선관상
                                </h1>
                                <p className="text-2xl md:text-3xl text-amber-900 mb-8 leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                    그대의 관상을 보아하니...<br />
                                    범상치 않구나!
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-amber-100/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-4 border-amber-800 mb-8"
                                style={{ boxShadow: '0 12px 30px rgba(120, 53, 15, 0.2)' }}
                            >
                                <p className="text-xl md:text-2xl text-amber-950 leading-relaxed mb-6" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                    어디 한 번 그대의 <span className="font-black text-red-800">전생</span>을<br />
                                    들여다보았느냐?
                                </p>
                                <p className="text-base text-amber-800/80" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                    얼굴 한 번 보면 전생 직업이 보이는 천기누설!
                                </p>
                            </motion.div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleStart}
                                className="px-12 py-6 bg-gradient-to-r from-amber-800 to-red-900 text-amber-50 rounded-full text-2xl font-black hover:shadow-2xl transition-all duration-300"
                                style={{ boxShadow: '0 8px 24px rgba(120, 53, 15, 0.4)', fontFamily: "'Noto Serif KR', serif" }}
                            >
                                관상 보러 가기 🔮
                            </motion.button>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-12 flex flex-wrap justify-center gap-4 text-amber-800/70 text-sm"
                                style={{ fontFamily: "'Noto Serif KR', serif" }}
                            >
                                <span>✨ 12가지 직업</span>
                                <span>•</span>
                                <span>🎭 해학적 결과</span>
                                <span>•</span>
                                <span>📸 결과 공유</span>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Upload State */}
                    {state === 'upload' && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-3xl w-full"
                        >
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-center mb-8"
                            >
                                <h2 className="text-4xl md:text-5xl font-black text-amber-950 mb-4" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                    그대의 얼굴을 보자
                                </h2>
                                <p className="text-lg text-amber-800" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                    정면 얼굴이 잘 보이는 사진을 올려주시옵소서
                                </p>
                            </motion.div>

                            <FaceUploadZone
                                onFileSelect={handleFileSelect}
                                selectedFile={selectedFile}
                            />

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 p-4 bg-red-100 border-2 border-red-700 rounded-xl text-red-900 text-center"
                                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <button
                                    onClick={handleAnalyze}
                                    disabled={!selectedFile}
                                    className="px-8 py-4 bg-gradient-to-r from-amber-800 to-red-900 text-amber-50 rounded-full text-xl font-black hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    style={{ boxShadow: '0 4px 16px rgba(120, 53, 15, 0.4)', fontFamily: "'Noto Serif KR', serif" }}
                                >
                                    전생 보러 가기 🔮
                                </button>

                                <button
                                    onClick={() => setState('landing')}
                                    className="px-6 py-4 text-amber-900 hover:text-amber-700 font-bold rounded-full transition-colors underline underline-offset-4"
                                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                                >
                                    돌아가기
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Analyzing State */}
                    {state === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-2xl w-full text-center"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                                className="text-9xl mb-8"
                            >
                                🔮
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-4xl md:text-5xl font-black text-amber-950 mb-6"
                                style={{ fontFamily: "'Noto Serif KR', serif" }}
                            >
                                천기누설 중...
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                                className="text-xl text-amber-800 space-y-3"
                                style={{ fontFamily: "'Noto Serif KR', serif" }}
                            >
                                <p>명부를 뒤지는 중...</p>
                                <p>그대의 전생을 찾고 있나이다...</p>
                                <p>조금만 기다려 주시옵소서...</p>
                            </motion.div>

                            {/* Decorative loading animation */}
                            <motion.div className="mt-12 flex justify-center gap-2">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -20, 0],
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                        className="w-4 h-4 bg-amber-800 rounded-full"
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Result State */}
                    {state === 'result' && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full"
                        >
                            <JoseonResultCard result={result} onReset={handleReset} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
