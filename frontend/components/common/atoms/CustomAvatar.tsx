import { cn } from "@/lib/utils"
import {
    Avatar as UIAvatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar"
import Image from "next/image"

interface CustomAvatarProps {
    src: string
    alt: string
    fallback?: string
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

export function CustomAvatar({
    src,
    alt,
    fallback,
    size = "md",
    className,
    onClick,
}: CustomAvatarProps) {
    // フォールバックテキストの生成（名前の頭文字を2文字）
    const generateFallback = () => {
        if (fallback) return fallback
        return alt
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <UIAvatar
            className={cn(sizeMap[size], className)}
            onClick={onClick}
        >
            {src.startsWith("http") ? (
                // 外部URLの場合は通常のimg要素を使用
                <AvatarImage src={src} alt={alt} />
            ) : (
                // ローカルの画像の場合はNext.js Imageを使用
                <Image
                    src={src}
                    alt={alt}
                    width={imageSizeMap[size]}
                    height={imageSizeMap[size]}
                    className="object-cover"
                />
            )}
            <AvatarFallback>{generateFallback()}</AvatarFallback>
        </UIAvatar>
    )
}