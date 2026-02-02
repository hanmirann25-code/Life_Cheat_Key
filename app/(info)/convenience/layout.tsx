import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'OTT 신작/인기 순위 (넷플릭스/티빙 등)',
    description: '넷플릭스, 디즈니+, 왓챠 등 OTT 플랫폼의 최신 신작과 인기 영화/드라마 순위를 모아 보여드립니다. 평점 기반의 추천으로 정주행 작품을 찾아보세요.',
    keywords: ['OTT추천', '넷플릭스신작', '영화순위', '드라마추천', '정주행추천', '티빙인기', '디즈니플러스'],
    openGraph: {
        title: 'OTT 신작/인기 순위 (넷플릭스/티빙 등) | 인생 치트키',
        description: '넷플릭스, 디즈니+, 왓챠 등 OTT 플랫폼의 최신 신작과 인기 영화/드라마 순위를 모아 보여드립니다. 평점 기반의 추천으로 정주행 작품을 찾아보세요.',
        url: 'https://life-cheat-key.com/convenience',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'OTT 신작/인기 순위 (넷플릭스/티빙 등) | 인생 치트키',
        description: '넷플릭스, 디즈니+, 왓챠 등 OTT 플랫폼의 최신 신작과 인기 영화/드라마 순위를 모아 보여드립니다. 평점 기반의 추천으로 정주행 작품을 찾아보세요.',
    },
};

export default function ConvenienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
