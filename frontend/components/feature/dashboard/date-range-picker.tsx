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
import { format, startOfMonth, isAfter, isBefore } from "date-fns"
import { ja } from "date-fns/locale"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
    date: DateRange | undefined
    onSelect: (date: DateRange | undefined) => void
}

export function DateRangePicker({ date, onSelect }: DateRangePickerProps) {
    // 選択可能な日付範囲を設定
    const today = new Date()
    const fromMonth = startOfMonth(new Date(2024, 11, 1))  // 2024年12月1日

    // 日付選択の制限を設定
    const disabledDays = (day: Date) => {
        return isBefore(day, fromMonth) || isAfter(day, today)
    }

    // 日付選択時のハンドラー
    const handleSelect = (selectedDate: DateRange | undefined) => {
        // 選択された日付が制限範囲内かチェック
        if (selectedDate?.to && isAfter(selectedDate.to, today)) {
            // 終了日が今日より後の場合、今日までに制限
            onSelect({
                from: selectedDate.from,
                to: today
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
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "yyyy年MM月dd日", { locale: ja })} -{" "}
                                {format(date.to, "yyyy年MM月dd日", { locale: ja })}
                            </>
                        ) : (
                            format(date.from, "yyyy年MM月dd日", { locale: ja })
                        )
                    ) : (
                        <span>期間を選択</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    locale={ja}
                    disabled={disabledDays}
                />
            </PopoverContent>
        </Popover>
    )
}