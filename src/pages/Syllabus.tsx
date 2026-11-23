import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'
import { BOOK, QUESTIONS, TOPICS, UNITS, examplesOfTopic } from '../content'
import type { Coverage } from '../content/types'
import { useStore, type TopicStatus } from '../lib/store'
import { Chip, CoverageBadge, HighlightStar, PageHeader, STATUS_META, StatusControl, input } from '../components/ui'

type StatusFilter = 'all' | TopicStatus
type CoverageFilter = 'all' | Coverage

export function SyllabusPage() {
  const statuses = useStore((s) => s.topics)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [coverage, setCoverage] = useState<CoverageFilter>('all')
  const [onlyHl, setOnlyHl] = useState(false)
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ block: 'start' })
  }, [hash])

  const visible = useMemo(() => {
    const needle = q.toLowerCase().trim()
    return new Set(
      TOPICS.filter((t) => {
        const st = statuses[t.id]?.status ?? 'not-started'
        if (status !== 'all' && st !== status) return false
        if (coverage !== 'all' && t.coverage !== coverage) return false
        if (onlyHl && !t.highlighted) return false
        if (!needle) return true
        return `${t.title} ${t.summary} ${t.syllabusPhrases.join(' ')}`.toLowerCase().includes(needle)
      }).map((t) => t.id),
    )
  }, [q, status, coverage, onlyHl, statuses])

  const counts = {
    full: TOPICS.filter((t) => t.coverage === 'full').length,
    partial: TOPICS.filter((t) => t.coverage === 'partial').length,
    missing: TOPICS.filter((t) => t.coverage === 'missing').length,
  }

  return (
    <div>
      <PageHeader eyebrow="Syllabus explorer" title="Syllabus, mapped to the book">
        Every syllabus phrase is attached to a topic, and every topic to {BOOK.short}’s chapter and pages. {counts.full} topics are fully covered by the
        book, {counts.partial} partly, and {counts.missing} not at all. Gaps are filled with labelled supplementary notes.
      </PageHeader>

      <div className="sticky top-[53px] z-20 -mx-4 mb-8 space-y-3 border-b border-rule bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter topics…" aria-label="Filter topics" className={`${input} pl-9`} />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip active={status === 'all'} onClick={() => setStatus('all')}>
            Any status
          </Chip>
          {(Object.keys(STATUS_META) as TopicStatus[]).map((st) => (
            <Chip key={st} active={status === st} onClick={() => setStatus(st)}>
              {STATUS_META[st].label}
            </Chip>
          ))}
          <span className="mx-1 h-4 w-px bg-rule" />
          {(['all', 'full', 'partial', 'missing'] as CoverageFilter[]).map((c) => (
            <Chip key={c} active={coverage === c} onClick={() => setCoverage(c)}>
              {c === 'all' ? 'Any coverage' : c === 'full' ? 'In book' : c === 'partial' ? 'Partly in book' : 'Not in book'}
            </Chip>
          ))}
          <span className="mx-1 h-4 w-px bg-rule" />
          <Chip active={onlyHl} onClick={() => setOnlyHl((v) => !v)}>
            ★ Highlighted only
          </Chip>
        </div>
      </div>

      <div className="space-y-12">
        {UNITS.map((u) => {
          const topics = TOPICS.filter((t) => t.unitId === u.id && visible.has(t.id))
          return (
            <section key={u.id} id={u.id} className="scroll-mt-40" aria-labelledby={`${u.id}-h`}>
              <div className="mb-4 grid gap-4 md:grid-cols-[200px_1fr]">
                <div>
                  <div className="num text-[11px] text-muted">
                    UNIT {u.number} · {u.hours} HOURS
                  </div>
                  <h2 id={`${u.id}-h`} className="mt-1 text-[20px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                    {u.title}
                  </h2>
                  <div className="num mt-2 space-y-0.5 text-[11px] text-muted">
                    {u.refs.map((r) => (
                      <div key={`${r.chapter}-${r.section}`}>
                        Ch {r.chapter} {r.section ?? ''} · pp. {r.pages}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <blockquote className="border-l-2 border-rule-strong pl-4 font-serif text-[15px] italic leading-relaxed text-ink-2">{u.syllabus}</blockquote>
                  <p className="mt-2 pl-4 text-[13px] text-muted">{u.chapterNote}</p>
                </div>
              </div>

              {topics.length === 0 ? (
                <p className="rounded-lg border border-dashed border-rule px-4 py-3 text-sm text-muted">No topics in this unit match the filters.</p>
              ) : (
                <ul className="divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-surface">
                  {topics.map((t) => {
                    const nq = QUESTIONS.filter((x) => x.topicId === t.id).length
                    const ne = examplesOfTopic(t.id).length
                    return (
                      <li key={t.id} className="grid grid-cols-1 gap-3 px-4 py-4 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link to={`/topic/${t.id}`} className="text-[15px] font-semibold text-ink hover:text-cool">
                              {t.title}
                            </Link>
                            {t.highlighted && <HighlightStar />}
                          </div>
                          <p className="mt-0.5 text-[13.5px] text-ink-2">{t.summary}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <CoverageBadge coverage={t.coverage} />
                            {t.syllabusPhrases.map((p) => (
                              <span key={p} className="rounded bg-sunken px-1.5 py-0.5 text-[11px] text-ink-2">
                                “{p}”
                              </span>
                            ))}
                          </div>
                          {t.coverageNote && <p className="mt-2 text-[12.5px] text-muted">{t.coverageNote}</p>}
                          <div className="num mt-2 flex flex-wrap gap-x-3 text-[11px] text-muted">
                            {t.refs.map((r) => (
                              <span key={`${r.chapter}-${r.section}`}>
                                Ch {r.chapter} {r.section} · p. {r.pages}
                              </span>
                            ))}
                            <span>
                              {ne} example{ne === 1 ? '' : 's'} · {nq} question{nq === 1 ? '' : 's'}
                            </span>
                          </div>
                        </div>
                        <StatusControl topicId={t.id} compact />
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
