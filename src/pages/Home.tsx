import {
  ArrowRight, BarChart3, Brain, CalendarClock, Check, CircleDot, Compass, Flame, GraduationCap, Hammer, Lock, Map as MapIcon,
  Sparkles, Timer, TrendingUp, Trophy, Zap,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import RoadmapCard from '../components/RoadmapCard'
import { btn, Card, ProgressBar, Ring, Segmented } from '../components/ui'
import { allTopics, findTopic, roadmapById, roadmaps } from '../data'
import { metaFor } from '../data/meta'
import { quizzes } from '../data/quizzes'
import { isStarted, nextUp, roadmapStats, streaks, totals, xp } from '../lib/analytics'
import { useTracker } from '../lib/store'
import { fmtMinutes } from '../lib/theme'

const topicCount = roadmaps.reduce((a, r) => a + allTopics(r).length, 0)
const questionCount = Object.values(quizzes).reduce((a, sec) => a + Object.values(sec).reduce((b, q) => b + q.length, 0), 0)

const goals = [
  { label: 'Build websites', id: 'frontend' },
  { label: 'Work with AI', id: 'ai-engineer' },
  { label: 'Analyse data', id: 'data-analyst' },
  { label: 'Ship mobile apps', id: 'android' },
  { label: 'Run infrastructure', id: 'devops' },
  { label: 'Design products', id: 'ux-design' },
  { label: 'Lead product', id: 'product-manager' },
  { label: 'Break into security', id: 'cyber-security' },
]

export default function Home() {
  const { progress, events } = useTracker()
  const started = roadmaps.filter((r) => isStarted(r, progress))
  const [tab, setTab] = useState<'role' | 'skill'>('role')
  const list = roadmaps.filter((r) => r.category === tab)

  return (
    <div className="-mt-16">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(108_92_255/.28),transparent)] blur-2xl dark:bg-[radial-gradient(closest-side,rgb(108_92_255/.35),transparent)]" />
        <div aria-hidden className="absolute right-[-10%] top-40 h-[300px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgb(255_160_80/.22),transparent)] blur-2xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
          <div className="rise text-center lg:text-left">
            <Link to="/roadmaps/ai-engineer" className="group mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 py-1 pl-1 pr-3 text-xs font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-brand-300 lg:mx-0 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">New</span>
              AI Engineer roadmap: LLMs, RAG &amp; agents
              <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
            </Link>
            <h1 className="mt-6 text-[44px] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[58px] xl:text-[64px]">
              Know what to learn.<br />
              <span className="text-gradient sm:whitespace-nowrap">Watch yourself grow.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-400">
              Step-by-step roadmaps for {roadmaps.length} tech careers and skills, with a study tracker that turns every topic you learn into streaks, velocity and a real finish date.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link to="/roadmaps" className={`${btn.primary} !px-5 !py-3 !text-[15px]`}>
                Find your roadmap <ArrowRight size={17} />
              </Link>
              {events.length === 0 ? (
                <button onClick={() => useTracker.getState().seedDemo()} className={`${btn.ghost} !px-5 !py-3 !text-[15px]`}>
                  <Sparkles size={16} className="text-brand-500" /> Try it with demo data
                </button>
              ) : (
                <Link to="/dashboard" className={`${btn.ghost} !px-5 !py-3 !text-[15px]`}><BarChart3 size={16} /> Open my analytics</Link>
              )}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-500 lg:justify-start dark:text-slate-400">
              {['100% free', 'No sign-up', 'Data stays on your device'].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><Check size={15} className="text-emerald-500" /> {t}</span>
              ))}
            </div>
          </div>

          <HeroPreview />
        </div>

        {/* Stats strip */}
        <div className="relative border-y border-slate-200/70 bg-white/60 backdrop-blur dark:border-white/[.06] dark:bg-white/[.02]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-slate-200/70 px-4 sm:grid-cols-4 sm:divide-x dark:divide-white/[.06]">
            {[
              { v: roadmaps.length, l: 'Roadmaps', i: MapIcon },
              { v: topicCount.toLocaleString(), l: 'Curated topics', i: CircleDot },
              { v: questionCount, l: 'Quiz questions', i: GraduationCap },
              { v: '100%', l: 'Private & local', i: Lock },
            ].map(({ v, l, i: Icon }) => (
              <div key={l} className="flex items-center justify-center gap-3 py-6">
                <Icon size={20} className="text-brand-500" />
                <div>
                  <div className="font-display text-2xl font-bold tabular-nums">{v}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-24 px-4 py-20">
        {started.length > 0 && <ContinueLearning />}

        {/* GOAL PICKER */}
        <section className="text-center">
          <SectionTitle eyebrow="Start here" title="What do you want to do?" subtitle="Pick a goal and we'll point you to the right path." center />
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
            {goals.map((g) => {
              const r = roadmapById[g.id]
              const { icon: Icon } = metaFor(g.id)
              return (
                <Link key={g.id} to={`/roadmaps/${g.id}`} className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white py-2 pl-2 pr-4 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-lift dark:border-white/10 dark:bg-white/5">
                  <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: `color-mix(in oklab, ${r.accent} 16%, transparent)`, color: r.accent }}><Icon size={15} /></span>
                  {g.label}
                  <ArrowRight size={14} className="text-slate-400 transition group-hover:translate-x-0.5" />
                </Link>
              )
            })}
          </div>
        </section>

        {/* ROADMAPS */}
        <section>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle eyebrow="Roadmaps" title="Choose your path" subtitle={tab === 'role' ? 'Complete journeys toward a job title, from first steps to job-ready.' : 'Go deep on one technology or discipline.'} noMargin />
            <Segmented value={tab} onChange={setTab} options={[{ value: 'role', label: `Role-based · ${roadmaps.filter((r) => r.category === 'role').length}` }, { value: 'skill', label: `Skill-based · ${roadmaps.filter((r) => r.category === 'skill').length}` }]} />
          </div>
          <div key={tab} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((r, i) => <div key={r.id} className="rise" style={{ animationDelay: `${i * 30}ms` }}><RoadmapCard roadmap={r} /></div>)}
          </div>
          <div className="mt-8 text-center">
            <Link to="/roadmaps" className={btn.ghost}>Search all roadmaps &amp; topics <ArrowRight size={15} /></Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section>
          <SectionTitle eyebrow="How it works" title="From “where do I start?” to done" subtitle="Three steps, repeated until you're job-ready." center />
          <div className="relative grid gap-6 md:grid-cols-3">
            <div aria-hidden className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent md:block dark:via-brand-500/50" />
            {[
              { i: Compass, t: 'Pick a roadmap', d: 'Every path is broken into stages, topics with time estimates, free resources and a milestone project.' },
              { i: Timer, t: 'Learn & log', d: 'Mark topics as learning or done, run the study timer, take notes and rate your confidence.' },
              { i: TrendingUp, t: 'See your progress', d: 'Heatmaps, velocity, forecasts, quizzes and spaced review keep you moving and help it stick.' },
            ].map(({ i: Icon, t, d }, n) => (
              <div key={t} className="relative text-center">
                <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-[#14142a]">
                  <Icon size={24} className="text-brand-600 dark:text-brand-300" />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-slate-900 font-mono text-[11px] font-bold text-white dark:bg-white dark:text-slate-900">{n + 1}</span>
                </div>
                <div className="mt-5 font-display text-lg font-semibold">{t}</div>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES BENTO */}
        <section>
          <SectionTitle eyebrow="More than a roadmap" title="Everything you need to actually finish" subtitle="Most people abandon a learning plan in the first month. These tools are built to stop that." />
          <div className="grid gap-4 md:grid-cols-6">
            <Bento className="md:col-span-4" icon={BarChart3} title="Progress analytics" text="A 12-month activity heatmap, weekly velocity, hours versus your goal, and when in the day you study best.">
              <MiniHeatmap />
            </Bento>
            <Bento className="md:col-span-2" icon={CalendarClock} title="Finish-date forecasts" text="Know when you'll finish at your current pace, and whether you're on track for your target date.">
              <div className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">✓ On track: finishing <b>Mar 14</b>, 9 days early</div>
            </Bento>
            <Bento className="md:col-span-2" icon={Brain} title="Spaced review" text="Completed topics come back at growing intervals so knowledge sticks." />
            <Bento className="md:col-span-2" icon={GraduationCap} title={`${questionCount} quiz questions`} text="Section quizzes with explanations and a mastery score for every roadmap." />
            <Bento className="md:col-span-2" icon={Hammer} title="Milestone projects" text="Every stage ends with a build to prove it. Track projects from idea to shipped." />
            <Bento className="md:col-span-3" icon={Timer} title="Built-in study timer" text="One click to start timing a topic. Compare actual hours against estimates to learn your real pace." />
            <Bento className="md:col-span-3" icon={Trophy} title="Streaks, XP & achievements" text="Daily streaks, levels and badges that make showing up every day a little more fun.">
              <div className="mt-4 flex gap-2">
                {[Flame, Zap, Trophy, Sparkles].map((I, k) => <div key={k} className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-spark-300 to-spark-500 text-slate-900 shadow-sm"><I size={16} /></div>)}
              </div>
            </Bento>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-[#0f0d2b] px-6 py-16 text-center text-white sm:px-12">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" style={{ backgroundImage: 'linear-gradient(to right, rgb(255 255 255 / .06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / .06) 1px, transparent 1px)' }} />
          <div aria-hidden className="absolute -bottom-32 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/50 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-5xl">Your next skill is one topic away.</h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-300">Open a roadmap, mark your first topic as learning, and start the clock. Your progress stays in this browser.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-slate-900 transition hover:bg-slate-100">Start learning free <ArrowRight size={17} /></Link>
              {events.length === 0 && (
                <button onClick={() => useTracker.getState().seedDemo()} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10">
                  <Sparkles size={16} /> Load demo data
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ---------- Hero product preview (pure UI, no data) ---------- */
function HeroPreview() {
  const r = roadmapById.frontend
  const nodes = [
    { t: 'Internet & HTTP', s: 'done' }, { t: 'HTML semantics', s: 'done' }, { t: 'CSS Grid & Flexbox', s: 'done' },
    { t: 'JavaScript async', s: 'learning' }, { t: 'TypeScript', s: 'todo' }, { t: 'React', s: 'todo' },
  ] as const
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden>
      <div className="rise relative rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-lift backdrop-blur-xl dark:border-white/10 dark:bg-[#12122a]/80" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `color-mix(in oklab, ${r.accent} 16%, transparent)`, color: r.accent }}>{(() => { const I = metaFor('frontend').icon; return <I size={20} /> })()}</div>
            <div>
              <div className="font-display font-semibold">Frontend Developer</div>
              <div className="text-xs text-slate-500">Stage 4 of 11 · JavaScript</div>
            </div>
          </div>
          <Ring value={38} size={48} stroke={5} color={r.accent}><span className="text-xs font-bold">38%</span></Ring>
        </div>
        <div className="relative mt-5 space-y-2 pb-6 pl-6">
          <div className="absolute bottom-3 left-[9px] top-3 w-0.5 rounded bg-gradient-to-b from-emerald-400 via-amber-400 to-slate-200 dark:to-white/10" />
          {nodes.map((n) => (
            <div key={n.t} className={`relative flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${
              n.s === 'done' ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200'
                : n.s === 'learning' ? 'border-amber-300 bg-amber-50 font-medium text-amber-900 ring-4 ring-amber-400/15 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200'
                  : 'border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/[.03]'}`}>
              <span className={`absolute -left-[22px] grid h-4 w-4 place-items-center rounded-full ring-4 ring-white dark:ring-[#12122a] ${n.s === 'done' ? 'bg-emerald-500' : n.s === 'learning' ? 'bg-amber-400' : 'bg-slate-300 dark:bg-white/20'}`}>
                {n.s === 'done' && <Check size={10} strokeWidth={4} className="text-white" />}
              </span>
              {n.t}
              <span className="text-[11px] opacity-70">{n.s === 'done' ? 'Done' : n.s === 'learning' ? 'Learning · 42m today' : '~6h'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="float absolute -bottom-16 -left-4 hidden w-52 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lift sm:block lg:-left-12 dark:border-white/10 dark:bg-[#17172f]">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Flame size={14} className="text-orange-500" /> Current streak</div>
        <div className="mt-1 font-display text-3xl font-bold">12 days</div>
        <div className="mt-3 flex gap-1">{Array.from({ length: 14 }, (_, i) => <span key={i} className="h-5 flex-1 rounded-[4px]" style={{ background: `var(--heat-${i < 2 ? 0 : [2, 3, 4, 3, 1, 4, 2, 3, 4, 2, 4, 3][i - 2]})` }} />)}</div>
      </div>

      <div className="float absolute -right-3 -top-12 hidden rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-lift sm:block lg:-right-4 dark:border-white/10 dark:bg-[#17172f]" style={{ animationDelay: '-3s' }}>
        <div className="text-xs font-medium text-slate-500">Projected finish</div>
        <div className="font-display text-lg font-bold">Mar 14 <span className="text-sm font-medium text-emerald-500">· on track</span></div>
      </div>
    </div>
  )
}

function MiniHeatmap() {
  // Deterministic decorative pattern
  const cells = Array.from({ length: 7 * 26 }, (_, i) => {
    const v = (Math.sin(i * 12.9898) * 43758.5453) % 1
    const x = Math.abs(v) * (0.4 + (i / (7 * 26)) * 0.9)
    return x < 0.25 ? 0 : x < 0.45 ? 1 : x < 0.65 ? 2 : x < 0.85 ? 3 : 4
  })
  return (
    <div className="mt-5 grid grid-flow-col grid-rows-7 gap-[3px] overflow-hidden" aria-hidden>
      {cells.map((c, i) => <span key={i} className="aspect-square w-full min-w-[8px] rounded-[3px]" style={{ background: `var(--heat-${c})` }} />)}
    </div>
  )
}

function Bento({ className = '', icon: Icon, title, text, children }: { className?: string; icon: typeof BarChart3; title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition hover:shadow-lift dark:border-white/[.07] dark:bg-white/[.03] ${className}`}>
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:scale-110 dark:bg-brand-500/15 dark:text-brand-300"><Icon size={20} /></div>
      <div className="mt-4 font-display text-lg font-semibold">{title}</div>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{text}</p>
      {children}
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
      <Card className="lg:col-span-2 !p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.14em] text-brand-600 dark:text-brand-300">Welcome back</div>
            <div className="font-display text-xl font-bold">Continue learning</div>
          </div>
          <Link to="/dashboard" className="text-sm font-medium text-slate-500 hover:text-brand-600">Full analytics →</Link>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {started.map((r) => {
            const st = roadmapStats(r, progress)
            const { icon: Icon } = metaFor(r.id)
            return (
              <Link key={r.id} to={`/roadmaps/${r.id}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-slate-200 hover:bg-slate-50 dark:border-white/[.05] dark:hover:bg-white/[.04]">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, ${r.accent} 15%, transparent)`, color: r.accent }}><Icon size={17} /></div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex justify-between text-sm"><span className="truncate font-medium">{r.title}</span><span className="tabular-nums text-slate-500">{st.pct}%</span></div>
                  <ProgressBar value={st.pct} color={r.accent} className="!h-1.5" />
                </div>
              </Link>
            )
          })}
        </div>
        {next.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/[.06]">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Up next</div>
            <div className="flex flex-wrap gap-2">
              {next.map((k) => {
                const f = findTopic(k)!
                return <Link key={k} to={`/roadmaps/${f.roadmap.id}?topic=${f.topic.id}`} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:hover:text-brand-300">{f.topic.title}</Link>
              })}
            </div>
          </div>
        )}
      </Card>
      <Card className="relative overflow-hidden !p-6">
        <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/20 blur-2xl" />
        <div className="font-display text-xl font-bold">Your stats</div>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <MiniStat value={<><Flame className="text-orange-500" size={22} />{s.current}</>} label="day streak" />
          <MiniStat value={t.done} label="topics done" />
          <MiniStat value={fmtMinutes(t.minutes)} label="time studied" />
          <MiniStat value={`Lv ${level.level}`} label={`${level.points} XP`} />
        </div>
        <ProgressBar value={(level.into / level.span) * 100} color="#6c5cff" className="mt-6" />
        <div className="mt-1.5 text-xs text-slate-500">{level.span - level.into} XP to level {level.level + 1}</div>
      </Card>
    </section>
  )
}

function MiniStat({ value, label }: { value: React.ReactNode; label: string }) {
  return <div><div className="flex items-center gap-1 font-display text-2xl font-bold tabular-nums">{value}</div><div className="text-xs text-slate-500">{label}</div></div>
}

function SectionTitle({ eyebrow, title, subtitle, center, noMargin }: { eyebrow?: string; title: string; subtitle: string; center?: boolean; noMargin?: boolean }) {
  return (
    <div className={`${noMargin ? '' : 'mb-10'} ${center ? 'mx-auto max-w-2xl text-center' : ''}`}>
      {eyebrow && <div className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-brand-600 dark:text-brand-300">{eyebrow}</div>}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  )
}
