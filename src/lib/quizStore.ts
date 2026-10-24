import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface QuizAttempt {
  roadmapId: string
  sectionId: string
  score: number
  total: number
  ts: number
}

export interface QuizState {
  attempts: QuizAttempt[]
  addAttempt: (a: Omit<QuizAttempt, 'ts'> & { ts?: number }) => void
  resetQuizzes: () => void
}

export const useQuizzes = create<QuizState>()(
  persist(
    (set) => ({
      attempts: [],
      addAttempt: (a) => set((s) => ({ attempts: [...s.attempts, { ...a, ts: a.ts ?? Date.now() }] })),
      resetQuizzes: () => set({ attempts: [] }),
    }),
    { name: 'aspirofy-quizzes', version: 1 },
  ),
)

export const pct = (a: Pick<QuizAttempt, 'score' | 'total'>) => (a.total ? Math.round((a.score / a.total) * 100) : 0)

export const attemptsFor = (attempts: QuizAttempt[], roadmapId: string, sectionId?: string) =>
  attempts.filter((a) => a.roadmapId === roadmapId && (sectionId === undefined || a.sectionId === sectionId))

/** Best score as a percentage (0–100), or undefined if never attempted. */
export function bestScore(roadmapId: string, sectionId: string, attempts = useQuizzes.getState().attempts): number | undefined {
  const list = attemptsFor(attempts, roadmapId, sectionId)
  return list.length ? Math.max(...list.map(pct)) : undefined
}

/** Best percentage per "roadmapId/sectionId" key across all attempts. */
export function bestBySection(attempts: QuizAttempt[]): Record<string, number> {
  const best: Record<string, number> = {}
  for (const a of attempts) {
    const key = `${a.roadmapId}/${a.sectionId}`
    best[key] = Math.max(best[key] ?? 0, pct(a))
  }
  return best
}
