import { Check, ChevronLeft, ChevronRight, Copy, ExternalLink, Code, Hammer, LayoutGrid, Columns3, Link2, Rocket, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Card, EmptyState, Stat, levelMeta } from '../components/ui'
import { roadmapById, roadmaps } from '../data'
import type { Level } from '../data/types'
import { allProjects, getEntry, useProjects, type ProjectItem, type ProjectStatus } from '../lib/projectStore'

const statuses: ProjectStatus[] = ['idea', 'building', 'shipped']

const projectStatusMeta: Record<ProjectStatus, { label: string; className: string; dot: string }> = {
  idea: { label: 'Idea', className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', dot: 'bg-slate-400' },
  building: { label: 'Building', className: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300', dot: 'bg-amber-500' },
  shipped: { label: 'Shipped', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300', dot: 'bg-emerald-500' },
}

const levels: ('all' | Level)[] = ['all', 'beginner', 'intermediate', 'advanced']
const selectCls = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900'
const btnCls = 'inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium'

export default function Projects() {
  const projects = useProjects((s) => s.projects)
  const setStatus = useProjects((s) => s.setStatus)
  const [q, setQ] = useState('')
  const [roadmap, setRoadmap] = useState('all')
  const [level, setLevel] = useState<(typeof levels)[number]>('all')
  const [status, setStatusFilter] = useState<'all' | ProjectStatus>('all')
  const [view, setView] = useState<'board' | 'grid'>('board')
  const [editing, setEditing] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const query = q.trim().toLowerCase()

  const list = allProjects.filter((p) => {
    if (roadmap !== 'all' && p.roadmapId !== roadmap) return false
    if (level !== 'all' && p.level !== level) return false
    if (status !== 'all' && getEntry(projects, p.id).status !== status) return false
    if (!query) return true
    return [p.title, p.description, roadmapById[p.roadmapId]?.title ?? '', ...p.skills].some((s) => s.toLowerCase().includes(query))
  })

  const entries = allProjects.map((p) => ({ p, e: getEntry(projects, p.id) }))
  const shipped = entries.filter((x) => x.e.status === 'shipped').sort((a, b) => (b.e.shippedAt ?? 0) - (a.e.shippedAt ?? 0))
  const building = entries.filter((x) => x.e.status === 'building').length
  const linkCount = entries.reduce((a, x) => a + (x.e.repoUrl ? 1 : 0) + (x.e.demoUrl ? 1 : 0), 0)

  const copyMarkdown = async () => {
    const md = [
      '# Portfolio',
      '',
      ...shipped.map(({ p, e }) => {
        const links = [e.repoUrl && `[Code](${e.repoUrl})`, e.demoUrl && `[Live demo](${e.demoUrl})`].filter(Boolean).join(' · ')
        return `- **${p.title}** (${roadmapById[p.roadmapId]?.title ?? p.roadmapId}, ${levelMeta[p.level].label})${links ? ` — ${links}` : ''}\n  ${p.description}`
      }),
    ].join('\n')
    try {
      await navigator.clipboard.writeText(md)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  const renderCard = (p: ProjectItem) => (
    <ProjectCard key={p.id} project={p} status={getEntry(projects, p.id).status} onMove={(s) => setStatus(p.id, s)} onOpen={() => setEditing(p.id)} />
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-1 text-slate-500">Milestone builds from every roadmap plus extra ideas. Track them from idea to shipped and grow your portfolio.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Shipped" value={shipped.length} icon={<Rocket size={14} />} />
        <Stat label="Building" value={building} icon={<Hammer size={14} />} />
        <Stat label="Portfolio links" value={linkCount} icon={<Link2 size={14} />} hint="Repo + demo URLs" />
        <Stat label="Ideas available" value={allProjects.length} hint={`${roadmaps.length} roadmaps`} />
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <Search size={16} className="text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, skills, roadmaps…" className="flex-1 bg-transparent outline-none" />
        </label>
        <div className="flex flex-wrap gap-2">
          <select value={roadmap} onChange={(e) => setRoadmap(e.target.value)} className={selectCls} aria-label="Roadmap">
            <option value="all">All roadmaps</option>
            {roadmaps.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
          </select>
          <select value={level} onChange={(e) => setLevel(e.target.value as (typeof levels)[number])} className={selectCls} aria-label="Level">
            {levels.map((l) => <option key={l} value={l}>{l === 'all' ? 'All levels' : levelMeta[l].label}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatusFilter(e.target.value as 'all' | ProjectStatus)} className={selectCls} aria-label="Status">
            <option value="all">All statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{projectStatusMeta[s].label}</option>)}
          </select>
          <div className="hidden overflow-hidden rounded-lg border border-slate-300 md:flex dark:border-slate-700">
            {(['board', 'grid'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} aria-label={`${v} view`} className={`flex items-center gap-1 px-3 py-2 text-sm font-medium capitalize ${view === v ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300'}`}>
                {v === 'board' ? <Columns3 size={14} /> : <LayoutGrid size={14} />} {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mt-6"><EmptyState title="No projects match">Try a different search or filter.</EmptyState></div>
      ) : (
        <>
          {view === 'board' && (
            <div className="mt-6 hidden gap-4 md:grid md:grid-cols-3">
              {statuses.map((s) => {
                const col = list.filter((p) => getEntry(projects, p.id).status === s)
                return (
                  <div key={s} className="rounded-xl bg-slate-100/70 p-3 dark:bg-slate-900/50">
                    <div className="mb-3 flex items-center gap-2 px-1 text-sm font-semibold">
                      <span className={`h-2 w-2 rounded-full ${projectStatusMeta[s].dot}`} />
                      {projectStatusMeta[s].label}
                      <span className="ml-auto text-xs font-normal text-slate-500">{col.length}</span>
                    </div>
                    <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
                      {col.map(renderCard)}
                      {col.length === 0 && <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500 dark:border-slate-700">Nothing here yet</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <div className={`mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${view === 'board' ? 'md:hidden' : ''}`}>
            {list.map(renderCard)}
          </div>
        </>
      )}

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Portfolio</h2>
            <p className="text-sm text-slate-500">Everything you have shipped, ready to share.</p>
          </div>
          <button onClick={copyMarkdown} disabled={shipped.length === 0} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-white dark:text-slate-900">
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy portfolio as Markdown'}
          </button>
        </div>
        {shipped.length === 0 ? (
          <div className="mt-4"><EmptyState title="No shipped projects yet">Move a project to Shipped and add its repo or demo link.</EmptyState></div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {shipped.map(({ p, e }) => (
              <Card key={p.id} className="!p-4">
                <div className="flex items-start justify-between gap-2">
                  <button onClick={() => setEditing(p.id)} className="text-left font-semibold hover:underline">{p.title}</button>
                  <Badge className={levelMeta[p.level].className}>{levelMeta[p.level].label}</Badge>
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  <Link to={`/roadmaps/${p.roadmapId}`} className="hover:underline">{roadmapById[p.roadmapId]?.title}</Link>
                  {e.shippedAt && <> · shipped {new Date(e.shippedAt).toLocaleDateString()}</>}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {e.repoUrl && <a href={e.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sky-600 hover:underline dark:text-sky-400"><Code size={14} /> Code</a>}
                  {e.demoUrl && <a href={e.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sky-600 hover:underline dark:text-sky-400"><ExternalLink size={14} /> Live demo</a>}
                  {!e.repoUrl && !e.demoUrl && <button onClick={() => setEditing(p.id)} className="text-xs text-slate-500 hover:underline">Add links</button>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {editing && <ProjectEditor id={editing} onClose={() => setEditing(null)} />}
    </div>
  )
}

function ProjectCard({ project: p, status, onMove, onOpen }: { project: ProjectItem; status: ProjectStatus; onMove: (s: ProjectStatus) => void; onOpen: () => void }) {
  const r = roadmapById[p.roadmapId]
  const idx = statuses.indexOf(status)
  const prev = statuses[idx - 1]
  const next = statuses[idx + 1]
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen() }}
      className="relative cursor-pointer rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
    >
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl" style={{ background: r?.accent }} />
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{p.title}</h3>
        <Badge className={levelMeta[p.level].className}>{levelMeta[p.level].label}</Badge>
      </div>
      <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
        <Link to={`/roadmaps/${p.roadmapId}`} onClick={(e) => e.stopPropagation()} className="hover:underline">{r?.title ?? p.roadmapId}</Link>
        <span>· {p.source === 'milestone' ? 'Milestone' : 'Extra idea'}</span>
        {p.hours && <span>· ~{p.hours}h</span>}
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.description}</p>
      <div className="mt-3 flex items-center gap-2">
        <Badge className={projectStatusMeta[status].className}>{projectStatusMeta[status].label}</Badge>
        <div className="ml-auto flex gap-1">
          {prev && (
            <button onClick={(e) => { e.stopPropagation(); onMove(prev) }} className={`${btnCls} bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300`}>
              <ChevronLeft size={12} /> {projectStatusMeta[prev].label}
            </button>
          )}
          {next && (
            <button onClick={(e) => { e.stopPropagation(); onMove(next) }} className={`${btnCls} bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900`}>
              {next === 'building' ? 'Start' : 'Ship'} <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectEditor({ id, onClose }: { id: string; onClose: () => void }) {
  const project = allProjects.find((p) => p.id === id)
  const entry = useProjects((s) => getEntry(s.projects, id))
  const setStatus = useProjects((s) => s.setStatus)
  const updateProject = useProjects((s) => s.updateProject)
  const [repoUrl, setRepoUrl] = useState(entry.repoUrl)
  const [demoUrl, setDemoUrl] = useState(entry.demoUrl)
  const [notes, setNotes] = useState(entry.notes)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!project) return null
  const save = () => { updateProject(id, { repoUrl: repoUrl.trim(), demoUrl: demoUrl.trim(), notes }); onClose() }
  const inputCls = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">{project.title}</h2>
            <div className="text-xs text-slate-500">{roadmapById[project.roadmapId]?.title} · {levelMeta[project.level].label}</div>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
        {project.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {project.skills.map((s) => <Badge key={s} className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{s}</Badge>)}
          </div>
        )}
        <div className="mt-4 flex gap-1">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatus(id, s)} className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium ${entry.status === s ? projectStatusMeta[s].className + ' ring-2 ring-slate-400/40' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800/50'}`}>
              {projectStatusMeta[s].label}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-medium">Repository URL
          <input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/you/project" className={inputCls} />
        </label>
        <label className="mt-3 block text-sm font-medium">Live demo URL
          <input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://project.example.com" className={inputCls} />
        </label>
        <label className="mt-3 block text-sm font-medium">Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Scope, stack, lessons learned…" className={inputCls} />
        </label>
        <div className="mt-2 text-xs text-slate-500">
          {entry.startedAt && <>Started {new Date(entry.startedAt).toLocaleDateString()}</>}
          {entry.shippedAt && <> · Shipped {new Date(entry.shippedAt).toLocaleDateString()}</>}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
          <button onClick={save} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900">Save</button>
        </div>
      </div>
    </div>
  )
}
