import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function Header() {
    return (
        <header className="flex items-center h-full">
            <div className="flex-1 max-w-2xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="search"
                    placeholder="検索..."
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-2xl"
                />
            </div>
        </header>
    )
}