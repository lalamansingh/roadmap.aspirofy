import { ArrowRight, BarChart3, Brain, CalendarClock, Flame, Hammer, Target, Timer, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import RoadmapCard from '../components/RoadmapCard'
import { Card, ProgressBar } from '../components/ui'
import { findTopic, roadmaps } from '../data'
import { isStarted, nextUp, roadmapStats, streaks, totals, xp } from '../lib/analytics'
import { useTracker } from '../lib/store'
import { fmtMinutes } from '../lib/theme'

const features = [
  { icon: BarChart3, title: 'Progress analytics', text: 'Heatmaps, weekly velocity, study-time charts, and per-section breakdowns.' },
  { icon: CalendarClock, title: 'Finish-date forecasts', text: 'See when you will finish each roadmap at your current pace, and set target dates.' },
  { icon: Timer, title: 'Built-in study timer', text: 'Log focused time per topic and compare it against estimated hours.' },
  { icon: Brain, title: 'Spaced-repetition review', text: 'Completed topics come back for quick recall checks so knowledge sticks.' },
  { icon: Hammer, title: 'Milestone projects', text: 'Every stage ends with a hands-on project to prove what you learned.' },
  { icon: Trophy, title: 'Streaks, XP & badges', text: 'Stay motivated with daily streaks, levels, and achievements.' },
]

export default function Home() {
  const { progress, events } = useTracker()
  const started = roadmaps.filter((r) => isStarted(r, progress))
  const roles = roadmaps.filter((r) => r.category === 'role')
  const skills = roadmaps.filter((r) => r.category === 'skill')

  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-24">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <Target size={14} className="text-brand-500" /> Roadmaps + analytics in one place
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Know what to learn.<br />
            <span className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">Measure how you grow.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Step-by-step learning roadmaps for developers, with a tracking system that turns every topic you study into data: streaks, velocity, time spent, and forecasts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/roadmaps" className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900">
              Explore roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
              <BarChart3 size={16} /> View my analytics
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12">
        {started.length > 0 && <ContinueLearning />}

        <section>
          <SectionTitle title="Role-based roadmaps" subtitle="Complete paths toward a job title." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r) => <RoadmapCard key={r.id} roadmap={r} />)}
          </div>
        </section>

        <section>
          <SectionTitle title="Skill-based roadmaps" subtitle="Go deep on a single technology or discipline." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((r) => <RoadmapCard key={r.id} roadmap={r} />)}
          </div>
        </section>

        <section>
          <SectionTitle title="More than a roadmap" subtitle="Everything you need to actually finish what you start." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon className="text-amber-500" />
                <div className="mt-3 font-semibold">{title}</div>
                <div className="mt-1 text-sm text-slate-500">{text}</div>
              </Card>
            ))}
          </div>
        </section>

        {events.length === 0 && (
          <Card className="text-center">
            <div className="font-semibold">Want to see the analytics before you start?</div>
            <p className="mt-1 text-sm text-slate-500">Load 90 days of sample activity, and clear it whenever you like from Settings.</p>
            <button onClick={() => useTracker.getState().seedDemo()} className="mt-4 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300">
              Load demo data
            </button>
          </Card>
        )}
      </div>
    </div>
  )
}

function ContinueLearning() {
  const { progress, events } = useTracker()
  const s = streaks(events)
  const t = totals(events, progress)
  const level = xp(events, progress)
  const next = nextUp(progress, 4)
  const started = roadmaps.filter((r) => isStarted(r, progress))
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Continue learning</div>
          <Link to="/dashboard" className="text-sm text-slate-500 hover:underline">Full analytics →</Link>
        </div>
        <div className="mt-4 space-y-3">
          {started.map((r) => {
            const st = roadmapStats(r, progress)
            return (
              <Link key={r.id} to={`/roadmaps/${r.id}`} className="block rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                <div className="mb-1 flex justify-between text-sm"><span className="font-medium">{r.title}</span><span className="tabular-nums text-slate-500">{st.done}/{st.total} · {st.pct}%</span></div>
                <ProgressBar value={st.pct} color={r.accent} />
              </Link>
            )
          })}
        </div>
        {next.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Up next</div>
            <div className="flex flex-wrap gap-2">
              {next.map((k) => {
                const f = findTopic(k)!
                return <Link key={k} to={`/roadmaps/${f.roadmap.id}?topic=${f.topic.id}`} className="rounded-full border border-slate-200 px-3 py-1 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">{f.topic.title}</Link>
              })}
            </div>
          </div>
        )}
      </Card>
      <Card>
        <div className="font-semibold">Your stats</div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div><div className="flex items-center gap-1 text-2xl font-bold"><Flame className="text-orange-500" size={22} />{s.current}</div><div className="text-xs text-slate-500">day streak</div></div>
          <div><div className="text-2xl font-bold">{t.done}</div><div className="text-xs text-slate-500">topics done</div></div>
          <div><div className="text-2xl font-bold">{fmtMinutes(t.minutes)}</div><div className="text-xs text-slate-500">time studied</div></div>
          <div><div className="text-2xl font-bold">Lv {level.level}</div><div className="text-xs text-slate-500">{level.points} XP</div></div>
        </div>
        <ProgressBar value={(level.into / level.span) * 100} color="#a855f7" className="mt-4" />
        <div className="mt-1 text-xs text-slate-500">{level.span - level.into} XP to level {level.level + 1}</div>
      </Card>
    </section>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-slate-500">{subtitle}</p>
    </div>
  )
}
