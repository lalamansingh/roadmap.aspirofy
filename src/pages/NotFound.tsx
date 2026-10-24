import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <div className="text-6xl font-extrabold">404</div>
      <p className="mt-2 text-slate-500">This page wandered off the roadmap.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white dark:bg-white dark:text-slate-900">Back home</Link>
    </div>
  )
}
