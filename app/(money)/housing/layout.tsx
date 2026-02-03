import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '부동산 중개수수료(복비) 및 취득세 계산기 | 인생 치트키',
    description: '매매, 전세, 월세 복비 요율표를 기반으로 중개수수료와 예상 세금을 계산합니다.',
    keywords: ['부동산 중개수수료 계산기', '복비 계산기', '취득세 계산기', '아파트 매매 세금', '전세 복비', '월세 복비', '부동산 수수료'],
    openGraph: {
        title: '부동산 중개수수료(복비) 및 취득세 계산기 | 인생 치트키',
        description: '매매, 전세, 월세 복비 요율표를 기반으로 중개수수료와 예상 세금을 계산합니다.',
        url: 'https://life-cheat-key.com/housing',
    },
    twitter: {
        card: 'summary_large_image',
        title: '부동산 중개수수료(복비) 및 취득세 계산기 | 인생 치트키',
        description: '매매, 전세, 월세 복비 요율표를 기반으로 중개수수료와 예상 세금을 계산합니다.',
    },
};

export default function HousingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
