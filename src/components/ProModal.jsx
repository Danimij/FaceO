import { useApp } from '../context/AppContext'

export default function ProModal({ onClose }) {
  const { lang, setIsPro } = useApp()

  const tx = {
    es: {
      title: 'FACEO Pro',
      sub: 'Desbloquea el programa completo',
      features: ['Todos los ejercicios avanzados', 'Rutinas personalizadas', 'Seguimiento detallado', 'Sin límites, para siempre'],
      price: '4,99 €/mes',
      annual: '29,99 €/año · Mejor valor',
      cta: 'Empezar 7 días gratis',
      ctaSub: 'Cancela cuando quieras',
      later: 'Ahora no',
    },
    en: {
      title: 'FACEO Pro',
      sub: 'Unlock the full program',
      features: ['All advanced exercises', 'Custom routines', 'Detailed tracking', 'No limits, forever'],
      price: '€4.99/month',
      annual: '€29.99/year · Best value',
      cta: 'Start 7-day free trial',
      ctaSub: 'Cancel anytime',
      later: 'Not now',
    },
  }[lang]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg animate-slide-up rounded-t-3xl p-8 pb-12 border-t border-border" style={{ background: '#111009' }}>
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-8"/>

        <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-2">FACEO</div>
        <h2 className="text-2xl font-semibold text-warm mb-2">{tx.title}</h2>
        <p className="text-muted text-sm mb-8">{tx.sub}</p>

        <ul className="space-y-3 mb-8">
          {tx.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-stone-300 text-sm">
              <div className="w-5 h-5 rounded-full border border-accent/30 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-accent"/>
              </div>
              {f}
            </li>
          ))}
        </ul>

        <div className="bg-amber-950/30 rounded-2xl p-4 mb-6 flex items-center justify-between border border-amber-900/20">
          <div>
            <div className="text-warm font-semibold">{tx.annual.split(' · ')[0]}</div>
            <div className="text-muted text-xs mt-0.5">{tx.price}</div>
          </div>
          <div className="text-xs text-accent font-medium bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
            {tx.annual.split(' · ')[1]}
          </div>
        </div>

        <button onClick={() => { setIsPro(true); onClose() }}
          className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide mb-3 active:scale-95 transition-transform"
          style={{ color: '#080706' }}>
          {tx.cta}
        </button>
        <p className="text-center text-muted text-xs mb-4">{tx.ctaSub}</p>
        <button onClick={onClose} className="w-full text-muted text-sm py-2 active:text-stone-300 transition-colors">
          {tx.later}
        </button>
      </div>
    </div>
  )
}
