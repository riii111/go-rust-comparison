import { memo } from 'react';
import { LinkText } from '@/components/common/atoms/LinkText';

interface TermsCheckboxProps {
    id?: string;
    name?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TermsCheckbox = memo(function TermsCheckbox({
    id,
    name,
    required,
    onChange
}: TermsCheckboxProps) {
    return (
        <label className="flex items-start space-x-2 mt-4">
            <input
                type="checkbox"
                id={id}
                name={name || "terms"}
                className="form-checkbox h-4 w-4 mt-2 text-primary border-gray-200"
                required={required}
                onChange={onChange}
            />
            <span className="text-gray-400 text-sm">
                <LinkText
                    text="利用規約"
                    suffix="と"
                />
                <LinkText
                    text="プライバシーポリシー"
                    suffix="に同意します"
                />
            </span>
        </label>
    );
});