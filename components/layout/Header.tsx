'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-brutal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="text-2xl font-black">
                            <span className="text-black">인생</span>
                            <span className="text-white bg-black px-2 py-1 ml-1">치트키</span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <NavLink href="/#money" label="💰 머니" />
                        <NavLink href="/#choice" label="🎲 게임" />
                        <NavLink href="/#info" label="📍 정보" />
                        <NavLink href="/#ai" label="🤖 AI" />
                        <NavLink href="/settings" label="⚙️ 설정" />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 border-2 border-black bg-neon-yellow hover:bg-neon-pink transition-colors"
                        aria-label="메뉴 열기"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t-2 border-black">
                        <div className="flex flex-col space-y-2">
                            <MobileNavLink href="/#money" label="💰 머니" onClick={() => setMobileMenuOpen(false)} />
                            <MobileNavLink href="/#choice" label="🎲 게임" onClick={() => setMobileMenuOpen(false)} />
                            <MobileNavLink href="/#info" label="📍 정보" onClick={() => setMobileMenuOpen(false)} />
                            <MobileNavLink href="/#ai" label="🤖 AI" onClick={() => setMobileMenuOpen(false)} />
                            <MobileNavLink href="/settings" label="⚙️ 설정" onClick={() => setMobileMenuOpen(false)} />
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="px-4 py-2 border-2 border-black bg-white hover:bg-neon-yellow hover:-translate-y-1 transition-all duration-200 font-bold text-sm"
        >
            {label}
        </Link>
    );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="w-full px-4 py-3 border-2 border-black bg-white hover:bg-neon-yellow active:bg-neon-pink transition-colors font-bold text-sm"
        >
            {label}
        </Link>
    );
}
