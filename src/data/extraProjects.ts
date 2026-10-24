import type { Level } from './types'

export interface ExtraProject {
  id: string
  roadmapId: string
  title: string
  description: string
  level: Level
  hours: number
  skills: string[]
}

export const extraProjects: ExtraProject[] = [
  // Frontend
  { id: 'frontend/x-recipe-scaler', roadmapId: 'frontend', title: 'Recipe Scaler', description: 'A responsive page that rescales ingredient quantities by servings and converts between metric and imperial units.', level: 'beginner', hours: 6, skills: ['HTML', 'CSS', 'DOM'] },
  { id: 'frontend/x-a11y-form-kit', roadmapId: 'frontend', title: 'Accessible Form Kit', description: 'Build a multi-step signup form with inline validation, keyboard navigation and screen-reader friendly error messages.', level: 'intermediate', hours: 12, skills: ['Accessibility', 'Forms', 'ARIA'] },
  { id: 'frontend/x-offline-notes', roadmapId: 'frontend', title: 'Offline-first Notes PWA', description: 'An installable notes app that works without a connection, syncs when back online and scores 90+ on Lighthouse.', level: 'advanced', hours: 24, skills: ['Service Workers', 'IndexedDB', 'Performance'] },

  // Backend
  { id: 'backend/x-url-shortener', roadmapId: 'backend', title: 'URL Shortener API', description: 'A REST service that issues short codes, redirects visitors and records click counts per link.', level: 'beginner', hours: 8, skills: ['REST', 'Databases', 'HTTP'] },
  { id: 'backend/x-job-queue', roadmapId: 'backend', title: 'Background Job Runner', description: 'Accept jobs over HTTP, process them with workers, retry failures with backoff and expose job status.', level: 'intermediate', hours: 16, skills: ['Queues', 'Concurrency', 'Redis'] },
  { id: 'backend/x-multitenant-billing', roadmapId: 'backend', title: 'Multi-tenant Billing Service', description: 'Tenant-isolated accounts, usage metering, invoice generation and idempotent webhook handling.', level: 'advanced', hours: 30, skills: ['Auth', 'Data modeling', 'Idempotency'] },

  // Fullstack
  { id: 'fullstack/x-habit-tracker', roadmapId: 'fullstack', title: 'Habit Tracker', description: 'Sign in, create daily habits, tick them off and see streaks, backed by your own API and database.', level: 'beginner', hours: 12, skills: ['CRUD', 'Auth', 'UI'] },
  { id: 'fullstack/x-team-kanban', roadmapId: 'fullstack', title: 'Realtime Team Kanban', description: 'Shared boards where card moves appear instantly for every teammate, with roles and activity history.', level: 'intermediate', hours: 24, skills: ['WebSockets', 'State sync', 'Permissions'] },
  { id: 'fullstack/x-marketplace', roadmapId: 'fullstack', title: 'Mini Marketplace', description: 'Listings, search, checkout with a payment sandbox, seller dashboards and transactional emails, deployed end to end.', level: 'advanced', hours: 40, skills: ['Payments', 'Search', 'Deployment'] },

  // DevOps
  { id: 'devops/x-dockerize-app', roadmapId: 'devops', title: 'Containerize a Legacy App', description: 'Take an existing app, write a slim multi-stage Dockerfile and a compose file with its database and cache.', level: 'beginner', hours: 6, skills: ['Docker', 'Compose', 'Linux'] },
  { id: 'devops/x-gitops-pipeline', roadmapId: 'devops', title: 'GitOps Delivery Pipeline', description: 'CI builds and scans images, then a GitOps controller rolls them out to a local Kubernetes cluster.', level: 'intermediate', hours: 18, skills: ['CI/CD', 'Kubernetes', 'GitOps'] },
  { id: 'devops/x-observability-stack', roadmapId: 'devops', title: 'Observability Stack with SLOs', description: 'Instrument a service with metrics, logs and traces, define SLOs and wire burn-rate alerts.', level: 'advanced', hours: 28, skills: ['Prometheus', 'Tracing', 'SRE'] },

  // AI Engineer
  { id: 'ai-engineer/x-prompt-playground', roadmapId: 'ai-engineer', title: 'Prompt Comparison Playground', description: 'Run the same prompt against several model settings side by side and save the best variants.', level: 'beginner', hours: 8, skills: ['LLM APIs', 'Prompting', 'UI'] },
  { id: 'ai-engineer/x-docs-rag', roadmapId: 'ai-engineer', title: 'Docs Q&A with Citations', description: 'Index a documentation site, retrieve relevant chunks and answer questions with linked source citations.', level: 'intermediate', hours: 20, skills: ['RAG', 'Embeddings', 'Vector DB'] },
  { id: 'ai-engineer/x-eval-harness', roadmapId: 'ai-engineer', title: 'Agent Evaluation Harness', description: 'A tool-using agent plus an automated eval suite that tracks accuracy, cost and latency across versions.', level: 'advanced', hours: 32, skills: ['Agents', 'Evals', 'Tool use'] },

  // Data Analyst
  { id: 'data-analyst/x-budget-sheet', roadmapId: 'data-analyst', title: 'Personal Budget Analysis', description: 'Clean a year of bank exports, categorize spending and build a summary sheet with pivot tables and charts.', level: 'beginner', hours: 6, skills: ['Spreadsheets', 'Cleaning', 'Charts'] },
  { id: 'data-analyst/x-cohort-retention', roadmapId: 'data-analyst', title: 'Cohort Retention Study', description: 'Compute monthly retention cohorts from an e-commerce dataset and explain what drives churn.', level: 'intermediate', hours: 14, skills: ['SQL', 'Cohorts', 'Storytelling'] },
  { id: 'data-analyst/x-ab-test-report', roadmapId: 'data-analyst', title: 'A/B Test Readout', description: 'Analyze an experiment with proper significance testing, guardrail metrics and a one-page recommendation.', level: 'advanced', hours: 18, skills: ['Statistics', 'Python', 'Experimentation'] },

  // Cyber Security
  { id: 'cyber-security/x-password-auditor', roadmapId: 'cyber-security', title: 'Password Policy Auditor', description: 'A script that checks passwords against strength rules and known-breach lists without storing them.', level: 'beginner', hours: 6, skills: ['Hashing', 'Scripting', 'Policy'] },
  { id: 'cyber-security/x-home-lab-ids', roadmapId: 'cyber-security', title: 'Home Lab Intrusion Detection', description: 'Set up a segmented lab network, run an IDS and document detections for simulated attacks.', level: 'intermediate', hours: 20, skills: ['Networking', 'IDS', 'Logging'] },
  { id: 'cyber-security/x-web-pentest-report', roadmapId: 'cyber-security', title: 'Web App Pentest Report', description: 'Assess an intentionally vulnerable app, exploit findings ethically and write a remediation report.', level: 'advanced', hours: 28, skills: ['OWASP', 'Pentesting', 'Reporting'] },

  // React
  { id: 'react/x-weather-widget', roadmapId: 'react', title: 'Weather Widget', description: 'Search a city, fetch a forecast and show loading, error and empty states with clean components.', level: 'beginner', hours: 6, skills: ['Components', 'Hooks', 'Fetching'] },
  { id: 'react/x-design-system', roadmapId: 'react', title: 'Mini Design System', description: 'Reusable, themeable, accessible components documented with stories and covered by tests.', level: 'intermediate', hours: 20, skills: ['Composition', 'Testing', 'Theming'] },
  { id: 'react/x-virtualized-grid', roadmapId: 'react', title: 'Virtualized Data Grid', description: 'Render 100k rows smoothly with sorting, filtering, column resizing and keyboard navigation.', level: 'advanced', hours: 30, skills: ['Performance', 'Memoization', 'Accessibility'] },

  // Python
  { id: 'python/x-file-organizer', roadmapId: 'python', title: 'Downloads Folder Organizer', description: 'A CLI that sorts files into folders by type and date, with a dry-run mode and undo log.', level: 'beginner', hours: 5, skills: ['CLI', 'pathlib', 'Files'] },
  { id: 'python/x-price-watcher', roadmapId: 'python', title: 'Price Drop Watcher', description: 'Scrape product prices on a schedule, store history in SQLite and notify when a target price is hit.', level: 'intermediate', hours: 14, skills: ['Scraping', 'SQLite', 'Scheduling'] },
  { id: 'python/x-async-crawler', roadmapId: 'python', title: 'Async Web Crawler Package', description: 'A polite concurrent crawler with rate limiting, typed APIs, tests and a published package.', level: 'advanced', hours: 26, skills: ['asyncio', 'Packaging', 'Typing'] },

  // SQL
  { id: 'sql/x-library-schema', roadmapId: 'sql', title: 'Library Database Design', description: 'Model books, members and loans with constraints, then write queries for overdue items and popular titles.', level: 'beginner', hours: 6, skills: ['Schema design', 'Joins', 'Constraints'] },
  { id: 'sql/x-sales-dashboard-queries', roadmapId: 'sql', title: 'Sales Dashboard Queries', description: 'Write the queries behind a sales dashboard: running totals, rankings and year-over-year growth.', level: 'intermediate', hours: 10, skills: ['Window functions', 'CTEs', 'Aggregation'] },
  { id: 'sql/x-query-tuning', roadmapId: 'sql', title: 'Slow Query Clinic', description: 'Load a large dataset, profile slow queries with EXPLAIN and document index and rewrite improvements.', level: 'advanced', hours: 16, skills: ['Indexing', 'EXPLAIN', 'Performance'] },

  // System Design
  { id: 'system-design/x-rate-limiter', roadmapId: 'system-design', title: 'Distributed Rate Limiter', description: 'Implement token-bucket limiting shared across instances and compare it against a sliding window.', level: 'beginner', hours: 8, skills: ['Algorithms', 'Redis', 'Trade-offs'] },
  { id: 'system-design/x-chat-design-doc', roadmapId: 'system-design', title: 'Chat System Design Doc', description: 'Write a design doc for a group chat service covering fan-out, presence, storage and capacity estimates.', level: 'intermediate', hours: 12, skills: ['Design docs', 'Messaging', 'Estimation'] },
  { id: 'system-design/x-kv-store', roadmapId: 'system-design', title: 'Replicated Key-Value Store', description: 'Build a small KV store with leader election, replication and a failure-injection test suite.', level: 'advanced', hours: 36, skills: ['Consensus', 'Replication', 'Fault tolerance'] },
]
