'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProductDeleteDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    productName: string
}

export function ProductDeleteDialog({
    isOpen,
    onClose,
    onConfirm,
    productName,
}: ProductDeleteDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>商品を削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                        <p>以下の商品を削除しようとしています：</p>
                        <p className="font-medium text-gray-900">{productName}</p>
                        <p className="text-sm text-red-600">
                            ※この操作は取り消せません。削除すると、この商品に関連するすべてのデータが完全に削除されます。
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        削除する
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}