// Habit Tracker Types

export type HabitCategory = 'health' | 'productivity' | 'learning' | 'fitness' | 'mindfulness' | 'social' | 'creative' | 'other';

export type HabitDifficulty = 'easy' | 'medium' | 'hard';

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface Habit {
    id: string;
    name: string;
    description: string;
    category: HabitCategory;
    difficulty: HabitDifficulty;
    targetFrequency: HabitFrequency;
    targetCount: number; // How many times per week (for weekly/custom)
    createdAt: string;
    color: string; // Neon color for the habit
}

export interface HabitLog {
    id: string;
    habitId: string;
    date: string; // ISO date string (YYYY-MM-DD)
    completed: boolean;
    notes?: string;
    xpEarned: number;
}

export interface UserProgress {
    totalXP: number;
    level: number;
    badges: string[]; // Array of achievement IDs
    totalHabitsCompleted: number;
    longestStreak: number;
    currentStreak: number;
    joinedDate: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: {
        type: 'streak' | 'total_completions' | 'level' | 'perfect_week' | 'first_habit';
        value: number;
    };
    xpReward: number;
}

export interface GamificationState {
    habits: Habit[];
    logs: HabitLog[];
    progress: UserProgress;
    achievements: Achievement[];
}

export interface HabitStreak {
    habitId: string;
    currentStreak: number;
    longestStreak: number;
    lastCompletedDate: string | null;
}

// Category configurations
export interface CategoryConfig {
    name: string;
    icon: string;
    color: string;
}

export const HABIT_CATEGORIES: Record<HabitCategory, CategoryConfig> = {
    health: { name: '건강', icon: '💚', color: 'bg-green-400' },
    productivity: { name: '생산성', icon: '⚡', color: 'bg-yellow-400' },
    learning: { name: '학습', icon: '📚', color: 'bg-blue-400' },
    fitness: { name: '운동', icon: '💪', color: 'bg-red-400' },
    mindfulness: { name: '마음챙김', icon: '🧘', color: 'bg-purple-400' },
    social: { name: '사회성', icon: '👥', color: 'bg-pink-400' },
    creative: { name: '창의성', icon: '🎨', color: 'bg-orange-400' },
    other: { name: '기타', icon: '✨', color: 'bg-gray-400' },
};

// Difficulty configurations
export const HABIT_DIFFICULTIES = {
    easy: { name: '쉬움', multiplier: 1, color: 'text-green-600' },
    medium: { name: '보통', multiplier: 2, color: 'text-yellow-600' },
    hard: { name: '어려움', multiplier: 3, color: 'text-red-600' },
};

// Default achievements
export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_step',
        name: '첫 걸음',
        description: '첫 번째 습관 완료',
        icon: '🎯',
        requirement: { type: 'first_habit', value: 1 },
        xpReward: 10,
    },
    {
        id: 'week_warrior',
        name: '주간 전사',
        description: '7일 연속 습관 달성',
        icon: '🔥',
        requirement: { type: 'streak', value: 7 },
        xpReward: 50,
    },
    {
        id: 'month_master',
        name: '월간 마스터',
        description: '30일 연속 습관 달성',
        icon: '💪',
        requirement: { type: 'streak', value: 30 },
        xpReward: 200,
    },
    {
        id: 'century_club',
        name: '백 클럽',
        description: '총 100개의 습관 완료',
        icon: '💯',
        requirement: { type: 'total_completions', value: 100 },
        xpReward: 150,
    },
    {
        id: 'habit_hero',
        name: '습관 영웅',
        description: '레벨 10 달성',
        icon: '🌟',
        requirement: { type: 'level', value: 10 },
        xpReward: 100,
    },
    {
        id: 'perfect_week',
        name: '완벽한 주',
        description: '일주일 동안 모든 습관 완료',
        icon: '🏆',
        requirement: { type: 'perfect_week', value: 7 },
        xpReward: 100,
    },
    {
        id: 'legend',
        name: '전설',
        description: '레벨 25 달성',
        icon: '👑',
        requirement: { type: 'level', value: 25 },
        xpReward: 500,
    },
];
