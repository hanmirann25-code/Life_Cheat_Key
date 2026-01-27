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

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neon-blue border-4 border-black shadow-brutal p-6 text-center">
                        <div className="text-4xl mb-2">⚡</div>
                        <h3 className="text-xl font-black mb-2">빠른 결정</h3>
                        <p className="text-sm font-medium">
                            고민하지 말고 슬롯에 맡기세요
                        </p>
                    </div>
                    <div className="bg-neon-yellow border-4 border-black shadow-brutal p-6 text-center">
                        <div className="text-4xl mb-2">🎲</div>
                        <h3 className="text-xl font-black mb-2">랜덤 추천</h3>
                        <p className="text-sm font-medium">
                            매번 새로운 메뉴 발견
                        </p>
                    </div>
                    <div className="bg-neon-pink border-4 border-black shadow-brutal p-6 text-center text-white">
                        <div className="text-4xl mb-2">🍜</div>
                        <h3 className="text-xl font-black mb-2">다양한 메뉴</h3>
                        <p className="text-sm font-medium">
                            {allMenus.length}개 이상의 메뉴
                        </p>
                    </div>
                </div>

                {/* Tips */}
                <div className="bg-black text-white border-4 border-black shadow-brutal p-6">
                    <h2 className="text-2xl font-black mb-4 text-neon-yellow">💡 사용 팁</h2>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-neon-yellow font-black">1.</span>
                            <span className="font-medium">카테고리를 선택하면 해당 종류의 메뉴만 나옵니다</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-neon-yellow font-black">2.</span>
                            <span className="font-medium">마음에 안 들면 다시 돌려보세요!</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-neon-yellow font-black">3.</span>
                            <span className="font-medium">최근 결과에서 이전 메뉴를 다시 선택할 수 있습니다</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
