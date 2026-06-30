import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { t } from '../data/i18n'
import ProModal from '../components/ProModal'

function Row({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-stone-800/50 last:border-0">
      <div>
        <div className="text-stone-200 text-sm">{label}</div>
        {sub && <div className="text-stone-600 text-xs mt-0.5">{sub}</div>}
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-accent' : 'bg-stone-700'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function Profile() {
  const { lang, setLang, isPro, setIsPro, reminderEnabled, setReminderEnabled, reminderTime, setReminderTime } = useApp()
  const tx = t[lang].profile
  const [showPro, setShowPro] = useState(false)

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-stone-50 tracking-tight mb-8">{tx.title}</h1>

      {/* Plan banner */}
      {!isPro ? (
        <button
          onClick={() => setShowPro(true)}
          className="w-full bg-gradient-to-r from-stone-900 to-stone-900 border border-gold/20 rounded-2xl p-5 mb-8 text-left active:scale-[0.98] transition-transform"
        >
          <div className="text-[10px] uppercase tracking-widest text-gold mb-2">FACEO Pro</div>
          <div className="text-stone-50 font-medium text-sm mb-1">{tx.upgrade}</div>
          <div className="text-stone-500 text-xs">{tx.upgrade_sub}</div>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gold">
            {lang === 'es' ? 'Ver planes' : 'See plans'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </button>
      ) : (
        <div className="w-full bg-stone-900 border border-accent/20 rounded-2xl p-5 mb-8 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-accent mb-1">FACEO Pro</div>
            <div className="text-stone-300 text-sm">{lang === 'es' ? 'Plan activo' : 'Active plan'}</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-accent" />
        </div>
      )}

      {/* Settings */}
      <div className="bg-stone-900 rounded-2xl border border-stone-800/50 px-4 mb-4">
        <Row label={tx.language}>
          <div className="flex gap-1">
            {['es', 'en'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wide transition-all ${
                  lang === l ? 'bg-accent text-stone-950' : 'text-stone-500'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </Row>

        <Row label={tx.notifications} sub={tx.notifications_sub}>
          <Toggle value={reminderEnabled} onChange={setReminderEnabled} />
        </Row>

        {reminderEnabled && (
          <Row label={tx.reminder_time}>
            <input
              type="time"
              value={reminderTime}
              onChange={e => setReminderTime(e.target.value)}
              className="bg-stone-800 text-stone-200 text-sm rounded-lg px-3 py-1.5 border border-stone-700 outline-none"
            />
          </Row>
        )}
      </div>

      <div className="bg-stone-900 rounded-2xl border border-stone-800/50 px-4 mb-4">
        <Row label={tx.about}>
          <span className="text-stone-600 text-sm">1.0.0</span>
        </Row>
        <Row label={tx.restore}>
          <button className="text-stone-500 text-sm active:text-stone-300 transition-colors">
            {lang === 'es' ? 'Restaurar' : 'Restore'}
          </button>
        </Row>
      </div>

      {isPro && (
        <button
          onClick={() => setIsPro(false)}
          className="text-stone-700 text-xs text-center py-4 w-full active:text-stone-500 transition-colors"
        >
          {lang === 'es' ? 'Cancelar suscripción Pro' : 'Cancel Pro subscription'}
        </button>
      )}

      {showPro && <ProModal onClose={() => setShowPro(false)} />}
    </div>
  )
}
