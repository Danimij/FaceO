import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { routines } from '../data/routines'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'
import ProModal from '../components/ProModal'

const CAT_COLOR = {
  palate:   '#c9a96e',
  jaw:      '#a08060',
  posture:  '#7a9a8a',
  breathing:'#6a8aaa',
  face:     '#9a7a9a',
}

const CAT_BG = {
  palate:   'from-amber-900/30',
  jaw:      'from-orange-900/25',
  posture:  'from-emerald-900/25',
  breathing:'from-blue-900/25',
  face:     'from-purple-900/25',
}

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

      {/* Header */}
      <div className="px-5 pt-16 pb-6">
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
                tab === t ? 'bg-surface text-warm shadow-sm' : 'text-muted'
              }`}>
              {t === 'routines' ? (lang === 'es' ? 'Rutinas' : 'Routines') : (lang === 'es' ? 'Ejercicios' : 'Exercises')}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-3">
        {tab === 'routines' && (
          <>
            {routines.map(r => {
              const data = r[lang]
              const locked = r.pro && !isPro
              const firstEx = exercises.find(e => e.id === r.exercises[0])
              const grad = firstEx ? CAT_BG[firstEx.category] : 'from-stone-800/30'

              return (
                <button key={r.id} onClick={() => handleRoutine(r)}
                  className={`w-full bg-gradient-to-br ${grad} to-card border border-border rounded-2xl p-5 text-left active:scale-[0.98] transition-transform`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-warm font-semibold">{data.name}</span>
                        {locked && (
                          <span className="text-[10px] font-medium tracking-wider uppercase bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full border border-amber-700/30">Pro</span>
                        )}
                      </div>
                      <p className="text-muted text-xs leading-relaxed">{data.subtitle}</p>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <div className="text-warm text-sm font-medium">{r.durationMin} min</div>
                      <div className="text-muted text-xs">{r.exercises.length} {lang === 'es' ? 'ej.' : 'ex.'}</div>
                    </div>
                  </div>
                  {/* Exercise preview dots */}
                  <div className="flex gap-1.5">
                    {r.exercises.map(eid => {
                      const ex = exercises.find(e => e.id === eid)
                      return ex ? (
                        <div key={eid} className="w-7 h-7 rounded-lg bg-black/30 flex items-center justify-center">
                          <ExerciseIcon type={ex.icon} category={ex.category} size={14} />
                        </div>
                      ) : null
                    })}
                  </div>
                </button>
              )
            })}
          </>
        )}

        {tab === 'exercises' && exercises.map(ex => {
          const exData = ex[lang]
          const locked = ex.pro && !isPro
          const color = CAT_COLOR[ex.category] || '#c9a96e'
          const grad = CAT_BG[ex.category] || 'from-stone-800/20'

          return (
            <button key={ex.id} onClick={() => handleExercise(ex)}
              className={`w-full bg-gradient-to-r ${grad} to-card border border-border rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform`}>
              <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center flex-shrink-0">
                <ExerciseIcon type={ex.icon} category={ex.category} size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-warm font-medium text-sm">{exData.name}</span>
                  {locked && <span className="text-[10px] font-medium tracking-wider uppercase bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full border border-amber-700/30">Pro</span>}
                </div>
                <div className="text-muted text-xs">{exData.subtitle}</div>
              </div>
              <div className="text-muted text-xs flex-shrink-0">{Math.ceil(ex.durationSec / 60)} min</div>
            </button>
          )
        })}

        {!isPro && (
          <button onClick={() => setShowPro(true)}
            className="w-full bg-gradient-to-r from-amber-950/40 to-card border border-amber-700/20 text-warm text-sm font-medium py-4 rounded-2xl active:scale-[0.98] transition-transform mt-2">
            {lang === 'es' ? 'Desbloquear Pro — todos los ejercicios' : 'Unlock Pro — all exercises'}
          </button>
        )}
      </div>

      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}
