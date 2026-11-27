import { Settings as SettingsIcon, Download, Trash2, Upload, Wand2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Card, PageHeader } from '../components/ui'
import { useProjects } from '../lib/projectStore'
import { useQuizzes } from '../lib/quizStore'
import { useTracker, type TrackerState } from '../lib/store'

export default function Settings() {
  const state = useTracker()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')

  const exportData = () => {
    const { progress, notes, confidence, reviews, events, bookmarks, weeklyGoalHours, targetDates, name } = state
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), progress, notes, confidence, reviews, events, bookmarks, weeklyGoalHours, targetDates, name }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `aspirofy-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const importData = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as Partial<TrackerState>
      if (typeof data.progress !== 'object' || !Array.isArray(data.events)) throw new Error('Not an Aspirofy export')
      state.importData(data)
      setMsg('✅ Progress imported.')
    } catch (e) {
      setMsg(`❌ Import failed: ${(e as Error).message}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <PageHeader icon={<SettingsIcon size={22} />} eyebrow="Preferences" title="Settings" subtitle="Your profile, weekly goal and data. Everything is stored in this browser only." />
      <Card>
        <div className="font-semibold">Profile</div>
        <label className="mt-3 block text-sm text-slate-500">Display name
          <input value={state.name} onChange={(e) => state.setName(e.target.value)} placeholder="Your name" className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 dark:border-white/10 dark:text-white" />
        </label>
        <label className="mt-3 block text-sm text-slate-500">Weekly study goal (hours)
          <input type="number" min={1} max={80} value={state.weeklyGoalHours} onChange={(e) => state.setWeeklyGoal(Math.max(1, Number(e.target.value)))} className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 dark:border-white/10 dark:text-white" />
        </label>
      </Card>
      <Card>
        <div className="font-semibold">Your data</div>
        <p className="mt-1 text-sm text-slate-500">Progress is stored locally in this browser ({state.events.length} tracked events). Export a backup to move it to another device.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={exportData} className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"><Download size={15} /> Export JSON</button>
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-white/10"><Upload size={15} /> Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
          <button onClick={() => { state.seedDemo(); setMsg('✅ Demo data loaded.') }} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-white/10"><Wand2 size={15} /> Load demo data</button>
          <button onClick={() => { if (confirm('Delete ALL progress, notes, and history? This cannot be undone.')) { state.resetAll(); useProjects.getState().resetAll(); useQuizzes.getState().resetQuizzes(); setMsg('All data cleared.') } }} className="flex items-center gap-1.5 rounded-lg border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-500/40 dark:hover:bg-rose-500/10"><Trash2 size={15} /> Reset everything</button>
        </div>
        {msg && <div className="mt-3 text-sm">{msg}</div>}
      </Card>
    </div>
  )
}
