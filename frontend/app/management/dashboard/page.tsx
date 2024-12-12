import { Suspense } from "react"
import { DashboardSkeleton } from "@/components/feature/dashboard/skeleton"
import { DashboardMetrics } from "@/components/feature/dashboard/DashboardMetrics"
import { STATS_CONFIG, PLATFORM_DATA, SALES_RANK_DATA, REVENUE_DATA } from "@/components/feature/dashboard/dummy_data"
import { DashboardData } from "@/config/types/api/dashboard"

// ダミー用のデータフェッチ
async function fetchDashboardData(): Promise<DashboardData> {
    // TODO: 実際のAPIが実装されたら、ここでServer Side Fetchingを行う
    await new Promise(resolve => setTimeout(resolve, 800))  // ローディング確認用

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

async function DashboardContent() {
    const data = await fetchDashboardData()
    return <DashboardMetrics metric="revenue" data={data} />
}

export default function DashboardPage() {
    return (
        <div className="h-full">
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent />
            </Suspense>
        </div>
    )
}
