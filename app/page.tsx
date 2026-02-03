import BentoCard from '@/components/ui/BentoCard';
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  ReceiptPercentIcon,
  SparklesIcon,
  ScaleIcon,
  FireIcon,
  TrophyIcon,
  PaintBrushIcon,
  MapPinIcon,
  CalendarIcon,
  ShoppingBagIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  BoltIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  FilmIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: '인생 치트키',
            url: 'https://life-cheat-key.com',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'KRW',
            },
            description: '연봉 실수령액 계산기, 대출 이자 계산 등 인생을 편하게 만드는 무료 생활 도구 모음.',
            featureList: [
              '2026 연봉 실수령액 계산기',
              '대출 이자 및 상환액 계산기',
              'AI 변명 및 사과문 생성기',
              '점심 메뉴 추천 슬롯',
              '습관 형성 트래커'
            ],
            screenshot: 'https://life-cheat-key.com/og-image.png',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neon-yellow border-b-8 border-black py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-black">복잡한 인생,</span>
            <br />
            <span className="bg-black text-white px-4 py-2 inline-block mt-2">
              클릭 몇 번으로 쉽게 풀자
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white mb-8">
            대출 계산부터 점심 메뉴 선택까지, 인생의 모든 선택을 도와드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/loan"
              className="px-8 py-4 bg-black text-white border-4 border-black font-black text-lg hover:-translate-y-2 hover:shadow-brutal-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <CalculatorIcon className="w-6 h-6" />
              대출 계산기 시작하기
            </a>
            <a
              href="#money"
              className="px-8 py-4 bg-white text-black border-4 border-black font-black text-lg hover:-translate-y-2 hover:shadow-brutal-lg transition-all duration-300"
            >
              🎯 더 알아보기
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-neon-pink border-4 border-black rotate-12 hidden lg:block"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-neon-blue border-4 border-black -rotate-6 hidden lg:block"></div>
      </section>

      {/* Main Bento Grid */}
      <section id="money" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <CurrencyDollarIcon className="w-10 h-10" />
            <span>머니 & 시뮬레이션</span>
          </h2>
          <p className="text-lg font-medium text-gray-700">
            돈과 관련된 모든 계산을 한 곳에서
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <BentoCard
            title="대출 이자 계산기"
            description="원리금균등 vs 만기일시 상환 비교. 치킨으로 환산해서 절약 금액 확인!"
            icon={<CalculatorIcon className="w-8 h-8" />}
            href="/loan"
            color="yellow"
            size="large"
          >
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-sm font-bold border-2 border-black">
              <SparklesIcon className="w-4 h-4" />
              인기 기능
            </div>
          </BentoCard>

          <BentoCard
            title="월급 실수령액"
            description="4대 보험 공제 후 실제 통장에 들어오는 금액은?"
            icon={<CurrencyDollarIcon className="w-8 h-8" />}
            href="/salary"
            color="green"
            size="small"
          />

          <BentoCard
            title="내 연봉으로 집 사기"
            description="서울 아파트 구매까지 얼마나 걸릴까?"
            icon={<HomeIcon className="w-8 h-8" />}
            href="/housing"
            color="blue"
            size="small"
          />

          <BentoCard
            title="창업 시뮬레이터"
            description="편의점 창업하면 순수익은 얼마?"
            icon={<BuildingStorefrontIcon className="w-8 h-8" />}
            href="/business"
            color="purple"
            size="small"
          />

          <BentoCard
            title="N빵 계산기"
            description="더치페이 금액 계산하고 카톡으로 공유"
            icon={<ReceiptPercentIcon className="w-8 h-8" />}
            href="/split"
            color="pink"
            size="small"
          />

          <BentoCard
            title="금융 상담소"
            description="10초 컷! AI가 알려주는 힙한 금융 솔루션"
            icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}
            href="/consult"
            color="purple"
            size="medium"
          >
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-sm font-bold border-2 border-black">
              <SparklesIcon className="w-4 h-4 text-yellow-400" />
              NEW
            </div>
          </BentoCard>
        </div>

        {/* Choice & Game Section */}
      </section>

      <section id="choice" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <TrophyIcon className="w-10 h-10" />
            <span>결정 & 게임</span>
          </h2>
          <p className="text-lg font-medium text-gray-700">
            선택 장애? 우리가 대신 골라드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <BentoCard
            title="점심 슬롯머신"
            description="오늘 뭐 먹지? 슬롯 돌려서 결정!"
            icon={<FireIcon className="w-8 h-8" />}
            href="/lunch"
            color="pink"
            size="medium"
          >
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-black text-neon-pink text-sm font-bold border-2 border-black">
              <FireIcon className="w-4 h-4" />
              바이럴 핵심
            </div>
          </BentoCard>

          <BentoCard
            title="습관 형성 게임"
            description="목표 달성을 게임처럼! AI 코치와 함께 레벨업하세요"
            icon={<TrophyIcon className="w-8 h-8" />}
            href="/habit-tracker"
            color="green"
            size="large"
          >
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-black text-neon-green text-sm font-bold border-2 border-black">
              <SparklesIcon className="w-4 h-4" />
              AI 활용
            </div>
          </BentoCard>


          <BentoCard
            title="VS 분석실"
            description="치킨 vs 피자? 스펙 비교로 현명한 선택"
            icon={<ScaleIcon className="w-8 h-8" />}
            href="/vs"
            color="purple"
            size="small"
          />

          <BentoCard
            title="음식 궁합"
            description="불닭볶음면 + 치즈 같은 꿀조합 발견"
            icon={<FireIcon className="w-8 h-8" />}
            href="/food"
            color="yellow"
            size="small"
          />

          <BentoCard
            title="랜덤 추천"
            description="영화, 데이트 코스 랜덤 추천"
            icon={<SparklesIcon className="w-8 h-8" />}
            href="/random"
            color="blue"
            size="small"
          />

          <BentoCard
            title="감각 테스트"
            description="색깔 찾기, 폰트 맞추기 게임"
            icon={<PaintBrushIcon className="w-8 h-8" />}
            href="/test"
            color="green"
            size="small"
          />


        </div>

        {/* Info Archive Section */}
      </section>

      <section id="info" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <MapPinIcon className="w-10 h-10" />
            <span>정보 아카이브</span>
          </h2>
          <p className="text-lg font-medium text-gray-700">
            유용한 정보를 한눈에
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <BentoCard
            title="테마 지도"
            description="노키즈존, 애견카페, 콘센트 많은 카페"
            icon={<MapPinIcon className="w-8 h-8" />}
            href="/map"
            color="blue"
            size="small"
          />

          <BentoCard
            title="행사 캘린더"
            description="전국 축제, 팝업스토어 일정"
            icon={<CalendarIcon className="w-8 h-8" />}
            href="/calendar"
            color="purple"
            size="small"
          />

          <BentoCard
            title="OTT 신작"
            description="최신 영화·드라마 정보"
            icon={<FilmIcon className="w-8 h-8" />}
            href="/convenience"
            color="pink"
            size="small"
          />
        </div>

        {/* AI Tools Section */}
      </section>

      <section id="ai" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <PencilSquareIcon className="w-10 h-10" />
            <span>AI 작가</span>
          </h2>
          <p className="text-lg font-medium text-gray-700">
            난처한 상황, AI가 대신 써드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BentoCard
            title="거절 멘트 생성기"
            description="돈 빌려달라는 부탁, 회식 거절 등 정중하게"
            icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}
            href="/writer"
            color="purple"
            size="medium"
          />

          <BentoCard
            title="핑계/사과문"
            description="약속 취소, 지각 등 상황별 멘트"
            icon={<PencilSquareIcon className="w-8 h-8" />}
            href="/excuse"
            color="green"
            size="medium"
          />
        </div>
      </section>

      {/* Features Highlight */}
      <section className="bg-black text-white py-16 px-4 border-t-8 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center text-neon-yellow">
            왜 인생 치트키인가?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <BoltIcon className="w-16 h-16 mx-auto mb-4 text-neon-yellow" />
              <h3 className="text-2xl font-black mb-2 text-neon-yellow">빠른 계산</h3>
              <p className="text-lg">복잡한 계산도 클릭 한 번으로 끝</p>
            </div>
            <div className="text-center">
              <ChartBarIcon className="w-16 h-16 mx-auto mb-4 text-neon-yellow" />
              <h3 className="text-2xl font-black mb-2 text-neon-yellow">시각화</h3>
              <p className="text-lg">차트와 그래프로 쉽게 이해</p>
            </div>
            <div className="text-center">
              <PuzzlePieceIcon className="w-16 h-16 mx-auto mb-4 text-neon-yellow" />
              <h3 className="text-2xl font-black mb-2 text-neon-yellow">재미있게</h3>
              <p className="text-lg">지루한 계산도 게임처럼 즐겁게</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
