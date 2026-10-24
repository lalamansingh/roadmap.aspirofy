import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'backend',
  title: 'Backend Developer',
  short: 'Design APIs, data models, and reliable server systems.',
  description:
    'Go from writing your first server to running secure, observable, scalable services backed by well-designed databases.',
  category: 'role',
  accent: '#10b981',
  tags: ['server', 'api', 'databases'],
  query: 'backend development',
  sections: [
    {
      title: 'Foundations',
      level: 'beginner',
      description: 'What a server actually does.',
      topics: [
        ['How the internet works', 3, 'Packets, IP addresses, TCP vs UDP, and how clients find and talk to servers.'],
        ['HTTP in depth', 4, 'Methods, status codes, headers, cookies, caching, and HTTP/2 & HTTP/3.', 'https://developer.mozilla.org/en-US/docs/Web/HTTP'],
        ['Terminal & Linux basics', 4, 'Navigate the filesystem, manage processes, permissions, and use SSH.'],
        ['Git & version control', 4, 'Branching workflows and collaborating through pull requests.', 'https://git-scm.com/doc'],
      ],
    },
    {
      title: 'Pick a Language',
      level: 'beginner',
      description: 'Master one server-side language first.',
      topics: [
        ['Node.js (JavaScript/TypeScript)', 20, 'Event-driven, non-blocking runtime sharing a language with the frontend.', 'https://nodejs.org/en/learn'],
        ['Python', 20, 'Readable and productive, with Django, Flask, and FastAPI.', { docs: 'https://docs.python.org/3/tutorial/', kind: 'alternative' }],
        ['Go', 20, 'Simple, fast, compiled — great for networked services and tooling.', { docs: 'https://go.dev/doc/', kind: 'alternative' }],
        ['Java / Kotlin', 25, 'JVM languages powering large enterprise systems with Spring.', { kind: 'alternative' }],
        ['C# / .NET', 25, 'Cross-platform, high-performance framework from Microsoft.', { kind: 'alternative' }],
      ],
    },
    {
      title: 'Relational Databases',
      level: 'beginner',
      description: 'Store and query structured data.',
      topics: [
        ['SQL fundamentals', 6, 'SELECT, JOIN, GROUP BY, subqueries, and writing data safely.'],
        ['PostgreSQL', 6, 'A powerful open-source database with rich types and extensions.', 'https://www.postgresql.org/docs/'],
        ['Data modelling & normalisation', 4, 'Design tables, keys, and relationships that avoid duplication.'],
        ['Indexes & query plans', 4, 'Read EXPLAIN output and add indexes that actually help.'],
        ['Transactions & ACID', 3, 'Isolation levels, locking, and keeping data consistent under concurrency.'],
        ['ORMs & migrations', 3, 'Use tools like Prisma, SQLAlchemy, or GORM and evolve schemas safely.'],
      ],
    },
    {
      title: 'Building APIs',
      level: 'intermediate',
      description: 'Expose your system to clients.',
      topics: [
        ['REST design', 5, 'Resource naming, versioning, pagination, filtering, and idempotency.'],
        ['GraphQL', 5, 'Typed schemas and client-driven queries.', { docs: 'https://graphql.org/learn/', kind: 'optional' }],
        ['gRPC', 4, 'Contract-first RPC with Protocol Buffers for service-to-service calls.', { kind: 'optional' }],
        ['OpenAPI documentation', 2, 'Describe APIs so clients, tests, and docs can be generated.', 'https://swagger.io/specification/'],
        ['Validation & error handling', 3, 'Validate inputs at the edge and return consistent, useful errors.'],
      ],
      project: { title: 'Bookstore API', description: 'A documented REST API with CRUD, pagination, search, and integration tests against a real Postgres.' },
    },
    {
      title: 'Authentication & Security',
      level: 'intermediate',
      description: 'Keep users and data safe.',
      topics: [
        ['Sessions vs tokens', 3, 'Cookie sessions, JWTs, refresh tokens, and their trade-offs.'],
        ['OAuth 2.0 & OpenID Connect', 4, 'Delegated authorisation and "log in with" flows.', 'https://oauth.net/2/'],
        ['Password hashing', 2, 'bcrypt, scrypt, and Argon2 — and why you never roll your own.'],
        ['OWASP Top 10', 4, 'The most common web vulnerabilities and how to prevent them.', 'https://owasp.org/www-project-top-ten/'],
        ['Rate limiting & abuse prevention', 2, 'Protect endpoints from brute force and overload.'],
      ],
    },
    {
      title: 'Beyond Relational',
      level: 'intermediate',
      description: 'The right store for the job.',
      topics: [
        ['Redis & caching', 4, 'In-memory caching, TTLs, cache invalidation, and common patterns.', 'https://redis.io/docs/latest/'],
        ['Document databases', 4, 'MongoDB-style flexible schemas and when they fit.', { kind: 'optional' }],
        ['Search engines', 3, 'Full-text search with Elasticsearch, OpenSearch, or Meilisearch.', { kind: 'optional' }],
        ['Object storage', 2, 'Store files and media in S3-compatible buckets.'],
      ],
    },
    {
      title: 'Testing & Quality',
      level: 'intermediate',
      description: 'Prove your code works.',
      topics: [
        ['Unit tests', 3, 'Fast, isolated tests for business logic.'],
        ['Integration tests', 4, 'Test against real databases using containers.'],
        ['Contract & API tests', 3, 'Make sure services agree on request and response shapes.'],
        ['Load testing', 3, 'Find breaking points with k6 or similar tools.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Async & Messaging',
      level: 'advanced',
      description: 'Decouple work from requests.',
      topics: [
        ['Background jobs & queues', 4, 'Offload slow work to workers with retries and dead-letter queues.'],
        ['Message brokers', 5, 'RabbitMQ, Kafka, and pub/sub semantics.'],
        ['Event-driven architecture', 4, 'Events, outbox pattern, and eventual consistency.'],
        ['WebSockets & real-time', 3, 'Push updates to clients with WebSockets or server-sent events.'],
      ],
    },
    {
      title: 'Deploying & Operating',
      level: 'advanced',
      description: 'Run it in production.',
      topics: [
        ['Docker', 5, 'Package your service and its dependencies into reproducible images.', 'https://docs.docker.com/get-started/'],
        ['CI/CD pipelines', 4, 'Automate tests and deployments on every change.'],
        ['Logging, metrics & tracing', 5, 'Structured logs, Prometheus metrics, and OpenTelemetry traces.', 'https://opentelemetry.io/docs/'],
        ['Cloud fundamentals', 6, 'Compute, networking, managed databases, and IAM on a major cloud.'],
      ],
    },
    {
      title: 'Architecture & Scale',
      level: 'advanced',
      description: 'Systems that grow gracefully.',
      topics: [
        ['Monolith vs microservices', 3, 'When to split, and the operational costs of doing so.'],
        ['Scaling databases', 5, 'Replication, read replicas, partitioning, and sharding.'],
        ['Caching strategies', 3, 'Cache-aside, write-through, and CDN edge caching.'],
        ['Resilience patterns', 4, 'Timeouts, retries with backoff, circuit breakers, and bulkheads.'],
        ['CAP & consistency models', 3, 'Reason about trade-offs in distributed data systems.'],
      ],
      project: { title: 'URL shortener at scale', description: 'Build a shortener with caching, analytics events on a queue, rate limiting, and dashboards for latency and errors.' },
    },
  ],
})
