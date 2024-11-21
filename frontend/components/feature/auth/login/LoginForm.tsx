'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: ログイン処理の実装
    };

    return (
        <Card className="w-full max-w-md border border-[#E0E0E0] shadow-sm">
            <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-bold text-[#202020]">ログイン</CardTitle>
                    <CardDescription className="text-[#A0A0A0] text-sm">
                        管理画面にアクセスするには認証が必要です
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#202020] text-sm">メールアドレス</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your-email@example.com"
                            className="w-full border-[#E0E0E0] text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[#202020] text-sm">パスワード</Label>
                        <Input
                            id="password"
                            type="password"
                            className="w-full border-[#E0E0E0] text-sm"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-[#E02060] border-[#E0E0E0]" />
                            <span className="text-[#A0A0A0] text-sm">ログイン情報を保存</span>
                        </label>
                        <Button variant="link" className="text-sm text-[#E02060] hover:text-[#E02060]/80 p-0">
                            パスワードをお忘れの方
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full bg-[#E02060] hover:bg-[#E02060]/90 text-white">
                        ログイン
                    </Button>
                    <p className="text-sm text-[#A0A0A0] text-center">
                        アカウントをお持ちでない方は{' '}
                        <Button variant="link" className="text-[#E02060] hover:text-[#E02060]/80 p-0">
                            こちら
                        </Button>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}