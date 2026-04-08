import { Sun, Moon } from 'lucide-react'
import useThemeStore from '@/stores/useThemeStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl
                 bg-surface-100 dark:bg-surface-800 
                 hover:bg-surface-200 dark:hover:bg-surface-700
                 transition-all duration-300 ease-out
                 hover:shadow-md active:scale-95
                 group cursor-pointer"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <Sun
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ease-out
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
        />
        {/* Moon icon */}
        <Moon
          className={`absolute inset-0 w-5 h-5 text-primary-300 transition-all duration-300 ease-out
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
        />
      </div>

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-xl ring-0 ring-primary-400/0 group-hover:ring-2 group-hover:ring-primary-400/20 transition-all duration-300" />
    </button>
  )
}
