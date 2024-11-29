import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductsPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">商品一覧</h1>

            <Card>
                <CardHeader>
                    <CardTitle>概要</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        ここに商品一覧の内容が表示されます。店舗管理者は自身の商品のみ閲覧可、システム管理者は全ての商品を閲覧可
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
