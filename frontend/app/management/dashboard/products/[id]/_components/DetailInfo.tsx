'use client'

import { Product } from '@/config/types/api/product'
import { Card } from '@/components/ui/card'

type DetailInfoProps = {
    product: Product
}

export function DetailInfo({ product }: DetailInfoProps) {
    return (
        <div className="space-y-6">
            <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">商品説明</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
            </Card>

            <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">素材・製造情報</h3>
                <p className="text-sm text-gray-600">{product.materialInfo}</p>
            </Card>
        </div>
    )
}