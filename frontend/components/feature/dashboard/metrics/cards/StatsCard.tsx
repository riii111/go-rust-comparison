import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface StatsCardProps {
    title: string
    value: string
    subtitle?: string
    trend?: string
    dark?: boolean
    highlight?: boolean
    link?: boolean
}

export function StatsCard({
    title,
    value,
    subtitle,
    trend,
    dark,
    highlight,
    link
}: StatsCardProps) {
    const Content = (
        <div className="space-y-2">
            <div className={cn(
                "text-sm",
                dark ? "text-gray-400" : "text-muted-foreground"
            )}>
                {title}
            </div>
            <div className="text-2xl font-bold">
                {value}
            </div>
            {subtitle && (
                <div className={cn(
                    "text-sm",
                    dark ? "text-gray-400" : "text-muted-foreground"
                )}>
                    {subtitle}
                </div>
            )}
            {trend && (
                <div className={cn(
                    "text-sm",
                    trend.includes("↑") ? "text-green-500" : "text-red-500"
                )}>
                    {trend}
                </div>
            )}
        </div>
    )

    if (link) {
        return (
            <Link href="#" className="block">
                <Card className={cn(
                    "p-4",
                    dark && "bg-gray-900 text-white",
                    highlight && "border-primary"
                )}>
                    {Content}
                </Card>
            </Link>
        )
    }

    return (
        <Card className={cn(
            "p-4",
            dark && "bg-gray-900 text-white",
            highlight && "border-primary"
        )}>
            {Content}
        </Card>
    )
}