'use client';

import dynamic from 'next/dynamic';

// Hydrationエラー対策のためにdynamicインポート（サーバー・クライアントそれぞれで生成するHTMLが異なるためエラー）
const LineChartComponent = dynamic(
    () => import('@/components/layout/auth/BrandingSection/contents/LineChart'),
    {
        ssr: false,
        loading: () => <div className="h-16 bg-gray-50 animate-pulse rounded" />
    }
);


export default function ChartSection() {
    return <LineChartComponent />;
}