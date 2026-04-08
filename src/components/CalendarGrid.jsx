import { isSameMonth } from 'date-fns'
import DayCell from '@/components/DayCell'
import useCalendarStore from '@/stores/useCalendarStore'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarGrid() {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const getCalendarDays = useCalendarStore((state) => state.getCalendarDays)
  const days = getCalendarDays()

  return (
    <div className="select-none">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-[11px] font-semibold tracking-wider uppercase py-2
              ${i === 0 || i === 6
                ? 'text-surface-400 dark:text-surface-500'
                : 'text-surface-500 dark:text-surface-400'
              }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        key={currentDate.toISOString()}
        className="grid grid-cols-7 gap-0.5 animate-fade-in"
      >
        {days.map((day) => (
          <DayCell
            key={day.toISOString()}
            day={day}
            isCurrentMonth={isSameMonth(day, currentDate)}
          />
        ))}
      </div>
    </div>
  )
}
