import { NextResponse } from "next/server";
import https from 'https';

export const dynamic = 'force-dynamic';

interface ApiStatus {
    name: string;
    status: 'ok' | 'error' | 'not_configured';
    message: string;
    responseTime?: number;
}

// SSL 인증서 검증 우회 (개발 환경)
const agent = process.env.NODE_ENV === 'development'
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

async function checkOpenAI(): Promise<ApiStatus> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return { name: 'OpenAI', status: 'not_configured', message: 'API 키가 설정되지 않았습니다' };
    }

    const startTime = Date.now();
    try {
        const response = await fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            // @ts-ignore
            agent,
        });

        const responseTime = Date.now() - startTime;

        if (response.ok) {
            return { name: 'OpenAI', status: 'ok', message: '정상 작동 중', responseTime };
        } else if (response.status === 401) {
            return { name: 'OpenAI', status: 'error', message: 'API 키가 유효하지 않습니다', responseTime };
        } else {
            return { name: 'OpenAI', status: 'error', message: `HTTP ${response.status} 오류`, responseTime };
        }
    } catch (error: any) {
        return { name: 'OpenAI', status: 'error', message: error.message || '연결 실패' };
    }
}

async function checkTMDB(): Promise<ApiStatus> {
    const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
        return { name: 'TMDB', status: 'not_configured', message: 'API 키가 설정되지 않았습니다' };
    }

    const startTime = Date.now();
    try {
        const url = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
        const response = await fetch(url, {
            method: 'GET',
            // @ts-ignore
            agent,
        });

        const responseTime = Date.now() - startTime;

        if (response.ok) {
            return { name: 'TMDB', status: 'ok', message: '정상 작동 중', responseTime };
        } else if (response.status === 401) {
            return { name: 'TMDB', status: 'error', message: 'API 키가 유효하지 않습니다', responseTime };
        } else {
            return { name: 'TMDB', status: 'error', message: `HTTP ${response.status} 오류`, responseTime };
        }
    } catch (error: any) {
        return { name: 'TMDB', status: 'error', message: error.message || '연결 실패' };
    }
}

async function checkTourAPI(): Promise<ApiStatus> {
    const apiKey = process.env.TOUR_API_KEY || process.env.NEXT_PUBLIC_TOUR_API_KEY;

    if (!apiKey) {
        return { name: 'Tour API', status: 'not_configured', message: 'API 키가 설정되지 않았습니다' };
    }

    const startTime = Date.now();
    try {
        // 현재 월 기준으로 테스트
        const now = new Date();
        const eventMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;

        const url = new URL('https://apis.data.go.kr/B551011/KorService1/searchFestival1');
        url.searchParams.append('serviceKey', apiKey);
        url.searchParams.append('MobileOS', 'ETC');
        url.searchParams.append('MobileApp', 'LifeCheatKey');
        url.searchParams.append('_type', 'json');
        url.searchParams.append('eventStartDate', eventMonth + '01');
        url.searchParams.append('numOfRows', '1');

        const response = await fetch(url.toString(), {
            method: 'GET',
            // @ts-ignore
            agent,
        });

        const responseTime = Date.now() - startTime;

        if (response.ok) {
            const data = await response.json();
            // Tour API 특유의 에러 체크
            if (data.response?.header?.resultCode === '0000' || data.response?.header?.resultCode === '00') {
                return { name: 'Tour API', status: 'ok', message: '정상 작동 중', responseTime };
            } else if (data.response?.header?.resultCode === '99' || data.response?.header?.resultMsg?.includes('SERVICE_KEY')) {
                return { name: 'Tour API', status: 'error', message: 'API 키가 유효하지 않습니다', responseTime };
            } else {
                return { name: 'Tour API', status: 'ok', message: '정상 작동 중', responseTime };
            }
        } else {
            return { name: 'Tour API', status: 'error', message: `HTTP ${response.status} 오류`, responseTime };
        }
    } catch (error: any) {
        return { name: 'Tour API', status: 'error', message: error.message || '연결 실패' };
    }
}

async function checkKakaoAPI(): Promise<ApiStatus> {
    const apiKey = process.env.KAKAO_REST_API_KEY || process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!apiKey) {
        return { name: 'Kakao Maps', status: 'not_configured', message: 'API 키가 설정되지 않았습니다' };
    }

    const startTime = Date.now();
    try {
        // 간단한 키워드 검색으로 테스트
        const url = 'https://dapi.kakao.com/v2/local/search/keyword.json?query=서울';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `KakaoAK ${apiKey}`,
            },
            // @ts-ignore
            agent,
        });

        const responseTime = Date.now() - startTime;

        if (response.ok) {
            return { name: 'Kakao Maps', status: 'ok', message: '정상 작동 중', responseTime };
        } else if (response.status === 401) {
            return { name: 'Kakao Maps', status: 'error', message: 'API 키가 유효하지 않습니다', responseTime };
        } else {
            return { name: 'Kakao Maps', status: 'error', message: `HTTP ${response.status} 오류`, responseTime };
        }
    } catch (error: any) {
        return { name: 'Kakao Maps', status: 'error', message: error.message || '연결 실패' };
    }
}

export async function GET() {
    try {
        // 모든 API 동시에 체크
        const [openai, tmdb, tour, kakao] = await Promise.all([
            checkOpenAI(),
            checkTMDB(),
            checkTourAPI(),
            checkKakaoAPI(),
        ]);

        const results = [openai, tmdb, tour, kakao];

        // 전체 상태 요약
        const allOk = results.every(r => r.status === 'ok');
        const anyError = results.some(r => r.status === 'error');
        const anyNotConfigured = results.some(r => r.status === 'not_configured');

        let overallStatus: 'healthy' | 'degraded' | 'unhealthy';
        if (allOk) {
            overallStatus = 'healthy';
        } else if (anyError) {
            overallStatus = 'unhealthy';
        } else {
            overallStatus = 'degraded';
        }

        return NextResponse.json({
            overallStatus,
            checkedAt: new Date().toISOString(),
            apis: results,
        });
    } catch (error: any) {
        return NextResponse.json({
            overallStatus: 'unhealthy',
            error: error.message || 'Health check failed',
            apis: [],
        }, { status: 500 });
    }
}
