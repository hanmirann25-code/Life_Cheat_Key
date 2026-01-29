'use client';

import { useState } from 'react';
import {
    DocumentTextIcon,
    ClipboardDocumentIcon,
    ArrowPathIcon,
    ExclamationTriangleIcon,
    BriefcaseIcon,
    HeartIcon,
    UserIcon,
    ScaleIcon,
    BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

type PetitionType = 'criminal' | 'civil' | 'administrative' | 'appeal' | 'pardon';
type Situation = 'first_time' | 'family_circumstances' | 'sincere_repentance' | 'misunderstanding' | 'cooperation' | 'rehabilitation';

const petitionTypes: { id: PetitionType; name: string; icon: any; description: string }[] = [
    { id: 'criminal', name: '형사 사건', icon: BriefcaseIcon, description: '가벼운 처벌 또는 선처 요청' },
    { id: 'civil', name: '민사 사건', icon: ScaleIcon, description: '분쟁 해결 또는 조정 요청' },
    { id: 'administrative', name: '행정 처분', icon: BuildingOffice2Icon, description: '행정 결정 재심 또는 변경 요청' },
    { id: 'appeal', name: '항소/재심', icon: DocumentTextIcon, description: '원심 판결 재고 요청' },
    { id: 'pardon', name: '사면/복권', icon: HeartIcon, description: '과거 처벌 면제 요청' },
];

const situations: { id: Situation; name: string; description: string }[] = [
    { id: 'first_time', name: '초범', description: '처음 범한 실수입니다' },
    { id: 'family_circumstances', name: '가족 상황', description: '가족을 부양해야 하는 상황입니다' },
    { id: 'sincere_repentance', name: '진심으로 반성', description: '진심으로 반성하고 있습니다' },
    { id: 'misunderstanding', name: '오해/착오', description: '오해나 착오가 있었습니다' },
    { id: 'cooperation', name: '수사 협조', description: '수사 과정에서 협조했습니다' },
    { id: 'rehabilitation', name: '사회 복귀 의지', description: '사회에 복귀하여 기여하겠습니다' },
];

export default function PetitionGenerator() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [petitionType, setPetitionType] = useState<PetitionType | null>(null);
    const [situation, setSituation] = useState<Situation | null>(null);
    const [petitionerName, setPetitionerName] = useState<string>('');
    const [targetName, setTargetName] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [generatedPetition, setGeneratedPetition] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // AI API를 호출하여 탄원서 생성
    const generatePetition = async () => {
        if (!petitionType || !situation) {
            setError('탄원서 유형과 상황을 선택해주세요.');
            return;
        }

        setError('');
        setGeneratedPetition('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/petition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    petitionType,
                    situation,
                    petitionerName: petitionerName.trim(),
                    targetName: targetName.trim(),
                    details: details.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '탄원서 생성에 실패했습니다.');
            }

            setGeneratedPetition(data.petition);
            setCopied(false);
        } catch (err: any) {
            console.error('탄원서 생성 오류:', err);
            setError(err.message || '탄원서 생성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!generatedPetition) return;
        navigator.clipboard.writeText(generatedPetition);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setStep(1);
        setPetitionType(null);
        setSituation(null);
        setPetitionerName('');
        setTargetName('');
        setDetails('');
        setGeneratedPetition('');
        setCopied(false);
        setIsLoading(false);
        setError('');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-2">
                        <DocumentTextIcon className="w-10 h-10 text-purple-600" />
                        탄원서 작성기
                    </h1>
                    <p className="text-xl text-gray-600">
                        AI가 도와주는 법적 문서 작성, 진심이 담긴 탄원서를 작성하세요.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-black">
                    <div className="p-8">
                        {/* 진행 상황 바 */}
                        <div className="flex items-center justify-between mb-8 relative">
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-2 border-black transition-all duration-300 ${step >= s ? 'bg-black text-white scale-110' : 'bg-gray-200 text-gray-400'
                                        }`}
                                >
                                    {s}
                                </div>
                            ))}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                            <div
                                className="absolute top-1/2 left-0 h-1 bg-black -z-10 transform -translate-y-1/2 transition-all duration-500"
                                style={{ width: `${((step - 1) / 3) * 100}%` }}
                            ></div>
                        </div>

                        {/* Step 1: 탄원서 유형 선택 */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <h2 className="text-2xl font-black text-center mb-6">어떤 탄원서를 작성하시나요?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {petitionTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => {
                                                setPetitionType(type.id);
                                                setStep(2);
                                                setIsLoading(false);
                                                setError('');
                                            }}
                                            className="flex flex-col items-start p-6 border-2 border-black rounded-xl hover:bg-purple-50 hover:-translate-y-1 hover:shadow-brutal transition-all duration-200 group text-left"
                                        >
                                            <type.icon className="w-10 h-10 mb-3 text-purple-600 group-hover:scale-110 transition-transform" />
                                            <span className="font-bold text-lg mb-1">{type.name}</span>
                                            <span className="text-sm text-gray-600">{type.description}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: 상황 선택 */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex items-center justify-start mb-4">
                                    <button
                                        onClick={() => {
                                            setStep(1);
                                            setIsLoading(false);
                                            setError('');
                                        }}
                                        className="text-sm font-bold underline hover:text-purple-600"
                                    >
                                        ← 뒤로가기
                                    </button>
                                </div>
                                <h2 className="text-2xl font-black text-center mb-6">어떤 상황인가요?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {situations.map((sit) => (
                                        <button
                                            key={sit.id}
                                            onClick={() => {
                                                setSituation(sit.id);
                                                setStep(3);
                                                setIsLoading(false);
                                                setError('');
                                            }}
                                            className="flex flex-col items-start p-6 border-2 border-black rounded-xl hover:bg-purple-50 hover:-translate-y-1 hover:shadow-brutal transition-all duration-200 text-left"
                                        >
                                            <span className="font-bold text-lg mb-1">{sit.name}</span>
                                            <span className="text-sm text-gray-600">{sit.description}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: 상세 정보 입력 */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex items-center justify-start mb-4">
                                    <button
                                        onClick={() => {
                                            setStep(2);
                                            setIsLoading(false);
                                            setError('');
                                        }}
                                        className="text-sm font-bold underline hover:text-purple-600"
                                    >
                                        ← 뒤로가기
                                    </button>
                                </div>
                                <h2 className="text-2xl font-black text-center mb-6">상세 정보를 입력해주세요</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-lg font-bold text-gray-900 mb-2">
                                            탄원인 이름 (선택사항)
                                        </label>
                                        <input
                                            type="text"
                                            value={petitionerName}
                                            onChange={(e) => setPetitionerName(e.target.value)}
                                            placeholder="예: 홍길동"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-gray-900 mb-2">
                                            대상자 이름 (선택사항)
                                        </label>
                                        <input
                                            type="text"
                                            value={targetName}
                                            onChange={(e) => setTargetName(e.target.value)}
                                            placeholder="예: 김철수"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-gray-900 mb-2">
                                            상세 사유 (선택사항)
                                        </label>
                                        <textarea
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            placeholder="구체적인 상황이나 사유를 입력해주세요..."
                                            rows={6}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:outline-none resize-none"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setStep(4);
                                            generatePetition();
                                        }}
                                        disabled={isLoading}
                                        className={`w-full py-4 bg-purple-600 text-white border-2 border-black rounded-xl text-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <ArrowPathIcon className="w-6 h-6 animate-spin" />
                                                탄원서 생성 중...
                                            </>
                                        ) : (
                                            <>
                                                <DocumentTextIcon className="w-6 h-6" />
                                                탄원서 생성하기
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: 결과 화면 */}
                        {step === 4 && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-black text-white text-sm font-bold rounded-full mb-2">
                                        {petitionTypes.find((t) => t.id === petitionType)?.name} /{' '}
                                        {situations.find((s) => s.id === situation)?.name}
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

                                {/* Generated Petition */}
                                {generatedPetition && (
                                    <div className="bg-gray-50 border-2 border-black p-8 rounded-lg relative shadow-inner">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                                            생성된 탄원서
                                        </h3>
                                        <div className="prose max-w-none">
                                            <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">
                                                {generatedPetition}
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <button
                                                onClick={copyToClipboard}
                                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                                title="복사하기"
                                            >
                                                {copied ? (
                                                    <ClipboardDocumentIcon className="w-6 h-6 text-green-500" />
                                                ) : (
                                                    <ClipboardDocumentIcon className="w-6 h-6 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={generatePetition}
                                        disabled={isLoading}
                                        className={`px-6 py-3 bg-purple-600 text-white border-2 border-black font-bold text-lg hover:bg-purple-700 flex items-center justify-center gap-2 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                                다시 생성 중...
                                            </>
                                        ) : (
                                            <>
                                                <ArrowPathIcon className="w-5 h-5" />
                                                다시 생성
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-3 bg-white border-2 border-black font-bold text-lg hover:bg-gray-50 transition-all"
                                    >
                                        처음으로
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* 상세 컨텐츠 섹션 */}
                <div className="space-y-8 mt-12">
                    {/* 1. 기획 의도 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-800 mb-4 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                            <span className="text-3xl">⚖️</span>
                            <span>기획 의도: 법 앞에서도, 사람의 마음은 움직일 수 있습니다</span>
                        </h3>
                        <p className="text-slate-700 leading-7 text-lg mb-4">
                            살다 보면 억울한 일을 당하거나, 한순간의 실수로 선처를 구해야 하는 순간이 찾아옵니다.
                            하지만 법률 용어는 어렵고, 어떤 말부터 꺼내야 할지 막막하기만 합니다.
                        </p>
                        <p className="text-slate-700 leading-7 text-lg">
                            <strong>인생 치트키 탄원서 작성기</strong>는 전문 법조인의 도움을 받기 힘든 분들을 위해 탄생했습니다.
                            판사님, 검사님, 혹은 담당관의 마음을 움직일 수 있는 진심 어린 호소문을 AI 기술로 다듬어드립니다.
                            당신의 간절함이 헛되지 않도록 도와드리겠습니다.
                        </p>
                    </section>

                    {/* 2. 사용 방법 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                            <span className="text-3xl">📝</span>
                            <span>작성 가이드</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">1</div>
                                <h4 className="font-bold text-lg mb-2 text-slate-900">유형 선택</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    음주운전 반성문, 폭행 합의 탄원서 등 작성 목적에 맞는 카테고리를 정확히 선택해주세요.
                                </p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">2</div>
                                <h4 className="font-bold text-lg mb-2 text-slate-900">상세 내용</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    6하 원칙에 따라 솔직하게 적어주세요. "정말 죄송합니다" 같은 추상적인 말보다 구체적인 정황과 반성의 징표(봉사활동 등)가 효과적입니다.
                                </p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-black text-lg mb-3 text-white shadow-sm">3</div>
                                <h4 className="font-bold text-lg mb-2 text-slate-900">검토 및 제출</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    생성된 초안을 바탕으로 본인의 말투로 조금 더 다듬어, 자필 서명과 함께 제출하면 진정성이 배가됩니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 3. 관련 지식 */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
                            <span className="text-3xl">💡</span>
                            <span>탄원서 작성 꿀팁</span>
                        </h3>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <h4 className="text-lg font-bold text-slate-900 mb-2">📌 감정에만 호소하지 마세요</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    "너무 억울합니다", "한 번만 봐주세요"라는 말만 반복하면 역효과가 날 수 있습니다.
                                    <strong>객관적인 사실 관계</strong>와 <strong>재발 방지를 위한 구체적인 계획</strong>(상담 치료 예약 내역 등)을 첨부하는 것이 훨씬 설득력 있습니다.
                                </p>
                            </div>

                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
                                <h4 className="font-bold text-yellow-900 mb-2">✍️ 자필의 힘</h4>
                                <p className="text-sm text-yellow-800 leading-relaxed">
                                    AI가 써준 내용을 그대로 프린트하기보다, 중요한 부분이나 서명만큼은 <strong>자필</strong>로 작성하는 것이 읽는 사람에게 깊은 인상을 남깁니다.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
