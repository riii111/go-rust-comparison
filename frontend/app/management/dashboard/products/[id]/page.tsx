import { getProductWithStockById } from '@/lib/api/products'
import { Card } from '@/components/ui/card'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Header } from './_components/Header'
import { ImageSection, ImageSkeleton } from './_components/ImageSection'
import { EssentialInfo } from './_components/EssentialInfo'
import { DetailInfo } from './_components/DetailInfo'
import { Skeleton } from "@/components/ui/skeleton"

type PageProps = {
    params: Promise<{ id: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function ProductInfoWrapper({ id }: { id: string }) {
    return (
        <div className="space-y-6">
            <EssentialInfo id={id} />
            <DetailInfo id={id} />
        </div>
    )
}

const ProductInfoSkeleton = () => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    )
}

async function ImageSectionWrapper({ id }: { id: string }) {
    const product = await getProductWithStockById(id)
    if (!product) {
        notFound()
    }
    return <ImageSection product={product} />
}

export default async function ProductDetailPage({ params }: PageProps) {
    const resolvedParams = await params
    return (
        <div className="p-6 space-y-6">
            <Header />
            <Card className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Suspense fallback={<ProductInfoSkeleton />}>
                        <ProductInfoWrapper id={resolvedParams.id} />
                    </Suspense>
                    <Suspense fallback={<ImageSkeleton />}>
                        <ImageSectionWrapper id={resolvedParams.id} />
                    </Suspense>
                </div>
            </Card>
        </div>
    )
}
