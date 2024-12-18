'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Store } from '@/config/types/api/store'
import { useState } from 'react'
// import { deleteStore } from '@/lib/api/stores'
import { useToast } from '@/hooks/ui/use-toast'

interface StoreOperationsProps {
    store: Store
}

export function StoreOperations({ store }: StoreOperationsProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleEdit = () => {
        router.push(`/management/dashboard/stores/${store.id}/edit`)
    }

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            // await deleteStore(store.id)
            toast({
                title: "削除完了",
                description: "店舗を削除しました",
            })
            router.refresh()
        } catch (error) {
            console.error(error)
            toast({
                title: "エラー",
                description: "店舗の削除に失敗しました",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>操作</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleEdit} disabled={isLoading}>
                    <Pencil className="mr-2 h-4 w-4" />
                    編集
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    <Trash className="mr-2 h-4 w-4" />
                    削除
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}