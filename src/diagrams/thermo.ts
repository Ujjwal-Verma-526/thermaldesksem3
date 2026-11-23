/**
 * Ideal-gas process geometry for computed p–v and T–s diagrams.
 * Air-standard properties (Rathore §11.2): cp = 1.005, cv = 0.718, R = 0.287 kJ/kg·K, γ = 1.4.
 * States are specified by (p [kPa], v [m³/kg]); T and s follow from the ideal-gas relations,
 * so every curve drawn is the actual process path, not a sketch.
 */

export const AIR = { cp: 1.005, cv: 0.718, R: 0.287, g: 1.4 }

export interface St {
  p: number
  v: number
}

export type Proc =
  | { kind: 'poly'; n: number }
  | { kind: 'isobaric' }
  | { kind: 'isochoric' }
  | { kind: 'isothermal' }

export interface Pt {
  p: number
  v: number
  T: number
  s: number
}

export const T = (st: St, R = AIR.R) => (st.p * st.v) / R

/** entropy relative to a fixed reference (only differences are plotted) */
export function entropy(st: St, gas = AIR) {
  const t = T(st, gas.R)
  return gas.cv * Math.log(t / 300) + gas.R * Math.log(st.v / 0.861)
}

export function stateFromTp(t: number, p: number, R = AIR.R): St {
  return { p, v: (R * t) / p }
}

/** sample a process path between two states */
export function processPath(a: St, b: St, proc: Proc, steps = 64, gas = AIR): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i <= steps; i++) {
    const f = i / steps
    let p: number
    let v: number
    switch (proc.kind) {
      case 'isobaric':
        p = a.p
        v = a.v + (b.v - a.v) * f
        break
      case 'isochoric':
        v = a.v
        p = a.p + (b.p - a.p) * f
        break
      case 'isothermal':
      case 'poly': {
        const n = proc.kind === 'isothermal' ? 1 : proc.n
        // interpolate in log(v) so points are evenly spread along the curve
        v = Math.exp(Math.log(a.v) + (Math.log(b.v) - Math.log(a.v)) * f)
        p = a.p * Math.pow(a.v / v, n)
        // the endpoint may differ by rounding; snap the last point exactly to b
        if (i === steps) {
          p = b.p
          v = b.v
        }
        break
      }
    }
    const st = { p, v }
    pts.push({ p, v, T: T(st, gas.R), s: entropy(st, gas) })
  }
  return pts
}

export interface Leg {
  from: number
  to: number
  proc: Proc
  heat?: 'in' | 'out' | 'regen'
  label?: string
  dashed?: boolean
}

export interface Cycle {
  states: St[]
  labels: string[]
  legs: Leg[]
  /** draw a translucent fill for the enclosed loop in p–v */
  closed: boolean
}

const g = AIR.g

/** Otto: 1→2 isentropic, 2→3 v=c, 3→4 isentropic, 4→1 v=c */
export function ottoCycle(r: number, qin: number, T1 = 300, p1 = 100): Cycle {
  const s1 = stateFromTp(T1, p1)
  const s2 = { v: s1.v / r, p: p1 * Math.pow(r, g) }
  const T2 = T(s2)
  const T3 = T2 + qin / AIR.cv
  const s3 = { v: s2.v, p: s2.p * (T3 / T2) }
  const s4 = { v: s1.v, p: s3.p * Math.pow(1 / r, g) }
  return {
    states: [s1, s2, s3, s4],
    labels: ['1', '2', '3', '4'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'poly', n: g } },
      { from: 1, to: 2, proc: { kind: 'isochoric' }, heat: 'in' },
      { from: 2, to: 3, proc: { kind: 'poly', n: g } },
      { from: 3, to: 0, proc: { kind: 'isochoric' }, heat: 'out' },
    ],
    closed: true,
  }
}

