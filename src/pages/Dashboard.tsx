import { AlertTriangle, BarChart3, Brain, CalendarClock, Clock, Flame, Gauge, Target, Trophy } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Heatmap from '../components/Heatmap'
import ProjectStats from '../components/ProjectStats'
import QuizStats from '../components/QuizStats'
import { Card, EmptyState, ProgressBar, Stat, levelMeta, PageHeader } from '../components/ui'
import { findTopic, roadmaps } from '../data'
import {
  achievements, dailyActivity, dueReviews, estimateAccuracy, forecast, hourOfDay, isStarted, levelBreakdown,
  nextUp, roadmapStats, streaks, timePerTopic, totals, weakTopics, weekdayDistribution, weeklySeries, xp,
} from '../lib/analytics'
import { useTracker } from '../lib/store'
import { fmtMinutes } from '../lib/theme'

const axis = { stroke: 'var(--chart-text)', fontSize: 11, tickLine: false, axisLine: false }
const grid = <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="0" vertical={false} />
const tooltipStyle = { contentStyle: { background: '#0f172a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }, labelStyle: { color: '#cbd5e1' }, cursor: { fill: 'rgba(100,116,139,.12)' } }
const ranges = [{ label: '30 days', days: 30 }, { label: '90 days', days: 90 }, { label: '1 year', days: 365 }]

export default function Dashboard() {
  const { progress, events, reviews, confidence, notes, weeklyGoalHours, setWeeklyGoal, name } = useTracker()
  const [range, setRange] = useState(90)

  const data = useMemo(() => {
    const since = Date.now() - range * 86_400_000
    const inRange = events.filter((e) => e.ts >= since)
    return {
      t: totals(events, progress),
      tr: totals(inRange, {}),
      s: streaks(events),
      lvl: xp(events, progress),
      daily: dailyActivity(events, range).map((d) => ({ ...d, label: new Date(d.ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) })),
      heat: dailyActivity(events, 365),
      weekly: weeklySeries(events, Math.min(26, Math.ceil(range / 7))),
      hours: hourOfDay(inRange),
      weekday: weekdayDistribution(inRange),
      levels: levelBreakdown(progress),
      accuracy: estimateAccuracy(events, progress),
      spent: timePerTopic(events),
      badges: achievements(events, progress, Object.keys(notes).length),
    }
  }, [events, progress, notes, range])

  if (events.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <PageHeader icon={<BarChart3 size={22} />} eyebrow="Analytics" title="Your learning analytics" />
        <div className="mt-6">
          <EmptyState title="No activity yet">
            Open any roadmap and mark topics as learning or done, or start the study timer, and your analytics will appear here.
            <div className="mt-4 flex justify-center gap-2">
              <Link to="/roadmaps" className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white dark:bg-white dark:text-slate-900">Pick a roadmap</Link>
              <button onClick={() => useTracker.getState().seedDemo()} className="rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-500">Load demo data</button>
            </div>
          </EmptyState>
        </div>
      </div>
    )
  }

  const { t, tr, s, lvl, daily, heat, weekly, hours, weekday, levels, accuracy, spent, badges } = data
  const thisWeek = weekly[weekly.length - 1]
  const started = roadmaps.filter((r) => isStarted(r, progress))
  const due = dueReviews(reviews)
  const weak = weakTopics(confidence, progress)
  const next = nextUp(progress, 6)
  const topSpent = [...spent.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)
  const peakHour = hours.reduce((a, b) => (b.minutes > a.minutes ? b : a))
  const unlocked = badges.filter((b) => b.unlocked).length

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader icon={<BarChart3 size={22} />} eyebrow="Analytics" title={name ? `${name}'s analytics` : 'Your learning analytics'} subtitle="Everything you study is tracked here: progress, consistency, pace and retention." />
        <div className="flex rounded-lg border border-slate-300 bg-white p-0.5 dark:border-white/10 dark:bg-white/[.03]">
          {ranges.map((r) => (
            <button key={r.days} onClick={() => setRange(r.days)} className={`rounded-md px-3 py-1.5 text-sm font-medium ${range === r.days ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}>{r.label}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
        <Stat label="Streak" value={<span className="flex items-center gap-1"><Flame size={20} className="text-orange-500" />{s.current}d</span>} hint={`Longest ${s.longest}d`} />
        <Stat label="Topics done" value={t.done} hint={`${t.inProgress} in progress`} />
        <Stat label="Time studied" value={fmtMinutes(t.minutes)} hint={`${fmtMinutes(tr.minutes)} in ${range}d`} icon={<Clock size={14} />} />
        <Stat label="Active days" value={s.activeDays} hint="all time" />
        <Stat label="Level" value={`Lv ${lvl.level}`} hint={`${lvl.points} XP`} icon={<Trophy size={14} />} />
        <Stat label="Reviews due" value={due.length} hint={<Link to="/review" className="underline">Start review</Link>} icon={<Brain size={14} />} />
        <Stat label="Pace vs estimate" value={accuracy ? `${accuracy}×` : '—'} hint={accuracy ? (accuracy > 1 ? 'slower than estimate' : 'faster than estimate') : 'log time to compare'} icon={<Gauge size={14} />} />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-semibold">Activity — last 12 months</div>
          <div className="text-xs text-slate-500">{heat.filter((d) => d.actions).length} active days</div>
        </div>
        <Heatmap days={heat} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="font-semibold">Daily study time</div>
          <div className="text-xs text-slate-500">Minutes logged per day</div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <AreaChart data={daily} margin={{ left: -20, right: 8 }}>
                <defs>
                  <linearGradient id="studyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--series-1)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--series-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {grid}
                <XAxis dataKey="label" {...axis} interval="preserveStartEnd" minTickGap={30} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} cursor={{ stroke: 'var(--chart-text)', strokeDasharray: '3 3' }} formatter={(v) => [`${v} min`, 'Studied']} />
                <Area isAnimationActive={false} type="monotone" dataKey="minutes" stroke="var(--series-1)" strokeWidth={2} fill="url(#studyFill)" activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="font-semibold">Weekly goal</div>
            <label className="flex items-center gap-1 text-xs text-slate-500">
              <Target size={13} />
              <input type="number" min={1} max={80} value={weeklyGoalHours} onChange={(e) => setWeeklyGoal(Math.max(1, Number(e.target.value)))} className="w-12 rounded border border-slate-300 bg-transparent px-1 py-0.5 text-right dark:border-white/10" /> h/week
            </label>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <GoalRing value={thisWeek.hours} goal={weeklyGoalHours} />
          </div>
          <div className="mt-4 text-center text-sm text-slate-500">
            {thisWeek.hours >= weeklyGoalHours ? '🎉 Goal reached this week!' : `${(weeklyGoalHours - thisWeek.hours).toFixed(1)}h to go this week`}
          </div>
          <div className="mt-1 text-center text-xs text-slate-500">
            Goal hit in {weekly.filter((w) => w.hours >= weeklyGoalHours).length} of the last {weekly.length} weeks
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="font-semibold">Hours per week</div>
          <div className="text-xs text-slate-500">Dashed line = your weekly goal ({weeklyGoalHours}h)</div>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <BarChart data={weekly} margin={{ left: -20, right: 8 }}>
                {grid}
                <XAxis dataKey="week" {...axis} minTickGap={20} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} formatter={(v) => [`${v} h`, 'Studied']} />
                <ReferenceLine y={weeklyGoalHours} stroke="var(--chart-text)" strokeDasharray="4 4" />
                <Bar isAnimationActive={false} dataKey="hours" fill="var(--series-1)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="font-semibold">Topics completed per week</div>
          <div className="text-xs text-slate-500">Your learning velocity</div>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <BarChart data={weekly} margin={{ left: -20, right: 8 }}>
                {grid}
                <XAxis dataKey="week" {...axis} minTickGap={20} />
                <YAxis {...axis} allowDecimals={false} />
                <Tooltip {...tooltipStyle} formatter={(v) => [v, 'Completed']} />
                <Bar isAnimationActive={false} dataKey="completed" fill="var(--series-2)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-semibold">Roadmap progress & forecasts</div>
          <Link to="/roadmaps" className="text-sm text-slate-500 hover:underline">Browse more →</Link>
        </div>
        {started.length === 0 ? <div className="text-sm text-slate-500">No roadmaps started yet.</div> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                <tr><th className="pb-2 font-medium">Roadmap</th><th className="pb-2 font-medium">Progress</th><th className="pb-2 text-right font-medium">Topics</th><th className="pb-2 text-right font-medium">Hours left</th><th className="pb-2 text-right font-medium">Pace</th><th className="pb-2 text-right font-medium">Projected finish</th></tr>
              </thead>
              <tbody>
                {started.map((r) => {
                  const st = roadmapStats(r, progress)
                  const fc = forecast(r, events, progress)
                  return (
                    <tr key={r.id} className="border-t border-slate-100 dark:border-white/[.07]">
                      <td className="py-3"><Link to={`/roadmaps/${r.id}`} className="font-medium hover:underline">{r.title}</Link></td>
                      <td className="w-1/4 py-3 pr-4"><div className="flex items-center gap-2"><ProgressBar value={st.pct} color={r.accent} /><span className="w-9 text-right tabular-nums">{st.pct}%</span></div></td>
                      <td className="py-3 text-right tabular-nums">{st.done}/{st.total}</td>
                      <td className="py-3 text-right tabular-nums">{st.hoursTotal - st.hoursDone}h</td>
                      <td className="py-3 text-right tabular-nums">{fc.perWeek}/wk</td>
                      <td className="py-3 text-right">{fc.remaining === 0 ? '✅ Done' : fc.eta ? <span className="inline-flex items-center gap-1"><CalendarClock size={13} />{new Date(fc.eta).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span> : <span className="text-slate-400">no recent pace</span>}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <div className="font-semibold">When you study</div>
          <div className="text-xs text-slate-500">Peak hour: {peakHour.minutes ? `${peakHour.hour}:00–${peakHour.hour + 1}:00` : '—'}</div>
          <div className="mt-4 h-44">
            <ResponsiveContainer>
              <BarChart data={hours} margin={{ left: -28, right: 4 }}>
                {grid}
                <XAxis dataKey="hour" {...axis} interval={5} tickFormatter={(h) => `${h}h`} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} labelFormatter={(h) => `${h}:00`} formatter={(v) => [`${v} min`, 'Studied']} />
                <Bar isAnimationActive={false} dataKey="minutes" fill="var(--series-1)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="font-semibold">By weekday</div>
          <div className="text-xs text-slate-500">Minutes studied in the last {range} days</div>
          <div className="mt-4 h-44">
            <ResponsiveContainer>
              <BarChart data={weekday} margin={{ left: -28, right: 4 }}>
                {grid}
                <XAxis dataKey="day" {...axis} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} formatter={(v) => [`${v} min`, 'Studied']} />
                <Bar isAnimationActive={false} dataKey="minutes" fill="var(--series-1)" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="font-semibold">Skill depth</div>
          <div className="text-xs text-slate-500">Completion by difficulty across started roadmaps</div>
          <div className="mt-5 space-y-4">
            {levels.map((l) => {
              const pct = l.total ? Math.round((l.done / l.total) * 100) : 0
              return (
                <div key={l.level}>
                  <div className="mb-1 flex justify-between text-sm"><span className={`rounded px-1.5 text-xs font-medium ${levelMeta[l.level].className}`}>{levelMeta[l.level].label}</span><span className="tabular-nums text-slate-500">{l.done}/{l.total} · {pct}%</span></div>
                  <ProgressBar value={pct} color="var(--series-1)" />
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <TopicList title="Up next" hint="Your next topic in each roadmap" keys={next} empty="Nothing queued." />
        <TopicList title="Needs reinforcement" hint="Completed, but rated low confidence" keys={weak} empty="No weak spots. Nice!" icon={<AlertTriangle size={14} className="text-amber-500" />} />
        <Card>
          <div className="font-semibold">Most time invested</div>
          <div className="text-xs text-slate-500">Top topics by logged minutes</div>
          <ul className="mt-3 space-y-2">
            {topSpent.map(([k, m]) => {
              const f = findTopic(k)
              if (!f) return null
              return (
                <li key={k} className="flex items-center justify-between text-sm">
                  <Link to={`/roadmaps/${f.roadmap.id}?topic=${f.topic.id}`} className="truncate hover:underline">{f.topic.title}</Link>
                  <span className="ml-2 shrink-0 tabular-nums text-slate-500">{fmtMinutes(m)} <span className="text-xs">/ {f.topic.hours}h est.</span></span>
                </li>
              )
            })}
            {topSpent.length === 0 && <li className="text-sm text-slate-500">Use the study timer on a topic to log time.</li>}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <QuizStats />
        <ProjectStats />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-semibold">Achievements</div>
          <div className="text-sm text-slate-500">{unlocked}/{badges.length} unlocked</div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((b) => (
            <div key={b.id} className={`rounded-xl border p-3 text-center ${b.unlocked ? 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10' : 'border-slate-200 opacity-60 dark:border-white/[.07]'}`}>
              <div className={`text-3xl ${b.unlocked ? '' : 'grayscale'}`}>{b.icon}</div>
              <div className="mt-1 text-sm font-semibold">{b.title}</div>
              <div className="text-[11px] text-slate-500">{b.description}</div>
              {!b.unlocked && <ProgressBar value={b.progress * 100} color="var(--series-1)" className="mt-2 !h-1" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function GoalRing({ value, goal }: { value: number; goal: number }) {
  const pct = Math.min(1, value / goal)
  const r = 54
  const c = 2 * Math.PI * r
  return (
    <svg width={140} height={140} viewBox="0 0 140 140" role="img" aria-label={`${value} of ${goal} hours this week`}>
      <circle cx={70} cy={70} r={r} fill="none" stroke="var(--chart-grid)" strokeWidth={12} />
      <circle cx={70} cy={70} r={r} fill="none" stroke="var(--series-1)" strokeWidth={12} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 70 70)" style={{ transition: 'stroke-dashoffset .6s' }} />
      <text x={70} y={66} textAnchor="middle" className="fill-current text-2xl font-bold">{value}h</text>
      <text x={70} y={86} textAnchor="middle" className="fill-slate-500 text-xs">of {goal}h</text>
    </svg>
  )
}

function TopicList({ title, hint, keys, empty, icon }: { title: string; hint: string; keys: string[]; empty: string; icon?: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center gap-1.5 font-semibold">{icon}{title}</div>
      <div className="text-xs text-slate-500">{hint}</div>
      <ul className="mt-3 space-y-2">
        {keys.slice(0, 6).map((k) => {
          const f = findTopic(k)
          if (!f) return null
          return (
            <li key={k}>
              <Link to={`/roadmaps/${f.roadmap.id}?topic=${f.topic.id}`} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-white/5">
                <span className="truncate">{f.topic.title}</span>
                <span className="ml-2 shrink-0 text-xs text-slate-500">{f.roadmap.title}</span>
              </Link>
            </li>
          )
        })}
        {keys.length === 0 && <li className="text-sm text-slate-500">{empty}</li>}
      </ul>
    </Card>
  )
}
