import type { ReactNode } from 'react'

/**
 * Minimal SVG plotting primitive used by every computed diagram.
 * Data coordinates are mapped linearly into the plot box. Colours come from CSS
 * custom properties so diagrams follow light/dark theme automatically.
 */

export type Tone = 'ink' | 'heat' | 'cool' | 'muted' | 'accent' | 'faint'

export const toneVar: Record<Tone, string> = {
  ink: 'var(--ink)',
  heat: 'var(--heat)',
  cool: 'var(--cool)',
  muted: 'var(--muted)',
  accent: 'var(--accent)',
  faint: 'var(--rule-strong)',
}

export interface Series {
  pts: [number, number][]
  tone?: Tone
  dashed?: boolean
  width?: number
  /** draw an arrowhead at the midpoint pointing along the path */
  arrow?: boolean
  fill?: boolean
}

export interface Mark {
  x: number
  y: number
  label: string
  /** label offset in px */
  dx?: number
  dy?: number
  tone?: Tone
  dot?: boolean
}

export interface Note {
  x: number
  y: number
  text: string
  tone?: Tone
  anchor?: 'start' | 'middle' | 'end'
  italic?: boolean
  size?: number
}

export interface PlotProps {
  series: Series[]
  marks?: Mark[]
  notes?: Note[]
  xLabel: string
  yLabel: string
  width?: number
  height?: number
  /** explicit data ranges; otherwise derived from the series with padding */
  xRange?: [number, number]
  yRange?: [number, number]
  /** draw axis ticks with numbers (for real charts, not schematic cycle plots) */
  ticks?: { x?: number[]; y?: number[]; fmtX?: (n: number) => string; fmtY?: (n: number) => string }
  ariaLabel: string
  children?: (map: { x: (n: number) => number; y: (n: number) => number }) => ReactNode
}

export function Plot({
  series,
  marks = [],
  notes = [],
  xLabel,
  yLabel,
  width = 420,
  height = 300,
  xRange,
  yRange,
  ticks,
  ariaLabel,
  children,
}: PlotProps) {
  const padL = ticks?.y ? 46 : 30
  const padB = ticks?.x ? 40 : 30
  const padT = 16
  const padR = 18
  const all = series.flatMap((s) => s.pts)
  const xs = all.map((p) => p[0])
  const ys = all.map((p) => p[1])
  const [x0, x1] = xRange ?? padRange(Math.min(...xs), Math.max(...xs))
  const [y0, y1] = yRange ?? padRange(Math.min(...ys), Math.max(...ys))
  const W = width - padL - padR
  const H = height - padT - padB
  const x = (n: number) => padL + ((n - x0) / (x1 - x0)) * W
  const y = (n: number) => padT + H - ((n - y0) / (y1 - y0)) * H

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="plot block h-auto w-full"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <marker id="axis-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,1 L9,5 L0,9 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* axes */}
      <line x1={padL} y1={padT + H} x2={padL + W + 8} y2={padT + H} stroke="var(--muted)" strokeWidth={1} markerEnd="url(#axis-head)" />
      <line x1={padL} y1={padT + H} x2={padL} y2={padT - 6} stroke="var(--muted)" strokeWidth={1} markerEnd="url(#axis-head)" />
      <text x={padL + W} y={padT + H + (ticks?.x ? 32 : 20)} textAnchor="end" className="plot-axis">
        {xLabel}
      </text>
      <text x={padL - (ticks?.y ? 38 : 12)} y={padT + 4} textAnchor="start" className="plot-axis">
        {yLabel}
      </text>

      {ticks?.x?.map((t) => (
        <g key={`tx${t}`}>
          <line x1={x(t)} x2={x(t)} y1={padT + H} y2={padT + H + 4} stroke="var(--muted)" />
          <line x1={x(t)} x2={x(t)} y1={padT} y2={padT + H} stroke="var(--rule)" strokeDasharray="2 4" />
          <text x={x(t)} y={padT + H + 16} textAnchor="middle" className="plot-tick">
            {ticks.fmtX ? ticks.fmtX(t) : t}
          </text>
        </g>
      ))}
      {ticks?.y?.map((t) => (
        <g key={`ty${t}`}>
          <line x1={padL - 4} x2={padL} y1={y(t)} y2={y(t)} stroke="var(--muted)" />
          <line x1={padL} x2={padL + W} y1={y(t)} y2={y(t)} stroke="var(--rule)" strokeDasharray="2 4" />
          <text x={padL - 7} y={y(t) + 4} textAnchor="end" className="plot-tick">
            {ticks.fmtY ? ticks.fmtY(t) : t}
          </text>
        </g>
      ))}

      {series
        .filter((s) => s.fill)
        .map((s, i) => (
          <path key={`f${i}`} d={toPath(s.pts, x, y) + ' Z'} fill="var(--fill)" stroke="none" />
        ))}

      {series.map((s, i) => (
        <g key={`s${i}`}>
          <path
            d={toPath(s.pts, x, y)}
            fill="none"
            stroke={toneVar[s.tone ?? 'ink']}
            strokeWidth={s.width ?? 1.8}
            strokeDasharray={s.dashed ? '5 4' : undefined}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {s.arrow && s.pts.length > 2 && <MidArrow pts={s.pts} x={x} y={y} tone={s.tone ?? 'ink'} />}
        </g>
      ))}

      {children?.({ x, y })}

      {marks.map((m, i) => (
        <g key={`m${i}`}>
          {m.dot !== false && <circle cx={x(m.x)} cy={y(m.y)} r={3} fill={toneVar[m.tone ?? 'ink']} />}
          <text x={x(m.x) + (m.dx ?? 6)} y={y(m.y) + (m.dy ?? -6)} className="plot-label" fill={toneVar[m.tone ?? 'ink']}>
            {m.label}
          </text>
        </g>
      ))}

      {notes.map((n, i) => (
        <text
          key={`n${i}`}
          x={x(n.x)}
          y={y(n.y)}
          textAnchor={n.anchor ?? 'middle'}
          className="plot-note"
          fill={toneVar[n.tone ?? 'muted']}
          fontStyle={n.italic ? 'italic' : undefined}
          fontSize={n.size}
        >
          <SubText text={n.text} />
        </text>
      ))}
    </svg>
  )
}

