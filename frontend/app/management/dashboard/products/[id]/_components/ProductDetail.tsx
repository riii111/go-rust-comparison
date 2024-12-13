import { Card } from '@/components/ui/card'
import { ProductWithStock } from '@/config/types/api/product'
import { Suspense } from 'react'
import { Header } from './Header'
import { ProductInfo, ProductInfoSkeleton } from './ProductInfo'
import { ImageSection, ImageSkeleton } from './ImageSection'

type ProductDetailProps = {
    product: ProductWithStock
}

export function ProductDetail({ product }: ProductDetailProps) {
    return (
        <div className="p-6 space-y-6">
            <Header />

            <Card className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 商品情報を先に表示 */}
                    <Suspense fallback={<ProductInfoSkeleton />}>
                        <ProductInfo product={product} />
                    </Suspense>

                    {/* 画像セクションは後から読み込み */}
                    <Suspense fallback={<ImageSkeleton />}>
                        <ImageSection product={product} />
                    </Suspense>
                </div>
            </Card>
        </div>
    )
}