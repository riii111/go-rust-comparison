import { Badge } from "@/components/ui/badge"
import { ProductIcon } from "@/components/common/atoms/ProductIcon"
import { motion } from "framer-motion"
import { RevenueData } from "@/config/types/api/dashboard"

interface RevenueSectionProps {
    data: RevenueData;
}
export function RevenueSection({ data }: RevenueSectionProps) {
    const { revenue, previousRevenue, increase, increaseAmount, stats } = data

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
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center gap-4">
                            <ProductIcon
                                src={stat.avatar}
                                alt={stat.name}
                                size="md"
                            />
                            <div className="flex-1">
                                <div className="h-2 w-full rounded-full bg-gray-100">
                                    <motion.div
                                        className="h-full rounded-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stat.percentage}%` }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    />
                                </div>
                            </div>
                            <div className="min-w-[100px] text-right">
                                <motion.div
                                    className="font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    ¥{stat.amount.toLocaleString()}
                                </motion.div>
                                <motion.div
                                    className="text-sm text-muted-foreground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {stat.percentage}%
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}