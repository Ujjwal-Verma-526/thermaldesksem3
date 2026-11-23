import type { Unit } from './types'

/**
 * Units and syllabus text, transcribed from the official syllabus image
 * (source/syllabus.png). Spacing has been restored where the image ran words together;
 * wording is otherwise verbatim. Units 3 and 5 are highlighted on the user's copy.
 */
export const UNITS: Unit[] = [
  {
    id: 'u1',
    number: 1,
    title: 'Reciprocating Air Compressor',
    hours: 6,
    syllabus:
      'Reciprocating Air Compressor: Steady flow analysis, isothermal, adiabatic and polytropic compression; single- and multi-stage compression, ideal intermediate pressure; compressor clearance, volumetric and isothermal efficiency; minimum work requirement of a compressor.',
    chapterNote: 'Fully covered by Chapter 25 (Reciprocating Air Compressor).',
    refs: [{ chapter: 25, pages: '838–889' }],
  },
  {
    id: 'u2',
    number: 2,
    title: 'Centrifugal Compressor',
    hours: 5,
    syllabus:
      'Centrifugal compressor: Velocity diagrams, efficiency of compressor stage, choice of reaction stage pressure rise, surging, multi-stage compressor, compressor performance, vacuum pump.',
    chapterNote:
      'Chapter 26 §26.5 covers the centrifugal compressor well. Multistage centrifugal compressors get only a passing mention and vacuum pumps are not treated — both are flagged as supplementary.',
    refs: [{ chapter: 26, section: '§26.5', pages: '898–905' }],
  },
  {
    id: 'u3',
    number: 3,
    title: 'Gas Power Cycles',
    hours: 7,
    syllabus:
      'Gas Power Cycles: Air standard cycle, Otto, Diesel and dual cycles, P-V and T-S diagrams of these cycles, efficiency, mean effective pressure. Comparison of Otto, Diesel, dual cycles for same compression ratio and heat input, Stirling cycles, Ericsson cycle, Atkinson cycle, basic gas turbine cycle (Brayton cycle) for open and closed systems, efficiency of gas turbine cycle.',
    chapterNote: 'Fully covered by Chapter 11 (Gas Power Cycles). The Lenoir cycle (§11.10) is in the book but not in the syllabus.',
    refs: [{ chapter: 11, pages: '332–379' }],
  },
  {
    id: 'u4',
    number: 4,
    title: 'Introduction to I.C. Engines',
    hours: 9,
    syllabus:
      'Introduction to I.C. Engines: Classification; two and four stroke, SI and CI engines parts, working principle and valve and port timing diagram, Principles of combustion, knocking and emissions in SI engine, theory of detonation, Principles of combustion, knocking and emissions in CI engine.',
    chapterNote:
      'Chapter 24 covers classification, parts, working, timing diagrams and combustion stages. Emissions, CI knock and the factors affecting detonation are not treated in the book and are flagged as supplementary. Carburation, ignition, cooling, lubrication and performance (§24.8–24.20) are outside this syllabus.',
    refs: [{ chapter: 24, pages: '779–803' }],
  },
  {
    id: 'u5',
    number: 5,
    title: 'Gas Turbines',
    hours: 9,
    syllabus:
      'Gas Turbines: Simple open and close cycle gas turbine, efficiency and specific output of simple cycle, effects of regeneration, re-heating and intercooling on efficiency and work output, effect of operating variables on thermal efficiency, air rate, work ratio; water injection, Advantages and disadvantages of gas turbine; gas turbine components, performance and application of gas turbine.',
    chapterNote:
      'Chapter 27 (Gas Turbine Plant) with Chapter 11 §11.12 for the effect of pressure ratio, work ratio and air rate. Water injection for stationary gas turbines and a dedicated components section are not in the book — flagged as supplementary.',
    refs: [
      { chapter: 27, pages: '924–962' },
      { chapter: 11, section: '§11.12', pages: '364–368' },
    ],
  },
  {
    id: 'u6',
    number: 6,
    title: 'Jet Propulsion',
    hours: 6,
    syllabus:
      'Jet Propulsion: Introduction to jet propulsion, advantages and disadvantages of jet propulsion, turbojet engine with and without afterburner, turboprop, ramjet, pulsejet, rocket engines – operation, solid and Liquid propellants.',
    chapterNote: 'Fully covered by Chapter 28 (Jet and Rocket Propulsions).',
    refs: [{ chapter: 28, pages: '963–1000' }],
  },
]

export const TOTAL_HOURS = UNITS.reduce((s, u) => s + u.hours, 0)

export const BOOK = {
  title: 'Thermal Engineering',
  author: 'Mahesh M. Rathore',
  publisher: 'Tata McGraw-Hill',
  year: 2010,
  short: 'Rathore',
}
