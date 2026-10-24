import { build, type Question } from './quizBuild'

const machineLearning = build({
  'Programming Foundations': [
    ["Why are NumPy array operations usually much faster than equivalent Python for-loops?", ["They run on the GPU by default", "They execute vectorised loops in compiled C code over contiguous memory", "They skip floating-point precision", "They cache results between runs"], 1, "NumPy pushes the loop into optimised compiled code operating on typed, contiguous buffers, avoiding per-element Python interpreter overhead."],
    ["In pandas, what does `df.groupby('city')['sales'].mean()` return?", ["The overall mean of sales", "A DataFrame sorted by city", "The average sales value for each city", "The number of rows per city"], 2, "groupby splits rows by key, then the aggregation is applied to each group, giving one mean per city."],
    ["What is a common pitfall of Jupyter notebooks?", ["They cannot display charts", "They only support R", "Running cells out of order can leave hidden state that makes results irreproducible", "They cannot import third-party libraries"], 2, "Notebook kernels keep state between cells, so executing cells non-linearly can produce results that a fresh top-to-bottom run would not."],
  ],
  Mathematics: [
    ["In gradient descent, which direction is a parameter updated?", ["Opposite to the gradient of the loss", "Along the gradient of the loss", "Perpendicular to the gradient", "Randomly, regardless of the gradient"], 0, "The gradient points toward steepest increase, so stepping against it reduces the loss."],
    ["What does multiplying a 3x4 matrix by a 4x2 matrix produce?", ["A 4x4 matrix", "A 3x2 matrix", "A 2x3 matrix", "It is undefined"], 1, "Inner dimensions (4 and 4) must match, and the result takes the outer dimensions: 3 rows by 2 columns."],
    ["Bayes' theorem lets you compute which quantity?", ["The variance of a sample", "The derivative of a probability", "A posterior probability from a prior and a likelihood", "The median of a distribution"], 2, "Bayes' rule updates a prior belief P(H) with evidence via P(E|H) to obtain P(H|E)."],
  ],
  'Classical Machine Learning': [
    ["Logistic regression is primarily used for which task?", ["Clustering unlabeled data", "Binary classification by modelling class probabilities", "Reducing dimensionality", "Predicting continuous house prices"], 1, "Despite its name, logistic regression passes a linear score through a sigmoid to output a probability for a class."],
    ["How does a random forest reduce overfitting compared with a single deep decision tree?", ["It prunes every tree to depth one", "It uses only linear splits", "It averages many trees trained on bootstrapped samples and random feature subsets", "It removes all categorical features"], 2, "Bagging plus feature randomness decorrelates the trees, so averaging them lowers variance."],
    ["Which algorithm is an example of unsupervised learning?", ["k-means clustering", "Linear regression", "Gradient-boosted classifier", "Support vector classifier"], 0, "k-means groups points by similarity without using any target labels."],
  ],
  'Model Evaluation': [
    ["For a fraud model where missing fraud is very costly, which metric deserves the most attention?", ["Accuracy", "Recall", "Training loss", "R-squared"], 1, "Recall measures the share of actual positives caught; with rare, costly positives, accuracy can look high while missing most fraud."],
    ["What does k-fold cross-validation provide?", ["A faster training loop", "A guarantee against data leakage", "A more stable estimate of generalisation by training and validating on k different splits", "A way to label data automatically"], 2, "Each fold serves once as validation, and averaging scores reduces dependence on a single lucky or unlucky split."],
    ["A model scores 99% on training data but 70% on validation data. What is the likely issue?", ["Underfitting", "High bias", "Overfitting", "Too little model capacity"], 2, "A large gap between training and validation performance indicates the model memorised training data (high variance)."],
  ],
  'Deep Learning': [
    ["What role does a non-linear activation function such as ReLU play in a neural network?", ["It normalises the input data", "It lets stacked layers represent non-linear functions", "It reduces the number of parameters", "It replaces the loss function"], 1, "Without non-linearities, any stack of linear layers collapses into a single linear transformation."],
    ["Why are convolutional layers well suited to images?", ["They ignore spatial structure", "They require no training", "They share small learned filters across positions, capturing local patterns efficiently", "They only work on grayscale images"], 2, "Weight sharing and local receptive fields exploit spatial structure with far fewer parameters than dense layers."],
    ["In PyTorch, what does `loss.backward()` do?", ["Computes gradients of the loss with respect to parameters", "Updates the weights directly", "Resets the optimizer", "Reverses the dataset order"], 0, "backward runs autograd to fill each parameter's .grad; the optimizer's step() then applies the update."],
  ],
  'Transformers & Modern AI': [
    ["What does self-attention allow each token in a transformer to do?", ["Only look at the previous token", "Weigh information from all other tokens in the sequence", "Skip the embedding layer", "Avoid positional information entirely"], 1, "Attention computes weighted combinations of every token's values based on query-key similarity."],
    ["What is the main benefit of parameter-efficient fine-tuning methods like LoRA?", ["They train only small added matrices, cutting memory and storage costs", "They make models larger", "They remove the need for any data", "They guarantee higher accuracy than full fine-tuning"], 0, "LoRA freezes base weights and learns low-rank updates, so far fewer parameters need gradients and storage."],
    ["Embeddings used for vector search are compared most commonly with which measure?", ["Edit distance", "Cosine similarity", "Hash equality", "Alphabetical order"], 1, "Semantically similar items map to nearby vectors, and cosine similarity measures the angle between them."],
  ],
  'Data & Experiment Management': [
    ["What is the main purpose of an experiment tracker such as MLflow or Weights & Biases?", ["To serve models in production", "To record parameters, metrics and artifacts for each run so results can be compared", "To label training data", "To replace version control for code"], 1, "Trackers log what was run and how it performed, making experiments comparable and reproducible."],
    ["Why version datasets as well as code?", ["Datasets never change", "Git handles large binaries efficiently", "A model is only reproducible if you know exactly which data it was trained on", "It speeds up training"], 2, "Tools like DVC tie data snapshots to commits, so a model can be traced back to its exact inputs."],
    ["What problem does a feature store mainly address?", ["Training-serving skew from computing features differently offline and online", "GPU shortage", "Choosing hyperparameters", "Writing unit tests"], 0, "A feature store provides consistent feature definitions and values for both training and low-latency serving."],
  ],
  'Deployment & MLOps': [
    ["When is batch inference generally preferable to real-time inference?", ["When predictions are needed within milliseconds of a user action", "When predictions can be precomputed on a schedule, such as nightly recommendations", "When the model is very small", "Never; real-time is always better"], 1, "Batch scoring is cheaper and simpler when results do not need to reflect the latest request instantly."],
    ["What is data drift?", ["A bug in the training loop", "Model weights changing over time", "The input data distribution in production shifting away from the training distribution", "Slow network requests"], 2, "When live inputs differ from what the model learned on, accuracy can degrade silently, so it must be monitored."],
    ["Which technique reduces model size and speeds inference by using lower-precision numbers?", ["Quantization", "Dropout", "Data augmentation", "Early stopping"], 0, "Quantization stores weights and activations in formats like int8, cutting memory and compute at a small accuracy cost."],
  ],
  'Responsible ML': [
    ["What do SHAP values help explain?", ["How much each feature contributed to a particular prediction", "How fast a model trains", "How large the dataset is", "Which GPU was used"], 0, "SHAP attributes a prediction to features based on Shapley values from cooperative game theory."],
    ["What is the purpose of a model card?", ["To store model weights", "To document a model's intended use, performance across groups, and limitations", "To license a dataset", "To speed up inference"], 1, "Model cards give users transparent information needed to judge whether a model fits their context."],
    ["Differential privacy protects individuals by doing what?", ["Encrypting the model file", "Deleting the training data after use", "Adding calibrated noise so outputs reveal little about any single record", "Training only on public data"], 2, "It bounds how much any one person's data can change results, limiting what can be inferred about them."],
  ],
})

