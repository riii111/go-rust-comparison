import { memo } from 'react';
import { Input as UIInput } from "@/components/ui/input";

interface InputProps {
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    autoComplete?: string;
}

export const Input = memo(function Input(props: InputProps) {
    const { value, ...rest } = props;
    const initialValue = value !== undefined ? { value } : {};

    return <UIInput {...rest} {...initialValue} />;
});