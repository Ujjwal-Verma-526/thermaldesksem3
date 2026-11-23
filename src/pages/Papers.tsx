import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, EyeOff, FileText, Play, Printer, RotateCcw, Square, Timer } from 'lucide-react'
import { OFFICIAL_PAPERS, PAPER_KINDS, PAPER_PARTS, getPaper, paperMax, paperScore, papersOfKind, partLabel, partsOf, pickOf, questionMax } from '../content/papers'
import { UNITS, getTopic } from '../content'
import type { Paper, PaperKind, PaperPart, PaperQuestion } from '../content/types'
import { PAPER_DURATION_MS, clearPaperMarks, setPaperMark, startPaperTimer, stopPaperTimer, useStore } from '../lib/store'
import { Markdown } from '../components/Markdown'
import { PageHeader, btn } from '../components/ui'
import { NotFound } from './NotFound'

/* ------------------------------------------------------------------------------
 * /papers — official papers, papers built from Rathore, predicted papers (?kind=)
 * ---------------------------------------------------------------------------- */

/** How many in-syllabus parts across the official papers touch each unit. */
function unitFrequency() {
  const official = PAPER_PARTS.filter(({ paper }) => paper.kind === 'official')
  return UNITS.map((u) => {
    const hits = official.filter(({ part }) => part.topicIds.some((t) => getTopic(t)?.unitId === u.id))
    return { unit: u, count: hits.length, papers: new Set(hits.map((h) => h.paper.id)).size }
  })
}

const isKind = (k: string | null): k is PaperKind => PAPER_KINDS.some((x) => x.kind === k)

export function PapersPage() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('kind')
  const kind: PaperKind = isKind(raw) ? raw : 'official'
  const meta = PAPER_KINDS.find((k) => k.kind === kind)!

  return (
    <div>
      <PageHeader eyebrow="Papers" title="End-term papers">
        Every paper comes with a model answer and a marking split for every part. Read a paper with answers on demand, or sit it against a 3-hour clock and
        mark yourself afterwards. Choices are counted the way the paper sets them: any five questions, any two notes, one side of an OR.
      </PageHeader>

      <div role="tablist" aria-label="Kind of paper" className="mb-4 inline-flex flex-wrap gap-1 rounded-lg border border-rule bg-surface p-1">
        {PAPER_KINDS.map((k) => {
          const active = k.kind === kind
          return (
            <button
              key={k.kind}
              role="tab"
              aria-selected={active}
              onClick={() => setParams(k.kind === 'official' ? {} : { kind: k.kind }, { replace: true })}
              className={`rounded-md px-3 py-1.5 text-sm ${active ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-sunken hover:text-ink'}`}
            >
              {k.label} <span className={`num ml-1 text-[12px] ${active ? 'opacity-70' : 'text-muted'}`}>{papersOfKind(k.kind).length}</span>
            </button>
          )
        })}
      </div>
      <p className="mb-8 max-w-3xl text-sm text-ink-2">{meta.blurb}</p>

      {kind === 'official' ? (
        <OfficialPapers />
      ) : (
        <PaperList title={kind === 'generated' ? 'Built from Rathore' : 'Predicted for ME203n'} papers={papersOfKind(kind)} />
      )}
    </div>
  )
}

