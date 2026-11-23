import type { Paper } from '../types'

const md = String.raw

const GAS_DYNAMICS =
  'Compressible flow (Mach number, stagnation properties, nozzles, shock waves) was part of the older ME202 course. It is not in the ME203n syllabus this desk follows.'

/**
 * ME202 End Semester Examination, May 2023 (4th semester, the older course code) — transcribed
 * word for word from the scan (source/paper-2023-may.pdf), including the paper's own option letters
 * (e–h, d–f) and spelling. The roll number on the scan is deliberately not reproduced.
 */
export const PAPER_2023: Paper = {
  id: 'official-2023-may',
  kind: 'official',
  title: 'End Semester Examination, May 2023',
  session: 'May 2023',
  blurb: 'The older ME202 course, with internal choice: jets, compressible flow, centrifugal and reciprocating compressors, Brayton cycle.',
  current: false,
  sourceFile: 'source/paper-2023-may.pdf',
  header: {
    semester: 'Fourth Semester',
    programme: 'B.Tech. (ME)',
    exam: 'End Semester Examination',
    course: 'ME202 Thermal Engineering - II',
    time: '3:00 Hours',
    maxMarks: 40,
    note: ['All FIVE questions are compulsory. All questions carry equal marks.', 'Q.3 & Q.4 have internal choice.', 'Assume suitable data, wherever needed, if missing.'],
  },
  questions: [
    /* ---------------------------------------------------------------- Q1 */
    {
      number: 1,
      stem: md`Write short notes on **ANY TWO** of the following, **using suitable diagrams**:`,
      tag: '(4x2 = 8) [CO 1]',
      pick: 2,
      choice: 'any',
      parts: [
        {
          id: 'p23-1e',
          label: 'e',
          marks: 4,
          prompt: md`Turbo Propellor & Turbojet Engines`,
          topicIds: ['u6-turboprop', 'u6-turbojet'],
          answer: md`**Turbojet:** diffuser → compressor → combustor → turbine → nozzle. The turbine drives only the compressor, and all the thrust comes from a high-velocity jet. Its propulsive efficiency is good only at high subsonic and supersonic speeds, and it is noisy, with high fuel consumption at low speed.

**Turboprop:** the same gas generator, but the turbine has extra stages that extract most of the gas energy and drive a **propeller through a reduction gearbox**. Roughly 80–90% of the thrust comes from the propeller, which moves a large mass of air at a small velocity increase. The rest comes from the exhaust jet.

| | Turbojet | Turboprop |
|---|---|---|
| Thrust source | Jet only | Mainly propeller + some jet |
| Best speed | 800–2500 km/h | 400–750 km/h |
| Propulsive efficiency | High only at high speed | High at low and medium speed |
| Take-off thrust | Low | High (short take-off) |
| Complexity | Simple | Gearbox, heavier, propeller limits speed |

Sketch both engines, showing the gearbox and propeller on the turboprop.`,
          scheme: [
            { marks: 2, for: 'Diagrams of both engines' },
            { marks: 2, for: 'Working and comparison (thrust source, speed range, efficiency)' },
          ],
        },
        {
          id: 'p23-1f',
          label: 'f',
          marks: 4,
          prompt: md`Ramjet engine & pulse jet engine.`,
          topicIds: ['u6-ramjet-pulsejet'],
          answer: md`**Ramjet:** a duct with a supersonic or subsonic diffuser, a combustion chamber with flame holders, and a nozzle. It has **no moving parts**. The high flight speed compresses the incoming air by ram effect, fuel is burnt, and the gases expand through the nozzle to give thrust.
- Simple, light and cheap; best at Mach 2–5.
- Produces no static thrust, so it needs a booster to start, and it is inefficient at low speed.

**Pulse jet:** a diffuser with **spring-loaded flap (reed) valves**, a combustion chamber with a spark plug, and a long tail pipe. Combustion is intermittent:
1. Air enters through the open valves; fuel is injected and ignited.
2. The pressure rise closes the valves, and the gases rush out of the tail pipe, producing thrust.
3. The momentum of the outgoing gas creates a partial vacuum, which reopens the valves and admits fresh air. Hot residual gas ignites the new charge.
The cycle repeats about 40–250 times per second.
- Produces static thrust and is very simple and cheap (used in the V-1 flying bomb and in targets).
- Noisy and vibrating; valve life is short; low efficiency; speed below about 800 km/h.`,
          scheme: [
            { marks: 2, for: 'Ramjet: diagram, working, merits and limits' },
            { marks: 2, for: 'Pulse jet: diagram, intermittent cycle with valves, merits and limits' },
          ],
        },
        {
          id: 'p23-1g',
          label: 'g',
          marks: 4,
          prompt: md`Compressible and incompressible fluid flow.`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`**Incompressible flow:** the density stays essentially constant ($\rho$ = constant), so continuity is $AV$ = constant and Bernoulli's equation applies. Pressure changes come only from velocity and elevation changes, and temperature is decoupled from the flow. Examples: liquids, and gases at low speed (M < 0.3, where the density change is below about 5%).

**Compressible flow:** the density changes appreciably with pressure and temperature. Continuity becomes $\rho AV$ = constant, and the energy equation $h + V^2/2$ = constant links velocity with temperature. The governing parameter is the **Mach number** $M = V/a$, with $a = \sqrt{\gamma RT}$. Examples: high-speed gas flow in nozzles, turbines, compressors and aircraft (M > 0.3).

**Regimes:** incompressible (M < 0.3), subsonic (M < 1), transonic (≈ 0.8–1.2), supersonic (M > 1) and hypersonic (M > 5).

**Key differences:** in compressible flow a converging duct accelerates subsonic flow but decelerates supersonic flow ($dA/A = (M^2 - 1)\,dV/V$). Pressure disturbances travel at finite speed, giving the Mach cone. Shock waves can form.`,
          scheme: [
            { marks: 1.5, for: 'Definitions with governing equations for both' },
            { marks: 1.5, for: 'Mach number criterion and flow regimes' },
            { marks: 1, for: 'Key behavioural differences and examples' },
          ],
        },
        {
          id: 'p23-1h',
          label: 'h',
          marks: 4,
          prompt: md`Shock waves and its applications.`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`**Shock wave:** an extremely thin region (a few mean free paths) across which a supersonic flow changes abruptly to a lower velocity. Pressure, temperature and density rise suddenly. The process is irreversible and adiabatic: stagnation temperature stays constant, while entropy rises and stagnation pressure falls.

**Normal shock:** perpendicular to the flow. Upstream $M_1 > 1$, downstream $M_2 < 1$:
$$M_2^2 = \frac{M_1^2 + \frac{2}{\gamma - 1}}{\frac{2\gamma}{\gamma - 1}M_1^2 - 1}, \qquad \frac{p_2}{p_1} = \frac{2\gamma M_1^2 - (\gamma - 1)}{\gamma + 1}$$
**Oblique shock:** inclined to the flow. It deflects the flow, and the downstream flow may remain supersonic.

**Where shocks occur and their applications**
- In convergent–divergent nozzles running off design (over-expanded): normal shocks in the diverging part.
- Supersonic intakes of ramjets and jet engines: oblique and normal shock systems used to compress the air (shock diffusers).
- Supersonic aircraft and projectiles: bow shocks, sonic boom and wave drag.
- Shock tubes and shock tunnels for high-temperature gas research.
- Blast waves from explosions; lithotripsy (breaking kidney stones); shock-wave cleaning and forming.`,
          scheme: [
            { marks: 1.5, for: 'Definition and property changes across a shock (irreversible, T0 constant, p0 falls)' },
            { marks: 1, for: 'Normal and oblique shocks' },
            { marks: 1.5, for: 'At least three applications or occurrences' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q2 */
    {
      number: 2,
      stem: md`Derive **ANY TWO** of the following equations:`,
      tag: '(4x2= 8) [CO 2]',
      pick: 2,
      choice: 'any',
      parts: [
        {
          id: 'p23-2d',
          label: 'd',
          marks: 4,
          prompt: md`For a steady one-dimensional flow derive the continuity equation for perfect gases in terms of Mach number?`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`Continuity: $\dot m = \rho AV$ is constant. For a perfect gas $\rho = p/RT$, $V = Ma$ and $a = \sqrt{\gamma RT}$:
$$\dot m = \frac{p}{RT}A\,M\sqrt{\gamma RT} = pAM\sqrt{\frac{\gamma}{RT}}$$

**In stagnation terms.** Using $T_0/T = 1 + \frac{\gamma-1}{2}M^2$ and $p_0/p = (T_0/T)^{\gamma/(\gamma-1)}$:
$$\frac{\dot m\sqrt{RT_0}}{Ap_0} = \sqrt{\gamma}\,M\left(1 + \frac{\gamma - 1}{2}M^2\right)^{-\frac{\gamma + 1}{2(\gamma - 1)}}$$

**Differential form.** Take logs of $\rho AV$ = constant: $\dfrac{d\rho}{\rho} + \dfrac{dA}{A} + \dfrac{dV}{V} = 0$. Combine with Euler's equation, $dp/\rho + V\,dV = 0$, and $dp = a^2d\rho$, which give $d\rho/\rho = -M^2\,dV/V$:
$$\frac{dA}{A} = (M^2 - 1)\frac{dV}{V}$$
Setting the derivative of the mass-flow function to zero shows it is maximum at M = 1, which is the choked throat.`,
          scheme: [
            { marks: 1.5, for: 'ṁ = pAM√(γ/RT) from ρAV with the perfect-gas relation' },
            { marks: 1.5, for: 'Stagnation form of the mass-flow function' },
            { marks: 1, for: 'Differential form dA/A = (M² − 1)dV/V or maximum flow at M = 1' },
          ],
        },
        {
          id: 'p23-2e',
          label: 'e',
          marks: 4,
          prompt: md`For a steady one-dimensional flow derive the stagnation pressure-energy equation for a perfect gas in terms of Mach number?`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`**Energy equation** (adiabatic, no work): $h + \dfrac{V^2}{2} = h_0$. With $h = c_pT$:
$$T_0 = T + \frac{V^2}{2c_p}$$

Using $c_p = \dfrac{\gamma R}{\gamma - 1}$ and $V^2 = M^2\gamma RT$:
$$\frac{T_0}{T} = 1 + \frac{(\gamma - 1)V^2}{2\gamma RT} = 1 + \frac{\gamma - 1}{2}M^2$$

**Stagnation pressure.** Bringing the flow to rest isentropically gives $p_0/p = (T_0/T)^{\gamma/(\gamma-1)}$:
$$\frac{p_0}{p} = \left(1 + \frac{\gamma - 1}{2}M^2\right)^{\frac{\gamma}{\gamma - 1}}, \qquad \frac{\rho_0}{\rho} = \left(1 + \frac{\gamma - 1}{2}M^2\right)^{\frac{1}{\gamma - 1}}$$

**Low-speed check:** a binomial expansion gives
$$p_0 = p + \tfrac12\rho V^2\left(1 + \frac{M^2}{4} + \frac{2 - \gamma}{24}M^4 + \dots\right)$$
At low M this reduces to Bernoulli's equation; the bracket is the compressibility correction.`,
          scheme: [
            { marks: 1.5, for: 'Energy equation and T0/T = 1 + (γ−1)M²/2' },
            { marks: 1.5, for: 'Isentropic p0/p relation' },
            { marks: 1, for: 'Expansion showing the compressibility correction to Bernoulli' },
          ],
        },
        {
          id: 'p23-2f',
          label: 'f',
          marks: 4,
          prompt: md`Derive the expression for reversible, isentropic work of compression for reciprocating compressors, by using steady flow energy equation.`,
          topicIds: ['u1-basics', 'u1-processes'],
          answer: md`**SFEE** per kg, with KE and PE changes negligible:
$$q - w = h_2 - h_1$$
For a reversible process $\delta q = T\,ds = dh - v\,dp$, so the shaft work in is
$$w_{in} = \int_1^2 v\,dp$$
This is the area to the left of the p-v curve, which includes the suction and delivery flow work.

**Isentropic** ($q = 0$): $w_{in} = h_2 - h_1 = c_p(T_2 - T_1)$. Using $pv^\gamma = C$, $v = (C/p)^{1/\gamma}$:
$$w_{in} = \int_{p_1}^{p_2}v\,dp = \frac{\gamma}{\gamma - 1}(p_2v_2 - p_1v_1)$$
$$\boxed{w_{in} = \frac{\gamma}{\gamma - 1}p_1v_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{\gamma - 1}{\gamma}} - 1\right] = \frac{\gamma}{\gamma - 1}RT_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{\gamma - 1}{\gamma}} - 1\right]}$$

Replacing γ by n gives the polytropic case. Isothermal work, $p_1v_1\ln(p_2/p_1)$, is the minimum.`,
          scheme: [
            { marks: 1, for: 'SFEE and reversible relation giving w = ∫v dp' },
            { marks: 2, for: 'Integration with pv^γ = C' },
            { marks: 1, for: 'Final form in p1v1 (or RT1) and pressure ratio' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q3 */
    {
      number: 3,
      tag: '(8) [CO 3 & 4]',
      pick: 1,
      choice: 'or',
      parts: [
        {
          id: 'p23-3',
          label: '',
          marks: 8,
          prompt: md`Discuss the concepts of Sonic Velocity & Mach Number? Assume Nitrogen has a static temperature of 25°C and a stagnation temperature of 250°C. Calculate the Mach number?`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`**Sonic velocity** is the speed at which a small pressure disturbance propagates through a fluid. Analysing a weak wave with continuity and momentum gives $a^2 = (\partial p/\partial\rho)_s$. Sound waves are isentropic, so for a perfect gas
$$a = \sqrt{\gamma RT}$$
It depends only on the gas and its temperature: about 347 m/s for air at 300 K.

**Mach number** $M = V/a$ is the ratio of the flow velocity to the local sonic velocity. It measures compressibility, since $M^2$ is the ratio of inertia to elastic forces. Regimes: incompressible (M < 0.3), subsonic (< 1), sonic (= 1), supersonic (> 1), hypersonic (> 5). In supersonic flow disturbances are confined within the **Mach cone**, of half-angle $\mu = \sin^{-1}(1/M)$.

**Problem.** For nitrogen (diatomic), $\gamma = 1.4$, $T = 298$ K, $T_0 = 523$ K.
$$\frac{T_0}{T} = 1 + \frac{\gamma - 1}{2}M^2 \;\Rightarrow\; \frac{523}{298} = 1.755 = 1 + 0.2M^2$$
$$M^2 = \frac{0.755}{0.2} = 3.775 \;\Rightarrow\; M = 1.94$$
The flow is supersonic. (With $R_{N_2} = 0.2968$ kJ/kg K: $a = \sqrt{1.4\times296.8\times298} = 352$ m/s, so $V = 683$ m/s.)`,
          scheme: [
            { marks: 2, for: 'Sonic velocity: definition and a = √(γRT)' },
            { marks: 2, for: 'Mach number, flow regimes and Mach cone' },
            { marks: 4, for: 'Stagnation–static temperature relation solved for M ≈ 1.94' },
          ],
        },
        {
          id: 'p23-3or',
          label: 'or',
          marks: 8,
          prompt: md`State the Rankine-Hugonit equations for normal shock waves? Assume, the sound Velocity, Pressure & Temperature of a duct are 320 m/s, 1 bar & 295k respectively, calculate the Mach number, Stagnation Temperature, and stagnation Pressure? Assume velocity of sound in dynamic condition = √(γRT), γ = 1.4, and R = 287 J/Kg-K`,
          topicIds: [],
          offSyllabus: GAS_DYNAMICS,
          answer: md`**Rankine–Hugoniot relations** link the density and pressure ratios across a normal shock. They come from continuity, momentum and energy, without assuming isentropic flow:
$$\frac{\rho_2}{\rho_1} = \frac{V_1}{V_2} = \frac{\frac{\gamma + 1}{\gamma - 1}\frac{p_2}{p_1} + 1}{\frac{\gamma + 1}{\gamma - 1} + \frac{p_2}{p_1}}, \qquad \frac{p_2}{p_1} = \frac{\frac{\gamma + 1}{\gamma - 1}\frac{\rho_2}{\rho_1} - 1}{\frac{\gamma + 1}{\gamma - 1} - \frac{\rho_2}{\rho_1}}$$
Then $T_2/T_1 = (p_2/p_1)/(\rho_2/\rho_1)$. As $p_2/p_1 \to \infty$, $\rho_2/\rho_1 \to (\gamma+1)/(\gamma-1) = 6$ for air. The density jump is bounded, unlike the isentropic case.

**Problem.** The 320 m/s is the flow velocity in the duct; the local sound speed follows from $\sqrt{\gamma RT}$.
$$a = \sqrt{1.4\times287\times295} = 344.3\ \text{m/s}, \qquad M = \frac{320}{344.3} = 0.929$$

**Stagnation temperature:**
$$T_0 = T\left(1 + \frac{\gamma - 1}{2}M^2\right) = 295(1 + 0.2\times0.864) = 346.0\ \text{K}$$
(Check: $T_0 = T + V^2/2c_p = 295 + 320^2/2010 = 345.9$ K ✓)

**Stagnation pressure:**
$$p_0 = p\left(\frac{T_0}{T}\right)^{\gamma/(\gamma - 1)} = 1\times(1.1728)^{3.5} = 1.747\ \text{bar}$$`,
          scheme: [
            { marks: 3, for: 'Rankine–Hugoniot density and pressure ratio equations' },
            { marks: 2, for: 'Sonic speed 344 m/s and M ≈ 0.93' },
            { marks: 1.5, for: 'Stagnation temperature ≈ 346 K' },
            { marks: 1.5, for: 'Stagnation pressure ≈ 1.75 bar' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q4 */
    {
      number: 4,
      tag: '(8) [CO 5 & 6]',
      pick: 1,
      choice: 'or',
      parts: [
        {
          id: 'p23-4',
          label: '',
          marks: 8,
          prompt: md`A centrifugal compressor running at 1440 rpm, handles air at 101 kpa and 20°C and compresses it to a pressure of 6 bar isentropically. The inner and outer diameters of the impeller are 14 cm & 28 cm respectively. The width of the blade at inlet is 2.5 cm. The blade angles are 16° and 40° at entry and exit. Calculate the mass flow rate of the air, degree of reaction, power input and width of blades at outlet. Assume sp. Gas constant, R = 0.287 KJ/Kg-k.`,
          topicIds: ['u2-velocity', 'u2-efficiency'],
          answer: md`**Assumptions:** radial entry (no whirl at inlet) and constant flow velocity, $V_{f1} = V_{f2}$.

**Blade speeds:**
$$U_1 = \frac{\pi\times0.14\times1440}{60} = 10.56\ \text{m/s}, \qquad U_2 = \frac{\pi\times0.28\times1440}{60} = 21.11\ \text{m/s}$$

**Flow velocity:** $V_{f1} = U_1\tan16° = 10.56\times0.2867 = 3.027$ m/s.

**Mass flow:**
$$\rho_1 = \frac{101}{0.287\times293} = 1.201\ \text{kg/m}^3, \qquad \dot m = \rho_1\pi D_1b_1V_{f1} = 1.201\times\pi\times0.14\times0.025\times3.027 = 0.0400\ \text{kg/s}$$

**Outlet whirl:**
$$V_{w2} = U_2 - \frac{V_{f2}}{\tan40°} = 21.11 - \frac{3.027}{0.8391} = 17.50\ \text{m/s}$$

**Power input:**
$$P = \dot m\,V_{w2}U_2 = 0.0400\times17.50\times21.11 = 14.8\ \text{W}$$

**Degree of reaction** (radial entry, $V_f$ constant):
$$R = 1 - \frac{V_{w2}}{2U_2} = 1 - \frac{17.50}{42.22} = 0.585$$

**Outlet width.** Isentropic delivery: $T_2 = 293(600/101)^{0.2857} = 487.5$ K, so $\rho_2 = 600/(0.287\times487.5) = 4.289$ kg/m³.
$$b_2 = \frac{\dot m}{\rho_2\pi D_2V_{f2}} = \frac{0.0400}{4.289\times\pi\times0.28\times3.027} = 3.5\times10^{-3}\ \text{m} = 3.5\ \text{mm}$$

This is Rathore's Ch 26 problem (p. 922), whose printed answers are 14.78 W, 58.6% and 3.5 mm, matching the above. The book's "0.4 kg/s" is a slip for 0.04 kg/s, since 14.78 W only follows from 0.04 kg/s.

*Comment:* the data are not self-consistent. At 1440 rpm the impeller supplies only $V_{w2}U_2 \approx 0.37$ kJ/kg, while an isentropic rise to 6 bar needs $c_p(T_2 - T_1) \approx 196$ kJ/kg. Write the method as above and state the assumptions; that is what is being marked.`,
          scheme: [
            { marks: 1, for: 'Blade speeds U1, U2' },
            { marks: 2, for: 'Flow velocity from inlet triangle and mass flow ≈ 0.040 kg/s' },
            { marks: 2, for: 'Outlet whirl, power input ≈ 14.8 W' },
            { marks: 1, for: 'Degree of reaction ≈ 0.585' },
            { marks: 2, for: 'Outlet density and blade width ≈ 3.5 mm' },
          ],
        },
        {
          id: 'p23-4or',
          label: 'or',
          marks: 8,
          prompt: md`A single acting single stage reciprocating air compressor of 250 mm bore and 350 mm stroke runs at 200 rpm. The suction and delivery pressure are 1 bar & 6 bar, respectively. Calculate the theoretical power required to run the compressor and the isothermal efficiency in each of the following conditions:
a. isothermal compression
b. polytropic compression, n=1.3
c. isentropic compression, γ=1.4
Neglect the effect of clearance in all cases.`,
          topicIds: ['u1-processes'],
          answer: md`**Volume swept per minute:**
$$\dot V = \frac{\pi}{4}(0.25)^2(0.35)\times200 = 0.01718\times200 = 3.436\ \text{m}^3/\text{min}, \qquad p_1\dot V = 343.6\ \text{kJ/min}$$

**(a) Isothermal**
$$W = p_1\dot V\ln\frac{p_2}{p_1} = 343.6\times\ln6 = 615.7\ \text{kJ/min} = 10.26\ \text{kW}, \qquad \eta_{iso} = 100\%$$

**(b) Polytropic, n = 1.3**
$$W = \frac{1.3}{0.3}\times343.6\left[6^{0.3/1.3} - 1\right] = 4.333\times343.6\times0.5121 = 762.5\ \text{kJ/min} = 12.71\ \text{kW}$$
$$\eta_{iso} = \frac{10.26}{12.71} = 80.7\%$$

**(c) Isentropic, γ = 1.4**
$$W = 3.5\times343.6\left[6^{0.2857} - 1\right] = 3.5\times343.6\times0.6685 = 804.0\ \text{kJ/min} = 13.40\ \text{kW}$$
$$\eta_{iso} = \frac{10.26}{13.40} = 76.6\%$$

Isothermal compression needs the least work. The higher the index, the more work, which is why compressors are cooled.`,
          scheme: [
            { marks: 1.5, for: 'Swept volume per minute' },
            { marks: 2, for: 'Isothermal power ≈ 10.26 kW' },
            { marks: 2, for: 'Polytropic power ≈ 12.71 kW and ηiso ≈ 80.7%' },
            { marks: 2, for: 'Isentropic power ≈ 13.40 kW and ηiso ≈ 76.6%' },
            { marks: 0.5, for: 'Conclusion on the effect of the index' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Q5 */
    {
      number: 5,
      tag: '(8) [CO 5 & 6]',
      parts: [
        {
          id: 'p23-5',
          label: '',
          marks: 8,
          prompt: md`Draw a neat sketch of regenerative Brayton cycle with reheat and intercooling? The ideal air-standard Brayton cycle operates with air entering the compressor at 95kPa & 22°C, the pressure ratio (rₚ) is 6:1 and the air leave after heat addition at 1100 K. Calculate the compressor work & Turbine work for per unit mass flow and the cycle efficiency?

(Assuming the Air standard assumptions for isentropic compression under steady flow conditions, and that K.E and P.E. effects are negligible, and for air Cₚ=1.005 kJ/kg and γ=1.4)`,
          topicIds: ['u5-reheat-intercool', 'u5-regeneration', 'u3-brayton'],
          answer: md`**Sketch:** LP compressor → intercooler → HP compressor → regenerator (cold side) → combustion chamber → HP turbine → reheater → LP turbine → regenerator (hot side) → exhaust. On the T-s diagram: two compressions with cooling back to $T_1$ between them; regenerative heating up to the LP-turbine exhaust temperature; heating to $T_{max}$; two expansions with reheating back to $T_{max}$; regenerative cooling of the exhaust.

**Problem: the simple ideal Brayton cycle.** $T_1 = 295$ K, $r_p = 6$, $T_3 = 1100$ K, $(\gamma - 1)/\gamma = 0.2857$, $r_p^{0.2857} = 1.6685$.

**Compressor:**
$$T_2 = 295\times1.6685 = 492.2\ \text{K}, \qquad w_c = 1.005(492.2 - 295) = 198.2\ \text{kJ/kg}$$

**Turbine:**
$$T_4 = \frac{1100}{1.6685} = 659.3\ \text{K}, \qquad w_t = 1.005(1100 - 659.3) = 442.9\ \text{kJ/kg}$$

**Efficiency:**
$$w_{net} = 244.7\ \text{kJ/kg}, \qquad q_s = 1.005(1100 - 492.2) = 610.8\ \text{kJ/kg}$$
$$\eta = \frac{244.7}{610.8} = 40.1\% = 1 - \frac{1}{6^{0.2857}}\ ✓$$
Work ratio $= 244.7/442.9 = 0.55$; back-work ratio $= 0.45$.`,
          scheme: [
            { marks: 2, for: 'Sketch (schematic and T-s) of regenerative cycle with reheat and intercooling' },
            { marks: 2, for: 'Compressor exit temperature and work ≈ 198 kJ/kg' },
            { marks: 2, for: 'Turbine exit temperature and work ≈ 443 kJ/kg' },
            { marks: 2, for: 'Net work, heat supplied and η ≈ 40.1%' },
          ],
        },
      ],
    },
  ],
}
