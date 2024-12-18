'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface TablePaginationProps {
    totalItems: number
    itemsPerPage: number
    currentPage: number
}

export function TablePagination({
    totalItems,
    itemsPerPage,
    currentPage,
}: TablePaginationProps) {
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

    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className="flex flex-col items-center gap-4 px-2 py-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            isActive={currentPage !== 1}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="px-4 text-sm">
                            {currentPage} / {totalPages}
                        </span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            isActive={currentPage !== totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <p className="text-sm text-muted-foreground">
                全 {totalItems.toLocaleString()} 件中 {startItem.toLocaleString()} - {endItem.toLocaleString()} 件を表示
            </p>
        </div>
    )
}