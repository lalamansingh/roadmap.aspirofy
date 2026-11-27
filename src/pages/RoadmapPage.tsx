import {
  ArrowLeft, Bookmark, CalendarClock, CalendarRange, Check, CheckCircle2, Clock, Copy, EyeOff, GraduationCap, Keyboard, LayoutList,
  Map as MapIcon, RotateCcw, Search, Target, Users,
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import RoadmapCanvas from '../components/RoadmapCanvas'
import TopicDrawer from '../components/TopicDrawer'
import { Badge, Card, levelMeta, ProgressBar, Ring, Segmented, statusMeta } from '../components/ui'
import { allTopics, roadmapById, topicKey } from '../data'
import { metaFor } from '../data/meta'
import type { Level, Topic } from '../data/types'
import { forecast, roadmapStats } from '../lib/analytics'
import { useTracker } from '../lib/store'
import NotFound from './NotFound'

export default function RoadmapPage() {
  const { id = '' } = useParams()
  const roadmap = roadmapById[id]
  const [params, setParams] = useSearchParams()
  const openTopic = params.get('topic')
  const [view, setView] = useState<'map' | 'list'>('map')
  const [hideDone, setHideDone] = useState(false)
  const [level, setLevel] = useState<Level | 'all'>('all')
  const [q, setQ] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [copied, setCopied] = useState(false)

  const { progress, events, bookmarks, targetDates } = useTracker()
  const { toggleBookmark, setTargetDate, resetRoadmap } = useTracker.getState()

  const open = useCallback((topicId: string | null) => {
    setParams(topicId ? { topic: topicId } : {}, { replace: true })
  }, [setParams])

  if (!roadmap) return <NotFound />

  const meta = metaFor(roadmap.id)
  const Icon = meta.icon
  const stats = roadmapStats(roadmap, progress)
  const fc = forecast(roadmap, events, progress)
  const target = targetDates[roadmap.id]
  const daysToTarget = target ? Math.ceil((new Date(target).getTime() - Date.now()) / 86_400_000) : null
  const neededPerWeek = daysToTarget && daysToTarget > 0 ? +(fc.remaining / (daysToTarget / 7)).toFixed(1) : null
  const onTrack = neededPerWeek !== null && fc.perWeek >= neededPerWeek
  const bookmarked = bookmarks.includes(roadmap.id)
  const projects = roadmap.sections.filter((s) => s.project).length

  const query = q.trim().toLowerCase()
  const visible = (t: Topic) => {
    const status = progress[topicKey(roadmap.id, t.id)]
    if (hideDone && (status === 'done' || status === 'skipped')) return false
    if (level !== 'all' && t.level !== level) return false
    if (query && !t.title.toLowerCase().includes(query)) return false
    return true
  }

  const copySummary = () => {
    const lines = [`My ${roadmap.title} progress on Aspirofy: ${stats.pct}% (${stats.done}/${stats.total} topics)`, ...stats.sections.map((s) => `• ${s.title}: ${s.pct}%`)]
    navigator.clipboard?.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const fmtDate = (d: number | string) => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div style={{ ['--accent' as string]: roadmap.accent }}>
      {/* HERO */}
      <div className="relative overflow-hidden border-b border-slate-200/70 dark:border-white/[.06]">
        <div aria-hidden className="absolute inset-0 opacity-[.13] dark:opacity-20" style={{ background: `radial-gradient(60% 90% at 15% 0%, ${roadmap.accent}, transparent 70%)` }} />
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6">
          <Link to="/roadmaps" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:hover:text-white"><ArrowLeft size={15} /> All roadmaps</Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="rise">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg" style={{ background: `linear-gradient(135deg, color-mix(in oklab, ${roadmap.accent} 80%, white), ${roadmap.accent})`, boxShadow: `0 12px 30px -10px ${roadmap.accent}` }}>
                  <Icon size={28} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[.14em] text-slate-500 dark:text-slate-400">{roadmap.category === 'role' ? 'Role roadmap' : 'Skill roadmap'}</div>
                  <h1 className="flex items-center gap-2 text-3xl font-extrabold sm:text-[42px] sm:leading-tight">
                    {roadmap.title}
                    <button onClick={() => toggleBookmark(roadmap.id)} aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/60 hover:text-amber-500 dark:hover:bg-white/5">
                      <Bookmark size={22} className={bookmarked ? 'fill-amber-400 text-amber-500' : ''} />
                    </button>
                  </h1>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">{roadmap.description}</p>

              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                <Fact icon={MapIcon}>{roadmap.sections.length} stages</Fact>
                <Fact icon={CheckCircle2}>{stats.total} topics</Fact>
                <Fact icon={Clock}>~{stats.hoursTotal} hours</Fact>
                {projects > 0 && <Fact icon={Target}>{projects} projects</Fact>}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur dark:border-white/[.07] dark:bg-white/[.03]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">What you'll be able to do</div>
                  <ul className="mt-2.5 space-y-2">
                    {meta.outcomes.filter(Boolean).map((o) => (
                      <li key={o} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ background: `color-mix(in oklab, ${roadmap.accent} 18%, transparent)`, color: roadmap.accent }}><Check size={11} strokeWidth={3.5} /></span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                {meta.audience && (
                  <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur dark:border-white/[.07] dark:bg-white/[.03]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500"><Users size={13} /> Who it's for</div>
                    <p className="mt-2.5 text-sm text-slate-700 dark:text-slate-300">{meta.audience}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {roadmap.tags.map((t) => <Badge key={t} className="bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">#{t}</Badge>)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress card */}
            <Card className="rise h-fit !p-6" >
              <div className="flex items-center gap-4">
                <Ring value={stats.pct} size={84} stroke={8} color={roadmap.accent}>
                  <span className="font-display text-xl font-bold tabular-nums">{stats.pct}%</span>
                </Ring>
                <div className="flex-1">
                  <div className="font-display text-lg font-semibold">{stats.pct === 0 ? 'Ready when you are' : stats.pct === 100 ? 'Completed 🎉' : 'Keep going!'}</div>
                  <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-500">
                    <span><b className="text-emerald-600">{stats.done}</b> done</span>
                    <span><b className="text-amber-600">{stats.inProgress}</b> learning</span>
                    <span><b>{stats.skipped}</b> skipped</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <Row icon={Clock} label="Time left"><b>{stats.hoursTotal - stats.hoursDone}h</b> <span className="text-slate-400">of {stats.hoursTotal}h</span></Row>
                <Row icon={CheckCircle2} label="Your pace"><b>{fc.perWeek}</b> <span className="text-slate-400">topics / week</span></Row>
                <Row icon={CalendarClock} label="Projected finish">
                  <b>{fc.remaining === 0 ? 'Done' : fc.eta ? fmtDate(fc.eta) : '—'}</b>
                </Row>
              </div>
              {fc.remaining > 0 && !fc.eta && <div className="mt-2 text-xs text-slate-400">Complete a few topics to unlock your forecast.</div>}
              <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/[.06]">
                <label className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Target date</span>
                  <input type="date" value={target ?? ''} onChange={(e) => setTargetDate(roadmap.id, e.target.value)} className="field !py-1.5" />
                </label>
                {neededPerWeek !== null && fc.remaining > 0 && (
                  <div className={`mt-3 rounded-xl px-3 py-2 text-xs font-medium ${onTrack ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300'}`}>
                    {onTrack ? '✓ On track.' : '⚠ Behind pace.'} You need {neededPerWeek} topics/week to make it ({daysToTarget} days left).
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link to={`/quiz/${roadmap.id}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-sm font-medium transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"><GraduationCap size={15} /> Quizzes</Link>
                <Link to="/planner" className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-sm font-medium transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"><CalendarRange size={15} /> Plan it</Link>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="glass sticky top-16 z-20 border-b border-slate-200/70 dark:border-white/[.06]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-2.5">
          <Segmented value={view} onChange={setView} options={[{ value: 'map', label: <><MapIcon size={14} /> Roadmap</> }, { value: 'list', label: <><LayoutList size={14} /> Checklist</> }]} />
          <label className="field flex items-center gap-1.5 !py-1.5">
            <Search size={14} className="text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter topics" className="w-28 bg-transparent outline-none sm:w-36" />
          </label>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level | 'all')} className="field !py-1.5" aria-label="Filter by level">
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button onClick={() => setHideDone((h) => !h)} className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium transition ${hideDone ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'}`}>
            <EyeOff size={14} /> Hide completed
          </button>
          <div className="ml-auto flex items-center gap-0.5">
            <IconBtn onClick={() => setShowHelp((s) => !s)} title="Keyboard shortcuts" active={showHelp}><Keyboard size={16} /></IconBtn>
            <IconBtn onClick={copySummary} title="Copy progress summary">{copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}</IconBtn>
            <IconBtn onClick={() => confirm('Reset all progress on this roadmap?') && resetRoadmap(roadmap.id)} title="Reset progress"><RotateCcw size={16} /></IconBtn>
          </div>
        </div>
        {showHelp && (
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-1 px-4 pb-3 text-xs text-slate-500">
            <span><b className="text-slate-700 dark:text-slate-300">Roadmap:</b> click circle = done · click title = details · shift+click = learning · alt+click = skip</span>
            <span><b className="text-slate-700 dark:text-slate-300">Drawer:</b> <Kbd>d</Kbd> done <Kbd>l</Kbd> learning <Kbd>s</Kbd> skip <Kbd>r</Kbd> reset <Kbd>←</Kbd><Kbd>→</Kbd> navigate <Kbd>esc</Kbd> close</span>
          </div>
        )}
      </div>

      <div className="bg-dots">
        <div className="mx-auto max-w-7xl px-4 py-12">
          {view === 'map' ? <RoadmapCanvas roadmap={roadmap} visible={visible} onOpen={open} /> : <ChecklistView roadmapId={roadmap.id} visible={visible} onOpen={open} />}
        </div>
      </div>

      {openTopic && <TopicDrawer roadmap={roadmap} topicId={openTopic} onClose={() => open(null)} onNavigate={open} />}
    </div>
  )
}

function Fact({ icon: I, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 font-medium text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300"><I size={14} className="text-[var(--accent)]" /> {children}</span>
}

function Row({ icon: I, label, children }: { icon: typeof Clock; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-slate-500"><I size={15} /> {label}</span>
      <span className="tabular-nums">{children}</span>
    </div>
  )
}

function IconBtn({ children, onClick, title, active }: { children: React.ReactNode; onClick: () => void; title: string; active?: boolean }) {
  return <button onClick={onClick} title={title} aria-label={title} className={`rounded-lg p-2 transition ${active ? 'bg-slate-200 text-slate-900 dark:bg-white/10 dark:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white'}`}>{children}</button>
}

const Kbd = ({ children }: { children: React.ReactNode }) => <kbd className="mx-0.5 rounded border border-slate-200 bg-white px-1 font-mono text-[10px] dark:border-white/10 dark:bg-white/5">{children}</kbd>

function ChecklistView({ roadmapId, visible, onOpen }: { roadmapId: string; visible: (t: Topic) => boolean; onOpen: (id: string) => void }) {
  const roadmap = roadmapById[roadmapId]
  const progress = useTracker((s) => s.progress)
  const setStatus = useTracker((s) => s.setStatus)
  const stats = roadmapStats(roadmap, progress)
  const anyVisible = allTopics(roadmap).some(visible)
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {!anyVisible && <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-white/10">No topics match these filters.</div>}
      {roadmap.sections.map((s, i) => {
        const topics = s.topics.filter(visible)
        if (!topics.length) return null
        return (
          <Card key={s.id} className="overflow-hidden !p-0">
            <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 dark:border-white/[.06]">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-sm font-bold text-white" style={{ background: roadmap.accent }}>{i + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="font-display font-semibold">{s.title}</div>
                <div className="truncate text-xs text-slate-500">{s.description}</div>
              </div>
              <div className="w-24 text-right text-xs tabular-nums text-slate-500">{stats.sections[i].done}/{stats.sections[i].total}<ProgressBar value={stats.sections[i].pct} color={roadmap.accent} className="mt-1 !h-1.5" /></div>
            </div>
            <ul>
              {topics.map((t) => {
                const key = topicKey(roadmapId, t.id)
                const status = progress[key] ?? 'pending'
                return (
                  <li key={t.id} className="flex items-center gap-3 border-b border-slate-100 px-5 py-2.5 transition last:border-0 hover:bg-slate-50/70 dark:border-white/[.05] dark:hover:bg-white/[.02]">
                    <input type="checkbox" checked={status === 'done'} onChange={() => setStatus(key, status === 'done' ? 'pending' : 'done')} className="h-[18px] w-[18px] cursor-pointer rounded accent-emerald-600" aria-label={`Done: ${t.title}`} />
                    <button onClick={() => onOpen(t.id)} className={`flex-1 text-left text-sm font-medium hover:text-brand-600 ${status === 'done' ? 'text-slate-400 line-through' : ''}`}>{t.title}</button>
                    {t.kind !== 'core' && <Badge className="bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">{t.kind}</Badge>}
                    {status !== 'pending' && status !== 'done' && <Badge className={statusMeta[status].className}>{statusMeta[status].label}</Badge>}
                    <Badge className={levelMeta[t.level].className}>{t.hours}h</Badge>
                  </li>
                )
              })}
            </ul>
            {s.project && <div className="flex gap-2 bg-indigo-50/70 px-5 py-3 text-sm text-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-200"><Target size={16} className="mt-0.5 shrink-0" /><span><b>Project: {s.project.title}</b> <span className="opacity-75">· {s.project.description}</span></span></div>}
          </Card>
        )
      })}
    </div>
  )
}
