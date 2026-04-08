import CalendarHeader from '@/components/CalendarHeader'
import CalendarGrid from '@/components/CalendarGrid'
import RangeSelector from '@/components/RangeSelector'
import EventsPanel from '@/components/EventsPanel'
import NotesPanel from '@/components/NotesPanel'

export default function CalendarContainer() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Main calendar card */}
      <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-xl shadow-surface-900/5 dark:shadow-black/20
                      border border-surface-100 dark:border-surface-800
                      p-5 lg:p-6 flex-1 flex flex-col
                      transition-colors duration-300">
        
        {/* Header with nav */}
        <CalendarHeader />

        {/* Calendar grid */}
        <CalendarGrid />

        {/* Range selector */}
        <RangeSelector />

        {/* Divider */}
        <div className="my-4 border-t border-surface-100 dark:border-surface-800" />

        {/* Events */}
        <div className="flex-1 overflow-y-auto">
          <EventsPanel />
          <NotesPanel />
        </div>
      </div>
    </div>
  )
}
