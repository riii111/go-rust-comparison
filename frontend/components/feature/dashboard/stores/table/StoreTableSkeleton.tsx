import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { ITEMS_PER_PAGE } from '@/config/constants/store'

export function StoreTableSkeleton() {
    return (
        <Card className="border-0 shadow-none">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="h-16">
                            <TableHead className="w-[150px]">店舗名</TableHead>
                            <TableHead className="w-[280px]">住所</TableHead>
                            <TableHead className="w-[140px]">電話番号</TableHead>
                            <TableHead className="w-[140px]">営業時間</TableHead>
                            <TableHead className="w-[140px]">定休日</TableHead>
                            <TableHead className="w-[100px]">ステータス</TableHead>
                            <TableHead className="w-[120px]">登録日</TableHead>
                            <TableHead className="w-[80px]">操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                            <TableRow key={i} className="h-16">
                                <TableCell className="w-[150px]"><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell className="w-[280px]"><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell className="w-[140px]"><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell className="w-[140px]"><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell className="w-[140px]">
                                    <div className="flex gap-1 min-h-[24px]">
                                        <Skeleton className="h-5 w-8" />
                                        <Skeleton className="h-5 w-8" />
                                        <Skeleton className="h-5 w-8" />
                                    </div>
                                </TableCell>
                                <TableCell className="w-[100px]"><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell className="w-[120px]"><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell className="w-[80px]"><Skeleton className="h-8 w-8" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}