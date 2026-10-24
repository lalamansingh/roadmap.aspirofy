import { allTopics, findTopic, roadmaps, topicKey } from '../data'
import type { Level, Roadmap, Status } from '../data/types'
import { startOfDay, type ActivityEvent, type ReviewCard } from './store'

const DAY = 86_400_000

export interface RoadmapStats {
  total: number
  done: number
  inProgress: number
  skipped: number
  pct: number
  hoursTotal: number
  hoursDone: number
  sections: { id: string; title: string; total: number; done: number; pct: number }[]
}

export function roadmapStats(r: Roadmap, progress: Record<string, Status>): RoadmapStats {
  let done = 0, inProgress = 0, skipped = 0, hoursTotal = 0, hoursDone = 0, total = 0
  const sections = r.sections.map((s) => {
    let sd = 0
    let st = 0
    for (const t of s.topics) {
      const status = progress[topicKey(r.id, t.id)]
      if (status === 'skipped') { skipped++; continue }
      st++
      hoursTotal += t.hours
      if (status === 'done') { sd++; hoursDone += t.hours }
      if (status === 'in-progress') inProgress++
    }
    done += sd
    total += st
    return { id: s.id, title: s.title, total: st, done: sd, pct: st ? Math.round((sd / st) * 100) : 100 }
  })
  return { total, done, inProgress, skipped, pct: total ? Math.round((done / total) * 100) : 0, hoursTotal, hoursDone, sections }
}

export const isStarted = (r: Roadmap, progress: Record<string, Status>) =>
  allTopics(r).some((t) => progress[topicKey(r.id, t.id)])

