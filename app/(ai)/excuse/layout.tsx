import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI 상황별 변명 및 사과문 생성기 | 인생 치트키',
    description: '지각, 실수, 약속 취소 등 곤란한 상황에서 정중한 사과 문구를 AI가 대신 써드립니다.',
    keywords: ['AI 변명 및 사과문 생성기', 'AI 변명 생성', '사과문 생성기', '지각 핑계', '약속 취소 문자', '반성문 대필', '거절 멘트', 'AI 작문'],
    openGraph: {
        title: 'AI 상황별 변명 및 사과문 생성기 | 인생 치트키',
        description: '지각, 실수, 약속 취소 등 곤란한 상황에서 정중한 사과 문구를 AI가 대신 써드립니다.',
        url: 'https://life-cheat-key.com/excuse',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI 상황별 변명 및 사과문 생성기 | 인생 치트키',
        description: '지각, 실수, 약속 취소 등 곤란한 상황에서 정중한 사과 문구를 AI가 대신 써드립니다.',
    },
};

export default function ExcuseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
