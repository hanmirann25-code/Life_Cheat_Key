import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'N빵 계산기 (더치페이/뿜빠이 정산)',
    description: '회식, 모임 후 복잡한 정산은 이제 그만! 총 금액과 인원수만 입력하면 1인당 얼마인지 바로 계산해주고, 카카오톡 정산 공유 문구까지 만들어드립니다.',
    keywords: ['N빵계산기', '더치페이계산', '회식비정산', '뿜빠이계산', '모임통장', '카카오톡정산공유', '금액나누기'],
    openGraph: {
        title: 'N빵 계산기 (더치페이/뿜빠이 정산) | 인생 치트키',
        description: '회식, 모임 후 복잡한 정산은 이제 그만! 총 금액과 인원수만 입력하면 1인당 얼마인지 바로 계산해주고, 카카오톡 정산 공유 문구까지 만들어드립니다.',
        url: 'https://life-cheat-key.com/split',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'N빵 계산기 (더치페이/뿜빠이 정산) | 인생 치트키',
        description: '회식, 모임 후 복잡한 정산은 이제 그만! 총 금액과 인원수만 입력하면 1인당 얼마인지 바로 계산해주고, 카카오톡 정산 공유 문구까지 만들어드립니다.',
    },
};

export default function SplitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
