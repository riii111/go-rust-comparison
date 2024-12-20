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

function ProductTableHeader() {
    return (
        <TableHeader>
            <TableRow className="h-16">
                <TableHead className="w-[100px]">商品画像</TableHead>
                <TableHead>商品情報</TableHead>
                <TableHead className="text-center">カテゴリー</TableHead>
                <TableHead className="text-center">価格</TableHead>
                <TableHead className="text-center w-32">在庫状況</TableHead>
                <TableHead className="text-center w-[80px]">操作</TableHead>
            </TableRow>
        </TableHeader>
    )
}

export function ProductTable({ products }: ProductTableProps) {
    if (!products || products.length === 0) {
        return (
            <div className="rounded-lg border p-8 text-center text-gray-500">
                商品が見つかりませんでした
            </div>
        );
    }

    return (
        <div className="rounded-lg border">
            <Table>
                <ProductTableHeader />
                <TableBody>
                    {products.map((product) => (
                        <ProductTableRow key={product.id} product={product} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}