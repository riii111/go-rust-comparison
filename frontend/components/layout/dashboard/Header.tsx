import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NotificationPopover } from '@/components/layout/dashboard/NotificationPopover'

export function Header() {
    return (
        <header className="flex justify-end h-full px-4">
            {/* 右側のアイコン群 */}
            <div className="flex items-center gap-2">
                <NotificationPopover />

                {/* ユーザーアバター */}
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}