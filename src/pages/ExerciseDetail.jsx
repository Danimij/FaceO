import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { t } from '../data/i18n'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function ExerciseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang, completeExercise } = useApp()
  const tx = t[lang].timer

  const ex = exercises.find(e => e.id === id)
  const [phase, setPhase] = useState('preview') // preview | active | done
  const [timeLeft, setTimeLeft] = useState(ex?.durationSec || 60)
  const [paused, setPaused] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  if (!ex) {
    navigate('/exercises', { replace: true })
    return null
  }

  const exData = ex[lang]
  const totalSec = ex.durationSec

  function startExercise() {
    setPhase('active')
    setTimeLeft(totalSec)
    intervalRef.current = setInterval(() => {
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
    if (paused) {
      intervalRef.current = setInterval(() => {
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
    } else {
      clearInterval(intervalRef.current)
    }
    setPaused(p => !p)
  }

  const progress = 1 - timeLeft / totalSec
  const circumference = 2 * Math.PI * 48

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-500 text-sm mb-8 active:text-stone-300 transition-colors w-fit"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {lang === 'es' ? 'Volver' : 'Back'}
      </button>

      {phase === 'preview' && (
        <>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center flex-shrink-0">
              <ExerciseIcon type={ex.icon} size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-stone-50 tracking-tight mb-1">{exData.name}</h1>
              <p className="text-stone-500 text-sm">{exData.subtitle}</p>
            </div>
          </div>

          <p className="text-stone-400 text-sm leading-relaxed mb-8">{exData.description}</p>

          <div className="mb-8">
            <h3 className="text-stone-500 text-xs uppercase tracking-widest mb-4">{lang === 'es' ? 'Pasos' : 'Steps'}</h3>
            <div className="space-y-3">
              {exData.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-5 h-5 rounded-full border border-stone-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] text-stone-600 font-medium">{i + 1}</span>
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {exData.tip && (
            <div className="bg-stone-900 border border-stone-800/50 rounded-2xl p-4 mb-8">
              <div className="text-[10px] uppercase tracking-widest text-accent mb-2">
                {lang === 'es' ? 'Consejo' : 'Tip'}
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">{exData.tip}</p>
            </div>
          )}

          <div className="flex items-center gap-4 text-stone-600 text-xs mb-8">
            <span>{Math.ceil(totalSec / 60)} min</span>
            {ex.reps && <span>· {ex.reps} {t[lang].exercises.reps}</span>}
          </div>

          <button
            onClick={startExercise}
            className="w-full bg-accent text-stone-950 font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
          >
            {t[lang].exercises.start}
          </button>
        </>
      )}

      {phase === 'active' && (
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-stone-50 text-xl font-medium mb-2">{exData.name}</h2>
          <p className="text-stone-500 text-sm mb-16">{paused ? tx.pause : tx.go}</p>

          {/* Circular timer */}
          <div className="relative w-40 h-40 mb-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#292524" strokeWidth="4" />
              <circle
                cx="56" cy="56" r="48" fill="none"
                stroke="#c9b99a" strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-light text-stone-50 tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full space-y-2 mb-12">
            {exData.steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  currentStep === i
                    ? 'bg-stone-800 text-stone-200'
                    : 'text-stone-600'
                }`}
              >
                <span className="text-stone-600 text-xs mr-2">{i + 1}.</span>
                {step}
              </button>
            ))}
          </div>

          <button
            onClick={togglePause}
            className="w-full border border-stone-700 text-stone-300 text-sm font-medium py-4 rounded-2xl active:bg-stone-900 transition-colors"
          >
            {paused ? tx.resume : tx.pause}
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center flex-1 justify-center text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center animate-ring-pulse">
              <div className="w-16 h-16 rounded-full border border-accent/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-stone-50 text-2xl font-semibold mb-3">{tx.done}</h2>
          <p className="text-stone-500 text-sm mb-2">{exData.name}</p>
          <p className="text-stone-600 text-xs mb-12">{Math.ceil(totalSec / 60)} min</p>

          {exData.tip && (
            <div className="bg-stone-900 border border-stone-800/50 rounded-2xl p-4 mb-8 text-left">
              <div className="text-[10px] uppercase tracking-widest text-accent mb-2">
                {lang === 'es' ? 'Recuerda' : 'Remember'}
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">{exData.tip}</p>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full bg-accent text-stone-950 font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform mb-3"
          >
            {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </button>
          <button
            onClick={() => navigate('/exercises')}
            className="w-full border border-stone-800 text-stone-400 text-sm py-4 rounded-2xl active:bg-stone-900 transition-colors"
          >
            {lang === 'es' ? 'Ver todos los ejercicios' : 'See all exercises'}
          </button>
        </div>
      )}
    </div>
  )
}
