"use client";

import { useState } from "react";
import {
    calculateSplit,
    formatKRW,
    generateShareText,
    type SplitResult,
} from "./splitCalculator";
import {
    CalculatorIcon,
    UserGroupIcon,
    ShareIcon,
    SparklesIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function SplitCalculatorPage() {
    const [totalAmount, setTotalAmount] = useState<number>(50000);
    const [numberOfPeople, setNumberOfPeople] = useState<number>(3);
    const [result, setResult] = useState<SplitResult | null>(null);
    const [copied, setCopied] = useState<boolean>(false);

    const handleCalculate = () => {
        const calculatedResult = calculateSplit({ totalAmount, numberOfPeople });
        setResult(calculatedResult);
        setCopied(false);
    };

    const handleCopyToClipboard = () => {
        if (!result) return;

        const shareText = generateShareText({ totalAmount, numberOfPeople }, result);
        navigator.clipboard.writeText(shareText);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue">
                <div className="flex items-center gap-3 mb-2">
                    <CalculatorIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">💰 N빵 계산기</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    더치페이 금액 계산하고 카톡으로 공유하세요!
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 영역 */}
                <div className="bento-card space-y-5">
                    <h2 className="text-xl font-black pb-2 flex items-center gap-2">
                        <UserGroupIcon className="w-6 h-6" />
                        <span>정보 입력</span>
                    </h2>

                    {/* 총 금액 */}
                    <div>
                        <label className="block font-bold text-base mb-2">총 금액 (원)</label>
                        <input
                            type="number"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(Number(e.target.value))}
                            className="neo-input"
                            placeholder="50000"
                        />
                        <p className="mt-1.5 text-sm font-medium text-slate-600">
                            {formatKRW(totalAmount)}
                        </p>
                    </div>

                    {/* 빠른 금액 선택 */}
                    <div>
                        <label className="block font-bold text-base mb-2">빠른 선택</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[10000, 30000, 50000, 100000, 150000, 200000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setTotalAmount(amount)}
                                    className={`py-2 px-2 border border-slate-900 font-bold text-xs transition-all duration-300 ${totalAmount === amount
                                        ? "bg-pastel-yellow -translate-y-1 shadow-bento-hover"
                                        : "bg-white hover:-translate-y-0.5 shadow-bento"
                                        }`}
                                >
                                    {(amount / 10000).toFixed(0)}만원
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 인원수 */}
                    <div>
                        <label className="block font-bold text-base mb-2">인원수 (명)</label>
                        <input
                            type="number"
                            value={numberOfPeople}
                            onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                            className="neo-input"
                            placeholder="3"
                            min="2"
                        />
                    </div>

                    {/* 빠른 인원 선택 */}
                    <div>
                        <label className="block font-bold text-base mb-2">빠른 선택</label>
                        <div className="grid grid-cols-4 gap-2">
                            {[2, 3, 4, 5].map((people) => (
                                <button
                                    key={people}
                                    onClick={() => setNumberOfPeople(people)}
                                    className={`py-2 px-2 border border-slate-900 font-bold text-sm transition-all duration-300 ${numberOfPeople === people
                                        ? "bg-pastel-blue -translate-y-1 shadow-bento-hover"
                                        : "bg-white hover:-translate-y-0.5 shadow-bento"
                                        }`}
                                >
                                    {people}명
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
                            {/* 1인당 금액 카드 */}
                            <div className="result-card bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-purple">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <CalculatorIcon className="w-6 h-6" />
                                    <span>계산 결과</span>
                                </h2>
                                <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 text-center">
                                    <p className="font-bold text-base mb-2">1인당 금액</p>
                                    <p className="font-black text-5xl text-green-600">
                                        {formatKRW(result.perPerson)}
                                    </p>
                                    {result.remainder > 0 && (
                                        <div className="mt-4 p-3 bg-pastel-yellow rounded border border-slate-900">
                                            <p className="font-bold text-sm text-red-600">
                                                ⚠️ {result.remainder}원이 남아요!
                                            </p>
                                            <p className="text-xs text-slate-700 mt-1">
                                                앞 {result.remainder}명이 1원씩 더 내주세요
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 개인별 금액 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4">👥 개인별 금액</h3>
                                <div className="space-y-2">
                                    {result.distribution.map((amount, index) => (
                                        <div
                                            key={index}
                                            className={`flex justify-between items-center p-3 rounded border border-slate-900 ${amount > result.perPerson ? "bg-pastel-pink" : "bg-pastel-blue"
                                                }`}
                                        >
                                            <span className="font-bold text-sm">
                                                {index + 1}번째 사람
                                                {amount > result.perPerson && " (+1원)"}
                                            </span>
                                            <span className="font-black text-lg">{formatKRW(amount)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 공유 버튼 */}
                            <div className="result-card bg-pastel-green">
                                <h3 className="text-lg font-black mb-3 flex items-center gap-2">
                                    <ShareIcon className="w-5 h-5" />
                                    <span>결과 공유하기</span>
                                </h3>
                                <button
                                    onClick={handleCopyToClipboard}
                                    className={`w-full py-3 px-4 border border-slate-900 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${copied
                                        ? "bg-white"
                                        : "bg-pastel-yellow hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircleIcon className="w-5 h-5" />
                                            <span>복사 완료! 📋</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShareIcon className="w-5 h-5" />
                                            <span>카톡 공유용 텍스트 복사</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-slate-600 mt-2 text-center">
                                    복사 후 카카오톡에 붙여넣기 하세요
                                </p>
                            </div>

                            {/* 요약 정보 */}
                            <div className="result-card bg-pastel-blue">
                                <h3 className="text-lg font-black mb-3">📊 요약</h3>
                                <div className="space-y-2 text-sm font-medium">
                                    <div className="flex justify-between">
                                        <span>총 금액:</span>
                                        <span className="font-black">{formatKRW(totalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>인원:</span>
                                        <span className="font-black">{numberOfPeople}명</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>1인당:</span>
                                        <span className="font-black text-green-600">{formatKRW(result.perPerson)}</span>
                                    </div>
                                    {result.remainder > 0 && (
                                        <div className="flex justify-between text-red-600">
                                            <span>나머지:</span>
                                            <span className="font-black">{result.remainder}원</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <UserGroupIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
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
                        <span>기획 의도: 돈 계산은 깔끔하게, 우정은 영원하게</span>
                    </h3>
                    <p className="text-slate-700 leading-7 text-lg mb-4">
                        "즐겁게 먹고 마셨는데, 계산할 때 눈치 보인 적 있나요?"
                        총무 혼자 엑셀 켜고 계산기 두드리는 모습, 혹은 "나중에 줄게" 하고 까먹는 친구 때문에 속앓이한 경험, 누구나 있을 겁니다.
                    </p>
                    <p className="text-slate-700 leading-7 text-lg">
                        <strong>인생 치트키 N빵 계산기</strong>는 복잡한 하트모임 정산을 3초 만에 끝내드립니다.
                        1원 단위까지 공평하게 나누고, 카톡 공유용 텍스트까지 만들어주니
                        이제 계산은 기계에 맡기고 여러분은 즐거운 대화만 나누세요.
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
                            <div className="w-10 h-10 bg-pastel-pink rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">1</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">금액 입력</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                전체 결제 금액을 입력하세요. 영수증에 찍힌 최가 금액을 그대로 적으시면 됩니다.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">2</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">인원 설정</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                함께한 인원수를 입력하세요.
                                <span className="text-xs text-slate-500 block mt-1">(※ 1/N이 딱 떨어지지 않아도 걱정 마세요!)</span>
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">3</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">공유 및 입금</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                계산된 1인당 금액을 확인하고 '복사하기' 버튼을 눌러 단톡방에 붙여넣기만 하면 정산 끝!
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. 관련 지식 (기존 내용 보강) */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🤝</span>
                        <span>센스 있는 정산(더치페이) 가이드</span>
                    </h3>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="bg-indigo-100 px-2 py-1 rounded text-base">🍷</span>
                                술 안 마신 사람은? (상황별 정산법)
                            </h4>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                무조건 '1/N'이 공평한 것은 아닙니다. 상황에 따라 유연하게 대처하는 것이 인간관계 유지의 비결입니다.
                            </p>
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-900 font-bold uppercase">
                                        <tr>
                                            <th className="px-4 py-3">상황</th>
                                            <th className="px-4 py-3">추천 방식 (국룰)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-bold text-slate-700">비음주자 동석</td>
                                            <td className="px-4 py-3 text-slate-600">술값은 마신 사람끼리, 안주/식사는 전체 1/N</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-bold text-slate-700">늦게 온 사람</td>
                                            <td className="px-4 py-3 text-slate-600">시간 비례 혹은 2차부터 계산 (눈치껏 30~50% 할인)</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-bold text-slate-700">고가 메뉴 주문</td>
                                            <td className="px-4 py-3 text-slate-600">소고기/혼자 먹은 메뉴 등은 주문자가 별도 부담</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">💬 "내가 낼게" vs "더치페이 하자"</h4>
                            <div className="bg-pastel-purple bg-opacity-20 p-6 rounded-xl border border-pastel-purple">
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-start gap-3">
                                        <span className="text-purple-600 font-black">♥</span>
                                        <span><strong>데이트:</strong> 요즘은 '데이트 통장'이 대세! 번갈아 내기(밥-커피)보다 공통 자금을 모아 쓰는 추세입니다.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-purple-600 font-black">👔</span>
                                        <span><strong>선배/상사:</strong> 보통 선배가 사는 문화지만, "커피는 제가 쏘겠습니다!"라고 말하는 센스가 사랑받는 후배의 지름길.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-purple-600 font-black">🎂</span>
                                        <span><strong>생일파티:</strong> 당연히 '생일자'는 열외! 친구들이 N빵해서 밥을 사주고, 케이크까지 준비하는 것이 국룰입니다.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-red-50 p-5 rounded-xl border border-red-100 flex items-start gap-4">
                            <div className="text-3xl">⚠️</div>
                            <div>
                                <h4 className="font-bold text-red-900 mb-1">정산은 '스피드'가 생명</h4>
                                <p className="text-sm text-red-800 leading-relaxed">
                                    "나중에 줄게"는 금물! 총무가 영수증 올리고 계좌 찍으면 <strong>24시간 이내</strong> 송금하는 게 매너입니다.
                                    깜빡했다면 "늦어서 미안해!"라며 송금할 때 몇 백원 더 얹어주거나 이모티콘이라도 보내세요.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
