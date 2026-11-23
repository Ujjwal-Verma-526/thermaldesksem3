import { CyclePlot } from './CyclePlot'
import { Plot, type Series } from './Plot'
import { cycleSeries } from './CyclePlot'
import {
  AIR,
  atkinsonCycle,
  braytonCycle,
  carnotCycle,
  dieselCycle,
  dualCycle,
  ericssonCycle,
  ottoCycle,
  stirlingCycle,
  type Cycle,
} from './thermo'

function Pair({ cycle, name }: { cycle: Cycle; name: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CyclePlot cycle={cycle} axes="pv" ariaLabel={`${name} cycle on p–v axes`} />
      <CyclePlot cycle={cycle} axes="Ts" ariaLabel={`${name} cycle on T–s axes`} />
    </div>
  )
}

export const OttoPair = () => <Pair cycle={ottoCycle(6, 1300)} name="Otto" />
export const DieselPair = () => <Pair cycle={dieselCycle(14, 2.2)} name="Diesel" />
export const DualPair = () => <Pair cycle={dualCycle(12, 1.6, 1.6)} name="Dual" />
export const CarnotPair = () => <Pair cycle={carnotCycle(900, 300, 2.4)} name="Carnot" />
export const StirlingPair = () => <Pair cycle={stirlingCycle(900, 300, 3)} name="Stirling" />
export const EricssonPair = () => <Pair cycle={ericssonCycle(900, 300, 3)} name="Ericsson" />
export const AtkinsonPair = () => <Pair cycle={atkinsonCycle(5, 1100)} name="Atkinson" />
export const BraytonPair = () => <Pair cycle={braytonCycle(8, 1300)} name="Brayton" />

/**
 * Otto vs Diesel vs Dual on T–s for the SAME compression ratio and SAME heat input.
 * Heat inputs are matched numerically, so the comparison is exact, not sketched.
 */
export function CompareSameR() {
  const r = 8
  const qin = 1400
  const otto = ottoCycle(r, qin)
  // Diesel with the same heat input: cp (T3 - T2) = qin
  const T2 = 300 * Math.pow(r, AIR.g - 1)
  const rhoD = (T2 + qin / AIR.cp) / T2
  const diesel = dieselCycle(r, rhoD)
  // Dual: half the heat at v = c, half at p = c
  const alpha = (T2 + qin / 2 / AIR.cv) / T2
  const T3 = alpha * T2
  const rhoDual = (T3 + qin / 2 / AIR.cp) / T3
  const dual = dualCycle(r, alpha, rhoDual)
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CyclePlot
        cycle={otto}
        axes="Ts"
        overlays={[
          { cycle: diesel, tone: 'cool' },
          { cycle: dual, tone: 'muted' },
        ]}
        bare
        ariaLabel="Otto, Diesel and Dual cycles on T–s axes for the same compression ratio and heat input"
      />
      <Legend
        items={[
          ['ink', 'Otto (solid) — rejects the least heat → highest η'],
          ['muted', 'Dual (dashed grey)'],
          ['cool', 'Diesel (dashed blue) — rejects the most heat → lowest η'],
        ]}
        footnote={`Computed with r = ${r}, q_in = ${qin} kJ/kg, T₁ = 300 K, γ = 1.4. All three share state 1, state 2 and the heat input; heat rejection (area under 4→1) decides efficiency.`}
      />
    </div>
  )
}

/** Same maximum pressure and maximum temperature: Diesel needs a higher r, ends up most efficient. */
export function CompareSamePmax() {
  const T1 = 300
  const p1 = 100
  const Tmax = 2200
  const pmax = 6500
  // Otto: compression to r_o, then v=c heating to (pmax, Tmax)
  // at state 3: p3 v3 = R Tmax with v3 = v1 / r_o, p3 = pmax => r_o = pmax v1 / (R Tmax)
  const v1 = (AIR.R * T1) / p1
  const rO = (pmax * v1) / (AIR.R * Tmax)
  const otto = ottoCycle(rO, AIR.cv * (Tmax - T1 * Math.pow(rO, AIR.g - 1)))
  // Diesel: compression straight to pmax, then p=c heating to Tmax
  const rD = Math.pow(pmax / p1, 1 / AIR.g)
  const T2d = T1 * Math.pow(rD, AIR.g - 1)
  const diesel = dieselCycle(rD, Tmax / T2d)
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CyclePlot
        cycle={diesel}
        axes="Ts"
        overlays={[{ cycle: otto, tone: 'heat' }]}
        bare
        ariaLabel="Otto and Diesel cycles with the same maximum pressure and temperature on T–s axes"
      />
      <Legend
        items={[
          ['ink', `Diesel (solid), r = ${rD.toFixed(1)}`],
          ['heat', `Otto (dashed), r = ${rO.toFixed(1)}`],
        ]}
        footnote={`Computed with p_max = ${pmax / 1000} MPa, T_max = ${Tmax} K, T₁ = 300 K. Both reject heat along the same v = c line from state 4, but Diesel receives more heat for the same rejection, so η_Diesel > η_Dual > η_Otto here.`}
      />
    </div>
  )
}

