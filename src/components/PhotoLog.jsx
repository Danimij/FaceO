import { useRef, useState } from 'react'
import { useApp } from '../context/AppContext'

// Compress an image file to a small JPEG data URL so it fits in localStorage.
function compress(file, maxSize = 640, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > height && width > maxSize) { height = height * maxSize / width; width = maxSize }
        else if (height > maxSize) { width = width * maxSize / height; height = maxSize }
        const canvas = document.createElement('canvas')
        canvas.width = width; canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function fmt(iso, lang) {
  return new Date(iso).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'short' })
}

export default function PhotoLog() {
  const { lang, photos, addPhoto, deletePhoto } = useApp()
  const inputRef = useRef(null)
  const [compare, setCompare] = useState(false)
  const [busy, setBusy] = useState(false)

  const tx = {
    es: { title: 'Progreso visual', add: 'Añadir foto', hint: 'Haz una foto de frente y de perfil cada semana, misma luz. Se guardan solo en tu móvil.',
      compare: 'Antes / Después', first: 'Primera', last: 'Última', empty: 'Sin fotos aún. Haz tu primera foto para comparar tu evolución.' },
    en: { title: 'Visual progress', add: 'Add photo', hint: 'Take a front and side photo each week, same lighting. Stored only on your device.',
      compare: 'Before / After', first: 'First', last: 'Latest', empty: 'No photos yet. Take your first to compare your progress.' },
  }[lang]

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try { addPhoto(await compress(file)) } catch {}
    setBusy(false)
    e.target.value = ''
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted text-xs uppercase tracking-widest">{tx.title}</h3>
        {photos.length >= 2 && (
          <button onClick={() => setCompare(c => !c)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${compare ? 'border-accent/40 text-accent bg-accent/10' : 'border-border text-muted'}`}>
            {tx.compare}
          </button>
        )}
      </div>

      {photos.length === 0 && (
        <p className="text-stone-600 text-sm mb-4 leading-relaxed">{tx.empty}</p>
      )}

      {compare && photos.length >= 2 ? (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[{ p: photos[0], label: tx.first }, { p: photos[photos.length - 1], label: tx.last }].map(({ p, label }, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-border">
              <img src={p.data} alt="" className="w-full aspect-[3/4] object-cover" />
              <div className="bg-card px-3 py-2 flex items-center justify-between">
                <span className="text-warm text-xs font-medium">{label}</span>
                <span className="text-muted text-[10px]">{fmt(p.date, lang)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[...photos].reverse().map((p, ri) => {
              const idx = photos.length - 1 - ri
              return (
                <div key={idx} className="relative rounded-xl overflow-hidden border border-border group">
                  <img src={p.data} alt="" className="w-full aspect-[3/4] object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1">
                    <span className="text-white text-[10px]">{fmt(p.date, lang)}</span>
                  </div>
                  <button onClick={() => deletePhoto(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xs">✕</button>
                </div>
              )
            })}
          </div>
        )
      )}

      <input ref={inputRef} type="file" accept="image/*" capture="user" onChange={onFile} className="hidden" />
      <button onClick={() => inputRef.current?.click()} disabled={busy}
        className="w-full border border-border text-stone-300 text-sm font-medium py-3.5 rounded-2xl active:bg-card transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
        {busy ? '…' : tx.add}
      </button>
      <p className="text-stone-700 text-[11px] leading-relaxed mt-2">{tx.hint}</p>
    </div>
  )
}
