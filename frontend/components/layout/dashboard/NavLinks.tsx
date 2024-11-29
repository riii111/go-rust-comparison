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
        href: '/products',
        icon: Package2,
    },
    {
        title: '在庫管理',
        href: '/inventory',
        icon: BarChart3,
    },
    {
        title: '店舗一覧',
        href: '/stores',
        icon: Store,
    },
    {
        title: 'ユーザー一覧',
        href: '/users',
        icon: Users,
    },
    {
        title: '設定',
        href: '/settings',
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
                            'w-full justify-start',
                            isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
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