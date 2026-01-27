"use client";

import { useState } from "react";
import {
  calculateLoan,
  convertToChicken,
  formatKRW,
  type LoanInput,
  type LoanResult,
} from "./loanCalculator";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartPieIcon,
  InformationCircleIcon,
  SparklesIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

export default function LoanCalculatorPage() {
  // 입력 상태
  const [principal, setPrincipal] = useState<number>(50000000); // 5천만원
  const [interestRate, setInterestRate] = useState<number>(4.5); // 4.5%
  const [period, setPeriod] = useState<number>(60); // 60개월 (5년)
  const [repaymentType, setRepaymentType] = useState<"equal" | "maturity">("equal");

  // 비교 모드
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);

  // 계산 결과
  const [result, setResult] = useState<LoanResult | null>(null);
  const [comparisonResult, setComparisonResult] = useState<{ equal: LoanResult, maturity: LoanResult } | null>(null);

  // 계산하기
  const handleCalculate = () => {
    if (comparisonMode) {
      // 비교 모드: 두 방식 모두 계산
      const equalInput: LoanInput = { principal, interestRate, period, repaymentType: "equal" };
      const maturityInput: LoanInput = { principal, interestRate, period, repaymentType: "maturity" };

      setComparisonResult({
        equal: calculateLoan(equalInput),
        maturity: calculateLoan(maturityInput)
      });
      setResult(null);
    } else {
      // 일반 모드: 선택한 방식만 계산
      const input: LoanInput = {
        principal,
        interestRate,
        period,
        repaymentType,
      };
      setResult(calculateLoan(input));
      setComparisonResult(null);
    }
  };

  // 도넛 차트 데이터
  const chartData = result
    ? [
      { name: "원금", value: principal, color: "#D4F1FF" },  // 파스텔 블루
      { name: "이자", value: result.totalInterest, color: "#E8D4FF" },  // 파스텔 보라
    ]
    : [];

  // 치킨 환산
  const chickenCount = result ? convertToChicken(result.totalInterest) : 0;

  // 비교 차트 데이터 (바 차트용)
  const comparisonChartData = comparisonResult ? [
    {
      name: "원리금균등",
      totalInterest: comparisonResult.equal.totalInterest,
      totalPayment: comparisonResult.equal.totalPayment
    },
    {
      name: "만기일시",
      totalInterest: comparisonResult.maturity.totalInterest,
      totalPayment: comparisonResult.maturity.totalPayment
    }
  ] : [];

  // 라인 차트 데이터 (월별 추이)
  const lineChartData = result ? result.monthlyPayments.slice(0, Math.min(24, period)).map(payment => ({
    month: payment.month,
    principal: payment.principal,
    interest: payment.interest,
    totalPayment: payment.totalPayment
  })) : [];

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="highlight-card bg-gradient-to-r from-pastel-blue via-pastel-mint to-pastel-green">
        <div className="flex items-center gap-3 mb-2">
          <CalculatorIcon className="w-10 h-10" />
          <h1 className="text-3xl md:text-4xl font-black">대출 이자 계산기</h1>
        </div>
        <p className="text-base md:text-lg font-medium text-slate-800">
          원리금균등 vs 만기일시 상환, 한눈에 비교하고 절약하세요!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 입력 영역 */}
        <div className="bento-card space-y-5">
          <h2 className="text-xl font-black pb-2 flex items-center gap-2">
            <CurrencyDollarIcon className="w-6 h-6" />
            <span>대출 조건 입력</span>
          </h2>

          {/* 대출 금액 */}
          <div>
            <label className="block font-bold text-base mb-2">대출 금액 (원)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="neo-input"
              placeholder="50000000"
            />
            <p className="mt-1.5 text-sm font-medium text-slate-600 flex items-center gap-1">
              <CurrencyDollarIcon className="w-4 h-4" />
              {formatKRW(principal)}
            </p>
          </div>

          {/* 연 이자율 */}
          <div>
            <label className="block font-bold text-base mb-2">연 이자율 (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="neo-input"
              placeholder="4.5"
            />
          </div>

          {/* 대출 기간 */}
          <div>
            <label className="block font-bold text-base mb-2">대출 기간 (개월)</label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="neo-input"
              placeholder="60"
            />
            <p className="mt-1.5 text-sm font-medium text-slate-600 flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {Math.floor(period / 12)}년 {period % 12}개월
            </p>
          </div>

          {/* 비교 모드 토글 */}
          <div className="bg-pastel-yellow p-4 border border-slate-900 rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowsRightLeftIcon className="w-5 h-5" />
                <span className="font-bold text-base">두 방식 동시 비교</span>
              </div>
              <button
                onClick={() => setComparisonMode(!comparisonMode)}
                className={`px-4 py-2 border border-slate-900 font-bold text-sm transition-all duration-300 ${comparisonMode
                    ? "bg-pastel-green -translate-y-0.5 shadow-bento"
                    : "bg-white hover:-translate-y-0.5 shadow-bento"
                  }`}
              >
                {comparisonMode ? "ON" : "OFF"}
              </button>
            </div>
            {comparisonMode && (
              <p className="mt-2 text-xs font-medium text-slate-700">
                원리금균등과 만기일시 상환을 동시에 비교합니다
              </p>
            )}
          </div>

          {/* 상환 방식 */}
          {!comparisonMode && (
            <div>
              <label className="block font-bold text-base mb-2">상환 방식</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRepaymentType("equal")}
                  className={`py-3 px-4 border border-slate-900 font-bold text-base transition-all duration-300 ${repaymentType === "equal"
                      ? "bg-pastel-blue -translate-y-1 shadow-bento-hover"
                      : "bg-white hover:-translate-y-0.5 shadow-bento"
                    }`}
                >
                  원리금균등
                </button>
                <button
                  onClick={() => setRepaymentType("maturity")}
                  className={`py-3 px-4 border border-slate-900 font-bold text-base transition-all duration-300 ${repaymentType === "maturity"
                      ? "bg-pastel-blue -translate-y-1 shadow-bento-hover"
                      : "bg-white hover:-translate-y-0.5 shadow-bento"
                    }`}
                >
                  만기일시
                </button>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 flex items-start gap-1.5">
                <InformationCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {repaymentType === "equal"
                    ? "매월 동일한 금액(원금+이자)을 납부"
                    : "매월 이자만 내고, 만기에 원금 일시 상환"}
                </span>
              </p>
            </div>
          )}

          {/* 계산 버튼 */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 px-6 bg-pastel-purple border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2"
          >
            <SparklesIcon className="w-6 h-6" />
            <span>{comparisonMode ? "두 방식 비교하기" : "계산하기"}</span>
          </button>
        </div>

        {/* 결과 영역 */}
        <div className="space-y-5">
          {comparisonResult ? (
            <>
              {/* 비교 모드 결과 */}
              <div className="result-card bg-gradient-to-br from-pastel-blue via-pastel-mint to-pastel-green">
                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                  <ArrowsRightLeftIcon className="w-6 h-6" />
                  <span>비교 결과</span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white bg-opacity-70 p-3 rounded border border-slate-900">
                    <p className="font-bold text-sm mb-2">원리금균등</p>
                    <p className="font-black text-lg">{formatKRW(comparisonResult.equal.totalInterest)}</p>
                    <p className="text-xs text-slate-600 mt-1">총 이자</p>
                  </div>
                  <div className="bg-white bg-opacity-70 p-3 rounded border border-slate-900">
                    <p className="font-bold text-sm mb-2">만기일시</p>
                    <p className="font-black text-lg text-red-600">{formatKRW(comparisonResult.maturity.totalInterest)}</p>
                    <p className="text-xs text-slate-600 mt-1">총 이자</p>
                  </div>
                </div>
                <div className="mt-4 bg-white bg-opacity-70 p-3 rounded border border-slate-900">
                  <p className="font-bold text-sm">💰 이자 차이</p>
                  <p className="font-black text-2xl text-green-600 mt-1">
                    {formatKRW(comparisonResult.maturity.totalInterest - comparisonResult.equal.totalInterest)}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">원리금균등이 더 저렴합니다!</p>
                </div>
              </div>

              {/* 이자 비교 바 차트 */}
              <div className="result-card bg-white">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                  <ChartPieIcon className="w-5 h-5" />
                  <span>총 이자 비교</span>
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={comparisonChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value: number) => formatKRW(value)} />
                    <Bar dataKey="totalInterest" fill="#E8D4FF" stroke="#0f172a" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 월별 납입액 비교 */}
              <div className="result-card bg-white">
                <h3 className="text-lg font-black mb-4">월별 납입액 비교</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-pastel-blue rounded">
                    <span className="font-bold text-sm">원리금균등 (첫 달)</span>
                    <span className="font-black">{formatKRW(comparisonResult.equal.monthlyPayments[0]?.totalPayment || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-pastel-pink rounded">
                    <span className="font-bold text-sm">만기일시 (매월)</span>
                    <span className="font-black">{formatKRW(comparisonResult.maturity.monthlyPayments[0]?.totalPayment || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-pastel-yellow rounded">
                    <span className="font-bold text-sm">만기일시 (마지막 달)</span>
                    <span className="font-black text-red-600">{formatKRW(comparisonResult.maturity.monthlyPayments[period - 1]?.totalPayment || 0)}</span>
                  </div>
                </div>
              </div>
            </>
          ) : result ? (
            <>
              {/* 일반 모드 결과 */}
              {/* 요약 카드 */}
              <div className="result-card bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue">
                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                  <ChartPieIcon className="w-6 h-6" />
                  <span>계산 결과</span>
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white bg-opacity-50 p-3 rounded">
                    <span className="font-bold text-base">총 상환액</span>
                    <span className="font-black text-xl">
                      {formatKRW(result.totalPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white bg-opacity-50 p-3 rounded">
                    <span className="font-bold text-base">총 이자</span>
                    <span className="font-black text-xl text-red-600">
                      {formatKRW(result.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white bg-opacity-50 p-3 rounded">
                    <span className="font-bold text-base">첫 달 납입액</span>
                    <span className="font-black text-xl">
                      {formatKRW(result.monthlyPayments[0]?.totalPayment || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 치킨 환산 */}
              <div className="result-card bg-pastel-yellow text-center">
                <h3 className="text-lg font-black mb-2 flex items-center justify-center gap-2">
                  <SparklesIcon className="w-5 h-5" />
                  <span>이자를 치킨으로 환산하면?</span>
                </h3>
                <p className="font-black text-5xl my-4">
                  {chickenCount.toLocaleString()}<span className="text-2xl">마리</span>
                </p>
                <p className="text-sm font-medium text-slate-700">
                  🍗 치킨 1마리 = 20,000원 기준
                </p>
              </div>

              {/* 월별 상환 추이 라인 차트 */}
              {lineChartData.length > 0 && (
                <div className="result-card bg-white">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>월별 상환 추이</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" label={{ value: '개월', position: 'insideBottomRight', offset: -5 }} />
                      <YAxis tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`} />
                      <Tooltip formatter={(value: number) => formatKRW(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="principal" stroke="#D4F1FF" strokeWidth={2} name="원금" />
                      <Line type="monotone" dataKey="interest" stroke="#E8D4FF" strokeWidth={2} name="이자" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* 원금 vs 이자 차트 */}
              <div className="result-card bg-white">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                  <ChartPieIcon className="w-5 h-5" />
                  <span>원금 vs 이자 비율</span>
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
                    <Legend
                      wrapperStyle={{ fontWeight: "bold", fontSize: "14px" }}
                      formatter={(value) => value}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 월별 상환 테이블 (처음 6개월만 표시) */}
              <div className="result-card bg-white">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>월별 상환 내역 (처음 6개월)</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-900">
                        <th className="py-2 font-black">회차</th>
                        <th className="py-2 font-black">원금</th>
                        <th className="py-2 font-black">이자</th>
                        <th className="py-2 font-black">납입액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyPayments.slice(0, 6).map((payment) => (
                        <tr key={payment.month} className="border-b border-slate-200">
                          <td className="py-2.5 font-bold">{payment.month}회</td>
                          <td className="py-2.5 font-medium">{formatKRW(payment.principal)}</td>
                          <td className="py-2.5 font-medium text-red-600">
                            {formatKRW(payment.interest)}
                          </td>
                          <td className="py-2.5 font-bold">{formatKRW(payment.totalPayment)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.monthlyPayments.length > 6 && (
                  <p className="text-xs font-medium text-slate-500 mt-3 text-center">
                    ... 외 {result.monthlyPayments.length - 6}개월
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <CalculatorIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <p className="font-black text-xl mb-2">좌측에 정보를 입력하고</p>
                <p className="font-black text-xl text-pastel-purple">계산하기 버튼을 눌러주세요!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 설명 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="result-card bg-pastel-blue hover:-translate-y-1 transition-all">
          <h3 className="text-lg font-black mb-2 flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5" />
            <span>원리금균등상환이란?</span>
          </h3>
          <p className="font-medium text-sm text-slate-800">
            매월 <strong>동일한 금액</strong>을 납부하는 방식입니다. 초반에는 이자 비중이 크고,
            시간이 갈수록 원금 비중이 커집니다. 대부분의 주택담보대출에서 사용됩니다.
          </p>
        </div>
        <div className="result-card bg-pastel-green hover:-translate-y-1 transition-all">
          <h3 className="text-lg font-black mb-2 flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5" />
            <span>만기일시상환이란?</span>
          </h3>
          <p className="font-medium text-sm text-slate-800">
            대출 기간 동안 <strong>이자만 납부</strong>하고, 만기에 원금을 한 번에 갚는
            방식입니다. 초기 부담은 적지만, 총 이자는 더 많이 나옵니다.
          </p>
        </div>
      </div>
    </div>
  );
}
