import { useSyncExternalStore } from 'react'

/**
 * Persistent learner state, kept in localStorage under a single versioned key.
 * Components read it through useStore(selector) and write through the actions below.
 * Every write is wrapped: if storage is unavailable (private mode, quota), the app
 * keeps working in memory and surfaces a one-time warning via `storageError`.
 */

export type TopicStatus = 'not-started' | 'learning' | 'completed' | 'revision'

export interface TopicState {
  status: TopicStatus
  difficult?: boolean
  updatedAt: number
}

export type AttemptResult = 'correct' | 'wrong' | 'self-ok' | 'self-miss'

export interface AttemptState {
  tries: number
  correct: number
  last: AttemptResult
  lastAt: number
  /** user marked the question as done in practice mode */
  done?: boolean
  /** user asked for hints at least once */
  usedHint?: boolean
}

export interface QuizRecord {
  id: string
  at: number
  scope: string
  total: number
  score: number
  items: { qid: string; chosen: number | null; correct: boolean }[]
}

export interface CardState {
  box: number // Leitner box 1..5
  due: number // epoch ms
  seen: number
}

export type BookmarkKind = 'topic' | 'formula' | 'example' | 'question' | 'section'

export interface Bookmark {
  kind: BookmarkKind
  id: string
  label: string
  at: number
}

export interface AppState {
  version: 1
  topics: Record<string, TopicState>
  recent: { topicId: string; at: number }[]
  notes: Record<string, { text: string; at: number }>
  attempts: Record<string, AttemptState>
  quizzes: QuizRecord[]
  cards: Record<string, CardState>
  bookmarks: Bookmark[]
  theme: 'system' | 'light' | 'dark'
}

const KEY = 'thermal-desk:v1'

function emptyState(): AppState {
  return {
    version: 1,
    topics: {},
    recent: [],
    notes: {},
    attempts: {},
    quizzes: [],
    cards: {},
    bookmarks: [],
    theme: 'system',
  }
}

export let storageError: string | null = null

function load(): AppState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as Partial<AppState>
    if (parsed.version !== 1) {
      storageError = 'Saved progress was from an incompatible version and was not loaded.'
      return emptyState()
    }
    return { ...emptyState(), ...parsed } as AppState
  } catch (err) {
    storageError = `Could not read saved progress (${(err as Error).message}). Progress will not persist this session.`
    return emptyState()
  }
}

let state: AppState = typeof window === 'undefined' ? emptyState() : load()
const listeners = new Set<() => void>()

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch (err) {
    storageError = `Could not save progress (${(err as Error).message}).`
  }
}

function set(updater: (s: AppState) => AppState) {
  state = updater(state)
  persist()
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function getState(): AppState {
  return state
}

export function useStore<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state))
}

/* ---------------- topic progress ---------------- */

export function topicStatus(s: AppState, id: string): TopicStatus {
  return s.topics[id]?.status ?? 'not-started'
}

export function setTopicStatus(id: string, status: TopicStatus) {
  set((s) => ({
    ...s,
    topics: { ...s.topics, [id]: { ...s.topics[id], status, updatedAt: Date.now() } },
  }))
}

export function toggleDifficult(id: string) {
  set((s) => {
    const cur = s.topics[id] ?? { status: 'not-started' as TopicStatus, updatedAt: Date.now() }
    return { ...s, topics: { ...s.topics, [id]: { ...cur, difficult: !cur.difficult, updatedAt: Date.now() } } }
  })
}

/** Called when a topic page opens: records recency and moves not-started → learning. */
export function visitTopic(id: string) {
  set((s) => {
    const recent = [{ topicId: id, at: Date.now() }, ...s.recent.filter((r) => r.topicId !== id)].slice(0, 12)
    const cur = s.topics[id]
    const topics =
      !cur || cur.status === 'not-started'
        ? { ...s.topics, [id]: { ...cur, status: 'learning' as TopicStatus, updatedAt: Date.now() } }
        : s.topics
    return { ...s, recent, topics }
  })
}

/* ---------------- notes ---------------- */

