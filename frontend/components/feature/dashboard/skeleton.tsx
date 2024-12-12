import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="h-full pl-6 flex flex-col overflow-hidden">
            {/* ヘッダー部分 */}
            <div className="flex-none bg-white py-4 pr-6 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-9 w-24" />
                        ))}
                    </div>
                    <Skeleton className="h-9 w-[200px]" />
                </div>
            </div>

            {/* コンテンツ部分 */}
            <div className="flex-1 overflow-y-auto pt-6 pr-6">
                <div className="space-y-6">
                    {/* Revenue + Platform Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <Card className="lg:col-span-8">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-[100px]" />
                                        <Skeleton className="h-12 w-[200px]" />
                                        <Skeleton className="h-4 w-[150px]" />
                                    </div>
                                    <Skeleton className="h-[200px] w-full" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-4">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-6 w-[180px]" />
                                        <Skeleton className="h-6 w-[100px]" />
                                    </div>
                                    {[1, 2, 3, 4].map((i) => (
                                        <Card key={i} className="p-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <Skeleton className="h-6 w-6" />
                                                    <div className="flex-1">
                                                        <Skeleton className="h-4 w-full" />
                                                    </div>
                                                    <Skeleton className="h-4 w-[80px]" />
                                                </div>
                                                <Skeleton className="h-2 w-full" />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[80px]" />
                                        <Skeleton className="h-8 w-[120px]" />
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[60px]" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sales Rank Table */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Skeleton key={i} className="h-6 w-[100px]" />
                                    ))}
                                </div>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 py-4 border-b">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[120px]" />
                                                <Skeleton className="h-3 w-[80px]" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-6 w-[60px]" />
                                        <Skeleton className="h-6 w-[60px]" />
                                        <Skeleton className="h-6 w-[60px]" />
                                        <Skeleton className="h-6 w-[80px]" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}