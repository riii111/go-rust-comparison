import { Badge } from "@/components/ui/badge"
import { stockStatusConfig } from "@/config/constants/stock"
import { getStockStatus } from "@/lib/stock"
import { Stock } from "@/config/types/api/stock"

type StockStatusBadgeProps = {
    stocks: Stock[]
}

export function StockStatusBadge({ stocks }: StockStatusBadgeProps) {
    const stockStatus = getStockStatus(stocks)
    const { label, variant } = stockStatusConfig[stockStatus]

    return <Badge variant={variant}>{label}</Badge>
}