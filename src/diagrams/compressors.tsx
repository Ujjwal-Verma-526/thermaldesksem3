import { useState } from 'react'
import { Plot, type Series } from './Plot'
import { etaVolumetric, multistageWork } from './thermo'
import { Slider, Readout } from './controls'

/* ---------------------------------------------------------------------------
 * Reciprocating compressor indicator diagrams (p–V, total cylinder volume).
 * Curves are p V^n = C evaluated numerically.
 * ------------------------------------------------------------------------- */

function polyV(p1: number, V1: number, p2: number, n: number, steps = 50): [number, number][] {
  // from (V1, p1) to pressure p2 along pV^n = C
  const V2 = V1 * Math.pow(p1 / p2, 1 / n)
  return Array.from({ length: steps + 1 }, (_, i) => {
    const V = V1 + ((V2 - V1) * i) / steps
    return [V, p1 * Math.pow(V1 / V, n)]
  })
}

/** Book Fig. 25.4 — no clearance: c→1 suction, 1→2 compression, 2→d delivery, d→c */
export function CompressorNoClearance() {
  const p1 = 1
  const p2 = 6
  const V1 = 1
  const comp = polyV(p1, V1, p2, 1.3)
  const V2 = comp[comp.length - 1][0]
  const series: Series[] = [
    { pts: [[0, p1], [V1, p1], ...comp, [0, p2], [0, p1]], fill: true, width: 0 },
    { pts: [[0, p1], [V1, p1]], tone: 'cool', arrow: true },
    { pts: comp, tone: 'ink', arrow: true },
    { pts: [[V2, p2], [0, p2]], tone: 'heat', arrow: true },
    { pts: [[0, p2], [0, p1]], tone: 'muted', dashed: true },
  ]
  return (
    <Plot
      series={series}
      xRange={[-0.08, 1.2]}
      yRange={[0, 7]}
      xLabel="V"
      yLabel="p"
      marks={[
        { x: 0, y: p1, label: 'c', dx: -14, dy: 4 },
        { x: V1, y: p1, label: '1', dx: 6, dy: 4 },
        { x: V2, y: p2, label: '2', dx: 6, dy: -6 },
        { x: 0, y: p2, label: 'd', dx: -14, dy: 4 },
      ]}
      notes={[
        { x: 0.5, y: 0.55, text: 'suction at p₁', tone: 'cool' },
        { x: 0.2, y: 6.35, text: 'delivery at p₂', tone: 'heat' },
        { x: 0.62, y: 3.1, text: 'pVⁿ = C', tone: 'ink', italic: true },
      ]}
      ariaLabel="Indicator diagram of a reciprocating compressor without clearance"
    />
  )
}

/** Book Fig. 25.6 — isothermal vs polytropic vs isentropic between the same pressures */
export function CompressionComparison() {
  const p1 = 1
  const p2 = 6
  const iso = polyV(p1, 1, p2, 1.0)
  const pol = polyV(p1, 1, p2, 1.25)
  const isn = polyV(p1, 1, p2, 1.4)
  const end = (c: [number, number][]) => c[c.length - 1]
  return (
    <Plot
      series={[
        { pts: [[0, p1], [1, p1]], tone: 'muted' },
        { pts: [[0, p2], end(isn)], tone: 'muted' },
        { pts: iso, tone: 'cool', width: 2 },
        { pts: pol, tone: 'ink', width: 2 },
        { pts: isn, tone: 'heat', width: 2 },
      ]}
      xRange={[-0.08, 1.2]}
      yRange={[0, 7]}
      xLabel="V"
      yLabel="p"
      marks={[
        { x: 1, y: p1, label: '1', dx: 6, dy: 4 },
        { x: end(iso)[0], y: p2, label: "2'", dx: -16, dy: -6, tone: 'cool' },
        { x: end(pol)[0], y: p2, label: '2', dx: -4, dy: -8 },
        { x: end(isn)[0], y: p2, label: '2″', dx: 6, dy: -6, tone: 'heat' },
      ]}
      notes={[
        { x: 0.68, y: 4.6, text: 'isentropic (n = γ): most work', tone: 'heat', anchor: 'start' },
        { x: 0.6, y: 3.7, text: 'polytropic (1 < n < γ)', tone: 'ink', anchor: 'start' },
        { x: 0.28, y: 2.2, text: 'isothermal (n = 1): least work', tone: 'cool', anchor: 'start' },
      ]}
      ariaLabel="Isothermal, polytropic and isentropic compression on a p–V diagram"
    />
  )
}

