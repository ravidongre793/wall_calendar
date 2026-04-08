import { useMemo } from 'react'
import { format } from 'date-fns'
import useCalendarStore from '@/stores/useCalendarStore'

const monthImages = {
  0: '❄️', 1: '💐', 2: '🌸', 3: '🌷', 4: '🌻', 5: '☀️',
  6: '🌊', 7: '🍃', 8: '🍂', 9: '🎃', 10: '🍁', 11: '🎄',
}

const monthQuotes = {
  0: 'New beginnings await',
  1: 'Love is in the air',
  2: 'Spring awakens softly',
  3: 'Bloom where you are planted',
  4: 'Sunshine and possibility',
  5: 'Embrace the warmth',
  6: 'Ocean of dreams',
  7: 'Golden afternoons',
  8: 'Harvest of memories',
  9: 'Crisp autumn magic',
  10: 'Gratitude fills the heart',
  11: 'Season of wonder',
}

export default function HeroImage() {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const month = currentDate.getMonth()
  const monthName = format(currentDate, 'MMMM')
  const year = format(currentDate, 'yyyy')

  const gradients = useMemo(() => [
    'from-rose-400/20 via-amber-300/20 to-orange-400/20',
    'from-pink-400/20 via-rose-300/20 to-red-400/20',
    'from-emerald-400/20 via-green-300/20 to-teal-400/20',
    'from-sky-400/20 via-blue-300/20 to-indigo-400/20',
    'from-yellow-400/20 via-amber-300/20 to-orange-400/20',
    'from-orange-400/20 via-red-300/20 to-rose-400/20',
    'from-cyan-400/20 via-blue-300/20 to-indigo-400/20',
    'from-lime-400/20 via-green-300/20 to-emerald-400/20',
    'from-amber-400/20 via-orange-300/20 to-red-400/20',
    'from-purple-400/20 via-violet-300/20 to-indigo-400/20',
    'from-orange-400/20 via-amber-300/20 to-yellow-400/20',
    'from-blue-400/20 via-indigo-300/20 to-violet-400/20',
  ], [])

  return (
    <div className="relative w-full h-full min-h-[320px] lg:min-h-[600px] rounded-2xl overflow-hidden group">
      {/* Main image */}
      <img
        src="/hero.png"
        alt={`${monthName} calendar artwork`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        loading="eager"
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[month]} mix-blend-overlay transition-all duration-500`} />

      {/* Dark overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Month emoji floating */}
      <div className="absolute top-6 right-6 text-4xl lg:text-5xl animate-fade-in drop-shadow-lg
                      transition-transform duration-300 group-hover:scale-110">
        {monthImages[month]}
      </div>

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <div className="animate-slide-up">
          <p className="text-white/60 text-xs lg:text-sm font-medium tracking-widest uppercase mb-1">
            {year}
          </p>
          <h1 className="text-white text-3xl lg:text-5xl font-bold tracking-tight leading-none mb-2">
            {monthName}
          </h1>
          <p className="text-white/70 text-sm lg:text-base font-light italic">
            {monthQuotes[month]}
          </p>
        </div>
      </div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
    </div>
  )
}
