import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InventoryPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">在庫一覧</h1>

            <Card>
                <CardHeader>
                    <CardTitle>概要</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        ここに在庫一覧の内容が表示されます。
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
