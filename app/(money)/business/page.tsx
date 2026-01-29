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

            {/* 상세 컨텐츠 섹션 */}
            <div className="space-y-8 mt-12">
                {/* 1. 기획 의도 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🎯</span>
                        <span>기획 의도: '대박' 환상 대신 '현실'을 드립니다</span>
                    </h3>
                    <p className="text-slate-700 leading-7 text-lg mb-4">
                        "회사 때려치우고 카페나 할까?" 누구나 한 번쯤 해보는 생각입니다.
                        하지만 화려한 매출 뒤에는 임대료, 인건비, 재료비, 세금이라는 거대한 <strong>고정비의 벽</strong>이 숨어있습니다.
                    </p>
                    <p className="text-slate-700 leading-7 text-lg">
                        <strong>인생 치트키 창업 시뮬레이터</strong>는 막연한 기대감을 냉정한 숫자로 바꿔드립니다.
                        월 1,000만 원 매출일 때 내 손에 쥐는 돈은 얼마인지, 투자금을 회수하려면 몇 년을 버텨야 하는지
                        미리 계산해보고 <strong>실패 없는 창업</strong>을 준비하세요.
                    </p>
                </section>

                {/* 2. 사용 방법 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🛠️</span>
                        <span>사용 방법</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">1</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">업종 선택</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                편의점, 카페, 치킨집 등 관심 있는 업종을 선택하세요.
                                <span className="text-xs text-slate-500 block mt-1">* 업종별 평균 비용이 자동 입력됩니다.</span>
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-pink rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">2</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">현실값 입력</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                예상 월 매출과 고정비(월세+관리비+인건비+재료비)를 솔직하게 입력하세요. 보수적으로 잡을수록 좋습니다.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-yellow rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">3</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">생존 분석</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                순이익, ROI, 손익분기점(BEP)을 확인하고, 몇 개월을 버텨야 흑자가 되는지 시뮬레이션 해보세요.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. 관련 지식 (기존 내용 보강) */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">📚</span>
                        <span>사장님 필수 생존 지식</span>
                    </h3>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-green-600 text-2xl">•</span>
                                "마진이 남는다"의 함정 (순이익률)
                            </h4>
                            <p className="text-slate-600 leading-relaxed pl-4 border-l-4 border-green-200">
                                장사는 '매출'이 아니라 <strong>'순이익'</strong>이 남아야 합니다.
                                천 원에 팔아서 백 원이 남으면 마진율(순이익률)은 10%입니다.
                                <br />
                                <strong>[순이익 = 매출액 - (재료비 + 인건비 + 임대료 + 세금 + 카드수수료)]</strong>
                                <br />
                                초보 사장님들이 가장 많이 놓치는 게 <strong>부가세, 종합소득세</strong>와 <strong>기기 감가상각비</strong>입니다.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">☠️ '손익분기점'을 넘겨라</h4>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <strong className="block text-lg text-slate-900 mb-2">BEP (Break-even Point)란?</strong>
                                <p className="text-slate-600 text-sm mb-4">
                                    투자한 원금을 모두 회수하는 시점을 말합니다.
                                    예를 들어 1억을 투자했는데 월 순이익이 200만 원이라면,
                                    이론적으로 <strong>50개월(4년 2개월)</strong>이 지나야 비로소 진짜 돈을 버는 셈입니다.
                                    임대 계약 기간(보통 2년) 안에 원금을 회수할 수 있는지 냉정하게 따져봐야 합니다.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-pink-50 p-5 rounded-xl border border-pink-100">
                                <h4 className="font-bold text-pink-900 mb-2">💸 부가세 (VAT) 주의보</h4>
                                <p className="text-sm text-pink-800 leading-relaxed">
                                    손님에게 받은 11,000원에서 1,000원은 내 돈이 아니라 국세청 돈입니다.
                                    통장에 들어왔다고 다 쓰면 나중에 세금 폭탄 맞습니다.
                                    <strong>부가세 통장</strong>을 따로 만들어 매일 매출의 10%를 이체해두세요.
                                </p>
                            </div>
                            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                                <h4 className="font-bold text-purple-900 mb-2">🛡️ 권리금 보호</h4>
                                <p className="text-sm text-purple-800 leading-relaxed">
                                    나중에 가게를 뺄 때 권리금을 받고 싶다면, 임대차 기간 종료 6개월 전부터 신규 세입자를 주선해야 합니다.
                                    단, 월세가 3번 이상 밀리면 권리금 보호를 못 받으니 주의하세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}
