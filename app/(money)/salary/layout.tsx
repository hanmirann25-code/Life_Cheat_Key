import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '연봉 실수령액 계산기 (2026년 기준)',
    description: '내 진짜 월급은 얼마일까? 연봉, 4대보험, 공제액을 2026년 최신 기준으로 정확하게 계산해드립니다. 실수령액표와 월급 명세서를 확인해보세요.',
    keywords: ['연봉계산기', '실수령액계산', '월급계산기', '4대보험계산', '2026년연봉표', '직장인월급'],
    openGraph: {
        title: '연봉 실수령액 계산기 (2026년 기준) | 인생 치트키',
        description: '내 진짜 월급은 얼마일까? 연봉, 4대보험, 공제액을 2026년 최신 기준으로 정확하게 계산해드립니다. 실수령액표와 월급 명세서를 확인해보세요.',
        url: 'https://life-cheat-key.com/salary',
    },
    twitter: {
        card: 'summary_large_image',
        title: '연봉 실수령액 계산기 (2026년 기준) | 인생 치트키',
        description: '내 진짜 월급은 얼마일까? 연봉, 4대보험, 공제액을 2026년 최신 기준으로 정확하게 계산해드립니다. 실수령액표와 월급 명세서를 확인해보세요.',
    },
};

export default function SalaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
