'use client'

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export function DateRangePickerWithState() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 11, 1),
        to: new Date()
    })

    return (
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
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
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={ja}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
} 