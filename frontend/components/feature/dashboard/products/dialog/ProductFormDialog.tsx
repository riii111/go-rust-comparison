'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { ImagePlus, Trash2 } from 'lucide-react'

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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: 画像アップロード処理を実装
        console.log('Image upload:', e.target.files)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: API実装後に送信処理を追加
        console.log('Form submitted:', formData)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{isEditing ? '商品を編集' : '新規商品登録'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 商品画像 */}
                    <div className="space-y-2">
                        <Label>商品画像</Label>
                        <div className="flex flex-wrap gap-4">
                            {formData.imageUrls.map((url, index) => (
                                <div key={index} className="relative w-24 h-24 group">
                                    <Image
                                        src={url}
                                        alt={`商品画像 ${index + 1}`}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-1 top-1 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => {
                                            const newUrls = [...formData.imageUrls]
                                            newUrls.splice(index, 1)
                                            setFormData({ ...formData, imageUrls: newUrls })
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            ))}
                            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                                <div className="flex flex-col items-center gap-1">
                                    <ImagePlus className="w-6 h-6 text-gray-400" />
                                    <span className="text-sm text-gray-500">画像を追加</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    multiple
                                />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">※最大5枚まで登録できます</p>
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
                        <Button type="submit">
                            {isEditing ? '更新する' : '登録する'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}