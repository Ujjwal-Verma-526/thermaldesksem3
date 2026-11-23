import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, Copy, Eye, Lightbulb, RotateCcw, X } from 'lucide-react'
import type { Derivation, Formula, Question, WorkedExample } from '../content/types'
import { QUESTION_TYPE_LABEL, getTopic } from '../content'
import { markHintUsed, markQuestionDone, recordAttempt, useStore } from '../lib/store'
import { Markdown } from './Markdown'
import { Tex } from './Tex'
import { BookmarkButton, DifficultyDots, SourceTag, btn } from './ui'

/* ------------------------------------------------------------------------------
 * Derivation — revealed one step at a time
 * ---------------------------------------------------------------------------- */

export function DerivationView({ d }: { d: Derivation }) {
  const [shown, setShown] = useState(1)
  const all = shown >= d.steps.length
  return (
    <section className="rounded-xl border border-rule bg-surface" aria-labelledby={`${d.id}-t`}>
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-rule px-5 py-4">
        <div>
          <h3 id={`${d.id}-t`} className="font-semibold text-ink">
            {d.title}
          </h3>
          <Markdown tight className="mt-1 text-ink-2">
            {d.goal}
          </Markdown>
        </div>
        {d.ref && (
          <span className="num text-[11px] text-muted">
            Rathore Ch {d.ref.chapter} {d.ref.section} · p. {d.ref.pages}
          </span>
        )}
      </header>
      {d.assumptions && (
        <div className="border-b border-rule bg-sunken px-5 py-3 text-[13px] text-ink-2">
          <span className="font-medium text-ink">Assumptions: </span>
          {d.assumptions.join('; ')}.
        </div>
      )}
      <ol className="divide-y divide-rule">
        {d.steps.slice(0, shown).map((s, i) => (
          <li key={i} className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[28px_1fr]">
            <span className="num pt-1 text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
            <div className="min-w-0">
              <Tex math={s.math} display />
              <Markdown tight className="mt-1 text-[14px] text-ink-2">
                {s.why}
              </Markdown>
            </div>
          </li>
        ))}
      </ol>
      {all ? (
        <div className="border-t border-rule bg-heat-soft/60 px-5 py-4">
          <div className="num mb-1 text-[10px] uppercase tracking-[0.12em] text-heat">Result</div>
          <Tex math={`\\boxed{${d.result}}`} display />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 border-t border-rule px-5 py-3">
          <button className={btn.primary} onClick={() => setShown((n) => n + 1)}>
            Next step <span className="num text-[11px] opacity-70">{shown + 1}/{d.steps.length}</span>
          </button>
          <button className={btn.ghost} onClick={() => setShown(d.steps.length)}>
            Show all steps
          </button>
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------------------
 * Worked example — the 10-part structure, solution steps revealed on demand
 * ---------------------------------------------------------------------------- */

export function ExampleView({ e, headingLevel = 'h2' }: { e: WorkedExample; headingLevel?: 'h2' | 'h3' }) {
  const [shown, setShown] = useState(0)
  const H = headingLevel
  const topic = getTopic(e.topicId)
  const total = e.steps.length
  const solved = shown >= total
  return (
    <article className="overflow-hidden rounded-xl border border-rule bg-surface">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-rule px-5 py-4">
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <SourceTag source={e.source} />
            <DifficultyDots level={e.difficulty} />
          </div>
          <H className="text-[17px] font-semibold text-ink">{e.title}</H>
          {topic && (
            <Link to={`/topic/${topic.id}`} className="text-xs text-muted hover:text-cool">
              {topic.title}
            </Link>
          )}
        </div>
        <BookmarkButton kind="example" id={e.id} label={e.title} />
      </header>

      <div className="space-y-5 px-5 py-5">
        <Part n={1} label={e.source.kind === 'textbook' ? 'Problem (textbook wording)' : 'Problem'}>
          <Markdown tight>{e.statement}</Markdown>
        </Part>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Part n={2} label="Given">
            <ul className="list-disc space-y-0.5 pl-5 text-[14px] text-ink-2">
              {e.given.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </Part>
          <Part n={3} label="To find">
            <ul className="list-disc space-y-0.5 pl-5 text-[14px] text-ink-2">
              {e.find.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </Part>
        </div>
        <Part n={4} label="Approach">
          <Markdown tight>{e.approach}</Markdown>
        </Part>

        <Part n={5} label={`Solution · ${Math.min(shown, total)}/${total} steps`}>
          {shown === 0 && <p className="text-sm text-muted">Try it yourself first, then reveal the solution one step at a time.</p>}
          <ol className="space-y-3">
            {e.steps.slice(0, shown).map((s, i) => (
              <li key={i} className="rounded-lg border border-rule bg-paper px-4 py-3">
                <div className="mb-1 text-[13px] font-medium text-ink">{s.label}</div>
                <Markdown tight>{s.work}</Markdown>
              </li>
            ))}
          </ol>
          {!solved && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button className={btn.primary} onClick={() => setShown((n) => n + 1)}>
                {shown === 0 ? 'Reveal first step' : 'Next step'}
              </button>
              <button className={btn.ghost} onClick={() => setShown(total)}>
                Show full solution
              </button>
            </div>
          )}
        </Part>

        {solved && (
          <>
            <Part n={6} label="Answer">
              <div className="rounded-lg border-l-[3px] border-heat bg-heat-soft px-4 py-3">
                <Markdown tight>{e.answer}</Markdown>
              </div>
            </Part>
            <Part n={7} label="Concept tested">
              <p className="text-[14px] text-ink-2">{e.concept}</p>
            </Part>
            {e.observations && (
              <Part n={8} label="Observations">
                <ul className="list-disc space-y-0.5 pl-5 text-[14px] text-ink-2">
                  {e.observations.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </Part>
            )}
            {e.checkNote && (
              <Part n={9} label="Independent check">
                <Markdown tight>{e.checkNote}</Markdown>
              </Part>
            )}
            <Part n={10} label="Source">
              <p className="text-[13px] text-muted">
                {e.source.kind === 'textbook'
                  ? `Rathore, Thermal Engineering (TMH 2010), ${e.source.ref}, p. ${e.source.page}. Numbers re-computed independently.`
                  : 'Generated for practice — not from the textbook. Numbers computed independently.'}
              </p>
            </Part>
            <button className={btn.ghost} onClick={() => setShown(0)}>
              <RotateCcw size={14} aria-hidden /> Hide solution
            </button>
          </>
        )}
      </div>
    </article>
  )
}

function Part({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-1.5 flex items-baseline gap-2">
        <span className="num text-[10px] text-muted">{String(n).padStart(2, '0')}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-2">{label}</span>
      </div>
      {children}
    </section>
  )
}

/* ------------------------------------------------------------------------------
 * Question card — practice mode. The answer is never shown up front.
 * ---------------------------------------------------------------------------- */

export function QuestionCard({ q, showTopic = true }: { q: Question; showTopic?: boolean }) {
  const attempt = useStore((s) => s.attempts[q.id])
  const [hints, setHints] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [selfGraded, setSelfGraded] = useState(false)
  const topic = getTopic(q.topicId)
  const isMcq = q.type === 'mcq'

  const choose = (i: number) => {
    if (chosen !== null) return
    setChosen(i)
    recordAttempt(q.id, i === q.answer ? 'correct' : 'wrong')
  }

  const showHint = () => {
    setHints((h) => h + 1)
    markHintUsed(q.id)
  }

  const grade = (ok: boolean) => {
    recordAttempt(q.id, ok ? 'self-ok' : 'self-miss')
    setSelfGraded(true)
  }

  const reset = () => {
    setChosen(null)
    setRevealed(false)
    setSelfGraded(false)
    setHints(0)
  }

  const answered = isMcq ? chosen !== null : revealed

  return (
    <article id={q.id} className="scroll-mt-24 rounded-xl border border-rule bg-surface">
      <header className="flex flex-wrap items-center gap-2 border-b border-rule px-5 py-2.5">
        <span className="rounded-md bg-sunken px-1.5 py-0.5 text-[11px] font-medium text-ink-2">{QUESTION_TYPE_LABEL[q.type]}</span>
        <DifficultyDots level={q.difficulty} />
        <SourceTag source={q.source} />
        {showTopic && topic && (
          <Link to={`/topic/${topic.id}?tab=practice`} className="truncate text-xs text-muted hover:text-cool">
            {topic.title}
          </Link>
        )}
        <span className="ml-auto flex items-center gap-1">
          {attempt && attempt.tries > 0 && (
            <span className="num text-[11px] text-muted" title="Correct / attempts">
              {attempt.correct}/{attempt.tries}
            </span>
          )}
          <label className="flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-muted hover:bg-sunken">
            <input type="checkbox" checked={!!attempt?.done} onChange={(e) => markQuestionDone(q.id, e.target.checked)} className="accent-[var(--ok)]" />
            Done
          </label>
          <BookmarkButton kind="question" id={q.id} label={q.prompt.slice(0, 80)} />
        </span>
      </header>

      <div className="space-y-4 px-5 py-4">
        <Markdown tight>{q.prompt}</Markdown>

        {isMcq && q.options && (
          <ul className="grid grid-cols-1 gap-2" role="list">
            {q.options.map((opt, i) => {
              const isAns = i === q.answer
              const isPick = i === chosen
              const state = chosen === null ? 'idle' : isAns ? 'right' : isPick ? 'wrong' : 'dim'
              return (
                <li key={i}>
                  <button
                    onClick={() => choose(i)}
                    disabled={chosen !== null}
                    className={`flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14px] transition-colors ${
                      state === 'idle'
                        ? 'border-rule bg-paper hover:border-rule-strong'
                        : state === 'right'
                          ? 'border-ok bg-ok-soft text-ink'
                          : state === 'wrong'
                            ? 'border-heat bg-heat-soft text-ink'
                            : 'border-rule bg-paper text-muted'
                    }`}
                  >
                    <span className="num mt-px w-4 shrink-0 text-xs text-muted">{String.fromCharCode(65 + i)}</span>
                    <span className="flex-1">
                      <Markdown tight>{opt}</Markdown>
                    </span>
                    {state === 'right' && <Check size={16} className="shrink-0 text-ok" aria-label="Correct answer" />}
                    {state === 'wrong' && <X size={16} className="shrink-0 text-heat" aria-label="Your answer, incorrect" />}
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {q.hints && q.hints.length > 0 && hints > 0 && (
          <ul className="space-y-1.5">
            {q.hints.slice(0, hints).map((h, i) => (
              <li key={i} className="flex gap-2 rounded-lg bg-warn-soft px-3 py-2 text-[13.5px] text-ink">
                <Lightbulb size={14} className="mt-0.5 shrink-0 text-warn" aria-hidden />
                <Markdown tight>{h}</Markdown>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {q.hints && hints < q.hints.length && !answered && (
            <button className={btn.secondary} onClick={showHint}>
              <Lightbulb size={14} aria-hidden /> Hint {hints + 1}/{q.hints.length}
            </button>
          )}
          {!isMcq && !revealed && (
            <button className={btn.secondary} onClick={() => setRevealed(true)}>
              <Eye size={14} aria-hidden /> I've attempted it — show model answer
            </button>
          )}
          {isMcq && chosen !== null && (
            <span className={`text-sm font-medium ${chosen === q.answer ? 'text-ok' : 'text-heat'}`}>
              {chosen === q.answer ? 'Correct.' : `Not quite — the answer is ${String.fromCharCode(65 + (q.answer ?? 0))}.`}
            </span>
          )}
          {answered && (
            <button className={btn.ghost} onClick={reset}>
              <RotateCcw size={14} aria-hidden /> Try again
            </button>
          )}
        </div>

        {answered && (
          <div className="rounded-lg border border-rule bg-paper px-4 py-3">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-2">{isMcq ? 'Explanation' : 'Model answer'}</div>
            <Markdown tight>{q.solution}</Markdown>
            {q.bookAnswer && (
              <p className="mt-2 text-[13px] text-muted">
                <span className="font-medium text-ink-2">Answer printed in Rathore:</span> {q.bookAnswer}
              </p>
            )}
            {!isMcq && !selfGraded && (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-rule pt-3">
                <span className="text-[13px] text-ink-2">How did you do?</span>
                <button className={btn.secondary} onClick={() => grade(true)}>
                  <Check size={14} className="text-ok" aria-hidden /> Got it
                </button>
                <button className={btn.secondary} onClick={() => grade(false)}>
                  <X size={14} className="text-heat" aria-hidden /> Missed it
                </button>
              </div>
            )}
            {selfGraded && <p className="mt-2 text-[12px] text-muted">Recorded. Missed questions show up in Revision → Weak spots.</p>}
          </div>
        )}
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------------------
 * Formula card
 * ---------------------------------------------------------------------------- */

export function FormulaCard({ f, showTopic = true, highlight = false }: { f: Formula; showTopic?: boolean; highlight?: boolean }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null)
  const topic = getTopic(f.topicId)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(f.latex)
      setCopied('ok')
    } catch (err) {
      console.error('[formula] clipboard write failed', err)
      setCopied('fail')
    }
    window.setTimeout(() => setCopied(null), 1600)
  }

  return (
    <article id={f.id} className={`scroll-mt-24 rounded-xl border bg-surface ${highlight ? 'border-heat' : 'border-rule'}`}>
      <header className="flex items-start gap-2 px-4 pt-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-semibold text-ink">
            {f.name}
            {f.important && <span className="ml-2 rounded bg-heat-soft px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-heat">Key</span>}
          </h3>
          {showTopic && topic && (
            <Link to={`/topic/${topic.id}`} className="text-xs text-muted hover:text-cool">
              {topic.title}
            </Link>
          )}
        </div>
        <button onClick={copy} className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-muted hover:bg-sunken hover:text-ink" title="Copy LaTeX">
          {copied === 'ok' ? <Check size={14} className="text-ok" /> : <Copy size={14} />}
          <span className="sr-only sm:not-sr-only">{copied === 'ok' ? 'Copied' : copied === 'fail' ? 'Copy failed' : 'LaTeX'}</span>
        </button>
        <BookmarkButton kind="formula" id={f.id} label={f.name} />
      </header>
      <div className="px-4 py-2">
        <Tex math={f.latex} display />
      </div>
      <div className="px-4 pb-3 text-[13px] text-ink-2">{f.meaning}</div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-1 border-t border-rule px-4 py-2 text-left text-xs text-muted hover:text-ink"
      >
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        Variables, units and conditions
      </button>
      {open && (
        <div className="space-y-3 border-t border-rule px-4 py-3 text-[13px]">
          {f.vars.length > 0 && (
            <table className="w-full">
              <tbody>
                {f.vars.map((v) => (
                  <tr key={v.sym} className="border-b border-rule last:border-0">
                    <td className="w-24 py-1.5 pr-3 align-top">
                      <Tex math={v.sym} />
                    </td>
                    <td className="py-1.5 pr-3 text-ink-2">{v.meaning}</td>
                    <td className="num py-1.5 text-right text-xs text-muted">{v.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="text-ink-2">
            <span className="font-medium text-ink">Valid when: </span>
            {f.conditions}
          </p>
          {f.ref && (
            <p className="num text-[11px] text-muted">
              Rathore Ch {f.ref.chapter} {f.ref.section} · p. {f.ref.pages}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
