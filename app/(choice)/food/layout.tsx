import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '음식 궁합 (맛있는 조합 찾기)',
    description: '치킨엔 맥주, 삼겹살엔 소주! 내가 고른 음식과 가장 잘 어울리는 꿀조합을 찾아드립니다. 실패 없는 맛의 공식을 확인해보세요.',
    keywords: ['음식궁합', '꿀조합', '맛있는조합', '치맥', '피맥', '야식추천', '메뉴추천'],
    openGraph: {
        title: '음식 궁합 (맛있는 조합 찾기) | 인생 치트키',
        description: '치킨엔 맥주, 삼겹살엔 소주! 내가 고른 음식과 가장 잘 어울리는 꿀조합을 찾아드립니다. 실패 없는 맛의 공식을 확인해보세요.',
        url: 'https://life-cheat-key.com/food',
    },
    twitter: {
        card: 'summary_large_image',
        title: '음식 궁합 (맛있는 조합 찾기) | 인생 치트키',
        description: '치킨엔 맥주, 삼겹살엔 소주! 내가 고른 음식과 가장 잘 어울리는 꿀조합을 찾아드립니다. 실패 없는 맛의 공식을 확인해보세요.',
    },
};

export default function FoodLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
