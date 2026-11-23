/**
 * Content model for the Thermal Engineering desk.
 *
 * All study material lives in plain TypeScript objects under src/content so it can be
 * corrected or extended without touching UI code. Every item carries a source
 * attribution: either a textbook reference (Rathore, Thermal Engineering, TMH 2010)
 * or an explicit "generated" / "supplementary" marker.
 *
 * Markdown fields support GitHub-flavoured markdown, $inline$ and $$display$$ KaTeX,
 * callouts written as `> [!DEF] Term`, `> [!EXAM]`, `> [!WARN]`, `> [!NOTE]`, `> [!SUPP]`,
 * and inline diagrams written as `![Caption](diagram:<diagram-id>)`.
 */

export type UnitId = 'u1' | 'u2' | 'u3' | 'u4' | 'u5' | 'u6'

/** How well the textbook covers a syllabus topic. */
export type Coverage = 'full' | 'partial' | 'missing'

export interface BookRef {
  chapter: number
  /** e.g. "§25.12.5" */
  section?: string
  /** printed page numbers, e.g. "866–868" */
  pages: string
}

export interface Unit {
  id: UnitId
  number: number
  title: string
  hours: number
  /** syllabus text, verbatim from the official syllabus */
  syllabus: string
  chapterNote: string
  refs: BookRef[]
}

export interface TheorySection {
  id: string
  title: string
  /** markdown */
  body: string
  /** true when the section is NOT from the textbook (gap-filling material) */
  supplementary?: boolean
}

export interface DerivationStep {
  /** KaTeX (display) */
  math: string
  /** why this step is performed — markdown */
  why: string
}

export interface Derivation {
  id: string
  title: string
  /** what we are proving, markdown */
  goal: string
  assumptions?: string[]
  steps: DerivationStep[]
  /** final boxed result, KaTeX */
  result: string
  ref?: BookRef
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface Topic {
  id: string
  unitId: UnitId
  title: string
  /** one-line summary used in lists */
  summary: string
  /** the syllabus phrase(s) this topic answers to */
  syllabusPhrases: string[]
  coverage: Coverage
  coverageNote?: string
  /** highlighted in yellow on the user's syllabus copy */
  highlighted?: boolean
  refs: BookRef[]
  sections: TheorySection[]
  derivations?: Derivation[]
  /** exam-oriented takeaways; also the topic's revision notes */
  keyPoints: string[]
  misconceptions?: string[]
  flashcards: Flashcard[]
  diagrams?: string[]
}

export type Difficulty = 1 | 2 | 3

export type Source =
  | { kind: 'textbook'; ref: string; page: number }
  | { kind: 'generated' }

export interface WorkedExample {
  id: string
  topicId: string
  title: string
  source: Source
  difficulty: Difficulty
  /** markdown problem statement (textbook wording kept where the source is textbook) */
  statement: string
  given: string[]
  find: string[]
  /** principle / formulas used, markdown */
  approach: string
  steps: { label: string; work: string }[]
  answer: string
  concept: string
  observations?: string[]
  /** note on independent re-calculation, e.g. book rounding differences */
  checkNote?: string
}

export type QuestionType =
  | 'mcq'
  | 'conceptual'
  | 'short'
  | 'long'
  | 'numerical'
  | 'derivation'
  | 'application'
  | 'diagram'

export interface Question {
  id: string
  topicId: string
  type: QuestionType
  difficulty: Difficulty
  prompt: string
  source: Source
  hints?: string[]
  /** for mcq */
  options?: string[]
  answer?: number
  /** worked solution / model answer (markdown). For MCQs: explanation */
  solution: string
  /** answer printed in the book, when the book gives one */
  bookAnswer?: string
}

export interface FormulaVar {
  sym: string
  meaning: string
  unit: string
}

export interface Formula {
  id: string
  topicId: string
  name: string
  latex: string
  vars: FormulaVar[]
  conditions: string
  meaning: string
  important?: boolean
  related?: string[]
  ref?: BookRef
}

export type DiagramKind = 'computed' | 'recreated' | 'qualitative' | 'interactive'

export interface DiagramMeta {
  id: string
  title: string
  topicId: string
  kind: DiagramKind
  caption: string
  /** which book figure it corresponds to, if any */
  bookFigure?: string
}
