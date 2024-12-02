import { memo } from 'react';
import { Label as UILabel } from "@/components/ui/label";

interface LabelProps {
    htmlFor: string;
    label: string;
    required?: boolean;
    className?: string;
}

export const Label = memo(function Label({
    htmlFor,
    label,
    required,
    className
}: LabelProps) {
    return (
        <UILabel htmlFor={htmlFor} className={className}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </UILabel>
    );
});