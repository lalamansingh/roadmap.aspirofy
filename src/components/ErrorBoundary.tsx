import { Component, type ReactNode } from 'react'

export default class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="text-2xl font-bold">Something went wrong</div>
        <p className="mt-2 text-sm text-slate-500">{this.state.error.message}</p>
        <button onClick={() => { this.setState({ error: null }); location.hash = '#/' }} className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-white dark:bg-white dark:text-slate-900">
          Back to home
        </button>
      </div>
    )
  }
}
