import type { Paper } from '../types'
import { ME203N_HEADER } from './format'

const md = String.raw

/**
 * Predicted papers 1–2. Built to the ME203n format of the Nov 2024 and Nov 2025 papers. Every
 * part says which official question it shadows and why it is likely (`alignsWith`). The data in
 * the numericals are new, and every answer was solved and checked numerically.
 */
export const PREDICTED_A: Paper[] = [
  /* ================================================================== P1 */
  {
    id: 'predicted-1',
    kind: 'predicted',
    title: 'Predicted Paper 1',
    session: 'Predicted · most likely',
    blurb: 'The highest-frequency pattern: Diesel derivation + Otto numerical, gas turbine with fuel, port timing, CI combustion, turboprop and turbojet thrust, two-stage compressor, centrifugal pressure ratio, short notes.',
    current: true,
    header: ME203N_HEADER,
    attempt: 5,
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'x1-1a',
            label: 'a',
            marks: 4,
            prompt: md`With the help of p-v and T-s diagrams, derive an expression for the air standard efficiency of the Diesel cycle in terms of compression ratio and cut-off ratio.`,
            topicIds: ['u3-diesel'],
            alignsWith: 'Q1(a) has been an air-standard derivation every year: Otto in Nov 2025, Dual in Nov 2024. The Diesel cycle is the one of the three not yet derived in ME203n (it was May 2018 Q1(a) under the old code).',
            answer: md`**Processes:** 1–2 isentropic compression, 2–3 constant-pressure heat addition, 3–4 isentropic expansion, 4–1 constant-volume heat rejection. Let $r = v_1/v_2$ and $\rho = v_3/v_2$.

$$q_s = c_p(T_3 - T_2), \qquad q_r = c_v(T_4 - T_1)$$

**Temperatures:**
$$T_2 = T_1r^{\gamma-1}, \qquad T_3 = \rho T_2 = \rho T_1r^{\gamma-1}$$
$$T_4 = T_3\left(\frac{v_3}{v_4}\right)^{\gamma-1} = \rho T_1r^{\gamma-1}\left(\frac{\rho}{r}\right)^{\gamma-1} = \rho^\gamma T_1$$

**Efficiency:**
$$\eta = 1 - \frac{c_v(T_4 - T_1)}{c_p(T_3 - T_2)} = 1 - \frac{T_1(\rho^\gamma - 1)}{\gamma T_1r^{\gamma-1}(\rho - 1)}$$
$$\boxed{\eta_{Diesel} = 1 - \frac{1}{r^{\gamma-1}}\left[\frac{\rho^\gamma - 1}{\gamma(\rho - 1)}\right]}$$

The bracket is greater than 1 for ρ > 1, so at equal r the Diesel cycle is less efficient than the Otto cycle. Efficiency falls as the load (ρ) increases.`,
            scheme: [
              { marks: 1, for: 'p-v and T-s diagrams' },
              { marks: 1, for: 'Heat supplied and rejected' },
              { marks: 1.5, for: 'Temperatures in terms of T1, r and ρ' },
              { marks: 0.5, for: 'Final expression and comment' },
            ],
          },
          {
            id: 'x1-1b',
            label: 'b',
            marks: 4,
            prompt: md`An engine working on the Otto cycle has a cylinder bore of 150 mm, a stroke of 200 mm and a clearance volume of 0.5 litre. At the beginning of compression the air is at 1 bar and 27°C, and the maximum pressure in the cycle is 45 bar. Determine (i) the compression ratio, (ii) the air standard efficiency, (iii) the heat added per cycle and (iv) the mean effective pressure.`,
            topicIds: ['u3-otto'],
            alignsWith: 'Q1(b) has been a cycle numerical set from bore, stroke and clearance in both ME203n papers (Diesel both times). An Otto version with the same set-up is the natural rotation.',
            answer: md`**(i) Compression ratio**
$$V_s = \frac{\pi}{4}(0.15)^2(0.2) = 3.534\ \text{L}, \qquad r = \frac{V_s + V_c}{V_c} = \frac{4.034}{0.5} = 8.07$$

**(ii) Efficiency**
$$\eta = 1 - \frac{1}{r^{0.4}} = 1 - \frac{1}{8.07^{0.4}} = 56.6\%$$

**(iii) Heat added per cycle.** Mass of air:
$$m = \frac{p_1V_1}{RT_1} = \frac{100\times4.034\times10^{-3}}{0.287\times300} = 4.686\times10^{-3}\ \text{kg}$$
End of compression: $T_2 = 300\times8.07^{0.4} = 691.6$ K and $p_2 = 8.07^{1.4} = 18.60$ bar.
Constant-volume heating to 45 bar: $T_3 = T_2\dfrac{p_3}{p_2} = 691.6\times\dfrac{45}{18.60} = 1673$ K.
$$Q_s = mc_v(T_3 - T_2) = 4.686\times10^{-3}\times0.718\times981.6 = 3.30\ \text{kJ}$$

**(iv) Mean effective pressure**
$$W = \eta Q_s = 1.870\ \text{kJ}, \qquad p_m = \frac{W}{V_s} = \frac{1.870}{3.534\times10^{-3}} = 529\ \text{kPa} = 5.29\ \text{bar}$$`,
            scheme: [
              { marks: 1, for: 'Swept volume and r ≈ 8.07' },
              { marks: 0.5, for: 'Efficiency ≈ 56.6%' },
              { marks: 1.5, for: 'Mass, T2, T3 and heat added ≈ 3.30 kJ' },
              { marks: 1, for: 'Work and MEP ≈ 5.29 bar' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'x1-2a',
            label: 'a',
            marks: 4,
            prompt: md`Draw the schematic and T-s diagram of a gas turbine plant with intercooling. Explain the effect of intercooling on the work output and thermal efficiency of the plant.`,
            topicIds: ['u5-reheat-intercool'],
            alignsWith: 'Nov 2025 Q2(b) asked the reheat-cycle schematic and T-s. Intercooling is its exact counterpart and the next theory part in the same syllabus line ("effects of regeneration, re-heating and intercooling").',
            answer: md`**Schematic:** LP compressor (1–2) → intercooler (2–3, cooled at constant pressure back to about $T_1$) → HP compressor (3–4) → combustion chamber (4–5) → turbine (5–6) → exhaust.

**T-s diagram:** two compression steps separated by a constant-pressure cooling line. The optimum intermediate pressure is $p_2 = \sqrt{p_1p_4}$ with cooling to $T_1$.

**Effect on work output.** The work of compressing between two pressures is proportional to the inlet temperature, $w = c_pT_{in}(r^{(\gamma-1)/\gamma} - 1)$. Cooling between stages lowers the HP-stage inlet temperature, so the total compressor work falls. The turbine work is unchanged, so the **net work and work ratio increase** considerably. For the same output the plant is smaller and has a lower air rate.

**Effect on efficiency.** The HP compressor now delivers colder air ($T_4 < T_2$ of the single-stage cycle). The combustion chamber must supply extra heat $c_p(T_{4,single} - T_4)$, which is added at the lowest temperatures in the cycle. So, **without regeneration, efficiency falls slightly**. With a regenerator the cold compressed air is preheated by the exhaust, and intercooling then *raises* efficiency. Many stages of intercooling, reheating and regeneration approach the Ericsson cycle.`,
            scheme: [
              { marks: 1.5, for: 'Schematic and T-s diagram with intercooling' },
              { marks: 1.5, for: 'Effect on compressor work, net work and work ratio' },
              { marks: 1, for: 'Effect on efficiency with and without regeneration' },
            ],
          },
          {
            id: 'x1-2b',
            label: 'b',
            marks: 4,
            prompt: md`A gas turbine plant takes in air at 1 bar and 15°C and compresses it through a pressure ratio of 8 with an isentropic efficiency of 85%. The gases enter the turbine at 1200 K and expand to 1 bar with an isentropic efficiency of 88%. The calorific value of the fuel is 42000 kJ/kg. Taking cₚ = 1.005 kJ/kg K and γ = 1.4 throughout and allowing for the mass of fuel, calculate (i) the air–fuel ratio, (ii) the net work per kg of air, (iii) the thermal efficiency and (iv) the power output for an air flow of 20 kg/s.`,
            topicIds: ['u5-simple'],
            alignsWith: 'Nov 2025 Q2(a) was a simple-cycle gas turbine with a compressor efficiency and a given fuel–air ratio. Asking for the fuel–air ratio instead, with both component efficiencies, is the natural inversion of it.',
            answer: md`$8^{0.2857} = 1.811$.

**Compressor:** $T_{2s} = 288\times1.811 = 521.7$ K, $T_2 = 288 + \dfrac{233.7}{0.85} = 562.9$ K, $w_c = 1.005\times274.9 = 276.3$ kJ/kg.

**(i) Fuel–air ratio:**
$$(1 + f)c_p(T_3 - T_2) = f\,CV \;\Rightarrow\; f = \frac{1.005\times637.1}{42000 - 640.3} = 0.01548$$
$$A/F = 64.6$$

**Turbine:** $T_{4s} = 1200/1.811 = 662.5$ K, $T_4 = 1200 - 0.88\times537.5 = 727.0$ K.
$$w_t = (1 + f)c_p(T_3 - T_4) = 1.01548\times1.005\times473.0 = 482.8\ \text{kJ/kg air}$$

**(ii) Net work:** $w_{net} = 482.8 - 276.3 = 206.5$ kJ/kg air.

**(iii) Efficiency:**
$$\eta = \frac{206.5}{f\,CV} = \frac{206.5}{650.2} = 31.8\%$$
Work ratio $= 206.5/482.8 = 0.43$.

**(iv) Power:** $20\times206.5 = 4130$ kW $\approx 4.13$ MW.`,
            scheme: [
              { marks: 1, for: 'Compressor exit temperature and work' },
              { marks: 1, for: 'Fuel–air ratio from the combustion-chamber balance' },
              { marks: 1, for: 'Turbine exit temperature and work including fuel mass' },
              { marks: 1, for: 'Net work, efficiency ≈ 31.8% and power ≈ 4.13 MW' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'x1-3a',
            label: 'a',
            marks: 4,
            prompt: md`Draw the port timing diagram of a two-stroke petrol engine and compare it with the valve timing diagram of a four-stroke petrol engine.`,
            topicIds: ['u4-timing', 'u4-two-stroke'],
            alignsWith: 'A timing diagram appeared in both ME203n papers (Nov 2025 Q3(b) actual vs ideal; Nov 2024 Q7(a) four-stroke petrol). Port timing is the half of the syllabus line ("valve and port timing diagram") not yet asked.',
            answer: md`**Two-stroke port timing (circle diagram, symmetric about the dead centres because the piston opens and closes the ports):**
- Inlet (crankcase) port: opens about 55° before TDC, closes about 55° after TDC
- Ignition: about 20° before TDC
- Exhaust port: opens about 60° before BDC, closes about 60° after BDC
- Transfer port: opens about 45° before BDC, closes about 45° after BDC
- Exhaust opens before transfer (blow-down), then the two overlap for scavenging

**Comparison**

| Two-stroke port timing | Four-stroke valve timing |
|---|---|
| Cycle completed in 360° | Cycle completed in 720° (two circles or a spiral) |
| Ports opened and closed by the piston, so the diagram is **symmetric** about TDC/BDC | Valves operated by cams; events can be placed freely and are unsymmetric (e.g. IVO 10° bTDC, IVC 40° aBDC) |
| Exhaust and transfer overlap around BDC; large charge loss | Overlap around TDC is small (10–30°) |
| Effective compression and expansion strokes are short (ports occupy part of the stroke) | Nearly full strokes for each process |
| No separate suction or exhaust stroke | Separate suction and exhaust strokes |

Because two-stroke timing is fixed by port geometry, it cannot be optimised separately for opening and closing. This is one reason for its poorer scavenging and fuel economy.`,
            scheme: [
              { marks: 2, for: 'Two-stroke port timing diagram with all port events' },
              { marks: 2, for: 'Comparison with four-stroke valve timing (symmetry, 360° vs 720°, overlap)' },
            ],
          },
          {
            id: 'x1-3b',
            label: 'b',
            marks: 4,
            prompt: md`Explain the stages of combustion in a CI engine with the help of a pressure–crank angle diagram. Discuss the factors affecting the delay period.`,
            topicIds: ['u4-ci-combustion'],
            alignsWith: 'CI combustion was a Nov 2025 short note (Q7 ii) and CI knock was Nov 2024 Q4(b). A full question on its stages with the delay-period factors is the obvious next step.',
            answer: md`**p–θ diagram:** start of injection A (about 15–20° bTDC), start of combustion B, peak pressure C, end of injection D, end of combustion E.

1. **Ignition delay (A–B):** fuel is injected but not yet burning. There is a *physical* delay (atomisation, vaporisation, mixing) and a *chemical* delay (pre-flame reactions).
2. **Rapid (uncontrolled) combustion (B–C):** the fuel accumulated during the delay ignites together, giving a steep pressure rise. The rate depends on the length of the delay.
3. **Controlled combustion (C–D):** fuel burns about as fast as it is injected; the pressure is roughly constant.
4. **After-burning (D–E):** remaining fuel burns during expansion.

**Factors affecting the delay period**
- **Cetane number:** higher cetane means shorter delay.
- **Compression ratio:** higher r gives higher air temperature, so a shorter delay.
- **Intake temperature and pressure (supercharging):** higher values give a shorter delay.
- **Engine speed:** delay in ms falls slightly with speed, but delay in crank degrees rises.
- **Load:** higher load gives hotter walls and a shorter delay.
- **Injection timing:** too early or too late (air cooler) lengthens the delay; the optimum is about 15–20° bTDC.
- **Atomisation, injection pressure and air swirl:** finer spray and more swirl give a shorter delay.
- **Coolant temperature:** colder walls give a longer delay.

A long delay leads to a steep pressure rise and diesel knock.`,
            scheme: [
              { marks: 1, for: 'p–θ diagram with the stages marked' },
              { marks: 1.5, for: 'Explanation of the four stages' },
              { marks: 1.5, for: 'Factors affecting delay with their direction of effect' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'x1-4a',
            label: 'a',
            marks: 4,
            prompt: md`With a neat sketch explain the working of a turboprop engine. Compare it with a turbojet engine.`,
            topicIds: ['u6-turboprop'],
            alignsWith: 'A jet engine with a sketch is asked every year (turbojet in Nov 2024 Q3(a) and Nov 2025 Q4(a)). The turboprop is the syllabus engine never yet asked in ME203n.',
            answer: md`**Sketch:** propeller ← reduction gearbox ← shaft ← (diffuser, compressor, combustion chamber, turbine with extra stages) → exhaust nozzle.

**Working:** air entering through the diffuser is compressed and burnt with fuel, as in a turbojet. The turbine, however, has more stages and expands the gases almost to atmospheric pressure. It produces enough power to drive both the compressor *and*, through a reduction gearbox (about 10–15 : 1), a large propeller. The propeller accelerates a very large mass of air by a small amount and gives about 80–90% of the thrust. The residual exhaust jet gives the remaining 10–20%.

**Comparison**

| Turboprop | Turbojet |
|---|---|
| Most thrust from the propeller; a little from the jet | All thrust from the jet |
| Large mass flow, small velocity increase, so high propulsive efficiency at low speed | Small mass flow, high jet velocity, so efficient only at high speed |
| Best below about 700 km/h; propeller-tip compressibility limits speed | Suitable for 800–2000+ km/h |
| High take-off thrust; short runways | Poor take-off thrust |
| Lower fuel consumption on short and medium routes | Higher fuel consumption at low speed |
| Heavy gearbox and propeller; more complex; noisy and vibrating | Simpler, lighter per unit thrust at high speed |
| Regional transport and cargo aircraft | Military jets, high-speed aircraft |`,
            scheme: [
              { marks: 1.5, for: 'Labelled sketch with gearbox and propeller' },
              { marks: 1, for: 'Working and thrust split' },
              { marks: 1.5, for: 'Comparison with the turbojet' },
            ],
          },
          {
            id: 'x1-4b',
            label: 'b',
            marks: 4,
            prompt: md`A turbojet aircraft flies at 850 km/h. The engine takes in 50 kg/s of air, uses a fuel–air ratio of 0.012 and discharges the gases at 600 m/s relative to the aircraft, with the nozzle fully expanded. The calorific value of the fuel is 43 MJ/kg. Calculate (i) the thrust, (ii) the thrust power, (iii) the propulsive efficiency, (iv) the thermal efficiency and (v) the overall efficiency.`,
            topicIds: ['u6-turbojet', 'u6-intro'],
            alignsWith: 'Both ME203n papers asked jet theory only (working, ramjet comparison, propellants). Rathore has a full set of turbojet thrust and efficiency problems, so the numerical is the likely next form of the jet question.',
            answer: md`$V = 850/3.6 = 236.1$ m/s, $V_j = 600$ m/s, $\dot m_a = 50$ kg/s, $\dot m_f = 0.6$ kg/s.

**(i) Thrust**
$$F = \dot m_a\left[(1 + f)V_j - V\right] = 50\left[1.012\times600 - 236.1\right] = 18\,555\ \text{N} \approx 18.6\ \text{kN}$$

**(ii) Thrust power:** $FV = 18\,555\times236.1 = 4.38$ MW.

**(iii) Propulsive efficiency** = thrust power / rate of kinetic-energy increase:
$$\Delta KE = \frac{\dot m_a}{2}\left[(1 + f)V_j^2 - V^2\right] = 25\left[1.012\times600^2 - 236.1^2\right] = 7.71\ \text{MW}$$
$$\eta_p = \frac{4.38}{7.71} = 56.8\%$$
(Neglecting f: $2V/(V + V_j) = 56.5\%$.)

**(iv) Thermal efficiency:**
$$\eta_{th} = \frac{\Delta KE}{\dot m_f\,CV} = \frac{7.71}{0.6\times43} = \frac{7.71}{25.8} = 29.9\%$$

**(v) Overall efficiency:**
$$\eta_o = \eta_p\,\eta_{th} = \frac{4.38}{25.8} = 17.0\%$$`,
            scheme: [
              { marks: 1, for: 'Thrust ≈ 18.6 kN' },
              { marks: 0.5, for: 'Thrust power ≈ 4.38 MW' },
              { marks: 1, for: 'Propulsive efficiency ≈ 57%' },
              { marks: 1, for: 'Thermal efficiency ≈ 30%' },
              { marks: 0.5, for: 'Overall efficiency ≈ 17%' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'x1-5a',
            label: 'a',
            marks: 4,
            prompt: md`Define volumetric efficiency of a reciprocating air compressor. Derive an expression for it in terms of clearance ratio, pressure ratio and index of expansion. What factors reduce it in practice?`,
            topicIds: ['u1-clearance'],
            alignsWith: 'Nov 2024 Q5(a) was a reciprocating-compressor derivation (optimum intermediate pressure) and Nov 2024 Q5(b) hinged on clearance. The volumetric-efficiency derivation is the other standard derivation in the same unit.',
            answer: md`**Definition:** the ratio of the volume of air actually drawn in per stroke, at suction conditions, to the swept volume: $\eta_v = (V_1 - V_4)/V_s$.

**Derivation.** Clearance volume $V_c = V_3 = cV_s$ and $V_1 = V_s + V_c$. The clearance air re-expands from $p_2$ to $p_1$ along $pV^n = C$:
$$V_4 = V_3\left(\frac{p_2}{p_1}\right)^{1/n} = cV_s\left(\frac{p_2}{p_1}\right)^{1/n}$$
$$\eta_v = \frac{V_s + cV_s - cV_s(p_2/p_1)^{1/n}}{V_s} = \boxed{1 + c - c\left(\frac{p_2}{p_1}\right)^{1/n}}$$
It falls as the clearance and pressure ratio rise. It becomes zero at $p_2/p_1 = (1 + 1/c)^n$.

**Factors reducing the actual (overall) volumetric efficiency**
- Clearance and re-expansion (above).
- Pressure drop across the suction valve and passages, so the cylinder pressure is below atmospheric at the end of suction.
- Heating of the incoming air by hot cylinder walls and valves, which lowers its density.
- Leakage past piston rings and valves.
- Valve inertia and late closing.
- High speed (throttling losses) and high altitude or intake temperature.

The free-air-delivered basis also corrects for differences between suction and atmospheric conditions.`,
            scheme: [
              { marks: 0.5, for: 'Definition' },
              { marks: 2, for: 'Derivation with p–V diagram showing clearance and re-expansion' },
              { marks: 1.5, for: 'Practical factors that reduce it' },
            ],
          },
          {
            id: 'x1-5b',
            label: 'b',
            marks: 4,
            prompt: md`A two-stage reciprocating air compressor takes in 5 m³/min of air at 1 bar and 27°C and delivers it at 25 bar. The index of compression in both stages is 1.3, the intercooling is perfect and the intermediate pressure is the optimum. Neglecting clearance, find (i) the intermediate pressure, (ii) the minimum power required, (iii) the heat rejected in the intercooler and (iv) the percentage saving in power compared with single-stage compression.`,
            topicIds: ['u1-multistage'],
            alignsWith: 'Nov 2024 Q5(a) derived the optimum intermediate pressure. A two-stage numerical that uses it is the natural paired question, and Rathore has several.',
            answer: md`**(i) Intermediate pressure**
$$p_2 = \sqrt{p_1p_3} = \sqrt{1\times25} = 5\ \text{bar}$$

**(ii) Minimum power.** $p_1\dot V = 100\times5/60 = 8.333$ kW, $\dfrac{n-1}{n} = 0.2308$.
$$P = 2\cdot\frac{n}{n - 1}p_1\dot V\left[\left(\frac{p_3}{p_1}\right)^{\frac{n-1}{2n}} - 1\right] = 2\times4.333\times8.333\times(5^{0.2308} - 1) = 32.5\ \text{kW}$$

**(iii) Intercooler heat.** Temperature after each stage: $T_2 = 300\times5^{0.2308} = 434.9$ K.
$$\dot m = \frac{p_1\dot V}{RT_1} = \frac{100\times5}{0.287\times300\times60} = 0.0968\ \text{kg/s}$$
$$\dot Q_{ic} = \dot mc_p(T_2 - T_1) = 0.0968\times1.005\times134.9 = 13.1\ \text{kW}$$

**(iv) Single-stage comparison**
$$P_1 = 4.333\times8.333\times(25^{0.2308} - 1) = 39.8\ \text{kW}, \qquad \text{saving} = \frac{39.8 - 32.5}{39.8} = 18.4\%$$
(Single-stage delivery would be at $300\times25^{0.2308} = 630$ K, which is far too hot.)`,
            scheme: [
              { marks: 0.5, for: 'Intermediate pressure 5 bar' },
              { marks: 1.5, for: 'Minimum two-stage power ≈ 32.5 kW' },
              { marks: 1, for: 'Intercooler heat ≈ 13.1 kW' },
              { marks: 1, for: 'Single-stage power and saving ≈ 18%' },
            ],
          },
        ],
      },
      {
        number: 6,
        parts: [
          {
            id: 'x1-6a',
            label: 'a',
            marks: 4,
            prompt: md`Draw the inlet and outlet velocity triangles of a centrifugal compressor impeller and derive an expression for the pressure ratio developed in terms of the tip speed, slip factor, power input factor and isentropic efficiency.`,
            topicIds: ['u2-velocity', 'u2-efficiency'],
            alignsWith: 'Nov 2025 Q6(a) derived the work done, and Q7(iii) asked the velocity triangles. Extending the work expression to pressure ratio is the step Rathore takes next and a likely 4-mark derivation.',
            answer: md`**Triangles:** at inlet, radial entry with $V_1 = V_{f1}$, blade speed $U_1$, relative velocity $V_{r1}$ at angle $\beta_1$. At outlet (radial vanes), $U_2$, whirl $V_{w2} = \sigma U_2$ because of slip, flow velocity $V_{f2}$.

**Work input** per kg (Euler, radial entry), including disc friction and windage through ψ:
$$w = \psi\sigma U_2^2 = c_p(T_{02} - T_{01})$$
$$\Rightarrow\; \frac{T_{02}}{T_{01}} = 1 + \frac{\psi\sigma U_2^2}{c_pT_{01}}$$

**Isentropic efficiency:**
$$\eta_c = \frac{T_{02s} - T_{01}}{T_{02} - T_{01}} \;\Rightarrow\; T_{02s} - T_{01} = \eta_c\frac{\psi\sigma U_2^2}{c_p}$$

**Pressure ratio:**
$$\frac{p_{02}}{p_{01}} = \left(\frac{T_{02s}}{T_{01}}\right)^{\frac{\gamma}{\gamma - 1}} = \boxed{\left[1 + \frac{\eta_c\,\psi\,\sigma\,U_2^2}{c_pT_{01}}\right]^{\frac{\gamma}{\gamma - 1}}}$$

The pressure ratio rises steeply with tip speed, which is limited by impeller stress (about 450–500 m/s), and falls with inlet temperature. This is why a single stage gives only about 4 : 1.`,
            scheme: [
              { marks: 1, for: 'Inlet and outlet velocity triangles' },
              { marks: 1, for: 'Work input ψσU₂² and stagnation temperature rise' },
              { marks: 1.5, for: 'Pressure-ratio expression with ηc' },
              { marks: 0.5, for: 'Comment on tip speed and inlet temperature' },
            ],
          },
          {
            id: 'x1-6b',
            label: 'b',
            marks: 4,
            prompt: md`A centrifugal compressor with radial vanes has an impeller tip diameter of 500 mm and runs at 15000 rpm. It handles 20 kg/s of air drawn in at 1 bar and 15°C. The slip factor is 0.9, the power input factor 1.04 and the isentropic efficiency 80%. Calculate (i) the work input per kg, (ii) the total-head temperature at exit, (iii) the pressure ratio and (iv) the power required.`,
            topicIds: ['u2-velocity', 'u2-efficiency'],
            alignsWith: 'Nov 2025 Q6(b) and May 2023 Q4 were centrifugal numericals. This is the form Rathore drills most (tip speed with σ and ψ) and pairs with part (a).',
            answer: md`**Tip speed:**
$$U_2 = \frac{\pi\times0.5\times15000}{60} = 392.7\ \text{m/s}$$

**(i) Work input:**
$$w = \psi\sigma U_2^2 = 1.04\times0.9\times392.7^2 = 144.3\ \text{kJ/kg}$$

**(ii) Exit temperature:**
$$T_{02} = 288 + \frac{144.3}{1.005} = 288 + 143.6 = 431.6\ \text{K}$$

**(iii) Pressure ratio:**
$$\frac{p_{02}}{p_{01}} = \left[1 + \frac{0.8\times143.6}{288}\right]^{3.5} = (1.399)^{3.5} = 3.24$$

**(iv) Power:** $P = 20\times144.3 = 2886$ kW $\approx 2.89$ MW.`,
            scheme: [
              { marks: 0.5, for: 'Tip speed' },
              { marks: 1, for: 'Work input ≈ 144 kJ/kg' },
              { marks: 1, for: 'Exit stagnation temperature ≈ 432 K' },
              { marks: 1, for: 'Pressure ratio ≈ 3.24' },
              { marks: 0.5, for: 'Power ≈ 2.89 MW' },
            ],
          },
        ],
      },
      {
        number: 7,
        stem: md`Write short notes on **any two** of the following`,
        pick: 2,
        choice: 'any',
        parts: [
          {
            id: 'x1-7i',
            label: 'i',
            marks: 4,
            prompt: md`Knocking in SI engines and the factors affecting it`,
            topicIds: ['u4-si-combustion'],
            alignsWith: 'Nov 2025 Q7 was "any two short notes" with an engine-combustion option. SI knock has so far appeared only as a p–θ sketch (Nov 2025 Q3(a)), and Nov 2024 Q4(b) asked the CI form, so SI detonation is still owed a full answer.',
            answer: md`**Knock (detonation):** after the spark, the advancing flame compresses and heats the unburnt **end gas**. If the end gas reaches its self-ignition temperature and stays there longer than its ignition delay, it auto-ignites spontaneously before the flame arrives. The very rapid pressure rise sets up pressure waves, heard as a metallic ping. Results: loss of power, overheating, damage to the piston crown, rings and head gasket, and higher heat transfer.

**Factors.** Anything that raises the end gas's temperature or pressure, or gives it more time, *increases* knock.
- *Temperature and pressure:* high compression ratio, supercharging, high inlet temperature, hot coolant and walls, advanced spark.
- *Time:* low turbulence and slow flame, low speed, long flame path (large bore, off-centre plug).
- *Composition:* low-octane fuel; a mixture near stoichiometric (most knock-prone).

**Remedies:** high-octane or anti-knock fuel (ethanol blends, MTBE), retarding the spark, a compact chamber with a central plug, more turbulence (squish), cooling the end gas, and EGR. Modern engines use knock sensors that retard the spark automatically.`,
            scheme: [
              { marks: 1.5, for: 'Mechanism of knock and its effects' },
              { marks: 1.5, for: 'Factors grouped by temperature/pressure, time and composition' },
              { marks: 1, for: 'Remedies' },
            ],
          },
          {
            id: 'x1-7ii',
            label: 'ii',
            marks: 4,
            prompt: md`Afterburner (thrust augmentation)`,
            topicIds: ['u6-afterburner'],
            alignsWith: 'Afterburning is named in the syllabus ("turbojet with and without afterburner") but has never been asked. It fits the short-note slot that Nov 2025 used for jet fuels.',
            answer: md`**Need:** the turbine-inlet temperature of a turbojet is limited by the blades, so only about 25% of the air is burnt with fuel and the turbine exhaust still holds plenty of oxygen. Extra thrust is needed for take-off, climb and combat manoeuvres.

**Afterburner (reheat):** a duct between the turbine and a **variable-area nozzle**, with fuel spray bars and flame holders. Extra fuel is burnt in the oxygen-rich exhaust, raising the gas temperature to about 2000 K, with no blades to limit it. The jet velocity rises roughly as $\sqrt{T}$, so thrust increases by about 30–50% (up to 70% at high speed). The nozzle throat must open to pass the hotter, larger-volume gas without disturbing the turbine.

**T-s diagram:** after turbine expansion 4, heat is added at constant pressure 4–5, then nozzle expansion 5–6 to a higher velocity.

**Drawbacks:** fuel consumption rises sharply (specific fuel consumption 2–3 times), so it is used only for short periods. It adds weight and length and needs a variable nozzle. Noisy.

**Other thrust augmentation:** water or water-methanol injection into the compressor or combustor; bleed burn.`,
            scheme: [
              { marks: 1, for: 'Why thrust augmentation is needed' },
              { marks: 2, for: 'Construction and working with T-s diagram' },
              { marks: 1, for: 'Thrust gain, drawbacks and other methods' },
            ],
          },
          {
            id: 'x1-7iii',
            label: 'iii',
            marks: 4,
            prompt: md`Stirling cycle`,
            topicIds: ['u3-stirling-ericsson'],
            alignsWith: 'Stirling and Ericsson cycles are in the Unit 3 syllabus but absent from every ME203n paper so far. Short notes are the usual way such an item first appears.',
            answer: md`**Processes:** 1–2 isothermal compression at $T_L$ (heat $RT_L\ln r$ rejected); 2–3 constant-volume heating from $T_L$ to $T_H$; 3–4 isothermal expansion at $T_H$ (heat $RT_H\ln r$ received); 4–1 constant-volume cooling back to $T_L$. Show these on p-v and T-s diagrams.

**Regenerator:** the heat given up in 4–1, $c_v(T_H - T_L)$, is exactly what 2–3 needs. A regenerator (a matrix of wire mesh) stores it and returns it. With perfect regeneration, external heat is exchanged only at $T_H$ and $T_L$:
$$\eta = \frac{R(T_H - T_L)\ln r}{RT_H\ln r} = 1 - \frac{T_L}{T_H} \quad(\text{Carnot})$$

**Without regeneration:**
$$\eta = \frac{R(T_H - T_L)\ln r}{RT_H\ln r + c_v(T_H - T_L)} \quad < \text{Carnot}$$

**Practical engines:** external combustion with a closed cycle using helium or hydrogen; quiet, multi-fuel, low emissions. Drawbacks are high cost, bulky heat exchangers and slow response. Uses include submarines, solar dish generators, cryocoolers (the reversed cycle) and space power.`,
            scheme: [
              { marks: 1, for: 'Processes with p-v and T-s diagrams' },
              { marks: 2, for: 'Regenerator and efficiency with and without regeneration' },
              { marks: 1, for: 'Practical features and applications' },
            ],
          },
          {
            id: 'x1-7iv',
            label: 'iv',
            marks: 4,
            prompt: md`Vacuum pumps`,
            topicIds: ['u2-vacuum'],
            alignsWith: 'The vacuum pump closes the Unit 2 syllabus line, and Rathore barely treats it. It is a classic short-note filler, which is how the examiner used Q7 in Nov 2025.',
            answer: md`**Definition:** a compressor whose suction is below atmospheric pressure and whose delivery is to the atmosphere. It removes gas from a closed space to create a vacuum.

**Types**
1. **Reciprocating (piston) vacuum pump:** like a reciprocating compressor. Clearance re-expansion severely limits the attainable vacuum because the pressure ratio is very large, so small clearances and two stages are used.
2. **Rotary vane pump:** an eccentric rotor with sliding vanes. Oil-sealed versions reach about 10⁻³ mbar. The most common laboratory pump.
3. **Liquid-ring pump:** an eccentric impeller in a ring of water. Robust and tolerant of vapour; used in paper mills and condensers.
4. **Roots (lobe) blower:** a booster for high flow at medium vacuum.
5. **Steam or water ejectors:** no moving parts; used for condenser air extraction.
6. **High-vacuum pumps:** diffusion and turbomolecular pumps, backed by a rotary pump.

**Performance terms:** ultimate vacuum, pumping speed (m³/h at inlet pressure), and the compression ratio needed, which can be very high, so multistaging is used.

**Applications:** condensers of steam plants, vacuum brakes, vacuum packaging and drying, distillation, milking machines, the electronics industry, and laboratories.`,
            scheme: [
              { marks: 1, for: 'Definition and how it differs from a compressor' },
              { marks: 2, for: 'Types with working principle' },
              { marks: 1, for: 'Applications' },
            ],
          },
        ],
      },
    ],
  },
  /* ================================================================== P2 */
  {
    id: 'predicted-2',
    kind: 'predicted',
    title: 'Predicted Paper 2',
    session: 'Predicted · comparison-heavy',
    blurb: 'Cycle comparison + dual numerical, regeneration with efficiencies, diesel valve timing, emissions, ramjet and pulsejet, rocket thrust, isothermal efficiency, double-acting compressor, impeller triangles, Atkinson cycle, water injection.',
    current: true,
    header: ME203N_HEADER,
    attempt: 5,
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'x2-1a',
            label: 'a',
            marks: 4,
            prompt: md`Compare the Otto, Diesel and Dual cycles on p-v and T-s diagrams for (i) the same compression ratio and heat input and (ii) the same maximum pressure and temperature.`,
            topicIds: ['u3-comparison'],
            alignsWith: 'Nov 2025 Q4(b) compared Otto and Diesel. The syllabus says "Comparison of Otto, Diesel, dual cycles", so the three-way version with the dual cycle is the likely repeat.',
            answer: md`Use T-s diagrams. Heat supplied is the area under the heat-addition path and heat rejected is the area under the constant-volume line to state 1, with $\eta = 1 - Q_r/Q_s$.

**(i) Same r and same heat input.** All three share 1–2. Otto adds heat at constant volume (steepest line), Diesel at constant pressure (flattest), Dual partly each. For equal areas the end point moves right in the order Otto, Dual, Diesel, so the heat rejected grows in that order:
$$Q_{r,O} < Q_{r,Dual} < Q_{r,D} \;\Rightarrow\; \eta_{Otto} > \eta_{Dual} > \eta_{Diesel}$$

**(ii) Same maximum pressure and temperature** (same state 3 and same state 1). All three reject heat along the same line 4–1, so $Q_r$ is equal. To reach the same peak, the Otto cycle has the lowest compression ratio and the Diesel the highest. The Diesel therefore adds heat over the largest area:
$$Q_{s,D} > Q_{s,Dual} > Q_{s,O} \;\Rightarrow\; \eta_{Diesel} > \eta_{Dual} > \eta_{Otto}$$

**Conclusion:** the real limits of an engine are peak pressure (structure) and peak temperature (materials). Under those limits the Diesel cycle is best. That is why CI engines with high compression ratios are more efficient than SI engines, which are knock-limited.`,
            scheme: [
              { marks: 2, for: 'Case (i): diagrams, argument and order Otto > Dual > Diesel' },
              { marks: 2, for: 'Case (ii): diagrams, argument and order Diesel > Dual > Otto' },
            ],
          },
          {
            id: 'x2-1b',
            label: 'b',
            marks: 4,
            prompt: md`An air standard dual cycle has a compression ratio of 15. The air is at 1 bar and 300 K at the start of compression. The heat supplied is 1500 kJ/kg, half of it at constant volume and half at constant pressure. Determine (i) the pressure and temperature at the end of each process, (ii) the thermal efficiency and (iii) the mean effective pressure.`,
            topicIds: ['u3-dual'],
            alignsWith: 'Nov 2024 Q1(a) derived the dual-cycle efficiency but no ME203n paper has asked a dual numerical. Splitting the heat equally between constant volume and constant pressure is the standard way to set one.',
            answer: md`**(i) Salient points**
- **1:** 1 bar, 300 K.
- **2:** $T_2 = 300\times15^{0.4} = 886.3$ K, $p_2 = 15^{1.4} = 44.31$ bar.
- **2–3 (750 kJ/kg at constant volume):** $T_3 = 886.3 + 750/0.718 = 1930.8$ K, $\alpha = 2.179$, $p_3 = 96.5$ bar.
- **3–4 (750 kJ/kg at constant pressure):** $T_4 = 1930.8 + 750/1.005 = 2677.1$ K, $p_4 = 96.5$ bar, $\rho = 1.387$.
- **5:** $T_5 = T_4(\rho/r)^{0.4} = 1032.7$ K, $p_5 = p_4(\rho/r)^{1.4} = 3.44$ bar.

**(ii) Efficiency**
$$q_r = 0.718(1032.7 - 300) = 526.1\ \text{kJ/kg}, \qquad \eta = 1 - \frac{526.1}{1500} = 64.9\%$$
Check by formula: $1 - \dfrac{1}{15^{0.4}}\cdot\dfrac{\alpha\rho^{1.4} - 1}{(\alpha - 1) + 1.4\alpha(\rho - 1)} = 0.649$ ✓

**(iii) Mean effective pressure**
$$w = 1500 - 526.1 = 973.9\ \text{kJ/kg}, \qquad v_1 = 0.861\ \text{m}^3/\text{kg}$$
$$p_m = \frac{973.9}{0.861(1 - 1/15)} = 1212\ \text{kPa} = 12.1\ \text{bar}$$`,
            scheme: [
              { marks: 1.5, for: 'Pressures and temperatures at all salient points' },
              { marks: 1.5, for: 'Heat rejected and efficiency ≈ 64.9%' },
              { marks: 1, for: 'MEP ≈ 12.1 bar' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'x2-2a',
            label: 'a',
            marks: 4,
            prompt: md`Discuss the effects of regeneration, reheating and intercooling on the thermal efficiency and specific work output of a gas turbine plant.`,
            topicIds: ['u5-regeneration', 'u5-reheat-intercool'],
            alignsWith: 'Quoted almost word for word from the Unit 5 syllabus. Nov 2025 Q2(b) (reheat) and Nov 2024 Q2(b) (reheat + regenerator) each examined one piece of it.',
            answer: md`**Regeneration** (exhaust preheats compressed air)
- *Work output:* unchanged, since the compressor and turbine are the same.
- *Efficiency:* increases, because less fuel heat is needed. Ideally $\eta = 1 - \frac{T_1}{T_3}r_p^{(\gamma-1)/\gamma}$. The gain is largest at low pressure ratios and disappears when $T_2 \geq T_4$.
- Pays off when the exhaust is much hotter than the compressor delivery.

**Reheating** (between turbine stages)
- *Work output:* increases, because constant-pressure lines diverge on T-s, so the two expansions give more work. The work ratio improves.
- *Efficiency:* decreases slightly without regeneration (the extra heat is added at a lower mean temperature and the exhaust is hotter); increases with regeneration (the hotter exhaust is recovered).

**Intercooling** (between compressor stages)
- *Work output:* increases, because the compressor work falls, especially at high pressure ratios.
- *Efficiency:* decreases slightly without regeneration (colder compressor delivery needs more fuel); increases with regeneration.

**Combined:** intercooling + reheating + regeneration gives high work ratio *and* high efficiency. In the limit of infinitely many stages the cycle becomes the Ericsson cycle, with Carnot efficiency.`,
            scheme: [
              { marks: 1.5, for: 'Regeneration: effect on work and efficiency' },
              { marks: 1, for: 'Reheating: effect on work and efficiency' },
              { marks: 1, for: 'Intercooling: effect on work and efficiency' },
              { marks: 0.5, for: 'Combined effect / Ericsson limit with T-s sketches' },
            ],
          },
          {
            id: 'x2-2b',
            label: 'b',
            marks: 4,
            prompt: md`A gas turbine plant works between 1 bar, 300 K and a maximum temperature of 1100 K with a pressure ratio of 6. The isentropic efficiencies of the compressor and turbine are 85% and 88%. Calculate the thermal efficiency and work ratio (i) without a regenerator and (ii) with a regenerator of effectiveness 0.75.`,
            topicIds: ['u5-regeneration', 'u5-simple'],
            alignsWith: 'Nov 2024 Q2(b) had an ideal (100%) regenerator. A realistic effectiveness with component efficiencies is the expected next form, and Rathore drills it in Ch 27.',
            answer: md`$6^{0.2857} = 1.6685$.

**Compressor:** $T_{2s} = 500.6$ K, $T_2 = 300 + \dfrac{200.6}{0.85} = 535.9$ K, $w_c = 237.1$ kJ/kg.

**Turbine:** $T_{4s} = 1100/1.6685 = 659.3$ K, $T_4 = 1100 - 0.88\times440.7 = 712.2$ K, $w_t = 1.005\times387.8 = 389.8$ kJ/kg.

**Net work and work ratio:** $w_{net} = 152.7$ kJ/kg, work ratio $= 152.7/389.8 = 0.392$ in both cases.

**(i) Without regenerator**
$$q_s = 1.005(1100 - 535.9) = 566.9\ \text{kJ/kg}, \qquad \eta = \frac{152.7}{566.9} = 26.9\%$$

**(ii) With regenerator**
$$T_x = 535.9 + 0.75(712.2 - 535.9) = 668.1\ \text{K}$$
$$q_s = 1.005(1100 - 668.1) = 434.1\ \text{kJ/kg}, \qquad \eta = \frac{152.7}{434.1} = 35.2\%$$

The regenerator raises efficiency by 8.3 percentage points with the same work output.`,
            scheme: [
              { marks: 1, for: 'Actual compressor and turbine temperatures and works' },
              { marks: 1, for: 'Net work and work ratio ≈ 0.39' },
              { marks: 1, for: 'Efficiency without regenerator ≈ 26.9%' },
              { marks: 1, for: 'Regenerator exit temperature and efficiency ≈ 35.2%' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'x2-3a',
            label: 'a',
            marks: 4,
            prompt: md`Explain the working of a four-stroke diesel engine and draw its actual valve timing diagram. How does it differ from that of a petrol engine?`,
            topicIds: ['u4-four-stroke', 'u4-timing'],
            alignsWith: 'Valve timing appears in both ME203n papers (petrol engines both times). The diesel version, with its fuel-injection events, is the obvious variation.',
            answer: md`**Working**
1. **Suction:** only air is drawn in.
2. **Compression:** air is compressed (r = 14–22) to 30–45 bar and 800–1000 K.
3. **Power:** near TDC the injector sprays fuel, which self-ignites in the hot air. It burns at roughly constant pressure, then the gases expand.
4. **Exhaust:** the piston pushes out the products.

**Valve timing (typical)**
- IVO 10–25° bTDC; IVC 25–50° aBDC
- Fuel injection begins 10–20° bTDC and ends 15–25° aTDC
- EVO 30–50° bBDC; EVC 10–15° aTDC
- Valve overlap about 25–40°

**Differences from a petrol engine**

| Diesel | Petrol |
|---|---|
| Fuel-injection period marked instead of a spark | Spark event (20–35° bTDC) |
| Larger valve overlap: only air is lost during scavenging, so no fuel is wasted | Overlap kept small to avoid losing fresh air–fuel mixture |
| Injection timing fixed by the injection pump (advance with speed) | Spark advance varied by speed and load |
| Inlet charge is air only, so a later IVC is usable at lower speeds | Mixture inertia tuning |`,
            scheme: [
              { marks: 1.5, for: 'Four strokes of the diesel engine explained' },
              { marks: 1.5, for: 'Valve timing diagram with injection period and overlap' },
              { marks: 1, for: 'Differences from the petrol-engine diagram' },
            ],
          },
          {
            id: 'x2-3b',
            label: 'b',
            marks: 4,
            prompt: md`Discuss the formation of the main pollutants in SI and CI engine exhaust and the methods used to control them.`,
            topicIds: ['u4-si-combustion', 'u4-ci-combustion'],
            alignsWith: 'Emissions were a Nov 2025 short note (Q7 i). The syllabus names emissions for both SI and CI engines, so a full question is due.',
            answer: md`**Pollutants and how they form**
- **CO:** incomplete oxidation where oxygen is short (rich mixture, cold start, idling). High in SI engines; low in CI engines (lean overall).
- **HC (unburnt fuel):** flame quenching at cold walls and crevices, oil-film absorption, misfire, valve overlap and scavenging (two-strokes). High in SI engines.
- **NOₓ:** N₂ and O₂ combine at high flame temperature (above about 1800 K) when there is excess oxygen (Zeldovich mechanism). Peaks slightly lean of stoichiometric. Significant in both engines; high in CI engines at full load.
- **Particulates / smoke:** soot from fuel-rich cores of the diesel spray, plus sulphates. Mainly CI engines.
- **SO₂** from fuel sulphur; **aldehydes**; and in SI engines evaporative and crankcase (blow-by) HC.

**Control**
- *SI:* closed-loop λ = 1 control with a **three-way catalytic converter** (oxidises CO and HC, reduces NOₓ); EGR for NOₓ; PCV valve for crankcase gases; charcoal canister for evaporation; secondary air injection; fuel injection instead of carburettor.
- *CI:* EGR and retarded injection for NOₓ; **diesel oxidation catalyst** for CO and HC; **diesel particulate filter** for soot; **SCR with urea (AdBlue)** for NOₓ; high-pressure common-rail injection; low-sulphur fuel.

There is a trade-off: in a diesel, measures that lower NOₓ tend to raise soot, and the reverse.`,
            scheme: [
              { marks: 2, for: 'Formation of CO, HC, NOx and particulates with SI/CI contrast' },
              { marks: 2, for: 'Control methods for SI and CI engines' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'x2-4a',
            label: 'a',
            marks: 4,
            prompt: md`With neat sketches explain the working of a ramjet and a pulsejet engine.`,
            topicIds: ['u6-ramjet-pulsejet'],
            alignsWith: 'Nov 2025 Q4(a) asked ramjet advantages over the turbojet. Asking the working of both ram-type engines is the natural sister question.',
            answer: md`**Ramjet** (sketch: supersonic diffuser with spike → subsonic diffuser → combustion zone with fuel injectors and flame holders → convergent–divergent nozzle)
- The high-speed incoming air is slowed in the diffuser, and its kinetic energy becomes pressure (ram compression). There is no compressor or turbine.
- Fuel is burnt continuously at roughly constant pressure. Flame holders create recirculation zones that keep the flame stable.
- The hot gases expand through the nozzle at a higher velocity than the inlet air, giving thrust.
- Needs a high flight speed (it is launched by a booster). Best at Mach 2–5.

**Pulsejet** (sketch: diffuser → spring-loaded one-way reed valves → combustion chamber with spark plug and fuel injector → long tail pipe)
- **Start:** compressed air is blown in, fuel is injected and the spark ignites it.
- **Explosion:** the pressure rise closes the valves, and the gases rush out of the tail pipe, producing thrust.
- **Suction:** the momentum of the leaving gas over-expands the chamber below atmospheric pressure. The valves open, and fresh air (with fuel) enters. Some exhaust flows back up the tail pipe.
- **Re-ignition:** the hot residual gas ignites the new charge, with no spark needed after starting. This repeats about 40–250 times a second (intermittent combustion).
- Gives static thrust, but valve life is short, it is noisy and vibrating, has low efficiency and is limited to subsonic speed.`,
            scheme: [
              { marks: 2, for: 'Ramjet: sketch and working' },
              { marks: 2, for: 'Pulsejet: sketch and intermittent cycle with valves' },
            ],
          },
          {
            id: 'x2-4b',
            label: 'b',
            marks: 4,
            prompt: md`A rocket burns 120 kg/s of propellant. The gases leave the nozzle at 2400 m/s through an exit area of 0.6 m² at an exit pressure of 0.8 bar, while the ambient pressure is 0.3 bar. If the rocket is moving at 1800 m/s, calculate (i) the thrust, (ii) the effective jet velocity, (iii) the specific impulse, (iv) the propulsive efficiency and (v) the thrust power.`,
            topicIds: ['u6-rockets'],
            alignsWith: 'Nov 2024 Q3(b) asked propellants (theory). Rocket thrust and specific impulse are the quantitative side of the same syllabus item, worked in Rathore §28.11–28.17.',
            answer: md`**(i) Thrust** (momentum + pressure thrust):
$$F = \dot m_pV_e + (p_e - p_a)A_e = 120\times2400 + (0.8 - 0.3)\times10^5\times0.6 = 288\,000 + 30\,000 = 318\ \text{kN}$$

**(ii) Effective jet velocity:**
$$c = \frac{F}{\dot m_p} = \frac{318\,000}{120} = 2650\ \text{m/s}$$

**(iii) Specific impulse:**
$$I_{sp} = \frac{c}{g} = \frac{2650}{9.81} = 270\ \text{s}$$

**(iv) Propulsive efficiency** (rocket form):
$$\eta_p = \frac{2(V/c)}{1 + (V/c)^2} = \frac{2\times0.679}{1 + 0.461} = 93.0\%$$
(It would reach 100% when V = c.)

**(v) Thrust power:** $FV = 318\,000\times1800 = 572$ MW.`,
            scheme: [
              { marks: 1.5, for: 'Thrust with momentum and pressure terms' },
              { marks: 0.5, for: 'Effective jet velocity' },
              { marks: 0.5, for: 'Specific impulse ≈ 270 s' },
              { marks: 1, for: 'Propulsive efficiency ≈ 93%' },
              { marks: 0.5, for: 'Thrust power ≈ 572 MW' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'x2-5a',
            label: 'a',
            marks: 4,
            prompt: md`Define isothermal efficiency of a reciprocating compressor. Show on a p–V diagram that isothermal compression requires the minimum work, and explain how compression is brought close to isothermal in practice.`,
            topicIds: ['u1-processes', 'u1-basics'],
            alignsWith: 'Nov 2025 Q5(a) asked the working of the single-stage compressor. "Isothermal efficiency" and "minimum work requirement" are the next two phrases of the Unit 1 syllabus and have not yet been examined.',
            answer: md`**Isothermal efficiency:**
$$\eta_{iso} = \frac{\text{isothermal work}}{\text{actual (indicated) work}} = \frac{p_1V_1\ln(p_2/p_1)}{W_{actual}}$$

**p–V diagram:** from the same state 1 to the same delivery pressure $p_2$, draw three curves: isentropic ($pV^\gamma$, steepest), polytropic ($pV^n$, $1 < n < \gamma$) and isothermal ($pV$, flattest). The compressor work is the area between the curve and the pressure axis, including suction and delivery. The isothermal curve encloses the **smallest area**, so it needs the least work:
$$p_1V_1\ln r \;<\; \frac{n}{n - 1}p_1V_1\left(r^{\frac{n-1}{n}} - 1\right) \;<\; \frac{\gamma}{\gamma - 1}p_1V_1\left(r^{\frac{\gamma-1}{\gamma}} - 1\right)$$
Physically, cooling keeps the air dense, so less volume has to be displaced against the rising pressure.

**Getting close to isothermal**
1. Water jackets or fins on the cylinder.
2. Multistage compression with intercoolers (the most effective).
3. Water spray injection (rare).
4. Low piston speed, giving more time for heat transfer.
5. A large surface-to-volume ratio.

The usual index achieved is n ≈ 1.2–1.3.`,
            scheme: [
              { marks: 1, for: 'Definition of isothermal efficiency' },
              { marks: 2, for: 'p–V diagram and argument that isothermal work is minimum' },
              { marks: 1, for: 'Practical methods' },
            ],
          },
          {
            id: 'x2-5b',
            label: 'b',
            marks: 4,
            prompt: md`A single-stage double-acting reciprocating air compressor has a bore of 200 mm and a stroke of 250 mm and runs at 300 rpm. It draws air at 1 bar and 20°C and delivers it at 7 bar. The clearance is 5% of the swept volume and the index of compression and expansion is 1.25. Find (i) the volumetric efficiency, (ii) the free air delivered in m³/min, (iii) the mass of air delivered per minute, (iv) the indicated power and (v) the delivery temperature.`,
            topicIds: ['u1-clearance'],
            alignsWith: 'Nov 2024 Q5(b) was a double-acting compressor with 5% clearance. This keeps that structure but asks the full set of outputs, which is how Rathore sets it.',
            answer: md`**(i) Volumetric efficiency:**
$$\eta_v = 1 + c - c\left(\frac{p_2}{p_1}\right)^{1/n} = 1.05 - 0.05\times7^{0.8} = 1.05 - 0.05\times4.743 = 0.813$$

**(ii) Free air delivered.** $V_s = \frac{\pi}{4}(0.2)^2(0.25) = 7.854\times10^{-3}$ m³. Double-acting, so the swept volume per minute is $7.854\times10^{-3}\times300\times2 = 4.712$ m³/min.
$$FAD = 0.813\times4.712 = 3.83\ \text{m}^3/\text{min}\ (\text{at } 1\ \text{bar}, 20\,^\circ\text{C})$$

**(iii) Mass:**
$$\dot m = \frac{100\times3.83}{0.287\times293} = 4.56\ \text{kg/min}$$

**(iv) Indicated power:**
$$P = \frac{n}{n - 1}p_1\dot V\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}} - 1\right] = 5\times100\times\frac{3.83}{60}\times(7^{0.2} - 1) = 15.2\ \text{kW}$$

**(v) Delivery temperature:**
$$T_2 = 293\times7^{0.2} = 432.4\ \text{K} = 159\,^\circ\text{C}$$`,
            scheme: [
              { marks: 1, for: 'Volumetric efficiency ≈ 0.81' },
              { marks: 1, for: 'Swept volume per minute (double acting) and FAD ≈ 3.83 m³/min' },
              { marks: 0.5, for: 'Mass flow ≈ 4.56 kg/min' },
              { marks: 1, for: 'Indicated power ≈ 15.2 kW' },
              { marks: 0.5, for: 'Delivery temperature ≈ 432 K' },
            ],
          },
        ],
      },
      {
        number: 6,
        parts: [
          {
            id: 'x2-6a',
            label: 'a',
            marks: 4,
            prompt: md`Explain the function of the diffuser in a centrifugal compressor. Compare vaneless and vaned diffusers, and show how pressure and velocity vary through the compressor.`,
            topicIds: ['u2-construction'],
            alignsWith: 'Nov 2024 Q6(a) asked the working of the centrifugal compressor with diagrams. The diffuser, which produces about half the pressure rise, is the component-level follow-up.',
            answer: md`**Function:** air leaves the impeller with high absolute velocity, about half the stage energy as kinetic energy. The diffuser **slows it down in passages of increasing area and converts that kinetic energy into static pressure** with as little loss as possible. A good diffuser raises stage efficiency considerably.

**Vaneless diffuser:** a parallel-walled annular space around the impeller. The flow follows a log-spiral path; the radial velocity falls as the radius increases and the whirl falls as $V_wr$ = constant.
- Simple and cheap; works over a **wide flow range** (no incidence problems).
- Needs a large diameter; long flow path, so higher friction loss and lower efficiency.

**Vaned diffuser:** a ring of fixed vanes, set to the absolute flow angle leaving the impeller, after a small vaneless gap.
- Diffusion in a shorter radius; **higher efficiency** at design point; compact.
- Sensitive to incidence at off-design flow, which narrows the stable range and can trigger surge.

**Variation through the compressor (sketch):**
- *Static pressure:* rises in the impeller (about half), rises further in the diffuser, slightly in the volute.
- *Absolute velocity:* rises in the impeller to a maximum at the tip, then falls in the diffuser and volute.
- *Total pressure:* rises only in the impeller, where work is done, and falls slightly through the diffuser because of losses.`,
            scheme: [
              { marks: 1, for: 'Function of the diffuser' },
              { marks: 2, for: 'Vaneless vs vaned diffuser with merits' },
              { marks: 1, for: 'Pressure and velocity variation sketch' },
            ],
          },
          {
            id: 'x2-6b',
            label: 'b',
            marks: 4,
            prompt: md`A centrifugal compressor runs at 9000 rpm. The impeller inlet and outlet diameters are 200 mm and 450 mm, the air enters radially and the velocity of flow is constant at 60 m/s. The vanes are backward-curved, with an outlet angle of 70° to the tangent. For an air flow of 10 kg/s find (i) the blade angle at inlet, (ii) the work done per kg of air, (iii) the power required, (iv) the stagnation temperature rise and (v) the degree of reaction.`,
            topicIds: ['u2-velocity', 'u2-efficiency'],
            alignsWith: 'May 2023 Q4 (and Rathore p. 922) was a velocity-triangle numerical with blade angles. The ME203n papers have not yet set one, but Nov 2025 Q7(iii) asked the triangles in theory.',
            answer: md`**Blade speeds:**
$$U_1 = \frac{\pi\times0.2\times9000}{60} = 94.25\ \text{m/s}, \qquad U_2 = \frac{\pi\times0.45\times9000}{60} = 212.1\ \text{m/s}$$

**(i) Inlet blade angle** (radial entry):
$$\tan\beta_1 = \frac{V_f}{U_1} = \frac{60}{94.25} \;\Rightarrow\; \beta_1 = 32.5°$$

**(ii) Work per kg.** Outlet whirl:
$$V_{w2} = U_2 - \frac{V_f}{\tan70°} = 212.1 - \frac{60}{2.747} = 190.2\ \text{m/s}$$
$$w = V_{w2}U_2 = 190.2\times212.1 = 40.3\ \text{kJ/kg}$$

**(iii) Power:** $P = 10\times40.3 = 403$ kW.

**(iv) Stagnation temperature rise:** $\Delta T_0 = 40\,340/1005 = 40.1$ K.

**(v) Degree of reaction:**
$$R = 1 - \frac{V_{w2}}{2U_2} = 1 - \frac{190.2}{424.1} = 0.552$$`,
            scheme: [
              { marks: 1, for: 'Blade speeds and inlet blade angle ≈ 32.5°' },
              { marks: 1, for: 'Outlet whirl from the outlet triangle' },
              { marks: 1, for: 'Work ≈ 40.3 kJ/kg and power ≈ 403 kW' },
              { marks: 1, for: 'Temperature rise ≈ 40 K and degree of reaction ≈ 0.55' },
            ],
          },
        ],
      },
      {
        number: 7,
        parts: [
          {
            id: 'x2-7a',
            label: 'a',
            marks: 4,
            prompt: md`Describe the Atkinson cycle with p-v and T-s diagrams and derive an expression for its thermal efficiency.`,
            topicIds: ['u3-atkinson'],
            alignsWith: 'The Atkinson cycle is named in the Unit 3 syllabus but has appeared in no ME203n, ME202 or ME211 paper. Untested syllabus items tend to surface in Q7.',
            answer: md`**Processes:** 1–2 isentropic compression ($r = v_1/v_2$); 2–3 heat addition at constant volume; 3–4 isentropic expansion **all the way down to the initial pressure** $p_1$, so the expansion ratio $r_e = v_4/v_3 > r$; 4–1 heat rejection at **constant pressure**.

**Heat:**
$$q_s = c_v(T_3 - T_2), \qquad q_r = c_p(T_4 - T_1)$$
$$\eta = 1 - \gamma\frac{T_4 - T_1}{T_3 - T_2}$$

**In terms of r and $r_e$:** $T_2 = T_1r^{\gamma-1}$ and $T_3 = T_4r_e^{\gamma-1}$. At constant pressure 4–1, $T_4/T_1 = v_4/v_1 = r_e/r$, so $T_4 = T_1r_e/r$ and $T_3 = T_1r_e^\gamma/r$.
$$\eta = 1 - \gamma\frac{T_1(r_e/r - 1)}{T_1(r_e^\gamma/r - r^{\gamma-1})} = \boxed{1 - \gamma\frac{r_e - r}{r_e^\gamma - r^\gamma}}$$

**Comment:** the complete expansion recovers the "toe" of the Otto diagram (the area 4'–4–1), so for the same compression ratio the Atkinson cycle is more efficient than the Otto cycle. However, it gives low work per unit swept volume. Modern hybrid-car engines get the effect with late inlet-valve closing (Miller/Atkinson timing).`,
            scheme: [
              { marks: 1, for: 'Processes with p-v and T-s diagrams' },
              { marks: 2, for: 'Derivation of the efficiency expression' },
              { marks: 1, for: 'Comparison with Otto / practical use' },
            ],
          },
          {
            id: 'x2-7b',
            label: 'b',
            marks: 4,
            prompt: md`Explain the effect of ambient (intake) temperature on the performance of a gas turbine plant. How is water injection used to recover the lost output?`,
            topicIds: ['u5-operating'],
            alignsWith: 'Water injection and the effect of operating variables are named in the Unit 5 syllabus. Neither has been examined, and Nov 2024 Q2(a) opened the "operating variables" theme with pressure ratio.',
            answer: md`**Effect of intake temperature $T_1$.** The compressor work per kg is proportional to $T_1$: $w_c = c_pT_1(r_p^{(\gamma-1)/\gamma} - 1)/\eta_c$. A hot day therefore:
- Raises the compressor work while the turbine work (fixed $T_3$) stays the same, so the **net work and work ratio fall**.
- Lowers the air density, so the **mass flow falls**. Output can drop by about 0.5–1% per °C above ISO 15 °C.
- Raises the compressor-delivery temperature, so less fuel can be added up to the fixed $T_3$. **Efficiency falls** and the heat rate rises.

The air rate (kg/kWh) rises, so a bigger plant is needed for the same output.

**Water injection**
- *Inlet fogging or evaporative cooling:* fine water spray in the intake evaporates and cools the air towards its wet-bulb temperature. Density and mass flow rise and compressor work falls, recovering 10–20% of output on hot, dry days.
- *Interstage (compressor) injection:* water injected between compressor stages evaporates during compression, a "wet compression" that acts like intercooling and reduces compressor work.
- *Combustor or turbine injection (steam or water):* adds mass flow through the turbine, raising output, and lowers flame temperature, so it also **cuts NOₓ**.

The cost is demineralised-water consumption and the risk of erosion or corrosion. It is used in stationary plants and, historically, for aircraft take-off.`,
            scheme: [
              { marks: 2, for: 'Effect of intake temperature on work, mass flow, efficiency and air rate' },
              { marks: 2, for: 'Water injection methods and their effects' },
            ],
          },
        ],
      },
    ],
  },
]
