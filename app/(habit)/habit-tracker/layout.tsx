import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '루틴 관리 및 습관 추적기 | 인생 치트키',
    description: '나만의 목표를 기록하고 AI의 습관 형성 가이드를 받아보세요.',
    keywords: ['습관 만들기', '루틴 관리', '해빗 트래커', '목표 달성', '갓생 살기', '자기관리 앱'],
    openGraph: {
        title: '루틴 관리 및 습관 추적기 | 인생 치트키',
        description: '나만의 목표를 기록하고 AI의 습관 형성 가이드를 받아보세요.',
        url: 'https://life-cheat-key.com/habit-tracker',
    },
    twitter: {
        card: 'summary_large_image',
        title: '루틴 관리 및 습관 추적기 | 인생 치트키',
        description: '나만의 목표를 기록하고 AI의 습관 형성 가이드를 받아보세요.',
    },
};

export default function HabitTrackerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
