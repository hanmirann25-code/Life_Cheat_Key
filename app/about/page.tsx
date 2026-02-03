import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '사이트 소개 (인생 치트키란?)',
    description: '인생 치트키는 복잡한 인생의 문제를 쉽게 해결하는 유용한 도구 모음입니다. 대출 이자 계산부터 결정 장애 해결까지, 당신의 삶을 더 편리하게 만드는 다양한 기능을 소개합니다.',
    openGraph: {
        title: '사이트 소개 (인생 치트키란?)',
        description: '인생 치트키는 복잡한 인생의 문제를 쉽게 해결하는 유용한 도구 모음입니다. 대출 이자 계산부터 결정 장애 해결까지, 당신의 삶을 더 편리하게 만드는 다양한 기능을 소개합니다.',
        url: 'https://life-cheat-key.com/about',
    },
    twitter: {
        card: 'summary_large_image',
        title: '사이트 소개 (인생 치트키란?)',
        description: '인생 치트키는 복잡한 인생의 문제를 쉽게 해결하는 유용한 도구 모음입니다. 대출 이자 계산부터 결정 장애 해결까지, 당신의 삶을 더 편리하게 만드는 다양한 기능을 소개합니다.',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black mb-8">사이트 소개</h1>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">🎯 인생 치트키란?</h2>
                        <p className="text-lg leading-relaxed">
                            <strong>인생 치트키</strong>는 일상생활에서 마주하는 복잡한 계산과 선택의 순간들을
                            클릭 몇 번으로 쉽게 해결할 수 있도록 돕는 웹 서비스입니다.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed">
                            대출 이자 계산부터 점심 메뉴 선택까지, 우리가 일상에서 겪는 크고 작은 고민들을
                            재미있고 직관적인 방식으로 해결합니다.
                        </p>
                    </section>

                    <section className="bg-neon-yellow border-4 border-black p-6">
                        <h2 className="text-2xl font-bold mb-4">💡 우리의 미션</h2>
                        <p className="text-lg font-medium">
                            "복잡한 인생, 클릭 몇 번으로 쉽게 풀자"
                        </p>
                        <p className="mt-4">
                            누구나 쉽게 접근하고 사용할 수 있는 도구를 제공하여,
                            더 나은 결정을 내리고 시간을 절약할 수 있도록 돕습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">🛠️ 주요 서비스</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border-2 border-black p-4">
                                <h3 className="font-bold text-lg mb-2">💰 머니 & 시뮬레이션</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>대출 이자 계산기</li>
                                    <li>월급 실수령액 계산</li>
                                    <li>주택 구매 시뮬레이터</li>
                                    <li>창업 수익 계산</li>
                                    <li>AI 금융 상담소 (New)</li>
                                </ul>
                            </div>

                            <div className="border-2 border-black p-4 bg-neon-pink">
                                <h3 className="font-bold text-lg mb-2">🎮 결정 & 게임</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>점심 슬롯머신</li>
                                    <li>VS 분석실</li>
                                    <li>음식 궁합 찾기</li>
                                    <li>감각 테스트</li>
                                </ul>
                            </div>

                            <div className="border-2 border-black p-4 bg-neon-blue">
                                <h3 className="font-bold text-lg mb-2">📚 정보 아카이브</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>테마 지도</li>
                                    <li>행사 캘린더</li>
                                    <li>OTT 신작 정보</li>
                                </ul>
                            </div>

                            <div className="border-2 border-black p-4 bg-neon-green">
                                <h3 className="font-bold text-lg mb-2">🤖 AI 작가</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>거절 멘트 생성기</li>
                                    <li>핑계/사과문 작성</li>
                                    <li>상황별 멘트 추천</li>
                                </ul>
                            </div>

                            <div className="border-2 border-black p-4 bg-purple-300">
                                <h3 className="font-bold text-lg mb-2">📅 습관 & 성장</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>습관 형성 게임 (게이미피케이션)</li>
                                    <li>경험치 시스템 & 레벨업</li>
                                    <li>AI 맞춤 습관 추천</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">✨ 특징</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">⚡</span>
                                <div>
                                    <h3 className="font-bold text-lg">빠른 계산</h3>
                                    <p>복잡한 계산도 클릭 한 번으로 즉시 결과 확인</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="text-3xl">📊</span>
                                <div>
                                    <h3 className="font-bold text-lg">시각화</h3>
                                    <p>차트와 그래프로 결과를 쉽게 이해</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🎨</span>
                                <div>
                                    <h3 className="font-bold text-lg">재미있는 디자인</h3>
                                    <p>지루한 계산도 게임처럼 즐겁게</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="text-3xl">📱</span>
                                <div>
                                    <h3 className="font-bold text-lg">모바일 최적화</h3>
                                    <p>언제 어디서나 편리하게 사용</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-t-2 border-black pt-8">
                        <h2 className="text-2xl font-bold mb-4">📞 문의하기</h2>
                        <p className="mb-4">
                            서비스 이용 중 문의사항이나 제안하고 싶은 기능이 있으신가요?
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-6 py-3 bg-black text-white font-bold border-2 border-black hover:-translate-y-1 hover:shadow-brutal transition-all"
                        >
                            연락처 페이지로 이동 →
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
