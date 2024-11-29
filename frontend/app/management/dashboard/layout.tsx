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
        <div className="flex h-screen overflow-hidden">
            <SideNav />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}