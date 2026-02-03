import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '배달 음식 메뉴 결정기 | 인생 치트키',
    description: '야식과 배달 음식 선택을 위한 랜덤 추천 가이드입니다.',
    keywords: ['배달 음식 추천', '야식 메뉴 추천', '배달의민족 메뉴', '요기요 메뉴', '치킨 vs 피자', '배달 메뉴판'],
    openGraph: {
        title: '배달 음식 메뉴 결정기 | 인생 치트키',
        description: '야식과 배달 음식 선택을 위한 랜덤 추천 가이드입니다.',
    },
    twitter: {
        card: 'summary_large_image',
        title: '배달 음식 메뉴 결정기 | 인생 치트키',
        description: '야식과 배달 음식 선택을 위한 랜덤 추천 가이드입니다.',
    },
};

export default function FoodLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
