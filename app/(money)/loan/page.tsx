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
      {/* SEO & 유용한 정보 섹션 (아코디언/카드 스타일) */}
      <div className="space-y-6 pt-8 border-t-2 border-slate-200">
        <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-neon-yellow" />
          <span>대출 이자 줄이는 꿀팁 & 상식</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tip 1 */}
          <div className="bento-card bg-white hover:-translate-y-1 transition-all">
            <h4 className="font-bold text-lg mb-2">💡 중도상환수수료 확인하기</h4>
            <p className="text-slate-600 text-sm">
              대출을 받을 때 '중도상환수수료'가 면제되는 상품인지 꼭 확인하세요.
              여유 자금이 생길 때마다 원금을 조금씩이라도 갚으면 총 이자를 획기적으로 줄일 수 있습니다.
            </p>
          </div>

          {/* Tip 2 */}
          <div className="bento-card bg-white hover:-translate-y-1 transition-all">
            <h4 className="font-bold text-lg mb-2">📉 금리인하요구권 활용</h4>
            <p className="text-slate-600 text-sm">
              승진, 연봉 인상 등 신용 상태가 개선되었다면 은행에 당당하게 '금리 인하'를 요구하세요.
              법적으로 보장된 소중한 권리입니다.
            </p>
          </div>

          {/* Tip 3 */}
          <div className="bento-card bg-white hover:-translate-y-1 transition-all">
            <h4 className="font-bold text-lg mb-2">🔄 대출 갈아타기 (대환)</h4>
            <p className="text-slate-600 text-sm">
              더 낮은 금리의 상품이 있다면 갈아타는 것이 이득일 수 있습니다.
              다만, 중도상환수수료와 새 대출의 부대비용을 꼼꼼히 비교해보세요.
            </p>
          </div>
        </div>

        {/* 재미있는 기능 설명 */}
        <div className="result-card bg-pastel-yellow mt-6">
          <h4 className="font-bold text-lg mb-3">🍗 치킨 환산 기능이란?</h4>
          <p className="text-slate-700 text-sm leading-relaxed">
            우리가 무심코 내는 대출 이자가 실제로 얼마나 큰 금액인지 체감하기 어렵습니다.
            <strong>인생 치트키</strong>는 이를 가장 직관적인 화폐 단위인 '치킨'으로 환산해드립니다.
            이자를 줄여서 1년 뒤, 10년 뒤에 몇 마리의 치킨을 더 먹을 수 있는지 확인해보세요!
            <br /><br />
            (치킨 1마리 가격은 20,000원으로 가정했습니다.)
          </p>
        </div>

        {/* 상세 가이드 섹션 (AdSense 보강용) */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h3 className="text-2xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-slate-200">
            📚 대출 이자 계산기 100% 활용 가이드
          </h3>

          <div className="space-y-8">
            <section>
              <h4 className="text-xl font-bold text-slate-800 mb-3">1. 원리금균등 vs 만기일시, 무엇이 다를까요?</h4>
              <p className="text-slate-600 leading-relaxed mb-4">
                대출을 받을 때 가장 고민되는 것이 바로 <strong>상환 방식</strong>입니다.
                이 선택에 따라 매달 내야 하는 돈과 총 이자 금액이 크게 달라지기 때문입니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <strong className="block text-lg text-blue-600 mb-2">원리금균등분할상환</strong>
                  <p className="text-sm text-slate-600">
                    대출 기간 동안 원금과 이자를 합친 금액이 매달 일정하도록 계산된 방식입니다.
                    초기에는 이자 비중이 높고 원금 비중이 낮지만, 시간이 지날수록 원금 비중이 높아집니다.
                    <br /><br />
                    <strong>장점:</strong> 매달 나가는 돈이 똑같아서 자금 계획을 세우기 좋습니다.
                    만기일시상환보다 총 이자가 적습니다.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <strong className="block text-lg text-purple-600 mb-2">만기일시상환</strong>
                  <p className="text-sm text-slate-600">
                    대출 기간 동안은 이자만 내고, 만기일에 원금 전체를 한꺼번에 갚는 방식입니다.
                    당장의 월 부담금은 가장 적습니다.
                    <br /><br />
                    <strong>장점:</strong> 당장 낼 돈이 적어 초기 부담이 적습니다.
                    <strong>단점:</strong> 원금이 줄어들지 않으므로 총 이자 비용이 가장 비쌉니다. 만기 때 목돈 부담이 큽니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-xl font-bold text-slate-800 mb-3">2. LTV, DTI, DSR... 대출 용어 완전 정복</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-12 font-black text-slate-400">LTV</span>
                  <div>
                    <strong className="block text-slate-900">주택담보대출비율 (Loan To Value)</strong>
                    <p className="text-sm text-slate-600 mt-1">
                      내 집의 가치 대비 대출 가능한 금액의 비율입니다.
                      예를 들어 5억짜리 아파트의 LTV가 60%라면, 최대 3억까지 대출이 가능합니다.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-12 font-black text-slate-400">DTI</span>
                  <div>
                    <strong className="block text-slate-900">총부채상환비율 (Debt To Income)</strong>
                    <p className="text-sm text-slate-600 mt-1">
                      내 연봉에서 대출 원리금 상환액이 차지하는 비율입니다.
                      연봉 5천만원인 사람의 DTI가 40%라면, 연간 원리금 상환액이 2천만원을 넘을 수 없습니다.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-12 font-black text-slate-400">DSR</span>
                  <div>
                    <strong className="block text-slate-900">총부채원리금상환비율 (Debt Service Ratio)</strong>
                    <p className="text-sm text-slate-600 mt-1">
                      DTI보다 더 강력한 규제입니다. 주택담보대출뿐만 아니라 신용대출, 자동차 할부 등
                      <strong>모든 대출의 원리금</strong>을 합산하여 연봉 대비 상환 능력을 심사합니다.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h4 className="text-xl font-bold text-slate-800 mb-3">3. 현명한 대출 관리를 위한 3원칙</h4>
              <div className="bg-pastel-mint bg-opacity-30 p-5 rounded-xl border border-pastel-mint">
                <ol className="list-decimal list-inside space-y-3 text-slate-700">
                  <li>
                    <strong>주거래 은행부터 두드려라:</strong>
                    급여 이체, 카드 사용 실적 등이 있는 주거래 은행에서 우대 금리를 받을 확률이 높습니다.
                  </li>
                  <li>
                    <strong>금리인하요구권을 기억하라:</strong>
                    승진, 연봉 인상 등 좋은 일이 생겼을 때 은행에 알리면 금리를 깎아줄 수 있습니다.
                    (단, 은행 내부 기준 충족 시)
                  </li>
                  <li>
                    <strong>중도상환 전략을 세워라:</strong>
                    대출 초기에 여윳돈이 생긴다면 중도상환수수료를 내더라도 원금을 갚는 게 이득일 수 있습니다.
                    대부분 3년이 지나면 중도상환수수료가 면제됩니다.
                  </li>
                </ol>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
