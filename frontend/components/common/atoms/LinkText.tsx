import { memo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";

interface LinkTextProps {
    text: string;
    onClick?: () => void;
    className?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
}

export const LinkText = memo(function LinkText({
    text,
    onClick,
    className = "text-primary hover:text-primary/80 p-0",
    prefix,
    suffix
}: LinkTextProps) {
    const button = (
        <Button
            variant="link"
            className={className}
            onClick={onClick}
        >
            {text}
        </Button>
    );

    if (prefix || suffix) {
        return (
            <span className="text-sm text-gray-400">
                {prefix}
                {button}
                {suffix}
            </span>
        );
    }

    return button;
});
