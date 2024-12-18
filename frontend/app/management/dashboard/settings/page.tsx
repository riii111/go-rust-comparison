import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>概要</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        ここに設定の内容が表示されます。
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
