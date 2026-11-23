import type { Paper, PaperPart, PaperQuestion } from '../types'
import { PAPER_2025 } from './nov2025'
import { PAPER_2024 } from './nov2024'
import { PAPER_2023 } from './may2023'
import { PAPER_2018 } from './may2018'

/** Official papers, newest first. Each keeps its own header, marks and choice rules. */
export const PAPERS: Paper[] = [PAPER_2025, PAPER_2024, PAPER_2023, PAPER_2018]

const paperById = new Map(PAPERS.map((p) => [p.id, p]))
export const getPaper = (id: string): Paper | undefined => paperById.get(id)

export const partsOf = (paper: Paper): PaperPart[] => paper.questions.flatMap((q) => q.parts)

/** All paper parts across the desk, with their paper and question, for search and topic links. */
export const PAPER_PARTS = PAPERS.flatMap((paper) => paper.questions.flatMap((q) => q.parts.map((part) => ({ paper, question: q, part }))))

/** How many parts of a question a candidate answers. */
export const pickOf = (q: PaperQuestion): number => q.pick ?? q.parts.length

/** Marks a question is worth: the best `pick` parts. */
export function questionMax(q: PaperQuestion): number {
  return [...q.parts]
    .map((p) => p.marks)
    .sort((a, b) => b - a)
    .slice(0, pickOf(q))
    .reduce((s, m) => s + m, 0)
}

/** Marks a paper is worth: the best `attempt` questions (all of them when compulsory). */
export function paperMax(paper: Paper): number {
  return paper.questions
    .map(questionMax)
    .sort((a, b) => b - a)
    .slice(0, paper.attempt ?? paper.questions.length)
    .reduce((s, m) => s + m, 0)
}

/** Label printed before a part, e.g. "(a)", "(ii)"; empty for an unlettered question or an OR alternative. */
export const partLabel = (p: PaperPart): string => (p.label && p.label !== 'or' ? `(${p.label})` : '')

/**
 * Self-awarded score. Within a question only the best `pick` marked parts count (a candidate
 * answers "any two" or one side of an OR); across the paper only the best `attempt` questions
 * count ("answer any five").
 */
export function paperScore(paper: Paper, marks: Record<string, number>): { awarded: number; marked: number; max: number } {
  const perQuestion = paper.questions
    .map((q) => {
      const done = q.parts
        .filter((p) => marks[p.id] !== undefined)
        .map((p) => ({ awarded: marks[p.id], of: p.marks }))
        .sort((a, b) => b.awarded - a.awarded)
        .slice(0, pickOf(q))
      return { awarded: done.reduce((s, d) => s + d.awarded, 0), marked: done.reduce((s, d) => s + d.of, 0) }
    })
    .filter((q) => q.marked > 0)
    .sort((a, b) => b.awarded - a.awarded)
    .slice(0, paper.attempt ?? paper.questions.length)
  return {
    awarded: perQuestion.reduce((s, q) => s + q.awarded, 0),
    marked: perQuestion.reduce((s, q) => s + q.marked, 0),
    max: paperMax(paper),
  }
}

/** Which official papers examined a topic, for the topic page and dashboard. */
export function papersOfTopic(topicId: string): { paper: Paper; question: PaperQuestion; part: PaperPart }[] {
  return PAPER_PARTS.filter((x) => x.part.topicIds.includes(topicId))
}
