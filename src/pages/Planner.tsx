import { CalendarCheck, CalendarDays, CalendarRange, Clock, Download, Flag, Hammer, Printer, Target } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Card, EmptyState, levelMeta, Stat, statusMeta, PageHeader } from '../components/ui'
import { roadmapById, roadmaps, topicKey } from '../data'
import type { Roadmap, Section, Status, Topic } from '../data/types'
import { isStarted } from '../lib/analytics'
import { useTracker } from '../lib/store'

const DAY = 86_400_000
const PROJECT_HOURS = 6

type PlanItem =
  | { kind: 'topic'; id: string; title: string; hours: number; topic: Topic; section: Section; status: Status }
  | { kind: 'project'; id: string; title: string; hours: number; section: Section }

interface PlanEntry {
  item: PlanItem
  hours: number
  continued: boolean // started in an earlier week
  continues: boolean // carries over into the next week
}

interface PlanWeek {
  index: number
  start: Date
  end: Date // inclusive last day
  entries: PlanEntry[]
  hours: number
}

const pad = (n: number) => String(n).padStart(2, '0')
const toInputDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const toIcsDate = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
const parseLocalDate = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return y && m && d ? new Date(y, m - 1, d) : null
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const fmt = (d: Date, year = false) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', ...(year ? { year: 'numeric' } : {}) })
const fmtHours = (h: number) => `${+h.toFixed(1)}h`

function buildItems(roadmap: Roadmap, progress: Record<string, Status>, includeOptional: boolean, includeAlternative: boolean): PlanItem[] {
  const remaining: Extract<PlanItem, { kind: 'topic' }>[] = []
  for (const section of roadmap.sections) {
    for (const topic of section.topics) {
      const status = progress[topicKey(roadmap.id, topic.id)] ?? 'pending'
      if (status === 'done' || status === 'skipped') continue
      if (topic.kind === 'optional' && !includeOptional) continue
      if (topic.kind === 'alternative' && !includeAlternative) continue
      remaining.push({ kind: 'topic', id: topic.id, title: topic.title, hours: topic.hours, topic, section, status })
    }
  }
  // In-progress topics first, then the rest in roadmap order (stable).
  const ordered = [...remaining.filter((t) => t.status === 'in-progress'), ...remaining.filter((t) => t.status !== 'in-progress')]
  const leftPerSection = new Map<string, number>()
  for (const t of ordered) leftPerSection.set(t.section.id, (leftPerSection.get(t.section.id) ?? 0) + 1)

  const items: PlanItem[] = []
  for (const t of ordered) {
    items.push(t)
    const left = leftPerSection.get(t.section.id)! - 1
    leftPerSection.set(t.section.id, left)
    if (left === 0 && t.section.project) {
      items.push({ kind: 'project', id: `project-${t.section.id}`, title: t.section.project.title, hours: PROJECT_HOURS, section: t.section })
    }
  }
  return items
}

function packWeeks(items: PlanItem[], hoursPerWeek: number, start: Date): PlanWeek[] {
  const weeks: PlanWeek[] = []
  const newWeek = (): PlanWeek => {
    const s = addDays(start, weeks.length * 7)
    const w = { index: weeks.length, start: s, end: addDays(s, 6), entries: [], hours: 0 }
    weeks.push(w)
    return w
  }
  if (!items.length) return weeks
  let week = newWeek()
  for (const item of items) {
    let left = item.hours
    let continued = false
    while (left > 1e-9) {
      let capacity = hoursPerWeek - week.hours
      if (capacity <= 1e-9) { week = newWeek(); capacity = hoursPerWeek }
      const take = Math.min(left, capacity)
      left -= take
      week.entries.push({ item, hours: take, continued, continues: left > 1e-9 })
      week.hours += take
      continued = true
    }
  }
  return weeks
}

const escapeIcs = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

// RFC 5545 line folding: lines longer than 75 octets continue with CRLF + space.
function foldLine(line: string): string {
  const enc = new TextEncoder()
  if (enc.encode(line).length <= 75) return line
  const parts: string[] = []
  let current = ''
  let bytes = 0
  for (const ch of line) {
    const len = enc.encode(ch).length
    const limit = parts.length === 0 ? 75 : 74
    if (bytes + len > limit) { parts.push(current); current = ''; bytes = 0 }
    current += ch
    bytes += len
  }
  parts.push(current)
  return parts.join('\r\n ')
}

