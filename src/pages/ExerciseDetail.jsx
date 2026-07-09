import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import { EXERCISE_IMG, CATEGORY_IMG } from '../data/images'
import ExerciseIcon from '../components/ExerciseIcon'
import { setMode, stopSound, MODES } from '../utils/ambientSound'
import { speak, speakFile, stopSpeak, voiceEnabled, setVoiceEnabled } from '../utils/voice'

const QUOTES = {
  es: [
    'Cada repetición te acerca a quien quieres ser.',
    'La constancia supera al talento.',
    'Tu cuerpo escucha todo lo que tu mente dice.',
    'El progreso, no la perfección.',
    'Respira. Enfócate. Avanza.',
    'Los pequeños pasos crean grandes cambios.',
    'Hoy es el día que construye el mañana.',
    'La disciplina es libertad.',
  ],
  en: [
    'Every rep brings you closer to who you want to be.',
    'Consistency beats talent.',
    'Your body hears everything your mind says.',
    'Progress, not perfection.',
    'Breathe. Focus. Move forward.',
    'Small steps create big changes.',
    'Today builds tomorrow.',
    'Discipline is freedom.',
  ],
}

function formatTime(s) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

function BreathingGuide({ phase, lang }) {
  const labels = {
    inhale:  { es: 'Inhala', en: 'Inhale' },
    hold:    { es: 'Retén',  en: 'Hold'   },
    exhale:  { es: 'Exhala', en: 'Exhale' },
  }
  const scales = { inhale: 'scale-125', hold: 'scale-125', exhale: 'scale-100' }
  return (
    <div className="flex flex-col items-center my-4">
      <div className={`w-24 h-24 rounded-full border-2 border-accent/40 flex items-center justify-center transition-transform duration-[4000ms] ${scales[phase]}`}>
        <div className={`w-16 h-16 rounded-full border border-accent/60 flex items-center justify-center transition-transform duration-[4000ms] ${scales[phase]}`}>
          <div className={`w-10 h-10 rounded-full bg-accent/20 transition-transform duration-[4000ms] ${scales[phase]}`}/>
        </div>
      </div>
      <p className="text-accent text-sm mt-3 font-medium">{labels[phase][lang]}</p>
    </div>
  )
}

const SOUND_ICONS = {
  off: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>
    </svg>
  ),
  calm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0M3 9.5c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0M3 17.5c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
    </svg>
  ),
  focus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  energy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
    </svg>
  ),
  lounge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
      <circle cx="12" cy="9" r="4"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 15h20M4 15c1.3-1.5 2.7-1.5 4 0s2.7 1.5 4 0 2.7-1.5 4 0 2.7 1.5 4 0"/>
    </svg>
  ),
}

