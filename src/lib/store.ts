import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { allTopics, findTopic, roadmaps, topicKey } from '../data'
import type { Status } from '../data/types'

export type EventType = 'status' | 'time' | 'review' | 'note'

export interface ActivityEvent {
  ts: number
  type: EventType
  key: string
  from?: Status
  to?: Status
  minutes?: number
  grade?: number
}

export interface ReviewCard {
  due: number
  interval: number // days
  ease: number
  reps: number
}

interface Timer {
  key: string
  startedAt: number
}

export interface TrackerState {
  progress: Record<string, Status>
  notes: Record<string, string>
  confidence: Record<string, number>
  reviews: Record<string, ReviewCard>
  events: ActivityEvent[]
  bookmarks: string[]
  weeklyGoalHours: number
  targetDates: Record<string, string>
  name: string
  timer: Timer | null

  setStatus: (key: string, status: Status) => void
  logTime: (key: string, minutes: number) => void
  setNote: (key: string, note: string) => void
  setConfidence: (key: string, value: number) => void
  gradeReview: (key: string, grade: 0 | 1 | 2 | 3) => void
  toggleBookmark: (roadmapId: string) => void
  setWeeklyGoal: (hours: number) => void
  setTargetDate: (roadmapId: string, date: string) => void
  setName: (name: string) => void
  startTimer: (key: string) => void
  stopTimer: () => number
  resetRoadmap: (roadmapId: string) => void
  importData: (data: Partial<TrackerState>) => void
  resetAll: () => void
  seedDemo: () => void
}

const DAY = 86_400_000

const initial = {
  progress: {},
  notes: {},
  confidence: {},
  reviews: {},
  events: [],
  bookmarks: [],
  weeklyGoalHours: 8,
  targetDates: {},
  name: '',
  timer: null,
}

