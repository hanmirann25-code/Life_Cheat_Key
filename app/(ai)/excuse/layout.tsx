import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI 핑계/사과문 생성기 (지각/약속 취소)',
    description: '지각했을 때, 약속을 취소해야 할 때 등 난처한 상황에서 사용할 수 있는 센스 있는 핑계와 진심 어린 사과문을 AI가 대신 작성해드립니다.',
    keywords: ['핑계생성기', '사과문작성', '지각핑계', '약속취소문구', '반성문대필', 'AI작문', '거절멘트'],
    openGraph: {
        title: 'AI 핑계/사과문 생성기 (지각/약속 취소) | 인생 치트키',
        description: '지각했을 때, 약속을 취소해야 할 때 등 난처한 상황에서 사용할 수 있는 센스 있는 핑계와 진심 어린 사과문을 AI가 대신 작성해드립니다.',
        url: 'https://life-cheat-key.com/excuse',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI 핑계/사과문 생성기 (지각/약속 취소) | 인생 치트키',
        description: '지각했을 때, 약속을 취소해야 할 때 등 난처한 상황에서 사용할 수 있는 센스 있는 핑계와 진심 어린 사과문을 AI가 대신 작성해드립니다.',
    },
};

export default function ExcuseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
