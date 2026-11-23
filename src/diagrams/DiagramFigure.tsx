import { Calculator, MousePointer2, PenLine, Shapes } from 'lucide-react'
import { DIAGRAMS, KIND_LABEL } from './registry'
import type { DiagramMeta } from '../content/types'

const KIND_ICON: Record<DiagramMeta['kind'], typeof Calculator> = {
  computed: Calculator,
  recreated: Shapes,
  qualitative: PenLine,
  interactive: MousePointer2,
}

export function KindBadge({ kind }: { kind: DiagramMeta['kind'] }) {
  const Icon = KIND_ICON[kind]
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-rule px-2 py-0.5 text-[11px] font-medium text-muted">
      <Icon size={11} aria-hidden />
      {KIND_LABEL[kind]}
    </span>
  )
}

/** Renders a registered diagram with its provenance: kind badge, caption and book figure. */
export function DiagramFigure({ id, caption, showTitle = true }: { id: string; caption?: string; showTitle?: boolean }) {
  const entry = DIAGRAMS[id]
  if (!entry) {
    console.error(`[diagram] unknown diagram id "${id}"`)
    return (
      <div className="my-6 rounded-lg border border-dashed border-warn p-4 text-sm text-warn" role="alert">
        Diagram “{id}” is missing.
      </div>
    )
  }
  const { meta, Render } = entry
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-xl border border-rule bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule px-4 py-2.5">
        {showTitle && <span className="text-sm font-medium text-ink">{meta.title}</span>}
        <div className="flex items-center gap-2">
          {meta.bookFigure && <span className="num text-[11px] text-muted">cf. Rathore {meta.bookFigure}</span>}
          <KindBadge kind={meta.kind} />
        </div>
      </div>
      <div className="px-3 py-4 sm:px-5">
        <Render />
      </div>
      <figcaption className="border-t border-rule bg-sunken px-4 py-2.5 text-[13px] leading-relaxed text-ink-2">
        {meta.caption || caption}
      </figcaption>
    </figure>
  )
}
