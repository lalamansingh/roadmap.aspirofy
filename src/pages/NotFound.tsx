import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { btn } from '../components/ui'

export default function NotFound() {
  return (
    <div className="relative mx-auto max-w-md px-4 py-28 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"><Compass size={30} /></div>
      <div className="mt-6 font-display text-7xl font-extrabold text-gradient">404</div>
      <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">This page wandered off the roadmap.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className={btn.ghost}><ArrowLeft size={16} /> Home</Link>
        <Link to="/roadmaps" className={btn.primary}>Browse roadmaps</Link>
      </div>
    </div>
  )
}
