import { build, type Question } from './quizBuild'
import extraA from './quizzes-extra-a'
import extraB from './quizzes-extra-b'

export type { Question }

const frontend = build({
  'How the Web Works': [
    ['What does DNS primarily do when you visit a website?', ['Encrypts traffic between browser and server', 'Translates a domain name into an IP address', 'Compresses HTML before it is sent', 'Caches images in the browser'], 1, 'DNS resolves human-readable names like example.com to the IP addresses that computers use to route requests.'],
    ['Which step happens first when a browser renders a page?', ['Painting pixels to the screen', 'Running layout to compute element positions', 'Parsing HTML into the DOM tree', 'Compositing layers on the GPU'], 2, 'The browser parses HTML into the DOM (and CSS into the CSSOM) before it can compute layout, paint, and composite.'],
    ['What is a CDN mainly used for?', ['Serving static assets from servers geographically close to users', 'Running database queries faster', 'Type-checking JavaScript', 'Replacing DNS entirely'], 0, 'A content delivery network caches files at edge locations worldwide, reducing latency for users far from the origin server.'],
  ],
  HTML: [
    ['Which element best represents the primary, unique content of a page?', ['<section>', '<div id="main">', '<main>', '<article>'], 2, '<main> marks the dominant content of the document and should appear once; it also acts as a landmark for assistive technology.'],
    ['Why should every form input have an associated <label>?', ['Labels make inputs required automatically', 'Labels give inputs an accessible name and enlarge the click target', 'Browsers refuse to submit forms without labels', 'Labels enable client-side validation'], 1, 'A <label> linked via for/id (or by wrapping) gives screen readers a name for the field and lets users click the label to focus the input.'],
    ['What is the purpose of the alt attribute on <img>?', ['It sets a tooltip for all users', 'It provides a text alternative when the image cannot be seen', 'It controls the image file format', 'It lazy-loads the image'], 1, 'alt text describes the image for screen-reader users and is shown if the image fails to load. Decorative images should use alt="".'],
  ],
  CSS: [
    ['Which selector has the highest specificity?', ['.card .title', '#header', 'div p span', 'a:hover'], 1, 'An ID selector (1,0,0) outranks any number of class, pseudo-class, or type selectors.'],
    ['What does box-sizing: border-box change?', ['Borders are drawn outside the margin', 'Width and height include padding and border', 'Margins collapse horizontally', 'The element becomes a flex container'], 1, 'With border-box, the declared width includes content, padding, and border, which makes sizing more predictable.'],
    ['When is CSS Grid generally a better fit than Flexbox?', ['Aligning items in a single row', 'Laying out content in both rows and columns at once', 'Centering a single icon', 'Spacing navigation links evenly'], 1, 'Grid is designed for two-dimensional layouts; Flexbox excels at one-dimensional distribution along a single axis.'],
  ],
  JavaScript: [
    ['What is a closure in JavaScript?', ['A function that has finished executing', 'A function bundled with references to variables from its enclosing scope', 'A way to close browser tabs', 'An object that cannot be modified'], 1, 'A closure lets an inner function keep access to variables of the outer scope even after the outer function has returned.'],
    ['What does `await` do inside an async function?', ['Blocks the entire browser thread until the promise settles', 'Pauses that function until the promise settles, without blocking the event loop', 'Converts a value into a callback', 'Runs the promise in a Web Worker'], 1, 'await suspends only the current async function; other tasks keep running while the promise is pending.'],
    ['Which array method returns a new array with only the items that pass a test?', ['map', 'forEach', 'filter', 'reduce'], 2, 'filter returns a new array of elements for which the callback returns a truthy value.'],
  ],
  'Developer Tooling': [
    ['What is the purpose of a lockfile such as package-lock.json?', ['To prevent anyone from editing package.json', 'To record exact dependency versions for reproducible installs', 'To encrypt node_modules', 'To list scripts available to run'], 1, 'Lockfiles pin the full resolved dependency tree so every install produces the same versions.'],
    ['What does `git rebase main` do on a feature branch?', ['Deletes the main branch', 'Replays the feature commits on top of the latest main', 'Merges main with a merge commit', 'Pushes the branch to the remote'], 1, 'Rebasing rewrites the feature branch so its commits sit on top of main, producing a linear history.'],
    ['What is the main job of a bundler like Vite or webpack?', ['Run unit tests', 'Combine and optimise modules and assets for the browser', 'Host the site in production', 'Format code consistently'], 1, 'Bundlers resolve imports, transform code, and output optimised files that browsers can load efficiently.'],
  ],
  TypeScript: [
    ['How does TypeScript narrow `x: string | number` inside `if (typeof x === "string")`?', ['It does not; you must cast', 'x is treated as string inside the block', 'x becomes never', 'x becomes any'], 1, 'typeof guards are understood by the compiler, which narrows the union to string within that branch.'],
    ['What does `Partial<User>` produce?', ['A type with only the first property of User', 'A type where all User properties are optional', 'A type where all properties are readonly', 'An array of User'], 1, 'Partial<T> maps every property of T to be optional.'],
    ['Do TypeScript types exist at runtime?', ['Yes, they are checked on every call', 'No, they are erased during compilation', 'Only interfaces exist at runtime', 'Only in strict mode'], 1, 'TypeScript types are a compile-time feature; the emitted JavaScript contains no type information.'],
  ],
  Frameworks: [
    ['What is a key reason to use client-side routing in a single-page app?', ['To avoid using JavaScript', 'To change views without a full page reload', 'To improve SEO automatically', 'To make the server render every page'], 1, 'Client-side routers update the URL and render new views in place, avoiding full document reloads.'],
    ['Which framework compiles components to minimal imperative code at build time instead of shipping a large runtime?', ['Angular', 'React', 'Svelte', 'Vue'], 2, 'Svelte is a compiler: it turns components into efficient JavaScript that directly updates the DOM.'],
    ['When should you reach for a global state library?', ['Always, for every piece of state', 'When many distant components need to share and update the same state', 'Only for form inputs', 'Never; props are always enough'], 1, 'Local state is usually sufficient; a global store helps when state is shared widely and prop drilling becomes painful.'],
  ],
  'Styling at Scale': [
    ['What problem do CSS Modules solve?', ['They add types to CSS', 'They scope class names locally to avoid global collisions', 'They remove the need for a bundler', 'They animate components'], 1, 'CSS Modules generate unique class names per file, so styles do not leak between components.'],
    ['What best describes Tailwind CSS?', ['A component library of pre-built widgets', 'A utility-first framework of small single-purpose classes', 'A CSS-in-JS runtime', 'A CSS preprocessor like Sass'], 1, 'Tailwind provides low-level utility classes composed directly in markup, constrained by a design scale.'],
    ['What are design tokens?', ['Authentication tokens for designers', 'Named values like colours and spacing shared across a design system', 'Figma plugins', 'Random CSS class names'], 1, 'Tokens capture design decisions (colour, spacing, typography) as named variables so they stay consistent everywhere.'],
  ],
  Testing: [
    ['Which kind of test drives a real browser through full user flows?', ['Unit test', 'Component test', 'End-to-end test', 'Snapshot test'], 2, 'E2E tools like Playwright and Cypress automate a real browser against the running app.'],
    ['What does Testing Library encourage you to query by?', ['CSS class names', 'Internal component state', 'What users perceive, such as roles and labels', 'Test IDs only'], 2, 'Querying by role, label, and text keeps tests close to how users interact and resilient to refactors.'],
    ['Why mock network calls in tests (e.g. with MSW)?', ['To make tests slower and more realistic', 'To isolate tests from flaky or unavailable external APIs', 'To avoid writing assertions', 'To test the backend'], 1, 'Mocking gives deterministic responses so tests are fast, reliable, and can cover error cases.'],
  ],
  'Performance & Security': [
    ['Which Core Web Vital measures visual stability?', ['LCP', 'INP', 'CLS', 'TTFB'], 2, 'Cumulative Layout Shift measures unexpected movement of visible content during the page lifecycle.'],
    ['What is the most effective default defence against XSS when rendering user input?', ['Store it in localStorage', 'Escape or encode output and avoid injecting raw HTML', 'Use HTTPS', 'Minify JavaScript'], 1, 'XSS happens when untrusted data is interpreted as code; contextual output encoding (and a CSP) prevents that.'],
    ['What does code splitting achieve?', ['Splits CSS into multiple files for readability', 'Loads JavaScript on demand instead of all up front', 'Divides tests across CPU cores', 'Separates frontend and backend repos'], 1, 'Code splitting reduces initial bundle size by loading chunks only when a route or feature needs them.'],
  ],
  'Meta-frameworks & Rendering': [
    ['What distinguishes SSG from SSR?', ['SSG renders pages at build time; SSR renders on each request', 'SSG requires a database; SSR does not', 'SSR only works for static sites', 'There is no difference'], 0, 'Static site generation pre-renders HTML during the build; server-side rendering generates HTML per request.'],
    ['What does ISR (incremental static regeneration) allow?', ['Rebuilding static pages in the background after a revalidation period', 'Rendering only on the client', 'Running React without JavaScript', 'Streaming video'], 0, 'ISR serves cached static pages and regenerates them periodically or on demand without a full rebuild.'],
    ['Which is a typical trait of edge functions?', ['Unlimited execution time', 'Running close to users with fast cold starts but a restricted runtime', 'Direct access to the local filesystem', 'Always running on a single central server'], 1, 'Edge runtimes run in many locations near users and start quickly, but often limit APIs, memory, and execution time.'],
  ],
})

