import { Map as MapIcon, Search, X } from 'lucide-react'
import { useState } from 'react'
import RoadmapCard from '../components/RoadmapCard'
import { EmptyState, PageHeader, Segmented } from '../components/ui'
import { allTopics, roadmaps } from '../data'
import { isStarted } from '../lib/analytics'
import { useTracker } from '../lib/store'

const filters = ['all', 'role', 'skill', 'started', 'bookmarked'] as const
type Filter = (typeof filters)[number]
const labels: Record<Filter, string> = { all: 'All', role: 'Roles', skill: 'Skills', started: 'In progress', bookmarked: 'Saved' }

export default function RoadmapsList() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const progress = useTracker((s) => s.progress)
  const bookmarks = useTracker((s) => s.bookmarks)
  const query = q.trim().toLowerCase()

  const matchesFilter = (f: Filter) => (r: (typeof roadmaps)[number]) => {
    if (f === 'role' || f === 'skill') return r.category === f
    if (f === 'started') return isStarted(r, progress)
    if (f === 'bookmarked') return bookmarks.includes(r.id)
    return true
  }
  const matchingTopics = (r: (typeof roadmaps)[number]) => (query ? allTopics(r).filter((t) => t.title.toLowerCase().includes(query)) : [])
  const list = roadmaps.filter(matchesFilter(filter)).filter((r) => {
    if (!query) return true
    return [r.title, r.short, ...r.tags].some((s) => s.toLowerCase().includes(query)) || matchingTopics(r).length > 0
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader
        icon={<MapIcon size={22} />}
        eyebrow={`${roadmaps.length} roadmaps`}
        title="Explore roadmaps"
        subtitle="Search by role, skill, or any topic inside a roadmap, like “window functions” or “Docker volumes”."
      />
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="field flex flex-1 items-center gap-2 !py-2.5">
          <Search size={17} className="text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search roadmaps and topics…" className="flex-1 bg-transparent text-[15px] outline-none" autoFocus />
          {q && <button onClick={() => setQ('')} aria-label="Clear search" className="rounded p-0.5 text-slate-400 hover:text-slate-700"><X size={16} /></button>}
        </label>
        <Segmented
          className="overflow-x-auto"
          value={filter}
          onChange={setFilter}
          options={filters.map((f) => ({
            value: f,
            label: <>{labels[f]} <span className="text-xs tabular-nums opacity-50">{roadmaps.filter(matchesFilter(f)).length}</span></>,
          }))}
        />
      </div>
      {query && list.length > 0 && <div className="mt-4 text-sm text-slate-500">{list.length} roadmap{list.length === 1 ? '' : 's'} match “{q}”</div>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((r) => {
          const hits = matchingTopics(r)
          return (
            <div key={r.id} className="flex flex-col">
              <RoadmapCard roadmap={r} />
              {hits.length > 0 && (
                <div className="mt-1.5 truncate px-2 text-xs text-slate-500">
                  <span className="font-medium text-brand-600 dark:text-brand-300">{hits.length} topic{hits.length > 1 ? 's' : ''}:</span> {hits.slice(0, 3).map((t) => t.title).join(', ')}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {list.length === 0 && (
        <div className="mt-6">
          <EmptyState icon={<Search size={22} />} title="No roadmaps match">
            {filter === 'bookmarked' ? 'Tap the bookmark icon on any roadmap to save it here.' : filter === 'started' ? 'Mark a topic as learning or done and the roadmap will show up here.' : 'Try a different search or filter.'}
          </EmptyState>
        </div>
      )}
    </div>
  )
}
