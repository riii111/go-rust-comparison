'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Search } from 'lucide-react'
import { useCallback, useState } from 'react'

export function ProductHeader() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
        // TODO: Implement search functionality
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">商品管理</h1>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2"
                >
                    <PlusCircle className="w-4 h-4" />
                    新規商品登録
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="商品名、説明文で検索..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                {/* TODO: Add additional filters here */}
            </div>
        </div>
    )
}