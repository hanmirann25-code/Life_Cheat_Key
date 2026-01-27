"use client";

import { useState } from "react";
import { EyeIcon, SparklesIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface TestQuestion {
    id: number;
    type: "color" | "sound" | "taste" | "smell" | "touch";
    question: string;
    options: string[];
    correctAnswer: number;
    emoji: string;
}

const testQuestions: TestQuestion[] = [
    {
        id: 1,
        type: "color",
        question: "다음 중 가장 진한 색은?",
        options: ["하늘색", "파란색", "남색", "청록색"],
        correctAnswer: 2,
        emoji: "🎨",
    },
    {
        id: 2,
        type: "sound",
        question: "가장 높은 음은?",
        options: ["도", "레", "미", "파"],
        correctAnswer: 3,
        emoji: "🎵",
    },
    {
        id: 3,
        type: "taste",
        question: "가장 단 음식은?",
        options: ["사과", "꿀", "설탕", "초콜릿"],
        correctAnswer: 2,
        emoji: "🍯",
    },
    {
        id: 4,
        type: "color",
        question: "빨강 + 파랑 = ?",
        options: ["초록", "보라", "주황", "분홍"],
        correctAnswer: 1,
        emoji: "🎨",
    },
    {
        id: 5,
        type: "smell",
        question: "가장 향이 강한 것은?",
        options: ["장미", "백합", "민트", "라벤더"],
        correctAnswer: 2,
        emoji: "👃",
    },
    {
        id: 6,
        type: "touch",
        question: "가장 부드러운 것은?",
        options: ["솜", "비단", "털", "구름"],
        correctAnswer: 3,
        emoji: "✋",
    },
    {
        id: 7,
        type: "taste",
        question: "가장 매운 것은?",
        options: ["고추", "와사비", "청양고추", "하바네로"],
        correctAnswer: 3,
        emoji: "🌶️",
    },
    {
        id: 8,
        type: "color",
        question: "무지개의 색깔 순서에서 빨강 다음은?",
        options: ["주황", "노랑", "초록", "파랑"],
        correctAnswer: 0,
        emoji: "🌈",
    },
    {
        id: 9,
        type: "sound",
        question: "가장 조용한 소리는?",
        options: ["속삭임", "발소리", "숨소리", "바람소리"],
        correctAnswer: 2,
        emoji: "🤫",
    },
    {
        id: 10,
        type: "smell",
        question: "커피의 주요 향은?",
        options: ["달콤한", "쌉싸름한", "신", "고소한"],
        correctAnswer: 1,
        emoji: "☕",
    },
];

export default function SensoryTestPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState<boolean[]>([]);

    const handleAnswer = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === testQuestions[currentQuestion].correctAnswer;
        setAnswers([...answers, isCorrect]);

        if (isCorrect) {
            setScore(score + 1);
        }

        if (currentQuestion < testQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
        setAnswers([]);
    };

    const getScoreLevel = (score: number) => {
        const percentage = (score / testQuestions.length) * 100;
        if (percentage >= 90) return { text: "감각의 달인!", emoji: "🏆", color: "text-yellow-600" };
        if (percentage >= 70) return { text: "감각이 뛰어나요!", emoji: "🌟", color: "text-blue-600" };
        if (percentage >= 50) return { text: "평균 이상!", emoji: "👍", color: "text-green-600" };
        if (percentage >= 30) return { text: "조금 더 노력!", emoji: "💪", color: "text-orange-600" };
        return { text: "감각 훈련 필요!", emoji: "📚", color: "text-red-600" };
    };

    if (showResult) {
        const level = getScoreLevel(score);
        const percentage = Math.round((score / testQuestions.length) * 100);

        return (
            <div className="space-y-6">
                {/* 페이지 헤더 */}
                <div className="highlight-card bg-gradient-to-r from-pastel-green via-pastel-blue to-pastel-purple">
                    <div className="flex items-center gap-3 mb-2">
                        <EyeIcon className="w-10 h-10" />
                        <h1 className="text-3xl md:text-4xl font-black">👁️ 감각 테스트 결과</h1>
                    </div>
                    <p className="text-base md:text-lg font-medium text-slate-800">
                        당신의 감각 점수는?
                    </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-5">
                    {/* 점수 */}
                    <div className="result-card bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-purple">
                        <h2 className="text-xl font-black mb-4">🎯 최종 점수</h2>
                        <div className="bg-white bg-opacity-70 p-8 rounded border border-slate-900 text-center">
                            <p className="text-6xl mb-4">{level.emoji}</p>
                            <p className={`font-black text-5xl ${level.color}`}>
                                {score} / {testQuestions.length}
                            </p>
                            <p className="font-bold text-2xl mt-3">{level.text}</p>
                            <p className="text-sm text-slate-600 mt-2">정답률: {percentage}%</p>
                        </div>
                    </div>

                    {/* 진행률 바 */}
                    <div className="result-card bg-white">
                        <h3 className="text-lg font-black mb-4">📊 정답률</h3>
                        <div className="relative w-full h-10 bg-slate-200 rounded border-2 border-slate-900 overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-black text-sm">{percentage}%</span>
                            </div>
                        </div>
                    </div>

                    {/* 문제별 결과 */}
                    <div className="result-card bg-white">
                        <h3 className="text-lg font-black mb-4">📋 문제별 결과</h3>
                        <div className="space-y-2">
                            {testQuestions.map((q, index) => (
                                <div
                                    key={q.id}
                                    className={`flex items-center gap-3 p-3 rounded border-2 ${answers[index] ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                                        }`}
                                >
                                    <span className="text-2xl">{q.emoji}</span>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">{q.question}</p>
                                        <p className="text-xs text-slate-600">정답: {q.options[q.correctAnswer]}</p>
                                    </div>
                                    {answers[index] ? (
                                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <XCircleIcon className="w-6 h-6 text-red-600" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 다시하기 버튼 */}
                    <button
                        onClick={handleRestart}
                        className="w-full py-4 px-6 bg-pastel-purple border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2"
                    >
                        <SparklesIcon className="w-6 h-6" />
                        <span>다시 테스트하기</span>
                    </button>
                </div>
            </div>
        );
    }

    const question = testQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-green via-pastel-blue to-pastel-purple">
                <div className="flex items-center gap-3 mb-2">
                    <EyeIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">👁️ 감각 테스트</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    당신의 오감을 테스트해보세요!
                </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-5">
                {/* 진행 상황 */}
                <div className="bento-card bg-white">
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-sm">
                            문제 {currentQuestion + 1} / {testQuestions.length}
                        </span>
                        <span className="font-bold text-sm">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full border border-slate-900 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pastel-blue to-pastel-purple transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* 문제 */}
                <div className="result-card bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-blue">
                    <div className="text-center mb-6">
                        <p className="text-6xl mb-4">{question.emoji}</p>
                        <h2 className="font-black text-2xl">{question.question}</h2>
                    </div>

                    {/* 선택지 */}
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className={`w-full py-4 px-6 border-2 border-slate-900 font-bold text-lg transition-all duration-300 ${selectedAnswer === index
                                        ? "bg-pastel-purple text-white -translate-y-1 shadow-bento-hover"
                                        : "bg-white hover:-translate-y-0.5 shadow-bento"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 다음 버튼 */}
                <button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="w-full py-4 px-6 bg-pastel-green border border-slate-900 font-black text-xl transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SparklesIcon className="w-6 h-6" />
                    <span>{currentQuestion < testQuestions.length - 1 ? "다음 문제" : "결과 보기"}</span>
                </button>

                {/* 현재 점수 */}
                <div className="result-card bg-pastel-mint text-center">
                    <p className="font-bold text-sm mb-1">현재 점수</p>
                    <p className="font-black text-3xl text-green-600">{score}점</p>
                </div>
            </div>
        </div>
    );
}
