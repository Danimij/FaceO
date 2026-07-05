import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import { routines } from '../data/routines'
import { plan30 } from '../data/plan'
import { EXERCISE_IMG, HERO_IMG } from "../data/images"
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

      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img src={HERO_IMG} alt="" fetchpriority="high" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-base" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
          <p className="text-stone-300 text-sm mb-1">{greeting(lang)}</p>
          <h1 className="text-4xl font-semibold text-warm tracking-tight">FACEO</h1>
        </div>
      </div>

      <div className="px-5 -mt-1 space-y-6">

        {/* Stats row */}
        <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4">
          {/* Ring */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" fill="none" stroke="#1e1a14" strokeWidth="5"/>
              <circle cx="30" cy="30" r="26" fill="none" stroke="#c9a96e" strokeWidth="5"
                strokeDasharray={circumference} strokeDashoffset={dashOffset}
                strokeLinecap="round" className="transition-all duration-700"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-warm">{pct}%</span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            {[
              { val: progress.streak, label: lang === 'es' ? 'racha' : 'streak' },
              { val: `${doneCount}/${totalCount}`, label: lang === 'es' ? 'hoy' : 'today' },
              { val: currentPlanDay, label: lang === 'es' ? 'día plan' : 'plan day' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl font-light text-warm">{val}</div>
                <div className="text-[10px] text-muted uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

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
              className="w-full rounded-2xl overflow-hidden border border-border text-left active:scale-[0.98] transition-transform">
              <div className="relative h-32">
                <img
                  src="https://picsum.photos/id/417/700/400"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"/>
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="text-warm font-semibold mb-0.5">{todayRoutine[lang].name}</div>
                  <div className="text-stone-300 text-xs">{todayRoutine[lang].subtitle}</div>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-warm">
                  {todayRoutine.durationMin} min
                </div>
              </div>
              <div className="bg-card px-4 py-3 flex items-center justify-between">
                <span className="text-accent text-xs font-medium">{lang === 'es' ? 'Comenzar ahora' : 'Start now'}</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd"/>
                </svg>
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
            <h2 className="text-warm text-xl font-semibold mb-2">{lang === 'es' ? 'Todo completado' : 'All done'}</h2>
            <p className="text-muted text-sm">{lang === 'es' ? 'Vuelve mañana para mantener tu racha' : 'Come back tomorrow to keep your streak'}</p>
          </div>
        ) : (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-3">{lang === 'es' ? 'Recomendados' : 'Recommended'}</p>
            <div className="space-y-2">
              {recommended.map(ex => {
                const exData = ex[lang]
                const img = EXERCISE_IMG[ex.id]
                return (
                  <button
                    key={ex.id}
                    onClick={() => navigate(`/exercise/${ex.id}`)}
                    className="w-full rounded-2xl overflow-hidden border border-border text-left active:scale-[0.98] transition-transform flex items-stretch h-20">
                    <div className="relative w-20 flex-shrink-0">
                      <img src={img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-black/10"/>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ExerciseIcon type={ex.icon} category={ex.category} size={22}/>
                      </div>
                    </div>
                    <div className="flex-1 bg-card px-4 flex items-center justify-between">
                      <div>
                        <div className="text-warm font-medium text-sm mb-0.5">{exData.name}</div>
                        <div className="text-muted text-xs">{exData.subtitle}</div>
                      </div>
                      <div className="text-muted text-xs flex-shrink-0 ml-2">{Math.ceil(ex.durationSec / 60)} min</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <button onClick={() => navigate('/train')}
              className="mt-4 w-full border border-border text-muted text-sm font-medium py-3.5 rounded-2xl active:bg-card transition-colors">
              {lang === 'es' ? 'Ver todos' : 'See all'}
            </button>
          </div>
        )}
        {/* Cross-promo INSPIRAPP */}
        <a href="https://danimij.github.io/Respirapp/" target="_blank" rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden border border-border active:scale-[0.98] transition-transform">
          <div className="relative h-24">
            <img src="https://picsum.photos/id/137/700/300" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent"/>
            <div className="absolute inset-0 flex items-center px-5 gap-4">
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-widest text-emerald-400 mb-1">{lang === 'es' ? 'Del mismo equipo' : 'From the same team'}</div>
                <div className="text-warm font-semibold text-sm">INSPIRAPP</div>
                <div className="text-stone-400 text-xs">{lang === 'es' ? 'Respiración · Biohacking · Hábitos' : 'Breathing · Biohacking · Habits'}</div>
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400">
                  <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
