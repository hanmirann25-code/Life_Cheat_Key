import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '대출 이자 계산기 (치킨 환산)',
    description: '원리금균등 vs 만기일시 상환 방식 비교. 대출 이자를 치킨 몇 마리인지로 환산해서 확인해보세요. 가장 저렴한 상환 방식을 찾아드립니다.',
    keywords: ['대출이자계산기', '원리금균등상환계산', '만기일시상환비교', '대출이자치킨환산', '금융계산기', '신용대출이자'],
};

export default function LoanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
