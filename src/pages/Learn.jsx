import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { lessons } from '../data/lessons'
import ExerciseIcon from '../components/ExerciseIcon'

function LessonDetail({ lesson, lang, onClose }) {
  const l = lesson[lang]
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg animate-slide-up rounded-t-3xl border-t border-border max-h-[88vh] overflow-y-auto" style={{ background: '#1e1811' }}>
        <div className="sticky top-0 flex items-center gap-3 px-6 pt-6 pb-4" style={{ background: '#1e1811' }}>
          <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center flex-shrink-0">
            <ExerciseIcon type={lesson.icon} category={lesson.icon} size={22} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-warm leading-tight">{l.title}</h2>
            <p className="text-muted text-xs">{l.sub}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted flex-shrink-0">✕</button>
        </div>
        <div className="px-6 pb-10">
          {l.sections.map((s, i) => (
            <div key={i} className="mb-4">
              <div className="text-accent text-xs font-semibold uppercase tracking-widest mb-1.5">{s.h}</div>
              <p className="text-stone-300 text-sm leading-relaxed">{s.p}</p>
            </div>
          ))}
          <div className="mt-6">
            <div className="text-warm font-medium text-sm mb-3">{lang === 'es' ? 'Puntos clave' : 'Key points'}</div>
            {l.keys.map((k, i) => (
              <div key={i} className="flex gap-2.5 py-2 border-b border-border">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent flex-shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M12 2.25l2.6 5.5 6 .8-4.3 4.2 1 6L12 15.9 6.7 18.75l1-6L3.4 8.55l6-.8L12 2.25z" clipRule="evenodd" />
                </svg>
                <span className="text-stone-400 text-sm">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Learn() {
  const { lang } = useApp()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">
      <div className="px-5 pt-16 pb-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted text-sm mb-4 active:text-warm w-fit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {lang === 'es' ? 'Volver' : 'Back'}
        </button>
        <h1 className="text-3xl font-semibold text-warm tracking-tight mb-1">{lang === 'es' ? 'Academia' : 'Academy'}</h1>
        <p className="text-muted text-sm">{lang === 'es' ? 'La ciencia detrás de tu cara' : 'The science behind your face'}</p>
      </div>

      <div className="px-5 space-y-2">
        {lessons.map((lesson, i) => {
          const l = lesson[lang]
          return (
            <button key={lesson.id} onClick={() => setSelected(lesson)}
              className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl p-4 text-left active:scale-[0.98] transition-transform">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <span className="text-accent text-xs font-semibold">{i + 1}</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center flex-shrink-0">
                <ExerciseIcon type={lesson.icon} category={lesson.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-warm font-medium text-sm">{l.title}</div>
                <div className="text-muted text-xs">{l.sub}</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-stone-600 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        })}
      </div>

      <div className="px-5 mt-6">
        <a href="academia.html" target="_blank" rel="noopener noreferrer"
          className="block w-full text-center bg-accent/12 border border-accent/30 rounded-2xl p-4 text-accent font-medium text-sm active:scale-[0.98] transition-transform">
          {lang === 'es' ? 'Ver academia completa · 16 lecciones →' : 'See full academy · 16 lessons →'}
        </a>
        <p className="text-muted text-xs text-center mt-2">
          {lang === 'es' ? 'Rostro + los 8 pilares de biohacking, en un solo sitio' : 'Face + the 8 biohacking pillars, in one place'}
        </p>
      </div>

      {selected && <LessonDetail lesson={selected} lang={lang} onClose={() => setSelected(null)} />}
    </div>
  )
}
