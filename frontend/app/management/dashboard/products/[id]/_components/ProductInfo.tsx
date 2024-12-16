import { ProductWithStock } from '@/config/types/api/product'
import { EssentialInfo } from '@/app/management/dashboard/products/[id]/_components/EssentialInfo'
import { DetailInfo } from '@/app/management/dashboard/products/[id]/_components/DetailInfo'

type ProductInformationProps = {
    product: ProductWithStock
}

export function ProductInfo({ product }: ProductInformationProps) {
    return (
        <div className="space-y-6">
            <EssentialInfo product={product} />

            <DetailInfo product={product} />
        </div>
    )
}

export const ProductInfoSkeleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
        </div>
    )
}