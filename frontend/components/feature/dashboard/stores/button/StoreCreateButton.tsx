'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { StoreFormDialog } from '@/components/feature/dashboard/stores/dialog/StoreFormDialog'

export function StoreCreateButton() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    return (
        <>
            <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 whitespace-nowrap"
            >
                <PlusCircle className="w-4 h-4" />
                新規店舗登録
            </Button>

            <StoreFormDialog
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    )
}