/** Diesel: 2→3 at constant pressure, cut-off ratio rho = v3/v2 */
export function dieselCycle(r: number, rho: number, T1 = 300, p1 = 100): Cycle {
  const s1 = stateFromTp(T1, p1)
  const s2 = { v: s1.v / r, p: p1 * Math.pow(r, g) }
  const s3 = { v: s2.v * rho, p: s2.p }
  const s4 = { v: s1.v, p: s3.p * Math.pow(s3.v / s1.v, g) }
  return {
    states: [s1, s2, s3, s4],
    labels: ['1', '2', '3', '4'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'poly', n: g } },
      { from: 1, to: 2, proc: { kind: 'isobaric' }, heat: 'in' },
      { from: 2, to: 3, proc: { kind: 'poly', n: g } },
      { from: 3, to: 0, proc: { kind: 'isochoric' }, heat: 'out' },
    ],
    closed: true,
  }
}

/** Dual (limited-pressure): 2→3 v=c (pressure ratio alpha), 3→4 p=c (cut-off rho) */
export function dualCycle(r: number, alpha: number, rho: number, T1 = 300, p1 = 100): Cycle {
  const s1 = stateFromTp(T1, p1)
  const s2 = { v: s1.v / r, p: p1 * Math.pow(r, g) }
  const s3 = { v: s2.v, p: s2.p * alpha }
  const s4 = { v: s3.v * rho, p: s3.p }
  const s5 = { v: s1.v, p: s4.p * Math.pow(s4.v / s1.v, g) }
  return {
    states: [s1, s2, s3, s4, s5],
    labels: ['1', '2', '3', '4', '5'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'poly', n: g } },
      { from: 1, to: 2, proc: { kind: 'isochoric' }, heat: 'in' },
      { from: 2, to: 3, proc: { kind: 'isobaric' }, heat: 'in' },
      { from: 3, to: 4, proc: { kind: 'poly', n: g } },
      { from: 4, to: 0, proc: { kind: 'isochoric' }, heat: 'out' },
    ],
    closed: true,
  }
}

/** Atkinson: v=c heat addition, expansion to the initial pressure, p=c heat rejection */
export function atkinsonCycle(rc: number, qin: number, T1 = 300, p1 = 100): Cycle {
  const s1 = stateFromTp(T1, p1)
  const s2 = { v: s1.v / rc, p: p1 * Math.pow(rc, g) }
  const T3 = T(s2) + qin / AIR.cv
  const s3 = { v: s2.v, p: s2.p * (T3 / T(s2)) }
  const s4 = { p: p1, v: s3.v * Math.pow(s3.p / p1, 1 / g) }
  return {
    states: [s1, s2, s3, s4],
    labels: ['1', '2', '3', '4'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'poly', n: g } },
      { from: 1, to: 2, proc: { kind: 'isochoric' }, heat: 'in' },
      { from: 2, to: 3, proc: { kind: 'poly', n: g } },
      { from: 3, to: 0, proc: { kind: 'isobaric' }, heat: 'out' },
    ],
    closed: true,
  }
}

/** Brayton (Joule): isentropic compression to rp, p=c heating to T3, isentropic expansion, p=c cooling */
export function braytonCycle(rp: number, T3: number, T1 = 300, p1 = 100): Cycle {
  const s1 = stateFromTp(T1, p1)
  const p2 = p1 * rp
  const s2 = { p: p2, v: s1.v * Math.pow(1 / rp, 1 / g) }
  const s3 = stateFromTp(T3, p2)
  const s4 = { p: p1, v: s3.v * Math.pow(rp, 1 / g) }
  return {
    states: [s1, s2, s3, s4],
    labels: ['1', '2', '3', '4'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'poly', n: g } },
      { from: 1, to: 2, proc: { kind: 'isobaric' }, heat: 'in' },
      { from: 2, to: 3, proc: { kind: 'poly', n: g } },
      { from: 3, to: 0, proc: { kind: 'isobaric' }, heat: 'out' },
    ],
    closed: true,
  }
}

/** Carnot: isothermal + isentropic legs between TH and TL with isothermal expansion ratio */
export function carnotCycle(TH: number, TL: number, isoRatio = 2.2, p1 = 100): Cycle {
  // state 1 at TL, p1; 1→2 isentropic compression to TH; 2→3 isothermal expansion; 3→4 isentropic; 4→1 isothermal
  const s1 = stateFromTp(TL, p1)
  const v2 = s1.v * Math.pow(TL / TH, 1 / (g - 1))
  const s2 = { v: v2, p: (AIR.R * TH) / v2 }
  const v3 = v2 * isoRatio
  const s3 = { v: v3, p: (AIR.R * TH) / v3 }
  const v4 = s1.v * isoRatio
  const s4 = { v: v4, p: (AIR.R * TL) / v4 }
  return {
    states: [s1, s2, s3, s4],
    labels: ['1', '2', '3', '4'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'poly', n: g } },
      { from: 1, to: 2, proc: { kind: 'isothermal' }, heat: 'in' },
      { from: 2, to: 3, proc: { kind: 'poly', n: g } },
      { from: 3, to: 0, proc: { kind: 'isothermal' }, heat: 'out' },
    ],
    closed: true,
  }
}

