import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import GoogleAdSense from "@/components/GoogleAdSense";

// Trigger Vercel build

export const metadata: Metadata = {
  title: {
    default: "인생 치트키 | Life Cheat Key",
    template: "%s | 인생 치트키"
  },
  description: "복잡한 인생, 클릭 몇 번으로 쉽게 풀자. 대출 계산기, 점심 메뉴 추천, AI 작가 등 유용한 도구 모음",
  keywords: [
    "대출계산기",
    "이자계산",
    "금융계산기",
    "점심메뉴추천",
    "점심슬롯머신",
    "AI작가",
    "거절멘트생성기",
    "월급계산기",
    "실수령액계산",
    "생활정보",
    "유용한사이트",
    "인생치트키"
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
    title: '인생 치트키 | Life Cheat Key',
    description: '복잡한 인생, 클릭 몇 번으로 쉽게 풀자. 대출 계산기, 점심 메뉴 추천, AI 작가 등 유용한 도구 모음',
    siteName: '인생 치트키',
  },
  twitter: {
    card: 'summary_large_image',
    title: '인생 치트키 | Life Cheat Key',
    description: '복잡한 인생, 클릭 몇 번으로 쉽게 풀자',
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
      <head>
        <GoogleAdSense pId="XXXXXXXXXXXXXXXX" /> {/* AdSense Publisher ID를 여기에 입력하세요 (예: 1234567890123456) */}
      </head>
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
              description: '복잡한 인생, 클릭 몇 번으로 쉽게 풀자. 대출 계산기, 점심 메뉴 추천, AI 작가 등 유용한 도구 모음',
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

        <Header />

        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black text-white border-t-8 border-black mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center gap-2 items-center">
                <span className="text-4xl">✨</span>
                <p className="font-black text-2xl text-neon-yellow">인생 치트키</p>
              </div>
              <p className="text-lg text-gray-400">
                복잡한 인생을 쉽게! © 2026
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 bg-neon-yellow rounded-full"></span>
                  대출계산기 ✅
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 bg-neon-pink rounded-full"></span>
                  점심슬롯 ✅
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
                  더 많은 기능 🔜
                </span>
              </div>

              {/* Footer Links */}
              <div className="flex flex-wrap justify-center gap-4 text-sm pt-6 border-t border-gray-700">
                <a href="/about" className="hover:text-neon-yellow transition-colors">
                  사이트 소개
                </a>
                <span className="text-gray-600">|</span>
                <a href="/privacy" className="hover:text-neon-yellow transition-colors">
                  개인정보 처리방침
                </a>
                <span className="text-gray-600">|</span>
                <a href="/terms" className="hover:text-neon-yellow transition-colors">
                  이용약관
                </a>
                <span className="text-gray-600">|</span>
                <a href="/contact" className="hover:text-neon-yellow transition-colors">
                  연락처
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

