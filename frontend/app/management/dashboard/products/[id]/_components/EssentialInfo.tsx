import { ProductWithStock } from '@/config/types/api/product'
import { Badge } from '@/components/ui/badge'
import { stockStatusConfig } from '@/config/constants/stock'
import { CategoryBadge } from "@/components/feature/dashboard/products/badge/CategoryBadge"
import { getStockStatus } from '@/lib/stock'

type EssentialInfoProps = {
    product: ProductWithStock
}

export function EssentialInfo({ product }: EssentialInfoProps) {
    const stockStatus = getStockStatus(product.stocks);

    const { label, variant } = stockStatusConfig[stockStatus];

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="text-lg font-semibold mt-2">¥{product.basePrice.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
                <CategoryBadge category={product.category} />
                <Badge variant={variant}>{label}</Badge>
            </div>
        </div>
    )
}