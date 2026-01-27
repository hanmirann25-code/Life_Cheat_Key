"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Event {
    id: string;
    title: string;
    date: string;
    category: string;
    location: string;
    description: string;
    emoji: string;
    addr1?: string;
    tel?: string;
}

interface TourEvent {
    contentid: string;
    title: string;
    eventstartdate: string;
    eventenddate: string;
    addr1: string;
    tel: string;
    firstimage?: string;
}

const categories = ["전체", "축제", "공연", "마켓", "음식", "문화"];
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

// 카테고리별 이모지
const categoryEmojis: { [key: string]: string[] } = {
    축제: ["🎉", "🎊", "🎆", "🎇", "🌸"],
    공연: ["🎤", "🎭", "🎸", "🎷", "🎪"],
    마켓: ["🛍️", "🎄", "🏬", "🎁", "🛒"],
    음식: ["🍔", "🍕", "🍜", "🍱", "🍗"],
    문화: ["📚", "🎬", "🎨", "🖼️", "🎭"],
};

export default function EventCalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Tour API 호출
    const fetchEvents = async (month: number) => {
        setLoading(true);
        setError(null);

        try {
            const year = new Date().getFullYear();
            const monthStr = String(month + 1).padStart(2, "0");
            const eventMonth = `${year}${monthStr}`;

            // Next.js API Route를 통해 Tour API 호출 (CORS 우회)
            const response = await fetch(`/api/tour?eventMonth=${eventMonth}`);

            if (!response.ok) {
                throw new Error("API 요청 실패");
            }

            const data = await response.json();

            // 에러 응답 체크
            if (data.error) {
                throw new Error(data.error);
            }

            const items = data.response?.body?.items?.item || [];

            // 배열이 아닌 경우 배열로 변환
            const eventArray = Array.isArray(items) ? items : items ? [items] : [];

            // Tour API 데이터를 우리 형식으로 변환
            const formattedEvents: Event[] = eventArray.map((item: TourEvent, index: number) => {
                const category = getCategoryFromTitle(item.title);
                const emojis = categoryEmojis[category] || ["🎉"];
                const emoji = emojis[index % emojis.length];

                return {
                    id: item.contentid,
                    title: item.title,
                    date: formatDate(item.eventstartdate),
                    category,
                    location: item.addr1 || "장소 미정",
                    description: `${formatDate(item.eventstartdate)} ~ ${formatDate(item.eventenddate)}`,
                    emoji,
                    addr1: item.addr1,
                    tel: item.tel,
                };
            });

            setEvents(formattedEvents);
        } catch (err) {
            setError("❌ 데이터를 불러오는데 실패했습니다.");
            console.error(err);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    // 날짜 포맷 변환 (20260405 -> 2026-04-05)
    const formatDate = (dateStr: string): string => {
        if (!dateStr || dateStr.length !== 8) return "";
        return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
    };

    // 제목에서 카테고리 추측 (개선된 버전)
    const getCategoryFromTitle = (title: string): string => {
        const lowerTitle = title.toLowerCase();

        // 축제 키워드
        if (lowerTitle.includes("축제") || lowerTitle.includes("페스티벌") ||
            lowerTitle.includes("festival") || lowerTitle.includes("불꽃") ||
            lowerTitle.includes("벚꽃") || lowerTitle.includes("단풍")) {
            return "축제";
        }

        // 공연 키워드
        if (lowerTitle.includes("공연") || lowerTitle.includes("콘서트") ||
            lowerTitle.includes("음악회") || lowerTitle.includes("뮤지컬") ||
            lowerTitle.includes("연극") ||
            lowerTitle.includes("재즈") || lowerTitle.includes("클래식")) {
            return "공연";
        }

        // 마켓 키워드
        if (lowerTitle.includes("마켓") || lowerTitle.includes("시장") ||
            lowerTitle.includes("장터") || lowerTitle.includes("바자회")) {
            return "마켓";
        }

        // 음식 키워드
        if (lowerTitle.includes("음식") || lowerTitle.includes("푸드") ||
            lowerTitle.includes("먹거리") || lowerTitle.includes("맛") ||
            lowerTitle.includes("food") || lowerTitle.includes("맥주") ||
            lowerTitle.includes("김장")) {
            return "음식";
        }

        // 문화 키워드
        if (lowerTitle.includes("전시") || lowerTitle.includes("박물관") ||
            lowerTitle.includes("미술관") || lowerTitle.includes("문화") ||
            lowerTitle.includes("도서") || lowerTitle.includes("영화")) {
            return "문화";
        }

        // 기본값: 축제
        return "축제";
    };

    // 월 변경 시 데이터 로드
    useEffect(() => {
        fetchEvents(selectedMonth);
    }, [selectedMonth]);

    const handlePrevMonth = () => {
        setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
    };

    const handleNextMonth = () => {
        setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
    };

    const filteredEvents = events.filter((event) => {
        const matchesCategory = selectedCategory === "전체" || event.category === selectedCategory;
        return matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="highlight-card bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-yellow">
                <div className="flex items-center gap-3 mb-2">
                    <CalendarIcon className="w-10 h-10" />
                    <h1 className="text-3xl md:text-4xl font-black">📅 행사 캘린더</h1>
                </div>
                <p className="text-base md:text-lg font-medium text-slate-800">
                    전국의 다양한 행사와 축제 정보를 확인하세요! (Tour API 연동)
                </p>
            </div>

            {/* 월 선택 */}
            <div className="bento-card">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={handlePrevMonth}
                        disabled={loading}
                        className="p-2 bg-white border border-slate-900 font-bold transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-black">{months[selectedMonth]}</h2>
                    <button
                        onClick={handleNextMonth}
                        disabled={loading}
                        className="p-2 bg-white border border-slate-900 font-bold transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover disabled:opacity-50"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* 카테고리 필터 */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`py-2 px-3 border border-slate-900 font-bold text-sm transition-all duration-300 ${selectedCategory === category
                                ? "bg-purple-600 text-white -translate-y-1 shadow-bento-hover"
                                : "bg-white hover:-translate-y-0.5 shadow-bento"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 결과 수 */}
                <p className="text-sm font-medium text-slate-600 mt-4">
                    {loading ? "로딩 중..." : `${filteredEvents.length}개의 행사를 찾았습니다`}
                </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
                <div className="bento-card bg-red-50 border-2 border-red-500">
                    <p className="font-bold text-red-600">{error}</p>
                    <p className="text-sm text-red-500 mt-2">샘플 데이터로 전환하거나 다른 달을 선택해보세요.</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 행사 리스트 */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {loading ? (
                        <div className="bento-card bg-pastel-mint text-center py-12">
                            <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="font-black text-xl">데이터를 불러오는 중...</p>
                        </div>
                    ) : filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`bento-card cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-bento-hover ${selectedEvent?.id === event.id ? "bg-pastel-yellow" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-4xl">{event.emoji}</div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-black text-lg">{event.title}</h3>
                                            <span className="px-2 py-1 bg-pastel-blue text-xs font-bold rounded border border-slate-900">
                                                {event.category}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-600 mb-2">{event.description}</p>
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                            <span>📍 {event.location}</span>
                                            <span>📅 {new Date(event.date).toLocaleDateString("ko-KR")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bento-card bg-pastel-mint text-center py-12">
                            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                            <p className="font-black text-xl">이번 달 행사가 없습니다</p>
                            <p className="text-sm text-slate-600 mt-2">다른 달을 선택해보세요</p>
                        </div>
                    )}
                </div>

                {/* 상세 정보 */}
                <div className="sticky top-6">
                    {selectedEvent ? (
                        <div className="result-card bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue">
                            <div className="text-center mb-4">
                                <div className="text-7xl mb-4">{selectedEvent.emoji}</div>
                                <h2 className="font-black text-3xl mb-2">{selectedEvent.title}</h2>
                                <span className="inline-block px-4 py-2 bg-white rounded-full border-2 border-slate-900 font-bold">
                                    {selectedEvent.category}
                                </span>
                            </div>

                            <div className="bg-white bg-opacity-70 p-6 rounded border border-slate-900 space-y-4">
                                {/* 날짜 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">기간</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📅</span>
                                        <span className="font-black text-lg">{selectedEvent.description}</span>
                                    </div>
                                </div>

                                {/* 장소 */}
                                <div>
                                    <p className="font-bold text-sm mb-1">장소</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📍</span>
                                        <span className="font-black text-lg">{selectedEvent.location}</span>
                                    </div>
                                </div>

                                {/* 전화번호 */}
                                {selectedEvent.tel && (
                                    <div>
                                        <p className="font-bold text-sm mb-1">문의</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">📞</span>
                                            <span className="font-medium text-base">{selectedEvent.tel}</span>
                                        </div>
                                    </div>
                                )}

                                {/* 액션 버튼 */}
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            if (selectedEvent.addr1) {
                                                const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
                                                    selectedEvent.addr1
                                                )}`;
                                                window.open(kakaoMapUrl, "_blank");
                                            }
                                        }}
                                        className="w-full py-3 px-4 bg-pastel-green border border-slate-900 font-bold text-sm transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                    >
                                        🗺️ 지도 보기
                                    </button>

                                    {/* SNS 공유 버튼들 */}
                                    <div className="grid grid-cols-3 gap-2">
                                        {/* 카카오톡 공유 */}
                                        <button
                                            onClick={() => {
                                                const shareText = `${selectedEvent.title}\n📅 ${selectedEvent.description}\n📍 ${selectedEvent.location}`;
                                                const kakaoUrl = `https://sharer.kakao.com/talk/friends/?app_key=YOUR_APP_KEY&text=${encodeURIComponent(shareText)}`;
                                                window.open(kakaoUrl, '_blank', 'width=500,height=500');
                                            }}
                                            className="py-2 px-3 bg-yellow-400 border border-slate-900 font-bold text-xs transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            💬 카톡
                                        </button>

                                        {/* 페이스북 공유 */}
                                        <button
                                            onClick={() => {
                                                const shareText = `${selectedEvent.title} - ${selectedEvent.description}`;
                                                const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                                                window.open(fbUrl, '_blank', 'width=600,height=400');
                                            }}
                                            className="py-2 px-3 bg-blue-500 text-white border border-slate-900 font-bold text-xs transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            📘 페북
                                        </button>

                                        {/* 트위터 공유 */}
                                        <button
                                            onClick={() => {
                                                const shareText = `${selectedEvent.title}\n📅 ${selectedEvent.description}\n📍 ${selectedEvent.location}`;
                                                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                                                window.open(twitterUrl, '_blank', 'width=600,height=400');
                                            }}
                                            className="py-2 px-3 bg-sky-400 text-white border border-slate-900 font-bold text-xs transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            🐦 트위터
                                        </button>

                                        {/* 인스타그램 공유 */}
                                        <button
                                            onClick={async () => {
                                                const shareText = `${selectedEvent.title}\n📅 ${selectedEvent.description}\n📍 ${selectedEvent.location}`;

                                                // 모바일에서는 인스타그램 앱 열기 시도
                                                if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                                                    window.location.href = 'instagram://';
                                                    setTimeout(() => {
                                                        window.open('https://www.instagram.com/', '_blank');
                                                    }, 500);
                                                } else {
                                                    // 데스크톱에서는 클립보드 복사
                                                    try {
                                                        await navigator.clipboard.writeText(shareText);
                                                        alert('📋 인스타그램에 공유할 내용이 복사되었습니다!\n인스타그램 앱에서 붙여넣기 해주세요.');
                                                    } catch (err) {
                                                        alert('❌ 복사에 실패했습니다.');
                                                    }
                                                }
                                            }}
                                            className="py-2 px-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-slate-900 font-bold text-xs transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            📷 인스타
                                        </button>

                                        {/* 네이버 블로그 */}
                                        <button
                                            onClick={() => {
                                                const shareText = `${selectedEvent.title}\n${selectedEvent.description}\n${selectedEvent.location}`;
                                                const naverUrl = `https://blog.naver.com/openapi/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(selectedEvent.title)}`;
                                                window.open(naverUrl, '_blank', 'width=600,height=400');
                                            }}
                                            className="py-2 px-3 bg-green-500 text-white border border-slate-900 font-bold text-xs transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            📗 블로그
                                        </button>

                                        {/* URL 복사 */}
                                        <button
                                            onClick={async () => {
                                                const shareText = `${selectedEvent.title}\n📅 ${selectedEvent.description}\n📍 ${selectedEvent.location}${selectedEvent.tel ? `\n📞 ${selectedEvent.tel}` : ''}`;

                                                try {
                                                    await navigator.clipboard.writeText(shareText);
                                                    alert('📋 행사 정보가 클립보드에 복사되었습니다!');
                                                } catch (err) {
                                                    alert('❌ 복사에 실패했습니다.');
                                                }
                                            }}
                                            className="py-2 px-3 bg-pastel-purple text-white border border-slate-900 font-bold text-xs transition-all duration-300 hover:-translate-y-1 shadow-bento hover:shadow-bento-hover"
                                        >
                                            📋 복사
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bento-card bg-pastel-mint h-full min-h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                <p className="font-black text-xl mb-2">행사를 선택하면</p>
                                <p className="font-black text-xl text-pastel-purple">상세 정보가 표시됩니다!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 월별 통계 */}
            <div className="bento-card bg-white">
                <h3 className="text-lg font-black mb-4">📊 월별 행사 수</h3>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {months.map((month, index) => {
                        const count = index === selectedMonth ? events.length : 0;
                        return (
                            <div
                                key={month}
                                onClick={() => setSelectedMonth(index)}
                                className={`p-3 border border-slate-900 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedMonth === index ? "bg-purple-600 text-white shadow-bento-hover" : "bg-white shadow-bento"
                                    }`}
                            >
                                <p className="text-xs font-bold mb-1">{month}</p>
                                <p className="font-black text-lg">{count}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
