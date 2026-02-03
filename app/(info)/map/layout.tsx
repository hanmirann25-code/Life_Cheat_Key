import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '간편 지도 및 위치 정보 도구 | 인생 치트키',
    description: '목적지 검색과 위치 공유를 위한 쉽고 빠른 지도 서비스입니다.',
    keywords: ['지도 서비스', '위치 찾기', '길찾기', '장소 검색', '지도 앱', '위치 공유'],
    openGraph: {
        title: '간편 지도 및 위치 정보 도구 | 인생 치트키',
        description: '목적지 검색과 위치 공유를 위한 쉽고 빠른 지도 서비스입니다.',
        url: 'https://life-cheat-key.com/map',
    },
    twitter: {
        card: 'summary_large_image',
        title: '간편 지도 및 위치 정보 도구 | 인생 치트키',
        description: '목적지 검색과 위치 공유를 위한 쉽고 빠른 지도 서비스입니다.',
    },
};

export default function MapLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
