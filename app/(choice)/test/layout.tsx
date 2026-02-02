import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '감각 테스트 (시각/청각/미각 능력 평가)',
    description: '나의 오감 능력은 상위 몇 %일까? 색감, 음감, 미각 등 다양한 감각 테스트를 통해 당신의 잠든 감각을 깨워드립니다.',
    keywords: ['감각테스트', '색감테스트', '절대음감', '오감능력', '두뇌회전', '집중력테스트', '심리테스트'],
    openGraph: {
        title: '감각 테스트 (시각/청각/미각 능력 평가) | 인생 치트키',
        description: '나의 오감 능력은 상위 몇 %일까? 색감, 음감, 미각 등 다양한 감각 테스트를 통해 당신의 잠든 감각을 깨워드립니다.',
        url: 'https://life-cheat-key.com/test',
    },
    twitter: {
        card: 'summary_large_image',
        title: '감각 테스트 (시각/청각/미각 능력 평가) | 인생 치트키',
        description: '나의 오감 능력은 상위 몇 %일까? 색감, 음감, 미각 등 다양한 감각 테스트를 통해 당신의 잠든 감각을 깨워드립니다.',
    },
};

export default function TestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
