import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { t } from '../data/i18n'
import { exercises } from '../data/exercises'
import { routines } from '../data/routines'
import { plan30 } from '../data/plan'
import ExerciseIcon from '../components/ExerciseIcon'

function greeting(lang) {
  const h = new Date().getHours()
  const tx = t[lang].home
  if (h < 12) return tx.greeting_morning
  if (h < 20) return tx.greeting_afternoon
  return tx.greeting_evening
}

export default function Home() {
  const { lang, progress, isPro } = useApp()
  const navigate = useNavigate()
  const tx = t[lang].home

  const today = new Date().toISOString().split('T')[0]
  const isNewDay = progress.lastDate !== today
  const completedToday = isNewDay ? [] : progress.completedToday

  const freeExercises = exercises.filter(e => !e.pro)
  const totalCount = isPro ? exercises.length : freeExercises.length
  const doneCount = completedToday.length
  const allDone = doneCount >= totalCount

  // Plan: figure out today's routine
  const planStart = progress.history[0]?.date || today
  const startMs = new Date(planStart).getTime()
  const todayMs = new Date().setHours(0, 0, 0, 0)
  const daysPassed = Math.floor((todayMs - startMs) / 86400000)
  const currentPlanDay = Math.min(Math.max(daysPassed + 1, 1), 30)
  const todayPlan = plan30[currentPlanDay - 1]
  const todayRoutine = todayPlan?.routine ? routines.find(r => r.id === todayPlan.routine) : null

  const recommended = (isPro ? exercises : freeExercises)
    .filter(e => !completedToday.includes(e.id))
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">

      {/* Header */}
      <div className="mb-8">
        <p className="text-stone-500 text-sm font-light tracking-wide mb-1">{greeting(lang)}</p>
        <h1 className="text-3xl font-semibold text-stone-50 tracking-tight">FACEO</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-stone-900 rounded-2xl p-4 border border-stone-800/50">
          <div className="text-3xl font-light text-stone-50 mb-0.5">{progress.streak}</div>
          <div className="text-stone-500 text-xs uppercase tracking-widest">{tx.streak_days} {tx.streak}</div>
        </div>
        <div className="bg-stone-900 rounded-2xl p-4 border border-stone-800/50">
          <div className="text-3xl font-light text-stone-50 mb-0.5">
            {doneCount}<span className="text-stone-600 text-lg">/{totalCount}</span>
          </div>
          <div className="text-stone-500 text-xs uppercase tracking-widest">{tx.completed}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-stone-600 mb-2">
          <span>{tx.daily_goal}</span>
          <span>{Math.round((doneCount / totalCount) * 100)}%</span>
        </div>
        <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700"
            style={{ width: `${Math.min((doneCount / totalCount) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Today's plan routine */}
      {todayRoutine && !allDone && (
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-widest text-stone-600 mb-3">
            {lang === 'es' ? `Plan · Día ${currentPlanDay}` : `Plan · Day ${currentPlanDay}`}
          </p>
          <button
            onClick={() => {
              if (todayRoutine.pro && !isPro) { navigate('/plan'); return }
              navigate(`/routine/${todayRoutine.id}`)
            }}
            className="w-full bg-stone-900 border border-accent/20 rounded-2xl p-5 text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-stone-50 font-medium">{todayRoutine[lang].name}</span>
              <span className="text-stone-500 text-xs">{todayRoutine.durationMin} min</span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed mb-3">{todayRoutine[lang].subtitle}</p>
            <div className="flex items-center gap-1.5">
              <div className="h-1 flex-1 bg-accent/20 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full w-0" />
              </div>
              <span className="text-accent text-xs font-medium">
                {lang === 'es' ? 'Hacer ahora' : 'Do now'}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </div>
      )}

      {allDone ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full border border-accent/60 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-accent" />
            </div>
          </div>
          <h2 className="text-stone-50 text-xl font-medium mb-2">{tx.all_done}</h2>
          <p className="text-stone-500 text-sm">{tx.all_done_sub}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-stone-300 text-sm font-medium uppercase tracking-widest">{tx.recommended}</h2>
          </div>

          <div className="space-y-3">
            {recommended.map(ex => {
              const exData = ex[lang]
              const mins = Math.ceil(ex.durationSec / 60)
              return (
                <button
                  key={ex.id}
                  onClick={() => navigate(`/exercise/${ex.id}`)}
                  className="w-full bg-stone-900 border border-stone-800/50 rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center flex-shrink-0">
                    <ExerciseIcon type={ex.icon} size={22} color="#c9b99a" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-stone-50 font-medium text-sm mb-0.5">{exData.name}</div>
                    <div className="text-stone-500 text-xs">{exData.subtitle}</div>
                  </div>
                  <div className="text-stone-400 text-xs flex-shrink-0">{mins} min</div>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => navigate('/train')}
            className="mt-6 w-full border border-stone-800 text-stone-400 text-sm font-medium py-3.5 rounded-2xl active:bg-stone-900 transition-colors"
          >
            {lang === 'es' ? 'Ver todo' : 'See all'}
          </button>
        </>
      )}
    </div>
  )
}
