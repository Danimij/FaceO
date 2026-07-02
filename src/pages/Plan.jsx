import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { plan30, focusLabels } from '../data/plan'
import { routines } from '../data/routines'
import ProModal from '../components/ProModal'

const FOCUS_COLOR = {
  base:          { bg: 'bg-stone-700', ring: 'border-stone-600', dot: 'bg-stone-500', text: 'text-stone-400' },
  structure:     { bg: 'bg-stone-600', ring: 'border-stone-500', dot: 'bg-stone-400', text: 'text-stone-300' },
  intensity:     { bg: 'bg-amber-700', ring: 'border-amber-600/60', dot: 'bg-accent', text: 'text-accent' },
  consolidation: { bg: 'bg-amber-600', ring: 'border-amber-500/60', dot: 'bg-amber-400', text: 'text-amber-400' },
  rest:          { bg: 'bg-transparent', ring: 'border-stone-800', dot: 'bg-stone-800', text: 'text-stone-700' },
}

export default function Plan() {
  const { lang, isPro, progress } = useApp()
  const navigate = useNavigate()
  const [showPro, setShowPro] = useState(false)
  const [selected, setSelected] = useState(null)

  const planStart = progress.history[0]?.date || new Date().toISOString().split('T')[0]
  const daysPassed = Math.floor((new Date().setHours(0,0,0,0) - new Date(planStart).getTime()) / 86400000)
  const currentDay = Math.min(Math.max(daysPassed + 1, 1), 30)

  const selectedEntry = selected !== null ? plan30[selected - 1] : null
  const selectedRoutine = selectedEntry?.routine ? routines.find(r => r.id === selectedEntry.routine) : null

  function handleDayPress(entry) {
    if (entry.focus === 'rest') return
    setSelected(selected === entry.day ? null : entry.day)
  }

  function doRoutine() {
    if (!selectedRoutine) return
    if (selectedRoutine.pro && !isPro) { setShowPro(true); return }
    navigate(`/routine/${selectedRoutine.id}`)
  }

  const weeks = [1, 2, 3, 4]

  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">
      <div className="px-5 pt-16 pb-6">
        <h1 className="text-3xl font-semibold text-warm tracking-tight mb-1">
          {lang === 'es' ? 'Plan 30 días' : '30-day plan'}
        </h1>
        <p className="text-muted text-sm">
          {lang === 'es' ? `Día ${currentDay} de 30` : `Day ${currentDay} of 30`}
        </p>
      </div>

      {/* Overall progress */}
      <div className="px-5 mb-6">
        <div className="h-1.5 bg-card rounded-full overflow-hidden border border-border">
          <div className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-700"
            style={{ width: `${Math.min((currentDay / 30) * 100, 100)}%` }}/>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {weeks.map(week => {
          const weekDays = plan30.filter(d => d.week === week)
          const label = focusLabels[lang][weekDays[0]?.focus] || ''
          return (
            <div key={week}>
              <p className="text-xs uppercase tracking-widest text-muted mb-3">{label}</p>
              <div className="grid grid-cols-7 gap-1.5">
                {weekDays.map(entry => {
                  const isToday = entry.day === currentDay
                  const isDone = entry.day < currentDay
                  const isRest = entry.focus === 'rest'
                  const isSelected = selected === entry.day
                  const fc = FOCUS_COLOR[entry.focus] || FOCUS_COLOR.base
                  const routine = entry.routine ? routines.find(r => r.id === entry.routine) : null
                  const isProLocked = routine?.pro && !isPro

                  return (
                    <button key={entry.day} onClick={() => handleDayPress(entry)}
                      className={`relative flex flex-col items-center justify-center aspect-square rounded-xl border text-xs font-medium transition-all active:scale-95 ${
                        isRest ? 'border-stone-800 bg-transparent cursor-default'
                        : isSelected ? 'border-accent bg-accent/15 text-accent'
                        : isToday ? 'border-accent/50 bg-accent/10 text-warm shadow-[0_0_20px_rgba(201,169,110,0.12)]'
                        : isDone ? 'border-stone-700 bg-stone-800/30 text-stone-500'
                        : `border-stone-800 bg-card ${fc.text}`
                      }`}>
                      <span className={`text-[11px] ${isToday ? 'font-bold' : ''}`}>{entry.day}</span>
                      {!isRest && (
                        <div className={`w-1 h-1 rounded-full mt-0.5 ${isDone ? 'bg-accent' : fc.dot}`}/>
                      )}
                      {isRest && <span className="text-[8px] text-stone-800 mt-0.5">{lang === 'es' ? 'desc' : 'rest'}</span>}
                      {isProLocked && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 text-amber-600 absolute top-1 right-1">
                          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd"/>
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
          <div className="bg-gradient-to-br from-amber-950/30 to-card border border-accent/20 rounded-2xl p-5 animate-slide-up">
            <p className="text-[11px] uppercase tracking-widest text-accent mb-2">
              {lang === 'es' ? `Día ${selectedEntry.day}` : `Day ${selectedEntry.day}`}
            </p>
            <h3 className="text-warm font-semibold mb-1">{selectedRoutine[lang].name}</h3>
            <p className="text-muted text-xs mb-3">{selectedRoutine[lang].subtitle}</p>
            <div className="flex items-center gap-3 text-muted text-xs mb-4">
              <span>{selectedRoutine.durationMin} min</span>
              <span>·</span>
              <span>{selectedRoutine.exercises.length} {lang === 'es' ? 'ejercicios' : 'exercises'}</span>
            </div>
            <button onClick={doRoutine}
              className="w-full bg-accent font-semibold py-3.5 rounded-xl text-sm tracking-wide active:scale-95 transition-transform"
              style={{ color: '#080706' }}>
              {lang === 'es' ? 'Hacer ahora' : 'Do now'}
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 pb-2">
          {[
            { label: lang === 'es' ? 'Base' : 'Base', dot: 'bg-stone-500' },
            { label: lang === 'es' ? 'Estructura' : 'Structure', dot: 'bg-stone-400' },
            { label: lang === 'es' ? 'Intensidad' : 'Intensity', dot: 'bg-accent' },
            { label: lang === 'es' ? 'Consolidación' : 'Consolidation', dot: 'bg-amber-400' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.dot}`}/>
              <span className="text-muted text-xs">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}