const dataEngineer = build({
  'Core Programming': [
    ["What does a SQL window function like `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY ts)` do?", ["Collapses rows into one per user", "Numbers rows within each user's partition without collapsing them", "Deletes duplicate users", "Creates an index"], 1, "Window functions compute values across related rows while keeping every row in the result, unlike GROUP BY."],
    ["Which shell pipeline counts lines containing 'ERROR' in app.log?", ["cat app.log > ERROR", "grep ERROR app.log | wc -l", "ls ERROR app.log", "echo ERROR | app.log"], 1, "grep filters matching lines and wc -l counts them."],
    ["Why might a data engineer learn Scala or Java?", ["They are required for SQL", "Spark and Kafka are JVM-based, and some tooling and performance-critical jobs use those languages", "Python cannot read CSV files", "They replace orchestration tools"], 1, "Much of the big-data ecosystem runs on the JVM, so those languages help with native APIs and debugging."],
  ],
  'Databases & Storage': [
    ["Which workload describes OLAP?", ["Many small inserts and updates from an app", "Large analytical queries scanning and aggregating many rows", "Storing user sessions", "Serving images"], 1, "OLAP systems are optimised for aggregating large volumes of historical data, unlike transactional OLTP systems."],
    ["Why is Parquet popular for analytics?", ["It is human-readable", "Its columnar layout and compression let queries read only needed columns", "It supports only small files", "It enforces foreign keys"], 1, "Columnar storage with encoding and statistics minimises I/O for analytical scans."],
    ["What is object storage like Amazon S3 best described as?", ["A relational database", "Scalable storage for files addressed by key, often used as a data lake base", "An in-memory cache", "A message queue"], 1, "Object stores hold arbitrary blobs cheaply and durably, making them the foundation of most data lakes."],
  ],
  'Data Modelling & Warehousing': [
    ["In a star schema, what does a fact table typically contain?", ["Descriptive attributes like customer names", "Measurable events with foreign keys to dimensions", "Only primary keys", "Application logs"], 1, "Facts hold numeric measures of business events, while dimension tables describe the who, what, where and when."],
    ["What do lakehouse table formats such as Delta Lake or Apache Iceberg add on top of files in object storage?", ["ACID transactions, schema evolution and time travel", "A web UI only", "Automatic machine learning", "Faster network speeds"], 0, "These formats keep a transaction log or metadata layer so files behave like reliable database tables."],
    ["Why partition a large table by date?", ["It encrypts the data", "Queries filtering on date can skip irrelevant partitions", "It removes duplicates", "It is required for joins"], 1, "Partition pruning lets the engine read only the relevant slices, reducing cost and latency."],
  ],
  'Batch Processing': [
    ["What distinguishes ELT from ETL?", ["ELT never transforms data", "ELT loads raw data first and transforms it inside the warehouse", "ELT only works with streaming", "ELT requires no storage"], 1, "Modern cloud warehouses are powerful enough to transform data after loading, which keeps raw data available."],
    ["What is dbt primarily used for?", ["Ingesting data from APIs", "Transforming data in the warehouse with version-controlled, tested SQL models", "Streaming events", "Provisioning servers"], 1, "dbt compiles SQL models into tables and views, adding testing, documentation and dependency management."],
    ["What is the advantage of an incremental load?", ["It reprocesses the entire history every run", "It processes only new or changed records, saving time and compute", "It skips data validation", "It avoids needing a primary key"], 1, "Incremental models handle deltas, which is far cheaper than full refreshes for large tables."],
  ],
  Orchestration: [
    ["In Apache Airflow, what is a DAG?", ["A database table", "A directed acyclic graph of tasks and their dependencies", "A Python package manager", "A type of Spark cluster"], 1, "DAGs define which tasks run and in what order, with no cycles allowed."],
    ["What makes a pipeline task idempotent?", ["It runs only once ever", "Running it multiple times for the same input produces the same result", "It never fails", "It has no dependencies"], 1, "Idempotency means retries and backfills do not create duplicates or corrupt data."],
    ["How does Dagster differ conceptually from task-centric orchestrators?", ["It cannot schedule jobs", "It centres on software-defined assets, the data products pipelines produce", "It only runs on Windows", "It has no UI"], 1, "Dagster models the tables and files being produced, making lineage and freshness first-class."],
  ],
  Streaming: [
    ["In Kafka, what determines the ordering guarantee for messages?", ["Order is guaranteed across the whole topic", "Order is guaranteed only within a single partition", "There is no ordering at all", "Order is guaranteed per consumer group"], 1, "Kafka preserves order within a partition; messages with the same key go to the same partition."],
    ["What does change data capture (CDC) do?", ["Compresses database backups", "Streams row-level inserts, updates and deletes from a database's log", "Changes column data types", "Captures screenshots of dashboards"], 1, "CDC tools like Debezium read the transaction log and emit changes as events for downstream systems."],
    ["What is a tumbling window in stream processing?", ["Overlapping windows that slide each event", "Fixed-size, non-overlapping time intervals", "A window that never closes", "A database lock"], 1, "Tumbling windows partition time into contiguous, non-overlapping buckets, such as every five minutes."],
  ],
  'Data Quality & Governance': [
    ["What is a data contract?", ["A legal agreement with a cloud vendor", "An agreed schema and quality expectations between data producers and consumers", "A SQL keyword", "A backup policy"], 1, "Contracts make upstream changes explicit so they do not silently break downstream pipelines."],
    ["What does data lineage show?", ["Who wrote each SQL query", "How data flows from sources through transformations to outputs", "The cost of each query", "Network latency"], 1, "Lineage helps assess the impact of changes and trace the root cause of bad data."],
    ["Which is an example of a data quality test?", ["Asserting a primary key column is unique and not null", "Measuring CPU usage", "Checking DNS records", "Rotating passwords"], 0, "Uniqueness and not-null checks are common assertions in tools like dbt tests or Great Expectations."],
  ],
  'Cloud & Infrastructure': [
    ["Why manage data infrastructure with Terraform or similar tools?", ["It makes resources free", "Infrastructure becomes reviewable, versioned and reproducible code", "It removes the need for a cloud account", "It speeds up SQL queries"], 1, "Infrastructure as code avoids manual click-ops drift and allows changes to go through review."],
    ["Which is an effective way to reduce cloud warehouse costs?", ["Selecting every column in every query", "Partitioning and filtering data so queries scan less", "Disabling auto-suspend", "Duplicating tables"], 1, "Many warehouses bill by data scanned or compute time, so pruning and right-sizing directly cut spend."],
    ["What does CI/CD for data pipelines typically include?", ["Manually editing production tables", "Automated tests of transformations on each change before deployment", "Deleting old data daily", "Emailing SQL files"], 1, "Running builds and data tests in CI catches breaking changes before they reach production."],
  ],
})

