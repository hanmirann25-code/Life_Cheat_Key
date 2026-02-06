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

    const handleInstagramShare = async () => {
        // Instagram doesn't have direct API, so we download and guide user
        await handleDownload();
        alert('✅ 이미지가 다운로드되었습니다!\n📸 인스타그램 앱을 열고 스토리에 업로드해주세요.');
    };

    const handleKakaoShare = () => {
        // Check if Kakao SDK is loaded
        if (typeof window !== 'undefined' && (window as any).Kakao) {
            const kakao = (window as any).Kakao;

            if (!kakao.isInitialized()) {
                // Initialize with your Kakao JavaScript key
                if (process.env.NEXT_PUBLIC_KAKAO_KEY) {
                    kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
                } else {
                    console.log('Kakao SDK not initialized');
                }
            }

            try {
                kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: 'OOTD Mood Analyzer',
                        description: `나의 패션 무드: ${result.moodLabel}`,
                        imageUrl: window.location.origin + '/og-ootd-analyzer.png',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                    buttons: [
                        {
                            title: '나도 분석하기',
                            link: {
                                mobileWebUrl: window.location.origin + '/ootd-analyzer',
                                webUrl: window.location.origin + '/ootd-analyzer',
                            },
                        },
                    ],
                });
            } catch (error) {
                console.error('Kakao share failed:', error);
                // Fallback
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!\n카카오톡에서 친구에게 공유해보세요.');
            }
        } else {
            // Fallback if Kakao SDK not loaded
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!\n카카오톡에서 친구에게 공유해보세요.');
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
                className="space-y-6"
            >
                {/* Primary actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleDownload}
                        className="group flex items-center gap-2 bg-luxury-rose text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-200"
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                    >
                        <ArrowDownTrayIcon className="w-6 h-6" />
                        결과 다운로드
                    </button>

                    <button
                        onClick={handleShare}
                        className="group flex items-center gap-2 bg-luxury-gold text-luxury-navy px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-200"
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                    >
                        <ShareIcon className="w-6 h-6" />
                        공유하기
                    </button>
                </div>

                {/* Social sharing */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={handleInstagramShare}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:scale-105 transition-all duration-200"
                        style={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        인스타 스토리
                    </button>

                    <button
                        onClick={handleKakaoShare}
                        className="flex items-center gap-2 px-6 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-full font-semibold hover:scale-105 transition-all duration-200"
                        style={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.211.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z" />
                        </svg>
                        카카오톡
                    </button>
                </div>

                {/* Reset button */}
                <div className="text-center">
                    <button
                        onClick={onReset}
                        className="text-luxury-navy/60 hover:text-luxury-navy font-semibold px-6 py-4 rounded-full transition-colors duration-200 underline underline-offset-4"
                    >
                        다시 분석하기
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
