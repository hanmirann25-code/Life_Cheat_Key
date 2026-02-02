import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '서울 테마 지도 (핫플레이스/맛집/명소)',
    description: '서울의 숨겨진 명소와 맛집, 핫플레이스를 테마별로 정리한 지도입니다. 데이트 코스부터 힐링 스팟까지 카카오 맵으로 편리하게 찾아보세요.',
    keywords: ['서울맛집지도', '데이트코스추천', '서울핫플레이스', '테마여행', '서울관광명소', '가볼만한곳', '카카오맵연동'],
    openGraph: {
        title: '서울 테마 지도 (핫플레이스/맛집/명소) | 인생 치트키',
        description: '서울의 숨겨진 명소와 맛집, 핫플레이스를 테마별로 정리한 지도입니다. 데이트 코스부터 힐링 스팟까지 카카오 맵으로 편리하게 찾아보세요.',
        url: 'https://life-cheat-key.com/map',
    },
    twitter: {
        card: 'summary_large_image',
        title: '서울 테마 지도 (핫플레이스/맛집/명소) | 인생 치트키',
        description: '서울의 숨겨진 명소와 맛집, 핫플레이스를 테마별로 정리한 지도입니다. 데이트 코스부터 힐링 스팟까지 카카오 맵으로 편리하게 찾아보세요.',
    },
};

export default function MapLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
