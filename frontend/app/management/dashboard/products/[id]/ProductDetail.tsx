'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/config/types/api/product'

type ProductDetailProps = {
    product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
    const router = useRouter()

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
                {/* 既存の商品詳細表示部分 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 画像セクション */}
                    <div className="space-y-4">
                        <div className="relative aspect-square w-full">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
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