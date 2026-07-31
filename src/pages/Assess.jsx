import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import ExerciseIcon from '../components/ExerciseIcon'

/*
 * Autoevaluación honesta: la persona OBSERVA y responde. La app orienta y
 * recomienda ejercicios y lecciones. No es un diagnóstico ni juzga la cara:
 * mapea lo que a ti te preocupa hacia lo que puedes trabajar.
 */

const QUESTIONS = [
  {
    id: 'jaw', es: '¿Cómo ves la definición de tu mandíbula?',
    en: 'How defined is your jawline?',
    opts: [
      { es: 'Marcada', en: 'Defined', w: {} },
      { es: 'Normal', en: 'Average', w: { jaw: 1, palate: 1 } },
      { es: 'Poco definida', en: 'Undefined', w: { jaw: 2, palate: 1, posture: 1 } },
    ],
  },
  {
    id: 'chin', es: '¿Notas papada o falta de línea bajo el mentón?',
    en: 'Double chin or a soft line under the chin?',
    opts: [
      { es: 'No', en: 'No', w: {} },
      { es: 'Algo, sobre todo en fotos', en: 'A bit, mostly in photos', w: { posture: 2, jaw: 1 } },
      { es: 'Sí, bastante', en: 'Yes, clearly', w: { posture: 2, jaw: 1, palate: 1 } },
    ],
  },
  {
    id: 'breath', es: '¿Respiras habitualmente por la nariz o por la boca?',
    en: 'Do you usually breathe through nose or mouth?',
    opts: [
      { es: 'Siempre por la nariz', en: 'Always nose', w: {} },
      { es: 'A veces por la boca', en: 'Sometimes mouth', w: { breathing: 2, palate: 1 } },
      { es: 'Casi siempre boca / boca al dormir', en: 'Mostly mouth / mouth at night', w: { breathing: 3, palate: 1 } },
    ],
  },
  {
    id: 'posture', es: 'De perfil, ¿tu cabeza va adelantada respecto a los hombros?',
    en: 'In profile, is your head forward of your shoulders?',
    opts: [
      { es: 'Alineada', en: 'Aligned', w: {} },
      { es: 'Un poco adelantada', en: 'Slightly forward', w: { posture: 2 } },
      { es: 'Bastante (cuello de móvil)', en: 'Clearly (tech neck)', w: { posture: 3, fascia: 1 } },
    ],
  },
  {
    id: 'tension', es: '¿Sientes tensión en mandíbula, sienes o aprietas los dientes?',
    en: 'Tension in jaw or temples, or clenching?',
    opts: [
      { es: 'No', en: 'No', w: {} },
      { es: 'A veces', en: 'Sometimes', w: { fascia: 2 } },
      { es: 'Sí, a diario / bruxismo', en: 'Daily / bruxism', w: { fascia: 3 } },
    ],
  },
  {
    id: 'symmetry', es: '¿Notas un lado de la cara distinto al otro?',
    en: 'Does one side of your face differ from the other?',
    opts: [
      { es: 'No', en: 'No', w: {} },
      { es: 'Ligera diferencia', en: 'Slight difference', w: { fascia: 1, chain: 2 } },
      { es: 'Sí, evidente', en: 'Yes, noticeable', w: { fascia: 1, chain: 2, posture: 1 } },
    ],
  },
  {
    id: 'body', es: '¿Pasas muchas horas sentado o con molestias de espalda/cadera?',
    en: 'Long hours sitting, or back/hip niggles?',
    opts: [
      { es: 'No', en: 'No', w: {} },
      { es: 'Bastantes horas sentado', en: 'Lots of sitting', w: { chain: 2, posture: 1 } },
      { es: 'Sí, y noto la espalda o la cadera', en: 'Yes, and I feel it', w: { chain: 3, posture: 1 } },
    ],
  },
  {
    id: 'skin', es: '¿Cómo duermes y gestionas el estrés?',
    en: 'How is your sleep and stress?',
    opts: [
      { es: 'Bien', en: 'Well', w: {} },
      { es: 'Regular', en: 'So-so', w: { face: 1 } },
      { es: 'Duermo poco / estrés alto', en: 'Poor sleep / high stress', w: { face: 2, breathing: 1 } },
    ],
  },
]

