'use client';

import dynamic from 'next/dynamic';

const ChartSection = dynamic(
    () => import('@/components/layout/auth/BrandingSection/contents/ChartSection'),
    {
        ssr: false,
        loading: () => <div className="h-16 animate-pulse rounded" />
    }
);

export default function RevenueCard() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">¥528,976</p>
                </div>
                <div className="text-primary text-sm font-medium px-2 py-1 bg-primary/10 rounded-full">
                    +7.2%
                </div>
            </div>
            <ChartSection />
        </div>
    );
}