import { memo } from 'react'
import { Button } from '@/components/ui/button'

interface StoreFormActionsProps {
    isEditing: boolean
    isPending: boolean
    formStatus: string
    onClose: () => void
}

function StoreFormActions({ isEditing, isPending, formStatus, onClose }: StoreFormActionsProps) {
    return (
        <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
                キャンセル
            </Button>
            <Button
                type="submit"
                disabled={isPending || formStatus === 'error'}
            >
                {isPending ? '送信中...' : (isEditing ? '更新する' : '登録する')}
            </Button>
        </div>
    )
}

export default memo(StoreFormActions)