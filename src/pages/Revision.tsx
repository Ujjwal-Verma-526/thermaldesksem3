import { useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Download, RotateCcw, Trash, Upload } from 'lucide-react'
import { FLASHCARDS, QUESTIONS, TOPICS, UNITS, getExample, getFormula, getQuestion, getTopic } from '../content'
import {
  BOX_INTERVAL,
  exportState,
  importState,
  isCardDue,
  isWeak,
  resetAll,
  reviewCard,
  toggleBookmark,
  useStore,
  type Bookmark,
} from '../lib/store'
import { Markdown } from '../components/Markdown'
import { QuestionCard } from '../components/study'
import { Chip, Empty, PageHeader, StatusGlyph, btn } from '../components/ui'

const TABS = [
  { id: 'cards', label: 'Flashcards' },
  { id: 'notes', label: 'Revision notes' },
  { id: 'weak', label: 'Weak spots' },
  { id: 'mine', label: 'My notes' },
  { id: 'saved', label: 'Bookmarks' },
  { id: 'data', label: 'Your data' },
] as const
type Tab = (typeof TABS)[number]['id']

export function RevisionPage() {
  const [params, setParams] = useSearchParams()
  const tab = (TABS.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'cards') as Tab
  return (
    <div>
      <PageHeader eyebrow="Revision" title="Close the loop before the exam">
        Spaced-repetition flashcards, condensed notes for every topic, and the questions and topics you flagged.
      </PageHeader>
      <div role="tablist" aria-label="Revision" className="scrollbar-thin -mx-4 mb-8 flex gap-1 overflow-x-auto border-b border-rule px-4 sm:mx-0 sm:px-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setParams(t.id === 'cards' ? {} : { tab: t.id }, { replace: true })}
            className={`relative whitespace-nowrap px-3 py-3 text-sm ${tab === t.id ? 'font-medium text-ink' : 'text-muted hover:text-ink'}`}
          >
            {t.label}
            {tab === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded bg-heat" />}
          </button>
        ))}
      </div>
      {tab === 'cards' && <Flashcards />}
      {tab === 'notes' && <RevisionNotes />}
      {tab === 'weak' && <WeakSpots />}
      {tab === 'mine' && <MyNotes />}
      {tab === 'saved' && <Bookmarks />}
      {tab === 'data' && <DataTab />}
    </div>
  )
}

/* ---------------------------------------------------------------- flashcards (Leitner) */

