'use client'

import { TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { ProductWithStock } from "@/config/types/api/product"
import { useState } from "react"
import { ProductDeleteDialog } from "@/components/feature/dashboard/products/dialog/ProductDeleteDialog"
import { deleteProduct } from "@/lib/api/products"
import { StockStatusBadge } from "@/components/feature/dashboard/products/badge/StockStatusBadge"

interface ProductTableRowProps {
    product: ProductWithStock
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
                            priority
                            className="object-cover rounded-md"
                            sizes="80px"
                        />
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900 line-clamp-1">
                            {product.name}
                        </span>
                        <span className="text-sm text-gray-500 line-clamp-2 max-w-[400px]">
                            {product.description}
                        </span>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {product.category}
                    </span>
                </TableCell>
                <TableCell className="text-center font-medium text-gray-900">
                    ¥{product.basePrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-center w-32">
                    <StockStatusBadge stocks={product.stocks} />
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