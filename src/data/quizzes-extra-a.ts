import { build, type Question } from './quizBuild'

const nodejs = build({
  "Runtime Essentials": [
    ["Why do developers use a version manager such as nvm or fnm?", ["To speed up npm installs", "To switch between Node versions per project", "To compile JavaScript to native code", "To manage global environment variables"], 1, "Version managers install several Node releases side by side and let each project select the one it needs."],
    ["What does process.argv contain?", ["Environment variables as key/value pairs", "The current working directory", "The command-line arguments, starting with the node binary and script path", "Only the flags passed after --"], 2, "process.argv is an array whose first two entries are the node executable and the script path, followed by user-supplied arguments."],
    ["How does Node decide to treat a .js file as an ES module?", ["When the nearest package.json has \"type\": \"module\"", "When the file contains a require call", "When it is run with --commonjs", "Always; CommonJS has been removed"], 0, "Node uses the closest package.json type field (or the .mjs/.cjs extension) to decide the module system for .js files."],
  ],
  "Packages & Tooling": [
    ["Under semver, which versions does the range ^1.4.2 allow?", ["Exactly 1.4.2", "Any 1.4.x patch only", "Any version from 1.4.2 up to, but not including, 2.0.0", "Any version at all"], 2, "The caret allows minor and patch upgrades within the same major version, since those should be backward compatible."],
    ["How do you run a script named \"lint\" defined in package.json?", ["npm lint --script", "npm run lint", "node lint", "npm exec package.json lint"], 1, "Custom entries in the scripts field are executed with npm run <name>; only a few names like test and start have shortcuts."],
    ["What is a distinguishing trait of pnpm?", ["It stores packages once in a content-addressable store and links them into projects", "It cannot read package.json", "It only works with Yarn workspaces", "It installs every dependency globally"], 0, "pnpm keeps a single global store and uses hard links plus a strict node_modules layout, saving disk space and preventing phantom dependencies."],
  ],
  "Asynchronous Programming": [
    ["In error-first callbacks, what is the first argument?", ["The result value", "An options object", "An error object, or null when the operation succeeded", "The callback itself"], 2, "Node core APIs pass an error (or null/undefined) first so callers must consider failure before using the result."],
    ["Which runs first after the current synchronous code finishes: a resolved promise callback or a setTimeout(fn, 0) callback?", ["The setTimeout callback", "The promise callback", "They run in random order", "Neither runs until the process exits"], 1, "Promise reactions are microtasks, which drain before the event loop moves on to the timers phase."],
    ["What does an EventEmitter do when an 'error' event is emitted with no listener attached?", ["Silently ignores it", "Logs a warning and continues", "Retries the last event", "Throws the error, which crashes the process if uncaught"], 3, "The 'error' event is special: without a listener the emitter throws, so production code should always handle it."],
  ],
  "Core Modules": [
    ["Why prefer streams over fs.readFile for a multi-gigabyte file?", ["Streams process data in chunks, keeping memory usage low", "Streams are synchronous and therefore faster", "readFile cannot read binary data", "Streams automatically compress data"], 0, "Streaming handles data piece by piece, so memory use stays bounded regardless of file size."],
    ["What does path.join('a', '..', 'b') return on POSIX?", ["a/../b", "b", "/b", "a/b"], 1, "path.join concatenates segments and normalises the result, resolving '..' so the output is 'b'."],
    ["Which child_process function runs a command through a shell and buffers its whole output?", ["spawn", "fork", "exec", "execFileSync with stdio inherit"], 2, "exec launches a shell and collects stdout/stderr into buffers delivered to the callback; spawn streams output instead."],
  ],
  "Web Frameworks & APIs": [
    ["In Express, what must a middleware call to pass control to the next handler?", ["return true", "next()", "res.continue()", "app.pass()"], 1, "Middleware receives a next function; calling it moves to the next matching handler, while calling next(err) jumps to error handlers."],
    ["What is a common trade-off of stateless JWT authentication versus server sessions?", ["JWTs cannot carry user data", "JWTs require sticky sessions", "Revoking an issued JWT before it expires is harder", "Sessions cannot use cookies"], 2, "Because the server does not store JWTs, invalidating one early needs extra machinery like short expiries or a denylist."],
    ["Why validate request bodies with a schema library such as Zod or JSON Schema?", ["To reject malformed input early and get typed, trusted data", "To make responses smaller", "To replace authentication", "To enable HTTP/2"], 0, "Schema validation at the boundary stops bad data from reaching business logic and documents the expected shape."],
  ],
  "Data & Persistence": [
    ["Why use parameterised queries ($1, $2) with node-postgres?", ["They run queries in parallel", "They prevent SQL injection by sending values separately from SQL text", "They cache results automatically", "They are required for SELECT statements"], 1, "Parameters are passed apart from the query string, so user input is never interpreted as SQL."],
    ["What is a typical use of Redis in a Node API?", ["Replacing the file system", "Running TypeScript", "Caching frequently read data with an expiry time", "Serving static HTML"], 2, "Redis is an in-memory store that is commonly used as a fast cache with TTLs in front of a slower database."],
    ["Where should database credentials for a deployed Node app usually live?", ["Hard-coded in source", "In environment variables or a secret manager", "In package.json", "In client-side bundles"], 1, "Keeping secrets in the environment or a secret store separates configuration from code and avoids committing them."],
  ],
  "Testing & Quality": [
    ["How do you use Node's built-in test runner?", ["Import from 'node:test' and run node --test", "Install mocha globally", "Use npm audit", "Call process.test()"], 0, "Modern Node ships node:test with describe/it/test helpers and a --test flag that discovers and runs test files."],
    ["What does an API integration test usually verify that a unit test does not?", ["Pure function output", "That routes, middleware and data layer work together over HTTP", "Code formatting", "Type correctness"], 1, "Integration tests exercise the real request pipeline, often with a test database, to catch wiring issues between components."],
    ["What is the difference between a linter and a formatter?", ["There is none", "Linters only work on TypeScript", "Linters flag likely bugs and bad patterns; formatters only rewrite layout", "Formatters find unused variables"], 2, "ESLint-style linters analyse code semantics for problems, while tools like Prettier just enforce consistent style."],
  ],
  "Performance & Scaling": [
    ["When are worker_threads the right tool?", ["For waiting on many network requests", "For CPU-heavy work that would otherwise block the event loop", "For reading environment variables", "For serving static files"], 1, "I/O is already non-blocking; workers help by moving CPU-bound computation off the main thread."],
    ["What does the cluster module (or a process manager like PM2) provide?", ["Multiple processes sharing a port to use several CPU cores", "Automatic TypeScript compilation", "Database replication", "A built-in CDN"], 0, "A single Node process uses one core for JavaScript; clustering forks workers so all cores can handle requests."],
    ["What should graceful shutdown do on SIGTERM?", ["Exit immediately with code 0", "Ignore the signal", "Delete log files", "Stop accepting new connections, finish in-flight work, close resources, then exit"], 3, "Draining requests and closing database pools before exit avoids dropped requests during deploys and restarts."],
  ],
  "Production & Security": [
    ["What does npm audit check?", ["Code style", "Known vulnerabilities in installed dependency versions", "Unused exports", "Test coverage"], 1, "npm audit compares your dependency tree against a vulnerability database and suggests fixed versions."],
    ["Why run a Node container as a non-root user?", ["It makes images smaller", "Node refuses to run as root", "It limits damage if the application is compromised", "It improves startup time"], 2, "Dropping root privileges reduces what an attacker can do from inside a compromised process."],
    ["Which practice hardens an Express HTTP service?", ["Setting security headers, rate limiting and validating input", "Exposing stack traces to clients", "Disabling HTTPS", "Logging passwords for debugging"], 0, "Headers (e.g. via helmet), rate limits and strict validation close common attack vectors; leaking internals does the opposite."],
  ],
})

