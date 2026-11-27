import { Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { roadmapById } from '../data'
import { allProjects, getEntry, useProjects, type ProjectStatus } from '../lib/projectStore'
import { Card } from './ui'

const meta: Record<ProjectStatus, { label: string; dot: string }> = {
  idea: { label: 'Ideas', dot: 'bg-slate-400' },
  building: { label: 'Building', dot: 'bg-amber-500' },
  shipped: { label: 'Shipped', dot: 'bg-emerald-500' },
}

export default function ProjectStats() {
  const projects = useProjects((s) => s.projects)
  const counts: Record<ProjectStatus, number> = { idea: 0, building: 0, shipped: 0 }
  for (const p of allProjects) counts[getEntry(projects, p.id).status]++
  const recent = allProjects
    .map((p) => ({ p, e: getEntry(projects, p.id) }))
    .filter((x) => x.e.status === 'shipped')
    .sort((a, b) => (b.e.shippedAt ?? 0) - (a.e.shippedAt ?? 0))
    .slice(0, 3)

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold"><Rocket size={16} /> Projects</h3>
        <Link to="/projects" className="text-xs font-medium text-slate-500 hover:underline">View all</Link>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {(Object.keys(meta) as ProjectStatus[]).map((s) => (
          <div key={s} className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[.04]">
            <div className="text-xl font-bold tabular-nums">{counts[s]}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
              <span className={`h-1.5 w-1.5 rounded-full ${meta[s].dot}`} /> {meta[s].label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">Recently shipped</div>
      {recent.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Nothing shipped yet. Pick a project and start building.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {recent.map(({ p, e }) => (
            <li key={p.id} className="flex items-center justify-between gap-2 text-sm">
              <div className="min-w-0">
                <div className="truncate font-medium">{p.title}</div>
                <div className="text-xs text-slate-500">{roadmapById[p.roadmapId]?.title}</div>
              </div>
              {e.shippedAt && <span className="shrink-0 text-xs text-slate-500">{new Date(e.shippedAt).toLocaleDateString()}</span>}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
