'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { ImagePlus, X } from 'lucide-react'
import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE, MAX_IMAGES } from '@/config/constants/product'

interface ProductImageUploadProps {
    images?: string[]
    onChange: (images: string[]) => void
}

export function ProductImageUpload({
    images,
    onChange,
}: ProductImageUploadProps) {
    const [error, setError] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null)

        // バリデーション
        if (images && images.length + acceptedFiles.length > MAX_IMAGES) {
            setError(`画像は最大${MAX_IMAGES}枚までアップロードできます`)
            return
        }

        // ファイルの処理
        acceptedFiles.forEach(file => {
            if (file.size > MAX_IMAGE_SIZE) {
                setError(`ファイルサイズは${MAX_IMAGE_SIZE}MB以下にしてください`)
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === 'string') {
                    onChange([...(images ?? []), e.target.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }, [images, onChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': IMAGE_EXTENSIONS
        },
        maxSize: MAX_IMAGE_SIZE
    })
    const removeImage = (index: number) => {
        if (!images) return
        const newImages = [...images]
        newImages.splice(index, 1)
        onChange(newImages)
        setError(null)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {/* 既存の画像プレビュー */}
                {images?.map((image, index) => (
                    <div key={index} className="relative group w-24 h-24">
                        <Image
                            src={image}
                            alt={`商品画像 ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                            sizes="96px"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full 
                                     text-white opacity-0 group-hover:opacity-100 transition-opacity
                                     shadow-lg hover:bg-red-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {/* ドラッグ&ドロップエリア */}
                {images && images.length < MAX_IMAGES && (
                    <div
                        {...getRootProps()}
                        className={`w-24 h-24 flex items-center justify-center rounded-lg cursor-pointer
                                  transition-colors duration-200 
                                  ${isDragActive
                                ? 'border-2 border-blue-500 bg-blue-50'
                                : 'border-2 border-dashed border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center gap-1">
                            <ImagePlus className="w-6 h-6 text-gray-400" />
                            <span className="text-xs text-gray-500">
                                {isDragActive ? 'ドロップで追加' : '画像を追加'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* ヘルプテキストとエラーメッセージ */}
            <div className="text-sm">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p className="text-gray-500">
                        ※ JPEG/PNG形式、{MAX_IMAGE_SIZE}MB以下、最大{MAX_IMAGES}枚まで
                    </p>
                )}
            </div>
        </div>
    )
}