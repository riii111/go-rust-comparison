import { getProductById } from '@/lib/api/products'
import { ProductDetail } from './ProductDetail'
import { NotFound } from '@/components/feature/dashboard/NotFound'
import { Suspense } from 'react'

type Props = {
    params: {
        id: string
    }
}

export default async function ProductDetailPage({ params }: Props) {
    try {
        const product = await getProductById(params.id)

        if (!product) {
            return <NotFound
                title="商品が見つかりません"
                description="お探しの商品は削除されたか、URLが間違っている可能性があります。"
            />
        }

        return (
            <Suspense fallback={<div className="p-6">Loading...</div>}>
                <ProductDetail product={product} />
            </Suspense>
        )
    } catch (error) {
        console.error('Failed to fetch product:', error)
        throw error // エラーをNext.jsのエラーバウンダリに委譲
    }
}