export function saveNote(topicId: string, text: string) {
  set((s) => {
    const notes = { ...s.notes }
    if (text.trim() === '') delete notes[topicId]
    else notes[topicId] = { text, at: Date.now() }
    return { ...s, notes }
  })
}

/* ---------------- question attempts ---------------- */

export function recordAttempt(qid: string, result: AttemptResult) {
  set((s) => {
    const cur = s.attempts[qid] ?? { tries: 0, correct: 0, last: result, lastAt: 0 }
    const good = result === 'correct' || result === 'self-ok'
    return {
      ...s,
      attempts: {
        ...s.attempts,
        [qid]: { ...cur, tries: cur.tries + 1, correct: cur.correct + (good ? 1 : 0), last: result, lastAt: Date.now() },
      },
    }
  })
}

export function markQuestionDone(qid: string, done: boolean) {
  set((s) => {
    const cur = s.attempts[qid] ?? { tries: 0, correct: 0, last: 'self-ok' as AttemptResult, lastAt: Date.now() }
    return { ...s, attempts: { ...s.attempts, [qid]: { ...cur, done } } }
  })
}

export function markHintUsed(qid: string) {
  set((s) => {
    const cur = s.attempts[qid]
    if (cur?.usedHint) return s
    const base = cur ?? { tries: 0, correct: 0, last: 'self-miss' as AttemptResult, lastAt: 0 }
    return { ...s, attempts: { ...s.attempts, [qid]: { ...base, usedHint: true } } }
  })
}

export function isWeak(a: AttemptState | undefined): boolean {
  if (!a || a.tries === 0) return false
  return a.last === 'wrong' || a.last === 'self-miss' || a.correct / a.tries < 0.6
}

/* ---------------- quizzes ---------------- */

export function saveQuiz(q: QuizRecord) {
  set((s) => ({ ...s, quizzes: [q, ...s.quizzes].slice(0, 50) }))
}

/* ---------------- flashcards: Leitner spaced repetition ---------------- */

const DAY = 86_400_000
/** review interval per box, in days */
export const BOX_INTERVAL = [0, 0, 1, 3, 7, 16]

export function reviewCard(cardId: string, remembered: boolean) {
  set((s) => {
    const cur = s.cards[cardId] ?? { box: 1, due: 0, seen: 0 }
    const box = remembered ? Math.min(5, cur.box + 1) : 1
    const due = Date.now() + BOX_INTERVAL[box] * DAY
    return { ...s, cards: { ...s.cards, [cardId]: { box, due, seen: cur.seen + 1 } } }
  })
}

export function isCardDue(c: CardState | undefined, now = Date.now()): boolean {
  return !c || c.due <= now
}

/* ---------------- bookmarks ---------------- */

export function isBookmarked(s: AppState, kind: BookmarkKind, id: string): boolean {
  return s.bookmarks.some((b) => b.kind === kind && b.id === id)
}

export function toggleBookmark(kind: BookmarkKind, id: string, label: string) {
  set((s) => {
    const exists = s.bookmarks.some((b) => b.kind === kind && b.id === id)
    return {
      ...s,
      bookmarks: exists
        ? s.bookmarks.filter((b) => !(b.kind === kind && b.id === id))
        : [{ kind, id, label, at: Date.now() }, ...s.bookmarks],
    }
  })
}

/* ---------------- theme ---------------- */

export function setTheme(theme: AppState['theme']) {
  set((s) => ({ ...s, theme }))
}

/* ---------------- maintenance ---------------- */

export function exportState(): string {
  return JSON.stringify(state, null, 2)
}

export function importState(json: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json) as AppState
    if (parsed.version !== 1 || typeof parsed.topics !== 'object') {
      return { ok: false, error: 'File is not a Thermal desk progress export (version 1).' }
    }
    set(() => ({ ...emptyState(), ...parsed }))
    return { ok: true }
  } catch (err) {
    return { ok: false, error: `Could not parse file: ${(err as Error).message}` }
  }
}

export function resetAll() {
  set(() => ({ ...emptyState(), theme: state.theme }))
}
