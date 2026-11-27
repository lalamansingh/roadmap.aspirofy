import type { ReactNode } from 'react'
import type { Level, Status } from '../data/types'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/[.07] dark:bg-white/[.03] ${className}`}>
      {children}
    </div>
  )
}

export function ProgressBar({ value, color = '#6c5cff', className = '' }: { value: number; color?: string; className?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10 ${className}`} role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${v}%`, background: `linear-gradient(90deg, color-mix(in oklab, ${color} 70%, white), ${color})` }}
      />
    </div>
  )
}

/** Circular progress ring. */
export function Ring({ value, size = 56, stroke = 6, color = '#6c5cff', children }: { value: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth={stroke} fill="none" className="text-slate-200 dark:text-white/10" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (v / 100) * c} style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)' }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}

export function Stat({ label, value, hint, icon }: { label: string; value: ReactNode; hint?: ReactNode; icon?: ReactNode }) {
  return (
    <Card className="!p-4">
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
        {icon && <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 dark:bg-white/5">{icon}</span>}
      </div>
      <div className="mt-2 font-display text-[26px] font-bold leading-none tabular-nums">{value}</div>
      {hint && <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</div>}
    </Card>
  )
}

export const statusMeta: Record<Status, { label: string; short: string; className: string; dot: string }> = {
  pending: { label: 'Pending', short: 'Reset', className: 'bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-300', dot: 'bg-slate-400' },
  'in-progress': { label: 'In progress', short: 'Learning', className: 'bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300', dot: 'bg-amber-500' },
  done: { label: 'Done', short: 'Done', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300', dot: 'bg-emerald-500' },
  skipped: { label: 'Skipped', short: 'Skip', className: 'bg-slate-200 text-slate-500 dark:bg-white/5 dark:text-slate-500', dot: 'bg-slate-300' },
}

export const levelMeta: Record<Level, { label: string; className: string; color: string }> = {
  beginner: { label: 'Beginner', className: 'bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300', color: '#38bdf8' },
  intermediate: { label: 'Intermediate', className: 'bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300', color: '#8b5cf6' },
  advanced: { label: 'Advanced', className: 'bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300', color: '#f43f5e' },
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>{children}</span>
}

export function EmptyState({ title, children, icon }: { title: string; children?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="bg-dots rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-white/10">
      {icon && <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">{icon}</div>}
      <div className="font-display text-lg font-semibold">{title}</div>
      {children && <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{children}</div>}
    </div>
  )
}

/** Consistent page heading used across inner pages. */
export function PageHeader({ eyebrow, title, subtitle, icon, actions }: { eyebrow?: ReactNode; title: ReactNode; subtitle?: ReactNode; icon?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="rise flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        {icon && <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-glow">{icon}</div>}
        <div>
          {eyebrow && <div className="mb-1 text-xs font-semibold uppercase tracking-[.14em] text-brand-600 dark:text-brand-300">{eyebrow}</div>}
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-1.5 max-w-2xl text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {actions}
    </div>
  )
}

export const btn = {
  primary: 'inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(90_69_240/.7)] transition hover:bg-brand-500 active:scale-[.98]',
  dark: 'inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-[.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
  ghost: 'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[.98] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10',
  spark: 'inline-flex items-center justify-center gap-2 rounded-xl bg-spark-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-spark-300 active:scale-[.98]',
}

/** Segmented control (tabs / toggles). */
export function Segmented<T extends string>({ value, options, onChange, className = '' }: { value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; className?: string }) {
  return (
    <div className={`inline-flex rounded-xl border border-slate-200 bg-slate-100/70 p-1 dark:border-white/10 dark:bg-white/5 ${className}`}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            value === o.value ? 'bg-white text-slate-900 shadow-sm dark:bg-white/15 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
