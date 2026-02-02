// Local Storage Utilities for Habit Tracker

import { Habit, HabitLog, UserProgress, GamificationState, DEFAULT_ACHIEVEMENTS } from '@/app/(habit)/habit-tracker/types';

const STORAGE_VERSION = '1.0';
const STORAGE_KEYS = {
    HABITS: 'habit_tracker_habits',
    LOGS: 'habit_tracker_logs',
    PROGRESS: 'habit_tracker_progress',
    VERSION: 'habit_tracker_version',
};

// Initialize default progress
const DEFAULT_PROGRESS: UserProgress = {
    totalXP: 0,
    level: 1,
    badges: [],
    totalHabitsCompleted: 0,
    longestStreak: 0,
    currentStreak: 0,
    joinedDate: new Date().toISOString(),
};

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Load habits from local storage
export function loadHabits(): Habit[] {
    if (!isBrowser) return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.HABITS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading habits:', error);
        return [];
    }
}

// Save habits to local storage
export function saveHabits(habits: Habit[]): void {
    if (!isBrowser) return;

    try {
        localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    } catch (error) {
        console.error('Error saving habits:', error);
    }
}

// Load habit logs from local storage
export function loadLogs(): HabitLog[] {
    if (!isBrowser) return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading logs:', error);
        return [];
    }
}

// Save habit logs to local storage
export function saveLogs(logs: HabitLog[]): void {
    if (!isBrowser) return;

    try {
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
    } catch (error) {
        console.error('Error saving logs:', error);
    }
}

// Load user progress from local storage
export function loadProgress(): UserProgress {
    if (!isBrowser) return DEFAULT_PROGRESS;

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return stored ? JSON.parse(stored) : DEFAULT_PROGRESS;
    } catch (error) {
        console.error('Error loading progress:', error);
        return DEFAULT_PROGRESS;
    }
}

// Save user progress to local storage
export function saveProgress(progress: UserProgress): void {
    if (!isBrowser) return;

    try {
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

// Load all data at once
export function loadAllData(): GamificationState {
    return {
        habits: loadHabits(),
        logs: loadLogs(),
        progress: loadProgress(),
        achievements: DEFAULT_ACHIEVEMENTS,
    };
}

// Save all data at once
export function saveAllData(state: Partial<GamificationState>): void {
    if (state.habits) saveHabits(state.habits);
    if (state.logs) saveLogs(state.logs);
    if (state.progress) saveProgress(state.progress);
}

// Add a new habit
export function addHabit(habit: Habit): void {
    const habits = loadHabits();
    habits.push(habit);
    saveHabits(habits);
}

// Update an existing habit
export function updateHabit(habitId: string, updates: Partial<Habit>): void {
    const habits = loadHabits();
    const index = habits.findIndex(h => h.id === habitId);

    if (index !== -1) {
        habits[index] = { ...habits[index], ...updates };
        saveHabits(habits);
    }
}

// Delete a habit
export function deleteHabit(habitId: string): void {
    const habits = loadHabits();
    const filtered = habits.filter(h => h.id !== habitId);
    saveHabits(filtered);

    // Also delete associated logs
    const logs = loadLogs();
    const filteredLogs = logs.filter(l => l.habitId !== habitId);
    saveLogs(filteredLogs);
}

// Add a habit log entry
export function addLog(log: HabitLog): void {
    const logs = loadLogs();

    // Check if a log already exists for this habit on this date
    const existingIndex = logs.findIndex(
        l => l.habitId === log.habitId && l.date === log.date
    );

    if (existingIndex !== -1) {
        // Update existing log
        logs[existingIndex] = log;
    } else {
        // Add new log
        logs.push(log);
    }

    saveLogs(logs);
}

// Get logs for a specific habit
export function getLogsForHabit(habitId: string): HabitLog[] {
    const logs = loadLogs();
    return logs.filter(l => l.habitId === habitId).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

// Get logs for a specific date
export function getLogsForDate(date: string): HabitLog[] {
    const logs = loadLogs();
    return logs.filter(l => l.date === date);
}

// Get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Check if habit was completed today
export function isHabitCompletedToday(habitId: string): boolean {
    const today = getTodayDate();
    const logs = loadLogs();
    return logs.some(l => l.habitId === habitId && l.date === today && l.completed);
}

// Clear all data (for testing/reset)
export function clearAllData(): void {
    if (!isBrowser) return;

    localStorage.removeItem(STORAGE_KEYS.HABITS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}

// Export data as JSON (for backup)
export function exportData(): string {
    const data = loadAllData();
    return JSON.stringify(data, null, 2);
}

// Import data from JSON (for restore)
export function importData(jsonString: string): boolean {
    try {
        const data = JSON.parse(jsonString);
        if (data.habits) saveHabits(data.habits);
        if (data.logs) saveLogs(data.logs);
        if (data.progress) saveProgress(data.progress);
        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
}
