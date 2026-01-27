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

            {/* 팁 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="result-card bg-neon-yellow text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h3 className="text-lg font-black mb-2">빠른 계산</h3>
                    <p className="text-sm font-medium">
                        복잡한 계산 없이 클릭 몇 번으로 끝
                    </p>
                </div>
                <div className="result-card bg-neon-pink text-white text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <h3 className="text-lg font-black mb-2">간편 공유</h3>
                    <p className="text-sm font-medium">
                        카톡으로 바로 공유 가능
                    </p>
                </div>
                <div className="result-card bg-neon-blue text-center">
                    <div className="text-4xl mb-2">💯</div>
                    <h3 className="text-lg font-black mb-2">정확한 분배</h3>
                    <p className="text-sm font-medium">
                        1원 단위까지 정확하게
                    </p>
                </div>
            </div>
        </div>
    );
}
