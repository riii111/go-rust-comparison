'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { RevenueSection } from "./revenue-section"
import { PlatformAnalysis } from "./platform-analysis"
import { SalesRankSection } from "./sales-rank-section"
import { StatsCard } from "./stats-card"

interface DashboardMetricsClientProps {
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

export function DashboardMetricsClient({ metric, data }: DashboardMetricsClientProps) {
    const renderMetricContent = () => {
        switch (metric) {
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
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={metric}
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