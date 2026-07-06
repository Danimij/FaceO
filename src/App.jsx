import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import BottomNav from './components/BottomNav'
import Onboarding from './components/Onboarding'
import Home from './pages/Home'
import Train from './pages/Train'
import ExerciseDetail from './pages/ExerciseDetail'
import RoutinePlayer from './pages/RoutinePlayer'
import Plan from './pages/Plan'
import Progress from './pages/Progress'
import Profile from './pages/Profile'

function Shell() {
  const { onboarded } = useApp()
  if (!onboarded) return <Onboarding />
  return (
    <BrowserRouter basename="/FaceO/">
      <div className="relative min-h-svh bg-base text-warm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train" element={<Train />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/routine/:id" element={<RoutinePlayer />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
