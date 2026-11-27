import { Check, CheckCircle2, Circle, CircleDashed, CircleSlash, Clock, Flag, Hammer, NotebookPen, Trophy } from 'lucide-react'
import { topicKey } from '../data'
import type { Roadmap, Section, Status, Topic } from '../data/types'
import { roadmapStats } from '../lib/analytics'
import { useTracker } from '../lib/store'
import { Badge, levelMeta, Ring } from './ui'

interface Props {
  roadmap: Roadmap
  visible: (t: Topic) => boolean
  onOpen: (topicId: string) => void
}

export default function RoadmapCanvas({ roadmap, visible, onOpen }: Props) {
  const progress = useTracker((s) => s.progress)
  const stats = roadmapStats(roadmap, progress)
  const anyVisible = roadmap.sections.some((s) => s.topics.some(visible))

  return (
    <div className="relative mx-auto max-w-5xl" style={{ ['--accent' as string]: roadmap.accent }}>
      {/* rail */}
      <div aria-hidden className="rm-rail absolute bottom-16 left-[22.5px] top-6 w-[3px] rounded-full opacity-40" />

      <div className="space-y-10">
        {roadmap.sections.map((section, i) => (
          <StageRow key={section.id} index={i} roadmapId={roadmap.id} section={section} pct={stats.sections[i].pct} done={stats.sections[i].done} total={stats.sections[i].total} visible={visible} onOpen={onOpen} accent={roadmap.accent} />
        ))}
      </div>

      {!anyVisible && <div className="ml-16 mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 sm:ml-20 dark:border-white/10">No topics match these filters.</div>}

      <div className="relative mt-10 flex items-center gap-4 sm:gap-6">
        <div className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-lg sm:h-16 sm:w-16 ${stats.pct === 100 ? 'bg-emerald-500' : 'bg-slate-900 dark:bg-white dark:text-slate-900'}`}>
          {stats.pct === 100 ? <Trophy size={26} /> : <Flag size={24} />}
        </div>
        <div className="flex-1 rounded-2xl border-2 border-dashed border-emerald-400/60 bg-emerald-50/60 px-5 py-4 dark:bg-emerald-400/5">
          <div className="font-display font-semibold text-emerald-800 dark:text-emerald-300">{stats.pct === 100 ? 'Roadmap complete. Amazing work!' : 'Finish line'}</div>
          <div className="text-sm text-emerald-700/80 dark:text-emerald-300/70">{stats.pct === 100 ? 'Keep it fresh with spaced review and quizzes.' : `You're job-ready when every core topic is green. ${stats.total - stats.done - stats.skipped} to go.`}</div>
        </div>
      </div>
    </div>
  )
}

function StageRow({ roadmapId, section, pct, done, total, visible, onOpen, index, accent }: {
  roadmapId: string; section: Section; pct: number; done: number; total: number; visible: (t: Topic) => boolean; onOpen: (id: string) => void; index: number; accent: string
}) {
  const topics = section.topics.filter(visible)
  if (!topics.length) return null
  const hours = section.topics.reduce((a, t) => a + t.hours, 0)
  const complete = pct === 100

  return (
    <section className="relative flex gap-4 sm:gap-6" id={`stage-${section.id}`}>
      {/* stage node on the rail */}
      <div className="relative z-10 shrink-0 pt-1">
        <div className="rounded-full bg-[#f7f7fb] p-1 dark:bg-night">
          <Ring value={pct} size={40} stroke={4} color={complete ? '#10b981' : accent}>
            <span className={`grid h-7 w-7 place-items-center rounded-full font-display text-sm font-bold ${complete ? 'bg-emerald-500 text-white' : 'bg-white text-slate-800 dark:bg-[#17172f] dark:text-white'}`}>
              {complete ? <Check size={15} strokeWidth={3} /> : index + 1}
            </span>
          </Ring>
        </div>
        
      </div>

      <div className="min-w-0 flex-1 sm:pl-2">
        <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.14em]" style={{ color: accent }}>
              Stage {index + 1}
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="text-slate-500 dark:text-slate-400">{levelMeta[section.level].label}</span>
            </div>
            <h2 className="mt-0.5 text-xl font-bold sm:text-2xl">{section.title}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{section.description}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock size={13} /> ~{hours}h</span>
            <span className="tabular-nums"><b className="text-slate-800 dark:text-slate-200">{done}</b>/{total} done</span>
          </div>
        </header>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => <TopicNode key={t.id} roadmapId={roadmapId} topic={t} onOpen={onOpen} accent={accent} />)}
        </div>

        {section.project && (
          <div className="mt-3 flex items-start gap-3 rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-violet-50 p-4 dark:border-indigo-400/20 dark:from-indigo-500/10 dark:to-violet-500/5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-indigo-400/15 dark:text-indigo-300"><Hammer size={17} /></div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">Milestone project</span>
              </div>
              <div className="font-semibold text-slate-900 dark:text-white">{section.project.title}</div>
              <div className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{section.project.description}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const nodeStyle: Record<Status, string> = {
  pending: 'border-slate-200 bg-white hover:border-[color-mix(in_oklab,var(--accent)_55%,transparent)] dark:border-white/10 dark:bg-white/[.03]',
  'in-progress': 'border-amber-300 bg-amber-50 ring-4 ring-amber-400/15 dark:border-amber-400/40 dark:bg-amber-400/10',
  done: 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-400/25 dark:bg-emerald-400/10',
  skipped: 'border-dashed border-slate-200 bg-slate-50 opacity-60 dark:border-white/10 dark:bg-transparent',
}

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === 'done') return <CheckCircle2 size={18} className="shrink-0 fill-emerald-500 text-white dark:text-[#0b0b14]" />
  if (status === 'in-progress') return <CircleDashed size={18} className="shrink-0 animate-[spin_6s_linear_infinite] text-amber-500" />
  if (status === 'skipped') return <CircleSlash size={18} className="shrink-0 text-slate-400" />
  return <Circle size={18} className="shrink-0 text-slate-300 dark:text-white/25" />
}