const android = build({
  'Kotlin Foundations': [
    ["What does the Elvis operator `?:` do in Kotlin?", ["Throws an exception on null", "Returns the right-hand value when the left-hand expression is null", "Casts a value to a nullable type", "Compares references"], 1, "`a ?: b` evaluates to a if it is non-null, otherwise b."],
    ["What is the difference between `val` and `var`?", ["val is mutable, var is read-only", "val is a read-only reference, var can be reassigned", "They are identical", "val works only in classes"], 1, "A val cannot be reassigned after initialisation, encouraging immutability."],
    ["What does declaring a `data class` generate automatically?", ["A database table", "equals, hashCode, toString, copy and componentN functions", "A singleton instance", "A REST client"], 1, "Data classes derive value-based equality and convenience methods from their primary constructor properties."],
  ],
  'Android Platform Basics': [
    ["When does `onDestroy` get called for an Activity on a configuration change like rotation (by default)?", ["Never", "The Activity is destroyed and recreated", "Only when the app is uninstalled", "Only when the phone restarts"], 1, "By default a rotation destroys and recreates the Activity, which is why UI state must be preserved elsewhere."],
    ["How must 'dangerous' permissions like camera access be granted on modern Android?", ["Only by declaring them in the manifest", "At runtime, with the user approving a prompt", "They are always granted", "Through Gradle"], 1, "Since Android 6.0, dangerous permissions require both a manifest entry and a runtime request."],
    ["What is an implicit Intent?", ["An Intent that names an exact Activity class", "An Intent describing an action, letting the system find an app that can handle it", "A crash report", "A Gradle task"], 1, "Implicit intents, such as ACTION_VIEW with a URL, let other apps fulfil the request."],
  ],
  'Jetpack Compose UI': [
    ["What triggers recomposition of a composable?", ["Any device rotation only", "A change to State that the composable reads", "Calling invalidate() manually", "Changing the app icon"], 1, "Compose tracks state reads and re-runs affected composables when those values change."],
    ["Why use `remember { mutableStateOf(0) }` rather than just `mutableStateOf(0)` in a composable?", ["It makes the value global", "It keeps the state across recompositions instead of resetting it", "It saves the value to disk", "It runs on a background thread"], 1, "Without remember, the state object would be recreated each time the function recomposes."],
    ["Which composable efficiently displays a long scrollable list?", ["Column", "LazyColumn", "Box", "Row"], 1, "LazyColumn only composes items that are visible, unlike Column which composes all children."],
  ],
  'Architecture & State': [
    ["Why does a ViewModel survive configuration changes?", ["It is stored in a database", "It is scoped to a lifecycle owner that outlives Activity recreation", "It runs in a separate process", "It is recreated with saved bytes"], 1, "The ViewModelStore persists across recreation, so UI state held there is not lost on rotation."],
    ["What is StateFlow?", ["A one-shot callback", "A hot flow that always holds a current value and emits updates to collectors", "A database cursor", "A Gradle plugin"], 1, "StateFlow is well suited to exposing observable UI state from a ViewModel."],
    ["What does Hilt provide?", ["Image loading", "Dependency injection built on Dagger with Android-specific components", "Crash reporting", "Network caching"], 1, "Hilt generates DI containers tied to Android lifecycles, reducing manual wiring."],
  ],
  'Data & Networking': [
    ["What is Room?", ["A network library", "A Jetpack abstraction over SQLite with compile-time checked queries", "A layout manager", "A testing framework"], 1, "Room maps entities and DAOs to SQLite and verifies SQL at compile time."],
    ["Which library is commonly used to define REST APIs as Kotlin interfaces?", ["Glide", "Retrofit", "Espresso", "WorkManager"], 1, "Retrofit generates HTTP client implementations from annotated interface methods."],
    ["What does an offline-first app use as its single source of truth?", ["The remote server only", "The local database, synced with the network in the background", "Shared memory", "The UI layer"], 1, "Reading from local storage keeps the app usable without connectivity while sync reconciles changes."],
  ],
  'Background Work & Device Features': [
    ["Which API is recommended for deferrable work that must run even if the app exits or the device restarts?", ["Thread.sleep", "WorkManager", "A plain coroutine in an Activity", "AsyncTask"], 1, "WorkManager persists scheduled work and respects constraints like network or charging."],
    ["What must an app create before posting notifications on Android 8.0+?", ["A notification channel", "A broadcast receiver", "A content provider", "A service binding"], 0, "Channels let users control notification categories; posting without one fails on API 26+."],
    ["What is Firebase Cloud Messaging used for?", ["Storing images", "Delivering push messages from a server to devices", "Analysing crashes", "Signing APKs"], 1, "FCM routes notifications and data messages to app instances via device tokens."],
  ],
  'Testing & Quality': [
    ["Where do plain JUnit unit tests run in an Android project by default?", ["On a physical device only", "On the local JVM, without a device", "In the Play Store", "In the browser"], 1, "Local unit tests in src/test run on the JVM, making them fast."],
    ["How do Compose UI tests usually find elements?", ["By pixel coordinates", "Through semantics, such as text or test tags", "By XML IDs only", "By screenshot comparison"], 1, "The Compose testing APIs query the semantics tree, e.g. onNodeWithText or onNodeWithTag."],
    ["What should an icon-only button provide for TalkBack users?", ["A larger font", "A content description", "A vibration", "A darker colour"], 1, "A contentDescription gives screen readers a label to announce for non-text elements."],
  ],
  'Release & Growth': [
    ["What is an Android App Bundle (.aab)?", ["A debug-only build", "A publishing format from which Google Play generates optimised APKs per device", "A test report", "A signing key"], 1, "Play uses the bundle to serve only the code and resources each device needs."],
    ["What does R8 do in a release build?", ["Adds analytics", "Shrinks, optimises and obfuscates code", "Signs the app", "Uploads to Play"], 1, "R8 removes unused code and resources and renames symbols to reduce size."],
    ["What does Kotlin Multiplatform enable?", ["Running Kotlin only in browsers", "Sharing code such as business logic across Android, iOS and other targets", "Replacing Gradle", "Writing XML layouts"], 1, "KMP compiles shared Kotlin modules for multiple platforms while keeping native UI where desired."],
  ],
})

