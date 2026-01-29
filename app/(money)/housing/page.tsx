"use client";

import { useState } from "react";
import {
    calculateHousing,
    formatKRW,
    getEncouragementMessage,
    type HousingResult,
} from "./housingCalculator";
import {
    HomeIcon,
    CalculatorIcon,
    ChartBarIcon,
    SparklesIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HousingCalculatorPage() {
    const [annualSalary, setAnnualSalary] = useState<number>(50000000);
    const [targetAmount, setTargetAmount] = useState<number>(500000000); // 5억
    const [monthlySavings, setMonthlySavings] = useState<number>(2000000); // 200만원
    const [currentSavings, setCurrentSavings] = useState<number>(0);
    const [result, setResult] = useState<HousingResult | null>(null);

    const handleCalculate = () => {
        const calculatedResult = calculateHousing({
            annualSalary,
            targetAmount,
            monthlySavings,
            currentSavings,
        });
        setResult(calculatedResult);
    };

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-pink">
                <div className="flex items-center gap-3 mb-2">
                    <HomeIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">🏠 내 연봉으로 집 사기</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    서울 아파트 구매까지 얼마나 걸릴까?
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 영역 */}
                <div className="bento-card space-y-5">
                    <h2 className="text-xl font-black pb-2 flex items-center gap-2">
                        <CalculatorIcon className="w-6 h-6" />
                        <span>정보 입력</span>
                    </h2>

                    {/* 연봉 */}
                    <div>
                        <label className="block font-bold text-base mb-2">연봉 (원)</label>
                        <input
                            type="number"
                            value={annualSalary}
                            onChange={(e) => setAnnualSalary(Number(e.target.value))}
                            className="neo-input"
                            placeholder="50000000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">{formatKRW(annualSalary)}</p>
                    </div>

                    {/* 목표 금액 */}
                    <div>
                        <label className="block font-bold text-base mb-2">목표 금액 (집 가격)</label>
                        <input
                            type="number"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(Number(e.target.value))}
                            className="neo-input"
                            placeholder="500000000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">{formatKRW(targetAmount)}</p>
                    </div>

                    {/* 빠른 선택 */}
                    <div>
                        <label className="block font-bold text-base mb-2">빠른 선택</label>
                        <div className="grid grid-cols-2 gap-2">
                            {[300000000, 500000000, 700000000, 1000000000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setTargetAmount(amount)}
                                    className={`py-2 px-2 border border-slate-900 font-bold text-xs transition-all duration-300 ${targetAmount === amount
                                        ? "bg-pastel-yellow -translate-y-1 shadow-bento-hover"
                                        : "bg-white hover:-translate-y-0.5 shadow-bento"
                                        }`}
                                >
                                    {amount / 100000000}억원
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 월 저축액 */}
                    <div>
                        <label className="block font-bold text-base mb-2">월 저축액 (원)</label>
                        <input
                            type="number"
                            value={monthlySavings}
                            onChange={(e) => setMonthlySavings(Number(e.target.value))}
                            className="neo-input"
                            placeholder="2000000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">{formatKRW(monthlySavings)}</p>
                    </div>

                    {/* 현재 저축액 */}
                    <div>
                        <label className="block font-bold text-base mb-2">현재 저축액 (원)</label>
                        <input
                            type="number"
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(Number(e.target.value))}
                            className="neo-input"
                            placeholder="0"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">{formatKRW(currentSavings)}</p>
                    </div>

                    {/* 계산 버튼 */}
                    <button
                        onClick={handleCalculate}
                        className="w-full py-4 px-6 bg-pastel-purple border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2"
                    >
                        <SparklesIcon className="w-6 h-6" />
                        <span>계산하기</span>
                    </button>
                </div>

                {/* 결과 영역 */}
                <div className="space-y-5">
                    {result ? (
                        <>
                            {/* 목표 달성 기간 */}
                            <div className="result-card bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <CalendarIcon className="w-6 h-6" />
                                    <span>목표 달성 기간</span>
                                </h2>
                                <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 text-center">
                                    <p className="font-bold text-base mb-2">집 구매까지</p>
                                    <p className="font-black text-5xl text-blue-600">
                                        {result.yearsNeeded}년 {result.monthsNeeded % 12}개월
                                    </p>
                                    <p className="text-sm text-slate-600 mt-3">
                                        총 {result.monthsNeeded}개월
                                    </p>
                                </div>
                            </div>

                            {/* 격려 메시지 */}
                            <div className="result-card bg-pastel-yellow">
                                <div className="text-center">
                                    <p className="text-2xl mb-2">💪</p>
                                    <p className="font-black text-lg">
                                        {getEncouragementMessage(result.yearsNeeded)}
                                    </p>
                                </div>
                            </div>

                            {/* 진행률 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4">📊 현재 진행률</h3>
                                <div className="space-y-3">
                                    <div className="relative w-full h-8 bg-slate-200 rounded border-2 border-slate-900 overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pastel-blue to-pastel-purple transition-all duration-500"
                                            style={{ width: `${result.progressPercentage}%` }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-black text-sm">{result.progressPercentage}%</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="p-2 bg-pastel-blue rounded">
                                            <p className="font-bold">현재 저축액</p>
                                            <p className="font-black">{formatKRW(currentSavings)}</p>
                                        </div>
                                        <div className="p-2 bg-pastel-pink rounded">
                                            <p className="font-bold">목표 금액</p>
                                            <p className="font-black">{formatKRW(targetAmount)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 월별 저축 추이 */}
                            {result.monthlyData.length > 0 && (
                                <div className="result-card bg-white">
                                    <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                        <ChartBarIcon className="w-5 h-5" />
                                        <span>저축 추이 (최대 5년)</span>
                                    </h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={result.monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" label={{ value: "개월", position: "insideBottomRight", offset: -5 }} />
                                            <YAxis tickFormatter={(value) => `${(value / 100000000).toFixed(1)}억`} />
                                            <Tooltip formatter={(value: number) => formatKRW(value)} />
                                            <Line type="monotone" dataKey="accumulated" stroke="#3B82F6" strokeWidth={3} name="누적 저축액" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* 요약 정보 */}
                            <div className="result-card bg-pastel-green">
                                <h3 className="text-lg font-black mb-3">📝 요약</h3>
                                <div className="space-y-2 text-sm font-medium">
                                    <div className="flex justify-between">
                                        <span>연봉:</span>
                                        <span className="font-black">{formatKRW(annualSalary)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>목표 금액:</span>
                                        <span className="font-black">{formatKRW(targetAmount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>월 저축액:</span>
                                        <span className="font-black">{formatKRW(monthlySavings)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>필요 기간:</span>
                                        <span className="font-black text-blue-600">
                                            {result.yearsNeeded}년 {result.monthsNeeded % 12}개월
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <HomeIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">좌측에 정보를 입력하고</p>
                                <p className="font-black text-xl text-pastel-purple">계산하기 버튼을 눌러주세요!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 팁 섹션 */}
            <div className="space-y-6">
                <div className="result-card bg-pastel-blue">
                    <h3 className="text-lg font-black mb-3">💡 저축 팁</h3>
                    <ul className="space-y-2 text-sm font-medium text-slate-800">
                        <li className="flex items-start gap-2">
                            <span className="font-black">•</span>
                            <span>월급의 <strong>30-40%</strong>를 저축하는 것이 이상적입니다.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-black">•</span>
                            <span>자동이체를 설정하면 저축이 더 쉬워집니다.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-black">•</span>
                            <span>목표 기간이 너무 길다면 월 저축액을 늘려보세요!</span>
                        </li>
                    </ul>
                </div>

                {/* 상세 가이드 섹션 */}
                <div className="pt-8 border-t-2 border-slate-200 prose prose-slate max-w-none">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-slate-200">
                        🏠 내 집 마련을 위한 필수 부동산 상식
                    </h3>

                    <div className="space-y-8">
                        <section>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">1. 집값 외에 필요한 '히든 코스트' (취득세 등)</h4>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                5억짜리 아파트를 산다고 해서 딱 5억만 필요한 게 아닙니다.
                                등기를 칠 때 내야 하는 <strong>세금과 부대비용</strong>을 반드시 예산에 포함해야 합니다.
                            </p>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
                                    <li><strong>취득세:</strong> 집값의 1~3% (생애최초 구입 시 감면 혜택 확인 필수!)</li>
                                    <li><strong>지방교육세 & 농어촌특별세:</strong> 취득세의 약 10% 수준</li>
                                    <li><strong>부동산 중개보수(복비):</strong> 거래 금액의 0.4% ~ 0.5% (협의 가능)</li>
                                    <li><strong>법무사 비용 및 채권 매입비:</strong> 등기 처리를 위한 비용</li>
                                </ul>
                                <p className="mt-3 text-xs text-blue-600 font-bold">
                                    TIP: 집값의 약 1.5% ~ 2% 정도를 여유 자금으로 준비해두세요.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">2. 공급면적 vs 전용면적, 뭐가 내 집 크기?</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-pastel-yellow bg-opacity-30 p-4 rounded-lg border border-pastel-yellow">
                                    <strong className="block text-lg text-slate-900 mb-2">전용면적 (실평수)</strong>
                                    <p className="text-sm text-slate-600">
                                        현관 안쪽, 우리가 실제로 신발 벗고 생활하는 공간입니다.
                                        아파트 <strong>84㎡(국민평형)</strong>는 보통 '32~34평형'이라고 부르지만, 실제 쓰는 공간은 약 25.7평입니다.
                                    </p>
                                </div>
                                <div className="bg-pastel-blue bg-opacity-30 p-4 rounded-lg border border-pastel-blue">
                                    <strong className="block text-lg text-slate-900 mb-2">공급면적 (분양면적)</strong>
                                    <p className="text-sm text-slate-600">
                                        전용면적 + 주거공용면적(계단, 복도, 엘리베이터 등)입니다.
                                        집값을 말할 때 흔히 쓰는 <strong>'평당 가격'</strong>은 이 공급면적을 기준으로 합니다.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">3. 임장(현장 답사) 체크리스트</h4>
                            <p className="text-slate-600 mb-4">
                                인터넷으로 시세만 보지 말고, 반드시 직접 가서 확인해야 합니다.
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✔</span> 낮과 밤, 평일과 주말의 소음 차이
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✔</span> 주차장 여유 공간 (이중 주차 여부)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✔</span> 결로, 누수 흔적 (베란다 구석 확인)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✔</span> 관리비 고지서 확인 (평균 냉난방비)
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
