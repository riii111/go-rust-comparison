'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'


export function Header() {
    const router = useRouter()

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="p-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-semibold">商品詳細</h1>
            </div>
            <Button className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                編集する
            </Button>
        </div>
    )
}