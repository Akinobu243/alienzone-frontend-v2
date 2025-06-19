"use client"

import * as React from "react"
import { ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateFilterProps {
  onDateChange?: (date: string | null) => void
}

export function DateFilter({ onDateChange }: DateFilterProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [weekRange, setWeekRange] = React.useState<{
    start: Date
    end: Date
  } | null>(null)

  // Function to get the previous Friday for any given date
  const getPreviousFriday = (date: Date): Date => {
    const dayOfWeek = date.getDay()
    const diff = (dayOfWeek + 2) % 7 // +2 because we want Friday (5) to be day 0
    const friday = new Date(date)
    friday.setDate(date.getDate() - diff)
    return friday
  }

  // Function to get the next Thursday for any given date
  const getNextThursday = (date: Date): Date => {
    const friday = getPreviousFriday(date)
    const thursday = new Date(friday)
    thursday.setDate(friday.getDate() + 6)
    return thursday
  }

  // Function to check if a date is within the selected week range
  const isDateInRange = (dateToCheck: Date): boolean => {
    if (!weekRange) return false
    const start = new Date(weekRange.start)
    start.setHours(0, 0, 0, 0)
    const end = new Date(weekRange.end)
    end.setHours(23, 59, 59, 999)
    const check = new Date(dateToCheck)
    check.setHours(12, 0, 0, 0)
    return check >= start && check <= end
  }

  // Function to check if a date is the start of the week range
  const isStartOfRange = (dateToCheck: Date): boolean => {
    if (!weekRange) return false
    const start = new Date(weekRange.start)
    start.setHours(0, 0, 0, 0)
    const check = new Date(dateToCheck)
    check.setHours(0, 0, 0, 0)
    return check.getTime() === start.getTime()
  }

  // Function to check if a date is the end of the week range
  const isEndOfRange = (dateToCheck: Date): boolean => {
    if (!weekRange) return false
    const end = new Date(weekRange.end)
    end.setHours(0, 0, 0, 0)
    const check = new Date(dateToCheck)
    check.setHours(0, 0, 0, 0)
    return check.getTime() === end.getTime()
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)

    if (selectedDate) {
      // Update the week range
      const friday = getPreviousFriday(selectedDate)
      const thursday = getNextThursday(selectedDate)
      setWeekRange({ start: friday, end: thursday })

      // Format date as YYYY-MM-DD without timezone conversion
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const day = String(selectedDate.getDate()).padStart(2, "0")
      const formattedDate = `${year}-${month}-${day}`

      onDateChange?.(formattedDate)
    } else {
      setWeekRange(null)
      onDateChange?.(null)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleDateSelect(undefined)
  }

  // Format date range for display
  const formatDateRange = () => {
    if (!weekRange) return "Filter by week"
    const startStr = weekRange.start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    const endStr = weekRange.end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    return `${startStr} - ${endStr}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "px-3 sm:px-4 bg-white/10 h-[3.5rem] w-[13rem] rounded-xl border border-white/10 whitespace-nowrap flex items-center gap-2 justify-between text-xs sm:text-sm transition-all duration-300 font-inter",
            "hover:bg-white/15"
          )}
        >
          <div className="flex items-center gap-2">
            <span>{formatDateRange()}</span>
            {weekRange && (
              <div className="group hover:bg-black/80 rounded-md p-1">
                <XIcon
                  className="w-3.5 h-3.5 text-white/50 group-hover:text-white/90 transition-colors"
                  onClick={handleClear}
                />
              </div>
            )}
          </div>

          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border border-white/10 bg-white/10 backdrop-blur-xl rounded-xl"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          captionLayout="dropdown"
          className="bg-transparent text-white p-3"
          fromYear={2024}
          toYear={2030}
          modifiers={{
            inRange: (date) => isDateInRange(date),
            rangeStart: (date) => isStartOfRange(date),
            rangeEnd: (date) => isEndOfRange(date),
          }}
          modifiersStyles={{
            inRange: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            rangeStart: {
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
            },
            rangeEnd: {
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px",
            },
          }}
          classNames={{
            months: "bg-transparent",
            head_cell: "text-white/50",
            cell: "text-white/90",
            day: "h-9 w-9 text-center text-sm p-0 relative transition-colors",
            day_selected: "text-white",
            day_today: "text-white",
            nav_button: "text-white/50 hover:text-white/90",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            caption: "relative text-white/90 flex justify-center items-center",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
