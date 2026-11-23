import type { ComponentType } from 'react'
import type { DiagramMeta } from '../content/types'
import * as cy from './cycles'
import * as cp from './compressors'
import * as en from './engines'
import * as tm from './timing'
import * as gt from './turbines'
import * as jp from './propulsion'
import * as ix from './interactive'

export interface DiagramEntry {
  meta: DiagramMeta
  Render: ComponentType
}

type Def = Omit<DiagramMeta, 'id'> & { Render: ComponentType }

const defs: Record<string, Def> = {
  /* ---------- Unit 1 ---------- */
  'recip-compressor': { title: 'Reciprocating air compressor', topicId: 'u1-basics', kind: 'recreated', caption: 'Single-acting, single-stage compressor: spring-loaded inlet and delivery valves, water-jacketed cylinder, receiver.', bookFigure: 'Fig. 25.1', Render: en.RecipCompressorSketch },
  'comp-no-clearance': { title: 'Indicator diagram without clearance', topicId: 'u1-basics', kind: 'computed', caption: 'Suction c→1 at p₁, polytropic compression 1→2, delivery 2→d at p₂. Area enclosed = work per cycle.', bookFigure: 'Fig. 25.4', Render: cp.CompressorNoClearance },
  'comp-processes': { title: 'Isothermal, polytropic, isentropic compression', topicId: 'u1-processes', kind: 'computed', caption: 'Same p₁, V₁ and p₂; curves are pVⁿ = C for n = 1, 1.25, 1.4. The steeper the curve, the larger the enclosed area (work).', bookFigure: 'Fig. 25.6', Render: cp.CompressionComparison },
  'comp-clearance': { title: 'Clearance and volumetric efficiency', topicId: 'u1-clearance', kind: 'interactive', caption: 'Drag the sliders to see clearance air re-expand (3→4) and shrink the effective suction volume.', bookFigure: 'Figs 25.8, 25.12', Render: cp.ClearanceExplorer },
  'comp-actual': { title: 'Actual indicator diagram', topicId: 'u1-clearance', kind: 'qualitative', caption: 'Valve resistance makes suction occur below atmospheric and delivery above receiver pressure; valve bounce shows as ripples.', bookFigure: 'Fig. 25.11', Render: cp.CompressorActual },
  'comp-multistage': { title: 'Multistage compression with intercooling', topicId: 'u1-multistage', kind: 'interactive', caption: 'Each stage starts back on the isotherm; more stages ⇒ closer to isothermal ⇒ less work.', bookFigure: 'Figs 25.19, 25.22', Render: cp.MultistageExplorer },

  /* ---------- Unit 2 ---------- */
  'centrifugal-sketch': { title: 'Centrifugal compressor', topicId: 'u2-construction', kind: 'recreated', caption: 'Air enters the eye axially, is flung outward by the impeller, then slowed in the diffuser and volute to raise pressure.', bookFigure: 'Fig. 26.6', Render: en.CentrifugalSketch },
  'centrifugal-pv': { title: 'Pressure and velocity through the stage', topicId: 'u2-construction', kind: 'qualitative', caption: 'Both pressure and velocity rise in the impeller; the diffuser converts velocity into further pressure rise.', bookFigure: 'Fig. 26.7', Render: en.CentrifugalPressureVelocity },
  'velocity-triangles': { title: 'Outlet velocity triangle with slip', topicId: 'u2-velocity', kind: 'interactive', caption: 'Change the blade angle and slip factor to see the whirl component and the Euler work change.', bookFigure: 'Figs 26.8, 26.10, 26.11', Render: cp.VelocityTriangles },
  'blade-shapes': { title: 'Effect of vane shape', topicId: 'u2-velocity', kind: 'qualitative', caption: 'Head vs mass flow for backward, radial and forward curved vanes.', bookFigure: 'Fig. 26.13', Render: cp.BladeShapes },
  'centrifugal-ts': { title: 'Stage compression on T–s', topicId: 'u2-efficiency', kind: 'computed', caption: 'Actual 01→02 vs isentropic 01→02s for p₀₂/p₀₁ = 4, ηc = 0.80 (T₀₂s = 445.8 K, T₀₂ = 482.3 K).', bookFigure: 'Figs 26.9, 26.12', Render: cp.CentrifugalTs },
  'comp-characteristic': { title: 'Characteristic, surging and choking', topicId: 'u2-surging', kind: 'qualitative', caption: 'Constant-speed curve: stable to the right of the peak D, unstable (surge) to the left, choking at A.', bookFigure: 'Fig. 26.15', Render: cp.CompressorCharacteristic },

  /* ---------- Unit 3 ---------- */
  'carnot-pair': { title: 'Carnot cycle', topicId: 'u3-air-standard', kind: 'computed', caption: 'Two isotherms and two isentropes, 900 K / 300 K. Rectangle on T–s.', bookFigure: 'Fig. 11.5', Render: cy.CarnotPair },
  'otto-pair': { title: 'Otto cycle', topicId: 'u3-otto', kind: 'computed', caption: 'r = 6, qᵢₙ = 1300 kJ/kg: two isentropes, heat added and rejected at constant volume.', bookFigure: 'Fig. 11.9', Render: cy.OttoPair },
  'diesel-pair': { title: 'Diesel cycle', topicId: 'u3-diesel', kind: 'computed', caption: 'r = 14, ρ = 2.2: heat added at constant pressure, rejected at constant volume.', bookFigure: 'Fig. 11.10', Render: cy.DieselPair },
  'dual-pair': { title: 'Dual (mixed) cycle', topicId: 'u3-dual', kind: 'computed', caption: 'r = 12, α = 1.6, ρ = 1.6: part of the heat at constant volume, the rest at constant pressure.', bookFigure: 'Fig. 11.12', Render: cy.DualPair },
  'eff-vs-r': { title: 'Efficiency vs compression ratio', topicId: 'u3-comparison', kind: 'interactive', caption: 'Air-standard efficiency of Otto, Dual and Diesel from the closed-form expressions.', Render: ix.EfficiencyVsR },
  'compare-same-r': { title: 'Same r, same heat input', topicId: 'u3-comparison', kind: 'computed', caption: 'r = 8, qᵢₙ = 1400 kJ/kg for all three. Heat rejected (area under 4→1) is least for Otto ⇒ η_Otto > η_Dual > η_Diesel.', bookFigure: 'Fig. 11.13', Render: cy.CompareSameR },
  'compare-same-pmax': { title: 'Same maximum pressure and temperature', topicId: 'u3-comparison', kind: 'computed', caption: 'Same p_max and T_max: now the order reverses, η_Diesel > η_Dual > η_Otto.', bookFigure: 'Fig. 11.14', Render: cy.CompareSamePmax },
  'stirling-pair': { title: 'Stirling cycle', topicId: 'u3-stirling-ericsson', kind: 'computed', caption: 'Two isotherms joined by two constant-volume regenerative processes (dashed).', bookFigure: 'Fig. 11.6', Render: cy.StirlingPair },
  'ericsson-pair': { title: 'Ericsson cycle', topicId: 'u3-stirling-ericsson', kind: 'computed', caption: 'Two isotherms joined by two constant-pressure regenerative processes (dashed).', bookFigure: 'Fig. 11.7', Render: cy.EricssonPair },
  'atkinson-pair': { title: 'Atkinson cycle', topicId: 'u3-atkinson', kind: 'computed', caption: 'Expansion carried down to the initial pressure; heat rejected at constant pressure.', bookFigure: 'Fig. 11.35', Render: cy.AtkinsonPair },
  'brayton-pair': { title: 'Brayton (Joule) cycle', topicId: 'u3-brayton', kind: 'computed', caption: 'rₚ = 8, T₃ = 1300 K: two isentropes and two isobars.', bookFigure: 'Fig. 11.38', Render: cy.BraytonPair },
  'brayton-work-rp': { title: 'Brayton work and efficiency vs rₚ', topicId: 'u3-brayton', kind: 'interactive', caption: 'Efficiency rises with rₚ; specific work has a maximum.', bookFigure: 'Figs 11.39–11.40', Render: ix.BraytonWorkVsRp },

  /* ---------- Unit 4 ---------- */
  'engine-parts': { title: 'Parts of an IC engine', topicId: 'u4-classification', kind: 'recreated', caption: 'Simplified section of a four-stroke engine.', bookFigure: 'Fig. 24.1', Render: en.EngineParts },
  'four-stroke-si': { title: 'Four strokes, petrol engine', topicId: 'u4-four-stroke', kind: 'recreated', caption: 'Suction of air–fuel mixture, compression, spark ignition and power, exhaust.', bookFigure: 'Fig. 24.7', Render: () => <en.FourStrokePanels /> },
  'four-stroke-ci': { title: 'Four strokes, diesel engine', topicId: 'u4-four-stroke', kind: 'recreated', caption: 'Only air is drawn in; fuel is injected near TDC and ignites in the hot compressed air.', bookFigure: 'Fig. 24.14', Render: () => <en.FourStrokePanels ci /> },
  'two-stroke': { title: 'Two-stroke petrol engine', topicId: 'u4-two-stroke', kind: 'recreated', caption: 'Ports in the cylinder wall replace valves; the crankcase pre-compresses the charge.', bookFigure: 'Figs 24.2–24.3', Render: en.TwoStrokeEngine },
  'valve-timing-si': { title: 'Valve timing, four-stroke SI', topicId: 'u4-timing', kind: 'recreated', caption: 'Drawn to scale from the book’s typical angles; mid-range used where the book gives a range.', bookFigure: 'Fig. 24.9(b)', Render: tm.ValveTimingSI },
  'valve-timing-ci': { title: 'Valve timing, four-stroke CI', topicId: 'u4-timing', kind: 'recreated', caption: 'Drawn to scale from the book’s typical angles, with the fuel-injection period.', bookFigure: 'Fig. 24.16', Render: tm.ValveTimingCI },
  'port-timing-2s': { title: 'Port timing, two-stroke SI', topicId: 'u4-timing', kind: 'recreated', caption: 'Symmetric about the dead centres because the piston itself opens and closes the ports.', bookFigure: 'Fig. 24.5', Render: tm.PortTiming2S },
  'si-combustion': { title: 'Stages of combustion in an SI engine', topicId: 'u4-si-combustion', kind: 'qualitative', caption: 'I ignition lag, II flame propagation, III afterburning. Dashed: motoring (no firing).', bookFigure: 'Fig. 24.27', Render: en.SICombustionStages },
  'detonation': { title: 'Normal combustion vs detonation', topicId: 'u4-si-combustion', kind: 'qualitative', caption: 'Detonation: the unburnt end gas auto-ignites before the flame front reaches it.', bookFigure: 'Fig. 24.28', Render: en.DetonationSketch },
  'ci-combustion': { title: 'Stages of combustion in a CI engine', topicId: 'u4-ci-combustion', kind: 'qualitative', caption: '1 ignition delay, 2 uncontrolled (rapid) combustion, 3 controlled combustion, 4 afterburning.', bookFigure: 'Fig. 24.29', Render: en.CICombustionStages },

  /* ---------- Unit 5 ---------- */
  'gt-open': { title: 'Open-cycle gas turbine', topicId: 'u5-intro', kind: 'recreated', caption: 'Air drawn from and exhaust rejected to the atmosphere; fuel burnt in the working fluid.', bookFigure: 'Fig. 27.2', Render: gt.GTOpen },
  'gt-closed': { title: 'Closed-cycle gas turbine', topicId: 'u5-intro', kind: 'recreated', caption: 'Same working fluid recirculated; heat added and rejected through heat exchangers.', bookFigure: 'Fig. 27.3', Render: gt.GTClosed },
  'gt-actual-ts': { title: 'Actual simple cycle on T–s', topicId: 'u5-simple', kind: 'computed', caption: 'rₚ = 8, T₃ = 1300 K, ηc = 0.82, ηt = 0.85. Dashed: isentropic paths 1→2s and 3→4s.', bookFigure: 'Figs 27.6–27.7', Render: () => <cy.GTActualTs /> },
  'gt-regen': { title: 'Regenerative gas turbine', topicId: 'u5-regeneration', kind: 'recreated', caption: 'Turbine exhaust heats compressed air before the combustion chamber.', bookFigure: 'Figs 27.13–27.14', Render: gt.GTRegen },
  'gt-regen-ts': { title: 'Regeneration on T–s', topicId: 'u5-regeneration', kind: 'computed', caption: 'rₚ = 4, ε = 0.8: compressed air 2→x picks up heat from exhaust 4→y. Possible only when T₄ > T₂.', Render: gt.GTRegenTs },
  'gt-reheat': { title: 'Gas turbine with reheat', topicId: 'u5-reheat-intercool', kind: 'recreated', caption: 'Gas is reheated between the HP and LP turbines.', bookFigure: 'Figs 27.18–27.19', Render: gt.GTReheat },
  'gt-reheat-ts': { title: 'Reheat on T–s', topicId: 'u5-reheat-intercool', kind: 'computed', caption: 'Reheat back to T₃ between equal-ratio turbine stages: more work, more heat input.', Render: gt.GTReheatTs },
  'gt-intercool': { title: 'Gas turbine with intercooling', topicId: 'u5-reheat-intercool', kind: 'recreated', caption: 'Air cooled between LP and HP compressors.', bookFigure: 'Fig. 27.22', Render: gt.GTIntercool },
  'gt-intercool-ts': { title: 'Intercooling on T–s', topicId: 'u5-reheat-intercool', kind: 'computed', caption: 'Cooling back to T₁ between equal-ratio compressors reduces compressor work.', Render: gt.GTIntercoolTs },
  'gt-all-ts': { title: 'Intercooling + reheat (ideal)', topicId: 'u5-reheat-intercool', kind: 'computed', caption: 'With many stages of each, compression and expansion approach isotherms: the Ericsson cycle.', bookFigure: 'Fig. 27.34', Render: gt.GTAllTs },
  'gt-operating': { title: 'Effect of operating variables', topicId: 'u5-operating', kind: 'interactive', caption: 'Actual-cycle efficiency, specific work, work ratio and air rate vs pressure ratio, T₃ and component efficiencies.', Render: gt.GTOperatingVariables },

  /* ---------- Unit 6 ---------- */
  'turbojet': { title: 'Turbojet engine', topicId: 'u6-turbojet', kind: 'recreated', caption: 'Diffuser, compressor, combustor, turbine (drives compressor only) and propelling nozzle.', bookFigure: 'Fig. 28.5', Render: () => <jp.TurbojetSketch /> },
  'turbojet-ts': { title: 'Ideal turbojet on T–s', topicId: 'u6-turbojet', kind: 'computed', caption: 'Computed from Example 28.6: ram 1→2, compression 2→3, combustion 3→4, turbine 4→5, nozzle 5→6.', bookFigure: 'Ex. 28.6', Render: jp.TurbojetTs },
  'propulsive-eff': { title: 'Propulsive efficiency', topicId: 'u6-intro', kind: 'interactive', caption: 'η_p against σ = Vₐ/V_jet for air-breathing jets and rockets.', bookFigure: 'Fig. 28.27', Render: jp.PropulsiveEfficiencyChart },
  'afterburner': { title: 'Turbojet with afterburner', topicId: 'u6-afterburner', kind: 'recreated', caption: 'Extra fuel burnt in the oxygen-rich turbine exhaust; nozzle area must open up.', bookFigure: 'Fig. 28.11', Render: () => <jp.TurbojetSketch afterburner /> },
  'turboprop': { title: 'Turboprop', topicId: 'u6-turboprop', kind: 'recreated', caption: 'Turbine drives a propeller through a reduction gearbox; most thrust from the propeller.', bookFigure: 'Fig. 28.6', Render: jp.TurbopropSketch },
  'turbofan': { title: 'Turbofan (supplementary)', topicId: 'u6-turboprop', kind: 'recreated', caption: 'Ducted fan with bypass flow; not in the syllabus list but shown for comparison.', bookFigure: 'Fig. 28.7', Render: jp.TurbofanSketch },
  'ramjet': { title: 'Ramjet', topicId: 'u6-ramjet-pulsejet', kind: 'recreated', caption: 'No moving parts: compression only by ram effect, so it needs a booster to start.', bookFigure: 'Fig. 28.3', Render: jp.RamjetSketch },
  'pulsejet': { title: 'Pulse jet', topicId: 'u6-ramjet-pulsejet', kind: 'recreated', caption: 'Flap valves and a resonant tail pipe give intermittent combustion.', bookFigure: 'Fig. 28.4', Render: jp.PulsejetSketch },
  'rockets': { title: 'Solid and liquid rockets', topicId: 'u6-rockets', kind: 'recreated', caption: 'Rockets carry their own oxidiser, so they work outside the atmosphere.', bookFigure: 'Figs 28.21–28.22', Render: jp.RocketSketch },
}

export const DIAGRAMS: Record<string, DiagramEntry> = Object.fromEntries(
  Object.entries(defs).map(([id, { Render, ...meta }]) => [id, { meta: { id, ...meta }, Render }]),
)

export const KIND_LABEL: Record<DiagramMeta['kind'], string> = {
  computed: 'Computed from the equations',
  recreated: 'Recreated illustration',
  qualitative: 'Qualitative sketch',
  interactive: 'Interactive',
}
