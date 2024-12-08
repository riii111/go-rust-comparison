import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
    return (
        <header className="flex items-center justify-between h-full px-4">
            <div className="flex-1 max-w-lg relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="search"
                    placeholder="検索..."
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-2xl"
                />
            </div>

            {/* 右側のアイコン群 */}
            <div className="flex items-center gap-2">
                {/* 通知ベル */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-gray-500" />
                    {/* 未読通知がある場合に表示する赤い丸 */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                {/* ユーザーアバター */}
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}