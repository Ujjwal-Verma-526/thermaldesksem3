/**
 * Content validator. Run with `npm run validate`.
 *
 * Fails (exit code 1) on any structural problem in src/content:
 *  - duplicate ids across units, topics, examples, questions, formulas, flashcards, derivations
 *  - references to topics, formulas or diagrams that do not exist
 *  - MCQs without options or with an out-of-range answer index
 *  - any KaTeX expression that does not parse (throwOnError: true)
 *  - units or topics with no content
 */
import katex from 'katex'

// Node global, declared here so the script needs no @types/node.
declare const process: { exitCode?: number }

import { EXAMPLES, FORMULAS, QUESTIONS, TOPICS, UNITS } from '../src/content/index.ts'
import { DIAGRAMS } from '../src/diagrams/registry.tsx'

const errors: string[] = []
const warnings: string[] = []
const fail = (msg: string) => errors.push(msg)

/* ---------- unique ids ---------- */
const seen = new Map<string, string>()
function claim(id: string, what: string) {
  const prev = seen.get(id)
  if (prev) fail(`duplicate id "${id}" (${prev} and ${what})`)
  else seen.set(id, what)
}
UNITS.forEach((u) => claim(u.id, 'unit'))
TOPICS.forEach((t) => {
  claim(t.id, 'topic')
  t.flashcards.forEach((c) => claim(c.id, `flashcard in ${t.id}`))
  t.derivations?.forEach((d) => claim(d.id, `derivation in ${t.id}`))
  const sectionIds = new Set<string>()
  t.sections.forEach((s) => {
    if (sectionIds.has(s.id)) fail(`duplicate section id "${s.id}" in ${t.id}`)
    sectionIds.add(s.id)
  })
})
EXAMPLES.forEach((e) => claim(e.id, 'example'))
QUESTIONS.forEach((q) => claim(q.id, 'question'))
FORMULAS.forEach((f) => claim(f.id, 'formula'))

/* ---------- references ---------- */
const topicIds = new Set(TOPICS.map((t) => t.id))
const formulaIds = new Set(FORMULAS.map((f) => f.id))
const unitIds = new Set(UNITS.map((u) => u.id))

TOPICS.forEach((t) => {
  if (!unitIds.has(t.unitId)) fail(`topic ${t.id}: unknown unit ${t.unitId}`)
  t.diagrams?.forEach((d) => {
    if (!DIAGRAMS[d]) fail(`topic ${t.id}: unknown diagram "${d}"`)
  })
})
for (const [id, { meta }] of Object.entries(DIAGRAMS)) {
  if (!topicIds.has(meta.topicId)) fail(`diagram ${id}: unknown topic ${meta.topicId}`)
}
EXAMPLES.forEach((e) => topicIds.has(e.topicId) || fail(`example ${e.id}: unknown topic ${e.topicId}`))
QUESTIONS.forEach((q) => topicIds.has(q.topicId) || fail(`question ${q.id}: unknown topic ${q.topicId}`))
FORMULAS.forEach((f) => {
  if (!topicIds.has(f.topicId)) fail(`formula ${f.id}: unknown topic ${f.topicId}`)
  f.related?.forEach((r) => formulaIds.has(r) || fail(`formula ${f.id}: unknown related formula ${r}`))
})

/* ---------- MCQs ---------- */
QUESTIONS.forEach((q) => {
  if (q.type === 'mcq') {
    if (!q.options || q.options.length < 2) fail(`mcq ${q.id}: needs at least two options`)
    else if (q.answer === undefined || q.answer < 0 || q.answer >= q.options.length) fail(`mcq ${q.id}: answer index out of range`)
    else if (new Set(q.options).size !== q.options.length) fail(`mcq ${q.id}: duplicate options`)
  } else if (q.options || q.answer !== undefined) {
    fail(`question ${q.id}: options/answer given on a non-MCQ`)
  }
  if (q.source.kind === 'textbook' && !(q.source.page > 0)) fail(`question ${q.id}: textbook source without page`)
})

/* ---------- markdown: diagrams and maths ---------- */
function tex(expr: string, display: boolean, where: string) {
  try {
    katex.renderToString(expr, { throwOnError: true, displayMode: display, strict: 'ignore' })
  } catch (err) {
    fail(`${where}: KaTeX error in "${expr.slice(0, 70)}" — ${(err as Error).message.split('\n')[0]}`)
  }
}

