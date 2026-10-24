import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'sql',
  title: 'SQL',
  short: 'Query and shape data like a pro.',
  description: 'Learn the language of relational databases, from basic queries to window functions, performance tuning, and schema design.',
  category: 'skill',
  accent: '#64748b',
  tags: ['databases', 'data'],
  query: 'SQL',
  sections: [
    {
      title: 'Basics',
      level: 'beginner',
      description: 'Read data.',
      topics: [
        ['SELECT & FROM', 1, 'Retrieve columns from tables.'],
        ['WHERE & operators', 2, 'Filter rows with comparisons, IN, BETWEEN, LIKE.'],
        ['ORDER BY & LIMIT', 1, 'Sort and paginate results.'],
        ['NULL handling', 1, 'IS NULL, COALESCE, and three-valued logic.'],
      ],
    },
    {
      title: 'Combining Data',
      level: 'beginner',
      description: 'Bring tables together.',
      topics: [
        ['INNER & OUTER joins', 3, 'Match rows across tables.'],
        ['Aggregates & GROUP BY', 3, 'Summaries per group, filtered with HAVING.'],
        ['Subqueries', 2, 'Queries inside queries.'],
        ['UNION & set operations', 1, 'Stack and compare result sets.'],
      ],
    },
    {
      title: 'Writing Data',
      level: 'intermediate',
      description: 'Change data safely.',
      topics: [
        ['INSERT, UPDATE, DELETE', 2, 'Modify rows.'],
        ['Constraints & keys', 2, 'Primary, foreign, unique, and check constraints.'],
        ['Transactions', 2, 'BEGIN, COMMIT, ROLLBACK.'],
        ['Upserts', 1, 'Insert or update in one statement.'],
      ],
    },
    {
      title: 'Advanced Querying',
      level: 'intermediate',
      description: 'Powerful analytics.',
      topics: [
        ['Common table expressions', 2, 'Readable multi-step queries and recursion.'],
        ['Window functions', 4, 'ROW_NUMBER, RANK, LAG, LEAD, running totals.'],
        ['CASE expressions', 1, 'Conditional logic in queries.'],
        ['JSON in SQL', 2, 'Query semi-structured data.', { kind: 'optional' }],
      ],
      project: { title: 'Analytics query pack', description: 'Write a set of reusable queries for retention, funnels, and cohort revenue.' },
    },
    {
      title: 'Performance & Design',
      level: 'advanced',
      description: 'Make it fast and correct.',
      topics: [
        ['Indexes', 3, 'B-tree, composite, and covering indexes.'],
        ['EXPLAIN plans', 3, 'Understand how the planner executes queries.'],
        ['Normalisation', 2, 'Normal forms and pragmatic denormalisation.'],
        ['Views & materialised views', 2, 'Reusable and precomputed queries.'],
        ['Stored procedures & triggers', 2, 'Logic inside the database.', { kind: 'optional' }],
      ],
    },
  ],
})
