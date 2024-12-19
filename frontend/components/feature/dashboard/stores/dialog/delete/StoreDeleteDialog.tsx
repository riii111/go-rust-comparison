'use client'

import { useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Store } from '@/config/types/api/store'

interface StoreDeleteDialogProps {
    isOpen: boolean
    onClose: () => void
    store: Store
}

export function StoreDeleteDialog({ isOpen, onClose, store }: StoreDeleteDialogProps) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                // TODO: APIが実装されるまでダミーデータで対応
                await new Promise(resolve => setTimeout(resolve, 1000))
                console.log('Delete store:', store.id)
                onClose()
            } catch (error) {
                console.error('Failed to delete store:', error)
            }
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>店舗を削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                        この操作は取り消せません。店舗「{store.name}」を削除してもよろしいですか？
                        <br />
                        ※在庫データが存在する場合は削除できません。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        キャンセル
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {isPending ? '削除中...' : '削除する'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}