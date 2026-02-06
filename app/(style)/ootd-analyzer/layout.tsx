import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'OOTD Mood Analyzer - 나의 패션 무드 분석 | 인생 치트키',
    description: '사진 한 장으로 분석하는 당신의 OOTD 무드. AI가 읽어내는 8가지 패션 감성을 확인하고 위트 있는 스타일 라벨을 받아보세요. 무료 분석, 결과 다운로드 및 공유 가능.',
    keywords: ['OOTD', '패션 분석', '스타일 테스트', '무드 분석', 'AI 패션', '코디 추천', '패션 감성'],
    openGraph: {
        title: 'OOTD Mood Analyzer - 사진으로 분석하는 나의 패션 무드',
        description: 'AI가 당신의 OOTD에서 8가지 스타일 무드를 분석해드립니다. 시크, 러블리, 힙부터 아방가르드까지!',
        type: 'website',
        url: 'https://life-cheat-key.com/ootd-analyzer',
        images: [
            {
                url: '/og-ootd-analyzer.png',
                width: 1200,
                height: 630,
                alt: 'OOTD Mood Analyzer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'OOTD Mood Analyzer - 나의 패션 무드 분석',
        description: '사진 한 장으로 분석하는 당신의 스타일 무드. AI가 읽어내는 패션 감성을 확인해보세요!',
    },
};

export default function OOTDAnalyzerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
