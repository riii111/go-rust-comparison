'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/ui/useDebounce'

export function ProductSearch() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '')

    const debouncedSearch = useDebounce((...args: unknown[]) => {
        const query = args[0] as string
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
    )
}