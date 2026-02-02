import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '창업 시뮬레이터 (손익분기점/ROI 계산기)',
    description: '편의점, 카페, 치킨집 창업 시 월 순수익과 손익분기점을 미리 계산해보세요. 초기 투자금 회수 기간과 예상 수익률(ROI)을 알려드립니다.',
    keywords: ['창업시뮬레이션', '손익분기점계산기', '편의점창업비용', '카페수입계산', '투자수익률ROI', '자영업현실', '권리금계산'],
    openGraph: {
        title: '창업 시뮬레이터 (손익분기점/ROI 계산기) | 인생 치트키',
        description: '편의점, 카페, 치킨집 창업 시 월 순수익과 손익분기점을 미리 계산해보세요. 초기 투자금 회수 기간과 예상 수익률(ROI)을 알려드립니다.',
        url: 'https://life-cheat-key.com/business',
    },
    twitter: {
        card: 'summary_large_image',
        title: '창업 시뮬레이터 (손익분기점/ROI 계산기) | 인생 치트키',
        description: '편의점, 카페, 치킨집 창업 시 월 순수익과 손익분기점을 미리 계산해보세요. 초기 투자금 회수 기간과 예상 수익률(ROI)을 알려드립니다.',
    },
};

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
