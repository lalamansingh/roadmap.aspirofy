import type { ReactNode } from 'react'
import type { Level, Status } from '../data/types'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>{children}</div>
}

export function ProgressBar({ value, color = '#22c55e', className = '' }: { value: number; color?: string; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${className}`}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, value)}%`, background: color }} />
    </div>
  )
}

export function Stat({ label, value, hint, icon }: { label: string; value: ReactNode; hint?: ReactNode; icon?: ReactNode }) {
  return (
    <Card className="!p-4">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
        {icon}
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-slate-500">{hint}</div>}
    </Card>
  )
}

export const statusMeta: Record<Status, { label: string; short: string; className: string; dot: string }> = {
  pending: { label: 'Pending', short: 'Reset', className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', dot: 'bg-slate-400' },
  'in-progress': { label: 'In progress', short: 'Learning', className: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300', dot: 'bg-amber-500' },
  done: { label: 'Done', short: 'Done', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300', dot: 'bg-emerald-500' },
  skipped: { label: 'Skipped', short: 'Skip', className: 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500', dot: 'bg-slate-300' },
}

export const levelMeta: Record<Level, { label: string; className: string }> = {
  beginner: { label: 'Beginner', className: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300' },
  intermediate: { label: 'Intermediate', className: 'bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300' },
  advanced: { label: 'Advanced', className: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300' },
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>{children}</span>
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
      <div className="font-semibold">{title}</div>
      {children && <div className="mt-2 text-sm text-slate-500">{children}</div>}
    </div>
  )
}