/** Book Figs 25.8/25.12 — with clearance; interactive clearance ratio and pressure ratio */
export function ClearanceExplorer() {
  const [c, setC] = useState(0.06)
  const [pr, setPr] = useState(7)
  const n = 1.3
  const Vs = 1
  const Vc = c * Vs
  const V1 = Vs + Vc
  const comp = polyV(1, V1, pr, n)
  const V2 = comp[comp.length - 1][0]
  const reexp = polyV(pr, Vc, 1, n)
  const V4 = reexp[reexp.length - 1][0]
  const eta = etaVolumetric(c, pr, n)
  const series: Series[] = [
    { pts: [[V4, 1], [V1, 1], ...comp, [Vc, pr], ...reexp], fill: true, width: 0 },
    { pts: [[V4, 1], [V1, 1]], tone: 'cool', arrow: true },
    { pts: comp, tone: 'ink', arrow: true },
    { pts: [[V2, pr], [Vc, pr]], tone: 'heat', arrow: true },
    { pts: reexp, tone: 'ink', arrow: true, dashed: true },
    { pts: [[0, 0.35], [0, Math.max(pr, 4) + 0.6]], tone: 'faint', width: 1 },
    { pts: [[Vc, 0.35], [Vc, pr]], tone: 'faint', width: 1, dashed: true },
  ]
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
      <Plot
        series={series}
        xRange={[-0.05, 1.3]}
        yRange={[0, Math.max(pr, 4) + 1]}
        xLabel="V"
        yLabel="p"
        marks={[
          { x: V1, y: 1, label: '1', dx: 6, dy: 4 },
          { x: V2, y: pr, label: '2', dx: 6, dy: -6 },
          { x: Vc, y: pr, label: '3', dx: -14, dy: -6 },
          { x: V4, y: 1, label: '4', dx: -6, dy: 16 },
        ]}
        notes={[
          { x: Vc / 2, y: 0.55, text: 'V_c', tone: 'muted', size: 11 },
          { x: (V4 + V1) / 2, y: 0.55, text: 'V₁ − V₄ (effective suction)', tone: 'cool', size: 11 },
        ]}
        ariaLabel="Interactive compressor indicator diagram with clearance"
      />
      <div className="flex flex-col gap-4">
        <Slider label="Clearance ratio c" value={c} min={0} max={0.15} step={0.01} onChange={setC} fmt={(v) => `${(v * 100).toFixed(0)} %`} />
        <Slider label="Pressure ratio p₂/p₁" value={pr} min={2} max={14} step={0.5} onChange={setPr} fmt={(v) => v.toFixed(1)} />
        <Readout label="Volumetric efficiency" value={eta > 0 ? `${(eta * 100).toFixed(1)} %` : '0 % (no delivery)'} tone="heat" />
        <Readout label="Re-expansion volume V₄ − V_c" value={`${((V4 - Vc) * 100).toFixed(1)} % of V_s`} />
        <p className="text-xs text-muted">
          η<sub>vol</sub> = 1 + c − c (p₂/p₁)<sup>1/n</sup>, n = 1.3. Raise either slider: the trapped clearance air re-expands
          further and eats into the suction stroke. When η<sub>vol</sub> reaches zero the compressor delivers nothing — the
          “maximum pressure ratio” set by clearance.
        </p>
      </div>
    </div>
  )
}

