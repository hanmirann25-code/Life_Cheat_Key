import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI 탄원서 및 반성문 양식 자동 작성 | 인생 치트키',
    description: '법적 서류 작성이 막막할 때, 진정성 있는 초안을 AI가 논리적으로 작성합니다.',
    keywords: ['AI 탄원서 작성', '반성문 자동 작성', '법원 반성문 양식', '음주운전 반성문', '탄원서 예시', 'AI 글쓰기'],
    openGraph: {
        title: 'AI 탄원서 및 반성문 양식 자동 작성 | 인생 치트키',
        description: '법적 서류 작성이 막막할 때, 진정성 있는 초안을 AI가 논리적으로 작성합니다.',
        url: 'https://life-cheat-key.com/petition',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI 탄원서 및 반성문 양식 자동 작성 | 인생 치트키',
        description: '법적 서류 작성이 막막할 때, 진정성 있는 초안을 AI가 논리적으로 작성합니다.',
    },
};

export default function PetitionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
