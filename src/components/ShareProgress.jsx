import { useState } from 'react'
import { useApp } from '../context/AppContext'

// Draws a branded progress card on a canvas and shares/downloads it.
function drawCard(progress, lang) {
  const W = 1080, H = 1080
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const x = c.getContext('2d')

  // background
  const g = x.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, '#1e1811'); g.addColorStop(1, '#100c08')
  x.fillStyle = g; x.fillRect(0, 0, W, H)

  // accent ring
  x.strokeStyle = 'rgba(201,169,110,0.25)'; x.lineWidth = 3
  x.beginPath(); x.arc(W / 2, 300, 150, 0, Math.PI * 2); x.stroke()

  // logo F
  x.fillStyle = '#c9a96e'
  x.font = '600 180px Georgia, serif'
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('F', W / 2, 300)

  // title
  x.fillStyle = '#f0ede8'
  x.font = '600 64px Inter, sans-serif'
  x.fillText('FACEO', W / 2, 500)

  // streak big
  x.fillStyle = '#c9a96e'
  x.font = '300 220px Inter, sans-serif'
  x.fillText(String(progress.streak), W / 2, 700)
  x.fillStyle = '#8a8177'
  x.font = '500 40px Inter, sans-serif'
  x.fillText(lang === 'es' ? 'DÍAS DE RACHA' : 'DAY STREAK', W / 2, 830)

  // stats row
  x.fillStyle = '#f0ede8'
  x.font = '600 52px Inter, sans-serif'
  x.fillText(`${progress.totalSessions}`, W / 2 - 220, 940)
  x.fillText(`${progress.totalMinutes}`, W / 2 + 220, 940)
  x.fillStyle = '#8a8177'; x.font = '400 30px Inter, sans-serif'
  x.fillText(lang === 'es' ? 'sesiones' : 'sessions', W / 2 - 220, 990)
  x.fillText(lang === 'es' ? 'minutos' : 'minutes', W / 2 + 220, 990)

  x.fillStyle = '#6b6560'; x.font = '400 30px Inter, sans-serif'
  x.fillText('danimij.github.io/FaceO', W / 2, 1040)

  return c
}

export default function ShareProgress() {
  const { lang, progress } = useApp()
  const [busy, setBusy] = useState(false)

  async function share() {
    setBusy(true)
    try {
      const canvas = drawCard(progress, lang)
      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'))
      const file = new File([blob], 'faceo-progreso.png', { type: 'image/png' })
      const text = lang === 'es'
        ? `${progress.streak} días de racha en FACEO 💪`
        : `${progress.streak}-day streak on FACEO 💪`
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = 'faceo-progreso.png'; a.click()
        URL.revokeObjectURL(url)
      }
    } catch {}
    setBusy(false)
  }

  return (
    <button onClick={share} disabled={busy}
      className="w-full border border-border text-stone-300 text-sm font-medium py-3.5 rounded-2xl active:bg-card transition-colors flex items-center justify-center gap-2 mt-3 disabled:opacity-50">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
      {lang === 'es' ? 'Compartir mi progreso' : 'Share my progress'}
    </button>
  )
}
