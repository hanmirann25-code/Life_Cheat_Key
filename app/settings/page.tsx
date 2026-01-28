'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ApiStatus {
    name: string;
    status: 'ok' | 'error' | 'not_configured';
    message: string;
    responseTime?: number;
}

interface HealthCheckResponse {
    overallStatus: 'healthy' | 'degraded' | 'unhealthy';
    checkedAt: string;
    apis: ApiStatus[];
    error?: string;
}

export default function SettingsPage() {
    const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastChecked, setLastChecked] = useState<string | null>(null);

    const checkApiStatus = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/health');
            const data = await response.json();
            setHealthData(data);
            setLastChecked(new Date().toLocaleTimeString('ko-KR'));
        } catch (error) {
            console.error('Health check failed:', error);
            setHealthData({
                overallStatus: 'unhealthy',
                checkedAt: new Date().toISOString(),
                apis: [],
                error: '서버에 연결할 수 없습니다',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkApiStatus();
    }, []);

    const getStatusColor = (status: ApiStatus['status']) => {
        switch (status) {
            case 'ok':
                return 'bg-neon-green';
            case 'error':
                return 'bg-neon-pink';
            case 'not_configured':
                return 'bg-neon-yellow';
            default:
                return 'bg-gray-300';
        }
    };

    const getStatusIcon = (status: ApiStatus['status']) => {
        switch (status) {
            case 'ok':
                return '✓';
            case 'error':
                return '✗';
            case 'not_configured':
                return '?';
            default:
                return '-';
        }
    };

    const getStatusText = (status: ApiStatus['status']) => {
        switch (status) {
            case 'ok':
                return '정상';
            case 'error':
                return '오류';
            case 'not_configured':
                return '미설정';
            default:
                return '알 수 없음';
        }
    };

    const getOverallStatusBadge = (status: HealthCheckResponse['overallStatus']) => {
        switch (status) {
            case 'healthy':
                return { bg: 'bg-neon-green', text: '모든 API 정상', icon: '✓' };
            case 'degraded':
                return { bg: 'bg-neon-yellow', text: '일부 API 미설정', icon: '!' };
            case 'unhealthy':
                return { bg: 'bg-neon-pink', text: 'API 오류 발생', icon: '✗' };
            default:
                return { bg: 'bg-gray-300', text: '확인 중...', icon: '?' };
        }
    };

    const getApiDescription = (name: string) => {
        switch (name) {
            case 'OpenAI':
                return 'AI 글쓰기 기능 (거절 메시지, 핑계 생성 등)';
            case 'TMDB':
                return 'OTT 신작 영화/드라마 정보';
            case 'Tour API':
                return '축제/행사 정보 (공공데이터포털)';
            case 'Kakao Maps':
                return '지도 검색 및 장소 정보';
            default:
                return '';
        }
    };

    const badge = healthData ? getOverallStatusBadge(healthData.overallStatus) : getOverallStatusBadge('healthy');

    return (
        <main className="min-h-screen bg-[#fafafa] py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black mb-4"
                    >
                        ← 홈으로
                    </Link>
                    <h1 className="text-3xl font-black">설정</h1>
                    <p className="text-gray-600 mt-2">API 연결 상태를 확인하고 관리합니다</p>
                </div>

                {/* API 상태 섹션 */}
                <section className="bg-white border-4 border-black p-6 shadow-brutal mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black">API 상태</h2>
                        <button
                            onClick={checkApiStatus}
                            disabled={loading}
                            className={`px-4 py-2 border-2 border-black font-bold text-sm transition-all ${
                                loading
                                    ? 'bg-gray-200 cursor-not-allowed'
                                    : 'bg-neon-yellow hover:bg-neon-pink hover:-translate-y-1'
                            }`}
                        >
                            {loading ? '확인 중...' : '새로고침'}
                        </button>
                    </div>

                    {/* 전체 상태 배지 */}
                    {healthData && (
                        <div className={`${badge.bg} border-2 border-black p-4 mb-6 flex items-center gap-3`}>
                            <span className="text-2xl font-black">{badge.icon}</span>
                            <div>
                                <p className="font-bold">{badge.text}</p>
                                {lastChecked && (
                                    <p className="text-sm opacity-70">마지막 확인: {lastChecked}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 로딩 상태 */}
                    {loading && !healthData && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent"></div>
                            <span className="ml-3 font-bold">API 상태 확인 중...</span>
                        </div>
                    )}

                    {/* API 목록 */}
                    {healthData && healthData.apis.length > 0 && (
                        <div className="space-y-4">
                            {healthData.apis.map((api) => (
                                <div
                                    key={api.name}
                                    className="border-2 border-black p-4 hover:shadow-brutal transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-lg">{api.name}</h3>
                                                <span
                                                    className={`${getStatusColor(api.status)} px-2 py-0.5 text-xs font-bold border border-black`}
                                                >
                                                    {getStatusIcon(api.status)} {getStatusText(api.status)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {getApiDescription(api.name)}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-medium">상태:</span> {api.message}
                                            </p>
                                            {api.responseTime && (
                                                <p className="text-sm text-gray-500">
                                                    응답 시간: {api.responseTime}ms
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 에러 상태 */}
                    {healthData?.error && (
                        <div className="bg-neon-pink border-2 border-black p-4 mt-4">
                            <p className="font-bold">오류 발생</p>
                            <p className="text-sm">{healthData.error}</p>
                        </div>
                    )}
                </section>

                {/* API 키 설정 안내 */}
                <section className="bg-white border-4 border-black p-6 shadow-brutal">
                    <h2 className="text-xl font-black mb-4">API 키 설정 방법</h2>
                    <div className="space-y-4 text-sm">
                        <div className="border-2 border-black p-4 bg-pastel-yellow">
                            <h3 className="font-bold mb-2">Vercel 환경 변수 설정</h3>
                            <ol className="list-decimal list-inside space-y-1 text-gray-700">
                                <li>Vercel 대시보드에서 프로젝트 선택</li>
                                <li>Settings → Environment Variables 이동</li>
                                <li>필요한 API 키 추가</li>
                                <li>프로젝트 재배포</li>
                            </ol>
                        </div>

                        <div className="border-2 border-black p-4">
                            <h3 className="font-bold mb-2">필요한 환경 변수</h3>
                            <ul className="space-y-2 font-mono text-xs">
                                <li className="bg-gray-100 p-2 border border-gray-300">
                                    <span className="text-purple-600">OPENAI_API_KEY</span>
                                    <span className="text-gray-500 ml-2">- OpenAI API 키</span>
                                </li>
                                <li className="bg-gray-100 p-2 border border-gray-300">
                                    <span className="text-purple-600">TMDB_API_KEY</span>
                                    <span className="text-gray-500 ml-2">- TMDB API 키</span>
                                </li>
                                <li className="bg-gray-100 p-2 border border-gray-300">
                                    <span className="text-purple-600">TOUR_API_KEY</span>
                                    <span className="text-gray-500 ml-2">- 공공데이터포털 API 키</span>
                                </li>
                                <li className="bg-gray-100 p-2 border border-gray-300">
                                    <span className="text-purple-600">KAKAO_REST_API_KEY</span>
                                    <span className="text-gray-500 ml-2">- 카카오 REST API 키</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
