import { Badge } from "@/components/ui/badge"
import { ProductCategory } from "@/config/types/api/product"
import { categoryConfig } from "@/config/constants/product"

type CategoryBadgeProps = {
    category: ProductCategory
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
    const { label, className } = categoryConfig[category]

    return (
        <Badge
            variant="secondary"
            className={className}
        >
            {label}
        </Badge>
    )
}