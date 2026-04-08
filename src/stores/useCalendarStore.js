import { create } from 'zustand'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameDay,
  isBefore,
  isAfter,
  isWithinInterval,
} from 'date-fns'

// Default events for demo
const defaultEvents = [
  { id: '1', date: '2026-04-14', title: 'Ambedkar Jayanti', color: 'emerald', type: 'holiday' },
  { id: '2', date: '2026-04-21', title: 'Ram Navami', color: 'coral', type: 'holiday' },
  { id: '3', date: '2026-04-01', title: "April Fools' Day", color: 'violet', type: 'fun' },
  { id: '4', date: '2026-04-10', title: 'Team Standup', color: 'blue', type: 'meeting' },
  { id: '5', date: '2026-04-15', title: 'Project Review', color: 'blue', type: 'meeting' },
  { id: '6', date: '2026-04-22', title: 'Earth Day', color: 'emerald', type: 'holiday' },
  { id: '7', date: '2026-04-08', title: 'Sprint Planning', color: 'warm', type: 'meeting' },
  { id: '8', date: '2026-04-25', title: 'Design Review', color: 'violet', type: 'meeting' },
  { id: '9', date: '2026-05-01', title: "Workers' Day", color: 'emerald', type: 'holiday' },
  { id: '10', date: '2026-05-12', title: 'Mothers Day', color: 'rose', type: 'holiday' },
  { id: '11', date: '2026-03-17', title: "St. Patrick's Day", color: 'emerald', type: 'holiday' },
  { id: '12', date: '2026-01-26', title: 'Republic Day', color: 'coral', type: 'holiday' },
  { id: '13', date: '2026-08-15', title: 'Independence Day', color: 'coral', type: 'holiday' },
  { id: '14', date: '2026-12-25', title: 'Christmas', color: 'emerald', type: 'holiday' },
  { id: '15', date: '2026-10-02', title: 'Gandhi Jayanti', color: 'coral', type: 'holiday' },
]

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // Ignore storage errors
  }
}

const useCalendarStore = create((set, get) => ({
  // Current view
  currentDate: new Date(),
  animationDirection: 'right',

  // Selection
  rangeStart: null,
  rangeEnd: null,
  selectionPhase: 'start', // 'start' | 'end'

  // Notes (persisted)
  notes: loadFromStorage('calendar-notes', {}),

  // Events (persisted)
  events: loadFromStorage('calendar-events', defaultEvents),

  // Computed: get days for current month grid
  getCalendarDays: () => {
    const { currentDate } = get()
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  },

  // Navigation
  goToNextMonth: () =>
    set((state) => ({
      currentDate: addMonths(state.currentDate, 1),
      animationDirection: 'right',
    })),

  goToPrevMonth: () =>
    set((state) => ({
      currentDate: subMonths(state.currentDate, 1),
      animationDirection: 'left',
    })),

  goToToday: () =>
    set(() => ({
      currentDate: new Date(),
      animationDirection: 'right',
    })),

  // Date selection
  selectDate: (date) =>
    set((state) => {
      if (state.selectionPhase === 'start') {
        return { rangeStart: date, rangeEnd: null, selectionPhase: 'end' }
      } else {
        // If clicking before start, swap
        if (isBefore(date, state.rangeStart)) {
          return { rangeStart: date, rangeEnd: state.rangeStart, selectionPhase: 'start' }
        }
        return { rangeEnd: date, selectionPhase: 'start' }
      }
    }),

  clearSelection: () =>
    set({ rangeStart: null, rangeEnd: null, selectionPhase: 'start' }),

  // Check if date is in range
  isInRange: (date) => {
    const { rangeStart, rangeEnd } = get()
    if (!rangeStart || !rangeEnd) return false
    return isWithinInterval(date, {
      start: isBefore(rangeStart, rangeEnd) ? rangeStart : rangeEnd,
      end: isAfter(rangeEnd, rangeStart) ? rangeEnd : rangeStart,
    })
  },

  isRangeStart: (date) => {
    const { rangeStart } = get()
    return rangeStart && isSameDay(date, rangeStart)
  },

  isRangeEnd: (date) => {
    const { rangeEnd } = get()
    return rangeEnd && isSameDay(date, rangeEnd)
  },

  // Notes CRUD
  addNote: (dateKey, text) =>
    set((state) => {
      const updated = { ...state.notes }
      if (!updated[dateKey]) updated[dateKey] = []
      updated[dateKey] = [
        ...updated[dateKey],
        { id: Date.now().toString(), text, createdAt: new Date().toISOString() },
      ]
      saveToStorage('calendar-notes', updated)
      return { notes: updated }
    }),

  deleteNote: (dateKey, noteId) =>
    set((state) => {
      const updated = { ...state.notes }
      if (updated[dateKey]) {
        updated[dateKey] = updated[dateKey].filter((n) => n.id !== noteId)
        if (updated[dateKey].length === 0) delete updated[dateKey]
      }
      saveToStorage('calendar-notes', updated)
      return { notes: updated }
    }),

  // Events CRUD
  addEvent: (event) =>
    set((state) => {
      const updated = [...state.events, { ...event, id: Date.now().toString() }]
      saveToStorage('calendar-events', updated)
      return { events: updated }
    }),

  deleteEvent: (eventId) =>
    set((state) => {
      const updated = state.events.filter((e) => e.id !== eventId)
      saveToStorage('calendar-events', updated)
      return { events: updated }
    }),

  getEventsForDate: (dateStr) => {
    const { events } = get()
    return events.filter((e) => e.date === dateStr)
  },

  getEventsForMonth: () => {
    const { events, currentDate } = get()
    const monthStr = format(currentDate, 'yyyy-MM')
    return events.filter((e) => e.date.startsWith(monthStr))
  },
}))

export default useCalendarStore
