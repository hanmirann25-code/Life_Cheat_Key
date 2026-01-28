# 🎮 인생 치트키 (Life Cheat Key)

> **슬로건:** "복잡한 인생, 클릭 몇 번으로 쉽게 풀자"

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📖 프로젝트 소개

**인생 치트키**는 복잡한 금융 계산부터 일상의 소소한 선택까지, 사용자가 직접 조작하고 체험할 수 있는 **체류형 유틸리티 포털**입니다.

### ✨ 주요 특징

- 🎨 **네오 브루탈리즘 디자인**: 힙하고 강렬한 비주얼로 MZ세대 타겟
- 💰 **실용적인 금융 계산기**: 대출, 월급, 자산 시뮬레이션
- 📊 **비주얼 중심 UI**: 차트와 그래프로 복잡한 정보를 쉽게 이해
- 🍗 **재미있는 환산 기능**: "이자를 치킨으로 환산하면?"
- 📱 **완전 반응형**: 모바일/태블릿/데스크톱 모두 최적화

---

## 🚀 빠른 시작

### 1️⃣ 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2️⃣ 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

\`\`\`bash
# OpenAI API 키 (핑계/사과문 생성기용)
# OpenAI 웹사이트(https://platform.openai.com/api-keys)에서 발급받으세요
OPENAI_API_KEY=your_openai_api_key_here

# TMDB API 키 (영화 정보 기능용)
# https://www.themoviedb.org/settings/api 에서 발급받으세요
TMDB_API_KEY=your_tmdb_api_key_here
# 또는 클라이언트에서도 사용하려면 (권장하지 않음)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# 한국관광공사 Tour API 키 (행사 캘린더 기능용)
# https://www.data.go.kr/ 에서 발급받으세요
TOUR_API_KEY=your_tour_api_key_here
# 또는 클라이언트에서도 사용하려면 (권장하지 않음)
NEXT_PUBLIC_TOUR_API_KEY=your_tour_api_key_here

# 카카오 REST API 키 (지도 기능용)
# https://developers.kakao.com/ 에서 발급받으세요
KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
# 또는 클라이언트에서도 사용하려면 (권장하지 않음)
NEXT_PUBLIC_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
\`\`\`

**⚠️ 중요:** 
- `.env.local` 파일은 Git에 커밋하지 마세요! (이미 .gitignore에 포함되어 있습니다)
- **보안상 서버 전용 환경 변수(`TMDB_API_KEY`, `TOUR_API_KEY`) 사용을 권장합니다.**
- `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트 사이드에서도 접근 가능하므로 API 키에는 사용을 지양하세요.

### 3️⃣ 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3️⃣ 빌드 (배포용)

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📂 프로젝트 구조