function OfficialPapers() {
  const official = papersOfKind('official')
  const freq = unitFrequency()
  const top = Math.max(...freq.map((f) => f.count))
  return (
    <>
      <PaperList title="ME203n — your course" papers={official.filter((p) => p.current)} />
      <PaperList
        title="Older course codes"
        note="ME202 (May 2023) and ME211 (May 2018, old scheme, 70 marks) were 4th-semester courses. Their compressor, cycle, gas-turbine and jet questions still match your syllabus; compressible-flow parts are marked as outside it."
        papers={official.filter((p) => !p.current)}
      />

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">What the papers ask, by unit</h2>
        <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface text-sm">
          {freq.map(({ unit, count, papers }) => (
            <li key={unit.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 sm:grid-cols-[minmax(0,1fr)_160px_auto]">
              <Link to={`/syllabus#${unit.id}`} className="min-w-0 truncate text-ink hover:text-cool">
                <span className="num mr-2 text-muted">{unit.number}</span>
                {unit.title}
              </Link>
              <span className="hidden h-1.5 overflow-hidden rounded-full bg-sunken sm:block" aria-hidden>
                <span className="block h-full rounded-full bg-cool" style={{ width: `${top ? (count / top) * 100 : 0}%` }} />
              </span>
              <span className="num whitespace-nowrap text-right text-[12px] text-ink-2">
                {count} parts · {papers}/{OFFICIAL_PAPERS.length}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted">
          Parts that examine each unit across the {OFFICIAL_PAPERS.length} official papers, and how many papers it appeared in. Optional parts are counted too.
          Practice papers are left out.
        </p>
      </section>
    </>
  )
}

function PaperList({ title, note, papers }: { title: string; note?: string; papers: Paper[] }) {
  const marks = useStore((s) => s.paperMarks)
  const timers = useStore((s) => s.paperTimers)
  const runs = useStore((s) => s.paperRuns)
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">{title}</h2>
      {note && <p className="mb-3 max-w-3xl text-sm text-muted">{note}</p>}
      <ul className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        {papers.map((p) => {
          const sc = paperScore(p, marks)
          const sat = runs.filter((r) => r.paperId === p.id).length
          const running = timers[p.id] !== undefined
          return (
            <li key={p.id}>
              <Link to={`/papers/${p.id}`} className="group flex h-full flex-col gap-3 rounded-xl border border-rule bg-surface p-5 hover:border-rule-strong">
                <div className="flex items-start gap-3">
                  <FileText size={18} className="mt-0.5 shrink-0 text-cool" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[16px] font-semibold leading-snug text-ink">{p.title}</h3>
                    <div className="num mt-0.5 text-[11px] uppercase tracking-[0.1em] text-muted">{p.header.course}</div>
                  </div>
                </div>
                <p className="text-[13.5px] leading-relaxed text-ink-2">{p.blurb}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="num">
                    {paperMax(p)} marks · {p.attempt ? `any ${p.attempt} of ${p.questions.length}` : `${p.questions.length} compulsory`}
                  </span>
                  {sc.marked > 0 && (
                    <span className="num text-ink">
                      self-marked {sc.awarded}/{sc.marked}
                    </span>
                  )}
                  {sat > 0 && <span className="num">sat {sat}×</span>}
                  {running && <span className="num font-medium text-heat">timer running</span>}
                  <ArrowRight size={13} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------------------
 * /papers/:paperId — the paper itself
 * ---------------------------------------------------------------------------- */

function useNow(active: boolean) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [active])
  return now
}

function fmtClock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export function PaperPage() {
  const { paperId = '' } = useParams()
  const paper = getPaper(paperId)
  const marks = useStore((s) => s.paperMarks)
  const startedAt = useStore((s) => s.paperTimers[paperId])
  const running = startedAt !== undefined
  const now = useNow(running)
  // remembered per paper id, so jumping straight to another paper (search, topic links) starts hidden
  const [shownFor, setShownFor] = useState<string | null>(null)
  const showAll = shownFor === paperId
  const [params] = useSearchParams()
  const focus = params.get('part')

  useEffect(() => {
    if (focus) requestAnimationFrame(() => document.getElementById(focus)?.scrollIntoView({ block: 'start' }))
  }, [focus, paperId])

  if (!paper) return <NotFound what="paper" />

  const remaining = running ? startedAt + PAPER_DURATION_MS - now : PAPER_DURATION_MS
  const overtime = running && remaining < 0
  const sc = paperScore(paper, marks)
  const ids = partsOf(paper).map((p) => p.id)

  return (
    <div className="max-w-4xl">
      <Link
        to={paper.kind === 'official' ? '/papers' : `/papers?kind=${paper.kind}`}
        className="no-print mb-5 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={14} aria-hidden /> All papers
      </Link>

      {/* toolbar */}
      <div className="no-print sticky top-[53px] z-20 -mx-4 mb-6 flex flex-wrap items-center gap-2 border-b border-rule bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0">
        {running ? (
          <>
            <span className={`num inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium ${overtime ? 'border-heat text-heat' : 'border-rule text-ink'}`}>
              <Timer size={14} aria-hidden />
              {overtime ? `+${fmtClock(-remaining)} over` : fmtClock(remaining)}
            </span>
            <button className={btn.primary} onClick={() => stopPaperTimer(paper.id, true)}>
              <Square size={13} aria-hidden /> Finish and mark
            </button>
            <button className={btn.ghost} onClick={() => stopPaperTimer(paper.id, false)}>
              Abandon
            </button>
            <span className="text-xs text-muted">Answers stay hidden until you finish.</span>
          </>
        ) : (
          <>
            <button
              className={btn.primary}
              onClick={() => {
                setShownFor(null)
                startPaperTimer(paper.id)
              }}
            >
              <Play size={13} aria-hidden /> Sit it timed (3 h)
            </button>
            <button className={btn.secondary} onClick={() => setShownFor(showAll ? null : paper.id)}>
              {showAll ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />} {showAll ? 'Hide all answers' : 'Show all answers'}
            </button>
            <button className={btn.ghost} onClick={() => window.print()}>
              <Printer size={14} aria-hidden /> Print
            </button>
          </>
        )}
        <span className="num ml-auto text-sm text-ink-2" title="Self-awarded marks / marks you have marked so far">
          {sc.marked > 0 ? `${sc.awarded}/${sc.marked} marked` : 'Not marked yet'} · max {sc.max}
        </span>
        {sc.marked > 0 && !running && (
          <button className={btn.ghost} onClick={() => clearPaperMarks(ids)} title="Clear your marks for this paper">
            <RotateCcw size={13} aria-hidden /> Reset marks
          </button>
        )}
      </div>

      <PaperSheet paper={paper} locked={running} showAll={showAll} />
    </div>
  )
}

/** The exam-paper rendering: header block, note, numbered questions. */
function PaperSheet({ paper, locked, showAll }: { paper: Paper; locked: boolean; showAll: boolean }) {
  const h = paper.header
  const badge = PAPER_KINDS.find((k) => k.kind === paper.kind)?.badge
  const official = paper.kind === 'official'
  return (
    <article className="rounded-xl border border-rule bg-surface">
      <header className="border-b border-rule px-5 py-6 text-center sm:px-8">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${official ? 'border border-cool/50 text-cool' : 'border border-dashed border-heat/60 text-heat'}`}
          >
            {badge}
          </span>
          {!paper.current && <span className="rounded-full border border-dashed border-rule-strong px-2 py-0.5 text-[11px] font-medium text-muted">Older course code</span>}
        </div>
        <div className="num text-[12px] uppercase tracking-[0.12em] text-muted">
          {h.semester} · {h.programme}
        </div>
        <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-2">
          {h.exam} · {paper.session}
        </div>
        <h1 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[26px]">{h.course}</h1>
        <div className="num mt-3 flex justify-between text-[13px] text-ink-2">
          <span>Time: {h.time}</span>
          <span>Max. Marks: {h.maxMarks}</span>
        </div>
        <div className="mt-4 space-y-0.5 rounded-md border border-rule-strong px-4 py-2 text-left text-[13.5px] text-ink">
          <b>Note:</b>
          {h.note.map((n, i) => (
            <div key={i}>{n}</div>
          ))}
        </div>
      </header>
      <ol className="divide-y divide-rule">
        {paper.questions.map((q) => (
          <QuestionBlock key={q.number} q={q} locked={locked} showAll={showAll} />
        ))}
      </ol>
      <p className="border-t border-rule px-5 py-3 text-xs text-muted sm:px-8">
        {paper.kind === 'official'
          ? `Transcribed from your scan${paper.sourceFile ? ` (${paper.sourceFile})` : ''}. Wording and spelling kept as printed.`
          : paper.kind === 'generated'
            ? 'Not a DTU paper. Every part is a Rathore review question or end-of-chapter problem; its source page is shown with the model answer.'
            : 'Not a DTU paper. A prediction from the pattern of the official papers; each model answer says which official question the part shadows.'}
      </p>
    </article>
  )
}

function QuestionBlock({ q, locked, showAll }: { q: PaperQuestion; locked: boolean; showAll: boolean }) {
  const optional = pickOf(q) < q.parts.length
  return (
    <li className="px-5 py-5 sm:px-8">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">Q.{q.number}</span>
        {q.tag && <span className="num text-[11.5px] text-muted">{q.tag}</span>}
        <span className="num ml-auto text-[11.5px] text-muted">
          {questionMax(q)} marks{optional && q.choice === 'any' ? ` · answer ${pickOf(q)} of ${q.parts.length}` : ''}
        </span>
      </div>
      {q.stem && (
        <div className="mb-3">
          <Markdown tight>{q.stem}</Markdown>
        </div>
      )}
      <div className="space-y-5">
        {q.parts.map((p, i) => (
          <div key={p.id}>
            {q.choice === 'or' && i > 0 && (
              <div className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                <span className="h-px flex-1 bg-rule" />
                or
                <span className="h-px flex-1 bg-rule" />
              </div>
            )}
            <PartBlock part={p} locked={locked} showAll={showAll} />
          </div>
        ))}
      </div>
    </li>
  )
}

function PartBlock({ part, locked, showAll }: { part: PaperPart; locked: boolean; showAll: boolean }) {
  const [open, setOpen] = useState(false)
  const awarded = useStore((s) => s.paperMarks[part.id])
  const visible = !locked && (open || showAll)

  return (
    <section id={part.id} className="scroll-mt-32">
      <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-2 sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:gap-x-4">
        <span className="num pt-[3px] text-[13px] font-medium text-ink-2">{partLabel(part)}</span>
        <div className="min-w-0 whitespace-pre-line">
          <Markdown tight>{part.prompt}</Markdown>
        </div>
        <div className="num col-start-2 mt-1.5 flex gap-1.5 text-[11.5px] sm:col-start-3 sm:mt-0.5 sm:flex-col sm:items-end">
          <span className="rounded bg-sunken px-1.5 py-0.5 text-ink">[{part.marks}]</span>
          {part.tag && <span className="rounded px-1.5 py-0.5 text-muted">{part.tag}</span>}
        </div>
      </div>

      <div className="no-print mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 pl-[36px] sm:pl-[48px]">
        {part.topicIds.map((tid) => {
          const t = getTopic(tid)
          return t ? (
            <Link key={tid} to={`/topic/${tid}`} className="text-[12px] text-muted underline-offset-2 hover:text-cool hover:underline">
              → {t.title}
            </Link>
          ) : null
        })}
        {part.offSyllabus && (
          <span className="rounded border border-dashed border-rule-strong px-1.5 py-0.5 text-[11px] text-muted" title={part.offSyllabus}>
            Not in your syllabus
          </span>
        )}
        {awarded !== undefined && (
          <span className="num text-[12px] font-medium text-ok">
            you: {awarded}/{part.marks}
          </span>
        )}
      </div>

      {!locked && (
        <div className="no-print mt-2 pl-[36px] sm:pl-[48px]">
          {!showAll && (
            <button className={btn.ghost} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />} {open ? 'Hide model answer' : 'Model answer & marking'}
            </button>
          )}
          {visible && (
            <div className="mt-2 rounded-lg border border-rule bg-paper">
              {part.offSyllabus && <p className="border-b border-rule px-4 py-2 text-[12.5px] text-muted">{part.offSyllabus}</p>}
              {part.bookRef && (
                <p className="border-b border-rule px-4 py-2 text-[12.5px] text-ink-2">
                  <span className="font-semibold text-ink">From Rathore:</span> {part.bookRef}
                </p>
              )}
              {part.alignsWith && (
                <p className="border-b border-rule px-4 py-2 text-[12.5px] text-ink-2">
                  <span className="font-semibold text-ink">Why it is likely:</span> {part.alignsWith}
                </p>
              )}
              <div className="px-4 py-3">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-2">Model answer</div>
                <Markdown tight>{part.answer}</Markdown>
              </div>
              <div className="border-t border-rule px-4 py-3">
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-2">Where the {part.marks} marks go</div>
                <ul className="space-y-1 text-[13px] text-ink-2">
                  {part.scheme.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="num w-8 shrink-0 text-right font-medium text-ink">{s.marks}</span>
                      <Markdown tight className="min-w-0 flex-1">
                        {s.for}
                      </Markdown>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 border-t border-rule px-4 py-2.5">
                <span className="mr-1 text-[12.5px] text-ink-2">Mark yourself:</span>
                {Array.from({ length: part.marks * 2 + 1 }, (_, i) => i / 2).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaperMark(part.id, awarded === m ? null : m)}
                    aria-pressed={awarded === m}
                    className={`num h-7 min-w-[34px] rounded-md border px-1.5 text-[12px] ${
                      awarded === m ? 'border-ink bg-ink text-paper' : 'border-rule bg-surface text-ink-2 hover:border-rule-strong'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
