import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '점심 메뉴 추천 및 랜덤 뽑기 | 인생 치트키',
    description: '오늘 뭐 먹지? 고민 해결을 위한 랜덤 메뉴 추천 도구입니다.',
    keywords: ['점심 메뉴 추천', '저녁 메뉴 추천', '오늘 뭐 먹지', '랜덤 메뉴', '음식 추천', '메뉴 고르기'],
    openGraph: {
        title: '점심 메뉴 추천 및 랜덤 뽑기 | 인생 치트키',
        description: '오늘 뭐 먹지? 고민 해결을 위한 랜덤 메뉴 추천 도구입니다.',
        url: 'https://life-cheat-key.com/lunch',
    },
    twitter: {
        card: 'summary_large_image',
        title: '점심 메뉴 추천 및 랜덤 뽑기 | 인생 치트키',
        description: '오늘 뭐 먹지? 고민 해결을 위한 랜덤 메뉴 추천 도구입니다.',
    },
};

export default function LunchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