const typescript = build({
  "Getting Started": [
    ["What does the tsc compiler output by default?", ["Native machine code", "JavaScript files with types removed", "WebAssembly", "Bytecode for a TypeScript VM"], 1, "tsc type-checks the source and emits plain JavaScript, erasing all type annotations."],
    ["Given `let count = 5`, what type does TypeScript infer?", ["any", "5", "unknown", "number"], 3, "A mutable let binding is widened to number; a const would get the literal type 5."],
    ["What is the main benefit TypeScript brings to a JavaScript codebase?", ["Faster runtime execution", "Catching type errors before code runs and better editor tooling", "Automatic memory management", "Removing the need for tests"], 1, "Static types surface mistakes at compile time and power autocomplete and safe refactoring."],
  ],
  "Everyday Types": [
    ["How does `unknown` differ from `any`?", ["They are identical", "unknown cannot hold objects", "unknown must be narrowed before you can use its value; any disables checking", "any is safer than unknown"], 2, "unknown is the type-safe top type: you must check what it is before operating on it."],
    ["What type does [string, number] describe?", ["An array of strings or numbers in any order", "A tuple with a string at index 0 and a number at index 1", "An object with string keys", "A union of string and number"], 1, "Tuple types fix the length and the type at each position."],
    ["Which feature can interfaces do that type aliases cannot?", ["Declaration merging across multiple declarations", "Describe union types", "Describe object shapes", "Use generics"], 0, "Two interface declarations with the same name merge; type aliases cannot be reopened, though they can express unions."],
  ],
  "Functions & Narrowing": [
    ["What makes a union a discriminated union?", ["Every member shares a literal-typed property, such as kind, used to tell them apart", "It contains only primitives", "It is declared with the enum keyword", "It has exactly two members"], 0, "Checking the shared literal tag lets the compiler narrow to the exact member in each branch."],
    ["What does the return type `value is string` declare?", ["The function returns a string", "The function throws for non-strings", "A type predicate: a true result narrows value to string", "The parameter is optional"], 2, "User-defined type guards use predicates so callers get narrowing after an if check."],
    ["How are function overloads written in TypeScript?", ["Several full implementations with different bodies", "Multiple signature declarations followed by one compatible implementation", "Using the overload keyword", "They are not supported"], 1, "Overload signatures describe the call shapes; a single implementation signature handles all of them."],
  ],
  "Classes & Modules": [
    ["What does a `private` modifier on a class field guarantee?", ["The field is hidden at runtime in all cases", "Access from outside the class is a compile-time error", "The field is read-only", "The field is static"], 1, "TypeScript private is enforced by the compiler; for runtime privacy use JavaScript #private fields."],
    ["What is a .d.ts file for?", ["Storing test data", "Running decorators", "Bundling CSS", "Describing the types of JavaScript code without implementations"], 3, "Declaration files supply type information for libraries or modules written in plain JavaScript."],
    ["Why write `import type { User } from './user'`?", ["It loads the module faster at runtime", "It guarantees the import is erased from emitted JavaScript", "It makes User optional", "It is required for classes"], 1, "Type-only imports are always removed, avoiding unintended side effects or circular runtime imports."],
  ],
  "Generics": [
    ["What does `<T extends { id: string }>` mean?", ["T must have at least an id property of type string", "T is exactly { id: string }", "T extends a class named id", "T is optional"], 0, "A constraint restricts which types may be passed, allowing safe access to the id property inside."],
    ["Given `type K = keyof { a: 1; b: 2 }`, what is K?", ["string", "'a' | 'b'", "1 | 2", "{ a: 1; b: 2 }"], 1, "keyof produces a union of the property names of an object type."],
    ["What does Pick<User, 'id' | 'name'> produce?", ["User without id and name", "An array of ids and names", "A type with only the id and name properties of User", "A readonly User"], 2, "Pick selects the listed keys; Omit is the inverse."],
  ],
  "Type-Level Programming": [
    ["What does `T extends string ? 'yes' : 'no'` evaluate to when T is number?", ["'yes'", "never", "'yes' | 'no'", "'no'"], 3, "Conditional types pick a branch based on assignability; number is not assignable to string."],
    ["What is the infer keyword used for?", ["Declaring a type variable inside a conditional type to capture part of a matched type", "Enabling type inference globally", "Inferring runtime values", "Making properties optional"], 0, "infer extracts pieces, e.g. the return type of a function type, within the extends clause."],
    ["What is a branded type such as `string & { __brand: 'UserId' }` for?", ["Making strings faster", "Preventing structurally identical values from being mixed up", "Encrypting values", "Allowing any string"], 1, "Brands give nominal-style distinctness so a plain string cannot be passed where a UserId is required."],
  ],
  "Configuration & Tooling": [
    ["Which tsconfig option turns on a family of stricter checks such as strictNullChecks?", ["noEmit", "esModuleInterop", "strict", "skipLibCheck"], 2, "strict: true enables several checks at once, including strictNullChecks and noImplicitAny."],
    ["What do fast transpilers such as esbuild or SWC skip compared with tsc?", ["Type checking", "Emitting JavaScript", "Parsing syntax", "Handling JSX"], 0, "They strip types without checking them, so tsc --noEmit is still run separately for type errors."],
    ["Why add runtime validation (e.g. Zod) even in a fully typed project?", ["TypeScript types are slow", "Types do not exist at runtime, so external data must still be checked", "tsc requires it", "It replaces tsconfig"], 1, "Data from APIs, users or files is untyped at runtime; validation confirms it matches the declared types."],
  ],
  "TypeScript in Practice": [
    ["How are a React component's props typically typed?", ["With a PropTypes import only", "They cannot be typed", "As any", "With an interface or type alias for the props object"], 3, "Declaring a props type lets the compiler check every usage of the component."],
    ["What is a sensible first step when migrating a JavaScript project to TypeScript?", ["Rewrite everything at once in strict mode", "Enable allowJs and convert files incrementally", "Delete the tests", "Turn off all checks permanently"], 1, "allowJs lets JS and TS coexist so files can be converted gradually, tightening settings over time."],
    ["What does a type test (e.g. with expectTypeOf or tsd) verify?", ["Runtime performance", "That public types resolve to what you expect", "Code coverage", "Bundle size"], 1, "Type tests guard a library's type definitions against regressions at compile time."],
  ],
})

