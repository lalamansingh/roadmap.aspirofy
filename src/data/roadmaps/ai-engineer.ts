import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'ai-engineer',
  title: 'AI Engineer',
  short: 'Build products on top of large language models.',
  description:
    'Learn to design, evaluate, and ship applications powered by foundation models — from prompting to retrieval, agents, and production operations.',
  category: 'role',
  accent: '#a855f7',
  tags: ['ai', 'llm', 'python'],
  query: 'AI engineering LLM',
  sections: [
    {
      title: 'Prerequisites',
      level: 'beginner',
      description: 'The base you will build on.',
      topics: [
        ['Python proficiency', 10, 'Comfortable with functions, classes, async, and virtual environments.'],
        ['Working with APIs', 3, 'HTTP requests, auth headers, JSON, and handling rate limits.'],
        ['Math intuition', 5, 'Vectors, probability, and what a gradient is — at a conceptual level.', { kind: 'optional' }],
      ],
    },
    {
      title: 'How LLMs Work',
      level: 'beginner',
      description: 'Enough theory to make good decisions.',
      topics: [
        ['Tokens & context windows', 2, 'How text becomes tokens and why context length matters for cost and quality.'],
        ['Transformers at a high level', 3, 'Attention, pre-training, and fine-tuning in plain terms.'],
        ['Sampling parameters', 1, 'Temperature, top-p, and max tokens and how they shape outputs.'],
        ['Model selection', 2, 'Trade-offs between capability, latency, cost, and open vs hosted models.'],
      ],
    },
    {
      title: 'Prompt Engineering',
      level: 'beginner',
      description: 'Getting reliable behaviour from a model.',
      topics: [
        ['System prompts & roles', 2, 'Set context, persona, and constraints clearly.'],
        ['Few-shot examples', 2, 'Show the model what good looks like.'],
        ['Structured outputs', 3, 'Get JSON that conforms to a schema reliably.'],
        ['Reasoning & decomposition', 2, 'Break hard problems into steps the model can handle.'],
      ],
      project: { title: 'Support ticket triager', description: 'Classify and summarise incoming tickets into a strict JSON schema with confidence scores.' },
    },
    {
      title: 'Embeddings & Retrieval',
      level: 'intermediate',
      description: 'Ground answers in your own data.',
      topics: [
        ['Embeddings', 3, 'Turn text into vectors that capture meaning.'],
        ['Vector databases', 3, 'pgvector, Pinecone, Qdrant, and approximate nearest neighbour search.'],
        ['Chunking strategies', 2, 'Split documents so retrieval returns useful context.'],
        ['RAG pipelines', 5, 'Retrieve, rerank, and generate with citations.'],
        ['Hybrid search & reranking', 3, 'Combine keyword and semantic search for better recall.'],
      ],
      project: { title: 'Docs Q&A bot', description: 'Answer questions about a documentation site with cited sources and a "don\'t know" fallback.' },
    },
    {
      title: 'Tools & Agents',
      level: 'intermediate',
      description: 'Let models take actions.',
      topics: [
        ['Tool / function calling', 3, 'Define tools with schemas and handle the call loop.'],
        ['Agent loops', 4, 'Plan, act, observe — and knowing when to stop.'],
        ['Model Context Protocol', 3, 'A standard way to connect models to tools and data sources.', 'https://modelcontextprotocol.io/'],
        ['Multi-agent patterns', 3, 'Orchestrators, sub-agents, and handing off work.', { kind: 'optional' }],
      ],
    },
    {
      title: 'Evaluation',
      level: 'intermediate',
      description: 'You cannot improve what you do not measure.',
      topics: [
        ['Building eval sets', 3, 'Curate representative inputs and expected behaviour.'],
        ['LLM-as-judge', 2, 'Grade outputs with rubrics and check judge agreement.'],
        ['Regression testing prompts', 2, 'Catch quality drops when prompts or models change.'],
        ['Human feedback loops', 2, 'Collect thumbs-up/down and use them to prioritise fixes.'],
      ],
    },
    {
      title: 'Production',
      level: 'advanced',
      description: 'Ship it responsibly.',
      topics: [
        ['Streaming responses', 2, 'Stream tokens to the UI for responsive experiences.'],
        ['Caching & cost control', 3, 'Prompt caching, batching, and choosing smaller models where possible.'],
        ['Observability & tracing', 3, 'Log prompts, latencies, token usage, and failures.'],
        ['Safety & guardrails', 3, 'Prompt-injection defences, content filtering, and PII handling.'],
      ],
    },
    {
      title: 'Customising Models',
      level: 'advanced',
      description: 'When prompting is not enough.',
      topics: [
        ['Fine-tuning basics', 5, 'When fine-tuning beats prompting and how to prepare data.', { kind: 'optional' }],
        ['Running open models', 4, 'Serve models locally or on GPUs with vLLM or Ollama.', { kind: 'optional' }],
        ['Multimodal inputs', 3, 'Work with images, audio, and documents.'],
      ],
      project: { title: 'Autonomous research assistant', description: 'An agent that searches, reads, and writes a cited report, with an eval suite tracking accuracy over time.' },
    },
  ],
})