/** Book Fig. 25.11 — actual indicator diagram (qualitative valve effects) */
export function CompressorActual() {
  const n = 1.3
  const Vc = 0.06
  const V1 = 1.06
  const pr = 6
  const comp = polyV(1, V1, pr * 1.06, n)
  const reexp = polyV(pr * 0.97, Vc, 0.9, n)
  const V2 = comp[comp.length - 1][0]
  const wavy = (a: number, b: number, p: number, amp: number, k: number): [number, number][] =>
    Array.from({ length: 60 }, (_, i) => {
      const V = a + ((b - a) * i) / 59
      const decay = Math.exp((-3 * i) / 59)
      return [V, p + amp * decay * Math.sin((k * Math.PI * i) / 59)]
    })
  const suction = wavy(reexp[reexp.length - 1][0], V1, 0.9, 0.08, 7)
  const delivery = wavy(V2, Vc, pr * 1.03, 0.25, 7)
  return (
    <Plot
      series={[
        { pts: [[0, 1], [1.2, 1]], tone: 'faint', width: 1, dashed: true },
        { pts: [[0, pr], [1.2, pr]], tone: 'faint', width: 1, dashed: true },
        { pts: suction, tone: 'cool' },
        { pts: comp, tone: 'ink' },
        { pts: delivery, tone: 'heat' },
        { pts: reexp, tone: 'ink' },
      ]}
      xRange={[-0.05, 1.25]}
      yRange={[0, 7.4]}
      xLabel="V"
      yLabel="p"
      notes={[
        { x: 1.18, y: 1.25, text: 'atmospheric', tone: 'muted', anchor: 'end', size: 11 },
        { x: 1.18, y: pr + 0.25, text: 'receiver pressure', tone: 'muted', anchor: 'end', size: 11 },
        { x: 0.55, y: 0.45, text: 'suction below p_atm (inlet valve resistance)', tone: 'cool', size: 11 },
        { x: 0.3, y: 7.05, text: 'delivery above receiver p, valve bounce', tone: 'heat', size: 11 },
      ]}
      ariaLabel="Qualitative actual indicator diagram of a reciprocating compressor"
    />
  )
}