function Legend({ items, footnote }: { items: [string, string][]; footnote: string }) {
  return (
    <div className="flex flex-col justify-center gap-2 text-sm">
      {items.map(([tone, text]) => (
        <div key={text} className="flex items-start gap-2">
          <span className="mt-2 inline-block h-0.5 w-6 shrink-0" style={{ background: `var(--${tone})` }} />
          <span>{text}</span>
        </div>
      ))}
      <p className="mt-2 text-xs text-muted">{footnote}</p>
    </div>
  )
}

/** T–s of a real (irreversible) Brayton/gas-turbine cycle versus ideal. */
export function GTActualTs({ etaC = 0.82, etaT = 0.85, rp = 8, T3 = 1300 }: { etaC?: number; etaT?: number; rp?: number; T3?: number }) {
  const { series, marks } = gtTs({ rp, T3, etaC, etaT })
  return (
    <Plot
      series={series}
      marks={marks}
      xLabel="s"
      yLabel="T"
      ariaLabel="Actual gas turbine cycle with irreversible compression and expansion on T–s axes"
      notes={[]}
    />
  )
}

/** Builds the T–s geometry of a simple gas-turbine cycle with component efficiencies. */
export function gtTs({ rp, T3, etaC, etaT, T1 = 300 }: { rp: number; T3: number; etaC: number; etaT: number; T1?: number }) {
  const { cp, R, g } = AIR
  const k = (g - 1) / g
  const p1 = 100
  const p2 = p1 * rp
  const T2s = T1 * Math.pow(rp, k)
  const T2 = T1 + (T2s - T1) / etaC
  const T4s = T3 / Math.pow(rp, k)
  const T4 = T3 - etaT * (T3 - T4s)
  const s = (Tk: number, p: number) => cp * Math.log(Tk / 300) - R * Math.log(p / 100)
  const isobar = (p: number, Ta: number, Tb: number): [number, number][] =>
    Array.from({ length: 40 }, (_, i) => {
      const t = Ta + ((Tb - Ta) * i) / 39
      return [s(t, p), t]
    })
  const line = (a: [number, number], b: [number, number]): [number, number][] => [a, b]
  const P1: [number, number] = [s(T1, p1), T1]
  const P2s: [number, number] = [s(T2s, p2), T2s]
  const P2: [number, number] = [s(T2, p2), T2]
  const P3: [number, number] = [s(T3, p2), T3]
  const P4s: [number, number] = [s(T4s, p1), T4s]
  const P4: [number, number] = [s(T4, p1), T4]
  const series: Series[] = [
    { pts: isobar(p2, Math.min(T2s, T2) - 30, T3 + 40), tone: 'faint', width: 1 },
    { pts: isobar(p1, T1 - 30, Math.max(T4, T4s) + 60), tone: 'faint', width: 1 },
    { pts: line(P1, P2s), tone: 'muted', dashed: true, width: 1.3 },
    { pts: line(P3, P4s), tone: 'muted', dashed: true, width: 1.3 },
    { pts: line(P1, P2), tone: 'ink', arrow: true },
    { pts: isobar(p2, T2, T3), tone: 'heat', arrow: true },
    { pts: line(P3, P4), tone: 'ink', arrow: true },
    { pts: isobar(p1, T4, T1), tone: 'cool', arrow: true },
  ]
  const marks = [
    { x: P1[0], y: P1[1], label: '1', dx: -12, dy: 14 },
    { x: P2s[0], y: P2s[1], label: '2s', dx: -22, dy: -4 },
    { x: P2[0], y: P2[1], label: '2', dx: 6, dy: 12 },
    { x: P3[0], y: P3[1], label: '3', dx: 6, dy: -6 },
    { x: P4s[0], y: P4s[1], label: '4s', dx: -22, dy: 12 },
    { x: P4[0], y: P4[1], label: '4', dx: 7, dy: 4 },
  ]
  return { series, marks, T2, T4, T2s, T4s }
}

/** small helper re-export so the registry can draw a cycle series in custom plots */
export { cycleSeries }
