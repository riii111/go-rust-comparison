import type { Metadata } from 'next'
import { SideNav } from '@/components/layout/dashboard/SideNav';
import { Header } from '@/components/layout/dashboard/Header';

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
            <div className="absolute inset-0 bg-dashboard-gradient">
                {/* グラデーション背景 */}
                <div className="absolute inset-0 dashboard-noise mix-blend-soft-light"></div>
            </div>

            <div className="relative flex w-full p-6">
                <div className="rounded-2xl backdrop-blur-sm">
                    <SideNav />
                </div>

                {/* メインエリア */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="rounded-2xl backdrop-blur-sm">
                        <Header />
                    </div>

                    {/* メインコンテンツ */}
                    <div className="flex-1 rounded-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
                        <main className="h-full overflow-auto">
                            <div className="h-full bg-[#FBFBFB] p-6">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}