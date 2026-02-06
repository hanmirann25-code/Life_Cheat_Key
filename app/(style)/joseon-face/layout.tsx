import { Metadata } from 'next';
import { Noto_Serif_KR } from 'next/font/google';
import JoseonHeader from '@/components/joseon/JoseonHeader';
import JoseonFooter from '@/components/joseon/JoseonFooter';

const notoSerifKR = Noto_Serif_KR({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    display: 'swap',
    variable: '--font-noto-serif-kr',
});

export const metadata: Metadata = {
    title: '조선관상 - 전생 직업 분석 | 인생 치트키',
    description: '그대의 관상을 보니... 범상치 않구려! 얼굴 사진 한 장으로 알아보는 조선시대 전생 직업. 영의정, 기생, 암행어사 등 12가지 직업 중 나는 누구였을까? 무료 분석, 재미있는 결과 공유.',
    keywords: ['조선시대', '관상', '전생', '직업 테스트', '얼굴 분석', 'AI 관상', '재미 테스트', '바이럴 테스트'],
    openGraph: {
        title: '조선관상 - 나의 전생 직업은?',
        description: '얼굴 관상으로 알아보는 조선시대 전생 직업! 그대는 영의정? 기생? 암행어사? 천기누설 시작!',
        type: 'website',
        url: 'https://life-cheat-key.com/joseon-face',
        images: [
            {
                url: '/og-joseon-face.png',
                width: 1200,
                height: 630,
                alt: '조선관상 - 전생 직업 분석',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '조선관상 - 나의 전생 직업 분석',
        description: '관상을 보니... 그대는 전생에 귀한 분이었구려! 얼굴로 알아보는 조선시대 직업',
    },
};

export default function JoseonFaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${notoSerifKR.variable} font-serif`}>
            <JoseonHeader />
            <main className="pt-20">
                {children}
            </main>
            <JoseonFooter />
        </div>
    );
}