function checkMarkdown(src: string | undefined, where: string) {
  if (!src) return
  for (const m of src.matchAll(/\]\(diagram:([\w-]+)\)/g)) {
    if (!DIAGRAMS[m[1]]) fail(`${where}: unknown inline diagram "${m[1]}"`)
  }
  // strip code spans, then pull display maths, then inline maths
  let rest = src.replace(/`[^`]*`/g, '')
  rest = rest.replace(/\$\$([\s\S]+?)\$\$/g, (_, e: string) => {
    tex(e.replace(/^\s*>\s?/gm, ''), true, where)
    return ' '
  })
  for (const m of rest.matchAll(/\$([^$\n]+?)\$/g)) tex(m[1], false, where)
  const dollars = (rest.match(/\$/g) ?? []).length
  if (dollars % 2 !== 0) fail(`${where}: unbalanced $ delimiters`)
  if (/\[!(\w+)\]/.test(src)) {
    for (const m of src.matchAll(/\[!(\w+)\]/g)) {
      if (!['DEF', 'EXAM', 'WARN', 'NOTE', 'SUPP', 'ERRATA', 'WHY'].includes(m[1])) fail(`${where}: unknown callout [!${m[1]}]`)
    }
  }
}

TOPICS.forEach((t) => {
  t.sections.forEach((s) => {
    checkMarkdown(s.body, `${t.id}/${s.id}`)
  })
  const supp = t.sections.filter((s) => s.supplementary)
  if (supp.length && !supp.some((s) => s.body.includes('[!SUPP]'))) fail(`${t.id}: supplementary sections but no [!SUPP] callout explaining the gap`)
  t.derivations?.forEach((d) => {
    checkMarkdown(d.goal, `${d.id}/goal`)
    d.steps.forEach((st, i) => {
      tex(st.math, true, `${d.id}/step ${i + 1}`)
      checkMarkdown(st.why, `${d.id}/why ${i + 1}`)
    })
    tex(d.result, true, `${d.id}/result`)
  })
})
EXAMPLES.forEach((e) => {
  ;[e.statement, e.approach, e.answer, e.checkNote].forEach((m) => checkMarkdown(m, e.id))
  e.steps.forEach((s, i) => checkMarkdown(s.work, `${e.id}/step ${i + 1}`))
})
QUESTIONS.forEach((q) => {
  checkMarkdown(q.solution, q.id)
  checkMarkdown(q.prompt, q.id)
})
FORMULAS.forEach((f) => {
  tex(f.latex, true, f.id)
  f.vars.forEach((v) => tex(v.sym, false, `${f.id}/var ${v.sym}`))
})

/* ---------- coverage ---------- */
UNITS.forEach((u) => {
  const ts = TOPICS.filter((t) => t.unitId === u.id)
  if (ts.length === 0) fail(`unit ${u.id} has no topics`)
  const qs = QUESTIONS.filter((q) => ts.some((t) => t.id === q.topicId))
  if (qs.length < 8) fail(`unit ${u.id} has only ${qs.length} questions`)
  if (!qs.some((q) => q.type === 'mcq')) fail(`unit ${u.id} has no MCQs`)
  if (!EXAMPLES.some((e) => ts.some((t) => t.id === e.topicId))) fail(`unit ${u.id} has no worked examples`)
  if (!FORMULAS.some((f) => ts.some((t) => t.id === f.topicId))) fail(`unit ${u.id} has no formulas`)
})
TOPICS.forEach((t) => {
  if (t.sections.length === 0) fail(`topic ${t.id} has no sections`)
  if (t.keyPoints.length === 0) fail(`topic ${t.id} has no key points`)
  if (t.flashcards.length === 0) fail(`topic ${t.id} has no flashcards`)
  if (t.coverage !== 'full' && !t.coverageNote) fail(`topic ${t.id}: ${t.coverage} coverage needs a coverageNote`)
  if (!QUESTIONS.some((q) => q.topicId === t.id)) warnings.push(`topic ${t.id} has no questions`)
})

/* ---------- report ---------- */
const count = (n: number, w: string) => `${n} ${w}`
console.log(
  [
    count(UNITS.length, 'units'),
    count(TOPICS.length, 'topics'),
    count(EXAMPLES.length, 'examples'),
    count(QUESTIONS.length, 'questions'),
    count(FORMULAS.length, 'formulas'),
    count(TOPICS.reduce((s, t) => s + t.flashcards.length, 0), 'flashcards'),
    count(Object.keys(DIAGRAMS).length, 'diagrams'),
  ].join(' · '),
)
warnings.forEach((w) => console.warn(`warn  ${w}`))
if (errors.length) {
  errors.forEach((e) => console.error(`error ${e}`))
  console.error(`\n${errors.length} error(s)`)
  process.exitCode = 1
} else {
  console.log('content OK')
}
