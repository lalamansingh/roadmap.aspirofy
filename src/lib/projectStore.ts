import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { roadmaps } from '../data'
import { extraProjects } from '../data/extraProjects'
import type { Level } from '../data/types'

export type ProjectStatus = 'idea' | 'building' | 'shipped'

export interface ProjectEntry {
  status: ProjectStatus
  repoUrl: string
  demoUrl: string
  notes: string
  startedAt?: number
  shippedAt?: number
}

export interface ProjectItem {
  id: string
  roadmapId: string
  title: string
  description: string
  level: Level
  hours?: number
  skills: string[]
  source: 'milestone' | 'extra'
}

// Milestone projects from every roadmap section, followed by the extra ideas.
export const allProjects: ProjectItem[] = [
  ...roadmaps.flatMap((r) =>
    r.sections.flatMap((s) =>
      s.project
        ? [{ id: `${r.id}/${s.id}`, roadmapId: r.id, title: s.project.title, description: s.project.description, level: s.level, skills: [s.title], source: 'milestone' as const }]
        : [],
    ),
  ),
  ...extraProjects.map((p) => ({ ...p, source: 'extra' as const })),
]

export const projectById = Object.fromEntries(allProjects.map((p) => [p.id, p])) as Record<string, ProjectItem>

const empty: ProjectEntry = { status: 'idea', repoUrl: '', demoUrl: '', notes: '' }

export const getEntry = (projects: Record<string, ProjectEntry>, id: string): ProjectEntry => projects[id] ?? empty

export interface ProjectState {
  projects: Record<string, ProjectEntry>

  setStatus: (id: string, status: ProjectStatus) => void
  setRepoUrl: (id: string, url: string) => void
  setDemoUrl: (id: string, url: string) => void
  setNotes: (id: string, notes: string) => void
  updateProject: (id: string, patch: Partial<Omit<ProjectEntry, 'status'>>) => void
  resetProject: (id: string) => void
  resetAll: () => void
}

export const useProjects = create<ProjectState>()(
  persist(
    (set) => {
      const patch = (id: string, p: Partial<ProjectEntry>) =>
        set((s) => ({ projects: { ...s.projects, [id]: { ...getEntry(s.projects, id), ...p } } }))

      return {
        projects: {},

        setStatus: (id, status) =>
          set((s) => {
            const cur = getEntry(s.projects, id)
            if (cur.status === status) return s
            const now = Date.now()
            const next: ProjectEntry = { ...cur, status }
            if (status === 'idea') { delete next.startedAt; delete next.shippedAt }
            if (status === 'building') { next.startedAt = cur.startedAt ?? now; delete next.shippedAt }
            if (status === 'shipped') { next.startedAt = cur.startedAt ?? now; next.shippedAt = now }
            return { projects: { ...s.projects, [id]: next } }
          }),

        setRepoUrl: (id, repoUrl) => patch(id, { repoUrl }),
        setDemoUrl: (id, demoUrl) => patch(id, { demoUrl }),
        setNotes: (id, notes) => patch(id, { notes }),
        updateProject: (id, p) => patch(id, p),

        resetProject: (id) =>
          set((s) => {
            const projects = { ...s.projects }
            delete projects[id]
            return { projects }
          }),

        resetAll: () => set({ projects: {} }),
      }
    },
    { name: 'aspirofy-projects', version: 1 },
  ),
)
