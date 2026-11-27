import { ArrowLeft, CheckCircle2, GraduationCap, RotateCcw, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Badge, Card, EmptyState, ProgressBar, levelMeta, PageHeader } from '../components/ui'
import { roadmapById } from '../data'
import { questionsFor } from '../data/quizzes'
import type { Roadmap, Section } from '../data/types'
import { attemptsFor, bestScore, pct, useQuizzes } from '../lib/quizStore'

export default function Quiz() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const roadmap = roadmapById[id]
  const sectionId = params.get('section')

  if (!roadmap) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <EmptyState title="Roadmap not found">
          <Link to="/roadmaps" className="underline">Browse roadmaps</Link>
        </EmptyState>
      </div>
    )
  }

  const section = sectionId ? roadmap.sections.find((s) => s.id === sectionId) : undefined
  if (sectionId && section) return <QuizRunner key={section.id} roadmap={roadmap} section={section} />
  return <SectionList roadmap={roadmap} />
}

function SectionList({ roadmap }: { roadmap: Roadmap }) {
  const attempts = useQuizzes((s) => s.attempts)
  const quizzable = roadmap.sections.filter((s) => questionsFor(roadmap.id, s.id).length)
  const bests = quizzable.map((s) => bestScore(roadmap.id, s.id, attempts) ?? 0)
  const mastery = bests.length ? Math.round(bests.reduce((a, b) => a + b, 0) / bests.length) : 0
  const tried = quizzable.filter((s) => attemptsFor(attempts, roadmap.id, s.id).length).length

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to={`/roadmaps/${roadmap.id}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">
        <ArrowLeft size={14} /> {roadmap.title} roadmap
      </Link>
      <div className="mt-4"><PageHeader icon={<GraduationCap size={22} />} eyebrow="Quizzes" title={roadmap.title} subtitle="Check what stuck. Three quick questions per section, with explanations for every answer." /></div>

      <Card className="mt-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Mastery</div>
            <div className="text-3xl font-bold tabular-nums">{mastery}%</div>
          </div>
          <div className="text-right text-sm text-slate-500">
            <b className="text-slate-900 dark:text-white">{tried}</b> / {quizzable.length} sections attempted
          </div>
        </div>
        <ProgressBar value={mastery} color={roadmap.accent} className="mt-3" />
        <div className="mt-2 text-xs text-slate-500">Average of your best score in each section (unattempted sections count as 0%).</div>
      </Card>

      <div className="mt-6 space-y-3">
        {roadmap.sections.map((s) => {
          const count = questionsFor(roadmap.id, s.id).length
          const list = attemptsFor(attempts, roadmap.id, s.id)
          const best = bestScore(roadmap.id, s.id, attempts)
          return (
            <Card key={s.id} className="!p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{s.title}</span>
                    <Badge className={levelMeta[s.level].className}>{levelMeta[s.level].label}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-slate-500">
                    {count ? (
                      <>
                        <span>{count} questions</span>
                        <span>Best: <b className={best === undefined ? '' : scoreColor(best)}>{best === undefined ? '—' : `${best}%`}</b></span>
                        <span>{list.length} {list.length === 1 ? 'attempt' : 'attempts'}</span>
                      </>
                    ) : (
                      <span>No quiz yet</span>
                    )}
                  </div>
                </div>
                {count > 0 && (
                  <Link
                    to={`/quiz/${roadmap.id}?section=${s.id}`}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    {list.length ? 'Retake' : 'Start'}
                  </Link>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function QuizRunner({ roadmap, section }: { roadmap: Roadmap; section: Section }) {
  const questions = questionsFor(roadmap.id, section.id)
  const addAttempt = useQuizzes((s) => s.addAttempt)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const back = `/quiz/${roadmap.id}`

  const header = (
    <>
      <Link to={back} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">
        <ArrowLeft size={14} /> All {roadmap.title} quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{section.title}</h1>
    </>
  )

  if (!questions.length) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        {header}
        <div className="mt-6"><EmptyState title="No quiz yet">Questions for this section are coming soon.</EmptyState></div>
      </div>
    )
  }

  const restart = () => { setIndex(0); setPicked(null); setScore(0); setFinished(false) }

  if (finished) {
    const p = pct({ score, total: questions.length })
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        {header}
        <Card className="mt-6 !p-8 text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Your score</div>
          <div className={`mt-1 text-5xl font-bold tabular-nums ${scoreColor(p)}`}>{score} / {questions.length}</div>
          <div className="mt-1 text-slate-500">{p}% · {p === 100 ? 'Perfect — nicely done!' : p >= 70 ? 'Solid understanding.' : 'Worth another look at this section.'}</div>
          <ProgressBar value={p} color={roadmap.accent} className="mt-5" />
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={restart} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              <RotateCcw size={15} /> Retry
            </button>
            <Link to={back} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5">
              Back to sections
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const q = questions[index]
  const answered = picked !== null
  const isLast = index === questions.length - 1

  const choose = (i: number) => {
    if (answered) return
    setPicked(i)
    if (i === q.answer) setScore((n) => n + 1)
  }

  const next = () => {
    if (isLast) {
      addAttempt({ roadmapId: roadmap.id, sectionId: section.id, score, total: questions.length })
      setFinished(true)
    } else {
      setIndex((n) => n + 1)
      setPicked(null)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {header}
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score <b className="text-slate-900 dark:text-white">{score}</b></span>
      </div>
      <ProgressBar value={((index + (answered ? 1 : 0)) / questions.length) * 100} color={roadmap.accent} className="mt-2" />

      <Card className="mt-6 !p-8">
        <h2 className="text-lg font-semibold">{q.q}</h2>
        <div className="mt-5 space-y-2">
          {q.options.map((opt, i) => {
            const correct = i === q.answer
            const state = !answered
              ? 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:hover:border-slate-500 dark:hover:bg-white/5'
              : correct
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-200'
                : i === picked
                  ? 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-500/15 dark:text-rose-200'
                  : 'border-slate-200 opacity-60 dark:border-white/[.07]'
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${state}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">{String.fromCharCode(65 + i)}</span>
                <span className="flex-1">{opt}</span>
                {answered && correct && <CheckCircle2 size={18} className="text-emerald-600" />}
                {answered && !correct && i === picked && <XCircle size={18} className="text-rose-600" />}
              </button>
            )
          })}
        </div>

        {answered && (
          <>
            <div className={`mt-5 rounded-lg p-4 text-sm ${picked === q.answer ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}>
              <div className="font-semibold">{picked === q.answer ? 'Correct!' : 'Not quite.'}</div>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{q.explain}</p>
            </div>
            <button onClick={next} className="mt-5 w-full rounded-lg bg-slate-900 py-3 font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              {isLast ? 'See results' : 'Next question'}
            </button>
          </>
        )}
      </Card>
    </div>
  )
}

const scoreColor = (p: number) => (p >= 70 ? 'text-emerald-600 dark:text-emerald-400' : p >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400')
