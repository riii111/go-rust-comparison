import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Store } from '@/config/types/api/store'
import { StoreTableRow } from './contents/StoreTableRow'

interface StoreTableProps {
    stores: Store[]
}

function StoreTableHeader() {
    return (
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
    )
}

export function StoreTable({ stores }: StoreTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <StoreTableHeader />
                <TableBody>
                    {stores.map((store) => (
                        <StoreTableRow key={store.id} store={store} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}