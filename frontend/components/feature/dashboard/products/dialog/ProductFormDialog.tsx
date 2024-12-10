'use client'

import { useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ProductImageUpload } from './ProductImageUpload'
import { useForm } from "@conform-to/react"
import { parseWithZod } from '@conform-to/zod'
import { productSchema, MESSAGES } from '@/components/feature/dashboard/products/validation'
import FormField from '@/components/common/molecules/FormField'
import FormSelect from '@/components/common/molecules/FormSelect'

interface ProductFormDialogProps {
    isOpen: boolean
    onClose: () => void
    initialData?: {
        id?: string
        name: string
        description: string
        materialInfo: string
        basePrice: number
        category: string
        imageUrls: string[]
    }
}

export function ProductFormDialog({ isOpen, onClose, initialData }: ProductFormDialogProps) {
    const [isPending, startTransition] = useTransition()
    const isEditing = !!initialData?.id

    const [form, fields] = useForm({
        id: "product-form",
        defaultValue: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
            materialInfo: initialData?.materialInfo ?? "",
            basePrice: initialData?.basePrice ?? 0,
            category: initialData?.category ?? "",
            imageUrls: initialData?.imageUrls ?? [],
        },
        onValidate: ({ formData }) => {
            return parseWithZod(formData, {
                schema: productSchema
            })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.currentTarget)
            const submission = parseWithZod(formData, {
                schema: productSchema
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
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (error) {
                        return submission.reply({
                            formErrors: [isEditing ? MESSAGES.product.updateFailed : MESSAGES.product.createFailed]
                        })
                    }
                })()
            })
        }
    })

    // フォームの現在値を安全に取得
    const formValue = form.value ?? {
        name: "",
        description: "",
        materialInfo: "",
        basePrice: 0,
        category: "",
        imageUrls: [],
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{isEditing ? '商品を編集' : '新規商品登録'}</DialogTitle>
                </DialogHeader>
                <form id={form.id} onSubmit={form.onSubmit} className="space-y-6" noValidate>
                    {/* 商品画像アップロード */}
                    <div className="space-y-2">
                        <ProductImageUpload
                            images={formValue.imageUrls as string[]}
                            onChange={(images) => {
                                form.update({
                                    name: fields.imageUrls.name,
                                    value: images
                                })
                            }}
                            maxImages={5}
                            maxSizeInMB={5}
                        />
                        {fields.imageUrls.errors && (
                            <p className="text-red-500 text-sm">{fields.imageUrls.errors}</p>
                        )}
                    </div>

                    <FormField
                        id={fields.name.id}
                        name={fields.name.name}
                        type="text"
                        label="商品名"
                        placeholder="商品名を入力してください"
                        required
                        error={fields.name.errors?.[0]}
                    />

                    <FormField
                        id={fields.description.id}
                        name={fields.description.name}
                        type="textarea"
                        label="商品説明"
                        placeholder="商品の説明を入力してください"
                        required
                        error={fields.description.errors?.[0]}
                    />

                    <FormField
                        id={fields.materialInfo.id}
                        name={fields.materialInfo.name}
                        type="textarea"
                        label="素材・製品仕様"
                        placeholder="素材や製品仕様を入力してください"
                        required
                        error={fields.materialInfo.errors?.[0]}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormSelect
                            id={fields.category.id}
                            name={fields.category.name}
                            label="カテゴリ"
                            options={[
                                { value: "clothing", label: "衣類" },
                                { value: "accessories", label: "アクセサリー" },
                                { value: "shoes", label: "靴" },
                                { value: "other", label: "その他" }
                            ]}
                            placeholder="カテゴリを選択"
                            required
                            value={formValue.category}
                            onChange={(value) => {
                                form.update({
                                    name: fields.category.name,
                                    value: value
                                })
                            }}
                            error={fields.category.errors?.[0]}
                        />

                        <FormField
                            id={fields.basePrice.id}
                            name={fields.basePrice.name}
                            type="number"
                            label="価格"
                            placeholder="価格を入力してください"
                            required
                            error={fields.basePrice.errors?.[0]}
                        />
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