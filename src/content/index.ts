import type { Formula, Question, Topic, Unit, UnitId, WorkedExample } from './types'
import { BOOK, TOTAL_HOURS, UNITS } from './syllabus'
import * as u1 from './units/u1'
import * as u2 from './units/u2'
import * as u3 from './units/u3'
import * as u4 from './units/u4'
import * as u5 from './units/u5'
import * as u6 from './units/u6'

/**
 * Single entry point for all study content. UI code imports from here only, so the
 * unit files can be reorganised without touching pages.
 */

const MODULES = [u1, u2, u3, u4, u5, u6]

export { BOOK, TOTAL_HOURS, UNITS }

export const TOPICS: Topic[] = MODULES.flatMap((m) => m.topics)
export const EXAMPLES: WorkedExample[] = MODULES.flatMap((m) => m.examples)
export const QUESTIONS: Question[] = MODULES.flatMap((m) => m.questions)
export const FORMULAS: Formula[] = MODULES.flatMap((m) => m.formulas)

function indexById<T extends { id: string }>(items: T[], what: string): Map<string, T> {
  const map = new Map<string, T>()
  for (const item of items) {
    if (map.has(item.id)) throw new Error(`Duplicate ${what} id "${item.id}"`)
    map.set(item.id, item)
  }
  return map
}

const unitById = indexById(UNITS, 'unit')
const topicById = indexById(TOPICS, 'topic')
const exampleById = indexById(EXAMPLES, 'example')
const questionById = indexById(QUESTIONS, 'question')
const formulaById = indexById(FORMULAS, 'formula')

export const getUnit = (id: string): Unit | undefined => unitById.get(id)
export const getTopic = (id: string): Topic | undefined => topicById.get(id)
export const getExample = (id: string): WorkedExample | undefined => exampleById.get(id)
export const getQuestion = (id: string): Question | undefined => questionById.get(id)
export const getFormula = (id: string): Formula | undefined => formulaById.get(id)

export const topicsOfUnit = (unitId: UnitId | string): Topic[] => TOPICS.filter((t) => t.unitId === unitId)
export const examplesOfTopic = (topicId: string): WorkedExample[] => EXAMPLES.filter((e) => e.topicId === topicId)
export const questionsOfTopic = (topicId: string): Question[] => QUESTIONS.filter((q) => q.topicId === topicId)
export const formulasOfTopic = (topicId: string): Formula[] => FORMULAS.filter((f) => f.topicId === topicId)

export function unitOfTopic(topicId: string): Unit | undefined {
  const t = getTopic(topicId)
  return t ? getUnit(t.unitId) : undefined
}

/** All flashcards with their topic, for revision mode. */
export const FLASHCARDS = TOPICS.flatMap((t) => t.flashcards.map((c) => ({ ...c, topicId: t.id, unitId: t.unitId })))

/** The previous and next topic in syllabus order, for page-to-page navigation. */
export function neighbours(topicId: string): { prev?: Topic; next?: Topic } {
  const i = TOPICS.findIndex((t) => t.id === topicId)
  if (i < 0) return {}
  return { prev: TOPICS[i - 1], next: TOPICS[i + 1] }
}

export const QUESTION_TYPE_LABEL: Record<Question['type'], string> = {
  mcq: 'MCQ',
  conceptual: 'Conceptual',
  short: 'Short answer',
  long: 'Long answer',
  numerical: 'Numerical',
  derivation: 'Derivation',
  application: 'Application',
  diagram: 'Diagram',
}

export const DIFFICULTY_LABEL = { 1: 'Basic', 2: 'Standard', 3: 'Challenging' } as const

export function sourceLabel(s: WorkedExample['source']): string {
  return s.kind === 'textbook' ? `Rathore · ${s.ref} · p. ${s.page}` : 'Generated for practice'
}
