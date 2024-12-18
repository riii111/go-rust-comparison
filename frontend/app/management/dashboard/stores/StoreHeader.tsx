import { StoreSearch } from "@/components/feature/dashboard/stores/search/StoreSearch"
import { StoreCreateButton } from "@/components/feature/dashboard/stores/button/StoreCreateButton"

export function StoreHeader() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full gap-4">
                <StoreSearch />
                <StoreCreateButton />
            </div>
        </div>
    )
}