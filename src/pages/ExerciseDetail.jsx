import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'

function formatTime(s) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

const CAT_GRADIENT = {
  palate:   'from-amber-950/50',
  jaw:      'from-orange-950/40',
  posture:  'from-emerald-950/40',
  breathing:'from-blue-950/40',
  face:     'from-purple-950/40',
}

export default function ExerciseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang, completeExercise } = useApp()

  const ex = exercises.find(e => e.id === id)
  const [phase, setPhase] = useState('preview')
  const [timeLeft, setTimeLeft] = useState(ex?.durationSec || 60)
  const [paused, setPaused] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const intervalRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => () => clearInterval(intervalRef.current), [])

  if (!ex) { navigate('/train', { replace: true }); return null }

  const exData = ex[lang]
  const totalSec = ex.durationSec
  const grad = CAT_GRADIENT[ex.category] || 'from-stone-900/50'
  const circumference = 2 * Math.PI * 52
  const timerProgress = 1 - timeLeft / totalSec

  function startExercise() {
    setPhase('active')
    setTimeLeft(totalSec)
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setPhase('done')
          completeExercise(ex.id, Math.ceil(totalSec / 60))
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function togglePause() {
    pausedRef.current = !pausedRef.current
    setPaused(p => !p)
  }

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Gradient top */}
      <div className={`absolute top-0 left-0 right-0 h-64 bg-gradient-to-b ${grad} to-transparent pointer-events-none`} />

      <div className="relative px-5 pt-14 pb-24 flex flex-col flex-1 max-w-lg mx-auto w-full">
        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted text-sm mb-8 active:text-warm transition-colors w-fit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          {lang === 'es' ? 'Volver' : 'Back'}
        </button>

        {/* PREVIEW */}
        {phase === 'preview' && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center flex-shrink-0">
                <ExerciseIcon type={ex.icon} category={ex.category} size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-warm tracking-tight mb-1">{exData.name}</h1>
                <p className="text-muted text-sm">{exData.subtitle}</p>
              </div>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed mb-7">{exData.description}</p>

            <div className="mb-7">
              <p className="text-xs uppercase tracking-widest text-muted mb-4">{lang === 'es' ? 'Cómo hacerlo' : 'How to do it'}</p>
              <div className="space-y-3">
                {exData.steps.map((step, i) => (
                  <div key={i} className="flex gap-3 bg-card border border-border rounded-xl p-3">
                    <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] text-muted font-semibold">{i + 1}</span>
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {exData.tip && (
              <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-4 mb-7">
                <div className="text-[10px] uppercase tracking-widest text-accent mb-2">{lang === 'es' ? 'Clave' : 'Key insight'}</div>
                <p className="text-stone-300 text-sm leading-relaxed">{exData.tip}</p>
              </div>
            )}

            <div className="flex items-center gap-3 text-muted text-xs mb-7">
              <span className="bg-card border border-border rounded-full px-3 py-1.5">{Math.ceil(totalSec / 60)} min</span>
              {ex.reps && <span className="bg-card border border-border rounded-full px-3 py-1.5">{ex.reps} {lang === 'es' ? 'repeticiones' : 'reps'}</span>}
            </div>

            <button onClick={startExercise}
              className="w-full bg-accent text-base font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
              style={{ color: '#080706' }}>
              {lang === 'es' ? 'Comenzar ejercicio' : 'Start exercise'}
            </button>
          </>
        )}

        {/* ACTIVE */}
        {phase === 'active' && (
          <div className="flex flex-col items-center flex-1">
            <h2 className="text-warm text-lg font-medium mb-1">{exData.name}</h2>
            <p className="text-muted text-sm mb-12">{paused ? (lang === 'es' ? 'En pausa' : 'Paused') : (lang === 'es' ? 'En progreso' : 'In progress')}</p>

            <div className="relative w-48 h-48 mb-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#1e1a14" strokeWidth="6"/>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#c9a96e" strokeWidth="6"
                  strokeDasharray={circumference} strokeDashoffset={circumference * (1 - timerProgress)}
                  strokeLinecap="round" className="transition-all duration-1000"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-light text-warm tabular-nums">{formatTime(timeLeft)}</span>
                <span className="text-muted text-xs mt-1">{lang === 'es' ? 'restante' : 'remaining'}</span>
              </div>
            </div>

            <div className="w-full space-y-2 mb-10">
              {exData.steps.map((step, i) => (
                <button key={i} onClick={() => setCurrentStep(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                    currentStep === i ? 'bg-card border-border text-stone-200' : 'border-transparent text-muted'
                  }`}>
                  <span className="text-muted text-xs mr-2">{i + 1}.</span>{step}
                </button>
              ))}
            </div>

            <button onClick={togglePause}
              className="w-full border border-border text-stone-300 text-sm font-medium py-4 rounded-2xl active:bg-card transition-colors">
              {paused ? (lang === 'es' ? 'Continuar' : 'Resume') : (lang === 'es' ? 'Pausar' : 'Pause')}
            </button>
          </div>
        )}

        {/* DONE */}
        {phase === 'done' && (
          <div className="flex flex-col items-center flex-1 justify-center text-center">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full border border-accent/15 flex items-center justify-center animate-ring-pulse">
                <div className="w-20 h-20 rounded-full border border-accent/30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-warm text-2xl font-semibold mb-2">{lang === 'es' ? 'Completado' : 'Complete'}</h2>
            <p className="text-muted text-sm mb-1">{exData.name}</p>
            <p className="text-stone-600 text-xs mb-3">{Math.ceil(totalSec / 60)} min</p>

            {exData.tip && (
              <div className="bg-card border border-border rounded-2xl p-4 mb-8 text-left">
                <div className="text-[10px] uppercase tracking-widest text-accent mb-2">{lang === 'es' ? 'Recuerda' : 'Remember'}</div>
                <p className="text-stone-400 text-sm leading-relaxed">{exData.tip}</p>
              </div>
            )}

            <button onClick={() => navigate('/')}
              className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform mb-3"
              style={{ color: '#080706' }}>
              {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
            </button>
            <button onClick={() => navigate('/train')}
              className="w-full border border-border text-muted text-sm py-4 rounded-2xl active:bg-card transition-colors">
              {lang === 'es' ? 'Ver todos los ejercicios' : 'See all exercises'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