const golang = build({
  "Getting Started": [
    ["What does gofmt do?", ["Compiles code", "Rewrites source into the standard Go formatting", "Downloads dependencies", "Runs tests"], 1, "gofmt enforces one canonical layout, ending style debates in Go codebases."],
    ["How is an identifier exported from a Go package?", ["With the export keyword", "By listing it in go.mod", "By starting its name with an uppercase letter", "By placing it in main.go"], 2, "Capitalised identifiers are visible to other packages; lowercase ones stay package-private."],
    ["What is the zero value of an uninitialised int variable in Go?", ["0", "nil", "undefined", "A random value"], 0, "Every Go type has a zero value; for numeric types it is 0, so variables are never uninitialised."],
  ],
  "Language Fundamentals": [
    ["What happens when you append to a slice whose length equals its capacity?", ["A panic occurs", "A new, larger backing array is allocated and elements are copied", "The value is silently dropped", "The slice becomes a map"], 1, "append grows capacity by allocating a new array when needed, which is why you must use its return value."],
    ["Which loop keyword(s) does Go provide?", ["for, while and do", "while only", "loop", "for only, which covers all loop forms"], 3, "Go has a single for statement that can act as a classic, condition-only, infinite or range loop."],
    ["What does ranging over a string yield?", ["Bytes", "Byte index and rune (Unicode code point)", "Words", "Lines"], 1, "for i, r := range s decodes UTF-8 and returns the byte offset and rune at each position."],
  ],
  "Types & Errors": [
    ["How does a type satisfy an interface in Go?", ["By implementing all its methods; no declaration is needed", "With the implements keyword", "By embedding the interface name", "By registering it at init"], 0, "Interfaces are satisfied implicitly, which decouples packages that define and implement them."],
    ["What does errors.Is(err, target) check?", ["Whether err is nil", "Whether err's message contains target", "Whether target appears anywhere in err's wrap chain", "Whether err is a panic"], 2, "errors.Is unwraps errors created with %w and compares each against the target."],
    ["When is panic appropriate in Go?", ["For every expected error", "For truly unrecoverable programmer errors or impossible states", "To return from functions early", "To log messages"], 1, "Ordinary failures are returned as error values; panic is reserved for exceptional, unrecoverable situations."],
  ],
  "Modules & Tooling": [
    ["What does go mod tidy do?", ["Formats code", "Adds missing and removes unused module requirements", "Deletes the vendor directory", "Upgrades Go itself"], 1, "tidy syncs go.mod and go.sum with the imports actually used by the code."],
    ["How do you build a Linux binary from macOS?", ["It is impossible", "Install Docker", "Set GOOS=linux (and GOARCH) when running go build", "Use go run --linux"], 2, "Go cross-compiles natively by setting the target OS and architecture environment variables."],
    ["What does go vet report?", ["Suspicious constructs like bad Printf format verbs", "Slow functions", "Outdated modules", "Test failures"], 0, "vet performs static checks for likely bugs that compile successfully but are probably wrong."],
  ],
  "Concurrency": [
    ["What happens when sending on an unbuffered channel with no ready receiver?", ["The value is dropped", "The program panics", "The send succeeds immediately", "The sender blocks until a receiver is ready"], 3, "Unbuffered channels synchronise sender and receiver at the moment of transfer."],
    ["What is context.Context primarily used for?", ["Carrying cancellation, deadlines and request-scoped values across calls", "Storing global configuration", "Replacing mutexes", "Allocating goroutines"], 0, "Contexts propagate cancellation signals so goroutines can stop work when a request ends."],
    ["How do you enable the race detector?", ["go vet -race", "Pass -race to go test or go run", "Set GORACE=off", "It is always on"], 1, "The -race flag instruments memory accesses and reports concurrent unsynchronised use at runtime."],
  ],
  "Standard Library": [
    ["How does encoding/json choose the JSON key for a struct field?", ["Always the lowercase field name", "Random order", "From a struct tag like `json:\"name\"`, otherwise the field name", "From a separate schema file"], 2, "Struct tags control names and options such as omitempty; only exported fields are encoded."],
    ["Why should you set a Timeout on an http.Client?", ["The default client has no timeout and can hang forever", "It enables HTTP/3", "It is required to send headers", "It compresses responses"], 0, "http.DefaultClient waits indefinitely, so production clients should configure explicit timeouts."],
    ["What does bufio.Scanner help with?", ["Encrypting files", "Reading input efficiently line by line or token by token", "Parsing JSON", "Making HTTP requests"], 1, "Scanner wraps an io.Reader with buffering and splits input into lines or words."],
  ],
  "Building Services": [
    ["Why should a sql.DB usually be created once and shared?", ["It represents a connection pool safe for concurrent use", "Opening it is free", "It can only run one query", "It must be closed after each query"], 0, "sql.DB manages a pool of connections internally and is meant to be long-lived."],
    ["What does sqlc do?", ["Generates type-safe Go code from SQL queries", "Runs migrations automatically", "Replaces database/sql", "Provides an ORM with lazy loading"], 0, "sqlc reads your SQL and schema and generates Go functions and structs that match them."],
    ["What does gRPC use to define service contracts?", ["OpenAPI YAML", "Protocol Buffers .proto files", "GraphQL schemas", "Go interfaces only"], 1, "Services and messages are declared in .proto files, from which client and server code is generated."],
  ],
  "Testing & Performance": [
    ["What is a table-driven test?", ["A test that reads from a database table", "A loop over a slice of input/expected cases, often with t.Run subtests", "A benchmark", "A test generated by a tool"], 1, "Defining cases as data keeps tests concise and makes adding new cases trivial."],
    ["Which package helps test HTTP handlers without a real server?", ["net/http/httptest", "testing/quick", "net/rpc", "os/exec"], 0, "httptest provides ResponseRecorder and test servers for exercising handlers in-process."],
    ["What does escape analysis decide?", ["Which goroutines to kill", "Whether a value can live on the stack or must be allocated on the heap", "Which imports to remove", "How to format strings"], 1, "Values that outlive their function escape to the heap; reducing escapes lowers GC pressure."],
  ],
  "Production Go": [
    ["Why can Go services often ship in scratch or distroless images?", ["Go cannot run in containers otherwise", "Go binaries can be statically linked with no runtime dependencies", "Distroless includes the Go compiler", "Scratch images are larger"], 1, "A static binary (e.g. CGO_ENABLED=0) needs no shell or libraries, giving tiny, low-attack-surface images."],
    ["How does a Go program typically react to SIGTERM for graceful shutdown?", ["It cannot catch signals", "Calls os.Exit(1) immediately", "Uses signal.NotifyContext and calls server.Shutdown to drain connections", "Restarts itself"], 2, "Catching the signal and calling Shutdown lets in-flight requests finish before exit."],
    ["Which tool scans Go dependencies for known vulnerabilities affecting your code?", ["gofmt", "govulncheck", "go generate", "pprof"], 1, "govulncheck checks the vulnerability database and reports issues in functions you actually call."],
  ],
})

