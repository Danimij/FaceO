import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import { routines } from '../data/routines'
import { plan30 } from '../data/plan'
import { exerciseImg, HERO_IMG } from "../data/images"
import ExerciseIcon from '../components/ExerciseIcon'
import ProtocolModal from '../components/ProtocolModal'
import ProModal from '../components/ProModal'

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
  const { lang, progress, isPro, goal } = useApp()
  const navigate = useNavigate()
  const [showProtocol, setShowProtocol] = useState(false)
  const [showPro, setShowPro] = useState(false)

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
    .sort((a, b) => (b.category === goal ? 1 : 0) - (a.category === goal ? 1 : 0))
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
          <p className="text-accent/90 text-[11px] uppercase tracking-[0.2em] mt-1">
            {lang === 'es' ? 'De los pies a la cara' : 'From feet to face'}
          </p>
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

        {/* Premium combined protocol */}
        <button onClick={() => (isPro ? setShowProtocol(true) : setShowPro(true))}
          className="w-full text-left rounded-2xl p-4 border active:scale-[0.98] transition-transform"
          style={{ background: 'linear-gradient(135deg,#241d16,#1a150f)', borderColor: 'rgba(201,169,110,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5a.56.56 0 011.04 0l2.12 5.11a.56.56 0 00.48.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.38a.56.56 0 01-.84.61l-4.72-2.88a.56.56 0 00-.59 0l-4.72 2.88a.56.56 0 01-.84-.61l1.28-5.38a.56.56 0 00-.18-.56l-4.2-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.48-.35L11.48 3.5z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-accent mb-0.5">{lang === 'es' ? 'Premium · FACEO + INSPIRAPP' : 'Premium · FACEO + INSPIRAPP'}</div>
              <div className="text-warm font-semibold text-sm">{lang === 'es' ? 'Protocolo combinado del día' : 'Daily combined protocol'}</div>
              <div className="text-muted text-xs">{lang === 'es' ? 'Mañana, día y noche: cara, respiración, frío y mente' : 'Morning, day and night: face, breath, cold, mind'}</div>
            </div>
            {!isPro && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-accent flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 11V8a4 4 0 018 0v3" /><rect x="4" y="11" width="14" height="9" rx="2" />
              </svg>
            )}
          </div>
        </button>

        {/* Generador de rutinas */}
        <button onClick={() => navigate('/generate')}
          className="w-full text-left rounded-2xl overflow-hidden border border-border active:scale-[0.98] transition-transform flex items-center gap-3 bg-card p-4">
          <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center flex-shrink-0 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-6M4 10V4M12 20v-9M12 7V4M20 20v-4M20 12V4M1 14h6M9 7h6M17 16h6" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-accent mb-0.5">{lang === 'es' ? 'Generador' : 'Generator'}</div>
            <div className="text-warm font-semibold text-sm">{lang === 'es' ? 'Rutina a medida, nunca igual' : 'Custom routine, never the same'}</div>
            <div className="text-muted text-xs">{lang === 'es' ? 'Cadena miofascial completa: de los pies a la cara' : 'Full myofascial chain: from feet to face'}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-stone-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Academia */}
        <button onClick={() => navigate('/learn')}
          className="w-full text-left rounded-2xl overflow-hidden border border-border active:scale-[0.98] transition-transform flex items-center gap-3 bg-card p-4">
          <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center flex-shrink-0 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-accent mb-0.5">{lang === 'es' ? 'Academia' : 'Academy'}</div>
            <div className="text-warm font-semibold text-sm">{lang === 'es' ? 'La ciencia detrás de tu cara' : 'The science behind your face'}</div>
            <div className="text-muted text-xs">{lang === 'es' ? 'Mewing, masetero, fascia, respiración y más' : 'Mewing, masseter, fascia, breathing and more'}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-stone-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Curso completo */}
        <a href="curso.html" target="_blank" rel="noopener noreferrer"
          className="w-full text-left rounded-2xl overflow-hidden border active:scale-[0.98] transition-transform flex items-center gap-3 p-4"
          style={{ background: 'linear-gradient(135deg,#241d16,#1a150f)', borderColor: 'rgba(201,169,110,0.3)' }}>
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.28A1 1 0 0121 8.6v6.8a1 1 0 01-1.45.89L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-accent mb-0.5">{lang === 'es' ? 'Curso · 9 módulos' : 'Course · 9 modules'}</div>
            <div className="text-warm font-semibold text-sm">{lang === 'es' ? 'El método completo en 8 semanas' : 'The full method in 8 weeks'}</div>
            <div className="text-muted text-xs">{lang === 'es' ? 'Vídeo, retos semanales y comunidad' : 'Video, weekly challenges and community'}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-stone-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

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
                const img = exerciseImg(ex)
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
      {showProtocol && <ProtocolModal onClose={() => setShowProtocol(false)} />}
      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}