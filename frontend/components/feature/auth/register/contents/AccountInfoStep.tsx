import { CardContent } from "@/components/ui/card";
import FormField from "@/components/common/molecules/FormField";
import { AccountInfo } from "@/config/types/auth/register";

interface AccountInfoStepProps {
    formData: AccountInfo;
    onChange: (data: AccountInfo) => void;
    errors: Record<string, string>;
}

export function AccountInfoStep({ formData, onChange, errors }: AccountInfoStepProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...formData, [name]: value });
    };

    return (
        <CardContent className="space-y-4">
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
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
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
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
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
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
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
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
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
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
            />
        </CardContent>
    );
}