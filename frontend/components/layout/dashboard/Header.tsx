import { CustomAvatar } from '@/components/common/atoms/CustomAvatar'
import { NotificationPopover } from '@/components/layout/dashboard/NotificationPopover'

export function Header() {
    return (
        <header className="flex justify-end h-full px-4">
            {/* 右側のアイコン群 */}
            <div className="flex items-center gap-2">
                <NotificationPopover />
                {/* ユーザーアバター */}
                <CustomAvatar
                    src="https://github.com/shadcn.png"
                    alt="User Name"
                    size="sm"
                />
            </div>
        </header>
    )
}