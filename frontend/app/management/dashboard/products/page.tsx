import { Suspense } from "react"
import { getProducts } from "@/lib/api/products"
import { ProductHeader } from "@/app/management/dashboard/products/ProductHeader"
import { Card } from "@/components/ui/card"
import { ProductTable } from "@/components/feature/dashboard/products/table/ProductTable"
import { TablePagination } from '@/components/common/molecules/TablePagination'
import { ITEMS_PER_PAGE } from "@/config/constants/product"
import { ProductTableSkeleton } from "@/components/feature/dashboard/products/table/ProductTableSkeleton"

interface ProductsPageProps {
    searchParams: {
        search?: string
        page?: string
    }
}

async function ProductTableContent({ searchParams }: { searchParams: ProductsPageProps['searchParams'] }) {
    const currentPage = Number(searchParams.page) || 1;

    // 検索パラメータを正しく渡す
    const response = await getProducts({
        search: searchParams.search,
        page: currentPage,
        limit: ITEMS_PER_PAGE
    });

    return (
        <>
            <ProductTable products={response.products} />
            <TablePagination
                totalItems={response.total}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
            />
        </>
    );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    return (
        <div className="space-y-6 p-6">
            <ProductHeader />
            <Suspense fallback={<ProductTableSkeleton />}>
                <Card className="border-0 shadow-none">
                    <ProductTableContent searchParams={searchParams} />
                </Card>
            </Suspense>
        </div>
    )
}