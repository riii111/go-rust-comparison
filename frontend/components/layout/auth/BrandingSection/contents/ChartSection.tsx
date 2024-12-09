'use client';

import dynamic from 'next/dynamic';

// Hydrationエラー対策のためにdynamicインポート
const LineChartComponent = dynamic(
    () => import('@/components/layout/auth/BrandingSection/contents/LineChart'),
    {
        ssr: false,
        loading: () => <div className="h-16 animate-pulse rounded" />   // 色は背景に合わせる
    }
);


export default function ChartSection() {
    return <LineChartComponent />;
}