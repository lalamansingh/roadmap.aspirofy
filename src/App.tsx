import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Planner from './pages/Planner'
import Projects from './pages/Projects'
import Quiz from './pages/Quiz'
import Review from './pages/Review'
import RoadmapPage from './pages/RoadmapPage'
import RoadmapsList from './pages/RoadmapsList'
import Settings from './pages/Settings'

const Dashboard = lazy(() => import('./pages/Dashboard'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="roadmaps" element={<RoadmapsList />} />
        <Route path="roadmaps/:id" element={<RoadmapPage />} />
        <Route path="dashboard" element={<Suspense fallback={<div className="p-10 text-center text-slate-500">Loading analytics…</div>}><Dashboard /></Suspense>} />
        <Route path="planner" element={<Planner />} />
        <Route path="projects" element={<Projects />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="review" element={<Review />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
