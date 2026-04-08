import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2, Calendar, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useCalendarStore from '@/stores/useCalendarStore'
import { cn } from '@/lib/utils'

const colorConfig = {
  blue: { dot: 'bg-primary-400', badge: 'bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400 border-primary-200/50 dark:border-primary-500/20' },
  emerald: { dot: 'bg-accent-emerald', badge: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20' },
  coral: { dot: 'bg-accent-coral', badge: 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/20' },
  rose: { dot: 'bg-accent-rose', badge: 'bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400 border-rose-200/50 dark:border-rose-500/20' },
  violet: { dot: 'bg-accent-violet', badge: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 border-violet-200/50 dark:border-violet-500/20' },
  warm: { dot: 'bg-accent-warm', badge: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20' },
}

const eventColors = ['blue', 'emerald', 'coral', 'rose', 'violet', 'warm']

export default function EventsPanel() {
  const rangeStart = useCalendarStore((state) => state.rangeStart)
  const addEvent = useCalendarStore((state) => state.addEvent)
  const deleteEvent = useCalendarStore((state) => state.deleteEvent)
  const getEventsForMonth = useCalendarStore((state) => state.getEventsForMonth)

  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newColor, setNewColor] = useState('blue')
  const [newDate, setNewDate] = useState('')

  const monthEvents = getEventsForMonth()

  const handleAdd = () => {
    const eventDate = newDate || (rangeStart ? format(rangeStart, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'))
    if (newTitle.trim()) {
      addEvent({
        title: newTitle.trim(),
        date: eventDate,
        color: newColor,
        type: 'custom',
      })
      setNewTitle('')
      setNewDate('')
      setShowForm(false)
    }
  }

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-500 dark:text-primary-400" />
          <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-200">
            Events
          </h3>
          {monthEvents.length > 0 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-500">
              {monthEvents.length}
            </span>
          )}
        </div>
        <Button
          id="add-event-toggle"
          variant="ghost"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="text-xs text-primary-500 dark:text-primary-400 
                     hover:bg-primary-50 dark:hover:bg-primary-500/10
                     rounded-lg h-7 px-2 gap-1 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="mb-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 animate-slide-down">
          <input
            id="event-title-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Event title..."
            className="w-full text-sm px-3 py-2 rounded-lg
                       bg-white dark:bg-surface-900 
                       border border-surface-200 dark:border-surface-700
                       text-surface-800 dark:text-surface-100
                       placeholder:text-surface-400
                       focus:outline-none focus:ring-2 focus:ring-primary-400/30 dark:focus:ring-primary-500/30
                       transition-all duration-200"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
          />

          <div className="flex items-center gap-2 mt-2">
            <input
              id="event-date-input"
              type="date"
              value={newDate || (rangeStart ? format(rangeStart, 'yyyy-MM-dd') : '')}
              onChange={(e) => setNewDate(e.target.value)}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg
                         bg-white dark:bg-surface-900 
                         border border-surface-200 dark:border-surface-700
                         text-surface-700 dark:text-surface-300
                         focus:outline-none focus:ring-2 focus:ring-primary-400/30
                         transition-all duration-200"
            />
          </div>

          {/* Color picker */}
          <div className="flex items-center gap-1.5 mt-2">
            {eventColors.map((color) => (
              <button
                key={color}
                onClick={() => setNewColor(color)}
                className={cn(
                  'w-5 h-5 rounded-full transition-all duration-200 cursor-pointer',
                  colorConfig[color].dot,
                  newColor === color
                    ? 'scale-125 ring-2 ring-offset-1 ring-surface-400 dark:ring-offset-surface-900'
                    : 'opacity-60 hover:opacity-100 hover:scale-110',
                )}
                aria-label={`Select ${color} color`}
              />
            ))}
            <Button
              id="save-event"
              variant="default"
              size="sm"
              onClick={handleAdd}
              disabled={!newTitle.trim()}
              className="ml-auto text-xs h-7 rounded-lg px-3 cursor-pointer"
            >
              Save
            </Button>
          </div>
        </div>
      )}

      {/* Events list */}
      {monthEvents.length > 0 ? (
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {monthEvents
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((event) => {
              const config = colorConfig[event.color] || colorConfig.blue
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl
                             hover:bg-surface-50 dark:hover:bg-surface-800/40
                             transition-all duration-200 group"
                >
                  <span className={cn('w-2 h-2 rounded-full flex-shrink-0', config.dot)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-surface-700 dark:text-surface-200 truncate font-medium">
                      {event.title}
                    </p>
                    <p className="text-[10px] text-surface-400 dark:text-surface-500 mt-0.5">
                      {format(new Date(event.date + 'T00:00:00'), 'MMM d')}
                    </p>
                  </div>
                  <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0 h-5 border', config.badge)}>
                    {event.type}
                  </Badge>
                  {event.type === 'custom' && (
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="opacity-0 group-hover:opacity-100 text-surface-400 hover:text-red-500
                                 transition-all duration-200 p-1 rounded cursor-pointer"
                      aria-label={`Delete ${event.title}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )
            })}
        </div>
      ) : (
        <p className="text-xs text-surface-400 dark:text-surface-500 text-center py-4 italic">
          No events this month
        </p>
      )}
    </div>
  )
}
