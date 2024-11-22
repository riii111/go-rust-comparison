import { CardContent } from "@/components/ui/card";
import FormField from "@/components/common/molecules/FormField";
import FormSelect from "@/components/common/molecules/FormSelect";
import { TermsCheckbox } from "@/components/feature/auth/register/contents/TermsCheckBox";
import { memo } from "react";

const ROLE_OPTIONS = [
    { value: "owner", label: "店舗オーナー" },
    { value: "manager", label: "店舗管理者" },
    { value: "staff", label: "スタッフ" }
];

export const StoreInfoStep = memo(function StoreInfoStep() {
    return (
        <CardContent className="space-y-4">
            <div className="space-y-4">
                <FormField
                    id="storeName"
                    name="storeName"
                    type="text"
                    label="店舗名"
                    placeholder="Store Analytics 東京店"
                    autoComplete="organization"
                    className="w-full border-gray-200 text-sm"
                    labelClassName="text-gray-800 text-sm"
                    required
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
                />

                <TermsCheckbox required />
            </div>
        </CardContent>
    );
});