import type { Level, Project, Resource, Roadmap, Section, Topic, TopicKind } from './types'

// Compact authoring format: [title, estimatedHours, description, extra?]
// extra is a docs URL, or an object with docs / kind flags.
type Extra = string | { docs?: string; kind?: TopicKind }
export type TopicTuple = [string, number, string, Extra?]

export interface SectionInput {
  title: string
  description: string
  level: Level
  topics: TopicTuple[]
  project?: Project
}

export interface RoadmapInput extends Omit<Roadmap, 'sections'> {
  query: string
  sections: SectionInput[]
}

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

function resourcesFor(title: string, query: string, docs?: string): Resource[] {
  const q = encodeURIComponent(`${title} ${query}`)
  const list: Resource[] = []
  if (docs) list.push({ type: 'docs', title: 'Official documentation', url: docs })
  list.push(
    { type: 'article', title: 'Read articles & guides', url: `https://www.google.com/search?q=${q}+guide` },
    { type: 'video', title: 'Watch video tutorials', url: `https://www.youtube.com/results?search_query=${q}+tutorial` },
    { type: 'practice', title: 'Find practice exercises', url: `https://www.google.com/search?q=${q}+exercises+practice` },
  )
  return list
}

export function buildRoadmap(input: RoadmapInput): Roadmap {
  const { query, sections, ...meta } = input
  const seen = new Set<string>()
  const built: Section[] = sections.map((s) => {
    const sectionId = slug(s.title)
    const topics: Topic[] = s.topics.map(([title, hours, description, extra]) => {
      let id = slug(title)
      if (seen.has(id)) id = `${sectionId}--${id}`
      seen.add(id)
      const opts = typeof extra === 'string' ? { docs: extra } : (extra ?? {})
      return {
        id,
        title,
        description,
        hours,
        level: s.level,
        kind: opts.kind ?? 'core',
        resources: resourcesFor(title, query, opts.docs),
      }
    })
    return { id: sectionId, title: s.title, description: s.description, level: s.level, topics, project: s.project }
  })
  return { ...meta, sections: built }
}
