import type { Paper } from '../types'

const md = String.raw

/**
 * ME203n End Term Examination, November 2025 — transcribed word for word from the photographed
 * scan (source/paper-2025-nov.pdf), including the paper's own spelling. The roll number written
 * on the scan is deliberately not reproduced.
 */
export const PAPER_2025: Paper = {
  id: 'official-2025-nov',
  kind: 'official',
  title: 'End Term Examination, November 2025',
  session: 'November 2025',
  blurb: 'The latest ME203n paper: air-standard cycles, gas turbines, SI combustion and valve timing, jets, reciprocating and centrifugal compressors.',
  current: true,
  sourceFile: 'source/paper-2025-nov.pdf',
  header: {
    semester: 'III Semester',
    programme: 'B. Tech, Mechanical Engineering',
    exam: 'End Term Examination',
    course: 'ME 203n, Thermal Engineering II',
    time: '3:00 Hours',
    maxMarks: 40,
    note: [
      'i) Answer any five questions.',
      'ii) Draw neat diagram (appropriately labelled), whenever required.',
      'iii) Answer to each question must start on a fresh page.',
      'iv) All parts of a question must be answered in one place only.',
      'v) Assume missing data, if any.',
    ],
  },
  attempt: 5,
  questions: [
    /* ---------------------------------------------------------------- Q1 */
    {
      number: 1,
      parts: [
        {
          id: 'p25-1a',
          label: 'a',
          marks: 4,
          tag: '[4][CO2,3][BT2,3]',
          prompt: md`What are the assumptions made in analyzing air standard cycles? Derive an expression to calculate efficiency of Otto cycle in terms of compression ratio and specific heat ratio.`,
          topicIds: ['u3-air-standard', 'u3-otto'],
          answer: md`**Air-standard assumptions**
1. The working fluid is air only, behaving as an ideal gas with constant specific heats ($c_p$, $c_v$, $\gamma = 1.4$).
2. The mass of air is fixed: a closed cycle, with no intake, exhaust or fuel added.
3. Combustion is replaced by heat added from an external source, and exhaust by heat rejected to a sink.
4. Compression and expansion are reversible adiabatic (isentropic).
5. All processes are internally reversible; kinetic and potential energy changes are neglected.

**Otto cycle efficiency.** 1–2 isentropic compression, 2–3 heat added at constant volume, 3–4 isentropic expansion, 4–1 heat rejected at constant volume. Per kg:
$$q_s = c_v(T_3 - T_2), \qquad q_r = c_v(T_4 - T_1)$$
$$\eta = 1 - \frac{q_r}{q_s} = 1 - \frac{T_4 - T_1}{T_3 - T_2}$$
With compression ratio $r = v_1/v_2 = v_4/v_3$, the two isentropes give
$$\frac{T_2}{T_1} = r^{\gamma-1} = \frac{T_3}{T_4} \;\Rightarrow\; T_2 = T_1 r^{\gamma-1},\; T_3 = T_4 r^{\gamma-1}$$
$$\eta_{Otto} = 1 - \frac{T_4 - T_1}{r^{\gamma-1}(T_4 - T_1)} = 1 - \frac{1}{r^{\gamma-1}}$$
Efficiency depends only on $r$ and $\gamma$, and rises with both.`,
          scheme: [
            { marks: 1.5, for: 'At least four correct air-standard assumptions' },
            { marks: 0.5, for: 'p-v / T-s diagram of the Otto cycle with processes named' },
            { marks: 2, for: 'Heat supplied/rejected, isentropic temperature ratios and η = 1 − 1/r^(γ−1)' },
          ],
        },
        {
          id: 'p25-1b',
          label: 'b',
          marks: 4,
          tag: '[4][CO3][BT3]',
          prompt: md`In an air standard Diesel cycle of compression ratio 16.0, air enters at 1.0 bar and 27°C. Assuming that it has cylinder bore = 200 mm, stroke length = 300 mm and cut-off takes place at 8 percent of the stroke, determine
i) Clearance volume of the engine,
ii) Heat added per cycle,
iii) Work done per cycle and
iv) Air standard efficiency
Take γ = 1.4`,
          topicIds: ['u3-diesel'],
          answer: md`Take $c_p = 1.005$, $c_v = 0.718$ kJ/kg K, $R = 0.287$ kJ/kg K.

**(i) Clearance volume**
$$V_s = \frac{\pi}{4}(0.2)^2(0.3) = 9.425\times10^{-3}\ \text{m}^3, \qquad V_c = \frac{V_s}{r-1} = \frac{9.425\times10^{-3}}{15} = 6.283\times10^{-4}\ \text{m}^3 \approx 0.628\ \text{litre}$$

**Cut-off ratio:** $V_3 = V_c + 0.08V_s$, so $\rho = V_3/V_c = 1 + 0.08(r-1) = 1 + 0.08\times15 = 2.2$.

**Mass of air:** $V_1 = V_s + V_c = 0.010053$ m³, $m = \dfrac{p_1V_1}{RT_1} = \dfrac{100\times0.010053}{0.287\times300} = 0.01168$ kg.

**Temperatures:** $T_2 = 300\times16^{0.4} = 909.4$ K, $T_3 = \rho T_2 = 2000.7$ K, $T_4 = T_3(\rho/r)^{0.4} = 904.7$ K.

**(ii) Heat added per cycle**
$$Q_s = m c_p (T_3 - T_2) = 0.01168\times1.005\times1091.3 = 12.81\ \text{kJ}$$

**(iii) Work done per cycle**
$$Q_r = m c_v(T_4 - T_1) = 0.01168\times0.718\times604.7 = 5.07\ \text{kJ}, \qquad W = Q_s - Q_r = 7.74\ \text{kJ}$$

**(iv) Air-standard efficiency**
$$\eta = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^\gamma - 1}{\gamma(\rho - 1)} = 1 - \frac{1}{3.031}\cdot\frac{2.2^{1.4} - 1}{1.4\times1.2} = 0.604 = 60.4\%$$
Check: $W/Q_s = 7.74/12.81 = 0.604$ ✓

> [!NOTE]
> The same engine with compression ratio 15 is a Rathore Ch 11 problem (p. 376), answer 59.8%. The paper changed r to 16.`,
          scheme: [
            { marks: 1, for: 'Swept volume and clearance volume $V_c = V_s/(r-1) = 6.28\times10^{-4}$ m³' },
            { marks: 1, for: 'Cut-off ratio 2.2, mass of air and $T_2$, $T_3$, $T_4$' },
            { marks: 1, for: 'Heat added ≈ 12.8 kJ and work done ≈ 7.74 kJ per cycle' },
            { marks: 1, for: 'Efficiency ≈ 60.4% by formula, cross-checked' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q2 */
    {
      number: 2,
      parts: [
        {
          id: 'p25-2a',
          label: 'a',
          marks: 4,
          tag: '[4][CO3][BT3]',
          prompt: md`A gas turbine unit recives air at 1.0 bar and 300 K. The air is compressed adiabatically by the compressor unit to 6.2 bar where the compressor efficiency is 88 %. If the fuel has a heating value of 44.186 MJ/kg and the fuel air ratio used is 0.017, Calculate;
i) Temperature at the outlet of the combustion chamber,
ii) Work done on the compressor per kg of air,
iii) Work done by the turbine per kg of compressed air and
iv) Thermal efficiency. Assume; Turbine efficiency = 90%
γ (air) = 1.4, γ (burned gases) = 1.33
cₚ (air) = 1.005 kJ/kgK, cₚ (burned gases) = 1.147 kJ/kgK`,
          topicIds: ['u5-simple'],
          answer: md`Pressure ratio $r_p = 6.2$. Per kg of air, $f = 0.017$ kg of fuel.

**Compressor:** $T_{2s} = 300\times6.2^{0.4/1.4} = 505.3$ K, $T_2 = 300 + \dfrac{205.3}{0.88} = 533.3$ K.

**(i) Combustion chamber** (energy released by the fuel heats the gas mixture from $T_2$):
$$(1 + f)\,c_{pg}(T_3 - T_2) = f\times CV \;\Rightarrow\; T_3 = 533.3 + \frac{0.017\times44186}{1.017\times1.147} = 1177.2\ \text{K}$$

**(ii) Compressor work per kg air**
$$w_c = c_{pa}(T_2 - T_1) = 1.005\times233.3 = 234.4\ \text{kJ/kg}$$

**(iii) Turbine work.** $T_{4s} = T_3/6.2^{0.33/1.33} = 1177.2/1.5727 = 748.6$ K, $T_4 = 1177.2 - 0.9(428.6) = 791.4$ K.
$$w_t = c_{pg}(T_3 - T_4) = 1.147\times385.8 = 442.5\ \text{kJ per kg of gas} = 1.017\times442.5 = 450.0\ \text{kJ per kg of compressed air}$$

**(iv) Thermal efficiency**
$$w_{net} = 450.0 - 234.4 = 215.6\ \text{kJ/kg air}, \qquad q_s = f\times CV = 751.2\ \text{kJ/kg air}$$
$$\eta_{th} = \frac{215.6}{751.2} = 0.287 = 28.7\%$$

> [!NOTE]
> This is Rathore's Ch 27 problem (p. 961). The book prints 439.2 kJ/kg, 234.5 kJ/kg and 33.21%. The compressor and turbine works agree with the working above, but 33.21% cannot be reproduced from the data under any standard heat-balance convention (all give 28–29.5%). State your convention and show the working.`,
          scheme: [
            { marks: 1, for: 'Actual compressor exit temperature 533 K and compressor work ≈ 234 kJ/kg' },
            { marks: 1, for: 'Combustion-chamber energy balance giving $T_3$ ≈ 1177 K' },
            { marks: 1, for: 'Turbine exit temperature with γ = 1.33 and ηt, turbine work ≈ 450 kJ/kg air' },
            { marks: 1, for: 'Net work over heat supplied, η ≈ 28.7%' },
          ],
        },
        {
          id: 'p25-2b',
          label: 'b',
          marks: 4,
          tag: '[4][CO2,3][BT2,3]',
          prompt: md`Draw schematic diagram and the T-s diagram of reheat cycle gas turbine plant. Also write down expressions for its cycle efficiency and work output.`,
          topicIds: ['u5-reheat-intercool'],
          answer: md`**Schematic:** compressor C → combustion chamber CC₁ → high-pressure turbine HPT → reheater (second combustion chamber) CC₂ → low-pressure turbine LPT → exhaust. Both turbines and the compressor sit on one shaft driving the generator.

**T-s diagram:** 1–2 compression (1–2s ideal), 2–3 heat added at $p_2$, 3–4 expansion in HPT to an intermediate pressure $p_i$, 4–5 reheat at $p_i$ back to $T_5 = T_3$, 5–6 expansion in LPT to $p_1$. The diverging constant-pressure lines make the two smaller expansions together larger than a single expansion 3→6'.

**Work output** (per kg air, $c_p$ constant):
$$w_{net} = c_p\left[(T_3 - T_4) + (T_5 - T_6)\right] - c_p(T_2 - T_1)$$

**Heat supplied:**
$$q_s = c_p(T_3 - T_2) + c_p(T_5 - T_4)$$

**Cycle efficiency:**
$$\eta = \frac{(T_3 - T_4) + (T_5 - T_6) - (T_2 - T_1)}{(T_3 - T_2) + (T_5 - T_4)}$$
For maximum work with $T_5 = T_3$ the intermediate pressure is $p_i = \sqrt{p_2p_1}$, so both turbines have equal work. Reheat raises the work output but, without a regenerator, lowers efficiency slightly because the extra heat is added at a lower mean temperature.`,
          scheme: [
            { marks: 1.5, for: 'Labelled schematic: C, CC, HPT, reheater, LPT' },
            { marks: 1, for: 'T-s diagram with reheat process at intermediate pressure' },
            { marks: 1.5, for: 'Expressions for net work and cycle efficiency' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q3 */
    {
      number: 3,
      parts: [
        {
          id: 'p25-3a',
          label: 'a',
          marks: 4,
          tag: '[4][CO3,4][BT3,4]',
          prompt: md`Show the variations of pressure with the variation crank angle in SI engines operating at full load and explain the various stages of combustion. Also show the variations of pressure with the variation crank angle when engine is knocking.`,
          topicIds: ['u4-si-combustion'],
          answer: md`**p–θ diagram, normal combustion:** pressure rises along the compression line, the spark occurs at A (about 20–30° before TDC), the curve leaves the motoring line at B, rises steeply to a peak C about 10–15° after TDC, then falls along expansion.

**Stages of combustion (Ricardo):**
1. **Ignition lag / preparation phase (A–B):** a chemical process. From the spark until a self-propagating flame nucleus forms, roughly 10° of crank angle. The pressure rise is not yet visible. Its length depends on fuel, mixture strength, temperature and turbulence.
2. **Flame propagation (B–C):** the main stage. A turbulent flame front sweeps across the chamber and pressure rises steeply. Its rate depends on turbulence and mixture strength. Peak pressure should come soon after TDC.
3. **After-burning (C–D):** the flame reaches the walls, the flame speed falls and the remaining mixture burns during expansion. Pressure no longer rises.

**Knocking combustion:** the curve follows normal combustion until late in stage 2. Then the unburnt end gas auto-ignites before the flame reaches it, giving a sudden sharp pressure spike with high-frequency **oscillations** (pressure waves bouncing in the chamber) near and after the peak. Peak pressure is higher and the curve is jagged.`,
          scheme: [
            { marks: 1, for: 'p–θ diagram for normal combustion with spark point, separation from motoring line and peak' },
            { marks: 2, for: 'Three stages explained: ignition lag, flame propagation, after-burning' },
            { marks: 1, for: 'p–θ diagram with knock: sharp rise and pressure oscillations' },
          ],
        },
        {
          id: 'p25-3b',
          label: 'b',
          marks: 4,
          tag: '[4][CO3,4][BT3,4]',
          prompt: md`With the help of suitable diagrams, show the differences between ideal and actual valve timing of four stroke spark ignition engines. Why the closing opening of valves are not at dead centers?`,
          topicIds: ['u4-timing'],
          answer: md`**Ideal (theoretical) timing:** every event happens at a dead centre. The inlet valve opens at TDC and closes at BDC, the spark occurs at TDC, and the exhaust valve opens at BDC and closes at TDC. Each stroke is 180°.

**Actual timing (typical SI engine), drawn as a circle diagram:**
- IVO 10–20° before TDC; IVC 30–40° after BDC
- Spark 20–35° before TDC
- EVO 40–50° before BDC; EVC 10–15° after TDC
- **Valve overlap** around TDC, when both valves are open (≈ 20–35°)

**Why valves do not open and close at dead centres:**
1. Valves cannot open instantly. They must start opening early to be fully open when flow is needed.
2. **Late IVC:** the inertia of the incoming charge keeps it flowing in after BDC, improving volumetric efficiency.
3. **Early EVO:** releases exhaust pressure before BDC (blow-down), so less pumping work is needed in the exhaust stroke.
4. **Late EVC with overlap:** the outgoing exhaust's momentum scavenges the clearance space and helps draw in fresh charge.
5. **Spark before TDC:** combustion takes finite time, so ignition is advanced to reach peak pressure just after TDC.`,
          scheme: [
            { marks: 1, for: 'Ideal valve-timing diagram with events at dead centres' },
            { marks: 1.5, for: 'Actual timing diagram with IVO, IVC, EVO, EVC, overlap and typical angles' },
            { marks: 1.5, for: 'Reasons: valve lift time, charge inertia, blow-down, scavenging, spark advance' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q4 */
    {
      number: 4,
      parts: [
        {
          id: 'p25-4a',
          label: 'a',
          marks: 4,
          tag: '[4][CO3,4][BT3,4]',
          prompt: md`Draw the schematic diagram of a turbo jet engine and explain its working. What are the two major advantages and disadvantages of ram jet engine over turbo jet engine?`,
          topicIds: ['u6-turbojet', 'u6-ramjet-pulsejet'],
          answer: md`**Schematic:** diffuser → axial/centrifugal compressor → combustion chamber → turbine (on the same shaft as the compressor) → exhaust nozzle.

**Working:** air entering at flight velocity is slowed in the **diffuser**, giving a ram pressure rise. The **compressor** raises the pressure further (ratio 4–20). Fuel is sprayed into the **combustion chamber** and burnt at almost constant pressure. The hot gases expand partly in the **turbine**, which only produces the work needed to drive the compressor and accessories. They then expand fully in the **nozzle** to a high exit velocity $V_j$. Thrust:
$$F = \dot m_a\left[(1+f)V_j - V\right] + (p_e - p_a)A_e$$

**Ramjet compared with turbojet**

*Advantages*
1. No compressor or turbine and no moving parts, so it is simple, light and cheap, and has a high thrust-to-weight ratio.
2. No turbine-blade temperature limit, so it can burn at higher temperatures and works efficiently at high supersonic speeds (Mach 2–5).

*Disadvantages*
1. It produces no static thrust, so it cannot start from rest. It needs a booster or launch to a high speed first.
2. It is inefficient at subsonic speeds, because the ram compression is small, and it has high fuel consumption.`,
          scheme: [
            { marks: 1, for: 'Labelled schematic: diffuser, compressor, combustor, turbine, nozzle' },
            { marks: 1.5, for: 'Working of each component and how thrust is produced' },
            { marks: 1.5, for: 'Two advantages and two disadvantages of the ramjet' },
          ],
        },
        {
          id: 'p25-4b',
          label: 'b',
          marks: 4,
          tag: '[4][CO4,5][BT4,5]',
          prompt: md`Compare Otto and Diesel cycle for
i) Same compression ratio and heat input,
ii) Same pressure and temperature.`,
          topicIds: ['u3-comparison'],
          answer: md`Use the T-s diagram. Heat supplied is the area under the heat-addition line, and heat rejected is the area under the constant-volume line 4–1. $\eta = 1 - Q_r/Q_s$.

**(i) Same compression ratio and same heat input.** Both cycles share 1–2. Otto adds heat along a constant-volume line 2–3; Diesel adds heat along a constant-pressure line 2–3'. In the T-s diagram the constant-pressure line is flatter, so for equal area the Diesel point 3' ends further right. The Diesel therefore rejects more heat (larger area under 4'–1).
$$Q_{r,\,Diesel} > Q_{r,\,Otto} \;\Rightarrow\; \eta_{Otto} > \eta_{Diesel}$$

**(ii) Same maximum pressure and maximum temperature** (and same heat rejected, from the same state 1). Both cycles end at the same point 3 and reject heat along the same line 4–1. The Otto cycle must have a lower compression ratio to reach $p_{max}$ by constant-volume heating. The Diesel compresses further (to 2') and adds heat at constant pressure, so its heat-addition area is larger.
$$Q_{s,\,Diesel} > Q_{s,\,Otto},\ Q_r \text{ same} \;\Rightarrow\; \eta_{Diesel} > \eta_{Otto}$$

**Conclusion:** for the same compression ratio Otto is more efficient. For the same peak pressure and temperature, which are the real design limits, Diesel is more efficient. The dual cycle lies between them in both cases.`,
          scheme: [
            { marks: 2, for: 'Case (i): p-v/T-s diagrams, argument on heat rejected, η_Otto > η_Diesel' },
            { marks: 2, for: 'Case (ii): p-v/T-s diagrams, argument on heat supplied, η_Diesel > η_Otto' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q5 */
    {
      number: 5,
      parts: [
        {
          id: 'p25-5a',
          label: 'a',
          marks: 4,
          tag: '[4][CO1,2][BT1,2]',
          prompt: md`"Compressed air is used for many purposes." Give three examples where compressed air is required. Briefly explain the working of single stage reciprocating air compressor.`,
          topicIds: ['u1-basics'],
          answer: md`**Uses of compressed air** (any three): pneumatic tools such as drills, riveters and hammers; starting large diesel engines; air brakes in trains and trucks; spray painting and sand blasting; blast-furnace and Bessemer air supply; supercharging IC engines; gas-turbine plants; refrigeration and air-conditioning; conveying materials; tyre inflation.

**Single-stage reciprocating air compressor:** a piston moves in a cylinder fitted with spring-loaded, pressure-operated suction and delivery valves.
1. **Suction stroke:** the piston moves outward and the clearance air expands. Once the cylinder pressure falls just below atmospheric, the suction valve opens and fresh air is drawn in at nearly constant pressure $p_1$.
2. **Compression stroke:** the piston moves in, both valves are closed, and the air is compressed polytropically ($pV^n = C$) until its pressure just exceeds the receiver pressure $p_2$.
3. **Delivery:** the delivery valve opens and the air is pushed into the receiver at constant pressure $p_2$. The air left in the clearance space re-expands on the next suction stroke.

Work per cycle (no clearance) $= \dfrac{n}{n-1}p_1V_1\left[\left(\dfrac{p_2}{p_1}\right)^{(n-1)/n} - 1\right]$, the area of the p-V diagram.`,
          scheme: [
            { marks: 1, for: 'Three valid uses of compressed air' },
            { marks: 1, for: 'Sketch of cylinder, piston, suction and delivery valves and p-V diagram' },
            { marks: 2, for: 'Suction, compression and delivery described with valve action' },
          ],
        },
        {
          id: 'p25-5b',
          label: 'b',
          marks: 4,
          tag: '[4][CO2,5][BT2,5]',
          prompt: md`A single stage reciprocating air compressor has cylinder diameter and stroke of 200 mm and 300 mm respectively. The compressor sucks air at 1.0 bar and 27°C. The compressor delivers air at 8.0 bar while running at 100 rpm. Calculate,
i) Indicated power of the compressor,
ii) Mass of air delivered by the compressor per minute and
iii) Temperature of the air delivered by the compressor
The compressor follows the law pv¹·²⁵ = Constant.
Take R = 287 J/kgK.`,
          topicIds: ['u1-processes'],
          answer: md`Assume single-acting with clearance neglected.

$$V_s = \frac{\pi}{4}(0.2)^2(0.3) = 9.425\times10^{-3}\ \text{m}^3, \qquad \dot V = 9.425\times10^{-3}\times100 = 0.9425\ \text{m}^3/\text{min}$$

**(i) Indicated power**
$$W = \frac{n}{n-1}p_1\dot V\left[\left(\frac{p_2}{p_1}\right)^{(n-1)/n} - 1\right] = \frac{1.25}{0.25}\times100\times0.9425\left[8^{0.2} - 1\right]$$
$$= 5\times94.25\times0.5157 = 243.0\ \text{kJ/min} = 4.05\ \text{kW}$$

**(ii) Mass of air per minute**
$$\dot m = \frac{p_1\dot V}{RT_1} = \frac{100\times0.9425}{0.287\times300} = 1.095\ \text{kg/min}$$

**(iii) Delivery temperature**
$$T_2 = T_1\left(\frac{p_2}{p_1}\right)^{(n-1)/n} = 300\times8^{0.2} = 454.7\ \text{K} = 181.7\,^\circ\text{C}$$`,
          scheme: [
            { marks: 1, for: 'Swept volume and volume sucked per minute' },
            { marks: 1.5, for: 'Indicated power ≈ 4.05 kW from the polytropic work equation' },
            { marks: 0.5, for: 'Mass delivered ≈ 1.095 kg/min' },
            { marks: 1, for: 'Delivery temperature ≈ 454.7 K' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q6 */
    {
      number: 6,
      parts: [
        {
          id: 'p25-6a',
          label: 'a',
          marks: 4,
          tag: '[4][CO1,2,3][BT1,2,3]',
          prompt: md`What are the advantages and disadvantages of rotary compressor over reciprocating compressors? Explain the working of centrifugal compressor and derive an expression for its work done.`,
          topicIds: ['u2-construction', 'u2-velocity'],
          answer: md`**Rotary compared with reciprocating**
- *Advantages:* handles large volume flow in a small machine; steady, pulsation-free delivery; balanced, with little vibration and light foundations; runs at high speed and couples directly to turbines and motors; delivers clean, oil-free air; low maintenance (no valves).
- *Disadvantages:* low pressure ratio per stage; lower efficiency at high pressure ratios; efficiency falls away from the design point; prone to surging at low flow.

**Working of the centrifugal compressor:** air enters the eye of the impeller axially. The rotating vanes whirl it outward, raising its kinetic energy and, through the centrifugal effect, its static pressure. The **diffuser** (vaned or vaneless) around the impeller slows the air and converts kinetic energy into pressure. The **volute casing** collects the air and leads it to the outlet, with some further diffusion.

**Work done** (Euler). The torque on the air equals its rate of change of angular momentum:
$$T = \dot m\,(V_{w2}r_2 - V_{w1}r_1), \qquad P = T\omega = \dot m\,(V_{w2}U_2 - V_{w1}U_1)$$
With radial (no whirl) entry, $V_{w1} = 0$:
$$w = V_{w2}U_2\ \text{J/kg}$$
For radial vanes without slip, $V_{w2} = U_2$, so $w = U_2^2$. With slip factor σ and power-input factor ψ, $w = \psi\sigma U_2^2$.`,
          scheme: [
            { marks: 1, for: 'Advantages and disadvantages of rotary compressors' },
            { marks: 1.5, for: 'Working: impeller, diffuser, volute and energy conversion' },
            { marks: 1.5, for: 'Velocity triangles and derivation w = Vw2·U2 (radial entry)' },
          ],
        },
        {
          id: 'p25-6b',
          label: 'b',
          marks: 4,
          tag: '[4][CO3,5][BT3,5]',
          prompt: md`A centrifugal compressor delivers 50 kg of air per minute at a pressure of 2.0 bar and 97°C. The intake pressure and temperature of air is 1.0 bar and 15°C respectively. If no heat is lost to the surrounding, calculate,
i) Index of compression and
ii) power required, if compression is isothermal.
Take R = 287 J/kgK.`,
          topicIds: ['u1-processes', 'u2-efficiency'],
          answer: md`$T_1 = 288$ K, $T_2 = 370$ K, $p_2/p_1 = 2$, $\dot m = 50/60 = 0.8333$ kg/s.

**(i) Index of compression**
$$\frac{T_2}{T_1} = \left(\frac{p_2}{p_1}\right)^{(n-1)/n} \;\Rightarrow\; \frac{n-1}{n} = \frac{\ln(370/288)}{\ln 2} = \frac{0.2505}{0.6931} = 0.3615$$
$$n = \frac{1}{1 - 0.3615} = 1.566$$
(Greater than γ = 1.4: with no heat lost, internal friction heats the air further.)

**(ii) Isothermal power**
$$P_{iso} = \dot m R T_1\ln\frac{p_2}{p_1} = 0.8333\times0.287\times288\times\ln 2 = 47.7\ \text{kW}$$`,
          scheme: [
            { marks: 2, for: 'Polytropic temperature ratio solved for n ≈ 1.57' },
            { marks: 2, for: 'Isothermal power ≈ 47.7 kW' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q7 */
    {
      number: 7,
      stem: md`Write short notes on **any two** of the followings`,
      tag: '[4+4][CO2,4][BT2,4]',
      pick: 2,
      choice: 'any',
      parts: [
        {
          id: 'p25-7i',
          label: 'i',
          marks: 4,
          prompt: md`Emissions from gasoline and diesel engines`,
          topicIds: ['u4-si-combustion', 'u4-ci-combustion'],
          answer: md`**Main pollutants**
- **CO:** from incomplete combustion in rich zones. High in SI engines at idle and when rich; low in CI engines, which run lean.
- **Unburnt hydrocarbons (HC):** from quenching at cold walls, crevices, misfire and scavenging losses (two-strokes). Higher in SI engines.
- **Oxides of nitrogen (NOₓ):** formed at high flame temperature with excess oxygen. High in both engines, especially CI engines at high load.
- **Particulate matter / smoke (soot):** mainly CI engines, from fuel-rich zones in the heterogeneous spray.
- Also SO₂ (from sulphur in diesel), aldehydes, CO₂, and evaporative and crankcase emissions (SI).

**Control:** SI engines use a three-way catalytic converter (with a λ ≈ 1 sensor), EGR, PCV and charcoal canisters. CI engines use EGR, an oxidation catalyst, a diesel particulate filter, SCR with urea for NOₓ, high-pressure injection and low-sulphur fuel.`,
          scheme: [
            { marks: 2.5, for: 'Pollutants with their causes, contrasted for SI and CI engines' },
            { marks: 1.5, for: 'Control methods for each engine type' },
          ],
        },
        {
          id: 'p25-7ii',
          label: 'ii',
          marks: 4,
          prompt: md`Combustion phenomenon in CI engines`,
          topicIds: ['u4-ci-combustion'],
          answer: md`Fuel is injected late in compression into air hotter than the fuel's self-ignition temperature. Four stages on the p–θ diagram:
1. **Ignition delay (A–B):** from the start of injection to the start of combustion. It has a *physical* part (atomisation, evaporation, mixing) and a *chemical* part (pre-flame reactions). Fuel keeps accumulating during the delay.
2. **Rapid or uncontrolled combustion (B–C):** the fuel accumulated during the delay burns almost at once, giving a steep pressure rise. The longer the delay, the more violent this rise, and the more **diesel knock**.
3. **Controlled combustion (C–D):** fuel now burns about as fast as it is injected. The rate is set by injection and mixing, and pressure stays roughly constant.
4. **After-burning (D–E):** leftover fuel burns during expansion after injection ends.

Short delay is desirable. It is helped by high cetane number, high compression ratio, high intake temperature, and good turbulence and atomisation.`,
          scheme: [
            { marks: 1, for: 'p–θ diagram with injection start and the stages marked' },
            { marks: 3, for: 'Ignition delay, rapid, controlled and after-burning stages explained' },
          ],
        },
        {
          id: 'p25-7iii',
          label: 'iii',
          marks: 4,
          prompt: md`Velocity triangles for moving blades in centrifugal compressors.`,
          topicIds: ['u2-velocity'],
          answer: md`**Inlet (eye, radius $r_1$):** blade speed $U_1 = \pi D_1N/60$. Air usually enters radially into the impeller, with no whirl, so the absolute velocity $V_1 = V_{f1}$ is perpendicular to $U_1$. The relative velocity $V_{r1}$ makes the blade inlet angle $\beta_1$, with $\tan\beta_1 = V_{f1}/U_1$. The inducer vanes are set at $\beta_1$ for shock-free entry.

**Outlet (tip, radius $r_2$):** $U_2 = \pi D_2N/60$. The relative velocity $V_{r2}$ leaves at the blade outlet angle $\beta_2$. The absolute velocity $V_2$ has whirl component $V_{w2}$ and flow component $V_{f2}$:
$$V_{w2} = U_2 - \frac{V_{f2}}{\tan\beta_2}$$
For **radial vanes** ($\beta_2 = 90°$), $V_{w2} = U_2$. **Slip** makes the actual $V_{w2} = \sigma U_2$, with σ ≈ 0.9.

**Use:** work per kg $w = V_{w2}U_2 - V_{w1}U_1$, mass flow $\dot m = \rho\pi D b V_f$, and the degree of reaction follows from the triangles. Backward-curved vanes ($\beta_2 < 90°$) give lower work but a more stable characteristic.`,
          scheme: [
            { marks: 1.5, for: 'Inlet triangle with U1, V1 = Vf1, Vr1 and β1' },
            { marks: 1.5, for: 'Outlet triangle with U2, Vw2, Vf2, Vr2, β2; radial vanes and slip' },
            { marks: 1, for: 'Work-done expression from the triangles' },
          ],
        },
        {
          id: 'p25-7iv',
          label: 'iv',
          marks: 4,
          prompt: md`Jet Fuels`,
          topicIds: ['u6-intro'],
          answer: md`Jet fuels are kerosene-type distillates (for example Jet A/A-1, ATF, JP-5, JP-8) or wide-cut kerosene–naphtha blends (JP-4, Jet B).

**Required properties**
- High calorific value per unit mass **and** volume, to save weight and tank space.
- Low freezing point (Jet A-1 ≤ −47 °C) for high-altitude cold soak, and low viscosity for good atomisation.
- Low volatility and vapour pressure, to avoid vapour lock and boil-off at altitude, while still giving easy relight.
- High flash point for safety in handling.
- Thermal stability (the fuel cools the oil and other systems) and no gum or deposit formation.
- Low sulphur and aromatics, to limit corrosion, smoke and carbon deposits on blades and liners.
- Good lubricity for fuel pumps, and compatibility with seals.

Additives include anti-icing, antioxidant, anti-static and metal-deactivator agents. Sustainable aviation fuels (bio- or synthetic paraffinic kerosene) are blended to meet the same specification.`,
          scheme: [
            { marks: 1, for: 'Types of jet fuel (kerosene type, wide-cut)' },
            { marks: 3, for: 'Required properties with reasons' },
          ],
        },
      ],
    },
  ],
}
