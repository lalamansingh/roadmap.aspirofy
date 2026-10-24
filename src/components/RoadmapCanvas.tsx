import { Hammer } from 'lucide-react'
import { topicKey } from '../data'
import type { Roadmap, Section, Status, Topic } from '../data/types'
import { roadmapStats } from '../lib/analytics'
import { useTracker } from '../lib/store'

interface Props {
  roadmap: Roadmap
  visible: (t: Topic) => boolean
  onOpen: (topicId: string) => void
}

export default function RoadmapCanvas({ roadmap, visible, onOpen }: Props) {
  const progress = useTracker((s) => s.progress)
  const stats = roadmapStats(roadmap, progress)

  return (
    <div className="relative mx-auto max-w-5xl pb-10">
      <div className="mb-8 flex justify-center">
        <div className="rounded-lg border-2 border-slate-900 bg-white px-6 py-3 text-xl font-extrabold shadow-[4px_4px_0_#0f172a] dark:border-slate-200 dark:bg-slate-900 dark:shadow-[4px_4px_0_#e2e8f0]">
          {roadmap.title}
        </div>
      </div>
      {roadmap.sections.map((section, i) => (
        <SectionRow
          key={section.id}
          index={i}
          roadmapId={roadmap.id}
          section={section}
          sectionPct={stats.sections[i].pct}
          visible={visible}
          onOpen={onOpen}
          last={i === roadmap.sections.length - 1}
        />
      ))}
      <div className="mt-2 flex justify-center">
        <div className="rounded-full border-2 border-dashed border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          🎯 Keep learning — you&apos;re job-ready when every core node is green
        </div>
      </div>
    </div>
  )
}

function SectionRow({ roadmapId, section, sectionPct, visible, onOpen, last, index }: {
  roadmapId: string; section: Section; sectionPct: number; visible: (t: Topic) => boolean; onOpen: (id: string) => void; last: boolean; index: number
}) {
  const topics = section.topics.filter(visible)
  const left = topics.filter((_, i) => i % 2 === 0)
  const right = topics.filter((_, i) => i % 2 === 1)

  return (
    <div className="relative pb-10">
      {!last && <div className="rm-spine absolute bottom-0 left-1/2 top-0 hidden w-[3px] -translate-x-1/2 md:block" />}
      <div className="relative grid items-center gap-3 md:grid-cols-[1fr_230px_1fr] md:gap-x-0">
        <div className="order-2 flex flex-col items-stretch gap-2 md:order-1 md:items-end">
          {left.map((t) => <TopicNode key={t.id} roadmapId={roadmapId} topic={t} side="left" onOpen={onOpen} />)}
        </div>
        <div className="order-1 z-10 flex justify-center md:order-2">
          <div className="w-full rounded-md border-2 border-slate-900 bg-brand-400 px-4 py-2.5 text-center shadow-[3px_3px_0_#0f172a] md:w-[210px] dark:border-slate-100 dark:shadow-[3px_3px_0_#e2e8f0]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Step {index + 1}</div>
            <div className="font-bold text-slate-900">{section.title}</div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-900/15">
              <div className="h-full bg-slate-900 transition-all" style={{ width: `${sectionPct}%` }} />
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-800">{sectionPct}% · {section.description}</div>
          </div>
        </div>
        <div className="order-3 flex flex-col items-stretch gap-2 md:items-start">
          {right.map((t) => <TopicNode key={t.id} roadmapId={roadmapId} topic={t} side="right" onOpen={onOpen} />)}
        </div>
      </div>
      {section.project && (
        <div className="relative z-10 mx-auto mt-4 flex max-w-md items-start gap-2 rounded-lg border-2 border-dashed border-indigo-400 bg-indigo-50 px-3 py-2 text-sm dark:bg-indigo-950/60">
          <Hammer size={16} className="mt-0.5 shrink-0 text-indigo-600" />
          <div>
            <span className="font-semibold text-indigo-700 dark:text-indigo-300">Milestone project: {section.project.title}</span>
            <div className="text-xs text-slate-600 dark:text-slate-400">{section.project.description}</div>
          </div>
        </div>
      )}
    </div>
  )
}

const nodeStyle: Record<Status, string> = {
  pending: 'bg-amber-50 border-slate-900 dark:bg-slate-800 dark:border-slate-300',
  'in-progress': 'bg-amber-200 border-amber-600 ring-2 ring-amber-400/60 dark:bg-amber-500/30',
  done: 'bg-emerald-200 border-emerald-700 text-emerald-900 node-done dark:bg-emerald-500/30 dark:text-emerald-100',
  skipped: 'bg-slate-100 border-slate-300 text-slate-400 line-through opacity-60 dark:bg-slate-900',
}

function TopicNode({ roadmapId, topic, side, onOpen }: { roadmapId: string; topic: Topic; side: 'left' | 'right'; onOpen: (id: string) => void }) {
  const key = topicKey(roadmapId, topic.id)
  const status = useTracker((s) => s.progress[key] ?? 'pending')
  const setStatus = useTracker((s) => s.setStatus)
  const hasNote = useTracker((s) => Boolean(s.notes[key]))

  return (
    <div className={`flex items-center ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
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
        className={`group relative w-full rounded border-2 px-3 py-1.5 text-left text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md md:w-60 ${nodeStyle[status]}`}
      >
        <span className="flex items-center gap-2">
          {topic.kind !== 'core' && (
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${topic.kind === 'optional' ? 'bg-violet-500' : 'bg-slate-400'}`}
              title={topic.kind === 'optional' ? 'Optional' : 'Alternative option'}
            />
          )}
          <span className="flex-1">{topic.title}</span>
          {hasNote && <span title="Has notes">📝</span>}
          <span className="text-[10px] font-normal text-slate-500 opacity-0 transition group-hover:opacity-100">{topic.hours}h</span>
        </span>
      </button>
      <div className="rm-link hidden h-[2px] w-12 shrink-0 md:block" />
    </div>
  )
}
