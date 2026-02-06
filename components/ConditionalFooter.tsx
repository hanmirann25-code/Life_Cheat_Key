'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalFooter() {
    const pathname = usePathname();

    // OOTD analyzer 페이지에서는 풋터를 렌더링하지 않음
    if (pathname?.startsWith('/ootd-analyzer')) {
        return null;
    }

    return (
        <footer className="bg-black text-white border-t-8 border-black mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center space-y-6">
                    <div className="flex justify-center gap-2 items-center">
                        <span className="text-4xl">✨</span>
                        <p className="font-black text-2xl text-neon-yellow">인생 치트키</p>
                    </div>
                    <p className="text-lg text-gray-400">
                        복잡한 인생을 쉽게! © 2026
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-3 h-3 bg-neon-yellow rounded-full"></span>
                            대출계산기 ✅
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <span className="w-3 h-3 bg-neon-pink rounded-full"></span>
                            점심슬롯 ✅
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
                            더 많은 기능 🔜
                        </span>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm pt-6 border-t border-gray-700">
                        <a href="/about" className="hover:text-neon-yellow transition-colors">
                            사이트 소개
                        </a>
                        <span className="text-gray-600">|</span>
                        <a href="/privacy" className="hover:text-neon-yellow transition-colors">
                            개인정보 처리방침
                        </a>
                        <span className="text-gray-600">|</span>
                        <a href="/terms" className="hover:text-neon-yellow transition-colors">
                            이용약관
                        </a>
                        <span className="text-gray-600">|</span>
                        <a href="/contact" className="hover:text-neon-yellow transition-colors">
                            연락처
                        </a>
                        <span className="text-gray-600">|</span>
                        <a
                            href="https://life-cheat-key.blogspot.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-black hover:text-neon-pink underline decoration-4 underline-offset-4 transition-colors"
                        >
                            공식 블로그 📝
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