/** Renders "q_in" as q with a subscript; anything without "_" renders as-is. */
export function SubText({ text }: { text: string }) {
  const i = text.indexOf('_')
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <tspan baselineShift="sub" fontSize="0.75em">
        {text.slice(i + 1)}
      </tspan>
    </>
  )
}

function padRange(a: number, b: number): [number, number] {
  const span = b - a || Math.abs(a) || 1
  return [a - span * 0.06, b + span * 0.1]
}

function toPath(pts: [number, number][], x: (n: number) => number, y: (n: number) => number) {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ')
}

function MidArrow({
  pts,
  x,
  y,
  tone,
}: {
  pts: [number, number][]
  x: (n: number) => number
  y: (n: number) => number
  tone: Tone
}) {
  // find the midpoint by screen-space arc length so the arrow sits mid-curve
  const scr = pts.map((p) => [x(p[0]), y(p[1])] as const)
  let total = 0
  const seg: number[] = []
  for (let i = 1; i < scr.length; i++) {
    const d = Math.hypot(scr[i][0] - scr[i - 1][0], scr[i][1] - scr[i - 1][1])
    seg.push(d)
    total += d
  }
  if (total < 18) return null
  let acc = 0
  let k = 0
  while (k < seg.length && acc + seg[k] < total / 2) acc += seg[k++]
  const a = scr[Math.min(k, scr.length - 2)]
  const b = scr[Math.min(k + 1, scr.length - 1)]
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
  const t = seg[k] ? (total / 2 - acc) / seg[k] : 0
  const cx = a[0] + (b[0] - a[0]) * t
  const cy = a[1] + (b[1] - a[1]) * t
  return <path d="M-5,-4 L4,0 L-5,4 z" transform={`translate(${cx},${cy}) rotate(${ang})`} fill={toneVar[tone]} />
}
