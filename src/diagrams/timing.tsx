/**
 * Valve / port timing diagrams drawn from the textbook's typical angles
 * (Rathore Figs 24.5, 24.9(b), 24.16). Angles are crank degrees measured clockwise
 * from TDC; the geometry is computed, so each arc subtends exactly the stated angle.
 */

interface Arc {
  from: number
  to: number
  r: number
  label: string
  tone: 'heat' | 'cool' | 'ink' | 'muted' | 'warn'
}
interface Event {
  at: number
  label: string
  r?: number
}

const CX = 170
const CY = 150

const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) }
}

function arcPath(from: number, to: number, r: number) {
  const span = to - from
  const a = pt(from, r)
  const b = pt(to, r)
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} A${r},${r} 0 ${span > 180 ? 1 : 0} 1 ${b.x.toFixed(1)},${b.y.toFixed(1)}`
}

function TimingDiagram({ arcs, events, title }: { arcs: Arc[]; events: Event[]; title: string }) {
  return (
    <svg viewBox="-12 0 364 300" className="schem block h-auto w-full max-w-md" role="img" aria-label={title}>
      <defs>
        {(['heat', 'cool', 'ink', 'muted', 'warn'] as const).map((t) => (
          <marker key={t} id={`tm-${t}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill={`var(--${t})`} />
          </marker>
        ))}
      </defs>
      {/* dead-centre axis */}
      <line x1={CX} y1={CY - 128} x2={CX} y2={CY + 128} stroke="var(--rule-strong)" strokeDasharray="3 4" />
      <text x={CX} y={CY - 132} textAnchor="middle" className="s-title">TDC</text>
      <text x={CX} y={CY + 142} textAnchor="middle" className="s-title">BDC</text>
      <circle cx={CX} cy={CY} r={3} fill="var(--ink)" />
      {arcs.map((a) => (
        <g key={a.label}>
          <path d={arcPath(a.from, a.to, a.r)} fill="none" stroke={`var(--${a.tone})`} strokeWidth={6} strokeOpacity={0.9} strokeLinecap="butt" markerEnd={`url(#tm-${a.tone})`} />
          <ArcLabel arc={a} />
        </g>
      ))}
      {events.map((e) => {
        const r = e.r ?? 112
        const a = pt(e.at, 38)
        const b = pt(e.at, r)
        const t = pt(e.at, r + 12)
        const right = Math.sin((e.at * Math.PI) / 180) >= 0
        return (
          <g key={e.label}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--muted)" strokeWidth={0.8} />
            <text x={t.x} y={t.y + 3} textAnchor={right ? 'start' : 'end'} className="s-muted">
              {e.label}
            </text>
          </g>
        )
      })}
      <text x={10} y={292} className="s-muted">
        crank rotates clockwise · angles from the book’s typical values
      </text>
    </svg>
  )
}

function ArcLabel({ arc }: { arc: Arc }) {
  let mid = (arc.from + arc.to) / 2
  if (arc.to - arc.from > 300) mid = arc.from + 40
  const p = pt(mid, arc.r - 13)
  return (
    <text x={p.x} y={p.y + 3} textAnchor="middle" fill={`var(--${arc.tone})`} style={{ fill: `var(--${arc.tone})`, fontWeight: 600 }}>
      {arc.label}
    </text>
  )
}

/** Fig. 24.9(b): IVO 15° bTDC, IVC 30° aBDC (book: 20–40°), ignition 30° bTDC (book: 20–40°),
 *  EVO 50° bBDC, EVC 10° aTDC (book: 0–10°). */
export function ValveTimingSI() {
  return (
    <TimingDiagram
      title="Typical valve timing diagram of a four-stroke SI engine"
      arcs={[
        { from: -15, to: 210, r: 96, label: 'suction', tone: 'cool' },
        { from: 210, to: 330, r: 72, label: 'compression', tone: 'ink' },
        { from: 360, to: 490, r: 72, label: 'expansion', tone: 'heat' },
        { from: 130, to: 370, r: 54, label: 'exhaust', tone: 'muted' },
      ]}
      events={[
        { at: -15, label: 'IVO 15° bTDC' },
        { at: 10, label: 'EVC 10° aTDC' },
        { at: 210, label: 'IVC 30° aBDC' },
        { at: 130, label: 'EVO 50° bBDC' },
        { at: 330, label: 'Spark ≈30° bTDC', r: 86 },
      ]}
    />
  )
}

/** Fig. 24.16: IVO 10–30° bTDC (20), IVC 20–50° aBDC (35), EVO ≈40° bBDC, EVC ≈15° aTDC,
 *  injection 5–15° bTDC (10) to 15–25° aTDC (20). */
export function ValveTimingCI() {
  return (
    <TimingDiagram
      title="Typical valve timing diagram of a four-stroke CI (diesel) engine"
      arcs={[
        { from: -20, to: 215, r: 96, label: 'suction', tone: 'cool' },
        { from: 215, to: 350, r: 72, label: 'compression', tone: 'ink' },
        { from: 350, to: 380, r: 116, label: 'injection', tone: 'warn' },
        { from: 360, to: 500, r: 72, label: 'expansion', tone: 'heat' },
        { from: 140, to: 375, r: 54, label: 'exhaust', tone: 'muted' },
      ]}
      events={[
        { at: -20, label: 'IVO 20° bTDC' },
        { at: 15, label: 'EVC 15° aTDC', r: 100 },
        { at: 215, label: 'IVC 35° aBDC' },
        { at: 140, label: 'EVO 40° bBDC' },
        { at: 350, label: 'FVO 10° bTDC', r: 128 },
        { at: 20, label: 'FVC 20° aTDC', r: 128 },
      ]}
    />
  )
}

/** Fig. 24.5: two-stroke SI port timing — symmetric about the dead centres. */
export function PortTiming2S() {
  return (
    <TimingDiagram
      title="Port timing diagram of a two-stroke petrol engine"
      arcs={[
        { from: 120, to: 240, r: 96, label: 'exhaust', tone: 'muted' },
        { from: 130, to: 230, r: 74, label: 'transfer', tone: 'cool' },
        { from: -40, to: 40, r: 96, label: 'crankcase inlet', tone: 'ink' },
        { from: -18, to: 120, r: 54, label: 'combustion + expansion', tone: 'heat' },
      ]}
      events={[
        { at: 120, label: 'EPU 60° bBDC' },
        { at: 240, label: 'EPC 60° aBDC' },
        { at: 130, label: 'TPU 50° bBDC', r: 90 },
        { at: 230, label: 'TPC 50° aBDC', r: 90 },
        { at: -40, label: 'IPU 40° bTDC' },
        { at: 40, label: 'IPC 40° aTDC' },
        { at: -18, label: 'Spark 15–20° bTDC', r: 82 },
      ]}
    />
  )
}
