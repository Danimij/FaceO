import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { routines } from '../data/routines'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'
import ProModal from '../components/ProModal'

export default function Train() {
  const { lang, isPro } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('routines')
  const [showPro, setShowPro] = useState(false)

  const freeRoutines = routines.filter(r => !r.pro)
  const proRoutines = routines.filter(r => r.pro)

  function handleRoutine(r) {
    if (r.pro && !isPro) { setShowPro(true); return }
    navigate(`/routine/${r.id}`)
  }

  function handleExercise(ex) {
    if (ex.pro && !isPro) { setShowPro(true); return }
    navigate(`/exercise/${ex.id}`)
  }

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-stone-50 tracking-tight mb-6">
        {lang === 'es' ? 'Entrenar' : 'Train'}
      </h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-stone-900 p-1 rounded-xl mb-6 border border-stone-800/50">
        {['routines', 'exercises'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
              tab === t ? 'bg-stone-700 text-stone-100' : 'text-stone-500'
            }`}
          >
            {t === 'routines'
              ? (lang === 'es' ? 'Rutinas' : 'Routines')
              : (lang === 'es' ? 'Ejercicios' : 'Exercises')}
          </button>
        ))}
      </div>

      {/* ─── ROUTINES TAB ─── */}
      {tab === 'routines' && (
        <div className="space-y-3">
          {/* Free */}
          {freeRoutines.map(r => <RoutineCard key={r.id} routine={r} lang={lang} onPress={() => handleRoutine(r)} />)}

          {/* Pro section */}
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-widest text-stone-600 mb-3 px-1">
              {lang === 'es' ? 'Pro — Avanzado' : 'Pro — Advanced'}
            </p>
            {proRoutines.map(r => (
              <div key={r.id} className="mb-3">
                <RoutineCard routine={r} lang={lang} onPress={() => handleRoutine(r)} locked={!isPro} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── EXERCISES TAB ─── */}
      {tab === 'exercises' && (
        <div className="space-y-2">
          {exercises.map(ex => {
            const exData = ex[lang]
            const locked = ex.pro && !isPro
            return (
              <button
                key={ex.id}
                onClick={() => handleExercise(ex)}
                className="w-full bg-stone-900 border border-stone-800/50 rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center flex-shrink-0">
                  <ExerciseIcon type={ex.icon} size={22} color={locked ? '#44403c' : '#c9b99a'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-stone-50 font-medium text-sm">{exData.name}</span>
                    {locked && (
                      <span className="text-[10px] font-medium tracking-wider uppercase bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/20">Pro</span>
                    )}
                  </div>
                  <div className="text-stone-500 text-xs">{exData.subtitle}</div>
                </div>
                <div className="text-stone-500 text-xs flex-shrink-0">{Math.ceil(ex.durationSec / 60)} min</div>
              </button>
            )
          })}
        </div>
      )}

      {!isPro && (
        <button
          onClick={() => setShowPro(true)}
          className="mt-6 w-full bg-gradient-to-r from-gold/10 to-accent/10 border border-gold/20 text-stone-200 text-sm font-medium py-4 rounded-2xl active:scale-[0.98] transition-transform"
        >
          {lang === 'es' ? 'Desbloquear Pro' : 'Unlock Pro'}
        </button>
      )}

      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}

function RoutineCard({ routine, lang, onPress, locked }) {
  const data = routine[lang]
  const exCount = routine.exercises.length
  return (
    <button
      onClick={onPress}
      className="w-full bg-stone-900 border border-stone-800/50 rounded-2xl p-5 text-left active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-stone-50 font-medium">{data.name}</span>
            {locked && (
              <span className="text-[10px] font-medium tracking-wider uppercase bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/20">Pro</span>
            )}
          </div>
          <p className="text-stone-500 text-xs">{data.subtitle}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <div className="text-stone-400 text-sm font-light">{routine.durationMin} min</div>
          <div className="text-stone-600 text-xs">{exCount} {lang === 'es' ? 'ej.' : 'ex.'}</div>
        </div>
      </div>
      <p className="text-stone-600 text-xs leading-relaxed line-clamp-2">{data.description}</p>
    </button>
  )
}
