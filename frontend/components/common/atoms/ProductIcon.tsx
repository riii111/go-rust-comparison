import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProductIconProps {
    src: string
    alt: string
    size?: "sm" | "md" | "lg"
    className?: string
    onClick?: () => void
}

const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
}

const imageSizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
}

export function ProductIcon({
    src,
    alt,
    size = "sm",
    className,
    onClick,
}: ProductIconProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-lg bg-gray-100",
                sizeMap[size],
                className
            )}
            onClick={onClick}
        >
            <Image
                src={src}
                alt={alt}
                width={imageSizeMap[size]}
                height={imageSizeMap[size]}
                className="object-cover"
            />
        </div>
    )
}