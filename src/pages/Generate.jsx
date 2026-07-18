import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import { FOCUSES, DURATIONS, generateRoutine } from '../data/generator'
import ExerciseIcon from '../components/ExerciseIcon'
import ProModal from '../components/ProModal'

export default function Generate() {
  const { lang, saveGeneratedRoutine, isPro } = useApp()
  const navigate = useNavigate()
  const [focus, setFocus] = useState('full')
  const [mins, setMins] = useState(5)
  const [preview, setPreview] = useState(null)
  const [showPro, setShowPro] = useState(false)

  const es = lang === 'es'
  const tx = es
    ? { title: 'Generar rutina', sub: 'Nunca la misma dos veces', back: 'Volver',
        q1: '¿Qué quieres trabajar?', q2: '¿Cuánto tiempo tienes?',
        gen: 'Generar rutina', regen: 'Generar otra', start: 'Empezar rutina →',
        note: 'Se ordena de abajo arriba: primero se libera la cadena, después se trabaja el rostro.',
        min: 'min', ex: 'ejercicios' }
    : { title: 'Generate routine', sub: 'Never the same twice', back: 'Back',
        q1: 'What do you want to work on?', q2: 'How much time do you have?',
        gen: 'Generate routine', regen: 'Generate another', start: 'Start routine →',
        note: 'Ordered bottom-up: the chain is released first, the face is worked after.',
        min: 'min', ex: 'exercises' }

  const Lock = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-3.5 h-3.5 flex-shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 11V8a4 4 0 018 0v3" /><rect x="4" y="11" width="14" height="9" rx="2" />
    </svg>
  )

  function pickFocus(f) {
    if (f.pro && !isPro) { setShowPro(true); return }
    setFocus(f.id); setPreview(null)
  }

  function pickDuration(d) {
    if (d.pro && !isPro) { setShowPro(true); return }
    setMins(d.min); setPreview(null)
  }

  function doGenerate() {
    const r = generateRoutine(focus, mins, lang)
    saveGeneratedRoutine(r)
    setPreview(r)
  }

  const previewExercises = preview
    ? preview.exercises.map(id => exercises.find(e => e.id === id)).filter(Boolean)
    : []

  return (
    <div className="flex flex-col min-h-full pb-28 animate-fade-in">
      <div className="px-5 pt-16 pb-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted text-sm mb-4 active:text-warm w-fit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {tx.back}
        </button>
        <h1 className="text-3xl font-semibold text-warm tracking-tight mb-1">{tx.title}</h1>
        <p className="text-muted text-sm">{tx.sub}</p>
      </div>

      <div className="px-5">
        <p className="text-xs uppercase tracking-widest text-muted mb-3">{tx.q1}</p>
        <div className="space-y-2 mb-7">
          {FOCUSES.map(f => (
            <button key={f.id} onClick={() => pickFocus(f)}
              className={`w-full text-left rounded-2xl p-4 border transition-colors ${focus === f.id ? 'border-accent/50 bg-accent/10' : 'border-border bg-card'}`}>
              <div className="flex items-center gap-2">
                <div className={`font-medium text-sm ${focus === f.id ? 'text-accent' : (f.pro && !isPro ? 'text-stone-500' : 'text-warm')}`}>{es ? f.es : f.en}</div>
                {f.pro && !isPro && (
                  <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-accent/80 bg-accent/10 border border-accent/25 px-1.5 py-0.5 rounded-full">
                    <Lock /> Pro
                  </span>
                )}
              </div>
              <div className="text-muted text-xs mt-0.5">{es ? f.esSub : f.enSub}</div>
            </button>
          ))}
        </div>

        <p className="text-xs uppercase tracking-widest text-muted mb-3">{tx.q2}</p>
        <div className="flex gap-2 mb-7">
          {DURATIONS.map(d => (
            <button key={d.min} onClick={() => pickDuration(d)}
              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors flex items-center justify-center gap-1 ${mins === d.min ? 'border-accent/50 bg-accent/10 text-accent' : `border-border bg-card ${d.pro && !isPro ? 'text-stone-600' : 'text-muted'}`}`}>
              {d.pro && !isPro && <Lock />}
              {d.min} {tx.min}
            </button>
          ))}
        </div>

        <button onClick={doGenerate}
          className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
          style={{ color: '#15100b' }}>
          {preview ? tx.regen : tx.gen}
        </button>
        <p className="text-stone-600 text-[11px] leading-relaxed mt-3 text-center">{tx.note}</p>

        {preview && (
          <div className="mt-7 animate-slide-up">
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-xs uppercase tracking-widest text-accent">
                {preview.durationMin} {tx.min}
              </p>
              <p className="text-muted text-xs">{previewExercises.length} {tx.ex}</p>
            </div>
            <div className="space-y-2 mb-5">
              {previewExercises.map((e, i) => (
                <div key={e.id + i} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-3.5">
                  <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-[11px] font-semibold">{i + 1}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center flex-shrink-0">
                    <ExerciseIcon type={e.icon} category={e.category} size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-warm text-sm font-medium">{e[lang].name}</div>
                    <div className="text-muted text-[11px]">{e[lang].subtitle}</div>
                  </div>
                  <div className="text-muted text-[11px] flex-shrink-0">
                    {Math.round(e.durationSec / 60) || 1}&apos;
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/routine/generated')}
              className="w-full border border-accent/40 bg-accent/10 text-accent font-semibold py-4 rounded-2xl text-sm active:scale-95 transition-transform">
              {tx.start}
            </button>
          </div>
        )}
      </div>

      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}
