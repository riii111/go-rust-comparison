'use client'

import Image from "next/image"
import { Card } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2,
} from "lucide-react"
import { ProductDeleteDialog } from '@/components/feature/dashboard/products/dialog/ProductDeleteDialog'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from "@/config/types/api/product"
import { deleteProduct } from "@/lib/api/products"

type ProductListProps = {
    initialProducts: Product[]
}

export function ProductList({ initialProducts }: ProductListProps) {
    const router = useRouter()
    const [products, setProducts] = useState(initialProducts)
    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean
        productId: string | null
        productName: string
    }>({
        isOpen: false,
        productId: null,
        productName: ''
    })

    const handleDelete = async () => {
        if (!deleteDialog.productId) return

        try {
            await deleteProduct(deleteDialog.productId)
            // 成功時は商品リストから削除
            setProducts(products.filter(p => p.id !== deleteDialog.productId))
            setDeleteDialog({ isOpen: false, productId: null, productName: '' })
        } catch (error) {
            console.error('Failed to delete product:', error)
            // TODO: エラー通知の実装
        }
    }

    const renderActionButtons = (product: Product) => (
        <div className="flex items-center justify-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
            >
                <Pencil className="w-4 h-4 text-gray-600" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-50 hover:text-red-600"
                onClick={() => setDeleteDialog({
                    isOpen: true,
                    productId: product.id,
                    productName: product.name
                })}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    )

    return (
        <Card className="border-0 shadow-none">
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 text-left">
                            <TableHead className="w-[100px]"></TableHead>
                            <TableHead>商品名</TableHead>
                            <TableHead>カテゴリ</TableHead>
                            <TableHead className="text-right">価格</TableHead>
                            <TableHead>在庫状況</TableHead>
                            <TableHead className="text-center">操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                className="hover:bg-gray-50/50 cursor-pointer"
                                onClick={() => router.push(`/management/dashboard/products/${product.id}`)}
                            >
                                <TableCell className="p-2">
                                    <div className="relative w-20 h-20">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover rounded-md"
                                            sizes="80px"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-gray-900">
                                            {product.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {product.description}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        {product.category}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right font-medium text-gray-900">
                                    ¥{product.basePrice.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium
                                        ${product.stockStatus === "在庫あり"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-yellow-50 text-yellow-700"
                                            }`}
                                    >
                                        {product.stockStatus}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {renderActionButtons(product)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* TODO: ページネーション */}
            <div className="flex items-center justify-between p-4">
                <div className="text-sm text-gray-500">
                    全 100 件中 1-5 件を表示<br /><span className="text-xs italic font-semibold">※API実装後にページネーション適用しまっせ</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="h-8 min-w-[2rem] bg-gray-50">
                            1
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 min-w-[2rem]">
                            2
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 min-w-[2rem]">
                            3
                        </Button>
                        <span className="px-2">...</span>
                        <Button variant="ghost" size="sm" className="h-8 min-w-[2rem]">
                            20
                        </Button>
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* 削除ダイアログ */}
            <ProductDeleteDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, productId: null, productName: '' })}
                onConfirm={handleDelete}
                productName={deleteDialog.productName}
            />
        </Card>
    )
}