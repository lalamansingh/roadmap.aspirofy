import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { roadmapById } from '../data'
import { bestBySection, pct, useQuizzes } from '../lib/quizStore'
import { Card } from './ui'

const sectionTitle = (roadmapId: string, sectionId: string) =>
  roadmapById[roadmapId]?.sections.find((s) => s.id === sectionId)?.title ?? sectionId

export default function QuizStats() {
  const attempts = useQuizzes((s) => s.attempts)
  const avg = attempts.length ? Math.round(attempts.reduce((sum, a) => sum + pct(a), 0) / attempts.length) : 0
  const recent = [...attempts].sort((a, b) => b.ts - a.ts).slice(0, 5)
  const weakest = Object.entries(bestBySection(attempts))
    .filter(([, best]) => best < 70)
    .sort((a, b) => a[1] - b[1])
    .map(([key, best]) => {
      const [roadmapId, sectionId] = key.split('/')
      return { roadmapId, sectionId, best }
    })

  return (
    <Card>
      <div className="flex items-center gap-2 font-semibold"><GraduationCap size={18} className="text-violet-500" /> Quiz performance</div>
      {!attempts.length ? (
        <p className="mt-3 text-sm text-slate-500">No quizzes taken yet. Open any roadmap's quizzes to test yourself.</p>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Attempts</div>
              <div className="text-2xl font-bold tabular-nums">{attempts.length}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Average score</div>
              <div className="text-2xl font-bold tabular-nums">{avg}%</div>
            </div>
          </div>

          <div className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">Recent</div>
          <ul className="mt-1 space-y-1 text-sm">
            {recent.map((a) => (
              <li key={a.ts} className="flex justify-between gap-2">
                <span className="truncate text-slate-600 dark:text-slate-400">{roadmapById[a.roadmapId]?.title ?? a.roadmapId} · {sectionTitle(a.roadmapId, a.sectionId)}</span>
                <span className="shrink-0 font-medium tabular-nums">{a.score}/{a.total}</span>
              </li>
            ))}
          </ul>

          {weakest.length > 0 && (
            <>
              <div className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">Needs work (best &lt; 70%)</div>
              <ul className="mt-1 space-y-1 text-sm">
                {weakest.map((w) => (
                  <li key={`${w.roadmapId}/${w.sectionId}`} className="flex justify-between gap-2">
                    <Link to={`/quiz/${w.roadmapId}?section=${w.sectionId}`} className="truncate underline decoration-slate-300 hover:decoration-current dark:decoration-slate-600">
                      {roadmapById[w.roadmapId]?.title ?? w.roadmapId} · {sectionTitle(w.roadmapId, w.sectionId)}
                    </Link>
                    <span className="shrink-0 font-medium tabular-nums text-rose-600 dark:text-rose-400">{w.best}%</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </Card>
  )
}
