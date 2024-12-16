import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProductTableRow } from "@/components/feature/dashboard/products/table/ProductTableRow"
import type { ProductWithStock } from "@/config/types/api/product"

interface ProductTableProps {
    products: ProductWithStock[]
}

export function ProductTable({ products }: ProductTableProps) {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50/50 text-left">
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead className="w-[400px]">商品名</TableHead>
                        <TableHead className="w-28 text-center">カテゴリ</TableHead>
                        <TableHead className="w-32 text-center">価格</TableHead>
                        <TableHead className="w-32 text-center">在庫状況</TableHead>
                        <TableHead className="w-24 text-center">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <ProductTableRow key={product.id} product={product} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}