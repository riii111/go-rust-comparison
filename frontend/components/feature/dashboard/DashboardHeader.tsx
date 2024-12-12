'use client'

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/common/molecules/DateRangePicker"

export function DashboardHeader() {
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(2024, 11, 1),
        to: new Date()
    })

    const handleDateRangeChange = (range: DateRange | undefined) => {
        if (range) {
            setDateRange(range)
            // 親コンポーネントにデータ更新を通知する？？
            // onDateRangeChange(range) など
        }
    }

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <DateRangePicker
                date={dateRange}
                onSelect={handleDateRangeChange}
                fromDate={new Date(2024, 11, 1)}
                toDate={new Date()}
                calendarClassName="bg-white"
            />
        </div>
    )
}