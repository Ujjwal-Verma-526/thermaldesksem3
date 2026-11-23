import { Plot } from './Plot'

/* ---------------------------------------------------------------------------
 * Combustion traces (qualitative — shapes follow Rathore Figs 24.27–24.29)
 * ------------------------------------------------------------------------- */

const motoring = (th: number) => 1 + 17 * Math.exp(-Math.pow(th / 42, 2))

/** SI engine: I ignition lag (A→B), II flame propagation (B→C), III afterburning (C→D). */
export function SICombustionStages() {
  const firing = (th: number) => {
    const base = motoring(th)
    if (th < -2) return base
    return base + 30 * Math.exp(-Math.pow((th - 13) / 17, 2)) * (1 - Math.exp(-(th + 2) / 4))
  }
  const range = (a: number, b: number, f: (x: number) => number): [number, number][] =>
    Array.from({ length: 90 }, (_, i) => {
      const x = a + ((b - a) * i) / 89
      return [x, f(x)]
    })
  const A = -25
  const B = -2
  const C = 13
  const D = 40
  return (
    <Plot
      series={[
        { pts: range(-90, 90, motoring), tone: 'muted', dashed: true, width: 1.3 },
        { pts: range(-90, 90, firing), tone: 'ink', width: 2 },
        { pts: [[0, 0], [0, 48]], tone: 'faint', width: 1 },
      ]}
      xRange={[-95, 95]}
      yRange={[0, 50]}
      xLabel="crank angle (θ)"
      yLabel="p"
      marks={[
        { x: A, y: motoring(A), label: 'A spark', dx: -50, dy: -6, tone: 'heat' },
        { x: B, y: firing(B), label: 'B', dx: -14, dy: -6 },
        { x: C, y: firing(C), label: 'C', dx: 6, dy: -6 },
        { x: D, y: firing(D), label: 'D', dx: 6, dy: -4 },
      ]}
      notes={[
        { x: -14, y: 4, text: 'I', tone: 'heat' },
        { x: 5, y: 4, text: 'II', tone: 'heat' },
        { x: 27, y: 4, text: 'III', tone: 'heat' },
        { x: 0, y: 49, text: 'TDC', tone: 'muted', size: 11 },
        { x: 65, y: 12, text: 'motoring', tone: 'muted', size: 11, italic: true },
      ]}
      ariaLabel="Qualitative pressure–crank angle trace of SI engine combustion showing three stages"
    />
  )
}

/** CI engine: 1 ignition delay, 2 uncontrolled, 3 controlled, 4 afterburning. */
export function CICombustionStages() {
  const firing = (th: number) => {
    const base = motoring(th)
    if (th < -6) return base
    const rise = 34 * (1 / (1 + Math.exp(-(th + 1) / 2.2)))
    const decay = th > 12 ? Math.exp(-(th - 12) / 30) : 1
    return base * (th > 12 ? 0.9 : 1) + rise * decay - (th > -6 && th < -3 ? 0.4 : 0)
  }
  const range = (a: number, b: number, f: (x: number) => number): [number, number][] =>
    Array.from({ length: 120 }, (_, i) => {
      const x = a + ((b - a) * i) / 119
      return [x, f(x)]
    })
  return (
    <Plot
      series={[
        { pts: range(-90, 90, motoring), tone: 'muted', dashed: true, width: 1.3 },
        { pts: range(-90, 90, firing), tone: 'ink', width: 2 },
        { pts: [[0, 0], [0, 58]], tone: 'faint', width: 1 },
        { pts: [[-18, 2], [-18, 7]], tone: 'heat', width: 2 },
      ]}
      xRange={[-95, 95]}
      yRange={[0, 60]}
      xLabel="crank angle (θ)"
      yLabel="p"
      marks={[
        { x: -18, y: motoring(-18), label: 'injection starts', dx: -100, dy: -4, tone: 'heat' },
        { x: -6, y: firing(-6), label: 'combustion starts', dx: -112, dy: -18 },
      ]}
      notes={[
        { x: -12, y: 4, text: '1', tone: 'heat' },
        { x: -1, y: 4, text: '2', tone: 'heat' },
        { x: 9, y: 4, text: '3', tone: 'heat' },
        { x: 30, y: 4, text: '4', tone: 'heat' },
        { x: 0, y: 59, text: 'TDC', tone: 'muted', size: 11 },
        { x: 62, y: 14, text: 'motoring', tone: 'muted', size: 11, italic: true },
      ]}
      ariaLabel="Qualitative pressure–crank angle trace of CI engine combustion showing four stages"
    />
  )
}

