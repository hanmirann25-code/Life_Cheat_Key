// 대출 계산 관련 타입 정의

export type RepaymentType = "equal" | "maturity"; // 원리금균등 vs 만기일시상환

export interface LoanInput {
  principal: number; // 대출 원금
  interestRate: number; // 연 이자율 (%)
  period: number; // 대출 기간 (개월)
  repaymentType: RepaymentType; // 상환 방식
}

export interface MonthlyPayment {
  month: number; // 회차
  principal: number; // 원금 상환액
  interest: number; // 이자
  totalPayment: number; // 월 납입액
  remainingBalance: number; // 잔액
}

export interface LoanResult {
  totalPayment: number; // 총 상환액
  totalInterest: number; // 총 이자
  monthlyPayments: MonthlyPayment[]; // 월별 상환 내역
}

/**
 * 원리금균등상환 계산
 * 매월 동일한 금액(원금+이자)을 납부하는 방식
 */
export function calculateEqualPayment(input: LoanInput): LoanResult {
  const { principal, interestRate, period } = input;
  const monthlyRate = interestRate / 100 / 12; // 월 이자율
  
  // 월 납입액 계산 공식: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, period)) /
    (Math.pow(1 + monthlyRate, period) - 1);

  const monthlyPayments: MonthlyPayment[] = [];
  let remainingBalance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= period; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    totalInterest += interestPayment;

    monthlyPayments.push({
      month,
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      totalPayment: Math.round(monthlyPayment),
      remainingBalance: Math.max(0, Math.round(remainingBalance)),
    });
  }

  return {
    totalPayment: Math.round(principal + totalInterest),
    totalInterest: Math.round(totalInterest),
    monthlyPayments,
  };
}

/**
 * 만기일시상환 계산
 * 매월 이자만 납부하고, 만기에 원금을 일시 상환하는 방식
 */
export function calculateMaturityPayment(input: LoanInput): LoanResult {
  const { principal, interestRate, period } = input;
  const monthlyRate = interestRate / 100 / 12;
  
  // 매월 이자만 납부
  const monthlyInterest = principal * monthlyRate;
  const totalInterest = monthlyInterest * period;

  const monthlyPayments: MonthlyPayment[] = [];

  for (let month = 1; month <= period; month++) {
    const isLastMonth = month === period;
    
    monthlyPayments.push({
      month,
      principal: isLastMonth ? principal : 0, // 마지막 달에만 원금 상환
      interest: Math.round(monthlyInterest),
      totalPayment: Math.round(isLastMonth ? principal + monthlyInterest : monthlyInterest),
      remainingBalance: isLastMonth ? 0 : principal,
    });
  }

  return {
    totalPayment: Math.round(principal + totalInterest),
    totalInterest: Math.round(totalInterest),
    monthlyPayments,
  };
}

/**
 * 대출 계산 메인 함수
 */
export function calculateLoan(input: LoanInput): LoanResult {
  if (input.repaymentType === "equal") {
    return calculateEqualPayment(input);
  } else {
    return calculateMaturityPayment(input);
  }
}

/**
 * 중도상환 시 절약되는 이자 계산
 */
export function calculateEarlyRepayment(
  input: LoanInput,
  earlyMonth: number,
  earlyAmount: number
): { savedInterest: number; newTotalInterest: number } {
  const originalResult = calculateLoan(input);
  
  // 중도상환 후 새로운 원금
  const remainingBalance = 
    originalResult.monthlyPayments[earlyMonth - 1]?.remainingBalance || input.principal;
  const newPrincipal = remainingBalance - earlyAmount;
  
  if (newPrincipal <= 0) {
    return {
      savedInterest: originalResult.totalInterest,
      newTotalInterest: 0,
    };
  }

  // 중도상환 후 남은 기간 계산
  const newPeriod = input.period - earlyMonth;
  const newResult = calculateLoan({
    ...input,
    principal: newPrincipal,
    period: newPeriod,
  });

  const savedInterest = originalResult.totalInterest - newResult.totalInterest;

  return {
    savedInterest: Math.round(savedInterest),
    newTotalInterest: Math.round(newResult.totalInterest),
  };
}

/**
 * 금액을 치킨으로 환산 (1마리 = 20,000원 기준)
 */
export function convertToChicken(amount: number): number {
  return Math.floor(amount / 20000);
}

/**
 * 숫자를 한국 원화 형식으로 포맷
 */
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}
