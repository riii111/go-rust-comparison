'use client'

import { TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Product } from "@/config/types/api/product"
import { useState } from "react"
import { ProductDeleteDialog } from "@/components/feature/dashboard/products/dialog/ProductDeleteDialog"
import { deleteProduct } from "@/lib/api/products"

interface ProductTableRowProps {
    product: Product
}

export function ProductTableRow({ product }: ProductTableRowProps) {
    const router = useRouter()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleDelete = async () => {
        try {
            await deleteProduct(product.id)
            router.refresh() // 一覧を再取得
            setShowDeleteDialog(false)
        } catch (error) {
            console.error('Failed to delete product:', error)
            // TODO: エラー通知
        }
    }

    const handleRowClick = (e: React.MouseEvent) => {
        // 操作ボタンクリック時は詳細ページに遷移しない
        if ((e.target as HTMLElement).closest('button')) {
            return
        }
        router.push(`/management/dashboard/products/${product.id}`)
    }

    return (
        <>
            <TableRow
                className="hover:bg-gray-50/50 cursor-pointer"
                onClick={handleRowClick}
            >
                <TableCell className="p-2">
                    <div className="relative w-20 h-20">
                        <Image
                            src={product.imageUrls[0]}
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
                <TableCell className="text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {product.category}
                    </span>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-900">
                    ¥{product.basePrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
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
                <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100"
                            onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/management/dashboard/products/${product.id}/edit`)
                            }}
                        >
                            <Pencil className="w-4 h-4 text-gray-600" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-50 hover:text-red-600"
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowDeleteDialog(true)
                            }}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>

            <ProductDeleteDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                productName={product.name}
            />
        </>
    )
}