import { CustomAvatar } from '@/components/common/atoms/CustomAvatar'
import { NotificationPopover } from '@/components/layout/dashboard/NotificationPopover'

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header className="flex items-center justify-between h-full px-6">
            {/* 左側にタイトル */}
            <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--text-primary))]">
                {title}
            </h1>

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