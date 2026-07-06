import { useState } from 'react'
import { useApp } from '../context/AppContext'

const GOALS = [
  { id: 'jaw',       es: 'Mandíbula definida',  en: 'Defined jawline',  sub: { es: 'Mewing, masetero, estructura', en: 'Mewing, masseter, structure' } },
  { id: 'breathing', es: 'Respirar mejor',       en: 'Breathe better',   sub: { es: 'Nasal, CO₂, calma',            en: 'Nasal, CO₂, calm' } },
  { id: 'posture',   es: 'Postura y cuello',     en: 'Posture & neck',   sub: { es: 'Alineación craneofacial',      en: 'Craniofacial alignment' } },
  { id: 'fascia',    es: 'Liberar tensión',      en: 'Release tension',  sub: { es: 'Fascia y miofascial',          en: 'Fascia & myofascial' } },
]

export default function Onboarding() {
  const { lang, setOnboarded, setGoal, setReminderEnabled, setReminderTime, reminderTime } = useApp()
  const [step, setStep] = useState(0)
  const [selGoal, setSelGoal] = useState('jaw')
  const [time, setTime] = useState(reminderTime || '09:00')

  const tx = {
    es: { next: 'Continuar', start: 'Empezar', skip: 'Ahora no',
      t0: 'Bienvenido a FACEO', s0: 'Ejercicios diarios de 5-10 min para tu mandíbula, respiración y postura. Constancia, no perfección.',
      t1: '¿Cuál es tu objetivo?', s1: 'Personalizamos tus recomendaciones.',
      t2: 'Recordatorio diario', s2: 'Un aviso a la hora que elijas para no romper la racha.',
      enable: 'Activar recordatorio' },
    en: { next: 'Continue', start: 'Start', skip: 'Not now',
      t0: 'Welcome to FACEO', s0: '5-10 min daily exercises for your jaw, breathing and posture. Consistency, not perfection.',
      t1: 'What is your goal?', s1: 'We personalize your recommendations.',
      t2: 'Daily reminder', s2: 'A nudge at your chosen time so you keep your streak.',
      enable: 'Enable reminder' },
  }[lang]

  function finish(withReminder) {
    setGoal(selGoal)
    if (withReminder) {
      setReminderTime(time)
      setReminderEnabled(true)
      if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {})
      }
    }
    setOnboarded(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: '#15100b' }}>
      {/* progress dots */}
      <div className="flex gap-2 justify-center pt-16">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-accent' : 'w-2 bg-border'}`} />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center px-7">
        {step === 0 && (
          <div className="animate-fade-in text-center">
            <div className="w-20 h-20 rounded-3xl bg-accent/15 flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl font-semibold text-accent" style={{ fontFamily: 'serif' }}>F</span>
            </div>
            <h1 className="text-3xl font-semibold text-warm mb-4">{tx.t0}</h1>
            <p className="text-stone-400 leading-relaxed">{tx.s0}</p>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-semibold text-warm mb-1">{tx.t1}</h1>
            <p className="text-muted text-sm mb-7">{tx.s1}</p>
            <div className="space-y-3">
              {GOALS.map(g => (
                <button key={g.id} onClick={() => setSelGoal(g.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selGoal === g.id ? 'border-accent bg-accent/10' : 'border-border bg-card'
                  }`}>
                  <div className={`font-medium ${selGoal === g.id ? 'text-accent' : 'text-warm'}`}>{g[lang]}</div>
                  <div className="text-muted text-xs mt-0.5">{g.sub[lang]}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-warm mb-2">{tx.t2}</h1>
            <p className="text-muted text-sm mb-7">{tx.s2}</p>
            <input type="time" value={time} onChange={e => setTime(e.target.value)}
              className="bg-card border border-border rounded-xl px-4 py-3 text-warm text-lg text-center outline-none focus:border-accent/50" />
          </div>
        )}
      </div>

      <div className="px-7 pb-12 space-y-3">
        {step < 2 ? (
          <button onClick={() => setStep(step + 1)}
            className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
            style={{ color: '#15100b' }}>{tx.next}</button>
        ) : (
          <>
            <button onClick={() => finish(true)}
              className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform"
              style={{ color: '#15100b' }}>{tx.enable}</button>
            <button onClick={() => finish(false)}
              className="w-full text-muted text-sm py-2 active:text-stone-300 transition-colors">{tx.skip}</button>
          </>
        )}
      </div>
    </div>
  )
}
