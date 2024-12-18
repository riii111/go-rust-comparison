'use client'

import { useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from "@conform-to/react"
import { parseWithZod } from '@conform-to/zod'
import { storeSchema, MESSAGES } from '@/components/feature/dashboard/stores/validation'
import FormField from '@/components/common/molecules/FormField'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useCallback } from 'react'

interface StoreFormDialogProps {
    isOpen: boolean
    onClose: () => void
    initialData?: {
        id?: string
        name: string
        address: string
        phoneNumber: string
        businessHours: string
        zipCode: string
        description?: string
        isActive: boolean
    }
}

export function StoreFormDialog({ isOpen, onClose, initialData }: StoreFormDialogProps) {
    const [isPending, startTransition] = useTransition()
    const isEditing = !!initialData?.id

    const handleClose = useCallback(() => {
        if (!isPending) {
            onClose()
        }
    }, [isPending, onClose])

    const [form, fields] = useForm({
        id: "store-form",
        defaultValue: {
            name: initialData?.name ?? "",
            address: initialData?.address ?? "",
            phoneNumber: initialData?.phoneNumber ?? "",
            businessHours: initialData?.businessHours ?? "",
            zipCode: initialData?.zipCode ?? "",
            description: initialData?.description ?? "",
            isActive: initialData?.isActive ?? true,
        },
        onValidate: ({ formData }) => {
            return parseWithZod(formData, {
                schema: storeSchema
            })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.currentTarget)
            const submission = parseWithZod(formData, {
                schema: storeSchema
            })

            if (submission.status !== "success") {
                return submission.reply()
            }

            startTransition(() => {
                void (async () => {
                    try {
                        // TODO: APIが実装されるまでダミーデータで対応
                        console.log('Form submitted:', submission.value)
                        // ダミーの成功レスポンス
                        setTimeout(() => {
                            onClose()
                        }, 1000)
                    } catch (error) {
                        console.error(error)
                        return submission.reply({
                            formErrors: [isEditing ? MESSAGES.store.updateFailed : MESSAGES.store.createFailed]
                        })
                    }
                })()
            })
        }
    })

    // フォームの現在値を安全に取得
    const formValue = form.value ?? {
        name: "",
        address: "",
        phoneNumber: "",
        businessHours: "",
        zipCode: "",
        description: "",
        isActive: true,
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{isEditing ? '店舗を編集' : '新規店舗登録'}</DialogTitle>
                </DialogHeader>
                <form id={form.id} onSubmit={form.onSubmit} className="space-y-6" noValidate>
                    <FormField
                        id={fields.name.id}
                        name={fields.name.name}
                        type="text"
                        label="店舗名"
                        placeholder="店舗名を入力してください"
                        required
                        error={fields.name.errors?.[0]}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            id={fields.zipCode.id}
                            name={fields.zipCode.name}
                            type="text"
                            label="郵便番号"
                            placeholder="例: 123-4567"
                            required
                            error={fields.zipCode.errors?.[0]}
                        />

                        <FormField
                            id={fields.phoneNumber.id}
                            name={fields.phoneNumber.name}
                            type="tel"
                            label="電話番号"
                            placeholder="例: 03-1234-5678"
                            required
                            error={fields.phoneNumber.errors?.[0]}
                        />
                    </div>

                    <FormField
                        id={fields.address.id}
                        name={fields.address.name}
                        type="text"
                        label="住所"
                        placeholder="住所を入力してください"
                        required
                        error={fields.address.errors?.[0]}
                    />

                    <FormField
                        id={fields.businessHours.id}
                        name={fields.businessHours.name}
                        type="text"
                        label="営業時間"
                        placeholder="例: 10:00-19:00"
                        required
                        error={fields.businessHours.errors?.[0]}
                    />

                    <FormField
                        id={fields.description.id}
                        name={fields.description.name}
                        type="textarea"
                        label="店舗説明"
                        placeholder="店舗の説明を入力してください"
                        error={fields.description.errors?.[0]}
                    />

                    <div className="flex items-center space-x-2">
                        <Switch
                            id={fields.isActive.id}
                            name={fields.isActive.name}
                            checked={Boolean(formValue.isActive)}
                            onCheckedChange={(checked) => {
                                form.update({
                                    name: fields.isActive.name,
                                    value: checked
                                })
                            }}
                        />
                        <Label htmlFor={fields.isActive.id}>営業中</Label>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || form.status === 'error'}
                        >
                            {isPending ? '送信中...' : (isEditing ? '更新する' : '登録する')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}