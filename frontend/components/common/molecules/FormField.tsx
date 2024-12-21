import { memo } from 'react';
import { Input } from "@/components/common/atoms/Input";
import { Label } from "@/components/common/atoms/Label";

interface FormFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string | string[] | null;
    className?: string;
    labelClassName?: string;
    autoComplete?: string;
    description?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const FormField = memo(function FormField({
    id,
    name,
    type,
    label,
    placeholder,
    required = false,
    error,
    className,
    labelClassName,
    autoComplete,
    description,
    onChange,
    value,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label
                htmlFor={id}
                label={label}
                required={required}
                className={labelClassName}
            />
            <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                className={className}
                autoComplete={autoComplete}
                onChange={onChange}
                value={value}
            />
            {description && <p className="text-gray-400 text-xs">{description}</p>}
            {error && <p className="text-red-500 text-sm">{Array.isArray(error) ? error[0] : error}</p>}
        </div>
    );
});

export default FormField;