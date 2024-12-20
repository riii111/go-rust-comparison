import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { getStores } from '@/lib/api/stores'
import { StoreHeader } from './StoreHeader'
import { StoreTable } from '@/components/feature/dashboard/stores/table/StoreTable'
import { TablePagination } from '@/components/common/molecules/TablePagination'
import { ITEMS_PER_PAGE } from '@/config/constants/store'
import { StoreTableSkeleton } from '@/components/feature/dashboard/stores/table/StoreTableSkeleton'

interface StoresPageProps {
    searchParams: Promise<{
        page?: string
        search?: string
    }>
}

async function StoreTableContent({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string
        search?: string
    }>
}) {
    const resolvedParams = await searchParams
    const page = Number(resolvedParams.page) || 1
    const search = resolvedParams.search || ''

    const { stores, total } = await getStores({
        page,
        limit: ITEMS_PER_PAGE,
        search: search || undefined,
    })

    return (
        <>
            <StoreTable stores={stores} />
            <TablePagination
                totalItems={total}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={page}
            />
        </>
    )
}

// Next.js 15系では、クライアントサイドのナビゲーション関連は必ずSuspenseでラップする必要あり??
export default async function StoresPage({ searchParams }: StoresPageProps) {
    return (
        <div className="space-y-6 p-6">
            <Suspense>
                <StoreHeader />
            </Suspense>

            <Suspense fallback={<StoreTableSkeleton />}>
                <Card className="border-0 shadow-none">
                    <StoreTableContent searchParams={searchParams} />
                </Card>
            </Suspense>
        </div>
    )
}