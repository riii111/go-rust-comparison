import { getProductWithStockById } from '@/lib/api/products'
import { ProductDetail } from './_components/ProductDetail'
import { NotFound } from '@/components/feature/dashboard/products/NotFound'

type Props = {
    params: {
        id: string
    }
}

export default async function ProductDetailPage({ params }: Props) {
    try {
        const product = await getProductWithStockById(params.id)

        if (!product) {
            return <NotFound
                title="商品が見つかりません"
                description="お探しの商品は削除されたか、URLが間違っている可能性があります。"
            />
        }

        return (
            <ProductDetail product={product} />
        )
    } catch (error) {
        console.error('Failed to fetch product:', error)
        throw error // エラーをNext.jsのエラーバウンダリに委譲
    }
}