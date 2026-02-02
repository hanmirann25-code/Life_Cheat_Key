'use client';

import { useState } from 'react';
import { HabitCategory, HabitDifficulty, HABIT_CATEGORIES } from '@/app/(habit)/habit-tracker/types';
import { SparklesIcon, PlusIcon } from '@heroicons/react/24/outline';

interface HabitSuggestion {
    name: string;
    description: string;
    category: HabitCategory;
    difficulty: HabitDifficulty;
    reason: string;
}

interface AISuggestionsProps {
    onAddHabit: (suggestion: HabitSuggestion) => void;
}

export default function AISuggestions({ onAddHabit }: AISuggestionsProps) {
    const [goal, setGoal] = useState('');
    const [suggestions, setSuggestions] = useState<HabitSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGetSuggestions = async () => {
        if (!goal.trim()) return;

        setLoading(true);
        setError('');
        setSuggestions([]);

        try {
            const response = await fetch('/api/habit-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'suggest_habits',
                    goal: goal.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error('AI 추천에 실패했습니다');
            }

            const data = await response.json();

            if (data.suggestions && Array.isArray(data.suggestions)) {
                setSuggestions(data.suggestions);
            } else {
                throw new Error('유효하지 않은 응답 형식입니다');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'AI 추천에 실패했습니다');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loading) {
            handleGetSuggestions();
        }
    };

    return (
        <div className="bg-purple-100 border-4 border-black p-6">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                <SparklesIcon className="w-7 h-7" />
                AI 습관 추천
            </h3>

            {/* Input Section */}
            <div className="mb-6">
                <label className="block font-bold mb-2">목표를 입력하세요</label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="예: 건강해지고 싶어요, 생산성을 높이고 싶어요"
                        className="flex-1 px-4 py-3 border-4 border-black font-medium focus:outline-none focus:shadow-brutal-sm"
                        disabled={loading}
                    />
                    <button
                        onClick={handleGetSuggestions}
                        disabled={loading || !goal.trim()}
                        className="px-6 py-3 bg-neon-yellow border-4 border-black font-black hover:-translate-y-1 hover:shadow-brutal-lg transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center gap-2"
                    >
                        <SparklesIcon className="w-5 h-5" />
                        {loading ? '분석 중...' : 'AI 추천받기'}
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-100 border-4 border-red-600 p-4 mb-4">
                    <p className="font-bold text-red-800">{error}</p>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <div className="text-6xl animate-bounce mb-4">🤖</div>
                    <p className="text-lg font-black">AI가 당신의 목표를 분석하고 있어요...</p>
                </div>
            )}

            {/* Suggestions List */}
            {suggestions.length > 0 && !loading && (
                <div className="space-y-4">
                    <h4 className="text-lg font-black">추천 습관 ({suggestions.length}개)</h4>
                    <div className="space-y-3">
                        {suggestions.map((suggestion, index) => {
                            const categoryConfig = HABIT_CATEGORIES[suggestion.category];

                            return (
                                <div
                                    key={index}
                                    className="bg-white border-4 border-black p-4 hover:shadow-brutal-sm transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-2xl">{categoryConfig.icon}</span>
                                                <h4 className="text-lg font-black">{suggestion.name}</h4>
                                                <span className={`text-xs px-2 py-1 border-2 border-black font-bold ${suggestion.difficulty === 'easy' ? 'bg-green-200' :
                                                        suggestion.difficulty === 'medium' ? 'bg-yellow-200' :
                                                            'bg-red-200'
                                                    }`}>
                                                    {suggestion.difficulty === 'easy' ? '쉬움' :
                                                        suggestion.difficulty === 'medium' ? '보통' : '어려움'}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium mb-1">{suggestion.description}</p>
                                            <p className="text-xs text-gray-600 italic">💡 {suggestion.reason}</p>
                                        </div>
                                        <button
                                            onClick={() => onAddHabit(suggestion)}
                                            className="px-4 py-2 bg-neon-pink border-2 border-black font-bold hover:shadow-brutal-sm transition-all flex items-center gap-1 whitespace-nowrap"
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                            추가
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
