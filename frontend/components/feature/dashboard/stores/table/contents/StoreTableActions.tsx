'use client'

import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { StoreFormDialog } from '@/components/feature/dashboard/stores/dialog/create/StoreFormDialog'
import { Store } from '@/config/types/api/store'
import { StoreDeleteDialog } from '@/components/feature/dashboard/stores/dialog/delete/StoreDeleteDialog'

interface StoreTableActionsProps {
    store: Store
}

export function StoreTableActions({ store }: StoreTableActionsProps) {
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">アクションメニューを開く</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        編集
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        削除
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 編集ダイアログ */}
            <StoreFormDialog
                isOpen={showEditDialog}
                onClose={() => setShowEditDialog(false)}
                initialData={store}
            />

            {/* 削除確認ダイアログ */}
            <StoreDeleteDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                store={store}
            />
        </>
    )
}