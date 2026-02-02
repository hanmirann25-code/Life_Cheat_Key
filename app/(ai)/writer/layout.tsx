import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI 거절 멘트 생성기 (사과/회식 거절)',
    description: '돈 빌려달라는 부탁, 갑작스러운 회식, 지각 사과 등 말하기 난처한 상황을 위한 AI 문구 생성기입니다. 정중하고 깔끔하게 대신 써드립니다.',
    keywords: ['거절멘트생성기', '회식거절방법', '사과문작성', '지각사과문', '정중한어절', 'AI작가', '글쓰기도우미'],
};

export default function WriterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
