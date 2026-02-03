import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '더치페이 및 모임 회비 계산기 | 인생 치트키',
    description: '깔끔한 정산을 위한 n분의 1 더치페이 계산기입니다.',
    keywords: ['더치페이 계산기', 'n빵 계산기', '모임 회비 정산', '회식비 계산', '데이트 비용 정산', '여행 경비 계산'],
    openGraph: {
        title: '더치페이 및 모임 회비 계산기 | 인생 치트키',
        description: '깔끔한 정산을 위한 n분의 1 더치페이 계산기입니다.',
        url: 'https://life-cheat-key.com/split',
    },
    twitter: {
        card: 'summary_large_image',
        title: '더치페이 및 모임 회비 계산기 | 인생 치트키',
        description: '깔끔한 정산을 위한 n분의 1 더치페이 계산기입니다.',
    },
};

export default function SplitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
