import { CardContent } from "@/components/ui/card";
import FormSelect from "@/components/common/molecules/FormSelect";
import { Button } from "@/components/ui/button";
import { StoreInfoFormData } from "@/components/feature/auth/validation";
import { STORE_OPTIONS } from "@/config/constants/stores";
import { ROLE_OPTIONS } from "@/config/constants/roles";

interface StoreInfoStepProps {
    formData: StoreInfoFormData;
    onChange: (data: Partial<StoreInfoFormData>) => void;
    errors: Record<string, string>;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onOpenChange?: (open: boolean) => void;
}

export function StoreInfoStep({ formData, onChange, errors, onBlur, onOpenChange }: StoreInfoStepProps) {
    const handleChange = (name: keyof StoreInfoFormData, value: string | boolean) => {
        onChange({ ...formData, [name]: value });
    };

    return (
        <CardContent className="space-y-4">
            <FormSelect
                id="storeId"
                name="storeId"
                label="店舗"
                options={STORE_OPTIONS}
                placeholder="店舗を選択してください"
                className="w-full border-gray-200 text-sm"
                labelClassName="text-gray-800 text-sm"
                required
                value={formData.storeId}
                onChange={(value) => handleChange('storeId', value)}
                error={errors.storeId}
                onOpenChange={onOpenChange}
            />

            <FormSelect
                id="role"
                name="role"
                label="役割"
                options={ROLE_OPTIONS}
                placeholder="役割を選択してください"
                className="w-full border-gray-200 text-sm"
                labelClassName="text-gray-800 text-sm"
                required
                value={formData.role}
                onChange={(value) => handleChange('role', value)}
                error={errors.role}
                onOpenChange={onOpenChange}
            />

            <label className="flex items-start space-x-2 mt-4">
                <input
                    type="checkbox"
                    name="agreedToTerms"
                    className="form-checkbox h-4 w-4 mt-2 text-primary border-gray-200"
                    checked={formData.agreedToTerms}
                    onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                    onBlur={onBlur}
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
            {errors.agreedToTerms && (
                <p className="text-red-500 text-sm">{errors.agreedToTerms}</p>
            )}
        </CardContent>
    );
}