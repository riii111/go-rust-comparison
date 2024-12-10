import { ProductHeaderActions } from "@/app/management/dashboard/products/ProductHeaderActions"

export function ProductHeader() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">商品管理</h1>
                <ProductHeaderActions />
            </div>
        </div>
    )
}