const ios = build({
  'Swift Language': [
    ["What does `if let name = optionalName { ... }` do?", ["Forces the optional to unwrap and crashes if nil", "Runs the block only if the optional has a value, binding it to name", "Declares a new optional", "Converts nil into an empty string"], 1, "Optional binding safely unwraps a value for use inside the block."],
    ["What is a key difference between structs and classes in Swift?", ["Structs support inheritance", "Structs are value types copied on assignment, classes are reference types", "Classes cannot have methods", "Structs cannot conform to protocols"], 1, "Copy semantics make structs safer for shared state; classes share a single instance."],
    ["How do you call a Swift function marked `throws`?", ["With `async`", "With `try`, usually inside a do-catch block", "With `guard`", "With `defer`"], 1, "Throwing calls must be marked with try and errors handled or propagated."],
  ],
  'Xcode & Platform Fundamentals': [
    ["What is Swift Package Manager used for?", ["Designing app icons", "Adding and managing code dependencies", "Submitting to the App Store", "Profiling memory"], 1, "SPM is integrated into Xcode for declaring and resolving package dependencies."],
    ["What are Apple's Human Interface Guidelines?", ["A Swift compiler spec", "Design guidance for building apps that feel native on Apple platforms", "App Store pricing rules", "A testing framework"], 1, "The HIG covers layout, navigation, controls and accessibility conventions users expect."],
    ["Which app lifecycle state means the app is visible and receiving events?", ["Background", "Active", "Suspended", "Not running"], 1, "In the active (foreground) state, the app is on screen and handling user input."],
  ],
  SwiftUI: [
    ["When should you use `@State` in SwiftUI?", ["For data shared across the whole app", "For simple local state owned by a single view", "For network requests", "For Core Data entities"], 1, "@State stores value-type state owned by the view; SwiftUI re-renders when it changes."],
    ["What does `@Binding` provide?", ["A copy of a value", "Two-way access to state owned by another view", "A database connection", "An animation curve"], 1, "Bindings let a child view read and write a parent's state without owning it."],
    ["Which container arranges views vertically?", ["HStack", "VStack", "ZStack", "Spacer"], 1, "VStack stacks children top-to-bottom; HStack is horizontal and ZStack overlays."],
  ],
  UIKit: [
    ["What does Auto Layout use to position views?", ["Absolute pixel coordinates only", "Constraints describing relationships between views", "CSS rules", "Random placement"], 1, "Constraints adapt layouts to different screen sizes and dynamic content."],
    ["Why do table views reuse cells with `dequeueReusableCell`?", ["To change the font", "To avoid creating a new cell for every row, saving memory and time", "To sort data", "To animate rows"], 1, "Recycling off-screen cells keeps scrolling smooth with large data sets."],
    ["How can you show a SwiftUI view inside a UIKit app?", ["Wrap it in UIHostingController", "Convert it to XML", "It is not possible", "Use UIWebView"], 0, "UIHostingController embeds a SwiftUI hierarchy as a regular view controller."],
  ],
  'Data, Networking & Concurrency': [
    ["What does conforming a type to `Codable` enable?", ["Thread safety", "Encoding and decoding to formats such as JSON", "Automatic UI layout", "Push notifications"], 1, "Codable combines Encodable and Decodable, enabling JSONDecoder and JSONEncoder use."],
    ["What problem do Swift actors solve?", ["Slow layout", "Data races, by serialising access to their mutable state", "App size", "Image caching"], 1, "Only one task at a time can touch an actor's isolated state, preventing concurrent mutation bugs."],
    ["What does `await` mark in Swift concurrency?", ["A synchronous call", "A suspension point where the task may pause without blocking the thread", "A compile-time constant", "A deprecated API"], 1, "At await, the task can suspend so the thread is free for other work until the result is ready."],
  ],
  'App Architecture': [
    ["In MVVM with SwiftUI, what does the ViewModel typically do?", ["Draws pixels", "Holds presentation state and logic that views observe", "Stores files on disk", "Handles code signing"], 1, "Views stay thin and declarative while the ViewModel prepares and updates the data they show."],
    ["Where should an app store sensitive values like auth tokens?", ["UserDefaults", "The Keychain", "A plist in the bundle", "A global variable"], 1, "The Keychain encrypts secrets and protects them at the OS level."],
    ["What is a benefit of dependency injection?", ["Larger binaries", "Easier testing by swapping real services for fakes", "Faster compile times guaranteed", "No need for protocols"], 1, "Passing dependencies in rather than creating them internally lets tests supply mocks."],
  ],
  'Testing & Performance': [
    ["Which framework is used for unit tests in Xcode?", ["Espresso", "XCTest (or Swift Testing)", "JUnit", "Jest"], 1, "XCTest and the newer Swift Testing framework are Apple's built-in testing tools."],
    ["What is Instruments used for?", ["Writing UI tests", "Profiling CPU, memory, leaks and energy usage", "Designing icons", "Localisation"], 1, "Instruments records traces that reveal performance bottlenecks and memory issues."],
    ["Which feature should your UI support so text scales with user preferences?", ["Dark Mode", "Dynamic Type", "Haptics", "Widgets"], 1, "Dynamic Type lets users choose larger text sizes; layouts should adapt accordingly."],
  ],
  'Shipping & Platform Features': [
    ["What is TestFlight used for?", ["Crash symbolication", "Distributing beta builds to testers before release", "Designing screens", "Running unit tests"], 1, "TestFlight lets internal and external testers install pre-release builds."],
    ["What does an iOS app need to receive remote push notifications?", ["A web server only", "The push capability and a device token registered with APNs", "Background fetch only", "A widget"], 1, "Apple Push Notification service delivers pushes using a device token the app obtains after user permission."],
    ["Which framework handles in-app purchases on modern iOS?", ["StoreKit", "MapKit", "HealthKit", "ARKit"], 0, "StoreKit (and StoreKit 2) manages products, purchases and transaction verification."],
  ],
})

