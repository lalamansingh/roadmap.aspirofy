import { ArrowUpRight, Bookmark, Clock, Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allTopics } from '../data'
import { metaFor } from '../data/meta'
import type { Level, Roadmap } from '../data/types'
import { roadmapStats } from '../lib/analytics'
import { useTracker } from '../lib/store'
import { levelMeta, Ring } from './ui'

const levels: Level[] = ['beginner', 'intermediate', 'advanced']

export default function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  const progress = useTracker((s) => s.progress)
  const bookmarked = useTracker((s) => s.bookmarks.includes(roadmap.id))
  const toggleBookmark = useTracker((s) => s.toggleBookmark)
  const stats = roadmapStats(roadmap, progress)
  const topics = allTopics(roadmap)
  const hours = topics.reduce((a, t) => a + t.hours, 0)
  const mix = levels.map((l) => ({ l, h: topics.filter((t) => t.level === l).reduce((a, t) => a + t.hours, 0) }))
  const { icon: Icon } = metaFor(roadmap.id)
  const started = stats.done + stats.inProgress > 0

  return (
    <Link
      to={`/roadmaps/${roadmap.id}`}
      style={{ ['--accent' as string]: roadmap.accent }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:shadow-lift dark:border-white/[.07] dark:bg-white/[.03] dark:hover:bg-white/[.05]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-40"
        style={{ background: roadmap.accent }}
      />
      <div className="flex items-start justify-between gap-2">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset transition group-hover:scale-105"
          style={{ background: `color-mix(in oklab, ${roadmap.accent} 14%, transparent)`, color: roadmap.accent, ['--tw-ring-color' as string]: `color-mix(in oklab, ${roadmap.accent} 25%, transparent)` }}
        >
          <Icon size={21} strokeWidth={2.2} />
        </div>
        <div className="flex items-center gap-1">
          {started && (
            <Ring value={stats.pct} size={38} stroke={4} color={roadmap.accent}>
              <span className="text-[10px] font-bold tabular-nums">{stats.pct}%</span>
            </Ring>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleBookmark(roadmap.id) }}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark roadmap'}
            className="relative z-10 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-amber-500 dark:hover:bg-white/5"
          >
            <Bookmark size={16} className={bookmarked ? 'fill-amber-400 text-amber-500' : ''} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 flex items-center gap-1 text-[17px] font-semibold">
        {roadmap.title}
        <ArrowUpRight size={16} className="-translate-x-1 text-slate-400 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
      </h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{roadmap.short}</p>

      <div className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5" title="Beginner · Intermediate · Advanced share of hours">
        {mix.map(({ l, h }) => h > 0 && <div key={l} style={{ width: `${(h / hours) * 100}%`, background: levelMeta[l].color }} className="opacity-80" />)}
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1"><Layers3 size={13} /> {roadmap.sections.length} stages · {topics.length} topics</span>
        <span className="flex items-center gap-1"><Clock size={13} /> ~{hours}h</span>
      </div>
    </Link>
  )
}
