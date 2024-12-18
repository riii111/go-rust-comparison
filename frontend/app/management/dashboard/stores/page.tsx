import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { getStores } from '@/lib/api/stores'
import { StoreHeader } from './StoreHeader'
import { StoreTable } from '@/components/feature/dashboard/stores/table/StoreTable'
import { TablePagination } from '@/components/common/molecules/TablePagination'
import { ITEMS_PER_PAGE } from '@/config/constants/store'
import { StoreTableSkeleton } from '@/components/feature/dashboard/stores/table/StoreTableSkeleton'
// 店舗テーブルのコンテンツ
async function StoreTableContent({
    page = 1,
    limit = ITEMS_PER_PAGE,
    search = '',
}: {
    page?: number
    limit?: number
    search?: string
}) {
    const { stores, total } = await getStores({
        page,
        limit,
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

export default async function StoresPage({
    searchParams,
}: {
    searchParams?: { page?: string; search?: string }
}) {
    const currentPage = Number(searchParams?.page) || 1
    const search = searchParams?.search || ''

    return (
        <div className="space-y-6 p-6">
            {/* ヘッダー部分（検索、新規作成ボタンなど） */}
            <StoreHeader />

            {/* 店舗一覧テーブル */}
            <Suspense fallback={<StoreTableSkeleton />}>
                <Card className="border-0 shadow-none">
                    <StoreTableContent
                        page={currentPage}
                        limit={ITEMS_PER_PAGE}
                        search={search}
                    />
                </Card>
            </Suspense>
        </div>
    )
}