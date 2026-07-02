import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import { routines } from '../data/routines'
import { plan30 } from '../data/plan'
import ExerciseIcon from '../components/ExerciseIcon'

function greeting(lang) {
  const h = new Date().getHours()
  if (lang === 'es') {
    if (h < 12) return 'Buenos días'
    if (h < 20) return 'Buenas tardes'
    return 'Buenas noches'
  }
  if (h < 12) return 'Good morning'
  if (h < 20) return 'Good afternoon'
  return 'Good evening'
}

const CAT_GRADIENT = {
  palate:   'from-amber-900/40 to-stone-900',
  jaw:      'from-orange-900/30 to-stone-900',
  posture:  'from-emerald-900/30 to-stone-900',
  breathing:'from-blue-900/30 to-stone-900',
  face:     'from-purple-900/30 to-stone-900',
}

export default function Home() {
  const { lang, progress, isPro } = useApp()
  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0]
  const isNewDay = progress.lastDate !== today
  const completedToday = isNewDay ? [] : progress.completedToday
  const freeExercises = exercises.filter(e => !e.pro)
  const totalCount = isPro ? exercises.length : freeExercises.length
  const doneCount = completedToday.length
  const pct = Math.min(Math.round((doneCount / totalCount) * 100), 100)

  const planStart = progress.history[0]?.date || today
  const daysPassed = Math.floor((new Date().setHours(0,0,0,0) - new Date(planStart).getTime()) / 86400000)
  const currentPlanDay = Math.min(Math.max(daysPassed + 1, 1), 30)
  const todayPlan = plan30[currentPlanDay - 1]
  const todayRoutine = todayPlan?.routine ? routines.find(r => r.id === todayPlan.routine) : null

  const recommended = (isPro ? exercises : freeExercises)
    .filter(e => !completedToday.includes(e.id))
    .slice(0, 3)

  const circumference = 2 * Math.PI * 26
  const dashOffset = circumference * (1 - pct / 100)

  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">

      {/* Hero header */}
      <div className="relative px-5 pt-16 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-900/8 blur-3xl pointer-events-none" />

        <p className="text-muted text-sm mb-1 relative">{greeting(lang)}</p>
        <h1 className="text-4xl font-semibold text-warm tracking-tight relative mb-6">FACEO</h1>

        {/* Ring + stats */}
        <div className="flex items-center gap-6 relative">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" fill="none" stroke="#1e1a14" strokeWidth="5"/>
              <circle cx="30" cy="30" r="26" fill="none" stroke="#c9a96e" strokeWidth="5"
                strokeDasharray={circumference} strokeDashoffset={dashOffset}
                strokeLinecap="round" className="transition-all duration-700"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-warm">{pct}%</span>
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <div className="text-2xl font-light text-warm">{progress.streak}</div>
              <div className="text-xs text-muted uppercase tracking-widest mt-0.5">
                {lang === 'es' ? 'racha' : 'streak'}
              </div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl font-light text-warm">{doneCount}<span className="text-muted text-base">/{totalCount}</span></div>
              <div className="text-xs text-muted uppercase tracking-widest mt-0.5">
                {lang === 'es' ? 'hoy' : 'today'}
              </div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl font-light text-warm">{currentPlanDay}</div>
              <div className="text-xs text-muted uppercase tracking-widest mt-0.5">
                {lang === 'es' ? 'día plan' : 'plan day'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6">

        {/* Today's plan routine */}
        {todayRoutine && doneCount < totalCount && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3">
              {lang === 'es' ? `Plan · Día ${currentPlanDay} de 30` : `Plan · Day ${currentPlanDay} of 30`}
            </p>
            <button
              onClick={() => {
                if (todayRoutine.pro && !isPro) { navigate('/plan'); return }
                navigate(`/routine/${todayRoutine.id}`)
              }}
              className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-950/60 to-card border border-accent/20 p-5 text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-warm font-semibold text-base mb-1">{todayRoutine[lang].name}</div>
                  <div className="text-muted text-xs">{todayRoutine[lang].subtitle}</div>
                </div>
                <div className="bg-accent/20 rounded-xl px-3 py-1.5 flex-shrink-0">
                  <span className="text-accent text-sm font-medium">{todayRoutine.durationMin} min</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent text-xs font-medium">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd"/>
                </svg>
                {lang === 'es' ? 'Comenzar rutina' : 'Start routine'}
              </div>
            </button>
          </div>
        )}

        {doneCount >= totalCount ? (
          <div className="flex flex-col items-center text-center py-10">
            <div className="w-20 h-20 rounded-full border border-accent/20 flex items-center justify-center mb-4 animate-ring-pulse">
              <div className="w-14 h-14 rounded-full border border-accent/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <h2 className="text-warm text-xl font-semibold mb-2">
              {lang === 'es' ? 'Todo completado' : 'All done'}
            </h2>
            <p className="text-muted text-sm">
              {lang === 'es' ? 'Vuelve mañana para mantener tu racha' : 'Come back tomorrow to keep your streak'}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3">
              {lang === 'es' ? 'Recomendados' : 'Recommended'}
            </p>
            <div className="space-y-2">
              {recommended.map(ex => {
                const exData = ex[lang]
                const grad = CAT_GRADIENT[ex.category] || 'from-stone-800 to-card'
                return (
                  <button
                    key={ex.id}
                    onClick={() => navigate(`/exercise/${ex.id}`)}
                    className={`w-full bg-gradient-to-r ${grad} border border-border rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center flex-shrink-0">
                      <ExerciseIcon type={ex.icon} category={ex.category} size={26} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-warm font-medium text-sm mb-0.5">{exData.name}</div>
                      <div className="text-muted text-xs">{exData.subtitle}</div>
                    </div>
                    <div className="text-muted text-xs flex-shrink-0">{Math.ceil(ex.durationSec / 60)} min</div>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => navigate('/train')}
              className="mt-4 w-full border border-border text-muted text-sm font-medium py-3.5 rounded-2xl active:bg-card transition-colors"
            >
              {lang === 'es' ? 'Ver todos' : 'See all'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
