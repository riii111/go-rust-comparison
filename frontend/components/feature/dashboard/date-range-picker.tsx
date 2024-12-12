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
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
    date: DateRange | undefined
    onSelect: (date: DateRange | undefined) => void
}

export function DateRangePicker({ date, onSelect }: DateRangePickerProps) {
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
                    onSelect={onSelect}
                    numberOfMonths={2}
                    locale={ja}
                />
            </PopoverContent>
        </Popover>
    )
}