const java = build({
  "Java Basics": [
    ["Why should Strings be compared with equals() rather than ==?", ["== compares references, not contents", "equals() is faster", "== does not compile for Strings", "They are always identical"], 0, "== checks whether two references point to the same object; equals() compares the characters."],
    ["What is the default value of an int field in a Java class?", ["null", "0", "-1", "Undefined; it must be assigned"], 1, "Fields get default values (0 for int), although local variables must be assigned before use."],
    ["What happens when you access index 5 of an array of length 5?", ["It returns null", "It returns 0", "An ArrayIndexOutOfBoundsException is thrown", "The array grows"], 2, "Valid indexes are 0 to length-1, and Java checks bounds at runtime."],
  ],
  "Object-Oriented Java": [
    ["If you override equals(), what else must you override?", ["toString()", "finalize()", "clone()", "hashCode()"], 3, "Equal objects must have equal hash codes, or hash-based collections like HashMap will misbehave."],
    ["What is a Java record?", ["A mutable JavaBean", "A concise, immutable data carrier with generated accessors, equals and hashCode", "A database row", "An abstract class"], 1, "Records declare their components once and the compiler generates the boilerplate."],
    ["What is runtime polymorphism?", ["Calling an overridden method through a superclass reference invokes the subclass version", "Having two methods with the same name and different parameters", "Casting primitives", "Using generics"], 0, "Dynamic dispatch picks the implementation based on the actual object type at runtime."],
  ],
  "Core APIs": [
    ["What is the key difference between checked and unchecked exceptions?", ["Unchecked exceptions cannot be caught", "Checked exceptions must be caught or declared with throws", "Checked exceptions are faster", "Unchecked exceptions extend Exception directly"], 1, "The compiler enforces handling of checked exceptions; RuntimeException subclasses are exempt."],
    ["Stream operations like map and filter are lazy. What triggers execution?", ["Creating the stream", "Calling filter", "A terminal operation such as collect or forEach", "Garbage collection"], 2, "Intermediate operations build a pipeline that only runs when a terminal operation is invoked."],
    ["What is Optional mainly intended for?", ["Method return types that may have no value", "Every field in an entity", "Replacing all null checks in parameters", "Serialising objects"], 0, "Optional makes absence explicit in return values; using it for fields or parameters is discouraged."],
  ],
  "Build Tools & Ecosystem": [
    ["What file describes a Maven project?", ["build.gradle", "pom.xml", "package.json", "settings.ini"], 1, "Maven reads its project object model, dependencies and plugins from pom.xml."],
    ["What does module-info.java define?", ["Logging configuration", "Unit tests", "A module's name, its required modules and its exported packages", "IDE settings"], 2, "The Java Platform Module System uses module-info.java to declare explicit dependencies and encapsulation."],
    ["Why log through SLF4J rather than a specific logging library?", ["SLF4J is a facade, letting the backend (Logback, Log4j2) be swapped without code changes", "SLF4J writes to databases only", "It removes the need for log levels", "It is built into the JDK"], 0, "Coding against the facade decouples application code from the concrete logging implementation."],
  ],
  "Testing": [
    ["Which annotation marks a test method in JUnit 5?", ["@Run", "@TestCase", "@Check", "@Test"], 3, "JUnit Jupiter uses org.junit.jupiter.api.Test to identify test methods."],
    ["What does Mockito's when(...).thenReturn(...) do?", ["Stubs a mock so a call returns a chosen value", "Verifies a method was called", "Creates a real database", "Asserts equality"], 0, "Stubbing defines canned responses for mock collaborators during a test."],
    ["What does Testcontainers provide?", ["A mocking framework", "Throwaway Docker containers (e.g. a real database) for integration tests", "A code coverage tool", "A build tool"], 1, "Tests run against real services in disposable containers, increasing confidence over in-memory fakes."],
  ],
  "Concurrency": [
    ["What does the volatile keyword guarantee?", ["Atomic increments", "Mutual exclusion", "Writes to the variable are visible to other threads", "The variable is immutable"], 2, "volatile provides visibility and ordering, but compound operations like count++ still need synchronisation or atomics."],
    ["Why use an ExecutorService instead of creating a new Thread per task?", ["Threads cannot run tasks", "It reuses a pool of threads and manages task submission", "It makes tasks synchronous", "It avoids exceptions"], 1, "Pools amortise thread creation cost and bound concurrency."],
    ["What makes virtual threads (Java 21) useful?", ["They are cheap enough to run very large numbers of blocking tasks", "They run on the GPU", "They remove the need for locks", "They make CPU-bound code faster"], 0, "Virtual threads are scheduled by the JVM onto few carrier threads, ideal for high-concurrency I/O."],
  ],
  "Data Access": [
    ["Why prefer PreparedStatement over building SQL strings in JDBC?", ["It prevents SQL injection and can be reused efficiently", "It is required for SELECT", "It caches all rows", "It avoids transactions"], 0, "Bound parameters keep data separate from SQL and allow precompiled statements."],
    ["What is the N+1 query problem in JPA?", ["Having more than one entity", "Loading a list, then issuing a separate query for each item's lazy association", "Using too many indexes", "A primary key collision"], 1, "Lazy associations accessed in a loop trigger one extra query per row; fetch joins or entity graphs fix it."],
    ["What do Flyway or Liquibase manage?", ["Connection pools", "Versioned database schema migrations", "ORM caching", "Query logging"], 1, "They apply ordered, tracked migration scripts so every environment has the same schema."],
  ],
  "Spring & Web Services": [
    ["Why is constructor injection generally preferred in Spring?", ["It allows final fields and makes dependencies explicit and testable", "Field injection is not supported", "It is the only way to use @Autowired", "It speeds up startup"], 0, "Constructor injection gives immutable, fully initialised beans that are easy to construct in tests."],
    ["What does @RestController combine?", ["@Service and @Repository", "@Controller and @ResponseBody", "@Entity and @Table", "@Configuration and @Bean"], 1, "Return values from its handler methods are written directly to the response body, usually as JSON."],
    ["What does Spring Data JPA generate from a method named findByEmail?", ["Nothing; you must write SQL", "A REST endpoint", "A query selecting entities whose email matches the argument", "A database index"], 2, "Derived query methods are parsed from their names into JPA queries automatically."],
  ],
  "JVM Internals & Performance": [
    ["What does the JIT compiler do?", ["Compiles Java source to bytecode", "Compiles frequently executed bytecode to optimised native code at runtime", "Runs garbage collection", "Loads classes from JARs"], 1, "HotSpot profiles running code and compiles hot paths to machine code."],
    ["What is the generational hypothesis behind most JVM collectors?", ["Most objects die young", "Old objects are collected first", "All objects live equally long", "Objects never move"], 0, "Because most allocations are short-lived, collecting the young generation frequently is cheap and effective."],
    ["What does GraalVM native-image produce?", ["A JAR file", "A Docker image", "A standalone native executable with fast startup", "A bytecode verifier"], 2, "Ahead-of-time compilation yields a binary with low startup time and memory, at the cost of some dynamic features."],
  ],
})