const uxDesign = build({
  'Design Foundations': [
    ["What does Hick's Law suggest?", ["Larger targets are faster to hit", "Decision time increases as the number of choices grows", "Users read in an F pattern", "Colour affects mood"], 1, "Reducing or grouping options can make decisions faster."],
    ["Which of Nielsen's heuristics is violated when users cannot undo an action?", ["Aesthetic and minimalist design", "User control and freedom", "Recognition rather than recall", "Help and documentation"], 1, "Users need clear exits and undo to recover from mistakes."],
    ["What is the core idea of human-centred design?", ["Ship features as fast as possible", "Grounding decisions in an understanding of users' needs and testing with them iteratively", "Following the CEO's preferences", "Copying competitors"], 1, "HCD cycles through research, ideation, prototyping and testing with real users."],
  ],
  'User Research': [
    ["Which is a good practice in user interviews?", ["Asking leading questions to confirm ideas", "Asking open-ended questions about past behaviour", "Pitching your product", "Interviewing only colleagues"], 1, "Open questions about real experiences reveal genuine needs better than hypotheticals."],
    ["What is affinity mapping used for?", ["Choosing typefaces", "Clustering research observations to uncover themes", "Measuring page speed", "Writing code"], 1, "Grouping notes by similarity helps synthesise patterns across many sessions."],
    ["When are surveys most appropriate?", ["Understanding deep motivations of a few users", "Gathering quantitative data from many people", "Observing real workflows", "Testing a prototype's usability"], 1, "Surveys scale well for measuring attitudes or frequencies, but lack depth."],
  ],
  'Defining the Problem': [
    ["What should a persona be based on?", ["Stereotypes", "Patterns found in real user research", "The designer's preferences", "Market size only"], 1, "Research-based personas represent real goals and behaviours rather than assumptions."],
    ["What does a customer journey map show?", ["Database schema", "The steps, actions, thoughts and emotions a user experiences over time", "Server architecture", "A colour palette"], 1, "Journey maps reveal pain points and opportunities across touchpoints."],
    ["What does a service blueprint add beyond a journey map?", ["Typography rules", "Backstage processes and systems that support each customer touchpoint", "Pricing tiers", "Animation specs"], 1, "Blueprints connect front-stage interactions with the people and systems behind them."],
  ],
  'Information Architecture & Interaction': [
    ["What does an open card sort help determine?", ["Button colours", "How users naturally group and label content", "Page load time", "Font sizes"], 1, "Participants create their own categories, revealing their mental models."],
    ["What does tree testing evaluate?", ["Visual polish", "Whether users can find items in a proposed navigation hierarchy", "Code quality", "Brand recognition"], 1, "Tree tests strip away visuals to test the findability of a structure alone."],
    ["What is a key purpose of low-fidelity wireframes?", ["Final visual design", "Exploring layout and structure quickly before investing in detail", "Handing off to developers", "Marketing materials"], 1, "Low-fi wireframes are cheap to change, encouraging exploration and honest feedback."],
  ],
  'Visual & UI Design': [
    ["What is the WCAG AA minimum contrast ratio for normal body text?", ["2:1", "3:1", "4.5:1", "7:1"], 2, "AA requires 4.5:1 for normal text and 3:1 for large text."],
    ["What is a design system?", ["A single mockup", "A shared set of reusable components, tokens and guidelines", "A project timeline", "A brand logo"], 1, "Design systems promote consistency and speed across products and teams."],
    ["How is visual hierarchy primarily created?", ["Using one font size everywhere", "Varying size, weight, colour, contrast and spacing to signal importance", "Centering everything", "Adding more images"], 1, "Hierarchy guides the eye to the most important elements first."],
  ],
  'Prototyping & Usability Testing': [
    ["Roughly how many participants often uncover most major usability issues in a qualitative round?", ["1", "About 5", "100", "1,000"], 1, "Small rounds of around five users find many problems; iterating with more rounds finds more."],
    ["What is a moderator's main job in a usability test?", ["Help users complete tasks", "Observe and prompt think-aloud without leading", "Sell the product", "Fix bugs live"], 1, "Neutral facilitation preserves realistic behaviour and honest feedback."],
    ["What is an advantage of unmoderated remote testing?", ["Deep follow-up questions", "Faster, cheaper sessions at larger scale", "Full control of the environment", "No need for tasks"], 1, "Participants complete tasks on their own, so many sessions can run in parallel."],
  ],
  'Accessibility & Inclusive Design': [
    ["What does the POUR acronym in WCAG stand for?", ["Perceivable, Operable, Understandable, Robust", "Primary, Optional, Useful, Responsive", "Plan, Organise, Use, Review", "Performance, Order, Usability, Reliability"], 0, "These four principles organise all WCAG success criteria."],
    ["Why should information not be conveyed by colour alone?", ["Colour is expensive", "Users with colour vision deficiencies may miss it", "Browsers cannot render colour", "It slows the page"], 1, "Pair colour with text, icons or patterns so meaning is accessible to everyone."],
    ["What do accessibility annotations on design files communicate to developers?", ["Font licences", "Details like focus order, headings, labels and landmarks", "Server endpoints", "Marketing copy"], 1, "Annotations make accessibility intent explicit so it is implemented correctly."],
  ],
  'Metrics, Strategy & Collaboration': [
    ["What does the System Usability Scale (SUS) measure?", ["Page load speed", "Perceived usability via a standard 10-item questionnaire", "Revenue", "Code coverage"], 1, "SUS produces a 0-100 score that can be compared across products and versions."],
    ["What makes an A/B test result trustworthy?", ["Stopping as soon as one variant looks better", "A sufficient sample size and a predefined success metric", "Testing ten changes at once", "Only asking stakeholders"], 1, "Planning the metric and sample in advance avoids false positives from peeking."],
    ["What should a strong UX portfolio case study emphasise?", ["Only final screens", "The problem, process, decisions and outcomes", "Tool shortcuts", "Personal hobbies"], 1, "Hiring managers want to understand how you think and the impact of your work."],
  ],
})

