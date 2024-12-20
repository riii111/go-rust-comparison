'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { pathToTitleMap } from '@/config/constants/nav-config'
import { memo, useMemo } from 'react'

// Headerコンポーネントをメモ化
const MemoizedHeader = memo(Header)

export function DynamicHeader() {
    const pathname = usePathname()

    const pageTitle = useMemo(() => {
        // 完全一致を先にチェック
        if (pathname in pathToTitleMap) {
            return pathToTitleMap[pathname as keyof typeof pathToTitleMap]
        }

        // 前方一致をチェック
        const matchedPath = Object.keys(pathToTitleMap).find(path =>
            pathname.startsWith(path) && path !== '/management/dashboard'
        )

        return matchedPath
            ? pathToTitleMap[matchedPath as keyof typeof pathToTitleMap]
            : 'Dashboard'
    }, [pathname])

    return <MemoizedHeader title={pageTitle} />
}