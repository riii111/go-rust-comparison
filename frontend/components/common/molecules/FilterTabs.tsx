'use client'

import { cn } from "@/lib/utils"

interface FilterTabsProps {
    tabs: {
        id: string
        label: string
    }[]
    activeTab: string
    onChange: (id: string) => void
    variant?: "primary" | "secondary"
}

export function FilterTabs({
    tabs,
    activeTab,
    onChange,
    variant = "primary"
}: FilterTabsProps) {
    return (
        <div className={cn(
            "inline-flex rounded-lg",
            variant === "primary" ? "bg-gray-100" : "bg-white border"
        )}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors",
                        "first:rounded-l-lg last:rounded-r-lg",
                        activeTab === tab.id
                            ? variant === "primary"
                                ? "bg-white shadow-sm"
                                : "bg-gray-900 text-white"
                            : "text-gray-500 hover:text-gray-900"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}