/** Book Figs 25.18–25.22 — multistage with perfect intercooling; interactive number of stages */
export function MultistageExplorer() {
  const [stages, setStages] = useState(2)
  const pr = 16
  const n = 1.3
  const V1 = 1
  const single = polyV(1, V1, pr, n)
  const iso = polyV(1, V1, pr, 1)
  // staged path: compress along n, cool at constant p back onto the isotherm
  const rs = Math.pow(pr, 1 / stages)
  const staged: [number, number][] = []
  let p = 1
  let V = V1
  for (let k = 0; k < stages; k++) {
    const seg = polyV(p, V, p * rs, n)
    staged.push(...seg)
    p = p * rs
    const Viso = V1 / p // perfect intercooling: back to T1, i.e. onto pV = p1V1
    if (k < stages - 1) staged.push([Viso, p])
    V = Viso
  }
  const wSingle = multistageWork(pr, n, 1)
  const wStaged = multistageWork(pr, n, stages)
  const wIso = Math.log(pr)
  const end = staged[staged.length - 1]
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
      <Plot
        series={[
          { pts: [[0, 1], [V1, 1], ...single, [0, pr]], fill: true, width: 0 },
          { pts: [[0, 1], [V1, 1]], tone: 'muted' },
          { pts: [[0, pr], [single[single.length - 1][0], pr]], tone: 'muted' },
          { pts: single, tone: 'heat', dashed: true, width: 1.5 },
          { pts: iso, tone: 'cool', dashed: true, width: 1.5 },
          { pts: staged, tone: 'ink', width: 2.2 },
        ]}
        xRange={[-0.03, 1.15]}
        yRange={[0, pr + 1.5]}
        xLabel="V"
        yLabel="p"
        marks={[
          { x: V1, y: 1, label: '1', dx: 6, dy: 4 },
          { x: end[0], y: end[1], label: 'delivery', dx: 6, dy: -6, dot: true },
        ]}
        notes={[
          { x: 0.62, y: 9.5, text: 'single stage (n = 1.3)', tone: 'heat', anchor: 'start', size: 11 },
          { x: 0.3, y: 2.6, text: 'isothermal limit', tone: 'cool', anchor: 'start', size: 11 },
        ]}
        ariaLabel="Interactive multistage compression with perfect intercooling on a p–V diagram"
      />
      <div className="flex flex-col gap-4">
        <Slider label="Number of stages" value={stages} min={1} max={5} step={1} onChange={setStages} fmt={(v) => `${v}`} />
        <Readout label="Ideal stage pressure ratio" value={`${rs.toFixed(3)}  ( = 16^(1/${stages}) )`} />
        <Readout label="Work, relative to single stage" value={`${((wStaged / wSingle) * 100).toFixed(1)} %`} tone="heat" />
        <Readout label="Isothermal efficiency" value={`${((wIso / wStaged) * 100).toFixed(1)} %`} />
        <p className="text-xs text-muted">
          Overall p₂/p₁ = 16, n = 1.3, perfect intercooling (each stage starts at T₁, so it lies on the isotherm pV = p₁V₁). The
          saw-tooth hugs the isotherm more closely as stages are added; the area saved is the work saved.
        </p>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Centrifugal compressor
 * ------------------------------------------------------------------------- */

/** Interactive outlet velocity triangle with slip (book Figs 26.8, 26.10, 26.11). */
export function VelocityTriangles() {
  const [beta2, setBeta2] = useState(90) // outlet blade angle from tangent; 90 = radial
  const [slip, setSlip] = useState(0.9)
  const u2 = 400
  const Vf = 110
  // ideal whirl for blade angle beta2 (measured from the tangential direction)
  const Vw2ideal = u2 - Vf / Math.tan((beta2 * Math.PI) / 180)
  const Vw2 = slip * Vw2ideal
  const work = (u2 * Vw2) / 1000
  const scale = 0.6
  const ox = 30
  const oy = 30
  const X = (v: number) => ox + v * scale
  const Y = (v: number) => oy + v * scale
  // geometry: blade velocity along +x, flow velocity along +y (down on screen)
  const B = { x: X(Vw2), y: Y(Vf) } // tip of absolute velocity V2 starting at origin
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
      <svg viewBox="0 0 345 140" className="schem block h-auto w-full" role="img" aria-label="Outlet velocity triangle of a centrifugal compressor impeller">
        <defs>
          <marker id="vt-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill="var(--ink)" />
          </marker>
          <marker id="vt-heat" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill="var(--heat)" />
          </marker>
          <marker id="vt-cool" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill="var(--cool)" />
          </marker>
        </defs>
        {/* u2 along the top */}
        <line x1={X(0)} y1={Y(0)} x2={X(u2)} y2={Y(0)} stroke="var(--ink)" strokeWidth={1.8} markerEnd="url(#vt-ink)" />
        <text x={X(u2) - 4} y={Y(0) - 7} textAnchor="end">u₂ (blade tip speed)</text>
        {/* absolute velocity V2 from origin */}
        <line x1={X(0)} y1={Y(0)} x2={B.x} y2={B.y} stroke="var(--heat)" strokeWidth={2} markerEnd="url(#vt-heat)" />
        <text x={(X(0) + B.x) / 2 - 8} y={(Y(0) + B.y) / 2 + 16} fill="var(--heat)">V₂</text>
        {/* relative velocity from blade tip end to B */}
        <line x1={X(u2)} y1={Y(0)} x2={B.x} y2={B.y} stroke="var(--cool)" strokeWidth={2} markerEnd="url(#vt-cool)" />
        <text x={(X(u2) + B.x) / 2 + 6} y={(Y(0) + B.y) / 2 + 4} fill="var(--cool)">V_r2</text>
        {/* whirl and flow components */}
        <line x1={X(0)} y1={B.y} x2={B.x} y2={B.y} stroke="var(--muted)" strokeDasharray="4 3" />
        <text x={(X(0) + B.x) / 2} y={B.y + 14} textAnchor="middle" className="s-muted">V_w2 = σ·V_w2,ideal</text>
        <line x1={B.x} y1={Y(0)} x2={B.x} y2={B.y} stroke="var(--muted)" strokeDasharray="4 3" />
        <text x={B.x + 4} y={(Y(0) + B.y) / 2} className="s-muted">V_f2</text>
        {slip < 1 && (
          <>
            <line x1={B.x} y1={Y(0) - 12} x2={X(Vw2ideal)} y2={Y(0) - 12} stroke="var(--warn)" strokeWidth={2} />
            <text x={(B.x + X(Vw2ideal)) / 2} y={Y(0) - 16} textAnchor="middle" fill="var(--warn)" className="s-muted">
              slip
            </text>
          </>
        )}
      </svg>
      <div className="flex flex-col gap-4">
        <Slider label="Outlet blade angle β₂ (from tangent)" value={beta2} min={50} max={130} step={1} onChange={setBeta2} fmt={(v) => `${v}° ${v === 90 ? '(radial)' : v < 90 ? '(backward)' : '(forward)'}`} />
        <Slider label="Slip factor σ" value={slip} min={0.75} max={1} step={0.01} onChange={setSlip} fmt={(v) => v.toFixed(2)} />
        <Readout label="Whirl velocity V_w2" value={`${Vw2.toFixed(1)} m/s`} />
        <Readout label="Euler work w = u₂·V_w2 (radial entry)" value={`${work.toFixed(1)} kJ/kg`} tone="heat" />
        <p className="text-xs text-muted">
          u₂ = 400 m/s, V<sub>f2</sub> = 110 m/s. With radial entry V<sub>w1</sub> = 0, so all the work comes from the outlet whirl.
          Backward-curved blades (β₂ &lt; 90°) give less whirl but a stable, falling characteristic.
        </p>
      </div>
    </div>
  )
}

