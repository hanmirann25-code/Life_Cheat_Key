import { NextRequest, NextResponse } from "next/server";
import https from 'https';

export const dynamic = 'force-dynamic';

// 개발 환경에서 SSL 인증서 검증 우회 (프록시/방화벽 환경 대응)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const eventMonth = searchParams.get("eventMonth");

    // eventMonth 파라미터 검증
    if (!eventMonth || eventMonth.length !== 6) {
        return NextResponse.json(
            { error: "eventMonth 파라미터가 올바르지 않습니다. (예: 202601)" },
            { status: 400 }
        );
    }

    // 서버 사이드 전용 환경 변수 사용 (보안상 더 안전)
    const apiKey = process.env.TOUR_API_KEY || process.env.NEXT_PUBLIC_TOUR_API_KEY;

    if (!apiKey) {
        console.error("❌ Tour API 키가 설정되지 않았습니다.");
        console.error("환경 변수 확인:", {
            TOUR_API_KEY: process.env.TOUR_API_KEY ? "설정됨" : "없음",
            NEXT_PUBLIC_TOUR_API_KEY: process.env.NEXT_PUBLIC_TOUR_API_KEY ? "설정됨" : "없음"
        });
        return NextResponse.json({
            error: "Tour API 키가 설정되지 않았습니다. Vercel 환경 변수에 TOUR_API_KEY를 추가해주세요."
        }, { status: 500 });
    }

    try {
        // URL 인코딩된 키 사용
        const encodedKey = encodeURIComponent(apiKey);
        const url = `https://apis.data.go.kr/B551011/KorService2/searchFestival2?serviceKey=${encodedKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=LifeCheatKey&_type=json&arrange=A&eventStartDate=${eventMonth}01`;

        console.log("🔍 Tour API 요청 URL:", url.replace(apiKey, "***"));

        let response;
        try {
            // 타임아웃을 위한 AbortController 사용 (호환성 개선)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

            // 개발 환경에서 SSL 인증서 검증 우회를 위한 agent 사용
            const agent = process.env.NODE_ENV === 'development'
                ? new https.Agent({ rejectUnauthorized: false })
                : undefined;

            response = await fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0',
                },
                signal: controller.signal,
                // @ts-ignore - Node.js fetch에서 agent 사용
                agent: agent,
            });

            clearTimeout(timeoutId);
        } catch (fetchError: any) {
            console.error("❌ Fetch 에러 상세:", fetchError);
            console.error("에러 타입:", fetchError.constructor.name);
            console.error("에러 이름:", fetchError.name);
            console.error("에러 메시지:", fetchError.message);
            console.error("에러 스택:", fetchError.stack);

            // 타임아웃 에러인지 확인
            if (fetchError.name === 'AbortError' || fetchError.name === 'TimeoutError') {
                return NextResponse.json(
                    { error: "Tour API 요청 시간 초과 (30초)" },
                    { status: 504 }
                );
            }

            return NextResponse.json(
                { error: `네트워크 에러: ${fetchError.message || "Tour API에 연결할 수 없습니다"}` },
                { status: 500 }
            );
        }

        console.log("📡 API 응답 상태:", response.status);

        // 응답 텍스트 먼저 확인
        const responseText = await response.text();

        if (!response.ok) {
            console.error("❌ API HTTP 에러 응답:", responseText.substring(0, 500));
            return NextResponse.json(
                { error: `Tour API 요청 실패: ${response.status}` },
                { status: response.status }
            );
        }

        // JSON 파싱 시도
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error("❌ JSON 파싱 에러:", parseError);
            console.error("응답 내용:", responseText.substring(0, 500));
            return NextResponse.json(
                { error: "Tour API 응답을 파싱할 수 없습니다." },
                { status: 500 }
            );
        }

        // Tour API 응답 구조 확인 (더 유연하게 처리)
        if (data.response) {
            const resultCode = data.response.header?.resultCode;
            if (resultCode && resultCode !== "0000") {
                const errorMsg = data.response.header?.resultMsg || "알 수 없는 에러";
                console.error("❌ Tour API 비즈니스 로직 에러:", errorMsg, "코드:", resultCode);
                return NextResponse.json(
                    { error: `Tour API 에러: ${errorMsg} (코드: ${resultCode})` },
                    { status: 500 }
                );
            }
        }

        console.log("✅ API 응답 성공");
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("❌ Tour API 전체 에러:", error);
        console.error("에러 타입:", error.constructor.name);
        console.error("에러 메시지:", error.message);
        console.error("에러 스택:", error.stack);
        return NextResponse.json(
            { error: error.message || "데이터를 불러올 수 없습니다" },
            { status: 500 }
        );
    }
}
