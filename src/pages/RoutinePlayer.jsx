import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { routines } from '../data/routines'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const REST_SEC = 10

export default function RoutinePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang, completeExercise } = useApp()

  const routine = routines.find(r => r.id === id)
  const routineExercises = routine ? routine.exercises.map(eid => exercises.find(e => e.id === eid)).filter(Boolean) : []

  const [phase, setPhase] = useState('preview')   // preview | exercise | rest | done
  const [exIndex, setExIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => () => clearInterval(intervalRef.current), [])

  if (!routine) {
    navigate('/train', { replace: true })
    return null
  }

  const currentEx = routineExercises[exIndex]
  const isLast = exIndex === routineExercises.length - 1
  const routineData = routine[lang]
  const progress = exIndex / routineExercises.length

  function tick(duration, onEnd) {
    clearInterval(intervalRef.current)
    setTimeLeft(duration)
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onEnd()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function startRoutine() {
    setPhase('exercise')
    setExIndex(0)
    const ex = routineExercises[0]
    tick(ex.durationSec, () => finishExercise(0))
  }

  function finishExercise(idx) {
    const ex = routineExercises[idx]
    completeExercise(ex.id, Math.ceil(ex.durationSec / 60))
    const next = idx + 1
    if (next >= routineExercises.length) {
      setPhase('done')
    } else {
      setPhase('rest')
      tick(REST_SEC, () => startNextExercise(next))
    }
  }

  function startNextExercise(idx) {
    setExIndex(idx)
    setPhase('exercise')
    const ex = routineExercises[idx]
    tick(ex.durationSec, () => finishExercise(idx))
  }

  function skipRest() {
    clearInterval(intervalRef.current)
    startNextExercise(exIndex + 1)
  }

  function togglePause() {
    pausedRef.current = !pausedRef.current
    setPaused(p => !p)
  }

  const circumference = 2 * Math.PI * 48
  const timerMax = phase === 'rest' ? REST_SEC : currentEx?.durationSec || 1
  const timerProgress = 1 - timeLeft / timerMax

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">

      {/* Back */}
      <button
        onClick={() => { clearInterval(intervalRef.current); navigate(-1) }}
        className="flex items-center gap-2 text-stone-500 text-sm mb-6 active:text-stone-300 transition-colors w-fit"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {lang === 'es' ? 'Volver' : 'Back'}
      </button>

      {/* ─── PREVIEW ─── */}
      {phase === 'preview' && (
        <>
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-widest text-accent mb-2">
              {lang === 'es' ? 'Rutina' : 'Routine'} · {routine.durationMin} min
            </p>
            <h1 className="text-2xl font-semibold text-stone-50 tracking-tight mb-2">{routineData.name}</h1>
            <p className="text-stone-400 text-sm leading-relaxed">{routineData.description}</p>
          </div>

          {/* Exercise queue */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-widest text-stone-600 mb-3">
              {lang === 'es' ? `${routineExercises.length} ejercicios` : `${routineExercises.length} exercises`}
            </p>
            <div className="space-y-2">
              {routineExercises.map((ex, i) => {
                const exData = ex[lang]
                return (
                  <div key={ex.id} className="flex items-center gap-3 bg-stone-900 border border-stone-800/50 rounded-xl p-3">
                    <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center flex-shrink-0">
                      <ExerciseIcon type={ex.icon} size={14} color="#78716c" />
                    </div>
                    <div className="flex-1">
                      <span className="text-stone-300 text-sm">{exData.name}</span>
                    </div>
                    <span className="text-stone-600 text-xs">{Math.ceil(ex.durationSec / 60)} min</span>
                    {i < routineExercises.length - 1 && (
                      <svg className="w-3 h-3 text-stone-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={startRoutine}
            className="w-full bg-accent text-stone-950 font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
          >
            {lang === 'es' ? 'Comenzar rutina' : 'Start routine'}
          </button>
        </>
      )}

      {/* ─── EXERCISE ─── */}
      {phase === 'exercise' && currentEx && (
        <div className="flex flex-col items-center flex-1">
          {/* Progress dots */}
          <div className="flex gap-1.5 mb-8">
            {routineExercises.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i < exIndex ? 'bg-accent w-4' : i === exIndex ? 'bg-accent w-6' : 'bg-stone-800 w-4'
                }`}
              />
            ))}
          </div>

          <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">
            {lang === 'es' ? `Ejercicio ${exIndex + 1} de ${routineExercises.length}` : `Exercise ${exIndex + 1} of ${routineExercises.length}`}
          </p>
          <h2 className="text-xl font-semibold text-stone-50 mb-1">{currentEx[lang].name}</h2>
          <p className="text-stone-500 text-sm mb-10">{currentEx[lang].subtitle}</p>

          {/* Timer */}
          <div className="relative w-40 h-40 mb-10">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#292524" strokeWidth="4" />
              <circle
                cx="56" cy="56" r="48" fill="none"
                stroke="#c9b99a" strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - timerProgress)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-stone-50 tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full space-y-2 mb-8">
            {currentEx[lang].steps.map((step, i) => (
              <div key={i} className="flex gap-3 px-1">
                <span className="text-stone-700 text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                <p className="text-stone-400 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <button
            onClick={togglePause}
            className="w-full border border-stone-700 text-stone-300 text-sm font-medium py-4 rounded-2xl active:bg-stone-900 transition-colors"
          >
            {paused ? (lang === 'es' ? 'Continuar' : 'Resume') : (lang === 'es' ? 'Pausar' : 'Pause')}
          </button>
        </div>
      )}

      {/* ─── REST ─── */}
      {phase === 'rest' && (
        <div className="flex flex-col items-center flex-1 justify-center">
          <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">
            {lang === 'es' ? 'Siguiente' : 'Next up'}
          </p>
          <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center mb-3">
            <ExerciseIcon type={routineExercises[exIndex + 1]?.icon} size={24} />
          </div>
          <h2 className="text-xl font-semibold text-stone-50 mb-8">
            {routineExercises[exIndex + 1]?.[lang]?.name}
          </h2>

          <div className="text-5xl font-light text-stone-50 tabular-nums mb-2">{timeLeft}</div>
          <p className="text-stone-600 text-sm mb-10">{lang === 'es' ? 'segundos de descanso' : 'seconds rest'}</p>

          <button
            onClick={skipRest}
            className="border border-stone-700 text-stone-400 text-sm px-8 py-3 rounded-full active:bg-stone-900 transition-colors"
          >
            {lang === 'es' ? 'Saltar descanso' : 'Skip rest'}
          </button>
        </div>
      )}

      {/* ─── DONE ─── */}
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

          <h2 className="text-stone-50 text-2xl font-semibold mb-2">
            {lang === 'es' ? 'Rutina completada' : 'Routine complete'}
          </h2>
          <p className="text-stone-500 text-sm mb-1">{routineData.name}</p>
          <p className="text-stone-600 text-xs mb-12">{routine.durationMin} min · {routineExercises.length} {lang === 'es' ? 'ejercicios' : 'exercises'}</p>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-accent text-stone-950 font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform mb-3"
          >
            {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </button>
          <button
            onClick={() => navigate('/train')}
            className="w-full border border-stone-800 text-stone-400 text-sm py-4 rounded-2xl active:bg-stone-900 transition-colors"
          >
            {lang === 'es' ? 'Ver entrenamientos' : 'View workouts'}
          </button>
        </div>
      )}
    </div>
  )
}
