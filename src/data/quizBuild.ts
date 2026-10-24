import { slug } from './build'

export interface Question {
  q: string
  options: string[]
  answer: number // index into options
  explain: string
}

// Compact authoring format: [question, options, answerIndex, explanation]
export type QuestionTuple = [string, string[], number, string]

// Deterministically rotate options (seeded by the question text) so the
// correct answer doesn't always sit in the same position.
function place([q, options, answer, explain]: QuestionTuple): Question {
  let h = 0
  for (let i = 0; i < q.length; i++) h = (h * 31 + q.charCodeAt(i)) | 0
  const shift = Math.abs(h) % options.length
  const rotated = options.map((_, i) => options[(i + shift) % options.length])
  return { q, options: rotated, answer: (answer - shift + options.length) % options.length, explain }
}

export const build = (sections: Record<string, QuestionTuple[]>): Record<string, Question[]> =>
  Object.fromEntries(Object.entries(sections).map(([title, list]) => [slug(title), list.map(place)]))
