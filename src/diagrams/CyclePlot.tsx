import { Plot, type Mark, type Note, type Series, type Tone } from './Plot'
import { processPath, type Cycle, type Pt } from './thermo'

export type Axes = 'pv' | 'Ts'

interface Props {
  cycle: Cycle
  axes: Axes
  /** label for the volume axis: specific (v) or total (V) */
  volumeLabel?: string
  width?: number
  height?: number
  overlays?: { cycle: Cycle; tone: Tone; dashed?: boolean }[]
  /** hide the q_in / q_out labels */
  bare?: boolean
  ariaLabel: string
  extraNotes?: Note[]
}

const heatTone: Record<string, Tone> = { in: 'heat', out: 'cool', regen: 'muted' }

/** Convert a computed cycle into plot series on p–v or T–s axes. */
export function cycleSeries(cycle: Cycle, axes: Axes, baseTone: Tone = 'ink', dashed = false) {
  const series: Series[] = []
  const loop: [number, number][] = []
  const legs: { pts: [number, number][]; heat?: string; label?: string }[] = []
  for (const leg of cycle.legs) {
    const path = processPath(cycle.states[leg.from], cycle.states[leg.to], leg.proc)
    const pts = path.map((p) => proj(p, axes))
    loop.push(...pts)
    legs.push({ pts, heat: leg.heat, label: leg.label })
    series.push({
      pts,
      tone: dashed ? baseTone : leg.heat ? heatTone[leg.heat] : baseTone,
      dashed: dashed || leg.dashed || leg.heat === 'regen',
      arrow: !dashed,
      width: dashed ? 1.4 : 2,
    })
  }
  if (cycle.closed && !dashed && axes === 'pv') series.unshift({ pts: loop, fill: true, width: 0 })
  return { series, legs }
}

export function proj(p: Pt, axes: Axes): [number, number] {
  return axes === 'pv' ? [p.v, p.p] : [p.s, p.T]
}

export function CyclePlot({ cycle, axes, volumeLabel = 'v', width, height, overlays = [], bare, ariaLabel, extraNotes = [] }: Props) {
  const main = cycleSeries(cycle, axes)
  const series: Series[] = [...overlays.flatMap((o) => cycleSeries(o.cycle, axes, o.tone, o.dashed ?? true).series), ...main.series]

  // state markers, labels pushed away from the cycle centroid
  const pts = cycle.states.map((s, i) => {
    const path = processPath(s, s, { kind: 'isobaric' }, 1)
    return { xy: proj(path[0], axes), label: cycle.labels[i] }
  })
  const cx = pts.reduce((a, p) => a + p.xy[0], 0) / pts.length
  const cy = pts.reduce((a, p) => a + p.xy[1], 0) / pts.length
  const xs = series.flatMap((s) => s.pts.map((p) => p[0]))
  const ys = series.flatMap((s) => s.pts.map((p) => p[1]))
  const sx = Math.max(...xs) - Math.min(...xs) || 1
  const sy = Math.max(...ys) - Math.min(...ys) || 1
  const marks: Mark[] = pts.map((p) => {
    const ddx = (p.xy[0] - cx) / sx
    const ddy = (p.xy[1] - cy) / sy
    return {
      x: p.xy[0],
      y: p.xy[1],
      label: p.label,
      dx: ddx >= 0 ? 7 : -15,
      dy: ddy >= 0 ? -7 : 16,
    }
  })

  const notes: Note[] = [...extraNotes]
  if (!bare) {
    for (const leg of main.legs) {
      if (!leg.heat || leg.heat === 'regen') continue
      const mid = leg.pts[Math.floor(leg.pts.length / 2)]
      const ox = (mid[0] - cx) / sx
      const oy = (mid[1] - cy) / sy
      const len = Math.hypot(ox, oy) || 1
      notes.push({
        x: mid[0] + (ox / len) * sx * 0.1,
        y: mid[1] + (oy / len) * sy * 0.09,
        text: leg.heat === 'in' ? 'q_in' : 'q_out',
        tone: leg.heat === 'in' ? 'heat' : 'cool',
        italic: true,
      })
    }
  }

  return (
    <Plot
      series={series}
      marks={marks}
      notes={notes}
      xLabel={axes === 'pv' ? volumeLabel : 's'}
      yLabel={axes === 'pv' ? 'p' : 'T'}
      width={width}
      height={height}
      ariaLabel={ariaLabel}
    />
  )
}
