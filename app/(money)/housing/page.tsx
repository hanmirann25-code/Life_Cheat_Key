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

            {/* 상세 컨텐츠 섹션 */}
            <div className="space-y-8 mt-12">
                {/* 1. 기획 의도 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🎯</span>
                        <span>기획 의도: 막연한 '내 집 마련', 숫자로 그려보세요</span>
                    </h3>
                    <p className="text-slate-700 leading-7 text-lg mb-4">
                        "서울 아파트 평균 10억시대, 월급 빼고 다 오른다."
                        뉴스만 보면 내 집 마련의 꿈은 이번 생엔 불가능해 보입니다.
                        하지만 포기하기엔 이릅니다. 중요한 건 <strong>'언제'</strong> 가능한지 아는 것입니다.
                    </p>
                    <p className="text-slate-700 leading-7 text-lg">
                        <strong>인생 치트키 주택 자금 계산기</strong>는 현재의 저축 속도로 목표 금액까지 얼마나 걸리는지 시각화해 줍니다.
                        10년이 걸린다면 저축액을 늘리거나, 현실적인 목표로 수정하며 <strong>구체적인 로드맵</strong>을 그려보세요.
                        시작이 반입니다.
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
                            <div className="w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">1</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">현실 점검</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                내 연봉과 매달 저축할 수 있는 금액, 그리고 지금까지 모은 종잣돈(시드머니)을 입력하세요.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-pink rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">2</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">목표 설정</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                사고 싶은 집의 가격을 입력하세요.
                                <span className="text-xs text-slate-500 block mt-1">(예: 서울 노원구 20평대 6억 등)</span>
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">3</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">미래 확인</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                목표 달성까지 걸리는 시간과 저축 그래프를 확인하고, 기간을 단축하려면 월 저축액을 얼마나 늘려야 할지 고민해보세요.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. 관련 지식 (기존 내용 보강) */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">📚</span>
                        <span>부린이 탈출을 위한 필수 지식</span>
                    </h3>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="bg-yellow-100 px-2 py-1 rounded text-base">💰</span>
                                집값만 모으면 끝? (히든 코스트)
                            </h4>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                5억짜리 아파트를 산다고 5억만 있으면 안 됩니다. 등기를 치는 순간 '세금'과 '비용'이 발생합니다.
                                예산을 짤 때 반드시 <strong>집값의 2% 정도</strong>는 여유 자금으로 남겨둬야 합니다.
                            </p>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex justify-between border-b border-slate-200 pb-2">
                                        <span><strong>취득세</strong> (가장 큼)</span>
                                        <span className="text-slate-500">집값의 1~3% (생애최초 감면 체크!)</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-200 pb-2">
                                        <span><strong>부동산 중개수수료</strong> (복비)</span>
                                        <span className="text-slate-500">최대 0.4~0.5% (협의 가능)</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-200 pb-2">
                                        <span><strong>법무사비 & 채권할인료</strong></span>
                                        <span className="text-slate-500">등기 대행 수수료 등</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">📏 전용면적 vs 공급면적</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <strong className="block text-lg text-blue-900 mb-2">전용면적 (실평수)</strong>
                                    <p className="text-sm text-slate-600">
                                        <strong>"내가 신발 벗고 밟는 땅"</strong>
                                        <br />
                                        현관 안쪽의 거실, 방, 화장실, 주방 크기입니다. (발코니는 서비스 면적이라 제외!)
                                        <br />
                                        <span className="text-xs text-blue-500 mt-1 block">* 84㎡(국민평형) = 약 25.7평</span>
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <strong className="block text-lg text-green-900 mb-2">공급면적 (분양평수)</strong>
                                    <p className="text-sm text-slate-600">
                                        <strong>"엘리베이터와 계단 포함"</strong>
                                        <br />
                                        전용면적 + 주거공용면적입니다.
                                        우리가 흔히 말하는 "34평 아파트"는 이 면적을 말합니다.
                                        <br />
                                        <span className="text-xs text-green-600 mt-1 block">* 평당 가격 계산 기준</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h4 className="font-bold text-orange-900 mb-3 text-lg">👀 임장(현장 답사) 체크리스트</h4>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-orange-800">
                                <div className="flex items-center gap-2"><span className="text-orange-500">✔</span> 낮 vs 밤 소음/치안 확인</div>
                                <div className="flex items-center gap-2"><span className="text-orange-500">✔</span> 주차장 (퇴근 시간대 방문 필수)</div>
                                <div className="flex items-center gap-2"><span className="text-orange-500">✔</span> 결로/누수 흔적 (베란다 구석)</div>
                                <div className="flex items-center gap-2"><span className="text-orange-500">✔</span> 수압 & 배수 (화장실, 싱크대)</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
