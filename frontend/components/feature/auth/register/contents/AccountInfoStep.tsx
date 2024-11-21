import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AccountInfoStep() {
    return (
        <CardContent className="space-y-4">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-800 text-sm">姓</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            autoComplete="family-name"
                            placeholder="山田"
                            className="w-full border-gray-200 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-800 text-sm">名</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            autoComplete="given-name"
                            placeholder="太郎"
                            className="w-full border-gray-200 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-800 text-sm">メールアドレス</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="your-email@example.com"
                        className="w-full border-gray-200 text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-800 text-sm">パスワード</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
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
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        className="w-full border-gray-200 text-sm"
                    />
                </div>
            </div>
        </CardContent>
    );
}