function TopicNode({ roadmapId, topic, onOpen, accent }: { roadmapId: string; topic: Topic; onOpen: (id: string) => void; accent: string }) {
  const key = topicKey(roadmapId, topic.id)
  const status = useTracker((s) => s.progress[key] ?? 'pending')
  const setStatus = useTracker((s) => s.setStatus)
  const hasNote = useTracker((s) => Boolean(s.notes[key]))

  return (
    <div className={`group relative flex items-center rounded-xl border shadow-[0_1px_2px_rgb(15_15_40/.04)] transition hover:-translate-y-0.5 hover:shadow-soft ${nodeStyle[status]}`}>
      <button
        onClick={() => setStatus(key, status === 'done' ? 'pending' : 'done')}
        aria-label={status === 'done' ? `Mark ${topic.title} as not done` : `Mark ${topic.title} as done`}
        title="Toggle done"
        className="grid h-full place-items-center rounded-l-xl py-2.5 pl-3 pr-1.5 transition hover:scale-110"
      >
        <StatusIcon status={status} />
      </button>
      <button
        onClick={(e) => {
          if (e.shiftKey) setStatus(key, status === 'in-progress' ? 'pending' : 'in-progress')
          else if (e.altKey) setStatus(key, status === 'skipped' ? 'pending' : 'skipped')
          else onOpen(topic.id)
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          setStatus(key, status === 'done' ? 'pending' : 'done')
        }}
        title={`${topic.title} · ~${topic.hours}h\nClick: details · Right-click: done · Shift+click: learning · Alt+click: skip`}
        className="flex min-w-0 flex-1 items-center gap-2 py-2.5 pr-3 text-left text-sm"
      >
        <span className={`min-w-0 flex-1 font-medium ${status === 'done' ? 'text-emerald-900 dark:text-emerald-200' : status === 'skipped' ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
          {topic.title}
        </span>
        {hasNote && <NotebookPen size={13} className="shrink-0 text-slate-400" aria-label="Has notes" />}
        {topic.kind !== 'core' && (
          <Badge className={topic.kind === 'optional' ? 'bg-violet-100 !px-1.5 !text-[10px] text-violet-700 dark:bg-violet-400/15 dark:text-violet-300' : 'bg-slate-100 !px-1.5 !text-[10px] text-slate-500 dark:bg-white/10 dark:text-slate-400'}>
            {topic.kind === 'optional' ? 'Optional' : 'Alt'}
          </Badge>
        )}
        <span className="shrink-0 font-mono text-[10px] text-slate-400 transition group-hover:text-[var(--accent)]" style={{ ['--accent' as string]: accent }}>{topic.hours}h</span>
      </button>
    </div>
  )
}
