'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ProductImageUpload } from './ProductImageUpload'

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
    const [formData, setFormData] = useState(
        initialData ?? {
            name: '',
            description: '',
            materialInfo: '',
            basePrice: 0,
            category: '',
            imageUrls: [],
        }
    )
    const isEditing = !!initialData?.id

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // TODO: API実装後に送信処理を追加
            console.log('Form submitted:', formData)
            onClose()
        } catch (error) {
            console.error('Failed to submit form:', error)
            // TODO: エラー処理
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{isEditing ? '商品を編集' : '新規商品登録'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 商品画像アップロード */}
                    <div className="space-y-2">
                        <Label>商品画像</Label>
                        <ProductImageUpload
                            images={formData.imageUrls}
                            onChange={(images) => setFormData({ ...formData, imageUrls: images })}
                            maxImages={5}
                            maxSizeInMB={5}
                        />
                    </div>

                    {/* 商品名 */}
                    <div className="space-y-2">
                        <Label htmlFor="name">商品名</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="商品名を入力してください"
                            required
                        />
                    </div>

                    {/* 商品説明 */}
                    <div className="space-y-2">
                        <Label htmlFor="description">商品説明</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="商品の説明を入力してください"
                            required
                        />
                    </div>

                    {/* 素材・製品仕様 */}
                    <div className="space-y-2">
                        <Label htmlFor="materialInfo">素材・製品仕様</Label>
                        <Textarea
                            id="materialInfo"
                            value={formData.materialInfo}
                            onChange={(e) => setFormData({ ...formData, materialInfo: e.target.value })}
                            placeholder="素材や製品仕様を入力してください"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* カテゴリ */}
                        <div className="space-y-2">
                            <Label htmlFor="category">カテゴリ</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
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
                        </div>

                        {/* 価格 */}
                        <div className="space-y-2">
                            <Label htmlFor="basePrice">価格</Label>
                            <Input
                                id="basePrice"
                                type="number"
                                value={formData.basePrice}
                                onChange={(e) =>
                                    setFormData({ ...formData, basePrice: Number(e.target.value) })
                                }
                                min="0"
                                step="100"
                                required
                            />
                        </div>
                    </div>

                    {/* 送信ボタン */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            disabled={formData.imageUrls.length === 0}
                        >
                            {isEditing ? '更新する' : '登録する'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}