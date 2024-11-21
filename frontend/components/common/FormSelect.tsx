import { memo } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <Label htmlFor={id} className={labelClassName}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select name={name} value={value} onValueChange={onChange} required={required}>
                <SelectTrigger id={id} className={className} aria-required={required}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default memo(FormSelect);