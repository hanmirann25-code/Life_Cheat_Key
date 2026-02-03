import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '밸런스 게임 및 선택 도구 | 인생 치트키',
    description: '짜장 vs 짬뽕! 인생의 난제를 해결해주는 선택 어시스턴트입니다.',
    keywords: ['밸런스 게임', '양자택일', '선택 장애', '결정 도구', 'VS 게임', '투표 만들기'],
    openGraph: {
        title: '밸런스 게임 및 선택 도구 | 인생 치트키',
        description: '짜장 vs 짬뽕! 인생의 난제를 해결해주는 선택 어시스턴트입니다.',
        url: 'https://life-cheat-key.com/vs',
    },
    twitter: {
        card: 'summary_large_image',
        title: '밸런스 게임 및 선택 도구 | 인생 치트키',
        description: '짜장 vs 짬뽕! 인생의 난제를 해결해주는 선택 어시스턴트입니다.',
    },
};

export default function VsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
