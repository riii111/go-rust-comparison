'use client'

import { useTransition, useCallback, memo, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from "@conform-to/react"
import { parseWithZod } from '@conform-to/zod'
import { storeSchema, MESSAGES, formatZipCode } from '@/components/feature/dashboard/stores/validation'
import FormField from '@/components/common/molecules/FormField'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import StoreFormActions from './contents/StoreFormActions'
import { Store } from '@/config/types/api/store'

const DialogTitleMemo = memo(function DialogTitleComponent({ isEditing }: { isEditing: boolean }) {
    return (
        <DialogHeader>
            <DialogTitle>{isEditing ? '店舗を編集' : '新規店舗登録'}</DialogTitle>
        </DialogHeader>
    )
})

interface StoreFormDialogProps {
    isOpen: boolean
    onClose: () => void
    initialData?: Store
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
            businessHours: {
                start: initialData?.businessHours?.start ?? "09:00",
                end: initialData?.businessHours?.end ?? "18:00",
                regularHoliday: initialData?.businessHours?.regularHoliday ?? [],
            },
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

    const handleUpdateZipCode = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatZipCode(e.target.value);
        form.update({
            name: fields.zipCode.name,
            value: formattedValue
        })
    }, [form, fields.zipCode.name])

    const handleUpdateAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        form.update({
            name: fields.address.name,
            value: e.target.value
        })
    }, [form, fields.address.name])

    const handleUpdatePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        form.update({
            name: fields.phoneNumber.name,
            value: e.target.value
        })
    }, [form, fields.phoneNumber.name])

    const AddressFields = useMemo(() => (
        <>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id={fields.zipCode.id}
                    name={fields.zipCode.name}
                    type="text"
                    label="郵便番号"
                    placeholder="例: 123-4567"
                    required
                    error={fields.zipCode.errors?.[0]}
                    onChange={handleUpdateZipCode}
                    value={fields.zipCode.value || ''}
                />
                <FormField
                    id={fields.phoneNumber.id}
                    name={fields.phoneNumber.name}
                    type="tel"
                    label="電話番号"
                    placeholder="例: 03-1234-5678"
                    required
                    error={fields.phoneNumber.errors?.[0]}
                    onChange={handleUpdatePhone}
                    value={fields.phoneNumber.value || ''}
                />
            </div>
            <FormField
                id={fields.address.id}
                name={fields.address.name}
                type="text"
                label="住所"
                placeholder="例: 東京都渋谷区..."
                required
                error={fields.address.errors?.[0]}
                onChange={handleUpdateAddress}
                value={fields.address.value || ''}
            />
        </>
    ), [
        fields.zipCode, fields.phoneNumber, fields.address,
        handleUpdateZipCode, handleUpdatePhone, handleUpdateAddress
    ])

    // フォームの現在値を安全に取得
    const formValue = form.value ?? {
        name: "",
        address: "",
        phoneNumber: "",
        businessHours: {
            start: "09:00",
            end: "18:00",
            regularHoliday: [],
        },
        zipCode: "",
        description: "",
        isActive: true,
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogTitleMemo isEditing={isEditing} />
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

                    {AddressFields}

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                id={`${fields.businessHours.id}.start`}
                                name={`${fields.businessHours.name}.start`}
                                type="time"
                                label="営業開始時間"
                                required
                                error={fields.businessHours.errors?.[0]}
                            />
                            <FormField
                                id={`${fields.businessHours.id}.end`}
                                name={`${fields.businessHours.name}.end`}
                                type="time"
                                label="営業終了時間"
                                required
                                error={fields.businessHours.errors?.[0]}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>定休日</Label>
                            <div className="flex flex-wrap gap-2">
                                {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
                                    <label key={day} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name={`${fields.businessHours.name}.regularHoliday`}
                                            value={day}
                                            defaultChecked={initialData?.businessHours?.regularHoliday?.includes(day)}
                                        />
                                        <span>{day}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

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

                    <StoreFormActions
                        isEditing={isEditing}
                        isPending={isPending}
                        formStatus={form.status ?? ''}
                        onClose={onClose}
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}