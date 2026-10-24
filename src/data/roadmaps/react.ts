import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'react',
  title: 'React',
  short: 'Go deep on the most popular UI library.',
  description: 'Everything from components and hooks to performance, testing, and server components.',
  category: 'skill',
  accent: '#0ea5e9',
  tags: ['frontend', 'library'],
  query: 'react',
  sections: [
    {
      title: 'Core Concepts',
      level: 'beginner',
      description: 'Thinking in React.',
      topics: [
        ['JSX', 2, 'Describe UI with JavaScript expressions.', 'https://react.dev/learn/writing-markup-with-jsx'],
        ['Components & props', 3, 'Compose UIs from small reusable pieces.'],
        ['State with useState', 3, 'Make components interactive.'],
        ['Rendering lists & conditionals', 2, 'Keys, maps, and conditional rendering.'],
        ['Handling events', 1, 'Respond to user input.'],
        ['Forms', 3, 'Controlled vs uncontrolled inputs.'],
      ],
    },
    {
      title: 'Hooks',
      level: 'intermediate',
      description: 'Reusable stateful logic.',
      topics: [
        ['useEffect', 3, 'Synchronise with external systems — and when you don\'t need it.'],
        ['useRef', 1, 'Mutable values and DOM access.'],
        ['useContext', 2, 'Share data without prop drilling.'],
        ['useReducer', 2, 'Complex state transitions.'],
        ['Custom hooks', 3, 'Extract and share logic.'],
      ],
      project: { title: 'Kanban board', description: 'Drag-and-drop columns with reducer-based state and localStorage persistence.' },
    },
    {
      title: 'Ecosystem',
      level: 'intermediate',
      description: 'Libraries you will meet.',
      topics: [
        ['React Router', 3, 'Client-side routing.'],
        ['TanStack Query', 4, 'Fetching, caching, and syncing server state.'],
        ['Zustand / Redux Toolkit', 4, 'Global client state.'],
        ['React Hook Form + Zod', 3, 'Performant forms with schema validation.'],
      ],
    },
    {
      title: 'Performance',
      level: 'advanced',
      description: 'Keep it snappy.',
      topics: [
        ['Rendering behaviour', 3, 'What triggers re-renders and how to reason about it.'],
        ['memo, useMemo & useCallback', 2, 'Skip unnecessary work — and when it is not worth it.'],
        ['Suspense & lazy loading', 2, 'Split bundles and show fallbacks.'],
        ['Transitions', 2, 'Keep the UI responsive with useTransition.'],
      ],
    },
    {
      title: 'Modern React',
      level: 'advanced',
      description: 'Server-first patterns.',
      topics: [
        ['Server Components', 4, 'Render on the server with zero client JS.'],
        ['Server Actions', 3, 'Mutations without hand-written API routes.'],
        ['Testing React apps', 4, 'Testing Library and Playwright.'],
      ],
      project: { title: 'Real-time chat', description: 'A chat app with optimistic updates, suspense boundaries, and component tests.' },
    },
  ],
})
