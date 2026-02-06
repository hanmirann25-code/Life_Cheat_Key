'use client';

import Link from 'next/link';
import { SparklesIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function OOTDFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 bg-gradient-to-br from-luxury-navy via-luxury-navy to-luxury-rose/20 text-white">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-luxury-gold rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-luxury-rose rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4 py-12">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-full flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                                OOTD Mood Analyzer
                            </h3>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                            사진 한 장으로 분석하는<br />
                            당신만의 패션 무드와 감성
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4 text-luxury-gold">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/ootd-analyzer" className="text-white/70 hover:text-white transition-colors">
                                    무드 분석하기
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                                    인생 치트키 홈
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                                    서비스 소개
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                                    개인정보 처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Share Section */}
                    <div>
                        <h4 className="font-bold mb-4 text-luxury-rose">Share the Love</h4>
                        <p className="text-white/70 text-sm mb-4">
                            친구들에게 공유하고<br />
                            함께 무드를 찾아보세요!
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: 'OOTD Mood Analyzer',
                                            text: '당신의 패션 무드를 찾아보세요!',
                                            url: window.location.origin + '/ootd-analyzer',
                                        });
                                    }
                                }}
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Share"
                            >
                                <ShareIcon className="w-5 h-5" />
                            </button>
                            <Link
                                href="/"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Favorite"
                            >
                                <HeartIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mb-6" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
                    <p>
                        © {currentYear} <span className="text-luxury-gold">인생 치트키</span> - OOTD Mood Analyzer. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1">
                        Made with <HeartIcon className="w-4 h-4 text-luxury-rose" /> for fashion lovers
                    </p>
                </div>
            </div>
        </footer>
    );
}
