import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '점심 메뉴 추천 슬롯머신',
    description: '오늘 뭐 먹지? 결정 장애를 해결해드리는 점심 메뉴 슬롯머신입니다. 랜덤으로 메뉴를 고르고 근처 맛집도 바로 확인해보세요.',
    keywords: ['오늘뭐먹지', '점심메뉴추천', '메뉴슬롯머신', '결정장애해결', '랜덤음식추천', '직장인점심고민'],
};

export default function LunchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
