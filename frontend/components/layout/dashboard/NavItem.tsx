'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as Icons from 'lucide-react'  // アイコンをクライアントサイドでインポート
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface NavItemProps {
    href: string
    iconName: keyof typeof Icons  // 文字列としてアイコン名を受け取る
    title: string
    variant?: 'default' | 'system'
}

export function NavItem({ href, iconName, title, variant = 'default' }: NavItemProps) {
    const pathname = usePathname()
    const isActive = pathname === href
    const Icon: LucideIcon = Icons[iconName] as LucideIcon

    return (
        <Button
            variant="ghost"
            asChild
            className={cn(
                'w-full justify-start text-md transition-colors duration-200',
                'hover:bg-gray-100',
                variant === 'default' && 'hover:text-primary',
                isActive && variant === 'default' && 'bg-primary-lighter text-primary hover:bg-primary-light'
            )}
        >
            <Link href={href}>
                <Icon className={cn(
                    "mr-3 h-5 w-5",
                    "transition-colors duration-200",
                    isActive && variant === 'default' && "text-primary"
                )} />
                {title}
            </Link>
        </Button>
    )
}