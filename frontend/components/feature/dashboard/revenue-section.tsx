import { Badge } from "@/components/ui/badge"
import { ProductIcon } from "@/components/common/atoms/ProductIcon"

interface RevenueSectionProps {
    data: {
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

export function RevenueSection({ data }: RevenueSectionProps) {
    const { revenue, previousRevenue, increase, increaseAmount, stats } = data.revenue

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Revenue</h2>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">¥{revenue.toLocaleString()}</span>
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
                {stats.map((stat, index) => (
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