import HeroImage from '@/components/HeroImage'
import CalendarContainer from '@/components/CalendarContainer'
import useThemeStore from '@/stores/useThemeStore'

function App() {
  // Subscribe to theme to trigger re-renders (CSS class is applied in the store)
  useThemeStore((state) => state.theme)

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Inter Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Main layout */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8 min-h-screen flex items-start lg:items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 animate-fade-in">
          
          {/* Left: Hero Image */}
          <div className="order-1 lg:order-1">
            <div className="lg:sticky lg:top-8">
              <HeroImage />

              {/* Subtle credit */}
              <p className="text-center text-[10px] text-surface-400 dark:text-surface-600 mt-3 font-medium tracking-wide">
                WALL CALENDAR — {new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* Right: Calendar + Notes */}
          <div className="order-2 lg:order-2">
            <CalendarContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
