import { Card } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// TODO: API実装後に動作しっかり確認
// Skeletonコンポーネントは一度だけロードすれば良いので、サーバーコンポーネントとして実装
export function ProductTableSkeleton() {
    return (
        <Card className="border-0 shadow-none">
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead className="w-[100px]"></TableHead>
                            <TableHead>商品名</TableHead>
                            <TableHead className="text-center">カテゴリ</TableHead>
                            <TableHead className="text-right">価格</TableHead>
                            <TableHead className="text-center">在庫状況</TableHead>
                            <TableHead className="text-center">操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="p-2">
                                    <div className="w-20 h-20 bg-gray-200 rounded-md animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="h-6 bg-gray-200 rounded w-20 mx-auto animate-pulse" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="h-4 bg-gray-200 rounded w-16 ml-auto animate-pulse" />
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="h-6 bg-gray-200 rounded w-16 mx-auto animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-1">
                                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ページネーションのスケルトン */}
            <div className="flex items-center justify-between p-4">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </Card>
    )
}