import { create } from 'zustand'

const useThemeStore = create((set) => ({
  theme: (() => {
    try {
      const saved = localStorage.getItem('calendar-theme')
      if (saved) return saved
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    } catch {
      // Ignore storage errors
    }
    return 'light'
  })(),

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('calendar-theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      return { theme: next }
    }),

  setTheme: (theme) =>
    set(() => {
      localStorage.setItem('calendar-theme', theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
      return { theme }
    }),
}))

// Initialize on load
const initialTheme = useThemeStore.getState().theme
document.documentElement.classList.toggle('dark', initialTheme === 'dark')

export default useThemeStore
