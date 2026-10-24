import { buildRoadmap } from '../build'

const typescript = buildRoadmap({
  id: 'typescript',
  title: 'TypeScript',
  short: 'Add a static type system to JavaScript and catch bugs early.',
  description:
    'Move from annotating simple variables to modelling complex domains with generics and type-level programming, and configure projects that scale.',
  category: 'skill',
  accent: '#2563eb',
  tags: ['javascript', 'types', 'language'],
  query: 'typescript',
  sections: [
    {
      title: 'Getting Started',
      level: 'beginner',
      description: 'Why types help and how to compile them away.',
      topics: [
        ['Why TypeScript', 1, 'What a static checker catches, what it cannot, and how it fits into a JS workflow.', 'https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html'],
        ['Installing & running tsc', 2, 'Install the compiler, compile files, and read error messages.'],
        ['The TS Playground', 1, 'Experiment with snippets and inspect emitted JavaScript in the browser.', { docs: 'https://www.typescriptlang.org/play', kind: 'optional' }],
        ['Primitive types & annotations', 2, 'string, number, boolean, null, undefined, and where annotations belong.', 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html'],
        ['Type inference', 2, 'Let the compiler work out types and know when to be explicit.'],
      ],
    },
    {
      title: 'Everyday Types',
      level: 'beginner',
      description: 'The building blocks you write every day.',
      topics: [
        ['Arrays & tuples', 2, 'Typed lists, fixed-length tuples, and readonly variants.'],
        ['Object types', 2, 'Describe object shapes, optional and readonly properties.', 'https://www.typescriptlang.org/docs/handbook/2/objects.html'],
        ['Interfaces vs type aliases', 2, 'Two ways to name shapes and the practical differences between them.'],
        ['Union & intersection types', 3, 'Combine types to express "either" and "both" relationships.'],
        ['Literal types & enums', 2, 'Restrict values to exact strings or numbers, and when enums are worth it.', 'https://www.typescriptlang.org/docs/handbook/enums.html'],
        ['any, unknown & never', 2, 'Escape hatches, safe unknown values, and the empty type.'],
      ],
    },
    {
      title: 'Functions & Narrowing',
      level: 'beginner',
      description: 'Type behaviour, not just data.',
      topics: [
        ['Typing functions', 3, 'Parameters, return types, optional and rest parameters, and function types.', 'https://www.typescriptlang.org/docs/handbook/2/functions.html'],
        ['Type narrowing', 3, 'How typeof, instanceof, in, and equality checks refine types in branches.', 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html'],
        ['Discriminated unions', 3, 'Model state machines with a shared tag field and exhaustive switches.'],
        ['Type guards & assertion functions', 2, 'Write your own predicates that teach the compiler about values.'],
        ['Function overloads', 2, 'Offer several call signatures for one implementation.', { kind: 'optional' }],
      ],
      project: {
        title: 'Typed to-do CLI',
        description: 'A small command-line task manager written in strict TypeScript, using discriminated unions for commands and task states.',
      },
    },
    {
      title: 'Classes & Modules',
      level: 'intermediate',
      description: 'Structure larger codebases.',
      topics: [
        ['Classes & access modifiers', 3, 'public, private, protected, readonly fields, and parameter properties.', 'https://www.typescriptlang.org/docs/handbook/2/classes.html'],
        ['Abstract classes & implements', 2, 'Share behaviour and enforce contracts between classes.'],
        ['Modules & import types', 2, 'Organise code with ES modules and type-only imports.', 'https://www.typescriptlang.org/docs/handbook/2/modules.html'],
        ['Declaration files', 3, 'Write and consume .d.ts files and use DefinitelyTyped packages.', 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html'],
        ['Decorators', 2, 'Annotate and transform classes and members, as used by frameworks like Angular.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Generics',
      level: 'intermediate',
      description: 'Write reusable code without losing type safety.',
      topics: [
        ['Generic functions', 3, 'Parameterise functions over types and let callers infer them.', 'https://www.typescriptlang.org/docs/handbook/2/generics.html'],
        ['Generic constraints', 2, 'Limit type parameters with extends to access known properties.'],
        ['Generic classes & interfaces', 2, 'Build containers and services that work over many element types.'],
        ['keyof & indexed access types', 3, 'Derive key unions and property types from existing shapes.', 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html'],
        ['Built-in utility types', 3, 'Partial, Required, Pick, Omit, Record, ReturnType, and friends.', 'https://www.typescriptlang.org/docs/handbook/utility-types.html'],
      ],
    },
    {
      title: 'Type-Level Programming',
      level: 'advanced',
      description: 'Compute new types from old ones.',
      topics: [
        ['Conditional types', 4, 'Branch on types with extends and distribute over unions.', 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html'],
        ['The infer keyword', 3, 'Extract pieces of a type, like a promise result or argument list.'],
        ['Mapped types', 3, 'Transform every property of a type, with key remapping and modifiers.', 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html'],
        ['Template literal types', 3, 'Build and parse string types such as event names or routes.', 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html'],
        ['Variance & assignability', 2, 'Understand why some assignments fail and how structural typing decides.'],
        ['Branded types', 2, 'Distinguish values with the same runtime shape, like user IDs and order IDs.', { kind: 'optional' }],
      ],
      project: {
        title: 'Type-safe event bus',
        description: 'A tiny library whose emit and on methods infer payload types from an event map, with tests that assert compile errors.',
      },
    },
    {
      title: 'Configuration & Tooling',
      level: 'intermediate',
      description: 'Set up projects that stay maintainable.',
      topics: [
        ['tsconfig essentials', 3, 'target, module, moduleResolution, paths, and what each setting changes.', 'https://www.typescriptlang.org/tsconfig'],
        ['Strict mode options', 2, 'Turn on strict checks and fix the issues they surface.'],
        ['Project references', 2, 'Split large repos into incrementally built sub-projects.', { docs: 'https://www.typescriptlang.org/docs/handbook/project-references.html', kind: 'optional' }],
        ['Linting with typescript-eslint', 2, 'Add type-aware lint rules that the compiler alone does not enforce.', 'https://typescript-eslint.io/'],
        ['Fast transpilers', 2, 'Use esbuild, swc, or tsx for speed while running tsc for checking.', { kind: 'alternative' }],
        ['Runtime validation', 3, 'Bridge static types and untrusted input with schemas from libraries like Zod.'],
      ],
    },
    {
      title: 'TypeScript in Practice',
      level: 'advanced',
      description: 'Apply types across real stacks.',
      topics: [
        ['TypeScript with React', 4, 'Type props, state, hooks, events, and context.'],
        ['TypeScript with Node', 3, 'Type server code, configure module output, and run it efficiently.'],
        ['Migrating JS to TS', 4, 'Incrementally convert a codebase using allowJs, checkJs, and JSDoc.', 'https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html'],
        ['Authoring typed libraries', 3, 'Publish packages with accurate declarations and exports maps.', { kind: 'optional' }],
        ['Testing types', 2, 'Assert type behaviour with expect-type style helpers and tsd.', { kind: 'optional' }],
      ],
      project: {
        title: 'Migrate a JavaScript app',
        description: 'Take an existing JavaScript project and migrate it to strict TypeScript file by file, documenting the type issues found.',
      },
    },
  ],
})

export default typescript
