'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { navItems, settingsItem } from '@/config/constants/nav-config'

// パスに基づいてタイトルを取得する関数
const getPageTitle = (pathname: string): string => {
    // ダッシュボードのパスを特別扱い
    if (pathname === '/management/dashboard') {
        return 'Dashboard'
    }

    // navItemsから一致するパスを検索
    const matchedNavItem = navItems.find(item =>
        pathname.startsWith(item.href)
    )
    if (matchedNavItem) {
        return matchedNavItem.title
    }

    // 設定画面の確認
    if (pathname.startsWith(settingsItem.href)) {
        return settingsItem.title
    }

    return 'Dashboard' // デフォルト
}

export function DynamicHeader() {
    const pathname = usePathname()
    const pageTitle = getPageTitle(pathname)

    return <Header title={pageTitle} />
}