import { useApp } from '../context/AppContext'
import { t } from '../data/i18n'

export default function ProModal({ onClose }) {
  const { lang, setIsPro } = useApp()
  const tx = t[lang].pro

  function handleUnlock() {
    setIsPro(true)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-stone-900 rounded-t-3xl p-8 pb-12 animate-slide-up border-t border-stone-700/50">
        <div className="w-10 h-1 bg-stone-700 rounded-full mx-auto mb-8" />

        <div className="mb-1 text-[11px] font-medium tracking-[0.2em] uppercase text-accent">FACEO</div>
        <h2 className="text-2xl font-semibold text-stone-50 mb-2">{tx.title}</h2>
        <p className="text-stone-400 text-sm mb-8">{tx.subtitle}</p>

        <ul className="space-y-3 mb-8">
          {tx.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-stone-300 text-sm">
              <div className="w-5 h-5 rounded-full border border-accent/40 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              {f}
            </li>
          ))}
        </ul>

        <div className="bg-stone-800/60 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-stone-50 font-semibold">{tx.price_annual}</div>
            <div className="text-stone-500 text-xs mt-0.5">{tx.price}</div>
          </div>
          <div className="text-xs text-accent font-medium bg-accent/10 px-3 py-1.5 rounded-full">
            {lang === 'es' ? 'Mejor valor' : 'Best value'}
          </div>
        </div>

        <button
          onClick={handleUnlock}
          className="w-full bg-accent text-stone-950 font-semibold py-4 rounded-2xl text-sm tracking-wide mb-3 active:scale-95 transition-transform"
        >
          {tx.cta}
        </button>
        <p className="text-center text-stone-600 text-xs mb-4">{tx.cta_sub}</p>

        <button onClick={onClose} className="w-full text-stone-500 text-sm py-2 active:text-stone-300 transition-colors">
          {tx.maybe_later}
        </button>
      </div>
    </div>
  )
}
