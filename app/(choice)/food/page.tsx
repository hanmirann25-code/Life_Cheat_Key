"use client";

import { useState } from "react";
import { HeartIcon, SparklesIcon, FireIcon } from "@heroicons/react/24/outline";

interface FoodPair {
    food1: string;
    food2: string;
    compatibility: number;
    reason: string;
}

// 음식 궁합 데이터베이스
const foodCompatibilityDB: { [key: string]: { [key: string]: { score: number; reason: string } } } = {
    치킨: {
        맥주: { score: 95, reason: "치맥은 한국의 대표 조합! 완벽한 궁합이에요 🍺" },
        콜라: { score: 85, reason: "탄산의 청량함이 기름진 치킨과 잘 어울려요" },
        피클: { score: 90, reason: "느끼함을 잡아주는 최고의 조합!" },
        치즈: { score: 80, reason: "치즈 퐁듀 치킨? 맛있지만 칼로리 폭탄!" },
        샐러드: { score: 70, reason: "건강을 생각한다면 좋은 선택이에요" },
    },
    피자: {
        콜라: { score: 90, reason: "피자와 콜라는 클래식한 조합이죠!" },
        맥주: { score: 85, reason: "피맥도 나쁘지 않은 선택!" },
        피클: { score: 75, reason: "느끼함을 줄여주는 역할" },
        샐러드: { score: 80, reason: "건강한 균형을 맞춰줘요" },
        핫소스: { score: 88, reason: "매콤함이 피자의 맛을 업그레이드!" },
    },
    라면: {
        김치: { score: 95, reason: "라면에 김치는 필수! 한국인의 소울푸드" },
        계란: { score: 90, reason: "계란 라면은 영양과 맛을 모두 잡아요" },
        치즈: { score: 85, reason: "치즈 라면은 부드럽고 고소해요" },
        만두: { score: 88, reason: "라면 + 만두 = 탄수화물 천국" },
        밥: { score: 80, reason: "라면 국물에 밥 말아먹기, 최고죠!" },
    },
    커피: {
        케이크: { score: 92, reason: "커피와 케이크는 카페의 정석!" },
        쿠키: { score: 88, reason: "달콤한 쿠키와 쌉싸름한 커피의 조화" },
        샌드위치: { score: 85, reason: "브런치로 완벽한 조합" },
        초콜릿: { score: 90, reason: "달콤 쌉싸름한 환상의 조합" },
        빵: { score: 87, reason: "모닝 커피와 빵, 하루의 시작!" },
    },
    삼겹살: {
        소주: { score: 95, reason: "삼소는 한국의 대표 조합! 🥃" },
        쌈채소: { score: 90, reason: "느끼함을 잡아주는 필수 아이템" },
        김치: { score: 92, reason: "구운 김치와 삼겹살, 환상적!" },
        마늘: { score: 88, reason: "구운 마늘의 고소함이 일품" },
        된장찌개: { score: 85, reason: "삼겹살에 된장찌개는 클래식" },
    },
};

const popularFoods = ["치킨", "피자", "라면", "커피", "삼겹살", "햄버거", "초밥", "떡볶이"];

