import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '내 연봉으로 집 사기 시뮬레이션',
    description: '현재 연봉으로 서울 아파트 구매까지 얼마나 걸릴까요? 저축액과 물가 상승률을 고려한 현실적인 내 집 마련 시뮬레이터입니다.',
    keywords: ['내집마련시뮬레이션', '서울아파트구매기간', '연봉별저축', '부동산계산기', '재테크도구', '인생시뮬레이션'],
};

export default function HousingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
