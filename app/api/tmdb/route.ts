import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export const dynamic = 'force-dynamic';

// SSL 인증서 오류 해결 (개발 환경용)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "movie"; // movie or tv
    const category = searchParams.get("category") || "popular"; // popular, now_playing, on_the_air

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "TMDB API 키가 설정되지 않았습니다 (NEXT_PUBLIC_TMDB_API_KEY)" }, { status: 500 });
    }

    try {
        let endpoint = "";

        if (type === "movie") {
            endpoint = category === "latest" ? "now_playing" : "popular";
        } else {
            endpoint = category === "latest" ? "on_the_air" : "popular";
        }

        const url = `https://api.themoviedb.org/3/${type}/${endpoint}`;

        console.log("🎬 TMDB API 요청 URL:", url);

        // SSL 인증서 검증 무시 설정 (강력함)
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const response = await axios.get(url, {
            params: {
                api_key: apiKey,
                language: "ko-KR",
                page: 1,
                region: "KR"
            },
            httpsAgent: agent, // 핵심: SSL 에러 무시
            validateStatus: () => true // 모든 상태 코드 허용
        });

        console.log("📡 API 응답 상태:", response.status);

        if (response.status !== 200) {
            console.error("❌ API 에러 응답:", response.data);
            throw new Error(`API 요청 실패: ${response.status}`);
        }

        console.log("✅ API 응답 데이터 (첫 항목):", JSON.stringify(response.data.results?.[0]?.title || response.data.results?.[0]?.name, null, 2));

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("TMDB API Error:", error.response?.data || error.message);
        const status = error.response?.status || 500;
        const errorMessage = error.response?.data?.status_message || error.message || "데이터를 불러올 수 없습니다";
        return NextResponse.json({ error: errorMessage }, { status });
    }
}
