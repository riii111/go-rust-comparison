import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">ダッシュボード</h1>

            <Card>
                <CardHeader>
                    <CardTitle>概要</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        ここにダッシュボードの内容が表示されます。
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
