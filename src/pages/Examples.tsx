import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import { EXAMPLES, UNITS, getExample, getTopic } from '../content'
import { ExampleView } from '../components/study'
import { Chip, DifficultyDots, Empty, PageHeader, SourceTag, input } from '../components/ui'
import { NotFound } from './NotFound'

export function ExamplesPage() {
  const [q, setQ] = useState('')
  const [unit, setUnit] = useState<string>('all')
  const [kind, setKind] = useState<'all' | 'textbook' | 'generated'>('all')

  const list = useMemo(() => {
    const needle = q.toLowerCase().trim()
    return EXAMPLES.filter((e) => {
      const t = getTopic(e.topicId)
      if (unit !== 'all' && t?.unitId !== unit) return false
      if (kind !== 'all' && e.source.kind !== kind) return false
      if (!needle) return true
      const ref = e.source.kind === 'textbook' ? e.source.ref : ''
      return `${e.title} ${ref} ${e.statement} ${t?.title}`.toLowerCase().includes(needle)
    })
  }, [q, unit, kind])

  const textbook = EXAMPLES.filter((e) => e.source.kind === 'textbook').length

  return (
    <div>
      <PageHeader eyebrow="Worked examples" title="Solved problems, step by step">
        {textbook} examples are Rathore’s, with the problem statement kept in the book’s wording and every number re-computed. Where the book has an error,
        it is flagged. {EXAMPLES.length - textbook} are generated practice problems, marked as such.
      </PageHeader>

      <div className="mb-6 space-y-3">
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search examples…" aria-label="Search examples" className={`${input} pl-9`} />
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
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'textbook', 'generated'] as const).map((k) => (
            <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
              {k === 'all' ? 'Any source' : k === 'textbook' ? 'From Rathore' : 'Generated'}
            </Chip>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <Empty title="No examples match these filters" />
      ) : (
        <ul className="divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-surface">
          {list.map((e) => {
            const t = getTopic(e.topicId)
            const u = UNITS.find((x) => x.id === t?.unitId)
            return (
              <li key={e.id}>
                <Link to={`/examples/${e.id}`} className="grid grid-cols-1 gap-1 px-5 py-3.5 hover:bg-paper sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium text-ink">{e.title}</span>
                    <span className="block truncate text-xs text-muted">
                      Unit {u?.number} · {t?.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <DifficultyDots level={e.difficulty} />
                    <SourceTag source={e.source} />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function ExampleDetailPage() {
  const { exampleId = '' } = useParams()
  const e = getExample(exampleId)
  if (!e) return <NotFound what="example" />
  const idx = EXAMPLES.indexOf(e)
  const prev = EXAMPLES[idx - 1]
  const next = EXAMPLES[idx + 1]
  return (
    <div className="max-w-3xl">
      <Link to="/examples" className="mb-5 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> All examples
      </Link>
      <ExampleView key={e.id} e={e} />
      <div className="mt-8 flex justify-between gap-4 text-sm">
        {prev ? (
          <Link to={`/examples/${prev.id}`} className="text-muted hover:text-ink">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/examples/${next.id}`} className="text-right text-muted hover:text-ink">
            {next.title} →
          </Link>
        )}
      </div>
    </div>
  )
}
