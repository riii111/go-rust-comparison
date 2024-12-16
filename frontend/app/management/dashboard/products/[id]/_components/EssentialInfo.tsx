'use client'

import { ProductStock, ProductWithStock } from '@/config/types/api/product'
import { Badge } from '@/components/ui/badge'
import { stockStatusConfig, LOW_STOCK_THRESHOLD } from '@/config/constants/stock'
// 在庫状態の型定義
type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'unavailable';


// 在庫状態の判定ロジック
const getStockStatus = (stocks: ProductStock[]): StockStatus => {
    if (!stocks || stocks.length === 0) return 'unavailable';

    const totalQuantity = stocks.reduce((sum, stock) =>
        stock.isAvailable ? sum + stock.quantity : sum, 0);

    if (totalQuantity === 0) return 'out_of_stock';
    if (totalQuantity < LOW_STOCK_THRESHOLD) return 'low_stock';
    return 'in_stock';
};

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
                <Badge>{product.category}</Badge>
                <Badge variant={variant}>{label}</Badge>
            </div>
        </div>
    )
}