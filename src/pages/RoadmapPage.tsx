import { Bookmark, CalendarClock, CalendarRange, GraduationCap, CheckCircle2, Clock, Copy, EyeOff, Keyboard, LayoutList, Map as MapIcon, RotateCcw, Search } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import RoadmapCanvas from '../components/RoadmapCanvas'
import TopicDrawer from '../components/TopicDrawer'
import { Badge, Card, levelMeta, ProgressBar, statusMeta } from '../components/ui'
import { roadmapById, topicKey } from '../data'
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

  const { progress, events, bookmarks, targetDates } = useTracker()
  const { toggleBookmark, setTargetDate, resetRoadmap } = useTracker.getState()

  const open = useCallback((topicId: string | null) => {
    setParams(topicId ? { topic: topicId } : {}, { replace: true })
  }, [setParams])

  if (!roadmap) return <NotFound />

  const stats = roadmapStats(roadmap, progress)
  const fc = forecast(roadmap, events, progress)
  const target = targetDates[roadmap.id]
  const daysToTarget = target ? Math.ceil((new Date(target).getTime() - Date.now()) / 86_400_000) : null
  const neededPerWeek = daysToTarget && daysToTarget > 0 ? +(fc.remaining / (daysToTarget / 7)).toFixed(1) : null
  const onTrack = neededPerWeek !== null && fc.perWeek >= neededPerWeek

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
  }

  return (
    <div>
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link to="/roadmaps" className="text-sm text-slate-500 hover:underline">← All roadmaps</Link>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold sm:text-4xl">{roadmap.title} Roadmap</h1>
                <button onClick={() => toggleBookmark(roadmap.id)} aria-label="Bookmark" className="text-slate-400 hover:text-amber-500">
                  <Bookmark className={bookmarks.includes(roadmap.id) ? 'fill-amber-400 text-amber-500' : ''} />
                </button>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{roadmap.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {roadmap.tags.map((t) => <Badge key={t} className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">#{t}</Badge>)}
              </div>
            </div>
            <Card className="w-full lg:w-96">
              <div className="flex items-end justify-between">
                <div><span className="text-3xl font-bold tabular-nums">{stats.pct}%</span> <span className="text-sm text-slate-500">complete</span></div>
                <div className="text-right text-xs text-slate-500">{stats.done} done · {stats.inProgress} learning · {stats.skipped} skipped</div>
              </div>
              <ProgressBar value={stats.pct} color={roadmap.accent} className="mt-2 !h-3" />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><Clock size={15} className="text-slate-400" /><span><b>{stats.hoursTotal - stats.hoursDone}h</b> left of {stats.hoursTotal}h</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 size={15} className="text-slate-400" /><span><b>{fc.perWeek}</b> topics/week</span></div>
                <div className="col-span-2 flex items-center gap-2"><CalendarClock size={15} className="text-slate-400" />
                  <span>Projected finish: <b>{fc.remaining === 0 ? 'Completed 🎉' : fc.eta ? new Date(fc.eta).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'start learning to forecast'}</b></span>
                </div>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                <label className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-slate-500">Target date</span>
                  <input type="date" value={target ?? ''} onChange={(e) => setTargetDate(roadmap.id, e.target.value)} className="rounded border border-slate-300 bg-transparent px-2 py-1 text-sm dark:border-slate-700" />
                </label>
                {neededPerWeek !== null && fc.remaining > 0 && (
                  <div className={`mt-2 rounded-md px-2 py-1.5 text-xs font-medium ${onTrack ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'}`}>
                    {onTrack ? '✅ On track' : '⚠️ Behind'} — you need {neededPerWeek} topics/week to hit your target ({daysToTarget} days left).
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="sticky top-14 z-20 border-b border-slate-200 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-2">
          <div className="flex rounded-lg border border-slate-300 p-0.5 dark:border-slate-700">
            <button onClick={() => setView('map')} className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-sm ${view === 'map' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : ''}`}><MapIcon size={14} /> Map</button>
            <button onClick={() => setView('list')} className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-sm ${view === 'list' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : ''}`}><LayoutList size={14} /> Checklist</button>
          </div>
          <label className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
            <Search size={14} className="text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter topics" className="w-32 bg-transparent text-sm outline-none" />
          </label>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level | 'all')} className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900">
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button onClick={() => setHideDone((h) => !h)} className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-sm ${hideDone ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-slate-700'}`}>
            <EyeOff size={14} /> Hide completed
          </button>
          <Link to={`/quiz/${roadmap.id}`} className="flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-sm hover:bg-white dark:border-slate-700 dark:hover:bg-slate-900"><GraduationCap size={14} /> Quizzes</Link>
          <Link to="/planner" className="flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-sm hover:bg-white dark:border-slate-700 dark:hover:bg-slate-900"><CalendarRange size={14} /> Plan</Link>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => setShowHelp((s) => !s)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800" title="Shortcuts"><Keyboard size={16} /></button>
            <button onClick={copySummary} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800" title="Copy progress summary"><Copy size={16} /></button>
            <button onClick={() => confirm('Reset all progress on this roadmap?') && resetRoadmap(roadmap.id)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800" title="Reset progress"><RotateCcw size={16} /></button>
          </div>
        </div>
        {showHelp && (
          <div className="mx-auto max-w-7xl px-4 pb-2 text-xs text-slate-500">
            <b>Map:</b> click = details · right-click = toggle done · shift+click = learning · alt+click = skip. <b>Drawer:</b> d done · l learning · s skip · r reset · ←/→ prev/next · esc close.
            <span className="ml-3 inline-flex items-center gap-3"><span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-violet-500" /> optional</span><span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> alternative</span></span>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {view === 'map' ? <RoadmapCanvas roadmap={roadmap} visible={visible} onOpen={open} /> : <ChecklistView roadmapId={roadmap.id} visible={visible} onOpen={open} />}
      </div>

      {openTopic && <TopicDrawer roadmap={roadmap} topicId={openTopic} onClose={() => open(null)} onNavigate={open} />}
    </div>
  )
}

function ChecklistView({ roadmapId, visible, onOpen }: { roadmapId: string; visible: (t: Topic) => boolean; onOpen: (id: string) => void }) {
  const roadmap = roadmapById[roadmapId]
  const progress = useTracker((s) => s.progress)
  const setStatus = useTracker((s) => s.setStatus)
  const stats = roadmapStats(roadmap, progress)
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {roadmap.sections.map((s, i) => {
        const topics = s.topics.filter(visible)
        if (!topics.length) return null
        return (
          <Card key={s.id} className="!p-0">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-slate-800">
              <div>
                <div className="font-semibold">{i + 1}. {s.title}</div>
                <div className="text-xs text-slate-500">{s.description}</div>
              </div>
              <div className="w-28 text-right text-xs text-slate-500">{stats.sections[i].done}/{stats.sections[i].total}<ProgressBar value={stats.sections[i].pct} className="mt-1 !h-1.5" /></div>
            </div>
            <ul>
              {topics.map((t) => {
                const key = topicKey(roadmapId, t.id)
                const status = progress[key] ?? 'pending'
                return (
                  <li key={t.id} className="flex items-center gap-3 border-b border-slate-100 px-5 py-2.5 last:border-0 dark:border-slate-800">
                    <input type="checkbox" checked={status === 'done'} onChange={() => setStatus(key, status === 'done' ? 'pending' : 'done')} className="h-4 w-4 accent-emerald-600" />
                    <button onClick={() => onOpen(t.id)} className={`flex-1 text-left text-sm hover:underline ${status === 'done' ? 'text-slate-400 line-through' : ''}`}>{t.title}</button>
                    {t.kind !== 'core' && <Badge className="bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">{t.kind}</Badge>}
                    <Badge className={levelMeta[t.level].className}>{t.hours}h</Badge>
                    {status !== 'pending' && status !== 'done' && <Badge className={statusMeta[status].className}>{statusMeta[status].label}</Badge>}
                  </li>
                )
              })}
            </ul>
            {s.project && <div className="bg-indigo-50 px-5 py-2.5 text-sm text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">🔨 <b>Project:</b> {s.project.title} — <span className="opacity-80">{s.project.description}</span></div>}
          </Card>
        )
      })}
    </div>
  )
}
