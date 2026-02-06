'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function JoseonHeader() {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-amber-50/95 backdrop-blur-sm border-b-2 border-amber-900/20"
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/joseon-face" className="flex items-center gap-3 group">
                    <div
                        className="w-12 h-12 bg-gradient-to-br from-amber-700 to-red-800 rounded-full flex items-center justify-center group-hover:scale-105 transition-all"
                        style={{ boxShadow: '0 2px 8px rgba(120, 53, 15, 0.3)' }}
                    >
                        <span className="text-2xl">📜</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-amber-900" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            조선관상
                        </h1>
                        <p className="text-xs text-amber-800/60">전생 직업 분석</p>
                    </div>
                </Link>

                {/* Home Button */}
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-900 text-amber-50 rounded-full font-semibold hover:scale-105 transition-all duration-200"
                    style={{ boxShadow: '0 3px 10px rgba(120, 53, 15, 0.3)' }}
                >
                    <HomeIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">메인으로</span>
                </Link>
            </div>
        </motion.header>
    );
}
