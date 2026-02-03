import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI 글쓰기 및 문장 교정 도구 | 인생 치트키',
    description: '블로그, 이메일, 보고서 등 다양한 목적의 글쓰기를 돕는 AI 작가입니다.',
    keywords: ['AI 글쓰기', '문장 교정', '블로그 글쓰기', '자기소개서 AI', '이메일 작성', '맞춤법 검사', 'AI 작문'],
    openGraph: {
        title: 'AI 글쓰기 및 문장 교정 도구 | 인생 치트키',
        description: '블로그, 이메일, 보고서 등 다양한 목적의 글쓰기를 돕는 AI 작가입니다.',
        url: 'https://life-cheat-key.com/writer',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI 글쓰기 및 문장 교정 도구 | 인생 치트키',
        description: '블로그, 이메일, 보고서 등 다양한 목적의 글쓰기를 돕는 AI 작가입니다.',
    },
};

export default function WriterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
