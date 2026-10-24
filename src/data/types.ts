export type Status = 'pending' | 'in-progress' | 'done' | 'skipped'
export type Level = 'beginner' | 'intermediate' | 'advanced'
export type TopicKind = 'core' | 'optional' | 'alternative'

export interface Resource {
  type: 'docs' | 'article' | 'video' | 'practice'
  title: string
  url: string
}

export interface Topic {
  id: string
  title: string
  description: string
  hours: number
  level: Level
  kind: TopicKind
  resources: Resource[]
}

export interface Project {
  title: string
  description: string
}

export interface Section {
  id: string
  title: string
  description: string
  level: Level
  topics: Topic[]
  project?: Project
}

export interface Roadmap {
  id: string
  title: string
  short: string
  description: string
  category: 'role' | 'skill'
  accent: string
  tags: string[]
  sections: Section[]
}
