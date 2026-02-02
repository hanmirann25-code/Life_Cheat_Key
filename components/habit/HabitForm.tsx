'use client';

import { useState } from 'react';
import { HabitCategory, HabitDifficulty, HABIT_CATEGORIES, HABIT_DIFFICULTIES } from '@/app/(habit)/habit-tracker/types';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface HabitFormProps {
    habit?: {
        id: string;
        name: string;
        description: string;
        category: HabitCategory;
        difficulty: HabitDifficulty;
        targetFrequency: 'daily' | 'weekly';
        targetCount: number;
        color?: string;
        createdAt: string;
    } | null;
    onSave: (habitData: {
        name: string;
        description: string;
        category: HabitCategory;
        difficulty: HabitDifficulty;
        targetFrequency: 'daily' | 'weekly';
        targetCount: number;
        color: string;
    }) => void;
    onCancel: () => void;
}

export default function HabitForm({ habit, onSave, onCancel }: HabitFormProps) {
    const [name, setName] = useState(habit?.name || '');
    const [description, setDescription] = useState(habit?.description || '');
    const [category, setCategory] = useState<HabitCategory>(habit?.category || 'health');
    const [difficulty, setDifficulty] = useState<HabitDifficulty>(habit?.difficulty || 'medium');
    const [targetCount, setTargetCount] = useState(habit?.targetCount || 7);
    const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
    const [aiSuggesting, setAiSuggesting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { name?: string; description?: string } = {};
        if (!name.trim()) newErrors.name = '습관 이름을 입력하세요';
        if (!description.trim()) newErrors.description = '설명을 입력하세요';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave({
            name: name.trim(),
            description: description.trim(),
            category,
            difficulty,
            targetFrequency: 'daily',
            targetCount,
            color: HABIT_CATEGORIES[category].color,
        });
    };

    const handleAISuggest = async () => {
        if (!name.trim()) return;

        setAiSuggesting(true);
        try {
            const response = await fetch('/api/habit-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'analyze_difficulty',
                    habitName: name,
                    habitDescription: description,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.difficulty) {
                    setDifficulty(data.difficulty);
                }
            }
        } catch (error) {
            console.error('AI difficulty analysis failed:', error);
        } finally {
            setAiSuggesting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-neon-yellow border-b-4 border-black p-6 flex justify-between items-center sticky top-0">
                    <h2 className="text-2xl font-black">
                        {habit ? '습관 수정' : '새 습관 추가'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-black"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block font-black mb-2">습관 이름 *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-3 border-4 ${errors.name ? 'border-red-500' : 'border-black'
                                } font-medium focus:outline-none focus:shadow-brutal-sm`}
                            placeholder="예: 아침 운동하기"
                        />
                        {errors.name && (
                            <p className="text-red-600 font-bold text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-black mb-2">설명 *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full px-4 py-3 border-4 ${errors.description ? 'border-red-500' : 'border-black'
                                } font-medium focus:outline-none focus:shadow-brutal-sm resize-none`}
                            rows={3}
                            placeholder="예: 매일 아침 7시에 30분간 조깅하기"
                        />
                        {errors.description && (
                            <p className="text-red-600 font-bold text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-black mb-2">카테고리</label>
                        <div className="grid grid-cols-4 gap-3">
                            {Object.entries(HABIT_CATEGORIES).map(([key, config]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setCategory(key as HabitCategory)}
                                    className={`p-3 border-4 border-black font-bold transition-all ${category === key
                                            ? `${config.color} shadow-brutal-sm`
                                            : 'bg-white hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{config.icon}</div>
                                    <div className="text-sm">{config.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="block font-black mb-2">난이도</label>
                        <div className="grid grid-cols-3 gap-3">
                            {Object.entries(HABIT_DIFFICULTIES).map(([key, config]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setDifficulty(key as HabitDifficulty)}
                                    className={`p-4 border-4 border-black font-bold transition-all ${difficulty === key
                                            ? 'bg-neon-yellow shadow-brutal-sm'
                                            : 'bg-white hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={config.color}>{config.name}</div>
                                    <div className="text-xs mt-1 text-gray-600">
                                        XP × {config.multiplier}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleAISuggest}
                            disabled={aiSuggesting || !name.trim()}
                            className="mt-3 px-4 py-2 bg-purple-400 border-2 border-black font-bold text-sm hover:shadow-brutal-sm transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            <SparklesIcon className="w-4 h-4" />
                            {aiSuggesting ? '분석 중...' : 'AI 난이도 분석'}
                        </button>
                    </div>

                    {/* Target Frequency */}
                    <div>
                        <label className="block font-black mb-2">주간 목표</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="1"
                                max="7"
                                value={targetCount}
                                onChange={(e) => setTargetCount(Number(e.target.value))}
                                className="flex-1"
                            />
                            <div className="font-black text-xl border-4 border-black px-4 py-2 bg-neon-pink">
                                {targetCount === 7 ? '매일' : `주 ${targetCount}회`}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t-4 border-black">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-3 font-black bg-gray-200 border-4 border-black hover:shadow-brutal-sm transition-all"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 font-black bg-neon-yellow border-4 border-black hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                        >
                            {habit ? '수정하기' : '추가하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
