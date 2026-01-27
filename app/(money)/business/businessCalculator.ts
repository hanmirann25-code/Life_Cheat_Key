// 창업 시뮬레이터 로직

export type BusinessType = "convenience" | "cafe" | "chicken" | "restaurant" | "custom";

export interface BusinessInput {
    businessType: BusinessType;
    initialInvestment: number; // 초기 투자금
    monthlyRevenue: number; // 월 매출
    monthlyCost: number; // 월 비용 (임대료, 인건비, 재료비 등)
}

export interface BusinessResult {
    monthlyProfit: number; // 월 순수익
    breakEvenMonths: number; // 손익분기점 (개월)
    breakEvenYears: number; // 손익분기점 (년)
    yearlyProfit: number; // 연간 순수익
    roi: number; // 투자 수익률 (%)
    monthlyData: MonthlyBusiness[]; // 월별 데이터
}

export interface MonthlyBusiness {
    month: number;
    accumulated: number; // 누적 수익
    isBreakEven: boolean; // 손익분기점 도달 여부
}

/**
 * 업종별 기본 데이터
 */
export const businessPresets: Record<BusinessType, Partial<BusinessInput>> = {
    convenience: {
        initialInvestment: 80000000, // 8천만원
        monthlyRevenue: 15000000, // 1500만원
        monthlyCost: 12000000, // 1200만원
    },
    cafe: {
        initialInvestment: 100000000, // 1억
        monthlyRevenue: 12000000, // 1200만원
        monthlyCost: 9000000, // 900만원
    },
    chicken: {
        initialInvestment: 50000000, // 5천만원
        monthlyRevenue: 10000000, // 1000만원
        monthlyCost: 7000000, // 700만원
    },
    restaurant: {
        initialInvestment: 120000000, // 1.2억
        monthlyRevenue: 18000000, // 1800만원
        monthlyCost: 14000000, // 1400만원
    },
    custom: {
        initialInvestment: 0,
        monthlyRevenue: 0,
        monthlyCost: 0,
    },
};

/**
 * 창업 시뮬레이션 계산
 */
export function calculateBusiness(input: BusinessInput): BusinessResult {
    const { initialInvestment, monthlyRevenue, monthlyCost } = input;

    // 월 순수익
    const monthlyProfit = monthlyRevenue - monthlyCost;

    // 손익분기점 (개월)
    const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(initialInvestment / monthlyProfit) : 0;

    // 손익분기점 (년)
    const breakEvenYears = Math.floor(breakEvenMonths / 12);

    // 연간 순수익
    const yearlyProfit = monthlyProfit * 12;

    // 투자 수익률 (ROI)
    const roi = initialInvestment > 0 ? Math.round((yearlyProfit / initialInvestment) * 100) : 0;

    // 월별 데이터 (최대 60개월)
    const monthlyData: MonthlyBusiness[] = [];
    const maxMonths = Math.min(breakEvenMonths + 12, 60);

    for (let i = 1; i <= maxMonths; i++) {
        const accumulated = monthlyProfit * i - initialInvestment;
        const isBreakEven = accumulated >= 0;

        monthlyData.push({
            month: i,
            accumulated,
            isBreakEven,
        });
    }

    return {
        monthlyProfit,
        breakEvenMonths,
        breakEvenYears,
        yearlyProfit,
        roi,
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
 * 업종 이름 가져오기
 */
export function getBusinessName(type: BusinessType): string {
    const names: Record<BusinessType, string> = {
        convenience: "편의점",
        cafe: "카페",
        chicken: "치킨집",
        restaurant: "음식점",
        custom: "직접 입력",
    };
    return names[type];
}

/**
 * 평가 메시지 생성
 */
export function getEvaluationMessage(roi: number): string {
    if (roi >= 30) {
        return "🎉 매우 좋은 수익률이에요! 창업 추천!";
    } else if (roi >= 20) {
        return "💪 괜찮은 수익률이에요! 고려해볼 만해요!";
    } else if (roi >= 10) {
        return "🤔 평범한 수익률이에요. 신중하게 결정하세요.";
    } else if (roi > 0) {
        return "⚠️ 낮은 수익률이에요. 다시 계산해보세요.";
    } else {
        return "❌ 적자가 예상됩니다. 비용을 줄이거나 매출을 늘려야 해요!";
    }
}
