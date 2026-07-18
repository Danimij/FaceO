const COLORS = {
  palate:   '#c9a96e',
  jaw:      '#a08060',
  posture:  '#7a9a8a',
  breathing:'#6a8aaa',
  face:     '#9a7a9a',
  fascia:   '#5aa89a',
  chain:    '#8a9ac4',
}

export default function ExerciseIcon({ type, category, size = 28, color }) {
  const c = color || COLORS[category] || '#c9a96e'
  const p = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none' }

  if (type === 'tongue') return (
    <svg {...p}>
      <ellipse cx="16" cy="14" rx="9" ry="10" stroke={c} strokeWidth="1.5"/>
      <path d="M11 20 Q16 28 21 20" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="12" r="2" fill={c} opacity="0.4"/>
    </svg>
  )

  if (type === 'arch') return (
    <svg {...p}>
      <path d="M7 22 Q7 8 16 8 Q25 8 25 22" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 22 Q10 13 16 13 Q22 13 22 22" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M7 22 H25" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )

  if (type === 'jaw') return (
    <svg {...p}>
      <path d="M8 8 H24 Q26 8 26 10 L26 20 Q26 26 16 26 Q6 26 6 20 L6 10 Q6 8 8 8Z" stroke={c} strokeWidth="1.5"/>
      <path d="M10 15 H22" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M11 19 H21" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <circle cx="12" cy="11" r="1" fill={c} opacity="0.5"/>
      <circle cx="20" cy="11" r="1" fill={c} opacity="0.5"/>
    </svg>
  )

  if (type === 'chin') return (
    <svg {...p}>
      <circle cx="16" cy="10" r="6" stroke={c} strokeWidth="1.5"/>
      <path d="M10 16 Q10 22 16 24 Q22 22 22 16" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 28 H19" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 24 V28" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )

  if (type === 'nose') return (
    <svg {...p}>
      <path d="M16 4 C16 4 16 14 12 18 Q10 20 10 22 Q10 25 13 25 H19 Q22 25 22 22 Q22 20 20 18 C16 14 16 4 16 4Z" stroke={c} strokeWidth="1.5"/>
      <path d="M13 25 Q13 27 16 27 Q19 27 19 25" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )

  if (type === 'lungs') return (
    <svg {...p}>
      <path d="M16 4 V14" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 8 C16 8 10 10 8 14 Q6 18 8 22 Q10 26 14 26 L16 26" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 8 C16 8 22 10 24 14 Q26 18 24 22 Q22 26 18 26 L16 26" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="26" r="1.5" fill={c} opacity="0.6"/>
    </svg>
  )

  if (type === 'neck') return (
    <svg {...p}>
      <circle cx="16" cy="8" r="5" stroke={c} strokeWidth="1.5"/>
      <path d="M12 13 L11 26" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 13 L21 26" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 19 H21" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M11 26 H21" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )

  if (type === 'face') return (
    <svg {...p}>
      <circle cx="16" cy="13" r="8" stroke={c} strokeWidth="1.5"/>
      <circle cx="12.5" cy="11.5" r="1.5" fill={c} opacity="0.7"/>
      <circle cx="19.5" cy="11.5" r="1.5" fill={c} opacity="0.7"/>
      <path d="M11 16 Q16 21 21 16" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 24 Q16 28 22 24" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )

  if (type === 'foot') return (
    <svg {...p}>
      <path d="M12 25c0-3-1-5-1-8 0-4 2-7 5-7s5 3 5 6c0 4-2 6-2 9" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1.4" stroke={c} strokeWidth="1.2"/>
      <circle cx="15.5" cy="6.5" r="1.4" stroke={c} strokeWidth="1.2"/>
      <circle cx="19" cy="6.5" r="1.3" stroke={c} strokeWidth="1.2"/>
      <path d="M11 25h8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )

  if (type === 'hips') return (
    <svg {...p}>
      <path d="M9 7c0 5 1 7 3 9M23 7c0 5-1 7-3 9" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 16h8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 16c-1 4-2 6-3 9M19 16c1 4 2 6 3 9" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )

  if (type === 'spine') return (
    <svg {...p}>
      <path d="M16 4c-2 3 2 5 0 8s2 5 0 8 2 5 0 8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7h8M12 13h8M12 19h8M12 25h8" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )

  return (
    <svg {...p}>
      <circle cx="16" cy="10" r="6" stroke={c} strokeWidth="1.5"/>
      <path d="M6 28 Q6 20 16 20 Q26 20 26 28" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
