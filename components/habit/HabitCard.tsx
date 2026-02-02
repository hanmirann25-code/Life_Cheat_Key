'use client';

import { useState } from 'react';
import { Habit, HABIT_CATEGORIES, HABIT_DIFFICULTIES } from '@/app/(habit)/habit-tracker/types';
import { PencilIcon, TrashIcon, FireIcon, CheckIcon } from '@heroicons/react/24/outline';
import { calculateStreak } from '@/utils/gamification';
import { isHabitCompletedToday } from '@/utils/habitStorage';

interface HabitCardProps {
    habit: Habit;
    onComplete: (habitId: string) => void;
    onEdit: (habit: Habit) => void;
    onDelete: (habitId: string) => void;
}

export default function HabitCard({ habit, onComplete, onEdit, onDelete }: HabitCardProps) {
    const [showCelebration, setShowCelebration] = useState(false);
    const categoryConfig = HABIT_CATEGORIES[habit.category];
    const difficultyConfig = HABIT_DIFFICULTIES[habit.difficulty];
    const isCompleted = isHabitCompletedToday(habit.id);
    const streak = calculateStreak(habit.id, []);

    const handleComplete = () => {
        onComplete(habit.id);
        if (!isCompleted) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 2000);
        }
    };

    return (
        <div className={`relative bg-white border-4 border-black p-6 hover:shadow-brutal-lg transition-all duration-300 ${isCompleted ? 'opacity-75' : ''
            }`}>
            {/* Celebration Animation */}
            {showCelebration && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10 animate-pulse">
                    <div className="text-8xl">🎉</div>
                </div>
            )}
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                    <div className={`text-3xl w-12 h-12 flex items-center justify-center ${categoryConfig.color} border-2 border-black`}>
                        {categoryConfig.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-black line-clamp-1">{habit.name}</h3>
                        <p className="text-sm font-medium text-gray-600 line-clamp-2">{habit.description}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(habit)}
                        className="p-2 hover:bg-gray-100 border-2 border-black transition-colors"
                        title="수정"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(habit.id)}
                        className="p-2 hover:bg-red-100 border-2 border-black transition-colors"
                        title="삭제"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                <div className={`text-xs px-2 py-1 border-2 border-black font-bold ${difficultyConfig.color}`}>
                    {difficultyConfig.name}
                </div>
                {streak.currentStreak > 0 && (
                    <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 border-2 border-black">
                        <FireIcon className="w-4 h-4 text-orange-600" />
                        <span className="font-bold text-orange-600">{streak.currentStreak}일 연속</span>
                    </div>
                )}
            </div>

            {/* Weekly Progress */}
            <div className="mb-4">
                <div className="text-xs font-bold mb-1">주간 목표: {habit.targetCount}회</div>
                <div className="h-2 bg-gray-200 border-2 border-black">
                    <div className="h-full bg-green-400" style={{ width: '0%' }} />
                </div>
            </div>

            {/* Complete Button */}
            <button
                onClick={handleComplete}
                disabled={isCompleted}
                className={`w-full py-3 font-black text-lg border-4 border-black transition-all duration-300 flex items-center justify-center gap-2 ${isCompleted
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-neon-yellow hover:-translate-y-1 hover:shadow-brutal-lg'
                    }`}
            >
                {isCompleted ? (
                    <>
                        <CheckIcon className="w-6 h-6" />
                        오늘 완료!
                    </>
                ) : (
                    '완료하기'
                )}
            </button>
        </div>
    );
}
