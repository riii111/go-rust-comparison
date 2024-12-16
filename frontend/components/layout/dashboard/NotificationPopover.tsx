'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-gray-500" />
                    {/* 未読の場合に表示する赤い丸 */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-medium text-sm">通知</h3>
                    </div>
                    <div className="p-4 text-sm text-gray-500">
                        ここに通知内容が表示されます
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}