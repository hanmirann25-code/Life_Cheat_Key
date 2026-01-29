"use client";

import { useState, useEffect } from "react";

export default function LunchSlotPage() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    // 메뉴 데이터
    const menuData: Record<string, string[]> = {
        한식: ["김치찌개", "된장찌개", "비빔밥", "불고기", "제육볶음", "삼겹살", "갈비탕", "순두부찌개"],
        중식: ["짜장면", "짬뽕", "탕수육", "마파두부", "양장피", "깐풍기", "볶음밥", "군만두"],
        일식: ["초밥", "라멘", "돈카츠", "우동", "소바", "규동", "오코노미야키", "타코야키"],
        양식: ["파스타", "피자", "스테이크", "햄버거", "샐러드", "리조또", "샌드위치", "그라탕"],
        분식: ["떡볶이", "김밥", "라면", "순대", "튀김", "어묵", "쫄면", "냉면"],
        치킨: ["후라이드", "양념치킨", "간장치킨", "파닭", "마늘치킨", "치킨너겟", "핫윙", "순살치킨"],
        패스트푸드: ["햄버거", "피자", "샌드위치", "핫도그", "감자튀김", "치킨버거", "새우버거", "불고기버거"],
    };

    // 전체 메뉴 (모든 카테고리 합치기)
    const allMenus = Object.values(menuData).flat();

    // 현재 선택된 카테고리의 메뉴
    const currentMenus = selectedCategory === "전체" ? allMenus : menuData[selectedCategory] || [];

    // 슬롯 돌리기
    const spinSlot = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setResult(null);

        // 애니메이션 효과를 위한 랜덤 변경
        let count = 0;
        const interval = setInterval(() => {
            const randomMenu = currentMenus[Math.floor(Math.random() * currentMenus.length)];
            setResult(randomMenu);
            count++;

            if (count > 20) {
                clearInterval(interval);
                const finalMenu = currentMenus[Math.floor(Math.random() * currentMenus.length)];
                setResult(finalMenu);
                setHistory(prev => [finalMenu, ...prev].slice(0, 5));
                setIsSpinning(false);
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-neon-pink border-b-8 border-black py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 text-black">
                        🎰 점심 슬롯머신
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-black">
                        오늘 뭐 먹지? 슬롯이 대신 골라드립니다!
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-neon-yellow border-4 border-black rotate-12 hidden lg:block"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-neon-green border-4 border-black -rotate-6 hidden lg:block"></div>
            </section>

            <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
                {/* Category Filter */}
                <div className="bg-white border-4 border-black shadow-brutal p-6">
                    <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                        <span>🍽️</span>
                        <span>카테고리 선택</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["전체", ...Object.keys(menuData)].map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                  py-3 px-4 border-4 border-black font-bold text-sm
                  transition-all duration-200
                  ${selectedCategory === category
                                        ? "bg-neon-yellow -translate-y-1 shadow-brutal-sm"
                                        : "bg-white hover:-translate-y-1 hover:shadow-brutal-sm"
                                    }
                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Slot Machine */}
                <div className="bg-gradient-to-br from-neon-yellow via-neon-pink to-neon-purple border-8 border-black shadow-brutal-xl p-8">
                    <div className="bg-white border-4 border-black p-12 mb-6">
                        <div className="text-center">
                            {result ? (
                                <div className={`transition-all duration-300 ${isSpinning ? "blur-sm scale-95" : "blur-0 scale-100"}`}>
                                    <div className="text-8xl mb-4">🍽️</div>
                                    <h3 className="text-5xl md:text-6xl font-black text-black">
                                        {result}
                                    </h3>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-8xl mb-4">❓</div>
                                    <h3 className="text-4xl font-black text-gray-400">
                                        슬롯을 돌려보세요!
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Spin Button */}
                    <button
                        onClick={spinSlot}
                        disabled={isSpinning}
                        className={`
              w-full py-6 px-8 border-4 border-black font-black text-2xl
              transition-all duration-300
              ${isSpinning
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-neon-green hover:-translate-y-2 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                            }
            `}
                    >
                        {isSpinning ? "🎰 돌리는 중..." : "🎰 슬롯 돌리기!"}
                    </button>
                </div>

                {/* History */}
                {history.length > 0 && (
                    <div className="bg-white border-4 border-black shadow-brutal p-6">
                        <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                            <span>📜</span>
                            <span>최근 결과</span>
                        </h2>
                        <div className="space-y-2">
                            {history.map((menu, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-pastel-yellow border-2 border-black"
                                >
                                    <span className="font-bold text-lg">{index + 1}. {menu}</span>
                                    <button
                                        onClick={() => {
                                            setResult(menu);
                                            setSelectedCategory("전체");
                                        }}
                                        className="px-3 py-1 bg-white border-2 border-black font-bold text-sm hover:-translate-y-0.5 transition-all"
                                    >
                                        다시 선택
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 상세 컨텐츠 섹션 */}
                <div className="space-y-8 mt-12">
                    {/* 1. 기획 의도 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border border-black shadow-brutal">
                        <h3 className="text-2xl font-black text-black mb-4 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span className="text-3xl">🤔</span>
                            <span>기획 의도: 인류 최대의 난제 해결</span>
                        </h3>
                        <p className="text-slate-800 leading-7 text-lg mb-4 font-medium">
                            "점심 뭐 먹지?" 이 말만 수십 번 하다가 결국 편의점 김밥을 집어든 적, 있지 않으신가요?
                            직장인의 행복한 점심시간이 결정 장애로 인한 스트레스 시간이 되어선 안 됩니다.
                        </p>
                        <p className="text-slate-800 leading-7 text-lg font-medium">
                            <strong>인생 치트키 점심 슬롯머신</strong>은 당신의 고민 시간을 0초로 줄여드립니다.
                            한식, 중식, 일식, 양식... 당기는 장르만 골라 레버를 당기세요.
                            오늘의 운명적인 메뉴가 당신을 기다립니다.
                        </p>
                    </section>

                    {/* 2. 사용 방법 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border border-black shadow-brutal">
                        <h3 className="text-2xl font-black text-black mb-6 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span className="text-3xl">🎰</span>
                            <span>사용 방법</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-neon-yellow border-4 border-black p-5 shadow-brutal-sm">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-black text-lg mb-3 text-white">1</div>
                                <h4 className="font-black text-lg mb-2 text-black">장르 선택</h4>
                                <p className="text-black text-sm font-bold leading-relaxed">
                                    '전체'로 쿨하게 돌릴지, '한식'이나 '면 요리'로 범위를 좁힐지 선택하세요.
                                </p>
                            </div>
                            <div className="bg-neon-pink border-4 border-black p-5 shadow-brutal-sm text-white">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-lg mb-3 text-black">2</div>
                                <h4 className="font-black text-lg mb-2">슬롯 SPIN!</h4>
                                <p className="text-white text-sm font-bold leading-relaxed">
                                    두근두근! 버튼을 누르면 수십 가지 메뉴가 빠르게 돌아갑니다. 과연 오늘의 주인공은?
                                </p>
                            </div>
                            <div className="bg-neon-blue border-4 border-black p-5 shadow-brutal-sm">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-black text-lg mb-3 text-white">3</div>
                                <h4 className="font-black text-lg mb-2 text-black">결과 승복?</h4>
                                <p className="text-black text-sm font-bold leading-relaxed">
                                    나온 메뉴가 마음에 들면 바로 식당으로 GO! 영 아니라면? 눈 딱 감고 한 번만 더 돌리세요.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 3. 관련 지식 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border border-black shadow-brutal">
                        <h3 className="text-2xl font-black text-black mb-6 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span className="text-3xl">😋</span>
                            <span>메뉴 선정 꿀팁</span>
                        </h3>

                        <div className="space-y-6">
                            <div className="bg-pastel-green border-4 border-black p-5 relative">
                                <h4 className="text-lg font-black text-black mb-2">🌧️ 날씨별 추천</h4>
                                <ul className="space-y-1 text-black font-bold text-sm">
                                    <li>• 비 오는 날: 파전에 막걸리, 뜨끈한 칼국수, 짬뽕</li>
                                    <li>• 미세먼지 많은 날: 삼겹살(기분 탓이지만), 기름진 중식</li>
                                    <li>• 폭염: 시원한 냉면, 콩국수, 물회</li>
                                </ul>
                            </div>

                            <div className="bg-pastel-purple border-4 border-black p-5 relative">
                                <h4 className="font-black text-black mb-2">🕰️ 요일별 추천</h4>
                                <ul className="space-y-1 text-black font-bold text-sm">
                                    <li>• 월요일: 월요병 극복을 위한 매운맛 (마라탕, 떡볶이)</li>
                                    <li>• 수요일: 주의 절반! 든든한 고기반찬 (제육, 돈가스)</li>
                                    <li>• 금요일: 한 주 고생한 나를 위한 특식 (초밥, 수제버거)</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
