import { useState, type ReactNode } from 'react'
import { Plot, type Mark, type Series, type Tone } from './Plot'
import { Readout, Slider } from './controls'

/* ---------------------------------------------------------------------------
 * Plant layouts (recreated block diagrams; Rathore Figs 27.1–27.3, 27.13, 27.18, 27.22)
 * ------------------------------------------------------------------------- */

function Compressor({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <path d={`M${x},40 L${x + 46},56 L${x + 46},104 L${x},120 Z`} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.4} />
      <text x={x + 23} y={84} textAnchor="middle" className="s-title">{label}</text>
    </g>
  )
}
function Turbine({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <path d={`M${x},56 L${x + 46},40 L${x + 46},120 L${x},104 Z`} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.4} />
      <text x={x + 23} y={84} textAnchor="middle" className="s-title">{label}</text>
    </g>
  )
}
function Box({ x, label, tone = 'heat', w = 56 }: { x: number; label: string; tone?: Tone; w?: number }) {
  const lines = label.split('\n')
  return (
    <g>
      <rect x={x} y={-6} width={w} height={34} rx={5} fill={tone === 'heat' ? 'var(--heat-soft)' : tone === 'cool' ? 'var(--cool-soft)' : 'var(--sunken)'} stroke={`var(--${tone === 'faint' ? 'muted' : tone})`} />
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={8 + i * 12 - (lines.length - 1) * 5} textAnchor="middle" className="s-title">
          {l}
        </text>
      ))}
    </g>
  )
}

function Arrow({ d, tone = 'ink' }: { d: string; tone?: Tone }) {
  return <path d={d} fill="none" stroke={`var(--${tone === 'faint' ? 'muted' : tone})`} strokeWidth={1.5} markerEnd={`url(#gt-${tone})`} />
}