const productManager = build({
  'Role Fundamentals': [
    ["What is a product manager mainly accountable for?", ["Writing all the code", "Ensuring the team builds the right product that delivers value to users and the business", "Managing payroll", "Designing every screen"], 1, "PMs own the why and what, partnering with design and engineering on the how."],
    ["During which product lifecycle stage does growth slow and competition intensify?", ["Introduction", "Growth", "Maturity", "Ideation"], 2, "In maturity, market saturation slows growth and the focus shifts to efficiency and differentiation."],
    ["Why does technical literacy help a PM?", ["To replace engineers", "To understand trade-offs and communicate credibly with engineering", "To avoid writing specs", "To set salaries"], 1, "Understanding systems helps PMs weigh feasibility, effort and risk."],
  ],
  'Customer Discovery': [
    ["What is the 'job' in jobs-to-be-done?", ["A job posting", "The progress a customer is trying to make in a given situation", "A sprint task", "A feature list"], 1, "JTBD focuses on the underlying goal customers hire a product to achieve."],
    ["What does an opportunity solution tree connect?", ["Revenue to costs", "A desired outcome to customer opportunities, solutions and experiments", "Teams to managers", "Bugs to fixes"], 1, "It visualises how discovery work ladders up to a measurable outcome."],
    ["What is the goal of problem validation?", ["To build the full product", "To confirm a real, painful problem exists before investing in solutions", "To set pricing", "To hire a team"], 1, "Validating the problem first avoids building solutions nobody needs."],
  ],
  'Strategy & Vision': [
    ["What is a North Star metric?", ["Total headcount", "A single metric that best captures the core value customers get from the product", "Server uptime", "Number of features shipped"], 1, "It aligns teams on value delivered, e.g. nights booked for a travel marketplace."],
    ["In OKRs, what are key results?", ["Vague aspirations", "Measurable outcomes that show progress toward an objective", "A list of tasks", "Team members' names"], 1, "Objectives are qualitative; key results quantify whether they were achieved."],
    ["What does positioning define?", ["Office layout", "Who the product is for, the alternative it beats, and why it is different", "Code structure", "The release date"], 1, "Positioning frames the product in the customer's mind relative to alternatives."],
  ],
  'Prioritization & Planning': [
    ["In the RICE framework, what does the 'E' stand for?", ["Engagement", "Effort", "Experience", "Expansion"], 1, "RICE scores Reach x Impact x Confidence divided by Effort."],
    ["What is a user story typically written as?", ["A database query", "As a [user], I want [goal] so that [benefit]", "A bug report", "A press release"], 1, "The format keeps requirements focused on user value."],
    ["What distinguishes Kanban from Scrum?", ["Kanban uses fixed-length sprints", "Kanban emphasises continuous flow and WIP limits rather than time-boxed sprints", "Kanban has no board", "Kanban requires a Scrum Master"], 1, "Kanban pulls work as capacity frees up, limiting work in progress."],
  ],
  'Execution & Delivery': [
    ["What is the purpose of an MVP?", ["To launch the final polished product", "To learn the most about customer value with the least effort", "To impress investors with features", "To skip testing"], 1, "An MVP tests key assumptions quickly so the team can iterate on evidence."],
    ["How should a PM best work with engineering on solutions?", ["Dictate implementation details", "Share the problem and context early and collaborate on solutions", "Only communicate via tickets", "Avoid technical discussions"], 1, "Involving engineers early surfaces better ideas and feasibility constraints."],
    ["What is a good risk management practice?", ["Ignore risks until they happen", "Identify value, usability, feasibility and viability risks and test the riskiest first", "Add more features", "Delay launch indefinitely"], 1, "Tackling the biggest unknowns early reduces wasted effort."],
  ],
  'Data & Experimentation': [
    ["What does a retention cohort chart show?", ["Server load", "The share of users from a sign-up period who remain active over time", "Revenue by region", "Bug counts"], 1, "Cohorts reveal whether product changes improve long-term engagement."],
    ["What does a p-value below 0.05 in an A/B test indicate?", ["The change is guaranteed to help", "The observed difference would be unlikely if there were no real effect", "The test had too few users", "The variant lost"], 1, "It suggests statistical significance, not the size or business importance of the effect."],
    ["Why might a PM learn SQL?", ["To deploy code", "To answer data questions directly without waiting on analysts", "To design UI", "To write contracts"], 1, "SQL lets PMs explore product data and validate hypotheses quickly."],
  ],
  'Go-to-Market & Growth': [
    ["What is activation in a growth funnel?", ["When a user first hears of the product", "When a new user first experiences the product's core value", "When a user cancels", "When a user pays an invoice"], 1, "Activation marks the aha moment that predicts retention."],
    ["What is a growth loop?", ["A one-time campaign", "A system where outputs from one cycle, like new content or referrals, feed acquisition in the next", "A bug in analytics", "A pricing discount"], 1, "Loops compound over time, unlike linear funnels."],
    ["What characterises product-led growth?", ["Sales demos are mandatory", "The product itself drives acquisition, conversion and expansion, often via free trials or freemium", "No onboarding", "Only enterprise customers"], 1, "PLG lets users experience value before buying."],
  ],
  'Leadership & Communication': [
    ["What is a good way to manage stakeholders?", ["Surprise them at launch", "Map their influence and interest and communicate proactively", "Avoid them", "Agree to every request"], 1, "Tailored, regular communication builds trust and alignment."],
    ["What is a 'disagree and commit' approach?", ["Blocking decisions you dislike", "Voicing disagreement, then fully supporting the decision once made", "Never disagreeing", "Escalating every issue"], 1, "It keeps teams moving while still encouraging honest debate."],
    ["When presenting to executives, what should you usually lead with?", ["Detailed methodology", "The key conclusion or recommendation", "A long backstory", "Team biographies"], 1, "Leading with the answer respects limited time; details can follow."],
  ],
})

