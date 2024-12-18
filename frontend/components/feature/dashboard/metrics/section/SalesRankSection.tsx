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
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sales Ranking</h3>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[300px]">Sales</TableHead>
                        <TableHead className="text-center w-[100px]">Revenue</TableHead>
                        <TableHead className="text-center w-[100px]">Leads</TableHead>
                        <TableHead className="text-center w-[100px]">KPI</TableHead>
                        <TableHead className="text-center w-[120px]">Win/Loss</TableHead>
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
                            <TableCell className="text-center">
                                <Badge variant="secondary" className="bg-gray-100">
                                    {item.sales.toLocaleString()}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                                {item.leads.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge
                                    variant={item.kpi >= 0.8 ? "default" : "secondary"}
                                    className={item.kpi >= 0.8 ? "bg-green-100 text-green-800" : "bg-gray-100"}
                                >
                                    {(item.kpi * 100).toFixed(0)}%
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        {item.winRate.wins}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">/</span>
                                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                                        {item.winRate.total}
                                    </Badge>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}