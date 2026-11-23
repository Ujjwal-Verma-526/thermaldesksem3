import type { Paper } from '../types'
import { ME203N_HEADER } from './format'

const md = String.raw

/**
 * Papers built from Rathore's own review questions and end-of-chapter problems, set in the
 * ME203n format. Every part carries a `bookRef` (problem or section, with printed page). Every
 * numerical was re-solved and checked against the answer printed in the book; where the
 * book's rounding differs slightly, the answer says so.
 */
export const GENERATED_PAPERS: Paper[] = [
  /* ================================================================== G1 */
  {
    id: 'generated-1',
    kind: 'generated',
    title: 'Rathore Paper 1',
    session: 'Built from Rathore',
    blurb: 'Otto maximum work, Joule cycle with efficiencies, two-stroke engines, abnormal combustion, rockets and jet diameter, compressor indices, radial-vane impeller.',
    current: true,
    header: ME203N_HEADER,
    attempt: 5,
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'g1-1a',
            label: 'a',
            marks: 4,
            prompt: md`Prove that the compression ratio for maximum work in an Otto cycle, between fixed minimum and maximum temperatures $T_{min}$ and $T_{max}$, is given by $r = \left(\dfrac{T_{max}}{T_{min}}\right)^{1/[2(\gamma-1)]}$.`,
            topicIds: ['u3-otto'],
            bookRef: 'Ch 11 Review Questions, p. 374; §11.6, pp. 337–338',
            answer: md`Let $T_1 = T_{min}$, $T_3 = T_{max}$ and $x = r^{\gamma-1}$, so $T_2 = T_1x$ and $T_4 = T_3/x$.

**Net work per kg:**
$$w = c_v(T_3 - T_2) - c_v(T_4 - T_1) = c_v\left[T_3 - T_1x - \frac{T_3}{x} + T_1\right]$$

**Maximise with respect to x:**
$$\frac{dw}{dx} = c_v\left[-T_1 + \frac{T_3}{x^2}\right] = 0 \;\Rightarrow\; x^2 = \frac{T_3}{T_1}$$
$$\frac{d^2w}{dx^2} = -\frac{2c_vT_3}{x^3} < 0, \text{ so this is a maximum.}$$

**Hence**
$$r^{\gamma-1} = \sqrt{\frac{T_{max}}{T_{min}}} \;\Rightarrow\; \boxed{r_{opt} = \left(\frac{T_{max}}{T_{min}}\right)^{\frac{1}{2(\gamma-1)}}}$$

At this ratio $T_2 = T_4 = \sqrt{T_1T_3}$ and $w_{max} = c_v\left(\sqrt{T_3} - \sqrt{T_1}\right)^2$.`,
            scheme: [
              { marks: 1.5, for: 'Net work in terms of T1, T3 and x = r^(γ−1)' },
              { marks: 1.5, for: 'Differentiation and second-derivative check' },
              { marks: 1, for: 'Final expression for r (and T2 = T4)' },
            ],
          },
          {
            id: 'g1-1b',
            label: 'b',
            marks: 4,
            prompt: md`The compression ratio in an air-standard Otto cycle is 8. At the beginning of compression process, the pressure is 1 bar and the temperature is 300 K. The heat transfer to the air per cycle is 1900 kJ/kg of air. Calculate (a) thermal efficiency, (b) the mean effective pressure.`,
            topicIds: ['u3-otto'],
            bookRef: 'Ch 11 Problems, p. 375 (answer 56.47%, 14.24 bar)',
            answer: md`**(a) Thermal efficiency**
$$\eta = 1 - \frac{1}{r^{\gamma-1}} = 1 - \frac{1}{8^{0.4}} = 1 - \frac{1}{2.297} = 0.5647 = 56.47\%$$

**(b) Mean effective pressure**
$$w = \eta q = 0.5647\times1900 = 1072.9\ \text{kJ/kg}$$
$$v_1 = \frac{RT_1}{p_1} = \frac{0.287\times300}{100} = 0.861\ \text{m}^3/\text{kg}, \qquad v_1 - v_2 = v_1\left(1 - \frac18\right) = 0.7534\ \text{m}^3/\text{kg}$$
$$p_m = \frac{1072.9}{0.7534} = 1424\ \text{kPa} = 14.24\ \text{bar}$$
Both answers match the book.`,
            scheme: [
              { marks: 1.5, for: 'Efficiency 56.47%' },
              { marks: 1, for: 'Net work from η × q' },
              { marks: 1.5, for: 'Swept specific volume and MEP 14.24 bar' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'g1-2a',
            label: 'a',
            marks: 4,
            prompt: md`Sketch the neat diagram of regenerative gas turbine plant and deduce an expression for its thermal efficiency.`,
            topicIds: ['u5-regeneration'],
            bookRef: 'Ch 27 Review Questions, p. 960; §27.6.1, pp. 935–942',
            answer: md`**Plant:** compressor → regenerator (cold side, 2 → x) → combustion chamber (x → 3) → turbine (3 → 4) → regenerator (hot side, 4 → y) → exhaust. The turbine drives the compressor and the generator.

**Ideal regenerator** (effectiveness 1): $T_x = T_4$, so heat supplied $q_s = c_p(T_3 - T_x) = c_p(T_3 - T_4)$, which equals the turbine work.
$$\eta = \frac{c_p(T_3 - T_4) - c_p(T_2 - T_1)}{c_p(T_3 - T_4)} = 1 - \frac{T_2 - T_1}{T_3 - T_4}$$
With $T_2 = T_1x$, $T_4 = T_3/x$ and $x = r_p^{(\gamma-1)/\gamma}$:
$$\eta = 1 - \frac{T_1(x - 1)}{T_3(x - 1)/x} = \boxed{1 - \frac{T_1}{T_3}\,r_p^{(\gamma-1)/\gamma}}$$

Unlike the simple cycle, the efficiency now **falls** as $r_p$ increases and rises with $T_3$. Regeneration is only useful while $T_4 > T_2$.

**Actual regenerator:** with effectiveness $\varepsilon = \dfrac{T_x - T_2}{T_4 - T_2}$, the heat supplied becomes $c_p(T_3 - T_x)$.`,
            scheme: [
              { marks: 1.5, for: 'Schematic and T-s diagram with regenerator' },
              { marks: 2, for: 'Derivation of η = 1 − (T1/T3)·r_p^((γ−1)/γ)' },
              { marks: 0.5, for: 'Effectiveness definition and effect of r_p' },
            ],
          },
          {
            id: 'g1-2b',
            label: 'b',
            marks: 4,
            prompt: md`In a gas turbine power plant, operating on Joule cycle, air is compressed from 1 bar and 15°C through a pressure ratio of 6. It is then heated to 727°C in the combustion chamber and expanded back to a pressure of 1 bar. Calculate the net work done, cycle efficiency and work ratio. Assume isentropic efficiencies of turbine and compressor are 90 and 85%, respectively.`,
            topicIds: ['u5-simple'],
            bookRef: 'Ch 27 Problems, p. 960 (answer 134.8 kJ/kg, 27.6%, 0.372)',
            answer: md`$T_1 = 288$ K, $T_3 = 1000$ K, $6^{0.2857} = 1.6685$.

**Compressor:** $T_{2s} = 288\times1.6685 = 480.5$ K, $T_2 = 288 + \dfrac{192.5}{0.85} = 514.5$ K, $w_c = 1.005\times226.5 = 227.6$ kJ/kg.

**Turbine:** $T_{4s} = 1000/1.6685 = 599.3$ K, $T_4 = 1000 - 0.9\times400.7 = 639.4$ K, $w_t = 1.005\times360.6 = 362.4$ kJ/kg.

**Net work:** $w_{net} = 362.4 - 227.6 = 134.8$ kJ/kg.

**Efficiency:**
$$q_s = 1.005(1000 - 514.5) = 487.9\ \text{kJ/kg}, \qquad \eta = \frac{134.8}{487.9} = 27.6\%$$

**Work ratio** $= \dfrac{134.8}{362.4} = 0.372$

All three match the book.`,
            scheme: [
              { marks: 1, for: 'Actual compressor exit temperature and work' },
              { marks: 1, for: 'Actual turbine exit temperature and work' },
              { marks: 1, for: 'Net work 134.8 kJ/kg and heat supplied' },
              { marks: 1, for: 'Efficiency 27.6% and work ratio 0.372' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'g1-3a',
            label: 'a',
            marks: 4,
            prompt: md`Explain the construction, working and applications of a two-stroke petrol engine.`,
            topicIds: ['u4-two-stroke'],
            bookRef: 'Ch 24 Review Questions, p. 834; §24.3.1, pp. 781–783',
            answer: md`**Construction:** there are no valves. The cylinder has an **inlet port**, a **transfer port** and an **exhaust port**, uncovered by the piston, which has a deflector crown. The crankcase is sealed and acts as a pump.

**Working: one power stroke per revolution**
1. **Upward stroke:** the piston compresses the charge above it. Meanwhile the vacuum below it draws a fresh air–fuel mixture into the crankcase through the inlet port. Near TDC the spark ignites the charge.
2. **Downward stroke:** the gases expand and do work. The piston first uncovers the **exhaust port**, so the burnt gases blow down. It then uncovers the **transfer port**, and the mixture compressed in the crankcase flows into the cylinder. The deflector directs it upward, sweeping out the remaining exhaust (**scavenging**).

**Port timing (typical):** EPO ≈ 50–60° before BDC, TPO ≈ 40–50° before BDC, closing symmetrically after BDC; IPO and IPC about 50–60° on either side of TDC.

**Merits and demerits:** higher power per unit weight and simpler (no valve gear), but some fresh charge escapes through the exhaust, so it has higher fuel consumption and higher HC emissions, plus lubrication-oil burning.

**Applications:** scooters, motorcycles, mopeds, lawn mowers, chain saws, outboard motors, small generators.`,
            scheme: [
              { marks: 1, for: 'Construction: ports, deflector piston, crankcase compression' },
              { marks: 2, for: 'Working of both strokes with scavenging (and port-timing sketch)' },
              { marks: 1, for: 'Applications and merits/demerits' },
            ],
          },
          {
            id: 'g1-3b',
            label: 'b',
            marks: 4,
            prompt: md`Explain the abnormal combustion in SI engines.`,
            topicIds: ['u4-si-combustion'],
            bookRef: 'Ch 24 Review Questions, p. 834; §24.11.2, pp. 801–802',
            answer: md`In normal combustion a single flame front started by the spark sweeps the charge in an orderly way. **Abnormal combustion** is any departure from this.

**1. Knocking (detonation).** The flame compresses and heats the unburnt end gas ahead of it. If the end gas stays above its self-ignition temperature longer than its ignition delay, it auto-ignites almost instantaneously before the flame arrives. The result is very rapid local pressure rise and pressure waves that hammer the chamber walls, heard as a metallic "pinking" sound.
- *Effects:* noise, loss of power and efficiency, overheating, pitting of piston crown and valves, damage to bearings and head gasket.
- *Promoted by:* high compression ratio, high inlet temperature and pressure, advanced spark, low-octane fuel, long flame travel, low speed (less turbulence).
- *Controlled by:* high-octane fuel or anti-knock additives, retarding the spark, a compact chamber with a central plug, turbulence, cooling the end gas, enriching the mixture.

**2. Surface ignition (pre-ignition).** The charge is ignited by a hot spot (spark-plug electrode, exhaust valve, carbon deposits) independently of the spark. If it happens before the spark it advances combustion, raises peak pressure and can itself cause knock (knocking pre-ignition).

**3. Run-on (dieseling):** the engine continues to fire after the ignition is switched off, because of hot spots.`,
            scheme: [
              { marks: 2, for: 'Knock: mechanism, effects, influencing factors and control' },
              { marks: 1.5, for: 'Surface ignition / pre-ignition' },
              { marks: 0.5, for: 'p–θ sketch or run-on' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'g1-4a',
            label: 'a',
            marks: 4,
            prompt: md`Explain briefly with a sketch the working principle of a rocket. List out the applications of rockets.`,
            topicIds: ['u6-rockets'],
            bookRef: 'Ch 28 Review Questions, p. 998; §28.11, pp. 986–994',
            answer: md`**Sketch:** propellant tanks (fuel and oxidiser) or a solid grain, feeding the combustion chamber, which leads to a convergent–divergent nozzle.

**Principle:** the rocket carries both fuel and oxidiser, so it needs no atmospheric air. The propellants burn in the chamber at high pressure (20–200 bar) and temperature (2500–3500 K). The products expand through the C-D nozzle to supersonic exit velocity $V_e$. By Newton's third law the rate of momentum leaving the nozzle produces an equal and opposite thrust:
$$F = \dot m_pV_e + (p_e - p_a)A_e$$
Thrust is independent of flight speed and altitude (apart from the pressure term). The rocket works in vacuum, where thrust is in fact highest.

**Specific impulse** $I_{sp} = F/(\dot m_pg)$ measures performance: 200–300 s for solids, up to about 450 s for LH₂/LOX.

**Applications**
- Launch vehicles for satellites and spacecraft; space probes and manned missions.
- Missiles (ballistic, guided, anti-aircraft); military rockets and artillery.
- Jet-assisted take-off (JATO); booster for ramjets.
- Sounding (weather) rockets, signal and rescue flares, fireworks.`,
            scheme: [
              { marks: 1, for: 'Labelled sketch of a rocket' },
              { marks: 2, for: 'Working principle and thrust equation' },
              { marks: 1, for: 'Applications' },
            ],
          },
          {
            id: 'g1-4b',
            label: 'b',
            marks: 4,
            prompt: md`A twin jet aircraft travels at 200 m/s at an altitude where the density of atmospheric air is 0.1712 kg/m³. The aircraft has to overcome a total drag force of 6376 N. If propulsion efficiency is 58%, find the diameter of jet.`,
            topicIds: ['u6-intro', 'u6-turbojet'],
            bookRef: 'Ch 28 Problems, p. 998 (answer 40.8 cm)',
            answer: md`**Jet velocity** from the propulsive efficiency:
$$\eta_p = \frac{2V}{V + V_j} = 0.58 \;\Rightarrow\; V_j = V\left(\frac{2}{0.58} - 1\right) = 200\times2.448 = 489.7\ \text{m/s}$$

**Total air flow.** In steady flight thrust = drag:
$$F = \dot m(V_j - V) \;\Rightarrow\; \dot m = \frac{6376}{489.7 - 200} = 22.01\ \text{kg/s}$$

**Per engine** (twin jet): $\dot m_1 = 11.0$ kg/s.
$$\dot m_1 = \rho\,\frac{\pi}{4}d^2V_j \;\Rightarrow\; d = \sqrt{\frac{4\times11.0}{\pi\times0.1712\times489.7}} = 0.409\ \text{m} \approx 40.9\ \text{cm}$$
This matches the book's 40.8 cm. (Treating it as one jet would wrongly give 57.8 cm.)`,
            scheme: [
              { marks: 1.5, for: 'Jet velocity 489.7 m/s from η_p' },
              { marks: 1, for: 'Mass flow from thrust = drag' },
              { marks: 1.5, for: 'Splitting between two engines and jet diameter ≈ 40.8 cm' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'g1-5a',
            label: 'a',
            marks: 4,
            prompt: md`Prove that in a reciprocating air compressor, with perfect intercooling, the work done for compressing the air is equal to heat rejected by the air.`,
            topicIds: ['u1-multistage'],
            bookRef: 'Ch 25 Review Questions, p. 886; §25.11–25.13, pp. 864–875',
            answer: md`Consider two stages, LP 1→2 and HP 2'→3, each polytropic with index n, with perfect intercooling 2→2' back to $T_1$ at the intermediate pressure. Take an aftercooler 3→3' back to $T_1$ as well, so the air leaves at the temperature it entered. Per kg:

**Energy balance on the whole compressor + coolers** (SFEE, ΔKE and ΔPE neglected):
$$q - w = h_{out} - h_{in} = c_p(T_1 - T_1) = 0 \;\Rightarrow\; |q| = |w|$$
So all the work done on the air is removed as heat: in the jackets during compression, in the intercooler and in the aftercooler.

**Checking it stage by stage.** Heat rejected during polytropic compression in a stage:
$$q_{poly} = \frac{\gamma - n}{\gamma - 1}\cdot\frac{R(T_2 - T_1)}{n - 1}$$
Intercooler: $c_p(T_2 - T_1)$. Stage work: $\dfrac{n}{n-1}R(T_2 - T_1)$. Using $c_p = \dfrac{\gamma R}{\gamma - 1}$:
$$\frac{\gamma - n}{(\gamma - 1)(n - 1)}R\,\Delta T + \frac{\gamma}{\gamma - 1}R\,\Delta T = \frac{(\gamma - n) + \gamma(n - 1)}{(\gamma - 1)(n - 1)}R\,\Delta T = \frac{n(\gamma - 1)}{(\gamma - 1)(n - 1)}R\,\Delta T = \frac{n}{n - 1}R\,\Delta T$$
which is exactly the stage work. ∎`,
            scheme: [
              { marks: 1, for: 'Set-up: stages, perfect intercooling, aftercooling' },
              { marks: 1.5, for: 'SFEE argument with equal inlet and outlet temperature' },
              { marks: 1.5, for: 'Stage-wise check: jacket heat + cooler heat = stage work' },
            ],
          },
          {
            id: 'g1-5b',
            label: 'b',
            marks: 4,
            prompt: md`A single-acting, single-cylinder reciprocating air compressor has a cylinder diameter of 300 mm and a stroke of 400 mm. It runs at 100 rpm. Air enters the cylinder at 1 bar, 20°C. It is then compressed to 5 bar. Calculate the mean effective pressure and indicated power input to compressor, when compression is (a) isothermal, (b) according to the law pV¹·² = constant, (c) adiabatic. Calculate isothermal efficiency for each case. Neglect clearance.`,
            topicIds: ['u1-processes'],
            bookRef: 'Ch 25 Problems, p. 886 (answer 1.61 bar, 7.58 kW, 100%; 1.85 bar, 8.7 kW, 87.2%; 2.043 bar, 9.63 kW, 78.8%)',
            answer: md`$V_s = \dfrac{\pi}{4}(0.3)^2(0.4) = 0.02827$ m³. Volume per minute $= 2.827$ m³. MEP = work per cycle / swept volume.

**(a) Isothermal**
$$p_m = p_1\ln\frac{p_2}{p_1} = 100\ln5 = 160.9\ \text{kPa} = 1.61\ \text{bar}$$
$$IP = \frac{160.9\times2.827}{60} = 7.58\ \text{kW}, \qquad \eta_{iso} = 100\%$$

**(b) n = 1.2**
$$p_m = \frac{n}{n - 1}p_1\left[5^{(n-1)/n} - 1\right] = 6\times100\times(1.3077 - 1) = 184.6\ \text{kPa} = 1.85\ \text{bar}$$
$$IP = 8.70\ \text{kW}, \qquad \eta_{iso} = \frac{7.58}{8.70} = 87.2\%$$

**(c) Adiabatic, γ = 1.4**
$$p_m = 3.5\times100\times(1.5838 - 1) = 204.3\ \text{kPa} = 2.043\ \text{bar}$$
$$IP = 9.63\ \text{kW}, \qquad \eta_{iso} = 78.8\%$$

All match the book.`,
            scheme: [
              { marks: 1, for: 'Swept volume and the MEP definition' },
              { marks: 1, for: 'Isothermal MEP and power' },
              { marks: 1, for: 'Polytropic MEP, power and isothermal efficiency' },
              { marks: 1, for: 'Adiabatic MEP, power and isothermal efficiency' },
            ],
          },
        ],
      },
      {
        number: 6,
        parts: [
          {
            id: 'g1-6a',
            label: 'a',
            marks: 4,
            prompt: md`Define slip, slip factor and pressure coefficient for a centrifugal compressor.`,
            topicIds: ['u2-velocity', 'u2-efficiency'],
            bookRef: 'Ch 26 Review Questions, p. 921; §26.5.8–26.5.10, pp. 901–903',
            answer: md`**Slip.** Because of inertia, the air between two impeller vanes lags behind the vane rotation. A relative eddy forms, with higher pressure on the leading face of a vane and lower on the trailing face. The air therefore leaves with a whirl velocity $V_{w2}'$ *less* than the ideal $V_{w2}$ given by the vane angle. The difference $V_{w2} - V_{w2}'$ is the slip.

**Slip factor**
$$\sigma = \frac{V_{w2}'}{V_{w2}} \quad (\text{for radial vanes } \sigma = V_{w2}'/U_2)$$
Typically 0.85–0.95. It increases with the number of vanes. Stodola's estimate for radial vanes is $\sigma \approx 1 - \dfrac{0.63\pi}{z}$.

**Power input factor (work factor)** ψ accounts for disc friction and windage: actual work $= \psi\sigma U_2^2$, with ψ ≈ 1.03–1.06.

**Pressure coefficient**
$$\phi_p = \frac{\text{isentropic work}}{\text{Euler work}} = \frac{c_p(T_{02s} - T_{01})}{U_2^2/g_c\ (\text{radial vanes})} = \eta_c\,\psi\,\sigma$$
It measures how much of the blade-tip energy appears as useful pressure rise.

**Effect:** slip reduces the work the impeller can put in at a given speed, so it lowers the pressure ratio. A larger tip speed or more vanes are needed to compensate.`,
            scheme: [
              { marks: 1.5, for: 'Slip: cause (relative eddy) and definition' },
              { marks: 1, for: 'Slip factor with typical values' },
              { marks: 1.5, for: 'Pressure coefficient (and power input factor)' },
            ],
          },
          {
            id: 'g1-6b',
            label: 'b',
            marks: 4,
            prompt: md`Air from a quiescent atmosphere, at pressure of 1 bar and 300 K enters a centrifugal compressor, fitted with radial vanes and the air leaves the diffuser with negligible velocity. The tip diameter of the impeller is 450 mm and the compressor rotates at 18000 rpm. Neglect all losses and calculate the temperature and pressure of air as it leaves the compressor. Take γ = 1.4, cₚ = 1.005 kJ/kg K, and σ = 0.9.`,
            topicIds: ['u2-velocity'],
            bookRef: 'Ch 26 Problems, p. 922 (answer 188°C, 4.5 bar)',
            answer: md`**Tip speed:**
$$U_2 = \frac{\pi D_2N}{60} = \frac{\pi\times0.45\times18000}{60} = 424.1\ \text{m/s}$$

**Work input** (radial vanes, with slip):
$$w = \sigma U_2^2 = 0.9\times424.1^2 = 161.9\ \text{kJ/kg}$$

**Exit temperature.** The air leaves the diffuser with negligible velocity, so the whole work raises the enthalpy:
$$T_2 = T_1 + \frac{w}{c_p} = 300 + \frac{161.9}{1.005} = 461.1\ \text{K} = 188\,^\circ\text{C}$$

**Exit pressure** (no losses, so isentropic):
$$p_2 = p_1\left(\frac{T_2}{T_1}\right)^{\gamma/(\gamma-1)} = 1\times(1.537)^{3.5} = 4.50\ \text{bar}$$
Both match the book.`,
            scheme: [
              { marks: 1, for: 'Tip speed 424 m/s' },
              { marks: 1, for: 'Work input σU₂²' },
              { marks: 1, for: 'Exit temperature 188°C' },
              { marks: 1, for: 'Exit pressure 4.5 bar' },
            ],
          },
        ],
      },
      {
        number: 7,
        parts: [
          {
            id: 'g1-7a',
            label: 'a',
            marks: 4,
            prompt: md`Compare reciprocating compressor with a rotary compressor.`,
            topicIds: ['u2-construction', 'u1-basics'],
            bookRef: 'Ch 26 Review Questions, p. 921',
            answer: md`| Reciprocating | Rotary (centrifugal / axial) |
|---|---|
| Positive displacement: piston in cylinder | Dynamic: kinetic energy from an impeller converted to pressure (vane and roots types are rotary positive-displacement) |
| Small volume flow (up to about 300 m³/min) | Very large volume flow (thousands of m³/min) |
| High pressure ratio per stage (up to about 8–10), very high with multistaging | Lower pressure ratio per stage (about 4 centrifugal, 1.2 axial) |
| Low speed, so needs a flywheel; unbalanced forces; heavy foundations | High speed; well balanced; light foundations; couples directly to turbines and motors |
| Pulsating delivery; needs a receiver | Steady, continuous delivery |
| Air may carry lubricating oil | Clean, oil-free air |
| Valves and many wearing parts; more maintenance | Few wearing parts; less maintenance |
| Compression nearly isothermal possible with cooling; best at high pressure | Compression nearly adiabatic; best for large flow at moderate pressure |
| Efficiency high at high pressure ratios | Efficiency high over a narrow range; can surge |

**Uses:** reciprocating for workshops, garages and high-pressure bottling; rotary for gas turbines, jet engines, superchargers and blast furnaces.`,
            scheme: [
              { marks: 3, for: 'At least six valid points of comparison' },
              { marks: 1, for: 'Typical applications of each' },
            ],
          },
          {
            id: 'g1-7b',
            label: 'b',
            marks: 4,
            prompt: md`Discuss the deviation of Stirling and Ericsson cycles from Carnot cycle.`,
            topicIds: ['u3-stirling-ericsson'],
            bookRef: 'Ch 11 Review Questions, p. 374; §11.4–11.5, pp. 335–337',
            answer: md`**Carnot cycle:** two isothermals and two **isentropics**. Its efficiency $1 - T_L/T_H$ is the maximum possible, but it is impractical. The isothermal processes are very slow and the isentropics very fast. The p-v diagram is extremely thin, so the mean effective pressure is low and the engine would be huge.

**Stirling cycle:** the isentropics are replaced by two **constant-volume** processes. Cycle: 1–2 isothermal compression at $T_L$, 2–3 constant-volume heating, 3–4 isothermal expansion at $T_H$, 4–1 constant-volume cooling. The heat rejected in 4–1 equals the heat needed in 2–3, and a **regenerator** transfers it internally. So heat is exchanged with the outside only at $T_H$ and $T_L$:
$$\eta = 1 - \frac{T_L}{T_H} \quad(\text{perfect regeneration})$$

**Ericsson cycle:** the isentropics are replaced by two **constant-pressure** processes, again with an ideal regenerator, giving the same Carnot efficiency.

**Deviations and advantages:** both give a much larger p-v area, hence higher MEP and work per unit size, than Carnot between the same limits. Without a regenerator their efficiency falls well below Carnot (Stirling without regeneration: $\eta = \dfrac{R\ln r\,(T_H - T_L)}{RT_H\ln r + c_v(T_H - T_L)}$). In practice, imperfect regeneration, finite-rate heat transfer and pressure losses keep real Stirling and Ericsson engines below Carnot.`,
            scheme: [
              { marks: 1, for: 'Carnot cycle and why it is impractical' },
              { marks: 1.5, for: 'Stirling cycle processes, role of regenerator, η = Carnot' },
              { marks: 1, for: 'Ericsson cycle processes' },
              { marks: 0.5, for: 'Deviations: MEP, regeneration effectiveness' },
            ],
          },
        ],
      },
    ],
  },
  /* ================================================================== G2 */
  {
    id: 'generated-2',
    kind: 'generated',
    title: 'Rathore Paper 2',
    session: 'Built from Rathore',
    blurb: 'Mean effective pressure, Diesel cut-off, actual gas-turbine deviations, regeneration with efficiencies, engine comparisons, propellants, multistage savings, impeller sizing, turbojet thrust.',
    current: true,
    header: ME203N_HEADER,
    attempt: 5,
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'g2-1a',
            label: 'a',
            marks: 4,
            prompt: md`What is mean effective pressure? And what is its significance? Obtain an expression for the mean effective pressure of an Otto cycle.`,
            topicIds: ['u3-air-standard', 'u3-otto'],
            bookRef: 'Ch 11 Review Questions, p. 374; §11.3, pp. 333–335 and §11.6, pp. 337–338',
            answer: md`**Definition:** the constant (average) pressure which, acting on the piston over one full stroke, would do the same work as the net work of the cycle:
$$p_m = \frac{W_{net}}{V_s} = \frac{W_{net}}{V_1 - V_2}$$

**Significance:** it compares engines of different sizes on a common basis. For the same swept volume, a higher MEP means more work per cycle, so a smaller, lighter engine for a given output. Power $= p_mLAn$ (n = power strokes per second). Brake and indicated MEP are measured in tests.

**Otto cycle.** Per kg, $w = \eta q_s$ with $\eta = 1 - r^{1-\gamma}$, $q_s = c_v(T_3 - T_2)$ and $v_1 - v_2 = v_1(r - 1)/r$. With pressure ratio $\alpha = p_3/p_2$: $T_3 = \alpha T_2$, and $c_v = R/(\gamma - 1)$, $T_2 = T_1r^{\gamma-1}$, $RT_1 = p_1v_1$:
$$p_m = \frac{c_v(\alpha - 1)T_1r^{\gamma-1}\left(1 - r^{1-\gamma}\right)}{v_1(r - 1)/r}$$
$$\boxed{p_m = \frac{p_1\,r\,(r^{\gamma-1} - 1)(\alpha - 1)}{(\gamma - 1)(r - 1)}}$$`,
            scheme: [
              { marks: 1, for: 'Definition of MEP' },
              { marks: 1, for: 'Significance' },
              { marks: 2, for: 'Derivation of the Otto-cycle MEP expression' },
            ],
          },
          {
            id: 'g2-1b',
            label: 'b',
            marks: 4,
            prompt: md`A Diesel engine has an inlet temperature and pressure of 17°C and 1 bar, respectively. The compression ratio is 15 and the maximum cycle temperature is 1400 K. Calculate the cut-off ratio and the air-standard efficiency of the Diesel cycle. Take γ = 1.4.`,
            topicIds: ['u3-diesel'],
            bookRef: 'Ch 11 Problems, p. 376 (answer 1.634, 62.3%)',
            answer: md`**End of compression:**
$$T_2 = T_1r^{\gamma-1} = 290\times15^{0.4} = 856.7\ \text{K}$$

**Cut-off ratio** (constant-pressure heating):
$$\rho = \frac{v_3}{v_2} = \frac{T_3}{T_2} = \frac{1400}{856.7} = 1.634$$

**Efficiency:**
$$\eta = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^\gamma - 1}{\gamma(\rho - 1)} = 1 - \frac{1}{2.954}\cdot\frac{1.634^{1.4} - 1}{1.4\times0.634} = 0.623 = 62.3\%$$

Check by temperatures: $T_4 = T_3(\rho/r)^{0.4} = 576.8$ K, and $\eta = 1 - \dfrac{T_4 - T_1}{\gamma(T_3 - T_2)} = 1 - \dfrac{286.8}{763.6} = 0.624$ ✓.

Both match the book.`,
            scheme: [
              { marks: 1, for: 'T2 = 856.7 K' },
              { marks: 1, for: 'Cut-off ratio 1.634' },
              { marks: 2, for: 'Efficiency 62.3%' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'g2-2a',
            label: 'a',
            marks: 4,
            prompt: md`What are the deviations in actual gas turbine cycle as compared with air standard cycle? Define isentropic efficiency of a compressor and turbine.`,
            topicIds: ['u5-simple'],
            bookRef: 'Ch 27 Review Questions, p. 960; §27.5, pp. 928–935',
            answer: md`**Deviations of the actual cycle from the air-standard Brayton cycle**
1. Compression and expansion are **irreversible** (fluid friction, turbulence), so entropy rises. The compressor needs more work and the turbine gives less.
2. **Pressure losses** in the intake, combustion chamber, regenerator and exhaust, so the turbine pressure ratio is less than the compressor's.
3. The working fluid is not air throughout. Products of combustion have higher $c_p$ and lower γ, and the **mass flow increases** by the fuel added.
4. $c_p$ and γ vary with temperature.
5. **Combustion is incomplete**, with heat losses from the combustor and turbine casing.
6. Mechanical losses in bearings and auxiliaries; kinetic energy at exhaust.
7. **Bleed air** is taken for blade cooling and sealing.

Because of (1) the net work, which is the small difference of two large quantities, is very sensitive to component efficiencies.

**Isentropic efficiencies**
$$\eta_c = \frac{\text{isentropic work}}{\text{actual work}} = \frac{T_{2s} - T_1}{T_2 - T_1}, \qquad \eta_t = \frac{\text{actual work}}{\text{isentropic work}} = \frac{T_3 - T_4}{T_3 - T_{4s}}$$
Show both on a T-s diagram.`,
            scheme: [
              { marks: 2.5, for: 'At least five deviations explained' },
              { marks: 1.5, for: 'Isentropic efficiencies of compressor and turbine with T-s sketch' },
            ],
          },
          {
            id: 'g2-2b',
            label: 'b',
            marks: 4,
            prompt: md`A gas turbine takes in air at 27°C and 1 bar. The pressure ratio is 4. The maximum temperature of the cycle is 560°C. The efficiency of the compressor and turbine is 0.83 and 0.85, respectively. Find the overall efficiency, if the regenerator effectiveness is 0.75.`,
            topicIds: ['u5-regeneration'],
            bookRef: 'Ch 27 Problems, pp. 960–961 (answer 21.24%)',
            answer: md`$T_1 = 300$ K, $T_3 = 833$ K, $4^{0.2857} = 1.486$.

**Compressor:** $T_{2s} = 300\times1.486 = 445.8$ K, $T_2 = 300 + \dfrac{145.8}{0.83} = 475.7$ K.

**Turbine:** $T_{4s} = 833/1.486 = 560.6$ K, $T_4 = 833 - 0.85(272.4) = 601.4$ K.

**Regenerator:**
$$T_x = T_2 + \varepsilon(T_4 - T_2) = 475.7 + 0.75(125.7) = 570.0\ \text{K}$$

**Net work:**
$$w_{net} = 1.005\left[(833 - 601.4) - (475.7 - 300)\right] = 1.005(231.6 - 175.7) = 56.2\ \text{kJ/kg}$$

**Heat supplied:**
$$q_s = 1.005(833 - 570.0) = 264.3\ \text{kJ/kg}$$

**Efficiency:**
$$\eta = \frac{56.2}{264.3} = 21.3\%$$
The book gives 21.24%; the small difference is rounding. Without the regenerator it would be $56.2/(1.005\times357.3) = 15.7\%$.`,
            scheme: [
              { marks: 1, for: 'Actual compressor exit temperature' },
              { marks: 1, for: 'Actual turbine exit temperature' },
              { marks: 1, for: 'Regenerator exit temperature from effectiveness' },
              { marks: 1, for: 'Net work, heat supplied and η ≈ 21.2%' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'g2-3a',
            label: 'a',
            marks: 4,
            prompt: md`Compare two-stroke and four-stroke engines. Why are four-stroke engines preferred over two-stroke engines?`,
            topicIds: ['u4-two-stroke', 'u4-four-stroke'],
            bookRef: 'Ch 24 Review Questions, p. 834; §24.6–24.7, pp. 791–792',
            answer: md`| Four-stroke | Two-stroke |
|---|---|
| One power stroke every two revolutions | One power stroke every revolution |
| Valves with a valve mechanism | Ports, uncovered by the piston (no valves) |
| Heavier flywheel (uneven torque) | Lighter flywheel, more uniform torque |
| Lower power per unit weight and volume | Theoretically about twice the power for the same size; in practice 1.5–1.7 times |
| Complete exhaust stroke; good scavenging, little charge loss | Charge mixes with exhaust; fresh charge lost through the exhaust port |
| Higher thermal efficiency, lower fuel consumption | Lower efficiency, higher fuel consumption and HC emissions |
| Separate lubrication from sump; less oil consumption | Oil mixed with fuel (petrol engines); more oil burnt |
| Less wear; runs cooler | Higher wear and heating (more power strokes) |
| Costlier, more complex | Cheaper, simpler, lighter |
| Cars, trucks, buses | Scooters, small motorcycles, outboards; very large marine diesels |

**Why four-stroke is preferred:** better fuel economy, much lower emissions (emission norms have effectively removed small two-stroke petrol engines), longer life, quieter running and better part-load behaviour. Clean scavenging gives a complete charge every cycle.`,
            scheme: [
              { marks: 3, for: 'At least six valid points of comparison' },
              { marks: 1, for: 'Reasons four-stroke engines are preferred' },
            ],
          },
          {
            id: 'g2-3b',
            label: 'b',
            marks: 4,
            prompt: md`Compare petrol and Diesel engines.`,
            topicIds: ['u4-four-stroke', 'u4-classification'],
            bookRef: 'Ch 24 Review Questions, p. 834; §24.5, pp. 788–791',
            answer: md`| Petrol (SI) engine | Diesel (CI) engine |
|---|---|
| Works on the Otto cycle (constant-volume heat addition) | Works on the Diesel cycle (constant-pressure heat addition); actual engines are nearer the dual cycle |
| Air–fuel mixture drawn in; carburettor or port/direct injection | Only air drawn in; fuel injected by an injector at the end of compression |
| Ignited by a spark plug | Self-ignited by the hot compressed air |
| Compression ratio 6–11 (limited by knock) | Compression ratio 14–22 (needed for self-ignition) |
| Quantity governing: the throttle varies the amount of mixture | Quality governing: the fuel quantity per cycle is varied, with no throttle |
| Lighter, cheaper, higher speed, smoother and quieter | Heavier and more robust (higher pressures); noisier; costlier |
| Lower thermal efficiency; higher fuel consumption | Higher thermal efficiency, especially at part load |
| Volatile, high-octane fuel | Less volatile, high-cetane fuel; safer to store |
| More CO and HC | More NOₓ and particulates (smoke) |
| Cars, two-wheelers, small aircraft | Trucks, buses, tractors, locomotives, ships, generators |`,
            scheme: [{ marks: 4, for: 'At least eight valid points of comparison (half a mark each)' }],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'g2-4a',
            label: 'a',
            marks: 4,
            prompt: md`What are composite and homogeneous solid propellants? How do they work? State their merits and demerits.`,
            topicIds: ['u6-rockets'],
            bookRef: 'Ch 28 Review Questions, p. 998; §28.11–28.17, pp. 986–994',
            answer: md`A solid propellant is a cast or pressed **grain** containing both fuel and oxidiser. It sits in the combustion chamber (the motor casing) and burns on its exposed surface. The thrust–time curve depends on the grain shape: progressive, neutral or regressive burning.

**Homogeneous (double-base):** fuel and oxidiser are in the *same molecule* or in a colloidal solution. Typically nitrocellulose dissolved in nitroglycerine, with stabilisers and plasticisers. Each molecule carries its own oxygen.
- *Merits:* smokeless exhaust; smooth, reproducible burning; good mechanical properties for small motors.
- *Demerits:* lower specific impulse; can detonate; sensitive to temperature; limited grain size.

**Composite (heterogeneous):** a crystalline **oxidiser** (ammonium perchlorate, ammonium nitrate) is dispersed in a polymeric **fuel binder** (HTPB, polyurethane, PBAN), often with aluminium powder to raise the flame temperature.
- *Merits:* higher specific impulse; safer (does not detonate easily); can be cast in very large grains (booster rockets); burning rate can be tailored.
- *Demerits:* smoky exhaust (Al₂O₃, HCl); hygroscopic oxidisers; ageing of the binder.

**Solid rockets in general:** simple, storable and ready to fire, but they cannot be throttled, stopped or restarted, and they have lower $I_{sp}$ than liquids.`,
            scheme: [
              { marks: 1, for: 'Grain concept and how a solid propellant burns' },
              { marks: 1.5, for: 'Homogeneous: composition, merits, demerits' },
              { marks: 1.5, for: 'Composite: composition, merits, demerits' },
            ],
          },
          {
            id: 'g2-4b',
            label: 'b',
            marks: 4,
            prompt: md`An aircraft flying at 241 m/s at an altitude, at which pressure is 0.46 bar and temperature is −30°C. Calorific value of fuel is 41820 kJ/kg. The diffuser isentropic efficiency is 100%. The isentropic efficiency of compressor is 80%. Compressor pressure ratio is 5. Calculate the air–fuel ratio, if maximum temperature must not exceed 874°C. Assume cₚ = 1.005 kJ/kg K.`,
            topicIds: ['u6-turbojet'],
            bookRef: 'Ch 28 Problems, p. 998 (answer 61.4)',
            answer: md`$T_a = 243$ K, $T_{max} = 1147$ K.

**Diffuser** (ideal: the flight kinetic energy becomes enthalpy):
$$T_1 = T_a + \frac{V^2}{2c_p} = 243 + \frac{241^2}{2\times1005} = 271.9\ \text{K}$$

**Compressor:**
$$T_{2s} = 271.9\times5^{0.2857} = 430.6\ \text{K}, \qquad T_2 = 271.9 + \frac{158.7}{0.8} = 470.3\ \text{K}$$

**Combustion** (per kg of air; fuel's own sensible heat neglected, as in the book):
$$\dot m_f\,CV = \dot m_a\,c_p(T_{max} - T_2) \;\Rightarrow\; \frac{\dot m_f}{\dot m_a} = \frac{1.005(1147 - 470.3)}{41820} = 0.01626$$
$$\frac{A}{F} = \frac{1}{0.01626} = 61.5$$
This matches the book's 61.4. Including the fuel mass, $(1 + f)c_p\Delta T = f\,CV$ gives A/F = 59.8.`,
            scheme: [
              { marks: 1.5, for: 'Ram temperature rise in the diffuser' },
              { marks: 1, for: 'Actual compressor exit temperature' },
              { marks: 1.5, for: 'Energy balance and A/F ≈ 61' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'g2-5a',
            label: 'a',
            marks: 4,
            prompt: md`Define overall volumetric efficiency. Show the effect of increase in compression ratio in a single-stage reciprocating compressor on a p–V diagram and give its physical explanation.`,
            topicIds: ['u1-clearance'],
            bookRef: 'Ch 25 Review Questions, pp. 885–886; §25.7–25.10, pp. 849–855',
            answer: md`**Overall volumetric efficiency:** the ratio of the free air delivered (FAD), reduced to free-air conditions $p_0$, $T_0$, to the swept volume:
$$\eta_{v,overall} = \frac{V_{FAD}}{V_s} = \frac{(V_1 - V_4)\,p_1T_0}{V_s\,p_0T_1}$$
The ideal (clearance) volumetric efficiency is $\eta_v = 1 + c - c\left(\dfrac{p_2}{p_1}\right)^{1/n}$.

**p–V diagram:** keep $p_1$ and the clearance volume fixed and raise the delivery pressure from $p_2$ to $p_2'$ to $p_2''$. The compression curve rises further. The clearance air, now at a higher pressure, **re-expands over a longer part of the suction stroke** (4 → 4' → 4''), so the induction line 4–1 shortens.

**Physical explanation:** the air trapped in the clearance space must expand back to the suction pressure before the suction valve can open. The higher the delivery pressure, the larger the volume this air occupies after re-expansion, $V_4 = V_c(p_2/p_1)^{1/n}$, and the less fresh air is drawn in. At a limiting pressure ratio $(1 + 1/c)^n$ the re-expansion fills the whole cylinder and the delivery becomes zero.

This is why high pressure ratios use **multistage** compression.`,
            scheme: [
              { marks: 1, for: 'Definition of overall volumetric efficiency (FAD basis)' },
              { marks: 1.5, for: 'p–V diagram with increasing delivery pressure' },
              { marks: 1.5, for: 'Explanation: clearance re-expansion and the limiting pressure ratio' },
            ],
          },
          {
            id: 'g2-5b',
            label: 'b',
            marks: 4,
            prompt: md`Calculate the power required to drive a single-stage, single-acting reciprocating air compressor to compress 8 m³/min of air, receiving at 1 bar, 20°C to 7 bar. The index of compression is 1.3. Also, calculate the percentage saving in indicated power by compressing the same mass of air (a) in two stages with optimum intercooler pressure and perfect intercooling, (b) in two stages with imperfect intercooling to 27°C, intercooler pressure remaining the same as in case (a), (c) in three stages with optimum intercooler and perfect cooling.`,
            topicIds: ['u1-multistage'],
            bookRef: 'Ch 25 Problems, p. 886 (answer 32.8 kW; (a) 11.3%, (b) 10.2%, (c) 14.63%)',
            answer: md`$p_1\dot V = 100\times8/60 = 13.33$ kW, $\dfrac{n}{n-1} = 4.333$, $\dfrac{n-1}{n} = 0.2308$.

**Single stage:**
$$P_1 = 4.333\times13.33\times(7^{0.2308} - 1) = 4.333\times13.33\times0.5671 = 32.75\ \text{kW}$$

**(a) Two stages, perfect intercooling:** $p_i = \sqrt7 = 2.646$ bar.
$$P_2 = 2\times4.333\times13.33\times(7^{0.1154} - 1) = 29.09\ \text{kW}, \qquad \text{saving} = 11.2\%$$

**(b) Intercooling only to 300 K:** the HP stage handles the same mass at 300 K instead of 293 K, so its work rises by the factor 300/293.
$$P = 4.333\times13.33\times0.2516\times\left(1 + \frac{300}{293}\right) = 29.44\ \text{kW}, \qquad \text{saving} = 10.1\%$$

**(c) Three stages:** stage ratio $7^{1/3} = 1.913$.
$$P_3 = 3\times4.333\times13.33\times(7^{0.0769} - 1) = 27.99\ \text{kW}, \qquad \text{saving} = 14.5\%$$

The book prints 32.8 kW, 11.3%, 10.2% and 14.63%; the differences are in the third figure only.`,
            scheme: [
              { marks: 1, for: 'Single-stage power ≈ 32.8 kW' },
              { marks: 1, for: 'Two-stage optimum intercooling and saving ≈ 11%' },
              { marks: 1, for: 'Imperfect intercooling and saving ≈ 10%' },
              { marks: 1, for: 'Three-stage and saving ≈ 14.5%' },
            ],
          },
        ],
      },
      {
        number: 6,
        parts: [
          {
            id: 'g2-6a',
            label: 'a',
            marks: 4,
            prompt: md`Discuss the effect of impeller blade shape on performance of centrifugal compressor.`,
            topicIds: ['u2-velocity'],
            bookRef: 'Ch 26 Review Questions, p. 921; §26.5, pp. 898–905',
            answer: md`The blade (vane) outlet angle $\beta_2$, measured from the tangential direction opposite to rotation, sets the whirl velocity:
$$V_{w2} = U_2 - \frac{V_{f2}}{\tan\beta_2}$$
so it sets the work $w = U_2V_{w2}$.

**Draw the three outlet triangles.**
1. **Backward-curved** ($\beta_2 < 90°$): $V_{w2} < U_2$, so less work and pressure rise per stage. The absolute exit velocity is low, so more of the pressure rise happens in the impeller and the diffuser has less to do, giving the **highest efficiency**. The head–flow characteristic falls with flow, which is **stable** and has a wide surge-free range. Used in most modern compressors.
2. **Radial** ($\beta_2 = 90°$): $V_{w2} = U_2$, so $w = U_2^2$, independent of flow. The vanes are straight, so they can carry the bending stresses of very high tip speeds and are simple to make. They give a good pressure ratio and are common in gas turbines and turbochargers.
3. **Forward-curved** ($\beta_2 > 90°$): $V_{w2} > U_2$, so the most work and the highest theoretical pressure rise. But the very high exit kinetic energy must be diffused (lossy), so efficiency is the lowest. The characteristic rises with flow, which is **unstable** and prone to surge, and the vanes are highly stressed. Rarely used for compressors.

**Summary:** forward gives the most pressure but the least stability and efficiency; backward gives the least pressure but the best efficiency and stability; radial is the compromise for high speed.`,
            scheme: [
              { marks: 1, for: 'Outlet velocity triangles for the three blade shapes' },
              { marks: 2, for: 'Effect of each on work, pressure rise and efficiency' },
              { marks: 1, for: 'Effect on stability of the characteristic and practical choice' },
            ],
          },
          {
            id: 'g2-6b',
            label: 'b',
            marks: 4,
            prompt: md`A centrifugal compressor handles 16.5 kg/s of air with total pressure ratio of 4. The speed of the compressor is 15000 rpm. Inlet stagnation temperature is 20°C, slip factor is 0.9, power input factor is 1.04 and isentropic efficiency as 80%. Calculate diameter of impeller and power input to the compressor.`,
            topicIds: ['u2-velocity', 'u2-efficiency'],
            bookRef: 'Ch 26 Problems, p. 922 (answer 55.67 cm, 2951.7 kW)',
            answer: md`**Isentropic stagnation temperature rise:**
$$\Delta T_{0s} = T_{01}\left[4^{0.2857} - 1\right] = 293\times0.486 = 142.4\ \text{K}$$

**Actual rise:** $\Delta T_0 = \dfrac{142.4}{0.8} = 178.0$ K, so $w = c_p\Delta T_0 = 178.9$ kJ/kg.

**Tip speed** from $w = \psi\sigma U_2^2$:
$$U_2 = \sqrt{\frac{178\,900}{1.04\times0.9}} = 437.2\ \text{m/s}$$

**Impeller diameter:**
$$D_2 = \frac{60U_2}{\pi N} = \frac{60\times437.2}{\pi\times15000} = 0.5567\ \text{m} = 55.67\ \text{cm}$$

**Power input:**
$$P = \dot m\,w = 16.5\times178.9 = 2952\ \text{kW}$$
Both match the book.`,
            scheme: [
              { marks: 1, for: 'Isentropic and actual temperature rise' },
              { marks: 1, for: 'Work input per kg' },
              { marks: 1, for: 'Tip speed with slip and power input factors and diameter 55.7 cm' },
              { marks: 1, for: 'Power input ≈ 2952 kW' },
            ],
          },
        ],
      },
      {
        number: 7,
        parts: [
          {
            id: 'g2-7a',
            label: 'a',
            marks: 4,
            prompt: md`Write the merits and demerits of gas turbine plant over internal combustion engines. What are the applications of the gas turbine plants?`,
            topicIds: ['u5-intro'],
            bookRef: 'Ch 27 Review Questions, p. 960; §27.1–27.3, pp. 924–927',
            answer: md`**Merits over IC (reciprocating) engines**
- Much higher power-to-weight ratio, compact; no reciprocating parts, so well balanced with little vibration and no flywheel.
- Continuous combustion and steady torque; very high speeds possible.
- Can burn a wide range of fuels (gas, kerosene, heavy oil, pulverised coal in closed cycles).
- Low lubricating-oil consumption; simple maintenance; quick starting and loading.
- Exhaust can be used for heat recovery (combined cycle, cogeneration).

**Demerits**
- Lower efficiency at part load and for small units; the high compressor back-work (often 40–60% of turbine work) makes net work sensitive to component efficiencies.
- Turbine-inlet temperature is limited by blade materials, which calls for costly alloys and blade cooling.
- Needs an external starting device; high-speed shafts need reduction gearing for many uses.
- Very high air consumption; noisy intake and exhaust.

**Applications:** aircraft propulsion (turbojet, turbofan, turboprop, turboshaft for helicopters); peak-load and combined-cycle power stations; marine propulsion (naval ships); gas-pipeline compressor drives; oil and gas platforms; locomotives and tanks; supercharging (turbochargers); industrial cogeneration.`,
            scheme: [
              { marks: 1.5, for: 'Merits' },
              { marks: 1.5, for: 'Demerits' },
              { marks: 1, for: 'Applications' },
            ],
          },
          {
            id: 'g2-7b',
            label: 'b',
            marks: 4,
            prompt: md`A turbojet flies with a speed of 800 km/h at an ambient pressure of 60 kPa. The properties of gas entering the nozzle are 300 kPa and 200°C. The mass-flow rate is 20 kg/s. Assuming air as working fluid, find the thrust developed, thrust power and propulsive efficiency. Take γ = 1.4 and R = 0.287 kJ/kg K.`,
            topicIds: ['u6-turbojet', 'u6-intro'],
            bookRef: 'Ch 28 Problems, pp. 998–999 (answer 7.39 kN, 1643.5 kW, 54.6%)',
            answer: md`$V = 800/3.6 = 222.2$ m/s. The nozzle expands isentropically from 300 kPa, 473 K to the ambient 60 kPa (fully expanded, so there is no pressure thrust).

**Nozzle exit temperature:**
$$T_e = 473\left(\frac{60}{300}\right)^{0.2857} = 298.6\ \text{K}$$

**Jet velocity** (from rest at nozzle entry):
$$V_j = \sqrt{2c_p(T_i - T_e)} = \sqrt{2\times1005\times174.4} = 592.0\ \text{m/s}$$

**Thrust:**
$$F = \dot m(V_j - V) = 20(592.0 - 222.2) = 7395\ \text{N} \approx 7.39\ \text{kN}$$

**Thrust power:** $FV = 7395\times222.2 = 1643$ kW.

**Propulsive efficiency:**
$$\eta_p = \frac{2V}{V + V_j} = \frac{444.4}{814.2} = 54.6\%$$
All three match the book.`,
            scheme: [
              { marks: 1, for: 'Isentropic nozzle exit temperature' },
              { marks: 1, for: 'Jet velocity ≈ 592 m/s' },
              { marks: 1, for: 'Thrust 7.39 kN and thrust power ≈ 1643 kW' },
              { marks: 1, for: 'Propulsive efficiency 54.6%' },
            ],
          },
        ],
      },
    ],
  },
]
