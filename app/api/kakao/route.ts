import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json(
            { error: "검색어(query)가 필요합니다" },
            { status: 400 }
        );
    }

    // 서버 사이드 전용 환경 변수 사용 (보안상 더 안전)
    const apiKey = process.env.KAKAO_REST_API_KEY || process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!apiKey) {
        console.error("❌ 카카오 API 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
        return NextResponse.json(
            { error: "카카오 API 키가 설정되지 않았습니다. 서버 관리자에게 문의하세요." },
            { status: 500 }
        );
    }

    try {
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=15`;

        console.log("🔍 카카오 API 요청:", query);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `KakaoAK ${apiKey}`,
            },
        });

        console.log("📡 API 응답 상태:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ 카카오 API 에러 응답:", errorText);
            return NextResponse.json(
                { error: `카카오 API 요청 실패: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log("✅ 카카오 API 응답 성공");

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("카카오 API Error:", error);
        return NextResponse.json(
            { error: error.message || "데이터를 불러올 수 없습니다" },
            { status: 500 }
        );
    }
}
