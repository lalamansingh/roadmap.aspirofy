import { buildRoadmap } from '../build'

export default buildRoadmap({
  id: 'system-design',
  title: 'System Design',
  short: 'Architect systems that scale and survive failure.',
  description: 'The building blocks and trade-offs behind large-scale distributed systems, plus a framework for design interviews.',
  category: 'skill',
  accent: '#f97316',
  tags: ['architecture', 'interviews'],
  query: 'system design',
  sections: [
    {
      title: 'Fundamentals',
      level: 'beginner',
      description: 'Vocabulary of scale.',
      topics: [
        ['Latency vs throughput', 1, 'Two different ways to measure performance.'],
        ['Availability & reliability', 2, 'Nines, redundancy, and failure domains.'],
        ['Vertical vs horizontal scaling', 1, 'Bigger machines or more machines.'],
        ['Back-of-envelope estimation', 3, 'Estimate QPS, storage, and bandwidth quickly.'],
      ],
    },
    {
      title: 'Building Blocks',
      level: 'intermediate',
      description: 'Components you combine.',
      topics: [
        ['Load balancers', 2, 'Distribute traffic and remove unhealthy nodes.'],
        ['Caches & CDNs', 3, 'Serve hot data fast and close to users.'],
        ['Databases: SQL vs NoSQL', 3, 'Pick storage by access patterns.'],
        ['Message queues', 2, 'Buffer and decouple work.'],
        ['Object & blob storage', 1, 'Store large files cheaply.'],
        ['API gateways', 2, 'Auth, routing, and rate limiting at the edge.'],
      ],
    },
    {
      title: 'Distributed Systems',
      level: 'advanced',
      description: 'Where it gets hard.',
      topics: [
        ['CAP & PACELC', 2, 'Consistency trade-offs under partition and latency.'],
        ['Replication', 3, 'Leader-follower, multi-leader, and leaderless.'],
        ['Partitioning & sharding', 3, 'Spread data and load; consistent hashing.'],
        ['Consensus', 3, 'Raft and Paxos at a conceptual level.'],
        ['Idempotency & exactly-once', 2, 'Make retries safe.'],
      ],
    },
    {
      title: 'Case Studies',
      level: 'advanced',
      description: 'Practice end-to-end designs.',
      topics: [
        ['Design a URL shortener', 2, 'Hashing, storage, and redirects at scale.'],
        ['Design a news feed', 3, 'Fan-out on write vs read.'],
        ['Design a chat system', 3, 'Presence, delivery guarantees, and WebSockets.'],
        ['Design a rate limiter', 2, 'Token bucket and sliding window algorithms.'],
        ['Design video streaming', 3, 'Transcoding, CDNs, and adaptive bitrate.'],
      ],
      project: { title: 'Design doc portfolio', description: 'Write three full design docs with diagrams, capacity estimates, and trade-off analysis.' },
    },
  ],
})
