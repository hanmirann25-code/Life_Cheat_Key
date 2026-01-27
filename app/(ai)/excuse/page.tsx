'use client';

import { useState } from 'react';
import {
    PencilSquareIcon,
    ClipboardDocumentIcon,
    ArrowPathIcon,
    ClockIcon,
    XCircleIcon,
    CalendarDaysIcon,
    ExclamationTriangleIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

type Situation = 'late' | 'cancel' | 'forgot' | 'mistake' | 'sick';
type Relationship = 'boss' | 'friend' | 'partner' | 'family';

const situations: { id: Situation; name: string; icon: any }[] = [
    { id: 'late', name: '지각했을 때', icon: ClockIcon },
    { id: 'cancel', name: '약속 취소', icon: XCircleIcon },
    { id: 'forgot', name: '까먹었을 때', icon: CalendarDaysIcon },
    { id: 'mistake', name: '실수했을 때', icon: ExclamationTriangleIcon },
    { id: 'sick', name: '아플 때', icon: HeartIcon },
];

const relationships: { id: Relationship; name: string }[] = [
    { id: 'boss', name: '상사/선배' },
    { id: 'friend', name: '친구' },
    { id: 'partner', name: '연인' },
    { id: 'family', name: '가족' },
];

export default function ExcuseGenerator() {
    const [situation, setSituation] = useState<Situation>('late');
    const [relationship, setRelationship] = useState<Relationship>('boss');
    const [detail, setDetail] = useState<string>('');
    const [generatedMessage, setGeneratedMessage] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // AI API를 호출하여 메시지 생성
    const generateMessage = async () => {
        // 에러 초기화
        setError('');
        setGeneratedMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/excuse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    situation,
                    relationship,
                    detail: detail.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '메시지 생성에 실패했습니다.');
            }

            setGeneratedMessage(data.message);
            setCopied(false);
        } catch (err: any) {
            console.error('메시지 생성 오류:', err);
            setError(err.message || '메시지 생성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!generatedMessage) return;
        navigator.clipboard.writeText(generatedMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-2">
                        <PencilSquareIcon className="w-10 h-10 text-green-600" />
                        핑계/사과문 생성기
                    </h1>
                    <p className="text-xl text-gray-600">
                        진심 어린 사과부터 그럴듯한 핑계까지, 상황에 맞게 척척!
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-black">
                    <div className="p-8">
                        {/* Situation Selection */}
                        <div className="mb-8">
                            <label className="block text-lg font-bold text-gray-900 mb-4">
                                어떤 상황인가요?
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {situations.map((sit) => (
                                    <button
                                        key={sit.id}
                                        onClick={() => setSituation(sit.id)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${situation === sit.id
                                                ? 'bg-green-100 border-green-600 text-green-900 transform scale-105'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-green-300'
                                            }`}
                                    >
                                        <sit.icon className="w-8 h-8" />
                                        <span className="font-bold">{sit.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Relationship Selection */}
                        <div className="mb-8">
                            <label className="block text-lg font-bold text-gray-900 mb-4">
                                누구에게 보내나요?
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {relationships.map((rel) => (
                                    <button
                                        key={rel.id}
                                        onClick={() => setRelationship(rel.id)}
                                        className={`px-6 py-3 rounded-full border-2 font-bold transition-all duration-200 ${relationship === rel.id
                                                ? 'bg-black text-white border-black transform scale-105'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                                            }`}
                                    >
                                        {rel.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Detail Input */}
                        <div className="mb-10">
                            <label className="block text-lg font-bold text-gray-900 mb-4">
                                핑계거리 / 상세 사유 (선택사항)
                            </label>
                            <input
                                type="text"
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                placeholder="예: 교통체증, 급체, 갑작스러운 야근"
                                className="neo-input rounded-xl"
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generateMessage}
                            disabled={isLoading}
                            className={`w-full neo-button bg-green-500 text-white border-black rounded-xl text-xl flex items-center justify-center gap-2 mb-8 hover:bg-green-600 transition-all duration-200 ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <ArrowPathIcon className="w-6 h-6 animate-spin" />
                                    생성 중...
                                </>
                            ) : (
                                <>
                                    <PencilSquareIcon className="w-6 h-6" />
                                    메시지 생성하기
                                </>
                            )}
                        </button>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                <p className="text-red-800 font-bold flex items-center gap-2">
                                    <ExclamationTriangleIcon className="w-5 h-5" />
                                    {error}
                                </p>
                                <p className="text-sm text-red-600 mt-2">
                                    API 키가 설정되어 있는지 확인해주세요. 환경변수 파일(.env.local)에 OPENAI_API_KEY를 추가해주세요.
                                </p>
                            </div>
                        )}

                        {/* Result Area */}
                        {generatedMessage && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="result-card bg-green-50 rounded-xl relative">
                                    <h3 className="text-sm font-bold text-green-900 mb-2 uppercase tracking-wide">
                                        생성된 메시지
                                    </h3>
                                    <div className="p-6 bg-white rounded-lg border-2 border-green-100 text-lg leading-relaxed font-medium text-gray-800 min-h-[100px] flex items-center justify-center text-center">
                                        "{generatedMessage}"
                                    </div>

                                    <div className="flex gap-4 mt-4">
                                        <button
                                            onClick={copyToClipboard}
                                            className={`flex-1 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 border-2 transition-all duration-200 ${copied
                                                    ? 'bg-green-500 text-white border-green-600'
                                                    : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {copied ? (
                                                <>
                                                    <ClipboardDocumentIcon className="w-5 h-5" />
                                                    복사완료!
                                                </>
                                            ) : (
                                                <>
                                                    <ClipboardDocumentIcon className="w-5 h-5" />
                                                    복사하기
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={generateMessage}
                                            className="flex-1 py-3 px-4 rounded-lg font-bold bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                                        >
                                            <ArrowPathIcon className="w-5 h-5" />
                                            다시 생성
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
