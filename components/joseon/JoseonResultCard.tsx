'use client';

import { motion } from 'framer-motion';
import { JoseonAnalysisResult } from '@/utils/joseon/jobData';
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface JoseonResultCardProps {
    result: JoseonAnalysisResult;
    onReset: () => void;
}

export default function JoseonResultCard({ result, onReset }: JoseonResultCardProps) {
    const resultRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!resultRef.current) return;

        try {
            const canvas = await html2canvas(resultRef.current, {
                backgroundColor: '#FFF7ED',
                scale: 2,
            });

            const link = document.createElement('a');
            link.download = `joseon-face-${Date.now()}.png`;
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
                    title: '조선관상 - 전생 직업 분석',
                    text: `나의 전생은 ${result.job.title}! ${result.wittyMessage}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
        }
    };

    const { job } = result;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Result card - 방(榜) 형태 */}
            <div
                ref={resultRef}
                className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-8 md:p-12 border-8 border-amber-900 mb-8 relative overflow-hidden"
                style={{
                    boxShadow: '0 12px 30px rgba(120, 53, 15, 0.25), inset 0 2px 10px rgba(255, 255, 255, 0.5)',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="%23fef3c7" fill-opacity=".03"/%3E%3C/svg%3E")'
                }}
            >
                {/* 도장 장식 */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-red-700 rounded-full opacity-80 flex items-center justify-center text-xs text-white font-bold rotate-12">
                    <span style={{ fontFamily: "'Noto Serif KR', serif" }}>印</span>
                </div>

                {/* 전생 직업 타이틀 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <div
                        className="inline-block bg-amber-800 text-amber-50 px-8 py-3 rounded-full mb-6"
                        style={{ boxShadow: '0 4px 12px rgba(120, 53, 15, 0.4)', fontFamily: "'Noto Serif KR', serif" }}
                    >
                        <span className="font-bold text-sm tracking-widest">
                            전생 직업
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black text-amber-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                        {job.title}
                    </h2>

                    <div className="max-w-2xl mx-auto space-y-6">
                        {/* 메인 설명 */}
                        <p className="text-xl md:text-2xl leading-relaxed text-amber-950" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            {job.description}
                        </p>

                        {/* 상세 관상 특징 */}
                        <div className="bg-amber-100/50 rounded-2xl p-6 border-2 border-amber-700/30">
                            <h3 className="text-lg font-bold text-amber-900 mb-4" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                📜 그대의 관상을 풀이하건대...
                            </h3>
                            <div className="space-y-3 text-left">
                                {job.characteristics.map((char, idx) => (
                                    <motion.p
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.1 }}
                                        className="text-amber-900 leading-relaxed pl-4 border-l-4 border-amber-600"
                                        style={{ fontFamily: "'Noto Serif KR', serif" }}
                                    >
                                        {char}
                                    </motion.p>
                                ))}
                            </div>
                        </div>

                        {/* 성격 특성 */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {job.personality.map((trait, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + idx * 0.05 }}
                                    className="px-5 py-2 bg-gradient-to-r from-red-700 to-amber-700 text-white rounded-full font-semibold text-sm"
                                    style={{ boxShadow: '0 2px 8px rgba(120, 53, 15, 0.3)', fontFamily: "'Noto Serif KR', serif" }}
                                >
                                    {trait}
                                </motion.span>
                            ))}
                        </div>

                        {/* 운세/조언 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="bg-gradient-to-r from-amber-800 to-red-900 text-amber-50 rounded-2xl p-6 mt-6"
                            style={{ boxShadow: '0 4px 16px rgba(120, 53, 15, 0.4)' }}
                        >
                            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                🔮 천기의 일언
                            </h3>
                            <p className="text-base leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                                {job.fortune}
                            </p>
                        </motion.div>

                        {/* 시대 배경 */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="text-sm text-amber-700/70 italic"
                            style={{ fontFamily: "'Noto Serif KR', serif" }}
                        >
                            {job.era}
                        </motion.p>
                    </div>

                    {/* 워터마크 */}
                    <div className="mt-8 text-center text-sm text-amber-800/50">
                        <p style={{ fontFamily: "'Noto Serif KR', serif" }}>인생 치트키 - 조선관상</p>
                    </div>
                </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <button
                    onClick={handleDownload}
                    className="group flex items-center gap-2 bg-red-800 text-amber-50 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-200"
                    style={{ boxShadow: '0 4px 12px rgba(153, 27, 27, 0.4)', fontFamily: "'Noto Serif KR', serif" }}
                >
                    <ArrowDownTrayIcon className="w-6 h-6" />
                    결과 다운로드
                </button>

                <button
                    onClick={handleShare}
                    className="group flex items-center gap-2 bg-amber-700 text-amber-50 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-200"
                    style={{ boxShadow: '0 4px 12px rgba(180, 83, 9, 0.4)', fontFamily: "'Noto Serif KR', serif" }}
                >
                    <ShareIcon className="w-6 h-6" />
                    공유하기
                </button>

                <button
                    onClick={onReset}
                    className="text-amber-900 hover:text-amber-700 font-bold px-6 py-4 rounded-full transition-colors duration-200 underline underline-offset-4"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                    다시 분석하기
                </button>
            </motion.div>
        </motion.div>
    );
}
