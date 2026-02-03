import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '인생 치트키 금융 상담소 | AI 금융/대출/재테크 조언',
    description: '금융 전문가 AI가 10초 만에 분석하는 초간단 금융 솔루션. 신용점수, 대출, 재테크 고민을 입력하면 힙하고 명쾌한 해결책과 치킨 지수(절약 금액)를 알려드립니다.',
    keywords: [
        '금융상담', '대출상담', '신용점수관리', '재테크조언', 'AI금융비서',
        '인생치트키', '치킨지수', '돈아끼는법', '사회초년생재테크', '전세대출추천',
        '신용카드추천', '빚갚기', '파이어족'
    ],
    authors: [{ name: 'Life Cheat Key TA' }],
    creator: 'Life Cheat Key TA',
    publisher: 'Life Cheat Key TA',
    openGraph: {
        title: '인생 치트키 금융 상담소 | 10초 컷 AI 금융 조언',
        description: '복잡한 금융 고민은 그만! AI가 당신의 상황을 분석해 당장 실행할 수 있는 현실적인 금융 치트키를 알려드립니다.',
        url: 'https://life-cheat-key.vercel.app/consult',
        siteName: '인생 치트키',
        type: 'website',
        locale: 'ko_KR',
        images: [
            {
                url: 'https://life-cheat-key.vercel.app/og-consult.png', // 가상의 이미지 경로 (실제로는 public에 이미지가 있어야 함)
                width: 1200,
                height: 630,
                alt: '인생 치트키 금융 상담소 메인 이미지',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '인생 치트키 금융 상담소',
        description: '내 금융 고민, AI가 10초 만에 해결해준다? 지금 바로 확인하기',
        images: ['https://life-cheat-key.vercel.app/og-consult.png'],
    },
    robots: {
        index: true, // 인덱싱 허용
        follow: true, // 링크 팔로우 허용
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
    },
    alternates: {
        canonical: 'https://life-cheat-key.vercel.app/consult',
    },
};

export default function ConsultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
