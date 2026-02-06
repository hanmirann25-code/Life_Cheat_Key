'use client';

import Link from 'next/link';
import { SparklesIcon, HomeIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function OOTDHeader() {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-luxury-cream/80 backdrop-blur-md border-b-2 border-luxury-navy/10"
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/ootd-analyzer" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-rose rounded-full flex items-center justify-center group-hover:scale-105 transition-all" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                        <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-luxury-navy" style={{ fontFamily: 'var(--font-playfair)' }}>
                            OOTD Mood Analyzer
                        </h1>
                        <p className="text-xs text-luxury-navy/60">패션 무드 분석</p>
                    </div>
                </Link>

                {/* Home Button */}
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-2.5 bg-luxury-navy text-white rounded-full font-semibold hover:scale-105 transition-all duration-200"
                    style={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}
                >
                    <HomeIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">메인으로</span>
                </Link>
            </div>
        </motion.header>
    );
}
