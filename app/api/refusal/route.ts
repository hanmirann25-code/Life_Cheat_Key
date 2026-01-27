import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 대상별 한글 이름 매핑
const targetNames: Record<string, string> = {
    friend: '친구',
    boss: '직장 상사/선배',
    coworker: '직장 동료',
    relative: '가족/친척',
    stranger: '모르는 사람',
};

// 상황별 한글 이름 매핑
const situationNames: Record<string, string> = {
    money: '돈을 빌려달라는 부탁',
    drink: '술자리/회식 초대',
    favor: '귀찮은 부탁',
    meeting: '약속/만남 요청',
    insurance: '보험 가입/영업',
    wedding: '결혼식 초대',
};

// 톤별 설명 매핑
const toneDescriptions: Record<string, string> = {
    polite: '정중하고 예의 바른 말투로, 상대방의 감정을 배려하면서도 명확하게 거절하세요.',
    firm: '단호하고 확고한 말투로, 명확하게 거절 의사를 전달하세요.',
    funny: '유머러스하고 재치 있는 말투로, 웃음을 주면서 거절하세요.',
    excuse: '적절한 핑계를 대면서 자연스럽게 거절하세요.',
    sad: '불쌍하고 안타까운 상황을 어필하면서 거절하세요.',
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { target, situation, tone } = body;

        // 필수 파라미터 검증
        if (!target || !situation || !tone) {
            return NextResponse.json(
                { error: '대상, 상황, 톤을 모두 선택해주세요.' },
                { status: 400 }
            );
        }

        // API 키 확인
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API 키가 설정되지 않았습니다.' },
                { status: 500 }
            );
        }

        // 대상, 상황, 톤에 맞는 프롬프트 생성
        const targetName = targetNames[target] || target;
        const situationName = situationNames[situation] || situation;
        const toneDescription = toneDescriptions[tone] || '';

        const systemPrompt = `당신은 한국어로 자연스럽고 효과적인 거절 멘트를 작성하는 전문가입니다.
${toneDescription}
상황에 맞게 적절한 감정과 톤을 사용하여 작성하세요.
너무 길지 않게, 핵심만 간결하게 전달하세요.
이모지나 특수문자는 최소한으로 사용하세요.`;

        const userPrompt = `대상: ${targetName}
상황: ${situationName}
톤: ${tone}

위 상황에 맞는 거절 멘트를 작성해주세요. 한 문장 또는 두 문장으로 간결하게 작성해주세요.`;

        // OpenAI API 호출
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // 비용 효율적인 모델 사용
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.8, // 창의성과 다양성을 위한 설정
            max_tokens: 150, // 적절한 길이로 제한
        });

        const generatedMessage = completion.choices[0]?.message?.content?.trim();

        if (!generatedMessage) {
            return NextResponse.json(
                { error: '멘트 생성에 실패했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: generatedMessage });
    } catch (error: any) {
        console.error('AI API Error:', error);

        // OpenAI API 에러 처리
        if (error instanceof OpenAI.APIError) {
            return NextResponse.json(
                { error: `AI API 오류: ${error.message}` },
                { status: error.status || 500 }
            );
        }

        return NextResponse.json(
            { error: '멘트 생성 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
