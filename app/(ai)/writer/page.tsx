"use client";

import { useState, useEffect } from "react";
import {
    ChatBubbleLeftRightIcon,
    ClipboardDocumentCheckIcon,
    ArrowPathIcon,
    UserIcon,
    BriefcaseIcon,
    UsersIcon,
    HeartIcon,
    NoSymbolIcon,
    BanknotesIcon,
    SparklesIcon,
    FaceSmileIcon,
    HandThumbDownIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { TargetType, SituationType, ToneType } from "@/data/refusalData";
import BentoCard from "@/components/ui/BentoCard";

export default function RefusalGeneratorPage() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [target, setTarget] = useState<TargetType | null>(null);
    const [situation, setSituation] = useState<SituationType | null>(null);
    const [tone, setTone] = useState<ToneType | null>(null);
    const [result, setResult] = useState<string>("");
    const [isTyping, setIsTyping] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const targets: { id: TargetType; label: string; icon: any }[] = [
        { id: "friend", label: "친구", icon: UserIcon },
        { id: "boss", label: "직장 상사", icon: BriefcaseIcon },
        { id: "coworker", label: "직장 동료", icon: UsersIcon },
        { id: "relative", label: "가족/친척", icon: HeartIcon },
        { id: "stranger", label: "모르는 사람", icon: NoSymbolIcon },
    ];

    const situations: { id: SituationType; label: string; icon: any }[] = [
        { id: "money", label: "돈 빌려달라", icon: BanknotesIcon },
        { id: "drink", label: "술자리/회식", icon: SparklesIcon },
        { id: "favor", label: "귀찮은 부탁", icon: HandThumbDownIcon },
        { id: "meeting", label: "약속/만남", icon: UsersIcon },
        { id: "insurance", label: "보험/영업", icon: ClipboardDocumentCheckIcon },
        { id: "wedding", label: "결혼식 초대", icon: HeartIcon },
    ];

    const tones: { id: ToneType; label: string; icon: any; color: string }[] = [
        { id: "polite", label: "정중하게 😇", icon: FaceSmileIcon, color: "bg-pastel-blue" },
        { id: "firm", label: "단호하게 😤", icon: NoSymbolIcon, color: "bg-pastel-red" },
        { id: "funny", label: "유머러스하게 🤣", icon: SparklesIcon, color: "bg-pastel-yellow" },
        { id: "excuse", label: "핑계 대기 🤥", icon: ChatBubbleLeftRightIcon, color: "bg-pastel-purple" },
        { id: "sad", label: "불쌍하게 😢", icon: HandThumbDownIcon, color: "bg-gray-200" },
    ];

    // AI API를 호출하여 거절 멘트 생성
    const generateRefusal = async (selectedTarget: TargetType, selectedSituation: SituationType, selectedTone: ToneType) => {
        setError("");
        setResult("");
        setIsLoading(true);
        setIsTyping(false);

        try {
            const response = await fetch('/api/refusal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    target: selectedTarget,
                    situation: selectedSituation,
                    tone: selectedTone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '멘트 생성에 실패했습니다.');
            }

            setResult(data.message);
            setIsTyping(true);
            setIsLoading(false); // 성공 시 로딩 상태 해제
            return data.message;
        } catch (err: any) {
            console.error('멘트 생성 오류:', err);
            setError(err.message || '멘트 생성 중 오류가 발생했습니다.');
            setIsLoading(false);
            return null;
        }
    };

    const handleToneSelect = async (selectedTone: ToneType) => {
        setTone(selectedTone);
        if (target && situation) {
            const message = await generateRefusal(target, situation, selectedTone);
            if (message) {
                setStep(4);
            }
        }
    };

    const handleReset = () => {
        setStep(1);
        setTarget(null);
        setSituation(null);
        setTone(null);
        setResult("");
        setCopied(false);
        setIsLoading(false);
        setError("");
        setIsTyping(false);
        setDisplayedText("");
    };

    const handleRegenerate = async () => {
        if (target && situation && tone) {
            await generateRefusal(target, situation, tone);
            setCopied(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 타이핑 효과
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (isTyping && result) {
            let i = 0;
            setDisplayedText("");
            const interval = setInterval(() => {
                setDisplayedText((prev) => prev + result.charAt(i));
                i++;
                if (i >= result.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 30); // 타이핑 속도
            return () => clearInterval(interval);
        } else if (!isTyping) {
            setDisplayedText(result);
        }
    }, [isTyping, result]);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black bg-black text-white inline-block px-6 py-2 transform -rotate-2">
                    🙅‍♂️ 거절 멘트 생성기
                </h1>
                <p className="text-xl font-bold text-gray-700">
                    난처한 부탁, AI가 대신 거절해드립니다.
                </p>
            </div>

            <div className="bg-white border-4 border-black p-6 md:p-10 shadow-brutal-lg relative">
                {/* 진행 상황 바 */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-black border-2 border-black transition-all duration-300 ${step >= s ? 'bg-black text-neon-yellow scale-110' : 'bg-gray-200 text-gray-400'}`}>
                            {s}
                        </div>
                    ))}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-black -z-10 transform -translate-y-1/2 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                </div>

                {/* Step 1: 대상 선택 */}
                {step === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                        <h2 className="text-2xl font-black text-center mb-6">누구에게 거절하시나요?</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {targets.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => { setTarget(t.id); setStep(2); setIsLoading(false); setError(""); }}
                                    className="flex flex-col items-center justify-center p-6 border-2 border-black rounded-xl hover:bg-pastel-purple hover:-translate-y-1 hover:shadow-brutal transition-all duration-200 group"
                                >
                                    <t.icon className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-lg">{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: 상황 선택 */}
                {step === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex items-center justify-start mb-4">
                            <button onClick={() => { setStep(1); setIsLoading(false); setError(""); }} className="text-sm font-bold underline hover:text-purple-600">← 뒤로가기</button>
                        </div>
                        <h2 className="text-2xl font-black text-center mb-6">어떤 상황인가요?</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {situations.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => { setSituation(s.id); setStep(3); setIsLoading(false); setError(""); }}
                                    className="flex flex-col items-center justify-center p-6 border-2 border-black rounded-xl hover:bg-pastel-blue hover:-translate-y-1 hover:shadow-brutal transition-all duration-200 group"
                                >
                                    <s.icon className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-lg">{s.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: 톤 선택 */}
                {step === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex items-center justify-start mb-4">
                            <button onClick={() => { setStep(2); setIsLoading(false); setError(""); }} className="text-sm font-bold underline hover:text-purple-600">← 뒤로가기</button>
                        </div>
                        <h2 className="text-2xl font-black text-center mb-6">어떤 말투로 거절할까요?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tones.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => handleToneSelect(t.id)}
                                    disabled={isLoading}
                                    className={`flex items-center justify-between p-6 border-2 border-black rounded-xl hover:-translate-y-1 hover:shadow-brutal transition-all duration-200 group ${t.color} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <span className="font-bold text-xl">{t.label}</span>
                                    {isLoading ? (
                                        <ArrowPathIcon className="w-8 h-8 animate-spin" />
                                    ) : (
                                        <t.icon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: 결과 화면 */}
                {step === 4 && (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="text-center">
                            <span className="inline-block px-3 py-1 bg-black text-white text-sm font-bold rounded-full mb-2">
                                {targets.find(t => t.id === target)?.label}에게 / {situations.find(s => s.id === situation)?.label} / {tones.find(t => t.id === tone)?.label}
                            </span>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                <p className="text-red-800 font-bold flex items-center gap-2">
                                    <ExclamationTriangleIcon className="w-5 h-5" />
                                    {error}
                                </p>
                                <p className="text-sm text-red-600 mt-2">
                                    API 키가 설정되어 있는지 확인해주세요. 환경변수 파일(.env.local)에 OPENAI_API_KEY를 추가해주세요.
                                </p>
                            </div>
                        )}

                        {result && (
                            <div className="bg-gray-50 border-2 border-black p-8 rounded-lg min-h-[150px] flex items-center justify-center relative shadow-inner">
                                <p className="text-2xl font-medium text-center leading-relaxed break-keep">
                                    {displayedText}
                                    {isTyping && <span className="animate-pulse">|</span>}
                                </p>
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                        title="복사하기"
                                    >
                                        {copied ? <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-500" /> : <ClipboardDocumentCheckIcon className="w-6 h-6 text-gray-400" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleRegenerate}
                                disabled={isLoading}
                                className={`px-6 py-3 bg-neon-yellow border-2 border-black font-bold text-lg hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                        생성 중...
                                    </>
                                ) : (
                                    <>
                                        <ArrowPathIcon className="w-5 h-5" />
                                        다른 멘트 생성
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 bg-white border-2 border-black font-bold text-lg hover:-translate-y-1 hover:shadow-brutal transition-all"
                            >
                                처음으로
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 상세 컨텐츠 섹션 */}
            <div className="space-y-8 mt-12">
                {/* 1. 기획 의도 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🙅‍♂️</span>
                        <span>기획 의도: 거절은 나를 지키는 힘입니다</span>
                    </h3>
                    <p className="text-slate-700 leading-7 text-lg mb-4">
                        "아니요"라고 말하면 미움받을까 봐 두려우신가요?
                        하지만 모든 부탁을 다 들어주다 보면 결국 내 시간과 에너지는 고갈되고 맙니다.
                    </p>
                    <p className="text-slate-700 leading-7 text-lg">
                        <strong>인생 치트키 거절 멘트 생성기</strong>는 관계를 해치지 않으면서도 단호하게 선을 긋는 법을 알려드립니다.
                        돈 빌려달라는 친구, 불편한 회식 강요, 귀찮은 영업 전화까지...
                        상황에 딱 맞는 품격 있는 거절의 말을 대신 써드립니다.
                    </p>
                </section>

                {/* 2. 사용 방법 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🕹️</span>
                        <span>사용 방법</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-black text-lg mb-3 text-neon-yellow shadow-sm">1</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">상대방 선택</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                누구에게 거절해야 하나요? 직장 상사라면 예의 바르게, 친한 친구라면 조금 더 편안하게 톤을 조절해줍니다.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">2</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">상황 고르기</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                돈 문제, 술자리, 결혼식 초대 등 가장 곤란한 대표 상황들을 모아두었습니다. 고민 없이 클릭만 하세요.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">3</div>
                            <h4 className="font-bold text-lg mb-2 text-slate-900">말투 결정</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                "정중하게", "단호하게", "유머러스하게" 등 원하는 분위기를 선택하면 소름 돋는 멘트가 1초 만에 완성됩니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. 관련 지식 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                        <span className="text-3xl">🛡️</span>
                        <span>거절의 기술 (No-How)</span>
                    </h3>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">💡 '쿠션 언어'를 사용하세요</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                거절 앞에 긍정의 말을 깔아주는 것입니다.
                                <br />
                                <span className="text-slate-500 line-through">"안 돼요, 못 가요."</span> (X)
                                <br />
                                <span className="text-blue-600">"초대해줘서 정말 고마워요(긍정). 하지만 선약이 있어서 어렵겠네요(거절). 다음에 꼭 함께해요(마무리)."</span> (O)
                            </p>
                        </div>

                        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                            <h4 className="font-bold text-red-900 mb-2">🚫 여지를 주지 마세요</h4>
                            <p className="text-sm text-red-800 leading-relaxed">
                                "생각해볼게", "노력해볼게" 같은 애매한 말은 상대방에게 헛된 희망을 줍니다.
                                할 수 없는 일이라면 <strong>가능한 빨리, 명확하게</strong> 의사를 밝히는 것이 서로를 위한 배려입니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* 4. 연관 도구 추천 (내부 링크 최적화) */}
            <section className="bg-slate-900 rounded-2xl p-8 text-white mt-12">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-neon-yellow">
                    <span className="text-3xl">🔗</span>
                    <span>멘트 완성 후 추천하는 다음 단계</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href="/excuse"
                        className="bg-white/10 hover:bg-white/20 p-5 border border-white/20 rounded-xl transition-all group"
                    >
                        <p className="font-black text-xl mb-1 group-hover:text-neon-yellow">핑계 / 사과문 생성기 →</p>
                        <p className="text-slate-400 text-sm">약속을 취소하거나 실수를 만회해야 할 때</p>
                    </a>
                    <a
                        href="/petition"
                        className="bg-white/10 hover:bg-white/20 p-5 border border-white/20 rounded-xl transition-all group"
                    >
                        <p className="font-black text-xl mb-1 group-hover:text-neon-yellow">AI 탄원서 작성 도우미 →</p>
                        <p className="text-slate-400 text-sm">진심을 담은 탄원서/반성문 초안이 필요할 때</p>
                    </a>
                </div>
            </section>
        </div>
    );
}
