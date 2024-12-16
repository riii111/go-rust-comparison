'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { ProductFormDialog } from '@/components/feature/dashboard/products/dialog/ProductFormDialog'

export function ProductCreateButton() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    return (
        <>
            <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 whitespace-nowrap"
            >
                <PlusCircle className="w-4 h-4" />
                新規商品登録
            </Button>

            <ProductFormDialog
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    )
}