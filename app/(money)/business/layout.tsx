import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '사업자 부가세 및 종합소득세 계산기 | 인생 치트키',
    description: '개인사업자를 위한 간편 세금 계산 도구입니다.',
    keywords: ['사업자 세금 계산기', '부가세 계산기', '종합소득세 계산기', '개인사업자 세금', '창업 세금 계산', '손익분기점 계산'],
    openGraph: {
        title: '사업자 부가세 및 종합소득세 계산기 | 인생 치트키',
        description: '개인사업자를 위한 간편 세금 계산 도구입니다.',
        url: 'https://life-cheat-key.com/business',
    },
    twitter: {
        card: 'summary_large_image',
        title: '사업자 부가세 및 종합소득세 계산기 | 인생 치트키',
        description: '개인사업자를 위한 간편 세금 계산 도구입니다.',
    },
};

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
