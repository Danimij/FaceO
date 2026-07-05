import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { routines } from '../data/routines'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'
import { setMode, stopSound, MODES } from '../utils/ambientSound'

function formatTime(s) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

const REST_SEC = 10


const SOUND_ICONS = {
  off: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/></svg>,
  calm: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0M3 9.5c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/></svg>,
  focus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>,
  energy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  lounge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><circle cx="12" cy="9" r="4"/><path strokeLinecap="round" strokeLinejoin="round" d="M2 15h20M4 15c1.3-1.5 2.7-1.5 4 0s2.7 1.5 4 0 2.7-1.5 4 0 2.7 1.5 4 0"/></svg>,
}

function SoundPicker({ lang, value, onChange }) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {MODES.map(m => (
        <button key={m.id} onClick={() => onChange(m.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            value === m.id ? 'bg-accent/10 border-accent/40 text-accent' : 'border-border text-muted active:bg-card'
          }`}>
          {SOUND_ICONS[m.id]}
          {m[lang]}
        </button>
      ))}
    </div>
  )
}

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
  const [soundMode, setSoundMode] = useState('calm')
  const intervalRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => () => { clearInterval(intervalRef.current); stopSound() }, [])

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
    if (soundMode !== 'off') setMode(soundMode)
    tick(routineExercises[0].durationSec, () => finishExercise(0))
  }

  function finishExercise(idx) {
    completeExercise(routineExercises[idx].id, Math.ceil(routineExercises[idx].durationSec / 60))
    const next = idx + 1
    if (next >= routineExercises.length) { stopSound(); setPhase('done') }
    else { setPhase('rest'); tick(REST_SEC, () => startNext(next)) }
  }

  function startNext(idx) {
    setExIndex(idx); setPhase('exercise')
    tick(routineExercises[idx].durationSec, () => finishExercise(idx))
  }

  function togglePause() {
    pausedRef.current = !pausedRef.current
    setPaused(p => !p)
    if (pausedRef.current) stopSound()
    else if (soundMode !== 'off') setMode(soundMode)
  }

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

            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-muted mb-3">{lang === 'es' ? 'Ambiente sonoro' : 'Ambient sound'}</p>
              <SoundPicker lang={lang} value={soundMode} onChange={mode => { setSoundMode(mode); setMode(mode) }}/>
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
            <div className="flex justify-end mb-2">
              <button onClick={() => { const next = MODES[(MODES.findIndex(m=>m.id===soundMode)+1)%MODES.length]; setSoundMode(next.id); setMode(next.id) }}
                className="flex items-center gap-1 text-muted text-[10px] border border-border rounded-full px-2 py-1 active:bg-card transition-colors">
                {SOUND_ICONS[soundMode]}
                <span>{MODES.find(m=>m.id===soundMode)?.[lang]}</span>
              </button>
            </div>
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
