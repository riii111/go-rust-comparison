'use client'

import { CustomAvatar } from "@/components/common/atoms/CustomAvatar"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

interface SalesRankData {
    name: string
    avatar: string
    revenue: number
    sales: number
    leads: number
    kpi: number
    winRate: {
        wins: number
        total: number
    }
}

const SALES_RANK_DATA: SalesRankData[] = [
    {
        name: "Armin A.",
        avatar: "https://github.com/shadcn.png",
        revenue: 209633,
        sales: 41,
        leads: 118,
        kpi: 0.84,
        winRate: { wins: 31, total: 12 }
    },
    {
        name: "Mikasa A.",
        avatar: "https://github.com/shadcn.png",
        revenue: 156841,
        sales: 54,
        leads: 103,
        kpi: 0.89,
        winRate: { wins: 39, total: 21 }
    },
    {
        name: "Eren Y.",
        avatar: "https://github.com/shadcn.png",
        revenue: 117115,
        sales: 22,
        leads: 84,
        kpi: 0.79,
        winRate: { wins: 32, total: 7 }
    }
]

// プラットフォーム別売上データ
const PLATFORM_DATA = [
    { name: "Dribbble", revenue: 227459, percentage: 43 },
    { name: "Instagram", revenue: 142823, percentage: 27 },
    { name: "Behance", revenue: 89935, percentage: 11 },
    { name: "Google", revenue: 37028, percentage: 7 }
]

export function SalesRankSection() {
    return (
        <div className="space-y-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Leads</TableHead>
                        <TableHead>KPI</TableHead>
                        <TableHead>W/L</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {SALES_RANK_DATA.map((data) => (
                        <TableRow key={data.name}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <CustomAvatar
                                        src={data.avatar}
                                        alt={data.name}
                                        size="sm"
                                    />
                                    <div>
                                        <div className="font-medium">{data.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            ¥{data.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="bg-gray-100">
                                    {data.sales}
                                </Badge>
                            </TableCell>
                            <TableCell>{data.leads}</TableCell>
                            <TableCell>{data.kpi}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Badge variant="secondary" className="bg-gray-900 text-white">
                                        {data.winRate.wins}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        {data.winRate.total}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">Work with platforms</h3>
                <div className="space-y-4">
                    {PLATFORM_DATA.map((platform) => (
                        <div key={platform.name} className="flex items-center gap-4">
                            <div className="w-24 text-sm">{platform.name}</div>
                            <div className="flex-1">
                                <div className="h-2 w-full rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${platform.percentage}%` }}
                                    />
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">¥{platform.revenue.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">{platform.percentage}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}