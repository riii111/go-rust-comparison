import { Card } from '@/components/ui/card'
import { getProductWithStockById } from '@/lib/api/products'
import { notFound } from 'next/navigation'

type DetailInfoProps = {
    id: string
}

export async function DetailInfo({ id }: DetailInfoProps) {
    const product = await getProductWithStockById(id)

    if (!product) {
        notFound()
    }

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
