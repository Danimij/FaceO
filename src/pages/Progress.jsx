import { useApp } from '../context/AppContext'
import { t } from '../data/i18n'
import { exercises } from '../data/exercises'
import PhotoLog from '../components/PhotoLog'

const DAYS_ES = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const DAYS_EN = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

export default function Progress() {
  const { lang, progress } = useApp()
  const tx = t[lang].progress

  const last7 = getLast7Days()
  const historyMap = {}
  progress.history.forEach(h => { historyMap[h.date] = h })

  const dayLabels = lang === 'es' ? DAYS_ES : DAYS_EN
  const todayIdx = new Date().getDay()
  const orderedLabels = [...dayLabels.slice(todayIdx === 0 ? 6 : todayIdx - 1), ...dayLabels.slice(0, todayIdx === 0 ? 6 : todayIdx - 1)]

  if (progress.totalSessions === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-5 pb-24 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full border border-stone-800 flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="#44403c" strokeWidth="1.4" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <p className="text-stone-500 text-sm">{tx.no_data}</p>
      </div>
    )
  }

  const maxExercises = Math.max(...last7.map(d => historyMap[d]?.exercises?.length || 0), 1)

  return (
    <div className="flex flex-col min-h-full px-5 pt-14 pb-24 max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-semibold text-warm tracking-tight mb-8">{tx.title}</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-3xl font-light text-warm mb-0.5">{progress.streak}</div>
          <div className="text-muted text-xs uppercase tracking-widest">{tx.streak}</div>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-3xl font-light text-warm mb-0.5">{progress.bestStreak}</div>
          <div className="text-muted text-xs uppercase tracking-widest">{tx.best_streak}</div>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-3xl font-light text-warm mb-0.5">{progress.totalSessions}</div>
          <div className="text-muted text-xs uppercase tracking-widest">{tx.sessions}</div>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="text-3xl font-light text-warm mb-0.5">{progress.totalMinutes}</div>
          <div className="text-muted text-xs uppercase tracking-widest">{tx.minutes}</div>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <h3 className="text-muted text-xs uppercase tracking-widest mb-5">{tx.week}</h3>
        <div className="flex items-end gap-2 h-24">
          {last7.map((date, i) => {
            const count = historyMap[date]?.exercises?.length || 0
            const height = count > 0 ? Math.max((count / maxExercises) * 100, 12) : 4
            const isToday = i === 6
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end" style={{ height: 80 }}>
                  <div
                    className={`w-full rounded-t-sm transition-all duration-500 ${
                      isToday ? 'bg-accent' : count > 0 ? 'bg-stone-600/80' : 'bg-border/30'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className={`text-[10px] ${isToday ? 'text-accent' : 'text-muted'}`}>
                  {orderedLabels[i]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* History */}
      <h3 className="text-muted text-xs uppercase tracking-widest mb-4">{tx.history}</h3>
      <div className="space-y-2">
        {[...progress.history].reverse().slice(0, 10).map((h, i) => {
          const date = new Date(h.date)
          const label = date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', {
            weekday: 'long', day: 'numeric', month: 'short'
          })
          return (
            <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-stone-300 text-sm capitalize">{label}</div>
                <div className="text-muted text-xs mt-0.5">
                  {h.exercises?.length || 0} {tx.completed_exercises} · {h.minutes || 0} min
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent/60" />
            </div>
          )
        })}
      </div>
      <PhotoLog />
    </div>
  )
}
