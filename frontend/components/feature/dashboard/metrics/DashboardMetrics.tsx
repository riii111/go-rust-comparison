'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { RevenueSection } from "./section/RevenueSection"
import { PlatformAnalysis } from "./section/PlatformSection"
import { SalesRankSection } from "./section/SalesRankSection"
import { StatsCard } from "./cards/StatsCard"
import { FilterTabs } from "@/components/common/molecules/FilterTabs"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/common/molecules/DateRangePicker"
import { DashboardData, PlatformData, PlatformSale, SalesRankData, RevenueStat } from "@/config/types/api/dashboard"

interface DashboardMetricsProps {
    metric: string;
    data: DashboardData;
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
        { id: "products", label: "商品数" },
        { id: "stocks", label: "在庫" },
    ]


    // フィルタリング用の関数
    const filterDataByDateRange = (data: DashboardMetricsProps['data'], dateRange: DateRange) => {
        if (!dateRange.from || !dateRange.to) return data;

        return {
            ...data,
            salesRank: data.salesRank.filter((item: SalesRankData) => {
                const purchaseDate = new Date(item.purchased_at);
                return dateRange.from && dateRange.to ?
                    purchaseDate >= dateRange.from && purchaseDate <= dateRange.to : true;
            }),
            revenue: {
                ...data.revenue,
                stats: data.revenue.stats.filter((item: RevenueStat) => {
                    const purchaseDate = new Date(item.purchased_at);
                    return dateRange.from && dateRange.to ?
                        purchaseDate >= dateRange.from && purchaseDate <= dateRange.to : true;
                })
            },
            platforms: (() => {
                // まず各プラットフォームの売上を計算
                const filteredPlatforms = data.platforms.map((platform: PlatformData) => {
                    const filteredSales = platform.sales?.filter((sale: PlatformSale) => {
                        const purchaseDate = new Date(sale.purchased_at);
                        return dateRange.from && dateRange.to ?
                            purchaseDate >= dateRange.from && purchaseDate <= dateRange.to : true;
                    }) || [];

                    const totalRevenue = filteredSales.reduce((sum: number, sale: PlatformSale) => sum + sale.amount, 0);

                    return {
                        ...platform,
                        revenue: totalRevenue,
                    };
                });

                // 全体の売上を計算
                const totalRevenue = filteredPlatforms.reduce((sum: number, platform: PlatformData) => sum + platform.revenue, 0);

                // パーセンテージを再計算
                return filteredPlatforms.map(platform => ({
                    ...platform,
                    percentage: totalRevenue > 0 ? Math.round((platform.revenue / totalRevenue) * 100) : 0
                }));
            })()
        };
    };

    // フィルタリングされたデータの状態管理
    const [filteredData, setFilteredData] = useState(data);

    const handleDateRangeChange = (range: DateRange | undefined) => {
        if (range) {
            setDateRange(range);
            setFilteredData(filterDataByDateRange(data, range));
        }
    };

    const renderMetricContent = () => {
        switch (activeMetric) {
            case "revenue":
                return (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <Card className="lg:col-span-8">
                                <CardContent className="p-6">
                                    <RevenueSection data={filteredData.revenue} />
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-4">
                                <CardContent className="p-6">
                                    <PlatformAnalysis data={filteredData.platforms} />
                                </CardContent>
                            </Card>
                        </div>
                        {/* 統計カード */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {Object.entries(filteredData.stats).map(([key, config]) => (
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
                                <SalesRankSection data={filteredData.salesRank} />
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
                        fromDate={fromDate}
                        toDate={toDate}
                        calendarClassName="bg-white"
                        buttonClassName="bg-white border shadow-sm hover:bg-gray-50"
                    />
                </div>
            </div>

            <div
                className="flex-1 overflow-y-auto custom-scrollbar pt-6 pr-6"
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