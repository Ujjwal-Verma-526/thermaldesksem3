import type { Paper } from '../types'

const md = String.raw

/**
 * ME203n End Term Examination, November 2024 — transcribed word for word from the scan
 * (source/paper-2024-nov.pdf). Each question is tagged once, "[4,4][COx]". The roll number
 * written on the scan is deliberately not reproduced.
 */
export const PAPER_2024: Paper = {
  id: 'official-2024-nov',
  kind: 'official',
  title: 'End Term Examination, November 2024',
  session: 'November 2024',
  blurb: 'Dual and Diesel cycles, reheat-regenerative gas turbine, jets and propellants, SI and CI combustion, two-stage and centrifugal compressors.',
  current: true,
  sourceFile: 'source/paper-2024-nov.pdf',
  header: {
    semester: 'IIIrd Semester',
    programme: 'B.Tech. (ME)',
    exam: 'End Term Examination',
    course: 'ME 203n Thermal Engineering II',
    time: '3 Hours',
    maxMarks: 40,
    note: ['Attempt any FIVE questions. Assume suitable missing data, if any. For air take Cₚ = 1.005 kJ/kg K, Cᵥ = 0.718 kJ/kg K, γ = 1.4'],
  },
  attempt: 5,
  questions: [
    /* ---------------------------------------------------------------- Q1 */
    {
      number: 1,
      tag: '[4,4][CO1]',
      parts: [
        {
          id: 'p24-1a',
          label: 'a',
          marks: 4,
          prompt: md`With the help of p-v and T-s diagrams, Derive the expression for thermal efficiency of air standard Dual cycle.`,
          topicIds: ['u3-dual'],
          answer: md`**Processes:** 1–2 isentropic compression, 2–3 heat added at constant volume, 3–4 heat added at constant pressure, 4–5 isentropic expansion, 5–1 heat rejected at constant volume.

Define $r = v_1/v_2$, pressure ratio $\alpha = p_3/p_2$ and cut-off ratio $\rho = v_4/v_3$.

**Heat:**
$$q_s = c_v(T_3 - T_2) + c_p(T_4 - T_3), \qquad q_r = c_v(T_5 - T_1)$$

**Temperatures in terms of $T_1$:**
$$T_2 = T_1r^{\gamma-1}, \quad T_3 = \alpha T_2 = \alpha T_1 r^{\gamma-1}, \quad T_4 = \rho T_3 = \alpha\rho T_1r^{\gamma-1}$$
$$T_5 = T_4\left(\frac{v_4}{v_5}\right)^{\gamma-1} = T_4\left(\frac{\rho}{r}\right)^{\gamma-1} = \alpha\rho^\gamma T_1$$

**Efficiency:**
$$\eta = 1 - \frac{c_v(T_5 - T_1)}{c_v(T_3 - T_2) + c_p(T_4 - T_3)} = 1 - \frac{T_1(\alpha\rho^\gamma - 1)}{T_1r^{\gamma-1}\left[(\alpha - 1) + \gamma\alpha(\rho - 1)\right]}$$
$$\boxed{\eta_{dual} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\alpha\rho^\gamma - 1}{(\alpha - 1) + \gamma\alpha(\rho - 1)}}$$
With $\rho = 1$ it reduces to Otto; with $\alpha = 1$ it reduces to Diesel.`,
          scheme: [
            { marks: 1, for: 'p-v and T-s diagrams with the five processes' },
            { marks: 1, for: 'Heat supplied in two parts and heat rejected' },
            { marks: 2, for: 'All temperatures in terms of T1, r, α, ρ and the final efficiency expression' },
          ],
        },
        {
          id: 'p24-1b',
          label: 'b',
          marks: 4,
          prompt: md`In an air standard Diesel cycle, the stroke and bore of cylinder are 250 mm and 150 mm respectively. If the clearance volume is 0.0004 m³ and fuel injection takes place at constant pressure for 5 percent of the stroke. Calculate the efficiency of the engine. Draw p-v diagram.`,
          topicIds: ['u3-diesel'],
          answer: md`$$V_s = \frac{\pi}{4}(0.15)^2(0.25) = 4.418\times10^{-3}\ \text{m}^3, \qquad V_c = 0.0004\ \text{m}^3$$

**Compression ratio:**
$$r = \frac{V_s + V_c}{V_c} = \frac{0.004818}{0.0004} = 12.05$$

**Cut-off ratio:** injection lasts for 5% of the stroke, so $V_3 = V_c + 0.05V_s = 0.0004 + 0.000221 = 0.000621$ m³:
$$\rho = \frac{V_3}{V_c} = 1.552$$

**Efficiency:**
$$\eta = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^\gamma - 1}{\gamma(\rho - 1)} = 1 - \frac{1}{12.05^{0.4}}\cdot\frac{1.552^{1.4} - 1}{1.4\times0.552} = 1 - \frac{1}{2.704}\times1.100 = 0.593$$
$$\eta \approx 59.3\%$$

**p-v diagram:** 1–2 isentropic compression from $V_1 = 0.004818$ m³ to $V_c$; 2–3 constant-pressure heat addition to $V_3 = 0.000621$ m³; 3–4 isentropic expansion to $V_1$; 4–1 constant-volume heat rejection.`,
          scheme: [
            { marks: 1, for: 'Swept volume and compression ratio ≈ 12.05' },
            { marks: 1, for: 'Cut-off ratio ≈ 1.55 from 5% of stroke' },
            { marks: 1.5, for: 'Efficiency ≈ 59.3%' },
            { marks: 0.5, for: 'Labelled p-v diagram' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q2 */
    {
      number: 2,
      tag: '[4,4][CO2]',
      parts: [
        {
          id: 'p24-2a',
          label: 'a',
          marks: 4,
          prompt: md`Discuss the effect of pressure ratio on cycle efficiency and on specific work output of gas turbine.`,
          topicIds: ['u5-operating', 'u3-brayton'],
          answer: md`**Efficiency.** For the ideal Brayton cycle
$$\eta = 1 - \frac{1}{r_p^{(\gamma-1)/\gamma}}$$
so efficiency rises continuously with pressure ratio. It is independent of the maximum temperature. In the **actual** cycle (with $\eta_c$, $\eta_t$ < 1) efficiency rises to a maximum and then falls, because at high $r_p$ the compressor work, magnified by its inefficiency, eats up the turbine work. The optimum $r_p$ for efficiency increases with $T_3$.

**Specific work output.** With fixed $T_1$ and $T_3$,
$$w_{net} = c_pT_3\left(1 - \frac{1}{x}\right) - c_pT_1(x - 1), \qquad x = r_p^{(\gamma-1)/\gamma}$$
$w_{net}$ is zero at $r_p = 1$ and also at $x = T_3/T_1$, where compression reaches $T_3$ and no heat can be added. In between it peaks at
$$x = \sqrt{T_3/T_1} \;\Rightarrow\; r_{p,opt} = \left(\frac{T_3}{T_1}\right)^{\gamma/[2(\gamma-1)]}, \qquad w_{max} = c_p\left(\sqrt{T_3} - \sqrt{T_1}\right)^2$$

**Consequences:** the pressure ratio for maximum work is lower than that for maximum efficiency. A higher turbine inlet temperature raises both optima and the work output. Plants choose a compromise, often closer to maximum work, which keeps the plant small (low air rate).`,
          scheme: [
            { marks: 1.5, for: 'Efficiency vs r_p: ideal rises monotonically; actual has an optimum' },
            { marks: 1.5, for: 'Net work vs r_p with optimum r_p and maximum work expression' },
            { marks: 1, for: 'Sketch of η and w_net against r_p, effect of T3' },
          ],
        },
        {
          id: 'p24-2b',
          label: 'b',
          marks: 4,
          prompt: md`In a gas turbine cycle, air enters the compressor at 100 kPa, 300 K and is compressed to 1000 kPa. The temperature at the inlet to the first turbine is 1400 K. The expansion takes place isentropically in two stages with reheat to 1400 K between the two stages at a constant pressure of 300 kPa. A regenerator having an effectiveness of 100% is also incorporated in the cycle. Calculate the thermal efficiency of the cycle. Draw T-s diagram.`,
          topicIds: ['u5-reheat-intercool', 'u5-regeneration'],
          answer: md`Isentropic compression and expansion, $c_p = 1.005$, $\gamma = 1.4$, $(\gamma-1)/\gamma = 0.2857$.

**Compressor:** $T_2 = 300\times10^{0.2857} = 579.2$ K, $w_c = 1.005(279.2) = 280.6$ kJ/kg.

**HP turbine** (1000 → 300 kPa): $T_4 = 1400/(10/3)^{0.2857} = 992.5$ K.
**LP turbine** (300 → 100 kPa): $T_6 = 1400/3^{0.2857} = 1022.8$ K.
$$w_t = 1.005\left[(1400 - 992.5) + (1400 - 1022.8)\right] = 788.6\ \text{kJ/kg}$$

**Regenerator, ε = 100%:** compressed air is heated to the LP exhaust temperature, $T_x = T_6 = 1022.8$ K.

**Heat supplied:**
$$q_s = c_p(1400 - 1022.8) + c_p(1400 - 992.5) = 379.1 + 409.5 = 788.6\ \text{kJ/kg}$$

**Efficiency:**
$$\eta = \frac{w_t - w_c}{q_s} = \frac{788.6 - 280.6}{788.6} = 0.644 = 64.4\%$$
(With perfect regeneration the heat supplied equals the turbine work, so $\eta = 1 - w_c/w_t$.)

**T-s diagram:** 1–2 compression; 2–x regenerative heating; x–3 heating to 1400 K; 3–4 HP expansion to 300 kPa; 4–5 reheat to 1400 K; 5–6 LP expansion; 6–y exhaust cooled in the regenerator to $T_2$.`,
          scheme: [
            { marks: 1, for: 'Compressor exit temperature and work' },
            { marks: 1, for: 'Both turbine exit temperatures and total turbine work' },
            { marks: 1.5, for: 'Regenerator with ε = 1, heat supplied and η ≈ 64.4%' },
            { marks: 0.5, for: 'T-s diagram with reheat and regeneration' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q3 */
    {
      number: 3,
      tag: '[4, 4][CO3]',
      parts: [
        {
          id: 'p24-3a',
          label: 'a',
          marks: 4,
          prompt: md`Explain the working of a turbojet engine with the help of a diagram.`,
          topicIds: ['u6-turbojet'],
          answer: md`**Diagram:** inlet diffuser → compressor → combustion chambers → turbine → tail pipe and propelling nozzle, with the compressor and turbine on one shaft.

**Working**
1. **Diffuser:** air entering at flight speed is decelerated, converting kinetic energy into pressure (ram compression).
2. **Compressor:** an axial (or centrifugal) compressor raises the pressure further, typically by a ratio of 4–20.
3. **Combustion chamber:** fuel is sprayed in continuously and burnt at nearly constant pressure, raising the gas temperature to about 1100–1500 K.
4. **Turbine:** the hot gases expand partly through the turbine. It develops only enough power to drive the compressor and accessories.
5. **Nozzle:** the remaining expansion in the propelling nozzle accelerates the gases to a high jet velocity $V_j$.

The reaction to accelerating the gas is the thrust:
$$F = \dot m_a\left[(1 + f)V_j - V\right] + (p_e - p_a)A_e$$
Thrust power $= FV$. Propulsive efficiency $\eta_p = \dfrac{2V}{V_j + V}$.

The thermodynamic cycle is the open Brayton cycle: 1–2 diffuser plus compressor, 2–3 combustion, 3–4 turbine, 4–5 nozzle.`,
          scheme: [
            { marks: 1.5, for: 'Labelled diagram of the turbojet' },
            { marks: 2, for: 'Function of diffuser, compressor, combustor, turbine and nozzle' },
            { marks: 0.5, for: 'How thrust arises (thrust equation or momentum argument)' },
          ],
        },
        {
          id: 'p24-3b',
          label: 'b',
          marks: 4,
          prompt: md`What is a propellant? How are propellants classified? Give examples.`,
          topicIds: ['u6-rockets'],
          answer: md`**Propellant:** the material, fuel plus oxidiser, carried by a rocket. Its combustion produces high-pressure, high-temperature gases that are expanded through the nozzle to produce thrust. A rocket carries its own oxidiser, so it can work outside the atmosphere.

**Classification**
1. **Solid propellants:** fuel and oxidiser are mixed into a solid grain.
   - *Homogeneous (double-base):* nitrocellulose + nitroglycerine.
   - *Heterogeneous (composite):* an oxidiser such as ammonium perchlorate in a polymer binder/fuel such as HTPB or polyurethane, often with aluminium powder.
2. **Liquid propellants:**
   - *Monopropellants:* a single liquid containing both fuel and oxidiser, for example hydrogen peroxide, hydrazine, nitromethane.
   - *Bipropellants:* fuel and oxidiser stored separately, for example liquid hydrogen + liquid oxygen, kerosene (RP-1) + LOX, UDMH + N₂O₄.
   - *Hypergolic* bipropellants ignite on contact, for example hydrazine/UDMH + N₂O₄.
   - *Cryogenic* propellants (LH₂, LOX) are stored at very low temperatures.
3. **Hybrid propellants:** a solid fuel with a liquid oxidiser, for example HTPB + LOX or N₂O.

**Desirable properties:** high specific impulse (high heat release, low molecular-weight products), high density, stability in storage, safe handling, and low toxicity and corrosiveness.`,
          scheme: [
            { marks: 1, for: 'Definition of a propellant' },
            { marks: 2, for: 'Classification: solid (double-base, composite), liquid (mono, bi, hypergolic, cryogenic), hybrid' },
            { marks: 1, for: 'Correct examples for each class' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q4 */
    {
      number: 4,
      tag: '[4 ,4][CO4]',
      parts: [
        {
          id: 'p24-4a',
          label: 'a',
          marks: 4,
          prompt: md`Describe with suitable sketches the combustion phenomenon in S I Engines and explain the stages of combustion.`,
          topicIds: ['u4-si-combustion'],
          answer: md`A homogeneous air–fuel mixture is ignited by the spark, and a flame front travels from the plug across the chamber, burning the mixture as it goes.

**Sketches:** (1) the chamber with the spark plug and the advancing flame front, showing burnt gas behind it and unburnt end gas ahead; (2) the p–θ diagram showing the spark at A, the end of ignition lag at B, peak pressure at C just after TDC, and the motoring curve for comparison.

**Stages (Ricardo)**
1. **Ignition lag (A–B):** the time from the spark until a self-propagating flame kernel forms. It is a chemical process, with no visible pressure rise, and depends on the fuel, mixture ratio, temperature and pressure.
2. **Flame propagation (B–C):** the turbulent flame front spreads rapidly through the chamber and pressure rises steeply. The rate depends on turbulence, which increases with speed, on mixture strength (fastest slightly rich) and on compression ratio. The spark is timed so that the peak arrives about 10–15° after TDC.
3. **After-burning (C–D):** the flame slows near the walls and combustion is completed during expansion. Pressure falls.

If the end gas ahead of the flame auto-ignites before the flame arrives, the result is **knock** (detonation).`,
          scheme: [
            { marks: 1.5, for: 'Sketches: flame front in the chamber and p–θ diagram' },
            { marks: 2.5, for: 'Ignition lag, flame propagation and after-burning explained with influencing factors' },
          ],
        },
        {
          id: 'p24-4b',
          label: 'b',
          marks: 4,
          prompt: md`With the help of diagrams, explain the phenomenon of detonation or knocking in Diesel engine.`,
          topicIds: ['u4-ci-combustion'],
          answer: md`**Cause:** in a CI engine fuel is injected continuously, but it does not ignite until the **ignition delay** has passed. If the delay is long, a large amount of fuel accumulates and then auto-ignites all at once. The resulting very high rate of pressure rise ($dp/d\theta$) produces a hammering noise called **diesel knock**.

**Diagram:** p–θ curves for (1) normal combustion with a short delay, giving a moderate pressure rise, and (2) knocking combustion with a long delay, giving a near-vertical pressure rise and a high peak.

**Contrast with SI knock:** in SI engines knock is auto-ignition of the *end* of the charge, late in combustion. In CI engines it is the *start* of combustion that is too violent. So the remedies are opposite: what prevents SI knock (low temperature, long delay, low compression ratio) *causes* CI knock.

**Factors that reduce diesel knock** (all shorten the delay):
- High cetane number fuel
- Higher compression ratio
- High intake air temperature and pressure (supercharging)
- High jacket temperature
- Good atomisation and air swirl
- Reduced injection rate at the start (pilot injection)
- Correct injection timing`,
          scheme: [
            { marks: 1.5, for: 'Mechanism: long ignition delay, fuel accumulation, sudden pressure rise' },
            { marks: 1, for: 'p–θ diagram comparing normal and knocking combustion' },
            { marks: 1.5, for: 'Factors and remedies (and contrast with SI knock)' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q5 */
    {
      number: 5,
      tag: '[4 ,4][CO5]',
      parts: [
        {
          id: 'p24-5a',
          label: 'a',
          marks: 4,
          prompt: md`Derive the expression of condition for optimum intermediate pressure in a two-stage reciprocating air compressor with the help of P-v diagram.`,
          topicIds: ['u1-multistage'],
          answer: md`**Assumptions:** the same index $n$ in both stages; perfect intercooling (air cooled back to $T_1$ at the intermediate pressure $p_2$); clearance neglected.

**P-v diagram:** LP compression 1–2 along $pV^n = C$ to $p_2$; intercooling 2–2' at constant $p_2$ back to the isotherm through 1; HP compression 2'–3 to $p_3$. The shaded area between 2–2'–3 and the single-stage curve is the work saved.

Since $p_1V_1 = p_2V_2' = mRT_1$, the total work is
$$W = \frac{n}{n-1}mRT_1\left[\left(\frac{p_2}{p_1}\right)^{(n-1)/n} + \left(\frac{p_3}{p_2}\right)^{(n-1)/n} - 2\right]$$

**Minimise with respect to $p_2$.** Let $k = (n-1)/n$:
$$\frac{dW}{dp_2} = 0 \;\Rightarrow\; k\,p_1^{-k}p_2^{k-1} - k\,p_3^{k}p_2^{-k-1} = 0 \;\Rightarrow\; p_2^{2k} = (p_1p_3)^k$$
$$\boxed{p_2 = \sqrt{p_1p_3}} \qquad \text{i.e.}\quad \frac{p_2}{p_1} = \frac{p_3}{p_2}$$

**Consequences:** with equal pressure ratios each stage does equal work, and the minimum work is
$$W_{min} = \frac{2n}{n-1}p_1V_1\left[\left(\frac{p_3}{p_1}\right)^{(n-1)/2n} - 1\right]$$
For $z$ stages the stage ratio is $(p_{z+1}/p_1)^{1/z}$.`,
          scheme: [
            { marks: 1, for: 'P-v diagram with two stages and perfect intercooling' },
            { marks: 1, for: 'Total work in terms of p1, p2, p3' },
            { marks: 1.5, for: 'Differentiation giving p2 = √(p1p3)' },
            { marks: 0.5, for: 'Equal stage work and minimum-work expression' },
          ],
        },
        {
          id: 'p24-5b',
          label: 'b',
          marks: 4,
          prompt: md`A double-acting reciprocating compressor with a piston displacement of 0.05 m³ per stroke operates at 500 rpm. The clearance is 5 per cent and it receives air at 100 kPa, discharges it at 600 kPa. The compression is polytropic, pV¹·³⁵ = constant. Calculate the power required and the air discharged in m³/s. Draw p-V diagram.`,
          topicIds: ['u1-clearance'],
          answer: md`**Volumetric efficiency** (c = 0.05):
$$\eta_v = 1 + c - c\left(\frac{p_2}{p_1}\right)^{1/n} = 1.05 - 0.05\times6^{1/1.35} = 1.05 - 0.05\times3.770 = 0.8615$$

**Swept volume:** double-acting, so $0.05\times500\times2 = 50$ m³/min.
**Air taken in** (at 100 kPa): $\dot V_1 = 0.8615\times50 = 43.07$ m³/min $= 0.718$ m³/s.

**Power** (clearance air re-expands, so work depends only on the air actually induced):
$$P = \frac{n}{n-1}p_1\dot V_1\left[\left(\frac{p_2}{p_1}\right)^{(n-1)/n} - 1\right] = \frac{1.35}{0.35}\times100\times0.718\times(6^{0.2593} - 1)$$
$$= 3.857\times71.8\times0.5913 = 163.7\ \text{kW}$$

**Air discharged:**
- As free air (at intake conditions): $0.718$ m³/s
- At the delivery state (600 kPa): $\dot V_2 = 0.718/6^{1/1.35} = 0.190$ m³/s

**p-V diagram:** clearance volume $V_c = 0.05V_s$; compression along $pV^{1.35} = C$ to 600 kPa; delivery at constant pressure; re-expansion of clearance air to 100 kPa; induction of $\eta_vV_s$.`,
          scheme: [
            { marks: 1, for: 'Volumetric efficiency ≈ 0.86 with clearance' },
            { marks: 1, for: 'Effective volume induced (double acting) ≈ 0.718 m³/s' },
            { marks: 1.5, for: 'Power ≈ 164 kW' },
            { marks: 0.5, for: 'Discharge volume and p-V diagram with clearance and re-expansion' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q6 */
    {
      number: 6,
      tag: '[4 ,4][CO6]',
      parts: [
        {
          id: 'p24-6a',
          label: 'a',
          marks: 4,
          prompt: md`With the help of diagrams, explain the working of centrifugal air compressor. Mention its advantages.`,
          topicIds: ['u2-construction'],
          answer: md`**Diagram:** casing with a central eye (inlet); impeller with radial or backward-curved vanes mounted on the shaft; vaneless space; vaned diffuser ring; volute (scroll) casing leading to the delivery pipe. Add a sketch of how pressure and velocity change through the eye, impeller, diffuser and volute.

**Working**
1. Air is drawn axially into the **eye** of the impeller. Inlet guide vanes or an inducer turn it smoothly into the vanes.
2. The **impeller**, running at high speed, whirls the air outward. Its velocity rises, and its static pressure rises through the centrifugal effect. About half of the total pressure rise occurs here.
3. In the **diffuser** the flow area increases, so the air slows down and its kinetic energy is converted into pressure.
4. The **volute** collects the air and diffuses it further before delivery.
Work input per kg: $w = V_{w2}U_2$ (≈ $\sigma U_2^2$ for radial vanes). Pressure ratio per stage is about 4:1.

**Advantages**
- Simple and rugged, with no rubbing parts or valves; reliable and cheap.
- Steady, pulsation-free delivery of large volumes of clean, oil-free air.
- Wide stable operating range and less sensitive to deposits than axial compressors.
- Higher pressure ratio per stage than an axial stage.
- Short axial length and easy to multistage; good for small gas turbines and turbochargers.`,
          scheme: [
            { marks: 1.5, for: 'Labelled diagram: eye, impeller, diffuser, volute' },
            { marks: 1.5, for: 'Working with energy conversion in each element' },
            { marks: 1, for: 'At least three advantages' },
          ],
        },
        {
          id: 'p24-6b',
          label: 'b',
          marks: 4,
          prompt: md`Describe the concept of surging and choking phenomenon in air compressors with the help of diagram.`,
          topicIds: ['u2-surging'],
          answer: md`**Diagram:** the compressor characteristic, pressure ratio against mass flow, for several speeds. Each curve rises to a peak; the surge line joins the peaks; the curves drop vertically at the choking limit on the right.

**Surging:** at a given speed, suppose delivery is throttled and the flow drops below the peak of the characteristic. The compressor can then no longer maintain the pressure in the delivery system. The flow momentarily reverses, the delivery pressure falls, the compressor recovers and builds pressure again, and the cycle repeats. The result is a violent, low-frequency oscillation of flow and pressure, with noise and vibration, overheating and possible blade damage. Operation must stay to the right of the surge line, with a surge margin. Surge is avoided with blow-off valves, variable inlet guide vanes and good matching.

**Rotating stall** often precedes surge. Some blade passages stall and the stalled cells rotate around the annulus.

**Choking:** as flow increases at a given speed, the velocity at the narrowest section (the impeller inlet or the diffuser throat) reaches sonic speed (M = 1). Mass flow cannot increase further, however much the back pressure is lowered, and the characteristic falls vertically. Efficiency drops sharply near choke.

The stable operating range lies between the surge line and the choke line.`,
          scheme: [
            { marks: 1, for: 'Characteristic (pressure ratio vs flow) showing surge line and choke limit' },
            { marks: 1.5, for: 'Surging: mechanism, effects and prevention' },
            { marks: 1.5, for: 'Choking: sonic throat, maximum mass flow' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q7 */
    {
      number: 7,
      tag: '[4 ,4][CO4, CO2]',
      parts: [
        {
          id: 'p24-7a',
          label: 'a',
          marks: 4,
          prompt: md`Describe the valve timing diagram for a four-stroke petrol engine.`,
          topicIds: ['u4-timing'],
          answer: md`**Diagram (circle, crank angles measured from TDC/BDC)**
- IVO: 10–20° before TDC
- IVC: 30–45° after BDC
- Spark: 20–35° before TDC (varies with speed and load)
- EVO: 40–55° before BDC
- EVC: 10–15° after TDC
- **Valve overlap** (both open) around TDC: 20–35°

**Description**
- **Suction:** the inlet valve opens before TDC so it is well open when the piston starts down. It closes after BDC because the inertia of the moving charge keeps filling the cylinder (ram effect), improving volumetric efficiency.
- **Compression:** starts only after IVC, so the effective compression stroke is shorter than the geometric one.
- **Ignition:** the spark comes before TDC because flame development takes time. Peak pressure then occurs about 10–15° after TDC.
- **Exhaust:** the exhaust valve opens before BDC, so most of the gas blows down under its own pressure, reducing pumping work. It closes after TDC, so the exhaust momentum scavenges the clearance space.
- **Overlap:** kept small in petrol engines, since fresh charge would escape with the exhaust.

The **actual** diagram differs from the theoretical one, in which every event is at a dead centre and each stroke is 180°.`,
          scheme: [
            { marks: 2, for: 'Timing diagram with IVO, IVC, ignition, EVO, EVC and overlap with typical angles' },
            { marks: 2, for: 'Reasons for each early or late event' },
          ],
        },
        {
          id: 'p24-7b',
          label: 'b',
          marks: 4,
          prompt: md`List out the differences between open and closed cycle gas turbines. Also, draw schematic diagram of each cycle.`,
          topicIds: ['u5-intro', 'u5-simple'],
          answer: md`**Schematics**
- *Open cycle:* atmospheric air → compressor → combustion chamber (fuel burnt directly in the air) → turbine → exhaust to atmosphere.
- *Closed cycle:* the same working fluid circulates: compressor → heater (heat exchanger, external combustion) → turbine → pre-cooler (heat rejected to cooling water) → back to compressor.

| Open cycle | Closed cycle |
|---|---|
| Fresh air is taken in each cycle and the products are exhausted | The same working fluid (air, helium, CO₂) is recirculated |
| Internal combustion: fuel burns in the working fluid | External heating through a heat exchanger |
| Only clean fuels (gas, kerosene) can be used, since the products pass through the turbine | Any fuel, including coal or nuclear heat, can be used |
| Light, compact, quick starting; low first cost | Heavy and bulky (heater and cooler); higher cost |
| No cooler needed, so suited to aircraft | Needs a pre-cooler and plenty of cooling water |
| Pressure level fixed near atmospheric | Can be pressurised, so smaller machines for the same output and part-load control by pressure level |
| Turbine blades fouled and eroded by combustion products | Clean working fluid: no erosion or corrosion |
| Efficiency sensitive to ambient conditions | Higher part-load efficiency |`,
          scheme: [
            { marks: 1, for: 'Schematic of the open cycle' },
            { marks: 1, for: 'Schematic of the closed cycle with heater and pre-cooler' },
            { marks: 2, for: 'At least four correct differences' },
          ],
        },
      ],
    },
  ],
}
