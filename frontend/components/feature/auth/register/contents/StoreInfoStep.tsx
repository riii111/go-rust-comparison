import { CardContent } from "@/components/ui/card";
import FormSelect from "@/components/common/molecules/FormSelect";
import { type FieldMetadata } from "@conform-to/react";
import { STORE_OPTIONS } from "@/config/constants/stores";
import { ROLE_OPTIONS } from "@/config/constants/roles";
import { Button } from "@/components/ui/button";

interface StoreInfoStepProps {
    storeId: FieldMetadata<string>;
    role: FieldMetadata<string>;
    agreedToTerms: FieldMetadata<boolean>;
}

export function StoreInfoStep({
    storeId,
    role,
    agreedToTerms
}: StoreInfoStepProps) {
    return (
        <CardContent className="space-y-4">
            <FormSelect
                id={storeId.id}
                name={storeId.name}
                label="店舗"
                options={STORE_OPTIONS}
                placeholder="店舗を選択してください"
                className="w-full border-gray-200 text-sm"
                labelClassName="text-gray-800 text-sm"
                required
                error={storeId.errors?.[0]}
            />

            <FormSelect
                id={role.id}
                name={role.name}
                label="役割"
                options={ROLE_OPTIONS}
                placeholder="役割を選択してください"
                className="w-full border-gray-200 text-sm"
                labelClassName="text-gray-800 text-sm"
                required
                error={role.errors?.[0]}
            />

            <label className="flex items-start space-x-2 mt-4">
                <input
                    type="checkbox"
                    id={agreedToTerms.id}
                    name={agreedToTerms.name}
                    className="form-checkbox h-4 w-4 mt-2 text-primary border-gray-200"
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
            {agreedToTerms.errors?.[0] && (
                <p className="text-red-500 text-sm">{agreedToTerms.errors[0]}</p>
            )}
        </CardContent>
    );
}