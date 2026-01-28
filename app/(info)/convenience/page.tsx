"use client";

import { useState, useEffect } from "react";
import { FilmIcon, TvIcon, StarIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Content {
    id: number;
    title: string;
    name?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    genre_ids: number[];
    media_type: "movie" | "tv";
}

const genreMap: { [key: number]: string } = {
    28: "액션",
    12: "모험",
    16: "애니메이션",
    35: "코미디",
    80: "범죄",
    99: "다큐멘터리",
    18: "드라마",
    10751: "가족",
    14: "판타지",
    36: "역사",
    27: "공포",
    10402: "음악",
    9648: "미스터리",
    10749: "로맨스",
    878: "SF",
    10770: "TV 영화",
    53: "스릴러",
    10752: "전쟁",
    37: "서부",
    10759: "액션 & 어드벤처",
    10762: "키즈",
    10763: "뉴스",
    10764: "리얼리티",
    10765: "SF & 판타지",
    10766: "드라마",
    10767: "토크",
    10768: "전쟁 & 정치",
};

const contentTypes = ["전체", "영화", "드라마"];
const categories = ["인기", "최신"];

export default function OTTNewReleasesPage() {
    const [selectedType, setSelectedType] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("인기");
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchContents = async () => {
        setLoading(true);
        setError(null);

        try {
            const requests: Promise<any>[] = [];

            if (selectedType === "전체" || selectedType === "영화") {
                const movieCategory = selectedCategory === "최신" ? "latest" : "popular";
                requests.push(fetch(`/api/tmdb?type=movie&category=${movieCategory}`));
            }

            if (selectedType === "전체" || selectedType === "드라마") {
                const tvCategory = selectedCategory === "최신" ? "latest" : "popular";
                requests.push(fetch(`/api/tmdb?type=tv&category=${tvCategory}`));
            }

            const results = await Promise.all(requests.map(req =>
                req.then(async res => {
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.error || `에러 코드: ${res.status}`);
                    }
                    return data.results?.map((item: any) => ({ ...item, media_type: res.url.includes("type=movie") ? "movie" : "tv" })) || [];
                })
            ));

            const allContents = results.flat();

            // 평점순 정렬
            allContents.sort((a, b) => b.vote_average - a.vote_average);

            setContents(allContents.slice(0, 20));
        } catch (err: any) {
            setError(`❌ ${err.message || "데이터를 불러오는데 실패했습니다."}`);
            console.error(err);
            setContents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContents();
    }, [selectedType, selectedCategory]);

    const getGenres = (genreIds: number[]) => {
        return genreIds
            .slice(0, 2)
            .map((id) => genreMap[id])
            .filter(Boolean)
            .join(", ");
    };

    const hotContents = contents.filter((c) => c.vote_average >= 8.0).slice(0, 4);

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-yellow">
                <div className="flex items-center gap-3 mb-2">
                    <FilmIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">🎬 OTT 신작</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    최신 영화와 드라마 정보를 한눈에!
                </p>
            </div>

            {/* HOT 콘텐츠 */}
            {hotContents.length > 0 && (
                <div className="bento-card bg-gradient-to-r from-pastel-pink to-pastel-yellow">
                    <div className="flex items-center gap-2 mb-4">
                        <StarIcon className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-xl font-black">⭐ 평점 8.0+ 추천작</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {hotContents.map((content) => (
                            <div
                                key={content.id}
                                onClick={() => setSelectedContent(content)}
                                className="bg-white rounded border-2 border-slate-900 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-bento-hover overflow-hidden"
                            >
                                {content.poster_path && (
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                                            alt={content.title || content.name || ""}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-3">
                                    <p className="font-bold text-sm mb-1 line-clamp-1">
                                        {content.title || content.name}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-yellow-600 font-bold">
                                            ⭐ {content.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-xs text-slate-600">
                                            {content.media_type === "movie" ? "🎬" : "📺"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 필터 */}
            <div className="bento-card space-y-4">
                <h2 className="text-lg font-black">🔍 필터</h2>

                {/* 콘텐츠 타입 */}
                <div>
                    <label className="block font-bold text-sm mb-2">콘텐츠 타입</label>
                    <div className="grid grid-cols-3 gap-2">
                        {contentTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                disabled={loading}
                                className={`py-2 px-3 border border-slate-900 font-bold text-sm transition-all duration-300 ${selectedType === type
                                    ? "bg-purple-600 text-white -translate-y-1 shadow-bento-hover"
                                    : "bg-white hover:-translate-y-0.5 shadow-bento"
                                    } disabled:opacity-50`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 카테고리 */}
                <div>
                    <label className="block font-bold text-sm mb-2">카테고리</label>
                    <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                disabled={loading}
                                className={`py-2 px-3 border border-slate-900 font-bold text-sm transition-all duration-300 ${selectedCategory === category
                                    ? "bg-blue-600 text-white -translate-y-1 shadow-bento-hover"
                                    : "bg-white hover:-translate-y-0.5 shadow-bento"
                                    } disabled:opacity-50`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="text-sm font-medium text-slate-600">
                    {loading ? "로딩 중..." : `${contents.length}개의 콘텐츠`}
                </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
                <div className="bento-card bg-red-50 border-2 border-red-500">
                    <p className="font-bold text-red-600">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 콘텐츠 리스트 */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {loading ? (
                        <div className="bento-card bg-pastel-mint text-center py-12">
                            <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="font-black text-xl">데이터를 불러오는 중...</p>
                        </div>
                    ) : contents.length > 0 ? (
                        contents.map((content) => (
                            <div
                                key={content.id}
                                onClick={() => setSelectedContent(content)}
                                className={`bento-card cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-bento-hover ${selectedContent?.id === content.id ? "bg-pastel-yellow" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    {content.poster_path && (
                                        <div className="relative w-20 h-28 flex-shrink-0 rounded overflow-hidden border-2 border-slate-900">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w200${content.poster_path}`}
                                                alt={content.title || content.name || ""}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-black text-lg line-clamp-1">
                                                    {content.title || content.name}
                                                </h3>
                                                {content.vote_average >= 8.0 && (
                                                    <span className="inline-block px-2 py-0.5 bg-yellow-400 text-xs font-bold rounded mt-1">
                                                        ⭐ 고평점
                                                    </span>
                                                )}
                                            </div>
                                            <span className="px-2 py-1 bg-pastel-blue text-xs font-bold rounded border border-slate-900 ml-2 flex-shrink-0">
                                                {content.media_type === "movie" ? "영화" : "드라마"}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-600 mb-2 line-clamp-2">
                                            {content.overview || "줄거리 정보가 없습니다."}
                                        </p>
                                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                                            <span>⭐ {content.vote_average.toFixed(1)}</span>
                                            <span>{getGenres(content.genre_ids)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bento-card bg-pastel-mint text-center py-12">
                            <FilmIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                            <p className="font-black text-xl">콘텐츠가 없습니다</p>
                        </div>
                    )}
                </div>

                {/* 상세 정보 */}
                <div className="sticky top-6">
                    {selectedContent ? (
                        <div className="result-card bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue">
                            {selectedContent.backdrop_path && (
                                <div className="relative w-full h-48 mb-4 rounded overflow-hidden border-2 border-slate-900">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w780${selectedContent.backdrop_path}`}
                                        alt={selectedContent.title || selectedContent.name || ""}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="text-center mb-4">
                                <h2 className="font-black text-3xl mb-2">
                                    {selectedContent.title || selectedContent.name}
                                </h2>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="inline-block px-4 py-2 bg-white rounded-full border-2 border-slate-900 font-bold">
                                        {selectedContent.media_type === "movie" ? "🎬 영화" : "📺 드라마"}
                                    </span>
                                    {selectedContent.vote_average >= 8.0 && (
                                        <span className="inline-block px-4 py-2 bg-yellow-400 rounded-full border-2 border-slate-900 font-bold">
                                            ⭐ 고평점
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 space-y-4">
                                {/* 평점 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">평점</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-4xl">⭐</span>
                                        <span className="font-black text-4xl text-yellow-600">
                                            {selectedContent.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-slate-600 font-bold">/ 10</span>
                                    </div>
                                </div>

                                {/* 장르 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">장르</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedContent.genre_ids.slice(0, 3).map((genreId) => (
                                            <span
                                                key={genreId}
                                                className="inline-block px-3 py-1 bg-pastel-purple text-white font-bold rounded border border-slate-900 text-sm"
                                            >
                                                {genreMap[genreId]}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 개봉일/방영일 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">
                                        {selectedContent.media_type === "movie" ? "개봉일" : "첫 방영일"}
                                    </p>
                                    <p className="font-black text-lg">
                                        <CalendarIcon className="w-5 h-5 inline mr-2" />
                                        {new Date(
                                            selectedContent.release_date || selectedContent.first_air_date || ""
                                        ).toLocaleDateString("ko-KR")}
                                    </p>
                                </div>

                                {/* 줄거리 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">줄거리</p>
                                    <p className="text-base font-medium leading-relaxed">
                                        {selectedContent.overview || "줄거리 정보가 없습니다."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <FilmIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">콘텐츠를 선택하면</p>
                                <p className="font-black text-xl text-pastel-purple">상세 정보가 표시됩니다!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4">
                <div className="result-card bg-pastel-blue text-center">
                    <p className="text-4xl mb-2">🎬</p>
                    <p className="font-bold text-sm mb-1">총 콘텐츠</p>
                    <p className="font-black text-3xl">{contents.length}</p>
                </div>
                <div className="result-card bg-pastel-pink text-center">
                    <p className="text-4xl mb-2">⭐</p>
                    <p className="font-bold text-sm mb-1">고평점 (8.0+)</p>
                    <p className="font-black text-3xl">{contents.filter((c) => c.vote_average >= 8.0).length}</p>
                </div>
                <div className="result-card bg-pastel-yellow text-center">
                    <p className="text-4xl mb-2">📊</p>
                    <p className="font-bold text-sm mb-1">평균 평점</p>
                    <p className="font-black text-3xl">
                        {contents.length > 0
                            ? (contents.reduce((sum, c) => sum + c.vote_average, 0) / contents.length).toFixed(1)
                            : "0.0"}
                    </p>
                </div>
            </div>
        </div>
    );
}
