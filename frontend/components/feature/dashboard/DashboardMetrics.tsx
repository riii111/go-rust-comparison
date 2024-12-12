'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { RevenueSection } from "./revenue-section"
import { PlatformAnalysis } from "./platform-analysis"
import { SalesRankSection } from "./sales-rank-section"
import { StatsCard } from "./stats-card"
import { FilterTabs } from "@/components/common/molecules/FilterTabs"

interface DashboardMetricsProps {
    metric: string;
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

export function DashboardMetrics({ metric: initialMetric, data }: DashboardMetricsProps) {
    const [activeMetric, setActiveMetric] = useState(initialMetric)

    const tabs = [
        { id: "revenue", label: "収益" },
        { id: "leads", label: "リード" },
        { id: "w-l", label: "Win/Loss" },
    ]

    const renderMetricContent = () => {
        switch (activeMetric) {
            case "revenue":
                return (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <Card className="lg:col-span-8">
                                <CardContent className="p-6">
                                    <RevenueSection data={{ revenue: data.revenue }} />
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-4">
                                <CardContent className="p-6">
                                    <PlatformAnalysis data={data.platforms} />
                                </CardContent>
                            </Card>
                        </div>
                        {/* 統計カード */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {Object.entries(data.stats).map(([key, config]) => (
                                <StatsCard
                                    key={key}
                                    title={key}
                                    {...config}
                                />
                            ))}
                        </div>
                        {/* 売上ランキング */}
                        <Card>
                            <CardContent className="p-6">
                                <SalesRankSection data={data.salesRank} />
                            </CardContent>
                        </Card>
                    </>
                )
            case "leads":
                return (
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center py-8 text-muted-foreground">
                                Leads metrics coming soon...
                            </div>
                        </CardContent>
                    </Card>
                )
            case "w-l":
                return (
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center py-8 text-muted-foreground">
                                Win/Loss metrics coming soon...
                            </div>
                        </CardContent>
                    </Card>
                )
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <FilterTabs
                tabs={tabs}
                activeTab={activeMetric}
                onChange={setActiveMetric}
                variant="primary"
            />

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={activeMetric}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-6"
                >
                    {renderMetricContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}