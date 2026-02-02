import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '전국 축제/행사 캘린더 (실시간 업데이트)',
    description: '이번 주말 뭐 하지? 전국의 축제, 공연, 마켓, 문화 행사 일정을 월별 캘린더로 한눈에 확인하세요. 한국관광공사 실시간 데이터를 제공합니다.',
    keywords: ['전국축제일정', '주말나들이', '공연정보', '행사캘린더', '데이트코스', '가족나들이', '페스티벌'],
    openGraph: {
        title: '전국 축제/행사 캘린더 (실시간 업데이트) | 인생 치트키',
        description: '이번 주말 뭐 하지? 전국의 축제, 공연, 마켓, 문화 행사 일정을 월별 캘린더로 한눈에 확인하세요. 한국관광공사 실시간 데이터를 제공합니다.',
        url: 'https://life-cheat-key.com/calendar',
    },
    twitter: {
        card: 'summary_large_image',
        title: '전국 축제/행사 캘린더 (실시간 업데이트) | 인생 치트키',
        description: '이번 주말 뭐 하지? 전국의 축제, 공연, 마켓, 문화 행사 일정을 월별 캘린더로 한눈에 확인하세요. 한국관광공사 실시간 데이터를 제공합니다.',
    },
};

export default function CalendarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