function buildIcs(roadmap: Roadmap, weeks: PlanWeek[]): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Aspirofy//Study Planner//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', `X-WR-CALNAME:${escapeIcs(`${roadmap.title} study plan`)}`]
  for (const w of weeks) {
    const desc = w.entries
      .map((e) => `• ${e.item.kind === 'project' ? 'Project: ' : ''}${e.item.title}${e.continued ? ' (continued)' : ''} — ${fmtHours(e.hours)}`)
      .join('\n')
    lines.push(
      'BEGIN:VEVENT',
      `UID:${roadmap.id}-week-${w.index + 1}-${toIcsDate(w.start)}@aspirofy`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toIcsDate(w.start)}`,
      `DTEND;VALUE=DATE:${toIcsDate(addDays(w.end, 1))}`,
      `SUMMARY:${escapeIcs(`${roadmap.title} — Week ${w.index + 1} (${fmtHours(w.hours)})`)}`,
      `DESCRIPTION:${escapeIcs(desc)}`,
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  return lines.map(foldLine).join('\r\n') + '\r\n'
}

export default function Planner() {
  const { progress, weeklyGoalHours, targetDates } = useTracker()
  const defaultRoadmap = roadmaps.find((r) => isStarted(r, progress)) ?? roadmaps[0]

  const [roadmapId, setRoadmapId] = useState(defaultRoadmap.id)
  const [hoursInput, setHoursInput] = useState(String(weeklyGoalHours || 8))
  const [startInput, setStartInput] = useState(() => toInputDate(new Date()))
  const [includeOptional, setIncludeOptional] = useState(true)
  const [includeAlternative, setIncludeAlternative] = useState(false)

  const roadmap = roadmapById[roadmapId] ?? defaultRoadmap
  const hoursPerWeek = Math.max(1, Number(hoursInput) || 1)
  const start = useMemo(() => parseLocalDate(startInput) ?? parseLocalDate(toInputDate(new Date()))!, [startInput])

  const items = useMemo(() => buildItems(roadmap, progress, includeOptional, includeAlternative), [roadmap, progress, includeOptional, includeAlternative])
  const weeks = useMemo(() => packWeeks(items, hoursPerWeek, start), [items, hoursPerWeek, start])

  const totalHours = items.reduce((s, i) => s + i.hours, 0)
  const topicHours = items.reduce((s, i) => s + (i.kind === 'topic' ? i.hours : 0), 0)
  const projectCount = items.filter((i) => i.kind === 'project').length
  const lastWeek = weeks[weeks.length - 1]
  const finish = lastWeek ? addDays(lastWeek.start, Math.max(0, Math.ceil((lastWeek.hours / hoursPerWeek) * 7) - 1)) : null

  const today = parseLocalDate(toInputDate(new Date()))!
  const currentWeekIndex = weeks.findIndex((w) => today >= w.start && today <= w.end)

  const target = targetDates[roadmap.id] ? parseLocalDate(targetDates[roadmap.id]) : null
  const daysToTarget = target ? Math.round((target.getTime() - start.getTime()) / DAY) + 1 : null
  const neededPerWeek = daysToTarget && daysToTarget > 0 ? +(totalHours / (daysToTarget / 7)).toFixed(1) : null
  const onTrack = target && finish ? finish <= target : null

  const exportIcs = () => {
    const blob = new Blob([buildIcs(roadmap, weeks)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${roadmap.id}-study-plan.ics`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-white/10 dark:bg-white/[.03]'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader icon={<CalendarRange size={22} />} eyebrow="Planner" title="Study planner" subtitle={<>A week-by-week schedule for the rest of <b className="text-slate-700 dark:text-slate-200">{roadmap.title}</b>, built from your progress.</>} />
        <div className="flex gap-2 print:hidden">
          <button onClick={exportIcs} disabled={!weeks.length} className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            <Download size={15} /> Export to calendar (.ics)
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5">
            <Printer size={15} /> Print
          </button>
        </div>
      </div>

      <Card className="mt-6 print:hidden">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-500">Roadmap</span>
            <select value={roadmap.id} onChange={(e) => setRoadmapId(e.target.value)} className={inputCls}>
              {roadmaps.map((r) => <option key={r.id} value={r.id}>{r.title}{isStarted(r, progress) ? ' (started)' : ''}</option>)}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-500">Hours per week</span>
            <input type="number" min={1} max={80} step={0.5} value={hoursInput} onChange={(e) => setHoursInput(e.target.value)} className={inputCls} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-500">Start date</span>
            <input type="date" value={startInput} onChange={(e) => setStartInput(e.target.value)} className={inputCls} />
          </label>
          <div className="text-sm">
            <span className="mb-1 block text-slate-500">Include</span>
            <label className="flex items-center gap-2 py-0.5"><input type="checkbox" checked={includeOptional} onChange={(e) => setIncludeOptional(e.target.checked)} /> Optional topics</label>
            <label className="flex items-center gap-2 py-0.5"><input type="checkbox" checked={includeAlternative} onChange={(e) => setIncludeAlternative(e.target.checked)} /> Alternative topics</label>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Remaining" value={fmtHours(totalHours)} hint={`${fmtHours(topicHours)} topics · ${projectCount} project${projectCount === 1 ? '' : 's'}`} icon={<Clock size={15} />} />
        <Stat label="Weeks needed" value={weeks.length} hint={`at ${fmtHours(hoursPerWeek)}/week`} icon={<CalendarDays size={15} />} />
        <Stat label="Finish date" value={finish ? fmt(finish) : '—'} hint={finish ? finish.getFullYear() : 'Nothing left to schedule'} icon={<CalendarCheck size={15} />} />
        <Stat
          label="Target"
          value={target ? fmt(target) : 'Not set'}
          icon={<Target size={15} />}
          hint={
            !target ? <Link to={`/roadmaps/${roadmap.id}`} className="hover:underline print:no-underline">Set one on the roadmap page</Link>
            : !finish ? 'All done'
            : onTrack ? <span className="text-emerald-600 dark:text-emerald-400">On track</span>
            : <span className="text-rose-600 dark:text-rose-400">{neededPerWeek !== null ? `Behind — need ${neededPerWeek}h/week` : 'Target date has passed'}</span>
          }
        />
      </div>

      {target && finish && (
        <div className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${onTrack ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'}`}>
          {onTrack
            ? `On track: you'll finish ${Math.round((target.getTime() - finish.getTime()) / DAY)} day(s) before your target of ${fmt(target, true)}.`
            : neededPerWeek !== null
              ? `Behind: at ${fmtHours(hoursPerWeek)}/week you'll finish ${fmt(finish, true)}, after your target of ${fmt(target, true)}. You need about ${neededPerWeek}h/week to make it.`
              : `Your target date (${fmt(target, true)}) is before the start date. Pick a new target on the roadmap page.`}
        </div>
      )}

      <div className="mt-8">
        {!weeks.length ? (
          <EmptyState title="Nothing left to schedule">
            Every topic in this roadmap is done or skipped{!includeOptional || !includeAlternative ? ' (with the current filters)' : ''}. <Link to={`/roadmaps/${roadmap.id}`} className="underline">Open the roadmap</Link>
          </EmptyState>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 print:grid-cols-2">
            {weeks.map((w) => {
              const current = w.index === currentWeekIndex
              return (
                <Card key={w.index} className={`break-inside-avoid ${current ? '!border-sky-500 ring-2 ring-sky-500/30' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
                        Week {w.index + 1}
                        {current && <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300">This week</Badge>}
                      </div>
                      <div className="text-xs text-slate-500">{fmt(w.start)} – {fmt(w.end, w.start.getFullYear() !== w.end.getFullYear())}</div>
                    </div>
                    <span className="text-sm font-medium tabular-nums text-slate-500">{fmtHours(w.hours)}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/5">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, (w.hours / hoursPerWeek) * 100)}%`, background: roadmap.accent }} />
                  </div>
                  <ul className="mt-3 space-y-2">
                    {w.entries.map((e, i) => (
                      <li key={`${e.item.id}-${i}`} className="flex items-start justify-between gap-2 text-sm">
                        {e.item.kind === 'topic' ? (
                          <div className="min-w-0">
                            <Link to={`/roadmaps/${roadmap.id}?topic=${e.item.id}`} className="font-medium hover:underline">{e.item.title}</Link>
                            <div className="mt-0.5 flex flex-wrap items-center gap-1 text-xs text-slate-500">
                              {e.item.status === 'in-progress' && <Badge className={statusMeta['in-progress'].className}>{statusMeta['in-progress'].label}</Badge>}
                              <Badge className={levelMeta[e.item.topic.level].className}>{levelMeta[e.item.topic.level].label}</Badge>
                              {e.item.topic.kind !== 'core' && <Badge className="bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">{e.item.topic.kind}</Badge>}
                              {e.continued && <span className="italic">continued</span>}
                              {e.continues && <span className="italic">continues →</span>}
                              <span className="truncate">{e.item.section.title}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 font-medium text-amber-700 dark:text-amber-300"><Hammer size={14} className="shrink-0" /> {e.item.title}</div>
                            <div className="mt-0.5 flex flex-wrap items-center gap-1 text-xs text-slate-500">
                              <Flag size={11} /> Milestone project · {e.item.section.title}
                              {e.continued && <span className="italic">· continued</span>}
                              {e.continues && <span className="italic">· continues →</span>}
                            </div>
                          </div>
                        )}
                        <span className="shrink-0 tabular-nums text-xs text-slate-500">{fmtHours(e.hours)}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
