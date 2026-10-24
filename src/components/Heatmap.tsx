import { useState } from 'react'
import type { DayActivity } from '../lib/analytics'
import { fmtMinutes } from '../lib/theme'

// GitHub-style calendar: columns are weeks, rows Mon..Sun. Intensity = actions that day.
export default function Heatmap({ days }: { days: DayActivity[] }) {
  const [hover, setHover] = useState<{ d: DayActivity; x: number; y: number } | null>(null)
  const max = Math.max(1, ...days.map((d) => d.actions))
  const level = (n: number) => (n === 0 ? 0 : Math.min(4, Math.ceil((n / max) * 4)))
  const offset = (new Date(days[0].ts).getDay() + 6) % 7
  const cells: (DayActivity | null)[] = [...Array(offset).fill(null), ...days]
  const weeks: (DayActivity | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  return (
    <div className="relative">
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px]">
          <div className="mr-1 flex flex-col gap-[3px] text-[10px] text-slate-500">
            {['Mon', '', 'Wed', '', 'Fri', '', ''].map((l, i) => <div key={i} className="h-[11px] leading-[11px]">{l}</div>)}
          </div>
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((d, di) =>
                d ? (
                  <div
                    key={di}
                    onMouseEnter={(e) => { const r = (e.target as HTMLElement).getBoundingClientRect(); setHover({ d, x: r.left + r.width / 2, y: r.top }) }}
                    onMouseLeave={() => setHover(null)}
                    className="h-[11px] w-[11px] rounded-[2px] outline-offset-1 hover:outline hover:outline-2 hover:outline-slate-500"
                    style={{ background: `var(--heat-${level(d.actions)})` }}
                  />
                ) : <div key={di} className="h-[11px] w-[11px]" />,
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-slate-500">
        Less {[0, 1, 2, 3, 4].map((l) => <span key={l} className="h-[11px] w-[11px] rounded-[2px]" style={{ background: `var(--heat-${l})` }} />)} More
      </div>
      {hover && (
        <div className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow-lg" style={{ left: hover.x, top: hover.y - 6 }}>
          <div className="font-semibold">{new Date(hover.d.ts).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          <div>{hover.d.completed} completed · {fmtMinutes(hover.d.minutes)} studied · {hover.d.actions} actions</div>
        </div>
      )}
    </div>
  )
}
