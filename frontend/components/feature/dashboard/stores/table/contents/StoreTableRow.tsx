'use client'

import {
    TableCell,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { StoreOperations } from '@/components/feature/dashboard/stores/table/contents/StoreOperations'
import { Store } from '@/config/types/api/store'

interface StoreTableRowProps {
    store: Store
}

export function StoreTableRow({ store }: StoreTableRowProps) {
    return (
        <TableRow className="h-16">
            <TableCell className="font-medium w-[180px]">{store.name}</TableCell>
            <TableCell className="w-[280px]">{store.address}</TableCell>
            <TableCell className="w-[140px]">{store.phoneNumber}</TableCell>
            <TableCell className="w-[140px]">{store.businessHours}</TableCell>
            <TableCell className="w-[100px]">
                <Badge variant={store.isActive ? 'default' : 'secondary'}>
                    {store.isActive ? '営業中' : '休業中'}
                </Badge>
            </TableCell>
            <TableCell className="w-[120px]">{store.createdAt}</TableCell>
            <TableCell className="w-[100px]">
                <StoreOperations store={store} />
            </TableCell>
        </TableRow>
    )
}