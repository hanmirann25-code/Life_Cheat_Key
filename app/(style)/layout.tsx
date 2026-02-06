'use client';

import { usePathname } from 'next/navigation';
import { Playfair_Display, Inter } from 'next/font/google';
import OOTDHeader from '@/components/ootd/OOTDHeader';
import OOTDFooter from '@/components/ootd/OOTDFooter';

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export default function StyleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isOOTDPage = pathname?.startsWith('/ootd-analyzer');

    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans`}>
            {/* Kakao SDK */}
            <script
                src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
                integrity="sha384-l+xbElFSnPZ2rOaPrU//2FF5B4LB8FiX5q4fXYTlfcG4PGpMkE1vcL7kNXI6Cci0"
                crossOrigin="anonymous"
                async
            ></script>

            {isOOTDPage && <OOTDHeader />}
            <main className={isOOTDPage ? "pt-20" : ""}>
                {children}
            </main>
            {isOOTDPage && <OOTDFooter />}
        </div>
    );
}
