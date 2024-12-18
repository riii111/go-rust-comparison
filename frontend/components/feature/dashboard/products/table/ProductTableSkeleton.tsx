import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ITEMS_PER_PAGE } from '@/config/constants/product'

// TODO: API実装後に動作しっかり確認
// Skeletonコンポーネントは一度だけロードすれば良いので、サーバーコンポーネントとして実装
export function ProductTableSkeleton() {
    return (
        <Card className="border-0 shadow-none">
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 text-left">
                            <TableHead className="w-[100px]"></TableHead>
                            <TableHead className="w-[400px]">商品名</TableHead>
                            <TableHead className="w-28 text-center">カテゴリ</TableHead>
                            <TableHead className="w-32 text-center">価格</TableHead>
                            <TableHead className="w-32 text-center">在庫状況</TableHead>
                            <TableHead className="w-20 text-center">操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="p-2">
                                    <Skeleton className="relative w-20 h-20 rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-5 w-4/5" />
                                        <Skeleton className="h-4 w-3/5" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className="inline-flex items-center px-2.5 py-1 rounded-full w-24 h-6 mx-auto" />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className="h-5 w-20 mx-auto" />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className="inline-flex items-center justify-center px-2.5 py-1 rounded-full w-20 h-6 mx-auto" />
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Skeleton className="w-9 h-9 rounded" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ページネーションのスケルトン */}
            <div className="flex items-center justify-between p-4">
                <Skeleton className="w-32 h-4" />
                <div className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8" />
                    <div className="flex gap-1">
                        {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                            <Skeleton key={i} className="w-8 h-8" />
                        ))}
                    </div>
                    <Skeleton className="w-8 h-8" />
                </div>
            </div>
        </Card>
    )
}