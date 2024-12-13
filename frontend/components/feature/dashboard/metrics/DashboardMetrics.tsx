'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { RevenueSection } from "./section/RevenueSection"
import { PlatformAnalysis } from "./section/PlatformSection"
import { SalesRankSection } from "./section/SalesRankSection"
import { StatsCard } from "./cards/StatsCard"
import { FilterTabs } from "@/components/common/molecules/FilterTabs"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/common/molecules/DateRangePicker"

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
    const fromDate = new Date(2024, 10, 1)  // 11月1日
    const toDate = new Date()

    const [dateRange, setDateRange] = useState<DateRange>({
        from: fromDate,
        to: toDate
    })
    const tabs = [
        { id: "revenue", label: "収益" },
        { id: "leads", label: "リード" },
        { id: "w-l", label: "Win/Loss" },
    ]

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollPosition(e.currentTarget.scrollTop);
    };

    useEffect(() => {
        setScrollPosition(0);
    }, [activeMetric]);

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

    const handleDateRangeChange = (range: DateRange | undefined) => {
        if (range) {
            setDateRange(range)
            // 親コンポーネントにデータ更新を通知する？？
            // onDateRangeChange(range) など
        }
    }

    return (
        <div className="h-full pl-6 flex flex-col overflow-hidden">
            <div className="flex-none bg-white py-4 pr-6 border-b">
                <div className="flex items-center justify-between">
                    <FilterTabs
                        tabs={tabs}
                        activeTab={activeMetric}
                        onChange={setActiveMetric}
                        variant="primary"
                    />
                    <DateRangePicker
                        date={dateRange}
                        onSelect={handleDateRangeChange}
                        fromDate={new Date(2024, 11, 1)}
                        toDate={new Date()}
                        calendarClassName="bg-white"
                        buttonClassName="bg-white border shadow-sm hover:bg-gray-50"
                    />
                </div>
            </div>

            <div
                className="flex-1 overflow-y-auto custom-scrollbar pt-6 pr-6"
                onScroll={handleScroll}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeMetric}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6 pb-6"
                    >
                        {renderMetricContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}