const backend = build({
  Foundations: [
    ['Which transport protocol guarantees ordered, reliable delivery?', ['UDP', 'TCP', 'ICMP', 'ARP'], 1, 'TCP provides connection-oriented, ordered, and retransmitted delivery; UDP is connectionless and best-effort.'],
    ['Which HTTP status code means the client is not authenticated?', ['401', '403', '404', '500'], 0, '401 Unauthorized means credentials are missing or invalid; 403 Forbidden means authenticated but not permitted.'],
    ['Which HTTP method is defined as idempotent?', ['POST', 'PUT', 'PATCH (always)', 'CONNECT'], 1, 'PUT replaces a resource, so repeating the same request leaves the same state. POST is not idempotent.'],
  ],
  'Pick a Language': [
    ['What is a defining trait of Node.js?', ['Multi-threaded request handling by default', 'An event-driven, non-blocking I/O model', 'Compiled ahead of time to machine code', 'Runs only in browsers'], 1, 'Node uses a single-threaded event loop with non-blocking I/O, making it efficient for I/O-heavy workloads.'],
    ['Which Go feature makes concurrent programming lightweight?', ['Goroutines and channels', 'Global interpreter lock', 'Checked exceptions', 'Prototypal inheritance'], 0, 'Goroutines are cheap, runtime-managed threads, and channels let them communicate safely.'],
    ['Which Python web framework is built around type hints and async support for APIs?', ['Flask', 'Django', 'FastAPI', 'Tornado'], 2, 'FastAPI uses type hints (via Pydantic) for validation and automatic OpenAPI docs, with native async support.'],
  ],
  'Relational Databases': [
    ['What does a database index primarily speed up?', ['Inserts', 'Lookups and filtering on the indexed columns', 'Backups', 'Schema migrations'], 1, 'Indexes speed reads that filter or sort by indexed columns, at the cost of extra storage and slower writes.'],
    ['What does the "I" in ACID stand for?', ['Integrity', 'Indexing', 'Isolation', 'Immutability'], 2, 'Isolation means concurrent transactions do not interfere in ways that violate the chosen isolation level.'],
    ['What is the main goal of normalisation?', ['Make queries use fewer joins', 'Reduce redundancy and update anomalies', 'Encrypt sensitive columns', 'Speed up full-table scans'], 1, 'Normalisation organises data so each fact is stored once, preventing inconsistent updates.'],
  ],
  'Building APIs': [
    ['Which REST URL follows common resource-naming conventions?', ['/getUsers', '/users/42', '/user_get?id=42', '/api/doGetUser/42'], 1, 'REST favours nouns for resources with HTTP methods expressing the action, e.g. GET /users/42.'],
    ['What is a key advantage of GraphQL?', ['Clients request exactly the fields they need', 'It requires no schema', 'It only works over UDP', 'Caching is automatic at the HTTP layer'], 0, 'GraphQL lets clients shape the response, reducing over- and under-fetching, defined by a typed schema.'],
    ['What serialization format does gRPC use by default?', ['JSON', 'XML', 'Protocol Buffers', 'YAML'], 2, 'gRPC uses Protocol Buffers, a compact binary format defined by .proto contracts.'],
  ],
  'Authentication & Security': [
    ['Why use a slow hash like bcrypt or Argon2 for passwords?', ['They are reversible if you lose the key', 'They make brute-force guessing expensive', 'They produce shorter hashes', 'They are faster than SHA-256'], 1, 'Password hashes are deliberately slow and salted so attackers cannot test billions of guesses cheaply.'],
    ['In OAuth 2.0, what does an access token represent?', ['The user\'s password', 'Delegated permission to access specific resources', 'A database primary key', 'An SSL certificate'], 1, 'An access token grants a client limited, scoped access on behalf of a user without sharing their credentials.'],
    ['Which is the best defence against SQL injection?', ['Escaping quotes manually', 'Parameterised queries / prepared statements', 'Hiding error messages', 'Using POST instead of GET'], 1, 'Parameterised queries keep data separate from SQL code, so input cannot change the query structure.'],
  ],
  'Beyond Relational': [
    ['What does a TTL on a Redis key do?', ['Encrypts it', 'Expires it automatically after a set time', 'Replicates it to other nodes', 'Locks it against writes'], 1, 'A time-to-live makes the key expire, which is useful for caches and sessions.'],
    ['When is a document database a good fit?', ['Highly relational data needing many joins', 'Flexible, nested records usually read as a whole', 'Strict multi-table transactions everywhere', 'Storing large video files'], 1, 'Document stores shine when data is naturally hierarchical and accessed as self-contained documents.'],
    ['Which storage is best for user-uploaded images and videos?', ['A relational table BLOB column', 'Object storage like S3', 'Redis', 'Environment variables'], 1, 'Object storage is cheap, durable, and scalable for large binary files, often fronted by a CDN.'],
  ],
  'Testing & Quality': [
    ['What distinguishes an integration test from a unit test?', ['Integration tests never use assertions', 'Integration tests exercise multiple components together, e.g. code plus a real database', 'Unit tests are always slower', 'There is no difference'], 1, 'Unit tests isolate small pieces of logic; integration tests verify how components work together.'],
    ['What does contract testing verify?', ['That the UI matches designs', 'That a provider and consumer agree on request/response shapes', 'Legal agreements with clients', 'CPU usage under load'], 1, 'Contract tests catch breaking API changes by checking both sides against a shared contract.'],
    ['What is the goal of load testing?', ['Find how a system behaves under heavy traffic and where it breaks', 'Check spelling in docs', 'Verify database schemas', 'Measure code coverage'], 0, 'Load tests simulate concurrent users to reveal throughput limits, latency degradation, and bottlenecks.'],
  ],
  'Async & Messaging': [
    ['What is a dead-letter queue for?', ['Storing messages that repeatedly fail processing', 'Deleting old messages', 'Prioritising urgent messages', 'Encrypting messages at rest'], 0, 'Messages that exceed retry limits are moved to a DLQ so they can be inspected without blocking the main queue.'],
    ['What problem does the transactional outbox pattern solve?', ['Slow database queries', 'Reliably publishing events together with a database write', 'Rate limiting', 'Load balancing'], 1, 'Writing the event to an outbox table in the same transaction ensures it is eventually published exactly when the data change commits.'],
    ['Which technology allows a server to push messages to a browser over a persistent, bidirectional connection?', ['REST polling', 'WebSockets', 'FTP', 'SMTP'], 1, 'WebSockets keep a full-duplex connection open so either side can send messages at any time.'],
  ],
  'Deploying & Operating': [
    ['What is a Docker image?', ['A running process', 'A read-only template used to create containers', 'A virtual machine snapshot with its own kernel', 'A cloud region'], 1, 'Images are layered, immutable templates; containers are running instances of them.'],
    ['What are the three pillars of observability commonly cited?', ['Logs, metrics, traces', 'CPU, RAM, disk', 'Dev, staging, prod', 'Build, test, deploy'], 0, 'Logs, metrics, and distributed traces together help you understand system behaviour.'],
    ['What does IAM control in the cloud?', ['Instance sizes', 'Who can do what on which resources', 'Network latency', 'Billing currency'], 1, 'Identity and Access Management defines identities and the permissions attached to them.'],
  ],
  'Architecture & Scale': [
    ['What is a circuit breaker in distributed systems?', ['A power-saving mode', 'A pattern that stops calls to a failing dependency for a while', 'A database lock', 'A firewall rule'], 1, 'After repeated failures, a circuit breaker fails fast instead of piling up requests, then probes to see if the dependency recovered.'],
    ['What does the CAP theorem state about network partitions?', ['You can always have consistency and availability', 'During a partition you must choose between consistency and availability', 'Partitions never happen in the cloud', 'Availability implies consistency'], 1, 'When a partition occurs, a distributed system must either reject some requests (C) or serve possibly stale data (A).'],
    ['What is a common downside of microservices?', ['They cannot scale', 'Increased operational complexity and network failure modes', 'They require a single database', 'They forbid multiple languages'], 1, 'Microservices add deployment, monitoring, and distributed-systems overhead that a monolith avoids.'],
  ],
})

