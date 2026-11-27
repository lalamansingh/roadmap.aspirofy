import { BookOpen, Newspaper, ChevronLeft, ChevronRight, Clock, Dumbbell, ExternalLink, Pause, Play, Star, Video, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { allTopics, topicKey } from '../data'
import type { Resource, Roadmap, Status } from '../data/types'
import { useTracker } from '../lib/store'
import { fmtMinutes } from '../lib/theme'
import { Badge, levelMeta, ProgressBar, statusMeta } from './ui'

const resourceIcon: Record<Resource['type'], typeof BookOpen> = { docs: BookOpen, article: Newspaper, video: Video, practice: Dumbbell }
const resourceTone: Record<Resource['type'], string> = {
  docs: 'bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300',
  article: 'bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
  video: 'bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
  practice: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
}
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
  const pctOfEstimate = Math.min(100, Math.round((spent / 60 / topic.hours) * 100))

  return (
    <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-label={topic.title}>
      <div className="fade-in absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="drawer-in relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl dark:bg-[#101021]" style={{ ['--accent' as string]: roadmap.accent }}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/70 bg-white/90 px-5 py-3 backdrop-blur dark:border-white/[.06] dark:bg-[#101021]/90">
          <div className="flex items-center gap-1">
            <button disabled={idx === 0} onClick={() => onNavigate(topics[idx - 1].id)} className="rounded-lg p-1.5 transition hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-white/5" aria-label="Previous topic"><ChevronLeft size={18} /></button>
            <span className="font-mono text-xs tabular-nums text-slate-500">{idx + 1} / {topics.length}</span>
            <button disabled={idx === topics.length - 1} onClick={() => onNavigate(topics[idx + 1].id)} className="rounded-lg p-1.5 transition hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-white/5" aria-label="Next topic"><ChevronRight size={18} /></button>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 transition hover:bg-slate-100 dark:hover:bg-white/5" aria-label="Close"><X size={18} /></button>
        </div>
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${roadmap.accent}, transparent)` }} />

        <div className="space-y-7 p-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.14em]" style={{ color: roadmap.accent }}>{roadmap.title} · {section.title}</div>
            <h2 className="mt-1.5 text-[28px] font-bold leading-tight">{topic.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className={levelMeta[topic.level].className}>{levelMeta[topic.level].label}</Badge>
              {topic.kind !== 'core' && <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300">{topic.kind === 'optional' ? 'Optional' : 'Alternative'}</Badge>}
              <Badge className="bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-300"><Clock size={12} /> ~{topic.hours}h estimated</Badge>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{topic.description}</p>

          <div>
            <SectionLabel>Status</SectionLabel>
            <div className="grid grid-cols-4 gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(key, s)}
                  className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${
                    status === s ? `${statusMeta[s].className} border-current shadow-sm` : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5'
                  }`}
                >
                  {s === 'pending' ? 'Reset' : statusMeta[s].label}
                  <div className="mt-0.5 font-mono text-[10px] opacity-50">{Object.keys(shortcuts).find((k) => shortcuts[k] === s)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 dark:border-white/[.07] dark:bg-white/[.02]">
            <div className="flex items-center justify-between">
              <SectionLabel className="!mb-0">Study tracker</SectionLabel>
              <span className="text-xs tabular-nums text-slate-500"><b className="text-slate-800 dark:text-slate-200">{fmtMinutes(spent)}</b> of ~{topic.hours}h</span>
            </div>
            <ProgressBar value={pctOfEstimate} color={roadmap.accent} className="mt-3 !h-1.5" />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => (timing ? stopTimer() : startTimer(key))}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-[.98] ${timing ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                {timing ? <><Pause size={14} /> Stop & log</> : <><Play size={14} /> Start timer</>}
              </button>
              <form
                className="flex items-center gap-1.5"
                onSubmit={(e) => {
                  e.preventDefault()
                  const m = Math.round(Number(manual))
                  if (m > 0) logTime(key, m)
                  setManual('')
                }}
              >
                <input value={manual} onChange={(e) => setManual(e.target.value)} type="number" min={1} placeholder="Minutes" className="field w-24" aria-label="Minutes to log" />
                <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">Log</button>
              </form>
            </div>
            <div className="mt-5 text-sm font-medium">How confident are you?</div>
            <div className="mt-1.5 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setConfidence(key, n)} aria-label={`${n} stars`} className="transition hover:scale-110">
                  <Star size={24} className={n <= confidence ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-white/20'} />
                </button>
              ))}
              {confidence > 0 && <span className="ml-2 text-xs text-slate-500">{['', 'Just started', 'Shaky', 'Getting there', 'Confident', 'Could teach it'][confidence]}</span>}
            </div>
          </div>

          <div>
            <SectionLabel>Free resources</SectionLabel>
            <ul className="space-y-2">
              {topic.resources.map((r) => {
                const Icon = resourceIcon[r.type]
                return (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm transition hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${resourceTone[r.type]}`}><Icon size={15} /></span>
                      <span className="flex-1 font-medium">{r.title}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{r.type}</span>
                      <ExternalLink size={14} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <SectionLabel>My notes</SectionLabel>
            <textarea
              value={note}
              onChange={(e) => setNote(key, e.target.value)}
              rows={5}
              placeholder="Key takeaways, links, code snippets…"
              className="field w-full resize-y !p-3 leading-relaxed"
            />
            <div className="mt-1 text-right text-[11px] text-slate-400">Saved automatically</div>
          </div>

          {history.length > 0 && (
            <div>
              <SectionLabel>Activity</SectionLabel>
              <ol className="relative space-y-2.5 border-l border-slate-200 pl-4 text-xs dark:border-white/10">
                {history.slice(-8).reverse().map((e, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-slate-300 ring-4 ring-white dark:bg-white/30 dark:ring-[#101021]" />
                    <div className="flex justify-between gap-3">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {e.type === 'status' && `Marked ${statusMeta[e.to!].label.toLowerCase()}`}
                        {e.type === 'time' && `Studied ${fmtMinutes(e.minutes ?? 0)}`}
                        {e.type === 'review' && `Reviewed (${['forgot', 'hard', 'good', 'easy'][e.grade ?? 0]})`}
                        {e.type === 'note' && 'Added notes'}
                      </span>
                      <span className="text-slate-400">{new Date(e.ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${className}`}>{children}</div>
}
