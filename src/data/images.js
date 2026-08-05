// Curated Unsplash photos — verified content, free (images.unsplash.com), hotlink-friendly.

const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`

// Verified images:
const PROFILE = '1530821232314-604f58821dd4'  // young man, strong jaw profile at sunset
const FACE    = '1617925357736-8a4ea869b800'  // man profile, clear facial structure
const BREATH  = '1713428856206-d692c1ed42d6'  // man deep breathing, chest open
const NOSE    = '1775133262755-254aeaa47843'  // nasal / pranayama breathing

// Hero: warm canyon sunrise (aspirational, chosen by user)
export const HERO_IMG = 'https://picsum.photos/id/1016/900/600'

export const EXERCISE_IMG = {
  'mewing':               U(PROFILE), // tongue posture — jaw/profile
  'palate-expansion':     U(FACE),
  'jaw-clench':           U(PROFILE), // masseter — jawline
  'chin-tuck':            U(PROFILE), // posture — profile
  'nasal-breathing':      U(NOSE),    // nasal breathing
  'co2-tolerance':        U(BREATH),  // breathing
  'neck-pull':            U(FACE),
  'face-yoga':            U(FACE),
  'temporal-release':     U(FACE),    // fascia — head/face
  'platysma-release':     U(PROFILE), // neck fascia
  'suboccipital-release': U(FACE),    // skull base
  'myofascial-ball':      U(FACE),    // ball release
  'fascial-chains':       U(BREATH),  // full-body fascia mobility

  // Cadena miofascial · cuerpo completo
  'plantar-release':      U(BREATH),
  'posterior-chain':      U(BREATH),
  'psoas-release':        U(BREATH),
  'diaphragm-release':    U(BREATH),  // diafragma — respiración
  'thoracic-mobility':    U(BREATH),
  'front-line-open':      U(BREATH),
  'lateral-line':         U(BREATH),
  'instep-quad':          U(BREATH),
  'abdominal-front':      U(BREATH),
  'it-band-hip':          U(BREATH),
  'adductor-deep':        U(BREATH),
  'throat-floor':         U(PROFILE), // garganta y submentón — perfil
  'spiral-rotation':      U(BREATH),
}

export const CATEGORY_IMG = {
  palate:    U(FACE),
  jaw:       U(PROFILE),
  breathing: U(BREATH),
  posture:   U(PROFILE),
  face:      U(FACE),
  fascia:    U(FACE),
  chain:     U(BREATH),
}

// Red de seguridad: ningún ejercicio debe quedarse sin imagen.
export const FALLBACK_IMG = U(BREATH)
export function exerciseImg(ex) {
  if (!ex) return FALLBACK_IMG
  return EXERCISE_IMG[ex.id] || CATEGORY_IMG[ex.category] || FALLBACK_IMG
}

export const ROUTINE_IMG = {
  'nivel-inicial':  U(BREATH),
  'mouth-myo':      U(PROFILE),
  'morning':        U(BREATH),
  'jaw-focus':      U(PROFILE),
  'night':          U(FACE),
  'breathing-deep': U(NOSE),
  'full-face':      U(FACE),
  'posture-reset':  U(PROFILE),
  'fascia-release': U(FACE),
}
