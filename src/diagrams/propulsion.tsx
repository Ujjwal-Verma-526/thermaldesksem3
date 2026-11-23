import { useState, type ReactNode } from 'react'
import { Plot } from './Plot'
import { Readout, Slider } from './controls'
import { propulsiveEfficiency, rocketPropulsiveEfficiency } from './thermo'

function Frame({ children, label, h = 150 }: { children: ReactNode; label: string; h?: number }) {
  return (
    <svg viewBox={`-38 0 490 ${h + 6}`} className="schem block h-auto w-full" role="img" aria-label={label}>
      <defs>
        {(['ink', 'heat', 'cool', 'muted', 'warn'] as const).map((t) => (
          <marker key={t} id={`jp-${t}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill={`var(--${t})`} />
          </marker>
        ))}
      </defs>
      {children}
    </svg>
  )
}

const Lbl = ({ x, y, t, muted }: { x: number; y: number; t: string; muted?: boolean }) => (
  <text x={x} y={y} textAnchor="middle" className={muted ? 's-muted' : 's-title'}>
    {t}
  </text>
)

/** Engine casing outline symmetric about y = 75: list of [x, halfHeight] */
function Casing({ pts, fill = 'var(--surface)' }: { pts: [number, number][]; fill?: string }) {
  const top = pts.map(([x, h]) => `${x},${75 - h}`).join(' L')
  const bot = [...pts].reverse().map(([x, h]) => `${x},${75 + h}`).join(' L')
  return <path d={`M${top} L${bot} Z`} fill={fill} stroke="var(--ink)" strokeWidth={1.3} />
}

/** Turbojet: diffuser · compressor · combustor · turbine · nozzle (Fig. 28.5). */
export function TurbojetSketch({ afterburner = false }: { afterburner?: boolean }) {
  const end = afterburner ? 420 : 380
  return (
    <Frame label={afterburner ? 'Turbojet with afterburner' : 'Turbojet engine components'}>
      <Casing
        pts={[
          [20, 30],
          [70, 36],
          [150, 30],
          [230, 34],
          [270, 34],
          ...(afterburner
            ? ([
                [330, 34],
                [390, 32],
                [end, 24],
              ] as [number, number][])
            : ([
                [320, 32],
                [end, 20],
              ] as [number, number][])),
        ]}
      />
      {/* compressor blades */}
      {[80, 92, 104, 116, 128, 140].map((x, i) => (
        <line key={x} x1={x} y1={75 - (34 - i * 1.5)} x2={x} y2={75 + (34 - i * 1.5)} stroke="var(--cool)" strokeWidth={2} />
      ))}
      <rect x={155} y={50} width={70} height={50} rx={8} fill="var(--heat-soft)" stroke="var(--heat)" />
      {[236, 248, 260].map((x) => (
        <line key={x} x1={x} y1={43} x2={x} y2={107} stroke="var(--ink)" strokeWidth={2} />
      ))}
      <line x1={80} y1={75} x2={262} y2={75} stroke="var(--ink)" strokeWidth={3} />
      {afterburner && (
        <>
          <line x1={300} y1={52} x2={300} y2={98} stroke="var(--warn)" strokeWidth={2} strokeDasharray="3 3" />
          <path d="M318,60 l10,15 l-10,15" fill="none" stroke="var(--warn)" strokeWidth={1.6} />
          <rect x={330} y={58} width={50} height={34} fill="var(--heat-soft)" />
        </>
      )}
      <path d="M2,75 L18,75" stroke="var(--cool)" strokeWidth={1.5} markerEnd="url(#jp-cool)" />
      <path d={`M${end + 2},75 L${end + 18},75`} stroke="var(--heat)" strokeWidth={1.5} markerEnd="url(#jp-heat)" />
      <Lbl x={45} y={30} t="Diffuser" />
      <Lbl x={110} y={30} t="Compressor" />
      <Lbl x={190} y={30} t="Combustor" />
      <Lbl x={250} y={30} t="Turbine" />
      {afterburner ? (
        <>
          <Lbl x={340} y={30} t="Afterburner" />
          <Lbl x={300} y={128} t="fuel spray bars" muted />
          <Lbl x={340} y={141} t="flame holder" muted />
          <Lbl x={408} y={128} t="variable nozzle" muted />
        </>
      ) : (
        <Lbl x={350} y={30} t="Nozzle" />
      )}
      <Lbl x={190} y={128} t="gas generator: turbine drives compressor only" muted />
      {['1', '2', '3', '4', '5'].map((s, i) => (
        <text key={s} x={[20, 74, 150, 228, 272][i]} y={118} className="s-muted">
          {s}
        </text>
      ))}
      <text x={afterburner ? end - 4 : end - 4} y={110} className="s-muted">
        6
      </text>
    </Frame>
  )
}

export function TurbopropSketch() {
  return (
    <Frame label="Turboprop engine: turbine drives the propeller through a reduction gearbox">
      <ellipse cx={30} cy={75} rx={6} ry={60} fill="var(--sunken)" stroke="var(--ink)" />
      <rect x={36} y={65} width={30} height={20} fill="var(--sunken)" stroke="var(--ink)" />
      <Casing
        pts={[
          [70, 22],
          [110, 30],
          [200, 30],
          [300, 32],
          [400, 22],
        ]}
      />
      {[118, 130, 142, 154].map((x) => (
        <line key={x} x1={x} y1={47} x2={x} y2={103} stroke="var(--cool)" strokeWidth={2} />
      ))}
      <rect x={168} y={54} width={60} height={42} rx={8} fill="var(--heat-soft)" stroke="var(--heat)" />
      {[240, 252, 264, 276].map((x) => (
        <line key={x} x1={x} y1={45} x2={x} y2={105} stroke="var(--ink)" strokeWidth={2} />
      ))}
      <line x1={36} y1={75} x2={278} y2={75} stroke="var(--ink)" strokeWidth={3} />
      <Lbl x={30} y={146} t="Propeller (~80 % of thrust)" muted />
      <Lbl x={52} y={58} t="Gearbox" muted />
      <Lbl x={136} y={40} t="Compressor" />
      <Lbl x={198} y={40} t="Combustor" />
      <Lbl x={258} y={36} t="Turbine" />
      <Lbl x={355} y={40} t="Nozzle (~20 %)" />
    </Frame>
  )
}

export function TurbofanSketch() {
  return (
    <Frame label="Turbofan: ducted fan with bypass flow around a gas turbine core" h={160}>
      <path d="M20,18 L360,24 L360,40 L20,34 Z M20,132 L360,126 L360,110 L20,116 Z" fill="var(--sunken)" stroke="var(--ink)" />
      <line x1={50} y1={36} x2={50} y2={114} stroke="var(--cool)" strokeWidth={3} />
      <Casing
        pts={[
          [80, 22],
          [200, 26],
          [320, 24],
          [410, 14],
        ]}
      />
      <rect x={180} y={60} width={50} height={30} rx={6} fill="var(--heat-soft)" stroke="var(--heat)" />
      <path d="M60,32 L380,32" stroke="var(--cool)" strokeWidth={1.4} strokeDasharray="5 4" markerEnd="url(#jp-cool)" />
      <path d="M60,118 L380,118" stroke="var(--cool)" strokeWidth={1.4} strokeDasharray="5 4" markerEnd="url(#jp-cool)" />
      <path d="M412,75 L432,75" stroke="var(--heat)" strokeWidth={1.5} markerEnd="url(#jp-heat)" />
      <Lbl x={50} y={150} t="Fan" muted />
      <Lbl x={260} y={14} t="bypass (cold) air" muted />
      <Lbl x={205} y={110} t="core (hot) flow" muted />
    </Frame>
  )
}

/** Ramjet (Fig. 28.3): no compressor, no turbine. */
export function RamjetSketch() {
  return (
    <Frame label="Ramjet engine: supersonic and subsonic diffuser, combustion chamber with flame holder, nozzle">
      <Casing
        pts={[
          [20, 18],
          [120, 34],
          [300, 34],
          [360, 22],
          [420, 30],
        ]}
      />
      <path d="M20,75 L100,75" stroke="var(--ink)" strokeWidth={1} />
      <path d="M2,75 L40,75 L80,72 L100,75" fill="var(--sunken)" stroke="var(--ink)" />
      {[170, 175].map((x) => (
        <path key={x} d={`M${x},50 l-8,6 l8,6 M${x},88 l-8,6 l8,6`} stroke="var(--warn)" fill="none" strokeWidth={1.6} />
      ))}
      <line x1={150} y1={46} x2={150} y2={104} stroke="var(--warn)" strokeDasharray="2 3" />
      <rect x={185} y={48} width={110} height={54} fill="var(--heat-soft)" />
      <Lbl x={60} y={30} t="Supersonic + subsonic diffuser" />
      <Lbl x={150} y={124} t="fuel injectors" muted />
      <Lbl x={178} y={138} t="flame holders" muted />
      <Lbl x={240} y={30} t="Combustion" />
      <Lbl x={380} y={30} t="Nozzle" />
      <Lbl x={60} y={124} t="ram compression" muted />
    </Frame>
  )
}

/** Pulse jet (Fig. 28.4): flap valves, combustion chamber, long tail pipe. */
export function PulsejetSketch() {
  return (
    <Frame label="Pulse jet engine: diffuser with non-return flap valves, combustion chamber, long tail pipe">
      <Casing
        pts={[
          [20, 20],
          [80, 30],
          [150, 34],
          [190, 22],
          [420, 18],
        ]}
      />
      {[86, 92, 98].map((x) => (
        <g key={x}>
          {[50, 62, 74, 86, 98].map((y) => (
            <line key={y} x1={x} y1={y} x2={x + 5} y2={y + 6} stroke="var(--cool)" strokeWidth={1.4} />
          ))}
        </g>
      ))}
      <rect x={108} y={44} width={60} height={62} rx={8} fill="var(--heat-soft)" stroke="var(--heat)" />
      <circle cx={140} cy={60} r={4} fill="var(--heat)" />
      <Lbl x={50} y={30} t="Diffuser" />
      <Lbl x={92} y={124} t="flap (reed) valves" muted />
      <Lbl x={140} y={30} t="Combustion" />
      <Lbl x={140} y={138} t="spark plug (starting only)" muted />
      <Lbl x={300} y={40} t="Tail pipe (acoustically resonant)" />
      <Lbl x={300} y={124} t="intermittent combustion → pulses" muted />
    </Frame>
  )
}

/** Solid and liquid propellant rockets (Figs 28.17–28.18). */
export function RocketSketch() {
  return (
    <svg viewBox="0 0 440 210" className="schem block h-auto w-full" role="img" aria-label="Solid propellant rocket and liquid propellant rocket">
      <g>
        <text x={95} y={16} textAnchor="middle" className="s-title">Solid propellant</text>
        <rect x={40} y={30} width={110} height={120} rx={8} fill="var(--surface)" stroke="var(--ink)" />
        <rect x={48} y={38} width={94} height={104} fill="var(--warn-soft)" stroke="var(--warn)" />
        <path d="M86,38 L86,142 L104,142 L104,38 Z" fill="var(--surface)" stroke="var(--warn)" />
        <path d="M70,150 L120,150 L132,190 L58,190 Z" fill="var(--surface)" stroke="var(--ink)" />
        <text x={95} y={204} textAnchor="middle" className="s-muted">nozzle</text>
        <text x={160} y={60} className="s-muted">grain (fuel +</text>
        <text x={160} y={72} className="s-muted">oxidiser mixed)</text>
        <text x={160} y={100} className="s-muted">central port</text>
        <text x={160} y={112} className="s-muted">burns outward</text>
      </g>
      <g transform="translate(220,0)">
        <text x={110} y={16} textAnchor="middle" className="s-title">Liquid propellant</text>
        <rect x={30} y={26} width={60} height={60} rx={10} fill="var(--cool-soft)" stroke="var(--cool)" />
        <text x={60} y={60} textAnchor="middle" className="s-muted">fuel</text>
        <rect x={130} y={26} width={60} height={60} rx={10} fill="var(--heat-soft)" stroke="var(--heat)" />
        <text x={160} y={60} textAnchor="middle" className="s-muted">oxidiser</text>
        <circle cx={60} cy={108} r={10} fill="var(--surface)" stroke="var(--ink)" />
        <circle cx={160} cy={108} r={10} fill="var(--surface)" stroke="var(--ink)" />
        <text x={110} y={112} textAnchor="middle" className="s-muted">pumps</text>
        <path d="M60,86 L60,98 M160,86 L160,98 M60,118 L60,134 L96,134 M160,118 L160,134 L124,134" fill="none" stroke="var(--ink)" />
        <rect x={86} y={130} width={48} height={34} rx={6} fill="var(--heat-soft)" stroke="var(--ink)" />
        <path d="M94,164 L126,164 L140,200 L80,200 Z" fill="var(--surface)" stroke="var(--ink)" />
        <text x={150} y={152} className="s-muted">thrust chamber</text>
      </g>
    </svg>
  )
}

/** Computed T–s of the ideal turbojet of Rathore Example 28.6. */
export function TurbojetTs() {
  const cp = 1.005
  const R = 0.287
  const s = (T: number, p: number) => cp * Math.log(T / 300) - R * Math.log(p / 100)
  const T1 = 233
  const p1 = 35
  const T2 = 266.63
  const p2 = 56.11
  const T3 = 514.79
  const p3 = 561.1
  const T4 = 1368
  const T5 = 1119.85
  const p5 = 278.5
  const T6 = 619.18
  const isobar = (p: number, a: number, b: number): [number, number][] =>
    Array.from({ length: 30 }, (_, i) => {
      const t = a + ((b - a) * i) / 29
      return [s(t, p), t]
    })
  return (
    <Plot
      series={[
        { pts: [[s(T1, p1), T1], [s(T2, p2), T2]], tone: 'cool', arrow: true, width: 2 },
        { pts: [[s(T2, p2), T2], [s(T3, p3), T3]], tone: 'ink', arrow: true, width: 2 },
        { pts: isobar(p3, T3, T4), tone: 'heat', arrow: true, width: 2 },
        { pts: [[s(T4, p3), T4], [s(T5, p5), T5]], tone: 'ink', arrow: true, width: 2 },
        { pts: [[s(T5, p5), T5], [s(T6, p1), T6]], tone: 'cool', arrow: true, width: 2 },
        { pts: isobar(p1, T6, T1), tone: 'muted', dashed: true, width: 1.2 },
      ]}
      marks={[
        { x: s(T1, p1), y: T1, label: '1', dx: -12, dy: 14 },
        { x: s(T2, p2), y: T2, label: '2', dx: -14, dy: 0 },
        { x: s(T3, p3), y: T3, label: '3', dx: -14, dy: -2 },
        { x: s(T4, p3), y: T4, label: '4', dx: 6, dy: -4 },
        { x: s(T5, p5), y: T5, label: '5', dx: 7, dy: 2 },
        { x: s(T6, p1), y: T6, label: '6', dx: 7, dy: 4 },
      ]}
      notes={[]}
      xLabel="s"
      yLabel="T"
      ariaLabel="Computed T–s diagram of the ideal turbojet of Example 28.6: diffuser, compressor, combustor, turbine, nozzle"
    />
  )
}

/** Propulsive efficiency vs speed ratio σ = V_a / V_jet, jets and rockets. */
export function PropulsiveEfficiencyChart() {
  const [sigma, setSigma] = useState(0.5)
  const xs = Array.from({ length: 101 }, (_, i) => i / 100)
  const xr = Array.from({ length: 201 }, (_, i) => i / 100)
  const jetValid = sigma <= 1
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.5fr_1fr]">
      <Plot
        series={[
          { pts: xs.map((x) => [x, propulsiveEfficiency(x) * 100] as [number, number]), tone: 'cool', width: 2.2 },
          { pts: xr.map((x) => [x, rocketPropulsiveEfficiency(x) * 100] as [number, number]), tone: 'heat', width: 2.2 },
          { pts: [[sigma, 0], [sigma, 100]], tone: 'faint', width: 1 },
        ]}
        xRange={[0, 2.02]}
        yRange={[0, 105]}
        ticks={{ x: [0, 0.5, 1, 1.5, 2], y: [0, 25, 50, 75, 100] }}
        xLabel="σ = flight speed / jet speed"
        yLabel="η_p %"
        notes={[
          { x: 1.55, y: 92, text: 'rocket 2σ/(1+σ²)', tone: 'heat', size: 11, anchor: 'start' },
          { x: 0.55, y: 58, text: 'jet 2σ/(1+σ)', tone: 'cool', size: 11, anchor: 'start' },
          { x: 1.02, y: 8, text: 'σ > 1 possible only for rockets', tone: 'muted', size: 10, anchor: 'start', italic: true },
        ]}
        ariaLabel="Interactive chart of propulsive efficiency against flight-to-jet speed ratio"
      />
      <div className="flex flex-col gap-3">
        <Slider label="Speed ratio σ" value={sigma} min={0} max={2} step={0.01} onChange={setSigma} fmt={(v) => v.toFixed(2)} />
        <Readout label="Jet η_p = 2σ/(1+σ)" value={jetValid ? `${(propulsiveEfficiency(sigma) * 100).toFixed(1)} %` : 'n/a (no thrust)'} tone="cool" />
        <Readout label="Rocket η_p = 2σ/(1+σ²)" value={`${(rocketPropulsiveEfficiency(sigma) * 100).toFixed(1)} %`} tone="heat" />
        <p className="text-xs text-muted">
          For an air-breathing jet, σ = 1 means the jet adds no momentum: η<sub>p</sub> → 100 % but thrust → 0. A rocket keeps its thrust
          at any speed, so its efficiency peaks at σ = 1 and falls again beyond it. Real engines trade efficiency for thrust;
          turbofans and turboprops win by moving more air at a smaller velocity increase.
        </p>
      </div>
    </div>
  )
}
