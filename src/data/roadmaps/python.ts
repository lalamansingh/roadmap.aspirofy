import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'python',
  title: 'Python',
  short: 'Master the most versatile language around.',
  description: 'From syntax to packaging, testing, concurrency, and the ecosystems that make Python the go-to language for web, data, and automation.',
  category: 'skill',
  accent: '#eab308',
  tags: ['language', 'scripting'],
  query: 'python programming',
  sections: [
    {
      title: 'Basics',
      level: 'beginner',
      description: 'Write your first programs.',
      topics: [
        ['Syntax & variables', 2, 'Indentation, naming, and dynamic typing.', 'https://docs.python.org/3/tutorial/'],
        ['Control flow', 2, 'if/elif/else, for and while loops, match statements.'],
        ['Built-in data structures', 4, 'Lists, tuples, dicts, and sets.'],
        ['Functions', 3, 'Arguments, defaults, *args/**kwargs, and return values.'],
        ['Exceptions', 2, 'try/except/finally and raising your own errors.'],
        ['Files & I/O', 2, 'Read and write files with context managers.'],
      ],
    },
    {
      title: 'Intermediate',
      level: 'intermediate',
      description: 'Write idiomatic Python.',
      topics: [
        ['Comprehensions', 2, 'Concise list, dict, and set construction.'],
        ['OOP & classes', 5, 'Classes, inheritance, dunder methods, and dataclasses.'],
        ['Modules & packages', 2, 'Organise code and understand imports.'],
        ['Iterators & generators', 3, 'Lazy sequences with yield.'],
        ['Decorators', 3, 'Wrap functions to add behaviour.'],
        ['Type hints', 3, 'Annotate code and check it with mypy or pyright.'],
      ],
      project: { title: 'CLI expense tracker', description: 'A command-line app with subcommands, persistent storage, and typed code.' },
    },
    {
      title: 'Tooling',
      level: 'intermediate',
      description: 'Professional workflows.',
      topics: [
        ['Virtual environments', 1, 'Isolate dependencies per project.'],
        ['Packaging with uv / Poetry', 2, 'Manage dependencies and publish packages.'],
        ['pytest', 4, 'Fixtures, parametrisation, and coverage.', 'https://docs.pytest.org/'],
        ['Ruff & formatting', 1, 'Fast linting and consistent style.'],
      ],
    },
    {
      title: 'Advanced',
      level: 'advanced',
      description: 'Under the hood.',
      topics: [
        ['Concurrency: threads & processes', 4, 'The GIL, threading, and multiprocessing.'],
        ['asyncio', 5, 'Event loops, coroutines, and async I/O.'],
        ['Context managers', 2, 'Write your own with __enter__/__exit__ or contextlib.'],
        ['Metaprogramming', 3, 'Descriptors and metaclasses.', { kind: 'optional' }],
        ['Performance profiling', 3, 'cProfile and finding hot spots.'],
      ],
    },
    {
      title: 'Ecosystems',
      level: 'advanced',
      description: 'Choose a specialisation.',
      topics: [
        ['Web: Django / FastAPI', 15, 'Build web apps and APIs.'],
        ['Data: pandas & Jupyter', 12, 'Analyse and visualise data.', { kind: 'alternative' }],
        ['Automation & scraping', 6, 'requests, BeautifulSoup, and Playwright.', { kind: 'alternative' }],
        ['Machine learning: scikit-learn', 12, 'Classic ML models.', { kind: 'alternative' }],
      ],
      project: { title: 'Async web scraper + API', description: 'Scrape a site concurrently, store results, and expose them via FastAPI with tests.' },
    },
  ],
})
