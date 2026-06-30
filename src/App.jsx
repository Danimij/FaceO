import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Train from './pages/Train'
import ExerciseDetail from './pages/ExerciseDetail'
import RoutinePlayer from './pages/RoutinePlayer'
import Plan from './pages/Plan'
import Progress from './pages/Progress'
import Profile from './pages/Profile'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="relative min-h-svh bg-stone-950 text-stone-100">
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
    </AppProvider>
  )
}
