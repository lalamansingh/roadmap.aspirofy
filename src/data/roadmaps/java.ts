import { buildRoadmap } from '../build'

const java = buildRoadmap({
  id: 'java',
  title: 'Java',
  short: 'Master the JVM language behind countless enterprise systems.',
  description:
    'Build a solid grounding in Java’s syntax, object model, and collections, then grow into concurrency, build tools, and Spring-based services.',
  category: 'skill',
  accent: '#e11d48',
  tags: ['language', 'jvm', 'enterprise'],
  query: 'java',
  sections: [
    {
      title: 'Java Basics',
      level: 'beginner',
      description: 'Set up the JDK and learn the core syntax.',
      topics: [
        ['Installing the JDK', 1, 'Install a JDK distribution and understand JDK vs JRE vs JVM.', 'https://dev.java/learn/getting-started/'],
        ['Your first program', 2, 'Classes, the main method, compiling with javac, and running with java.'],
        ['Primitive types & variables', 3, 'int, double, boolean, char, type casting, and var inference.'],
        ['Operators & control flow', 3, 'Conditionals, loops, and switch expressions.'],
        ['Strings', 2, 'Immutability, common methods, StringBuilder, and text blocks.'],
        ['Arrays', 2, 'Declare, iterate, and sort fixed-size arrays.'],
      ],
    },
    {
      title: 'Object-Oriented Java',
      level: 'beginner',
      description: 'Model problems with classes and objects.',
      topics: [
        ['Classes & objects', 3, 'Fields, constructors, methods, and the this keyword.'],
        ['Encapsulation & access modifiers', 2, 'Hide state behind public, protected, package-private, and private members.'],
        ['Inheritance & polymorphism', 4, 'Extend classes, override methods, and program to supertypes.'],
        ['Interfaces & abstract classes', 3, 'Define contracts, default methods, and shared base behaviour.'],
        ['Records & enums', 2, 'Concise immutable data carriers and type-safe constants.', 'https://dev.java/learn/records/'],
        ['equals, hashCode & toString', 2, 'Implement object identity correctly for collections and debugging.'],
      ],
      project: {
        title: 'Library management console app',
        description: 'A command-line app that models books, members, and loans with classes, interfaces, and input validation.',
      },
    },
    {
      title: 'Core APIs',
      level: 'intermediate',
      description: 'The standard library in depth.',
      topics: [
        ['Exceptions', 3, 'Checked vs unchecked exceptions, try-with-resources, and custom exception types.'],
        ['Collections framework', 5, 'List, Set, Map, Queue, and choosing the right implementation.', 'https://docs.oracle.com/en/java/javase/21/core/java-collections-framework.html'],
        ['Generics', 4, 'Type parameters, bounded types, and wildcards.'],
        ['Lambdas & functional interfaces', 3, 'Pass behaviour as values with lambdas and method references.'],
        ['Streams API', 4, 'Filter, map, group, and collect data declaratively.'],
        ['Optional', 1, 'Represent missing values without null checks everywhere.'],
        ['Date & Time API', 2, 'Work with LocalDate, Instant, ZonedDateTime, and Duration.'],
      ],
    },
    {
      title: 'Build Tools & Ecosystem',
      level: 'intermediate',
      description: 'Compile, package, and manage dependencies.',
      topics: [
        ['Maven', 4, 'Project object model, lifecycle phases, and dependency management.', 'https://maven.apache.org/guides/getting-started/'],
        ['Gradle', 4, 'Scriptable builds with a Kotlin or Groovy DSL.', { docs: 'https://docs.gradle.org/current/userguide/userguide.html', kind: 'alternative' }],
        ['Packages & the module system', 3, 'Organise code into packages and optionally into JPMS modules.'],
        ['IDE productivity', 2, 'Debug, refactor, and navigate efficiently in IntelliJ IDEA or similar.'],
        ['Logging with SLF4J', 2, 'Use a logging facade with Logback or Log4j 2 behind it.'],
      ],
    },
    {
      title: 'Testing',
      level: 'intermediate',
      description: 'Verify behaviour automatically.',
      topics: [
        ['JUnit 5', 3, 'Write tests, parameterised cases, and lifecycle hooks.', 'https://junit.org/junit5/docs/current/user-guide/'],
        ['Mockito', 3, 'Isolate units by mocking collaborators.', 'https://site.mockito.org/'],
        ['AssertJ', 1, 'Write fluent, readable assertions.', { kind: 'optional' }],
        ['Testcontainers', 3, 'Run integration tests against real databases in Docker.', { docs: 'https://testcontainers.com/', kind: 'optional' }],
        ['Test-driven development', 3, 'Design code by writing failing tests first.'],
      ],
    },
    {
      title: 'Concurrency',
      level: 'advanced',
      description: 'Use multiple threads safely.',
      topics: [
        ['Threads & Runnable', 2, 'Create threads and understand their lifecycle.'],
        ['Synchronisation & the memory model', 4, 'synchronized, volatile, happens-before, and visibility bugs.'],
        ['Executors & thread pools', 3, 'Submit tasks to managed pools instead of creating raw threads.'],
        ['CompletableFuture', 3, 'Compose asynchronous computations and handle their failures.'],
        ['Concurrent collections & locks', 3, 'ConcurrentHashMap, atomics, and ReentrantLock.'],
        ['Virtual threads', 3, 'Lightweight threads for high-throughput blocking code, available since Java 21.', 'https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html'],
      ],
    },
    {
      title: 'Data Access',
      level: 'intermediate',
      description: 'Persist data in relational databases.',
      topics: [
        ['JDBC', 3, 'Connect, run prepared statements, and manage transactions directly.'],
        ['JPA & Hibernate', 5, 'Map entities to tables, define relationships, and avoid N+1 queries.', 'https://hibernate.org/orm/documentation/'],
        ['Connection pooling', 1, 'Reuse database connections efficiently with HikariCP.'],
        ['Database migrations', 2, 'Version schema changes with Flyway or Liquibase.'],
        ['jOOQ', 3, 'Write type-safe SQL generated from your schema.', { kind: 'alternative' }],
      ],
    },
    {
      title: 'Spring & Web Services',
      level: 'advanced',
      description: 'Build production APIs on the most common Java stack.',
      topics: [
        ['Spring core & dependency injection', 4, 'Beans, the application context, and constructor injection.', 'https://docs.spring.io/spring-framework/reference/'],
        ['Spring Boot', 5, 'Auto-configuration, starters, profiles, and externalised config.', 'https://docs.spring.io/spring-boot/'],
        ['Building REST controllers', 4, 'Map requests, validate input, and handle errors consistently.'],
        ['Spring Data JPA', 3, 'Repository interfaces and derived queries.'],
        ['Spring Security', 5, 'Authentication, authorisation, and securing endpoints with JWT or OAuth2.'],
        ['Quarkus or Micronaut', 5, 'Cloud-native frameworks with fast startup and low memory use.', { kind: 'alternative' }],
      ],
      project: {
        title: 'Task tracker REST API',
        description: 'A Spring Boot service with JPA persistence, Flyway migrations, secured endpoints, and Testcontainers integration tests.',
      },
    },
    {
      title: 'JVM Internals & Performance',
      level: 'advanced',
      description: 'Understand what runs underneath your code.',
      topics: [
        ['Class loading & bytecode', 2, 'How classes are loaded and what javac produces.'],
        ['Garbage collection', 3, 'Heap generations and choosing between G1, ZGC, and others.'],
        ['JIT compilation', 2, 'How hot code is optimised at runtime and why warm-up matters.'],
        ['Profiling & monitoring', 3, 'Diagnose problems with JDK Flight Recorder, Mission Control, and heap dumps.'],
        ['Native images with GraalVM', 3, 'Compile ahead of time for instant startup.', { kind: 'optional' }],
      ],
      project: {
        title: 'Performance tuning report',
        description: 'Load-test your API, profile it with Flight Recorder, apply fixes, and document before-and-after latency and memory numbers.',
      },
    },
  ],
})

export default java