const fullstack = build({
  'Web Basics': [
    ['Which CSS layout system is designed for one-dimensional rows or columns?', ['Grid', 'Flexbox', 'Floats', 'Tables'], 1, 'Flexbox distributes items along a single main axis; Grid handles two dimensions.'],
    ['What is the DOM?', ['A database for web apps', 'A tree representation of the document that scripts can read and modify', 'A CSS framework', 'An HTTP header'], 1, 'The Document Object Model exposes the page as a tree of nodes that JavaScript can manipulate.'],
    ['Why prefer semantic HTML elements like <button> over a clickable <div>?', ['They load faster', 'They come with built-in keyboard support and accessibility semantics', 'They are required by CSS', 'Divs cannot be styled'], 1, 'Native elements are focusable, keyboard-operable, and announced correctly by assistive tech for free.'],
  ],
  'Frontend Framework': [
    ['What is "server state" in a frontend app?', ['State that only exists in React components', 'Data owned by the backend that the client caches and syncs', 'The server\'s CPU load', 'Environment variables'], 1, 'Server state lives remotely and can go stale; tools like TanStack Query handle caching, refetching, and invalidation.'],
    ['What does TypeScript add on both sides of the stack?', ['Faster runtime execution', 'Static type checking and shared types between client and server', 'Automatic database migrations', 'Built-in authentication'], 1, 'Types catch mistakes at compile time and can be shared so API contracts stay in sync.'],
    ['In React, what causes a component to re-render?', ['Changing a regular local variable', 'A state update, new props, or a changed context value', 'Hovering over it', 'Calling console.log'], 1, 'React re-renders when state, props, or consumed context change; plain variables are not tracked.'],
  ],
  Backend: [
    ['What is middleware in frameworks like Express?', ['A database driver', 'Functions that run in the request/response pipeline before the handler', 'A CSS preprocessor', 'A deployment platform'], 1, 'Middleware can inspect or modify requests and responses, e.g. for logging, auth, or parsing bodies.'],
    ['Where should a JWT secret signing key be stored?', ['In frontend JavaScript', 'In a server-side environment variable or secret manager', 'In the JWT payload', 'In the public Git repo'], 1, 'Signing keys must stay server-side; anyone with the key can forge tokens.'],
    ['Which HTTP status best fits a successful resource creation?', ['200 OK', '201 Created', '204 No Content', '302 Found'], 1, '201 Created signals a new resource was made, often with a Location header pointing to it.'],
  ],
  Data: [
    ['What is a database migration?', ['Moving a database to another cloud', 'A versioned, repeatable change to the schema', 'A backup file', 'A query optimisation'], 1, 'Migrations record schema changes in code so every environment can be evolved consistently.'],
    ['What is a typical use of Redis in a web app?', ['Primary storage for financial records', 'Caching and session storage', 'Rendering HTML', 'Compiling TypeScript'], 1, 'Redis is an in-memory store well suited to caches, sessions, rate-limit counters, and queues.'],
    ['What does a foreign key enforce?', ['Unique values in a column', 'That a value references an existing row in another table', 'Encryption of a column', 'Automatic indexing of every column'], 1, 'Foreign keys maintain referential integrity between related tables.'],
  ],
  'Full-stack Frameworks': [
    ['What is a key benefit of tRPC?', ['It replaces your database', 'End-to-end type safety between client and server without code generation', 'It works with any language', 'It removes the need for HTTP'], 1, 'tRPC infers client types directly from server procedures in TypeScript monorepos.'],
    ['What do React Server Components avoid sending to the client?', ['HTML', 'The component\'s JavaScript code', 'CSS', 'Images'], 1, 'Server Components render on the server and their code is not included in the client bundle.'],
    ['What do Remix / React Router framework loaders do?', ['Load CSS files', 'Fetch data on the server for a route before rendering', 'Bundle images', 'Handle WebSockets'], 1, 'Loaders run server-side per route and supply data to the component, aligning with web-standard requests.'],
  ],
  'Ship It': [
    ['What is the purpose of a CI pipeline?', ['Manually approving designs', 'Automatically building and testing every change', 'Hosting the database', 'Writing documentation'], 1, 'Continuous integration runs builds and tests on each push to catch problems early.'],
    ['What does an error-tracking tool like Sentry provide?', ['Load balancing', 'Aggregated exceptions with stack traces and context', 'DNS hosting', 'Unit test generation'], 1, 'Error trackers group crashes, show stack traces, and alert you to new issues in production.'],
    ['Why containerise an app with Docker?', ['To make the code run faster', 'To ship the app with its dependencies so it runs the same everywhere', 'To avoid writing tests', 'To encrypt the source code'], 1, 'Containers package runtime, libraries, and config into a reproducible unit across environments.'],
  ],
})

