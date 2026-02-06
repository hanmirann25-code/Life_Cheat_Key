'use client';

import { usePathname } from 'next/navigation';
import Header from './layout/Header';

export default function ConditionalHeader() {
    const pathname = usePathname();

    // OOTD analyzer 페이지에서는 헤더를 렌더링하지 않음
    if (pathname?.startsWith('/ootd-analyzer')) {
        return null;
    }

    return <Header />;
}
