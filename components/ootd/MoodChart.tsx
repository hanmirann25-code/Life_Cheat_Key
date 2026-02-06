'use client';

import { motion } from 'framer-motion';
import { MoodScore } from '@/utils/ootd/moodAnalyzer';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface MoodChartProps {
    scores: MoodScore;
}

const MOOD_LABELS_KR: Record<keyof MoodScore, string> = {
    chic: '시크',
    lovely: '러블리',
    hip: '힙',
    classy: '클래시',
    casual: '캐주얼',
    vintage: '빈티지',
    minimal: '미니멀',
    avantgarde: '아방가르드',
};

export default function MoodChart({ scores }: MoodChartProps) {
    const chartData = Object.entries(scores).map(([key, value]) => ({
        mood: MOOD_LABELS_KR[key as keyof MoodScore],
        score: value,
    }));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full h-full"
        >
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                    <PolarGrid
                        stroke="#D4AF37"
                        strokeOpacity={0.3}
                        strokeWidth={1.5}
                    />
                    <PolarAngleAxis
                        dataKey="mood"
                        tick={{
                            fill: '#1A1A2E',
                            fontSize: 13,
                            fontWeight: 600,
                            fontFamily: 'Inter, sans-serif'
                        }}
                    />
                    <Radar
                        name="Mood"
                        dataKey="score"
                        stroke="#B76E79"
                        fill="url(#moodGradient)"
                        fillOpacity={0.7}
                        strokeWidth={3}
                    />
                    <defs>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#B76E79" stopOpacity={0.6} />
                        </linearGradient>
                    </defs>
                </RadarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
