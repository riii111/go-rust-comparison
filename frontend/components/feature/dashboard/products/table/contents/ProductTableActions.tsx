'use client'

import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash } from 'lucide-react'
import { Product } from '@/config/types/api/product'
import { ProductDeleteDialog } from '@/components/feature/dashboard/products/dialog/ProductDeleteDialog'

type DialogType = 'edit' | 'delete' | null

interface ProductTableActionsProps {
    product: Product
}

export function ProductTableActions({ product }: ProductTableActionsProps) {
    const [activeDialog, setActiveDialog] = useState<DialogType>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleDialogOpen = (dialogType: DialogType) => {
        setIsDropdownOpen(false)
        setTimeout(() => {
            setActiveDialog(dialogType)
        }, 100)
    }

    const handleDialogClose = () => {
        setActiveDialog(null)
    }

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-9 w-9 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">アクションメニューを開く</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    {/* <DropdownMenuItem onClick={() => handleDialogOpen('edit')}>
                        <Pencil className="mr-2 h-4 w-4" />
                        編集
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => handleDialogOpen('delete')}>
                        <Trash className="mr-2 h-4 w-4" />
                        削除
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* ダイアログコンポーネント */}
            {/* {activeDialog === 'edit' && (
                <StoreFormDialog
                    isOpen={true}
                    onClose={handleDialogClose}
                    initialData={store}
                />
            )} */}

            {activeDialog === 'delete' && (
                <ProductDeleteDialog
                    isOpen={true}
                    onClose={handleDialogClose}
                    product={product}
                />
            )}
        </>
    )
}