\`\`\`
Life_Cheat_Key/
├── app/
│   ├── (money)/           # 💰 머니 & 시뮬레이션
│   │   └── loan/          # 대출 계산기
│   │       ├── page.tsx           # UI 컴포넌트
│   │       └── loanCalculator.ts  # 계산 로직
│   ├── layout.tsx         # 전역 레이아웃 (헤더/푸터)
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 전역 스타일 (네오 브루탈리즘)
├── components/            # 재사용 가능한 컴포넌트
├── public/               # 정적 파일 (이미지, 폰트 등)
├── tailwind.config.ts    # Tailwind 설정 (커스텀 컬러/그림자)
├── tsconfig.json         # TypeScript 설정
├── next.config.js        # Next.js 설정
└── package.json          # 의존성 관리
\`\`\`

---

## 🎯 주요 기능

### 1. 🏦 대출 이자 계산기 *(현재 구현됨)*

**경로:** `/loan` 또는 `/(money)/loan`

#### 기능:
- ✅ **원리금균등상환** 계산: 매월 동일한 금액 납부
- ✅ **만기일시상환** 계산: 매월 이자만 납부, 만기에 원금 일시 상환
- ✅ **비주얼 차트**: 원금 vs 이자 비율을 도넛 차트로 표시
- ✅ **치킨 환산**: 이자를 치킨 마리 수로 환산 (1마리 = 20,000원)
- ✅ **월별 상환 테이블**: 회차별 원금/이자/납입액 상세 표시

#### 계산 로직:
- **원리금균등상환 공식:**
  \`\`\`
  월 납입액 = P × r × (1+r)^n / ((1+r)^n - 1)
  P: 원금, r: 월 이자율, n: 대출 기간(개월)
  \`\`\`

- **만기일시상환:**
  \`\`\`
  월 이자 = P × r
  만기 일시 상환 = P + (P × r)
  \`\`\`

---

## 🎨 디자인 시스템: 네오 브루탈리즘

### 컬러 팔레트

| 색상 | HEX | 용도 |
|------|-----|------|
| 노랑 | `#FFE500` | 주요 버튼, 강조 |
| 핑크 | `#FF6B9D` | 결과 카드, 경고 |
| 파랑 | `#00D4FF` | 선택된 상태 |
| 초록 | `#00FF85` | 정보 카드 |
| 보라 | `#B644FF` | AI 기능 |

### 핵심 스타일

- **굵은 검은 테두리**: `border-4 border-black`
- **투박한 그림자**: `shadow-brutal` (4px 4px 0px)
- **강렬한 원색**: 그라데이션 없이 단색 사용
- **두꺼운 폰트**: `font-black` (900 weight)

### 재사용 클래스 (globals.css)

