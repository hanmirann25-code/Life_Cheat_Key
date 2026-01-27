// 집 구매 시뮬레이션 로직

export interface HousingInput {
    annualSalary: number; // 연봉
    targetAmount: number; // 목표 금액 (집 가격)
    monthlySavings: number; // 월 저축액
    currentSavings: number; // 현재 저축액
}

export interface HousingResult {
    monthsNeeded: number; // 필요한 개월 수
    yearsNeeded: number; // 필요한 년 수
    totalSaved: number; // 총 저축액
    progressPercentage: number; // 진행률 (%)
    monthlyData: MonthlyProgress[]; // 월별 진행 상황
}

export interface MonthlyProgress {
    month: number;
    accumulated: number;
    percentage: number;
}

/**
 * 집 구매 시뮬레이션 계산
 */
export function calculateHousing(input: HousingInput): HousingResult {
    const { targetAmount, monthlySavings, currentSavings } = input;

    // 남은 금액
    const remainingAmount = targetAmount - currentSavings;

    // 필요한 개월 수
    const monthsNeeded = Math.ceil(remainingAmount / monthlySavings);

    // 년 수
    const yearsNeeded = Math.floor(monthsNeeded / 12);

    // 총 저축액
    const totalSaved = currentSavings + monthlySavings * monthsNeeded;

    // 진행률
    const progressPercentage = Math.round((currentSavings / targetAmount) * 100);

    // 월별 데이터 (최대 60개월까지만 표시)
    const monthlyData: MonthlyProgress[] = [];
    const maxMonths = Math.min(monthsNeeded, 60);

    for (let i = 0; i <= maxMonths; i++) {
        const accumulated = currentSavings + monthlySavings * i;
        const percentage = Math.min(Math.round((accumulated / targetAmount) * 100), 100);

        monthlyData.push({
            month: i,
            accumulated,
            percentage,
        });
    }

    return {
        monthsNeeded,
        yearsNeeded,
        totalSaved,
        progressPercentage,
        monthlyData,
    };
}

/**
 * 금액을 한국 원화 형식으로 포맷
 */
export function formatKRW(amount: number): string {
    return `${amount.toLocaleString()}원`;
}

/**
 * 격려 메시지 생성
 */
export function getEncouragementMessage(yearsNeeded: number): string {
    if (yearsNeeded <= 3) {
        return "🎉 3년 안에 가능해요! 조금만 더 힘내세요!";
    } else if (yearsNeeded <= 5) {
        return "💪 5년이면 충분해요! 꾸준히 저축하면 됩니다!";
    } else if (yearsNeeded <= 10) {
        return "🌟 10년 안에 가능해요! 장기 플랜으로 차근차근!";
    } else {
        return "🏠 시간이 걸리지만 포기하지 마세요! 월 저축액을 늘려보는 건 어떨까요?";
    }
}
