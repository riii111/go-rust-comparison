import { NavLinks } from '@/components/layout/dashboard/NavLinks'
import { ScrollArea } from '@/components/ui/scroll-area'

export function SideNav() {
    return (
        <div className="w-64 flex flex-col border-r border-[#E0E0E0] bg-white">
            {/* ロゴ部分 */}
            <div className="h-14 flex items-center px-4 border-b border-[#E0E0E0]">
                <span className="text-xl font-semibold text-[#202020]">Dashboard</span>
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