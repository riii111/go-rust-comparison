import { memo } from 'react';
import { Label } from "@/components/common/atoms/Label";
import { Select } from "@/components/common/atoms/Select";

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps {
    id: string;
    name: string;
    label: string;
    options: readonly SelectOption[] | SelectOption[];
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    labelClassName?: string;
    error?: string;
    onOpenChange?: (open: boolean) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
    id,
    name,
    label,
    options,
    placeholder,
    required = false,
    value,
    onChange,
    className,
    labelClassName,
    error,
    onOpenChange
}) => {
    return (
        <div className="space-y-2">
            <Label
                htmlFor={id}
                label={label}
                required={required}
                className={labelClassName}
            />
            <Select
                id={id}
                name={name}
                options={options as SelectOption[]}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                onOpenChange={onOpenChange}
                className={className}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default memo(FormSelect);