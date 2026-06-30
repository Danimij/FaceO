import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { t } from '../data/i18n'
import { exercises, categories } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'
import ProModal from '../components/ProModal'

export default function Exercises() {
  const { lang, isPro, progress } = useApp()
  const navigate = useNavigate()
  const tx = t[lang].exercises
  const [filter, setFilter] = useState('all')
  const [showPro, setShowPro] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const isNewDay = progress.lastDate !== today
  const completedToday = isNewDay ? [] : progress.completedToday

  const filtered = exercises.filter(e => {
    if (filter === 'free') return !e.pro
    if (filter === 'pro') return e.pro
    return true
  })

  function handleExercise(ex) {
    if (ex.pro && !isPro) {
      setShowPro(true)
    } else {
      navigate(`/exercise/${ex.id}`)
    }
  }

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-stone-50 tracking-tight mb-6">{tx.title}</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'free', 'pro'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
              filter === f
                ? 'bg-accent text-stone-950'
                : 'bg-stone-900 text-stone-500 border border-stone-800'
            }`}
          >
            {tx[f]}
          </button>
        ))}
      </div>

      {/* Exercise list */}
      <div className="space-y-2">
        {filtered.map(ex => {
          const exData = ex[lang]
          const mins = Math.ceil(ex.durationSec / 60)
          const done = completedToday.includes(ex.id)
          const locked = ex.pro && !isPro

          return (
            <button
              key={ex.id}
              onClick={() => handleExercise(ex)}
              className={`w-full rounded-2xl p-4 flex items-center gap-4 text-left transition-all active:scale-[0.98] border ${
                done
                  ? 'bg-stone-900/50 border-stone-800/30 opacity-60'
                  : 'bg-stone-900 border-stone-800/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                done ? 'bg-stone-800/50' : 'bg-stone-800'
              }`}>
                <ExerciseIcon
                  type={ex.icon}
                  size={22}
                  color={done ? '#44403c' : locked ? '#57534e' : categories[ex.category]?.color || '#c9b99a'}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`font-medium text-sm ${done ? 'text-stone-600' : 'text-stone-50'}`}>
                    {exData.name}
                  </span>
                  {locked && (
                    <span className="text-[10px] font-medium tracking-wider uppercase bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/20">
                      Pro
                    </span>
                  )}
                  {done && (
                    <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="text-stone-500 text-xs">{exData.subtitle}</div>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="text-stone-500 text-xs">{mins} min</div>
                {ex.reps && <div className="text-stone-600 text-xs">{ex.reps} {tx.reps}</div>}
              </div>
            </button>
          )
        })}
      </div>

      {!isPro && (
        <button
          onClick={() => setShowPro(true)}
          className="mt-6 w-full bg-gradient-to-r from-gold/20 to-accent/20 border border-gold/20 text-stone-200 text-sm font-medium py-4 rounded-2xl active:scale-[0.98] transition-transform"
        >
          {t[lang].home.pro_unlock}
        </button>
      )}

      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}
