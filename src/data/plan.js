// 30-day progressive plan. Each day references a routine id and a focus label.
export const plan30 = [
  // Week 1 — Base
  { day: 1,  week: 1, routine: 'morning',   focus: 'base' },
  { day: 2,  week: 1, routine: 'jaw-focus', focus: 'base' },
  { day: 3,  week: 1, routine: 'morning',   focus: 'base' },
  { day: 4,  week: 1, routine: 'night',     focus: 'base' },
  { day: 5,  week: 1, routine: 'jaw-focus', focus: 'base' },
  { day: 6,  week: 1, routine: 'morning',   focus: 'base' },
  { day: 7,  week: 1, routine: null,        focus: 'rest' },

  // Week 2 — Estructura
  { day: 8,  week: 2, routine: 'morning',        focus: 'structure' },
  { day: 9,  week: 2, routine: 'jaw-focus',      focus: 'structure' },
  { day: 10, week: 2, routine: 'night',           focus: 'structure' },
  { day: 11, week: 2, routine: 'breathing-deep',  focus: 'structure' },
  { day: 12, week: 2, routine: 'jaw-focus',       focus: 'structure' },
  { day: 13, week: 2, routine: 'morning',         focus: 'structure' },
  { day: 14, week: 2, routine: null,              focus: 'rest' },

  // Week 3 — Intensidad
  { day: 15, week: 3, routine: 'morning',        focus: 'intensity' },
  { day: 16, week: 3, routine: 'posture-reset',  focus: 'intensity' },
  { day: 17, week: 3, routine: 'breathing-deep', focus: 'intensity' },
  { day: 18, week: 3, routine: 'jaw-focus',      focus: 'intensity' },
  { day: 19, week: 3, routine: 'full-face',      focus: 'intensity' },
  { day: 20, week: 3, routine: 'night',          focus: 'intensity' },
  { day: 21, week: 3, routine: null,             focus: 'rest' },

  // Week 4 — Consolidación
  { day: 22, week: 4, routine: 'full-face',      focus: 'consolidation' },
  { day: 23, week: 4, routine: 'posture-reset',  focus: 'consolidation' },
  { day: 24, week: 4, routine: 'breathing-deep', focus: 'consolidation' },
  { day: 25, week: 4, routine: 'full-face',      focus: 'consolidation' },
  { day: 26, week: 4, routine: 'jaw-focus',      focus: 'consolidation' },
  { day: 27, week: 4, routine: 'posture-reset',  focus: 'consolidation' },
  { day: 28, week: 4, routine: null,             focus: 'rest' },

  // Bonus days
  { day: 29, week: 4, routine: 'full-face',  focus: 'consolidation' },
  { day: 30, week: 4, routine: 'night',      focus: 'consolidation' },
]

export const focusLabels = {
  es: {
    base:          'Semana 1 · Base',
    structure:     'Semana 2 · Estructura',
    intensity:     'Semana 3 · Intensidad',
    consolidation: 'Semana 4 · Consolidación',
    rest:          'Descanso',
  },
  en: {
    base:          'Week 1 · Base',
    structure:     'Week 2 · Structure',
    intensity:     'Week 3 · Intensity',
    consolidation: 'Week 4 · Consolidation',
    rest:          'Rest',
  },
}
