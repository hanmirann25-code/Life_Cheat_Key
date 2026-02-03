import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '대출 이자 및 상환액 계산기 | 인생 치트키',
    description: '원리금균등, 원금균등 상환 방식별 이자와 매달 납부액을 정확히 계산합니다.',
    keywords: ['대출 이자 및 상환액 계산기', '대출 이자 계산기', '대출 상환 계산', '원리금균등', '만기일시상환', '금융계산기', '대출이자 치킨환산'],
    openGraph: {
        title: '대출 이자 및 상환액 계산기 | 인생 치트키',
        description: '원리금균등, 원금균등 상환 방식별 이자와 매달 납부액을 정확히 계산합니다.',
        url: 'https://life-cheat-key.com/loan',
    },
    twitter: {
        card: 'summary_large_image',
        title: '대출 이자 및 상환액 계산기 | 인생 치트키',
        description: '원리금균등, 원금균등 상환 방식별 이자와 매달 납부액을 정확히 계산합니다.',
    },
};

export default function LoanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: '원리금균등 vs 만기일시, 어떤 상환 방식이 더 유리한가요?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '총 이자 비용을 줄이고 싶다면 원리금균등 분할상환이 훨씬 유리합니다. 만기일시 상환은 당장의 월 납부액은 적지만, 원금이 줄어들지 않아 최종적으로 지불하는 이자가 가장 많습니다.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: '대출 이자 계산기에서 치킨 환산은 무엇인가요?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '어렵게 느껴지는 대출 이자 금액을 일상적인 단위인 치킨(2만원 기준)으로 환산하여, 내가 내는 이자가 실제 어느 정도 수준인지 직관적으로 이해할 수 있도록 돕는 재미있는 기능입니다.',
                                },
                            },
                        ],
                    }),
                }}
            />
            {children}
        </>
    );
}
