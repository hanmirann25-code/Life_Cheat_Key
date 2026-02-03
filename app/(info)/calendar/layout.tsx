import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '만년 달력 및 기념일 계산기 | 인생 치트키',
    description: '공휴일 정보와 음력 날짜, 디데이 계산 기능을 제공합니다.',
    keywords: ['만년 달력', '음력 달력', '공휴일 정보', '디데이 계산기', '기념일 계산', '날짜 계산'],
    openGraph: {
        title: '만년 달력 및 기념일 계산기 | 인생 치트키',
        description: '공휴일 정보와 음력 날짜, 디데이 계산 기능을 제공합니다.',
        url: 'https://life-cheat-key.com/calendar',
    },
    twitter: {
        card: 'summary_large_image',
        title: '만년 달력 및 기념일 계산기 | 인생 치트키',
        description: '공휴일 정보와 음력 날짜, 디데이 계산 기능을 제공합니다.',
    },
};

export default function CalendarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
