export default function ExerciseIcon({ type, size = 28, color = '#c9b99a' }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: '1.4', strokeLinecap: 'round', strokeLinejoin: 'round' }

  if (type === 'tongue' || type === 'arch') return (
    <svg {...props}>
      <path d="M12 3C8 3 5 6 5 10c0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" />
      <path d="M9 11c0 1.66 1.34 3 3 3s3-1.34 3-3" />
    </svg>
  )

  if (type === 'jaw') return (
    <svg {...props}>
      <path d="M6 4h12M6 4c0 8 2 12 6 14 4-2 6-6 6-14" />
      <path d="M9 10h6M9 13h6" />
    </svg>
  )

  if (type === 'chin') return (
    <svg {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M8 14c0 3 2 5 4 6 2-1 4-3 4-6" />
      <path d="M7 20h10" />
    </svg>
  )

  if (type === 'nose') return (
    <svg {...props}>
      <path d="M12 3v10" />
      <path d="M9 13c-2 0-3 1.5-3 3s1.34 3 3 3h6c1.66 0 3-1.34 3-3s-1-3-3-3" />
      <path d="M10 13c-.5-1-1-3-1-5" />
      <path d="M14 13c.5-1 1-3 1-5" />
    </svg>
  )

  if (type === 'lungs') return (
    <svg {...props}>
      <path d="M12 3v9" />
      <path d="M6 8c-2 1-3 3-3 5 0 3 2.5 5 5 5h1V8" />
      <path d="M18 8c2 1 3 3 3 5 0 3-2.5 5-5 5h-1V8" />
    </svg>
  )

  if (type === 'neck') return (
    <svg {...props}>
      <path d="M9 3h6M9 21h6" />
      <path d="M9 3c0 3-2 5-2 9s2 6 2 9" />
      <path d="M15 3c0 3 2 5 2 9s-2 6-2 9" />
      <path d="M9 12h6" />
    </svg>
  )

  return (
    <svg {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
    </svg>
  )
}
