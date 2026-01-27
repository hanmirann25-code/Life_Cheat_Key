# 🎯 인생 치트키 - 빠른 시작 가이드

## ✅ 프로젝트 설치 완료!

미란님, **"인생 치트키"** 프로젝트가 성공적으로 설치되었습니다! 🎉

---

## 🚀 현재 상태

✅ **Next.js 14** 프로젝트 생성 완료  
✅ **TypeScript** 설정 완료  
✅ **Tailwind CSS (네오 브루탈리즘)** 디자인 시스템 구축  
✅ **대출 이자 계산기** 완성  
✅ **개발 서버 실행 중** → [http://localhost:3000](http://localhost:3000)

---

## 📱 지금 바로 확인하기

### 1. 브라우저에서 접속

```
http://localhost:3000
```

### 2. 페이지 목록

| 페이지 | URL | 내용 |
|--------|-----|------|
| 홈 | `/` | 메인 페이지 (4개 카테고리 소개) |
| 대출 계산기 | `/(money)/loan` | 원리금균등 vs 만기일시 비교 |

---

## 🎨 구현된 기능

### 🏦 대출 이자 계산기

#### ✨ 핵심 기능
1. **두 가지 상환 방식 비교**
   - 원리금균등상환 (매월 동일 금액)
   - 만기일시상환 (이자만 납부)

2. **비주얼 차트**
   - 도넛 차트로 원금 vs 이자 비율 표시
   - Recharts 라이브러리 사용

3. **재미있는 환산 기능**
   - 이자를 치킨 마리 수로 환산
   - "총 이자 600만원 = 치킨 300마리!"

4. **상세 상환 테이블**
   - 월별 원금/이자/납입액 표시
   - 처음 6개월 미리보기

#### 🎯 입력 항목
- 대출 금액 (원)
- 연 이자율 (%)
- 대출 기간 (개월)
- 상환 방식 (원리금균등/만기일시)

---

## 🖥️ 실행 명령어

### 개발 서버 실행
```bash
npm run dev
```
→ http://localhost:3000 에서 확인

### 빌드 (배포용)
```bash
npm run build
npm start
```

### 서버 중지
- 터미널에서 `Ctrl + C`

---

## 📂 프로젝트 구조

```
Life_Cheat_Key/
├── app/
│   ├── (money)/
│   │   └── loan/              # 🏦 대출 계산기
│   │       ├── page.tsx       # UI 컴포넌트
│   │       └── loanCalculator.ts  # 계산 로직
│   ├── layout.tsx             # 전역 레이아웃 (헤더/푸터)
│   ├── page.tsx               # 홈페이지
│   └── globals.css            # 네오 브루탈리즘 스타일
├── components/                # 재사용 컴포넌트
├── public/                    # 이미지 등 정적 파일
├── README.md                  # 프로젝트 설명서
├── DEVELOPMENT_GUIDE.md       # 개발 가이드 (자세한 설명)
└── package.json               # 의존성 관리
```

---

## 🎨 디자인 시스템

### 네오 브루탈리즘 컬러
- 🟡 노랑 `#FFE500` - 주요 버튼
- 🩷 핑크 `#FF6B9D` - 결과 강조
- 🩵 파랑 `#00D4FF` - 선택 상태
- 💚 초록 `#00FF85` - 정보 카드
- 💜 보라 `#B644FF` - AI 기능

### 핵심 스타일 요소
- ⬛ 굵은 검은 테두리 (4px)
- 🟥 투박한 그림자 (brutal shadow)
- 🎯 강렬한 원색 (그라데이션 없음)
- 💪 두꺼운 폰트 (font-black)

---

## 📝 파일별 역할

### `app/(money)/loan/loanCalculator.ts`
**순수 계산 로직 파일**
- 원리금균등상환 계산 공식
- 만기일시상환 계산 공식
- 치킨 환산 함수
- 원화 포맷팅 함수

### `app/(money)/loan/page.tsx`
**UI 컴포넌트 파일**
- 입력 폼 (대출 금액, 이자율, 기간)
- 결과 표시 (총 상환액, 이자, 차트)
- 상태 관리 (useState)
- 이벤트 핸들러 (계산하기 버튼)

### `app/globals.css`
**전역 스타일**
- Tailwind 기본 설정
- 네오 브루탈 재사용 클래스
  - `.neo-button`
  - `.neo-card`
  - `.neo-input`

### `app/layout.tsx`
**전역 레이아웃**
- 헤더 (로고, 메뉴)
- 푸터
- SEO 메타데이터

---

## 🔧 수정하기

### 1. 컬러 변경
**파일:** `tailwind.config.ts`
```typescript
colors: {
  'neo-yellow': '#YOUR_COLOR',  // 원하는 색상 코드로 변경
}
```

### 2. 치킨 가격 변경
**파일:** `app/(money)/loan/loanCalculator.ts`
```typescript
export function convertToChicken(amount: number): number {
  return Math.floor(amount / 25000);  // 25,000원으로 변경
}
```

### 3. 기본값 변경
**파일:** `app/(money)/loan/page.tsx`
```typescript
const [principal, setPrincipal] = useState<number>(30000000);  // 3천만원
const [interestRate, setInterestRate] = useState<number>(5.0);  // 5%
const [period, setPeriod] = useState<number>(36);  // 36개월
```

---

## 📚 참고 문서

- **README.md**: 프로젝트 전체 소개
- **DEVELOPMENT_GUIDE.md**: 상세 개발 가이드 (코드 설명, 확장 방법)
- **Next.js 공식 문서**: https://nextjs.org/docs
- **Tailwind CSS 공식 문서**: https://tailwindcss.com/docs

---

## 🎯 다음 단계

### 추천 작업 순서

#### 1단계: 현재 계산기 테스트 ✅
- [x] 다양한 금액으로 계산 테스트
- [x] 원리금균등 vs 만기일시 비교
- [x] 모바일/데스크톱 반응형 확인

#### 2단계: 점심 메뉴 슬롯머신 (다음 목표)
```
app/(choice)/lunch/page.tsx
```
- 슬롯머신 애니메이션
- 음식 카테고리 필터
- 랜덤 메뉴 추천

#### 3단계: 추가 계산기
- 월급 실수령액 계산기
- 집 사기 시뮬레이터
- N빵 계산기

---

## ⚠️ 주의사항

### 서버가 안 켜질 때
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 삭제
rm -rf .next
npm run dev
```

### 스타일이 안 보일 때
- 브라우저 강력 새로고침 (Ctrl + Shift + R)
- 개발자 도구에서 캐시 비우기

---

## 🎉 축하합니다!

**첫 번째 기능인 "대출 이자 계산기"가 완성되었습니다!**

이제 브라우저에서 http://localhost:3000 을 열어서 확인해보세요!

### 🔥 실제로 작동하는 기능:
✅ 대출 금액 입력  
✅ 이자율/기간 조절  
✅ 원리금균등/만기일시 전환  
✅ 실시간 계산  
✅ 차트 시각화  
✅ 치킨 환산  
✅ 월별 상환 테이블  

---

## 💬 질문이 있다면?

- `README.md` - 프로젝트 전체 설명
- `DEVELOPMENT_GUIDE.md` - 코드 상세 가이드
- 코드 주석 - 각 파일에 설명 포함

**미란님, 첫 발을 떼셨습니다! 화이팅! 🚀**

---

### 📸 스크린샷 포인트

1. **홈페이지** (`/`)
   - 네오 브루탈 디자인 확인
   - 4개 카테고리 카드

2. **대출 계산기** (`/(money)/loan`)
   - 입력 폼
   - 도넛 차트
   - 치킨 환산
   - 월별 테이블

---

**지금 바로 시작하세요! 브라우저에서 http://localhost:3000 열기! 🎮**
