import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "인생 치트키 | Life Cheat Key",
  description: "복잡한 인생, 클릭 몇 번으로 쉽게 풀자",
  keywords: ["대출계산기", "이자계산", "금융", "시뮬레이터", "생활정보"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
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
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
