import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '내 주변 편의 시설 찾기 | 인생 치트키',
    description: '현재 위치를 기반으로 주변의 주요 편의 시설 정보를 제공합니다.',
    keywords: ['내 주변 찾기', '편의점 찾기', '약국 찾기', '주변 맛집', '은행 찾기', '위치 기반 서비스'],
    openGraph: {
        title: '내 주변 편의 시설 찾기 | 인생 치트키',
        description: '현재 위치를 기반으로 주변의 주요 편의 시설 정보를 제공합니다.',
        url: 'https://life-cheat-key.com/convenience',
    },
    twitter: {
        card: 'summary_large_image',
        title: '내 주변 편의 시설 찾기 | 인생 치트키',
        description: '현재 위치를 기반으로 주변의 주요 편의 시설 정보를 제공합니다.',
    },
};

export default function ConvenienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
