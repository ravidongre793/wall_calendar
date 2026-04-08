import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2, StickyNote, Send } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import useCalendarStore from '@/stores/useCalendarStore'

export default function NotesPanel() {
  const rangeStart = useCalendarStore((state) => state.rangeStart)
  const rangeEnd = useCalendarStore((state) => state.rangeEnd)
  const notes = useCalendarStore((state) => state.notes)
  const addNote = useCalendarStore((state) => state.addNote)
  const deleteNote = useCalendarStore((state) => state.deleteNote)
  const currentDate = useCalendarStore((state) => state.currentDate)

  const [noteText, setNoteText] = useState('')

  // Determine the date key for notes
  const dateKey = useMemo(() => {
    if (rangeStart && rangeEnd) {
      return `${format(rangeStart, 'yyyy-MM-dd')}_${format(rangeEnd, 'yyyy-MM-dd')}`
    }
    if (rangeStart) {
      return format(rangeStart, 'yyyy-MM-dd')
    }
    return format(currentDate, 'yyyy-MM')
  }, [rangeStart, rangeEnd, currentDate])

  const label = useMemo(() => {
    if (rangeStart && rangeEnd) {
      return `${format(rangeStart, 'MMM d')} → ${format(rangeEnd, 'MMM d')}`
    }
    if (rangeStart) {
      return format(rangeStart, 'MMMM d, yyyy')
    }
    return format(currentDate, 'MMMM yyyy')
  }, [rangeStart, rangeEnd, currentDate])

  // Also gather all notes for current month
  const monthStr = format(currentDate, 'yyyy-MM')
  const allMonthNotes = useMemo(() => {
    return Object.entries(notes)
      .filter(([key]) => key.startsWith(monthStr))
      .flatMap(([key, noteList]) =>
        noteList.map((note) => ({ ...note, dateKey: key }))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [notes, monthStr])

  const handleAdd = () => {
    if (noteText.trim()) {
      addNote(dateKey, noteText.trim())
      setNoteText('')
    }
  }

  return (
    <div className="mt-5 pt-5 border-t border-surface-200 dark:border-surface-800">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <StickyNote className="w-4 h-4 text-accent-warm" />
        <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-200">
          Notes
        </h3>
        <span className="text-[10px] text-surface-400 dark:text-surface-500 font-medium">
          — {label}
        </span>
      </div>

      {/* Input area */}
      <div className="relative mb-3">
        <Textarea
          id="note-input"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a note..."
          className="min-h-[72px] resize-none text-sm rounded-xl pr-12
                     bg-surface-50 dark:bg-surface-800/50
                     border-surface-200 dark:border-surface-700
                     focus:ring-2 focus:ring-primary-400/20 dark:focus:ring-primary-500/20
                     placeholder:text-surface-400 
                     transition-all duration-200"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              handleAdd()
            }
          }}
        />
        <Button
          id="add-note"
          variant="ghost"
          size="sm"
          onClick={handleAdd}
          disabled={!noteText.trim()}
          className="absolute bottom-2 right-2 h-8 w-8 p-0 rounded-lg
                     text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10
                     disabled:opacity-30 transition-all duration-200 cursor-pointer"
          aria-label="Add note"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Notes list */}
      {allMonthNotes.length > 0 ? (
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {allMonthNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-start gap-3 px-3 py-2.5 rounded-xl
                         bg-surface-50 dark:bg-surface-800/30
                         border border-surface-100 dark:border-surface-800
                         hover:border-surface-200 dark:hover:border-surface-700
                         transition-all duration-200 group animate-scale-in"
            >
              <div className="w-1 h-full min-h-[20px] rounded-full bg-accent-warm/40 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-surface-700 dark:text-surface-200 leading-relaxed">
                  {note.text}
                </p>
                <p className="text-[10px] text-surface-400 dark:text-surface-500 mt-1">
                  {note.dateKey.includes('_')
                    ? note.dateKey.split('_').map(d => format(new Date(d + 'T00:00:00'), 'MMM d')).join(' → ')
                    : note.dateKey.length === 10
                      ? format(new Date(note.dateKey + 'T00:00:00'), 'MMM d')
                      : format(new Date(note.dateKey + '-01'), 'MMM yyyy')
                  }
                </p>
              </div>
              <button
                onClick={() => deleteNote(note.dateKey, note.id)}
                className="opacity-0 group-hover:opacity-100 text-surface-400 hover:text-red-500
                           transition-all duration-200 p-1 rounded flex-shrink-0 cursor-pointer"
                aria-label="Delete note"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-surface-400 dark:text-surface-500 text-center py-3 italic">
          No notes yet — select a date and start writing
        </p>
      )}
    </div>
  )
}
