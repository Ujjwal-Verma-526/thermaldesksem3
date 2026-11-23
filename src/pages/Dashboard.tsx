import { Link } from 'react-router-dom'
import { ArrowRight, Repeat, Star, Target } from 'lucide-react'
import { FLASHCARDS, QUESTIONS, TOPICS, TOTAL_HOURS, UNITS, getTopic, topicsOfUnit } from '../content'
import { isCardDue, isWeak, useStore, type TopicStatus } from '../lib/store'
import { LoopGlyph, STATUS_META, StatusGlyph } from '../components/ui'

function unitStats(unitId: string, statuses: Record<string, { status: TopicStatus } | undefined>) {
  const ts = topicsOfUnit(unitId)
  const by = (st: TopicStatus) => ts.filter((t) => (statuses[t.id]?.status ?? 'not-started') === st).length
  return { total: ts.length, completed: by('completed'), learning: by('learning'), revision: by('revision') }
}

export function Dashboard() {
  const s = useStore((x) => x)
  const done = TOPICS.filter((t) => s.topics[t.id]?.status === 'completed').length
  const started = TOPICS.filter((t) => (s.topics[t.id]?.status ?? 'not-started') !== 'not-started').length
  const now = Date.now()
  const dueCards = FLASHCARDS.filter((c) => isCardDue(s.cards[c.id], now)).length
  const weak = QUESTIONS.filter((q) => isWeak(s.attempts[q.id])).length
  const attempted = QUESTIONS.filter((q) => (s.attempts[q.id]?.tries ?? 0) > 0).length
  const revisionTopics = TOPICS.filter((t) => s.topics[t.id]?.status === 'revision' || s.topics[t.id]?.difficult)
  const recent = s.recent.map((r) => getTopic(r.topicId)).filter((t): t is NonNullable<typeof t> => !!t).slice(0, 4)
  const nextUp = TOPICS.find((t) => (s.topics[t.id]?.status ?? 'not-started') === 'not-started')
  const highlighted = TOPICS.filter((t) => t.highlighted)
  const highlightedDone = highlighted.filter((t) => s.topics[t.id]?.status === 'completed').length
  const lastQuiz = s.quizzes[0]

  return (
    <div>
      <section className="mb-10 grid gap-8 border-b border-rule pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <div className="num mb-3 text-[11px] uppercase tracking-[0.14em] text-muted">Thermal Engineering · {UNITS.length} units · {TOTAL_HOURS} hours</div>
          <h1 className="max-w-2xl text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[40px]">
            {done === TOPICS.length ? 'Every loop closed.' : started === 0 ? 'Start at the compressor.' : 'Pick up where you left off.'}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">
            Each topic below is mapped to your syllabus and to Rathore’s chapter and page. Anything the book does not cover is written in and labelled
            supplementary.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {recent[0] ? (
              <Link to={`/topic/${recent[0].id}`} className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:opacity-90">
                Continue: {recent[0].title} <ArrowRight size={15} aria-hidden />
              </Link>
            ) : (
              nextUp && (
                <Link to={`/topic/${nextUp.id}`} className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:opacity-90">
                  Begin: {nextUp.title} <ArrowRight size={15} aria-hidden />
                </Link>
              )
            )}
            <Link to="/syllabus" className="inline-flex items-center gap-2 rounded-lg border border-rule bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:border-rule-strong">
              Open the syllabus map
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <LoopGlyph progress={done / TOPICS.length} tone="ok" size={112} animate />
          </div>
          <dl className="space-y-1.5 text-sm">
            <div className="flex items-baseline gap-2">
              <dt className="num w-14 text-right text-xl font-semibold text-ink">
                {done}/{TOPICS.length}
              </dt>
              <dd className="text-muted">topics completed</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="num w-14 text-right text-xl font-semibold text-ink">{attempted}</dt>
              <dd className="text-muted">of {QUESTIONS.length} questions tried</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="num w-14 text-right text-xl font-semibold text-heat">{dueCards}</dt>
              <dd className="text-muted">flashcards due</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="units-h" className="mb-12">
        <h2 id="units-h" className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">
          Units
        </h2>
        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((u) => {
            const st = unitStats(u.id, s.topics)
            const hl = topicsOfUnit(u.id).some((t) => t.highlighted)
            return (
              <li key={u.id} className="bg-surface">
                <Link to={`/syllabus#${u.id}`} className="group flex h-full flex-col gap-3 p-5 hover:bg-paper">
                  <div className="flex items-start justify-between gap-3">
                    <span className="num text-[11px] text-muted">
                      UNIT {u.number} · {u.hours} h
                    </span>
                    {hl && (
                      <span className="flex items-center gap-1 text-[11px] text-warn">
                        <Star size={11} fill="currentColor" aria-hidden /> highlighted
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <LoopGlyph progress={st.completed / st.total} tone="ok" size={34} />
                    <h3 className="text-[16px] font-semibold leading-snug text-ink">{u.title}</h3>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-xs text-muted">
                    <span className="num">
                      {st.completed}/{st.total} done
                    </span>
                    {st.learning > 0 && <span className="num text-cool">{st.learning} learning</span>}
                    {st.revision > 0 && <span className="num text-heat">{st.revision} to revise</span>}
                    <ArrowRight size={13} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section aria-labelledby="hl-h">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 id="hl-h" className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">
              Highlighted on your syllabus
            </h2>
            <span className="num text-xs text-muted">
              {highlightedDone}/{highlighted.length}
            </span>
          </div>
          <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface">
            {highlighted.map((t) => {
              const st = s.topics[t.id]?.status ?? 'not-started'
              return (
                <li key={t.id}>
                  <Link to={`/topic/${t.id}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-paper">
                    <StatusGlyph status={st} />
                    <span className="min-w-0 flex-1 truncate text-[14px] text-ink">{t.title}</span>
                    <span className="num shrink-0 text-[11px] text-muted">{STATUS_META[st].label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <div className="space-y-8">
          <section aria-labelledby="today-h">
            <h2 id="today-h" className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">
              Today
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/revision" className="flex items-center gap-3 rounded-xl border border-rule bg-surface px-4 py-3 hover:border-rule-strong">
                <Repeat size={17} className="text-heat" aria-hidden />
                <span className="flex-1 text-sm text-ink">
                  {dueCards > 0 ? `${dueCards} flashcards due for review` : 'No flashcards due — nice.'}
                </span>
                <ArrowRight size={14} className="text-muted" aria-hidden />
              </Link>
              <Link to="/revision?tab=weak" className="flex items-center gap-3 rounded-xl border border-rule bg-surface px-4 py-3 hover:border-rule-strong">
                <Target size={17} className="text-cool" aria-hidden />
                <span className="flex-1 text-sm text-ink">
                  {weak + revisionTopics.length > 0
                    ? `${weak} weak question${weak === 1 ? '' : 's'} · ${revisionTopics.length} topic${revisionTopics.length === 1 ? '' : 's'} to revise`
                    : 'No weak spots recorded yet.'}
                </span>
                <ArrowRight size={14} className="text-muted" aria-hidden />
              </Link>
              <Link to="/questions?mode=quiz" className="flex items-center gap-3 rounded-xl border border-rule bg-surface px-4 py-3 hover:border-rule-strong">
                <span className="num w-[17px] text-center text-xs font-semibold text-ink">Q</span>
                <span className="flex-1 text-sm text-ink">
                  {lastQuiz ? `Last quiz: ${lastQuiz.score}/${lastQuiz.total} · take another` : 'Take a 10-question quiz'}
                </span>
                <ArrowRight size={14} className="text-muted" aria-hidden />
              </Link>
            </div>
          </section>

          {recent.length > 0 && (
            <section aria-labelledby="recent-h">
              <h2 id="recent-h" className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">
                Recently opened
              </h2>
              <ul className="space-y-1">
                {recent.map((t) => (
                  <li key={t.id}>
                    <Link to={`/topic/${t.id}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-2 hover:bg-sunken hover:text-ink">
                      <StatusGlyph status={s.topics[t.id]?.status ?? 'not-started'} size={15} />
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
