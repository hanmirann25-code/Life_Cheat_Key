import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const eventMonth = searchParams.get("eventMonth");

    const apiKey = process.env.NEXT_PUBLIC_TOUR_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Tour API 키가 없습니다 (NEXT_PUBLIC_TOUR_API_KEY)" }, { status: 500 });
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
            throw new Error("API 요청 실패");
        }

        const data = await response.json();
        console.log("✅ API 응답 데이터:", JSON.stringify(data, null, 2));

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Tour API Error:", error);
        return NextResponse.json({ error: error.message || "데이터를 불러올 수 없습니다" }, { status: 500 });
    }
}
