import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 파스텔 톤 컬러 팔레트
        'pastel-yellow': '#FFF4CC',      // 부드러운 노랑
        'pastel-pink': '#FFD6E8',        // 부드러운 핑크
        'pastel-blue': '#D4F1FF',        // 부드러운 파랑
        'pastel-green': '#D4F8E8',       // 부드러운 초록
        'pastel-purple': '#E8D4FF',      // 부드러운 보라
        'pastel-orange': '#FFE5D4',      // 부드러운 오렌지
        'pastel-mint': '#D4FFE8',        // 민트
        'pastel-peach': '#FFE0D4',       // 피치

        // OOTD Analyzer 럭셔리 컬러
        'luxury-gold': '#D4AF37',        // 골드
        'luxury-rose': '#B76E79',        // 로즈 골드
        'luxury-navy': '#1A1A2E',        // 네이비
        'luxury-cream': '#FAF8F3',       // 크림

        // 네오 브루탈리즘 포인트 컬러
        'neon-yellow': '#FFEB3B',
        'neon-purple': '#9C27B0',
        'neon-pink': '#FF4081',
        'neon-green': '#00E676',
        'neon-blue': '#00B0FF',
      },
      boxShadow: {
        'bento': '4px 4px 0px 0px rgba(0,0,0,0.1)',
        'bento-hover': '6px 6px 0px 0px rgba(0,0,0,0.15)',
        'bento-lg': '8px 8px 0px 0px rgba(0,0,0,0.12)',

        // 네오 브루탈리즘 딱딱한 그림자
        'brutal': '6px 6px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
