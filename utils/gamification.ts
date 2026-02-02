// Gamification Logic for Habit Tracker

import {
    Habit,
    HabitLog,
    UserProgress,
    Achievement,
    HabitDifficulty,
    HabitStreak,
    HABIT_DIFFICULTIES,
    DEFAULT_ACHIEVEMENTS,
} from '@/app/(habit)/habit-tracker/types';

// XP required for each level (exponential growth)
const BASE_XP = 100;
const XP_MULTIPLIER = 1.5;

// Calculate XP earned for completing a habit
export function calculateXP(difficulty: HabitDifficulty, streakBonus: number = 0): number {
    const baseXP = 10;
    const difficultyMultiplier = HABIT_DIFFICULTIES[difficulty].multiplier;
    const streakMultiplier = 1 + (streakBonus * 0.1); // 10% bonus per streak day

    return Math.floor(baseXP * difficultyMultiplier * streakMultiplier);
}

// Calculate XP required for a specific level
export function getXPForLevel(level: number): number {
    return Math.floor(BASE_XP * Math.pow(XP_MULTIPLIER, level - 1));
}

// Get total XP required to reach a level
export function getTotalXPForLevel(level: number): number {
    let total = 0;
    for (let i = 1; i < level; i++) {
        total += getXPForLevel(i);
    }
    return total;
}

// Get level from total XP
export function getLevelFromXP(totalXP: number): number {
    let level = 1;
    let xpRequired = 0;

    while (xpRequired <= totalXP) {
        level++;
        xpRequired += getXPForLevel(level);
    }

    return level - 1;
}

// Get XP progress for current level (0-1 for progress bar)
export function getLevelProgress(totalXP: number): {
    currentLevel: number;
    currentLevelXP: number;
    nextLevelXP: number;
    progress: number;
} {
    const currentLevel = getLevelFromXP(totalXP);
    const totalXPForCurrentLevel = getTotalXPForLevel(currentLevel);
    const currentLevelXP = totalXP - totalXPForCurrentLevel;
    const nextLevelXP = getXPForLevel(currentLevel + 1);
    const progress = nextLevelXP > 0 ? currentLevelXP / nextLevelXP : 0;

    return {
        currentLevel,
        currentLevelXP,
        nextLevelXP,
        progress,
    };
}

