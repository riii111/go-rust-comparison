import { Suspense } from "react"
import { MetricsSkeleton } from "@/components/feature/dashboard/metrics/MetricsSkeleton"
import { DashboardMetrics } from "@/components/feature/dashboard/metrics/DashboardMetrics"
import { STATS_CONFIG, PLATFORM_DATA, SALES_RANK_DATA, REVENUE_DATA } from "@/__mocks__/dashboard/dummy_data"
import { DashboardData } from "@/config/types/api/dashboard"

// ダミー用のデータフェッチ
async function fetchDashboardData(): Promise<DashboardData> {
    // TODO: 実際のAPIが実装されるまではダミーデータを返す
    await new Promise(resolve => setTimeout(resolve, 600))  // ローディング確認用

    return {
        stats: STATS_CONFIG,
        platforms: PLATFORM_DATA,
        salesRank: SALES_RANK_DATA,
        revenue: REVENUE_DATA
    }
}

// メタデータの追加
export const metadata = {
    title: 'Dashboard | Store Analytics',
    description: 'Store analytics dashboard showing revenue, leads, and performance metrics'
}

// ダッシュボードのコンテンツ
// もう少し細分化したサーバーコンポーネントにしてもいいかも（ローディングも細かくできる）
async function DashboardContent() {
    const data = await fetchDashboardData()
    return <DashboardMetrics metric="revenue" data={data} />
}

// ダッシュボードページ
export default function DashboardPage() {
    return (
        <div className="h-full">
            <Suspense fallback={<MetricsSkeleton />}>
                <DashboardContent />
            </Suspense>
        </div>
    )
}
