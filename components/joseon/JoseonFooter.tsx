'use client';

import Link from 'next/link';

export default function JoseonFooter() {
    return (
        <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-amber-50 border-t-4 border-amber-700">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center space-y-6">
                    <div className="flex justify-center gap-2 items-center">
                        <span className="text-4xl">📜</span>
                        <p className="font-black text-2xl" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            조선관상
                        </p>
                    </div>
                    <p className="text-lg text-amber-200/80" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                        그대의 전생을 들여다보는 천기누설
                    </p>

                    <div className="pt-6 border-t border-amber-700/50">
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <Link href="/" className="hover:text-amber-300 transition-colors">
                                인생 치트키 홈
                            </Link>
                            <span className="text-amber-600">|</span>
                            <Link href="/about" className="hover:text-amber-300 transition-colors">
                                사이트 소개
                            </Link>
                            <span className="text-amber-600">|</span>
                            <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                                개인정보 처리방침
                            </Link>
                        </div>
                        <p className="text-xs text-amber-400/60 mt-4">
                            © 2026 인생 치트키. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
