import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const eventMonth = searchParams.get("eventMonth");

    // 서버 사이드 전용 환경 변수 사용 (보안상 더 안전)
    const apiKey = process.env.TOUR_API_KEY || process.env.NEXT_PUBLIC_TOUR_API_KEY;

    if (!apiKey) {
        console.error("❌ Tour API 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
        return NextResponse.json({ 
            error: "Tour API 키가 설정되지 않았습니다. 서버 관리자에게 문의하세요." 
        }, { status: 500 });
    }

    try {
        // URL 인코딩된 키 사용
        const encodedKey = encodeURIComponent(apiKey);
        const url = `https://apis.data.go.kr/B551011/KorService2/searchFestival2?serviceKey=${encodedKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=LifeCheatKey&_type=json&arrange=A&eventStartDate=${eventMonth}01`;

        console.log("🔍 Tour API 요청 URL:", url);

        const response = await fetch(url, {
            method: "GET",
        });

        console.log("📡 API 응답 상태:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ API 에러 응답:", errorText);
            return NextResponse.json(
                { error: `Tour API 요청 실패: ${response.status} - ${errorText.substring(0, 200)}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        // Tour API 응답 구조 확인 및 에러 처리
        if (data.response?.header?.resultCode !== "0000") {
            const errorMsg = data.response?.header?.resultMsg || "알 수 없는 에러";
            console.error("❌ Tour API 비즈니스 로직 에러:", errorMsg);
            return NextResponse.json(
                { error: `Tour API 에러: ${errorMsg}` },
                { status: 500 }
            );
        }

        console.log("✅ API 응답 성공");
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Tour API Error:", error);
        return NextResponse.json({ error: error.message || "데이터를 불러올 수 없습니다" }, { status: 500 });
    }
}
