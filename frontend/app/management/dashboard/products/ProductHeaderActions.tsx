'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Search } from 'lucide-react'
import { useCallback, useState } from 'react'
import { ProductFormDialog } from '@/components/feature/dashboard/products/dialog/ProductFormDialog'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/ui/useDebounce'

export function ProductHeaderActions() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '')

    const debouncedSearch = useDebounce((query: string) => {
        const params = new URLSearchParams(searchParams)
        if (query) {
            params.set('q', query)
        } else {
            params.delete('q')
        }
        router.replace(`${pathname}?${params.toString()}`)
    }, 500)

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
        debouncedSearch(query)
    }, [debouncedSearch])

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full gap-4">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        type="search"
                        placeholder="商品名、説明文で検索..."
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 whitespace-nowrap"
                >
                    <PlusCircle className="w-4 h-4" />
                    新規商品登録
                </Button>
            </div>

            <ProductFormDialog
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    )
}