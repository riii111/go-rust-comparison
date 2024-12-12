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
            "inline-flex rounded-lg p-1",
            variant === "primary"
                ? "bg-white border shadow-sm"
                : "bg-white border"
        )}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        "px-4 py-2 text-sm font-medium transition-all duration-200",
                        "rounded-md",
                        activeTab === tab.id
                            ? variant === "primary"
                                ? "bg-primary text-white shadow-sm"
                                : "bg-gray-900 text-white"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}