function Flashcards() {
  const cards = useStore((s) => s.cards)
  const [unit, setUnit] = useState('all')
  const [includeAll, setIncludeAll] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [sessionDone, setSessionDone] = useState(0)
  // freeze "now" for the session so a reviewed card does not instantly re-qualify
  const [now] = useState(() => Date.now())

  const deck = useMemo(
    () => FLASHCARDS.filter((c) => (unit === 'all' || c.unitId === unit) && (includeAll || isCardDue(cards[c.id], now))),
    [unit, includeAll, cards, now],
  )
  const card = deck[0]

  const boxes = [1, 2, 3, 4, 5].map((b) => FLASHCARDS.filter((c) => (cards[c.id]?.box ?? 1) === b && cards[c.id]).length)
  const unseen = FLASHCARDS.filter((c) => !cards[c.id]).length

  const answer = (ok: boolean) => {
    if (!card) return
    reviewCard(card.id, ok)
    setFlipped(false)
    setSessionDone((n) => n + 1)
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div>
        <div className="mb-5 flex flex-wrap gap-1.5">
          <Chip active={unit === 'all'} onClick={() => setUnit('all')}>
            All units
          </Chip>
          {UNITS.map((u) => (
            <Chip key={u.id} active={unit === u.id} onClick={() => setUnit(u.id)}>
              Unit {u.number}
            </Chip>
          ))}
        </div>

        {!card ? (
          <Empty title={sessionDone > 0 ? `Session done — ${sessionDone} cards reviewed` : 'No cards due'}>
            Cards come back after 1, 3, 7 and 16 days as you keep remembering them.{' '}
            <button className="text-cool underline underline-offset-2" onClick={() => setIncludeAll(true)}>
              Review all cards anyway
            </button>
          </Empty>
        ) : (
          <div>
            <button
              onClick={() => setFlipped((f) => !f)}
              className="flex min-h-[240px] w-full flex-col justify-center rounded-2xl border border-rule bg-surface px-8 py-10 text-center shadow-[var(--shadow)] transition-colors hover:border-rule-strong"
              aria-label={flipped ? 'Card answer. Click to show question.' : 'Card question. Click to reveal answer.'}
            >
              <span className="num mb-4 text-[10px] uppercase tracking-[0.14em] text-muted">
                {getTopic(card.topicId)?.title} · {flipped ? 'answer' : 'question'}
              </span>
              <span className={`mx-auto max-w-xl ${flipped ? 'font-serif text-[18px] text-ink' : 'text-[20px] font-semibold text-ink'}`}>
                {flipped ? card.back : card.front}
              </span>
              {!flipped && <span className="mt-6 text-xs text-muted">Click or press to reveal</span>}
            </button>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {flipped ? (
                <>
                  <button className={btn.secondary} onClick={() => answer(false)}>
                    Forgot · back to box 1
                  </button>
                  <button className={btn.primary} onClick={() => answer(true)}>
                    Remembered
                  </button>
                </>
              ) : (
                <button className={btn.primary} onClick={() => setFlipped(true)}>
                  Show answer
                </button>
              )}
            </div>
            <p className="num mt-3 text-center text-xs text-muted">{deck.length} in this session</p>
          </div>
        )}
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-rule bg-surface p-4">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-2">Leitner boxes</div>
          <ul className="space-y-1.5 text-sm">
            <li className="flex justify-between text-muted">
              <span>Not yet seen</span>
              <span className="num">{unseen}</span>
            </li>
            {boxes.map((n, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-ink-2">
                  Box {i + 1} <span className="text-xs text-muted">· every {BOX_INTERVAL[i + 1] === 0 ? 'session' : `${BOX_INTERVAL[i + 1]} d`}</span>
                </span>
                <span className="num text-ink">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-2">
          <input type="checkbox" checked={includeAll} onChange={(e) => setIncludeAll(e.target.checked)} className="accent-[var(--heat)]" />
          Include cards not yet due
        </label>
      </aside>
    </div>
  )
}

/* ---------------------------------------------------------------- condensed notes */

function RevisionNotes() {
  const [unit, setUnit] = useState(UNITS[0].id)
  const topics = TOPICS.filter((t) => t.unitId === unit)
  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap items-center gap-1.5">
        {UNITS.map((u) => (
          <Chip key={u.id} active={unit === u.id} onClick={() => setUnit(u.id)}>
            {u.number}. {u.title}
          </Chip>
        ))}
        <button className={`${btn.ghost} ml-auto`} onClick={() => window.print()}>
          Print
        </button>
      </div>
      <div className="space-y-6">
        {topics.map((t) => (
          <section key={t.id} className="rounded-xl border border-rule bg-surface px-5 py-4">
            <h2 className="mb-2 flex items-center gap-2 text-[16px] font-semibold text-ink">
              <Link to={`/topic/${t.id}`} className="hover:text-cool">
                {t.title}
              </Link>
              {t.coverage !== 'full' && <span className="text-[11px] font-normal text-warn">(includes supplementary)</span>}
            </h2>
            <ul className="list-disc space-y-1 pl-5 font-serif text-[15px] leading-relaxed text-ink">
              {t.keyPoints.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- weak spots */

function WeakSpots() {
  const s = useStore((x) => x)
  const flagged = TOPICS.filter((t) => s.topics[t.id]?.status === 'revision' || s.topics[t.id]?.difficult)
  const weak = QUESTIONS.filter((q) => isWeak(s.attempts[q.id]))
  if (flagged.length === 0 && weak.length === 0) {
    return <Empty title="No weak spots yet">Mark a topic “Needs revision” or “difficult”, or miss a question, and it will appear here.</Empty>
  }
  return (
    <div className="space-y-10">
      {flagged.length > 0 && (
        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">Flagged topics</h2>
          <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface">
            {flagged.map((t) => (
              <li key={t.id}>
                <Link to={`/topic/${t.id}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-paper">
                  <StatusGlyph status={s.topics[t.id]?.status ?? 'not-started'} />
                  <span className="flex-1 text-sm text-ink">{t.title}</span>
                  {s.topics[t.id]?.difficult && <span className="text-[11px] text-heat">difficult</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {weak.length > 0 && (
        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">Questions to retry ({weak.length})</h2>
          <div className="space-y-5">
            {weak.map((q) => (
              <QuestionCard key={q.id} q={q} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- personal notes */

function MyNotes() {
  const notes = useStore((s) => s.notes)
  const entries = Object.entries(notes).sort((a, b) => b[1].at - a[1].at)
  if (entries.length === 0) return <Empty title="No notes yet">Write notes in any topic’s Notes tab; they collect here.</Empty>
  return (
    <div className="space-y-4">
      {entries.map(([tid, n]) => {
        const t = getTopic(tid)
        return (
          <section key={tid} className="rounded-xl border border-rule bg-surface px-5 py-4">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <Link to={`/topic/${tid}?tab=notes`} className="font-semibold text-ink hover:text-cool">
                {t?.title ?? tid}
              </Link>
              <span className="num text-[11px] text-muted">{new Date(n.at).toLocaleString()}</span>
            </div>
            <p className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-ink">{n.text}</p>
          </section>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- bookmarks */

function bookmarkLink(b: Bookmark): string {
  switch (b.kind) {
    case 'topic':
      return `/topic/${b.id}`
    case 'formula':
      return `/formulas?f=${b.id}`
    case 'example':
      return `/examples/${b.id}`
    case 'question':
      return `/questions?q=${b.id}`
    case 'section':
      return `/topic/${b.id}`
  }
}

function bookmarkExists(b: Bookmark): boolean {
  if (b.kind === 'topic') return !!getTopic(b.id)
  if (b.kind === 'formula') return !!getFormula(b.id)
  if (b.kind === 'example') return !!getExample(b.id)
  if (b.kind === 'question') return !!getQuestion(b.id)
  return true
}

function Bookmarks() {
  const bookmarks = useStore((s) => s.bookmarks)
  if (bookmarks.length === 0) return <Empty title="No bookmarks yet">Use the ribbon icon on topics, formulas, examples and questions.</Empty>
  const groups = ['topic', 'formula', 'example', 'question'] as const
  return (
    <div className="space-y-8">
      {groups.map((g) => {
        const items = bookmarks.filter((b) => b.kind === g)
        if (items.length === 0) return null
        return (
          <section key={g}>
            <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">{g}s</h2>
            <ul className="divide-y divide-rule rounded-xl border border-rule bg-surface">
              {items.map((b) => (
                <li key={b.id} className="flex items-center gap-3 px-4 py-2.5">
                  {bookmarkExists(b) ? (
                    <Link to={bookmarkLink(b)} className="flex-1 truncate text-sm text-ink hover:text-cool">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="flex-1 truncate text-sm text-muted line-through" title="This item no longer exists">
                      {b.label}
                    </span>
                  )}
                  <button onClick={() => toggleBookmark(b.kind, b.id, b.label)} className="text-muted hover:text-heat" aria-label={`Remove bookmark ${b.label}`}>
                    <Trash size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- data */

function DataTab() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const download = () => {
    try {
      const blob = new Blob([exportState()], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `thermal-desk-progress-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      setMsg({ ok: true, text: 'Progress exported.' })
    } catch (err) {
      console.error('[export]', err)
      setMsg({ ok: false, text: `Export failed: ${(err as Error).message}` })
    }
  }

  const upload = async (file: File) => {
    try {
      const res = importState(await file.text())
      setMsg(res.ok ? { ok: true, text: 'Progress imported.' } : { ok: false, text: res.error })
    } catch (err) {
      setMsg({ ok: false, text: `Could not read file: ${(err as Error).message}` })
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-sm leading-relaxed text-ink-2">
        Progress, notes, bookmarks, quiz history and flashcard boxes are saved only in this browser (localStorage). Export a copy to move to another device or keep
        a backup.
      </p>
      <div className="flex flex-wrap gap-2">
        <button className={btn.secondary} onClick={download}>
          <Download size={14} aria-hidden /> Export progress
        </button>
        <button className={btn.secondary} onClick={() => fileRef.current?.click()}>
          <Upload size={14} aria-hidden /> Import progress
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) void upload(f)
            e.target.value = ''
          }}
        />
      </div>
      {msg && (
        <p role="status" className={`text-sm ${msg.ok ? 'text-ok' : 'text-heat'}`}>
          {msg.text}
        </p>
      )}
      <div className="rounded-xl border border-heat/40 px-5 py-4">
        <div className="mb-1 font-medium text-ink">Reset everything</div>
        <p className="mb-3 text-sm text-ink-2">Clears all progress, notes, bookmarks, quizzes and flashcard history. This cannot be undone.</p>
        {confirmReset ? (
          <div className="flex gap-2">
            <button
              className="inline-flex items-center gap-1.5 rounded-lg bg-heat px-3.5 py-2 text-sm font-medium text-white"
              onClick={() => {
                resetAll()
                setConfirmReset(false)
                setMsg({ ok: true, text: 'All progress cleared.' })
              }}
            >
              Yes, clear it
            </button>
            <button className={btn.ghost} onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className={btn.secondary} onClick={() => setConfirmReset(true)}>
            <RotateCcw size={14} aria-hidden /> Reset progress
          </button>
        )}
      </div>
      <Markdown tight className="text-muted">
        {`Content: ${TOPICS.length} topics, ${QUESTIONS.length} questions, ${FLASHCARDS.length} flashcards.`}
      </Markdown>
    </div>
  )
}
