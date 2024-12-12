'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/config/types/api/product'
import { useState } from 'react'

type ProductDetailProps = {
    product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
    const router = useRouter()
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    return (
        <div className="p-6 space-y-6">
            {/* ヘッダー */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="p-2"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-semibold">商品詳細</h1>
                </div>
                <Button className="flex items-center gap-2">
                    <Pencil className="w-4 h-4" />
                    編集する
                </Button>
            </div>

            {/* 商品情報 */}
            <Card className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 画像セクション */}
                    <div className="space-y-4">
                        {/* メイン画像 */}
                        <div className="relative aspect-square w-full">
                            <Image
                                src={product.imageUrls[selectedImageIndex]}
                                alt={`${product.name} - 画像 ${selectedImageIndex + 1}`}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        {/* サムネイル画像リスト */}
                        {product.imageUrls.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {product.imageUrls.map((url, index) => (
                                    <button
                                        key={url}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden
                                            ${selectedImageIndex === index
                                                ? 'ring-2 ring-blue-500'
                                                : 'ring-1 ring-gray-200'}`}
                                    >
                                        <Image
                                            src={url}
                                            alt={`${product.name} - サムネイル ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 商品情報セクション */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-lg font-semibold text-gray-900">
                                ¥{product.basePrice.toLocaleString()}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">商品説明</h3>
                                <p className="text-gray-900">{product.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">カテゴリ</h3>
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        {product.category}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">在庫状況</h3>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                        ${product.stockStatus === "在庫あり"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-yellow-50 text-yellow-700"}`}
                                    >
                                        {product.stockStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}