import { getProductWithStockById } from '@/lib/api/products'
import { Card } from '@/components/ui/card'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Header } from './_components/Header'
import { ProductInfo, ProductInfoSkeleton } from './_components/ProductInfo'
import { ImageSection, ImageSkeleton } from './_components/ImageSection'

type Props = {
    params: {
        id: string
    }
}

async function ProductInfoWrapper({ id }: { id: string }) {
    const product = await getProductWithStockById(id)

    if (!product) {
        notFound()
    }

    return <ProductInfo product={product} />
}

async function ImageSectionWrapper({ id }: { id: string }) {
    const product = await getProductWithStockById(id)

    if (!product) {
        notFound()
    }
    return <ImageSection product={product} />
}

export default async function ProductDetailPage({ params }: Props) {
    return (
        <div className="p-6 space-y-6">
            <Header />

            <Card className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Suspense fallback={<ProductInfoSkeleton />}>
                        <ProductInfoWrapper id={params.id} />
                    </Suspense>

                    <Suspense fallback={<ImageSkeleton />}>
                        <ImageSectionWrapper id={params.id} />
                    </Suspense>
                </div>
            </Card>
        </div>
    )
}