function SoundPicker({ lang, value, onChange }) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {MODES.map(m => (
        <button key={m.id} onClick={() => onChange(m.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            value === m.id
              ? 'bg-accent/10 border-accent/40 text-accent'
              : 'border-border text-muted active:bg-card'
          }`}>
          {SOUND_ICONS[m.id]}
          {m[lang]}
        </button>
      ))}
    </div>
  )
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
  const [soundMode, setSoundMode] = useState('calm')
  const [breathPhase, setBreathPhase] = useState('inhale')
  const [voiceOn, setVoiceOn] = useState(voiceEnabled())
  const [quoteIdx, setQuoteIdx] = useState(0)
  const intervalRef = useRef(null)
  const breathRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => () => { clearInterval(intervalRef.current); clearInterval(breathRef.current); stopSound(); stopSpeak() }, [])

  if (!ex) { navigate('/train', { replace: true }); return null }

  const exData = ex[lang]
  const totalSec = ex.durationSec
  const img = EXERCISE_IMG[ex.id] || CATEGORY_IMG[ex.category]
  const circumference = 2 * Math.PI * 52
  const timerProgress = 1 - timeLeft / totalSec
  const isBreathing = ex.category === 'breathing'
  const quotes = QUOTES[lang]

  function handleSoundChange(mode) {
    setSoundMode(mode)
    setMode(mode)
  }

  function startBreathCycle() {
    const cycle = [
      { phase: 'inhale', dur: 4000 },
      { phase: 'hold',   dur: 4000 },
      { phase: 'exhale', dur: 6000 },
    ]
    let i = 0
    function next() {
      if (pausedRef.current) { breathRef.current = setTimeout(next, 200); return }
      const { phase, dur } = cycle[i % cycle.length]
      setBreathPhase(phase)
      const say = { inhale: { es: 'Inhala', en: 'Inhale' }, hold: { es: 'Reten', en: 'Hold' }, exhale: { es: 'Exhala', en: 'Exhale' } }
      const vk = phase==='inhale'?'inhala':phase==='exhale'?'exhala':'reten'
      if (lang==='es') speakFile(vk, say[phase][lang], lang); else speak(say[phase][lang], lang)
      i++
      breathRef.current = setTimeout(next, dur)
    }
    next()
  }

  function startExercise() {
    setPhase('active')
    setTimeLeft(totalSec)
    setQuoteIdx(Math.floor(Math.random() * quotes.length))
    if (soundMode !== 'off') setMode(soundMode)
    if (isBreathing && lang==='es') speakFile('comenzamos','Comenzamos. Sigue mi voz.', lang)
    else speak(isBreathing ? (lang==='es'?'Comenzamos. Sigue mi voz.':'Let us begin. Follow my voice.') : (exData.steps?.[0] || ''), lang)
    if (isBreathing) startBreathCycle()

    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          clearTimeout(breathRef.current)
          stopSound()
          if (lang==='es') speakFile('completado','Muy bien. Ejercicio completado.', lang); else speak('Well done. Exercise complete.', lang)
          setPhase('done')
          completeExercise(ex.id, Math.ceil(totalSec / 60))
          return 0
        }
        if (prev % 30 === 0) setQuoteIdx(i => (i + 1) % quotes.length)
        return prev - 1
      })
    }, 1000)
  }

  function togglePause() {
    pausedRef.current = !pausedRef.current
    setPaused(p => !p)
    if (!pausedRef.current && soundMode !== 'off') setMode(soundMode)
    if (pausedRef.current) stopSound()
  }

  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">

      {/* PREVIEW */}
      {phase === 'preview' && (
        <>
          <div className="relative h-64">
            <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-base"/>
            <button onClick={() => navigate(-1)}
              className="absolute top-14 left-5 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
              <div className="flex items-end gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0">
                  <ExerciseIcon type={ex.icon} category={ex.category} size={24}/>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white leading-tight">{exData.name}</h1>
                  <p className="text-stone-300 text-sm">{exData.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pt-5 space-y-5">
            <p className="text-stone-300 text-sm leading-relaxed">{exData.description}</p>

            <div className="flex gap-2">
              <span className="bg-card border border-border rounded-full px-3 py-1.5 text-muted text-xs">{Math.ceil(totalSec / 60)} min</span>
              {ex.reps && <span className="bg-card border border-border rounded-full px-3 py-1.5 text-muted text-xs">{ex.reps} {lang === 'es' ? 'reps' : 'reps'}</span>}
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-3">{lang === 'es' ? 'Cómo hacerlo' : 'How to do it'}</p>
              <div className="space-y-2">
                {exData.steps.map((step, i) => (
                  <div key={i} className="flex gap-3 bg-card border border-border rounded-xl p-3">
                    <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] text-muted font-bold">{i + 1}</span>
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sound picker en preview */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-3">{lang === 'es' ? 'Ambiente sonoro' : 'Ambient sound'}</p>
              <SoundPicker lang={lang} value={soundMode} onChange={handleSoundChange}/>
            </div>

            {exData.tip && (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20"/>
                <div className="relative bg-amber-950/60 border border-amber-900/30 rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-widest text-accent mb-2">{lang === 'es' ? 'Clave' : 'Key insight'}</div>
                  <p className="text-stone-200 text-sm leading-relaxed">{exData.tip}</p>
                </div>
              </div>
            )}

            <button onClick={startExercise}
              className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
              style={{ color: '#080706' }}>
              {lang === 'es' ? 'Comenzar ejercicio' : 'Start exercise'}
            </button>
          </div>
        </>
      )}

      {/* ACTIVE */}
      {phase === 'active' && (
        <div className="flex flex-col items-center flex-1 px-5 pt-14">
          <button onClick={() => { stopSound(); navigate(-1) }}
            className="self-start flex items-center gap-2 text-muted text-sm mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
            {lang === 'es' ? 'Volver' : 'Back'}
          </button>

          <h2 className="text-warm text-lg font-medium mb-1">{exData.name}</h2>
          <p className="text-muted text-xs mb-6">{paused ? (lang === 'es' ? 'En pausa' : 'Paused') : (lang === 'es' ? 'En progreso' : 'In progress')}</p>

          {/* Timer ring */}
          <div className="relative w-52 h-52 mb-4">
            <div className="absolute inset-4 rounded-full overflow-hidden">
              <img src={img} alt="" className="w-full h-full object-cover opacity-25"/>
            </div>
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
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

          {/* Breathing guide */}
          {isBreathing && !paused && <BreathingGuide phase={breathPhase} lang={lang}/>}

          {/* Motivational quote */}
          <div className="w-full bg-card border border-border rounded-2xl px-4 py-3 mb-5 min-h-[56px] flex items-center justify-center">
            <p className="text-stone-400 text-sm text-center italic leading-relaxed">"{quotes[quoteIdx]}"</p>
          </div>

          {/* Sound picker */}
          <div className="w-full mb-5">
            <p className="text-[10px] uppercase tracking-widest text-muted mb-2 text-center">{lang === 'es' ? 'Sonido' : 'Sound'}</p>
            <SoundPicker lang={lang} value={soundMode} onChange={handleSoundChange}/>
            <div className="flex justify-center mt-3">
              <button onClick={() => { const on = !voiceOn; setVoiceOn(on); setVoiceEnabled(on); if (on) speak(lang === 'es' ? 'Voz activada' : 'Voice on', lang) }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${voiceOn ? 'bg-accent/10 border-accent/40 text-accent' : 'border-border text-muted'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
                {voiceOn ? (lang === 'es' ? 'Voz guía' : 'Voice guide') : (lang === 'es' ? 'Voz off' : 'Voice off')}
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full space-y-1.5 mb-5">
            {exData.steps.map((step, i) => (
              <button key={i} onClick={() => setCurrentStep(i)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all border ${
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
        <div className="flex flex-col flex-1 animate-fade-in">
          <div className="relative h-48">
            <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-base"/>
          </div>
          <div className="flex flex-col items-center text-center px-5 pt-6">
            <div className="w-20 h-20 rounded-full border border-accent/20 flex items-center justify-center mb-5 animate-ring-pulse">
              <div className="w-14 h-14 rounded-full border border-accent/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-warm text-2xl font-semibold mb-1">{lang === 'es' ? 'Completado' : 'Complete'}</h2>
            <p className="text-muted text-sm mb-1">{exData.name}</p>
            <p className="text-stone-700 text-xs mb-5">{Math.ceil(totalSec / 60)} min</p>

            {exData.tip && (
              <div className="bg-card border border-border rounded-2xl p-4 mb-6 text-left w-full">
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
              {lang === 'es' ? 'Ver todos' : 'See all'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
