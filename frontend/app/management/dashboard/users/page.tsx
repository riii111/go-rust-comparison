import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsersPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">ユーザー一覧（システム管理者のみ閲覧可）</h1>

            <Card>
                <CardHeader>
                    <CardTitle>概要</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        ここにユーザー一覧の内容が表示されます。システム管理者のみ閲覧可
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
