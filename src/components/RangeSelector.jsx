import { format } from 'date-fns'
import { X, CalendarRange } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCalendarStore from '@/stores/useCalendarStore'

export default function RangeSelector() {
  const rangeStart = useCalendarStore((state) => state.rangeStart)
  const rangeEnd = useCalendarStore((state) => state.rangeEnd)
  const clearSelection = useCalendarStore((state) => state.clearSelection)

  if (!rangeStart) return null

  return (
    <div className="mt-4 animate-slide-up">
      <div className="flex items-center justify-between px-4 py-3 rounded-xl
                      bg-primary-50/80 dark:bg-primary-500/10 
                      border border-primary-200/50 dark:border-primary-500/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-500/10 dark:bg-primary-500/20">
            <CalendarRange className="w-4 h-4 text-primary-500 dark:text-primary-400" />
          </div>
          <div>
            <p className="text-xs text-surface-500 dark:text-surface-400 font-medium">
              {rangeEnd ? 'Selected Range' : 'Select end date'}
            </p>
            <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">
              {format(rangeStart, 'MMM d')}
              {rangeEnd && (
                <span>
                  <span className="text-surface-400 mx-1.5">→</span>
                  {format(rangeEnd, 'MMM d, yyyy')}
                </span>
              )}
              {!rangeEnd && (
                <span className="text-surface-400 ml-1.5">
                  , {format(rangeStart, 'yyyy')}
                </span>
              )}
            </p>
          </div>
        </div>

        <Button
          id="clear-selection"
          variant="ghost"
          size="sm"
          onClick={clearSelection}
          className="text-surface-400 hover:text-red-500 dark:hover:text-red-400
                     hover:bg-red-50 dark:hover:bg-red-500/10
                     transition-all duration-200 rounded-lg h-8 w-8 p-0 cursor-pointer"
          aria-label="Clear selection"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
