'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 登録処理の実装
    };

    return (
        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-bold text-gray-800">
                        アカウント登録
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                        基本情報を入力して、アカウントを作成してください
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* 基本情報セクション */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-gray-800 text-sm">姓</Label>
                                <Input
                                    id="lastName"
                                    placeholder="山田"
                                    className="w-full border-gray-200 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-gray-800 text-sm">名</Label>
                                <Input
                                    id="firstName"
                                    placeholder="太郎"
                                    className="w-full border-gray-200 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-800 text-sm">メールアドレス</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your-email@example.com"
                                className="w-full border-gray-200 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-800 text-sm">パスワード</Label>
                            <Input
                                id="password"
                                type="password"
                                className="w-full border-gray-200 text-sm"
                            />
                            <p className="text-gray-400 text-xs">
                                8文字以上の半角英数字で入力してください
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-800 text-sm">
                                パスワード（確認）
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                className="w-full border-gray-200 text-sm"
                            />
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* 店舗情報セクション */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-800">店舗情報</h3>

                        <div className="space-y-2">
                            <Label htmlFor="storeName" className="text-gray-800 text-sm">店舗名</Label>
                            <Input
                                id="storeName"
                                placeholder="Store Analytics 東京店"
                                className="w-full border-gray-200 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-gray-800 text-sm">役割</Label>
                            <Select>
                                <SelectTrigger className="w-full border-gray-200 text-sm">
                                    <SelectValue placeholder="役割を選択してください" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="owner">店舗オーナー</SelectItem>
                                    <SelectItem value="manager">店舗管理者</SelectItem>
                                    <SelectItem value="staff">スタッフ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 mt-1 text-primary border-gray-200"
                            />
                            <span className="text-gray-400 text-sm">
                                <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                                    利用規約
                                </Button>
                                と
                                <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                                    プライバシーポリシー
                                </Button>
                                に同意します
                            </span>
                        </label>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        アカウントを作成
                    </Button>
                    <p className="text-sm text-gray-400 text-center">
                        すでにアカウントをお持ちの方は{' '}
                        <Button variant="link" className="text-primary hover:text-primary/80 p-0" onClick={() => router.push('/management/auth/login')}>
                            こちら
                        </Button>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}