const devops = build({
  'Operating Systems': [
    ['What does `chmod 640 file` grant?', ['Owner read/write, group read, others nothing', 'Everyone full access', 'Owner execute only', 'Group write, others read'], 0, '6 = rw-, 4 = r--, 0 = ---, applied to owner, group, and others respectively.'],
    ['Which signal asks a process to terminate gracefully?', ['SIGKILL', 'SIGTERM', 'SIGSTOP', 'SIGSEGV'], 1, 'SIGTERM can be caught to clean up; SIGKILL cannot be caught and kills immediately.'],
    ['What does the pipe `|` do in a shell?', ['Runs commands in parallel on separate machines', 'Sends one command\'s stdout into the next command\'s stdin', 'Writes output to a file', 'Comments out a line'], 1, 'Pipes chain commands so the output of one becomes the input of another.'],
  ],
  Scripting: [
    ['What does `set -e` do in a Bash script?', ['Enables debug output', 'Exits the script when a command fails', 'Exports all variables', 'Enables extended globbing'], 1, 'With set -e, the script stops on the first command returning a non-zero status (with some exceptions).'],
    ['Why quote variables like "$FILE" in Bash?', ['To make them uppercase', 'To prevent word splitting and glob expansion', 'To make them read-only', 'It has no effect'], 1, 'Unquoted variables are split on whitespace and glob-expanded, which breaks paths containing spaces.'],
    ['Why is Go popular for DevOps tooling?', ['It requires a heavy runtime on every server', 'It compiles to a single static binary that is easy to distribute', 'It is interpreted', 'It only runs on Windows'], 1, 'Static binaries with no dependencies make Go CLIs simple to ship across platforms.'],
  ],
  Networking: [
    ['How many usable host addresses are in a /24 IPv4 subnet?', ['256', '254', '128', '512'], 1, 'A /24 has 256 addresses; the network and broadcast addresses are reserved, leaving 254.'],
    ['What is the difference between L4 and L7 load balancing?', ['L4 routes by IP/port; L7 can route by HTTP details like path or headers', 'L7 is always faster', 'L4 understands cookies', 'There is no difference'], 0, 'Layer 4 balancers work on TCP/UDP connections; layer 7 balancers inspect application data.'],
    ['What does a TLS certificate prove?', ['The server is fast', 'The server controls the domain, as vouched for by a trusted CA', 'The site has no vulnerabilities', 'The client is authenticated'], 1, 'Certificates bind a public key to a domain, signed by a certificate authority the client trusts.'],
  ],
  Containers: [
    ['What is the main benefit of a multi-stage Docker build?', ['Faster network speed', 'Smaller final images that exclude build tools', 'Running multiple containers at once', 'Automatic scaling'], 1, 'Build in one stage, copy only the artifacts into a slim final stage.'],
    ['Why order Dockerfile instructions from least to most frequently changing?', ['Docker requires alphabetical order', 'To maximise layer cache reuse', 'To reduce image security', 'It has no effect'], 1, 'A changed layer invalidates every layer after it, so stable steps (like installing dependencies) should come first.'],
    ['What is Docker Compose used for?', ['Building Kubernetes clusters', 'Defining and running multi-container apps from a single file', 'Scanning images for vulnerabilities', 'Writing Dockerfiles automatically'], 1, 'Compose describes services, networks, and volumes in YAML for local multi-container setups.'],
  ],
  'CI/CD': [
    ['What characterises a canary deployment?', ['Deploying to all servers at once', 'Releasing to a small subset of users first and expanding gradually', 'Keeping two identical environments and switching all traffic', 'Deploying only on Fridays'], 1, 'Canaries limit blast radius by exposing a new version to a small percentage before full rollout.'],
    ['What is blue-green deployment?', ['Running two environments and switching traffic from old to new', 'Colour-coding log output', 'Deploying only frontend code', 'A testing framework'], 0, 'Blue-green keeps the old environment ready so you can switch back instantly if the new one fails.'],
    ['Where should CI secrets such as API keys be stored?', ['Hard-coded in workflow files', 'In the CI platform\'s encrypted secrets store', 'In the README', 'In a public Docker image'], 1, 'Encrypted secret stores inject credentials at runtime and mask them in logs.'],
  ],
  'Infrastructure as Code': [
    ['What is Terraform state used for?', ['Storing application logs', 'Mapping configuration to real-world resources to compute changes', 'Holding Docker images', 'Running unit tests'], 1, 'State records what Terraform manages so it can diff desired vs actual and plan updates.'],
    ['What does "agentless" mean for Ansible?', ['It needs no network', 'It connects over SSH without installing a daemon on targets', 'It has no configuration files', 'It cannot run commands'], 1, 'Ansible pushes tasks via SSH (or WinRM), so managed hosts need no special agent.'],
    ['What is the core principle of GitOps?', ['Developers SSH into production to make changes', 'Git is the source of truth and a controller reconciles the cluster to match it', 'Only use GitHub', 'Deploy manually from laptops'], 1, 'Tools like Argo CD or Flux continuously sync the live state to what is declared in Git.'],
  ],
  'Cloud Providers': [
    ['Which AWS service is object storage?', ['EC2', 'S3', 'RDS', 'VPC'], 1, 'S3 stores objects in buckets; EC2 is compute, RDS is managed databases, VPC is networking.'],
    ['What is a common way to reduce cloud costs for steady workloads?', ['Use only the largest instances', 'Reserved capacity or savings plans', 'Disable all monitoring', 'Run everything in one region always'], 1, 'Committing to steady usage via reservations or savings plans yields significant discounts.'],
    ['What is Google Cloud Run?', ['A managed relational database', 'A serverless platform for running containers', 'A DNS service', 'A Git hosting service'], 1, 'Cloud Run runs stateless containers that scale automatically, including to zero.'],
  ],
  Orchestration: [
    ['What is a Kubernetes Pod?', ['A cluster of nodes', 'The smallest deployable unit, wrapping one or more containers', 'A load balancer', 'A storage volume type'], 1, 'Pods group containers that share network and storage and are scheduled together.'],
    ['What does a Kubernetes Service provide?', ['A stable network endpoint for a set of Pods', 'Persistent disk storage', 'Container image builds', 'User authentication'], 0, 'Services give Pods a stable virtual IP / DNS name and load-balance across matching Pods.'],
    ['What does the Horizontal Pod Autoscaler adjust?', ['Node CPU clock speed', 'The number of Pod replicas based on metrics', 'Container image tags', 'Cluster version'], 1, 'HPA scales replica count up or down according to CPU, memory, or custom metrics.'],
  ],
  'Observability & Reliability': [
    ['If an SLO is 99.9% monthly availability, roughly how much downtime is allowed?', ['About 43 minutes', 'About 7 hours', 'About 4 minutes', 'Zero'], 0, '0.1% of a 30-day month (43,200 minutes) is about 43 minutes of error budget.'],
    ['What is PromQL?', ['A SQL dialect for PostgreSQL', 'Prometheus\'s query language for time-series metrics', 'A logging format', 'A Kubernetes manifest type'], 1, 'PromQL selects and aggregates time series for dashboards and alerts.'],
    ['What is the purpose of a blameless postmortem?', ['Assigning fault to an individual', 'Understanding systemic causes and preventing recurrence', 'Closing the incident ticket quickly', 'Reducing on-call pay'], 1, 'Blameless reviews focus on processes and systems so people share information honestly.'],
  ],
  DevSecOps: [
    ['What is an SBOM?', ['A security operations budget', 'A software bill of materials listing components and dependencies', 'A type of firewall', 'A backup method'], 1, 'An SBOM inventories what is inside your software so you can track vulnerable components.'],
    ['What does policy as code (e.g. OPA, Kyverno) enable?', ['Writing legal policies', 'Automatically enforcing rules like "no privileged containers"', 'Generating Dockerfiles', 'Faster builds'], 1, 'Policies are versioned and evaluated automatically in CI or at admission time.'],
    ['Why rotate secrets regularly?', ['To use more storage', 'To limit the damage window if a secret leaks', 'Because secrets expire by law', 'To speed up deployments'], 1, 'Rotation shortens the useful lifetime of any leaked credential.'],
  ],
})

