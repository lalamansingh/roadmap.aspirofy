import { Brain, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, EmptyState, PageHeader } from '../components/ui'
import { findTopic } from '../data'
import { dueReviews } from '../lib/analytics'
import { useTracker } from '../lib/store'

const grades = [
  { g: 0, label: 'Forgot', className: 'bg-rose-500 hover:bg-rose-600' },
  { g: 1, label: 'Hard', className: 'bg-amber-500 hover:bg-amber-600' },
  { g: 2, label: 'Good', className: 'bg-sky-600 hover:bg-sky-700' },
  { g: 3, label: 'Easy', className: 'bg-emerald-600 hover:bg-emerald-700' },
] as const

export default function Review() {
  const reviews = useTracker((s) => s.reviews)
  const notes = useTracker((s) => s.notes)
  const gradeReview = useTracker((s) => s.gradeReview)
  const [revealed, setRevealed] = useState(false)
  const [doneCount, setDoneCount] = useState(0)
  const queue = dueReviews(reviews)
  const upcoming = Object.values(reviews).filter((c) => c.due > Date.now()).length
  const current = queue[0] ? findTopic(queue[0]) : undefined

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <PageHeader icon={<Brain size={22} />} eyebrow="Retention" title="Spaced review" subtitle="Completed topics come back at growing intervals. Recall the key ideas, then rate yourself honestly." />
      <div className="mt-4 flex gap-4 text-sm text-slate-500">
        <span><b className="text-slate-900 dark:text-white">{queue.length}</b> due now</span>
        <span><b className="text-slate-900 dark:text-white">{doneCount}</b> reviewed this session</span>
        <span><b className="text-slate-900 dark:text-white">{upcoming}</b> scheduled later</span>
      </div>

      <div className="mt-8">
        {!current ? (
          <EmptyState title={doneCount ? 'All caught up! 🎉' : 'Nothing to review right now'}>
            <CheckCircle2 className="mx-auto mb-2 text-emerald-500" />
            Mark topics as done on any roadmap, and they will show up here for review the next day.
            <div className="mt-3"><Link to="/roadmaps" className="underline">Go to roadmaps</Link></div>
          </EmptyState>
        ) : (
          <Card className="!p-8">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{current.roadmap.title} · {current.section.title}</div>
            <h2 className="mt-2 text-2xl font-bold">{current.topic.title}</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Explain this topic out loud or on paper: what it is, why it matters, and one example of when you would use it.</p>
            {!revealed ? (
              <button onClick={() => setRevealed(true)} className="mt-6 w-full rounded-lg bg-slate-900 py-3 font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900">Reveal summary & my notes</button>
            ) : (
              <>
                <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm dark:bg-white/5">
                  <div className="font-semibold">Summary</div>
                  <p className="mt-1">{current.topic.description}</p>
                  {notes[queue[0]] && (<><div className="mt-3 font-semibold">Your notes</div><p className="mt-1 whitespace-pre-wrap">{notes[queue[0]]}</p></>)}
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {grades.map(({ g, label, className }) => (
                    <button key={g} onClick={() => { gradeReview(queue[0], g); setRevealed(false); setDoneCount((n) => n + 1) }} className={`rounded-lg py-2.5 text-sm font-semibold text-white ${className}`}>{label}</button>
                  ))}
                </div>
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
