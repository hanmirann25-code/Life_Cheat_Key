"use client";

import { useState } from "react";
import {
    calculateBusiness,
    formatKRW,
    getBusinessName,
    getEvaluationMessage,
    businessPresets,
    type BusinessType,
    type BusinessResult,
} from "./businessCalculator";
import {
    BuildingStorefrontIcon,
    CalculatorIcon,
    ChartBarIcon,
    SparklesIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function BusinessCalculatorPage() {
    const [businessType, setBusinessType] = useState<BusinessType>("convenience");
    const [initialInvestment, setInitialInvestment] = useState<number>(80000000);
    const [monthlyRevenue, setMonthlyRevenue] = useState<number>(15000000);
    const [monthlyCost, setMonthlyCost] = useState<number>(12000000);
    const [result, setResult] = useState<BusinessResult | null>(null);

    const handleBusinessTypeChange = (type: BusinessType) => {
        setBusinessType(type);
        const preset = businessPresets[type];
        if (preset.initialInvestment) setInitialInvestment(preset.initialInvestment);
        if (preset.monthlyRevenue) setMonthlyRevenue(preset.monthlyRevenue);
        if (preset.monthlyCost) setMonthlyCost(preset.monthlyCost);
    };

    const handleCalculate = () => {
        const calculatedResult = calculateBusiness({
            businessType,
            initialInvestment,
            monthlyRevenue,
            monthlyCost,
        });
        setResult(calculatedResult);
    };

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-yellow">
                <div className="flex items-center gap-3 mb-2">
                    <BuildingStorefrontIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">🏪 창업 시뮬레이터</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    편의점 창업하면 순수익은 얼마? 손익분기점은 언제?
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 영역 */}
                <div className="bento-card space-y-5">
                    <h2 className="text-xl font-black pb-2 flex items-center gap-2">
                        <CalculatorIcon className="w-6 h-6" />
                        <span>창업 정보 입력</span>
                    </h2>

                    {/* 업종 선택 */}
                    <div>
                        <label className="block font-bold text-base mb-2">업종 선택</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(["convenience", "cafe", "chicken", "restaurant"] as BusinessType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleBusinessTypeChange(type)}
                                    className={`py-3 px-3 border border-slate-900 font-bold text-sm transition-all duration-300 ${businessType === type
                                        ? "bg-pastel-purple text-white -translate-y-1 shadow-bento-hover"
                                        : "bg-white hover:-translate-y-0.5 shadow-bento"
                                        }`}
                                >
                                    {getBusinessName(type)}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handleBusinessTypeChange("custom")}
                            className={`w-full mt-2 py-2 px-3 border border-slate-900 font-bold text-sm transition-all duration-300 ${businessType === "custom"
                                ? "bg-pastel-blue -translate-y-1 shadow-bento-hover"
                                : "bg-white hover:-translate-y-0.5 shadow-bento"
                                }`}
                        >
                            직접 입력
                        </button>
                    </div>

                    {/* 초기 투자금 */}
                    <div>
                        <label className="block font-bold text-base mb-2">초기 투자금 (원)</label>
                        <input
                            type="number"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(Number(e.target.value))}
                            className="neo-input"
                            placeholder="80000000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">{formatKRW(initialInvestment)}</p>
                    </div>

                    {/* 월 매출 */}
                    <div>
                        <label className="block font-bold text-base mb-2">월 매출 (원)</label>
                        <input
                            type="number"
                            value={monthlyRevenue}
                            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                            className="neo-input"
                            placeholder="15000000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">{formatKRW(monthlyRevenue)}</p>
                    </div>

                    {/* 월 비용 */}
                    <div>
                        <label className="block font-bold text-base mb-2">월 비용 (임대료, 인건비 등)</label>
                        <input
                            type="number"
                            value={monthlyCost}
                            onChange={(e) => setMonthlyCost(Number(e.target.value))}
                            className="neo-input"
                            placeholder="12000000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">{formatKRW(monthlyCost)}</p>
                    </div>

                    {/* 계산 버튼 */}
                    <button
                        onClick={handleCalculate}
                        className="w-full py-4 px-6 bg-pastel-purple border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2"
                    >
                        <SparklesIcon className="w-6 h-6" />
                        <span>시뮬레이션 시작</span>
                    </button>
                </div>

                {/* 결과 영역 */}
                <div className="space-y-5">
                    {result ? (
                        <>
                            {/* 월 순수익 */}
                            <div className="result-card bg-gradient-to-br from-pastel-green via-pastel-mint to-pastel-blue">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <TrophyIcon className="w-6 h-6" />
                                    <span>월 순수익</span>
                                </h2>
                                <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 text-center">
                                    <p className="font-bold text-base mb-2">매월 벌어들이는 금액</p>
                                    <p className={`font-black text-5xl ${result.monthlyProfit > 0 ? "text-green-600" : "text-red-600"}`}>
                                        {formatKRW(result.monthlyProfit)}
                                    </p>
                                    <p className="text-sm text-slate-600 mt-3">
                                        연간: {formatKRW(result.yearlyProfit)}
                                    </p>
                                </div>
                            </div>

                            {/* 손익분기점 */}
                            <div className="result-card bg-pastel-yellow">
                                <h3 className="text-lg font-black mb-3">⏰ 손익분기점</h3>
                                <div className="text-center">
                                    {result.monthlyProfit > 0 ? (
                                        <>
                                            <p className="font-black text-4xl text-blue-600">
                                                {result.breakEvenYears}년 {result.breakEvenMonths % 12}개월
                                            </p>
                                            <p className="text-sm text-slate-600 mt-2">
                                                총 {result.breakEvenMonths}개월 후 본전 회수
                                            </p>
                                        </>
                                    ) : (
                                        <p className="font-black text-2xl text-red-600">
                                            적자 예상 - 비용을 줄이거나 매출을 늘려야 합니다
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ROI */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-3">📊 투자 수익률 (ROI)</h3>
                                <div className="text-center">
                                    <p className={`font-black text-5xl ${result.roi > 0 ? "text-green-600" : "text-red-600"}`}>
                                        {result.roi}%
                                    </p>
                                    <p className="text-sm text-slate-600 mt-2">
                                        연간 수익률
                                    </p>
                                    <div className="mt-4 p-3 bg-pastel-blue rounded">
                                        <p className="font-bold text-sm">
                                            {getEvaluationMessage(result.roi)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 누적 수익 차트 */}
                            {result.monthlyData.length > 0 && (
                                <div className="result-card bg-white">
                                    <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                        <ChartBarIcon className="w-5 h-5" />
                                        <span>누적 수익 추이</span>
                                    </h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={result.monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" label={{ value: "개월", position: "insideBottomRight", offset: -5 }} />
                                            <YAxis tickFormatter={(value) => `${(value / 10000000).toFixed(0)}천`} />
                                            <Tooltip formatter={(value: number) => formatKRW(value)} />
                                            <ReferenceLine y={0} stroke="#000" strokeWidth={2} strokeDasharray="3 3" label="손익분기점" />
                                            <Line type="monotone" dataKey="accumulated" stroke="#9333EA" strokeWidth={3} name="누적 수익" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* 요약 */}
                            <div className="result-card bg-pink-500 text-white">
                                <h3 className="text-lg font-black mb-3">📝 요약</h3>
                                <div className="space-y-2 text-sm font-medium">
                                    <div className="flex justify-between">
                                        <span>업종:</span>
                                        <span className="font-black">{getBusinessName(businessType)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>초기 투자금:</span>
                                        <span className="font-black">{formatKRW(initialInvestment)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>월 매출:</span>
                                        <span className="font-black">{formatKRW(monthlyRevenue)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>월 비용:</span>
                                        <span className="font-black">{formatKRW(monthlyCost)}</span>
                                    </div>
                                    <div className="flex justify-between border-t-2 border-white pt-2 mt-2">
                                        <span>월 순수익:</span>
                                        <span className={`font-black ${result.monthlyProfit > 0 ? "" : "text-red-300"}`}>
                                            {formatKRW(result.monthlyProfit)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <BuildingStorefrontIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">좌측에 정보를 입력하고</p>
                                <p className="font-black text-xl text-pastel-purple">시뮬레이션을 시작하세요!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 안내 섹션 */}
            <div className="result-card bg-pastel-blue">
                <h3 className="text-lg font-black mb-3">💡 알아두세요</h3>
                <ul className="space-y-2 text-sm font-medium text-slate-800">
                    <li className="flex items-start gap-2">
                        <span className="font-black">•</span>
                        <span>이 시뮬레이터는 <strong>간단한 계산</strong>을 위한 것으로, 실제 창업 시에는 더 많은 요소를 고려해야 합니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-black">•</span>
                        <span>월 비용에는 임대료, 인건비, 재료비, 공과금 등이 포함됩니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-black">•</span>
                        <span>업종별 기본값은 평균적인 수치이며, 지역과 상황에 따라 다를 수 있습니다.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
