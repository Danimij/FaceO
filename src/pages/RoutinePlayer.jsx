import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { routines } from '../data/routines'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'

function formatTime(s) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

const REST_SEC = 10

export default function RoutinePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang, completeExercise } = useApp()

  const routine = routines.find(r => r.id === id)
  const routineExercises = routine ? routine.exercises.map(eid => exercises.find(e => e.id === eid)).filter(Boolean) : []

  const [phase, setPhase] = useState('preview')
  const [exIndex, setExIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => () => clearInterval(intervalRef.current), [])

  if (!routine) { navigate('/train', { replace: true }); return null }

  const currentEx = routineExercises[exIndex]
  const routineData = routine[lang]
  const circumference = 2 * Math.PI * 52
  const timerMax = phase === 'rest' ? REST_SEC : currentEx?.durationSec || 1
  const timerProgress = 1 - timeLeft / timerMax

  function tick(duration, onEnd) {
    clearInterval(intervalRef.current)
    setTimeLeft(duration)
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(intervalRef.current); onEnd(); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function startRoutine() {
    setPhase('exercise'); setExIndex(0)
    tick(routineExercises[0].durationSec, () => finishExercise(0))
  }

  function finishExercise(idx) {
    completeExercise(routineExercises[idx].id, Math.ceil(routineExercises[idx].durationSec / 60))
    const next = idx + 1
    if (next >= routineExercises.length) { setPhase('done') }
    else { setPhase('rest'); tick(REST_SEC, () => startNext(next)) }
  }

  function startNext(idx) {
    setExIndex(idx); setPhase('exercise')
    tick(routineExercises[idx].durationSec, () => finishExercise(idx))
  }

  function togglePause() { pausedRef.current = !pausedRef.current; setPaused(p => !p) }

  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-amber-950/20 to-transparent pointer-events-none"/>

      <div className="relative px-5 pt-14 flex flex-col flex-1 max-w-lg mx-auto w-full">
        <button onClick={() => { clearInterval(intervalRef.current); navigate(-1) }}
          className="flex items-center gap-2 text-muted text-sm mb-6 active:text-warm w-fit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          {lang === 'es' ? 'Volver' : 'Back'}
        </button>

        {/* PREVIEW */}
        {phase === 'preview' && (
          <>
            <p className="text-[11px] uppercase tracking-widest text-accent mb-2">{lang === 'es' ? 'Rutina' : 'Routine'} · {routine.durationMin} min</p>
            <h1 className="text-2xl font-semibold text-warm mb-2">{routineData.name}</h1>
            <p className="text-stone-400 text-sm leading-relaxed mb-7">{routineData.description}</p>

            <p className="text-xs uppercase tracking-widest text-muted mb-3">{routineExercises.length} {lang === 'es' ? 'ejercicios' : 'exercises'}</p>
            <div className="space-y-2 mb-8">
              {routineExercises.map((ex, i) => (
                <div key={ex.id} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center flex-shrink-0">
                    <ExerciseIcon type={ex.icon} category={ex.category} size={16}/>
                  </div>
                  <span className="text-stone-300 text-sm flex-1">{ex[lang].name}</span>
                  <span className="text-muted text-xs">{Math.ceil(ex.durationSec / 60)} min</span>
                  {i < routineExercises.length - 1 && (
                    <svg className="w-3 h-3 text-stone-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <button onClick={startRoutine}
              className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
              style={{ color: '#080706' }}>
              {lang === 'es' ? 'Comenzar rutina' : 'Start routine'}
            </button>
          </>
        )}

        {/* EXERCISE */}
        {phase === 'exercise' && currentEx && (
          <div className="flex flex-col items-center flex-1">
            <div className="flex gap-1.5 mb-8">
              {routineExercises.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${
                  i < exIndex ? 'bg-accent w-5' : i === exIndex ? 'bg-accent w-8' : 'bg-border w-5'
                }`}/>
              ))}
            </div>

            <p className="text-muted text-xs uppercase tracking-widest mb-2">
              {lang === 'es' ? `${exIndex + 1} de ${routineExercises.length}` : `${exIndex + 1} of ${routineExercises.length}`}
            </p>
            <h2 className="text-xl font-semibold text-warm mb-1">{currentEx[lang].name}</h2>
            <p className="text-muted text-sm mb-10">{currentEx[lang].subtitle}</p>

            <div className="relative w-48 h-48 mb-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#1e1a14" strokeWidth="6"/>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#c9a96e" strokeWidth="6"
                  strokeDasharray={circumference} strokeDashoffset={circumference * (1 - timerProgress)}
                  strokeLinecap="round" className="transition-all duration-1000"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-light text-warm tabular-nums">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="w-full space-y-2 mb-8">
              {currentEx[lang].steps.map((step, i) => (
                <div key={i} className="flex gap-3 px-1">
                  <span className="text-muted text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <p className="text-stone-400 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <button onClick={togglePause}
              className="w-full border border-border text-stone-300 text-sm font-medium py-4 rounded-2xl active:bg-card transition-colors">
              {paused ? (lang === 'es' ? 'Continuar' : 'Resume') : (lang === 'es' ? 'Pausar' : 'Pause')}
            </button>
          </div>
        )}

        {/* REST */}
        {phase === 'rest' && (
          <div className="flex flex-col items-center flex-1 justify-center">
            <p className="text-muted text-xs uppercase tracking-widest mb-4">{lang === 'es' ? 'Siguiente' : 'Next up'}</p>
            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-3">
              <ExerciseIcon type={routineExercises[exIndex + 1]?.icon} category={routineExercises[exIndex + 1]?.category} size={28}/>
            </div>
            <h2 className="text-xl font-semibold text-warm mb-8">{routineExercises[exIndex + 1]?.[lang]?.name}</h2>
            <div className="text-6xl font-light text-warm tabular-nums mb-2">{timeLeft}</div>
            <p className="text-muted text-sm mb-10">{lang === 'es' ? 'segundos' : 'seconds'}</p>
            <button onClick={() => startNext(exIndex + 1)}
              className="border border-border text-muted text-sm px-8 py-3 rounded-full active:bg-card transition-colors">
              {lang === 'es' ? 'Saltar' : 'Skip'}
            </button>
          </div>
        )}

        {/* DONE */}
        {phase === 'done' && (
          <div className="flex flex-col items-center flex-1 justify-center text-center">
            <div className="w-28 h-28 rounded-full border border-accent/15 flex items-center justify-center mb-8 animate-ring-pulse">
              <div className="w-20 h-20 rounded-full border border-accent/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-warm text-2xl font-semibold mb-2">{lang === 'es' ? 'Rutina completada' : 'Routine complete'}</h2>
            <p className="text-muted text-sm mb-1">{routineData.name}</p>
            <p className="text-stone-700 text-xs mb-12">{routine.durationMin} min · {routineExercises.length} {lang === 'es' ? 'ejercicios' : 'exercises'}</p>
            <button onClick={() => navigate('/')}
              className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform mb-3"
              style={{ color: '#080706' }}>
              {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
            </button>
            <button onClick={() => navigate('/train')}
              className="w-full border border-border text-muted text-sm py-4 rounded-2xl active:bg-card transition-colors">
              {lang === 'es' ? 'Ver entrenamientos' : 'View workouts'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
