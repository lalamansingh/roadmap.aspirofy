import { BookOpen, ChevronLeft, ChevronRight, Clock, Dumbbell, ExternalLink, Pause, Play, Star, Video, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { allTopics, topicKey } from '../data'
import type { Resource, Roadmap, Status } from '../data/types'
import { useTracker } from '../lib/store'
import { fmtMinutes } from '../lib/theme'
import { Badge, levelMeta, statusMeta } from './ui'

const resourceIcon: Record<Resource['type'], typeof BookOpen> = { docs: BookOpen, article: BookOpen, video: Video, practice: Dumbbell }
const statuses: Status[] = ['done', 'in-progress', 'skipped', 'pending']
const shortcuts: Record<string, Status> = { d: 'done', l: 'in-progress', s: 'skipped', r: 'pending' }

export default function TopicDrawer({ roadmap, topicId, onClose, onNavigate }: {
  roadmap: Roadmap; topicId: string; onClose: () => void; onNavigate: (id: string) => void
}) {
  const topics = useMemo(() => allTopics(roadmap), [roadmap])
  const idx = topics.findIndex((t) => t.id === topicId)
  const topic = topics[idx]
  const section = roadmap.sections.find((s) => s.topics.some((t) => t.id === topicId))!
  const key = topicKey(roadmap.id, topicId)

  const status = useTracker((s) => s.progress[key] ?? 'pending')
  const note = useTracker((s) => s.notes[key] ?? '')
  const confidence = useTracker((s) => s.confidence[key] ?? 0)
  const events = useTracker((s) => s.events)
  const timer = useTracker((s) => s.timer)
  const { setStatus, setNote, setConfidence, startTimer, stopTimer, logTime } = useTracker.getState()
  const [manual, setManual] = useState('')

  const history = events.filter((e) => e.key === key)
  const spent = history.reduce((a, e) => a + (e.type === 'time' ? e.minutes ?? 0 : 0), 0)
  const timing = timer?.key === key

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName.match(/INPUT|TEXTAREA/)) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && topics[idx + 1]) onNavigate(topics[idx + 1].id)
      if (e.key === 'ArrowLeft' && topics[idx - 1]) onNavigate(topics[idx - 1].id)
      if (shortcuts[e.key]) setStatus(key, shortcuts[e.key])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, key, topics, onClose, onNavigate, setStatus])

  if (!topic) return null

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="fade-in absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <aside className="drawer-in relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl dark:bg-slate-900">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
          <div className="flex items-center gap-1">
            <button disabled={idx === 0} onClick={() => onNavigate(topics[idx - 1].id)} className="rounded p-1.5 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" aria-label="Previous topic"><ChevronLeft size={18} /></button>
            <span className="text-xs tabular-nums text-slate-500">{idx + 1} / {topics.length}</span>
            <button disabled={idx === topics.length - 1} onClick={() => onNavigate(topics[idx + 1].id)} className="rounded p-1.5 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" aria-label="Next topic"><ChevronRight size={18} /></button>
          </div>
          <button onClick={onClose} className="rounded p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close"><X size={18} /></button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{section.title}</div>
            <h2 className="mt-1 text-2xl font-bold">{topic.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className={levelMeta[topic.level].className}>{levelMeta[topic.level].label}</Badge>
              {topic.kind !== 'core' && <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300">{topic.kind === 'optional' ? 'Optional' : 'Alternative'}</Badge>}
              <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"><Clock size={12} /> ~{topic.hours}h estimated</Badge>
              <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">⏱ {fmtMinutes(spent)} logged</Badge>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(key, s)}
                className={`rounded-lg border-2 px-2 py-2 text-xs font-semibold transition ${
                  status === s ? `${statusMeta[s].className} border-current` : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {s === 'pending' ? 'Reset' : statusMeta[s].label}
                <div className="font-mono text-[10px] opacity-60">{Object.keys(shortcuts).find((k) => shortcuts[k] === s)}</div>
              </button>
            ))}
          </div>

          <p className="leading-relaxed text-slate-700 dark:text-slate-300">{topic.description}</p>

          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="mb-3 text-sm font-semibold">Study tracker</div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => (timing ? stopTimer() : startTimer(key))}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-white ${timing ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                {timing ? <><Pause size={14} /> Stop & log</> : <><Play size={14} /> Start timer</>}
              </button>
              <form
                className="flex items-center gap-1"
                onSubmit={(e) => {
                  e.preventDefault()
                  logTime(key, Math.round(Number(manual)))
                  setManual('')
                }}
              >
                <input value={manual} onChange={(e) => setManual(e.target.value)} type="number" min={1} placeholder="min" className="w-20 rounded-lg border border-slate-300 bg-transparent px-2 py-2 text-sm dark:border-slate-700" />
                <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">Log</button>
              </form>
            </div>
            <div className="mt-4 text-sm font-semibold">How confident are you?</div>
            <div className="mt-1 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setConfidence(key, n)} aria-label={`${n} stars`}>
                  <Star size={22} className={n <= confidence ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold">Free resources</div>
            <ul className="space-y-1.5">
              {topic.resources.map((r) => {
                const Icon = resourceIcon[r.type]
                return (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-slate-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
                      <Icon size={15} className="text-slate-500" />
                      <span className="rounded bg-slate-100 px-1.5 text-[10px] font-semibold uppercase dark:bg-slate-800">{r.type}</span>
                      <span className="flex-1">{r.title}</span>
                      <ExternalLink size={13} className="text-slate-400" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold">My notes</div>
            <textarea
              value={note}
              onChange={(e) => setNote(key, e.target.value)}
              rows={5}
              placeholder="Key takeaways, links, code snippets…"
              className="w-full rounded-lg border border-slate-300 bg-transparent p-3 text-sm dark:border-slate-700"
            />
          </div>

          {history.length > 0 && (
            <div>
              <div className="mb-2 text-sm font-semibold">Activity</div>
              <ul className="space-y-1 text-xs text-slate-500">
                {history.slice(-8).reverse().map((e, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {e.type === 'status' && `Marked ${statusMeta[e.to!].label.toLowerCase()}`}
                      {e.type === 'time' && `Studied ${fmtMinutes(e.minutes ?? 0)}`}
                      {e.type === 'review' && `Reviewed (${['forgot', 'hard', 'good', 'easy'][e.grade ?? 0]})`}
                      {e.type === 'note' && 'Added notes'}
                    </span>
                    <span>{new Date(e.ts).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
