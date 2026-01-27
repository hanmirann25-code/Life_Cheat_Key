import Link from 'next/link';
import { ReactNode } from 'react';

interface BentoCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
    color?: 'yellow' | 'purple' | 'pink' | 'green' | 'blue';
    size?: 'small' | 'medium' | 'large';
    children?: ReactNode;
}

const colorClasses = {
    yellow: 'bg-neon-yellow hover:bg-neon-yellow/80',
    purple: 'bg-neon-purple hover:bg-neon-purple/80 text-white',
    pink: 'bg-neon-pink hover:bg-neon-pink/80 text-white',
    green: 'bg-neon-green hover:bg-neon-green/80',
    blue: 'bg-neon-blue hover:bg-neon-blue/80 text-white',
};

const badgeColorClasses = {
    yellow: 'bg-black text-neon-yellow border-4 border-black',
    purple: 'bg-black text-neon-purple border-4 border-black',
    pink: 'bg-black text-neon-pink border-4 border-black',
    green: 'bg-black text-neon-green border-4 border-black',
    blue: 'bg-black text-neon-blue border-4 border-black',
};

const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 row-span-2',
};

export default function BentoCard({
    title,
    description,
    icon,
    href,
    color = 'yellow',
    size = 'small',
    children,
}: BentoCardProps) {
    return (
        <Link
            href={href}
            className={`
        ${sizeClasses[size]}
        group relative overflow-hidden
        bg-white border-4 border-black
        shadow-brutal hover:shadow-brutal-lg
        hover:-translate-y-2 hover:translate-x-1
        transition-all duration-300
        p-6 flex flex-col
      `}
        >
            {/* Icon Badge */}
            <div className={`
        inline-flex items-center justify-center
        w-16 h-16 mb-4
        ${badgeColorClasses[color]}
        transition-transform group-hover:rotate-12
      `}>
                <div className="w-8 h-8">
                    {icon}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-2xl font-black mb-2 text-black">
                    {title}
                </h3>
                <p className="text-gray-700 font-medium">
                    {description}
                </p>
            </div>

            {/* Custom Children Content */}
            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}

            {/* Arrow Icon */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </div>
        </Link>
    );
}
