// 월급 실수령액 계산 로직

export interface SalaryInput {
    annualSalary: number; // 연봉
}

export interface SalaryResult {
    monthlySalary: number; // 월급 (세전)
    nationalPension: number; // 국민연금 (4.5%)
    healthInsurance: number; // 건강보험 (3.545%)
    longTermCare: number; // 장기요양보험 (건강보험의 12.95%)
    employmentInsurance: number; // 고용보험 (0.9%)
    incomeTax: number; // 소득세 (간이세액표 기준)
    localIncomeTax: number; // 지방소득세 (소득세의 10%)
    totalDeduction: number; // 총 공제액
    netSalary: number; // 실수령액
}

/**
 * 월급 실수령액 계산
 * @param input 연봉 정보
 * @returns 실수령액 및 공제 내역
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
    const { annualSalary } = input;

    // 월급 (세전)
    const monthlySalary = Math.round(annualSalary / 12);

    // 4대 보험 계산
    const nationalPension = Math.round(monthlySalary * 0.045); // 국민연금 4.5%
    const healthInsurance = Math.round(monthlySalary * 0.03545); // 건강보험 3.545%
    const longTermCare = Math.round(healthInsurance * 0.1295); // 장기요양 (건강보험의 12.95%)
    const employmentInsurance = Math.round(monthlySalary * 0.009); // 고용보험 0.9%

    // 소득세 계산 (간이세액표 기준 - 단순화)
    let incomeTax = 0;
    if (monthlySalary <= 1060000) {
        incomeTax = Math.round(monthlySalary * 0.006);
    } else if (monthlySalary <= 2060000) {
        incomeTax = Math.round(monthlySalary * 0.024);
    } else if (monthlySalary <= 3060000) {
        incomeTax = Math.round(monthlySalary * 0.035);
    } else if (monthlySalary <= 5060000) {
        incomeTax = Math.round(monthlySalary * 0.045);
    } else if (monthlySalary <= 7060000) {
        incomeTax = Math.round(monthlySalary * 0.055);
    } else {
        incomeTax = Math.round(monthlySalary * 0.065);
    }

    // 지방소득세 (소득세의 10%)
    const localIncomeTax = Math.round(incomeTax * 0.1);

    // 총 공제액
    const totalDeduction =
        nationalPension +
        healthInsurance +
        longTermCare +
        employmentInsurance +
        incomeTax +
        localIncomeTax;

    // 실수령액
    const netSalary = monthlySalary - totalDeduction;

    return {
        monthlySalary,
        nationalPension,
        healthInsurance,
        longTermCare,
        employmentInsurance,
        incomeTax,
        localIncomeTax,
        totalDeduction,
        netSalary,
    };
}

/**
 * 금액을 한국 원화 형식으로 포맷
 */
export function formatKRW(amount: number): string {
    return `${amount.toLocaleString()}원`;
}

/**
 * 실수령액을 치킨으로 환산
 */
export function convertToChicken(amount: number): number {
    return Math.floor(amount / 20000);
}

/**
 * 실수령액을 커피로 환산
 */
export function convertToCoffee(amount: number): number {
    return Math.floor(amount / 4500);
}