// Mapa de categoría de trabajo -> ejercicios y lección recomendada
const AREA = {
  palate:    { es: 'Lengua y paladar', en: 'Tongue & palate', lesson: 'mewing', color: 'palate' },
  jaw:       { es: 'Mandíbula y masetero', en: 'Jaw & masseter', lesson: 'masseter', color: 'jaw' },
  breathing: { es: 'Respiración nasal', en: 'Nasal breathing', lesson: 'nasal', color: 'breathing' },
  posture:   { es: 'Postura y cuello', en: 'Posture & neck', lesson: 'posture', color: 'posture' },
  fascia:    { es: 'Liberación de fascia', en: 'Fascia release', lesson: 'fascia', color: 'fascia' },
  face:      { es: 'Piel, sueño y estrés', en: 'Skin, sleep & stress', lesson: 'skin', color: 'face' },
  chain:     { es: 'La cadena (cuerpo)', en: 'The chain (body)', lesson: 'chains-intro', color: 'chain' },
}

const AREA_MSG = {
  palate:    { es: 'La postura lingual sostiene el tercio medio de la cara. Trabaja el mewing como hábito de 24 h.', en: 'Tongue posture supports the midface. Work mewing as a 24h habit.' },
  jaw:       { es: 'El masetero da definición. Actívalo con control y luego relaja la fascia.', en: 'The masseter gives definition. Activate with control, then release fascia.' },
  breathing: { es: 'Respirar por la boca alarga la cara y la hincha. Recupera la respiración nasal, también de noche.', en: 'Mouth breathing lengthens and puffs the face. Restore nasal breathing, day and night.' },
  posture:   { es: 'La cabeza adelantada difumina la mandíbula y crea papada aparente. Es el cambio más rápido.', en: 'Forward head blurs the jaw and creates apparent double chin. The fastest change.' },
  fascia:    { es: 'La tensión de mandíbula y sienes tira de toda la cara. Presión lenta y sostenida.', en: 'Jaw and temple tension pulls on the whole face. Slow, sustained pressure.' },
  face:      { es: 'El sueño y el estrés se ven en la piel. Es la base sobre la que trabaja todo lo demás.', en: 'Sleep and stress show in the skin. The base everything else rests on.' },
  chain:     { es: 'Tu cara está unida a tus pies por la fascia. Si pasas horas sentado, libera la cadena entera.', en: 'Your face is linked to your feet by fascia. If you sit a lot, release the whole chain.' },
}

