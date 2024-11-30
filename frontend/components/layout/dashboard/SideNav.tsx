import { NavLinks } from '@/components/layout/dashboard/NavLinks'
import { ScrollArea } from '@/components/ui/scroll-area'

export function SideNav() {
    return (
        <div className="w-64 flex flex-col">
            {/* ロゴ部分 */}
            <div className="flex items-center px-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-800">Store Analytics</span>
            </div>

            {/* スクロール可能なナビゲーションエリア */}
            <ScrollArea className="flex-1">
                <div className="px-2 py-4">
                    <NavLinks />
                </div>
            </ScrollArea>
        </div>
    )
}