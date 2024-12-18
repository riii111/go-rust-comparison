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
        <TableRow>
            <TableCell className="font-medium">{store.name}</TableCell>
            <TableCell>{store.address}</TableCell>
            <TableCell>{store.phoneNumber}</TableCell>
            <TableCell>{store.businessHours}</TableCell>
            <TableCell>
                <Badge variant={store.isActive ? 'default' : 'secondary'}>
                    {store.isActive ? '営業中' : '休業中'}
                </Badge>
            </TableCell>
            <TableCell>{store.createdAt}</TableCell>
            <TableCell>
                <StoreOperations store={store} />
            </TableCell>
        </TableRow>
    )
}