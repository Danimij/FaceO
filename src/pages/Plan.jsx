import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { plan30, focusLabels } from '../data/plan'
import { routines } from '../data/routines'
import ProModal from '../components/ProModal'
import { useState } from 'react'

const WEEK_COLORS = {
  base:          'border-stone-700 bg-stone-900',
  structure:     'border-stone-600 bg-stone-900',
  intensity:     'border-accent/40 bg-stone-900',
  consolidation: 'border-gold/40 bg-stone-900',
  rest:          'border-stone-800 bg-stone-950',
}

const WEEK_DOT = {
  base:          'bg-stone-600',
  structure:     'bg-stone-500',
  intensity:     'bg-accent',
  consolidation: 'bg-gold',
  rest:          'bg-stone-800',
}

export default function Plan() {
  const { lang, isPro, progress } = useApp()
  const navigate = useNavigate()
  const [showPro, setShowPro] = useState(false)
  const [selected, setSelected] = useState(null)

  const planStart = progress.history[0]?.date || new Date().toISOString().split('T')[0]
  const startMs = new Date(planStart).getTime()
  const todayMs = new Date().setHours(0, 0, 0, 0)
  const daysPassed = Math.floor((todayMs - startMs) / 86400000)
  const currentDay = Math.min(Math.max(daysPassed + 1, 1), 30)

  const weeks = [1, 2, 3, 4]

  function handleDayPress(entry) {
    if (entry.focus === 'rest') return
    const routine = routines.find(r => r.id === entry.routine)
    if (!routine) return
    if (routine.pro && !isPro) { setShowPro(true); return }
    navigate(`/routine/${routine.id}`)
  }

  const selectedEntry = selected !== null ? plan30[selected - 1] : null
  const selectedRoutine = selectedEntry?.routine ? routines.find(r => r.id === selectedEntry.routine) : null

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-stone-50 tracking-tight mb-1">
          {lang === 'es' ? 'Plan 30 días' : '30-day plan'}
        </h1>
        <p className="text-stone-500 text-sm">
          {lang === 'es'
            ? `Día ${Math.min(currentDay, 30)} de 30`
            : `Day ${Math.min(currentDay, 30)} of 30`}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700"
            style={{ width: `${Math.min((currentDay / 30) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Calendar by week */}
      {weeks.map(week => {
        const weekDays = plan30.filter(d => d.week === week)
        const weekLabel = focusLabels[lang][weekDays[0]?.focus] || ''

        return (
          <div key={week} className="mb-6">
            <p className="text-[11px] uppercase tracking-widest text-stone-600 mb-3">{weekLabel}</p>
            <div className="grid grid-cols-7 gap-1.5">
              {weekDays.map(entry => {
                const isToday = entry.day === currentDay
                const isDone = entry.day < currentDay
                const isFuture = entry.day > currentDay
                const isRest = entry.focus === 'rest'
                const isSelected = selected === entry.day
                const routine = entry.routine ? routines.find(r => r.id === entry.routine) : null
                const isProLocked = routine?.pro && !isPro

                return (
                  <button
                    key={entry.day}
                    onClick={() => {
                      if (isRest) return
                      setSelected(isSelected ? null : entry.day)
                    }}
                    className={`relative flex flex-col items-center justify-center aspect-square rounded-xl border text-xs font-medium transition-all active:scale-95 ${
                      isRest
                        ? 'border-stone-800 bg-stone-950 cursor-default'
                        : isSelected
                        ? 'border-accent bg-accent/10 text-accent'
                        : isDone
                        ? 'border-stone-700 bg-stone-800/50 text-stone-500'
                        : isToday
                        ? 'border-accent/60 bg-accent/10 text-stone-100 shadow-[0_0_12px_rgba(201,185,154,0.15)]'
                        : isFuture
                        ? WEEK_COLORS[entry.focus] + ' text-stone-500'
                        : 'border-stone-700 bg-stone-900 text-stone-300'
                    }`}
                  >
                    <span className={`text-[11px] ${isToday ? 'font-semibold' : ''}`}>{entry.day}</span>
                    {!isRest && (
                      <div className={`w-1 h-1 rounded-full mt-0.5 ${
                        isDone ? 'bg-accent' : WEEK_DOT[entry.focus]
                      }`} />
                    )}
                    {isRest && <span className="text-[8px] text-stone-700 mt-0.5">{lang === 'es' ? 'desc' : 'rest'}</span>}
                    {isProLocked && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-gold/60 absolute top-1 right-1">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Selected day detail */}
      {selectedEntry && selectedRoutine && (
        <div className="mt-2 bg-stone-900 border border-stone-800/50 rounded-2xl p-5 animate-slide-up">
          <p className="text-[11px] uppercase tracking-widest text-accent mb-2">
            {lang === 'es' ? `Día ${selectedEntry.day}` : `Day ${selectedEntry.day}`}
          </p>
          <h3 className="text-stone-50 font-medium mb-1">{selectedRoutine[lang].name}</h3>
          <p className="text-stone-500 text-xs mb-4 leading-relaxed">{selectedRoutine[lang].subtitle}</p>
          <div className="flex items-center gap-4 text-stone-600 text-xs mb-4">
            <span>{selectedRoutine.durationMin} min</span>
            <span>·</span>
            <span>{selectedRoutine.exercises.length} {lang === 'es' ? 'ejercicios' : 'exercises'}</span>
          </div>
          <button
            onClick={() => handleDayPress(selectedEntry)}
            className="w-full bg-accent text-stone-950 font-semibold py-3.5 rounded-xl text-sm tracking-wide active:scale-95 transition-transform"
          >
            {lang === 'es' ? 'Hacer ahora' : 'Do now'}
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-4">
        {[
          { label: lang === 'es' ? 'Base' : 'Base', dot: 'bg-stone-600' },
          { label: lang === 'es' ? 'Estructura' : 'Structure', dot: 'bg-stone-500' },
          { label: lang === 'es' ? 'Intensidad' : 'Intensity', dot: 'bg-accent' },
          { label: lang === 'es' ? 'Consolidación' : 'Consolidation', dot: 'bg-gold' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${l.dot}`} />
            <span className="text-stone-600 text-xs">{l.label}</span>
          </div>
        ))}
      </div>

      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}
