'use client';

import { usePathname } from 'next/navigation';
import OOTDHeader from '@/components/ootd/OOTDHeader';
import OOTDFooter from '@/components/ootd/OOTDFooter';

export default function StyleLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isOOTDPage = pathname?.startsWith('/ootd-analyzer');

    return (
        <>
            {isOOTDPage && <OOTDHeader />}
            <main className={isOOTDPage ? "pt-20" : ""}>
                {children}
            </main>
            {isOOTDPage && <OOTDFooter />}
        </>
    );
}