/** Detonation: flame front from the spark plug compresses the end gas (Fig. 24.28). */
export function DetonationSketch() {
  return (
    <svg viewBox="0 0 360 170" className="schem block h-auto w-full max-w-lg" role="img" aria-label="Normal combustion versus detonation in an SI engine combustion chamber">
      {[0, 1].map((k) => {
        const ox = 10 + k * 180
        return (
          <g key={k}>
            <rect x={ox} y={30} width={160} height={90} rx={6} fill="var(--surface)" stroke="var(--ink)" />
            {/* spark plug */}
            <rect x={ox + 4} y={66} width={10} height={18} fill="var(--ink)" />
            <circle cx={ox + 18} cy={75} r={3} fill="var(--heat)" />
            {/* burned zone */}
            <path d={`M${ox + 2},32 L${ox + 2},118 L${ox + (k ? 70 : 92)},118 Q${ox + (k ? 95 : 120)},75 ${ox + (k ? 70 : 92)},32 Z`} fill="var(--heat-soft)" />
            <path d={`M${ox + (k ? 70 : 92)},32 Q${ox + (k ? 95 : 120)},75 ${ox + (k ? 70 : 92)},118`} fill="none" stroke="var(--heat)" strokeWidth={2} />
            <text x={ox + 40} y={110} className="s-muted">burned</text>
            {k === 0 ? (
              <>
                <text x={ox + 125} y={78} className="s-muted">unburned</text>
                <text x={ox + 80} y={20} textAnchor="middle" className="s-title">Normal: one flame front</text>
                <text x={ox + 80} y={140} textAnchor="middle" className="s-muted">flame reaches the far wall</text>
                <text x={ox + 80} y={153} textAnchor="middle" className="s-muted">before end gas self-ignites</text>
              </>
            ) : (
              <>
                {/* end gas auto-ignition kernel */}
                <circle cx={ox + 140} cy={60} r={13} fill="var(--warn-soft)" stroke="var(--warn)" strokeWidth={2} />
                <text x={ox + 140} y={64} textAnchor="middle" style={{ fill: 'var(--warn)', fontWeight: 700 }}>!</text>
                <text x={ox + 128} y={104} className="s-muted">end gas</text>
                <path d={`M${ox + 118},60 L${ox + 100},60`} stroke="var(--warn)" strokeWidth={1.5} markerEnd="url(#det-arrow)" />
                <path d={`M${ox + 76},88 L${ox + 92},88`} stroke="var(--heat)" strokeWidth={1.5} markerEnd="url(#det-arrow-h)" />
                <text x={ox + 80} y={20} textAnchor="middle" className="s-title">Detonation: end gas auto-ignites</text>
                <text x={ox + 80} y={140} textAnchor="middle" className="s-muted">two pressure waves meet →</text>
                <text x={ox + 80} y={153} textAnchor="middle" className="s-muted">severe pulse, audible knock</text>
              </>
            )}
          </g>
        )
      })}
      <defs>
        <marker id="det-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,1 L9,5 L0,9 z" fill="var(--warn)" />
        </marker>
        <marker id="det-arrow-h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,1 L9,5 L0,9 z" fill="var(--heat)" />
        </marker>
      </defs>
    </svg>
  )
}

/* ---------------------------------------------------------------------------
 * Engine and compressor cross-sections (recreated, simplified)
 * ------------------------------------------------------------------------- */

function Callout({ x, y, tx, ty, text, anchor = 'start' }: { x: number; y: number; tx: number; ty: number; text: string; anchor?: 'start' | 'end' }) {
  return (
    <g>
      <line x1={x} y1={y} x2={tx} y2={ty} stroke="var(--muted)" strokeWidth={0.8} />
      <circle cx={x} cy={y} r={1.8} fill="var(--muted)" />
      <text x={tx + (anchor === 'start' ? 4 : -4)} y={ty + 4} textAnchor={anchor}>
        {text}
      </text>
    </g>
  )
}

