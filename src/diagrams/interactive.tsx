import { useState } from 'react'
import { Plot } from './Plot'
import { Readout, Slider } from './controls'
import { braytonWork, etaBrayton, etaDiesel, etaDual, etaOtto } from './thermo'

/** η vs compression ratio for Otto, Diesel and Dual (air standard, γ adjustable). */
export function EfficiencyVsR() {
  const [rho, setRho] = useState(2)
  const [alpha, setAlpha] = useState(1.5)
  const [gamma, setGamma] = useState(1.4)
  const [r, setR] = useState(10)
  const rs = Array.from({ length: 120 }, (_, i) => 2 + (i * 22) / 119)
  const line = (f: (x: number) => number) => rs.map((x) => [x, f(x) * 100] as [number, number])
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
      <Plot
        series={[
          { pts: line((x) => etaOtto(x, gamma)), tone: 'heat', width: 2.2 },
          { pts: line((x) => etaDual(x, alpha, rho, gamma)), tone: 'ink', width: 2.2 },
          { pts: line((x) => etaDiesel(x, rho, gamma)), tone: 'cool', width: 2.2 },
          { pts: [[r, 0], [r, 80]], tone: 'faint', width: 1 },
        ]}
        xRange={[2, 24]}
        yRange={[0, 80]}
        ticks={{ x: [4, 8, 12, 16, 20, 24], y: [0, 20, 40, 60, 80] }}
        xLabel="compression ratio r"
        yLabel="η %"
        notes={[
          { x: 23.5, y: etaOtto(23.5, gamma) * 100 + 3, text: 'Otto', tone: 'heat', anchor: 'end', size: 11 },
          { x: 23.5, y: etaDiesel(23.5, rho, gamma) * 100 - 5, text: 'Diesel', tone: 'cool', anchor: 'end', size: 11 },
        ]}
        ariaLabel="Interactive chart of air-standard efficiency against compression ratio for Otto, Dual and Diesel cycles"
      />
      <div className="flex flex-col gap-3">
        <Slider label="Compression ratio r" value={r} min={2} max={24} step={0.5} onChange={setR} fmt={(v) => v.toFixed(1)} />
        <Slider label="Cut-off ratio ρ" value={rho} min={1} max={4} step={0.1} onChange={setRho} fmt={(v) => v.toFixed(1)} />
        <Slider label="Pressure ratio α (dual)" value={alpha} min={1} max={3} step={0.1} onChange={setAlpha} fmt={(v) => v.toFixed(1)} />
        <Slider label="γ" value={gamma} min={1.25} max={1.67} step={0.01} onChange={setGamma} fmt={(v) => v.toFixed(2)} />
        <Readout label="Otto" value={`${(etaOtto(r, gamma) * 100).toFixed(2)} %`} tone="heat" />
        <Readout label="Dual" value={`${(etaDual(r, alpha, rho, gamma) * 100).toFixed(2)} %`} />
        <Readout label="Diesel" value={`${(etaDiesel(r, rho, gamma) * 100).toFixed(2)} %`} tone="cool" />
        <p className="text-xs text-muted">
          For the same r, Otto &gt; Dual &gt; Diesel. Set ρ = 1 and Diesel collapses onto Otto. Diesels still win in practice
          because they run at r = 14–21, which an Otto engine cannot reach without knocking.
        </p>
      </div>
    </div>
  )
}

/** Ideal Brayton: η and specific work vs rp, showing the optimum rp = (T3/T1)^(γ/2(γ−1)). */
export function BraytonWorkVsRp() {
  const [T3, setT3] = useState(1200)
  const T1 = 300
  const rpMax = Math.pow(T3 / T1, 1.4 / 0.4)
  const rpOpt = Math.sqrt(rpMax)
  const rps = Array.from({ length: 160 }, (_, i) => 1 + ((Math.min(rpMax, 60) - 1) * i) / 159)
  const wOpt = braytonWork(rpOpt, T1, T3)
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
      <Plot
        series={[
          { pts: rps.map((r) => [r, Math.max(0, braytonWork(r, T1, T3)) / wOpt * 100] as [number, number]), tone: 'cool', width: 2.2 },
          { pts: rps.map((r) => [r, etaBrayton(r) * 100] as [number, number]), tone: 'heat', width: 2.2 },
          { pts: [[rpOpt, 0], [rpOpt, 100]], tone: 'faint', width: 1 },
        ]}
        xRange={[1, Math.min(rpMax, 60)]}
        yRange={[0, 105]}
        ticks={{ y: [0, 25, 50, 75, 100], x: [1, 10, 20, 30, 40, 50, 60].filter((t) => t <= Math.min(rpMax, 60)) }}
        xLabel="rₚ"
        yLabel="%"
        notes={[
          { x: rpOpt, y: 102, text: 'rₚ,opt', tone: 'muted', size: 11 },
        ]}
        ariaLabel="Ideal Brayton cycle efficiency and specific work (as % of maximum) against pressure ratio"
      />
      <div className="flex flex-col gap-3">
        <Slider label="Turbine inlet T₃" value={T3} min={800} max={1700} step={20} onChange={setT3} fmt={(v) => `${v} K`} />
        <Readout label="rₚ for max work" value={rpOpt.toFixed(2)} tone="cool" />
        <Readout label="Max specific work" value={`${wOpt.toFixed(1)} kJ/kg`} tone="cool" />
        <Readout label="η at rₚ,opt" value={`${(etaBrayton(rpOpt) * 100).toFixed(2)} %`} tone="heat" />
        <Readout label="rₚ where w → 0 (η → Carnot)" value={rpMax.toFixed(1)} />
        <p className="text-xs text-muted">
          Blue: w<sub>net</sub> as % of its maximum. Red: η. Efficiency keeps rising with rₚ, but work peaks at
          rₚ = (T₃/T₁)<sup>γ/2(γ−1)</sup>, where T₂ = T₄ = √(T₁T₃). T₁ = 300 K.
        </p>
      </div>
    </div>
  )
}
