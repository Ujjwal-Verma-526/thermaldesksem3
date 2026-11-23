import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Printer, Search } from 'lucide-react'
import { FORMULAS, UNITS, getTopic } from '../content'
import { isBookmarked, useStore } from '../lib/store'
import { FormulaCard } from '../components/study'
import { Chip, Empty, PageHeader, btn, input } from '../components/ui'

export function FormulasPage() {
  const [params] = useSearchParams()
  const focus = params.get('f')
  const state = useStore((s) => s)
  const [q, setQ] = useState('')
  const [unit, setUnit] = useState('all')
  const [onlyKey, setOnlyKey] = useState(false)
  const [onlySaved, setOnlySaved] = useState(false)

  useEffect(() => {
    if (focus) requestAnimationFrame(() => document.getElementById(focus)?.scrollIntoView({ block: 'center' }))
  }, [focus])

  const list = useMemo(() => {
    const needle = q.toLowerCase().trim()
    return FORMULAS.filter((f) => {
      const t = getTopic(f.topicId)
      if (unit !== 'all' && t?.unitId !== unit) return false
      if (onlyKey && !f.important) return false
      if (onlySaved && !isBookmarked(state, 'formula', f.id)) return false
      if (!needle) return true
      return `${f.name} ${f.meaning} ${f.conditions} ${f.vars.map((v) => v.meaning).join(' ')} ${t?.title}`.toLowerCase().includes(needle)
    })
  }, [q, unit, onlyKey, onlySaved, state])

  return (
    <div>
      <PageHeader
        eyebrow="Formula sheet"
        title="Every formula, with its conditions"
        actions={
          <button className={`${btn.secondary} no-print`} onClick={() => window.print()}>
            <Printer size={14} aria-hidden /> Print
          </button>
        }
      >
        Open a card for its variables, units and the conditions it holds under. Formulas marked <b>Key</b> are the ones most often needed in exams.
      </PageHeader>

      <div className="no-print mb-8 space-y-3">
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search formulas or variables…" aria-label="Search formulas" className={`${input} pl-9`} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={unit === 'all'} onClick={() => setUnit('all')}>
            All units
          </Chip>
          {UNITS.map((u) => (
            <Chip key={u.id} active={unit === u.id} onClick={() => setUnit(u.id)}>
              {u.number}. {u.title}
            </Chip>
          ))}
          <span className="mx-1 h-4 w-px self-center bg-rule" />
          <Chip active={onlyKey} onClick={() => setOnlyKey((v) => !v)}>
            Key only
          </Chip>
          <Chip active={onlySaved} onClick={() => setOnlySaved((v) => !v)}>
            Bookmarked
          </Chip>
        </div>
      </div>

      {list.length === 0 ? (
        <Empty title="No formulas match">{onlySaved ? 'Bookmark formulas with the ribbon icon to collect them here.' : 'Try a different search.'}</Empty>
      ) : (
        <div className="space-y-10">
          {UNITS.map((u) => {
            const fs = list.filter((f) => getTopic(f.topicId)?.unitId === u.id)
            if (fs.length === 0) return null
            return (
              <section key={u.id} aria-labelledby={`fu-${u.id}`}>
                <h2 id={`fu-${u.id}`} className="mb-3 flex items-baseline gap-2 text-[17px] font-semibold text-ink">
                  <span className="num text-xs font-normal text-muted">UNIT {u.number}</span>
                  {u.title}
                </h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {fs.map((f) => (
                    <FormulaCard key={f.id} f={f} highlight={f.id === focus} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
