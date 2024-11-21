import { memo } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
    labelClassName?: string;
    autoComplete?: string;
    description?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    name,
    type,
    label,
    placeholder,
    required = false,
    value,
    onChange,
    onBlur,
    error,
    className,
    labelClassName,
    autoComplete,
    description,
}) => {
    const initialValue = value !== undefined ? { value } : {};

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className={labelClassName}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                onBlur={onBlur}
                className={className}
                autoComplete={autoComplete}
                {...initialValue}
            />
            {description && <p className="text-gray-400 text-xs">{description}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default memo(FormField);