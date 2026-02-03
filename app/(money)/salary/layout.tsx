import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '2026 연봉 실수령액 계산기 | 인생 치트키',
    description: '최신 세율과 비과세 항목을 반영하여 내 진짜 월급을 1초 만에 확인하세요.',
    keywords: ['2026 연봉 실수령액 계산기', '연봉 실수령액', '월급 계산기', '세후 월급', '4대보험 계산기', '직장인 월급표', '연봉계산기'],
    openGraph: {
        title: '2026 연봉 실수령액 계산기 | 인생 치트키',
        description: '최신 세율과 비과세 항목을 반영하여 내 진짜 월급을 1초 만에 확인하세요.',
        url: 'https://life-cheat-key.com/salary',
    },
    twitter: {
        card: 'summary_large_image',
        title: '2026 연봉 실수령액 계산기 | 인생 치트키',
        description: '최신 세율과 비과세 항목을 반영하여 내 진짜 월급을 1초 만에 확인하세요.',
    },
};

export default function SalaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
