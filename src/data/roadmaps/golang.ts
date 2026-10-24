import { buildRoadmap } from '../build'

const golang = buildRoadmap({
  id: 'golang',
  title: 'Go',
  short: 'Write simple, fast, concurrent programs with Go.',
  description:
    'Pick up Go’s small syntax quickly, then lean on goroutines, channels, and a strong standard library to build services and command-line tools.',
  category: 'skill',
  accent: '#00add8',
  tags: ['language', 'concurrency', 'backend'],
  query: 'golang',
  sections: [
    {
      title: 'Getting Started',
      level: 'beginner',
      description: 'Install the toolchain and write your first program.',
      topics: [
        ['Installing Go', 1, 'Download the toolchain and verify your environment.', 'https://go.dev/doc/install'],
        ['A Tour of Go', 4, 'Work through the interactive introduction to the language.', 'https://go.dev/tour/'],
        ['go run, build & fmt', 2, 'Compile and execute code, and let gofmt settle style debates.', 'https://pkg.go.dev/cmd/go'],
        ['Packages & imports', 2, 'How code is grouped, exported names, and the main package.'],
        ['Variables, constants & types', 3, 'Declarations, zero values, short assignment, and basic types.'],
      ],
    },
    {
      title: 'Language Fundamentals',
      level: 'beginner',
      description: 'The core syntax you will use constantly.',
      topics: [
        ['Control flow', 2, 'if with init statements, for in all its forms, switch, and defer.'],
        ['Functions & multiple returns', 3, 'Named results, variadic parameters, and closures.'],
        ['Arrays, slices & maps', 4, 'Slice headers, append and capacity, and map iteration.', 'https://go.dev/blog/slices-intro'],
        ['Structs', 2, 'Group data, embed types, and use struct tags.'],
        ['Pointers', 2, 'When to pass by value or by pointer, and why there is no pointer arithmetic.'],
        ['Strings, bytes & runes', 2, 'UTF-8 encoding, iterating characters, and the strings package.'],
      ],
    },
    {
      title: 'Types & Errors',
      level: 'beginner',
      description: 'Go’s approach to abstraction and failure.',
      topics: [
        ['Methods', 2, 'Attach behaviour to types with value and pointer receivers.'],
        ['Interfaces', 4, 'Implicit satisfaction, small interfaces, and the empty interface.', 'https://go.dev/doc/effective_go#interfaces'],
        ['Error handling', 3, 'Return errors as values, wrap them, and inspect with errors.Is and errors.As.', 'https://go.dev/blog/go1.13-errors'],
        ['panic & recover', 1, 'When panicking is appropriate and how to recover at boundaries.'],
        ['Generics', 4, 'Type parameters and constraints for reusable functions and data structures.', 'https://go.dev/doc/tutorial/generics'],
      ],
      project: {
        title: 'Word-frequency tool',
        description: 'A CLI that reads text files or stdin, counts words with maps, and prints sorted results with clear error messages.',
      },
    },
    {
      title: 'Modules & Tooling',
      level: 'intermediate',
      description: 'Manage dependencies and keep code healthy.',
      topics: [
        ['Go modules', 3, 'go.mod, go.sum, versioning, and adding or upgrading dependencies.', 'https://go.dev/doc/modules/managing-dependencies'],
        ['Project layout', 2, 'Organise packages, internal directories, and multiple binaries.'],
        ['Static analysis', 2, 'Catch mistakes with go vet and staticcheck.'],
        ['Workspaces', 1, 'Develop several modules together with go.work.', { kind: 'optional' }],
        ['Build tags & cross-compilation', 2, 'Target other OS and architectures with GOOS and GOARCH.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Concurrency',
      level: 'intermediate',
      description: 'Go’s signature strength.',
      topics: [
        ['Goroutines', 3, 'Start lightweight concurrent functions and understand the scheduler basics.'],
        ['Channels', 4, 'Buffered and unbuffered channels, closing, and ranging over them.'],
        ['select', 2, 'Wait on multiple channel operations, with timeouts and defaults.'],
        ['sync package', 3, 'Mutexes, WaitGroup, Once, and when shared memory beats channels.', 'https://pkg.go.dev/sync'],
        ['context', 3, 'Propagate cancellation and deadlines through call chains.', 'https://pkg.go.dev/context'],
        ['Concurrency patterns', 4, 'Worker pools, pipelines, fan-out/fan-in, and errgroup.'],
        ['Race detector', 1, 'Find data races with the -race flag.', 'https://go.dev/doc/articles/race_detector'],
      ],
      project: {
        title: 'Concurrent link checker',
        description: 'Crawl a website with a bounded worker pool, respect timeouts via context, and report broken links.',
      },
    },
    {
      title: 'Standard Library',
      level: 'intermediate',
      description: 'Batteries included.',
      topics: [
        ['io & bufio', 3, 'Reader and Writer interfaces and buffered I/O.', 'https://pkg.go.dev/io'],
        ['encoding/json', 2, 'Marshal and unmarshal data with struct tags and custom types.', 'https://pkg.go.dev/encoding/json'],
        ['net/http server', 4, 'Handlers, the ServeMux with method and path patterns, and middleware.', 'https://pkg.go.dev/net/http'],
        ['HTTP clients', 2, 'Make requests with timeouts and reuse connections properly.'],
        ['time', 1, 'Durations, formatting with reference layouts, and tickers.', 'https://pkg.go.dev/time'],
        ['Structured logging with slog', 2, 'Emit leveled, key-value logs using log/slog.', 'https://pkg.go.dev/log/slog'],
      ],
    },
    {
      title: 'Building Services',
      level: 'intermediate',
      description: 'Ship web APIs and data-backed apps.',
      topics: [
        ['HTTP routers', 3, 'Use chi, Gin, or Echo when the standard mux is not enough.', { kind: 'optional' }],
        ['database/sql', 4, 'Connection pools, queries, transactions, and scanning rows.', 'https://pkg.go.dev/database/sql'],
        ['sqlc or GORM', 3, 'Generate type-safe query code or use an ORM.', { kind: 'alternative' }],
        ['Configuration', 2, 'Load settings from environment variables and flags.'],
        ['gRPC', 4, 'Define services with Protocol Buffers and generate Go clients and servers.', { docs: 'https://grpc.io/docs/languages/go/', kind: 'optional' }],
      ],
      project: {
        title: 'URL shortener service',
        description: 'A JSON API backed by PostgreSQL with redirects, click counts, graceful shutdown, and structured logs.',
      },
    },
    {
      title: 'Testing & Performance',
      level: 'advanced',
      description: 'Prove correctness and measure speed.',
      topics: [
        ['The testing package', 3, 'Write unit tests, subtests, and helpers.', 'https://pkg.go.dev/testing'],
        ['Table-driven tests', 2, 'Cover many cases concisely with a slice of inputs and expectations.'],
        ['HTTP testing', 2, 'Test handlers with httptest without opening real sockets.'],
        ['Benchmarks & fuzzing', 3, 'Measure performance and let the fuzzer find edge cases.', 'https://go.dev/doc/security/fuzz/'],
        ['Profiling with pprof', 3, 'Inspect CPU, memory, and goroutine profiles to find bottlenecks.', 'https://go.dev/blog/pprof'],
        ['Escape analysis & allocations', 2, 'Reduce garbage by understanding when values move to the heap.'],
      ],
    },
    {
      title: 'Production Go',
      level: 'advanced',
      description: 'Deploy and operate Go programs.',
      topics: [
        ['Minimal container images', 2, 'Ship static binaries in scratch or distroless images.'],
        ['Observability', 3, 'Expose metrics and traces with Prometheus and OpenTelemetry.'],
        ['Graceful shutdown & signals', 2, 'Handle SIGTERM and drain in-flight requests.'],
        ['CLI frameworks', 2, 'Build polished command-line tools with Cobra or urfave/cli.', { kind: 'optional' }],
        ['Security practices', 2, 'Scan for known vulnerabilities with govulncheck and validate inputs.', 'https://go.dev/doc/security/vuln/'],
      ],
    },
  ],
})

export default golang
