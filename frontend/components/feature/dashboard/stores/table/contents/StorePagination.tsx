'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface StorePaginationProps {
    totalItems: number
    itemsPerPage: number
    currentPage: number
}

export function StorePagination({
    totalItems,
    itemsPerPage,
    currentPage,
}: StorePaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const createQueryString = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        return params.toString()
    }

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        router.push(`?${createQueryString(page)}`)
    }

    // 表示件数の計算
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className="flex items-center justify-between px-2 py-4">
            <p className="text-sm text-muted-foreground">
                全 {totalItems} 件中 {startItem} - {endItem} 件を表示
            </p>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            isActive={currentPage !== 1}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="px-4">{currentPage} / {totalPages}</span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            isActive={currentPage !== totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}