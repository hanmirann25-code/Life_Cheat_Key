'use client';

import { UserProgress, DEFAULT_ACHIEVEMENTS } from '@/app/(habit)/habit-tracker/types';
import { FireIcon, TrophyIcon, StarIcon } from '@heroicons/react/24/solid';
import { getLevelProgress } from '@/utils/gamification';

interface ProgressDashboardProps {
    progress: UserProgress;
    motivationalMessage?: string;
}

export default function ProgressDashboard({ progress, motivationalMessage }: ProgressDashboardProps) {
    const levelInfo = getLevelProgress(progress.totalXP);
    const earnedAchievements = DEFAULT_ACHIEVEMENTS.filter(achievement =>
        (progress.badges || []).includes(achievement.id)
    );

    return (
        <div className="space-y-6">
            {/* Level and XP */}
            <div className="bg-neon-yellow border-4 border-black p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-black text-neon-yellow flex items-center justify-center border-4 border-black">
                            <span className="text-3xl font-black">{levelInfo.currentLevel}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black">레벨 {levelInfo.currentLevel}</h3>
                            <p className="font-medium">
                                {levelInfo.nextLevelXP - levelInfo.currentLevelXP} XP까지 다음 레벨
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black">{progress.totalXP} XP</div>
                    </div>
                </div>

                {/* XP Progress Bar */}
                <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span>{levelInfo.currentLevelXP} XP</span>
                        <span>다음 레벨까지 {levelInfo.nextLevelXP - levelInfo.currentLevelXP} XP</span>
                    </div>
                    <div className="w-full h-6 bg-white border-4 border-black">
                        <div
                            className="h-full bg-neon-pink border-r-4 border-black transition-all duration-500"
                            style={{ width: `${levelInfo.progress * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Current Streak */}
                <div className="bg-orange-100 border-4 border-black p-4 text-center">
                    <FireIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-3xl font-black text-orange-600">{progress.currentStreak}</div>
                    <div className="text-sm font-bold">현재 연속</div>
                </div>

                {/* Longest Streak */}
                <div className="bg-red-100 border-4 border-black p-4 text-center">
                    <TrophyIcon className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <div className="text-3xl font-black text-red-600">{progress.longestStreak}</div>
                    <div className="text-sm font-bold">최고 기록</div>
                </div>

                {/* Total Completed */}
                <div className="bg-green-100 border-4 border-black p-4 text-center col-span-2 md:col-span-1">
                    <StarIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-3xl font-black text-green-600">{progress.totalHabitsCompleted}</div>
                    <div className="text-sm font-bold">총 완료</div>
                </div>
            </div>

            {/* Motivational Message */}
            {motivationalMessage && (
                <div className="bg-neon-pink border-4 border-black p-6">
                    <div className="text-center">
                        <div className="text-4xl mb-2">💪</div>
                        <p className="text-lg font-bold">{motivationalMessage}</p>
                    </div>
                </div>
            )}

            {/* Achievements */}
            {earnedAchievements.length > 0 && (
                <div className="bg-white border-4 border-black p-6">
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                        <TrophyIcon className="w-6 h-6" />
                        획득한 배지 ({earnedAchievements.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {earnedAchievements.map(achievement => (
                            <div
                                key={achievement.id}
                                className="bg-neon-blue border-2 border-black p-3 text-center hover:shadow-brutal-sm transition-all"
                                title={achievement.description}
                            >
                                <div className="text-3xl mb-1">{achievement.icon}</div>
                                <div className="text-xs font-bold">{achievement.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
