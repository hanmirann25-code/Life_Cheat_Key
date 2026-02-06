import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import GoogleAdSense from "@/components/GoogleAdSense"; // @next/third-parties 미지원으로 인한 커스텀 컴포넌트 사용
import { GoogleAnalytics } from "@next/third-parties/google";
import PersistentStorageInit from "@/components/PersistentStorageInit";

// Trigger Vercel build

export const metadata: Metadata = {
  title: {
    default: "인생 치트키 | 모든 생활 도구와 AI 생성기",
    template: "%s | 인생 치트키"
  },
  description: "복잡한 인생을 클릭 한 번으로 쉽게! 연봉/대출 계산기, AI 변명 생성 등 삶을 편하게 만드는 무료 생활 도구 모음.",
  keywords: [
    "인생 치트키",
    "생활 도구",
    "AI 생성기",
    "연봉 계산기",
    "2026 연봉 실수령액",
    "AI 반성문",
    "AI 변명 생성기",
    "결정 장애 해결",
    "메뉴 추천",
    "대출 이자 계산기",
    "거절 멘트 생성",
    "회식 거절",
    "지각 사과문",
    "아파트 구매 시뮬레이션",
    "재테크 도구",
    "금융계산기"
  ],
  authors: [{ name: "인생 치트키" }],
  creator: "인생 치트키",
  publisher: "인생 치트키",
  metadataBase: new URL('https://life-cheat-key.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://life-cheat-key.com',
    title: '인생 치트키 | 모든 생활 도구와 AI 생성기',
    description: '복잡한 인생을 클릭 한 번으로 쉽게! 연봉/대출 계산기, AI 변명 생성 등 삶을 편하게 만드는 무료 생활 도구 모음.',
    siteName: '인생 치트키',
    images: [
      {
        url: '/og-image.png', // Make sure to use a valid image path if available, or keep default
        width: 1200,
        height: 630,
        alt: '인생 치트키 서비스 소개 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '인생 치트키 | 모든 생활 도구와 AI 생성기',
    description: '복잡한 인생을 클릭 한 번으로 쉽게! 연봉/대출 계산기, AI 변명 생성 등 삶을 편하게 만드는 무료 생활 도구 모음.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console에서 발급받은 코드로 교체해주세요
    other: {
      'naver-site-verification': 'naver-site-verification-code', // 네이버 서치어드바이저 코드로 교체해주세요
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '인생 치트키',
              url: 'https://life-cheat-key.com',
              description: '복잡한 인생을 클릭 한 번으로 쉽게! 연봉/대출 계산기, AI 변명 생성 등 삶을 편하게 만드는 무료 생활 도구 모음.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://life-cheat-key.com/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '인생 치트키',
              url: 'https://life-cheat-key.com',
              logo: 'https://life-cheat-key.com/logo.png',
              sameAs: [],
            }),
          }}
        />

        <ConditionalHeader />

        <main>
          {children}
        </main>

        <ConditionalFooter />

        {/* Google Analytics & AdSense */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE && (
          <GoogleAdSense publisherId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE} />
        )}
        <PersistentStorageInit />
      </body>
    </html>
  );
}

