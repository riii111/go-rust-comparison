'use client'

import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, isAfter, isBefore } from "date-fns"
import { ja } from "date-fns/locale"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
    date: DateRange | undefined
    onSelect: (date: DateRange | undefined) => void
    fromDate?: Date
    toDate?: Date
    buttonClassName?: string
    calendarClassName?: string
    placeholder?: string
    numberOfMonths?: number
    formatString?: string
    align?: "start" | "center" | "end"
}

export function DateRangePicker({
    date,
    onSelect,
    fromDate,
    toDate = new Date(),
    buttonClassName,
    calendarClassName,
    placeholder = "期間を選択",
    numberOfMonths = 2,
    formatString = "yyyy年MM月dd日",
    align = "start"
}: DateRangePickerProps) {
    // 日付選択の制限を設定
    const disabledDays = (day: Date) => {
        if (fromDate && isBefore(day, fromDate)) return true
        if (toDate && isAfter(day, toDate)) return true
        return false
    }

    // 日付選択時のハンドラー
    const handleSelect = (selectedDate: DateRange | undefined) => {
        if (selectedDate?.to && isAfter(selectedDate.to, toDate)) {
            onSelect({
                from: selectedDate.from,
                to: toDate
            })
            return
        }
        onSelect(selectedDate)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        buttonClassName
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, formatString, { locale: ja })} -{" "}
                                {format(date.to, formatString, { locale: ja })}
                            </>
                        ) : (
                            format(date.from, formatString, { locale: ja })
                        )
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-auto p-0", calendarClassName)} align={align}>
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleSelect}
                    numberOfMonths={numberOfMonths}
                    locale={ja}
                    disabled={disabledDays}
                />
            </PopoverContent>
        </Popover>
    )
}