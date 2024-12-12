'use client'

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Card, CardContent } from "@/components/ui/card"
import { DateRangePicker } from "@/components/feature/dashboard/date-range-picker"
import { FilterTabs } from "@/components/common/molecules/FilterTabs"
import { RevenueSection } from "@/components/feature/dashboard/revenue-section"
import { SalesRankSection } from "@/components/feature/dashboard/sales-rank-section"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// 統計情報のダミーデータ
const STATS = {
    "Top sales": {
        value: "72",
        icon: "Mikasa",
        link: true
    },
    "Best deal": {
        value: "¥42,300",
        subtitle: "Rolf Inc.",
        dark: true
    },
    "Deals": {
        value: "256",
        badge: "5"
    },
    "Value": {
        value: "528k",
        trend: "+7.9%",
        highlight: true
    },
    "Win rate": {
        value: "44%",
        trend: "+1.2%"
    }
}

const METRIC_TABS = [
    { id: "revenue", label: "Revenue" },
    { id: "leads", label: "Leads" },
    { id: "w-l", label: "W/L" },
]

export default function DashboardPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 31)
    })
    const [activeMetric, setActiveMetric] = useState("revenue")

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-gray-800">New report</h1>
                <div className="flex items-center gap-4">
                    <FilterTabs
                        tabs={METRIC_TABS}
                        activeTab={activeMetric}
                        onChange={setActiveMetric}
                    />
                    <DateRangePicker date={date} onSelect={setDate} />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeMetric}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-12 gap-6"
                >
                    {/* 売上推移グラフ */}
                    <div className="col-span-12 lg:col-span-8">
                        <Card>
                            <CardContent className="p-6">
                                <RevenueSection />
                            </CardContent>
                        </Card>
                    </div>

                    {/* 統計カード */}
                    <div className="col-span-12 lg:col-span-4">
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(STATS).map(([key, stat]) => (
                                <Card key={key} className={cn(
                                    "p-4",
                                    stat.dark && "bg-gray-900 text-white",
                                    stat.highlight && "border-primary"
                                )}>
                                    <div className="space-y-2">
                                        <div className="text-sm text-muted-foreground">{key}</div>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        {stat.trend && (
                                            <div className="text-sm text-muted-foreground">{stat.trend}</div>
                                        )}
                                        {stat.subtitle && (
                                            <div className="text-sm">{stat.subtitle}</div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 売上ランキング */}
                    <div className="col-span-12">
                        <Card>
                            <CardContent className="p-6">
                                <SalesRankSection />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
