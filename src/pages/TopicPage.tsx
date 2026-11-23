import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronDown, Flag } from 'lucide-react'
import { examplesOfTopic, formulasOfTopic, getTopic, neighbours, questionsOfTopic, unitOfTopic } from '../content'
import type { Topic } from '../content/types'
import { saveNote, toggleDifficult, useStore, visitTopic } from '../lib/store'
import { Markdown } from '../components/Markdown'
import { DerivationView, ExampleView, FormulaCard, QuestionCard } from '../components/study'
import { BookmarkButton, CoverageBadge, Empty, HighlightStar, StatusControl } from '../components/ui'
import { NotFound } from './NotFound'

const TABS = [
  { id: 'theory', label: 'Theory' },
  { id: 'derivations', label: 'Derivations' },
  { id: 'examples', label: 'Examples' },
  { id: 'practice', label: 'Practice' },
  { id: 'notes', label: 'Notes' },
] as const
type TabId = (typeof TABS)[number]['id']

export function TopicPage() {
  const { topicId = '' } = useParams()
  const topic = getTopic(topicId)
  const [params, setParams] = useSearchParams()
  const tab = (TABS.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'theory') as TabId
  const difficult = useStore((s) => !!s.topics[topicId]?.difficult)

  useEffect(() => {
    if (topic) visitTopic(topic.id)
  }, [topic])

  if (!topic) return <NotFound what="topic" />

  const unit = unitOfTopic(topic.id)
  const counts: Record<TabId, number | null> = {
    theory: null,
    derivations: topic.derivations?.length ?? 0,
    examples: examplesOfTopic(topic.id).length,
    practice: questionsOfTopic(topic.id).length,
    notes: null,
  }
  const { prev, next } = neighbours(topic.id)

  return (
    <div>
      <header className="mb-6">
        <div className="num mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted">
          <Link to={`/syllabus#${unit?.id}`} className="hover:text-cool">
            Unit {unit?.number} · {unit?.title}
          </Link>
          {topic.highlighted && <HighlightStar withLabel />}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.015em] text-ink sm:text-[32px]">{topic.title}</h1>
          <BookmarkButton kind="topic" id={topic.id} label={topic.title} className="mt-1" />
        </div>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink-2">{topic.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <CoverageBadge coverage={topic.coverage} />
          {topic.refs.map((r) => (
            <span key={`${r.chapter}-${r.section}`} className="num rounded bg-sunken px-2 py-0.5 text-[11px] text-ink-2">
              Rathore Ch {r.chapter} {r.section} · p. {r.pages}
            </span>
          ))}
        </div>
        {topic.coverageNote && <p className="mt-2 max-w-3xl text-[13px] text-muted">{topic.coverageNote}</p>}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <StatusControl topicId={topic.id} />
          <button
            onClick={() => toggleDifficult(topic.id)}
            aria-pressed={difficult}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs ${
              difficult ? 'border-heat bg-heat-soft text-heat' : 'border-rule bg-surface text-muted hover:text-ink'
            }`}
          >
            <Flag size={13} aria-hidden /> {difficult ? 'Marked difficult' : 'Mark difficult'}
          </button>
        </div>
      </header>

      <nav aria-label="Topic sections" className="sticky top-[53px] z-20 -mx-4 mb-8 border-b border-rule bg-paper/95 px-4 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0">
        <ul className="scrollbar-thin flex gap-1 overflow-x-auto" role="tablist">
          {TABS.map((t) => (
            <li key={t.id}>
              <button
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setParams(t.id === 'theory' ? {} : { tab: t.id }, { replace: true })}
                className={`relative flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-sm ${
                  tab === t.id ? 'font-medium text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {t.label}
                {counts[t.id] !== null && <span className="num text-[11px] text-muted">{counts[t.id]}</span>}
                {tab === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded bg-heat" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div role="tabpanel">
        {tab === 'theory' && <TheoryTab topic={topic} focus={params.get('section')} />}
        {tab === 'derivations' &&
          (topic.derivations?.length ? (
            <div className="space-y-6">
              {topic.derivations.map((d) => (
                <DerivationView key={d.id} d={d} />
              ))}
            </div>
          ) : (
            <Empty title="No formal derivations in this topic">This topic is descriptive. Its key results are in the Theory tab and on the formula sheet.</Empty>
          ))}
        {tab === 'examples' &&
          (examplesOfTopic(topic.id).length ? (
            <div className="space-y-6">
              {examplesOfTopic(topic.id).map((e) => (
                <ExampleView key={e.id} e={e} headingLevel="h3" />
              ))}
            </div>
          ) : (
            <Empty title="No worked examples for this topic">Its numerical practice is in a related topic of the same unit. Try the Practice tab.</Empty>
          ))}
        {tab === 'practice' &&
          (questionsOfTopic(topic.id).length ? (
            <div className="space-y-5">
              {questionsOfTopic(topic.id).map((q) => (
                <QuestionCard key={q.id} q={q} showTopic={false} />
              ))}
            </div>
          ) : (
            <Empty title="No questions yet for this topic" />
          ))}
        {tab === 'notes' && <NotesTab topicId={topic.id} />}
      </div>

      <nav aria-label="Previous and next topic" className="mt-16 grid gap-3 border-t border-rule pt-6 sm:grid-cols-2">
        {prev ? (
          <Link to={`/topic/${prev.id}`} className="group rounded-xl border border-rule bg-surface px-4 py-3 hover:border-rule-strong">
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeft size={13} aria-hidden /> Previous
            </span>
            <span className="mt-0.5 block text-sm font-medium text-ink">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/topic/${next.id}`} className="group rounded-xl border border-rule bg-surface px-4 py-3 text-right hover:border-rule-strong">
            <span className="flex items-center justify-end gap-1 text-xs text-muted">
              Next <ArrowRight size={13} aria-hidden />
            </span>
            <span className="mt-0.5 block text-sm font-medium text-ink">{next.title}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}

function TheoryTab({ topic, focus }: { topic: Topic; focus: string | null }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set([focus ?? topic.sections[0]?.id]))
  const allOpen = open.size === topic.sections.length
  const formulas = formulasOfTopic(topic.id)

  useEffect(() => {
    setOpen(new Set([focus ?? topic.sections[0]?.id]))
    if (focus) requestAnimationFrame(() => document.getElementById(`sec-${focus}`)?.scrollIntoView({ block: 'start' }))
  }, [topic.id, focus, topic.sections])

  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  return (
    <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_240px]">
      <div className="min-w-0 space-y-3">
        <div className="flex justify-end">
          <button className="text-xs text-muted hover:text-ink" onClick={() => setOpen(allOpen ? new Set() : new Set(topic.sections.map((s) => s.id)))}>
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
        {topic.sections.map((s, i) => {
          const isOpen = open.has(s.id)
          return (
            <section key={s.id} id={`sec-${s.id}`} className="scroll-mt-32 rounded-xl border border-rule bg-surface">
              <button
                onClick={() => toggle(s.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left"
              >
                <span className="num text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="flex-1 text-[16px] font-semibold text-ink">{s.title}</h2>
                {s.supplementary && <span className="rounded border border-dashed border-warn px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-warn">Supplementary</span>}
                <ChevronDown size={16} className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              {isOpen && (
                <div className="border-t border-rule px-5 pb-6 pt-4">
                  <Markdown>{s.body}</Markdown>
                </div>
              )}
            </section>
          )
        })}

        <section className="mt-8 rounded-xl border border-heat/40 bg-heat-soft/50 px-5 py-4">
          <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-heat">Exam takeaways</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-[14.5px] text-ink">
            {topic.keyPoints.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </section>

        {topic.misconceptions && topic.misconceptions.length > 0 && (
          <section className="rounded-xl border border-warn/40 bg-warn-soft/60 px-5 py-4">
            <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-warn">Common misconceptions</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-[14.5px] text-ink">
              {topic.misconceptions.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </section>
        )}

        {formulas.length > 0 && (
          <section className="pt-6">
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">Formulas in this topic</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {formulas.map((f) => (
                <FormulaCard key={f.id} f={f} showTopic={false} />
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="hidden xl:block">
        <div className="sticky top-20 space-y-1">
          <div className="num mb-2 text-[10px] uppercase tracking-[0.14em] text-muted">On this page</div>
          {topic.sections.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setOpen((o) => new Set(o).add(s.id))
                requestAnimationFrame(() => document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
              }}
              className="block w-full truncate rounded px-2 py-1 text-left text-[12.5px] text-ink-2 hover:bg-sunken hover:text-ink"
            >
              {s.title}
            </button>
          ))}
        </div>
      </aside>
    </div>
  )
}

function NotesTab({ topicId }: { topicId: string }) {
  const saved = useStore((s) => s.notes[topicId])
  const [text, setText] = useState(saved?.text ?? '')
  const [state, setState] = useState<'idle' | 'typing' | 'saved'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setText(saved?.text ?? '')
    // reload only when switching topics, not on every save
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onChange = (v: string) => {
    setText(v)
    setState('typing')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      saveNote(topicId, v)
      setState('saved')
    }, 500)
  }

  return (
    <div className="max-w-3xl">
      <label htmlFor="note" className="mb-2 block text-sm text-ink-2">
        Your notes for this topic. They save automatically in this browser and appear in Revision → My notes.
      </label>
      <textarea
        id="note"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={14}
        placeholder="Mnemonics, doubts for the teacher, where you went wrong in a problem…"
        className="w-full rounded-xl border border-rule bg-surface px-4 py-3 font-serif text-[15px] leading-relaxed text-ink placeholder:text-muted focus:border-cool focus:outline-none"
      />
      <p className="mt-1.5 text-xs text-muted" aria-live="polite">
        {state === 'typing' ? 'Saving…' : saved ? `Saved ${new Date(saved.at).toLocaleString()}` : 'Nothing saved yet.'}
      </p>
    </div>
  )
}
