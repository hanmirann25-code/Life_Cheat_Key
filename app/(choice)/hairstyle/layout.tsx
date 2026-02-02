import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '헤어스타일 시뮬레이트 | 나에게 어울리는 머리 찾기',
    description: '내 얼굴에 직접 다양한 트렌디한 헤어스타일을 가상으로 적용해보세요. 숏컷부터 롱웨이브까지, 실패 없는 헤어 변신의 시작!',
    keywords: ['헤어스타일시뮬레이션', '가상헤어스타일', '숏컷시뮬레이터', '염색시뮬레이션', '오늘의머리추천', '헤어체험도구'],
};

export default function HairstyleLayout({
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
                                name: '헤어스타일 시뮬레이터는 어떻게 사용하나요?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '자신의 얼굴 사진을 업로드하거나 카메라를 사용하여 직접 촬영한 후, 마음에 드는 헤어 가발 에셋을 선택하여 위치와 크기를 조절해보면 됩니다.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: '가상으로 적용한 헤어스타일을 저장할 수 있나요?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '네, 결과 화면을 이미지 파일로 다운로드하여 친구들에게 공유하거나 미용실 방문 시 참고용으로 사용할 수 있습니다.',
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