/** Layout content uses y ≈ −40 … 180; the frame shifts it down by 44 px. */
function Frame({ children, w = 420, h = 210, label }: { children: ReactNode; w?: number; h?: number; label: string }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="schem block h-auto w-full" role="img" aria-label={label}>
      <defs>
        {(['ink', 'heat', 'cool', 'muted'] as const).map((t) => (
          <marker key={t} id={`gt-${t}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill={`var(--${t})`} />
          </marker>
        ))}
      </defs>
      <g transform="translate(0,44)">{children}</g>
    </svg>
  )
}

/** Open-cycle simple gas turbine (Fig. 27.2). */
export function GTOpen() {
  return (
    <Frame label="Open-cycle gas turbine plant: compressor, combustion chamber, turbine on one shaft">
      <Compressor x={60} label="C" />
      <Turbine x={250} label="T" />
      <g transform="translate(150,0)">
        <Box x={0} label={'Combustion\nchamber'} w={80} />
      </g>
      <line x1={106} y1={80} x2={250} y2={80} stroke="var(--ink)" strokeWidth={3} />
      <line x1={296} y1={80} x2={350} y2={80} stroke="var(--ink)" strokeWidth={3} />
      <circle cx={368} cy={80} r={18} fill="var(--surface)" stroke="var(--ink)" />
      <text x={368} y={84} textAnchor="middle" className="s-title">G</text>
      <Arrow d="M10,80 L56,80" tone="cool" />
      <text x={10} y={72} className="s-muted">air in (1)</text>
      <Arrow d="M106,48 L106,11 L146,11" />
      <text x={110} y={34} className="s-muted">2</text>
      <Arrow d="M230,11 L273,11 L273,44" tone="heat" />
      <text x={262} y={34} className="s-muted">3</text>
      <Arrow d="M190,-30 L190,-8" tone="heat" />
      <Arrow d="M296,112 L296,150 L340,150" tone="muted" />
      <text x={300} y={140} className="s-muted">exhaust (4) to atmosphere</text>
      <text x={190} y={-34} textAnchor="middle" className="s-muted">fuel</text>
      <text x={178} y={100} className="s-muted">shaft</text>
    </Frame>
  )
}

/** Closed-cycle gas turbine (Fig. 27.3). */
export function GTClosed() {
  return (
    <Frame h={232} label="Closed-cycle gas turbine: heat added and rejected in heat exchangers, working fluid recirculated">
      <g>
        <Compressor x={60} label="C" />
        <Turbine x={250} label="T" />
        <g transform="translate(150,0)">
          <Box x={0} label={'Heater\n(q_in)'} w={80} />
        </g>
        <g transform="translate(150,150)">
          <Box x={0} label={'Cooler\n(q_out)'} tone="cool" w={80} />
        </g>
        <line x1={106} y1={80} x2={250} y2={80} stroke="var(--ink)" strokeWidth={3} />
        <line x1={296} y1={80} x2={340} y2={80} stroke="var(--ink)" strokeWidth={3} />
        <text x={344} y={84} className="s-muted">W_net</text>
        <Arrow d="M106,48 L106,11 L146,11" />
        <Arrow d="M230,11 L273,11 L273,44" tone="heat" />
        <Arrow d="M296,112 L296,161 L234,161" />
        <Arrow d="M150,161 L30,161 L30,80 L56,80" tone="cool" />
        <text x={110} y={34} className="s-muted">2</text>
        <text x={262} y={34} className="s-muted">3</text>
        <text x={300} y={140} className="s-muted">4</text>
        <text x={36} y={120} className="s-muted">1</text>
      </g>
    </Frame>
  )
}

/** Regenerative gas turbine (Fig. 27.13). */
export function GTRegen() {
  return (
    <Frame h={232} label="Gas turbine with regenerator: turbine exhaust preheats compressed air">
      <g>
        <Compressor x={40} label="C" />
        <Turbine x={290} label="T" />
        <g transform="translate(160,0)">
          <Box x={0} label={'Combustion\nchamber'} w={80} />
        </g>
        <g transform="translate(150,140)">
          <Box x={0} label={'Regenerator'} tone="faint" w={100} />
        </g>
        <line x1={86} y1={80} x2={290} y2={80} stroke="var(--ink)" strokeWidth={3} />
        <Arrow d="M4,80 L36,80" tone="cool" />
        <Arrow d="M86,112 L86,146 L146,146" />
        <text x={92} y={136} className="s-muted">2</text>
        <Arrow d="M200,140 L200,80 M200,64 L200,32" tone="heat" />
        <text x={206} y={58} className="s-muted">x (preheated)</text>
        <Arrow d="M240,11 L313,11 L313,44" tone="heat" />
        <text x={318} y={34} className="s-muted">3</text>
        <Arrow d="M336,112 L336,160 L254,160" />
        <text x={340} y={140} className="s-muted">4</text>
        <Arrow d="M150,160 L60,160 L60,150" tone="muted" />
        <text x={8} y={176} className="s-muted">y → exhaust (cooled)</text>
      </g>
    </Frame>
  )
}

/** Reheat (two turbines, second combustor between them). */
export function GTReheat() {
  return (
    <Frame w={460} label="Gas turbine with reheating between high-pressure and low-pressure turbines">
      <Compressor x={20} label="C" />
      <g transform="translate(100,0)">
        <Box x={0} label={'CC 1'} w={56} />
      </g>
      <Turbine x={190} label="HPT" />
      <g transform="translate(266,0)">
        <Box x={0} label={'CC 2\n(reheat)'} w={64} />
      </g>
      <Turbine x={350} label="LPT" />
      <line x1={66} y1={80} x2={350} y2={80} stroke="var(--ink)" strokeWidth={3} />
      <Arrow d="M66,48 L66,11 L96,11" />
      <Arrow d="M156,11 L213,11 L213,44" tone="heat" />
      <Arrow d="M236,44 L236,11 L262,11" />
      <Arrow d="M330,11 L373,11 L373,44" tone="heat" />
      <Arrow d="M396,112 L396,150 L440,150" tone="muted" />
      <text x={70} y={34} className="s-muted">2</text>
      <text x={200} y={34} className="s-muted">3</text>
      <text x={240} y={34} className="s-muted">4</text>
      <text x={362} y={34} className="s-muted">5</text>
      <text x={400} y={140} className="s-muted">6</text>
    </Frame>
  )
}

/** Intercooled compression (two compressors with an intercooler). */
export function GTIntercool() {
  return (
    <Frame w={460} label="Gas turbine with two-stage compression and intercooling">
      <Compressor x={20} label="LPC" />
      <g transform="translate(86,130)">
        <Box x={0} label={'Intercooler'} tone="cool" w={80} />
      </g>
      <Compressor x={190} label="HPC" />
      <g transform="translate(262,0)">
        <Box x={0} label={'CC'} w={56} />
      </g>
      <Turbine x={360} label="T" />
      <line x1={66} y1={80} x2={360} y2={80} stroke="var(--ink)" strokeWidth={3} />
      <Arrow d="M66,112 L66,141 L82,141" />
      <Arrow d="M166,141 L180,141 L180,100 L188,100" tone="cool" />
      <Arrow d="M236,48 L236,11 L258,11" />
      <Arrow d="M318,11 L383,11 L383,44" tone="heat" />
      <Arrow d="M406,112 L406,150 L450,150" tone="muted" />
      <text x={70} y={128} className="s-muted">2</text>
      <text x={170} y={128} className="s-muted">3</text>
      <text x={240} y={34} className="s-muted">4</text>
      <text x={372} y={34} className="s-muted">5</text>
      <text x={410} y={140} className="s-muted">6</text>
    </Frame>
  )
}

/* ---------------------------------------------------------------------------
 * Computed T–s diagrams for modified gas-turbine cycles
 * ------------------------------------------------------------------------- */

type Step =
  | { k: 'comp'; ratio: number; eta?: number; label: string }
  | { k: 'turb'; ratio: number; eta?: number; label: string }
  | { k: 'heat'; to: number; label: string }
  | { k: 'cool'; to: number; label: string }

const CP = 1.005
const RG = 0.287
const KAPPA = 0.4 / 1.4
const sOf = (T: number, p: number) => CP * Math.log(T / 300) - RG * Math.log(p / 100)

/** Walks a sequence of compressions, expansions and isobaric heat transfers and returns T–s series. */
export function gtWalk(steps: Step[], T1 = 300, p1 = 100) {
  let T = T1
  let p = p1
  const series: Series[] = []
  const marks: Mark[] = [{ x: sOf(T, p), y: T, label: '1', dx: -12, dy: 14 }]
  const states: { T: number; p: number }[] = [{ T, p }]
  for (const st of steps) {
    const a: [number, number] = [sOf(T, p), T]
    if (st.k === 'comp' || st.k === 'turb') {
      const p2 = st.k === 'comp' ? p * st.ratio : p / st.ratio
      const Ts = T * Math.pow(p2 / p, KAPPA)
      const eta = st.eta ?? 1
      const T2 = st.k === 'comp' ? T + (Ts - T) / eta : T - eta * (T - Ts)
      if (eta < 1) series.push({ pts: [a, [sOf(Ts, p2), Ts]], tone: 'muted', dashed: true, width: 1.2 })
      series.push({ pts: [a, [sOf(T2, p2), T2]], tone: 'ink', arrow: true, width: 2 })
      T = T2
      p = p2
    } else {
      const T2 = st.to
      const pts: [number, number][] = Array.from({ length: 30 }, (_, i) => {
        const t = T + ((T2 - T) * i) / 29
        return [sOf(t, p), t]
      })
      series.push({ pts, tone: st.k === 'heat' ? 'heat' : 'cool', arrow: true, width: 2 })
      T = T2
    }
    states.push({ T, p })
    marks.push({ x: sOf(T, p), y: T, label: st.label, dx: 6, dy: -5 })
  }
  return { series, marks, states }
}

export function GTRegenTs() {
  const { series, marks, states } = gtWalk([
    { k: 'comp', ratio: 4, eta: 0.85, label: '2' },
    { k: 'heat', to: 1000, label: '3' },
    { k: 'turb', ratio: 4, eta: 0.85, label: '4' },
    { k: 'cool', to: 300, label: '' },
  ])
  const T2 = states[1].T
  const T4 = states[3].T
  const eps = 0.8
  const Tx = T2 + eps * (T4 - T2)
  const Ty = T4 - (Tx - T2)
  return (
    <Plot
      series={[
        ...series,
        { pts: [[sOf(T2, 400), T2], [sOf(Tx, 400), Tx]], tone: 'muted', width: 5 },
        { pts: [[sOf(T4, 100), T4], [sOf(Ty, 100), Ty]], tone: 'muted', width: 5 },
      ]}
      marks={[
        ...marks.filter((m) => m.label !== ''),
        { x: sOf(Tx, 400), y: Tx, label: 'x', dx: -14, dy: -4 },
        { x: sOf(Ty, 100), y: Ty, label: 'y', dx: 6, dy: 12 },
      ]}
      notes={[]}
      xLabel="s"
      yLabel="T"
      ariaLabel="T–s diagram of a regenerative gas turbine cycle (computed, rp = 4, regenerator effectiveness 0.8)"
    />
  )
}

export function GTReheatTs() {
  const { series, marks } = gtWalk([
    { k: 'comp', ratio: 9, eta: 0.85, label: '2' },
    { k: 'heat', to: 1300, label: '3' },
    { k: 'turb', ratio: 3, eta: 0.87, label: '4' },
    { k: 'heat', to: 1300, label: '5' },
    { k: 'turb', ratio: 3, eta: 0.87, label: '6' },
    { k: 'cool', to: 300, label: '' },
  ])
  return <Plot series={series} marks={marks.filter((m) => m.label !== '')} xLabel="s" yLabel="T" ariaLabel="T–s diagram of a gas turbine cycle with reheat (computed)" />
}

export function GTIntercoolTs() {
  const { series, marks } = gtWalk([
    { k: 'comp', ratio: 3, eta: 0.85, label: '2' },
    { k: 'cool', to: 300, label: '3' },
    { k: 'comp', ratio: 3, eta: 0.85, label: '4' },
    { k: 'heat', to: 1300, label: '5' },
    { k: 'turb', ratio: 9, eta: 0.87, label: '6' },
    { k: 'cool', to: 300, label: '' },
  ])
  return <Plot series={series} marks={marks.filter((m) => m.label !== '')} xLabel="s" yLabel="T" ariaLabel="T–s diagram of a gas turbine cycle with intercooling (computed)" />
}

export function GTAllTs() {
  const { series, marks } = gtWalk([
    { k: 'comp', ratio: 3, label: '2' },
    { k: 'cool', to: 300, label: '3' },
    { k: 'comp', ratio: 3, label: '4' },
    { k: 'heat', to: 1300, label: '5' },
    { k: 'turb', ratio: 3, label: '6' },
    { k: 'heat', to: 1300, label: '7' },
    { k: 'turb', ratio: 3, label: '8' },
    { k: 'cool', to: 300, label: '' },
  ])
  return (
    <Plot
      series={series}
      marks={marks.filter((m) => m.label !== '')}
      notes={[]}
      xLabel="s"
      yLabel="T"
      ariaLabel="Ideal gas turbine cycle with intercooling and reheat; with many stages it approaches the Ericsson cycle"
    />
  )
}

/* ---------------------------------------------------------------------------
 * Effect of operating variables (interactive): η, specific work, work ratio, air rate vs rp
 * ------------------------------------------------------------------------- */

function actualCycle(rp: number, T1: number, T3: number, etaC: number, etaT: number) {
  const x = Math.pow(rp, KAPPA)
  const wc = (CP * T1 * (x - 1)) / etaC
  const wt = CP * T3 * etaT * (1 - 1 / x)
  const T2 = T1 + wc / CP
  const qin = CP * (T3 - T2)
  const wnet = wt - wc
  return { wnet, eta: qin > 0 ? wnet / qin : 0, workRatio: wnet / wt, airRate: wnet > 0 ? 3600 / wnet : Infinity }
}

export function GTOperatingVariables() {
  const [T3, setT3] = useState(1200)
  const [etaC, setEtaC] = useState(0.85)
  const [etaT, setEtaT] = useState(0.88)
  const [rp, setRp] = useState(8)
  const T1 = 300
  const rps = Array.from({ length: 120 }, (_, i) => 1.05 + (i * 39) / 119)
  const effPts = rps.map((r) => [r, Math.max(0, actualCycle(r, T1, T3, etaC, etaT).eta * 100)] as [number, number])
  const idealPts = rps.map((r) => [r, (1 - 1 / Math.pow(r, KAPPA)) * 100] as [number, number])
  const workPts = rps.map((r) => [r, Math.max(0, actualCycle(r, T1, T3, etaC, etaT).wnet) / 5] as [number, number])
  const cur = actualCycle(rp, T1, T3, etaC, etaT)
  // optimum rp for maximum work (actual): search numerically
  let best = 1
  let bestW = -Infinity
  let bestEta = 1
  let bestE = -Infinity
  for (let r = 1.05; r <= 60; r += 0.05) {
    const c = actualCycle(r, T1, T3, etaC, etaT)
    if (c.wnet > bestW) {
      bestW = c.wnet
      best = r
    }
    if (c.eta > bestE) {
      bestE = c.eta
      bestEta = r
    }
  }
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
      <Plot
        series={[
          { pts: idealPts, tone: 'muted', dashed: true, width: 1.3 },
          { pts: effPts, tone: 'heat', width: 2.2 },
          { pts: workPts, tone: 'cool', width: 2.2 },
          { pts: [[rp, 0], [rp, 80]], tone: 'faint', width: 1 },
        ]}
        xRange={[1, 40]}
        yRange={[0, 80]}
        ticks={{ x: [5, 10, 20, 30, 40], y: [0, 20, 40, 60, 80] }}
        xLabel="pressure ratio rₚ"
        yLabel=""
        notes={[
          { x: 39, y: 72, text: 'ideal η (%)', tone: 'muted', anchor: 'end', size: 11 },
          { x: 39, y: 6, text: 'actual η (%) — red · w_net/5 (kJ/kg) — blue', tone: 'ink', anchor: 'end', size: 11 },
        ]}
        ariaLabel="Interactive chart of gas turbine efficiency and specific work against pressure ratio"
      />
      <div className="flex flex-col gap-3">
        <Slider label="Turbine inlet temperature T₃" value={T3} min={900} max={1700} step={20} onChange={setT3} fmt={(v) => `${v} K`} />
        <Slider label="Compressor efficiency η_c" value={etaC} min={0.7} max={1} step={0.01} onChange={setEtaC} fmt={(v) => v.toFixed(2)} />
        <Slider label="Turbine efficiency η_t" value={etaT} min={0.7} max={1} step={0.01} onChange={setEtaT} fmt={(v) => v.toFixed(2)} />
        <Slider label="Pressure ratio rₚ" value={rp} min={2} max={40} step={0.5} onChange={setRp} fmt={(v) => v.toFixed(1)} />
        <Readout label="Thermal efficiency" value={`${(cur.eta * 100).toFixed(1)} %`} tone="heat" />
        <Readout label="Specific work w_net" value={`${cur.wnet.toFixed(0)} kJ/kg`} tone="cool" />
        <Readout label="Work ratio" value={cur.workRatio > 0 ? cur.workRatio.toFixed(3) : '≤ 0'} />
        <Readout label="Air rate" value={Number.isFinite(cur.airRate) ? `${cur.airRate.toFixed(1)} kg/kWh` : 'no net work'} />
        <Readout label="rₚ for max work / max η" value={`${best.toFixed(1)} / ${bestEta.toFixed(1)}`} />
        <p className="text-xs text-muted">T₁ = 300 K, cp = 1.005 kJ/kg·K, γ = 1.4, mass of fuel neglected.</p>
      </div>
    </div>
  )
}
