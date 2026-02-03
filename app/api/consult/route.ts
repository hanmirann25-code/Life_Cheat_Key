import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { creditScore, userQuery, userContext } = body;

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API 키가 설정되지 않았습니다.' },
                { status: 500 }
            );
        }

        const systemPrompt = `당신은 복잡하고 딱딱한 금융 정보를 10초 만에 명쾌하게 풀어주는 해결사 '인생 치트키'입니다.
말투: 친절하지만 맺고 끊음이 확실하며, 힙한 감성을 가진 전문가의 말투를 사용합니다.
핵심 가치: 사용자의 돈과 시간을 아껴주는 것이 최우선입니다.

결과는 반드시 아래의 필드를 포함한 JSON 형식으로 출력하세요.
1. "summary": "사용자 상황에 대한 힙한 한 줄 정의 (예: '신용점수 980점, 이미 금융 생태계 포식자시네요!')"
2. "cheat_sheet": [
    "당장 실천해야 할 구체적인 행동 1",
    "당장 실천해야 할 구체적인 행동 2",
    "당장 실천해야 할 구체적인 행동 3"
],
3. "chicken_index": "해당 고민 해결 시 아낄 수 있는 금액을 '치킨 마리 수'로 환산 (예: '연간 치킨 15마리 세이브 가능!')",
4. "ai_advice": "AI 코치가 전하는 짧고 강렬한 응원이나 주의사항",
5. "cta_message": "상담 버튼 위에 노출할 자연스러운 유도 문구 (예: '내용이 복잡한가요? 언니한테 검증받으러 가기')"

금지 사항:
- "법적 책임은 지지 않습니다" 같은 상투적인 문구는 최소화하고, 서비스의 정체성인 '치트키' 컨셉을 유지할 것.
- 너무 전문적인 용어만 나열하지 말고, 사용자가 바로 실행 가능한(Actionable) 팁 위주로 제공할 것.`;

        const userPrompt = `입력 컨텍스트:
- 사용자 신용점수: ${creditScore}
- 주된 고민: ${userQuery}
- 상세 상황: ${userContext}`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content || '';

        // JSON Parsing Logic with Regex fallback
        let parsedData;
        try {
            parsedData = JSON.parse(content);
        } catch (e) {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    parsedData = JSON.parse(jsonMatch[0]);
                } catch (err) {
                    console.error("JSON parse error from regex match:", err);
                    // Check if it was just markdown code blocks wrapping it
                    const cleanMatch = content.replace(/```json\n|\n```/g, '');
                    try {
                        parsedData = JSON.parse(cleanMatch);
                    } catch (err2) {
                        return NextResponse.json({ error: 'Failed to parse AI response', raw: content }, { status: 500 });
                    }
                }
            } else {
                return NextResponse.json({ error: 'No JSON found in AI response', raw: content }, { status: 500 });
            }
        }

        if (!parsedData && !content) {
            return NextResponse.json({ error: 'Empty response from AI' }, { status: 500 });
        }

        // If we're here and parsedData is still undefined but we didn't return (unlikely given logic above), fallback
        if (!parsedData) {
            // try parsing the whole content again lightly cleaning
            try {
                parsedData = JSON.parse(content.replace(/```json\n|\n```/g, ''));
            } catch {
                return NextResponse.json({ error: 'Failed to parse AI response', raw: content }, { status: 500 });
            }
        }

        return NextResponse.json(parsedData);

    } catch (error: any) {
        console.error('Consult API Error:', error);
        return NextResponse.json(
            { error: error.message || '상담 요청 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
