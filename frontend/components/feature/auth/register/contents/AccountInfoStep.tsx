import { CardContent } from "@/components/ui/card";
import FormField from "@/components/common/FormField";

export function AccountInfoStep() {
    return (
        <CardContent className="space-y-4">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="姓"
                        placeholder="山田"
                        autoComplete="family-name"
                        className="w-full border-gray-200 text-sm"
                        labelClassName="text-gray-800 text-sm"
                        required
                    />
                    <FormField
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="名"
                        placeholder="太郎"
                        autoComplete="given-name"
                        className="w-full border-gray-200 text-sm"
                        labelClassName="text-gray-800 text-sm"
                        required
                    />
                </div>

                <FormField
                    id="email"
                    name="email"
                    type="email"
                    label="メールアドレス"
                    placeholder="your-email@example.com"
                    autoComplete="email"
                    className="w-full border-gray-200 text-sm"
                    labelClassName="text-gray-800 text-sm"
                    required
                />

                <FormField
                    id="password"
                    name="password"
                    type="password"
                    label="パスワード"
                    autoComplete="new-password"
                    className="w-full border-gray-200 text-sm"
                    labelClassName="text-gray-800 text-sm"
                    description="8文字以上の半角英数字で入力してください"
                    required
                />

                <FormField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="パスワード（確認）"
                    autoComplete="new-password"
                    className="w-full border-gray-200 text-sm"
                    labelClassName="text-gray-800 text-sm"
                    required
                />
            </div>
        </CardContent>
    );
}