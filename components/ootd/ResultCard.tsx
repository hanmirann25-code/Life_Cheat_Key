'use client';

import { motion } from 'framer-motion';
import { MoodAnalysisResult } from '@/utils/ootd/moodAnalyzer';
import MoodChart from './MoodChart';
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface ResultCardProps {
    result: MoodAnalysisResult;
    onReset: () => void;
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
    const resultRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!resultRef.current) return;

        try {
            const canvas = await html2canvas(resultRef.current, {
                backgroundColor: '#FAF8F3',
                scale: 2,
            });

            const link = document.createElement('a');
            link.download = `ootd-mood-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const handleDownloadAndShare = async () => {
        if (!resultRef.current) return;

        try {
            const canvas = await html2canvas(resultRef.current, {
                backgroundColor: '#FAF8F3',
                scale: 2,
            });

            // Convert canvas to blob
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                }, 'image/png');
            });

            if (!blob) throw new Error('Failed to create blob');

            // Create File object
            const file = new File([blob], `ootd-mood-${Date.now()}.png`, { type: 'image/png' });

            // Check if Web Share API Level 2 is supported (file sharing)
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'My OOTD Mood Analysis',
                    text: `나의 오늘 무드: ${result.moodLabel} 🎨`,
                });
            } else {
                // Fallback: download only
                const link = document.createElement('a');
                link.download = `ootd-mood-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();

                // Show info message on desktop
                if (!navigator.share) {
                    setTimeout(() => {
                        alert('이미지가 다운로드되었습니다!\n\n💡 모바일에서는 이미지를 바로 공유할 수 있습니다.');
                    }, 300);
                }
            }
        } catch (error: any) {
            // User cancelled or error occurred
            if (error.name !== 'AbortError') {
                console.error('Download/Share failed:', error);
                alert('이미지 생성에 실패했습니다.');
            }
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My OOTD Mood Analysis',
                    text: `나의 오늘 무드: ${result.moodLabel} 🎨`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy link
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Result card for download */}
            <div
                ref={resultRef}
                className="bg-gradient-to-br from-luxury-cream via-white to-luxury-cream/50 rounded-3xl p-8 md:p-12 border-4 border-luxury-navy mb-8"
                style={{ boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}
            >
                {/* Primary mood label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <div className="inline-block bg-luxury-gold px-6 py-2 rounded-full mb-4" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                        <span className="text-luxury-navy font-bold text-sm tracking-wider">
                            YOUR MOOD
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {result.moodLabel}
                    </h2>
                    <p className="text-lg text-luxury-navy/70 max-w-xl mx-auto">
                        {result.description}
                    </p>
                </motion.div>

                {/* Mood chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="w-full h-96 mb-6"
                >
                    <MoodChart scores={result.scores} />
                </motion.div>

                {/* Mood breakdown */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center text-sm text-luxury-navy/50"
                >
                    <p>인생 치트키 - OOTD Mood Analyzer</p>
                </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col gap-4 justify-center items-center"
            >
                {/* Primary button: Download & Share */}
                <button
                    onClick={handleDownloadAndShare}
                    className="group flex items-center gap-3 bg-gradient-to-r from-luxury-rose to-luxury-gold text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-200 shadow-lg"
                    style={{ boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)' }}
                >
                    <ArrowDownTrayIcon className="w-7 h-7" />
                    이미지 다운로드 & 공유
                    <ShareIcon className="w-7 h-7" />
                </button>

                {/* Secondary options */}
                <div className="flex flex-wrap gap-3 justify-center items-center">
                    <button
                        onClick={handleDownload}
                        className="group flex items-center gap-2 text-luxury-navy/70 hover:text-luxury-navy px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        다운로드만
                    </button>

                    <span className="text-luxury-navy/30">|</span>

                    <button
                        onClick={handleShare}
                        className="group flex items-center gap-2 text-luxury-navy/70 hover:text-luxury-navy px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
                    >
                        <ShareIcon className="w-4 h-4" />
                        링크 공유
                    </button>

                    <span className="text-luxury-navy/30">|</span>

                    <button
                        onClick={onReset}
                        className="text-luxury-navy/70 hover:text-luxury-navy font-semibold px-4 py-2 rounded-full transition-colors duration-200"
                    >
                        다시 분석하기
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
