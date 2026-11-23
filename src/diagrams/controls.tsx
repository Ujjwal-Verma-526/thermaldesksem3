import { useId } from 'react'

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  fmt = (v) => String(v),
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  fmt?: (v: number) => string
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <label htmlFor={id} className="text-ink-2">
          {label}
        </label>
        <span className="num text-xs text-ink">{fmt(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--heat)]"
      />
    </div>
  )
}

export function Readout({ label, value, tone }: { label: string; value: string; tone?: 'heat' | 'cool' }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <span className={`num font-medium ${tone === 'heat' ? 'text-heat' : tone === 'cool' ? 'text-cool' : 'text-ink'}`}>{value}</span>
    </div>
  )
}
