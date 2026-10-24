import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'fullstack',
  title: 'Full Stack Developer',
  short: 'Own features end to end, from database to browser.',
  description: 'A focused path that combines the essentials of frontend and backend so you can design, build, and deploy complete products.',
  category: 'role',
  accent: '#ef4444',
  tags: ['web', 'api', 'deployment'],
  query: 'full stack web development',
  sections: [
    {
      title: 'Web Basics',
      level: 'beginner',
      description: 'The three languages of the browser.',
      topics: [
        ['HTML', 6, 'Semantic, accessible markup.'],
        ['CSS', 10, 'Layout with flexbox and grid, responsive design.'],
        ['JavaScript', 20, 'Language fundamentals, DOM, and async code.'],
      ],
    },
    {
      title: 'Frontend Framework',
      level: 'intermediate',
      description: 'Build rich client experiences.',
      topics: [
        ['React', 20, 'Components, hooks, and state.', 'https://react.dev/learn'],
        ['TypeScript', 8, 'Type-safe code on both sides of the stack.'],
        ['Tailwind CSS', 4, 'Fast, consistent styling.'],
        ['Data fetching', 4, 'Server state with tools like TanStack Query.'],
      ],
    },
    {
      title: 'Backend',
      level: 'intermediate',
      description: 'APIs and business logic.',
      topics: [
        ['Node.js', 10, 'Server-side JavaScript runtime.'],
        ['Express / Fastify / Hono', 6, 'Minimal HTTP frameworks.'],
        ['REST API design', 4, 'Predictable, well-documented endpoints.'],
        ['Authentication', 5, 'Sessions, JWTs, and OAuth providers.'],
      ],
      project: { title: 'Full-stack notes app', description: 'Notes with auth, tags, and search — React frontend, Node API, Postgres storage.' },
    },
    {
      title: 'Data',
      level: 'intermediate',
      description: 'Persistence.',
      topics: [
        ['PostgreSQL', 6, 'Relational modelling and SQL.'],
        ['Prisma / Drizzle', 3, 'Type-safe database access and migrations.'],
        ['Redis', 3, 'Caching and sessions.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Full-stack Frameworks',
      level: 'advanced',
      description: 'One codebase, both sides.',
      topics: [
        ['Next.js', 12, 'Server components, actions, and routing.', 'https://nextjs.org/docs'],
        ['Remix / React Router', 8, 'Web-standards-first full-stack React.', { kind: 'alternative' }],
        ['tRPC', 3, 'End-to-end type-safe APIs.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Ship It',
      level: 'advanced',
      description: 'From laptop to users.',
      topics: [
        ['Docker', 4, 'Containerise your app.'],
        ['CI/CD', 3, 'Automated test and deploy.'],
        ['Cloud hosting', 4, 'Vercel, Fly.io, Render, or AWS.'],
        ['Monitoring & error tracking', 3, 'Sentry, logs, and uptime checks.'],
      ],
      project: { title: 'SaaS starter', description: 'A multi-tenant app with billing, auth, background jobs, and a CI/CD pipeline.' },
    },
  ],
})
