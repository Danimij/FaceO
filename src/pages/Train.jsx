import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { routines } from '../data/routines'
import { exercises } from '../data/exercises'
import { CATEGORY_IMG, ROUTINE_IMG } from '../data/images'
import ExerciseIcon from '../components/ExerciseIcon'
import ProModal from '../components/ProModal'

export default function Train() {
  const { lang, isPro } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('routines')
  const [showPro, setShowPro] = useState(false)

  function handleRoutine(r) {
    if (r.pro && !isPro) { setShowPro(true); return }
    navigate(`/routine/${r.id}`)
  }

  function handleExercise(ex) {
    if (ex.pro && !isPro) { setShowPro(true); return }
    navigate(`/exercise/${ex.id}`)
  }

  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">
      <div className="px-5 pt-16 pb-5">
        <h1 className="text-3xl font-semibold text-warm tracking-tight">
          {lang === 'es' ? 'Entrenar' : 'Train'}
        </h1>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-5">
        <div className="flex gap-1 bg-card p-1 rounded-2xl border border-border">
          {['routines', 'exercises'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-medium rounded-xl transition-all ${
                tab === t ? 'bg-surface text-warm' : 'text-muted'
              }`}>
              {t === 'routines' ? (lang === 'es' ? 'Rutinas' : 'Routines') : (lang === 'es' ? 'Ejercicios' : 'Exercises')}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-3">
        {tab === 'routines' && routines.map(r => {
          const data = r[lang]
          const locked = r.pro && !isPro
          const img = ROUTINE_IMG[r.id]

          return (
            <button key={r.id} onClick={() => handleRoutine(r)}
              className="w-full rounded-2xl overflow-hidden border border-border text-left active:scale-[0.98] transition-transform">
              {/* Image header */}
              <div className="relative h-36">
                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"/>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-warm font-semibold">{data.name}</span>
                        {locked && <span className="text-[10px] font-medium tracking-wider uppercase bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-full">Pro</span>}
                      </div>
                      <p className="text-stone-300 text-xs">{data.subtitle}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-warm text-sm font-medium">{r.durationMin} min</div>
                      <div className="text-stone-400 text-xs">{r.exercises.length} {lang === 'es' ? 'ej.' : 'ex.'}</div>
                    </div>
                  </div>
                </div>
                {locked && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
              </div>
              {/* Exercise preview */}
              <div className="bg-card px-4 py-3 flex items-center gap-2">
                {r.exercises.map(eid => {
                  const ex = exercises.find(e => e.id === eid)
                  return ex ? (
                    <div key={eid} className="w-7 h-7 rounded-lg bg-surface border border-border flex items-center justify-center">
                      <ExerciseIcon type={ex.icon} category={ex.category} size={13}/>
                    </div>
                  ) : null
                })}
                <div className="ml-auto">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </button>
          )
        })}

        {tab === 'exercises' && exercises.map(ex => {
          const exData = ex[lang]
          const locked = ex.pro && !isPro
          const img = CATEGORY_IMG[ex.category]

          return (
            <button key={ex.id} onClick={() => handleExercise(ex)}
              className="w-full rounded-2xl overflow-hidden border border-border text-left active:scale-[0.98] transition-transform flex items-stretch h-20">
              <div className="relative w-24 flex-shrink-0">
                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/40"/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ExerciseIcon type={ex.icon} category={ex.category} size={22}/>
                </div>
              </div>
              <div className="flex-1 bg-card px-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-warm font-medium text-sm">{exData.name}</span>
                    {locked && <span className="text-[10px] font-medium uppercase bg-amber-900/30 text-amber-400 px-1.5 py-0.5 rounded-full">Pro</span>}
                  </div>
                  <div className="text-muted text-xs">{exData.subtitle}</div>
                </div>
                <div className="text-muted text-xs flex-shrink-0 ml-2">{Math.ceil(ex.durationSec / 60)} min</div>
              </div>
            </button>
          )
        })}

        {!isPro && (
          <button onClick={() => setShowPro(true)}
            className="w-full bg-gradient-to-r from-amber-950/40 to-card border border-amber-700/20 text-warm text-sm font-medium py-4 rounded-2xl active:scale-[0.98] transition-transform mt-2">
            {lang === 'es' ? 'Desbloquear Pro' : 'Unlock Pro'}
          </button>
        )}
      </div>

      {showPro && <ProModal onClose={() => setShowPro(false)}/>}
    </div>
  )
}
