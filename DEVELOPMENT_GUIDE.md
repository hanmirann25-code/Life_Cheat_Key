# 🔧 개발 가이드: 대출 계산기 상세 설명

## 📚 목차
1. [프로젝트 구조](#프로젝트-구조)
2. [대출 계산 로직](#대출-계산-로직)
3. [UI 컴포넌트 구조](#ui-컴포넌트-구조)
4. [스타일 가이드](#스타일-가이드)
5. [확장 방법](#확장-방법)

---

## 1️⃣ 프로젝트 구조

### 파일 역할

```
app/(money)/loan/
├── page.tsx              # 💻 UI 컴포넌트 (사용자가 보는 화면)
└── loanCalculator.ts     # 🧮 계산 로직 (순수 함수들)
```

### 왜 파일을 분리했나요?

- **관심사의 분리**: UI 로직과 비즈니스 로직을 분리
- **테스트 용이성**: 계산 로직만 독립적으로 테스트 가능
- **재사용성**: 다른 페이지에서도 계산 함수를 import하여 사용 가능

---

## 2️⃣ 대출 계산 로직

### 📄 `loanCalculator.ts` 파일 구조

#### 타입 정의

```typescript
export type RepaymentType = "equal" | "maturity";

export interface LoanInput {
  principal: number;        // 대출 원금
  interestRate: number;     // 연 이자율 (%)
  period: number;           // 대출 기간 (개월)
  repaymentType: RepaymentType;
}

export interface LoanResult {
  totalPayment: number;     // 총 상환액
  totalInterest: number;    // 총 이자
  monthlyPayments: MonthlyPayment[];
}
```

#### 핵심 함수

##### 1. `calculateEqualPayment()` - 원리금균등상환

**수학 공식:**
```
월 납입액 = P × r × (1+r)^n / ((1+r)^n - 1)

P: 대출 원금
r: 월 이자율 (연 이자율 / 12 / 100)
n: 대출 기간 (개월)
```

**코드 설명:**
```typescript
// 월 이자율 계산
const monthlyRate = interestRate / 100 / 12;

// 월 납입액 계산
const monthlyPayment =
  (principal * monthlyRate * Math.pow(1 + monthlyRate, period)) /
  (Math.pow(1 + monthlyRate, period) - 1);

// 매 회차마다:
for (let month = 1; month <= period; month++) {
  const interestPayment = remainingBalance * monthlyRate;  // 이자
  const principalPayment = monthlyPayment - interestPayment;  // 원금
  remainingBalance -= principalPayment;  // 잔액 차감
}
```

**특징:**
- 매월 **동일한 금액**을 납부
- 초반에는 **이자 비중이 높고**, 후반에는 **원금 비중이 높음**
- 주택담보대출에서 가장 많이 사용

##### 2. `calculateMaturityPayment()` - 만기일시상환

**수학 공식:**
```
월 이자 = P × r
만기 일시 상환 = P + (월 이자 × n)

P: 대출 원금
r: 월 이자율
n: 대출 기간
```

**코드 설명:**
```typescript
// 매월 이자만 납부
const monthlyInterest = principal * monthlyRate;

for (let month = 1; month <= period; month++) {
  const isLastMonth = month === period;
  
  // 마지막 달에만 원금 상환
  principal: isLastMonth ? principal : 0,
  interest: monthlyInterest,
}
```

**특징:**
- 매월 **이자만 납부**
- 만기에 **원금을 한 번에 상환**
- 총 이자가 원리금균등보다 많음

---

## 3️⃣ UI 컴포넌트 구조

### 📄 `page.tsx` 파일 구조

#### 상태 관리 (useState)

```typescript
const [principal, setPrincipal] = useState<number>(50000000);
const [interestRate, setInterestRate] = useState<number>(4.5);
const [period, setPeriod] = useState<number>(60);
const [repaymentType, setRepaymentType] = useState<"equal" | "maturity">("equal");
const [result, setResult] = useState<LoanResult | null>(null);
```

#### 계산 실행

```typescript
const handleCalculate = () => {
  const input: LoanInput = {
    principal,
    interestRate,
    period,
    repaymentType,
  };
  const calculatedResult = calculateLoan(input);
  setResult(calculatedResult);
};
```

#### UI 구성

```
┌─────────────────────────────────────────┐
│  🏦 대출 이자 계산기                    │
└─────────────────────────────────────────┘
┌──────────────┬──────────────────────────┐
│  입력 영역   │  결과 영역               │
│              │                          │
│ • 대출 금액  │ • 총 상환액              │
│ • 이자율     │ • 치킨 환산              │
│ • 기간       │ • 도넛 차트              │
│ • 상환 방식  │ • 월별 테이블            │
│              │                          │
│ [계산하기]   │                          │
└──────────────┴──────────────────────────┘
```

---

## 4️⃣ 스타일 가이드

### 네오 브루탈리즘 핵심 요소

#### 1. 컬러

```css
/* Tailwind Config에 정의된 커스텀 컬러 */
neo-yellow: #FFE500   /* 주요 버튼, CTA */
neo-pink: #FF6B9D     /* 결과 카드, 강조 */
neo-blue: #00D4FF     /* 선택 상태 */
neo-green: #00FF85    /* 정보 카드 */
neo-purple: #B644FF   /* AI 기능 */
```

#### 2. 그림자 (Shadow)

```css
/* 투박한 그림자 효과 */
shadow-brutal: 4px 4px 0px 0px rgba(0,0,0,1)
shadow-brutal-lg: 8px 8px 0px 0px rgba(0,0,0,1)
shadow-brutal-xl: 12px 12px 0px 0px rgba(0,0,0,1)
```

#### 3. 재사용 클래스

```css
/* globals.css에 정의 */
.neo-button {
  @apply px-6 py-3 
         bg-neo-yellow 
         border-4 border-black 
         font-bold text-xl 
         shadow-brutal 
         hover:shadow-brutal-lg 
         hover:translate-x-[-2px] 
         hover:translate-y-[-2px] 
         transition-all 
         cursor-pointer;
}

.neo-card {
  @apply bg-white 
         border-4 border-black 
         shadow-brutal 
         p-6;
}

.neo-input {
  @apply px-4 py-3 
         border-4 border-black 
         text-lg font-bold 
         w-full 
         focus:outline-none 
         focus:shadow-brutal;
}
```

---

## 5️⃣ 확장 방법

### 🚀 새로운 계산기 추가하기

#### 예시: 월급 실수령액 계산기

**1단계: 폴더 및 파일 생성**
```bash
mkdir app/(money)/salary
touch app/(money)/salary/page.tsx
touch app/(money)/salary/salaryCalculator.ts
```

**2단계: 계산 로직 작성 (`salaryCalculator.ts`)**
```typescript
export interface SalaryInput {
  annualSalary: number;  // 연봉
}

export interface SalaryResult {
  monthlySalary: number;      // 월급
  nationalPension: number;    // 국민연금
  healthInsurance: number;    // 건강보험
  employmentInsurance: number; // 고용보험
  incomeTax: number;          // 소득세
  netSalary: number;          // 실수령액
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const monthly = input.annualSalary / 12;
  
  // 4대 보험 계산
  const nationalPension = monthly * 0.045;
  const healthInsurance = monthly * 0.03545;
  const employmentInsurance = monthly * 0.009;
  
  // 간이세액표 기준 소득세 (간단 계산)
  const incomeTax = monthly * 0.07;
  
  const netSalary = monthly - (
    nationalPension + 
    healthInsurance + 
    employmentInsurance + 
    incomeTax
  );
  
  return {
    monthlySalary: Math.round(monthly),
    nationalPension: Math.round(nationalPension),
    healthInsurance: Math.round(healthInsurance),
    employmentInsurance: Math.round(employmentInsurance),
    incomeTax: Math.round(incomeTax),
    netSalary: Math.round(netSalary),
  };
}
```

**3단계: UI 작성 (`page.tsx`)**
```typescript
"use client";

import { useState } from "react";
import { calculateSalary, type SalaryResult } from "./salaryCalculator";

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState(50000000);
  const [result, setResult] = useState<SalaryResult | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateSalary({ annualSalary });
    setResult(calculatedResult);
  };

  return (
    <div className="neo-card">
      <h1 className="text-4xl font-black mb-4">💸 월급 실수령액 계산기</h1>
      
      <input
        type="number"
        value={annualSalary}
        onChange={(e) => setAnnualSalary(Number(e.target.value))}
        className="neo-input"
      />
      
      <button onClick={handleCalculate} className="neo-button">
        계산하기
      </button>
      
      {result && (
        <div className="mt-6">
          <p>실수령액: {result.netSalary.toLocaleString()}원</p>
        </div>
      )}
    </div>
  );
}
```

**4단계: 네비게이션에 추가 (`app/layout.tsx`)**
```typescript
<a href="/(money)/salary" className="hover:underline">💸 월급계산</a>
```

---

### 📊 차트 커스터마이징

#### Recharts 색상 변경

```typescript
<Pie
  data={chartData}
  cx="50%"
  cy="50%"
  innerRadius={60}
  outerRadius={90}
>
  {chartData.map((entry, index) => (
    <Cell 
      key={`cell-${index}`} 
      fill={entry.color} 
      stroke="#000"      // 검은 테두리
      strokeWidth={3}    // 두께 3px
    />
  ))}
</Pie>
```

#### 툴팁 스타일링

```typescript
<Tooltip
  formatter={(value: number) => formatKRW(value)}
  contentStyle={{
    border: "3px solid black",
    fontWeight: "bold",
    backgroundColor: "#FFE500",  // 노란색 배경
  }}
/>
```

---

### 🎨 새로운 컬러 추가

**`tailwind.config.ts` 수정:**
```typescript
colors: {
  'neo-orange': '#FF8C42',
  'neo-red': '#FF5757',
}
```

**사용:**
```tsx
<div className="bg-neo-orange border-4 border-black">
  새로운 오렌지 카드!
</div>
```

---

## 🐛 디버깅 팁

### 1. 계산 결과가 이상할 때

**문제:** 이자가 음수로 나오거나 이상한 값
**해결:** 입력값 검증 추가

```typescript
if (principal <= 0 || interestRate <= 0 || period <= 0) {
  alert("입력값을 확인해주세요!");
  return;
}
```

### 2. 차트가 안 보일 때

**문제:** Recharts가 렌더링되지 않음
**해결:** `"use client"` 추가 확인

```typescript
"use client";  // ← 이게 파일 최상단에 있어야 함!

import { PieChart } from "recharts";
```

### 3. 스타일이 적용되지 않을 때

**문제:** Tailwind 클래스가 작동하지 않음
**해결:** `tailwind.config.ts`의 `content` 경로 확인

```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",  // ← 모든 app 폴더 포함
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
```

---

## 📚 참고 자료

### 공식 문서
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Recharts 공식 문서](https://recharts.org/en-US/)

### 디자인 참고
- [Gumroad](https://gumroad.com) - 네오 브루탈리즘 사례
- [Figma Community](https://www.figma.com/community) - 네오 브루탈 템플릿

---

## 💡 다음 단계

1. ✅ **대출 계산기** (완료!)
2. 🔄 **점심 메뉴 슬롯머신** (다음 목표)
3. 📊 **VS 분석실** (비교 도구)

**미란님, 화이팅! 🚀**
