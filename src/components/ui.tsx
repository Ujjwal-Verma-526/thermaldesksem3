import type { CSSProperties, ReactNode } from 'react'
import { Bookmark, BookmarkCheck, Star } from 'lucide-react'
import type { Coverage, Source } from '../content/types'
import {
  isBookmarked,
  setTopicStatus,
  toggleBookmark,
  topicStatus,
  useStore,
  type BookmarkKind,
  type TopicStatus,
} from '../lib/store'

/* ------------------------------------------------------------------------------
 * The P–v loop glyph — the desk's signature mark. A small Otto-like cycle whose
 * drawn length is progress: dashed outline = not started, partial = learning,
 * closed and filled = completed, heat-coloured with a dot = needs revision.
 * ---------------------------------------------------------------------------- */

const LOOP = 'M20 19C13 18.5 8 15 6 11L6 4C9 8.5 14 12.5 20 14Z'

export function LoopGlyph({ progress, size = 20, tone = 'cool', animate = false }: { progress: number; size?: number; tone?: 'cool' | 'heat' | 'ok'; animate?: boolean }) {
  const p = Math.max(0, Math.min(1, progress))
  const color = `var(--${tone})`
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path d={LOOP} fill={p >= 1 ? `var(--${tone}-soft)` : 'none'} stroke="var(--rule-strong)" strokeWidth={1.5} strokeDasharray="1.6 1.8" strokeLinejoin="round" />
      {p > 0 && (
        <path
          d={LOOP}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={`${p} 1`}
          className={animate ? 'loop-draw' : undefined}
          style={animate ? ({ '--p': p } as CSSProperties) : undefined}
        />
      )}
    </svg>
  )
}

export const STATUS_META: Record<TopicStatus, { label: string; progress: number; tone: 'cool' | 'heat' | 'ok' }> = {
  'not-started': { label: 'Not started', progress: 0, tone: 'cool' },
  learning: { label: 'Learning', progress: 0.5, tone: 'cool' },
  completed: { label: 'Completed', progress: 1, tone: 'ok' },
  revision: { label: 'Needs revision', progress: 1, tone: 'heat' },
}

export function StatusGlyph({ status, size = 18 }: { status: TopicStatus; size?: number }) {
  const m = STATUS_META[status]
  return (
    <span className="relative inline-flex" title={m.label}>
      <LoopGlyph progress={m.progress} tone={m.tone} size={size} />
      {status === 'revision' && <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-heat" />}
    </span>
  )
}

const STATUS_ORDER: TopicStatus[] = ['not-started', 'learning', 'completed', 'revision']

/** Segmented control for a topic's status; writes straight to the store. */
export function StatusControl({ topicId, compact = false }: { topicId: string; compact?: boolean }) {
  const status = useStore((s) => topicStatus(s, topicId))
  return (
    <div role="radiogroup" aria-label="Topic status" className="inline-flex rounded-lg border border-rule bg-surface p-0.5">
      {STATUS_ORDER.map((st) => {
        const on = st === status
        return (
          <button
            key={st}
            role="radio"
            aria-checked={on}
            onClick={() => setTopicStatus(topicId, st)}
            title={STATUS_META[st].label}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors ${
              on ? 'bg-sunken font-medium text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            <StatusGlyph status={st} size={14} />
            {!compact && <span>{STATUS_META[st].label}</span>}
          </button>
        )
      })}
    </div>
  )
}

export function CoverageBadge({ coverage }: { coverage: Coverage }) {
  const map = {
    full: { text: 'Fully in Rathore', cls: 'text-ok border-ok/40' },
    partial: { text: 'Partly in Rathore', cls: 'text-warn border-warn/50' },
    missing: { text: 'Not in Rathore · supplementary', cls: 'text-heat border-heat/50 border-dashed' },
  }[coverage]
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${map.cls}`}>{map.text}</span>
}

export function HighlightStar({ withLabel = false }: { withLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-warn" title="Highlighted on your syllabus copy">
      <Star size={12} fill="currentColor" aria-hidden />
      {withLabel && 'Highlighted'}
    </span>
  )
}

export function SourceTag({ source }: { source: Source }) {
  if (source.kind === 'textbook') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-cool-soft px-1.5 py-0.5 text-[11px] font-medium text-cool">
        Rathore · {source.ref} · p.&nbsp;{source.page}
      </span>
    )
  }
  return <span className="inline-flex items-center rounded-md border border-dashed border-rule-strong px-1.5 py-0.5 text-[11px] text-muted">Generated</span>
}

export function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  const label = ['Basic', 'Standard', 'Challenging'][level - 1]
  return (
    <span className="inline-flex items-center gap-0.5" title={label} aria-label={`Difficulty: ${label}`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${i <= level ? 'bg-ink-2' : 'bg-rule-strong'}`} />
      ))}
    </span>
  )
}

export function BookmarkButton({ kind, id, label, className = '' }: { kind: BookmarkKind; id: string; label: string; className?: string }) {
  const on = useStore((s) => isBookmarked(s, kind, id))
  const Icon = on ? BookmarkCheck : Bookmark
  return (
    <button
      onClick={() => toggleBookmark(kind, id, label)}
      aria-pressed={on}
      title={on ? 'Remove bookmark' : 'Bookmark'}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-sunken ${on ? 'text-heat' : 'text-muted'} ${className}`}
    >
      <Icon size={16} aria-hidden />
      <span className="sr-only">{on ? 'Remove bookmark' : 'Bookmark'}</span>
    </button>
  )
}

export function PageHeader({ eyebrow, title, children, actions }: { eyebrow?: ReactNode; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
      <div className="min-w-0 max-w-3xl">
        {eyebrow && <div className="num mb-2 text-[11px] uppercase tracking-[0.12em] text-muted">{eyebrow}</div>}
        <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.015em] text-ink sm:text-[30px]">{title}</h1>
        {children && <div className="mt-2 text-[15px] leading-relaxed text-ink-2">{children}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active ? 'border-ink bg-ink text-paper' : 'border-rule bg-surface text-ink-2 hover:border-rule-strong'
      }`}
    >
      {children}
    </button>
  )
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-rule-strong px-6 py-10 text-center">
      <div className="mx-auto mb-3 w-fit">
        <LoopGlyph progress={0} size={28} />
      </div>
      <p className="font-medium text-ink">{title}</p>
      {children && <div className="mx-auto mt-1 max-w-md text-sm text-muted">{children}</div>}
    </div>
  )
}

export const btn = {
  primary: 'inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-40',
  secondary: 'inline-flex items-center justify-center gap-1.5 rounded-lg border border-rule bg-surface px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-rule-strong disabled:opacity-40',
  ghost: 'inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-ink-2 transition-colors hover:bg-sunken hover:text-ink',
}

export const input =
  'w-full rounded-lg border border-rule bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-cool focus:outline-none'

export const select = 'rounded-lg border border-rule bg-surface px-2.5 py-1.5 text-sm text-ink focus:border-cool focus:outline-none'
