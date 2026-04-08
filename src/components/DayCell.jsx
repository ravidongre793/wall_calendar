import { memo, useCallback } from 'react'
import { format, isSameDay, isToday, isWeekend } from 'date-fns'
import useCalendarStore from '@/stores/useCalendarStore'
import { cn } from '@/lib/utils'

const colorMap = {
  blue: 'bg-primary-400',
  emerald: 'bg-accent-emerald',
  coral: 'bg-accent-coral',
  rose: 'bg-accent-rose',
  violet: 'bg-accent-violet',
  warm: 'bg-accent-warm',
}

const DayCell = memo(function DayCell({ day, isCurrentMonth }) {
  const selectDate = useCalendarStore((state) => state.selectDate)
  const rangeStart = useCalendarStore((state) => state.rangeStart)
  const rangeEnd = useCalendarStore((state) => state.rangeEnd)
  const events = useCalendarStore((state) => state.events)

  const dateStr = format(day, 'yyyy-MM-dd')
  const dayNumber = format(day, 'd')
  const today = isToday(day)
  const weekend = isWeekend(day)
  const isStart = rangeStart && isSameDay(day, rangeStart)
  const isEnd = rangeEnd && isSameDay(day, rangeEnd)

  // Check if in range
  let inRange = false
  if (rangeStart && rangeEnd) {
    const start = rangeStart < rangeEnd ? rangeStart : rangeEnd
    const end = rangeEnd > rangeStart ? rangeEnd : rangeStart
    inRange = day >= start && day <= end && !isStart && !isEnd
  }

  const dayEvents = events.filter((e) => e.date === dateStr)
  const hasEvents = dayEvents.length > 0

  const handleClick = useCallback(() => {
    if (isCurrentMonth) {
      selectDate(day)
    }
  }, [day, isCurrentMonth, selectDate])

  return (
    <button
      id={`day-${dateStr}`}
      onClick={handleClick}
      disabled={!isCurrentMonth}
      className={cn(
        'relative flex flex-col items-center justify-center',
        'w-full aspect-square rounded-xl',
        'transition-all duration-200 ease-out',
        'text-sm font-medium cursor-pointer',
        'group',

        // Base states
        isCurrentMonth
          ? 'text-surface-700 dark:text-surface-200'
          : 'text-surface-300 dark:text-surface-600 cursor-default',

        // Weekend subtle tint
        weekend && isCurrentMonth && !isStart && !isEnd && !inRange &&
          'text-surface-500 dark:text-surface-400',

        // Hover (only for current month)
        isCurrentMonth && !isStart && !isEnd &&
          'hover:bg-surface-100 dark:hover:bg-surface-800/60 hover:scale-105',

        // Today
        today && !isStart && !isEnd &&
          'ring-2 ring-primary-400/40 dark:ring-primary-500/30 bg-primary-50/50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold',

        // Range start
        isStart &&
          'bg-primary-500 text-white font-bold shadow-lg shadow-primary-500/25 scale-105 ring-2 ring-primary-300/40',

        // Range end
        isEnd &&
          'bg-primary-500 text-white font-bold shadow-lg shadow-primary-500/25 scale-105 ring-2 ring-primary-300/40',

        // In range
        inRange && isCurrentMonth &&
          'bg-primary-100/70 dark:bg-primary-500/15 text-primary-700 dark:text-primary-300',
      )}
    >
      {/* Day number */}
      <span className="relative z-10 leading-none">{dayNumber}</span>

      {/* Event dots */}
      {hasEvents && isCurrentMonth && (
        <div className="flex gap-0.5 mt-0.5 absolute bottom-1.5">
          {dayEvents.slice(0, 3).map((event) => (
            <span
              key={event.id}
              className={cn(
                'w-1 h-1 rounded-full transition-all duration-200',
                isStart || isEnd ? 'bg-white/70' : colorMap[event.color] || 'bg-primary-400',
                'group-hover:scale-125',
              )}
            />
          ))}
        </div>
      )}

      {/* Today dot */}
      {today && !isStart && !isEnd && (
        <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary-500 dark:bg-primary-400" />
      )}
    </button>
  )
})

export default DayCell