export const useTracker = create<TrackerState>()(
  persist(
    (set, get) => ({
      ...initial,

      setStatus: (key, status) =>
        set((s) => {
          const from = s.progress[key] ?? 'pending'
          if (from === status) return s
          const progress = { ...s.progress }
          if (status === 'pending') delete progress[key]
          else progress[key] = status
          const reviews = { ...s.reviews }
          if (status === 'done' && !reviews[key]) reviews[key] = { due: Date.now() + DAY, interval: 1, ease: 2.5, reps: 0 }
          if (status !== 'done') delete reviews[key]
          return { progress, reviews, events: [...s.events, { ts: Date.now(), type: 'status', key, from, to: status }] }
        }),

      logTime: (key, minutes) =>
        minutes > 0 && set((s) => ({ events: [...s.events, { ts: Date.now(), type: 'time', key, minutes }] })),

      setNote: (key, note) =>
        set((s) => {
          const hadNote = Boolean(s.notes[key])
          const notes = { ...s.notes, [key]: note }
          if (!note) delete notes[key]
          const events = !hadNote && note ? [...s.events, { ts: Date.now(), type: 'note' as const, key }] : s.events
          return { notes, events }
        }),

      setConfidence: (key, value) => set((s) => ({ confidence: { ...s.confidence, [key]: value } })),

      // Simplified SM-2: 0 = forgot, 1 = hard, 2 = good, 3 = easy
      gradeReview: (key, grade) =>
        set((s) => {
          const card = s.reviews[key] ?? { due: Date.now(), interval: 1, ease: 2.5, reps: 0 }
          const ease = Math.max(1.3, card.ease + (grade - 2) * 0.15)
          const interval = grade === 0 ? 1 : card.reps === 0 ? (grade === 3 ? 4 : 2) : Math.round(card.interval * ease * (grade === 1 ? 0.6 : 1))
          return {
            reviews: { ...s.reviews, [key]: { due: Date.now() + interval * DAY, interval, ease, reps: grade === 0 ? 0 : card.reps + 1 } },
            confidence: { ...s.confidence, [key]: Math.min(5, Math.max(1, (s.confidence[key] ?? 3) + (grade - 1.5 > 0 ? 1 : -1))) },
            events: [...s.events, { ts: Date.now(), type: 'review', key, grade }],
          }
        }),

      toggleBookmark: (id) =>
        set((s) => ({ bookmarks: s.bookmarks.includes(id) ? s.bookmarks.filter((b) => b !== id) : [...s.bookmarks, id] })),

      setWeeklyGoal: (weeklyGoalHours) => set({ weeklyGoalHours }),
      setTargetDate: (id, date) => set((s) => ({ targetDates: { ...s.targetDates, [id]: date } })),
      setName: (name) => set({ name }),

      startTimer: (key) => {
        if (get().timer) get().stopTimer()
        set({ timer: { key, startedAt: Date.now() } })
      },

      stopTimer: () => {
        const t = get().timer
        if (!t) return 0
        const minutes = Math.round((Date.now() - t.startedAt) / 60_000)
        set({ timer: null })
        get().logTime(t.key, minutes)
        return minutes
      },

      resetRoadmap: (id) =>
        set((s) => {
          const prefix = `${id}/`
          const strip = <T,>(o: Record<string, T>) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith(prefix)))
          return { progress: strip(s.progress), reviews: strip(s.reviews), confidence: strip(s.confidence) }
        }),

      importData: (data) => set({ ...initial, ...data, timer: null }),
      resetAll: () => set({ ...initial }),

      // Generates ~90 days of plausible history so the analytics can be explored.
      seedDemo: () => {
        const rand = mulberry32(42)
        const picks = ['frontend', 'react', 'backend', 'sql']
        const events: ActivityEvent[] = []
        const progress: Record<string, Status> = {}
        const reviews: Record<string, ReviewCard> = {}
        const confidence: Record<string, number> = {}
        const now = Date.now()
        const lists = picks.map((id, i) => {
          const topics = allTopics(roadmaps.find((x) => x.id === id)!)
          return topics.slice(0, Math.floor(topics.length * [0.7, 0.55, 0.35, 0.8][i])).map((t) => topicKey(id, t.id))
        })
        // Interleave roadmaps so every one has a recent pace.
        const queue: string[] = []
        for (let i = 0; queue.length < lists.flat().length; i++) for (const l of lists) if (l[i]) queue.push(l[i])
        // Pick active days (last week always active for a live streak), then spread topics evenly over them.
        const activeDays: number[] = []
        for (let d = 90; d >= 0; d--) if (d <= 6 || rand() < 0.75) activeDays.push(startOfDay(now - d * DAY))
        queue.forEach((key, qi) => {
          const day = activeDays[Math.floor((qi * activeDays.length) / queue.length)]
          const est = (findTopic(key)?.topic.hours ?? 2) * 60
          const hour = [7, 9, 13, 19, 20, 21, 22][Math.floor(rand() * 7)]
          const ts = Math.min(now - 300_000, day + hour * 3_600_000 + Math.floor(rand() * 3_000_000))
          events.push({ ts, type: 'status', key, from: 'pending', to: 'in-progress' })
          events.push({ ts: ts + 60_000, type: 'time', key, minutes: Math.round(Math.min(est * (0.7 + rand() * 0.6), 45 + rand() * 120)) })
          if (qi >= queue.length - 2) { progress[key] = 'in-progress'; return }
          events.push({ ts: ts + 120_000, type: 'status', key, from: 'in-progress', to: 'done' })
          progress[key] = 'done'
          confidence[key] = 1 + Math.floor(rand() * 5)
          reviews[key] = { due: now + Math.floor((rand() * 14 - 2) * DAY), interval: 3, ease: 2.5, reps: 1 }
        })
        events.sort((a, b) => a.ts - b.ts)
        set({ events, progress, reviews, confidence, bookmarks: picks, name: get().name || 'Learner' })
      },
    }),
    { name: 'aspirofy-tracker', version: 1 },
  ),
)

export const startOfDay = (ts: number) => {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