/** Fig. 24.1 — principal parts of a four-stroke IC engine (simplified). */
export function EngineParts() {
  return (
    <svg viewBox="-42 0 455 330" className="schem block h-auto w-full max-w-xl" role="img" aria-label="Labelled cross-section of an internal combustion engine">
      {/* cylinder walls with fins */}
      <rect x={130} y={70} width={14} height={140} fill="var(--sunken)" stroke="var(--ink)" />
      <rect x={236} y={70} width={14} height={140} fill="var(--sunken)" stroke="var(--ink)" />
      {[80, 100, 120, 140, 160].map((y) => (
        <g key={y}>
          <rect x={116} y={y} width={14} height={6} fill="var(--sunken)" stroke="var(--ink)" strokeWidth={0.7} />
          <rect x={250} y={y} width={14} height={6} fill="var(--sunken)" stroke="var(--ink)" strokeWidth={0.7} />
        </g>
      ))}
      {/* head */}
      <rect x={120} y={50} width={140} height={20} fill="var(--sunken)" stroke="var(--ink)" />
      {/* valves */}
      <path d="M160,30 L160,66 M150,66 L170,66" stroke="var(--ink)" strokeWidth={2.5} />
      <path d="M220,30 L220,66 M210,66 L230,66" stroke="var(--ink)" strokeWidth={2.5} />
      <rect x={186} y={34} width={8} height={30} fill="var(--ink)" />
      <path d="M100,40 L150,40 L160,52" fill="none" stroke="var(--cool)" strokeWidth={6} strokeOpacity={0.35} />
      <path d="M220,52 L230,40 L290,40" fill="none" stroke="var(--heat)" strokeWidth={6} strokeOpacity={0.35} />
      {/* piston with rings */}
      <rect x={146} y={118} width={88} height={52} rx={3} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.4} />
      {[124, 131, 138].map((y) => (
        <line key={y} x1={146} y1={y} x2={234} y2={y} stroke="var(--ink)" strokeWidth={0.8} />
      ))}
      <circle cx={190} cy={152} r={6} fill="var(--sunken)" stroke="var(--ink)" />
      {/* connecting rod & crank */}
      <line x1={190} y1={152} x2={215} y2={262} stroke="var(--ink)" strokeWidth={7} strokeLinecap="round" />
      <circle cx={190} cy={262} r={30} fill="none" stroke="var(--rule-strong)" strokeDasharray="4 4" />
      <line x1={190} y1={262} x2={215} y2={262} stroke="var(--ink)" strokeWidth={9} strokeLinecap="round" />
      <circle cx={190} cy={262} r={6} fill="var(--ink)" />
      <circle cx={215} cy={262} r={4} fill="var(--surface)" stroke="var(--ink)" />
      {/* crankcase */}
      <path d="M130,210 L130,300 Q190,322 250,300 L250,210" fill="none" stroke="var(--ink)" />
      <Callout x={160} y={44} tx={60} ty={20} text="Inlet valve" anchor="end" />
      <Callout x={190} y={36} tx={190} ty={12} text="Spark plug / injector" />
      <Callout x={220} y={44} tx={300} ty={20} text="Exhaust valve" />
      <Callout x={124} y={60} tx={60} ty={64} text="Cylinder head" anchor="end" />
      <Callout x={137} y={95} tx={60} ty={100} text="Cylinder (liner)" anchor="end" />
      <Callout x={257} y={103} tx={300} ty={100} text="Cooling fins" />
      <Callout x={232} y={131} tx={300} ty={140} text="Piston rings" />
      <Callout x={160} y={150} tx={60} ty={150} text="Piston" anchor="end" />
      <Callout x={196} y={152} tx={300} ty={178} text="Gudgeon (piston) pin" />
      <Callout x={204} y={210} tx={300} ty={215} text="Connecting rod" />
      <Callout x={215} y={262} tx={300} ty={258} text="Crank pin / crank" />
      <Callout x={190} y={262} tx={60} ty={262} text="Crankshaft" anchor="end" />
      <Callout x={135} y={295} tx={60} ty={300} text="Crankcase (sump)" anchor="end" />
    </svg>
  )
}

