"use client";

import { useState, useRef, useEffect } from "react";
import {
    CameraIcon,
    PhotoIcon,
    ArrowPathIcon,
    ArrowDownTrayIcon,
    SparklesIcon,
    ScissorsIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

// 헤어 스타일 데이터 (실제 프로젝트에서는 public/assets/hair 에 이미지를 넣어야 합니다)
// 현재는 텍스트와 스타일로 대체하거나 placeholder 이미지를 사용합니다.
const HAIRSTYLES = [
    { id: "s1", name: "숏컷 보브", color: "brown", type: "short" },
    { id: "s2", name: "픽시 컷", color: "blonde", type: "short" },
    { id: "m1", name: "미디움 레이어드", color: "black", type: "medium" },
    { id: "m2", name: "허쉬 컷", color: "ash", type: "medium" },
    { id: "l1", name: "롱 웨이브", color: "natural", type: "long" },
    { id: "l2", name: "글램 펌", color: "gold", type: "long" },
    { id: "p1", name: "포마드 (남성)", color: "black", type: "male" },
    { id: "p2", name: "가르마 펌 (남성)", color: "dark", type: "male" },
    { id: "c1", name: "유니콘 컬러", color: "colorful", type: "fancy" },
];

export default function HairstylePage() {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [selectedHair, setSelectedHair] = useState<string | null>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [hairConfig, setHairConfig] = useState({
        x: 50,
        y: 30,
        scale: 1,
        rotate: 0,
    });

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 카메라 시작
    const startCamera = async () => {
        setIsCameraActive(true);
        setUserImage(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access error:", err);
            alert("카메라를 켤 수 없습니다. 권한을 확인해주세요.");
            setIsCameraActive(false);
        }
    };

    // 사진 촬영
    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const data = canvasRef.current.toDataURL("image/png");
                setUserImage(data);
                stopCamera();
            }
        }
    };

    // 카메라 중지
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
        }
        setIsCameraActive(false);
    };

    // 이미지 업로드
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUserImage(event.target?.result as string);
                stopCamera();
            };
            reader.readAsDataURL(file);
        }
    };

    // 베지어 곡선이나 복잡한 캔버스 대신 인터랙티브한 DIV overlay 사용
    const adjustHair = (type: string, delta: number) => {
        setHairConfig(prev => ({
            ...prev,
            [type]: type === 'scale' ? Math.max(0.5, prev.scale + delta) : prev[type as keyof typeof prev] + delta
        }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-yellow border-2 border-black font-black text-sm mb-4 shadow-brutal-sm">
                    <SparklesIcon className="w-5 h-5" />
                    <span>NEW FEATURE</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
                    헤어스타일 <span className="text-neon-pink">시뮬레이터</span>
                </h1>
                <p className="text-lg font-bold text-gray-700">
                    실패 없는 변신! 거울 보기 전 인생 치트키로 먼저 대보세요.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Preview Area (Left 7) */}
                <div className="lg:col-span-7">
                    <div className="relative bg-black border-8 border-black shadow-brutal aspect-[3/4] overflow-hidden flex items-center justify-center">
                        {!userImage && !isCameraActive ? (
                            <div className="text-center p-10">
                                <ScissorsIcon className="w-24 h-24 text-gray-700 mx-auto mb-6 opacity-20" />
                                <p className="text-white text-xl font-black mb-8">사진을 찍거나 업로드하여 시작하세요</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button onClick={startCamera} className="px-8 py-4 bg-neon-blue border-4 border-black font-black text-lg hover:-translate-y-1 transition-all flex items-center gap-2">
                                        <CameraIcon className="w-6 h-6" /> 카메라 켜기
                                    </button>
                                    <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 bg-neon-pink border-4 border-black font-black text-lg hover:-translate-y-1 transition-all flex items-center gap-2">
                                        <PhotoIcon className="w-6 h-6" /> 사진 업로드
                                    </button>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                                </div>
                            </div>
                        ) : null}

                        {isCameraActive && (
                            <div className="relative w-full h-full">
                                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6">
                                    <button onClick={takePhoto} className="w-20 h-20 bg-white border-8 border-black rounded-full shadow-brutal hover:scale-110 transition-all"></button>
                                    <button onClick={stopCamera} className="px-6 py-2 bg-red-500 text-white font-black border-4 border-black">취소</button>
                                </div>
                            </div>
                        )}

                        {userImage && (
                            <div className="relative w-full h-full" id="capture-area">
                                <img src={userImage} alt="User Face" className="w-full h-full object-contain" />

                                {selectedHair && (
                                    <div
                                        className="absolute pointer-events-none transition-transform duration-75"
                                        style={{
                                            left: `${hairConfig.x}%`,
                                            top: `${hairConfig.y}%`,
                                            transform: `translate(-50%, -50%) scale(${hairConfig.scale}) rotate(${hairConfig.rotate}deg)`,
                                            width: "80%", // 기본 가발 크기
                                        }}
                                    >
                                        {/* 이곳에 실제 가발 이미지를 넣습니다. 현재는 스타일별 박스로 대체 */}
                                        <div className="relative">
                                            <div className="w-full aspect-square bg-white/20 border-4 border-dashed border-neon-yellow flex items-center justify-center animate-pulse">
                                                <p className="text-neon-yellow font-black text-center text-sm md:text-xl transform outline-black">
                                                    {HAIRSTYLES.find(h => h.id === selectedHair)?.name}<br />(가상 가발 오버레이)
                                                </p>
                                            </div>
                                            {/* 실제 이미지 사용 시 아래와 같이: */}
                                            {/* <img src={`/assets/hair/${selectedHair}.png`} className="w-full h-auto" /> */}
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <button onClick={() => setUserImage(null)} className="p-3 bg-black/50 text-white border-2 border-white hover:bg-black transition-all">
                                        <ArrowPathIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        )}
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Controls Overlay */}
                    {userImage && selectedHair && (
                        <div className="mt-6 bg-gray-100 border-4 border-black p-4 flex flex-wrap gap-4 items-center justify-center shadow-brutal-sm">
                            <div className="flex gap-2">
                                <button onClick={() => adjustHair('scale', 0.1)} className="p-2 bg-white border-2 border-black hover:bg-neon-yellow transition-all"><MagnifyingGlassPlusIcon className="w-6 h-6" /></button>
                                <button onClick={() => adjustHair('scale', -0.1)} className="p-2 bg-white border-2 border-black hover:bg-neon-yellow transition-all"><MagnifyingGlassMinusIcon className="w-6 h-6" /></button>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setHairConfig(prev => ({ ...prev, y: prev.y - 2 }))} className="p-2 bg-white border-2 border-black hover:bg-neon-blue transition-all">↑</button>
                                <button onClick={() => setHairConfig(prev => ({ ...prev, y: prev.y + 2 }))} className="p-2 bg-white border-2 border-black hover:bg-neon-blue transition-all">↓</button>
                                <button onClick={() => setHairConfig(prev => ({ ...prev, x: prev.x - 2 }))} className="p-2 bg-white border-2 border-black hover:bg-neon-blue transition-all">←</button>
                                <button onClick={() => setHairConfig(prev => ({ ...prev, x: prev.x + 2 }))} className="p-2 bg-white border-2 border-black hover:bg-neon-blue transition-all">→</button>
                            </div>
                            <div className="flex gap-2 text-sm font-black items-center">
                                <button onClick={() => adjustHair('rotate', -5)} className="p-2 bg-white border-2 border-black">⟲</button>
                                <button onClick={() => adjustHair('rotate', 5)} className="p-2 bg-white border-2 border-black">⟳</button>
                            </div>
                            <button className="ml-auto px-6 py-3 bg-neon-pink text-white border-4 border-black font-black hover:scale-105 transition-all flex items-center gap-2">
                                <ArrowDownTrayIcon className="w-6 h-6" /> 결과 다운로드
                            </button>
                        </div>
                    )}
                </div>

                {/* Style Selection (Right 5) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bento-card bg-white h-full max-h-[700px] overflow-y-auto">
                        <h2 className="text-2xl font-black mb-6 border-b-4 border-black pb-2 flex items-center gap-2">
                            <SparklesIcon className="w-8 h-8 text-neon-yellow" />
                            스타일 선택
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            {HAIRSTYLES.map((hair) => (
                                <button
                                    key={hair.id}
                                    onClick={() => setSelectedHair(hair.id)}
                                    className={`p-4 border-4 transition-all duration-200 text-left relative overflow-hidden group ${selectedHair === hair.id
                                            ? 'bg-black text-white border-neon-yellow -translate-y-1 shadow-brutal-sm'
                                            : 'bg-white text-black border-black hover:-translate-y-1'
                                        }`}
                                >
                                    <div className="flex flex-col h-full justify-between relative z-10">
                                        <div>
                                            <p className="text-xs font-black uppercase mb-1 opacity-50">{hair.type}</p>
                                            <p className="font-black text-lg leading-tight">{hair.name}</p>
                                        </div>
                                        <p className={`text-sm font-bold mt-4 ${selectedHair === hair.id ? 'text-neon-yellow' : 'text-gray-500'}`}>
                                            {hair.color}
                                        </p>
                                    </div>
                                    {/* Background Pattern */}
                                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <ScissorsIcon className="w-20 h-20" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 bg-pastel-mint border-4 border-black p-6">
                            <h3 className="text-xl font-black mb-2">💡 스타일링 팁</h3>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                원하는 가발을 선택한 후 좌측 미리보기 박스를 통해 위치와 크기를 조절하세요.
                                미용실 가기 전 캡처해가는 게 가장 정확합니다!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Tools Section */}
            <div className="mt-20">
                <section className="bg-slate-900 rounded-2xl p-8 text-white border-4 border-black shadow-brutal">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-neon-yellow">
                        <span className="text-3xl">🔗</span>
                        <span>변신 후 함께하면 좋은 도구</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a
                            href="/test"
                            className="bg-white/10 hover:bg-white/20 p-5 border-2 border-white/20 rounded-xl transition-all group"
                        >
                            <p className="font-black text-xl mb-1 group-hover:text-neon-yellow text-white">감각 테스트 →</p>
                            <p className="text-slate-400 text-sm">새로운 헤어에 어울리는 색감 감각을 확인해보세요</p>
                        </a>
                        <a
                            href="/random"
                            className="bg-white/10 hover:bg-white/20 p-5 border-2 border-white/20 rounded-xl transition-all group"
                        >
                            <p className="font-black text-xl mb-1 group-hover:text-neon-yellow text-white">랜덤 데이트 코스 →</p>
                            <p className="text-slate-400 text-sm">멋진 머리하고 가기 좋은 장소를 추천해드려요</p>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