const docker = build({
  "Container Foundations": [
    ["How do containers differ from virtual machines?", ["Containers share the host kernel; VMs each run their own kernel", "Containers include a hypervisor", "VMs start faster", "Containers cannot run Linux"], 0, "Containers are isolated processes on a shared kernel, which makes them lighter than full VMs."],
    ["Which Linux feature limits a container's CPU and memory?", ["Namespaces", "cgroups", "iptables", "SELinux"], 1, "Control groups enforce resource limits, while namespaces provide isolation of views like PID and network."],
    ["In Docker's architecture, what does the CLI talk to?", ["The registry directly", "The kernel directly", "The Docker daemon (dockerd) via its API", "Kubernetes"], 2, "The docker client sends API requests to the daemon, which builds images and manages containers."],
  ],
  "Working with Containers": [
    ["What does docker run -d do?", ["Deletes the container on exit", "Runs the container in the background (detached)", "Enables debug logs", "Disables networking"], 1, "-d detaches the container from your terminal; use --rm to remove it on exit."],
    ["How do you open a shell inside a running container?", ["docker attach --shell", "docker start -it", "docker run sh", "docker exec -it <container> sh"], 3, "docker exec runs an additional process inside an existing container."],
    ["What does docker system prune remove by default?", ["Stopped containers, unused networks, dangling images and build cache", "All volumes", "Running containers", "The Docker installation"], 0, "Prune reclaims space from unused objects; volumes are only removed with --volumes."],
  ],
  "Building Images": [
    ["Why copy package manifests and install dependencies before copying the rest of the source?", ["Docker requires that order", "It reduces image security", "So dependency layers stay cached when only source files change", "It makes containers start faster"], 2, "Layers are cached until an input changes, so ordering rarely changing steps first speeds rebuilds."],
    ["What is the difference between CMD and ENTRYPOINT?", ["ENTRYPOINT sets the main executable; CMD provides default arguments that are easy to override", "CMD runs at build time", "They are identical", "ENTRYPOINT sets environment variables"], 0, "Combined, ENTRYPOINT fixes the program and CMD supplies overridable defaults."],
    ["What does a .dockerignore file do?", ["Ignores failing instructions", "Excludes files from the build context sent to the builder", "Hides containers from docker ps", "Disables caching"], 1, "Excluding node_modules, .git and secrets keeps builds fast and avoids leaking files into images."],
  ],
  "Storage & Networking": [
    ["What is the main difference between a named volume and a bind mount?", ["Volumes are managed by Docker; bind mounts map a specific host path", "Bind mounts are faster always", "Volumes are deleted when the container stops", "There is no difference"], 0, "Named volumes live in Docker-managed storage, while bind mounts expose an exact host directory."],
    ["On a user-defined bridge network, how can containers reach each other?", ["Only by IP address", "By container name via built-in DNS", "They cannot", "Through the host's public IP"], 1, "User-defined bridges provide automatic name resolution between attached containers."],
    ["What does -p 8080:80 do?", ["Maps container port 8080 to host port 80", "Opens port 80 on all containers", "Publishes container port 80 on host port 8080", "Sets the container's PID"], 2, "The format is host:container, so traffic to host port 8080 reaches port 80 inside the container."],
  ],
  "Docker Compose": [
    ["What does depends_on with condition: service_healthy ensure?", ["A service starts only after its dependency passes its health check", "Services start in alphabetical order", "Services share a volume", "Failed services restart"], 0, "Plain depends_on only orders startup; the healthy condition waits for the dependency's healthcheck."],
    ["What are Compose profiles used for?", ["Setting CPU limits", "Optionally enabling groups of services, such as debug tools", "Choosing a base image", "Encrypting environment files"], 1, "Services assigned to a profile only start when that profile is activated."],
    ["What does Compose Watch do?", ["Monitors container CPU usage", "Watches Docker Hub for new images", "Syncs or rebuilds services automatically when source files change", "Restarts crashed containers"], 2, "docker compose watch updates running services on file changes for a fast development loop."],
  ],
  "Advanced Image Building": [
    ["What is the main benefit of a multi-stage build?", ["Builds run on multiple machines", "Build tools stay in early stages and only artifacts are copied into a small final image", "Images support multiple tags", "It disables caching"], 1, "COPY --from lets the final stage contain just what is needed to run."],
    ["Which BuildKit feature lets a build use a secret without baking it into a layer?", ["ARG", "ENV", "RUN --mount=type=secret", "LABEL"], 2, "Secret mounts expose the value only during that RUN step and never persist it in the image."],
    ["How do you build an image for both amd64 and arm64?", ["docker buildx build --platform linux/amd64,linux/arm64", "Build twice and rename", "Use docker run --arch", "It is not possible"], 0, "buildx produces a multi-platform manifest list so each host pulls the right variant."],
  ],
  "Registries & Distribution": [
    ["Why avoid relying on the latest tag in production?", ["It is not allowed", "It points to whatever was pushed last, so deployments are not reproducible", "It is slower to pull", "It only works on Docker Hub"], 1, "Pin explicit version tags or digests so you know exactly what is running."],
    ["What uniquely and immutably identifies an image's content?", ["Its tag", "Its name", "Its sha256 digest", "Its creation date"], 2, "Tags can be moved; a digest is a content hash that always refers to the same image."],
    ["What do you need to do before pushing to a private registry?", ["Authenticate with docker login and tag the image with the registry host", "Nothing", "Convert the image to a tarball", "Run docker swarm init"], 0, "Image names include the registry host, and pushing requires credentials."],
  ],
  "Security": [
    ["Which Dockerfile instruction makes the container run as a non-root user?", ["RUN chmod", "USER", "WORKDIR", "EXPOSE"], 1, "USER sets the identity for subsequent instructions and the running process."],
    ["Why should secrets not be passed with ENV in a Dockerfile?", ["ENV values are persisted in image metadata and visible to anyone with the image", "ENV is deprecated", "ENV values are encrypted", "ENV only works at runtime"], 0, "Values baked into the image can be read with docker inspect or history."],
    ["What does running a container with --read-only and --cap-drop ALL achieve?", ["Faster startup", "More network bandwidth", "A reduced attack surface by preventing filesystem writes and removing kernel capabilities", "Automatic image scanning"], 2, "Minimising writable paths and privileges limits what a compromised process can do."],
  ],
  "Beyond a Single Host": [
    ["What does docker run --memory 512m do?", ["Reserves 512 MB of disk", "Caps the container's memory; exceeding it can get the process OOM-killed", "Allocates swap only", "Sets the JVM heap"], 1, "Memory limits are enforced via cgroups, so the kernel kills the process if it goes beyond the limit."],
    ["What is a notable feature of Podman compared with Docker?", ["It requires a central daemon", "It runs without a daemon and supports rootless containers natively", "It cannot run OCI images", "It only works on Windows"], 1, "Podman is daemonless and largely CLI-compatible with Docker."],
    ["What is Docker Swarm?", ["Docker's built-in orchestrator for running services across a cluster of hosts", "A registry", "A logging driver", "An image scanner"], 0, "Swarm mode groups Docker hosts and schedules replicated services across them."],
  ],
})

