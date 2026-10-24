import { buildRoadmap } from '../build'

const nodejs = buildRoadmap({
  id: 'nodejs',
  title: 'Node.js',
  short: 'Build fast, event-driven servers and tools with JavaScript.',
  description:
    'Learn how the Node.js runtime schedules work, then use it to ship APIs, CLIs, and real-time services that hold up in production.',
  category: 'skill',
  accent: '#84cc16',
  tags: ['javascript', 'runtime', 'server'],
  query: 'node.js',
  sections: [
    {
      title: 'Runtime Essentials',
      level: 'beginner',
      description: 'Get comfortable running JavaScript outside the browser.',
      topics: [
        ['Installing Node & version managers', 2, 'Set up Node with nvm, fnm, or Volta so you can switch versions per project.', 'https://nodejs.org/en/download'],
        ['Running scripts & the REPL', 2, 'Execute files, experiment interactively, and pass flags to the node binary.'],
        ['Modern JavaScript refresher', 6, 'Destructuring, spread, classes, closures, and other syntax used everywhere in Node code.'],
        ['CommonJS vs ES modules', 3, 'How require and import differ, how Node picks a module system, and how to mix them.', 'https://nodejs.org/api/esm.html'],
        ['Global objects & process', 2, 'Use process.argv, process.env, exit codes, and the globals Node provides.', 'https://nodejs.org/api/process.html'],
      ],
    },
    {
      title: 'Packages & Tooling',
      level: 'beginner',
      description: 'Manage dependencies and project scripts.',
      topics: [
        ['npm fundamentals', 3, 'Install, update, and remove packages, and understand package.json fields.', 'https://docs.npmjs.com/'],
        ['Semantic versioning & lockfiles', 2, 'Read version ranges and keep installs reproducible across machines.'],
        ['npm scripts', 2, 'Automate building, testing, and linting through the scripts field.'],
        ['pnpm', 2, 'A disk-efficient package manager with strict dependency resolution.', { docs: 'https://pnpm.io/motivation', kind: 'alternative' }],
        ['Yarn', 2, 'Another popular package manager with workspaces and plug-and-play installs.', { docs: 'https://yarnpkg.com/getting-started', kind: 'alternative' }],
        ['Publishing a package', 2, 'Version, document, and release your own module to the registry.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Asynchronous Programming',
      level: 'beginner',
      description: 'The heart of how Node stays responsive.',
      topics: [
        ['The event loop', 5, 'The phases of the loop, microtasks vs macrotasks, and why blocking code hurts everyone.', 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick'],
        ['Callbacks & error-first style', 2, 'The original async convention and the pitfalls of deeply nested callbacks.'],
        ['Promises', 3, 'Chain, combine, and handle failures with Promise.all, allSettled, and race.'],
        ['async / await', 3, 'Write sequential-looking async code and handle rejections with try/catch.'],
        ['Timers & scheduling', 2, 'setTimeout, setImmediate, and process.nextTick and when each one runs.', 'https://nodejs.org/api/timers.html'],
        ['EventEmitter', 2, 'Publish and subscribe to events, a pattern many core modules build on.', 'https://nodejs.org/api/events.html'],
      ],
      project: {
        title: 'File-organiser CLI',
        description: 'A command-line tool that scans a folder, groups files by type or date, and moves them concurrently with progress output.',
      },
    },
    {
      title: 'Core Modules',
      level: 'intermediate',
      description: 'The standard library you will reach for daily.',
      topics: [
        ['File system (fs)', 4, 'Read, write, watch, and stream files using promise-based APIs.', 'https://nodejs.org/api/fs.html'],
        ['path & url', 2, 'Build cross-platform file paths and parse URLs safely.', 'https://nodejs.org/api/path.html'],
        ['Streams', 5, 'Readable, writable, and transform streams, backpressure, and pipeline.', 'https://nodejs.org/api/stream.html'],
        ['Buffers & binary data', 3, 'Work with raw bytes, encodings, and binary protocols.', 'https://nodejs.org/api/buffer.html'],
        ['The http module', 3, 'Create a server from scratch to understand what frameworks hide.', 'https://nodejs.org/api/http.html'],
        ['child_process', 2, 'Spawn shell commands and other programs and capture their output.', 'https://nodejs.org/api/child_process.html'],
      ],
    },
    {
      title: 'Web Frameworks & APIs',
      level: 'intermediate',
      description: 'Build HTTP services productively.',
      topics: [
        ['Express', 6, 'Routing, middleware chains, and error handlers in the most widely used framework.', 'https://expressjs.com/'],
        ['Fastify', 5, 'A performance-focused framework with schema-based validation and plugins.', { docs: 'https://fastify.dev/docs/latest/', kind: 'alternative' }],
        ['NestJS', 8, 'An opinionated, decorator-driven framework for large structured codebases.', { docs: 'https://docs.nestjs.com/', kind: 'alternative' }],
        ['Request validation', 3, 'Validate bodies and params with libraries such as Zod or Joi.'],
        ['Authentication with JWT & sessions', 4, 'Issue and verify tokens, store sessions, and protect routes.'],
        ['WebSockets', 3, 'Push real-time updates to clients with ws or Socket.IO.', { kind: 'optional' }],
      ],
      project: {
        title: 'Notes REST API',
        description: 'A validated, authenticated notes API with pagination, centralised error handling, and an OpenAPI description.',
      },
    },
    {
      title: 'Data & Persistence',
      level: 'intermediate',
      description: 'Talk to databases from Node.',
      topics: [
        ['PostgreSQL with node-postgres', 4, 'Pool connections, run parameterised queries, and manage transactions.'],
        ['ORMs & query builders', 4, 'Model data with Prisma, Drizzle, or Knex and generate migrations.'],
        ['MongoDB & Mongoose', 4, 'Store documents and define schemas for a flexible data model.', { kind: 'alternative' }],
        ['Redis caching', 3, 'Cache expensive results and share state between processes.'],
        ['Environment configuration', 2, 'Load secrets and settings safely across development and production.'],
      ],
    },
    {
      title: 'Testing & Quality',
      level: 'intermediate',
      description: 'Ship changes with confidence.',
      topics: [
        ['Built-in test runner', 3, 'Write and run tests with node:test and node:assert, no extra dependencies.', 'https://nodejs.org/api/test.html'],
        ['Jest or Vitest', 3, 'Feature-rich test frameworks with mocking, snapshots, and watch mode.', { kind: 'alternative' }],
        ['API integration tests', 3, 'Exercise real endpoints with Supertest against a test database.'],
        ['Linting & formatting', 2, 'Enforce consistent style and catch bugs early with ESLint and Prettier.'],
        ['TypeScript in Node', 5, 'Add static types to your services and run them with tsc or a loader.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Performance & Scaling',
      level: 'advanced',
      description: 'Make the most of every CPU core.',
      topics: [
        ['Worker threads', 4, 'Offload CPU-heavy work so the event loop stays free.', 'https://nodejs.org/api/worker_threads.html'],
        ['Cluster & process managers', 3, 'Run multiple processes with cluster or PM2 and restart on failure.', 'https://nodejs.org/api/cluster.html'],
        ['Profiling & diagnostics', 4, 'Find hot paths and leaks with --inspect, flame graphs, and heap snapshots.', 'https://nodejs.org/en/learn/getting-started/profiling'],
        ['Memory management', 3, 'How V8 garbage collection works and the habits that cause leaks.'],
        ['Structured logging', 2, 'Emit machine-readable logs with pino and correlate them across requests.'],
        ['Graceful shutdown', 2, 'Drain connections and close resources cleanly on termination signals.'],
      ],
    },
    {
      title: 'Production & Security',
      level: 'advanced',
      description: 'Deploy and protect real services.',
      topics: [
        ['Dependency security', 2, 'Audit packages, pin versions, and reduce supply-chain risk.'],
        ['Securing HTTP services', 3, 'Set safe headers, limit request sizes, and defend against injection.'],
        ['Containerising Node apps', 3, 'Write small, cached Docker images with multi-stage builds.'],
        ['CI pipelines', 2, 'Run tests and checks automatically on every push.'],
        ['Serverless functions', 3, 'Deploy handlers to platforms like AWS Lambda or Cloudflare Workers.', { kind: 'optional' }],
      ],
      project: {
        title: 'Real-time chat service',
        description: 'A containerised chat backend with WebSockets, Redis pub/sub across instances, rate limiting, and graceful shutdown.',
      },
    },
  ],
})

export default nodejs
