import { useApp } from '../context/AppContext'

const DATA = {
  es: {
    title: 'Protocolo combinado',
    intro: 'Tu día completo, combinando FACEO (cara, mandíbula, fascia) e INSPIRAPP (respiración, frío, mente). Constancia, no perfección.',
    blocks: [
      { h: '☀️ Mañana · activación · 12-15 min', items: ['Luz solar 5-10 min al despertar (ritmo circadiano)', 'INSPIRAPP → Wim Hof, 3 rondas', 'Ducha fría 1-2 min', 'FACEO → Mewing + Postura (la respiración nasal refuerza la lengua)'] },
      { h: '🏙️ Durante el día · hábitos invisibles', items: ['Respiración nasal siempre', 'Mewing pasivo (lengua al paladar) mientras trabajas', 'Coherencia cardíaca 5 min si hay estrés'] },
      { h: '🌙 Noche · recuperación · 12-15 min', items: ['FACEO → Liberación fascial (mandíbula/cuello)', 'INSPIRAPP → Meditación + respiración 4-7-8', 'Dormitorio fresco y oscuro'] },
      { h: '📅 Semana', items: ['L/X/V: rutina completa mañana + noche', 'M/J: versión corta (respiración + mewing + fascia)', 'Finde: yoga/movimiento largo + meditación larga'] },
    ],
    cta: 'Abrir INSPIRAPP para respiración y mente →',
  },
  en: {
    title: 'Combined protocol',
    intro: 'Your full day, combining FACEO (face, jaw, fascia) and INSPIRAPP (breathing, cold, mind). Consistency, not perfection.',
    blocks: [
      { h: '☀️ Morning · activation · 12-15 min', items: ['Sunlight 5-10 min on waking (circadian rhythm)', 'INSPIRAPP → Wim Hof, 3 rounds', 'Cold shower 1-2 min', 'FACEO → Mewing + Posture (nasal breathing supports the tongue)'] },
      { h: '🏙️ During the day · invisible habits', items: ['Nasal breathing always', 'Passive mewing (tongue on palate) while you work', 'Cardiac coherence 5 min if stressed'] },
      { h: '🌙 Night · recovery · 12-15 min', items: ['FACEO → Fascia release (jaw/neck)', 'INSPIRAPP → Meditation + 4-7-8 breathing', 'Cool, dark bedroom'] },
      { h: '📅 Week', items: ['Mon/Wed/Fri: full morning + night', 'Tue/Thu: short version (breathing + mewing + fascia)', 'Weekend: long yoga/movement + long meditation'] },
    ],
    cta: 'Open INSPIRAPP for breathing & mind →',
  },
}

export default function ProtocolModal({ onClose }) {
  const { lang } = useApp()
  const tx = DATA[lang]
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border max-h-[88vh] overflow-y-auto" style={{ background: '#1e1811' }}>
        <div className="sticky top-0 flex items-center justify-between px-6 pt-6 pb-4" style={{ background: '#1e1811' }}>
          <div>
            <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-1">Premium · FACEO + INSPIRAPP</div>
            <h2 className="text-xl font-semibold text-warm">{tx.title}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted">✕</button>
        </div>
        <div className="px-6 pb-10">
          <p className="text-muted text-sm leading-relaxed mb-5">{tx.intro}</p>
          {tx.blocks.map((b, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-4 mb-3">
              <div className="text-warm font-semibold text-sm mb-2">{b.h}</div>
              <ul className="space-y-1.5">
                {b.items.map((it, j) => (
                  <li key={j} className="text-stone-400 text-sm flex gap-2">
                    <span className="text-accent flex-shrink-0">·</span><span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a href="https://danimij.github.io/Respirapp/" target="_blank" rel="noopener noreferrer"
            className="block w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide text-center mt-4 active:scale-95 transition-transform"
            style={{ color: '#15100b' }}>{tx.cta}</a>
        </div>
      </div>
    </div>
  )
}
