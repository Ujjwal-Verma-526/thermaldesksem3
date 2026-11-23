import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calculator, FileText, FlaskConical, ListChecks, Search, Shapes } from 'lucide-react'
import { EXAMPLES, FORMULAS, QUESTIONS, TOPICS, getUnit } from '../content'
import { DIAGRAMS } from '../diagrams/registry'
import { PAPER_PARTS, partLabel } from '../content/papers'

interface Hit {
  key: string
  kind: 'Topic' | 'Section' | 'Formula' | 'Example' | 'Question' | 'Diagram' | 'Paper'
  title: string
  sub: string
  to: string
  haystack: string
}

const KIND_ICON = {
  Topic: BookOpen,
  Section: BookOpen,
  Formula: Calculator,
  Example: FlaskConical,
  Question: ListChecks,
  Diagram: Shapes,
  Paper: FileText,
}

/** Strip markdown and TeX noise so plain words match. */
function plain(s: string): string {
  return s
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/[#>*_`|[\]()!]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

function buildIndex(): Hit[] {
  const hits: Hit[] = []
  for (const t of TOPICS) {
    const unit = getUnit(t.unitId)
    hits.push({
      key: `t-${t.id}`,
      kind: 'Topic',
      title: t.title,
      sub: `Unit ${unit?.number} · ${t.summary}`,
      to: `/topic/${t.id}`,
      haystack: plain(`${t.title} ${t.summary} ${t.syllabusPhrases.join(' ')} ${t.keyPoints.join(' ')}`),
    })
    for (const s of t.sections) {
      hits.push({
        key: `s-${t.id}-${s.id}`,
        kind: 'Section',
        title: s.title,
        sub: t.title,
        to: `/topic/${t.id}?section=${s.id}`,
        haystack: plain(`${s.title} ${s.body}`),
      })
    }
  }
  for (const f of FORMULAS) {
    hits.push({ key: `f-${f.id}`, kind: 'Formula', title: f.name, sub: f.meaning, to: `/formulas?f=${f.id}`, haystack: plain(`${f.name} ${f.meaning} ${f.conditions}`) })
  }
  for (const e of EXAMPLES) {
    const src = e.source.kind === 'textbook' ? e.source.ref : 'Generated'
    hits.push({ key: `e-${e.id}`, kind: 'Example', title: e.title, sub: src, to: `/examples/${e.id}`, haystack: plain(`${e.title} ${src} ${e.statement}`) })
  }
  for (const q of QUESTIONS) {
    hits.push({ key: `q-${q.id}`, kind: 'Question', title: q.prompt.slice(0, 110), sub: q.type, to: `/questions?q=${q.id}`, haystack: plain(q.prompt) })
  }
  for (const [id, { meta }] of Object.entries(DIAGRAMS)) {
    hits.push({ key: `d-${id}`, kind: 'Diagram', title: meta.title, sub: meta.caption, to: `/diagrams?d=${id}`, haystack: plain(`${meta.title} ${meta.caption}`) })
  }
  for (const { paper, question, part } of PAPER_PARTS) {
    const label = `Q${question.number}${partLabel(part)}${part.label === 'or' ? ' (or)' : ''}`
    // official papers are known by their session ("May 2023"); practice papers by their title ("Predicted Paper 4")
    const which = paper.kind === 'official' ? paper.session : paper.title
    hits.push({
      key: `p-${part.id}`,
      kind: 'Paper',
      title: plain(part.prompt).slice(0, 110),
      sub: `${which} · ${label} · ${part.marks} marks`,
      to: `/papers/${paper.id}?part=${part.id}`,
      haystack: plain(`${question.stem ?? ''} ${part.prompt} ${which}`),
    })
  }
  return hits
}

const KIND_WEIGHT: Record<Hit['kind'], number> = { Topic: 6, Formula: 5, Example: 4, Section: 3, Diagram: 2, Paper: 1.5, Question: 1 }

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const index = useMemo(buildIndex, [])
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const results = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return index.filter((h) => h.kind === 'Topic').slice(0, 10)
    return index
      .filter((h) => terms.every((t) => h.haystack.includes(t) || h.title.toLowerCase().includes(t)))
      .map((h) => ({ h, score: KIND_WEIGHT[h.kind] + (terms.every((t) => h.title.toLowerCase().includes(t)) ? 10 : 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 30)
      .map((r) => r.h)
  }, [q, index])

  if (!open) return null

  const go = (h: Hit) => {
    onClose()
    navigate(h.to)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-[10vh] backdrop-blur-[2px]" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-xl overflow-hidden rounded-xl border border-rule bg-surface shadow-[var(--shadow)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-rule px-4">
          <Search size={16} className="text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              else if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === 'Enter' && results[active]) go(results[active])
            }}
            placeholder="Search topics, formulas, examples, questions, papers…"
            aria-label="Search"
            className="h-12 w-full bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
          />
          <kbd className="num rounded border border-rule px-1.5 text-[10px] text-muted">Esc</kbd>
        </div>
        <ul className="scrollbar-thin max-h-[60vh] overflow-y-auto p-2" role="listbox" aria-label="Results">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches “{q}”.</li>}
          {results.map((h, i) => {
            const Icon = KIND_ICON[h.kind]
            return (
              <li key={h.key} role="option" aria-selected={i === active}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(h)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left ${i === active ? 'bg-sunken' : ''}`}
                >
                  <Icon size={15} className="mt-0.5 shrink-0 text-muted" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink">{h.title}</span>
                    <span className="block truncate text-xs text-muted">{h.sub}</span>
                  </span>
                  <span className="num shrink-0 text-[10px] uppercase tracking-wider text-muted">{h.kind}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
