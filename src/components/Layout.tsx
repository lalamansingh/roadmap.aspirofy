import { BarChart3, CalendarRange, Hammer, HardDrive, Map, Moon, Repeat, Search, Settings, Sun, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { findTopic } from '../data'
import { dueReviews } from '../lib/analytics'
import { useTracker } from '../lib/store'
import { useTheme } from '../lib/theme'
import CommandPalette, { openCommandPalette } from './CommandPalette'
import Logo from './Logo'

const nav = [
  { to: '/roadmaps', label: 'Roadmaps', icon: Map },
  { to: '/dashboard', label: 'Analytics', icon: BarChart3 },
  { to: '/planner', label: 'Planner', icon: CalendarRange },
  { to: '/projects', label: 'Projects', icon: Hammer },
  { to: '/review', label: 'Review', icon: Repeat },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout() {
  const { dark, toggle } = useTheme()
  const reviews = useTracker((s) => s.reviews)
  const due = dueReviews(reviews).length
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4">
          <Link to="/" className="mr-4 flex items-center gap-2 font-bold">
            <Logo />
            <span className="hidden sm:inline">Aspirofy<span className="text-brand-500">.</span>roadmaps</span>
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon size={16} />
                <span className="hidden md:inline">{label}</span>
                {to === '/review' && due > 0 && (
                  <span className="rounded-full bg-rose-500 px-1.5 text-[10px] font-bold leading-4 text-white">{due}</span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={openCommandPalette} className="hidden items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1.5 text-sm text-slate-500 hover:bg-slate-100 sm:flex dark:border-slate-700 dark:hover:bg-slate-800">
              <Search size={14} /> Search <kbd className="rounded bg-slate-100 px-1 font-mono text-[10px] dark:bg-slate-800">⌘K</kbd>
            </button>
            <TimerChip />
            <button onClick={toggle} aria-label="Toggle theme" className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>
      <CommandPalette />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
        <div className="flex items-center justify-center gap-2">
          <Logo size={18} /> Aspirofy Roadmaps — learn with a plan, track with data.
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 text-xs"><HardDrive size={12} /> Your progress is stored locally in this browser.</div>
      </footer>
    </div>
  )
}

function TimerChip() {
  const timer = useTracker((s) => s.timer)
  const stopTimer = useTracker((s) => s.stopTimer)
  const [, tick] = useState(0)
  useEffect(() => {
    if (!timer) return
    const id = setInterval(() => tick((n) => n + 1), 1000)
    return () => clearInterval(id)
  }, [timer])
  if (!timer) return null
  const secs = Math.floor((Date.now() - timer.startedAt) / 1000)
  const label = `${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor((secs % 3600) / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
  const topic = findTopic(timer.key)
  return (
    <button
      onClick={stopTimer}
      title={`Studying: ${topic?.topic.title ?? ''} — click to stop & log`}
      className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-emerald-600"
    >
      <Timer size={14} className="animate-pulse" />
      <span className="max-w-28 truncate">{topic?.topic.title}</span>
      <span className="font-mono">{label}</span>
    </button>
  )
}
