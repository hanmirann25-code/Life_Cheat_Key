import { extractDominantColors, rgbToHsl, RGBColor } from './colorExtractor';

export interface MoodScore {
    chic: number;
    lovely: number;
    hip: number;
    classy: number;
    casual: number;
    vintage: number;
    minimal: number;
    avantgarde: number;
}

export interface MoodAnalysisResult {
    scores: MoodScore;
    primaryMood: keyof MoodScore;
    moodLabel: string;
    description: string;
}

// Witty mood labels and descriptions
const MOOD_LABELS: Record<keyof MoodScore, { label: string; description: string }> = {
    chic: {
        label: '차가운 도시의 세련된 비즈니스맨',
        description: '깔끔한 도시 감성으로 무장한 당신, 오늘도 시크하게 출근 중',
    },
    lovely: {
        label: '봄날의 로맨틱한 몽상가',
        description: '파스텔 빛깔 속에서 꿈을 꾸는 러블리한 무드 메이커',
    },
    hip: {
        label: '자유로운 영혼의 스트릿 댄서',
        description: '길거리가 런웨이! 당신의 스타일에 세상이 주목합니다',
    },
    classy: {
        label: '타임리스한 우아함의 전령',
        description: '시간이 지나도 빛나는 클래식한 품격, 당신이 곧 명품',
    },
    casual: {
        label: '편안함 속 센스 있는 일상 러버',
        description: '일상이 가장 멋진 순간, 편안하면서도 스타일리시한 당신',
    },
    vintage: {
        label: '과거로의 감성 여행자',
        description: '레트로 감성이 물씬, 시간을 넘나드는 패션 타임머신',
    },
    minimal: {
        label: '절제된 완벽주의자',
        description: '덜어낼수록 빛나는 미니멀리즘의 정수를 아는 당신',
    },
    avantgarde: {
        label: '예술적 실험정신의 선구자',
        description: '패션의 경계를 허무는 아방가르드한 예술가',
    },
};

/**
 * Analyze outfit image and return mood scores
 */
export async function analyzeMood(file: File): Promise<MoodAnalysisResult> {
    const colors = await extractDominantColors(file, 100);
    const scores = calculateMoodScores(colors);

    // Find primary mood
    const primaryMood = Object.entries(scores).reduce((a, b) =>
        scores[a[0] as keyof MoodScore] > scores[b[0] as keyof MoodScore] ? a : b
    )[0] as keyof MoodScore;

    const { label, description } = MOOD_LABELS[primaryMood];

    return {
        scores,
        primaryMood,
        moodLabel: label,
        description,
    };
}

/**
 * Calculate mood scores based on color analysis
 */
function calculateMoodScores(colors: RGBColor[]): MoodScore {
    const scores: MoodScore = {
        chic: 0,
        lovely: 0,
        hip: 0,
        classy: 0,
        casual: 0,
        vintage: 0,
        minimal: 0,
        avantgarde: 0,
    };

    colors.forEach((color) => {
        const hsl = rgbToHsl(color.r, color.g, color.b);
        const { h, s, l } = hsl;

        // Chic: Monochrome, low saturation, medium-high lightness
        if (s < 15 && l > 30 && l < 70) {
            scores.chic += 20;
        }

        // Lovely: Pastel colors (high lightness, medium saturation)
        if (l > 70 && s > 20 && s < 60) {
            scores.lovely += 20;
            // Pink/purple hues boost lovely
            if ((h > 300 && h < 360) || (h > 0 && h < 30)) {
                scores.lovely += 10;
            }
        }

        // Hip: Bright, saturated colors
        if (s > 60 && l > 40 && l < 70) {
            scores.hip += 20;
            // Red, yellow, orange boost hip
            if (h > 0 && h < 60) {
                scores.hip += 10;
            }
        }

        // Classy: Dark, muted colors
        if (l < 40 && s < 50) {
            scores.classy += 20;
            // Navy, burgundy boost classy
            if ((h > 200 && h < 250) || (h > 340 && h < 360)) {
                scores.classy += 10;
            }
        }

        // Casual: Mid-range saturation and lightness
        if (s > 20 && s < 60 && l > 40 && l < 70) {
            scores.casual += 15;
            // Blue, green boost casual
            if (h > 180 && h < 200) {
                scores.casual += 10;
            }
        }

        // Vintage: Warm, muted tones
        if (s > 20 && s < 50 && l > 30 && l < 60) {
            scores.vintage += 15;
            // Brown, orange, mustard boost vintage
            if (h > 20 && h < 60) {
                scores.vintage += 15;
            }
        }

        // Minimal: Very low saturation (black, white, gray)
        if (s < 10) {
            scores.minimal += 25;
        }

        // Avant-garde: Extreme values or unusual combinations
        if ((s > 80 && l < 30) || (s > 80 && l > 80)) {
            scores.avantgarde += 20;
        }
        // Purple, neon colors boost avant-garde
        if ((h > 270 && h < 300) || (s > 90)) {
            scores.avantgarde += 10;
        }
    });

    // Normalize scores to 0-100 range
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
        Object.keys(scores).forEach((key) => {
            scores[key as keyof MoodScore] = Math.round(
                (scores[key as keyof MoodScore] / maxScore) * 100
            );
        });
    }

    // Ensure at least some variation in scores
    Object.keys(scores).forEach((key) => {
        if (scores[key as keyof MoodScore] < 20) {
            scores[key as keyof MoodScore] = Math.max(
                scores[key as keyof MoodScore],
                Math.floor(Math.random() * 30) + 10
            );
        }
    });

    return scores;
}
