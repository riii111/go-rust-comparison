import { ProductHeader } from "@/components/feature/dashboard/products/table/ProductHeader"
import { ProductList } from "@/components/feature/dashboard/products/table/ProductList"
import { getProducts } from "@/lib/api/products"
import { Suspense } from "react"

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="space-y-4">
            <ProductHeader />
            <Suspense fallback={<div>Loading...</div>}>
                <ProductList initialProducts={products} />
            </Suspense>
        </div>
    )
}