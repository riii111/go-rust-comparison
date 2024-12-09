'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil } from 'lucide-react'
import Image from 'next/image'
import { NotFound } from '@/components/feature/dashboard/NotFound'

// 開発用のダミーデータ
const DUMMY_PRODUCT_DETAILS = {
    "product-1": {
        id: "product-1",
        name: "ベーシックTシャツ",
        description: "シンプルで着やすい定番Tシャツ",
        materialInfo: "コットン100%\n肌触りの良い上質な素材を使用しています。",
        category: "clothing",
        basePrice: 2500,
        imageUrls: [
            "/api/placeholder/400/400",
            "/api/placeholder/400/400",
        ],
        stockStatus: "在庫あり",
        createdAt: "2024-03-09T10:00:00Z",
        updatedAt: "2024-03-09T10:00:00Z"
    },
    // 404エラーテスト用の存在しないID
    "not-found": null
}

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState<typeof DUMMY_PRODUCT_DETAILS["product-1"] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // 実際のAPIコールの代わりにダミーデータを使用
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                // 意図的な遅延を追加（ローディング状態の確認用）
                await new Promise(resolve => setTimeout(resolve, 1000))

                const productData = DUMMY_PRODUCT_DETAILS[params.id as keyof typeof DUMMY_PRODUCT_DETAILS]
                setProduct(productData)
            } catch (error) {
                console.error('Failed to fetch product:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [params.id])

    if (isLoading) {
        return <div className="p-6">Loading...</div>
    }

    if (!product) {
        return <NotFound
            title="商品が見つかりません"
            description="お探しの商品は削除されたか、URLが間違っている可能性があります。"
        />
    }

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
                                src={product.imageUrls[0]}
                                alt={product.name}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        {/* サムネイル画像リスト */}
                        <div className="flex gap-2">
                            {product.imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative w-20 h-20 cursor-pointer hover:opacity-80"
                                >
                                    <Image
                                        src={url}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        className="object-cover rounded-md"
                                        sizes="80px"
                                    />
                                </div>
                            ))}
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

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">素材・製品仕様</h3>
                                <p className="text-gray-900 whitespace-pre-wrap">{product.materialInfo}</p>
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

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">登録日時</h3>
                                    <p className="text-sm text-gray-900">
                                        {new Date(product.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">最終更新</h3>
                                    <p className="text-sm text-gray-900">
                                        {new Date(product.updatedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}