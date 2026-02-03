"use client";

import { useState } from "react";
import {
    SparklesIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ExclamationTriangleIcon,
    LightBulbIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const ConsultPage = () => {
    const [creditScore, setCreditScore] = useState("");
    const [userQuery, setUserQuery] = useState("");
    const [userContext, setUserContext] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await fetch('/api/consult', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ creditScore, userQuery, userContext })
            });

            if (!response.ok) throw new Error("상담 요청 실패");

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message || "오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // SEO를 위한 구조화된 데이터 (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "인생 치트키 금융 상담소",
        "serviceType": "Financial Consulting Service",
        "provider": {
            "@type": "Organization",
            "name": "인생 치트키"
        },
        "description": "AI 기반의 1:1 맞춤형 금융 상담 서비스. 10초 만에 신용점수, 대출, 재테크 솔루션을 제공합니다.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "KRW"
        },
        "areaServed": "KR",
        "audience": {
            "@type": "Audience",
            "audienceType": "Financial Consumers"
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* JSON-LD 삽입 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 헤더 */}
            <section className="highlight-card bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300">
                <div className="flex items-center gap-3 mb-2">
                    <SparklesIcon className="w-10 h-10 text-indigo-900" />
                    <h1 className="text-3xl md:text-4xl font-black text-indigo-950">인생 치트키 금융 상담소</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    "복잡한 건 질색이야!" 10초 만에 끝내는 AI 금융 솔루션
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 폼 */}
                <section className="bento-card space-y-5 h-fit">
                    <h2 className="text-xl font-black pb-2 flex items-center gap-2 border-b-2 border-slate-100">
                        <UserCircleIcon className="w-6 h-6" />
                        <span>상담 정보 입력</span>
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-bold text-base mb-2">신용점수 (또는 대략적인 등급)</label>
                            <input
                                type="text"
                                className="neo-input"
                                placeholder="예: KCB 980점, 1등급, 잘 모름"
                                value={creditScore}
                                onChange={(e) => setCreditScore(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-base mb-2">현재 상황 (직업, 소득 등)</label>
                            <textarea
                                className="neo-input min-h-[80px]"
                                placeholder="예: 직장인 3년차, 월 실수령 300, 학자금 대출 있음"
                                value={userContext}
                                onChange={(e) => setUserContext(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-base mb-2">핵심 고민</label>
                            <textarea
                                className="neo-input min-h-[100px]"
                                placeholder="예: 전세 대출을 받고 싶은데 어떤 상품이 좋을까요?"
                                value={userQuery}
                                onChange={(e) => setUserQuery(e.target.value)}
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 px-6 bg-indigo-500 text-white border-2 border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {loading ? (
                                    <span>상담 분석 중... ⏳</span>
                                ) : (
                                    <>
                                        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
                                        <span>AI 솔루션 받기</span>
                                    </>
                                )}
                            </button>

                            {/* 책임 한계 고지 (User Request) */}
                            <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-1">
                                <ExclamationTriangleIcon className="w-4 h-4" />
                                실제 대출 승인 및 조건은 금융기관 상담을 통해 확인해야 합니다.
                            </p>
                        </div>
                    </form>
                </section>

                {/* 결과 표시 영역 */}
                <section className="space-y-5">
                    {result ? (
                        <div className="space-y-6 animate-fade-in-up">
                            {/* 요약 */}
                            <div className="result-card bg-indigo-50 border-2 border-indigo-900 shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]">
                                <h3 className="text-lg font-black mb-2 text-indigo-900">🕵️ 요약</h3>
                                <p className="text-xl font-bold leading-relaxed whitespace-pre-wrap">{result.summary}</p>
                            </div>

                            {/* 치트 시트 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <span className="text-2xl">⚡</span>
                                    <span>당장 실행할 치트키</span>
                                </h3>
                                <ul className="space-y-3">
                                    {result.cheat_sheet?.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                            <span className="bg-indigo-600 text-white w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm shrink-0 mt-0.5">{idx + 1}</span>
                                            <span className="font-medium text-slate-800">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 치킨 지수 */}
                            <div className="result-card bg-yellow-100 border-yellow-500 text-center">
                                <h3 className="text-lg font-black mb-2 text-yellow-900">🍗 치킨 지수</h3>
                                <div className="flex items-center justify-center gap-3">
                                    <p className="text-3xl font-black text-yellow-800">{result.chicken_index}</p>
                                </div>
                            </div>

                            {/* AI 조언 */}
                            <div className="result-card bg-slate-900 text-white">
                                <h3 className="text-lg font-black mb-2 text-slate-300">🤖 AI 코치의 한마디</h3>
                                <p className="text-lg font-medium leading-relaxed">"{result.ai_advice}"</p>
                            </div>

                            {/* CTA */}
                            {result.cta_message && (
                                <div className="text-center pt-2">
                                    <p className="text-sm font-bold text-slate-500 mb-2">👇 {result.cta_message}</p>
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href="https://open.kakao.com/o/gpJC3Dei"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="neo-button w-full bg-yellow-300 hover:bg-yellow-400 text-center flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 3C5.9 3 1 6.9 1 11.8c0 3.2 2.1 6 5.4 7.6-.2.7-.8 2.5-.9 2.9-.2.5.2.8.6.5.4-.3 3.6-2.4 4.2-2.8.5.1 1.1.1 1.7.1 6.1 0 11-3.9 11-8.8S18.1 3 12 3z" />
                                            </svg>
                                            전문가와 찐하게 상담하기 (카톡)
                                        </a>
                                        <p className="text-xs text-slate-500 text-center">
                                            * 클릭 시 카카오톡 오픈채팅으로 연결됩니다.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* 대기 상태 */
                        <div className="bento-card bg-slate-100 h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-slate-300">
                            <SparklesIcon className="w-20 h-20 text-slate-300 mb-4" />
                            <p className="text-xl font-bold text-slate-400">
                                왼쪽에서 정보를 입력하면<br />
                                10초 만에 인생 치트키가<br />
                                발동됩니다! ✨
                            </p>
                        </div>
                    )}
                </section>
            </div>

            {/* SEO 최적화 콘텐츠 섹션 (하단) */}
            <div className="space-y-8 mt-12 pt-8 border-t-2 border-slate-200">

                {/* 1. 서비스 소개 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <LightBulbIcon className="w-8 h-8 text-indigo-600" />
                        <span>왜 'AI 금융 상담소'인가요?</span>
                    </h3>
                    <p className="text-slate-700 leading-7 text-lg mb-4">
                        금융 정보는 너무 어렵고 방대합니다. 은행에 가자니 시간이 없고, 인터넷을 뒤지자니 광고만 가득하지 않나요?
                        <strong>인생 치트키 금융 상담소</strong>는 당신의 시간과 비용을 아껴드리기 위해 탄생했습니다.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
                            <span className="text-2xl">⚡</span>
                            <div>
                                <strong className="block text-slate-900 mb-1">10초 컷 빠른 분석</strong>
                                <span className="text-slate-600 text-sm">복잡한 서류 없이 핵심 정보만으로 즉각적인 솔루션을 제공합니다.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
                            <span className="text-2xl">💬</span>
                            <div>
                                <strong className="block text-slate-900 mb-1">2030 맞춤형 힙한 조언</strong>
                                <span className="text-slate-600 text-sm">딱딱한 용어 대신 이해하기 쉬운 비유와 직관적인 설명으로 답해드립니다.</span>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* 2. 자주 묻는 질문 (FAQ) - SEO 핵심 키워드 포함 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <QuestionMarkCircleIcon className="w-8 h-8 text-indigo-600" />
                        <span>자주 묻는 질문 (FAQ)</span>
                    </h3>
                    <div className="space-y-4">
                        <article className="border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Q. 신용점수가 낮아도 상담이 가능한가요?</h4>
                            <p className="text-slate-600 leading-relaxed">
                                네, 물론입니다! <strong>KCB, 올크레딧 점수</strong> 상관없이 현재 상황에 맞는 최선의
                                <span className="text-indigo-600 font-medium"> 신용점수 올리기 전략</span>이나
                                <span className="text-indigo-600 font-medium"> 서민금융대출 상품</span>(햇살론, 새희망홀씨 등)을 추천해드립니다.
                            </p>
                        </article>
                        <article className="border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Q. 상담 결과는 정확한가요?</h4>
                            <p className="text-slate-600 leading-relaxed">
                                AI가 최신 금융 트렌드와 일반적인 가이드라인을 바탕으로 <strong>가장 합리적인 치트키</strong>를 제안합니다.
                                단, 실제 대출 금리나 한도는 개개인의 상세 정보에 따라 달라질 수 있으므로,
                                <span className="text-indigo-600 font-medium"> 참고용 지표</span>로 활용하시고 최종 결정은 금융기관과 상의하세요.
                            </p>
                        </article>
                        <article className="border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Q. 사회초년생을 위한 전세 대출도 알려주나요?</h4>
                            <p className="text-slate-600 leading-relaxed">
                                네! <strong>중소기업청년전세자금대출(중기청)</strong>, <strong>버팀목전세자금대출</strong> 등
                                국가에서 지원하는 저금리 상품을 우선적으로 비교 분석하여, 월세보다 저렴한 이자로 거주하는 방법을 알려드립니다.
                            </p>
                        </article>
                    </div>
                </section>

                {/* 3. 보안 및 신뢰 */}
                <section className="bg-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200 text-center">
                    <ShieldCheckIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">개인정보 보호 안내</h3>
                    <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
                        입력하신 정보는 AI 상담 분석을 위해서만 일시적으로 사용되며, 서버에 별도로 저장되거나 수집되지 않습니다.
                        안심하고 자유롭게 질문하세요!
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ConsultPage;