const aiEngineer = build({
  Prerequisites: [
    ['What does cosine similarity measure between two vectors?', ['Their difference in length', 'The angle between them, i.e. directional similarity', 'Their sum', 'The number of dimensions'], 1, 'Cosine similarity compares direction regardless of magnitude, which is common for embeddings.'],
    ['How should you handle HTTP 429 responses from an LLM API?', ['Retry immediately in a tight loop', 'Back off and retry with increasing delays', 'Ignore them', 'Switch to HTTP/1.0'], 1, '429 means rate limited; exponential backoff with jitter avoids hammering the API.'],
    ['Why is async I/O useful when calling LLM APIs from Python?', ['It makes the model smarter', 'It lets many slow network calls run concurrently', 'It reduces token usage', 'It is required by all APIs'], 1, 'Network-bound calls spend most time waiting; asyncio lets you overlap many of them.'],
  ],
  'How LLMs Work': [
    ['What is a token in the context of LLMs?', ['A login credential', 'A chunk of text (often part of a word) the model processes', 'A full sentence', 'A GPU unit'], 1, 'Text is split into tokens by a tokenizer; limits and pricing are counted in tokens.'],
    ['What does lowering the temperature typically do?', ['Makes outputs more random', 'Makes outputs more deterministic and focused', 'Increases context length', 'Speeds up the model'], 1, 'Lower temperature sharpens the probability distribution so likely tokens are chosen more often.'],
    ['What is the core mechanism in transformer models?', ['Recurrent loops', 'Attention, which weighs relationships between tokens', 'Decision trees', 'Convolutions only'], 1, 'Self-attention lets every token attend to others, capturing context across the sequence.'],
  ],
  'Prompt Engineering': [
    ['What is few-shot prompting?', ['Limiting the model to a few tokens', 'Including example inputs and outputs in the prompt', 'Running the prompt a few times', 'Fine-tuning on a small dataset'], 1, 'Examples show the model the desired format and behaviour without changing its weights.'],
    ['What is the best way to get reliably structured JSON output?', ['Ask nicely in all caps', 'Use a JSON schema / structured output feature and validate the result', 'Set temperature to 2', 'Use a longer system prompt only'], 1, 'Schema-constrained output plus validation (and retries) is far more reliable than free-form instructions.'],
    ['Why break a complex task into steps for an LLM?', ['It always uses fewer tokens', 'Smaller, explicit steps are easier for the model to get right and to debug', 'Models cannot read long prompts', 'It disables hallucinations entirely'], 1, 'Decomposition improves accuracy and makes failures easier to locate.'],
  ],
  'Embeddings & Retrieval': [
    ['What does RAG stand for?', ['Random Access Generation', 'Retrieval-Augmented Generation', 'Recursive Attention Graph', 'Ranked Answer Grouping'], 1, 'RAG retrieves relevant documents and adds them to the prompt so the model can ground its answer.'],
    ['Why does chunk size matter in retrieval?', ['It does not matter', 'Too large dilutes relevance; too small loses context', 'Smaller chunks always win', 'Larger chunks are always cheaper'], 1, 'Chunking balances precision of matches against keeping enough surrounding context.'],
    ['What does hybrid search combine?', ['Two LLMs', 'Keyword (lexical) search and semantic vector search', 'SQL and NoSQL databases', 'Images and audio'], 1, 'Lexical search catches exact terms; vector search catches meaning. Combining improves recall.'],
  ],
  'Tools & Agents': [
    ['In tool calling, who actually executes the tool?', ['The model itself', 'Your application code, which returns the result to the model', 'The user manually', 'The tokenizer'], 1, 'The model emits a structured call; your code runs it and sends the result back for the next step.'],
    ['What is a key safeguard for an agent loop?', ['Unlimited iterations', 'A maximum step count and clear stopping conditions', 'Removing all tools', 'Disabling logging'], 1, 'Step limits and termination criteria prevent runaway loops and cost blow-ups.'],
    ['What is the Model Context Protocol (MCP)?', ['A GPU memory format', 'An open standard for connecting models to tools and data sources', 'A fine-tuning method', 'A tokenizer'], 1, 'MCP defines how clients discover and call tools and resources exposed by servers.'],
  ],
  Evaluation: [
    ['Why build an eval set before iterating on prompts?', ['It is legally required', 'It lets you measure whether changes actually improve quality', 'It reduces latency', 'It trains the model'], 1, 'Without a fixed benchmark, prompt changes are judged by anecdote and regressions slip through.'],
    ['What is a risk of LLM-as-judge?', ['It is always perfectly accurate', 'Judge bias and disagreement with humans, so it should be calibrated', 'It cannot read text', 'It requires fine-tuning'], 1, 'Judges can favour length or style; checking agreement with human labels keeps them honest.'],
    ['What is prompt regression testing?', ['Making prompts shorter', 'Re-running evals when prompts or models change to catch quality drops', 'Linear regression on prompts', 'Removing old prompts'], 1, 'Automated evals in CI flag when a change degrades previously working cases.'],
  ],
  Production: [
    ['Why stream LLM responses to the UI?', ['It reduces total tokens', 'Users see output sooner, improving perceived latency', 'It is cheaper per token', 'It improves accuracy'], 1, 'Streaming shows tokens as they are generated rather than waiting for the full response.'],
    ['What is prompt injection?', ['A faster way to send prompts', 'Untrusted input that tries to override the system\'s instructions', 'A caching technique', 'A tokenizer bug'], 1, 'Content from users or retrieved documents can contain instructions; treat it as data and limit tool permissions.'],
    ['What does prompt caching reduce?', ['Model accuracy', 'Cost and latency for repeated prompt prefixes', 'Context window size', 'Output length'], 1, 'Reusing a cached prefix avoids reprocessing the same tokens on every request.'],
  ],
  'Customising Models': [
    ['When is fine-tuning usually preferable to prompting?', ['For injecting frequently changing facts', 'For consistent style or format across many requests when prompting falls short', 'Always, before trying prompts', 'Never'], 1, 'Fine-tuning helps with behaviour and format; for fresh knowledge, retrieval is usually better.'],
    ['What is vLLM?', ['A vector database', 'A high-throughput inference server for open models', 'A prompt template language', 'A labeling tool'], 1, 'vLLM serves models efficiently using techniques like paged attention and continuous batching.'],
    ['What does "multimodal" mean for a model?', ['It runs on multiple GPUs', 'It can accept or produce more than one type of data, e.g. text and images', 'It has multiple system prompts', 'It supports multiple languages'], 1, 'Multimodal models handle combinations of text, images, audio, or documents.'],
  ],
})

