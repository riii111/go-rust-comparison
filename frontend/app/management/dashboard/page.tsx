import { Suspense } from "react"
import { DashboardHeader } from "@/components/feature/dashboard/header"
import { DashboardSkeleton } from "@/components/feature/dashboard/skeleton"
import { DashboardMetrics } from "./metrics"
import { STATS_CONFIG, PLATFORM_DATA, SALES_RANK_DATA, REVENUE_DATA } from "@/components/feature/dashboard/dummy_data"

// ダミー用のデータフェッチ
async function fetchDashboardData() {
    // 実際のAPIが実装されたら、ここでServer Side Fetchingを行う
    await new Promise(resolve => setTimeout(resolve, 800)) // ローディング確認用
    return {
        stats: STATS_CONFIG,
        platforms: PLATFORM_DATA,
        salesRank: SALES_RANK_DATA,
        revenue: REVENUE_DATA
    }
}

export default async function DashboardPage() {
    const data = await fetchDashboardData()

    return (
        <div className="space-y-6 p-6">
            <DashboardHeader />

            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardMetrics data={data} />
            </Suspense>
        </div>
    )
}