\`\`\`css
.neo-button   /* 네오 브루탈 버튼 스타일 */
.neo-card     /* 네오 브루탈 카드 스타일 */
.neo-input    /* 네오 브루탈 입력 필드 */
\`\`\`

---

## 🛠 기술 스택

| 항목 | 기술 | 버전 |
|------|------|------|
| **Framework** | Next.js (App Router) | 14.x |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 3.x |
| **Charts** | Recharts | 2.x |
| **State** | Zustand | 4.x |

### 왜 이 스택인가?

- **Next.js 14**: SEO 최적화가 필수적인 프로젝트 (검색 유입 극대화)
- **TypeScript**: 대출 계산 등 복잡한 로직의 타입 안정성
- **Tailwind**: 네오 브루탈리즘 디자인을 빠르게 구현
- **Recharts**: 비주얼 차트를 쉽게 커스터마이징

---

## 📈 향후 계획 (로드맵)

### Phase 2: 🎲 결정 & 게임
- [ ] 점심 메뉴 슬롯머신
- [ ] VS 분석실 (비교 도구)
- [ ] 음식 궁합 연구소

### Phase 3: 📍 정보 아카이브
- [ ] 테마 지도 (노키즈존, 애견 카페 등)
- [ ] 전국 행사 캘린더
- [ ] 편의점 신제품 모음

### Phase 4: 🤖 AI 작가
- [x] 핑계/사과문 생성기 (OpenAI API 연동 완료) ✅
- [x] 거절 멘트 생성기 (OpenAI API 연동 완료) ✅

---

## 💡 사용 예시

### 대출 계산기 사용법

1. **대출 금액** 입력 (예: 50,000,000원)
2. **연 이자율** 입력 (예: 4.5%)
3. **대출 기간** 입력 (예: 60개월)
4. **상환 방식** 선택 (원리금균등 or 만기일시)
5. **🧮 계산하기** 버튼 클릭

#### 결과 확인:
- 📊 총 상환액 / 총 이자 확인
- 🍗 이자를 치킨으로 환산 (재미 요소!)
- 📈 도넛 차트로 원금 vs 이자 비율 시각화
- 📅 월별 상환 내역 테이블

---

## 🔧 개발 가이드

### 새로운 페이지 추가하기

1. `app/(카테고리)/페이지명/` 폴더 생성
2. `page.tsx` 파일 작성
3. `layout.tsx`의 네비게이션에 링크 추가

### 새로운 계산기 로직 추가

1. `app/(money)/계산기명/calculator.ts` 파일 생성
2. 입력/출력 타입 정의 (`interface`)
3. 계산 함수 작성 및 export
4. `page.tsx`에서 import하여 사용

### 네오 브루탈 스타일 적용

\`\`\`tsx
<div className="neo-card bg-neo-yellow">
  <button className="neo-button">클릭!</button>
  <input className="neo-input" />
</div>
\`\`\`

---

## 🚀 Vercel 배포 가이드

### 1. Vercel에 프로젝트 연결
1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택 및 Import

### 2. 환경 변수 설정 (중요!)
Vercel 대시보드에서 **Settings → Environment Variables**로 이동하여 다음 변수들을 추가하세요:

\`\`\`
OPENAI_API_KEY = your_openai_api_key_here
TMDB_API_KEY = your_tmdb_api_key_here
TOUR_API_KEY = your_tour_api_key_here
KAKAO_REST_API_KEY = your_kakao_rest_api_key_here
\`\`\`

**⚠️ 주의사항:**
- 환경 변수 이름에 `NEXT_PUBLIC_` 접두사 없이 설정하세요 (서버 전용)
- 각 환경(Production, Preview, Development)에 모두 추가하거나 필요한 환경만 선택하세요
- 환경 변수를 추가한 후 **재배포**해야 적용됩니다

### 3. 배포 확인
- 배포 완료 후 API 엔드포인트가 정상 작동하는지 확인:
  - `/api/tmdb?type=movie&category=popular`
  - `/api/tour?eventMonth=202601`

### 4. 배포 후 500 에러 발생 시
1. Vercel 대시보드의 **Functions** 탭에서 로그 확인
2. 환경 변수가 올바르게 설정되었는지 확인
3. API 키가 유효한지 확인 (만료되지 않았는지)
4. 필요시 재배포 실행

---

## 🐛 문제 해결 (Troubleshooting)

### API 500 에러 발생 시
\`\`\`bash
# 1. 로컬에서 환경 변수 확인
# .env.local 파일이 존재하고 올바른지 확인

# 2. Vercel 환경 변수 확인
# Vercel 대시보드 → Settings → Environment Variables

# 3. API 키 유효성 확인
# TMDB: https://www.themoviedb.org/settings/api
# Tour API: https://www.data.go.kr/
\`\`\`

**일반적인 원인:**
- 환경 변수가 설정되지 않음
- API 키가 만료되었거나 잘못됨
- Vercel에 환경 변수를 추가한 후 재배포하지 않음

### 서버가 시작되지 않을 때
\`\`\`bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 삭제
rm -rf .next
npm run dev
\`\`\`

### 차트가 표시되지 않을 때
- `"use client"` 지시어가 파일 최상단에 있는지 확인
- Recharts 버전 확인: `npm list recharts`

### 스타일이 적용되지 않을 때
- `tailwind.config.ts`의 `content` 경로 확인
- 브라우저 캐시 강력 새로고침 (Ctrl+Shift+R)

---

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 및 학습 목적으로 제작되었습니다.

---

## 👤 제작자

**미란님의 인생 치트키 프로젝트** 🎮

- 프로젝트 시작일: 2026년 1월
- 첫 번째 기능: 대출 이자 계산기 ✅

---

## 🙏 감사의 말

이 프로젝트는 **생활 밀착형 유틸리티**와 **게이미피케이션**을 결합하여,
사용자들이 복잡한 인생의 문제를 쉽고 재미있게 해결할 수 있도록 돕기 위해 만들어졌습니다.

**"복잡한 인생, 이제 치트키로 풀자!"** 🚀

---

## 📞 문의

버그 리포트나 기능 제안은 이슈로 남겨주세요!