// Calculate streak for a specific habit
export function calculateStreak(habitId: string, logs: HabitLog[]): HabitStreak {
    // Filter and sort logs for this habit
    const habitLogs = logs
        .filter(l => l.habitId === habitId && l.completed)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (habitLogs.length === 0) {
        return {
            habitId,
            currentStreak: 0,
            longestStreak: 0,
            lastCompletedDate: null,
        };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the most recent completion was today or yesterday
    const lastLog = habitLogs[0];
    const lastDate = new Date(lastLog.date);
    lastDate.setHours(0, 0, 0, 0);

    const daysSinceLastCompletion = Math.floor(
        (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastCompletion <= 1) {
        currentStreak = 1;

        // Calculate streak from most recent backwards
        for (let i = 0; i < habitLogs.length - 1; i++) {
            const currentDate = new Date(habitLogs[i].date);
            const nextDate = new Date(habitLogs[i + 1].date);
            currentDate.setHours(0, 0, 0, 0);
            nextDate.setHours(0, 0, 0, 0);

            const dayDiff = Math.floor(
                (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (dayDiff === 1) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    // Calculate longest streak
    for (let i = 0; i < habitLogs.length - 1; i++) {
        const currentDate = new Date(habitLogs[i].date);
        const nextDate = new Date(habitLogs[i + 1].date);
        currentDate.setHours(0, 0, 0, 0);
        nextDate.setHours(0, 0, 0, 0);

        const dayDiff = Math.floor(
            (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dayDiff === 1) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 1;
        }
    }

    longestStreak = Math.max(longestStreak, currentStreak, tempStreak);

    return {
        habitId,
        currentStreak,
        longestStreak,
        lastCompletedDate: lastLog.date,
    };
}

// Calculate overall streak across all habits
export function calculateOverallStreak(logs: HabitLog[]): {
    currentStreak: number;
    longestStreak: number;
} {
    // Group logs by date
    const logsByDate = logs
        .filter(l => l.completed)
        .reduce((acc, log) => {
            if (!acc[log.date]) {
                acc[log.date] = [];
            }
            acc[log.date].push(log);
            return acc;
        }, {} as Record<string, HabitLog[]>);

    const dates = Object.keys(logsByDate).sort().reverse();

    if (dates.length === 0) {
        return { currentStreak: 0, longestStreak: 0 };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check current streak
    const lastDate = new Date(dates[0]);
    lastDate.setHours(0, 0, 0, 0);

    const daysSinceLastCompletion = Math.floor(
        (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastCompletion <= 1) {
        currentStreak = 1;

        for (let i = 0; i < dates.length - 1; i++) {
            const currentDate = new Date(dates[i]);
            const nextDate = new Date(dates[i + 1]);
            currentDate.setHours(0, 0, 0, 0);
            nextDate.setHours(0, 0, 0, 0);

            const dayDiff = Math.floor(
                (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (dayDiff === 1) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    // Calculate longest streak
    for (let i = 0; i < dates.length - 1; i++) {
        const currentDate = new Date(dates[i]);
        const nextDate = new Date(dates[i + 1]);
        currentDate.setHours(0, 0, 0, 0);
        nextDate.setHours(0, 0, 0, 0);

        const dayDiff = Math.floor(
            (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dayDiff === 1) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 1;
        }
    }

    longestStreak = Math.max(longestStreak, currentStreak, tempStreak);

    return { currentStreak, longestStreak };
}

// Check for newly earned achievements
export function checkAchievements(
    progress: UserProgress,
    habits: Habit[],
    logs: HabitLog[]
): { newAchievements: Achievement[]; updatedProgress: UserProgress } {
    const newBadges: string[] = [];
    let bonusXP = 0;

    for (const achievement of DEFAULT_ACHIEVEMENTS) {
        // Skip if already earned
        if (progress.badges.includes(achievement.id)) {
            continue;
        }

        let earned = false;

        switch (achievement.requirement.type) {
            case 'first_habit':
                earned = progress.totalHabitsCompleted >= achievement.requirement.value;
                break;

            case 'streak':
                earned = progress.currentStreak >= achievement.requirement.value;
                break;

            case 'total_completions':
                earned = progress.totalHabitsCompleted >= achievement.requirement.value;
                break;

            case 'level':
                earned = progress.level >= achievement.requirement.value;
                break;

            case 'perfect_week':
                // Check if all habits were completed for 7 consecutive days
                earned = checkPerfectWeek(habits, logs);
                break;
        }

        if (earned) {
            newBadges.push(achievement.id);
            bonusXP += achievement.xpReward;
        }
    }

    const newAchievements = DEFAULT_ACHIEVEMENTS.filter(a => newBadges.includes(a.id));

    const updatedProgress: UserProgress = {
        ...progress,
        badges: [...progress.badges, ...newBadges],
        totalXP: progress.totalXP + bonusXP,
        level: getLevelFromXP(progress.totalXP + bonusXP),
    };

    return { newAchievements, updatedProgress };
}

// Check if user completed all habits for 7 consecutive days
function checkPerfectWeek(habits: Habit[], logs: HabitLog[]): boolean {
    if (habits.length === 0) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check last 7 days
    for (let i = 0; i < 7; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateString = checkDate.toISOString().split('T')[0];

        const completedHabitsOnDate = logs.filter(
            l => l.date === dateString && l.completed
        ).length;

        // All habits must be completed on this date
        if (completedHabitsOnDate < habits.length) {
            return false;
        }
    }

    return true;
}

// Get motivational message based on progress
export function getMotivationalMessage(progress: UserProgress, streak: number): string {
    if (streak === 0) {
        return "시작이 반이에요! 오늘 첫 습관을 완료해보세요 🎯";
    } else if (streak < 3) {
        return "좋은 시작이에요! 계속 유지해나가세요 💪";
    } else if (streak < 7) {
        return `${streak}일 연속! 일주일 달성까지 조금만 더 힘내세요! 🔥`;
    } else if (streak < 30) {
        return `대단해요! ${streak}일 연속 달성 중이에요! 🌟`;
    } else {
        return `놀라워요! ${streak}일 연속! 당신은 정말 대단한 사람이에요! 👑`;
    }
}