/** Four strokes of an engine (Figs 24.7 & 24.14) — piston position and valve state per stroke. */
export function FourStrokePanels({ ci = false }: { ci?: boolean }) {
  const strokes = [
    { name: 'Suction', piston: 'down', iv: true, ev: false, note: ci ? 'air only' : 'air–fuel charge' },
    { name: 'Compression', piston: 'up', iv: false, ev: false, note: ci ? 'air → ~800 °C' : 'charge compressed' },
    { name: 'Power', piston: 'down', iv: false, ev: false, note: ci ? 'fuel injected, self-ignites' : 'spark ignites charge' },
    { name: 'Exhaust', piston: 'up', iv: false, ev: true, note: 'burnt gases out' },
  ]
  return (
    <svg viewBox="0 0 400 170" className="schem block h-auto w-full" role="img" aria-label={`Four strokes of a four-stroke ${ci ? 'diesel' : 'petrol'} engine`}>
      {strokes.map((s, i) => {
        const ox = 8 + i * 98
        const pistonY = s.piston === 'down' ? 88 : 46
        const arrowUp = s.piston === 'up'
        return (
          <g key={s.name}>
            <rect x={ox + 14} y={24} width={60} height={96} fill="none" stroke="var(--ink)" />
            <rect x={ox + 14} y={18} width={60} height={6} fill="var(--sunken)" stroke="var(--ink)" />
            {/* valves */}
            <line x1={ox + 28} y1={6} x2={ox + 28} y2={s.iv ? 30 : 22} stroke={s.iv ? 'var(--cool)' : 'var(--ink)'} strokeWidth={2.5} />
            <line x1={ox + 60} y1={6} x2={ox + 60} y2={s.ev ? 30 : 22} stroke={s.ev ? 'var(--heat)' : 'var(--ink)'} strokeWidth={2.5} />
            {s.name === 'Power' && (
              <circle cx={ox + 44} cy={30} r={5} fill={ci ? 'var(--warn)' : 'var(--heat)'} />
            )}
            {s.name === 'Power' && <rect x={ox + 15} y={25} width={58} height={pistonY - 25} fill="var(--heat-soft)" />}
            <rect x={ox + 16} y={pistonY} width={56} height={22} fill="var(--surface)" stroke="var(--ink)" />
            <line x1={ox + 44} y1={pistonY + 22} x2={ox + 44} y2={140} stroke="var(--ink)" strokeWidth={4} />
            <path
              d={arrowUp ? `M${ox + 84},100 L${ox + 84},56 M${ox + 80},62 L${ox + 84},56 L${ox + 88},62` : `M${ox + 84},50 L${ox + 84},94 M${ox + 80},88 L${ox + 84},94 L${ox + 88},88`}
              stroke="var(--muted)"
              fill="none"
              strokeWidth={1.4}
            />
            <text x={ox + 44} y={156} textAnchor="middle" className="s-title">
              {i + 1}. {s.name}
            </text>
            <text x={ox + 44} y={168} textAnchor="middle" className="s-muted">
              {s.note}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Two-stroke engine with crankcase compression and ports (Figs 24.2–24.3). */
export function TwoStrokeEngine() {
  return (
    <svg viewBox="-135 0 563 300" className="schem block h-auto w-full max-w-xl" role="img" aria-label="Two-stroke petrol engine with exhaust, transfer and inlet ports">
      <rect x={130} y={30} width={100} height={150} fill="none" stroke="var(--ink)" strokeWidth={1.4} />
      <rect x={120} y={22} width={120} height={10} fill="var(--sunken)" stroke="var(--ink)" />
      <rect x={176} y={6} width={8} height={18} fill="var(--ink)" />
      {/* ports */}
      <rect x={226} y={100} width={30} height={22} fill="var(--heat-soft)" stroke="var(--heat)" />
      <rect x={104} y={112} width={30} height={18} fill="var(--cool-soft)" stroke="var(--cool)" />
      <path d="M104,121 L80,121 L80,215 L130,215" fill="none" stroke="var(--cool)" strokeWidth={1.4} strokeDasharray="4 3" />
      {/* piston near BDC with deflector */}
      <path d="M132,130 L132,176 L228,176 L228,140 L200,140 L194,126 L188,140 L132,140 Z" fill="var(--surface)" stroke="var(--ink)" />
      <line x1={180} y1={176} x2={196} y2={240} stroke="var(--ink)" strokeWidth={6} strokeLinecap="round" />
      {/* crankcase */}
      <path d="M130,180 L130,250 Q180,285 230,250 L230,180" fill="none" stroke="var(--ink)" strokeWidth={1.4} />
      <circle cx={180} cy={240} r={22} fill="none" stroke="var(--rule-strong)" strokeDasharray="4 4" />
      <rect x={230} y={205} width={28} height={16} fill="var(--cool-soft)" stroke="var(--cool)" />
      <path d="M244,200 l0,-8 M240,196 l4,-6 l4,6" stroke="var(--cool)" fill="none" />
      <Callout x={180} y={14} tx={250} ty={12} text="Spark plug" />
      <Callout x={250} y={111} tx={290} ty={96} text="Exhaust port (E)" />
      <Callout x={110} y={121} tx={60} ty={90} text="Transfer port (T)" anchor="end" />
      <Callout x={84} y={170} tx={60} ty={170} text="Transfer passage" anchor="end" />
      <Callout x={194} y={130} tx={290} ty={150} text="Deflector on piston crown" />
      <Callout x={254} y={213} tx={290} ty={230} text="Inlet port (S), reed valve" />
      <Callout x={150} y={262} tx={60} ty={270} text="Crankcase (charge pre-compressed)" anchor="end" />
    </svg>
  )
}

/** Single-acting reciprocating air compressor (Fig. 25.2), simplified. */
export function RecipCompressorSketch() {
  return (
    <svg viewBox="-100 0 545 280" className="schem block h-auto w-full max-w-xl" role="img" aria-label="Sectional view of a single-stage reciprocating air compressor">
      <rect x={120} y={50} width={120} height={140} fill="none" stroke="var(--ink)" strokeWidth={1.4} />
      <rect x={104} y={60} width={16} height={110} fill="var(--cool-soft)" stroke="var(--cool)" />
      <rect x={240} y={60} width={16} height={110} fill="var(--cool-soft)" stroke="var(--cool)" />
      <rect x={110} y={36} width={140} height={14} fill="var(--sunken)" stroke="var(--ink)" />
      {/* valves */}
      <path d="M150,20 L150,48 M140,48 L160,48" stroke="var(--cool)" strokeWidth={2.4} />
      <path d="M210,20 L210,48 M200,48 L220,48" stroke="var(--heat)" strokeWidth={2.4} />
      <path d="M100,20 L150,20" stroke="var(--cool)" strokeWidth={1.4} />
      <path d="M210,20 L290,20 L290,60" stroke="var(--heat)" strokeWidth={1.4} />
      <rect x={270} y={60} width={40} height={60} rx={10} fill="var(--surface)" stroke="var(--heat)" />
      {/* piston */}
      <rect x={122} y={110} width={116} height={36} fill="var(--surface)" stroke="var(--ink)" />
      <line x1={180} y1={146} x2={200} y2={232} stroke="var(--ink)" strokeWidth={6} strokeLinecap="round" />
      <circle cx={180} cy={232} r={22} fill="none" stroke="var(--rule-strong)" strokeDasharray="4 4" />
      <line x1={120} y1={60} x2={60} y2={60} stroke="var(--rule-strong)" strokeDasharray="3 3" />
      <line x1={120} y1={180} x2={60} y2={180} stroke="var(--rule-strong)" strokeDasharray="3 3" />
      <text x={56} y={64} textAnchor="end" className="s-muted">TDC</text>
      <text x={56} y={184} textAnchor="end" className="s-muted">BDC</text>
      <Callout x={150} y={26} tx={60} ty={20} text="Inlet valve (spring loaded)" anchor="end" />
      <Callout x={210} y={30} tx={300} ty={8} text="Delivery valve" />
      <Callout x={290} y={90} tx={318} ty={90} text="Receiver" />
      <Callout x={248} y={150} tx={300} ty={150} text="Water jacket" />
      <Callout x={140} y={128} tx={60} ty={128} text="Piston" anchor="end" />
      <Callout x={190} y={190} tx={300} ty={200} text="Connecting rod" />
      <Callout x={200} y={232} tx={300} ty={245} text="Crank (driven by motor)" />
    </svg>
  )
}

/** Centrifugal compressor: impeller, eye, diffuser and volute casing (Fig. 26.6). */
export function CentrifugalSketch() {
  const blades = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180)
  return (
    <svg viewBox="0 0 430 260" className="schem block h-auto w-full max-w-xl" role="img" aria-label="Front view of a centrifugal compressor showing impeller, diffuser and volute casing">
      {/* volute */}
      <path d="M130,130 m-118,0 a118,112 0 1,1 118,112 L300,242 L300,212 L150,212" fill="none" stroke="var(--ink)" strokeWidth={1.4} />
      {/* diffuser ring with vanes */}
      <circle cx={130} cy={130} r={92} fill="none" stroke="var(--rule-strong)" />
      <circle cx={130} cy={130} r={70} fill="none" stroke="var(--rule-strong)" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36 * Math.PI) / 180
        const x1 = 130 + 72 * Math.cos(a)
        const y1 = 130 + 72 * Math.sin(a)
        const x2 = 130 + 90 * Math.cos(a + 0.35)
        const y2 = 130 + 90 * Math.sin(a + 0.35)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--cool)" strokeWidth={1.6} />
      })}
      {/* impeller */}
      <circle cx={130} cy={130} r={66} fill="var(--surface)" stroke="var(--ink)" />
      {blades.map((a, i) => (
        <line key={i} x1={130 + 24 * Math.cos(a)} y1={130 + 24 * Math.sin(a)} x2={130 + 64 * Math.cos(a)} y2={130 + 64 * Math.sin(a)} stroke="var(--ink)" strokeWidth={2} />
      ))}
      <circle cx={130} cy={130} r={22} fill="var(--cool-soft)" stroke="var(--cool)" />
      <circle cx={130} cy={130} r={6} fill="var(--ink)" />
      <path d="M232,48 A120,120 0 0 1 250,96" fill="none" stroke="var(--heat)" strokeWidth={1.5} markerEnd="url(#cc-a)" />
      <defs>
        <marker id="cc-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,1 L9,5 L0,9 z" fill="var(--heat)" />
        </marker>
      </defs>
      <Callout x={130} y={118} tx={290} ty={28} text="Eye (air enters axially)" />
      <Callout x={176} y={108} tx={290} ty={64} text="Impeller with radial vanes" />
      <Callout x={206} y={164} tx={290} ty={120} text="Vaned diffuser ring" />
      <Callout x={240} y={180} tx={290} ty={160} text="Volute (scroll) casing" />
      <Callout x={300} y={228} tx={318} ty={196} text="Delivery" />
    </svg>
  )
}

