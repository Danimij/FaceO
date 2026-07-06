import { useState } from 'react'
import { useApp } from '../context/AppContext'

const GUMROAD_URL = 'https://danimij.gumroad.com/l/ikoaq'

// Códigos válidos — añade más cuando quieras
const VALID_CODES = ['FACEO2024', 'FACEOPROX', 'FACEOPRO1']

export default function ProModal({ onClose }) {
  const { lang, setIsPro } = useApp()
  const [step, setStep] = useState('offer')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const tx = {
    es: {
      title: 'FACEO Pro',
      sub: 'Desbloquea el programa completo',
      features: [
        'Todos los ejercicios avanzados',
        'Rutinas personalizadas',
        'Programa de 30 días completo',
        'Acceso de por vida, sin suscripción',
      ],
      price: '4,99 €',
      priceSub: 'Pago único · Acceso permanente',
      cta: 'Comprar en Gumroad',
      haveKey: 'Ya tengo un código de acceso',
      later: 'Ahora no',
      keyTitle: 'Introduce tu código',
      keySub: 'Encontrarás el código en el email de confirmación de tu compra',
      keyPlaceholder: 'FACEO2024',
      verify: 'Activar Pro',
      back: 'Volver',
      errInvalid: 'Código no válido. Comprueba el email de confirmación.',
    },
    en: {
      title: 'FACEO Pro',
      sub: 'Unlock the full program',
      features: [
        'All advanced exercises',
        'Custom routines',
        'Full 30-day program',
        'Lifetime access, no subscription',
      ],
      price: '€4.99',
      priceSub: 'One-time payment · Permanent access',
      cta: 'Buy on Gumroad',
      haveKey: 'I already have an access code',
      later: 'Not now',
      keyTitle: 'Enter your code',
      keySub: 'You\'ll find the code in your purchase confirmation email',
      keyPlaceholder: 'FACEO2024',
      verify: 'Activate Pro',
      back: 'Back',
      errInvalid: 'Invalid code. Check your confirmation email.',
    },
  }[lang]

  function verifyCode() {
    if (VALID_CODES.includes(code.trim().toUpperCase())) {
      setIsPro(true)
      onClose()
    } else {
      setError(tx.errInvalid)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg animate-slide-up rounded-t-3xl p-8 pb-12 border-t border-border" style={{ background: '#111009' }}>
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-8"/>

        {step === 'offer' ? (
          <>
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

            <div className="flex items-center justify-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-accent text-xs font-semibold tracking-wide">
                {lang === 'es' ? 'Pago único · Sin suscripción · Sin cobros sorpresa' : 'One-time payment · No subscription · No surprise charges'}
              </span>
            </div>

            <div className="bg-amber-950/30 rounded-2xl p-4 mb-6 border border-amber-900/20 flex items-center justify-between">
              <div>
                <div className="text-warm text-xl font-semibold">{tx.price}</div>
                <div className="text-muted text-xs mt-0.5">{tx.priceSub}</div>
              </div>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent/40">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd"/>
              </svg>
            </div>

            <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide text-center mb-3 active:scale-95 transition-transform"
              style={{ color: '#080706' }}>
              {tx.cta}
            </a>

            <button onClick={() => setStep('code')}
              className="w-full border border-border text-stone-300 text-sm py-3.5 rounded-2xl mb-3 active:bg-card transition-colors">
              {tx.haveKey}
            </button>

            <button onClick={onClose} className="w-full text-muted text-sm py-2 active:text-stone-300 transition-colors">
              {tx.later}
            </button>
          </>
        ) : (
          <>
            <button onClick={() => { setStep('offer'); setError('') }}
              className="flex items-center gap-2 text-muted text-sm mb-6 active:text-warm transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
              {tx.back}
            </button>

            <h2 className="text-xl font-semibold text-warm mb-2">{tx.keyTitle}</h2>
            <p className="text-muted text-sm mb-6">{tx.keySub}</p>

            <input
              type="text"
              value={code}
              onChange={e => { setCode(e.target.value); setError('') }}
              placeholder={tx.keyPlaceholder}
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-warm text-sm font-mono tracking-widest mb-2 focus:outline-none focus:border-accent/50 transition-colors"
            />
            {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
            {!error && <div className="mb-4"/>}

            <button onClick={verifyCode} disabled={!code.trim()}
              className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform disabled:opacity-40"
              style={{ color: '#080706' }}>
              {tx.verify}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
