'use client';

import { motion } from 'framer-motion';
import { CloudArrowUpIcon, PhotoIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';

interface FaceUploadZoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
}

export default function FaceUploadZone({ onFileSelect, selectedFile }: FaceUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* File input for gallery */}
            <input
                type="file"
                id="face-upload"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            {/* Camera input for mobile */}
            <input
                type="file"
                id="face-camera"
                accept="image/*"
                capture="user"
                onChange={handleFileInput}
                className="hidden"
            />

            <label
                htmlFor="face-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          block relative overflow-hidden
          border-4 border-dashed rounded-2xl
          cursor-pointer transition-all duration-300
          ${isDragging
                        ? 'border-amber-600 bg-amber-100/50 scale-[1.02]'
                        : 'border-amber-800/30 bg-amber-50/50 hover:border-red-700 hover:bg-red-50/30'
                    }
          backdrop-blur-sm
        `}
                style={{ minHeight: '320px', boxShadow: '0 4px 12px rgba(120, 53, 15, 0.1)' }}
            >
                {selectedFile ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-80 flex items-center justify-center p-6"
                    >
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="선택한 얼굴 사진"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                        />
                        <div
                            className="absolute top-4 right-4 bg-amber-600 text-amber-50 px-4 py-2 rounded-full text-sm font-bold"
                            style={{ boxShadow: '0 2px 6px rgba(120, 53, 15, 0.3)', fontFamily: "'Noto Serif KR', serif" }}
                        >
                            ✓ 업로드 완료
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-center h-80">
                        <motion.div
                            animate={{
                                y: isDragging ? -10 : [0, -8, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            {isDragging ? (
                                <CloudArrowUpIcon className="w-24 h-24 text-amber-600 mb-6" />
                            ) : (
                                <PhotoIcon className="w-24 h-24 text-amber-900/40 mb-6" />
                            )}
                        </motion.div>

                        <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            {isDragging ? '여기에 놓으시옵소서!' : '얼굴 사진을 올려주세요'}
                        </h3>
                        <p className="text-amber-800/70 text-base mb-2">
                            정면 얼굴이 잘 보이는 사진을 선택해주세요
                        </p>
                        <p className="text-sm text-amber-700/50">
                            JPG, PNG, WEBP 형식 지원
                        </p>
                    </div>
                )}

                {/* Animated border glow effect */}
                {isDragging && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-red-700/20 to-amber-600/20 rounded-2xl blur-xl" />
                    </motion.div>
                )}
            </label>

            {/* Mobile Camera Button */}
            {!selectedFile && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex justify-center md:hidden"
                >
                    <label
                        htmlFor="face-camera"
                        className="flex items-center gap-2 px-6 py-3 bg-amber-900 text-amber-50 rounded-full font-semibold cursor-pointer hover:scale-105 transition-all duration-200"
                        style={{ boxShadow: '0 3px 10px rgba(120, 53, 15, 0.3)', fontFamily: "'Noto Serif KR', serif" }}
                    >
                        <CameraIcon className="w-5 h-5" />
                        <span>카메라로 촬영하기</span>
                    </label>
                </motion.div>
            )}
        </motion.div>
    );
}
