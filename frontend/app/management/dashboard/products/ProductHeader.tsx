import { ProductHeaderActions } from "@/app/management/dashboard/products/ProductHeaderActions"

export function ProductHeader() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end">
                <ProductHeaderActions />
            </div>
        </div>
    )
}