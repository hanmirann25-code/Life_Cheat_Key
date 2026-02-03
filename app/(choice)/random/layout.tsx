import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '만능 랜덤 번호 및 리스트 추첨기 | 인생 치트키',
    description: '경품 추첨, 번호 뽑기 등 공정한 결과를 위한 랜덤 도구입니다.',
    keywords: ['랜덤 추첨기', '번호 뽑기', '사다리 타기', '제비뽑기', '당첨자 추첨', '랜덤 번호 생성'],
    openGraph: {
        title: '만능 랜덤 번호 및 리스트 추첨기 | 인생 치트키',
        description: '경품 추첨, 번호 뽑기 등 공정한 결과를 위한 랜덤 도구입니다.',
        url: 'https://life-cheat-key.com/random',
    },
    twitter: {
        card: 'summary_large_image',
        title: '만능 랜덤 번호 및 리스트 추첨기 | 인생 치트키',
        description: '경품 추첨, 번호 뽑기 등 공정한 결과를 위한 랜덤 도구입니다.',
    },
};

export default function RandomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
