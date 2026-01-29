"use client";

import { useState } from "react";
import { ScaleIcon, SparklesIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ComparisonItem {
    name: string;
    criteria: { [key: string]: number };
}

export default function VSPage() {
    const [item1Name, setItem1Name] = useState<string>("치킨");
    const [item2Name, setItem2Name] = useState<string>("피자");

    const [item1Scores, setItem1Scores] = useState({
        price: 7,
        taste: 9,
        quantity: 8,
        delivery: 8,
        variety: 7,
    });

    const [item2Scores, setItem2Scores] = useState({
        price: 6,
        taste: 8,
        quantity: 9,
        delivery: 9,
        variety: 8,
    });

    const [showResult, setShowResult] = useState(false);

    const criteriaLabels: { [key: string]: string } = {
        price: "가격",
        taste: "맛",
        quantity: "양",
        delivery: "배달속도",
        variety: "다양성",
    };

    const handleCompare = () => {
        setShowResult(true);
    };

    // 레이더 차트 데이터
    const radarData = Object.keys(item1Scores).map((key) => ({
        criteria: criteriaLabels[key],
        [item1Name]: item1Scores[key as keyof typeof item1Scores],
        [item2Name]: item2Scores[key as keyof typeof item2Scores],
    }));

    // 총점 계산
    const item1Total = Object.values(item1Scores).reduce((a, b) => a + b, 0);
    const item2Total = Object.values(item2Scores).reduce((a, b) => a + b, 0);

    const winner = item1Total > item2Total ? item1Name : item2Total > item1Total ? item2Name : "무승부";

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-yellow">
                <div className="flex items-center gap-3 mb-2">
                    <ScaleIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">⚖️ VS 분석실</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    치킨 vs 피자? 스펙 비교로 현명한 선택!
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 입력 영역 */}
                <div className="space-y-5">
                    {/* 항목 1 */}
                    <div className="bento-card bg-pastel-blue">
                        <h2 className="text-xl font-black mb-4">🥇 항목 1</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block font-bold text-sm mb-2">이름</label>
                                <input
                                    type="text"
                                    value={item1Name}
                                    onChange={(e) => setItem1Name(e.target.value)}
                                    className="neo-input"
                                    placeholder="치킨"
                                />
                            </div>
                            {Object.keys(item1Scores).map((key) => (
                                <div key={key}>
                                    <label className="block font-bold text-sm mb-2">
                                        {criteriaLabels[key]} (1-10)
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={item1Scores[key as keyof typeof item1Scores]}
                                        onChange={(e) =>
                                            setItem1Scores({ ...item1Scores, [key]: Number(e.target.value) })
                                        }
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm font-bold mt-1">
                                        <span>1</span>
                                        <span className="text-lg">{item1Scores[key as keyof typeof item1Scores]}</span>
                                        <span>10</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 항목 2 */}
                    <div className="bento-card bg-pastel-pink">
                        <h2 className="text-xl font-black mb-4">🥈 항목 2</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block font-bold text-sm mb-2">이름</label>
                                <input
                                    type="text"
                                    value={item2Name}
                                    onChange={(e) => setItem2Name(e.target.value)}
                                    className="neo-input"
                                    placeholder="피자"
                                />
                            </div>
                            {Object.keys(item2Scores).map((key) => (
                                <div key={key}>
                                    <label className="block font-bold text-sm mb-2">
                                        {criteriaLabels[key]} (1-10)
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={item2Scores[key as keyof typeof item2Scores]}
                                        onChange={(e) =>
                                            setItem2Scores({ ...item2Scores, [key]: Number(e.target.value) })
                                        }
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm font-bold mt-1">
                                        <span>1</span>
                                        <span className="text-lg">{item2Scores[key as keyof typeof item2Scores]}</span>
                                        <span>10</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 비교 버튼 */}
                    <button
                        onClick={handleCompare}
                        className="w-full py-4 px-6 bg-pastel-purple border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2"
                    >
                        <SparklesIcon className="w-6 h-6" />
                        <span>비교하기</span>
                    </button>
                </div>

                {/* 결과 영역 */}
                <div className="space-y-5">
                    {showResult ? (
                        <>
                            {/* 승자 */}
                            <div className="result-card bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-purple">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <TrophyIcon className="w-6 h-6" />
                                    <span>승자</span>
                                </h2>
                                <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 text-center">
                                    <p className="text-6xl mb-4">🏆</p>
                                    <p className="font-black text-5xl text-yellow-600">{winner}</p>
                                    {winner !== "무승부" && (
                                        <p className="text-sm text-slate-600 mt-3">
                                            총점: {winner === item1Name ? item1Total : item2Total}점
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* 레이더 차트 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4">📊 스펙 비교</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={radarData}>
                                        <PolarGrid stroke="#0f172a" />
                                        <PolarAngleAxis dataKey="criteria" tick={{ fill: "#0f172a", fontWeight: "bold" }} />
                                        <PolarRadiusAxis angle={90} domain={[0, 10]} />
                                        <Radar name={item1Name} dataKey={item1Name} stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} strokeWidth={2} />
                                        <Radar name={item2Name} dataKey={item2Name} stroke="#EC4899" fill="#EC4899" fillOpacity={0.5} strokeWidth={2} />
                                        <Legend wrapperStyle={{ fontWeight: "bold" }} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* 항목별 비교 */}
                            <div className="result-card bg-white">
                                <h3 className="text-lg font-black mb-4">📋 항목별 점수</h3>
                                <div className="space-y-2">
                                    {Object.keys(item1Scores).map((key) => {
                                        const score1 = item1Scores[key as keyof typeof item1Scores];
                                        const score2 = item2Scores[key as keyof typeof item2Scores];
                                        const winner = score1 > score2 ? item1Name : score2 > score1 ? item2Name : "동점";

                                        return (
                                            <div key={key} className="p-3 bg-slate-50 rounded border border-slate-200">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-sm">{criteriaLabels[key]}</span>
                                                    <span className="text-xs font-bold text-slate-600">{winner}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="flex-1 bg-blue-200 rounded p-2 text-center">
                                                        <span className="font-black">{score1}</span>
                                                    </div>
                                                    <div className="flex-1 bg-pink-200 rounded p-2 text-center">
                                                        <span className="font-black">{score2}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 총점 */}
                            <div className="result-card bg-pastel-green">
                                <h3 className="text-lg font-black mb-3">🎯 총점</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white p-4 rounded border-2 border-slate-900 text-center">
                                        <p className="font-bold text-sm mb-1">{item1Name}</p>
                                        <p className="font-black text-3xl text-blue-600">{item1Total}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded border-2 border-slate-900 text-center">
                                        <p className="font-bold text-sm mb-1">{item2Name}</p>
                                        <p className="font-black text-3xl text-pink-600">{item2Total}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <ScaleIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">좌측에 항목을 입력하고</p>
                                <p className="font-black text-xl text-pastel-purple">비교하기 버튼을 눌러주세요!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 팁 섹션 */}
            {/* 상세 컨텐츠 섹션 */}
            <div className="space-y-8 mt-12">
                {/* 1. 기획 의도 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">⚖️</span>
                        <span>기획 의도: 이성적인 선택을 위하여</span>
                    </h3>
                    <p className="text-slate-700 leading-7 text-lg mb-4">
                        "갤럭시냐 아이폰이냐", "짜장이냐 짬뽕이냐"... 인생은 B와 D 사이의 C(Choice)라고 하죠.
                        감정에 치우친 선택은 후회를 남길 때가 많습니다.
                    </p>
                    <p className="text-slate-700 leading-7 text-lg">
                        <strong>인생 치트키 VS 분석실</strong>은 당신의 고민을 객관적인 숫자로 변환합니다.
                        가격, 만족도, 효율 등 다양한 기준을 시각화하여 가장 합리적인 승자를 가려냅니다.
                    </p>
                </section>

                {/* 2. 사용 방법 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🎛️</span>
                        <span>사용 방법</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">1</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">선수 입장</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                고민 중인 두 가지 대상을 입력하세요. (예: A회사 vs B회사, 치킨 vs 피자)
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-pink rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">2</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">점수 매기기</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                가격, 맛(성능), 양(혜택) 등 5가지 항목에 대해 1점부터 10점까지 점수를 부여하세요.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-yellow rounded-full flex items-center justify-center font-black text-lg mb-3 text-slate-900 shadow-sm">3</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">분석 완료</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                오각형 레이더 차트로 장단점을 한눈에 비교하고, 총점이 더 높은 승자를 확인하세요.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. 관련 지식 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">📊</span>
                        <span>분석의 기술</span>
                    </h3>

                    <div className="space-y-6">
                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                            <h4 className="text-lg font-bold text-blue-900 mb-2">💎 가중치(Weight)의 중요성</h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                모든 기준이 똑같이 중요하진 않습니다.
                                노트북을 살 때 '가격'보다 '성능'이 중요하다면, 성능 점수에 ×1.5배, 가격 점수에 ×0.8배를 해보세요.
                                이것이 의사결정 매트릭스(Decision Matrix)의 기본입니다.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-2">🤔 기회비용 (Opportunity Cost)</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                선택하지 않음으로써 포기해야 하는 가치를 생각하세요.
                                싼 물건을 택했을 때의 기회비용은 '품질'과 'A/S 편의성'이 될 수 있습니다.
                                눈앞의 가격표보다 보이지 않는 비용을 고려할 때 현명한 소비가 가능합니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
