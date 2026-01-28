import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "movie"; // movie or tv
    const category = searchParams.get("category") || "popular"; // popular, now_playing, on_the_air

    // 서버 사이드 전용 환경 변수 사용 (보안상 더 안전)
    const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
        console.error("❌ TMDB API 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
        return NextResponse.json({ 
            error: "TMDB API 키가 설정되지 않았습니다. 서버 관리자에게 문의하세요." 
        }, { status: 500 });
    }

    try {
        let endpoint = "";

        if (type === "movie") {
            endpoint = category === "latest" ? "now_playing" : "popular";
        } else {
            endpoint = category === "latest" ? "on_the_air" : "popular";
        }

        const url = new URL(`https://api.themoviedb.org/3/${type}/${endpoint}`);
        url.searchParams.append("api_key", apiKey);
        url.searchParams.append("language", "ko-KR");
        url.searchParams.append("page", "1");
        url.searchParams.append("region", "KR");

        console.log("🎬 TMDB API 요청 URL:", url.toString());

        const response = await fetch(url.toString(), {
            method: "GET",
            // Vercel에서 캐싱 이슈 방지
            cache: 'no-store'
        });

        console.log("📡 API 응답 상태:", response.status);

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API 에러 응답:", data);
            return NextResponse.json(
                { error: data.status_message || `API 요청 실패: ${response.status}` },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("TMDB API Error:", error.message);
        return NextResponse.json(
            { error: error.message || "데이터를 불러올 수 없습니다" },
            { status: 500 }
        );
    }
}
