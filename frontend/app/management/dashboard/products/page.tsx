import { Suspense } from "react"
import { getProducts } from "@/lib/api/products"
import { ProductHeader } from "@/app/management/dashboard/products/ProductHeader"
import { Card } from "@/components/ui/card"
import { ProductTable } from "@/components/feature/dashboard/products/table/ProductTable"
import { ProductPagination } from "@/components/feature/dashboard/products/table/ProductPagenation"
import { ProductTableSkeleton } from "@/components/feature/dashboard/products/table/ProductTableSkeleton"

// 商品テーブルのコンテンツ
async function ProductTableContent() {
    const products = await getProducts()
    return <ProductTable products={products} />
}

// 商品ページ
export default async function ProductsPage() {
    return (
        <div className="space-y-6 p-6">
            {/* ヘッダー部分（検索、新規作成ボタンなど） */}
            <ProductHeader />

            {/* 商品一覧テーブル */}
            <Suspense fallback={<ProductTableSkeleton />}>
                <Card className="border-0 shadow-none">
                    <ProductTableContent />
                    <ProductPagination />
                </Card>
            </Suspense>
        </div>
    )
}