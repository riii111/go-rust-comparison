import { ProductSearch } from "@/components/feature/dashboard/products/search/ProductSearch"
import { ProductCreateButton } from "@/components/feature/dashboard/products/button/ProductCreateButton"

export function ProductHeader() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full gap-4">
                <ProductSearch />
                <ProductCreateButton />
            </div>
        </div>
    )
}