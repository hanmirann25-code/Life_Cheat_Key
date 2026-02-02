import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '습관 형성 게임 (게이미피케이션 루틴 관리)',
    description: '작심삼일은 이제 그만! RPG 게임처럼 즐기는 습관 형성 앱입니다. AI 코칭과 레벨업 시스템으로 목표 달성을 재미있게 만들어드립니다.',
    keywords: ['습관형성', '루틴관리', '게이미피케이션', '목표달성', '습관기르기', 'AI습관코칭', '자기계발게임'],
    openGraph: {
        title: '습관 형성 게임 (게이미피케이션 루틴 관리) | 인생 치트키',
        description: '작심삼일은 이제 그만! RPG 게임처럼 즐기는 습관 형성 앱입니다. AI 코칭과 레벨업 시스템으로 목표 달성을 재미있게 만들어드립니다.',
        url: 'https://life-cheat-key.com/habit-tracker',
    },
    twitter: {
        card: 'summary_large_image',
        title: '습관 형성 게임 (게이미피케이션 루틴 관리) | 인생 치트키',
        description: '작심삼일은 이제 그만! RPG 게임처럼 즐기는 습관 형성 앱입니다. AI 코칭과 레벨업 시스템으로 목표 달성을 재미있게 만들어드립니다.',
    },
};

export default function HabitTrackerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
