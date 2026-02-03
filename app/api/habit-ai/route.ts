import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
    try {
        const { type, goal, progress, habits } = await request.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API 키가 설정되지 않았습니다. .env.local 파일에 OPENAI_API_KEY를 추가해주세요.' },
                { status: 500 }
            );
        }

        let systemPrompt = '';
        let userPrompt = '';

        switch (type) {
            case 'suggest_habits':
                systemPrompt = `당신은 습관 형성 전문 코치입니다. 사용자의 목표를 듣고 실현 가능하고 구체적인 습관을 추천해주세요. 
        각 습관은 명확하고 측정 가능하며, 실천하기 쉬워야 합니다. 
        난이도(쉬움/보통/어려움)와 카테고리(건강/생산성/학습/운동/마음챙김/사회성/창의성)를 함께 제안해주세요.
        한국어로 답변하고, JSON 형식으로 응답해주세요.`;

                userPrompt = `목표: ${goal}\n\n위 목표를 달성하기 위한 5가지 구체적인 습관을 추천해주세요. 다음 JSON 형식으로 응답해주세요:
        {
          "suggestions": [
            {
              "name": "습관 이름",
              "description": "습관에 대한 설명",
              "category": "health|productivity|learning|fitness|mindfulness|social|creative|other",
              "difficulty": "easy|medium|hard",
              "reason": "이 습관이 목표 달성에 도움이 되는 이유"
            }
          ]
        }`;
                break;

            case 'motivational_message':
                systemPrompt = `당신은 긍정적이고 동기부여를 잘하는 습관 코치입니다. 
        사용자의 진행 상황을 보고 격려와 동기부여가 되는 메시지를 전달해주세요.
        짧고 임팩트 있게 1-2문장으로, 이모지를 활용해서 작성해주세요.`;

                userPrompt = `현재 상태:
        - 레벨: ${progress?.level || 1}
        - 총 완료한 습관: ${progress?.totalHabitsCompleted || 0}회
        - 현재 연속 기록: ${progress?.currentStreak || 0}일
        - 획득한 배지: ${progress?.badges?.length || 0}개
        
        위 정보를 바탕으로 동기부여 메시지를 작성해주세요.`;
                break;

            case 'analyze_difficulty':
                systemPrompt = `당신은 습관 분석 전문가입니다. 제시된 습관의 난이도를 분석하고 적절한 난이도를 제안해주세요.`;

                userPrompt = `습관: ${goal}\n\n이 습관의 적절한 난이도(easy/medium/hard)와 그 이유를 설명해주세요.`;
                break;

            case 'suggest_schedule':
                systemPrompt = `당신은 시간 관리 전문가입니다. 사용자의 습관 목록을 보고 언제 실천하면 좋을지 조언해주세요.`;

                userPrompt = `현재 습관 목록:
        ${habits?.map((h: any) => `- ${h.name} (${h.category})`).join('\n')}
        
        각 습관을 언제 실천하면 좋을지 시간대별로 추천해주세요.`;
                break;

            default:
                return NextResponse.json(
                    { error: '지원하지 않는 요청 타입입니다.' },
                    { status: 400 }
                );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content = completion.choices[0]?.message?.content || '';

        // For suggest_habits, try to parse JSON
        if (type === 'suggest_habits') {
            try {
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    return NextResponse.json({ success: true, suggestions: parsed.suggestions || parsed.habits });
                }
            } catch (e) {
                // If parsing fails, return as text
                return NextResponse.json({ success: true, data: { message: content } });
            }
        }

        return NextResponse.json({ success: true, message: content });
    } catch (error: any) {
        console.error('AI API Error:', error);
        return NextResponse.json(
            { error: error.message || 'AI 요청 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
