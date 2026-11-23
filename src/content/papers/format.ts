import type { Paper } from '../types'

/**
 * The ME203n end-term format, taken from the November 2024 and November 2025 papers:
 * 7 questions of (a) 4 + (b) 4 marks, answer any five, 40 marks in 3 hours. Every generated and
 * predicted paper follows it, and `npm run validate` enforces it.
 */
export const ME203N_FORMAT = { questions: 7, attempt: 5, questionMarks: 8, maxMarks: 40 } as const

export const ME203N_HEADER: Paper['header'] = {
  semester: 'III Semester',
  programme: 'B. Tech, Mechanical Engineering',
  exam: 'End Term Examination',
  course: 'ME 203n, Thermal Engineering II',
  time: '3:00 Hours',
  maxMarks: 40,
  note: [
    'i) Answer any five questions.',
    'ii) Draw neat diagram (appropriately labelled), whenever required.',
    'iii) Assume missing data, if any. For air take cₚ = 1.005 kJ/kg K, cᵥ = 0.718 kJ/kg K, γ = 1.4, R = 0.287 kJ/kg K.',
  ],
}
