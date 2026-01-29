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

            {/* 상세 컨텐츠 섹션 */}
            <div className="space-y-8 mt-12">
                {/* 1. 기획 의도 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🎯</span>
                        <span>기획 의도: 왜 '실수령액'이 중요할까요?</span>
                    </h3>
                    <p className="text-slate-700 leading-7 text-lg mb-4">
                        "연봉 1억"이라는 말, 참 설레는 단어입니다. 하지만 실제로 내 통장에 들어오는 돈이 얼마인지는 전혀 다른 문제입니다.
                        많은 직장인들이 입사 계약서에 적힌 연봉만 믿고 소비 계획을 세우다가, 첫 월급날 당황하곤 합니다.
                    </p>
                    <p className="text-slate-700 leading-7 text-lg">
                        <strong>인생 치트키 연봉 계산기</strong>는 복잡한 4대 보험과 세금 계산을 대신해주어,
                        여러분이 <strong>'진짜 내 돈'</strong>이 얼마인지 정확히 파악하고 현명한 재무 계획을 세울 수 있도록 돕기 위해 만들어졌습니다.
                        막연한 연봉이 아닌, 손에 잡히는 월급으로 여러분의 미래를 그려보세요.
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
                            <div className="w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center font-black text-lg mb-3 shadow-sm">1</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">연봉 입력</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">계약된 세전 연봉을 입력하세요. 퇴직금 포함 여부는 회사마다 다르니 확인이 필요합니다.</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center font-black text-lg mb-3 shadow-sm">2</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">자동 계산</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">최신 4대 보험 요율과 간이세액표를 적용해 즉시 월 예상 수령액을 보여줍니다.</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-green rounded-full flex items-center justify-center font-black text-lg mb-3 shadow-sm">3</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">결과 확인</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">공제되는 세금 항목별 상세 내역과 치킨/커피 지수를 통해 가치를 체감해보세요.</p>
                        </div>
                    </div>
                </section>

                {/* 3. 관련 지식 (기존 내용 보강) */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">�</span>
                        <span>월급 실수령액 완전 정복 가이드</span>
                    </h3>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-base font-black">Q</span>
                                "연봉 5천인데 왜 월 350밖에 안 들어오나요?"
                            </h4>
                            <p className="text-slate-600 leading-relaxed pl-4 border-l-4 border-yellow-200 bg-yellow-50/50 p-3 rounded-r-lg">
                                흔히 말하는 '세전 연봉'에서 <strong>4대 보험(약 9%)</strong>과 <strong>소득세</strong>가 원천징수되기 때문입니다.
                                국가는 소득이 발생하면 세금(소득세)을 걷어가고, 미래의 위험에 대비해 강제 저축(4대 보험)을 시킵니다.
                                이 과정을 거쳐 통장에 실제로 찍히는 돈을 '세후 월급(Net Salary)'이라고 합니다.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">💡 내 월급에서 빠져나가는 5가지</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="font-bold text-indigo-600 mb-1">1. 국민연금 (4.5%)</div>
                                    <p className="text-sm text-slate-600">은퇴 후를 위한 강제 저축. 회사가 절반을 내주어 총 9%가 적립됩니다.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="font-bold text-emerald-600 mb-1">2. 건강보험 (3.545%)</div>
                                    <p className="text-sm text-slate-600">병원비 부담을 줄여주는 보험. 역시 회사와 반반 부담합니다.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="font-bold text-emerald-700 mb-1">3. 장기요양 (건강의 12.81%)</div>
                                    <p className="text-sm text-slate-600">노인성 질환 지원을 위한 보험료로 건강보험료에 통합 고지됩니다.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="font-bold text-blue-600 mb-1">4. 고용보험 (0.9%)</div>
                                    <p className="text-sm text-slate-600">실직 시 실업급여를 받기 위한 보험입니다.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="font-bold text-rose-600 mb-1">5. 소득세 & 지방세</div>
                                    <p className="text-sm text-slate-600">국가와 지자체에 내는 세금. 연봉 수준과 부양가족에 따라 천차만별입니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h4 className="font-bold text-blue-900 mb-3 text-lg">🍯 실수령액을 높이는 Tip</h4>
                            <ul className="list-none space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span className="text-sm text-blue-900"><strong>식대 비과세:</strong> 월 20만원까지의 식대는 세금을 떼지 않습니다. 연봉 계약 시 식대 포함 여부를 확인하세요.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span className="text-sm text-blue-900"><strong>부양가족 등록:</strong> 부양가족이 있다면 원천징수 단계에서 세금을 덜 낼 수 있습니다.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span className="text-sm text-blue-900"><strong>중소기업 청년 소득세 감면:</strong> 중소기업에 재직 중인 청년(만 15~34세)은 소득세의 90%를 감면받을 수 있습니다. (연 최대 200만원)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
