'use client'

import { TableRow, TableCell } from "@/components/ui/table"
import Image from "next/image"
import type { ProductWithStock } from "@/config/types/api/product"
import { StockStatusBadge } from "@/components/feature/dashboard/products/badge/StockStatusBadge"
import { CategoryBadge } from "@/components/feature/dashboard/products/badge/CategoryBadge"
import Link from "next/link"
import { ProductTableActions } from "./contents/ProductTableActions"

interface ProductTableRowProps {
    product: ProductWithStock
}

export function ProductTableRow({ product }: ProductTableRowProps) {

    return (
        <TableRow>
            <TableCell className="p-2">
                <Link href={`/management/dashboard/products/${product.id}`} className="block">
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
                </Link>
            </TableCell>
            <TableCell className="w-[400px]">
                <Link
                    href={`/management/dashboard/products/${product.id}`}
                    className="block hover:bg-gray-50/50"
                >
                    <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900 line-clamp-1">
                            {product.name}
                        </span>
                        <span className="text-sm text-gray-500 line-clamp-2 max-w-[400px]">
                            {product.description}
                        </span>
                    </div>
                </Link>
            </TableCell>
            <TableCell className="w-28 text-center">
                <CategoryBadge category={product.category} />
            </TableCell>
            <TableCell className="w-32 text-center font-medium text-gray-900">
                ¥{product.basePrice.toLocaleString()}
            </TableCell>
            <TableCell className="w-32 text-center">
                <StockStatusBadge stocks={product.stocks} />
            </TableCell>
            <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                    <ProductTableActions product={product} />
                </div>
            </TableCell>
        </TableRow>
    )
}