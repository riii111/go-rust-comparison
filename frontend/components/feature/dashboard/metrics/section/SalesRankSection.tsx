import { CustomAvatar } from "@/components/common/atoms/CustomAvatar"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { SalesRankData } from "@/config/types/api/dashboard"

interface SalesRankSectionProps {
    data: SalesRankData[];
}

export function SalesRankSection({ data }: SalesRankSectionProps) {
    return (
        <div className="space-y-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Leads</TableHead>
                        <TableHead>KPI</TableHead>
                        <TableHead>W/L</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <CustomAvatar
                                        src={item.avatar}
                                        alt={item.name}
                                        size="sm"
                                    />
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            ¥{item.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="bg-gray-100">
                                    {item.sales}
                                </Badge>
                            </TableCell>
                            <TableCell>{item.leads}</TableCell>
                            <TableCell>{item.kpi}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Badge variant="secondary" className="bg-gray-900 text-white">
                                        {item.winRate.wins}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        {item.winRate.total}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}