import { memo } from 'react';
import {
    Select as UISelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id: string;
    name: string;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    onOpenChange?: (open: boolean) => void; // onBlurの代わり
}

export const Select = memo(function Select({
    id,
    name,
    options,
    placeholder,
    required,
    value,
    onChange,
    className,
    onOpenChange
}: SelectProps) {
    return (
        <UISelect name={name} value={value} onValueChange={onChange} required={required} onOpenChange={onOpenChange}>
            <SelectTrigger id={id} className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </UISelect>
    );
});