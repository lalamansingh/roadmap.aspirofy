import { BarChart3, CalendarRange, Hammer, Lock, Map, Moon, Repeat, Search, Settings, Sun, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { findTopic, roadmaps } from '../data'
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
]

export default function Layout() {
  const { dark, toggle } = useTheme()
  const reviews = useTracker((s) => s.reviews)
  const due = dueReviews(reviews).length
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className={`sticky top-0 z-30 transition-all ${scrolled ? 'glass border-b border-slate-200/70 dark:border-white/[.06]' : 'border-b border-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Link to="/" className="mr-3 flex items-center gap-2.5" aria-label="Aspirofy home">
            <Logo />
            <span className="hidden font-display text-[17px] font-bold tracking-tight sm:inline">
              Aspirofy<span className="font-medium text-slate-400"> roadmaps</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-0.5 rounded-xl border border-slate-200/70 bg-white/60 p-1 md:flex dark:border-white/[.07] dark:bg-white/[.03]">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                  }`
                }
              >
                <Icon size={15} />
                {label}
                {to === '/review' && due > 0 && <span className="rounded-full bg-rose-500 px-1.5 text-[10px] font-bold leading-4 text-white">{due}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={openCommandPalette}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-700 dark:border-white/10 dark:bg-white/5 dark:hover:text-slate-200"
            >
              <Search size={15} />
              <span className="hidden lg:inline">Search topics…</span>
              <kbd className="hidden rounded-md border border-slate-200 px-1.5 font-mono text-[10px] sm:inline dark:border-white/10">⌘K</kbd>
            </button>
            <TimerChip />
            <NavLink to="/settings" aria-label="Settings" className={({ isActive }) => `rounded-xl p-2 transition ${isActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5'}`}>
              <Settings size={18} />
            </NavLink>
            <button onClick={toggle} aria-label="Toggle theme" className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>
      <CommandPalette />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />

      {/* Mobile tab bar */}
      <nav className="glass fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200/70 pb-[env(safe-area-inset-bottom)] md:hidden dark:border-white/[.06]">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `relative flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${isActive ? 'text-brand-600 dark:text-brand-300' : 'text-slate-500'}`}>
            <Icon size={20} />
            {label}
            {to === '/review' && due > 0 && <span className="absolute right-[28%] top-1.5 h-2 w-2 rounded-full bg-rose-500" />}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function Footer() {
  const roles = roadmaps.filter((r) => r.category === 'role').slice(0, 6)
  const skills = roadmaps.filter((r) => r.category === 'skill').slice(0, 6)
  return (
    <footer className="mt-10 border-t border-slate-200/80 bg-white/60 dark:border-white/[.06] dark:bg-white/[.02]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5"><Logo size={26} /><span className="font-display text-lg font-bold">Aspirofy</span></div>
          <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">Learn with a plan, track with data. Free roadmaps with the analytics to make sure you actually finish them.</p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
            <Lock size={12} /> Private by design: everything stays in your browser
          </div>
        </div>
        <FooterCol title="Role roadmaps" links={roles.map((r) => ({ to: `/roadmaps/${r.id}`, label: r.title }))} />
        <FooterCol title="Skill roadmaps" links={skills.map((r) => ({ to: `/roadmaps/${r.id}`, label: r.title }))} />
        <FooterCol title="Tools" links={[
          { to: '/dashboard', label: 'Analytics' }, { to: '/planner', label: 'Study planner' }, { to: '/projects', label: 'Projects board' },
          { to: '/review', label: 'Spaced review' }, { to: '/settings', label: 'Export & settings' },
        ]} />
      </div>
      <div className="border-t border-slate-200/80 py-5 text-center text-xs text-slate-400 dark:border-white/[.06]">
        © {new Date().getFullYear()} Aspirofy Roadmaps
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => <li key={l.to}><Link to={l.to} className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300">{l.label}</Link></li>)}
      </ul>
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
      title={`Studying: ${topic?.topic.title ?? ''}. Click to stop & log`}
      className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_6px_20px_-6px_rgb(16_185_129/.8)] hover:bg-emerald-600"
    >
      <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-white" /></span>
      <Timer size={14} className="hidden sm:block" />
      <span className="hidden max-w-28 truncate sm:inline">{topic?.topic.title}</span>
      <span className="font-mono">{label}</span>
    </button>
  )
}
