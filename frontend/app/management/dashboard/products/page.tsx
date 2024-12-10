import { Suspense } from "react"
import { getProducts } from "@/lib/api/products"
import { ProductHeader } from "@/app/management/dashboard/products/ProductHeader"
import { Card } from "@/components/ui/card"
import { ProductTable } from "@/components/feature/dashboard/products/table/ProductTable"
import { ProductPagination } from "@/components/feature/dashboard/products/table/ProductPagenation"
import { ProductTableSkeleton } from "@/components/feature/dashboard/products/table/ProductTableSkeleton"

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="space-y-6 p-6">
            {/* ヘッダー部分（検索、新規作成ボタンなど） */}
            <ProductHeader />

            {/* 商品一覧テーブル */}
            <Suspense fallback={<ProductTableSkeleton />}>
                <Card className="border-0 shadow-none">
                    <ProductTable products={products} />
                    <ProductPagination />
                </Card>
            </Suspense>
        </div>
    )
}