import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { navItems, settingsItem } from '@/config/constants/nav-config'
import { NavItem } from '@/components/layout/dashboard/NavItem'

export function SideNav() {
    return (
        <div className="w-56 flex flex-col h-full">
            {/* ロゴ部分 */}
            <div className="flex items-center px-4 py-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <span className="ml-3 font-semibold tracking-tight text-[hsl(var(--text-primary))]">Store Analytics</span>
            </div>

            <ScrollArea className="flex-1">
                {/* 共通セクション */}
                <div className="px-2 py-4">
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.href}
                                title={item.title}
                                href={item.href}
                                iconName={item.iconName}
                            />
                        ))}
                    </nav>
                </div>

                {/* システム設定セクション */}
                <div className="px-2">
                    <div className="h-px bg-gray-300" />
                    <div className="py-4">
                        <NavItem
                            title={settingsItem.title}
                            href={settingsItem.href}
                            iconName={settingsItem.iconName}
                            variant="system"
                        />
                    </div>
                </div>
            </ScrollArea>


            {/* ユーザー情報 */}
            <div className="p-4 mt-auto border-t">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
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