'use client';

import { useState, useEffect } from 'react';
import { Habit, HabitLog, UserProgress, HabitCategory, HabitDifficulty } from './types';
import {
    loadAllData,
    saveAllData,
    addHabit as saveNewHabit,
    updateHabit as saveUpdatedHabit,
    deleteHabit as removeHabit,
    addLog,
    getTodayDate,
    isHabitCompletedToday,
} from '@/utils/habitStorage';
import {
    calculateXP,
    calculateStreak,
    calculateOverallStreak,
    checkAchievements,
    getLevelFromXP,
    getMotivationalMessage,
} from '@/utils/gamification';
import HabitCard from '@/components/habit/HabitCard';
import HabitForm from '@/components/habit/HabitForm';
import ProgressDashboard from '@/components/habit/ProgressDashboard';
import AISuggestions from '@/components/habit/AISuggestions';
import { PlusIcon, SparklesIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function HabitTrackerPage() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [logs, setLogs] = useState<HabitLog[]>([]);
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
    const [showAI, setShowAI] = useState(false);
    const [motivationalMsg, setMotivationalMsg] = useState('');
    const [newAchievementAlert, setNewAchievementAlert] = useState<string | null>(null);

    // Load data on mount
    useEffect(() => {
        const data = loadAllData();
        setHabits(data.habits);
        setLogs(data.logs);
        setProgress(data.progress);

        // Calculate motivational message
        const overallStreak = calculateOverallStreak(data.logs);
        const msg = getMotivationalMessage(data.progress, overallStreak.currentStreak);
        setMotivationalMsg(msg);
    }, []);

    // Save habit (new or edit)
    const handleSaveHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
        if (editingHabit) {
            // Update existing habit
            const updated = { ...editingHabit, ...habitData };
            saveUpdatedHabit(editingHabit.id, habitData);
            setHabits(habits.map(h => h.id === editingHabit.id ? updated : h));
        } else {
            // Create new habit
            const newHabit: Habit = {
                ...habitData,
                id: `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                createdAt: new Date().toISOString(),
            };
            saveNewHabit(newHabit);
            setHabits([...habits, newHabit]);
        }

        setShowForm(false);
        setEditingHabit(null);
    };

    // Delete habit
    const handleDeleteHabit = (habitId: string) => {
        if (confirm('정말 이 습관을 삭제하시겠습니까?')) {
            removeHabit(habitId);
            setHabits(habits.filter(h => h.id !== habitId));
            setLogs(logs.filter(l => l.habitId !== habitId));
        }
    };

    // Complete/uncomplete habit
    const handleCompleteHabit = (habitId: string) => {
        const habit = habits.find(h => h.id === habitId);
        if (!habit || !progress) return;

        const today = getTodayDate();
        const alreadyCompleted = isHabitCompletedToday(habitId);
        const completed = !alreadyCompleted;

        // Calculate XP
        const streak = calculateStreak(habitId, logs);
        const xpEarned = completed ? calculateXP(habit.difficulty, streak.currentStreak) : 0;

        // Create log entry
        const logEntry: HabitLog = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            habitId,
            date: today,
            completed,
            xpEarned,
        };

        addLog(logEntry);
        const updatedLogs = alreadyCompleted
            ? logs.map(l => l.habitId === habitId && l.date === today ? logEntry : l)
            : [...logs, logEntry];
        setLogs(updatedLogs);

        // Update progress
        const newTotalXP = completed ? progress.totalXP + xpEarned : Math.max(0, progress.totalXP - xpEarned);
        const newTotalCompleted = completed ? progress.totalHabitsCompleted + 1 : Math.max(0, progress.totalHabitsCompleted - 1);
        const overallStreak = calculateOverallStreak(updatedLogs);

        let updatedProgress: UserProgress = {
            ...progress,
            totalXP: newTotalXP,
            level: getLevelFromXP(newTotalXP),
            totalHabitsCompleted: newTotalCompleted,
            currentStreak: overallStreak.currentStreak,
            longestStreak: Math.max(progress.longestStreak, overallStreak.longestStreak),
        };

        // Check for new achievements
        const { newAchievements, updatedProgress: progressWithBadges } = checkAchievements(
            updatedProgress,
            habits,
            updatedLogs
        );

        if (newAchievements.length > 0) {
            setNewAchievementAlert(
                `🎉 새로운 배지 획득! ${newAchievements.map(a => a.name).join(', ')}`
            );
            setTimeout(() => setNewAchievementAlert(null), 5000);
            updatedProgress = progressWithBadges;
        }

        setProgress(updatedProgress);
        saveAllData({ habits, logs: updatedLogs, progress: updatedProgress });

        // Update motivational message
        const msg = getMotivationalMessage(updatedProgress, overallStreak.currentStreak);
        setMotivationalMsg(msg);
    };

    // Add habit from AI suggestion
    const handleAddFromAI = (suggestion: {
        name: string;
        description: string;
        category: HabitCategory;
        difficulty: HabitDifficulty;
    }) => {
        const newHabit: Habit = {
            id: `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: suggestion.name,
            description: suggestion.description,
            category: suggestion.category,
            difficulty: suggestion.difficulty,
            targetFrequency: 'daily',
            targetCount: 7,
            createdAt: new Date().toISOString(),
            color: '#FAFF00',
        };

        saveNewHabit(newHabit);
        setHabits([...habits, newHabit]);
    };

    if (!progress) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-4xl font-black">로딩 중...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-neon-yellow border-b-8 border-black py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-black mb-4">
                            습관 형성 게임 🎯
                        </h1>
                        <p className="text-xl font-bold">
                            목표를 게임처럼 달성하고 레벨업하세요!
                        </p>
                    </div>
                </div>
            </section>

            {/* New Achievement Alert */}
            {newAchievementAlert && (
                <div className="fixed top-4 right-4 z-50 bg-neon-pink border-4 border-black p-4 shadow-brutal-lg animate-bounce">
                    <p className="font-black text-lg">{newAchievementAlert}</p>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Progress Dashboard */}
                <div className="mb-12">
                    <ProgressDashboard progress={progress} motivationalMessage={motivationalMsg} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => {
                            setEditingHabit(null);
                            setShowForm(true);
                        }}
                        className="px-6 py-3 bg-neon-yellow border-4 border-black font-black text-lg hover:-translate-y-1 hover:shadow-brutal-lg transition-all flex items-center gap-2"
                    >
                        <PlusIcon className="w-6 h-6" />
                        새 습관 추가
                    </button>
                    <button
                        onClick={() => setShowAI(!showAI)}
                        className="px-6 py-3 bg-neon-pink border-4 border-black font-black text-lg hover:-translate-y-1 hover:shadow-brutal-lg transition-all flex items-center gap-2"
                    >
                        <SparklesIcon className="w-6 h-6" />
                        {showAI ? 'AI 추천 닫기' : 'AI 습관 추천'}
                    </button>
                </div>

                {/* AI Suggestions */}
                {showAI && (
                    <div className="mb-12">
                        <AISuggestions onAddHabit={handleAddFromAI} />
                    </div>
                )}

                {/* Habits List */}
                <div className="mb-12">
                    <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
                        <ChartBarIcon className="w-8 h-8" />
                        내 습관 목록 ({habits.length})
                    </h2>

                    {habits.length === 0 ? (
                        <div className="bg-gray-100 border-4 border-dashed border-gray-400 p-12 text-center">
                            <div className="text-6xl mb-4">🎯</div>
                            <h3 className="text-2xl font-black mb-2">아직 습관이 없어요!</h3>
                            <p className="text-lg font-medium text-gray-600 mb-6">
                                첫 번째 습관을 추가하고 레벨업을 시작하세요
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-8 py-4 bg-neon-yellow border-4 border-black font-black text-lg hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                            >
                                첫 습관 추가하기
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {habits.map(habit => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    onComplete={handleCompleteHabit}
                                    onEdit={(h) => {
                                        setEditingHabit(h);
                                        setShowForm(true);
                                    }}
                                    onDelete={handleDeleteHabit}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/* SEO 최적화 콘텐츠 섹션 */}
                <div className="space-y-8 mt-12">
                    {/* 1. 기획 의도 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border-4 border-black shadow-brutal">
                        <h2 className="text-2xl font-black text-black mb-4 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span className="text-3xl">🎯</span>
                            <span>기획 의도: 왜 습관 형성 게임인가?</span>
                        </h2>
                        <div className="space-y-4">
                            <p className="text-slate-800 leading-7 text-lg font-medium">
                                "운동 시작해야지", "독서 습관 들여야지"… 작심삼일로 끝난 새해 결심, 몇 개나 되시나요?
                                인간의 의지력만으로 습관을 만드는 건 생각보다 어렵습니다.
                                <strong className="text-black"> 그래서 우리는 '재미'를 더했습니다.</strong>
                            </p>
                            <p className="text-slate-800 leading-7 text-lg font-medium">
                                <strong className="text-black">습관 형성 게임</strong>은 단순한 할 일 관리가 아닙니다.
                                습관 완료 시마다 XP를 획득하고, 레벨업하며, 배지를 모으는 <strong className="text-black">게이미피케이션 시스템</strong>으로
                                지루한 루틴을 RPG 게임처럼 즐겁게 만들어줍니다.
                            </p>
                            <p className="text-slate-800 leading-7 text-lg font-medium">
                                여기에 <strong className="text-black">AI 코칭 시스템</strong>을 결합하여,
                                당신의 목표에 딱 맞는 습관을 추천하고, 난이도를 분석하며, 동기부여 메시지를 전달합니다.
                                마치 옆에서 응원해주는 트레이너가 있는 것처럼요.
                            </p>
                        </div>
                    </section>

                    {/* 2. 사용 방법 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border-4 border-black shadow-brutal">
                        <h2 className="text-2xl font-black text-black mb-6 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span className="text-3xl">📖</span>
                            <span>사용 방법: 3단계로 시작하는 습관 혁명</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-neon-yellow border-4 border-black p-5 shadow-brutal-sm">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-black text-lg mb-3 text-white">1</div>
                                <h3 className="font-black text-lg mb-2 text-black">습관 추가하기</h3>
                                <p className="text-black text-sm font-bold leading-relaxed">
                                    '새 습관 추가' 버튼을 누르거나 AI 추천을 활용하세요.
                                    카테고리(건강, 학습, 운동 등)와 난이도(쉬움/보통/어려움)를 설정하면 XP 배수가 달라집니다.
                                </p>
                            </div>
                            <div className="bg-neon-pink border-4 border-black p-5 shadow-brutal-sm">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-black text-lg mb-3 text-white">2</div>
                                <h3 className="font-black text-lg mb-2 text-black">매일 완료 체크</h3>
                                <p className="text-black text-sm font-bold leading-relaxed">
                                    습관 카드의 '완료하기' 버튼을 클릭하면 XP를 획득합니다.
                                    연속으로 완료할수록 연속 보너스가 붙어 더 많은 XP를 얻을 수 있어요!
                                </p>
                            </div>
                            <div className="bg-neon-blue border-4 border-black p-5 shadow-brutal-sm">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-black text-lg mb-3 text-white">3</div>
                                <h3 className="font-black text-lg mb-2 text-black">레벨업 & 배지 수집</h3>
                                <p className="text-black text-sm font-bold leading-relaxed">
                                    XP가 쌓이면 레벨이 올라가고, 특정 조건을 달성하면 배지를 획득합니다.
                                    '첫 걸음', '주간 전사', '월간 마스터' 등 7가지 배지에 도전하세요!
                                </p>
                            </div>
                        </div>

                        <div className="bg-purple-100 border-4 border-black p-6">
                            <h3 className="font-black text-lg mb-3 text-black flex items-center gap-2">
                                <span>🤖</span>
                                <span>AI 기능 활용하기</span>
                            </h3>
                            <ul className="space-y-2 text-black font-bold text-sm">
                                <li>💡 <strong>AI 습관 추천:</strong> 목표를 입력하면 AI가 5가지 맞춤 습관을 추천해드립니다</li>
                                <li>⚡ <strong>난이도 분석:</strong> 습관 이름을 입력하면 AI가 적절한 난이도를 제안합니다</li>
                                <li>💪 <strong>동기부여 메시지:</strong> 현재 레벨과 연속 기록에 따라 격려 메시지를 보내드립니다</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. 관련 지식 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border-4 border-black shadow-brutal">
                        <h2 className="text-2xl font-black text-black mb-6 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span className="text-3xl">🧠</span>
                            <span>습관 형성 과학: 알아두면 좋은 지식</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-pastel-green border-4 border-black p-5">
                                <h3 className="text-lg font-black text-black mb-2">📅 21일의 법칙 vs 66일의 진실</h3>
                                <p className="text-black font-bold text-sm leading-relaxed">
                                    많은 사람들이 "21일만 하면 습관이 된다"고 알고 있지만,
                                    실제 연구 결과 평균 <strong>66일</strong>이 필요합니다.
                                    습관의 난이도에 따라 18일~254일까지 다양하니, 조급해하지 마세요!
                                </p>
                            </div>

                            <div className="bg-pastel-purple border-4 border-black p-5">
                                <h3 className="text-lg font-black text-black mb-2">🔥 연속 기록의 힘 (Streak Effect)</h3>
                                <p className="text-black font-bold text-sm leading-relaxed mb-2">
                                    심리학에서 '돈 브레이크 더 체인(Don't Break the Chain)' 효과라고 불리는 원리입니다.
                                    연속 기록이 길어질수록 "이걸 깨고 싶지 않다"는 심리가 작용해 습관 유지 확률이 높아집니다.
                                </p>
                                <p className="text-black font-bold text-sm leading-relaxed">
                                    💡 <strong>팁:</strong> 하루 놓쳤다고 포기하지 마세요.
                                    2일 연속 실패가 습관을 무너뜨립니다. 하루는 실수, 이틀은 패턴!
                                </p>
                            </div>

                            <div className="bg-pastel-yellow border-4 border-black p-5">
                                <h3 className="text-lg font-black text-black mb-2">💪 작은 습관의 마법 (Atomic Habits)</h3>
                                <p className="text-black font-bold text-sm leading-relaxed">
                                    제임스 클리어의 'Atomic Habits'에서 강조하는 원칙:
                                    <strong> "1%씩만 나아져도 1년 후엔 37배 성장합니다."</strong>
                                </p>
                                <ul className="mt-2 space-y-1 text-black font-bold text-sm">
                                    <li>❌ 나쁜 예: "매일 2시간 운동하기"</li>
                                    <li>✅ 좋은 예: "매일 팔굽혀펴기 5개"</li>
                                </ul>
                            </div>

                            <div className="bg-pastel-pink border-4 border-black p-5">
                                <h3 className="text-lg font-black text-black mb-2">🎮 게이미피케이션의 효과</h3>
                                <p className="text-black font-bold text-sm leading-relaxed">
                                    게임 요소(XP, 레벨, 배지)를 추가하면 <strong>도파민 분비</strong>가 촉진되어
                                    동기부여가 강화됩니다. 실제로 듀오링고, 스트라바 같은 앱들이 이 원리로
                                    사용자 유지율을 크게 높였습니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4. 배지 시스템 상세 안내 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border-4 border-black shadow-brutal">
                        <h2 className="text-2xl font-black text-black mb-6 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span className="text-3xl">🏆</span>
                            <span>전체 배지 목록 & 획득 조건</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-neon-yellow border-4 border-black p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">🎯</span>
                                    <h3 className="font-black text-lg">첫 걸음</h3>
                                </div>
                                <p className="text-sm font-bold">첫 번째 습관 완료 시 획득</p>
                            </div>
                            <div className="bg-neon-pink border-4 border-black p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">🔥</span>
                                    <h3 className="font-black text-lg">주간 전사</h3>
                                </div>
                                <p className="text-sm font-bold">7일 연속 습관 완료 시 획득</p>
                            </div>
                            <div className="bg-neon-blue border-4 border-black p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">💪</span>
                                    <h3 className="font-black text-lg">월간 마스터</h3>
                                </div>
                                <p className="text-sm font-bold">30일 연속 습관 완료 시 획득</p>
                            </div>
                            <div className="bg-neon-green border-4 border-black p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">💯</span>
                                    <h3 className="font-black text-lg">백 클럽</h3>
                                </div>
                                <p className="text-sm font-bold">총 100회 습관 완료 시 획득</p>
                            </div>
                            <div className="bg-pastel-purple border-4 border-black p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">🌟</span>
                                    <h3 className="font-black text-lg">습관 영웅</h3>
                                </div>
                                <p className="text-sm font-bold">레벨 10 달성 시 획득</p>
                            </div>
                            <div className="bg-pastel-green border-4 border-black p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">🏆</span>
                                    <h3 className="font-black text-lg">완벽한 주</h3>
                                </div>
                                <p className="text-sm font-bold">일주일간 모든 습관 완료 시 획득</p>
                            </div>
                            <div className="bg-gradient-to-r from-neon-yellow to-neon-pink border-4 border-black p-4 md:col-span-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">👑</span>
                                    <h3 className="font-black text-lg">전설</h3>
                                </div>
                                <p className="text-sm font-bold">레벨 25 달성 시 획득 - 최고의 명예!</p>
                            </div>
                        </div>
                    </section>

                    {/* 5. 연관 도구 추천 (내부 링크 최적화) */}
                    <section className="bg-black rounded-2xl p-8 text-white border-4 border-black shadow-brutal">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-neon-yellow">
                            <span className="text-3xl">🔗</span>
                            <span>함께 사용하면 좋은 도구들</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href="/"
                                className="bg-white/10 hover:bg-white/20 p-5 border-2 border-white/20 rounded-xl transition-all group"
                            >
                                <p className="font-black text-xl mb-1 group-hover:text-neon-yellow text-white">대출 계산기 →</p>
                                <p className="text-slate-400 text-sm">목표 달성을 위한 재정 계획 수립</p>
                            </a>
                            <a
                                href="/calendar"
                                className="bg-white/10 hover:bg-white/20 p-5 border-2 border-white/20 rounded-xl transition-all group"
                            >
                                <p className="font-black text-xl mb-1 group-hover:text-neon-yellow text-white">만년달력 →</p>
                                <p className="text-slate-400 text-sm">습관 실천 날짜 확인 및 계획</p>
                            </a>
                            <a
                                href="/random"
                                className="bg-white/10 hover:bg-white/20 p-5 border-2 border-white/20 rounded-xl transition-all group"
                            >
                                <p className="font-black text-xl mb-1 group-hover:text-neon-yellow text-white">랜덤 추첨 →</p>
                                <p className="text-slate-400 text-sm">오늘 실천할 습관 랜덤 선택</p>
                            </a>
                            <a
                                href="/writer"
                                className="bg-white/10 hover:bg-white/20 p-5 border-2 border-white/20 rounded-xl transition-all group"
                            >
                                <p className="font-black text-xl mb-1 group-hover:text-neon-yellow text-white">AI 글작성 →</p>
                                <p className="text-slate-400 text-sm">습관 일기 작성 도우미</p>
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            {/* Habit Form Modal */}
            {showForm && (
                <HabitForm
                    habit={editingHabit}
                    onSave={handleSaveHabit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingHabit(null);
                    }}
                />
            )}
        </div>
    );
}