const dataAnalyst = build({
  Foundations: [
    ['Which measure of central tendency is most robust to outliers?', ['Mean', 'Median', 'Range', 'Standard deviation'], 1, 'The median depends only on the middle value(s), so extreme values barely affect it.'],
    ['In tidy data, what does each row represent?', ['A variable', 'A single observation', 'A table', 'A summary statistic'], 1, 'Tidy data: each variable is a column, each observation a row, each value a cell.'],
    ['What does a pivot table do in a spreadsheet?', ['Rotates a chart', 'Summarises and groups data by chosen dimensions', 'Encrypts cells', 'Sorts one column only'], 1, 'Pivot tables aggregate values (sum, count, average) grouped by row and column fields.'],
  ],
  'SQL for Analysis': [
    ['What is the difference between WHERE and HAVING?', ['No difference', 'WHERE filters rows before grouping; HAVING filters groups after aggregation', 'HAVING is faster', 'WHERE only works with numbers'], 1, 'Use WHERE for row-level conditions and HAVING for conditions on aggregates like COUNT(*) > 5.'],
    ['What is a "fan-out" bug in joins?', ['A join that returns no rows', 'Joining to a one-to-many table duplicates rows and inflates aggregates', 'A syntax error', 'A slow index scan'], 1, 'If each order joins to many line items, summing order totals afterwards double-counts them.'],
    ['Which window function assigns a running rank with gaps after ties?', ['ROW_NUMBER()', 'RANK()', 'DENSE_RANK()', 'NTILE()'], 1, 'RANK() gives tied rows the same rank and skips the following numbers; DENSE_RANK() does not skip.'],
  ],
  'Python for Data': [
    ['In pandas, what does df.groupby("region")["sales"].sum() return?', ['A single number', 'Total sales per region', 'The first sale per region', 'A list of regions'], 1, 'groupby splits rows by region, then sum aggregates the sales column within each group.'],
    ['Why are NumPy operations faster than Python loops over lists?', ['They use more memory', 'They are vectorised and run in optimised compiled code', 'They skip calculations', 'They run on the GPU by default'], 1, 'Vectorised operations apply to whole arrays in C, avoiding per-element interpreter overhead.'],
    ['What does df.dropna() do by default?', ['Drops columns with any missing values', 'Drops rows containing any missing values', 'Fills missing values with zero', 'Drops duplicate rows'], 1, 'By default dropna removes rows with at least one NaN; use axis=1 for columns.'],
  ],
  Visualisation: [
    ['Which chart is usually best for showing a trend over time?', ['Pie chart', 'Line chart', 'Scatter plot of categories', 'Treemap'], 1, 'Line charts emphasise continuous change across an ordered time axis.'],
    ['Why is a pie chart with many slices a poor choice?', ['Pie charts cannot show percentages', 'Humans compare angles and areas poorly, especially with many similar slices', 'They need a time axis', 'They only work in Tableau'], 1, 'Bar charts make close comparisons much easier because length is judged accurately.'],
    ['What is Seaborn?', ['A database', 'A statistical visualisation library built on Matplotlib', 'A BI dashboard server', 'A spreadsheet add-on'], 1, 'Seaborn offers high-level statistical plots with sensible defaults on top of Matplotlib.'],
  ],
  'Statistics & Experimentation': [
    ['What does a p-value of 0.03 mean?', ['There is a 3% chance the null hypothesis is true', 'If the null were true, results at least this extreme would occur about 3% of the time', 'The effect size is 3%', 'The test has 97% power'], 1, 'A p-value is computed assuming the null; it is not the probability that the null is true.'],
    ['Why run a power analysis before an A/B test?', ['To choose colours', 'To determine the sample size needed to detect a meaningful effect', 'To guarantee significance', 'To skip randomisation'], 1, 'Power analysis balances sample size, minimum detectable effect, and error rates.'],
    ['What does correlation between two variables imply?', ['One causes the other', 'They move together, but causation is not established', 'They are independent', 'The relationship is linear and causal'], 1, 'Correlation can come from confounders or chance; causation needs experiments or careful causal methods.'],
  ],
  Communication: [
    ['What is a good way to open a data presentation?', ['With the raw SQL', 'With the key finding and the decision it informs', 'With every chart you made', 'With the data dictionary'], 1, 'Lead with the answer and its implication; supporting detail follows.'],
    ['What should you do when a stakeholder asks for a misleading metric?', ['Comply silently', 'Explain the issue and propose a more accurate alternative', 'Ignore the request', 'Change the data'], 1, 'Analysts add value by pushing back respectfully and offering better ways to answer the real question.'],
    ['What is data minimisation?', ['Compressing files', 'Collecting and keeping only the personal data you actually need', 'Deleting all data monthly', 'Using smaller fonts on charts'], 1, 'Minimisation reduces privacy risk and is a core principle of regulations like GDPR.'],
  ],
})

const cyberSecurity = build({
  'IT Foundations': [
    ['Which port is used by HTTPS by default?', ['80', '22', '443', '3389'], 2, 'HTTPS defaults to 443; HTTP uses 80, SSH 22, and RDP 3389.'],
    ['What does an operating system kernel manage?', ['Only the desktop wallpaper', 'Processes, memory, and hardware access', 'Web page rendering', 'Email delivery'], 1, 'The kernel mediates between software and hardware, scheduling processes and managing memory and devices.'],
    ['Where would you look for authentication logs on many Linux systems?', ['/etc/passwd', '/var/log/auth.log or the systemd journal', '/home/user/.bashrc', '/tmp'], 1, 'Login and sudo events are typically recorded in auth.log (Debian/Ubuntu) or viewed with journalctl.'],
  ],
  'Security Concepts': [
    ['A DDoS attack primarily targets which part of the CIA triad?', ['Confidentiality', 'Integrity', 'Availability', 'Authenticity'], 2, 'Denial-of-service attacks aim to make systems unavailable to legitimate users.'],
    ['What is the principle of least privilege?', ['Give everyone admin rights for convenience', 'Grant only the access needed to perform a task', 'Use the shortest passwords allowed', 'Disable logging for privileged users'], 1, 'Minimising permissions limits the damage from mistakes or compromised accounts.'],
    ['What distinguishes hashing from encryption?', ['Hashing is reversible with a key', 'Hashing is one-way; encryption is reversible with the right key', 'They are identical', 'Encryption cannot use keys'], 1, 'Hashes verify integrity and store passwords; encryption protects confidentiality and can be decrypted.'],
  ],
  'Defensive Operations': [
    ['What is the main function of a SIEM?', ['Write application code', 'Collect and correlate security events from many sources', 'Replace firewalls', 'Manage payroll'], 1, 'SIEMs aggregate logs, correlate events, and alert analysts to suspicious patterns.'],
    ['In incident response, what comes right after detection and analysis?', ['Lessons learned', 'Containment', 'Preparation', 'Ignoring the alert'], 1, 'The NIST lifecycle: preparation, detection and analysis, containment/eradication/recovery, post-incident activity.'],
    ['What does EDR stand for?', ['Encrypted Data Repository', 'Endpoint Detection and Response', 'External DNS Resolver', 'Emergency Disaster Recovery'], 1, 'EDR tools monitor endpoints for malicious behaviour and enable investigation and response.'],
  ],
  'Offensive Awareness': [
    ['What must be in place before starting a penetration test?', ['Nothing, just start scanning', 'Written authorisation and an agreed scope', 'A CTF account', 'Admin passwords from the IT team'], 1, 'Testing without explicit permission is illegal; scope and rules of engagement define what is allowed.'],
    ['What does CVSS provide?', ['A list of exploits', 'A standard score for vulnerability severity', 'A firewall configuration', 'Password policies'], 1, 'The Common Vulnerability Scoring System rates severity to help prioritise remediation.'],
    ['Which vulnerability lets an attacker run scripts in other users\' browsers via a website?', ['SQL injection', 'Cross-site scripting (XSS)', 'Buffer overflow in the kernel', 'DNS spoofing'], 1, 'XSS injects malicious scripts into pages viewed by other users.'],
  ],
  'Cloud & Governance': [
    ['Under the cloud shared responsibility model, who typically secures IAM configuration?', ['The cloud provider', 'The customer', 'Nobody', 'The ISP'], 1, 'Providers secure the underlying infrastructure; customers secure their data, identities, and configurations.'],
    ['What is a risk register?', ['A list of employees', 'A record of identified risks with likelihood, impact, and owners', 'A firewall log', 'A backup schedule'], 1, 'Risk registers track risks and the treatment decided for each.'],
    ['What is GDPR?', ['A US encryption standard', 'An EU regulation governing personal data protection', 'A penetration testing tool', 'A network protocol'], 1, 'GDPR sets rules on processing personal data of people in the EU, with significant penalties.'],
  ],
})