export const dayKey = (ts: number) => {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export interface DayActivity {
  date: string
  ts: number
  completed: number
  minutes: number
  actions: number
}

export function dailyActivity(events: ActivityEvent[], days: number): DayActivity[] {
  const today = startOfDay(Date.now())
  const map = new Map<string, DayActivity>()
  for (let i = days - 1; i >= 0; i--) {
    const ts = today - i * DAY
    map.set(dayKey(ts), { date: dayKey(ts), ts, completed: 0, minutes: 0, actions: 0 })
  }
  for (const e of events) {
    const d = map.get(dayKey(e.ts))
    if (!d) continue
    d.actions++
    if (e.type === 'status' && e.to === 'done') d.completed++
    if (e.type === 'time') d.minutes += e.minutes ?? 0
  }
  return [...map.values()]
}

export function streaks(events: ActivityEvent[]) {
  const days = new Set(events.map((e) => dayKey(e.ts)))
  let current = 0
  let cursor = startOfDay(Date.now())
  if (!days.has(dayKey(cursor))) cursor -= DAY // today not yet active doesn't break the streak
  while (days.has(dayKey(cursor))) { current++; cursor -= DAY }
  const sorted = [...days].sort()
  let longest = 0, run = 0, prev = 0
  for (const d of sorted) {
    const ts = new Date(d + 'T00:00:00').getTime()
    run = prev && Math.round((ts - prev) / DAY) === 1 ? run + 1 : 1
    longest = Math.max(longest, run)
    prev = ts
  }
  return { current, longest, activeDays: days.size }
}

export function totals(events: ActivityEvent[], progress: Record<string, Status>) {
  const minutes = events.reduce((a, e) => a + (e.type === 'time' ? e.minutes ?? 0 : 0), 0)
  const values = Object.values(progress)
  return {
    minutes,
    done: values.filter((v) => v === 'done').length,
    inProgress: values.filter((v) => v === 'in-progress').length,
    reviews: events.filter((e) => e.type === 'review').length,
  }
}

export function weeklySeries(events: ActivityEvent[], weeks: number) {
  const now = startOfDay(Date.now())
  const monday = now - ((new Date(now).getDay() + 6) % 7) * DAY
  return Array.from({ length: weeks }, (_, i) => {
    const start = monday - (weeks - 1 - i) * 7 * DAY
    const end = start + 7 * DAY
    let minutes = 0, completed = 0
    for (const e of events) {
      if (e.ts < start || e.ts >= end) continue
      if (e.type === 'time') minutes += e.minutes ?? 0
      if (e.type === 'status' && e.to === 'done') completed++
    }
    const d = new Date(start)
    return { week: `${d.toLocaleString('en', { month: 'short' })} ${d.getDate()}`, start, hours: +(minutes / 60).toFixed(1), completed }
  })
}

// Topics/week over the recent window → projected finish date for the remaining topics.
export function forecast(r: Roadmap, events: ActivityEvent[], progress: Record<string, Status>, windowDays = 28) {
  const stats = roadmapStats(r, progress)
  const remaining = stats.total - stats.done
  const since = Date.now() - windowDays * DAY
  const prefix = `${r.id}/`
  const recent = events.filter((e) => e.ts >= since && e.type === 'status' && e.to === 'done' && e.key.startsWith(prefix)).length
  const perWeek = (recent / windowDays) * 7
  const weeksLeft = perWeek > 0 ? remaining / perWeek : Infinity
  return { remaining, perWeek: +perWeek.toFixed(1), eta: Number.isFinite(weeksLeft) ? Date.now() + weeksLeft * 7 * DAY : null, hoursLeft: stats.hoursTotal - stats.hoursDone }
}

export function hourOfDay(events: ActivityEvent[]) {
  const buckets = Array.from({ length: 24 }, (_, h) => ({ hour: h, label: `${h}:00`, minutes: 0 }))
  for (const e of events) if (e.type === 'time') buckets[new Date(e.ts).getHours()].minutes += e.minutes ?? 0
  return buckets
}

export function weekdayDistribution(events: ActivityEvent[]) {
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const b = names.map((day) => ({ day, minutes: 0, completed: 0 }))
  for (const e of events) {
    const i = (new Date(e.ts).getDay() + 6) % 7
    if (e.type === 'time') b[i].minutes += e.minutes ?? 0
    if (e.type === 'status' && e.to === 'done') b[i].completed++
  }
  return b
}

export function levelBreakdown(progress: Record<string, Status>) {
  const levels: Record<Level, { level: Level; done: number; total: number }> = {
    beginner: { level: 'beginner', done: 0, total: 0 },
    intermediate: { level: 'intermediate', done: 0, total: 0 },
    advanced: { level: 'advanced', done: 0, total: 0 },
  }
  for (const r of roadmaps) {
    if (!isStarted(r, progress)) continue
    for (const s of r.sections) for (const t of s.topics) {
      levels[t.level].total++
      if (progress[topicKey(r.id, t.id)] === 'done') levels[t.level].done++
    }
  }
  return Object.values(levels)
}

// Logged time vs estimated hours on completed topics: >1 means slower than estimates.
export function estimateAccuracy(events: ActivityEvent[], progress: Record<string, Status>) {
  const spent = new Map<string, number>()
  for (const e of events) if (e.type === 'time') spent.set(e.key, (spent.get(e.key) ?? 0) + (e.minutes ?? 0))
  let est = 0, actual = 0
  for (const [key, min] of spent) {
    if (progress[key] !== 'done') continue
    const f = findTopic(key)
    if (!f) continue
    est += f.topic.hours * 60
    actual += min
  }
  return est ? +(actual / est).toFixed(2) : null
}

export function timePerTopic(events: ActivityEvent[]) {
  const m = new Map<string, number>()
  for (const e of events) if (e.type === 'time') m.set(e.key, (m.get(e.key) ?? 0) + (e.minutes ?? 0))
  return m
}

export function dueReviews(reviews: Record<string, ReviewCard>) {
  const now = Date.now()
  return Object.entries(reviews).filter(([, c]) => c.due <= now).sort((a, b) => a[1].due - b[1].due).map(([k]) => k)
}

export function weakTopics(confidence: Record<string, number>, progress: Record<string, Status>) {
  return Object.entries(confidence)
    .filter(([k, v]) => v <= 2 && progress[k] === 'done')
    .sort((a, b) => a[1] - b[1])
    .map(([k]) => k)
}

// "What to learn next": first unfinished core topic in each started roadmap.
export function nextUp(progress: Record<string, Status>, limit = 5) {
  const out: string[] = []
  for (const r of roadmaps) {
    if (!isStarted(r, progress)) continue
    const inProg = allTopics(r).find((t) => progress[topicKey(r.id, t.id)] === 'in-progress')
    const next = inProg ?? allTopics(r).find((t) => t.kind === 'core' && !progress[topicKey(r.id, t.id)])
    if (next) out.push(topicKey(r.id, next.id))
  }
  return out.slice(0, limit)
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number // 0..1
}

export function achievements(events: ActivityEvent[], progress: Record<string, Status>, notesCount: number): Achievement[] {
  const t = totals(events, progress)
  const s = streaks(events)
  const completedRoadmaps = roadmaps.filter((r) => { const st = roadmapStats(r, progress); return st.total > 0 && st.done === st.total }).length
  const startedRoadmaps = roadmaps.filter((r) => isStarted(r, progress)).length
  const a = (id: string, title: string, description: string, icon: string, value: number, goal: number): Achievement =>
    ({ id, title, description, icon, unlocked: value >= goal, progress: Math.min(1, value / goal) })
  return [
    a('first-step', 'First Step', 'Complete your first topic', '🌱', t.done, 1),
    a('ten', 'Getting Serious', 'Complete 10 topics', '📘', t.done, 10),
    a('fifty', 'Knowledge Builder', 'Complete 50 topics', '🏗️', t.done, 50),
    a('hundred', 'Centurion', 'Complete 100 topics', '💯', t.done, 100),
    a('streak-7', 'On Fire', 'Reach a 7-day streak', '🔥', s.longest, 7),
    a('streak-30', 'Unstoppable', 'Reach a 30-day streak', '⚡', s.longest, 30),
    a('hours-10', 'Deep Work', 'Log 10 hours of study', '⏱️', t.minutes / 60, 10),
    a('hours-100', 'Hundred Hours', 'Log 100 hours of study', '🧠', t.minutes / 60, 100),
    a('reviewer', 'Never Forget', 'Complete 25 spaced reviews', '🔁', t.reviews, 25),
    a('notes', 'Note Taker', 'Write notes on 10 topics', '📝', notesCount, 10),
    a('explorer', 'Explorer', 'Start 3 different roadmaps', '🧭', startedRoadmaps, 3),
    a('finisher', 'Finisher', 'Complete an entire roadmap', '🏆', completedRoadmaps, 1),
  ]
}

export function xp(events: ActivityEvent[], progress: Record<string, Status>) {
  const t = totals(events, progress)
  const points = t.done * 50 + Math.floor(t.minutes / 10) * 5 + t.reviews * 10
  const level = Math.floor(Math.sqrt(points / 100)) + 1
  const curr = (level - 1) ** 2 * 100
  const next = level ** 2 * 100
  return { points, level, into: points - curr, span: next - curr }
}