export default function FoodCompatibilityPage() {
    const [food1, setFood1] = useState<string>("");
    const [food2, setFood2] = useState<string>("");
    const [result, setResult] = useState<FoodPair | null>(null);

    const handleCheck = () => {
        // 데이터베이스에서 찾기
        let compatibility = 50;
        let reason = "이 조합은 시도해볼 만해요! 🤔";

        if (food1 && food2) {
            // 정확히 일치하는 경우
            if (foodCompatibilityDB[food1]?.[food2]) {
                compatibility = foodCompatibilityDB[food1][food2].score;
                reason = foodCompatibilityDB[food1][food2].reason;
            } else if (foodCompatibilityDB[food2]?.[food1]) {
                compatibility = foodCompatibilityDB[food2][food1].score;
                reason = foodCompatibilityDB[food2][food1].reason;
            } else {
                // 랜덤 생성 (재미 요소)
                compatibility = Math.floor(Math.random() * 40) + 50; // 50-90
                const reasons = [
                    "새로운 조합이네요! 한번 시도해보세요!",
                    "독특한 조합이에요. 모험심이 있으시네요!",
                    "이 조합은 처음 봐요. 창의적이에요!",
                    "의외로 잘 어울릴 수도 있어요!",
                    "도전적인 선택이네요! 용기 있으시네요!",
                ];
                reason = reasons[Math.floor(Math.random() * reasons.length)];
            }

            setResult({
                food1,
                food2,
                compatibility,
                reason,
            });
        }
    };

    const getCompatibilityLevel = (score: number) => {
        if (score >= 90) return { text: "환상의 조합!", emoji: "💯", color: "text-green-600" };
        if (score >= 80) return { text: "최고의 궁합!", emoji: "😍", color: "text-blue-600" };
        if (score >= 70) return { text: "좋은 조합!", emoji: "😊", color: "text-yellow-600" };
        if (score >= 60) return { text: "괜찮은 조합", emoji: "🙂", color: "text-orange-600" };
        return { text: "도전적인 조합", emoji: "🤔", color: "text-slate-600" };
    };

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue">
                <div className="flex items-center gap-3 mb-2">
                    <HeartIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">💕 음식 궁합</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    치킨 + 맥주 = 치맥! 음식 궁합을 확인해보세요!
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 영역 */}
                <div className="bento-card space-y-5">
                    <h2 className="text-xl font-black pb-2">🍽️ 음식 입력</h2>

                    {/* 음식 1 */}
                    <div>
                        <label className="block font-bold text-base mb-2">첫 번째 음식</label>
                        <input
                            type="text"
                            value={food1}
                            onChange={(e) => setFood1(e.target.value)}
                            className="neo-input"
                            placeholder="예: 치킨"
                        />
                    </div>

                    {/* 빠른 선택 1 */}
                    <div>
                        <label className="block font-bold text-sm mb-2">빠른 선택</label>
                        <div className="grid grid-cols-4 gap-2">
                            {popularFoods.slice(0, 4).map((food) => (
                                <button
                                    key={food}
                                    onClick={() => setFood1(food)}
                                    className={`py-2 px-2 border border-slate-900 font-bold text-xs transition-all duration-300 ${food1 === food
                                            ? "bg-pastel-pink -translate-y-1 shadow-bento-hover"
                                            : "bg-white hover:-translate-y-0.5 shadow-bento"
                                        }`}
                                >
                                    {food}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 음식 2 */}
                    <div>
                        <label className="block font-bold text-base mb-2">두 번째 음식</label>
                        <input
                            type="text"
                            value={food2}
                            onChange={(e) => setFood2(e.target.value)}
                            className="neo-input"
                            placeholder="예: 맥주"
                        />
                    </div>

                    {/* 빠른 선택 2 */}
                    <div>
                        <label className="block font-bold text-sm mb-2">빠른 선택</label>
                        <div className="grid grid-cols-4 gap-2">
                            {popularFoods.slice(4, 8).map((food) => (
                                <button
                                    key={food}
                                    onClick={() => setFood2(food)}
                                    className={`py-2 px-2 border border-slate-900 font-bold text-xs transition-all duration-300 ${food2 === food
                                            ? "bg-pastel-blue -translate-y-1 shadow-bento-hover"
                                            : "bg-white hover:-translate-y-0.5 shadow-bento"
                                        }`}
                                >
                                    {food}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 확인 버튼 */}
                    <button
                        onClick={handleCheck}
                        disabled={!food1 || !food2}
                        className="w-full py-4 px-6 bg-pastel-purple border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SparklesIcon className="w-6 h-6" />
                        <span>궁합 확인</span>
                    </button>
                </div>

                {/* 결과 영역 */}
                <div className="space-y-5">
                    {result ? (
                        <>
                            {/* 궁합 점수 */}
                            <div className="result-card bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-yellow">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <FireIcon className="w-6 h-6" />
                                    <span>궁합 점수</span>
                                </h2>
                                <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 text-center">
                                    <p className="text-6xl mb-4">{getCompatibilityLevel(result.compatibility).emoji}</p>
                                    <p className={`font-black text-5xl ${getCompatibilityLevel(result.compatibility).color}`}>
                                        {result.compatibility}점
                                    </p>
                                    <p className="font-bold text-lg mt-3">{getCompatibilityLevel(result.compatibility).text}</p>
                                </div>
                            </div>

                            {/* 궁합 바 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4">📊 궁합 레벨</h3>
                                <div className="relative w-full h-10 bg-slate-200 rounded border-2 border-slate-900 overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 transition-all duration-500"
                                        style={{ width: `${result.compatibility}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="font-black text-sm">{result.compatibility}%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs font-bold mt-2">
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                            </div>

                            {/* 조합 */}
                            <div className="result-card bg-pastel-yellow">
                                <h3 className="text-lg font-black mb-3">🍴 조합</h3>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="bg-white px-6 py-3 rounded border-2 border-slate-900">
                                        <p className="font-black text-2xl">{result.food1}</p>
                                    </div>
                                    <span className="text-3xl">+</span>
                                    <div className="bg-white px-6 py-3 rounded border-2 border-slate-900">
                                        <p className="font-black text-2xl">{result.food2}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 이유 */}
                            <div className="result-card bg-pastel-green">
                                <h3 className="text-lg font-black mb-3">💬 평가</h3>
                                <p className="text-base font-medium text-slate-800">{result.reason}</p>
                            </div>

                            {/* 추천 조합 */}
                            <div className="result-card bg-pastel-blue">
                                <h3 className="text-lg font-black mb-3">✨ 인기 조합</h3>
                                <div className="space-y-2 text-sm font-medium">
                                    <div className="flex justify-between">
                                        <span>치킨 + 맥주</span>
                                        <span className="font-black">95점</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>삼겹살 + 소주</span>
                                        <span className="font-black">95점</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>라면 + 김치</span>
                                        <span className="font-black">95점</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>커피 + 케이크</span>
                                        <span className="font-black">92점</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <HeartIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">좌측에 음식을 입력하고</p>
                                <p className="font-black text-xl text-pastel-purple">궁합 확인 버튼을 눌러주세요!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 팁 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="result-card bg-neon-pink text-white text-center">
                    <div className="text-4xl mb-2">💕</div>
                    <h3 className="text-lg font-black mb-2">음식 궁합</h3>
                    <p className="text-sm font-medium">과학적 근거는 없지만 재미있어요!</p>
                </div>
                <div className="result-card bg-neon-yellow text-center">
                    <div className="text-4xl mb-2">🍽️</div>
                    <h3 className="text-lg font-black mb-2">새로운 조합</h3>
                    <p className="text-sm font-medium">다양한 음식을 시도해보세요</p>
                </div>
                <div className="result-card bg-neon-blue text-center">
                    <div className="text-4xl mb-2">😋</div>
                    <h3 className="text-lg font-black mb-2">맛의 발견</h3>
                    <p className="text-sm font-medium">의외의 조합이 최고일 수도!</p>
                </div>
            </div>
        </div>
    );
}