/** Pressure and velocity variation through impeller and diffuser (Fig. 26.7, qualitative). */
export function CentrifugalPressureVelocity() {
  const p: [number, number][] = [
    [0, 1],
    [0.15, 1],
    [0.55, 1.9],
    [0.95, 2.8],
    [1.1, 2.8],
  ]
  const v: [number, number][] = [
    [0, 0.9],
    [0.15, 0.9],
    [0.55, 2.5],
    [0.95, 1.0],
    [1.1, 1.0],
  ]
  return (
    <Plot
      series={[
        { pts: [[0.15, 0.4], [0.15, 3.1]], tone: 'faint', width: 1, dashed: true },
        { pts: [[0.55, 0.4], [0.55, 3.1]], tone: 'faint', width: 1, dashed: true },
        { pts: [[0.95, 0.4], [0.95, 3.1]], tone: 'faint', width: 1, dashed: true },
        { pts: p, tone: 'heat', width: 2.2 },
        { pts: v, tone: 'cool', width: 2.2 },
      ]}
      xRange={[0, 1.15]}
      yRange={[0.4, 3.2]}
      xLabel="flow path →"
      yLabel=""
      notes={[
        { x: 0.35, y: 3.0, text: 'impeller', tone: 'muted', size: 11 },
        { x: 0.75, y: 3.0, text: 'diffuser', tone: 'muted', size: 11 },
        { x: 1.03, y: 2.55, text: 'pressure', tone: 'heat', size: 11 },
        { x: 1.03, y: 1.2, text: 'velocity', tone: 'cool', size: 11 },
      ]}
      ariaLabel="Qualitative variation of pressure and velocity through the impeller and diffuser of a centrifugal compressor"
    />
  )
}
