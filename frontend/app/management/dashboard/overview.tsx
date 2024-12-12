'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// 売上推移のダミーデータ
const SALES_DATA = [
    {
        month: '9月',
        total: 528976,
        prev: 501641,
        deals: 72,
        leads: 118,
    },
    {
        month: '10月',
        total: 623450,
        prev: 589230,
        deals: 84,
        leads: 132,
    },
    {
        month: '11月',
        total: 589230,
        prev: 552340,
        deals: 78,
        leads: 125,
    },
]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm">
                <p className="mb-2 font-medium">{label}</p>
                <p className="text-sm text-chart-1">
                    売上: ¥{payload[0].value.toLocaleString()}
                </p>
                <p className="text-sm text-chart-3">
                    前年: ¥{payload[1].value.toLocaleString()}
                </p>
            </div>
        )
    }
    return null
}

export function Overview() {
    return (
        <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-bold">売上推移</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        月間の売上推移と前年比較
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                        <div className="mr-1 h-2 w-2 rounded-full bg-chart-1" />
                        今年
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <div className="mr-1 h-2 w-2 rounded-full bg-chart-3" />
                        前年
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={SALES_DATA}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <defs>
                                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="prevGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                                </linearGradient>
                                <pattern id="gridPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                                </pattern>

                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                fill="hsl(var(--dashboard-background-subtle))"
                            />
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="hsl(var(--gray-200))"
                            />
                            <XAxis
                                dataKey="month"
                                stroke="hsl(var(--gray-400))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="hsl(var(--gray-400))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{
                                    stroke: 'hsl(var(--gray-400))',
                                    strokeWidth: 1,
                                    strokeDasharray: '4 4'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="hsl(var(--chart-1))"
                                fill="url(#totalGradient)"
                                strokeWidth={2}
                                dot={{
                                    stroke: 'hsl(var(--chart-1))',
                                    fill: 'white',
                                    strokeWidth: 2,
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="prev"
                                stroke="hsl(var(--chart-3))"
                                fill="url(#prevGradient)"
                                strokeWidth={2}
                                dot={{
                                    stroke: 'hsl(var(--chart-3))',
                                    fill: 'white',
                                    strokeWidth: 2,
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}