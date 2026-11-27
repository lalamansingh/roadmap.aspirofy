import {
  Atom, Bot, BrainCircuit, ChartLine, Code, Coffee, Container, Database, FileCode2, FlaskConical, Infinity as InfinityIcon,
  Layers, Network, Palette, Server, ShieldCheck, Ship, Smartphone, Tablet, Target, Terminal, Waypoints, Workflow, Hexagon,
  type LucideIcon,
} from 'lucide-react'

export interface RoadmapMeta {
  icon: LucideIcon
  /** What a learner can do after finishing the roadmap. */
  outcomes: [string, string, string]
  /** Who the roadmap is for. */
  audience: string
}

export const roadmapMeta: Record<string, RoadmapMeta> = {
  frontend: {
    icon: Code,
    audience: 'Beginners who want to build for the web, and devs moving to the UI layer.',
    outcomes: ['Build accessible, responsive sites from semantic HTML and modern CSS', 'Ship typed React apps with routing, state and tests', 'Measure and fix Core Web Vitals and common security issues'],
  },
  backend: {
    icon: Server,
    audience: 'Developers who want to own APIs, data and everything behind the screen.',
    outcomes: ['Design REST APIs with authentication, validation and docs', 'Model relational data, write fast queries and add caching', 'Deploy, monitor and scale services with queues and containers'],
  },
  fullstack: {
    icon: Layers,
    audience: 'Builders who want to take a feature from database to browser on their own.',
    outcomes: ['Build a frontend and the API it talks to', 'Persist and query data safely behind auth', 'Ship a full-stack framework app to production'],
  },
  devops: {
    icon: InfinityIcon,
    audience: 'Engineers who want to automate delivery and keep systems healthy.',
    outcomes: ['Automate builds, tests and deploys with CI/CD pipelines', 'Provision cloud infrastructure as code', 'Run containers on Kubernetes with observability and alerting'],
  },
  'ai-engineer': {
    icon: Bot,
    audience: 'Software engineers who want to build products on top of LLMs.',
    outcomes: ['Explain how LLMs work and write reliable prompts', 'Build RAG pipelines and tool-using agents', 'Evaluate, monitor and ship LLM features to production'],
  },
  'machine-learning': {
    icon: BrainCircuit,
    audience: 'Programmers comfortable with Python who want to train and ship models.',
    outcomes: ['Apply the maths behind classical ML and deep learning', 'Train, evaluate and fine-tune models, including transformers', 'Deploy and monitor models with MLOps practices'],
  },
  'data-analyst': {
    icon: ChartLine,
    audience: 'Curious people who want to turn data into decisions. No coding background needed.',
    outcomes: ['Query and clean data with SQL and Python', 'Build clear charts and dashboards', 'Run experiments and present findings that change minds'],
  },
  'data-engineer': {
    icon: Workflow,
    audience: 'Developers who want to build the pipelines analytics and ML run on.',
    outcomes: ['Model warehouses and build batch ELT pipelines', 'Orchestrate jobs and process real-time streams', 'Enforce data quality on a cloud data platform'],
  },
  'cyber-security': {
    icon: ShieldCheck,
    audience: 'IT folks and developers who want to defend systems and people.',
    outcomes: ['Understand networks, operating systems and core security concepts', 'Detect and respond to incidents as a defender', 'Think like an attacker and apply cloud security governance'],
  },
  android: {
    icon: Smartphone,
    audience: 'Developers who want to ship native apps to billions of Android devices.',
    outcomes: ['Write idiomatic Kotlin and build UIs in Jetpack Compose', 'Architect apps with state, data and networking layers', 'Test, release and grow an app on Google Play'],
  },
  ios: {
    icon: Tablet,
    audience: 'Developers who want to build polished apps for iPhone and iPad.',
    outcomes: ['Write modern Swift and build interfaces in SwiftUI and UIKit', 'Handle data, networking and concurrency the Apple way', 'Test, profile and ship to the App Store'],
  },
  'qa-engineer': {
    icon: FlaskConical,
    audience: 'Detail-minded people who want to own quality across a product.',
    outcomes: ['Design test plans and find bugs early with manual testing', 'Automate API, UI and mobile tests', 'Run performance and security checks inside CI/CD'],
  },
  'ux-design': {
    icon: Palette,
    audience: 'Designers and career-switchers who want to design products people love.',
    outcomes: ['Run user research and frame the right problem', 'Design information architecture, flows and polished UI', 'Prototype, test with users and design accessibly'],
  },
  'product-manager': {
    icon: Target,
    audience: 'Aspiring and new PMs, and engineers or designers moving into product.',
    outcomes: ['Discover real customer problems and set strategy', 'Prioritise roadmaps and drive delivery with your team', 'Measure impact, run experiments and launch to market'],
  },
  react: {
    icon: Atom,
    audience: 'JavaScript developers who want to master the most popular UI library.',
    outcomes: ['Think in components, props and state', 'Use hooks and the ecosystem confidently', 'Profile and optimise apps with modern React features'],
  },
  typescript: {
    icon: FileCode2,
    audience: 'JavaScript developers who want to catch bugs before they ship.',
    outcomes: ['Type everyday code, functions and classes precisely', 'Write generics and type-level utilities', 'Configure tooling and migrate a JavaScript codebase'],
  },
  nodejs: {
    icon: Hexagon,
    audience: 'JavaScript developers who want to build servers, CLIs and real-time apps.',
    outcomes: ['Master the event loop and async patterns', 'Build REST APIs with persistence and tests', 'Scale and secure Node services in production'],
  },
  python: {
    icon: Terminal,
    audience: 'Complete beginners and developers adding a versatile language.',
    outcomes: ['Write clean, idiomatic Python', 'Use packaging, typing and testing tools', 'Pick an ecosystem: web, data or automation'],
  },
  golang: {
    icon: Waypoints,
    audience: 'Developers who want simple, fast, concurrent backend code.',
    outcomes: ['Write idiomatic Go with clear error handling', 'Use goroutines and channels safely', 'Build, test and run production HTTP services'],
  },
  java: {
    icon: Coffee,
    audience: 'Developers headed for enterprise backends and the JVM ecosystem.',
    outcomes: ['Write object-oriented Java with the core APIs', 'Build and test Spring web services', 'Tune JVM performance and concurrency'],
  },
  sql: {
    icon: Database,
    audience: 'Anyone who works with data: analysts, engineers and PMs.',
    outcomes: ['Query, filter and join data fluently', 'Use window functions and CTEs for advanced analysis', 'Design schemas and indexes for speed'],
  },
  docker: {
    icon: Container,
    audience: 'Developers who want reproducible, portable environments.',
    outcomes: ['Build small, secure images', 'Run multi-service stacks with Compose', 'Publish to registries and harden for production'],
  },
  kubernetes: {
    icon: Ship,
    audience: 'Engineers running containers at scale.',
    outcomes: ['Deploy and expose workloads reliably', 'Manage config, storage, scheduling and security', 'Deliver with Helm and GitOps, and extend the platform'],
  },
  'system-design': {
    icon: Network,
    audience: 'Mid-level engineers preparing for senior roles and design interviews.',
    outcomes: ['Reason about scalability, latency and trade-offs', 'Combine caches, queues, databases and load balancers', 'Design real-world systems end to end'],
  },
}

export const metaFor = (id: string): RoadmapMeta =>
  roadmapMeta[id] ?? { icon: Code, audience: '', outcomes: ['', '', ''] }
