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
            <div className="result-card bg-pastel-blue">
                <h3 className="text-lg font-black mb-3 flex items-center gap-2">
                    <InformationCircleIcon className="w-5 h-5" />
                    <span>💡 알아두세요</span>
                </h3>
                <ul className="space-y-2 text-sm font-medium text-slate-800">
                    <li className="flex items-start gap-2">
                        <span className="font-black">•</span>
                        <span>이 계산기는 <strong>간이세액표</strong>를 기준으로 한 <strong>근사값</strong>입니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-black">•</span>
                        <span>실제 급여는 부양가족 수, 비과세 항목 등에 따라 달라질 수 있습니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="font-black">•</span>
                        <span>4대 보험료는 2024년 기준 요율을 적용했습니다.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
