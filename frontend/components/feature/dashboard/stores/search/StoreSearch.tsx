'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useCallback, useState, useEffect, useTransition } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/ui/useDebounce'

export function StoreSearch() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [isPending, startTransition] = useTransition()

    // 初期値の設定
    useEffect(() => {
        setSearchQuery(searchParams.get('search') ?? '')
    }, [searchParams])

    const debouncedSearch = useDebounce((...args: unknown[]) => {
        const query = args[0] as string
        startTransition(() => {
            const params = new URLSearchParams(searchParams)
            if (query) {
                params.set('search', query)
            } else {
                params.delete('search')
            }
            params.delete('page')
            router.push(`${pathname}?${params.toString()}`)
        })
    }, 600) // デバウンス時間を600ms

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
        debouncedSearch(query)
    }, [debouncedSearch])

    return (
        <div className="relative w-96">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isPending ? 'animate-pulse' : ''}`} />
            <Input
                type="search"
                placeholder="店舗名、住所で検索..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}