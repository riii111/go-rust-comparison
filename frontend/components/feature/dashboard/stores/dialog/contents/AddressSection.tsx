import { memo, useCallback } from 'react'
import { FieldMetadata } from "@conform-to/react"
import { formatZipCode } from '@/components/feature/dashboard/stores/validation'
import FormField from '@/components/common/molecules/FormField'


export const AddressSection = memo(function AddressSection({
    zipCodeField,
    addressField,
    phoneNumberField,
    onUpdateZipCode,
    onUpdateAddress,
    onUpdatePhone
}: {
    zipCodeField: FieldMetadata<string>;
    addressField: FieldMetadata<string>;
    phoneNumberField: FieldMetadata<string>;
    onUpdateZipCode: (value: string) => void;
    onUpdateAddress: (value: string) => void;
    onUpdatePhone: (value: string) => void;
}) {
    const handleZipCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatZipCode(e.target.value);
        onUpdateZipCode(formattedValue);
    }, [onUpdateZipCode]);

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id={zipCodeField.id}
                    name={zipCodeField.name}
                    type="text"
                    label="郵便番号"
                    placeholder="例: 123-4567"
                    required
                    error={zipCodeField.errors?.[0]}
                    onChange={handleZipCodeChange}
                    value={zipCodeField.value || ''}
                />
                <FormField
                    id={phoneNumberField.id}
                    name={phoneNumberField.name}
                    type="tel"
                    label="電話番号"
                    placeholder="例: 03-1234-5678"
                    required
                    error={phoneNumberField.errors?.[0]}
                    onChange={(e) => onUpdatePhone(e.target.value)}
                    value={phoneNumberField.value || ''}
                />
            </div>
            <FormField
                id={addressField.id}
                name={addressField.name}
                type="text"
                label="住所"
                placeholder="例: 東京都渋谷区..."
                required
                error={addressField.errors?.[0]}
                onChange={(e) => onUpdateAddress(e.target.value)}
                value={addressField.value || ''}
            />
        </>
    );
});