'use client'

import { useState } from "react"
import { FilterTabs } from "@/components/common/molecules/FilterTabs"
import { DashboardMetricsClient } from "@/components/feature/dashboard/metrics-client"

interface DashboardMetricsProps {
    data: {
        stats: Record<string, any>;
        platforms: any[];
        salesRank: any[];
        revenue: {
            revenue: number;
            previousRevenue: number;
            increase: number;
            increaseAmount: number;
            stats: Array<{
                avatar: string;
                name: string;
                amount: number;
                percentage: number;
            }>;
        };
    };
}

export function DashboardMetrics({ data }: DashboardMetricsProps) {
    const [activeMetric, setActiveMetric] = useState("revenue")

    const METRIC_TABS = [
        { id: "revenue", label: "Revenue" },
        { id: "leads", label: "Leads" },
        { id: "w-l", label: "W/L" },
    ]

    return (
        <div className="space-y-4">
            <FilterTabs
                tabs={METRIC_TABS}
                activeTab={activeMetric}
                onChange={setActiveMetric}
            />
            <DashboardMetricsClient metric={activeMetric} data={data} />
        </div>
    )
}