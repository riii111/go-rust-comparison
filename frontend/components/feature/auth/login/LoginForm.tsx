'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
export default function LoginForm() {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: ログイン処理の実装
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-bold text-gray-800">
                        ログイン
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                        管理画面にアクセスするには認証が必要です
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-800 text-sm">
                            メールアドレス
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your-email@example.com"
                            className="w-full border-gray-200 text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-800 text-sm">
                            パスワード
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            className="w-full border-gray-200 text-sm"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary border-gray-200"
                            />
                            <span className="text-gray-400 text-sm">
                                ログイン情報を保存
                            </span>
                        </label>
                        <Button
                            variant="link"
                            className="text-sm text-primary hover:text-primary/80 p-0"
                        >
                            パスワードをお忘れの方
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        ログイン
                    </Button>
                    <p className="text-sm text-gray-400 text-center">
                        アカウントをお持ちでない方は{' '}
                        <Button
                            variant="link"
                            className="text-primary hover:text-primary/80 p-0"
                            onClick={() => router.push('/management/auth/register')}
                        >
                            こちら
                        </Button>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}