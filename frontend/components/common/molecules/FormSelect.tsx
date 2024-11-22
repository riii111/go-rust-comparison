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
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    labelClassName?: string;
    error?: string;
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
    error
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
                options={options}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                className={className}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default memo(FormSelect);