const kubernetes = build({
  "Getting Started": [
    ["Which control-plane component stores all cluster state?", ["kubelet", "etcd", "kube-proxy", "CoreDNS"], 1, "etcd is the consistent key-value store behind the API server."],
    ["What is the role of the kubelet?", ["Scheduling pods to nodes", "Serving the API", "Running on each node and ensuring the containers for its pods are running", "Storing secrets"], 2, "The kubelet watches pods assigned to its node and drives the container runtime."],
    ["What does kubectl apply -f deployment.yaml do?", ["Creates or updates resources to match the declared manifest", "Deletes the resources", "Only validates the YAML", "Builds a container image"], 0, "apply is declarative: Kubernetes reconciles live objects toward the desired state in the file."],
  ],
  "Core Workloads": [
    ["When should you use a StatefulSet instead of a Deployment?", ["For stateless web servers", "When pods need stable identities and per-pod persistent storage", "For one-off batch tasks", "To run one pod per node"], 1, "StatefulSets give ordered, stable names and volume claims, suited to databases."],
    ["What does a DaemonSet guarantee?", ["A single pod in the cluster", "Pods run on a schedule", "A copy of the pod runs on every (or selected) node", "Pods never restart"], 2, "DaemonSets are used for node agents such as log collectors and monitoring exporters."],
    ["How does a Deployment know which pods it manages?", ["Through its label selector matching pod labels", "By pod name prefix only", "Through namespaces", "By container image"], 0, "Labels and selectors are the core grouping mechanism linking controllers and Services to pods."],
  ],
  "Networking": [
    ["What does a ClusterIP Service provide?", ["A public load balancer", "A stable virtual IP and DNS name that load-balances to matching pods", "Node-level firewall rules", "TLS certificates"], 1, "Services give a fixed endpoint in front of pods whose IPs change."],
    ["What is required for Ingress resources to have any effect?", ["A running ingress controller", "A StatefulSet", "A NetworkPolicy", "Nothing else"], 0, "Ingress objects are just rules; a controller like ingress-nginx implements them."],
    ["By default, without any NetworkPolicy, how can pods communicate?", ["Not at all", "Only within the same node", "Every pod can reach every other pod", "Only through Ingress"], 2, "The network is flat by default; NetworkPolicies (enforced by the CNI) restrict traffic."],
  ],
  "Configuration & Storage": [
    ["How are Kubernetes Secrets stored by default?", ["Encrypted with a per-pod key", "Base64-encoded, not encrypted unless encryption at rest is configured", "Hashed so they cannot be read", "Outside the cluster"], 1, "Base64 is just encoding; enable etcd encryption at rest and restrict RBAC access."],
    ["What does a PersistentVolumeClaim represent?", ["A pod's request for storage of a given size and access mode", "A node's disk", "A backup", "A ConfigMap"], 0, "PVCs bind to PersistentVolumes, which may be provisioned dynamically by a StorageClass."],
    ["Which is a valid way for a pod to consume a ConfigMap?", ["Only through the kubectl CLI", "Only as a sidecar", "It cannot", "As environment variables or as files in a mounted volume"], 3, "ConfigMaps decouple configuration from images and can be injected either way."],
  ],
  "Scheduling & Reliability": [
    ["What happens when a container exceeds its memory limit?", ["It is throttled", "It is OOM-killed and may be restarted", "The limit expands", "Nothing"], 1, "Exceeding a CPU limit causes throttling, but exceeding a memory limit gets the container killed."],
    ["What does a failing readiness probe do?", ["Restarts the container", "Deletes the pod", "Removes the pod from Service endpoints until it passes", "Scales the Deployment"], 2, "Readiness controls traffic; liveness failures trigger restarts."],
    ["What does a taint on a node do?", ["Repels pods that lack a matching toleration", "Attracts all pods", "Marks the node as faster", "Encrypts the node"], 0, "Taints and tolerations keep general workloads off specialised or dedicated nodes."],
  ],
  "Packaging & Delivery": [
    ["What is a Helm chart?", ["A monitoring dashboard", "A package of templated Kubernetes manifests with configurable values", "A container image", "A node pool"], 1, "Helm renders templates with values files and tracks releases for upgrades and rollbacks."],
    ["How does Kustomize customise manifests?", ["With overlays and patches over plain YAML, without templating", "With Go templates", "With a database", "By editing live objects"], 0, "Kustomize layers environment-specific patches on a shared base."],
    ["What is the core idea of GitOps tools like Argo CD or Flux?", ["Developers run kubectl from laptops", "A controller continuously syncs the cluster to the desired state stored in Git", "Images are built inside the cluster", "Manifests are stored in etcd only"], 1, "Git becomes the source of truth, and drift is detected and reconciled automatically."],
  ],
  "Security": [
    ["What does a RoleBinding do?", ["Grants a Role's permissions to users, groups or service accounts within a namespace", "Creates a new namespace", "Encrypts secrets", "Binds a pod to a node"], 0, "Roles define permissions; bindings attach them to subjects. ClusterRoleBindings apply cluster-wide."],
    ["Which Pod Security Standards level is the most locked down?", ["Privileged", "Baseline", "Restricted", "Default"], 2, "Restricted enforces hardening practices such as non-root users and dropped capabilities."],
    ["What do policy engines such as Kyverno or OPA Gatekeeper do?", ["Schedule pods", "Validate or mutate resources at admission time based on custom rules", "Collect metrics", "Replace RBAC"], 1, "They act as admission controllers that enforce organisational policies on incoming objects."],
  ],
  "Observability & Operations": [
    ["How does Prometheus usually collect metrics?", ["Applications push to it via email", "It scrapes HTTP metrics endpoints on a schedule", "It reads etcd directly", "It parses log files"], 1, "Prometheus pulls metrics from targets discovered through the Kubernetes API."],
    ["A pod is in CrashLoopBackOff. Which command shows output from the previous crashed container?", ["kubectl logs <pod> --previous", "kubectl get nodes", "kubectl apply", "kubectl top"], 0, "--previous retrieves logs from the last terminated instance, often revealing the crash cause."],
    ["What does a tool like Velero help with?", ["Autoscaling", "Ingress routing", "Backing up and restoring cluster resources and volumes", "Building images"], 2, "Velero snapshots objects and persistent data for disaster recovery and migrations."],
  ],
  "Extending Kubernetes": [
    ["What does a CustomResourceDefinition (CRD) add?", ["A new node", "A new resource type to the Kubernetes API", "A new container runtime", "A new namespace"], 1, "CRDs let you store and manage your own object kinds through the standard API."],
    ["What is an operator?", ["A human administrator", "A kubectl plugin", "A controller that encodes operational knowledge to manage an application via custom resources", "A type of node"], 2, "Operators run a reconcile loop that drives complex apps toward the state described in their CRs."],
    ["What does a service mesh such as Istio or Linkerd typically add?", ["mTLS, traffic shaping and telemetry between services, often via sidecar proxies", "Persistent storage", "Container builds", "Cluster backups"], 0, "Meshes handle service-to-service security and observability without changing application code."],
  ],
})

const quizzes: Record<string, Record<string, Question[]>> = { nodejs, typescript, golang, java, docker, kubernetes }

export default quizzes