/** Stirling: two isotherms + two isochores (regenerative) */
export function stirlingCycle(TH: number, TL: number, vr: number, p1 = 100): Cycle {
  const s1 = stateFromTp(TL, p1) // max volume, TL
  const s2 = { v: s1.v / vr, p: p1 * vr } // isothermal compression at TL
  const s3 = { v: s2.v, p: (AIR.R * TH) / s2.v } // v = c heating (regenerative)
  const s4 = { v: s1.v, p: (AIR.R * TH) / s1.v } // isothermal expansion at TH
  return {
    states: [s1, s2, s3, s4],
    labels: ['1', '2', '3', '4'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'isothermal' }, heat: 'out' },
      { from: 1, to: 2, proc: { kind: 'isochoric' }, heat: 'regen' },
      { from: 2, to: 3, proc: { kind: 'isothermal' }, heat: 'in' },
      { from: 3, to: 0, proc: { kind: 'isochoric' }, heat: 'regen' },
    ],
    closed: true,
  }
}

/** Ericsson: two isotherms + two isobars (regenerative) */
export function ericssonCycle(TH: number, TL: number, pr: number, p1 = 100): Cycle {
  const s1 = stateFromTp(TL, p1)
  const s2 = stateFromTp(TL, p1 * pr)
  const s3 = stateFromTp(TH, p1 * pr)
  const s4 = stateFromTp(TH, p1)
  return {
    states: [s1, s2, s3, s4],
    labels: ['1', '2', '3', '4'],
    legs: [
      { from: 0, to: 1, proc: { kind: 'isothermal' }, heat: 'out' },
      { from: 1, to: 2, proc: { kind: 'isobaric' }, heat: 'regen' },
      { from: 2, to: 3, proc: { kind: 'isothermal' }, heat: 'in' },
      { from: 3, to: 0, proc: { kind: 'isobaric' }, heat: 'regen' },
    ],
    closed: true,
  }
}

/* ---------------- closed-form results used by interactive widgets ---------------- */

export const etaOtto = (r: number, gamma = g) => 1 - 1 / Math.pow(r, gamma - 1)

export const etaDiesel = (r: number, rho: number, gamma = g) =>
  1 - (1 / Math.pow(r, gamma - 1)) * ((Math.pow(rho, gamma) - 1) / (gamma * (rho - 1)))

export const etaDual = (r: number, alpha: number, rho: number, gamma = g) =>
  1 -
  (1 / Math.pow(r, gamma - 1)) *
    ((alpha * Math.pow(rho, gamma) - 1) / (alpha - 1 + gamma * alpha * (rho - 1)))

export const etaBrayton = (rp: number, gamma = g) => 1 - 1 / Math.pow(rp, (gamma - 1) / gamma)

/** specific net work of the ideal Brayton cycle, kJ/kg */
export function braytonWork(rp: number, T1: number, T3: number, cp = AIR.cp, gamma = g) {
  const x = Math.pow(rp, (gamma - 1) / gamma)
  return cp * (T3 - T3 / x - T1 * x + T1)
}

/** volumetric efficiency of a reciprocating compressor with clearance ratio c */
export const etaVolumetric = (c: number, pr: number, n: number) => 1 + c - c * Math.pow(pr, 1 / n)

/** polytropic work per unit p1V1 for k equal stages with perfect intercooling */
export function multistageWork(pr: number, n: number, stages: number) {
  return ((stages * n) / (n - 1)) * (Math.pow(pr, (n - 1) / (stages * n)) - 1)
}

export const propulsiveEfficiency = (sigma: number) => (2 * sigma) / (1 + sigma)
export const rocketPropulsiveEfficiency = (sigma: number) => (2 * sigma) / (1 + sigma * sigma)
