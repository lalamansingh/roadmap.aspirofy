import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'data-analyst',
  title: 'Data Analyst',
  short: 'Turn raw data into decisions.',
  description: 'Learn to clean, analyse, visualise, and communicate data so stakeholders can act on it with confidence.',
  category: 'role',
  accent: '#06b6d4',
  tags: ['data', 'sql', 'visualisation'],
  query: 'data analysis',
  sections: [
    {
      title: 'Foundations',
      level: 'beginner',
      description: 'Think like an analyst.',
      topics: [
        ['Asking good questions', 2, 'Translate vague business asks into measurable questions.'],
        ['Descriptive statistics', 4, 'Mean, median, variance, distributions, and outliers.'],
        ['Spreadsheets', 6, 'Formulas, lookups, pivot tables, and charts in Excel or Google Sheets.'],
        ['Data types & tidy data', 2, 'Structure datasets so analysis is straightforward.'],
      ],
    },
    {
      title: 'SQL for Analysis',
      level: 'beginner',
      description: 'The analyst\'s most-used tool.',
      topics: [
        ['Querying & filtering', 4, 'SELECT, WHERE, ORDER BY, and LIMIT.'],
        ['Aggregations & grouping', 3, 'COUNT, SUM, AVG with GROUP BY and HAVING.'],
        ['Joins', 3, 'Combine tables correctly and spot fan-out bugs.'],
        ['Window functions', 4, 'Running totals, rankings, and period-over-period comparisons.'],
        ['CTEs', 2, 'Readable, step-by-step queries.'],
      ],
      project: { title: 'E-commerce KPI report', description: 'Compute revenue, retention, and average order value by cohort from a sample store database.' },
    },
    {
      title: 'Python for Data',
      level: 'intermediate',
      description: 'Analysis that scales beyond spreadsheets.',
      topics: [
        ['Python basics', 6, 'Variables, lists, dicts, functions, and notebooks.'],
        ['pandas', 8, 'Load, clean, reshape, and aggregate tabular data.', 'https://pandas.pydata.org/docs/'],
        ['NumPy', 3, 'Fast numeric arrays underneath pandas.'],
        ['Data cleaning', 5, 'Handle missing values, duplicates, types, and messy text.'],
      ],
    },
    {
      title: 'Visualisation',
      level: 'intermediate',
      description: 'Show, don\'t tell.',
      topics: [
        ['Choosing the right chart', 2, 'Match chart types to comparisons, trends, and distributions.'],
        ['Matplotlib & Seaborn', 4, 'Static, publication-quality charts in Python.'],
        ['Tableau / Power BI', 10, 'Interactive dashboards for business users.'],
        ['Looker Studio', 4, 'Lightweight dashboards on Google data.', { kind: 'alternative' }],
      ],
      project: { title: 'Executive dashboard', description: 'Build an interactive dashboard with filters and a one-paragraph narrative for leadership.' },
    },
    {
      title: 'Statistics & Experimentation',
      level: 'advanced',
      description: 'Separate signal from noise.',
      topics: [
        ['Probability & distributions', 4, 'Normal, binomial, and why sample size matters.'],
        ['Hypothesis testing', 4, 'p-values, confidence intervals, and common misreadings.'],
        ['A/B testing', 4, 'Design, power analysis, and interpreting results.'],
        ['Regression', 5, 'Model relationships between variables.'],
      ],
    },
    {
      title: 'Communication',
      level: 'advanced',
      description: 'Insights only matter when acted on.',
      topics: [
        ['Data storytelling', 3, 'Structure findings around the decision to be made.'],
        ['Stakeholder management', 2, 'Set expectations and push back on misleading asks.'],
        ['Data ethics & privacy', 2, 'Handle personal data responsibly.'],
      ],
    },
  ],
})
