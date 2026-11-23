import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { UNITS, getTopic } from '../content'
import type { DiagramKind } from '../content/types'
import { DIAGRAMS, KIND_LABEL } from '../diagrams/registry'
import { DiagramFigure } from '../diagrams/DiagramFigure'
import { Chip, PageHeader } from '../components/ui'

export function DiagramsPage() {
  const [params] = useSearchParams()
  const focus = params.get('d')
  const [kind, setKind] = useState<'all' | DiagramKind>('all')
  const [unit, setUnit] = useState('all')

  useEffect(() => {
    if (focus) requestAnimationFrame(() => document.getElementById(`dg-${focus}`)?.scrollIntoView({ block: 'start' }))
  }, [focus])

  const entries = Object.values(DIAGRAMS).filter(({ meta }) => {
    if (kind !== 'all' && meta.kind !== kind) return false
    if (unit !== 'all' && getTopic(meta.topicId)?.unitId !== unit) return false
    return true
  })

  return (
    <div>
      <PageHeader eyebrow="Diagrams" title="Every diagram, drawn for this course">
        None of these are scans of the book. <b>Computed</b> plots are drawn from the cycle equations to scale; <b>recreated</b> illustrations redraw a
        textbook figure’s content; <b>qualitative</b> sketches show trends, not data; <b>interactive</b> ones respond to sliders. The matching Rathore figure is
        cited on each.
      </PageHeader>
      <div className="mb-8 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <Chip active={unit === 'all'} onClick={() => setUnit('all')}>
            All units
          </Chip>
          {UNITS.map((u) => (
            <Chip key={u.id} active={unit === u.id} onClick={() => setUnit(u.id)}>
              {u.number}. {u.title}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={kind === 'all'} onClick={() => setKind('all')}>
            Any kind
          </Chip>
          {(Object.keys(KIND_LABEL) as DiagramKind[]).map((k) => (
            <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
              {KIND_LABEL[k]}
            </Chip>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
        {entries.map(({ meta }) => {
          const t = getTopic(meta.topicId)
          return (
            <div key={meta.id} id={`dg-${meta.id}`} className="scroll-mt-24">
              <DiagramFigure id={meta.id} />
              {t && (
                <Link to={`/topic/${t.id}`} className="-mt-5 mb-6 block text-xs text-muted hover:text-cool">
                  → {t.title}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
