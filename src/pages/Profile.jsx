import { useState } from 'react'
import { useApp } from '../context/AppContext'
import ProModal from '../components/ProModal'

function Row({ label, sub, children, last }) {
  return (
    <div className={`flex items-center justify-between py-4 ${!last ? 'border-b border-border' : ''}`}>
      <div>
        <div className="text-stone-200 text-sm">{label}</div>
        {sub && <div className="text-muted text-xs mt-0.5">{sub}</div>}
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-accent' : 'bg-border'}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`}/>
    </button>
  )
}

export default function Profile() {
  const { lang, setLang, isPro, setIsPro, reminderEnabled, setReminderEnabled, reminderTime, setReminderTime, progress } = useApp()
  const [showPro, setShowPro] = useState(false)

  const tx = {
    es: { title: 'Perfil', language: 'Idioma', notifications: 'Recordatorio diario', notifSub: 'Recibe un aviso para no romper la racha', reminderTime: 'Hora', plan: 'Plan', upgrade: 'Actualizar a Pro', upgradeSub: 'Desbloquea todos los ejercicios y rutinas', about: 'Acerca de FACEO', restore: 'Restaurar compras', cancel: 'Cancelar suscripción Pro', sessions: 'sesiones totales', minutes: 'minutos totales' },
    en: { title: 'Profile', language: 'Language', notifications: 'Daily reminder', notifSub: 'Get a nudge to keep your streak', reminderTime: 'Time', plan: 'Plan', upgrade: 'Upgrade to Pro', upgradeSub: 'Unlock all exercises and routines', about: 'About FACEO', restore: 'Restore purchases', cancel: 'Cancel Pro subscription', sessions: 'total sessions', minutes: 'total minutes' },
  }[lang]

  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">
      <div className="px-5 pt-16 pb-6">
        <h1 className="text-3xl font-semibold text-warm tracking-tight">{tx.title}</h1>
      </div>

      <div className="px-5 space-y-3">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-1">
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-light text-warm">{progress.streak}</div>
            <div className="text-muted text-[10px] uppercase tracking-widest mt-0.5">{lang === 'es' ? 'racha' : 'streak'}</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-light text-warm">{progress.totalSessions}</div>
            <div className="text-muted text-[10px] uppercase tracking-widest mt-0.5">{lang === 'es' ? 'sesiones' : 'sessions'}</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-light text-warm">{progress.totalMinutes}</div>
            <div className="text-muted text-[10px] uppercase tracking-widest mt-0.5">min</div>
          </div>
        </div>

        {/* Pro banner */}
        {!isPro ? (
          <button onClick={() => setShowPro(true)}
            className="w-full bg-gradient-to-r from-amber-950/50 to-card border border-accent/20 rounded-2xl p-5 text-left active:scale-[0.98] transition-transform">
            <div className="text-[10px] uppercase tracking-widest text-accent mb-2">FACEO Pro</div>
            <div className="text-warm font-medium mb-1">{tx.upgrade}</div>
            <div className="text-muted text-xs mb-3">{tx.upgradeSub}</div>
            <div className="flex items-center gap-1.5 text-accent text-xs font-medium">
              {lang === 'es' ? 'Ver planes' : 'See plans'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </div>
          </button>
        ) : (
          <div className="bg-card border border-accent/20 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-accent mb-1">FACEO Pro</div>
              <div className="text-stone-300 text-sm">{lang === 'es' ? 'Plan activo' : 'Active plan'}</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-accent"/>
          </div>
        )}

        {/* Settings */}
        <div className="bg-card rounded-2xl border border-border px-4">
          <Row label={tx.language}>
            <div className="flex gap-1 bg-surface rounded-lg p-1">
              {['es', 'en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium uppercase tracking-wide transition-all ${
                    lang === l ? 'bg-accent text-base' : 'text-muted'
                  }`} style={lang === l ? { color: '#080706' } : {}}>
                  {l}
                </button>
              ))}
            </div>
          </Row>
          <Row label={tx.notifications} sub={tx.notifSub}>
            <Toggle value={reminderEnabled} onChange={setReminderEnabled}/>
          </Row>
          {reminderEnabled && (
            <Row label={tx.reminderTime}>
              <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)}
                className="bg-surface text-stone-200 text-sm rounded-lg px-3 py-1.5 border border-border outline-none"/>
            </Row>
          )}
          <Row label={tx.about} last>
            <span className="text-muted text-sm">1.0.0</span>
          </Row>
        </div>

        <div className="bg-card rounded-2xl border border-border px-4">
          <Row label={tx.restore} last>
            <button className="text-muted text-sm active:text-stone-300 transition-colors">
              {lang === 'es' ? 'Restaurar' : 'Restore'}
            </button>
          </Row>
        </div>

        {isPro && (
          <button onClick={() => setIsPro(false)}
            className="text-stone-700 text-xs text-center py-3 w-full active:text-muted transition-colors">
            {tx.cancel}
          </button>
        )}

        {/* Confianza: privacidad real + aviso honesto */}
        <div className="mt-2 px-1 space-y-2 text-center">
          <p className="text-muted text-[11px] leading-relaxed">
            🔒 {lang === 'es'
              ? 'Tus datos se quedan en tu dispositivo. Sin cuentas, sin tracking, sin servidor.'
              : 'Your data stays on your device. No accounts, no tracking, no server.'}
          </p>
          <p className="text-stone-700 text-[11px] leading-relaxed">
            {lang === 'es'
              ? 'Orientación, no diagnóstico. Consulta a un profesional de salud.'
              : 'Guidance, not diagnosis. Consult a health professional.'}
          </p>
        </div>
      </div>

      {showPro && <ProModal onClose={() => setShowPro(false)}/>}
    </div>
  )
}