const qaEngineer = build({
  'Testing Fundamentals': [
    ["According to the test pyramid, which tests should be most numerous?", ["End-to-end UI tests", "Unit tests", "Manual tests", "Load tests"], 1, "Unit tests are fast and cheap, so they form the broad base; slower E2E tests are fewer."],
    ["What is the difference between verification and validation?", ["They are identical", "Verification checks it is built right; validation checks the right thing was built", "Validation is only automated", "Verification happens after release"], 1, "Verification checks conformance to specs, validation checks it meets user needs."],
    ["What does regression testing aim to catch?", ["Performance bottlenecks only", "Previously working features broken by new changes", "Spelling errors", "Security flaws only"], 1, "Re-running tests after changes ensures existing behaviour still works."],
  ],
  'Manual Testing Skills': [
    ["An input accepts ages 18 to 65. Which values best test the boundaries?", ["20, 40, 60", "17, 18, 65, 66", "0, 100", "30 only"], 1, "Boundary value analysis tests just inside and just outside each limit."],
    ["What is exploratory testing?", ["Running scripted test cases only", "Simultaneous learning, test design and execution guided by the tester's judgement", "Automated load testing", "Code review"], 1, "Testers explore the product freely, often within time-boxed charters."],
    ["What should a good bug report include?", ["Only the word 'broken'", "Steps to reproduce, expected vs actual results, and environment details", "The developer's name", "A fix suggestion only"], 1, "Clear reproduction details let developers confirm and fix issues quickly."],
  ],
  'Technical Foundations': [
    ["Which HTTP status code range indicates a server error?", ["2xx", "3xx", "4xx", "5xx"], 3, "5xx codes like 500 or 503 indicate the server failed to fulfil a valid request."],
    ["Why is SQL useful for testers?", ["To style web pages", "To set up test data and verify that the database state is correct", "To compile code", "To write CSS"], 1, "Querying the database confirms that actions persisted the expected data."],
    ["Which browser tool helps inspect network requests while testing?", ["The DevTools Network panel", "The bookmarks bar", "Print preview", "The address bar autocomplete"], 0, "The Network panel shows requests, responses, status codes and timings."],
  ],
  'API Testing': [
    ["Which HTTP method is idempotent and typically used to fully replace a resource?", ["POST", "PUT", "PATCH", "CONNECT"], 1, "Repeating the same PUT yields the same state, unlike POST which may create duplicates."],
    ["What does consumer-driven contract testing (e.g. Pact) verify?", ["UI layout", "That a provider API meets the expectations its consumers rely on", "Database indexes", "Load capacity"], 1, "Consumers publish contracts that the provider verifies, catching breaking changes early."],
    ["What is a common GraphQL testing concern?", ["It has no schema", "Errors can be returned with a 200 status inside the response body", "It only supports GET", "It cannot be automated"], 1, "Tests must inspect the errors field, not just the HTTP status code."],
  ],
  'UI Test Automation': [
    ["What is the Page Object pattern?", ["A way to store screenshots", "Encapsulating page locators and actions in classes so tests stay readable and maintainable", "A browser extension", "A CSS framework"], 1, "Changes to the UI then require updating one page object, not every test."],
    ["Which locator strategy is generally most resilient?", ["Absolute XPath like /html/body/div[3]/div[2]", "User-facing roles, labels or dedicated test IDs", "Auto-generated CSS classes", "Pixel coordinates"], 1, "Semantic locators and test IDs survive layout and styling changes."],
    ["Which is a good way to fix a flaky test caused by timing?", ["Add a long fixed sleep", "Wait for a specific condition, such as an element being visible or a request completing", "Delete the test", "Retry until it passes and ignore it"], 1, "Explicit or auto-waiting on conditions removes race conditions without slowing every run."],
  ],
  'Mobile Testing': [
    ["What is Appium?", ["A design tool", "A cross-platform automation framework for native and hybrid mobile apps", "An Android emulator", "A crash reporter"], 1, "Appium drives iOS and Android apps via the WebDriver protocol."],
    ["Why use a cloud device farm?", ["It is always free", "To test on many real device and OS combinations without owning them", "To write code faster", "To avoid automation"], 1, "Device fragmentation makes broad real-device coverage valuable."],
    ["Which are the native UI testing frameworks for Android and iOS?", ["Selenium and Cypress", "Espresso and XCUITest", "JUnit and Mocha", "Postman and Newman"], 1, "Espresso (Android) and XCUITest (iOS) run closely integrated with each platform."],
  ],
  'Non-Functional Testing': [
    ["What is the goal of a stress test?", ["Check spelling", "Find the breaking point by pushing load beyond expected capacity", "Verify colours", "Test login only"], 1, "Stress tests reveal how a system fails and recovers under extreme load."],
    ["Which tool category detects visual regressions?", ["Screenshot comparison against approved baselines", "Unit test runners", "Linters", "Package managers"], 0, "Visual tests flag pixel or layout differences from a baseline image."],
    ["What does SQL injection testing check?", ["Database speed", "Whether user input can alter database queries maliciously", "Query formatting", "Backup frequency"], 1, "Testers probe inputs to confirm queries are parameterised and inputs sanitised."],
  ],
  'CI/CD & Quality Strategy': [
    ["What does shift-left testing mean?", ["Testing only in production", "Moving testing activities earlier in the development process", "Testing on left-handed devices", "Reducing test coverage"], 1, "Catching defects earlier is cheaper than finding them after release."],
    ["What is risk-based testing?", ["Testing everything equally", "Prioritising test effort on areas with the highest likelihood and impact of failure", "Skipping risky features", "Testing only low-risk areas"], 1, "Limited time is focused where failures would hurt most."],
    ["Why run tests in ephemeral containerised environments in CI?", ["To make tests slower", "To get consistent, isolated environments for each run", "To avoid version control", "To skip setup"], 1, "Fresh containers avoid state leaking between runs and match production more closely."],
  ],
})

const quizzes: Record<string, Record<string, Question[]>> = {
  'machine-learning': machineLearning,
  'data-engineer': dataEngineer,
  android,
  ios,
  'ux-design': uxDesign,
  'product-manager': productManager,
  'qa-engineer': qaEngineer,
}

export default quizzes
