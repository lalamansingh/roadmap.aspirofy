import { BookOpen, CornerDownLeft, FileText, History, Map, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { allTopics, roadmaps, topicKey } from '../data'
import { useTracker } from '../lib/store'
import { statusMeta } from './ui'

const OPEN_EVENT = 'aspirofy:palette'
const RECENT_KEY = 'aspirofy-palette-recent'
const MAX_RESULTS = 30

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

type Group = 'Pages' | 'Roadmaps' | 'Topics'

interface Item {
  id: string
  group: Group
  title: string
  subtitle?: string
  to: string
  key?: string // topic progress key
  haystack: string
}

const pages: [string, string][] = [
  ['Home', '/'],
  ['Roadmaps', '/roadmaps'],
  ['Analytics', '/dashboard'],
  ['Review', '/review'],
  ['Planner', '/planner'],
  ['Projects', '/projects'],
  ['Settings', '/settings'],
]

const items: Item[] = [
  ...pages.map(([title, to]): Item => ({ id: `page:${to}`, group: 'Pages', title, to, haystack: `${title} ${to}`.toLowerCase() })),
  ...roadmaps.map((r): Item => ({
    id: `roadmap:${r.id}`,
    group: 'Roadmaps',
    title: r.title,
    subtitle: r.short,
    to: `/roadmaps/${r.id}`,
    haystack: `${r.title} ${r.short} ${r.tags.join(' ')}`.toLowerCase(),
  })),
  ...roadmaps.flatMap((r) =>
    allTopics(r).map((t): Item => ({
      id: `topic:${r.id}/${t.id}`,
      group: 'Topics',
      title: t.title,
      subtitle: r.title,
      to: `/roadmaps/${r.id}?topic=${t.id}`,
      key: topicKey(r.id, t.id),
      haystack: `${t.title} ${r.title}`.toLowerCase(),
    })),
  ),
]
const itemById = Object.fromEntries(items.map((i) => [i.id, i])) as Record<string, Item>
const groupIcon = { Pages: FileText, Roadmaps: Map, Topics: BookOpen }

function loadRecent(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter((id): id is string => typeof id === 'string' && id in itemById) : []
  } catch {
    return []
  }
}

function saveRecent(ids: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(ids))
  } catch {
    /* storage unavailable */
  }
}

function search(query: string): Item[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const out: Item[] = []
  const counts: Record<Group, number> = { Pages: 0, Roadmaps: 0, Topics: 0 }
  for (const item of items) {
    if (out.length >= MAX_RESULTS) break
    if (!words.every((w) => item.haystack.includes(w))) continue
    // Keep room for topics so pages/roadmaps never crowd them out entirely.
    if (item.group !== 'Topics' && counts[item.group] >= 8) continue
    counts[item.group]++
    out.push(item)
  }
  return out
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState<string[]>(loadRecent)
  const progress = useTracker((s) => s.progress)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const el = e.target as HTMLElement | null
        const tag = el?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) return
        e.preventDefault()
        setOpen(true)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    setRecent(loadRecent())
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [open])

  const results = useMemo(() => (query.trim() ? search(query) : recent.map((id) => itemById[id]).filter(Boolean)), [query, recent])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  const close = () => setOpen(false)

  const choose = (item: Item, toggle = false) => {
    const next = [item.id, ...recent.filter((id) => id !== item.id)].slice(0, 5)
    setRecent(next)
    saveRecent(next)
    if (toggle && item.key) {
      const { progress: p, setStatus } = useTracker.getState()
      setStatus(item.key, p[item.key] === 'done' ? 'pending' : 'done')
      return
    }
    close()
    navigate(item.to)
  }

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (results.length) setActive((a) => (a + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (results.length) setActive((a) => (a - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[active]
      if (item) choose(item, e.shiftKey)
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus trapped on the input
    }
  }

  const isRecent = !query.trim()
  let lastGroup: string | null = null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-white/[.07] dark:bg-white/[.03]"
      >
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 dark:border-white/[.07]">
          <Search size={18} className="shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, roadmaps, topics…"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-list"
            aria-activedescendant={results[active] ? `cp-opt-${active}` : undefined}
            aria-autocomplete="list"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <kbd className="rounded border border-slate-200 px-1.5 text-[10px] font-medium text-slate-500 dark:border-white/10">Esc</kbd>
        </div>

        <div ref={listRef} id="command-palette-list" role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-slate-500">
              {isRecent ? 'Type to search pages, roadmaps and topics.' : `No results for “${query}”.`}
            </div>
          )}
          {results.map((item, i) => {
            const heading = isRecent ? 'Recent' : item.group
            const showHeading = heading !== lastGroup
            lastGroup = heading
            const Icon = isRecent ? History : groupIcon[item.group]
            const status = item.key ? (progress[item.key] ?? 'pending') : null
            const selected = i === active
            return (
              <div key={item.id}>
                {showHeading && (
                  <div role="presentation" className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {heading}
                  </div>
                )}
                <div
                  id={`cp-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  data-index={i}
                  onMouseMove={() => !selected && setActive(i)}
                  onClick={(e) => choose(item, e.shiftKey)}
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm ${
                    selected ? 'bg-slate-100 dark:bg-white/5' : ''
                  }`}
                >
                  <Icon size={16} className="shrink-0 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{item.title}</div>
                    {item.subtitle && <div className="truncate text-xs text-slate-500">{item.subtitle}</div>}
                  </div>
                  {status && (
                    <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500" title={statusMeta[status].label}>
                      <span className={`h-2 w-2 rounded-full ${statusMeta[status].dot}`} />
                      <span className="hidden sm:inline">{statusMeta[status].label}</span>
                    </span>
                  )}
                  {selected && <CornerDownLeft size={14} className="shrink-0 text-slate-400" />}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-500 dark:border-white/[.07]">
          <span><Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate</span>
          <span><Kbd>Enter</Kbd> open</span>
          <span><Kbd>Shift</Kbd>+<Kbd>Enter</Kbd> toggle topic done</span>
          <span className="ml-auto"><Kbd>Ctrl/⌘</Kbd>+<Kbd>K</Kbd></span>
        </div>
      </div>
    </div>
  )
}

function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded border border-slate-200 px-1 font-sans dark:border-white/10">{children}</kbd>
}
