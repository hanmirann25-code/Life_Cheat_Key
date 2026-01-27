import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 탄원서 유형별 설명 매핑
const petitionTypeDescriptions: Record<string, string> = {
    criminal: '형사 사건에 대한 탄원서입니다. 가벼운 처벌을 요청하거나 선처를 구하는 내용을 작성하세요.',
    civil: '민사 사건에 대한 탄원서입니다. 분쟁 해결이나 조정을 요청하는 내용을 작성하세요.',
    administrative: '행정 처분에 대한 탄원서입니다. 행정 기관의 결정에 대한 재심이나 변경을 요청하세요.',
    appeal: '항소나 재심을 요청하는 탄원서입니다. 원심 판결에 대한 재고를 요청하세요.',
    pardon: '사면이나 복권을 요청하는 탄원서입니다. 과거의 처벌에 대한 면제를 요청하세요.',
};

// 상황별 설명 매핑
const situationDescriptions: Record<string, string> = {
    first_time: '초범이고 반성하고 있다는 점을 강조하세요.',
    family_circumstances: '가족 상황이나 경제적 어려움을 설명하세요.',
    sincere_repentance: '진심으로 반성하고 있다는 점을 강조하세요.',
    misunderstanding: '오해나 착오가 있었다는 점을 설명하세요.',
    cooperation: '수사나 재판 과정에서 협조했다는 점을 강조하세요.',
    rehabilitation: '사회 복귀 의지와 재발 방지 노력을 설명하세요.',
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { petitionType, situation, details, petitionerName, targetName } = body;

        // 필수 파라미터 검증
        if (!petitionType || !situation) {
            return NextResponse.json(
                { error: '탄원서 유형과 상황을 선택해주세요.' },
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

        // 탄원서 유형과 상황에 맞는 프롬프트 생성
        const typeDescription = petitionTypeDescriptions[petitionType] || '';
        const situationDescription = situationDescriptions[situation] || '';

        const systemPrompt = `당신은 한국어로 법적으로 적절하고 진심 어린 탄원서를 작성하는 전문가입니다.
${typeDescription}
${situationDescription}
탄원서는 정중하고 존중하는 톤으로 작성하되, 진심이 느껴지도록 작성하세요.
법적 용어를 적절히 사용하되, 너무 딱딱하지 않게 작성하세요.
구체적이고 설득력 있는 내용으로 작성하세요.`;

        let userPrompt = `탄원서 유형: ${petitionType === 'criminal' ? '형사 사건' : petitionType === 'civil' ? '민사 사건' : petitionType === 'administrative' ? '행정 처분' : petitionType === 'appeal' ? '항소/재심' : '사면/복권'}
상황: ${situation === 'first_time' ? '초범' : situation === 'family_circumstances' ? '가족 상황' : situation === 'sincere_repentance' ? '진심으로 반성' : situation === 'misunderstanding' ? '오해/착오' : situation === 'cooperation' ? '수사 협조' : '사회 복귀 의지'}`;

        if (petitionerName) {
            userPrompt += `\n탄원인 이름: ${petitionerName}`;
        }
        if (targetName) {
            userPrompt += `\n대상자 이름: ${targetName}`;
        }
        if (details && details.trim()) {
            userPrompt += `\n상세 사유: ${details}`;
        }

        userPrompt += `\n\n위 정보를 바탕으로 정식 탄원서 형식으로 작성해주세요. 서두, 본문, 결론을 포함하여 작성하세요.`;

        // OpenAI API 호출
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // 비용 효율적인 모델 사용
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.7, // 탄원서는 일정한 형식을 유지해야 하므로 창의성 낮게 설정
            max_tokens: 800, // 탄원서는 좀 더 길게 작성 가능
        });

        const generatedPetition = completion.choices[0]?.message?.content?.trim();

        if (!generatedPetition) {
            return NextResponse.json(
                { error: '탄원서 생성에 실패했습니다.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ petition: generatedPetition });
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
            { error: '탄원서 생성 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
