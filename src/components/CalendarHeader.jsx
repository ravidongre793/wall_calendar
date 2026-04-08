import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import useCalendarStore from '@/stores/useCalendarStore'

export default function CalendarHeader() {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const goToNextMonth = useCalendarStore((state) => state.goToNextMonth)
  const goToPrevMonth = useCalendarStore((state) => state.goToPrevMonth)
  const goToToday = useCalendarStore((state) => state.goToToday)

  const monthName = format(currentDate, 'MMMM')
  const year = format(currentDate, 'yyyy')

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Month / Year title */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-surface-900 dark:text-surface-50 tracking-tight leading-none">
            {monthName}
          </h2>
          <p className="text-xs text-surface-400 dark:text-surface-500 font-medium tracking-wide mt-0.5">
            {year}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        {/* Today button */}
        <Button
          id="go-to-today"
          variant="ghost"
          size="sm"
          onClick={goToToday}
          className="text-xs font-medium text-surface-500 dark:text-surface-400
                     hover:text-primary-600 dark:hover:text-primary-400
                     hover:bg-primary-50 dark:hover:bg-primary-500/10
                     transition-all duration-200 gap-1.5 rounded-lg cursor-pointer"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          Today
        </Button>

        {/* Navigation */}
        <div className="flex items-center gap-0.5 ml-1">
          <button
            id="prev-month"
            onClick={goToPrevMonth}
            className="flex items-center justify-center w-8 h-8 rounded-lg
                       text-surface-500 dark:text-surface-400
                       hover:bg-surface-100 dark:hover:bg-surface-800
                       hover:text-surface-700 dark:hover:text-surface-200
                       transition-all duration-200 active:scale-90 cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="next-month"
            onClick={goToNextMonth}
            className="flex items-center justify-center w-8 h-8 rounded-lg
                       text-surface-500 dark:text-surface-400
                       hover:bg-surface-100 dark:hover:bg-surface-800
                       hover:text-surface-700 dark:hover:text-surface-200
                       transition-all duration-200 active:scale-90 cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-surface-200 dark:bg-surface-700 mx-1" />

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </div>
  )
}
