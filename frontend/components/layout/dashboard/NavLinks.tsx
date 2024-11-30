'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Package2,
    Store,
    Users,
    BarChart3,
    Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
    {
        title: '商品一覧',
        href: '/management/dashboard/products',
        icon: Package2,
    },
    {
        title: '在庫管理',
        href: '/management/dashboard/inventory',
        icon: BarChart3,
    },
    {
        title: '店舗一覧',
        href: '/management/dashboard/stores',
        icon: Store,
    },
    {
        title: 'ユーザー一覧',
        href: '/management/dashboard/users',
        icon: Users,
    },
    {
        title: '設定',
        href: '/management/dashboard/settings',
        icon: Settings,
    },
]

export function NavLinks() {
    const pathname = usePathname()

    return (
        <nav className="space-y-1">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Button
                        key={item.href}
                        variant="ghost"
                        asChild
                        className={cn(
                            'w-full justify-start text-gray-800 text-md font-semibold hover:bg-primary-lighter',
                            isActive && 'text-primary hover:bg-primary-light'
                        )}
                    >
                        <Link href={item.href}>
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.title}
                        </Link>
                    </Button>
                )
            })}
        </nav>
    )
}