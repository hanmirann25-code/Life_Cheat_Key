"use client";

import { useState, useEffect } from "react";
import { MapPinIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

interface Location {
    id: string;
    name: string;
    category: string;
    address: string;
    description: string;
    rating: number;
    emoji: string;
    tags: string[];
    phone?: string;
    url?: string;
}

interface KakaoPlace {
    id: string;
    place_name: string;
    category_name: string;
    address_name: string;
    road_address_name: string;
    phone: string;
    place_url: string;
}

const categories = ["전체", "관광", "맛집", "쇼핑", "문화", "자연"];

// 카테고리별 검색 키워드 매핑
const categoryKeywords: { [key: string]: string } = {
    전체: "서울 명소",
    관광: "서울 관광지",
    맛집: "서울 맛집",
    쇼핑: "서울 쇼핑",
    문화: "서울 문화",
    자연: "서울 공원",
};

// 카테고리별 이모지
const categoryEmojis: { [key: string]: string[] } = {
    관광: ["🏛️", "🗼", "🏘️", "🎭", "🏯"],
    맛집: ["🍜", "🍕", "🍗", "🍱", "🍔"],
    쇼핑: ["🛍️", "🏬", "👗", "💄", "👜"],
    문화: ["📚", "🎨", "🎭", "🖼️", "🎪"],
    자연: ["🌳", "🌊", "🌸", "🏞️", "🌲"],
};

export default function ThemedMapPage() {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 카운트 정보를 별도로 관리하기 위한 상태 추가
    const [counts, setCounts] = useState<{ [key: string]: number }>({});

    // 카카오 API 호출 (서버 사이드 API 라우트 사용)
    const fetchLocations = async (category: string) => {
        setLoading(true);
        setError(null);

        try {
            let allPlaces: { place: KakaoPlace; cat: string }[] = [];

            if (category === "전체") {
                const subCategories = categories.filter((c) => c !== "전체");
                const results = await Promise.all(
                    subCategories.map(async (cat) => {
                        try {
                            const keyword = categoryKeywords[cat];
                            const response = await fetch(`/api/kakao?query=${encodeURIComponent(keyword)}`);
                            if (!response.ok) return [];
                            const data = await response.json();
                            return (data.documents || []).map((p: KakaoPlace) => ({ place: p, cat }));
                        } catch (e) {
                            console.error(`Error fetching ${cat}:`, e);
                            return [];
                        }
                    })
                );
                allPlaces = results.flat();
            } else {
                const keyword = categoryKeywords[category] || "서울 명소";
                const response = await fetch(`/api/kakao?query=${encodeURIComponent(keyword)}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "API 요청 실패");
                }

                const data = await response.json();
                allPlaces = (data.documents || []).map((p: KakaoPlace) => ({ place: p, cat: category }));
            }

            // 카카오 데이터를 우리 형식으로 변환
            const formattedLocations: Location[] = allPlaces.map((item, index) => {
                const { place, cat } = item;
                const emojis = categoryEmojis[cat] || ["📍"];
                const emoji = emojis[index % emojis.length];

                return {
                    id: place.id,
                    name: place.place_name,
                    category: cat,
                    address: place.road_address_name || place.address_name,
                    description: place.category_name.split(">").pop()?.trim() || "장소 정보",
                    rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
                    emoji,
                    tags: generateTags(cat),
                    phone: place.phone,
                    url: place.place_url,
                };
            });

            setLocations(formattedLocations);

            // 통계 업데이트
            const newCounts: { [key: string]: number } = {};
            categories.forEach(c => {
                if (c === "전체") {
                    newCounts[c] = formattedLocations.length;
                } else {
                    newCounts[c] = formattedLocations.filter(loc => loc.category === c).length;
                }
            });
            setCounts(newCounts);

        } catch (err) {
            setError("❌ 데이터를 불러오는데 실패했습니다. API 키를 확인해주세요.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 카카오 카테고리에서 우리 카테고리로 변환
    const getCategoryFromKakao = (kakaoCategory: string): string => {
        if (kakaoCategory.includes("음식점") || kakaoCategory.includes("카페")) return "맛집";
        if (kakaoCategory.includes("관광") || kakaoCategory.includes("명소")) return "관광";
        if (kakaoCategory.includes("쇼핑") || kakaoCategory.includes("마트")) return "쇼핑";
        if (kakaoCategory.includes("문화") || kakaoCategory.includes("도서관")) return "문화";
        if (kakaoCategory.includes("공원") || kakaoCategory.includes("자연")) return "자연";
        return "관광";
    };

    // 카테고리별 태그 생성
    const generateTags = (category: string): string[] => {
        const tagMap: { [key: string]: string[] } = {
            관광: ["관광", "사진", "데이트"],
            맛집: ["맛집", "음식", "인기"],
            쇼핑: ["쇼핑", "패션", "트렌드"],
            문화: ["문화", "전시", "예술"],
            자연: ["자연", "힐링", "산책"],
        };
        return tagMap[category] || ["추천"];
    };

    // 카테고리 변경 시 데이터 로드
    useEffect(() => {
        fetchLocations(selectedCategory);
    }, [selectedCategory]);

    // 검색 필터링
    const filteredLocations = locations.filter((location) => {
        const matchesSearch =
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-blue via-pastel-green to-pastel-yellow">
                <div className="flex items-center gap-3 mb-2">
                    <MapPinIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">🗺️ 테마 지도</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    서울의 핫플레이스를 테마별로 찾아보세요! (카카오 로컬 API 연동)
                </p>
            </div>

            {/* 검색 및 필터 */}
            <div className="bento-card space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <FunnelIcon className="w-5 h-5" />
                    <h2 className="text-lg font-black">검색 & 필터</h2>
                </div>

                {/* 검색창 */}
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="neo-input pl-10"
                        placeholder="장소, 태그로 검색..."
                    />
                </div>

                {/* 카테고리 필터 */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            disabled={loading}
                            className={`py-2 px-3 border border-slate-900 font-bold text-sm transition-all duration-300 ${selectedCategory === category
                                ? "bg-purple-600 text-white -translate-y-1 shadow-bento-hover"
                                : "bg-white hover:-translate-y-0.5 shadow-bento"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 결과 수 */}
                <p className="text-sm font-medium text-slate-600">
                    {loading ? "로딩 중..." : `${filteredLocations.length}개의 장소를 찾았습니다`}
                </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
                <div className="bento-card bg-red-50 border-2 border-red-500">
                    <p className="font-bold text-red-600">{error}</p>
                    <p className="text-sm text-slate-600 mt-2">
                        카카오 개발자 사이트 (https://developers.kakao.com/)에서 REST API 키를 발급받아 Vercel 환경 변수에 추가해주세요.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 장소 리스트 */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {loading ? (
                        <div className="bento-card bg-pastel-mint text-center py-12">
                            <div className="animate-spin w-16 h-16 border-4 border-pastel-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="font-black text-xl">데이터를 불러오는 중...</p>
                        </div>
                    ) : filteredLocations.length > 0 ? (
                        filteredLocations.map((location) => (
                            <div
                                key={location.id}
                                onClick={() => setSelectedLocation(location)}
                                className={`bento-card cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-bento-hover ${selectedLocation?.id === location.id ? "bg-pastel-yellow" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-4xl">{location.emoji}</div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-black text-lg">{location.name}</h3>
                                            <span className="px-2 py-1 bg-pastel-blue text-xs font-bold rounded border border-slate-900">
                                                {location.category}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-600 mb-2">{location.description}</p>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-yellow-500">⭐</span>
                                            <span className="font-bold text-sm">{location.rating}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {location.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 bg-slate-100 text-xs font-medium rounded border border-slate-300"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bento-card bg-pastel-mint text-center py-12">
                            <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                            <p className="font-black text-xl">검색 결과가 없습니다</p>
                            <p className="text-sm text-slate-600 mt-2">다른 키워드로 검색해보세요</p>
                        </div>
                    )}
                </div>

                {/* 상세 정보 */}
                <div className="sticky top-6">
                    {selectedLocation ? (
                        <div className="result-card bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue">
                            <div className="text-center mb-4">
                                <div className="text-7xl mb-4">{selectedLocation.emoji}</div>
                                <h2 className="font-black text-3xl mb-2">{selectedLocation.name}</h2>
                                <span className="inline-block px-4 py-2 bg-white rounded-full border-2 border-slate-900 font-bold">
                                    {selectedLocation.category}
                                </span>
                            </div>

                            <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 space-y-4">
                                {/* 평점 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">평점</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">⭐</span>
                                        <span className="font-black text-2xl">{selectedLocation.rating}</span>
                                        <span className="text-sm text-slate-600">/ 5.0</span>
                                    </div>
                                </div>

                                {/* 설명 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">카테고리</p>
                                    <p className="text-base font-medium">{selectedLocation.description}</p>
                                </div>

                                {/* 주소 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">주소</p>
                                    <p className="text-base font-medium">{selectedLocation.address}</p>
                                </div>

                                {/* 전화번호 */}
                                {selectedLocation.phone && (
                                    <div>
                                        <p className="font-bold text-sm mb-1">전화번호</p>
                                        <p className="text-base font-medium">{selectedLocation.phone}</p>
                                    </div>
                                )}

                                {/* 태그 */}
                                <div>
                                    <p className="font-bold text-sm mb-2">태그</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLocation.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-pastel-yellow text-sm font-bold rounded border border-slate-900"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 버튼들 */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => {
                                            const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
                                                selectedLocation.address
                                            )}`;
                                            window.open(kakaoMapUrl, "_blank");
                                        }}
                                        className="py-3 px-4 bg-pastel-green border border-slate-900 font-bold text-sm transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                    >
                                        🗺️ 지도 보기
                                    </button>
                                    {selectedLocation.url && (
                                        <button
                                            onClick={() => window.open(selectedLocation.url, "_blank")}
                                            className="py-3 px-4 bg-pastel-blue border border-slate-900 font-bold text-sm transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            🔗 상세 정보
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">장소를 선택하면</p>
                                <p className="font-black text-xl text-pastel-purple">상세 정보가 표시됩니다!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {categories.map((category) => {
                    const count = counts[category] || 0;
                    return (
                        <div key={category} className="result-card bg-white text-center">
                            <p className="font-bold text-sm mb-1">{category}</p>
                            <p className="font-black text-3xl text-blue-600">{count}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
