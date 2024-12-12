'use client'

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/feature/dashboard/date-range-picker"

export function DashboardHeader() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 11, 1),
        to: new Date()
    })

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">New report</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <DateRangePicker date={date} onSelect={setDate} />
            </div>
        </div>
    )
}