const react = build({
  'Core Concepts': [
    ['Why do list items in React need a stable key?', ['For CSS styling', 'So React can match items between renders and preserve state correctly', 'To make lists sortable', 'Keys are optional and do nothing'], 1, 'Keys identify items across renders; using array indexes can cause bugs when items are reordered.'],
    ['What is a controlled input?', ['An input with a ref', 'An input whose value is driven by React state', 'An input that is disabled', 'An input inside a form tag'], 1, 'Controlled inputs receive value from state and update it via onChange, making React the source of truth.'],
    ['What happens if you mutate a state object directly instead of calling the setter?', ['React re-renders anyway', 'React may not detect the change and will not re-render', 'An error is always thrown', 'The page reloads'], 1, 'React compares references; mutating in place keeps the same reference and skips updates.'],
  ],
  Hooks: [
    ['When does a useEffect with an empty dependency array run?', ['On every render', 'After the first render (mount), with cleanup on unmount', 'Never', 'Before the first render'], 1, 'An empty array means no dependencies change, so the effect runs once after mount (twice in StrictMode dev).'],
    ['Does updating a ref\'s .current value cause a re-render?', ['Yes, always', 'No, refs are mutable containers that do not trigger renders', 'Only in class components', 'Only if the ref holds a DOM node'], 1, 'useRef values persist across renders without causing them, which is useful for DOM nodes and timers.'],
    ['What must a custom hook\'s name start with?', ['handle', 'use', 'get', 'hook'], 1, 'The "use" prefix lets React and linters apply the rules of hooks.'],
  ],
  Ecosystem: [
    ['What does TanStack Query primarily manage?', ['Routing', 'Server state: fetching, caching, and revalidating remote data', 'CSS', 'Form validation'], 1, 'It handles caching, background refetching, deduplication, and invalidation of server data.'],
    ['What role does Zod play alongside React Hook Form?', ['Styling forms', 'Schema-based validation with inferred TypeScript types', 'Routing between pages', 'Server rendering'], 1, 'Zod schemas validate data and infer types; a resolver connects them to React Hook Form.'],
    ['In React Router, what renders a matched child route inside a parent layout?', ['<Link>', '<Outlet>', '<Navigate>', '<Form>'], 1, '<Outlet> is the placeholder where nested child routes render.'],
  ],
  Performance: [
    ['What does React.memo do?', ['Caches API responses', 'Skips re-rendering a component when its props are shallowly equal', 'Memoises CSS', 'Stores state in localStorage'], 1, 'memo wraps a component so it re-renders only when props change by shallow comparison.'],
    ['What is useTransition used for?', ['CSS animations', 'Marking state updates as non-urgent so the UI stays responsive', 'Page transitions only', 'Fetching data'], 1, 'Transitions let React interrupt low-priority renders to handle urgent input first.'],
    ['What does React.lazy combined with Suspense enable?', ['Lazy state updates', 'Loading component code on demand with a fallback UI', 'Server-side caching', 'Automatic memoisation'], 1, 'lazy() code-splits a component; Suspense shows a fallback while its chunk loads.'],
  ],
  'Modern React': [
    ['Can React Server Components use useState?', ['Yes', 'No, they render on the server and have no client interactivity', 'Only with a polyfill', 'Only in development'], 1, 'Interactive state and effects belong in Client Components marked with "use client".'],
    ['What directive marks a function as a Server Action?', ['"use client"', '"use server"', '"use strict"', '"use action"'], 1, '"use server" marks functions that run on the server and can be invoked from forms or client code.'],
    ['Which query is preferred in Testing Library for finding a button?', ['getByClassName', 'getByRole("button", { name: ... })', 'querySelector', 'getByTestId always'], 1, 'Role-based queries mirror how users and assistive tech find elements.'],
  ],
})

const python = build({
  Basics: [
    ['Which built-in type is immutable?', ['list', 'dict', 'tuple', 'set'], 2, 'Tuples cannot be changed after creation; lists, dicts, and sets are mutable.'],
    ['What is the danger of `def f(items=[])`?', ['Syntax error', 'The default list is shared across calls and can accumulate values', 'It is slower', 'Lists cannot be defaults'], 1, 'Defaults are evaluated once at definition time; use None and create the list inside.'],
    ['Why use `with open(path) as f:`?', ['It reads faster', 'It guarantees the file is closed even if an error occurs', 'It is required for text files', 'It encrypts the file'], 1, 'Context managers run cleanup on exit, so files are closed reliably.'],
  ],
  Intermediate: [
    ['What does a generator function use to produce values lazily?', ['return', 'yield', 'await', 'lambda'], 1, 'yield pauses the function and returns a value, resuming on the next iteration.'],
    ['What does a decorator do?', ['Adds CSS to output', 'Wraps a function to extend its behaviour without changing its code', 'Compiles Python to C', 'Declares a type'], 1, '@decorator is syntax for func = decorator(func), commonly used for logging, caching, or auth.'],
    ['What does `@dataclass` generate automatically?', ['Database tables', 'Methods like __init__, __repr__, and __eq__', 'Unit tests', 'Type stubs for C'], 1, 'Dataclasses reduce boilerplate for classes that mainly hold data.'],
  ],
  Tooling: [
    ['Why use a virtual environment?', ['To speed up Python', 'To isolate project dependencies from other projects and the system', 'To run Python in a browser', 'It is required for printing'], 1, 'Each venv has its own installed packages, preventing version conflicts.'],
    ['What is a pytest fixture?', ['A failing test', 'Reusable setup (and teardown) injected into tests by name', 'A linter rule', 'A packaging format'], 1, 'Fixtures provide test resources like temp directories or database connections.'],
    ['What is Ruff?', ['A web framework', 'A very fast Python linter and formatter', 'A package index', 'A debugger'], 1, 'Ruff, written in Rust, replaces many linting and formatting tools with one fast binary.'],
  ],
  Advanced: [
    ['For CPU-bound work in CPython, what usually gives real parallelism?', ['threading', 'multiprocessing', 'asyncio', 'More print statements'], 1, 'The GIL prevents threads from executing Python bytecode in parallel; separate processes avoid it.'],
    ['What is asyncio best suited for?', ['Heavy numeric computation', 'Many concurrent I/O-bound tasks like network calls', 'GPU training', 'Replacing multiprocessing for CPU work'], 1, 'asyncio overlaps waiting on I/O within a single thread using an event loop.'],
    ['Which tool profiles where a Python program spends its time?', ['pip', 'cProfile', 'venv', 'black'], 1, 'cProfile records function call counts and timings to reveal hot spots.'],
  ],
  Ecosystems: [
    ['What does FastAPI use to validate request bodies?', ['XML schemas', 'Pydantic models based on type hints', 'Regular expressions only', 'Nothing'], 1, 'Pydantic models parse and validate input, and power the automatic OpenAPI docs.'],
    ['In scikit-learn, what does `model.fit(X, y)` do?', ['Plots the data', 'Trains the model on features X and targets y', 'Splits the data', 'Saves the model to disk'], 1, 'fit learns parameters from training data; predict then applies them to new data.'],
    ['When would you use Playwright instead of requests for scraping?', ['When the page is static HTML', 'When content is rendered by JavaScript in the browser', 'Never', 'For sending emails'], 1, 'Playwright drives a real browser, so it sees content generated by client-side scripts.'],
  ],
})

