import { ProductHeader } from "@/components/feature/dashboard/products/table/ProductHeader"
import { Suspense } from "react"
import { ProductList } from "@/components/feature/dashboard/products/table/ProductList"

export default function ProductsPage() {
    return (
        <div className="space-y-4">
            <ProductHeader />
            <Suspense fallback={<div />}>
                <ProductList />
            </Suspense>
        </div>
    )
}