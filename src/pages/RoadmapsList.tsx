import { Search } from 'lucide-react'
import { useState } from 'react'
import RoadmapCard from '../components/RoadmapCard'
import { EmptyState } from '../components/ui'
import { allTopics, roadmaps } from '../data'
import { isStarted } from '../lib/analytics'
import { useTracker } from '../lib/store'

const filters = ['all', 'role', 'skill', 'started', 'bookmarked'] as const

export default function RoadmapsList() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<(typeof filters)[number]>('all')
  const progress = useTracker((s) => s.progress)
  const bookmarks = useTracker((s) => s.bookmarks)
  const query = q.trim().toLowerCase()

  const list = roadmaps.filter((r) => {
    if (filter === 'role' || filter === 'skill') { if (r.category !== filter) return false }
    if (filter === 'started' && !isStarted(r, progress)) return false
    if (filter === 'bookmarked' && !bookmarks.includes(r.id)) return false
    if (!query) return true
    return [r.title, r.short, ...r.tags, ...allTopics(r).map((t) => t.title)].some((s) => s.toLowerCase().includes(query))
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">All roadmaps</h1>
      <p className="mt-1 text-slate-500">Search by role, skill, or any topic inside a roadmap.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <Search size={16} className="text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Docker, window functions, React…" className="flex-1 bg-transparent outline-none" />
        </label>
        <div className="flex gap-1 overflow-x-auto">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-2 text-sm font-medium capitalize ${filter === f ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((r) => <RoadmapCard key={r.id} roadmap={r} />)}
      </div>
      {list.length === 0 && <div className="mt-6"><EmptyState title="No roadmaps match">Try a different search or filter.</EmptyState></div>}
    </div>
  )
}
