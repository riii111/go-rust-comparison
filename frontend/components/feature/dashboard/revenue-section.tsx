'use client'

import { Badge } from "@/components/ui/badge"
import { ProductIcon } from "@/components/common/atoms/ProductIcon"

interface RevenueStat {
    name: string
    amount: number
    percentage: number
    avatar: string
}

// 売上のダミーデータ
const REVENUE_STATS: RevenueStat[] = [
    {
        name: "T-shirt",
        amount: 209633,
        percentage: 39.63,
        avatar: "/images/products/t-shirt-1.avif"
    },
    {
        name: "Mug",
        amount: 156841,
        percentage: 29.65,
        avatar: "/images/products/mug-1.avif"
    },
    {
        name: "Baby cap",
        amount: 117115,
        percentage: 22.14,
        avatar: "/images/products/baby-cap-black.avif"
    },
    {
        name: "Sticker",
        amount: 45386,
        percentage: 8.58,
        avatar: "/images/products/sticker.avif"
    }
]

export function RevenueSection() {
    const totalRevenue = 528976.82
    const previousRevenue = 501641.73
    const increase = 7.9
    const increaseAmount = 27335.09

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Revenue</h2>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">¥{totalRevenue.toLocaleString()}</span>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                            +{increase}%
                        </Badge>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                            ¥{increaseAmount.toLocaleString()}
                        </Badge>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">
                    vs prev. ¥{previousRevenue.toLocaleString()}
                </p>
            </div>

            <div className="space-y-2">
                {REVENUE_STATS.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <ProductIcon
                            src={stat.avatar}
                            alt={stat.name}
                            size="sm"
                        />
                        <div className="flex-1">
                            <div className="h-2 w-full rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{ width: `${stat.percentage}%` }}
                                />
                            </div>
                        </div>
                        <div className="min-w-[100px] text-right">
                            <div className="font-medium">¥{stat.amount.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{stat.percentage}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}