import { Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allTopics } from '../data'
import type { Roadmap } from '../data/types'
import { roadmapStats } from '../lib/analytics'
import { useTracker } from '../lib/store'
import { ProgressBar } from './ui'

export default function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  const progress = useTracker((s) => s.progress)
  const bookmarked = useTracker((s) => s.bookmarks.includes(roadmap.id))
  const toggleBookmark = useTracker((s) => s.toggleBookmark)
  const stats = roadmapStats(roadmap, progress)
  const topics = allTopics(roadmap)
  const hours = topics.reduce((a, t) => a + t.hours, 0)

  return (
    <Link
      to={`/roadmaps/${roadmap.id}`}
      className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
    >
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl" style={{ background: roadmap.accent }} />
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold group-hover:underline">{roadmap.title}</h3>
        <button
          onClick={(e) => { e.preventDefault(); toggleBookmark(roadmap.id) }}
          aria-label="Bookmark roadmap"
          className="text-slate-400 hover:text-amber-500"
        >
          <Bookmark size={16} className={bookmarked ? 'fill-amber-400 text-amber-500' : ''} />
        </button>
      </div>
      <p className="mt-1 flex-1 text-sm text-slate-500">{roadmap.short}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{topics.length} topics · ~{hours}h</span>
        {stats.done > 0 && <span className="font-semibold text-emerald-600">{stats.pct}%</span>}
      </div>
      {stats.done + stats.inProgress > 0 && <ProgressBar value={stats.pct} color={roadmap.accent} className="mt-2 !h-1.5" />}
    </Link>
  )
}
