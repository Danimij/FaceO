import { useApp } from '../context/AppContext'

// Mensaje honesto por hito: celebra el hábito real, sin exagerar.
const MSG = {
  3:   { es: '¡3 días seguidos! Ya no es casualidad, es el principio de un hábito.', en: '3 days in a row! Not luck anymore — a habit is forming.' },
  7:   { es: '¡Una semana entera! Aquí es donde la mayoría lo deja. Tú no.', en: 'A full week! This is where most quit. Not you.' },
  14:  { es: '¡2 semanas! Tu constancia ya pesa más que tu motivación.', en: '2 weeks! Your consistency now outweighs your motivation.' },
  21:  { es: '¡21 días! El tiempo que tarda un gesto en volverse automático.', en: '21 days! The time it takes a gesture to become automatic.' },
  30:  { es: '¡Un mes completo! Esto ya forma parte de quién eres.', en: 'A full month! This is part of who you are now.' },
  50:  { es: '¡50 días! La disciplina se ha vuelto identidad.', en: '50 days! Discipline became identity.' },
  75:  { es: '¡75 días! Muy pocos llegan aquí. Sigue.', en: '75 days! Very few reach this. Keep going.' },
  100: { es: '¡100 días! Cien decisiones buenas seguidas. Impresionante.', en: '100 days! A hundred good decisions in a row. Impressive.' },
  150: { es: '¡150 días! Esto ya no es un reto, es tu forma de vivir.', en: '150 days! Not a challenge anymore — it is how you live.' },
  200: { es: '¡200 días! Eres la prueba de que la constancia gana.', en: '200 days! You are proof that consistency wins.' },
  365: { es: '¡UN AÑO ENTERO! Has cambiado de verdad. Enhorabuena.', en: 'A WHOLE YEAR! You have truly changed. Congratulations.' },
}

const COLORS = ['#c9a96e', '#7fb89a', '#c98a8a', '#e9d6b0', '#4db8b0']

export default function Celebration() {
  const { celebration, clearCelebration, lang } = useApp()
  if (!celebration) return null
  const msg = MSG[celebration] || { es: `¡${celebration} días de racha!`, en: `${celebration}-day streak!` }

  return (
    <div onClick={clearCelebration}
      className="fixed inset-0 z-[70] flex items-center justify-center px-8 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      {/* Confeti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: `${(i * 37) % 100}%`,
            top: '-10%',
            width: i % 3 === 0 ? '10px' : '7px',
            height: i % 3 === 0 ? '10px' : '7px',
            background: COLORS[i % COLORS.length],
            borderRadius: i % 2 ? '50%' : '2px',
            animation: `confetti-fall ${2.4 + (i % 5) * 0.5}s linear ${(i % 10) * 0.18}s infinite`,
          }}/>
        ))}
      </div>

      <div className="relative text-center max-w-sm">
        <div className="text-[80px] leading-none mb-3" style={{ filter: 'drop-shadow(0 0 24px rgba(201,169,110,.6))' }}>🔥</div>
        <div className="text-7xl font-bold text-warm mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>{celebration}</div>
        <div className="text-accent text-xs uppercase tracking-[0.25em] mb-5">
          {lang === 'es' ? 'días de racha' : 'day streak'}
        </div>
        <p className="text-stone-200 text-base leading-relaxed mb-8">{msg[lang]}</p>
        <button onClick={clearCelebration}
          className="bg-accent text-stone-950 font-semibold text-sm px-8 py-3.5 rounded-2xl active:scale-95 transition-transform">
          {lang === 'es' ? 'Seguir' : 'Keep going'}
        </button>
      </div>

      <style>{`@keyframes confetti-fall{
        0%{transform:translateY(-10vh) rotate(0deg);opacity:1}
        100%{transform:translateY(110vh) rotate(720deg);opacity:.9}
      }`}</style>
    </div>
  )
}