/** Book Fig. 26.15 — constant-speed characteristic, surge and choke (qualitative). */
export function CompressorCharacteristic() {
  const curve: [number, number][] = Array.from({ length: 80 }, (_, i) => {
    const m = 0.15 + (0.83 * i) / 79
    // rising to a peak at m≈0.45, then falling steeply towards choke at m≈0.98
    const pr = 1 + 1.6 * Math.exp(-Math.pow((m - 0.45) / 0.34, 2)) - 0.9 * Math.pow(Math.max(0, m - 0.8) / 0.18, 3)
    return [m, pr]
  })
  return (
    <Plot
      series={[
        { pts: curve.filter((p) => p[0] <= 0.45), tone: 'muted', dashed: true },
        { pts: curve.filter((p) => p[0] >= 0.45), tone: 'ink', width: 2.2 },
        { pts: [[0.45, 0.6], [0.45, 2.75]], tone: 'heat', dashed: true, width: 1.2 },
        { pts: [[0.98, 0.6], [0.98, 2.75]], tone: 'cool', dashed: true, width: 1.2 },
      ]}
      xRange={[0.1, 1.08]}
      yRange={[0.6, 2.9]}
      xLabel="ṁ"
      yLabel="p₀₂/p₀₁"
      marks={[
        { x: 0.45, y: 2.6, label: 'D', dx: 4, dy: -8 },
        { x: 0.66, y: 2.33, label: 'C', dx: 6, dy: -4 },
        { x: 0.85, y: 1.83, label: 'B', dx: 6, dy: -2 },
        { x: 0.98, y: 1.08, label: 'A', dx: -16, dy: -4 },
        { x: 0.2, y: 1.58, label: 'E', dx: -4, dy: -8 },
      ]}
      notes={[
        { x: 0.4, y: 2.8, text: 'surge line', tone: 'heat', anchor: 'end', size: 11 },
        { x: 0.96, y: 2.8, text: 'choke', tone: 'cool', anchor: 'end', size: 11 },
        { x: 0.27, y: 1.15, text: 'unstable (D→E)', tone: 'muted', size: 11 },
        { x: 0.72, y: 1.45, text: 'stable operation', tone: 'muted', size: 11 },
      ]}
      ariaLabel="Qualitative constant-speed characteristic of a centrifugal compressor showing surge and choke"
    />
  )
}

