import { CardContent } from "@/components/ui/card";
import FormSelect from "@/components/common/molecules/FormSelect";
import { type FieldMetadata } from "@conform-to/react";
import { STORE_OPTIONS } from "@/config/constants/stores";
import { TermsCheckbox } from "@/components/feature/auth/register/contents/TermsCheckBox";

interface StoreInfoStepProps {
    storeId: FieldMetadata<string>;
    agreedToTerms: FieldMetadata<boolean>;
}

export function StoreInfoStep({
    storeId,
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

            <TermsCheckbox
                id={agreedToTerms.id}
                name={agreedToTerms.name}
                required
            />
            {agreedToTerms.errors?.[0] && (
                <p className="text-red-500 text-sm">{agreedToTerms.errors[0]}</p>
            )}
        </CardContent>
    );
}