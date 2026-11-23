import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { QUESTIONS, QUESTION_TYPE_LABEL, TOPICS, UNITS, getQuestion, getTopic } from '../content'
import type { Question } from '../content/types'
import { isWeak, recordAttempt, saveQuiz, useStore } from '../lib/store'
import { Markdown } from '../components/Markdown'
import { QuestionCard } from '../components/study'
import { Chip, Empty, PageHeader, btn, select } from '../components/ui'

const MODES = [
  { id: 'practice', label: 'Practice', blurb: 'Work through questions at your own pace, with hints and model answers on demand.' },
  { id: 'quiz', label: 'Quiz', blurb: 'A round of MCQs drawn at random. Answers are revealed only when you submit.' },
  { id: 'revision', label: 'Revision', blurb: 'Questions you missed, plus everything from topics you marked difficult or “needs revision”.' },
] as const
type Mode = (typeof MODES)[number]['id']

export function QuestionsPage() {
  const [params, setParams] = useSearchParams()
  const mode = (MODES.some((m) => m.id === params.get('mode')) ? params.get('mode') : 'practice') as Mode

  return (
    <div>
      <PageHeader eyebrow="Question bank" title="Practise, quiz, revise">
        {QUESTIONS.length} questions: MCQs, short and long answers, derivations, numericals and diagram questions. Textbook questions cite Rathore’s chapter and
        page. Where the book prints an answer, it is shown next to the independently worked one.
      </PageHeader>
      <div role="tablist" aria-label="Mode" className="mb-2 inline-flex rounded-lg border border-rule bg-surface p-0.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setParams(m.id === 'practice' ? {} : { mode: m.id })}
            className={`rounded-md px-4 py-1.5 text-sm ${mode === m.id ? 'bg-ink font-medium text-paper' : 'text-ink-2 hover:text-ink'}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="mb-8 text-sm text-muted">{MODES.find((m) => m.id === mode)?.blurb}</p>
      {mode === 'practice' && <Practice focus={params.get('q')} />}
      {mode === 'quiz' && <Quiz />}
      {mode === 'revision' && <Revision />}
    </div>
  )
}

/* ---------------------------------------------------------------- practice */

function Practice({ focus }: { focus: string | null }) {
  const attempts = useStore((s) => s.attempts)
  const [unit, setUnit] = useState('all')
  const [topic, setTopic] = useState('all')
  const [type, setType] = useState('all')
  const [diff, setDiff] = useState('all')
  const [source, setSource] = useState('all')
  const [state, setState] = useState('all')

  useEffect(() => {
    if (!focus) return
    const q = getQuestion(focus)
    if (!q) return
    requestAnimationFrame(() => document.getElementById(focus)?.scrollIntoView({ block: 'start' }))
  }, [focus])

  const list = useMemo(
    () =>
      QUESTIONS.filter((q) => {
        if (focus) return q.id === focus
        const t = getTopic(q.topicId)
        const a = attempts[q.id]
        if (unit !== 'all' && t?.unitId !== unit) return false
        if (topic !== 'all' && q.topicId !== topic) return false
        if (type !== 'all' && q.type !== type) return false
        if (diff !== 'all' && String(q.difficulty) !== diff) return false
        if (source !== 'all' && q.source.kind !== source) return false
        if (state === 'new' && (a?.tries ?? 0) > 0) return false
        if (state === 'done' && !a?.done) return false
        if (state === 'weak' && !isWeak(a)) return false
        return true
      }),
    [unit, topic, type, diff, source, state, attempts, focus],
  )

  const topicOptions = TOPICS.filter((t) => unit === 'all' || t.unitId === unit)

  return (
    <div>
      {focus ? (
        <p className="mb-4 text-sm text-ink-2">
          Showing one question from search.{' '}
          <Link to="/questions" className="text-cool underline underline-offset-2">
            Show all questions
          </Link>
        </p>
      ) : (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <select
            className={select}
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value)
              setTopic('all')
            }}
            aria-label="Unit"
          >
            <option value="all">All units</option>
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.number}: {u.title}
              </option>
            ))}
          </select>
          <select className={`${select} max-w-[240px]`} value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Topic">
            <option value="all">All topics</option>
            {topicOptions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          <select className={select} value={type} onChange={(e) => setType(e.target.value)} aria-label="Question type">
            <option value="all">All types</option>
            {Object.entries(QUESTION_TYPE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select className={select} value={diff} onChange={(e) => setDiff(e.target.value)} aria-label="Difficulty">
            <option value="all">Any difficulty</option>
            <option value="1">Basic</option>
            <option value="2">Standard</option>
            <option value="3">Challenging</option>
          </select>
          <select className={select} value={source} onChange={(e) => setSource(e.target.value)} aria-label="Source">
            <option value="all">Any source</option>
            <option value="textbook">From Rathore</option>
            <option value="generated">Generated</option>
          </select>
          <select className={select} value={state} onChange={(e) => setState(e.target.value)} aria-label="Progress">
            <option value="all">Any progress</option>
            <option value="new">Not attempted</option>
            <option value="done">Marked done</option>
            <option value="weak">Weak</option>
          </select>
          <span className="num ml-auto text-xs text-muted">{list.length} shown</span>
        </div>
      )}
      {list.length === 0 ? (
        <Empty title="No questions match these filters" />
      ) : (
        <div className="space-y-5">
          {list.map((q) => (
            <QuestionCard key={q.id} q={q} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- quiz */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function Quiz() {
  const quizzes = useStore((s) => s.quizzes)
  const [units, setUnits] = useState<string[]>([])
  const [count, setCount] = useState(10)
  const [items, setItems] = useState<Question[] | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [i, setI] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const pool = QUESTIONS.filter((q) => q.type === 'mcq' && (units.length === 0 || units.includes(getTopic(q.topicId)?.unitId ?? '')))

  const start = () => {
    const picked = shuffle(pool).slice(0, Math.min(count, pool.length))
    setItems(picked)
    setAnswers(picked.map(() => null))
    setI(0)
    setSubmitted(false)
  }

  const submit = () => {
    if (!items) return
    const results = items.map((q, k) => ({ qid: q.id, chosen: answers[k], correct: answers[k] === q.answer }))
    results.forEach((r) => recordAttempt(r.qid, r.correct ? 'correct' : 'wrong'))
    saveQuiz({
      id: `quiz-${Date.now()}`,
      at: Date.now(),
      scope: units.length === 0 ? 'All units' : units.map((u) => `Unit ${UNITS.find((x) => x.id === u)?.number}`).join(', '),
      total: items.length,
      score: results.filter((r) => r.correct).length,
      items: results,
    })
    setSubmitted(true)
  }

  if (!items) {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <div className="mb-2 text-sm font-medium text-ink">Units</div>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={units.length === 0} onClick={() => setUnits([])}>
              All
            </Chip>
            {UNITS.map((u) => (
              <Chip key={u.id} active={units.includes(u.id)} onClick={() => setUnits((s) => (s.includes(u.id) ? s.filter((x) => x !== u.id) : [...s, u.id]))}>
                {u.number}. {u.title}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium text-ink">Questions</div>
          <div className="flex gap-1.5">
            {[5, 10, 20].map((n) => (
              <Chip key={n} active={count === n} onClick={() => setCount(n)}>
                {n}
              </Chip>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">{pool.length} MCQs available in this selection.</p>
        </div>
        <button className={btn.primary} onClick={start} disabled={pool.length === 0}>
          Start quiz
        </button>

        {quizzes.length > 0 && (
          <div className="pt-4">
            <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">Past quizzes</h2>
            <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface text-sm">
              {quizzes.slice(0, 8).map((qz) => (
                <li key={qz.id} className="flex items-center gap-3 px-4 py-2">
                  <span className="num font-medium text-ink">
                    {qz.score}/{qz.total}
                  </span>
                  <span className="flex-1 truncate text-ink-2">{qz.scope}</span>
                  <span className="num text-xs text-muted">{new Date(qz.at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  if (submitted) {
    const score = items.filter((q, k) => answers[k] === q.answer).length
    return (
      <div className="max-w-3xl">
        <div className="mb-8 flex items-center gap-4 rounded-xl border border-rule bg-surface px-5 py-4">
          <div className="num text-3xl font-semibold text-ink">
            {score}/{items.length}
          </div>
          <div className="flex-1 text-sm text-ink-2">
            {score === items.length ? 'Clean sweep.' : 'Wrong answers are now in Revision mode. Review the explanations below.'}
          </div>
          <button className={btn.primary} onClick={() => setItems(null)}>
            New quiz
          </button>
        </div>
        <ol className="space-y-4">
          {items.map((q, k) => {
            const ok = answers[k] === q.answer
            return (
              <li key={q.id} className={`rounded-xl border bg-surface px-5 py-4 ${ok ? 'border-rule' : 'border-heat/50'}`}>
                <div className="mb-2 flex items-start gap-2">
                  {ok ? <Check size={16} className="mt-1 shrink-0 text-ok" aria-label="Correct" /> : <X size={16} className="mt-1 shrink-0 text-heat" aria-label="Incorrect" />}
                  <Markdown tight>{q.prompt}</Markdown>
                </div>
                <p className="pl-6 text-[13px] text-ink-2">
                  Your answer: {answers[k] === null ? <i>none</i> : q.options?.[answers[k] as number]} {!ok && <>· Correct: <b>{q.options?.[q.answer ?? 0]}</b></>}
                </p>
                <div className="mt-2 pl-6 text-[13.5px]">
                  <Markdown tight>{q.solution}</Markdown>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  const q = items[i]
  const answeredCount = answers.filter((a) => a !== null).length
  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="num text-sm text-muted">
          {i + 1} / {items.length}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-sunken">
          <div className="h-full bg-heat transition-[width]" style={{ width: `${((i + 1) / items.length) * 100}%` }} />
        </div>
      </div>
      <div className="rounded-xl border border-rule bg-surface px-5 py-5">
        <div className="mb-1 text-xs text-muted">{getTopic(q.topicId)?.title}</div>
        <Markdown tight>{q.prompt}</Markdown>
        <ul className="mt-4 grid gap-2">
          {q.options?.map((opt, k) => (
            <li key={k}>
              <button
                onClick={() => setAnswers((a) => a.map((x, idx) => (idx === i ? k : x)))}
                aria-pressed={answers[i] === k}
                className={`flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14px] ${
                  answers[i] === k ? 'border-ink bg-sunken' : 'border-rule bg-paper hover:border-rule-strong'
                }`}
              >
                <span className="num mt-px w-4 text-xs text-muted">{String.fromCharCode(65 + k)}</span>
                <span className="flex-1">
                  <Markdown tight>{opt}</Markdown>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button className={btn.secondary} onClick={() => setI((x) => x - 1)} disabled={i === 0}>
          Back
        </button>
        {i < items.length - 1 ? (
          <button className={btn.primary} onClick={() => setI((x) => x + 1)}>
            Next
          </button>
        ) : (
          <button className={btn.primary} onClick={submit}>
            Submit ({answeredCount}/{items.length} answered)
          </button>
        )}
        <button className={`${btn.ghost} ml-auto`} onClick={() => setItems(null)}>
          Abandon
        </button>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- revision */

function Revision() {
  const s = useStore((x) => x)
  const flaggedTopics = new Set(TOPICS.filter((t) => s.topics[t.id]?.status === 'revision' || s.topics[t.id]?.difficult).map((t) => t.id))
  const list = QUESTIONS.filter((q) => isWeak(s.attempts[q.id]) || flaggedTopics.has(q.topicId))
  if (list.length === 0) {
    return (
      <Empty title="Nothing to revise yet">
        Questions you get wrong, or mark “Missed it”, collect here — along with every question from topics you flag as difficult or “needs revision”.
      </Empty>
    )
  }
  return (
    <div className="space-y-5">
      <p className="text-sm text-ink-2">
        {list.filter((q) => isWeak(s.attempts[q.id])).length} weak questions · {flaggedTopics.size} flagged topic{flaggedTopics.size === 1 ? '' : 's'}
      </p>
      {list.map((q) => (
        <QuestionCard key={q.id} q={q} />
      ))}
    </div>
  )
}
