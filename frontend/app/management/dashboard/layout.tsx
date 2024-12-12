import type { Metadata } from 'next'
import { SideNav } from '@/components/layout/dashboard/SideNav'
import { DynamicHeader } from '@/components/layout/dashboard/DynamicHeader'

export const metadata: Metadata = {
    title: '在庫管理システム',
    description: 'ECサイトの在庫管理システム',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative flex h-screen overflow-hidden">
            {/* グラデーション背景 */}
            <div className="absolute inset-0 bg-dashboard-gradient">
                <div className="absolute inset-0 dashboard-noise mix-blend-overlay"></div>
            </div>

            <div className="relative flex w-full p-6">
                {/* サイドナビゲーション */}
                <div className="rounded-2xl backdrop-blur-[2px]">
                    <SideNav />
                </div>

                {/* メインエリア */}
                <div className="flex-1 flex flex-col gap-6 ml-6">
                    <div className="rounded-2xl backdrop-blur-[2px]">
                        <DynamicHeader />
                    </div>

                    {/* メインコンテンツ */}
                    <div className="flex-1 rounded-2xl bg-[hsl(var(--component-background))] backdrop-blur-[2px] overflow-hidden">
                        <main className="h-full overflow-auto">
                            <div className="h-full bg-white/80 p-6">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}