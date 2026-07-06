import { useApp } from '../context/AppContext'

// "Don't break the chain" — last 5 weeks, days with activity highlighted.
export default function StreakCalendar() {
  const { lang, progress } = useApp()
  const done = new Set((progress.history || []).map(h => h.date))
  const today = new Date().toISOString().split('T')[0]

  const days = []
  for (let i = 34; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }

  const tx = {
    es: { title: 'No rompas la cadena', sub: `${progress.streak} días seguidos · mejor ${progress.bestStreak}` },
    en: { title: "Don't break the chain", sub: `${progress.streak}-day streak · best ${progress.bestStreak}` },
  }[lang]

  return (
    <div className="bg-card border border-border rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted text-xs uppercase tracking-widest">{tx.title}</h3>
        <span className="text-accent text-xs">{tx.sub}</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map(date => {
          const isDone = done.has(date)
          const isToday = date === today
          return (
            <div key={date}
              className={`aspect-square rounded-md ${
                isDone ? 'bg-accent' : 'bg-border/40'
              } ${isToday ? 'ring-2 ring-accent/60' : ''}`}
            />
          )
        })}
      </div>
    </div>
  )
}
