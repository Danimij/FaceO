import { createContext, useContext, useState, useEffect, useRef } from 'react'

// Hitos de racha que se celebran (enganche honesto: marcar el progreso real)
const STREAK_MILESTONES = [3, 7, 14, 21, 30, 50, 75, 100, 150, 200, 365]

const AppContext = createContext(null)

const defaultProgress = {
  streak: 0,
  lastDate: null,
  totalSessions: 0,
  totalMinutes: 0,
  completedToday: [],
  history: [],
  bestStreak: 0,
  freezeMonth: null, // YYYY-MM when the monthly streak-freeze was used
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('forma_lang') || 'es')
  const [isPro, setIsPro] = useState(() => localStorage.getItem('forma_pro') === 'true')
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('forma_progress')) || defaultProgress
    } catch {
      return defaultProgress
    }
  })
  const [reminderEnabled, setReminderEnabled] = useState(
    () => localStorage.getItem('forma_reminder') === 'true'
  )
  const [reminderTime, setReminderTime] = useState(
    () => localStorage.getItem('forma_reminder_time') || '09:00'
  )
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem('forma_onboarded') === 'true'
  )
  const [goal, setGoal] = useState(() => localStorage.getItem('forma_goal') || 'jaw')
  // Última rutina generada — se guarda para que el reproductor pueda abrirla
  // y para que siga ahí si el usuario recarga a mitad.
  const [generatedRoutine, setGeneratedRoutine] = useState(() => {
    try { return JSON.parse(localStorage.getItem('faceo_generated')) || null } catch { return null }
  })
  function saveGeneratedRoutine(r) {
    setGeneratedRoutine(r)
    try { localStorage.setItem('faceo_generated', JSON.stringify(r)) } catch {}
  }

  const [photos, setPhotos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('forma_photos')) || [] } catch { return [] }
  })

  // MAGIC_PRO — enlace mágico: ?pro=CODIGO activa Pro sin escribir nada
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('pro')
      if (!q) return
      if (['FACEO2024', 'FACEOPROX', 'FACEOPRO1', 'DANIMIJ-FULL'].includes(q.trim().toUpperCase())) {
        setIsPro(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch {}
  }, [])

  // Celebración de hitos de racha: se dispara cuando la racha CRECE hasta un hito.
  const [celebration, setCelebration] = useState(null)
  const prevStreakRef = useRef(progress.streak)
  useEffect(() => {
    if (progress.streak > prevStreakRef.current && STREAK_MILESTONES.includes(progress.streak)) {
      setCelebration(progress.streak)
    }
    prevStreakRef.current = progress.streak
  }, [progress.streak])

  useEffect(() => {
    localStorage.setItem('forma_lang', lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem('forma_pro', isPro)
  }, [isPro])

  useEffect(() => {
    localStorage.setItem('forma_progress', JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem('forma_reminder', reminderEnabled)
  }, [reminderEnabled])

  useEffect(() => {
    localStorage.setItem('forma_reminder_time', reminderTime)
  }, [reminderTime])

  useEffect(() => {
    localStorage.setItem('forma_onboarded', onboarded)
  }, [onboarded])

  useEffect(() => {
    localStorage.setItem('forma_goal', goal)
  }, [goal])

  useEffect(() => {
    try { localStorage.setItem('forma_photos', JSON.stringify(photos)) } catch {}
  }, [photos])

  // Daily reminder: when the app opens past the chosen time and it hasn't fired
  // today, show a local notification (works while the PWA is opened).
  useEffect(() => {
    if (!reminderEnabled) return
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return
    const today = new Date().toISOString().split('T')[0]
    if (localStorage.getItem('forma_reminder_fired') === today) return
    const [h, m] = reminderTime.split(':').map(Number)
    const now = new Date()
    const target = new Date(); target.setHours(h, m, 0, 0)
    if (now >= target && progress.lastDate !== today) {
      new Notification('FACEO', {
        body: lang === 'es'
          ? 'Es tu momento de entrenar. Mantén tu racha 💪'
          : 'Time to train. Keep your streak going 💪',
      })
      localStorage.setItem('forma_reminder_fired', today)
    }
  }, [reminderEnabled, reminderTime, progress.lastDate, lang])

  function addPhoto(dataUrl) {
    const entry = { date: new Date().toISOString(), data: dataUrl }
    setPhotos(prev => [...prev, entry].slice(-24))
  }
  function deletePhoto(idx) {
    setPhotos(prev => prev.filter((_, i) => i !== idx))
  }

  function completeExercise(exerciseId, durationMin) {
    const today = new Date().toISOString().split('T')[0]
    setProgress(prev => {
      const isNewDay = prev.lastDate !== today
      const alreadyDone = prev.completedToday.includes(exerciseId)

      if (alreadyDone) return prev

      const newCompleted = [...prev.completedToday, exerciseId]
      let newStreak = prev.streak
      let newBestStreak = prev.bestStreak

      let newFreezeMonth = prev.freezeMonth
      if (isNewDay) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yStr = yesterday.toISOString().split('T')[0]
        const dayBefore = new Date()
        dayBefore.setDate(dayBefore.getDate() - 2)
        const dbStr = dayBefore.toISOString().split('T')[0]
        const thisMonth = today.slice(0, 7)
        if (prev.lastDate === yStr) {
          newStreak = prev.streak + 1
        } else if (prev.lastDate === dbStr && prev.freezeMonth !== thisMonth && prev.streak > 0) {
          // one missed day + monthly freeze available -> keep the streak alive
          newStreak = prev.streak + 1
          newFreezeMonth = thisMonth
        } else {
          newStreak = 1
        }
        newBestStreak = Math.max(newStreak, prev.bestStreak)
      }

      const newHistory = [...prev.history]
      if (isNewDay || newHistory.length === 0) {
        newHistory.push({ date: today, exercises: [exerciseId], minutes: durationMin })
      } else {
        const last = { ...newHistory[newHistory.length - 1] }
        last.exercises = [...last.exercises, exerciseId]
        last.minutes = (last.minutes || 0) + durationMin
        newHistory[newHistory.length - 1] = last
      }

      return {
        ...prev,
        lastDate: today,
        completedToday: isNewDay ? [exerciseId] : newCompleted,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + durationMin,
        streak: newStreak,
        bestStreak: newBestStreak,
        freezeMonth: newFreezeMonth,
        history: newHistory.slice(-60),
      }
    })
  }

  function resetToday() {
    setProgress(prev => ({ ...prev, completedToday: [] }))
  }

  return (
    <AppContext.Provider value={{
      lang, setLang,
      isPro, setIsPro,
      generatedRoutine, saveGeneratedRoutine,
      progress,
      completeExercise,
      resetToday,
      reminderEnabled, setReminderEnabled,
      reminderTime, setReminderTime,
      onboarded, setOnboarded,
      goal, setGoal,
      photos, addPhoto, deletePhoto,
      celebration, clearCelebration: () => setCelebration(null),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
