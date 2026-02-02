import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI 탄원서/반성문 작성기 (법원/경찰서 제출용)',
    description: '음주운전, 폭행 등 선처가 필요한 상황에서 법원이나 경찰서에 제출할 탄원서와 반성문을 AI가 법률적 맥락에 맞게 전문적으로 작성해드립니다.',
    keywords: ['탄원서작성', '반성문대필', '선처호소문', '음주운전탄원서', '폭행합의서', '법원제출서류', 'AI법률문서'],
    openGraph: {
        title: 'AI 탄원서/반성문 작성기 (법원/경찰서 제출용) | 인생 치트키',
        description: '음주운전, 폭행 등 선처가 필요한 상황에서 법원이나 경찰서에 제출할 탄원서와 반성문을 AI가 법률적 맥락에 맞게 전문적으로 작성해드립니다.',
        url: 'https://life-cheat-key.com/petition',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI 탄원서/반성문 작성기 (법원/경찰서 제출용) | 인생 치트키',
        description: '음주운전, 폭행 등 선처가 필요한 상황에서 법원이나 경찰서에 제출할 탄원서와 반성문을 AI가 법률적 맥락에 맞게 전문적으로 작성해드립니다.',
    },
};

export default function PetitionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
