import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductsPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">商品一覧</h1>

            <Card className="border-gray-200">
                <CardHeader>
                    <CardTitle className="text-gray-800">概要</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">
                        ここに商品一覧の内容が表示されます。<br />
                        店舗管理者は自身の商品のみ閲覧可、システム管理者は全ての商品を閲覧可
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}