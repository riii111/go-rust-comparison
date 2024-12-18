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
            <TableRow>
                <TableHead>店舗名</TableHead>
                <TableHead>住所</TableHead>
                <TableHead>電話番号</TableHead>
                <TableHead>営業時間</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>登録日</TableHead>
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