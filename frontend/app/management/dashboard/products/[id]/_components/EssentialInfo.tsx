import { Badge } from '@/components/ui/badge'
import { stockStatusConfig } from '@/config/constants/stock'
import { CategoryBadge } from "@/components/feature/dashboard/products/badge/CategoryBadge"
import { getStockStatus } from '@/lib/stock'
import { getProductWithStockById } from '@/lib/api/products'
import { notFound } from 'next/navigation'

type EssentialInfoProps = {
    id: string
}

export async function EssentialInfo({ id }: EssentialInfoProps) {
    const product = await getProductWithStockById(id)

    if (!product) {
        notFound()
    }

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