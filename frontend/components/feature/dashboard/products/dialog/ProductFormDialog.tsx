'use client'

import { useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductImageUpload } from './ProductImageUpload'
import { useForm } from "@conform-to/react"
import { parseWithZod } from '@conform-to/zod'
import { productSchema, MESSAGES } from '@/components/feature/dashboard/products/validation'
import FormField from '@/components/common/molecules/FormField'

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

    const [form, { name, description, materialInfo, basePrice, category }] = useForm({
        id: "product-form",
        defaultValue: initialData ?? {
            name: "",
            description: "",
            materialInfo: "",
            basePrice: 0,
            category: "",
            imageUrls: [],
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
                        // TODO: API実装後に送信処理を追加
                        console.log('Form submitted:', submission.value)
                        onClose()
                    } catch (error) {
                        return submission.reply({
                            formErrors: [isEditing ? MESSAGES.product.updateFailed : MESSAGES.product.createFailed]
                        })
                    }
                })()
            })
        }
    })

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
                            images={form.value.imageUrls}
                            onChange={(images) => {
                                const formData = new FormData()
                                formData.set('imageUrls', JSON.stringify(images))
                                form.onChange(formData)
                            }}
                            maxImages={5}
                            maxSizeInMB={5}
                        />
                    </div>

                    <FormField
                        id={name.id}
                        name={name.name}
                        type="text"
                        label="商品名"
                        placeholder="商品名を入力してください"
                        required
                        error={name.errors?.[0]}
                    />

                    <FormField
                        id={description.id}
                        name={description.name}
                        type="textarea"
                        label="商品説明"
                        placeholder="商品の説明を入力してください"
                        required
                        error={description.errors?.[0]}
                    />

                    <FormField
                        id={materialInfo.id}
                        name={materialInfo.name}
                        type="textarea"
                        label="素材・製品仕様"
                        placeholder="素材や製品仕様を入力してください"
                        required
                        error={materialInfo.errors?.[0]}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Select
                                value={form.value.category}
                                onValueChange={(value) => {
                                    const formData = new FormData()
                                    formData.set('category', value)
                                    form.onChange(formData)
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="カテゴリを選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="clothing">衣類</SelectItem>
                                    <SelectItem value="accessories">アクセサリー</SelectItem>
                                    <SelectItem value="shoes">靴</SelectItem>
                                    <SelectItem value="other">その他</SelectItem>
                                </SelectContent>
                            </Select>
                            {category.errors?.[0] && (
                                <p className="text-red-500 text-sm">{category.errors[0]}</p>
                            )}
                        </div>

                        <FormField
                            id={basePrice.id}
                            name={basePrice.name}
                            type="number"
                            label="価格"
                            required
                            error={basePrice.errors?.[0]}
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