/** Book Fig. 26.13 — head vs flow for backward, radial and forward vanes (qualitative). */
export function BladeShapes() {
  const line = (slope: number): [number, number][] => [
    [0.1, 1 - slope * 0.1],
    [1, 1 - slope],
  ]
  return (
    <Plot
      series={[
        { pts: line(0.45), tone: 'cool', width: 2 },
        { pts: line(0), tone: 'ink', width: 2 },
        { pts: line(-0.45), tone: 'heat', width: 2 },
      ]}
      xRange={[0, 1.15]}
      yRange={[0.3, 1.6]}
      xLabel="ṁ"
      yLabel="head"
      notes={[
        { x: 1.02, y: 0.55, text: 'backward', tone: 'cool', anchor: 'start', size: 11 },
        { x: 1.02, y: 1.0, text: 'radial', tone: 'ink', anchor: 'start', size: 11 },
        { x: 1.02, y: 1.45, text: 'forward', tone: 'heat', anchor: 'start', size: 11 },
      ]}
      ariaLabel="Qualitative pressure head versus mass flow for backward, radial and forward curved impeller vanes"
    />
  )
}

/** Book Fig. 26.12 — actual vs isentropic compression with stagnation states on T–s (computed). */
export function CentrifugalTs() {
  const cp = 1.005
  const R = 0.287
  const T01 = 300
  const pr = 4
  const eta = 0.8
  const T02s = T01 * Math.pow(pr, 0.4 / 1.4)
  const T02 = T01 + (T02s - T01) / eta
  const s = (T: number, p: number) => cp * Math.log(T / 300) - R * Math.log(p)
  const isobar = (p: number, a: number, b: number): [number, number][] =>
    Array.from({ length: 30 }, (_, i) => {
      const t = a + ((b - a) * i) / 29
      return [s(t, p), t]
    })
  return (
    <Plot
      series={[
        { pts: isobar(1, 270, 330), tone: 'faint', width: 1 },
        { pts: isobar(pr, 420, 520), tone: 'faint', width: 1 },
        { pts: [[s(T01, 1), T01], [s(T02s, pr), T02s]], tone: 'muted', dashed: true },
        { pts: [[s(T01, 1), T01], [s(T02, pr), T02]], tone: 'heat', arrow: true, width: 2 },
      ]}
      xLabel="s"
      yLabel="T"
      marks={[
        { x: s(T01, 1), y: T01, label: '01', dx: -18, dy: 14 },
        { x: s(T02s, pr), y: T02s, label: '02s', dx: -30, dy: -4 },
        { x: s(T02, pr), y: T02, label: '02', dx: 6, dy: -4 },
      ]}
      notes={[
        { x: s(330, 1), y: 322, text: 'p₀₁', tone: 'muted', anchor: 'start', size: 11 },
        { x: s(520, pr) + 0.004, y: 512, text: 'p₀₂', tone: 'muted', anchor: 'start', size: 11 },
      ]}
      ariaLabel="Actual and isentropic compression between stagnation states on a T–s diagram"
    />
  )
}
