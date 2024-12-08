import { NavLinks } from '@/components/layout/dashboard/NavLinks'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function SideNav() {
    return (
        <div className="w-64 flex flex-col h-full">
            {/* ロゴ部分 */}
            <div className="flex items-center px-4 py-4">
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

            {/* ユーザー情報 */}
            <div className="p-4 mt-auto border-t">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">ユーザー名</span>
                        <span className="text-xs text-gray-500">大阪店</span>
                    </div>
                </div>
            </div>
        </div>
    )
}