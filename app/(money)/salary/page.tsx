"use client";

import { useState } from "react";
import {
    calculateSalary,
    formatKRW,
    convertToChicken,
    convertToCoffee,
    type SalaryResult,
} from "./salaryCalculator";
import {
    CurrencyDollarIcon,
    CalculatorIcon,
    ChartPieIcon,
    SparklesIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function SalaryCalculatorPage() {
    const [annualSalary, setAnnualSalary] = useState<number>(50000000); // 5천만원
    const [result, setResult] = useState<SalaryResult | null>(null);

    const handleCalculate = () => {
        const calculatedResult = calculateSalary({ annualSalary });
        setResult(calculatedResult);
    };

    // 도넛 차트 데이터
    const chartData = result
        ? [
            { name: "실수령액", value: result.netSalary, color: "#D4F1FF" },
            { name: "4대 보험", value: result.nationalPension + result.healthInsurance + result.longTermCare + result.employmentInsurance, color: "#FFE5D4" },
            { name: "세금", value: result.incomeTax + result.localIncomeTax, color: "#E8D4FF" },
        ]
        : [];

    const chickenCount = result ? convertToChicken(result.netSalary) : 0;
    const coffeeCount = result ? convertToCoffee(result.netSalary) : 0;

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-green via-pastel-mint to-pastel-blue">
                <div className="flex items-center gap-3 mb-2">
                    <CurrencyDollarIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">💸 월급 실수령액 계산기</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    4대 보험 공제 후 실제 통장에 들어오는 금액은?
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 영역 */}
                <div className="bento-card space-y-5">
                    <h2 className="text-xl font-black pb-2 flex items-center gap-2">
                        <CalculatorIcon className="w-6 h-6" />
                        <span>연봉 입력</span>
                    </h2>

                    {/* 연봉 입력 */}
                    <div>
                        <label className="block font-bold text-base mb-2">연봉 (원)</label>
                        <input
                            type="number"
                            value={annualSalary}
                            onChange={(e) => setAnnualSalary(Number(e.target.value))}
                            className="neo-input"
                            placeholder="50000000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600 flex items-center gap-1">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            {formatKRW(annualSalary)}
                        </p>
                    </div>

                    {/* 빠른 선택 버튼 */}
                    <div>
                        <label className="block font-bold text-base mb-2">빠른 선택</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[30000000, 40000000, 50000000, 60000000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setAnnualSalary(amount)}
                                    className={`py-2 px-3 border border-slate-900 font-bold text-sm transition-all duration-300 ${annualSalary === amount
                                        ? "bg-pastel-blue -translate-y-1 shadow-bento-hover"
                                        : "bg-white hover:-translate-y-0.5 shadow-bento"
                                        }`}
                                >
                                    {(amount / 10000000).toFixed(0)}천만원
                                </button>
                            ))}
                        </div>
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
                            {/* 실수령액 카드 */}
                            <div className="result-card bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <ChartPieIcon className="w-6 h-6" />
                                    <span>실수령액</span>
                                </h2>
                                <div className="bg-white bg-opacity-70 p-4 rounded border border-slate-900 text-center">
                                    <p className="font-bold text-base mb-2">월 실수령액</p>
                                    <p className="font-black text-4xl text-green-600">
                                        {formatKRW(result.netSalary)}
                                    </p>
                                    <p className="text-sm text-slate-600 mt-2">
                                        세전 월급: {formatKRW(result.monthlySalary)}
                                    </p>
                                </div>
                            </div>

                            {/* 공제 내역 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4">📋 공제 내역</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-2 bg-pastel-yellow rounded">
                                        <span className="font-bold text-sm">국민연금 (4.5%)</span>
                                        <span className="font-black">{formatKRW(result.nationalPension)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-pastel-blue rounded">
                                        <span className="font-bold text-sm">건강보험 (3.545%)</span>
                                        <span className="font-black">{formatKRW(result.healthInsurance)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-pastel-mint rounded">
                                        <span className="font-bold text-sm">장기요양 (0.46%)</span>
                                        <span className="font-black">{formatKRW(result.longTermCare)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-pastel-green rounded">
                                        <span className="font-bold text-sm">고용보험 (0.9%)</span>
                                        <span className="font-black">{formatKRW(result.employmentInsurance)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-pastel-pink rounded">
                                        <span className="font-bold text-sm">소득세</span>
                                        <span className="font-black">{formatKRW(result.incomeTax)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-pastel-purple rounded">
                                        <span className="font-bold text-sm">지방소득세</span>
                                        <span className="font-black">{formatKRW(result.localIncomeTax)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-slate-100 rounded border-2 border-slate-900 mt-3">
                                        <span className="font-black text-base">총 공제액</span>
                                        <span className="font-black text-lg text-red-600">
                                            {formatKRW(result.totalDeduction)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 환산 카드 */}
                            <div className="result-card bg-pastel-yellow">
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <SparklesIcon className="w-5 h-5" />
                                    <span>실수령액을 환산하면?</span>
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white bg-opacity-70 p-3 rounded border border-slate-900 text-center">
                                        <p className="text-3xl mb-1">🍗</p>
                                        <p className="font-black text-2xl">{chickenCount.toLocaleString()}</p>
                                        <p className="text-xs text-slate-600 mt-1">마리 (2만원)</p>
                                    </div>
                                    <div className="bg-white bg-opacity-70 p-3 rounded border border-slate-900 text-center">
                                        <p className="text-3xl mb-1">☕</p>
                                        <p className="font-black text-2xl">{coffeeCount.toLocaleString()}</p>
                                        <p className="text-xs text-slate-600 mt-1">잔 (4,500원)</p>
                                    </div>
                                </div>
                            </div>

                            {/* 차트 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <ChartPieIcon className="w-5 h-5" />
                                    <span>월급 구성</span>
                                </h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number) => formatKRW(value)}
                                            contentStyle={{
                                                border: "1px solid #0f172a",
                                                fontWeight: "bold",
                                                borderRadius: "4px",
                                            }}
                                        />
                                        <Legend wrapperStyle={{ fontWeight: "bold", fontSize: "14px" }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <CalculatorIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">좌측에 연봉을 입력하고</p>
                                <p className="font-black text-xl text-pastel-purple">계산하기 버튼을 눌러주세요!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 설명 섹션 */}
            <div className="space-y-6">
                <div className="result-card bg-pastel-blue">
                    <h3 className="text-lg font-black mb-3 flex items-center gap-2">
                        <InformationCircleIcon className="w-5 h-5" />
                        <span>💡 알아두세요</span>
                    </h3>
                    <ul className="space-y-2 text-sm font-medium text-slate-800">
                        <li className="flex items-start gap-2">
                            <span className="font-black">•</span>
                            <span>이 계산기는 <strong>2026년 기준 간이세액표</strong>를 반영한 <strong>근사값</strong>입니다.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-black">•</span>
                            <span>실제 급여는 부양가족 수, 6세 이하 자녀 수, 비과세 식대 등에 따라 달라질 수 있습니다.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-black">•</span>
                            <span>국민연금은 월 소득 상한액(590만원)이 적용되어 그 이상 소득이어도 보험료가 동일합니다.</span>
                        </li>
                    </ul>
                </div>

                {/* 상세 가이드 섹션 */}
                <div className="pt-8 border-t-2 border-slate-200 prose prose-slate max-w-none">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-slate-200">
                        💰 연봉 실수령액 완전 정복 가이드
                    </h3>

                    <div className="space-y-8">
                        <section>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">1. "연봉 5천인데 왜 월 350만원이죠?"</h4>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                많은 사회초년생들이 첫 월급을 받고 당황합니다. 계약서엔 분명 연봉 5,000만원(월 416만원)이라고 적혀있는데,
                                실제 통장에 찍히는 돈은 350만원 남짓이기 때문이죠.
                                범인은 바로 <strong>4대 보험</strong>과 <strong>세금</strong>입니다.
                                월급은 내 통장에 오기 전에 '원천징수'라는 정거장을 거치며 다이어트를 하게 됩니다.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">2. 내 월급을 떼어가는 4대 보험의 정체</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <strong className="block text-lg text-slate-900 mb-1">국민연금 (4.5%)</strong>
                                    <p className="text-sm text-slate-600">
                                        나이가 들어 은퇴했을 때를 위해 미리 저축하는 돈입니다.
                                        회사가 절반, 내가 절반을 냅니다. (총 9%)
                                        <br />
                                        <span className="text-xs text-slate-500">* 월 소득 상한액이 있어 고소득자도 최대 납부액이 정해져 있습니다.</span>
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <strong className="block text-lg text-slate-900 mb-1">건강보험 (3.545%)</strong>
                                    <p className="text-sm text-slate-600">
                                        병원비 부담을 줄여주는 보험입니다. 역시 회사와 반반 부담합니다.
                                        여기에 건강보험료의 12.81%가 <strong>장기요양보험료</strong>로 추가됩니다.
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <strong className="block text-lg text-slate-900 mb-1">고용보험 (0.9%)</strong>
                                    <p className="text-sm text-slate-600">
                                        실직했을 때 실업급여를 받을 수 있게 해주는 보험입니다.
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <strong className="block text-lg text-slate-900 mb-1">산재보험 (회사부담)</strong>
                                    <p className="text-sm text-slate-600">
                                        일하다 다쳤을 때를 대비한 보험으로, <strong>100% 회사가 냅니다.</strong>
                                        내 월급에선 빠져나가지 않으니 안심하세요!
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">3. 소득세와 13월의 월급</h4>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                4대 보험 외에도 <strong>소득세</strong>와 <strong>지방소득세(소득세의 10%)</strong>를 냅니다.
                                매달 떼가는 세금은 '간이세액표'에 따른 대략적인 금액입니다.
                                <br /><br />
                                정확한 세금은 1년 치 소득과 지출을 확정한 뒤, 다음 해 2월 <strong>연말정산</strong>을 통해 계산합니다.
                                이때 미리 낸 세금이 결정된 세금보다 많으면 돌려받고(13월의 월급), 적으면 더 내야 합니다(13월의 폭탄).
                            </p>
                            <div className="bg-pastel-yellow bg-opacity-30 p-4 rounded-lg border border-pastel-yellow">
                                <h5 className="font-bold text-slate-900 mb-2">💡 세후 월급 늘리는 꿀팁</h5>
                                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                                    <li><strong>비과세 식대:</strong> 월 20만원까지는 식대에 세금을 매기지 않습니다. 회사 내규를 확인해보세요.</li>
                                    <li><strong>부양가족 등록:</strong> 부양가족이 많을수록 공제 금액이 커져 세금을 적게 냅니다.</li>
                                    <li><strong>청년소득세감면:</strong> 중소기업에 취업한 청년은 소득세의 90%를 감면받을 수도 있습니다(최대 200만원).</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
