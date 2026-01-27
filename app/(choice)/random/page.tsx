"use client";

import { useState } from "react";
import { GiftIcon, SparklesIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface Category {
    name: string;
    emoji: string;
    items: string[];
}

const categories: Category[] = [
    {
        name: "음식",
        emoji: "🍽️",
        items: ["치킨", "피자", "햄버거", "초밥", "파스타", "떡볶이", "라면", "삼겹살", "족발", "보쌈", "찜닭", "갈비", "냉면", "짜장면", "짬뽕"],
    },
    {
        name: "영화",
        emoji: "🎬",
        items: ["액션", "코미디", "로맨스", "스릴러", "SF", "호러", "애니메이션", "다큐멘터리", "판타지", "드라마", "범죄", "전쟁", "뮤지컬", "서부극", "느와르"],
    },
    {
        name: "여행지",
        emoji: "✈️",
        items: ["제주도", "부산", "강릉", "경주", "전주", "여수", "속초", "대구", "인천", "수원", "춘천", "통영", "남해", "거제", "포항"],
    },
    {
        name: "취미",
        emoji: "🎨",
        items: ["독서", "운동", "요리", "게임", "영화감상", "음악감상", "그림그리기", "사진촬영", "등산", "낚시", "캠핑", "자전거", "수영", "요가", "명상"],
    },
    {
        name: "음료",
        emoji: "🥤",
        items: ["커피", "녹차", "홍차", "우유", "주스", "탄산음료", "스무디", "밀크티", "아이스티", "레모네이드", "에이드", "라떼", "아메리카노", "카푸치노", "에스프레소"],
    },
    {
        name: "디저트",
        emoji: "🍰",
        items: ["케이크", "쿠키", "마카롱", "아이스크림", "푸딩", "타르트", "도넛", "와플", "팬케이크", "브라우니", "티라미수", "크레페", "슈크림", "에클레어", "마들렌"],
    },
];

export default function RandomRecommenderPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    const handleSpin = () => {
        setIsSpinning(true);
        setResult(null);

        // 슬롯머신 효과
        let count = 0;
        const interval = setInterval(() => {
            const randomItem = selectedCategory.items[Math.floor(Math.random() * selectedCategory.items.length)];
            setResult(randomItem);
            count++;

            if (count >= 20) {
                clearInterval(interval);
                setIsSpinning(false);

                // 최종 결과
                const finalResult = selectedCategory.items[Math.floor(Math.random() * selectedCategory.items.length)];
                setResult(finalResult);

                // 히스토리에 추가
                setHistory((prev) => [finalResult, ...prev.slice(0, 9)]);
            }
        }, 100);
    };

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-yellow via-pastel-pink to-pastel-purple">
                <div className="flex items-center gap-3 mb-2">
                    <GiftIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">🎁 랜덤 추천</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    뭐 먹을지 고민될 때? 랜덤으로 추천받으세요!
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 영역 */}
                <div className="bento-card space-y-5">
                    <h2 className="text-xl font-black pb-2">🎯 카테고리 선택</h2>

                    {/* 카테고리 선택 */}
                    <div className="grid grid-cols-2 gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category)}
                                disabled={isSpinning}
                                className={`py-4 px-4 border border-slate-900 font-bold text-base transition-all duration-300 ${selectedCategory.name === category.name
                                        ? "bg-pastel-purple text-white -translate-y-1 shadow-bento-hover"
                                        : "bg-white hover:-translate-y-0.5 shadow-bento"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <div className="text-3xl mb-1">{category.emoji}</div>
                                <div>{category.name}</div>
                            </button>
                        ))}
                    </div>

                    {/* 선택된 카테고리 정보 */}
                    <div className="result-card bg-pastel-blue">
                        <h3 className="text-lg font-black mb-2">📋 선택된 카테고리</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{selectedCategory.emoji}</span>
                            <div>
                                <p className="font-black text-xl">{selectedCategory.name}</p>
                                <p className="text-sm font-medium text-slate-600">
                                    {selectedCategory.items.length}개 항목
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 추천 버튼 */}
                    <button
                        onClick={handleSpin}
                        disabled={isSpinning}
                        className="w-full py-4 px-6 bg-pastel-yellow border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSpinning ? (
                            <>
                                <ArrowPathIcon className="w-6 h-6 animate-spin" />
                                <span>추천 중...</span>
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="w-6 h-6" />
                                <span>랜덤 추천!</span>
                            </>
                        )}
                    </button>
                </div>

                {/* 결과 영역 */}
                <div className="space-y-5">
                    {result ? (
                        <>
                            {/* 추천 결과 */}
                            <div className="result-card bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-yellow">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <GiftIcon className="w-6 h-6" />
                                    <span>추천 결과</span>
                                </h2>
                                <div className="bg-white bg-opacity-70 p-8 rounded border border-slate-900 text-center">
                                    <p className="text-6xl mb-4">{selectedCategory.emoji}</p>
                                    <p className={`font-black text-5xl ${isSpinning ? "animate-pulse" : ""}`}>
                                        {result}
                                    </p>
                                    {!isSpinning && (
                                        <p className="text-sm text-slate-600 mt-4">
                                            이걸로 결정! 🎉
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* 다시 뽑기 */}
                            {!isSpinning && (
                                <div className="result-card bg-pastel-green">
                                    <div className="text-center">
                                        <p className="text-2xl mb-2">🔄</p>
                                        <p className="font-bold text-base mb-3">마음에 안 드시나요?</p>
                                        <button
                                            onClick={handleSpin}
                                            className="py-2 px-6 bg-white border border-slate-900 font-bold text-sm transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            다시 뽑기
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* 히스토리 */}
                            {history.length > 0 && !isSpinning && (
                                <div className="result-card bg-white">
                                    <h3 className="text-lg font-black mb-3">📜 추천 히스토리</h3>
                                    <div className="space-y-2">
                                        {history.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-200"
                                            >
                                                <span className="font-bold text-sm text-slate-500">#{index + 1}</span>
                                                <span className="font-black text-base">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <GiftIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">카테고리를 선택하고</p>
                                <p className="font-black text-xl text-pastel-purple">랜덤 추천 버튼을 눌러주세요!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 팁 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="result-card bg-neon-yellow text-center">
                    <div className="text-4xl mb-2">🎲</div>
                    <h3 className="text-lg font-black mb-2">완전 랜덤</h3>
                    <p className="text-sm font-medium">공정한 랜덤 추천!</p>
                </div>
                <div className="result-card bg-neon-pink text-white text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h3 className="text-lg font-black mb-2">빠른 결정</h3>
                    <p className="text-sm font-medium">고민 끝! 바로 결정</p>
                </div>
                <div className="result-card bg-neon-blue text-center">
                    <div className="text-4xl mb-2">🎁</div>
                    <h3 className="text-lg font-black mb-2">새로운 발견</h3>
                    <p className="text-sm font-medium">의외의 선택이 최고!</p>
                </div>
            </div>
        </div>
    );
}
