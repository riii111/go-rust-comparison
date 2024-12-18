'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ITEMS_PER_PAGE } from '@/config/constants/product'

interface ProductPaginationProps {
    totalPages?: number
    currentPage?: number
    totalItems?: number
}

export function ProductPagination({
    totalPages = 20,  // 仮の値（API実装時に実際の値を使用）
    currentPage = 1,
    totalItems = 100,
}: ProductPaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`${pathname}?${params.toString()}`)
    }

    // ページ番号の配列を生成（1, 2, 3, ..., 20）
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    // 表示するページ番号を制限（現在のページの前後2ページまで）
    const visiblePages = pages.filter(page => {
        if (page === 1 || page === totalPages) return true
        return Math.abs(page - currentPage) <= 2
    })

    // ページ番号の間に「...」を追加
    const pagesWithEllipsis = visiblePages.reduce((acc: (number | string)[], page, i) => {
        if (i === 0) return [page]
        if (visiblePages[i - 1] !== page - 1) {
            acc.push('...')
        }
        acc.push(page)
        return acc
    }, [])

    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)

    return (
        <div className="flex items-center justify-between p-4">
            <div className="text-sm text-gray-500">
                全 {totalItems} 件中 {startItem}-{endItem} 件を表示
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-1">
                    {pagesWithEllipsis.map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2">...</span>
                        ) : (
                            <Button
                                key={page}
                                variant={currentPage === page ? "outline" : "ghost"}
                                size="sm"
                                className={`h-8 min-w-[2rem] ${currentPage === page ? 'bg-gray-50' : ''}`}
                                onClick={() => handlePageChange(page as number)}
                            >
                                {page}
                            </Button>
                        )
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}