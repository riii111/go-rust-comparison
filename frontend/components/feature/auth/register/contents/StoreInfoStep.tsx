import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import FormField from "@/components/common/FormField";
import FormSelect from "@/components/common/FormSelect";

const roleOptions = [
    { value: "owner", label: "店舗オーナー" },
    { value: "manager", label: "店舗管理者" },
    { value: "staff", label: "スタッフ" }
];

export function StoreInfoStep() {
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
                    options={roleOptions}
                    placeholder="役割を選択してください"
                    className="w-full border-gray-200 text-sm"
                    labelClassName="text-gray-800 text-sm"
                    required
                />

                <label className="flex items-start space-x-2 mt-4">
                    <input
                        type="checkbox"
                        name="terms"
                        className="form-checkbox h-4 w-4 mt-2 text-primary border-gray-200"
                        required
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
    );
}