const sql = build({
  Basics: [
    ['What does `WHERE col = NULL` return?', ['Rows where col is NULL', 'No rows, because comparison with NULL is unknown', 'All rows', 'A syntax error in all databases'], 1, 'NULL comparisons yield UNKNOWN; use IS NULL instead.'],
    ['What does COALESCE(a, b, c) return?', ['The sum of the values', 'The first non-NULL argument', 'The largest value', 'NULL always'], 1, 'COALESCE returns the first argument that is not NULL.'],
    ['Which clause sorts the result set?', ['GROUP BY', 'ORDER BY', 'SORT', 'HAVING'], 1, 'ORDER BY sorts rows; LIMIT (or FETCH FIRST) restricts how many are returned.'],
  ],
  'Combining Data': [
    ['What does a LEFT JOIN return?', ['Only matching rows', 'All rows from the left table, with NULLs where there is no match on the right', 'All rows from both tables', 'Only non-matching rows'], 1, 'LEFT JOIN keeps every left row; unmatched right columns are filled with NULL.'],
    ['What is the difference between UNION and UNION ALL?', ['No difference', 'UNION removes duplicates; UNION ALL keeps them', 'UNION ALL removes duplicates', 'UNION only works on two columns'], 1, 'UNION ALL is faster because it skips the de-duplication step.'],
    ['What is a correlated subquery?', ['A subquery that runs once', 'A subquery that references columns from the outer query', 'A subquery in the FROM clause only', 'A join'], 1, 'Correlated subqueries are evaluated per outer row because they depend on its values.'],
  ],
  'Writing Data': [
    ['What happens to changes after ROLLBACK?', ['They are saved', 'They are undone back to the start of the transaction', 'They are logged then saved', 'Only deletes are undone'], 1, 'ROLLBACK discards all changes made in the current transaction.'],
    ['What does a UNIQUE constraint guarantee?', ['Values are never NULL', 'No two rows share the same value(s) in the constrained column(s)', 'Values are sorted', 'The column is indexed only'], 1, 'UNIQUE prevents duplicates (most databases still allow multiple NULLs).'],
    ['What is an upsert in PostgreSQL?', ['UPDATE without WHERE', 'INSERT ... ON CONFLICT DO UPDATE', 'A DELETE followed by SELECT', 'A view'], 1, 'ON CONFLICT lets an insert update the existing row instead of failing on a key violation.'],
  ],
  'Advanced Querying': [
    ['How do window functions differ from GROUP BY aggregates?', ['They are slower and identical', 'They compute over related rows without collapsing them into one row', 'They only work on text', 'They cannot use ORDER BY'], 1, 'Each row keeps its identity while gaining an aggregate computed over its window.'],
    ['What does LAG(price) OVER (ORDER BY day) return?', ['The next row\'s price', 'The previous row\'s price', 'The average price', 'The first price'], 1, 'LAG looks backwards; LEAD looks forwards.'],
    ['What keyword enables a CTE to reference itself?', ['LOOP', 'RECURSIVE', 'REPEAT', 'SELF'], 1, 'WITH RECURSIVE allows hierarchical queries such as walking a tree of categories.'],
  ],
  'Performance & Design': [
    ['For a composite index on (a, b), which query can use it efficiently?', ['WHERE b = 1 only', 'WHERE a = 1 AND b = 2', 'WHERE c = 3', 'None'], 1, 'B-tree composite indexes are used from the leftmost column; filtering on b alone usually cannot seek.'],
    ['What does EXPLAIN show?', ['The table\'s data', 'The execution plan the planner chose', 'Who wrote the query', 'The schema history'], 1, 'EXPLAIN (and EXPLAIN ANALYZE) reveal scans, joins, and estimated vs actual costs.'],
    ['How does a materialised view differ from a regular view?', ['It stores the query results and must be refreshed', 'It cannot be queried', 'It is always up to date automatically', 'It has no columns'], 0, 'Materialised views cache results for fast reads at the cost of staleness until refreshed.'],
  ],
})

const systemDesign = build({
  Fundamentals: [
    ['What is the difference between latency and throughput?', ['They are the same', 'Latency is time per request; throughput is requests handled per unit time', 'Throughput is time per request', 'Latency only applies to databases'], 1, 'A system can have high throughput yet high latency, or vice versa.'],
    ['Roughly how much downtime per year does 99.99% availability allow?', ['About 52 minutes', 'About 8.8 hours', 'About 5 minutes', 'About 3.6 days'], 0, '0.01% of a year (~525,600 minutes) is about 52.6 minutes.'],
    ['What is horizontal scaling?', ['Buying a bigger server', 'Adding more machines to share the load', 'Rotating the monitor', 'Adding more RAM'], 1, 'Scaling out adds nodes; scaling up (vertical) adds resources to a single node.'],
  ],
  'Building Blocks': [
    ['What do load balancer health checks do?', ['Measure user happiness', 'Detect unhealthy nodes and stop routing traffic to them', 'Encrypt traffic', 'Compress responses'], 1, 'Failing nodes are removed from rotation until they pass checks again.'],
    ['Why put a message queue between services?', ['To make calls synchronous', 'To decouple producers from consumers and absorb traffic spikes', 'To replace the database', 'To reduce storage'], 1, 'Queues buffer work so consumers process at their own pace and failures are isolated.'],
    ['What is a typical responsibility of an API gateway?', ['Rendering HTML', 'Authentication, routing, and rate limiting at the edge', 'Database replication', 'Video transcoding'], 1, 'Gateways centralise cross-cutting concerns for backend services.'],
  ],
  'Distributed Systems': [
    ['What problem does consistent hashing solve?', ['Password storage', 'Minimising data movement when nodes are added or removed', 'Encrypting keys', 'Sorting data'], 1, 'Only keys near the changed node on the ring move, instead of rehashing everything.'],
    ['Why make an API operation idempotent?', ['To make it faster', 'So retries do not cause duplicate side effects', 'To avoid authentication', 'To reduce payload size'], 1, 'Idempotency keys let clients safely retry after timeouts without double charging, for example.'],
    ['What do Raft and Paxos achieve?', ['Data compression', 'Agreement among nodes on a value or log despite failures', 'Load balancing', 'Encryption'], 1, 'Consensus algorithms let a cluster agree on state as long as a majority is available.'],
  ],
  'Case Studies': [
    ['In a news feed, what is fan-out on write?', ['Computing each feed at read time', 'Pushing a new post into followers\' feeds when it is created', 'Deleting old posts', 'Sharding by user ID'], 1, 'Precomputing feeds makes reads fast but is expensive for accounts with huge follower counts.'],
    ['How does a token bucket rate limiter work?', ['It blocks all requests after the first', 'Tokens refill at a fixed rate and each request consumes one; requests without tokens are rejected', 'It counts requests per day only', 'It encrypts tokens'], 1, 'Token buckets allow short bursts up to bucket capacity while enforcing an average rate.'],
    ['What is adaptive bitrate streaming?', ['Streaming only in 4K', 'Switching between quality levels based on the viewer\'s bandwidth', 'Compressing audio only', 'Downloading the full file first'], 1, 'Video is encoded at multiple bitrates in segments; the player picks the best one as conditions change.'],
  ],
})

export const quizzes: Record<string, Record<string, Question[]>> = {
  ...extraA,
  ...extraB,
  frontend,
  backend,
  fullstack,
  devops,
  'ai-engineer': aiEngineer,
  'data-analyst': dataAnalyst,
  'cyber-security': cyberSecurity,
  react,
  python,
  sql,
  'system-design': systemDesign,
}

export const questionsFor = (roadmapId: string, sectionId: string): Question[] => quizzes[roadmapId]?.[sectionId] ?? []
