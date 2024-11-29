import { CardContent } from "@/components/ui/card";
import FormField from "@/components/common/molecules/FormField";
import { type FieldMetadata } from "@conform-to/react";

export interface AccountInfoStepProps {
    lastName: FieldMetadata<string>;
    firstName: FieldMetadata<string>;
    email: FieldMetadata<string>;
    password: FieldMetadata<string>;
    confirmPassword: FieldMetadata<string>;
}

export function AccountInfoStep({
    lastName,
    firstName,
    email,
    password,
    confirmPassword
}: AccountInfoStepProps) {
    return (
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id={lastName.id}
                    name={lastName.name}
                    type="text"
                    label="姓"
                    placeholder="山田"
                    autoComplete="family-name"
                    className="w-full border-gray-200 text-sm"
                    labelClassName="text-gray-800 text-sm"
                    required
                    error={lastName.errors?.[0]}
                />
                <FormField
                    id={firstName.id}
                    name={firstName.name}
                    type="text"
                    label="名"
                    placeholder="太郎"
                    autoComplete="given-name"
                    className="w-full border-gray-200 text-sm"
                    labelClassName="text-gray-800 text-sm"
                    required
                    error={firstName.errors?.[0]}
                />
            </div>

            <FormField
                id={email.id}
                name={email.name}
                type="email"
                label="メールアドレス"
                placeholder="your-email@example.com"
                autoComplete="email"
                className="w-full border-gray-200 text-sm"
                labelClassName="text-gray-800 text-sm"
                required
                error={email.errors?.[0]}
            />

            <FormField
                id={password.id}
                name={password.name}
                type="password"
                label="パスワード"
                autoComplete="new-password"
                className="w-full border-gray-200 text-sm"
                labelClassName="text-gray-800 text-sm"
                description="8文字以上の半角英数字で入力してください"
                required
                error={password.errors?.[0]}
            />

            <FormField
                id={confirmPassword.id}
                name={confirmPassword.name}
                type="password"
                label="パスワード（確認）"
                autoComplete="new-password"
                className="w-full border-gray-200 text-sm"
                labelClassName="text-gray-800 text-sm"
                required
                error={confirmPassword.errors?.[0]}
            />
        </CardContent>
    );
}