import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            {/* Revenue + Platform Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-8">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-[200px]" />
                            <Skeleton className="h-[300px] w-full" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-4">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-6 w-[150px]" />
                                <Skeleton className="h-6 w-[100px]" />
                            </div>
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="p-4">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-10 w-10 rounded-lg" />
                                        <div className="flex-1">
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-2 w-full" />
                                        </div>
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
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-8 w-[120px]" />
                                <Skeleton className="h-4 w-[80px]" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}