export default function Assess() {
  const { lang, isPro } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const es = lang === 'es'
  const done = step >= QUESTIONS.length

  function answer(qi, oi) {
    setAnswers({ ...answers, [QUESTIONS[qi].id]: oi })
    setStep(step + 1)
  }

  // Suma de pesos por área
  const scores = {}
  QUESTIONS.forEach(q => {
    const oi = answers[q.id]
    if (oi == null) return
    const w = q.opts[oi].w
    Object.keys(w).forEach(k => { scores[k] = (scores[k] || 0) + w[k] })
  })
  const ranked = Object.keys(scores)
    .filter(k => scores[k] > 0)
    .sort((a, b) => scores[b] - scores[a])

  // Ejercicios recomendados de las 2-3 áreas top
  const topAreas = ranked.slice(0, 3)
  const recExercises = topAreas
    .flatMap(area => exercises.filter(e => e.category === area && !e.pro))
    .slice(0, 5)

  return (
    <div className="flex flex-col min-h-full pb-28 animate-fade-in">
      <div className="px-5 pt-16 pb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted text-sm mb-4 active:text-warm w-fit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {es ? 'Volver' : 'Back'}
        </button>
        <h1 className="text-3xl font-semibold text-warm tracking-tight mb-1">{es ? 'Tu punto de partida' : 'Your starting point'}</h1>
        <p className="text-muted text-sm">{es ? 'Obsérvate y responde. Te oriento sobre qué trabajar.' : 'Observe yourself and answer. I point you to what to work on.'}</p>
      </div>

      {!done && (
        <div className="px-5">
          {/* progreso */}
          <div className="flex gap-1.5 mb-6">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full flex-1 ${i < step ? 'bg-accent' : 'bg-border'}`} />
            ))}
          </div>
          <p className="text-warm text-lg font-medium mb-1">{QUESTIONS[step][lang]}</p>
          <p className="text-stone-600 text-xs mb-6">{es ? `Pregunta ${step + 1} de ${QUESTIONS.length}` : `Question ${step + 1} of ${QUESTIONS.length}`}</p>
          <div className="space-y-2.5">
            {QUESTIONS[step].opts.map((o, oi) => (
              <button key={oi} onClick={() => answer(step, oi)}
                className="w-full text-left rounded-2xl p-4 border border-border bg-card active:border-accent/50 active:bg-accent/10 transition-colors">
                <span className="text-warm text-sm font-medium">{o[lang]}</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-muted text-xs mt-6 active:text-warm">
              {es ? '← Pregunta anterior' : '← Previous'}
            </button>
          )}
        </div>
      )}

      {done && (
        <div className="px-5 animate-fade-in">
          {/* aviso honesto */}
          <div className="rounded-2xl border border-border bg-card p-4 mb-5" style={{ borderLeftWidth: 3, borderLeftColor: '#c9a96e' }}>
            <p className="text-stone-400 text-xs leading-relaxed">
              {es
                ? 'Esto es una orientación a partir de lo que TÚ observas, no un diagnóstico. En adultos no se remodela el hueso, pero tono, postura, fascia e hinchazón sí cambian. Ante dolor o dudas médicas, consulta a un profesional.'
                : 'This is guidance from what YOU observe, not a diagnosis. In adults bone does not remodel, but tone, posture, fascia and puffiness do change. For pain or medical questions, see a professional.'}
            </p>
          </div>

          {ranked.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-5 text-center mb-5">
              <p className="text-warm font-medium text-sm mb-1">{es ? 'Vas muy bien' : 'You are doing great'}</p>
              <p className="text-muted text-xs">{es ? 'No has marcado puntos claros a mejorar. Mantén tus hábitos y usa las rutinas para conservar el tono.' : 'No clear weak points. Keep your habits and use the routines to maintain tone.'}</p>
            </div>
          ) : (
            <>
              <p className="text-xs uppercase tracking-widest text-accent mb-3">{es ? 'En qué centrarte' : 'What to focus on'}</p>
              <div className="space-y-2 mb-7">
                {topAreas.map(area => (
                  <div key={area} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center flex-shrink-0">
                        <ExerciseIcon type={AREA[area].color} category={AREA[area].color} size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="text-warm font-medium text-sm">{AREA[area][lang]}</div>
                      </div>
                      <button onClick={() => navigate('/learn')} className="text-accent text-[11px] font-medium flex-shrink-0">
                        {es ? 'Aprender' : 'Learn'}
                      </button>
                    </div>
                    <p className="text-muted text-xs leading-relaxed">{AREA_MSG[area][lang]}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase tracking-widest text-accent mb-3">{es ? 'Empieza por estos ejercicios' : 'Start with these exercises'}</p>
              <div className="space-y-2 mb-7">
                {recExercises.map((e, i) => (
                  <button key={e.id} onClick={() => navigate(`/exercise/${e.id}`)}
                    className="w-full flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-left active:scale-[0.98] transition-transform">
                    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center flex-shrink-0">
                      <ExerciseIcon type={e.icon} category={e.category} size={17} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-warm text-sm font-medium">{e[lang].name}</div>
                      <div className="text-muted text-[11px]">{e[lang].subtitle}</div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-stone-600 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </>
          )}

          <button onClick={() => navigate('/generate')}
            className="w-full bg-accent font-semibold py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-transform mb-3"
            style={{ color: '#15100b' }}>
            {es ? 'Generar una rutina a medida' : 'Generate a routine'}
          </button>
          <button onClick={() => { setStep(0); setAnswers({}) }}
            className="w-full border border-border text-muted text-sm py-3.5 rounded-2xl active:bg-card transition-colors">
            {es ? 'Repetir el test' : 'Retake'}
          </button>

          <p className="text-stone-600 text-[11px] leading-relaxed mt-6 text-center">
            {es
              ? 'Consejo: hazte una foto de frente y perfil hoy en Progreso. Repite el test cada 4-6 semanas y compara.'
              : 'Tip: take a front and side photo today in Progress. Retake this every 4-6 weeks and compare.'}
          </p>
        </div>
      )}
    </div>
  )
}
