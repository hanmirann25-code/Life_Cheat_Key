'use client';

import { motion } from 'framer-motion';
import { CloudArrowUpIcon, PhotoIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';

interface UploadZoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
}

export default function UploadZone({ onFileSelect, selectedFile }: UploadZoneProps) {
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
                id="outfit-upload"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            {/* Camera input for mobile */}
            <input
                type="file"
                id="outfit-camera"
                accept="image/*"
                capture="environment"
                onChange={handleFileInput}
                className="hidden"
            />

            <label
                htmlFor="outfit-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          block relative overflow-hidden
          border-4 border-dashed rounded-3xl
          cursor-pointer transition-all duration-300
          ${isDragging
                        ? 'border-luxury-gold bg-luxury-gold/10 scale-[1.02]'
                        : 'border-luxury-navy/30 bg-luxury-cream/50 hover:border-luxury-rose hover:bg-luxury-rose/5'
                    }
          backdrop-blur-sm
        `}
                style={{ minHeight: '320px' }}
            >
                {selectedFile ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-80 flex items-center justify-center p-6"
                    >
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected outfit"
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-lg"
                        />
                        <div className="absolute top-4 right-4 bg-luxury-gold text-luxury-navy px-4 py-2 rounded-full text-sm font-semibold" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' }}>
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
                                <CloudArrowUpIcon className="w-24 h-24 text-luxury-gold mb-6" />
                            ) : (
                                <PhotoIcon className="w-24 h-24 text-luxury-navy/40 mb-6" />
                            )}
                        </motion.div>

                        <h3 className="text-2xl font-bold text-luxury-navy mb-3">
                            {isDragging ? '여기에 놓아주세요!' : 'OOTD 사진 업로드'}
                        </h3>
                        <p className="text-luxury-navy/60 text-base mb-2">
                            드래그 & 드롭 또는 클릭하여 사진 선택
                        </p>
                        <p className="text-sm text-luxury-navy/40">
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
                        <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/20 via-luxury-rose/20 to-luxury-gold/20 rounded-3xl blur-xl" />
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
                        htmlFor="outfit-camera"
                        className="flex items-center gap-2 px-6 py-3 bg-luxury-navy text-white rounded-full font-semibold cursor-pointer hover:scale-105 transition-all duration-200"
                        style={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}
                    >
                        <CameraIcon className="w-5 h-5" />
                        <span>카메라로 촬영하기</span>
                    </label>
                </motion.div>
            )}
        </motion.div>
    );
}
