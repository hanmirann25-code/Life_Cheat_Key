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
      {/* 상세 컨텐츠 섹션 */}
      <div className="space-y-8 mt-12">
        {/* 1. 기획 의도 */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            <span>기획 의도: 대출, '이자'만 줄여도 성공입니다</span>
          </h3>
          <p className="text-slate-700 leading-7 text-lg mb-4">
            집을 사거나 전세를 구할 때 대출은 필수입니다. 하지만 0.1%의 금리 차이, 혹은 상환 방식의 선택이
            10년 뒤 <strong>수백, 수천만 원의 차이</strong>를 만든다는 사실을 알고 계신가요?
          </p>
          <p className="text-slate-700 leading-7 text-lg">
            <strong>인생 치트키 대출 계산기</strong>는 복잡한 숫자 속에 숨어있는 '진짜 비용'을 찾아드립니다.
            특히, <strong>'원리금균등' vs '만기일시'</strong> 상환 방식을 한눈에 비교하여,
            여러분이 <strong>'진짜 내 돈'</strong>이 얼마인지 정확히 파악하고 현명한 재무 계획을 세울 수 있도록 돕기 위해 만들어졌습니다.
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
              <h4 className="font-bold text-lg mb-2 text-slate-900">조건 입력</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                대출 원금, 연 이자율, 기간을 입력하세요.
                <br /><span className="text-xs text-slate-500">* 거치 기간 등 복잡한 옵션은 제외하고 핵심만 담았습니다.</span>
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <div className="w-10 h-10 bg-pastel-yellow rounded-full flex items-center justify-center font-black text-lg mb-3 shadow-sm">2</div>
              <h4 className="font-bold text-lg mb-2 text-slate-900">비교 모드 활용</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>'두 방식 동시 비교'</strong> 스위치를 켜보세요.
                상환 방식에 따라 총 이자가 얼마나 차이나는지 직관적으로 보여줍니다.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <div className="w-10 h-10 bg-pastel-mint rounded-full flex items-center justify-center font-black text-lg mb-3 shadow-sm">3</div>
              <h4 className="font-bold text-lg mb-2 text-slate-900">계획 수립</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                월 상환금과 총 이자를 확인하고, 자신의 소득 흐름(DSR)에 맞는 최적의 대출 전략을 세우세요.
              </p>
            </div>
          </div>
        </section>

        {/* 3. 관련 지식 (기존 내용 보강) */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <span>똑똑한 대출 생활 가이드</span>
          </h3>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-base font-black">VS</span>
                상환 방식, 무엇이 유리할까?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-bl-lg">추천</div>
                  <strong className="block text-lg text-blue-700 mb-2">① 원리금균등분할상환</strong>
                  <p className="text-sm text-slate-600 mb-2">원금과 이자를 합쳐 매달 똑같은 돈을 냅니다.</p>
                  <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                    <li><strong>장점:</strong> 매달 나가는 고정비용이 일정해 자금 계획 세우기가 좋습니다. 만기일시상환보다 총 이자가 적습니다.</li>
                    <li><strong>단점:</strong> 초기에는 이자 비중이 높아 원금이 더디게 줄어드는 느낌을 받을 수 있습니다.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                  <strong className="block text-lg text-purple-700 mb-2">② 만기일시상환</strong>
                  <p className="text-sm text-slate-600 mb-2">매달 이자만 내고, 만기에 원금을 한 번에 갚습니다.</p>
                  <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                    <li><strong>장점:</strong> 당장 매달 내야 하는 돈(월 납입액)이 가장 적습니다.</li>
                    <li><strong>단점:</strong> 원금이 줄어들지 않아 <strong>총 이자 비용이 가장 비쌉니다.</strong> 만기 시 목돈 마련 부담이 큽니다.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">🏦 대출 용어 1분 정리</h4>
              <ul className="space-y-3">
                <li className="bg-white border border-slate-200 p-4 rounded-lg flex flex-col md:flex-row gap-2 md:items-center">
                  <span className="font-black text-rose-500 w-16">LTV</span>
                  <span className="text-sm text-slate-600 flex-1">
                    <strong>(Loan To Value)</strong> 집값 대비 얼마까지 빌려줄까? (예: 5억 집, LTV 60% = 3억 대출)
                  </span>
                </li>
                <li className="bg-white border border-slate-200 p-4 rounded-lg flex flex-col md:flex-row gap-2 md:items-center">
                  <span className="font-black text-rose-500 w-16">DSR</span>
                  <span className="text-sm text-slate-600 flex-1">
                    <strong>(Debt Service Ratio)</strong> 연봉 대비 갚을 능력이 되나? (모든 대출의 원리금을 합쳐 심사. 가장 까다로움)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-3 text-lg">💡 금리 1% 낮추는 실전 꿀팁</h4>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">1.</span>
                  <span className="text-sm text-orange-900"><strong>금리인하요구권:</strong> 승진, 연봉 인상 등 신용 상태가 좋아졌다면 은행에 당당히 금리 인하를 요구하세요. 법적 권리입니다.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">2.</span>
                  <span className="text-sm text-orange-900"><strong>주거래 우대:</strong> 급여 통장, 관리비 납부, 카드 사용 등 주거래 은행의 우대 조건을 꼼꼼히 챙기세요.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">3.</span>
                  <span className="text-sm text-orange-900"><strong>중도상환 전략:</strong> 대출 실행 3년 후에는 대부분 중도상환수수료가 사라집니다. 여윳돈이 생기면 원금부터 갚으세요.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* 4. 연관 도구 추천 (내부 링크 최적화) */}
        <section className="bg-slate-900 rounded-2xl p-8 text-white mt-8">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-neon-yellow">
            <span className="text-3xl">🔗</span>
            <span>이자 계산 후 추천하는 다음 단계</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/salary"
              className="bg-white/10 hover:bg-white/20 p-4 border border-white/20 rounded-xl transition-all group"
            >
              <p className="font-black text-xl mb-1 group-hover:text-neon-yellow">월급 실수령액 계산기 →</p>
              <p className="text-slate-400 text-sm">대출 상환을 위한 내 진짜 월급 확인하기</p>
            </a>
            <a
              href="/housing"
              className="bg-white/10 hover:bg-white/20 p-4 border border-white/20 rounded-xl transition-all group"
            >
              <p className="font-black text-xl mb-1 group-hover:text-neon-yellow">내 집 마련 시뮬레이션 →</p>
              <p className="text-slate-400 text-sm">대출을 끼고 서울 아파트를 사면 얼마나 걸릴까?</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
