'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PlatformAnalysisProps {
    data: any[]; // TODO: 型定義を追加
}

export function PlatformAnalysis({ data }: PlatformAnalysisProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Work with platforms</h3>
                <Badge variant="outline" className="text-xs">
                    Last 30 days
                </Badge>
            </div>

            <div className="space-y-4">
                {data.map((platform, index) => (
                    <motion.div
                        key={platform.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="text-gray-600">
                                    {platform.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">{platform.name}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {platform.percentage}%
                                        </span>
                                    </div>

                                    <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                                        <motion.div
                                            className={cn("h-full rounded-full", platform.color)}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${platform.percentage}%` }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        />
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-medium">
                                        ¥{platform.revenue.toLocaleString()}
                                    </div>
                                    <div className={cn(
                                        "text-sm",
                                        platform.growth > 0 ? "text-green-600" : "text-red-600"
                                    )}>
                                        {platform.growth > 0 ? "+" : ""}{platform.growth}%
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}