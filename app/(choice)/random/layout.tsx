import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '랜덤 추천 (메뉴/영화/여행지 선택 장애 해결)',
    description: '오늘 점심 뭐 먹지? 주말에 뭐 보지? 결정 장애가 올 때 카테고리만 고르면 AI가 랜덤으로 딱 정해드립니다. 운명적인 선택을 즐겨보세요.',
    keywords: ['랜덤추천', '메뉴추천', '영화추천', '여행지추천', '결정장애', '선택장애해결', '무작위선택'],
    openGraph: {
        title: '랜덤 추천 (메뉴/영화/여행지 선택 장애 해결) | 인생 치트키',
        description: '오늘 점심 뭐 먹지? 주말에 뭐 보지? 결정 장애가 올 때 카테고리만 고르면 AI가 랜덤으로 딱 정해드립니다. 운명적인 선택을 즐겨보세요.',
        url: 'https://life-cheat-key.com/random',
    },
    twitter: {
        card: 'summary_large_image',
        title: '랜덤 추천 (메뉴/영화/여행지 선택 장애 해결) | 인생 치트키',
        description: '오늘 점심 뭐 먹지? 주말에 뭐 보지? 결정 장애가 올 때 카테고리만 고르면 AI가 랜덤으로 딱 정해드립니다. 운명적인 선택을 즐겨보세요.',
    },
};

export default function RandomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
