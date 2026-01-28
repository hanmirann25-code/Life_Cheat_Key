import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';


// 상황별 한글 이름 매핑
const situationNames: Record<string, string> = {
    late: '지각',
    cancel: '약속 취소',
    forgot: '까먹음',
    mistake: '실수',
    sick: '아픔',
};

// 관계별 한글 이름 매핑
const relationshipNames: Record<string, string> = {
    boss: '상사/선배',
    friend: '친구',
    partner: '연인',
    family: '가족',
};

// 관계별 톤앤매너 설정
const relationshipTones: Record<string, string> = {
    boss: '정중하고 존중하는 톤으로, 업무적이고 전문적인 표현을 사용하세요.',
    friend: '편하고 친근한 반말 톤으로, 자연스럽고 솔직한 표현을 사용하세요.',
    partner: '애정이 느껴지는 따뜻한 톤으로, 사랑하는 마음이 드러나는 표현을 사용하세요.',
    family: '가족에게 쓰는 정중하고 따뜻한 존댓말 톤으로, 배려심이 느껴지는 표현을 사용하세요.',
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { situation, relationship, detail } = body;

        // 필수 파라미터 검증
        if (!situation || !relationship) {
            return NextResponse.json(
                { error: '상황과 관계를 선택해주세요.' },
                { status: 400 }
            );
        }

        // API 키 확인
        if (!process.env.OPENAI_API_KEY) {
            console.error("❌ OpenAI API 키가 설정되지 않았습니다.");
            console.error("환경 변수 확인:", {
                OPENAI_API_KEY: process.env.OPENAI_API_KEY ? "설정됨" : "없음"
            });
            return NextResponse.json(
                { 
                    error: 'OpenAI API 키가 설정되지 않았습니다. Vercel 환경 변수에 OPENAI_API_KEY를 추가해주세요.',
                    details: 'Vercel 대시보드 → Settings → Environment Variables에서 OPENAI_API_KEY를 추가한 후 재배포해주세요.'
                },
                { status: 500 }
            );
        }

        // 상황과 관계에 맞는 프롬프트 생성
        const situationName = situationNames[situation] || situation;
        const relationshipName = relationshipNames[relationship] || relationship;
        const tone = relationshipTones[relationship] || '';

        // 상세 사유가 있으면 포함, 없으면 자연스럽게 처리
        const detailText = detail?.trim()
            ? `구체적인 사유: "${detail}"`
            : '구체적인 사유는 언급하지 말고 일반적인 표현으로 작성하세요.';

        const systemPrompt = `당신은 한국어로 자연스럽고 진심 어린 사과문/핑계문을 작성하는 전문가입니다.
${tone}
상황에 맞게 적절한 감정과 톤을 사용하여 작성하세요.
너무 길지 않게, 핵심만 간결하게 전달하세요.
이모지나 특수문자는 최소한으로 사용하세요.`;

        const userPrompt = `상황: ${situationName}
대상: ${relationshipName}
${detailText}

위 상황에 맞는 사과문 또는 핑계문을 작성해주세요. 한 문단으로 간결하게 작성해주세요.`;

        // OpenAI 클라이언트 초기화
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // OpenAI API 호출
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // 비용 효율적인 모델 사용
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.8, // 창의성과 다양성을 위한 설정
            max_tokens: 200, // 적절한 길이로 제한
        });

        const generatedMessage = completion.choices[0]?.message?.content?.trim();

        if (!generatedMessage) {
            return NextResponse.json(
                { error: '메시지 생성에 실패했습니다.' },
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
            { error: '메시지 생성 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
