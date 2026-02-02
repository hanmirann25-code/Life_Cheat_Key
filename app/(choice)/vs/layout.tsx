import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VS 분석실 (스펙 비교/의사결정 도우미)',
    description: '짜장 vs 짬뽕, 갤럭시 vs 아이폰 등 고민되는 2가지를 객관적인 수치로 비교해보세요. 가격, 성능, 만족도 등 5가지 척도로 분석하여 현명한 선택을 도와드립니다.',
    keywords: ['VS분석', '비교분석', '의사결정도구', '선택장애', '스펙비교', '장단점분석', '레이더차트'],
    openGraph: {
        title: 'VS 분석실 (스펙 비교/의사결정 도우미) | 인생 치트키',
        description: '짜장 vs 짬뽕, 갤럭시 vs 아이폰 등 고민되는 2가지를 객관적인 수치로 비교해보세요. 가격, 성능, 만족도 등 5가지 척도로 분석하여 현명한 선택을 도와드립니다.',
        url: 'https://life-cheat-key.com/vs',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'VS 분석실 (스펙 비교/의사결정 도우미) | 인생 치트키',
        description: '짜장 vs 짬뽕, 갤럭시 vs 아이폰 등 고민되는 2가지를 객관적인 수치로 비교해보세요. 가격, 성능, 만족도 등 5가지 척도로 분석하여 현명한 선택을 도와드립니다.',
    },
};

export default function VSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
