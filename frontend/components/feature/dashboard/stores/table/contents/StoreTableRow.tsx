'use client'

import {
    TableCell,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { StoreTableActions } from '@/components/feature/dashboard/stores/table/contents/StoreTableActions'
import { Store } from '@/config/types/api/store'

interface StoreTableRowProps {
    store: Store
}

export function StoreTableRow({ store }: StoreTableRowProps) {
    const regularHolidays = store.businessHours.regularHoliday

    return (
        <TableRow className="h-16">
            <TableCell className="font-medium w-[150px]">{store.name}</TableCell>
            <TableCell className="w-[280px]">{store.address}</TableCell>
            <TableCell className="w-[140px]">{store.phoneNumber}</TableCell>
            <TableCell className="w-[140px]">{store.businessHours.start} - {store.businessHours.end}</TableCell>
            <TableCell className="w-[140px]">
                {regularHolidays?.length ? (
                    <div className="flex flex-wrap gap-1">
                        {regularHolidays.map((day) => (
                            <Badge key={day} variant="outline" className="text-xs">
                                {day}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <span className="text-muted-foreground text-sm">年中無休</span>
                )}
            </TableCell>
            <TableCell className="w-[100px]">
                <Badge variant={store.isActive ? 'default' : 'secondary'}>
                    {store.isActive ? '営業中' : '休業中'}
                </Badge>
            </TableCell>
            <TableCell className="w-[120px]">{store.createdAt}</TableCell>
            <TableCell className="w-[100px]">
                <StoreTableActions store={store} />
            </TableCell>
        </TableRow>
    )
}