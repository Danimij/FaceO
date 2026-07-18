import { exercises } from './exercises'

// Generador de rutinas — cada sesión es distinta (idea tomada de Down Dog).
// Regla clave: la fascia se libera de abajo arriba. Primero se sueltan los
// eslabones que "tiran" (pies, cadera, tronco) y sólo después se trabaja la
// cara. Hacerlo al revés es trabajar contra una cadena que sigue tensa.

// Orden anatómico de la cadena. Peso menor = más abajo = antes.
const ORDER = {
  chain: 1,      // pies, psoas, diafragma, torácica, costados
  posture: 2,    // cuello y alineación
  fascia: 3,     // liberación de cráneo/mandíbula
  breathing: 4,  // respiración (puente cuerpo-cara)
  palate: 5,     // lengua
  jaw: 6,        // mandíbula
  face: 7,       // musculatura facial
}

export const FOCUSES = [
  {
    id: 'full', es: 'Cadena completa', en: 'Full chain',
    esSub: 'De los pies a la cara', enSub: 'From feet to face',
    cats: ['chain', 'posture', 'fascia', 'breathing', 'palate', 'jaw', 'face'],
  },
  {
    id: 'deepfront', es: 'Línea frontal profunda', en: 'Deep front line',
    esSub: 'Lengua, diafragma, psoas y pie', enSub: 'Tongue, diaphragm, psoas and foot',
    cats: ['chain', 'breathing', 'palate', 'jaw'],
    chains: ['deepfront'],
  },
  {
    id: 'techneck', es: 'Cuello y postura', en: 'Neck & posture',
    esSub: 'Deshacer el cuello adelantado', enSub: 'Undo forward head',
    cats: ['chain', 'posture', 'fascia'],
  },
  {
    id: 'jawline', es: 'Mandíbula', en: 'Jawline',
    esSub: 'Definición y liberación', enSub: 'Definition and release',
    cats: ['fascia', 'jaw', 'palate', 'posture'],
  },
  {
    id: 'face', es: 'Solo rostro', en: 'Face only',
    esSub: 'Cuando tienes poco tiempo', enSub: 'When you are short on time',
    cats: ['face', 'palate', 'jaw', 'fascia'],
  },
]

export const DURATIONS = [3, 5, 10, 15]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Compone una rutina para un foco y una duración.
 * Devuelve un objeto con la misma forma que las rutinas estáticas,
 * para que el reproductor existente pueda ejecutarla sin cambios.
 */
export function generateRoutine(focusId, minutes, lang = 'es') {
  const focus = FOCUSES.find(f => f.id === focusId) || FOCUSES[0]
  const budget = minutes * 60

  // Candidatos: por categoría del foco y, si lo pide, por línea fascial.
  let pool = exercises.filter(e => focus.cats.includes(e.category))
  if (focus.chains) {
    pool = pool.filter(e => !e.chain || e.chain.some(c => focus.chains.includes(c)))
  }

  // Un ejercicio por categoría primero (variedad), barajando dentro de cada una.
  const byCat = {}
  shuffle(pool).forEach(e => { (byCat[e.category] ||= []).push(e) })

  const picked = []
  let total = 0
  // Primera pasada: cubrir cada categoría del foco.
  focus.cats.forEach(cat => {
    const list = byCat[cat]
    if (!list || !list.length) return
    const e = list.shift()
    if (total + e.durationSec <= budget || picked.length === 0) {
      picked.push(e); total += e.durationSec
    }
  })
  // Segunda pasada: rellenar el tiempo restante con los que queden.
  const rest = shuffle(Object.values(byCat).flat())
  for (const e of rest) {
    if (picked.includes(e)) continue
    if (total + e.durationSec > budget) continue
    picked.push(e); total += e.durationSec
  }

  // Ordenar de abajo arriba: así se libera la cadena antes de trabajar la cara.
  picked.sort((a, b) => (ORDER[a.category] || 9) - (ORDER[b.category] || 9))

  const isEs = lang === 'es'
  return {
    id: 'generated',
    generated: true,
    pro: false,
    durationMin: Math.max(1, Math.round(total / 60)),
    exercises: picked.map(e => e.id),
    focusId: focus.id,
    es: {
      name: focus.es,
      subtitle: focus.esSub,
      description: `Rutina generada de ${Math.max(1, Math.round(total / 60))} min con ${picked.length} ejercicios, ordenados de abajo arriba para liberar la cadena antes de trabajar el rostro. Cada vez que la generas, cambia.`,
    },
    en: {
      name: focus.en,
      subtitle: focus.enSub,
      description: `Generated ${Math.max(1, Math.round(total / 60))} min routine with ${picked.length} exercises, ordered bottom-up to release the chain before working the face. It changes every time you generate it.`,
    },
    _lang: isEs ? 'es' : 'en',
  }
}
