import { NextRequest, NextResponse } from "next/server";
import https from 'https';

export const dynamic = 'force-dynamic';

// 개발 환경에서 SSL 인증서 검증 우회 (프록시/방화벽 환경 대응)
if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "movie"; // movie or tv
    const category = searchParams.get("category") || "popular"; // popular, now_playing, on_the_air

    // 서버 사이드 전용 환경 변수 사용 (보안상 더 안전)
    const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
        console.error("❌ TMDB API 키가 설정되지 않았습니다.");
        console.error("환경 변수 확인:", {
            TMDB_API_KEY: process.env.TMDB_API_KEY ? "설정됨" : "없음",
            NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY ? "설정됨" : "없음"
        });
        return NextResponse.json({ 
            error: "TMDB API 키가 설정되지 않았습니다. Vercel 환경 변수에 TMDB_API_KEY를 추가해주세요." 
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
        url.searchParams.append("language", "ko-KR");
        url.searchParams.append("page", "1");
        url.searchParams.append("region", "KR");

        // TMDB API 키를 쿼리 파라미터로 사용
        url.searchParams.append("api_key", apiKey);
        
        const headers: HeadersInit = {
            'Accept': 'application/json',
        };

        console.log("🎬 TMDB API 요청 URL:", url.toString().replace(apiKey, "***"));

        let response;
        try {
            // 타임아웃을 위한 AbortController 사용 (호환성 개선)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

            // 개발 환경에서 SSL 인증서 검증 우회를 위한 agent 사용
            const agent = process.env.NODE_ENV === 'development' 
                ? new https.Agent({ rejectUnauthorized: false })
                : undefined;

            // Next.js 서버 사이드에서 fetch 사용 시 추가 옵션
            response = await fetch(url.toString(), {
                method: "GET",
                // Vercel에서 캐싱 이슈 방지
                cache: 'no-store',
                headers: {
                    ...headers,
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
                    { error: "TMDB API 요청 시간 초과 (30초)" },
                    { status: 504 }
                );
            }
            
            return NextResponse.json(
                { error: `네트워크 에러: ${fetchError.message || "TMDB API에 연결할 수 없습니다"}` },
                { status: 500 }
            );
        }

        console.log("📡 API 응답 상태:", response.status);

        // 응답 텍스트 먼저 확인
        const responseText = await response.text();
        
        if (!response.ok) {
            console.error("❌ API HTTP 에러 응답:", responseText.substring(0, 500));
            try {
                const errorData = JSON.parse(responseText);
                console.error("❌ TMDB API 에러 상세:", errorData);
                
                // Invalid API key 에러인 경우
                if (errorData.status_code === 7 || errorData.status_message?.includes("Invalid API key")) {
                    return NextResponse.json(
                        { 
                            error: "TMDB API 키가 유효하지 않습니다. API 키를 확인하거나 새로 발급받아주세요.",
                            details: errorData.status_message 
                        },
                        { status: 401 }
                    );
                }
                
                return NextResponse.json(
                    { 
                        error: errorData.status_message || `API 요청 실패: ${response.status}`,
                        status_code: errorData.status_code 
                    },
                    { status: response.status }
                );
            } catch {
                return NextResponse.json(
                    { error: `API 요청 실패: ${response.status}` },
                    { status: response.status }
                );
            }
        }

        // JSON 파싱
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error("❌ JSON 파싱 에러:", parseError);
            return NextResponse.json(
                { error: "TMDB API 응답을 파싱할 수 없습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("❌ TMDB API 전체 에러:", error);
        console.error("에러 타입:", error.constructor.name);
        console.error("에러 메시지:", error.message);
        console.error("에러 스택:", error.stack);
        return NextResponse.json(
            { error: error.message || "데이터를 불러올 수 없습니다" },
            { status: 500 }
        );
    }
}
