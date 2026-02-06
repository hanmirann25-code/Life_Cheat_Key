'use client';

import { usePathname } from 'next/navigation';
import Header from './layout/Header';

export default function ConditionalHeader() {
    const pathname = usePathname();

    // OOTD analyzer와 Joseon Face 페이지에서는 헤더를 렌더링하지 않음
    if (pathname?.startsWith('/ootd-analyzer') || pathname?.startsWith('/joseon-face')) {
        return null;
    }

    return <Header />;
}
