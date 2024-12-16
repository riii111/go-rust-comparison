import { Badge } from "@/components/ui/badge"
import { ProductStock } from "@/config/types/api/product"
import { stockStatusConfig } from "@/config/constants/stock"
import { getStockStatus } from "@/lib/stock"

type StockStatusBadgeProps = {
    stocks: ProductStock[]
}

export function StockStatusBadge({ stocks }: StockStatusBadgeProps) {
    const stockStatus = getStockStatus(stocks)
    const { label, variant } = stockStatusConfig[stockStatus]

    return <Badge variant={variant}>{label}</Badge>
}