import type { Paper } from '../types'

const md = String.raw

const GAS_DYNAMICS =
  'Compressible flow (energy equation, flow regimes, nozzles and diffusers, stagnation properties) was part of the old ME211 scheme. It is not in the ME203n syllabus this desk follows.'

/**
 * ME211 End Semester Examination, May 2018 (Old Scheme, 4th semester, 70 marks) — transcribed
 * word for word from the scan (source/paper-2018-may.pdf). The marks per part are printed in
 * brackets after each question, e.g. (7,7).
 */
export const PAPER_2018: Paper = {
  id: 'official-2018-may',
  title: 'End Semester Examination, May 2018',
  session: 'May 2018 (Old Scheme)',
  blurb: 'An old-scheme 70-mark paper: Diesel cycle, Brayton maximum work, reheat-regenerative plant, compressible flow, compressors, rockets.',
  current: false,
  sourceFile: 'source/paper-2018-may.pdf',
  header: {
    semester: 'Fourth Semester',
    programme: 'B.Tech. (Branch - Mechanical)',
    exam: 'End Semester Examination',
    course: 'ME 211 Thermal Engineering-II',
    time: '3 hr',
    maxMarks: 70,
    note: ['Answer any FIVE questions. Assume missing data suitably if any.'],
  },
  attempt: 5,
  questions: [
    /* ---------------------------------------------------------------- Q1 */
    {
      number: 1,
      tag: '(7,7)',
      parts: [
        {
          id: 'p18-1a',
          label: 'a',
          marks: 7,
          prompt: md`Derive the expression for air standard cycle efficiency and mean effective pressure of diesel cycle.`,
          topicIds: ['u3-diesel'],
          answer: md`**Processes:** 1–2 isentropic compression, 2–3 constant-pressure heat addition, 3–4 isentropic expansion, 4–1 constant-volume heat rejection. Let $r = v_1/v_2$ and $\rho = v_3/v_2$.

**Temperatures:**
$$T_2 = T_1r^{\gamma-1}, \quad T_3 = \rho T_2 = \rho T_1r^{\gamma-1}, \quad T_4 = T_3\left(\frac{v_3}{v_4}\right)^{\gamma-1} = T_3\left(\frac{\rho}{r}\right)^{\gamma-1} = \rho^\gamma T_1$$

**Efficiency:**
$$\eta = 1 - \frac{c_v(T_4 - T_1)}{c_p(T_3 - T_2)} = 1 - \frac{T_1(\rho^\gamma - 1)}{\gamma T_1r^{\gamma-1}(\rho - 1)}$$
$$\boxed{\eta_{Diesel} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^\gamma - 1}{\gamma(\rho - 1)}}$$
The bracket is greater than 1, so at the same r the Diesel cycle is less efficient than the Otto cycle. Efficiency falls as the cut-off ratio grows.

**Mean effective pressure** $= w_{net}/(v_1 - v_2)$. The work of the four processes (with $p_3 = p_2$) is
$$w = p_2(v_3 - v_2) + \frac{p_3v_3 - p_4v_4}{\gamma - 1} - \frac{p_2v_2 - p_1v_1}{\gamma - 1}$$
Substitute $v_2 = v_1/r$, $v_3 = \rho v_1/r$, $p_2 = p_1r^\gamma$, $p_4 = p_1\rho^\gamma$:
$$\boxed{p_m = \frac{p_1r^\gamma\left[\gamma(\rho - 1) - r^{1-\gamma}(\rho^\gamma - 1)\right]}{(\gamma - 1)(r - 1)}}$$`,
          scheme: [
            { marks: 1, for: 'p-v and T-s diagrams' },
            { marks: 3, for: 'Temperatures in r and ρ, and efficiency expression' },
            { marks: 3, for: 'Net work over swept volume giving the mean effective pressure expression' },
          ],
        },
        {
          id: 'p18-1b',
          label: 'b',
          marks: 7,
          prompt: md`In an air standard diesel cycle the compression ratio is 16 and at the beginning of isentropic compression the initial pressure and temperature of air are 1 bar and 27° C respectively. Heat is added till the temp at the end of constant pressure is 1480° C. Determine (i) pressure and temperature at all salient points (ii) Cut off ratio (iii) heat supplied per kg of air (iv) air standard cycle efficiency (v) mean effective pressure.`,
          topicIds: ['u3-diesel'],
          answer: md`$c_p = 1.005$, $c_v = 0.718$, $R = 0.287$ kJ/kg K, γ = 1.4. $T_3 = 1753$ K.

**(i) Salient points**
| Point | p (bar) | T (K) |
|---|---|---|
| 1 | 1.00 | 300 |
| 2 | $16^{1.4} = 48.50$ | $300\times16^{0.4} = 909.4$ |
| 3 | 48.50 | 1753 |
| 4 | $p_1\rho^\gamma = 2.51$ | $T_3(\rho/r)^{0.4} = 751.9$ |

**(ii) Cut-off ratio:** $\rho = T_3/T_2 = 1753/909.4 = 1.928$

**(iii) Heat supplied:** $q_s = c_p(T_3 - T_2) = 1.005\times843.6 = 847.8$ kJ/kg

**(iv) Efficiency.** Heat rejected $q_r = c_v(T_4 - T_1) = 0.718\times451.9 = 324.4$ kJ/kg, so $w = 523.3$ kJ/kg and
$$\eta = \frac{523.3}{847.8} = 61.7\%$$
(The formula gives $1 - \frac{1}{3.031}\cdot\frac{1.928^{1.4} - 1}{1.4\times0.928} = 0.617$ ✓.)

**(v) Mean effective pressure**
$$v_1 = \frac{RT_1}{p_1} = 0.861\ \text{m}^3/\text{kg}, \qquad v_1 - v_2 = v_1\left(1 - \frac{1}{16}\right) = 0.807\ \text{m}^3/\text{kg}$$
$$p_m = \frac{523.3}{0.807} = 648\ \text{kPa} = 6.48\ \text{bar}$$`,
          scheme: [
            { marks: 2, for: 'Pressures and temperatures at points 1–4' },
            { marks: 1, for: 'Cut-off ratio ≈ 1.93' },
            { marks: 1, for: 'Heat supplied ≈ 848 kJ/kg' },
            { marks: 1.5, for: 'Efficiency ≈ 61.7%' },
            { marks: 1.5, for: 'Mean effective pressure ≈ 6.48 bar' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q2 */
    {
      number: 2,
      tag: '(7,7)',
      parts: [
        {
          id: 'p18-2a',
          label: 'a',
          marks: 7,
          prompt: md`Show that the maximum specific net work output of gas turbine cycle W_max = Cₚ (√T_max - √T_min)² where T_min and T_max are minimum and maximum temperature of brayton cycle.`,
          topicIds: ['u3-brayton', 'u5-operating'],
          answer: md`Ideal Brayton cycle with $T_1 = T_{min}$ (compressor inlet) and $T_3 = T_{max}$ (turbine inlet) fixed. Let $x = r_p^{(\gamma-1)/\gamma}$, so $T_2 = T_1x$ and $T_4 = T_3/x$.

**Net work:**
$$w = c_p(T_3 - T_4) - c_p(T_2 - T_1) = c_p\left[T_3 - \frac{T_3}{x} - T_1x + T_1\right]$$

**Maximise with respect to x:**
$$\frac{dw}{dx} = c_p\left[\frac{T_3}{x^2} - T_1\right] = 0 \;\Rightarrow\; x = \sqrt{\frac{T_3}{T_1}}$$
$\dfrac{d^2w}{dx^2} = -\dfrac{2c_pT_3}{x^3} < 0$, so this is a maximum.

This gives $T_2 = T_1x = \sqrt{T_1T_3} = T_3/x = T_4$: compressor-exit and turbine-exit temperatures are equal.

**Substitute back:**
$$w_{max} = c_p\left[T_3 - \sqrt{T_1T_3} - \sqrt{T_1T_3} + T_1\right] = c_p\left(T_3 - 2\sqrt{T_1T_3} + T_1\right)$$
$$\boxed{W_{max} = c_p\left(\sqrt{T_{max}} - \sqrt{T_{min}}\right)^2}$$

The corresponding pressure ratio is $r_{p,opt} = (T_{max}/T_{min})^{\gamma/2(\gamma-1)}$, and the efficiency at this point is $\eta = 1 - \sqrt{T_{min}/T_{max}}$.`,
          scheme: [
            { marks: 2, for: 'Net work in terms of T1, T3 and x' },
            { marks: 2, for: 'Differentiation giving x = √(T3/T1), with the maximum confirmed' },
            { marks: 2, for: 'Substitution leading to cp(√Tmax − √Tmin)²' },
            { marks: 1, for: 'T-s diagram and/or r_p,opt and T2 = T4 result' },
          ],
        },
        {
          id: 'p18-2b',
          label: 'b',
          marks: 7,
          prompt: md`Explain the working principle of turbo jet engine with a neat sketch and discuss the merits and demerits of turbo jet and ramjet engines.`,
          topicIds: ['u6-turbojet', 'u6-ramjet-pulsejet'],
          answer: md`**Turbojet (sketch: diffuser → compressor → combustor → turbine → nozzle, compressor and turbine on one shaft).** The diffuser slows the incoming air and raises its pressure. The compressor raises it further. Fuel burns in the combustor at constant pressure. The turbine extracts just enough work to drive the compressor. The nozzle expands the remaining gas into a high-velocity jet. Thrust $F = \dot m[(1+f)V_j - V]$, plus a pressure-thrust term if the nozzle is not perfectly expanded.

**Turbojet**
- *Merits:* produces static thrust, so it can take off on its own; works over a wide speed range from subsonic to about Mach 2.5 (with an afterburner); high thrust per unit frontal area; thrust can be raised further with an afterburner.
- *Demerits:* complex and costly (compressor, turbine); the turbine-inlet temperature limits the thrust; low propulsive efficiency and high fuel consumption at low speeds; noisy.

**Ramjet** (a duct only: supersonic diffuser, combustor with flame holders, nozzle)
- *Merits:* no moving parts, so simple, light and cheap; no turbine temperature limit; most efficient at Mach 2–5; high thrust-to-weight ratio.
- *Demerits:* zero static thrust, so it needs a booster or launch vehicle; poor efficiency below about Mach 1; high fuel consumption; combustion stability and flame-out problems; the intake must be designed for a narrow speed range.`,
          scheme: [
            { marks: 2, for: 'Neat labelled sketch of a turbojet' },
            { marks: 2, for: 'Working principle and thrust' },
            { marks: 1.5, for: 'Merits and demerits of the turbojet' },
            { marks: 1.5, for: 'Merits and demerits of the ramjet' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q3 */
    {
      number: 3,
      tag: '(5,9)',
      parts: [
        {
          id: 'p18-3a',
          label: 'a',
          marks: 5,
          prompt: md`Explain working principle of Gas turbine cycle with combined intercooling and reheating with neat sketch.`,
          topicIds: ['u5-reheat-intercool'],
          answer: md`**Sketch:** LP compressor → intercooler → HP compressor → combustion chamber → HP turbine → reheater → LP turbine → exhaust. Usually a regenerator is added between the HP compressor exit and the LP turbine exhaust.

**Working**
1. Air is compressed in the LP compressor to an intermediate pressure $p_x = \sqrt{p_1p_2}$.
2. The **intercooler** cools it at constant pressure back to (nearly) $T_1$. The HP compressor then works on cooler, denser air, so total compressor work falls; with ideal intercooling it is minimum and shared equally.
3. The air is heated in the combustion chamber to $T_{max}$ and expands in the HP turbine to an intermediate pressure.
4. The **reheater** adds heat at constant pressure back to $T_{max}$. The gas then expands in the LP turbine, giving more work because constant-pressure lines diverge on the T-s diagram.

**Effect:** both measures raise the net work and the **work ratio** a great deal, which reduces the plant's size and air rate. On their own they *lower* efficiency: the compressor exit is colder and the turbine exhaust hotter, so more heat is supplied and rejected. With a **regenerator** the hot exhaust preheats the cold compressed air, and the combination gives both high work and high efficiency, approaching Ericsson-cycle efficiency with many stages.

**T-s diagram:** a staircase of compressions and expansions between two pressure lines.`,
          scheme: [
            { marks: 2, for: 'Neat schematic and T-s diagram' },
            { marks: 2, for: 'Working of intercooling and reheating' },
            { marks: 1, for: 'Effect on work output, work ratio and efficiency (role of regeneration)' },
          ],
        },
        {
          id: 'p18-3b',
          label: 'b',
          marks: 9,
          prompt: md`A gas turbine power plant consists of single stage compressor and two stage turbine with a regenerator. A reheater is used between two stages of turbine. The air is taken to the compressor at 1 bar and 300 K and the maximum temperature in the cycle is limited to 1273 K. The pressure ratio is 8 and effectiveness of regenerator is 0.7. Find (i) Thermal efficiency of plant (ii) Plant Capacity in MW. Take mₐ = 200 kg/s; calorific value of fuel = 36850 kJ/kg. Don't neglect the fuel quantity.`,
          topicIds: ['u5-regeneration', 'u5-reheat-intercool'],
          answer: md`**Assumptions:** isentropic compression and expansion (no component efficiencies are given); $c_p = 1.005$ kJ/kg K and γ = 1.4 throughout; reheat to 1273 K at the optimum intermediate pressure $\sqrt{8} = 2.828$ bar.

**Compressor:** $T_2 = 300\times8^{0.2857} = 543.4$ K, $W_c = 200\times1.005\times243.4 = 48.93$ MW.

**Turbines:** each has a pressure ratio of 2.828, so $T_4 = T_6 = 1273/2.828^{0.2857} = 945.8$ K.

**Regenerator** (ε = 0.7): $T_5 = T_2 + 0.7(T_6 - T_2) = 543.4 + 0.7(402.4) = 825.1$ K.

**Fuel, combustion chamber:**
$$(\dot m_a + \dot m_{f1})c_p(1273 - 825.1) = \dot m_{f1}CV \;\Rightarrow\; \dot m_{f1} = \frac{200\times1.005\times447.9}{36850 - 1.005\times447.9} = 2.473\ \text{kg/s}$$

**Fuel, reheater:** gas flow is now 202.47 kg/s.
$$\dot m_{f2} = \frac{202.47\times1.005\times327.2}{36850 - 1.005\times327.2} = 1.823\ \text{kg/s}$$

**Turbine work:**
$$W_t = 202.47\times1.005\times327.2 + 204.30\times1.005\times327.2 = 66.58 + 67.17 = 133.75\ \text{MW}$$

**(ii) Plant capacity:**
$$P = W_t - W_c = 133.75 - 48.93 = 84.8\ \text{MW}$$

**(i) Thermal efficiency:**
$$\eta = \frac{84.82\times10^3}{(2.473 + 1.823)\times36850} = \frac{84\,820}{158\,310} = 53.6\%$$

With real compressor and turbine efficiencies (about 0.85) both figures would be much lower. State whatever efficiencies you assume.`,
          scheme: [
            { marks: 1.5, for: 'Assumptions stated; compressor exit temperature and work' },
            { marks: 1.5, for: 'Intermediate pressure and turbine exit temperatures' },
            { marks: 1, for: 'Regenerator exit temperature with ε = 0.7' },
            { marks: 2, for: 'Fuel flows in combustion chamber and reheater (fuel mass not neglected)' },
            { marks: 1.5, for: 'Turbine work and plant capacity ≈ 85 MW' },
            { marks: 1.5, for: 'Thermal efficiency ≈ 53.6%' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q4 */
    {
      number: 4,
      tag: '(8,6)',
      parts: [
        {
          id: 'p18-4a',
          label: 'a',
          marks: 8,
          prompt: md`Derive the adiabatic energy equation from fundamental principles and show the various regions of flow.`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`**SFEE** per kg between sections 1 and 2:
$$h_1 + \frac{V_1^2}{2} + gz_1 + q = h_2 + \frac{V_2^2}{2} + gz_2 + w$$
For an adiabatic flow ($q = 0$) with no shaft work ($w = 0$) and negligible elevation change:
$$h + \frac{V^2}{2} = \text{constant} = h_0 \qquad (\text{adiabatic energy equation})$$
This holds even with friction, as long as there is no heat transfer.

**For a perfect gas**, $h = c_pT = \dfrac{\gamma}{\gamma - 1}\dfrac{p}{\rho} = \dfrac{a^2}{\gamma - 1}$, so
$$\frac{a^2}{\gamma - 1} + \frac{V^2}{2} = \frac{a_0^2}{\gamma - 1} = \frac{V_{max}^2}{2} = \text{constant}$$
Here $a_0$ is the stagnation sound speed and $V_{max} = \sqrt{2c_pT_0}$ is the velocity reached when expanding to absolute zero.

**Steady-flow ellipse.** Dividing through gives
$$\frac{V^2}{V_{max}^2} + \frac{a^2}{a_0^2} = 1$$
an ellipse on V–a axes. The **regions of flow** marked on it:
1. **Incompressible** (M < 0.3): near the a-axis, with negligible density change.
2. **Subsonic** (0.3 < M < 1): compressibility matters.
3. **Transonic** (≈ 0.8 < M < 1.2): around the critical point $V = a = a^*$.
4. **Supersonic** (1 < M < 5).
5. **Hypersonic** (M > 5): near the V-axis, where V approaches $V_{max}$ and a is small.`,
          scheme: [
            { marks: 2, for: 'SFEE reduced to h + V²/2 = h0' },
            { marks: 2, for: 'Perfect-gas form in a, a0, Vmax' },
            { marks: 2, for: 'Steady-flow ellipse' },
            { marks: 2, for: 'Flow regions marked with Mach ranges' },
          ],
        },
        {
          id: 'p18-4b',
          label: 'b',
          marks: 6,
          prompt: md`An air jet at 500 K has sonic velocity. Determine (i) jet velocity (ii) stagnation temperature of jet (iii) maximum velocity of jet (iv) velocity of sound at stagnation conditions (v) stagnation enthalpy.`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`Air: γ = 1.4, R = 287 J/kg K, $c_p = 1005$ J/kg K. M = 1 at T = 500 K.

**(i) Jet velocity:**
$$V = a = \sqrt{1.4\times287\times500} = 448.2\ \text{m/s}$$

**(ii) Stagnation temperature:**
$$T_0 = T\left(1 + \frac{\gamma - 1}{2}M^2\right) = 500\times1.2 = 600\ \text{K}$$

**(iii) Maximum velocity** (expansion to T = 0):
$$V_{max} = \sqrt{2c_pT_0} = \sqrt{2\times1005\times600} = 1098\ \text{m/s}$$

**(iv) Sound speed at stagnation:**
$$a_0 = \sqrt{1.4\times287\times600} = 491.0\ \text{m/s}$$

**(v) Stagnation enthalpy** (measured from 0 K):
$$h_0 = c_pT_0 = 1.005\times600 = 603\ \text{kJ/kg}$$
(Equivalently $h_0 = V_{max}^2/2$.)`,
          scheme: [
            { marks: 1, for: 'Jet velocity = local sonic velocity ≈ 448 m/s' },
            { marks: 1.5, for: 'Stagnation temperature 600 K' },
            { marks: 1.5, for: 'Maximum velocity ≈ 1098 m/s' },
            { marks: 1, for: 'Stagnation sound speed ≈ 491 m/s' },
            { marks: 1, for: 'Stagnation enthalpy ≈ 603 kJ/kg' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q5 */
    {
      number: 5,
      tag: '(10,4)',
      parts: [
        {
          id: 'p18-5a',
          label: 'a',
          marks: 10,
          prompt: md`Derive the expression for area ratio dA / A as function of mach number and explain the expansion and compression in nozzle and diffuser.`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`**Assumptions:** steady, one-dimensional, isentropic flow of a perfect gas.

**Continuity:** $\rho AV$ = constant, so
$$\frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0 \qquad (1)$$

**Euler's equation:** $\dfrac{dp}{\rho} + V\,dV = 0$. With $dp = a^2\,d\rho$ (isentropic):
$$\frac{d\rho}{\rho} = -\frac{V\,dV}{a^2} = -M^2\frac{dV}{V} \qquad (2)$$

**Substitute (2) into (1):**
$$\boxed{\frac{dA}{A} = (M^2 - 1)\frac{dV}{V}}$$
Also, since $dp = -\rho V\,dV$:
$$\frac{dA}{A} = \frac{1 - M^2}{\rho V^2}\,dp$$

**Interpretation**
| Flow | To accelerate (nozzle: dV > 0, dp < 0) | To decelerate (diffuser: dV < 0, dp > 0) |
|---|---|---|
| Subsonic, M < 1 | dA < 0: **converging** | dA > 0: **diverging** |
| Supersonic, M > 1 | dA > 0: **diverging** | dA < 0: **converging** |
| M = 1 | dA = 0: throat | throat |

**Nozzle:** to expand a gas from rest to supersonic speed, the duct must first converge (subsonic acceleration), reach M = 1 at the **throat**, then diverge (supersonic acceleration). This is the convergent–divergent (de Laval) nozzle. A purely converging nozzle can reach at most M = 1 at its exit, and is then choked.

**Diffuser:** compression is the reverse. A supersonic stream is decelerated in a converging passage to M = 1 at the throat, then further in a diverging passage as subsonic flow. In practice a shock usually completes the transition.

**Physical reason:** in supersonic flow, density falls faster than velocity rises ($|d\rho/\rho| > |dV/V|$ when M > 1), so the area must *increase* to pass the same mass flow.`,
          scheme: [
            { marks: 2, for: 'Continuity in differential form' },
            { marks: 2, for: 'Euler equation with dp = a²dρ' },
            { marks: 2, for: 'Combining to dA/A = (M² − 1)dV/V' },
            { marks: 2, for: 'Nozzle: converging, throat, diverging explained' },
            { marks: 2, for: 'Diffuser behaviour (sub- and supersonic) with sketches' },
          ],
        },
        {
          id: 'p18-5b',
          label: 'b',
          marks: 4,
          prompt: md`Explain the working principle of centrifugal compressor with a neat sketch.`,
          topicIds: ['u2-construction'],
          answer: md`**Sketch:** inlet eye; impeller with radial vanes on the shaft; vaneless space; vaned diffuser; volute casing; delivery.

**Working:** air enters the impeller eye axially and turns radially. The fast-spinning impeller does work on the air, $w = V_{w2}U_2$ per kg with radial entry, raising both its velocity and its static pressure (centrifugal action). In the **diffuser** the widening passages slow the air and convert kinetic energy into pressure. The **volute** collects the air and diffuses it further before delivery.

Roughly half of the pressure rise occurs in the impeller and half in the diffuser and volute. One stage gives a pressure ratio of about 4.`,
          scheme: [
            { marks: 2, for: 'Neat labelled sketch' },
            { marks: 2, for: 'Working: energy transfer in the impeller, diffusion in the diffuser and volute' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q6 */
    {
      number: 6,
      tag: '(7,7)',
      parts: [
        {
          id: 'p18-6a',
          label: 'a',
          marks: 7,
          prompt: md`Derive the expression for work done required on (i) single stage reciprocating compressor (ii) multi stage reciprocating compressor`,
          topicIds: ['u1-processes', 'u1-multistage'],
          answer: md`**(i) Single stage, no clearance, polytropic $pV^n = C$.** The cycle is: suction 4–1 at $p_1$, compression 1–2, delivery 2–3 at $p_2$. The work is the area of the p-V diagram:
$$W = p_2V_2 + \frac{p_2V_2 - p_1V_1}{n - 1} - p_1V_1 = \frac{n}{n - 1}(p_2V_2 - p_1V_1)$$
Using $V_2 = V_1(p_1/p_2)^{1/n}$:
$$\boxed{W = \frac{n}{n - 1}p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n - 1}{n}} - 1\right] = \frac{n}{n - 1}mRT_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n - 1}{n}} - 1\right]}$$
For isothermal compression, $W = p_1V_1\ln(p_2/p_1)$, the minimum. With clearance the same expression holds with $V_1 - V_4$ (the volume actually induced).

**(ii) Multi-stage** with z stages, the same n in each, and perfect intercooling (to $T_1$ after every stage). Then $p_1V_1 = p_2V_2' = \dots = mRT_1$, and
$$W = \frac{n}{n - 1}p_1V_1\left[\left(\frac{p_2}{p_1}\right)^k + \left(\frac{p_3}{p_2}\right)^k + \dots + \left(\frac{p_{z+1}}{p_z}\right)^k - z\right], \qquad k = \frac{n - 1}{n}$$
This is minimum when all stage ratios are equal, $p_{i+1}/p_i = (p_{z+1}/p_1)^{1/z}$:
$$\boxed{W_{min} = \frac{z\,n}{n - 1}p_1V_1\left[\left(\frac{p_{z+1}}{p_1}\right)^{\frac{n - 1}{z\,n}} - 1\right]}$$
Each stage does equal work, and the intercoolers remove equal heat. For two stages, $p_2 = \sqrt{p_1p_3}$.`,
          scheme: [
            { marks: 1, for: 'p-V diagram of the single-stage cycle' },
            { marks: 2.5, for: 'Single-stage polytropic work derivation (and isothermal case)' },
            { marks: 1, for: 'Multi-stage p-V diagram with intercooling' },
            { marks: 2.5, for: 'Multi-stage work, equal-ratio condition and minimum work expression' },
          ],
        },
        {
          id: 'p18-6b',
          label: 'b',
          marks: 7,
          prompt: md`Air is compressed in a single stage reciprocating compressor through a pressure ratio of 10 from a pressure at 1 bar. Determine the power required for a FAD of 3 m³ / min. Determine the speed if the swept volume is 14.2 litres and the clearance volume is 6% of swept volume. Assume n= 1.3`,
          topicIds: ['u1-clearance'],
          answer: md`Take the FAD (free air delivered) as measured at the suction state, 1 bar.

**Power**
$$P = \frac{n}{n - 1}p_1\dot V\left[r^{(n-1)/n} - 1\right] = \frac{1.3}{0.3}\times100\times3\times\left[10^{0.2308} - 1\right]$$
$$= 4.333\times300\times0.7013 = 911.6\ \text{kJ/min} = 15.2\ \text{kW}$$

**Volumetric efficiency** (c = 0.06):
$$\eta_v = 1 + c - c\,r^{1/n} = 1.06 - 0.06\times10^{1/1.3} = 1.06 - 0.06\times5.878 = 0.707$$

**Speed** (single acting: one delivery per revolution):
$$\dot V = \eta_vV_sN \;\Rightarrow\; N = \frac{3}{0.707\times0.0142} = 299\ \text{rpm} \approx 300\ \text{rpm}$$`,
          scheme: [
            { marks: 3, for: 'Power ≈ 15.2 kW from the polytropic work with FAD' },
            { marks: 2, for: 'Volumetric efficiency ≈ 0.707 with clearance' },
            { marks: 2, for: 'Speed ≈ 299 rpm' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q7 */
    {
      number: 7,
      stem: md`Explain the following`,
      tag: '(7,7)',
      parts: [
        {
          id: 'p18-7a',
          label: 'a',
          marks: 7,
          prompt: md`surging and choking of compressor`,
          topicIds: ['u2-surging'],
          answer: md`**Characteristic:** pressure ratio against mass flow (or $\dot m\sqrt{T_{01}}/p_{01}$) for several constant speeds, with efficiency contours. Each speed line rises to a peak and then falls. The **surge line** joins the peaks; the **choke** limit is where the lines turn vertical.

**Surging.** Suppose the compressor runs at a fixed speed and the delivery valve is closed in. The flow drops, and the operating point moves left along the curve. Beyond the peak, any further fall in flow *lowers* the pressure the compressor can generate. The delivery system's pressure is now higher than the compressor can hold, so the flow momentarily reverses, which drops the delivery pressure. The compressor then picks up and pumps again, and the process repeats.
- *Effects:* violent pulsation of flow and pressure, noise, vibration, heating, blade stresses and possible failure; output falls.
- *Causes:* operating at low flow or high pressure ratio; stalling of the impeller or diffuser vanes (rotating stall); poor matching with the turbine.
- *Prevention:* keep a surge margin; blow-off or bleed valves; variable inlet guide vanes and variable diffuser vanes; recirculation; anti-surge control.

**Choking.** As the flow increases at constant speed, the velocity at the minimum flow area (the inducer throat or diffuser throat) reaches the local sound speed. Mass flow then reaches its maximum value: further lowering of the back pressure cannot increase it, and the speed line becomes vertical. Pressure ratio and efficiency fall steeply near choke because of large incidence losses and shocks.

The stable working range lies between the surge line and the choke line. It narrows at high speeds, which is why compressors are run on a working line well inside it.`,
          scheme: [
            { marks: 2, for: 'Compressor characteristic showing surge line and choke limit' },
            { marks: 3, for: 'Surging: mechanism, effects and prevention' },
            { marks: 2, for: 'Choking: sonic throat, maximum mass flow, effect on performance' },
          ],
        },
        {
          id: 'p18-7b',
          label: 'b',
          marks: 7,
          prompt: md`Rocket propulsion`,
          topicIds: ['u6-rockets'],
          answer: md`**Principle:** Newton's third law. A rocket carries both fuel and oxidiser, so it needs no atmospheric air and works in space. The propellants burn in the combustion chamber at high pressure and temperature, and the gases expand through a convergent–divergent nozzle to a very high exit velocity $V_e$, often 2000–4500 m/s. The reaction to the momentum of the ejected gas is the thrust:
$$F = \dot m_pV_e + (p_e - p_a)A_e$$
Thrust does not depend on flight speed.

**Performance parameters**
- **Specific impulse** $I_{sp} = F/(\dot m_p g_0)$, in seconds (about 250 s for solids, 450 s for LH₂/LOX).
- **Effective exhaust velocity** $c = F/\dot m_p$.
- **Propulsive efficiency** $\eta_p = \dfrac{2(V/c)}{1 + (V/c)^2}$, which is maximum when $V = c$.
- **Rocket equation:** $\Delta V = c\ln(m_0/m_f)$.

**Types**
1. **Solid-propellant rockets:** grain (double-base or composite) cast in the casing; simple, storable, reliable; cannot be throttled or stopped.
2. **Liquid-propellant rockets:** separate fuel and oxidiser tanks, with pumps or pressure feed; can be throttled, stopped and restarted; regenerative nozzle cooling; complex.
3. **Hybrid rockets:** solid fuel with a liquid oxidiser.
4. Also nuclear, electric (ion) and solar rockets for space.

**Applications:** space launch vehicles, satellites, missiles, JATO (jet-assisted take-off) and sounding rockets.

**Compared with air-breathing engines:** no altitude limit and very high thrust, but very high propellant consumption and a short burning time.`,
          scheme: [
            { marks: 2, for: 'Principle and thrust equation with sketch of chamber and nozzle' },
            { marks: 2, for: 'Performance parameters (specific impulse, propulsive efficiency)' },
            { marks: 2, for: 'Types: solid, liquid (and hybrid) with features' },
            { marks: 1, for: 'Applications or comparison with air-breathing engines' },
          ],
        },
      ],
    },
  ],
}
