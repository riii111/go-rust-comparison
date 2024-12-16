'use client'

import { Product } from '@/config/types/api/product'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ImageSectionProps = {
    product: Product
}

export function ImageSection({ product }: ImageSectionProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <div className="space-y-4">
            {/* メイン画像 */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                    src={product.imageUrls[selectedIndex]}
                    alt={`${product.name} - 画像 ${selectedIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                    quality={75}
                />
            </div>

            {/* サムネイル一覧 */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {product.imageUrls.map((url, index) => (
                    <button
                        key={url}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            "relative aspect-square w-20 overflow-hidden rounded-md",
                            "hover:opacity-80 transition-opacity",
                            "focus:outline-none focus:ring-2 focus:ring-primary",
                            selectedIndex === index && "ring-2 ring-primary"
                        )}
                    >
                        <Image
                            src={url}
                            alt={`${product.name} - サムネイル ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                            loading="lazy"
                            priority={false}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export function ImageSkeleton() {
    return (
        <div className="space-y-4">
            {/* メイン画像のスケルトン */}
            <div className="relative aspect-square w-full bg-gray-200 animate-pulse rounded-lg" />

            {/* サムネイルのスケルトン */}
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="w-20 aspect-square bg-gray-200 animate-pulse rounded-md"
                    />
                ))}
            </div>
        </div>
    )
}