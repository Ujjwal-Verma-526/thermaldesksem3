import type { Paper } from '../types'
import { ME203N_HEADER } from './format'

const md = String.raw

/**
 * Predicted papers 3–5. These use the same rules as predicted-a.ts: ME203n format, every part
 * says what it shadows (`alignsWith`), and all numerical data are new and solved. Paper 5 is
 * deliberately a revision paper of near-repeats, because DTU repeats its favourite questions.
 */
export const PREDICTED_B: Paper[] = [
  /* ================================================================== P3 */
  {
    id: 'predicted-3',
    kind: 'predicted',
    title: 'Predicted Paper 3',
    session: 'Predicted · derivation-heavy',
    blurb: 'Diesel MEP and engine power, optimum pressure ratio and reheat, SI flame propagation, CI chambers, propulsive-efficiency derivation, liquid rockets, three-stage compressor, centrifugal sizing, short notes.',
    current: true,
    header: ME203N_HEADER,
    attempt: 5,
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'x3-1a',
            label: 'a',
            marks: 4,
            prompt: md`Derive an expression for the mean effective pressure of an air standard Diesel cycle in terms of the initial pressure, compression ratio and cut-off ratio.`,
            topicIds: ['u3-diesel'],
            alignsWith: 'May 2018 Q1(a) asked the Diesel efficiency and MEP together. ME203n Q1(a) has rotated through the cycle derivations, and MEP is the half of that question never asked in the new code.',
            answer: md`**Work per kg** $= \eta\,q_s$, with $q_s = c_p(T_3 - T_2) = c_pT_1r^{\gamma-1}(\rho - 1)$ and
$$\eta = 1 - \frac{\rho^\gamma - 1}{\gamma r^{\gamma-1}(\rho - 1)}$$
$$w = c_pT_1\left[r^{\gamma-1}(\rho - 1) - \frac{\rho^\gamma - 1}{\gamma}\right] = c_vT_1\left[\gamma r^{\gamma-1}(\rho - 1) - (\rho^\gamma - 1)\right]$$

**Swept volume per kg:** $v_1 - v_2 = v_1\dfrac{r - 1}{r}$, with $v_1 = RT_1/p_1$ and $c_v = R/(\gamma - 1)$.

**MEP:**
$$p_m = \frac{w}{v_1 - v_2} = \frac{RT_1\left[\gamma r^{\gamma-1}(\rho - 1) - (\rho^\gamma - 1)\right]/(\gamma - 1)}{(RT_1/p_1)(r - 1)/r}$$
$$\boxed{p_m = \frac{p_1\,r\left[\gamma r^{\gamma-1}(\rho - 1) - (\rho^\gamma - 1)\right]}{(\gamma - 1)(r - 1)}}$$
Equivalently $p_m = \dfrac{p_1r^\gamma\left[\gamma(\rho - 1) - r^{1-\gamma}(\rho^\gamma - 1)\right]}{(\gamma - 1)(r - 1)}$.

Check with r = 16, ρ = 1.9, p₁ = 1 bar: p_m = 6.30 bar, which matches part (b).`,
            scheme: [
              { marks: 1, for: 'Net work per kg in terms of T1, r and ρ' },
              { marks: 1, for: 'Swept volume per kg' },
              { marks: 2, for: 'Simplification to the final MEP expression' },
            ],
          },
          {
            id: 'x3-1b',
            label: 'b',
            marks: 4,
            prompt: md`An engine working on the air standard Diesel cycle has a bore of 200 mm, a stroke of 280 mm and a compression ratio of 16. Fuel cut-off takes place at 6% of the stroke. At the start of compression the air is at 1 bar and 27°C. Find (i) the thermal efficiency, (ii) the mean effective pressure and (iii) the power developed if the engine completes 300 working cycles per minute.`,
            topicIds: ['u3-diesel'],
            alignsWith: 'Both ME203n Q1(b)s were Diesel numericals from bore and stroke (Nov 2025: 200 × 300 mm, r = 16). Adding power from the cycle rate is the usual extension.',
            answer: md`**Volumes:** $V_s = \frac{\pi}{4}(0.2)^2(0.28) = 8.796$ L, $V_c = V_s/15 = 0.586$ L, $V_1 = 9.383$ L.

**Cut-off ratio:** $V_3 = V_c + 0.06V_s$, so $\rho = 1 + 0.06(r - 1) = 1.9$.

**Temperatures:** $T_2 = 300\times16^{0.4} = 909.4$ K, $T_3 = 1.9T_2 = 1727.9$ K, $T_4 = T_3(\rho/r)^{0.4} = 736.8$ K.

**Mass:** $m = \dfrac{100\times9.383\times10^{-3}}{0.287\times300} = 10.90$ g.

**(i) Efficiency**
$$Q_s = mc_p(T_3 - T_2) = 8.964\ \text{kJ}, \qquad Q_r = mc_v(T_4 - T_1) = 3.418\ \text{kJ}$$
$$W = 5.546\ \text{kJ}, \qquad \eta = \frac{5.546}{8.964} = 61.9\%$$

**(ii) MEP:** $p_m = W/V_s = 5.546/8.796\times10^{-3} = 630.5$ kPa $= 6.31$ bar.

**(iii) Power:** $P = 5.546\times300/60 = 27.7$ kW.`,
            scheme: [
              { marks: 1, for: 'Volumes and cut-off ratio 1.9' },
              { marks: 1.5, for: 'Temperatures, mass and efficiency ≈ 61.9%' },
              { marks: 1, for: 'MEP ≈ 6.3 bar' },
              { marks: 0.5, for: 'Power ≈ 27.7 kW' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'x3-2a',
            label: 'a',
            marks: 4,
            prompt: md`Show that the pressure ratio for maximum specific work of a simple gas turbine cycle with compressor and turbine efficiencies ηc and ηt is $r_p = \left(\eta_c\eta_t\dfrac{T_{max}}{T_{min}}\right)^{\gamma/[2(\gamma-1)]}$. Deduce the ideal-cycle result and the corresponding maximum work.`,
            topicIds: ['u5-operating', 'u3-brayton'],
            alignsWith: 'Nov 2024 Q2(a) asked the effect of pressure ratio on work and efficiency, and May 2018 Q2(a) asked w_max = cₚ(√Tmax − √Tmin)². This general form covers both and is a likely derivation.',
            answer: md`Let $x = r_p^{(\gamma-1)/\gamma}$, $T_1 = T_{min}$, $T_3 = T_{max}$.

**Actual works:**
$$w_c = \frac{c_pT_1(x - 1)}{\eta_c}, \qquad w_t = \eta_tc_pT_3\left(1 - \frac1x\right)$$
$$w = c_p\left[\eta_tT_3\left(1 - \frac1x\right) - \frac{T_1(x - 1)}{\eta_c}\right]$$

**Maximise:**
$$\frac{dw}{dx} = c_p\left[\frac{\eta_tT_3}{x^2} - \frac{T_1}{\eta_c}\right] = 0 \;\Rightarrow\; x^2 = \eta_c\eta_t\frac{T_3}{T_1}$$
The second derivative is negative, so this is a maximum.
$$\boxed{r_{p,opt} = \left(\eta_c\eta_t\frac{T_{max}}{T_{min}}\right)^{\frac{\gamma}{2(\gamma-1)}}}$$

**Ideal cycle** ($\eta_c = \eta_t = 1$): $x = \sqrt{T_3/T_1}$, so $T_2 = T_4 = \sqrt{T_1T_3}$ and
$$w_{max} = c_p\left[T_3 - 2\sqrt{T_1T_3} + T_1\right] = c_p\left(\sqrt{T_{max}} - \sqrt{T_{min}}\right)^2$$

Component losses lower the optimum pressure ratio. Efficiency of the ideal cycle, by contrast, keeps rising with $r_p$, so designs pick a ratio between the two optima.`,
            scheme: [
              { marks: 1, for: 'Net work with component efficiencies' },
              { marks: 1.5, for: 'Differentiation and optimum r_p' },
              { marks: 1, for: 'Ideal case: T2 = T4 and w_max = cp(√Tmax − √Tmin)²' },
              { marks: 0.5, for: 'Comment on efficiency vs work optimum' },
            ],
          },
          {
            id: 'x3-2b',
            label: 'b',
            marks: 4,
            prompt: md`In a gas turbine plant air at 1 bar and 300 K is compressed through a pressure ratio of 9 (ηc = 85%). The gas enters the HP turbine at 1250 K, expands to 3 bar, is reheated to 1250 K and expands in the LP turbine to 1 bar. Both turbines have an efficiency of 88%. Find the net work, thermal efficiency and work ratio, and compare them with the same plant without reheat.`,
            topicIds: ['u5-reheat-intercool'],
            alignsWith: 'Nov 2025 Q2(b) asked the reheat cycle in theory and Nov 2024 Q2(b) was reheat with an ideal regenerator. Reheat with component efficiencies and no regenerator shows the efficiency penalty the theory question expects you to state.',
            answer: md`**Compressor:** $9^{0.2857} = 1.873$, $T_{2s} = 562.0$ K, $T_2 = 300 + \dfrac{262.0}{0.85} = 608.3$ K, $w_c = 309.8$ kJ/kg.

**Each turbine** (ratio 3, $3^{0.2857} = 1.3687$): $T_{s} = 1250/1.3687 = 913.2$ K, actual exit $= 1250 - 0.88\times336.8 = 953.7$ K.
$$w_t = 2\times1.005\times296.3 = 595.6\ \text{kJ/kg}$$

**Net work:** $w_{net} = 595.6 - 309.8 = 285.8$ kJ/kg.

**Heat supplied:**
$$q = 1.005(1250 - 608.3) + 1.005(1250 - 953.7) = 942.8\ \text{kJ/kg}$$
$$\eta = \frac{285.8}{942.8} = 30.3\%, \qquad \text{work ratio} = 0.48$$

**Without reheat:** $T_4 = 1250 - 0.88(1250 - 667.4) = 737.2$ K.
$$w_{net} = 515.4 - 309.8 = 205.6\ \text{kJ/kg}, \qquad \eta = \frac{205.6}{644.9} = 31.9\%, \qquad \text{work ratio} = 0.40$$

**Comment:** reheat raises the net work by 39% and the work ratio from 0.40 to 0.48, but lowers the efficiency slightly, because the LP exhaust leaves 216 K hotter. A regenerator would recover that.`,
            scheme: [
              { marks: 1, for: 'Compressor exit temperature and work' },
              { marks: 1, for: 'Equal turbine stages and total turbine work' },
              { marks: 1, for: 'Heat supplied, efficiency ≈ 30.3% and work ratio ≈ 0.48' },
              { marks: 1, for: 'No-reheat comparison and comment' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'x3-3a',
            label: 'a',
            marks: 4,
            prompt: md`Discuss the factors that affect flame propagation in an SI engine. What are the requirements of a good SI engine combustion chamber?`,
            topicIds: ['u4-si-combustion'],
            alignsWith: 'SI combustion stages were asked in both ME203n papers (Nov 2024 Q4(a), Nov 2025 Q3(a)). Flame speed and chamber design are the parts of the same topic not yet asked.',
            answer: md`**Factors affecting flame speed**
1. **Turbulence:** the most important. Squish, swirl and engine speed wrinkle the flame front and multiply its area, so flame speed rises almost in proportion to engine speed.
2. **Air–fuel ratio:** maximum speed is slightly rich of stoichiometric (about 10% rich). Very lean or very rich mixtures burn slowly.
3. **Temperature and pressure:** higher values (higher compression ratio, supercharging) increase flame speed.
4. **Residual gas / EGR:** dilution slows the flame.
5. **Compression ratio:** higher r raises temperature and pressure and lowers residual fraction, all increasing speed.
6. **Engine size:** a longer flame path increases the time for combustion (in crank degrees).
7. **Spark-plug position and spark energy.**

**Requirements of a good SI combustion chamber**
- **Short flame travel:** a compact chamber with a central plug, to reduce time and knock.
- **Adequate turbulence**, but not excessive (heat loss).
- **Cool end gas:** the end-gas region placed near cool surfaces such as the inlet valve; the hot exhaust valve near the plug.
- **High volumetric efficiency:** large valves and smooth passages.
- **Low surface-to-volume ratio:** less heat loss and lower HC emissions.
- No hot spots or deposits that cause pre-ignition.

Examples: hemispherical and pent-roof chambers (good); side-valve L-head (poor).`,
            scheme: [
              { marks: 2, for: 'Factors affecting flame propagation' },
              { marks: 2, for: 'Requirements of a good SI combustion chamber' },
            ],
          },
          {
            id: 'x3-3b',
            label: 'b',
            marks: 4,
            prompt: md`Compare direct-injection (open) and indirect-injection (pre-chamber / swirl-chamber) combustion chambers for CI engines.`,
            topicIds: ['u4-ci-combustion'],
            alignsWith: 'CI combustion was a Nov 2025 short note and CI knock was Nov 2024 Q4(b). Chamber types are the remaining CI-combustion item and fit a 4-mark comparison.',
            answer: md`**Direct injection (open chamber):** fuel is sprayed straight into a bowl in the piston crown. Mixing relies on high injection pressure, multi-hole nozzles and moderate swirl.

**Indirect injection:** fuel is sprayed into a small separate chamber (swirl chamber such as the Ricardo Comet, or pre-chamber) in the head, connected to the main chamber by a throat. Strong air motion in the chamber does the mixing. Partially burnt gas then jets into the main chamber, where combustion completes.

| Direct injection | Indirect injection |
|---|---|
| Simple head; lower surface-to-volume ratio | Extra chamber; higher surface area |
| Less heat loss, so **better fuel economy** (10–15% lower bsfc) | More heat and throttling loss through the throat |
| Easy cold starting | Hard starting; needs glow plugs and higher r (18–24) |
| High injection pressure; multi-hole nozzle; fuel-quality sensitive | Low injection pressure; single-hole pintle nozzle; tolerates poorer fuel |
| Rougher, noisier combustion (higher rate of pressure rise) | Smoother, quieter running |
| Limited speed range; suits large, slow engines (and modern common-rail cars) | Higher speeds; suited to older small car engines |
| Lower peak air motion, so more smoke if mixing is poor | Better air utilisation; lower smoke |`,
            scheme: [
              { marks: 1, for: 'Description of both chamber types' },
              { marks: 3, for: 'At least six valid points of comparison' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'x3-4a',
            label: 'a',
            marks: 4,
            prompt: md`Derive expressions for the thrust, thrust power and propulsive efficiency of a jet engine. Show that the propulsive efficiency is maximum when the jet velocity equals the flight velocity, and explain why this condition is not used in practice.`,
            topicIds: ['u6-intro'],
            alignsWith: 'Every ME203n paper has had a jet question but none has asked the basic propulsion relations. They head Rathore\'s jet chapter and underpin every jet numerical.',
            answer: md`Air enters at flight speed V (relative to the engine) and leaves at $V_j$. Neglect the fuel mass and take the nozzle fully expanded ($p_e = p_a$).

**Thrust** (rate of change of momentum):
$$F = \dot m(V_j - V)$$
With fuel and pressure terms: $F = (\dot m_a + \dot m_f)V_j - \dot m_aV + (p_e - p_a)A_e$.

**Thrust power:**
$$P_T = FV = \dot m(V_j - V)V$$

**Propulsive power** (rate of KE increase given to the gas):
$$P_P = \frac{\dot m(V_j^2 - V^2)}{2}$$

**Propulsive efficiency:**
$$\eta_p = \frac{P_T}{P_P} = \frac{2V(V_j - V)}{(V_j - V)(V_j + V)} = \boxed{\frac{2V}{V + V_j} = \frac{2}{1 + V_j/V}}$$

**Maximum:** $\eta_p \to 1$ as $V_j/V \to 1$. But then $F = \dot m(V_j - V) \to 0$. To get useful thrust with $V_j \approx V$ the engine would need an enormous mass flow, hence a huge, heavy intake. Practical engines strike a compromise: turbofans and turboprops move a large mass at modest $V_j$ (high $\eta_p$), while turbojets use a small mass at high $V_j$.

**Thermal efficiency** $\eta_{th} = P_P/(\dot m_fCV)$ and **overall** $\eta_o = \eta_p\eta_{th}$.`,
            scheme: [
              { marks: 1, for: 'Thrust from momentum (with pressure term noted)' },
              { marks: 1, for: 'Thrust power and propulsive power' },
              { marks: 1, for: 'η_p = 2V/(V + Vj)' },
              { marks: 1, for: 'Maximum at Vj = V and why thrust vanishes' },
            ],
          },
          {
            id: 'x3-4b',
            label: 'b',
            marks: 4,
            prompt: md`With a neat sketch explain the working of a liquid propellant rocket engine. Compare liquid and solid propellant rockets.`,
            topicIds: ['u6-rockets'],
            alignsWith: 'Nov 2024 Q3(b) asked propellant classification and May 2018 Q7(b) rocket propulsion. A sketch question on the liquid engine is the most common rocket follow-up.',
            answer: md`**Sketch:** fuel tank and oxidiser tank → pumps (driven by a gas-generator turbine) or pressurised-gas feed → injector plate → combustion chamber → convergent–divergent nozzle. The fuel circulates through the nozzle walls first (regenerative cooling).

**Working:** the fuel (kerosene, liquid hydrogen, UDMH) and oxidiser (liquid oxygen, N₂O₄) are fed at high pressure to the injector. It atomises and mixes them in the chamber, where they burn at 20–200 bar and about 3000 K. Hypergolic pairs ignite on contact; others need an igniter. The gases accelerate through the nozzle to 2000–4500 m/s, giving thrust $F = \dot mV_e + (p_e - p_a)A_e$. Flow valves control the thrust.

| Liquid propellant | Solid propellant |
|---|---|
| Higher specific impulse (up to about 450 s) | Lower specific impulse (200–300 s) |
| Thrust can be throttled, stopped and restarted | Burns to completion once ignited |
| Complex: pumps, valves, plumbing, cooling | Very simple; few parts |
| Cryogenic or toxic propellants; needs fuelling before launch | Storable for years; ready to fire |
| Chamber is small and cooled; tanks are light | The whole casing is the chamber, so it must withstand full pressure |
| Used for main launch stages and upper stages, spacecraft | Used for boosters, missiles, sounding rockets |`,
            scheme: [
              { marks: 1.5, for: 'Labelled sketch with feed system and cooling' },
              { marks: 1, for: 'Working' },
              { marks: 1.5, for: 'Comparison with solid rockets' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'x3-5a',
            label: 'a',
            marks: 4,
            prompt: md`What is multistage compression? With a p–V diagram show the work saved by two-stage compression with intercooling, and list the advantages of multistage compression.`,
            topicIds: ['u1-multistage'],
            alignsWith: 'Nov 2024 Q5(a) and May 2018 Q6(a) both asked multistage derivations. The descriptive version with the p–V saving is the other common way it is set.',
            answer: md`**Multistage compression:** the air is compressed in two or more cylinders in series. Each raises the pressure by part of the total ratio, and an **intercooler** between stages cools the air at constant pressure, ideally back to the inlet temperature ("perfect intercooling").

**p–V diagram:** LP stage 1→2 along $pV^n$; intercooling 2→2' at constant intermediate pressure, back onto the isothermal through 1; HP stage 2'→3. Single-stage compression would follow 1→3' along $pV^n$. The **shaded area between 2–3' and 2'–3** is the work saved. More stages bring the path closer to the isothermal.

**Advantages**
1. **Less work,** because compression is nearer isothermal.
2. **Higher volumetric efficiency:** the pressure ratio per stage is small, so clearance re-expansion is small.
3. **Lower delivery temperature:** better lubrication, and no risk of oil-vapour explosion.
4. Lighter and better-balanced mechanism; the HP cylinder handles a small volume, so it can be made strong and small.
5. Moisture condenses in the intercooler and can be drained.
6. Smaller leakage losses; uniform torque, so a smaller flywheel.

**Disadvantages:** higher first cost and complexity; needs coolers and cooling water.`,
            scheme: [
              { marks: 1, for: 'Definition with intercooling' },
              { marks: 1.5, for: 'p–V diagram showing the work saved' },
              { marks: 1.5, for: 'Advantages' },
            ],
          },
          {
            id: 'x3-5b',
            label: 'b',
            marks: 4,
            prompt: md`A three-stage reciprocating compressor takes in 3 m³/min of free air at 1 bar and 27°C and delivers it at 64 bar. The compression index is 1.3 in all stages and intercooling is perfect. Find (i) the intermediate pressures for minimum work, (ii) the power required, (iii) the heat rejected in each intercooler and (iv) the saving over single-stage compression.`,
            topicIds: ['u1-multistage'],
            alignsWith: 'Nov 2024 Q5(a) derived the optimum intermediate pressure. Rathore extends it to three stages (Ch 25 problems), and an exact cube-root ratio makes a clean exam question.',
            answer: md`**(i) Intermediate pressures.** Stage ratio $= (64)^{1/3} = 4$, so the pressures are **4 bar and 16 bar**.

**(ii) Power.** $p_1\dot V = 100\times3/60 = 5$ kW, $\dfrac{n-1}{n} = 0.2308$, $4^{0.2308} = 1.377$.
$$P = 3\times\frac{n}{n - 1}p_1\dot V\left(4^{0.2308} - 1\right) = 3\times4.333\times5\times0.377 = 24.5\ \text{kW}$$

**(iii) Heat in each intercooler.** Each stage delivers at $T = 300\times1.377 = 413.1$ K.
$$\dot m = \frac{100\times3}{0.287\times300\times60} = 0.0581\ \text{kg/s}$$
$$\dot Q = \dot mc_p(413.1 - 300) = 0.0581\times1.005\times113.1 = 6.60\ \text{kW (each)}$$
The cylinder jackets also remove $\dot mc_v\dfrac{\gamma - n}{n - 1}\Delta T = 1.57$ kW per stage.

**(iv) Single stage:**
$$P_1 = 4.333\times5\times(64^{0.2308} - 1) = 34.9\ \text{kW}, \qquad \text{saving} = 29.8\%$$
Single-stage delivery would be at 783 K, which is unacceptable.`,
            scheme: [
              { marks: 1, for: 'Intermediate pressures 4 and 16 bar' },
              { marks: 1, for: 'Three-stage power ≈ 24.5 kW' },
              { marks: 1, for: 'Intercooler heat ≈ 6.6 kW each' },
              { marks: 1, for: 'Single-stage power and saving ≈ 30%' },
            ],
          },
        ],
      },
      {
        number: 6,
        parts: [
          {
            id: 'x3-6a',
            label: 'a',
            marks: 4,
            prompt: md`Explain the losses in a centrifugal compressor. How do they vary with the mass flow rate? Sketch the efficiency–flow characteristic.`,
            topicIds: ['u2-efficiency', 'u2-surging'],
            alignsWith: 'Nov 2024 Q6(b) asked surging and choking, which are the ends of the characteristic. Losses and the shape of the efficiency curve between them is the natural companion question.',
            answer: md`**Losses**
1. **Friction losses:** skin friction in the inducer, impeller channels, diffuser and volute. They grow roughly with the square of the flow, $\propto \dot m^2$.
2. **Incidence (shock) losses:** at off-design flow the relative velocity meets the impeller vanes (and the diffuser vanes) at the wrong angle, causing separation. They are zero at design flow and grow on either side.
3. **Slip:** reduces the work that can be put in. It is not a loss of energy itself but lowers the pressure ratio.
4. **Disc friction and windage:** the backface of the disc rotating in air. Allowed for by the power input factor ψ.
5. **Leakage:** from the impeller tip back to the eye through the clearance.
6. **Diffuser and volute losses:** incomplete diffusion and exit kinetic energy.

**Variation with flow:** total loss $=$ friction (a parabola rising with flow) $+$ incidence (a parabola with its minimum at design flow). The sum has its minimum close to the design point.

**Characteristic:** efficiency against mass flow (at constant speed) is a hump with its peak near design flow. It falls on the low-flow side towards the **surge** line and on the high-flow side towards **choking**. At higher speeds the curve shifts right and becomes narrower.`,
            scheme: [
              { marks: 2, for: 'Types of losses explained' },
              { marks: 1, for: 'Variation of friction and incidence losses with flow' },
              { marks: 1, for: 'Efficiency–flow sketch with surge and choke limits' },
            ],
          },
          {
            id: 'x3-6b',
            label: 'b',
            marks: 4,
            prompt: md`A centrifugal compressor with radial vanes is required to deliver 8 kg/s of air with a total pressure ratio of 4 when the inlet stagnation temperature is 288 K. The isentropic efficiency is 82%, the slip factor 0.9 and the power input factor 1.04. If the compressor runs at 18000 rpm, find the impeller tip diameter, the exit stagnation temperature and the power required.`,
            topicIds: ['u2-velocity', 'u2-efficiency'],
            alignsWith: 'Nov 2025 Q6(b) was a centrifugal numerical. Sizing the impeller from a required pressure ratio (Rathore Ch 26) is the form the ME203n papers have not yet used.',
            answer: md`**Isentropic rise:**
$$\Delta T_{0s} = 288(4^{0.2857} - 1) = 288\times0.486 = 140.0\ \text{K}$$

**Actual rise:** $\Delta T_0 = 140.0/0.82 = 170.7$ K, so $T_{02} = 458.7$ K.

**Work:** $w = c_p\Delta T_0 = 171.5$ kJ/kg.

**Tip speed:**
$$U_2 = \sqrt{\frac{w}{\psi\sigma}} = \sqrt{\frac{171\,500}{1.04\times0.9}} = 428.1\ \text{m/s}$$

**Diameter:**
$$D_2 = \frac{60U_2}{\pi N} = \frac{60\times428.1}{\pi\times18000} = 0.454\ \text{m}$$

**Power:** $P = 8\times171.5 = 1372$ kW.`,
            scheme: [
              { marks: 1, for: 'Isentropic and actual temperature rise' },
              { marks: 1, for: 'Work input and exit temperature' },
              { marks: 1.5, for: 'Tip speed and diameter ≈ 454 mm' },
              { marks: 0.5, for: 'Power ≈ 1372 kW' },
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
            id: 'x3-7i',
            label: 'i',
            marks: 4,
            prompt: md`Scavenging in two-stroke engines`,
            topicIds: ['u4-two-stroke'],
            alignsWith: 'Two-stroke engines are in the Unit 4 syllabus but no ME203n paper has asked about them. Scavenging is the core idea and a short-note favourite.',
            answer: md`**Scavenging:** clearing the burnt gases out of the cylinder at the end of expansion and refilling it with fresh charge, using the incoming charge itself, because there is no separate exhaust stroke.

**Types**
1. **Cross-flow:** transfer and exhaust ports on opposite sides; a deflector piston turns the charge upward. Simple, but the deflector gets hot and scavenging is poor.
2. **Loop (reverse-flow, Schnuerle):** transfer ports on the same side as or beside the exhaust port; the charge loops up the far wall and back down. Flat piston; good results; most small engines.
3. **Uniflow:** charge enters through ports at one end and the exhaust leaves through valves (or opposed-piston ports) at the other. Best scavenging; used in large marine diesels.

**Measures:** delivery ratio (mass delivered / reference mass), scavenging efficiency (fresh charge retained / total charge in cylinder), trapping efficiency (fresh charge retained / fresh charge delivered).

**Problems:** short-circuiting (fresh charge escaping with the exhaust) and mixing with residual gas. In petrol two-strokes this wastes fuel and causes HC emissions, which is why direct injection or crankcase-scavenged diesel versions are used.`,
            scheme: [
              { marks: 1, for: 'Definition' },
              { marks: 2, for: 'Cross, loop and uniflow scavenging with sketches' },
              { marks: 1, for: 'Scavenging parameters and problems' },
            ],
          },
          {
            id: 'x3-7ii',
            label: 'ii',
            marks: 4,
            prompt: md`Ericsson cycle`,
            topicIds: ['u3-stirling-ericsson'],
            alignsWith: 'The Ericsson cycle is in the Unit 3 syllabus and has never been examined. It also links to the gas-turbine "intercool + reheat + regenerate" idea, which makes it a likely short note.',
            answer: md`**Processes:** 1–2 isothermal compression at $T_L$; 2–3 constant-pressure heating to $T_H$; 3–4 isothermal expansion at $T_H$; 4–1 constant-pressure cooling to $T_L$. Show these on p-v and T-s diagrams (on T-s the two isobars are parallel curves).

**Regenerator:** the heat released in 4–1, $c_p(T_H - T_L)$, equals that needed in 2–3, so a perfect regenerator transfers it internally. External heat is exchanged only during the isothermals:
$$q_s = RT_H\ln r_p, \qquad q_r = RT_L\ln r_p \;\Rightarrow\; \eta = 1 - \frac{T_L}{T_H}$$
which is the Carnot efficiency.

**Practical meaning:** isothermal compression is approached by many stages of intercooling, and isothermal expansion by many stages of reheating. So a gas turbine with multi-stage intercooling, reheating and a regenerator approaches the Ericsson cycle.

**Comparison with Stirling:** both reach Carnot efficiency with perfect regeneration. Stirling regenerates at constant volume, Ericsson at constant pressure. Ericsson gives a larger work output per cycle than Carnot between the same limits, because it has no isentropic processes.`,
            scheme: [
              { marks: 1, for: 'Processes with p-v and T-s diagrams' },
              { marks: 2, for: 'Regeneration and derivation of the Carnot efficiency' },
              { marks: 1, for: 'Link to multistage gas turbines and comparison with Stirling' },
            ],
          },
          {
            id: 'x3-7iii',
            label: 'iii',
            marks: 4,
            prompt: md`Prewhirl and inlet guide vanes in centrifugal compressors`,
            topicIds: ['u2-velocity'],
            alignsWith: 'Nov 2025 Q7(iii) asked the velocity triangles for centrifugal compressors as a short note. Prewhirl is the inlet-triangle modification that follows from them.',
            answer: md`**Problem:** the relative velocity at the impeller eye tip, $V_{r1} = \sqrt{V_{f1}^2 + U_{1,tip}^2}$, is the largest in the machine. If its Mach number exceeds about 0.8–0.9, shock waves form at the vane leading edges, causing large losses and early choking.

**Prewhirl:** fixed **inlet guide vanes** ahead of the eye give the air a whirl component $V_{w1}$ *in the direction of rotation*. The inlet triangle changes so the relative velocity falls:
$$V_{r1} = \sqrt{V_{f1}^2 + (U_1 - V_{w1})^2}$$
This lowers the inlet relative Mach number.

**Cost:** the work input becomes $w = U_2V_{w2} - U_1V_{w1}$, so prewhirl **reduces the work and the pressure ratio** at a given speed. It is therefore applied only near the eye tip, where Mach number is critical; guide vanes are often twisted so that the whirl varies with radius.

**Other uses:** variable inlet guide vanes control flow at part load and widen the surge-free range.`,
            scheme: [
              { marks: 1, for: 'Problem of high relative Mach number at the eye' },
              { marks: 2, for: 'Prewhirl effect on the inlet velocity triangle' },
              { marks: 1, for: 'Effect on work input and other uses' },
            ],
          },
          {
            id: 'x3-7iv',
            label: 'iv',
            marks: 4,
            prompt: md`Free air delivered (FAD) and capacity control of reciprocating compressors`,
            topicIds: ['u1-clearance', 'u1-basics'],
            alignsWith: 'May 2018 Q6(b) and Nov 2025 Q5(b) gave data on a free-air basis. The definition and the ways to match delivery to demand are routine short-note material.',
            answer: md`**Free air delivered (FAD):** the actual volume of air delivered per unit time, reduced to the **free-air (atmospheric) conditions** $p_0$, $T_0$ at the compressor site:
$$V_{FAD} = (V_1 - V_4)\frac{p_1T_0}{p_0T_1} \text{ per cycle}$$
Compressor capacities and volumetric efficiency are quoted on this basis, so the figure accounts for suction-pressure drop, heating of the air and clearance. Standard (normal) conditions are sometimes used instead, such as 1.013 bar and 15 °C.

**Capacity control** matches output to demand so the receiver pressure stays within limits.
1. **Start–stop control:** a pressure switch stops and starts the motor (small compressors).
2. **Constant-speed unloading:** the suction valves are held open (valve unloaders) so no air is compressed; or the suction is throttled or closed.
3. **Clearance pockets:** extra clearance volume is opened, which lowers the volumetric efficiency and delivery.
4. **Speed control:** variable-speed motors or engine drives.
5. **Bypass:** delivered air returned to suction (wasteful).

Unloading and clearance pockets save power; throttling and bypass do not.`,
            scheme: [
              { marks: 1.5, for: 'Definition of FAD with expression' },
              { marks: 2.5, for: 'Methods of capacity control' },
            ],
          },
        ],
      },
    ],
  },
  /* ================================================================== P4 */
  {
    id: 'predicted-4',
    kind: 'predicted',
    title: 'Predicted Paper 4',
    session: 'Predicted · less-asked topics',
    blurb: 'Otto derivation + clearance numerical, ideal intercool–reheat–regenerate cycle, engine classification and indicator diagram, turbojet cycle analysis, clearance and work, compressor sizing, h-s diagram, Stodola slip, air-standard limits, GT combustors.',
    current: true,
    header: ME203N_HEADER,
    attempt: 5,
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'x4-1a',
            label: 'a',
            marks: 4,
            prompt: md`Derive an expression for the air standard efficiency of the Otto cycle. Plot the efficiency against compression ratio and explain why the compression ratio of petrol engines is limited.`,
            topicIds: ['u3-otto'],
            alignsWith: 'Nov 2025 Q1(a) was exactly the Otto derivation. Repeats of Q1(a) derivations are frequent, and the efficiency–r curve with the knock limit is the expected extension.',
            answer: md`**Processes:** 1–2 isentropic compression; 2–3 constant-volume heat addition; 3–4 isentropic expansion; 4–1 constant-volume heat rejection.
$$q_s = c_v(T_3 - T_2), \qquad q_r = c_v(T_4 - T_1)$$
$$\frac{T_2}{T_1} = \frac{T_3}{T_4} = r^{\gamma-1} \;\Rightarrow\; \frac{T_4 - T_1}{T_3 - T_2} = \frac{1}{r^{\gamma-1}}$$
$$\boxed{\eta_{Otto} = 1 - \frac{1}{r^{\gamma-1}}}$$

It depends only on r (and γ), not on the heat supplied.

**Curve (γ = 1.4):** r = 4 gives 42.6%, r = 6 gives 51.2%, r = 8 gives 56.5%, r = 10 gives 60.2%, r = 12 gives 63.0%. It rises steeply at first, then flattens, so gains above about 10–12 are small.

**Why r is limited in petrol engines (6–11)**
1. **Knock:** a higher r raises end-gas temperature and pressure, so the charge auto-ignites.
2. The small efficiency gain at high r does not justify the higher pressures and weight.
3. Higher NOₓ emissions and higher heat loss.

Diesel engines compress only air, so they can use r = 14–22.`,
            scheme: [
              { marks: 2, for: 'Derivation of η = 1 − 1/r^(γ−1)' },
              { marks: 1, for: 'Efficiency–compression ratio plot' },
              { marks: 1, for: 'Reasons for limiting r (knock)' },
            ],
          },
          {
            id: 'x4-1b',
            label: 'b',
            marks: 4,
            prompt: md`In an Otto cycle engine the clearance volume is 15% of the swept volume. At the beginning of compression the air is at 1 bar and 27°C and the maximum pressure of the cycle is 40 bar. Determine the compression ratio, the air standard efficiency, the heat supplied per kg of air and the mean effective pressure.`,
            topicIds: ['u3-otto'],
            alignsWith: 'Nov 2024 Q1(b) gave the clearance volume directly. Stating clearance as a percentage of swept volume is the other standard way Rathore sets Otto data, and pairs with part (a).',
            answer: md`**Compression ratio:**
$$r = \frac{V_s + V_c}{V_c} = 1 + \frac{1}{0.15} = 7.667$$

**Efficiency:**
$$\eta = 1 - \frac{1}{7.667^{0.4}} = 55.7\%$$

**End of compression:** $T_2 = 300\times7.667^{0.4} = 677.6$ K, $p_2 = 7.667^{1.4} = 17.32$ bar.

**Heat supplied:** $T_3 = T_2\dfrac{p_3}{p_2} = 677.6\times\dfrac{40}{17.32} = 1565.2$ K.
$$q_s = c_v(T_3 - T_2) = 0.718\times887.6 = 637.3\ \text{kJ/kg}$$

**MEP:**
$$w = 0.5573\times637.3 = 355.1\ \text{kJ/kg}, \qquad v_1 - v_2 = 0.861\left(1 - \frac{1}{7.667}\right) = 0.7487\ \text{m}^3/\text{kg}$$
$$p_m = \frac{355.1}{0.7487} = 474\ \text{kPa} = 4.74\ \text{bar}$$`,
            scheme: [
              { marks: 1, for: 'Compression ratio 7.67' },
              { marks: 0.5, for: 'Efficiency ≈ 55.7%' },
              { marks: 1.5, for: 'T2, T3 and heat supplied ≈ 637 kJ/kg' },
              { marks: 1, for: 'MEP ≈ 4.74 bar' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'x4-2a',
            label: 'a',
            marks: 4,
            prompt: md`Show that the thermal efficiency of an ideal gas turbine cycle with two-stage compression with perfect intercooling, two-stage expansion with reheating to the maximum temperature and a perfect regenerator is $\eta = 1 - \dfrac{T_{min}}{T_{max}}\,r_p^{(\gamma-1)/2\gamma}$. Explain how the cycle approaches the Ericsson cycle.`,
            topicIds: ['u5-reheat-intercool', 'u5-regeneration'],
            alignsWith: 'May 2018 Q3(a) asked the combined intercool–reheat cycle in words and Nov 2024 Q2(b) put reheat and regeneration together. The general efficiency result is the derivation behind both.',
            answer: md`Let $x = r_p^{(\gamma-1)/2\gamma}$, so each stage, with ratio $\sqrt{r_p}$, has temperature ratio x. $T_{min} = T_1$, $T_{max} = T_3$.

**Compression** (two equal stages, intercooled to $T_1$): each stage $T_1 \to T_1x$, so $w_c = 2c_pT_1(x - 1)$.

**Expansion** (two equal stages, reheated to $T_3$): each stage $T_3 \to T_3/x$, so $w_t = 2c_pT_3(1 - 1/x)$.

**Perfect regenerator:** the compressed air at $T_1x$ is heated to the turbine exhaust temperature $T_3/x$. The external heat is then supplied only in the combustion chamber and the reheater, each from $T_3/x$ to $T_3$:
$$q_s = 2c_pT_3\left(1 - \frac1x\right) = w_t$$

**Efficiency:**
$$\eta = 1 - \frac{w_c}{w_t} = 1 - \frac{T_1(x - 1)}{T_3(x - 1)/x} = \boxed{1 - \frac{T_{min}}{T_{max}}\,x = 1 - \frac{T_{min}}{T_{max}}\,r_p^{\frac{\gamma-1}{2\gamma}}}$$

**Towards Ericsson:** with N stages of intercooling and reheating the result becomes $1 - \dfrac{T_{min}}{T_{max}}r_p^{(\gamma-1)/N\gamma}$. As N → ∞ the exponent tends to zero, compression and expansion become isothermal, and with constant-pressure regeneration the cycle becomes the Ericsson cycle, with $\eta \to 1 - T_{min}/T_{max}$ (Carnot).`,
            scheme: [
              { marks: 1, for: 'Compressor and turbine work for equal stages' },
              { marks: 1, for: 'Heat supplied with a perfect regenerator' },
              { marks: 1.5, for: 'Final efficiency expression' },
              { marks: 0.5, for: 'Limit to the Ericsson cycle' },
            ],
          },
          {
            id: 'x4-2b',
            label: 'b',
            marks: 4,
            prompt: md`An ideal gas turbine cycle works between 1 bar, 300 K and a maximum temperature of 1200 K with an overall pressure ratio of 9. Compression is in two stages with perfect intercooling, expansion is in two stages with reheating to 1200 K, and a perfect regenerator is fitted. Intermediate pressures are chosen for minimum compressor work and equal turbine work. Calculate the net work and thermal efficiency, and compare with the simple cycle between the same limits.`,
            topicIds: ['u5-reheat-intercool', 'u5-regeneration'],
            alignsWith: 'Nov 2024 Q2(b) was reheat + 100% regenerator with ideal components. Adding intercooling completes the set and directly checks part (a).',
            answer: md`Stage ratio $\sqrt9 = 3$, so $x = 3^{0.2857} = 1.3687$.

**Compressors:** each delivers at $300\times1.3687 = 410.6$ K.
$$w_c = 2\times1.005\times110.6 = 222.3\ \text{kJ/kg}$$

**Turbines:** each exhausts at $1200/1.3687 = 876.7$ K.
$$w_t = 2\times1.005\times323.3 = 649.8\ \text{kJ/kg}$$

**Net work:** $w_{net} = 649.8 - 222.3 = 427.4$ kJ/kg.

**Heat supplied:** the regenerator heats the air from 410.6 K to 876.7 K, so
$$q_s = 1.005(1200 - 876.7)\times2 = 649.8\ \text{kJ/kg}$$
$$\eta = \frac{427.4}{649.8} = 65.8\%$$
Check by formula: $1 - 0.25\times1.3687 = 0.658$ ✓

**Simple cycle:** $T_2 = 300\times9^{0.2857} = 562.0$ K and $T_4 = 1200/1.873 = 640.5$ K.
$$w_{net} = 1.005\left[(1200 - 640.5) - (562.0 - 300)\right] = 298.9\ \text{kJ/kg}$$
$$\eta = 1 - \frac{1}{1.873} = 46.6\%$$

**Comparison:** the net work rises by 43% and efficiency from 46.6% to 65.8%, against the Carnot limit of 75%.`,
            scheme: [
              { marks: 1, for: 'Stage temperatures and compressor work' },
              { marks: 1, for: 'Turbine work and net work ≈ 427 kJ/kg' },
              { marks: 1, for: 'Heat supplied with regenerator and η ≈ 65.8%' },
              { marks: 1, for: 'Simple-cycle comparison (≈ 299 kJ/kg, 46.6%)' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'x4-3a',
            label: 'a',
            marks: 4,
            prompt: md`Classify internal combustion engines on different bases, giving an example of each.`,
            topicIds: ['u4-classification'],
            alignsWith: '"Classification" heads the Unit 4 syllabus and has never been asked in ME203n. It is a typical low-risk 4-mark theory part.',
            answer: md`| Basis | Types (example) |
|---|---|
| **Cycle of operation** | Otto / constant-volume (petrol car); Diesel / constant-pressure (slow marine diesel); Dual (modern high-speed diesel) |
| **Strokes per cycle** | Four-stroke (car); two-stroke (scooter, large ship engine) |
| **Ignition** | Spark ignition (petrol, CNG); compression ignition (diesel) |
| **Fuel** | Petrol, diesel, gas (CNG/LPG/biogas), dual-fuel, alcohol and multi-fuel |
| **Fuel supply** | Carburettor; port fuel injection; direct injection |
| **Cooling** | Air-cooled (motorcycle); water-cooled (car) |
| **Cylinder arrangement** | In-line, V, opposed (boxer), radial (old aircraft), X, W |
| **Number of cylinders** | Single (motorcycle); multi-cylinder (car, 4–12) |
| **Valve location** | Overhead (I-head), side valve (L-head), F-head, T-head |
| **Speed** | Low (< 300 rpm), medium (300–1000), high (> 1000) |
| **Application** | Automotive, locomotive, marine, aircraft, stationary |
| **Air intake** | Naturally aspirated; supercharged; turbocharged |
| **Lubrication** | Wet sump, dry sump, mist (two-stroke petrol) |`,
            scheme: [{ marks: 4, for: 'At least eight bases of classification with examples (half a mark each)' }],
          },
          {
            id: 'x4-3b',
            label: 'b',
            marks: 4,
            prompt: md`Draw the actual indicator (p–V) diagram of a four-stroke SI engine and compare it with the theoretical Otto cycle. Explain the losses responsible for the difference.`,
            topicIds: ['u4-four-stroke', 'u3-otto'],
            alignsWith: 'Nov 2025 Q3(b) contrasted ideal and actual valve timing. The p–V counterpart, actual vs theoretical indicator diagram, is the same idea and appears in Rathore Ch 24.',
            answer: md`**Diagram:** the actual diagram has rounded corners and a smaller positive loop than the Otto diagram drawn to the same r. It also has a small negative **pumping loop** at the bottom: the exhaust line is above atmospheric and the suction line below it.

**Losses**
1. **Time loss (finite combustion time):** combustion takes 30–40° of crank angle, not zero time at TDC. The spark is advanced, so some pressure rise opposes the piston before TDC and the peak is lower and later. This rounds the top-left corner.
2. **Heat loss:** heat flows to the cylinder walls, piston and head during combustion and expansion, lowering pressures, so the expansion line lies below the isentrope.
3. **Exhaust blowdown loss:** the exhaust valve opens about 40–50° before BDC to reduce the pumping work, so pressure falls before BDC and the bottom-right corner is rounded.
4. **Pumping loss:** work to draw the charge in and push the exhaust out. It is the negative loop, larger at part throttle.
5. **Real-gas effects:** specific heats increase and dissociation occurs at high temperature, and the working fluid is a mixture, not air. These lower the peak temperature and pressure (fuel–air cycle).
6. **Incomplete combustion; leakage past the rings.**

The actual indicated efficiency is about 70–80% of the air-standard value, and brake efficiency is lower still because of friction.`,
            scheme: [
              { marks: 1.5, for: 'Actual vs theoretical p–V diagram with pumping loop' },
              { marks: 2.5, for: 'Time, heat, blowdown and pumping losses (plus real-gas effects)' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'x4-4a',
            label: 'a',
            marks: 4,
            prompt: md`Explain the working of a turbojet engine with the help of a schematic and its T-s diagram, indicating the function of each component.`,
            topicIds: ['u6-turbojet'],
            alignsWith: 'Turbojet working was Nov 2024 Q3(a) and Nov 2025 Q4(a). It is the most repeated jet question, and the T-s diagram is the expected addition.',
            answer: md`**Components and processes (with T-s states)**
- **Diffuser (a → 1):** slows the incoming air and converts its kinetic energy into pressure (ram compression). The temperature rises from $T_a$ to $T_{01} = T_a + V^2/2c_p$.
- **Compressor (1 → 2):** an axial or centrifugal compressor raises the pressure further (ratio 5–40).
- **Combustion chamber (2 → 3):** fuel is burnt at roughly constant pressure, raising the temperature to the turbine-inlet limit (1100–1700 K).
- **Turbine (3 → 4):** expands the gas only enough to drive the compressor and auxiliaries ($w_t = w_c$).
- **Nozzle (4 → 5):** the rest of the enthalpy becomes a high-velocity jet. The reaction to the jet's momentum is the thrust.

**T-s diagram:** a → 1 ram rise along an isentrope; 1 → 2 compression; 2 → 3 constant-pressure heating; 3 → 4 turbine drop equal (in temperature) to the compressor rise; 4 → 5 nozzle expansion to $p_a$. Irreversibility moves each actual point to the right of its isentropic counterpart.

**Characteristics:** high jet velocity, so efficient at high speeds (above about 800 km/h); poor at take-off and low speed; high specific fuel consumption. Thrust can be raised with an afterburner.`,
            scheme: [
              { marks: 1, for: 'Schematic diagram' },
              { marks: 1.5, for: 'Function of each component' },
              { marks: 1.5, for: 'T-s diagram with turbine work = compressor work' },
            ],
          },
          {
            id: 'x4-4b',
            label: 'b',
            marks: 4,
            prompt: md`A turbojet flies at 250 m/s where the ambient conditions are 50 kPa and 250 K. The intake is ideal, the compressor pressure ratio is 6 with ηc = 85%, the turbine-inlet temperature is 1100 K and ηt = 90%. The nozzle expands isentropically to ambient pressure. Neglecting the fuel mass and pressure losses, find the stagnation temperatures and pressures through the engine, the jet velocity, the specific thrust and the propulsive efficiency.`,
            topicIds: ['u6-turbojet', 'u6-intro'],
            alignsWith: 'No ME203n paper has set a turbojet cycle numerical, but Rathore\'s Ch 28 problems are mostly this type (ram rise, compressor, turbine = compressor work, nozzle). It is the strongest candidate for a jet numerical.',
            answer: md`**Intake:**
$$T_{01} = 250 + \frac{250^2}{2010} = 281.1\ \text{K}, \qquad p_{01} = 50\left(\frac{281.1}{250}\right)^{3.5} = 75.4\ \text{kPa}$$

**Compressor:** $T_{02s} = 281.1\times6^{0.2857} = 469.0$ K, $T_{02} = 281.1 + \dfrac{187.9}{0.85} = 502.2$ K, $p_{02} = 452$ kPa.
$$w_c = 1.005\times221.1 = 222.2\ \text{kJ/kg}$$

**Turbine** (drives the compressor):
$$T_{04} = 1100 - 221.1 = 878.9\ \text{K}, \qquad T_{04s} = 1100 - \frac{221.1}{0.9} = 854.4\ \text{K}$$
$$p_{04} = 452\left(\frac{854.4}{1100}\right)^{3.5} = 186.7\ \text{kPa}$$

**Nozzle:**
$$T_e = 878.9\left(\frac{50}{186.7}\right)^{0.2857} = 603.2\ \text{K}, \qquad V_j = \sqrt{2\times1005\times275.7} = 744.4\ \text{m/s}$$

**Specific thrust:** $F/\dot m = V_j - V = 494.4$ N per kg/s.

**Propulsive efficiency:**
$$\eta_p = \frac{2\times250}{250 + 744.4} = 50.3\%$$`,
            scheme: [
              { marks: 1, for: 'Intake stagnation temperature and pressure' },
              { marks: 1, for: 'Compressor exit state and work' },
              { marks: 1, for: 'Turbine exit state from turbine work = compressor work' },
              { marks: 1, for: 'Jet velocity, specific thrust and η_p' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'x4-5a',
            label: 'a',
            marks: 4,
            prompt: md`Derive the expression for the work done per cycle by a single-stage reciprocating compressor taking clearance into account, and show that clearance does not affect the work required per kg of air delivered.`,
            topicIds: ['u1-clearance'],
            alignsWith: 'May 2018 Q6(a) asked the single-stage work derivation and Nov 2024 Q5(b) depended on clearance. Including clearance in the work derivation joins them.',
            answer: md`**p–V diagram:** 1–2 compression ($pV^n$), 2–3 delivery at $p_2$, 3–4 re-expansion of the clearance air ($pV^n$), 4–1 suction at $p_1$.

**Work** = area 1-2-3-4 = (area under compression and delivery) − (area of the re-expansion part):
$$W = \frac{n}{n - 1}p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}} - 1\right] - \frac{n}{n - 1}p_1V_4\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}} - 1\right]$$
(The re-expansion follows the same index between the same pressures.)
$$\boxed{W = \frac{n}{n - 1}p_1(V_1 - V_4)\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}} - 1\right]}$$

**Per kg:** $V_1 - V_4$ is the volume actually induced, so $p_1(V_1 - V_4) = mRT_1$, where m is the mass delivered per cycle:
$$\frac{W}{m} = \frac{n}{n - 1}RT_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}} - 1\right]$$
This is the same expression as without clearance.

**Conclusion:** the work spent compressing the clearance air is returned to the piston when it re-expands, so the work per kg is unchanged. Clearance reduces only the volumetric efficiency, and therefore the **capacity**, of a given cylinder, which then has to be made larger.`,
            scheme: [
              { marks: 1, for: 'p–V diagram with re-expansion' },
              { marks: 2, for: 'Derivation of the work with clearance' },
              { marks: 1, for: 'Work per kg independent of clearance and its meaning' },
            ],
          },
          {
            id: 'x4-5b',
            label: 'b',
            marks: 4,
            prompt: md`A single-stage, single-acting compressor is to deliver 4 m³/min of free air, measured at 1.013 bar and 15°C, at 7 bar. At the start of compression the air in the cylinder is at 0.98 bar and 30°C. The clearance is 5% of the swept volume, n = 1.3 for compression and re-expansion, the speed is 400 rpm and the stroke-to-bore ratio is 1.2. Find the volumetric efficiency, the cylinder bore and stroke, and the indicated power.`,
            topicIds: ['u1-clearance'],
            alignsWith: 'Nov 2025 Q5(b) was single-stage sizing. Separating free-air and suction conditions is the refinement Rathore\'s Ch 25 problems add, and it tests the FAD idea directly.',
            answer: md`**Volumetric efficiency** (based on the suction state):
$$\frac{p_2}{p_1} = \frac{7}{0.98} = 7.143, \qquad \eta_v = 1.05 - 0.05\times7.143^{1/1.3} = 1.05 - 0.05\times4.537 = 0.823$$

**Volume induced at suction conditions:**
$$\dot V_1 = 4\times\frac{1.013}{0.98}\times\frac{303}{288} = 4.350\ \text{m}^3/\text{min}$$

**Swept volume:**
$$V_s = \frac{4.350}{0.823\times400} = 13.21\times10^{-3}\ \text{m}^3$$
$$\frac{\pi}{4}D^2(1.2D) = 13.21\times10^{-3} \;\Rightarrow\; D = 0.241\ \text{m}, \quad L = 0.289\ \text{m}$$

**Indicated power:**
$$P = \frac{n}{n - 1}p_1\dot V_1\left[(7.143)^{0.2308} - 1\right] = 4.333\times98\times\frac{4.350}{60}\times0.574 = 17.7\ \text{kW}$$`,
            scheme: [
              { marks: 1, for: 'Volumetric efficiency ≈ 0.823' },
              { marks: 1, for: 'FAD converted to suction conditions' },
              { marks: 1, for: 'Swept volume, bore ≈ 241 mm and stroke ≈ 289 mm' },
              { marks: 1, for: 'Indicated power ≈ 17.7 kW' },
            ],
          },
        ],
      },
      {
        number: 6,
        parts: [
          {
            id: 'x4-6a',
            label: 'a',
            marks: 4,
            prompt: md`Draw the h-s (enthalpy–entropy) diagram for a centrifugal compressor stage showing static and stagnation states at inlet, impeller exit and diffuser exit. Define the total-to-total isentropic efficiency.`,
            topicIds: ['u2-efficiency'],
            alignsWith: 'Every ME203n Q6 has used centrifugal-compressor efficiency, and Rathore draws this h-s chart in §26.5. It is the diagram behind every centrifugal numerical.',
            answer: md`**States:** 0 = inlet stagnation (= 1 static + $V_1^2/2$), 1 = eye static; 2 = impeller exit static, 02 = impeller exit stagnation; 3 = diffuser exit static, 03 = diffuser exit stagnation.

**On the h-s diagram**
- $h_{01} \to h_{02}$: the stagnation enthalpy rises by the work input $w = \psi\sigma U_2^2$, only in the impeller.
- $h_{03} = h_{02}$: no work in the diffuser. However $p_{03} < p_{02}$ (stagnation-pressure loss), so 03 lies to the right on the same enthalpy line.
- The static enthalpy rises in the impeller (from $h_1$ to $h_2$) and again in the diffuser (from $h_2$ to $h_3$), as kinetic energy $V_2^2/2$ is converted.
- The isentropic path from 01 to the pressure $p_{03}$ ends at $h_{03s}$.

**Total-to-total efficiency:**
$$\eta_{c,tt} = \frac{h_{03s} - h_{01}}{h_{03} - h_{01}} = \frac{T_{03s} - T_{01}}{T_{03} - T_{01}} = \frac{T_{01}\left[(p_{03}/p_{01})^{(\gamma-1)/\gamma} - 1\right]}{\psi\sigma U_2^2/c_p}$$

**Total-to-static efficiency** uses $h_{3s}$ (static outlet pressure). It is appropriate when the exit kinetic energy is wasted.

Showing the impeller and diffuser losses as entropy increases makes clear why a good diffuser matters as much as the impeller.`,
            scheme: [
              { marks: 2, for: 'h-s diagram with static and stagnation states' },
              { marks: 1, for: 'Work in impeller only; stagnation-pressure loss in diffuser' },
              { marks: 1, for: 'Total-to-total efficiency definition' },
            ],
          },
          {
            id: 'x4-6b',
            label: 'b',
            marks: 4,
            prompt: md`A centrifugal compressor has an impeller of 600 mm tip diameter with 20 radial vanes and runs at 12000 rpm, handling 15 kg/s of air at an inlet stagnation temperature of 290 K. Using Stodola's relation σ = 1 − 0.63π/z for the slip factor, a power input factor of 1.04 and an isentropic efficiency of 80%, calculate the slip factor, the stagnation pressure ratio and the power required.`,
            topicIds: ['u2-velocity', 'u2-efficiency'],
            alignsWith: 'Every centrifugal numerical so far gives σ directly. Estimating it from the number of vanes (Stodola) is how Rathore introduces slip and a likely twist.',
            answer: md`**Slip factor:**
$$\sigma = 1 - \frac{0.63\pi}{20} = 0.901$$

**Tip speed:**
$$U_2 = \frac{\pi\times0.6\times12000}{60} = 377.0\ \text{m/s}$$

**Work:**
$$w = \psi\sigma U_2^2 = 1.04\times0.901\times377.0^2 = 133.2\ \text{kJ/kg}, \qquad \Delta T_0 = \frac{133.2}{1.005} = 132.5\ \text{K}$$

**Pressure ratio:**
$$\frac{p_{02}}{p_{01}} = \left[1 + \frac{0.8\times132.5}{290}\right]^{3.5} = (1.3655)^{3.5} = 2.98$$

**Power:** $P = 15\times133.2 = 1998$ kW $\approx 2.0$ MW.`,
            scheme: [
              { marks: 1, for: 'Stodola slip factor ≈ 0.90' },
              { marks: 1, for: 'Tip speed and work input' },
              { marks: 1, for: 'Pressure ratio ≈ 2.98' },
              { marks: 1, for: 'Power ≈ 2.0 MW' },
            ],
          },
        ],
      },
      {
        number: 7,
        parts: [
          {
            id: 'x4-7a',
            label: 'a',
            marks: 4,
            prompt: md`State the assumptions of air standard cycles. Why is the actual efficiency of an IC engine much lower than its air standard efficiency?`,
            topicIds: ['u3-air-standard'],
            alignsWith: 'Nov 2025 Q1(a) opened with "assumptions made in analysing air standard cycles". The reverse question, why real engines fall short, is the other half and suits Q7.',
            answer: md`**Assumptions**
1. The working fluid is **air**, an ideal gas with constant specific heats ($c_p = 1.005$, $c_v = 0.718$ kJ/kg K, γ = 1.4).
2. A fixed mass of air undergoes a **closed cycle**; there is no intake or exhaust.
3. Combustion is replaced by **heat addition from an external source**, and exhaust by heat rejection to a sink.
4. All processes are **internally reversible**; compression and expansion are isentropic.
5. Kinetic and potential energies are neglected; no friction or heat loss.

**Why the actual efficiency is lower (often about half)**
- **Variable specific heats:** $c_p$ and $c_v$ rise with temperature and γ falls, so peak temperatures and the expansion work are lower.
- **Dissociation** of CO₂ and H₂O at high temperature absorbs heat, which is only partly recovered on expansion.
- **The fluid is not air:** products of combustion have different properties, and the composition changes.
- **Finite combustion time** (time loss) and **heat loss** to the walls.
- **Exhaust blowdown** and **pumping losses** in the gas-exchange strokes.
- **Incomplete combustion, leakage and friction** (brake vs indicated).

The **fuel–air cycle**, which accounts for real gas properties and dissociation, gives about 75–85% of the air-standard value. The actual indicated efficiency is somewhat lower again.`,
            scheme: [
              { marks: 1.5, for: 'Air-standard assumptions' },
              { marks: 2.5, for: 'Reasons for the lower actual efficiency' },
            ],
          },
          {
            id: 'x4-7b',
            label: 'b',
            marks: 4,
            prompt: md`Explain the requirements and working of a gas turbine combustion chamber with a neat sketch.`,
            topicIds: ['u5-components'],
            alignsWith: 'Gas turbine components are in the Unit 5 syllabus but every ME203n GT question has been about the cycle. The combustion chamber is the component Rathore treats most fully.',
            answer: md`**Requirements**
- Complete combustion with high efficiency (above 98%) over a wide range of air–fuel ratios and flight conditions.
- **Low pressure loss** (2–8% of the inlet pressure).
- Stable flame at high air velocity; no blowout; easy relighting.
- **Uniform exit temperature** profile without hot spots, to protect the turbine blades.
- Small size and weight; long life of the liner; low emissions (NOₓ, smoke).

**Sketch:** outer casing; inner perforated **flame tube (liner)**; swirler and fuel nozzle at the head; primary, secondary and dilution holes along the liner; igniter.

**Working:** the overall air–fuel ratio is about 60–100, far too lean to burn, and the inlet velocity is about 100 m/s, far above flame speed. So the air is divided.
1. **Primary zone (about 20% of the air):** enters through the swirler and primary holes. Fuel burns near-stoichiometrically. The swirl creates a recirculation zone that anchors the flame at low velocity.
2. **Secondary (intermediate) zone (about 30%):** completes combustion and reduces dissociation.
3. **Dilution zone (about 50%):** the remaining air mixes in and cools the gas to the turbine-inlet temperature.

The liner is cooled by films of air.

**Types:** tubular (can), can-annular (tubo-annular) and annular. Annular is the most compact and is used in aircraft engines.`,
            scheme: [
              { marks: 1, for: 'Requirements' },
              { marks: 1, for: 'Labelled sketch' },
              { marks: 1.5, for: 'Working with primary, secondary and dilution zones' },
              { marks: 0.5, for: 'Types of combustion chamber' },
            ],
          },
        ],
      },
    ],
  },
  /* ================================================================== P5 */
  {
    id: 'predicted-5',
    kind: 'predicted',
    title: 'Predicted Paper 5',
    session: 'Predicted · revision of repeats',
    blurb: 'Near-repeats of the questions DTU has already set, with fresh numbers: dual derivation, Otto vs Diesel at equal peaks, open vs closed GT, reheat-regenerative plant, SI vs CI knock, valve timing, jet engine comparison, compressor sizing, surging, centrifugal index.',
    current: true,
    header: ME203N_HEADER,
    attempt: 5,
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'x5-1a',
            label: 'a',
            marks: 4,
            prompt: md`With the help of p-v and T-s diagrams, derive the expression for the thermal efficiency of the air standard Dual cycle. Show that it reduces to the Otto and Diesel expressions as special cases.`,
            topicIds: ['u3-dual'],
            alignsWith: 'Repeat of Nov 2024 Q1(a) (Dual derivation), with the limiting cases added. Q1(a) repeats across years are common.',
            answer: md`**Processes:** 1–2 isentropic compression (r); 2–3 constant-volume heat addition ($\alpha = p_3/p_2$); 3–4 constant-pressure heat addition ($\rho = v_4/v_3$); 4–5 isentropic expansion; 5–1 constant-volume rejection.

**Temperatures:** $T_2 = T_1r^{\gamma-1}$, $T_3 = \alpha T_1r^{\gamma-1}$, $T_4 = \alpha\rho T_1r^{\gamma-1}$, and
$$T_5 = T_4\left(\frac{\rho}{r}\right)^{\gamma-1} = \alpha\rho^\gamma T_1$$

**Efficiency:**
$$\eta = 1 - \frac{c_v(T_5 - T_1)}{c_v(T_3 - T_2) + c_p(T_4 - T_3)}$$
$$\boxed{\eta_{Dual} = 1 - \frac{1}{r^{\gamma-1}}\left[\frac{\alpha\rho^\gamma - 1}{(\alpha - 1) + \gamma\alpha(\rho - 1)}\right]}$$

**Special cases**
- ρ = 1 (no constant-pressure heating): the bracket becomes $(\alpha - 1)/(\alpha - 1) = 1$, giving $\eta = 1 - r^{1-\gamma}$, the **Otto** cycle.
- α = 1 (no constant-volume heating): the bracket becomes $(\rho^\gamma - 1)/\gamma(\rho - 1)$, the **Diesel** cycle.

For the same r and heat input, $\eta_{Otto} > \eta_{Dual} > \eta_{Diesel}$.`,
            scheme: [
              { marks: 1, for: 'p-v and T-s diagrams' },
              { marks: 2, for: 'Temperatures and efficiency expression' },
              { marks: 1, for: 'Reduction to Otto and Diesel' },
            ],
          },
          {
            id: 'x5-1b',
            label: 'b',
            marks: 4,
            prompt: md`An Otto cycle and a Diesel cycle both take in air at 1 bar and 300 K and both have a maximum pressure of 60 bar and a maximum temperature of 2000 K. For each cycle find the compression ratio, the heat supplied per kg, the heat rejected per kg and the thermal efficiency. Comment on the result.`,
            topicIds: ['u3-comparison', 'u3-otto', 'u3-diesel'],
            alignsWith: 'Nov 2025 Q4(b) compared Otto and Diesel in theory. Putting numbers on the "same maximum pressure and temperature" case is the obvious numerical version.',
            answer: md`**Otto.** The constant-volume heating ends at 60 bar and 2000 K. Along it $p/T$ is constant, so $p_2/T_2 = 60/2000$. Isentropic compression gives $p_2/T_2 = (p_1/T_1)r$, so
$$r = \frac{60}{2000}\times300 = 9$$
$$T_2 = 300\times9^{0.4} = 722.5\ \text{K}, \qquad q_s = 0.718(2000 - 722.5) = 917.3\ \text{kJ/kg}$$
$$T_4 = 2000/9^{0.4} = 830.5\ \text{K}, \qquad q_r = 0.718\times530.5 = 380.9\ \text{kJ/kg}, \qquad \eta = 58.5\%$$

**Diesel.** Compression must reach the maximum pressure:
$$r = 60^{1/1.4} = 18.63, \qquad T_2 = 300\times18.63^{0.4} = 966.4\ \text{K}$$
$$\rho = 2000/966.4 = 2.07, \qquad q_s = 1.005(2000 - 966.4) = 1038.8\ \text{kJ/kg}$$
$$T_4 = 2000(\rho/r)^{0.4} = 830.5\ \text{K}, \qquad q_r = 380.9\ \text{kJ/kg}, \qquad \eta = 63.3\%$$

**Comment:** with the same states 1 and 3, both cycles end expansion at the same state 4 and reject the same heat. The Diesel cycle takes in more heat, through its higher compression ratio, so it is more efficient. Under real structural and material limits the Diesel cycle is therefore the better cycle.`,
            scheme: [
              { marks: 1.5, for: 'Otto: r = 9, heats and η ≈ 58.5%' },
              { marks: 1.5, for: 'Diesel: r ≈ 18.6, ρ, heats and η ≈ 63.3%' },
              { marks: 1, for: 'Same heat rejected and the comment' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'x5-2a',
            label: 'a',
            marks: 4,
            prompt: md`Differentiate between open and closed cycle gas turbines with schematic diagrams. State the merits and demerits of each.`,
            topicIds: ['u5-intro'],
            alignsWith: 'Repeat of Nov 2024 Q7(b) (open vs closed cycle differences and schematics).',
            answer: md`**Open cycle:** air from the atmosphere → compressor → combustion chamber (fuel burnt directly in the air) → turbine → exhaust to the atmosphere. The working fluid is replaced every cycle.

**Closed cycle:** the same working fluid (air, helium, CO₂) circulates: compressor → **heat exchanger** (heated externally by a furnace or reactor) → turbine → **pre-cooler** (heat rejected to cooling water) → back to the compressor.

| Open cycle | Closed cycle |
|---|---|
| Combustion products pass through the turbine, causing blade erosion and deposits | Clean fluid, so no fouling or erosion |
| Needs clean, high-grade fuel (gas, kerosene) | Any fuel, including coal, nuclear or solar heat |
| Light and compact; no cooling water; quick start | Heavy and bulky heat exchangers; needs a lot of cooling water |
| Part load controlled by fuel, so efficiency falls | Part load by changing the pressure level, with nearly constant efficiency |
| Low pressure throughout, so a large size for a given output | High base pressure, so a smaller turbine for a given output |
| Any gas leak is harmless | Fluid leakage must be made up; seals needed |
| Used for aircraft, peak-load stations, vehicles | Used for nuclear, solar and coal-fired plants, research |`,
            scheme: [
              { marks: 1.5, for: 'Schematics of open and closed cycles' },
              { marks: 2.5, for: 'Differences with merits and demerits' },
            ],
          },
          {
            id: 'x5-2b',
            label: 'b',
            marks: 4,
            prompt: md`A gas turbine plant has a pressure ratio of 8. Air enters the compressor (ηc = 85%) at 1 bar and 300 K. Expansion takes place in two turbines (ηt = 88% each) with equal pressure ratios, the gas being reheated to 1150 K before each turbine. A regenerator of effectiveness 0.8 uses the exhaust from the LP turbine. Find the net work per kg, the thermal efficiency and the air rate in kg/kWh. If the calorific value of the fuel is 42000 kJ/kg, find the specific fuel consumption.`,
            topicIds: ['u5-reheat-intercool', 'u5-regeneration'],
            alignsWith: 'Nov 2024 Q2(b) and May 2018 Q3(b) were both reheat + regenerator numericals. This repeats them with component efficiencies and an imperfect regenerator.',
            answer: md`**Compressor:** $T_{2s} = 300\times8^{0.2857} = 543.4$ K, $T_2 = 300 + \dfrac{243.4}{0.85} = 586.4$ K, $w_c = 287.8$ kJ/kg.

**Turbines** (ratio $\sqrt8$, $x = 1.3459$): $T_s = 1150/1.3459 = 854.5$ K, actual exit $= 1150 - 0.88\times295.5 = 889.9$ K.
$$w_t = 2\times1.005\times260.1 = 522.8\ \text{kJ/kg}$$

**Net work:** $w_{net} = 522.8 - 287.8 = 234.9$ kJ/kg.

**Regenerator:**
$$T_x = 586.4 + 0.8(889.9 - 586.4) = 829.2\ \text{K}$$

**Heat supplied:**
$$q = 1.005(1150 - 829.2) + 1.005(1150 - 889.9) = 583.8\ \text{kJ/kg}$$
$$\eta = \frac{234.9}{583.8} = 40.2\%$$

**Air rate:** $3600/234.9 = 15.3$ kg/kWh.

**Specific fuel consumption:**
$$\text{sfc} = 15.3\times\frac{583.8}{42000} = 0.213\ \text{kg/kWh}$$`,
            scheme: [
              { marks: 1, for: 'Compressor and turbine works' },
              { marks: 1, for: 'Regenerator exit temperature' },
              { marks: 1, for: 'Heat supplied (combustor + reheater) and η ≈ 40%' },
              { marks: 1, for: 'Air rate ≈ 15.3 kg/kWh and sfc ≈ 0.21 kg/kWh' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'x5-3a',
            label: 'a',
            marks: 4,
            prompt: md`Compare the phenomenon of knock in SI and CI engines. Why do factors that reduce knock in SI engines tend to increase it in CI engines?`,
            topicIds: ['u4-si-combustion', 'u4-ci-combustion'],
            alignsWith: 'Nov 2024 Q4(b) asked CI knock and Nov 2025 Q3(a) SI knock (p–θ). The SI-vs-CI comparison table is the classic way both are combined.',
            answer: md`| SI knock | CI knock |
|---|---|
| Occurs at the **end** of combustion, when the end gas auto-ignites | Occurs at the **start** of combustion, when fuel accumulated during a long delay ignites at once |
| Caused by auto-ignition of the end gas before the flame arrives | Caused by a long ignition delay |
| Very sudden, with pressure waves; heard as a high-pitched ping | Rough, with a steep but uniform rise in pressure |
| A fuel of **high octane number** (high self-ignition temperature, long delay) resists it | A fuel of **high cetane number** (low self-ignition temperature, short delay) resists it |
| Avoided by *preventing* auto-ignition | Avoided by *promoting* early auto-ignition |

**Why the remedies are opposite:** in an SI engine we want the end gas **not** to self-ignite before the flame arrives, so a long delay helps. In a CI engine we want the fuel **to** self-ignite as soon as it is injected, so a short delay helps. Every factor that shortens the ignition delay therefore helps the CI engine and harms the SI engine:

| Factor | To reduce SI knock | To reduce CI knock |
|---|---|---|
| Compression ratio | Low | High |
| Intake temperature | Low | High |
| Intake pressure | Low | High |
| Wall / coolant temperature | Low | High |
| Self-ignition temperature of fuel | High | Low |
| Ignition delay of fuel | Long | Short |
| Speed | High (more turbulence) | Low (delay in crank degrees falls) |`,
            scheme: [
              { marks: 2, for: 'Comparison of SI and CI knock (when, cause, character, fuel rating)' },
              { marks: 2, for: 'Explanation and table of opposite factors' },
            ],
          },
          {
            id: 'x5-3b',
            label: 'b',
            marks: 4,
            prompt: md`Draw the theoretical and actual valve timing diagrams of a four-stroke petrol engine. Explain why the valves are opened early and closed late.`,
            topicIds: ['u4-timing'],
            alignsWith: 'Repeat of Nov 2025 Q3(b) and Nov 2024 Q7(a). Valve timing appeared in both ME203n papers, so it is the single most likely repeat.',
            answer: md`**Theoretical:** IVO at TDC, IVC at BDC; EVO at BDC, EVC at TDC; spark at TDC. Each stroke is exactly 180°.

**Actual (typical):** IVO 10–20° bTDC; IVC 30–40° aBDC; spark 20–35° bTDC; EVO 40–50° bBDC; EVC 10–15° aTDC. Valve overlap about 20–35° around TDC.

**Reasons**
- **Inlet opens early:** so the valve is fully open when the suction stroke begins. A valve cannot open instantly, and the outgoing exhaust helps draw the charge in.
- **Inlet closes late:** the incoming charge has momentum (inertia ramming), so it keeps flowing in even as the piston starts rising. This raises volumetric efficiency.
- **Spark advanced:** combustion takes time (about 30–40°), so it is started early to give peak pressure about 10–15° after TDC.
- **Exhaust opens early (blowdown):** most gas leaves under its own pressure before BDC. This reduces the pumping work of the exhaust stroke at a small cost in expansion work.
- **Exhaust closes late:** the inertia of the outgoing gas continues to scavenge the cylinder. The **overlap** uses the exhaust momentum to help induction.

All timings are a compromise for the engine's typical speed. Variable valve timing changes them with speed.`,
            scheme: [
              { marks: 1, for: 'Theoretical diagram' },
              { marks: 1.5, for: 'Actual diagram with typical angles and overlap' },
              { marks: 1.5, for: 'Reasons for early opening and late closing' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'x5-4a',
            label: 'a',
            marks: 4,
            prompt: md`Compare turbojet, ramjet and rocket engines.`,
            topicIds: ['u6-turbojet', 'u6-ramjet-pulsejet', 'u6-rockets'],
            alignsWith: 'Nov 2025 Q4(a) and May 2018 Q2(b) both compared turbojet and ramjet, and May 2023 asked the turbojet and ramjet pairs as short notes. Adding the rocket makes the most complete version of this repeat.',
            answer: md`| | Turbojet | Ramjet | Rocket |
|---|---|---|---|
| Oxidiser | Atmospheric air | Atmospheric air | Carried on board |
| Compression | Compressor (and ram) | Ram only | None (pumps or pressurised feed) |
| Moving parts | Compressor, turbine | None | Pumps only (liquid) or none (solid) |
| Static thrust | Yes; can take off | **None**; needs a booster | Yes; full thrust at rest |
| Speed range | Subsonic to about Mach 2.5 | Mach 1.5–5 | Any speed; works in vacuum |
| Altitude | Limited by air density | Limited by air density | Unlimited |
| Thrust vs speed | Roughly constant, falling at high speed | Rises with speed | Independent of speed |
| Fuel consumption | Moderate | High at low speed, good at high Mach | Very high (carries oxidiser) |
| Specific impulse | Highest (about 3000–6000 s, fuel only) | About 1000–2000 s | Lowest (200–450 s) |
| Construction | Complex, costly | Very simple, cheap | Simple (solid) to complex (liquid) |
| Uses | Aircraft | Missiles, target drones | Space launch, missiles |`,
            scheme: [{ marks: 4, for: 'At least eight valid points across the three engines (half a mark each)' }],
          },
          {
            id: 'x5-4b',
            label: 'b',
            marks: 4,
            prompt: md`Sketch and explain the variation of thrust and propulsive efficiency with flight speed for turboprop, turbojet and rocket engines.`,
            topicIds: ['u6-intro', 'u6-turboprop'],
            alignsWith: 'Both ME203n papers asked jet engines one at a time. The flight-speed comparison is the standard Rathore figure that ties all of them together, and is a likely 4-marker.',
            answer: md`**Propulsive efficiency** $\eta_p = 2V/(V + V_j)$ for air-breathing engines, and $2(V/c)/[1 + (V/c)^2]$ for rockets.

**Sketch (η_p against flight speed, 0 to about 3000 km/h)**
- **Turboprop:** the propeller handles a huge mass at small velocity increase, so η_p is about 80–85% at 400–600 km/h. It falls sharply above about 700 km/h, as the propeller tips reach sonic speed.
- **Turbofan** (for reference): peaks in between, at 800–1000 km/h.
- **Turbojet:** a small mass at high $V_j$, so η_p is low at low speed and rises steadily, reaching about 50–60% at 1500–2000 km/h.
- **Rocket:** η_p is very low at low speed and rises to 100% when V equals the exhaust velocity (about 2000–4000 m/s), far above aircraft speeds.

**Thrust against speed**
- **Turboprop:** high take-off thrust, falling steeply with speed.
- **Turbojet:** roughly constant at first ($\dot m$ rises with ram while $V_j - V$ falls), and it improves at supersonic speed with ram compression.
- **Rocket:** constant, independent of speed (slightly higher at altitude because of the pressure thrust).
- **Ramjet:** zero at rest, rising with speed.

**Conclusion:** turboprops for low-speed transport, turbofans and turbojets for high subsonic and supersonic aircraft, rockets for very high speed and space.`,
            scheme: [
              { marks: 2, for: 'η_p vs speed curves with reasons' },
              { marks: 1.5, for: 'Thrust vs speed for each engine' },
              { marks: 0.5, for: 'Conclusion on the speed range of each' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'x5-5a',
            label: 'a',
            marks: 4,
            prompt: md`Explain the working of a single-stage reciprocating air compressor with a p–V diagram, and derive the expression for the work done when compression follows pVⁿ = C, neglecting clearance.`,
            topicIds: ['u1-basics', 'u1-processes'],
            alignsWith: 'Repeat of Nov 2025 Q5(a) (working of a single-stage compressor) joined with May 2018 Q6(a) (work derivation). Both have already been set.',
            answer: md`**Working:** on the outward stroke the suction valve opens (cylinder pressure slightly below $p_1$), and air is drawn in at $p_1$ (4 → 1). On the return stroke both valves are closed, and the air is compressed along $pV^n = C$ (1 → 2). When the cylinder pressure slightly exceeds $p_2$ the delivery valve opens, and the air is pushed out at constant pressure (2 → 3). At the end of the stroke the delivery valve closes. With no clearance, the pressure drops at once to $p_1$ (3 → 4).

**Work:** the net work is the area of the p–V diagram, which is the area under compression plus delivery minus suction:
$$W = p_2V_2 + \frac{p_2V_2 - p_1V_1}{n - 1} - p_1V_1 = \frac{n}{n - 1}(p_2V_2 - p_1V_1)$$

Using $V_2 = V_1(p_1/p_2)^{1/n}$:
$$\boxed{W = \frac{n}{n - 1}p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}} - 1\right] = \frac{n}{n - 1}mR(T_2 - T_1)}$$

**Special cases:** isentropic, replace n by γ; isothermal, $W = p_1V_1\ln(p_2/p_1)$, the minimum.`,
            scheme: [
              { marks: 1.5, for: 'Working with p–V diagram and valve action' },
              { marks: 2, for: 'Derivation of the polytropic work' },
              { marks: 0.5, for: 'Isothermal and isentropic cases' },
            ],
          },
          {
            id: 'x5-5b',
            label: 'b',
            marks: 4,
            prompt: md`A single-acting reciprocating compressor has a bore of 250 mm and a stroke of 300 mm, a clearance of 4% of the swept volume and runs at 400 rpm. It takes in air at 1 bar and 300 K and delivers it at 8 bar. The index of compression and expansion is 1.3. Find (i) the volumetric efficiency, (ii) the volume of air drawn in per minute, (iii) the mass flow rate, (iv) the indicated power and (v) the delivery temperature.`,
            topicIds: ['u1-clearance'],
            alignsWith: 'Repeat of the Nov 2025 Q5(b) and Nov 2024 Q5(b) single-stage numericals, with clearance and new data.',
            answer: md`**(i) Volumetric efficiency**
$$\eta_v = 1 + 0.04 - 0.04\times8^{1/1.3} = 1.04 - 0.04\times4.951 = 0.842$$

**(ii) Volume drawn in**
$$V_s = \frac{\pi}{4}(0.25)^2(0.3) = 14.73\times10^{-3}\ \text{m}^3$$
$$\dot V = 0.842\times14.73\times10^{-3}\times400 = 4.96\ \text{m}^3/\text{min}$$

**(iii) Mass**
$$\dot m = \frac{100\times4.96}{0.287\times300} = 5.76\ \text{kg/min}$$

**(iv) Indicated power**
$$P = 4.333\times100\times\frac{4.96}{60}\times(8^{0.2308} - 1) = 4.333\times8.266\times0.616 = 22.1\ \text{kW}$$

**(v) Delivery temperature**
$$T_2 = 300\times8^{0.2308} = 484.8\ \text{K} \approx 212\,^\circ\text{C}$$`,
            scheme: [
              { marks: 1, for: 'Volumetric efficiency ≈ 0.842' },
              { marks: 1, for: 'Swept volume and induced volume ≈ 4.96 m³/min' },
              { marks: 0.5, for: 'Mass ≈ 5.76 kg/min' },
              { marks: 1, for: 'Indicated power ≈ 22.1 kW' },
              { marks: 0.5, for: 'Delivery temperature ≈ 485 K' },
            ],
          },
        ],
      },
      {
        number: 6,
        parts: [
          {
            id: 'x5-6a',
            label: 'a',
            marks: 4,
            prompt: md`Describe the phenomena of surging and choking in centrifugal compressors with the help of the performance characteristic.`,
            topicIds: ['u2-surging'],
            alignsWith: 'Repeat of Nov 2024 Q6(b) and May 2018 Q7(a). It has been set twice already, under both course codes.',
            answer: md`**Characteristic:** pressure ratio against mass flow (or a non-dimensional flow) at constant speed. Each speed line rises from low flow to a peak, then falls. The peaks of all speed lines join to form the **surge line**.

**Surging (left of the peak):** if the flow is reduced below the value at the peak, the pressure the compressor can produce falls. The higher-pressure air downstream then flows **back** through the compressor. The delivery pressure drops, the compressor recovers and delivers again, pressure builds up, and flow again breaks down. The result is violent, periodic **flow reversal and pressure oscillations**, with noise, vibration, overheating and possible damage. It starts with **stalling** of the impeller or diffuser vanes (flow separation because of high incidence at low flow). Rotating stall can precede it.
- *Prevention:* operate to the right of the surge line with a margin; blow-off or bleed valves; variable inlet guide vanes; recirculation.

**Choking (far right):** as flow increases at a given speed, the velocity rises until the flow becomes **sonic** at the narrowest section (the impeller eye or diffuser throat). The mass flow can then rise no further, and the speed line becomes vertical. Pressure ratio and efficiency fall rapidly, with large incidence and shock losses.

**Stable operating range:** between the surge line and the choke limit. It is wider at low speed and narrower at high speed and with vaned diffusers.`,
            scheme: [
              { marks: 1, for: 'Characteristic curve with surge line and choke limit' },
              { marks: 2, for: 'Surging: cause, mechanism, effects and prevention' },
              { marks: 1, for: 'Choking' },
            ],
          },
          {
            id: 'x5-6b',
            label: 'b',
            marks: 4,
            prompt: md`A centrifugal compressor takes in 60 kg/min of air at 1 bar and 20°C and delivers it at 2.5 bar and 130°C. Neglecting changes in kinetic energy, find (i) the index of compression, (ii) the isentropic efficiency, (iii) the power required and (iv) the isothermal efficiency.`,
            topicIds: ['u2-efficiency', 'u1-processes'],
            alignsWith: 'Near-repeat of Nov 2025 Q6(b) (50 kg/min from 1 bar, 15°C to 2 bar, 97°C). The index of compression and the isothermal efficiency are the parts that question did not ask.',
            answer: md`$T_1 = 293$ K, $T_2 = 403$ K, $\dot m = 1$ kg/s.

**(i) Index:**
$$\frac{n - 1}{n} = \frac{\ln(403/293)}{\ln2.5} = \frac{0.3188}{0.9163} = 0.348 \;\Rightarrow\; n = 1.53$$
The index exceeds γ because friction heats the air.

**(ii) Isentropic efficiency:**
$$T_{2s} = 293\times2.5^{0.2857} = 380.7\ \text{K}, \qquad \eta_c = \frac{380.7 - 293}{403 - 293} = \frac{87.7}{110} = 79.7\%$$

**(iii) Power:** $P = \dot mc_p(T_2 - T_1) = 1\times1.005\times110 = 110.5$ kW.

**(iv) Isothermal efficiency:**
$$P_{iso} = \dot mRT_1\ln2.5 = 0.287\times293\times0.9163 = 77.1\ \text{kW}, \qquad \eta_{iso} = \frac{77.1}{110.5} = 69.7\%$$`,
            scheme: [
              { marks: 1, for: 'Index of compression ≈ 1.53' },
              { marks: 1, for: 'Isentropic efficiency ≈ 80%' },
              { marks: 1, for: 'Power ≈ 110.5 kW' },
              { marks: 1, for: 'Isothermal efficiency ≈ 70%' },
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
            id: 'x5-7i',
            label: 'i',
            marks: 4,
            prompt: md`Jet fuels`,
            topicIds: ['u6-intro'],
            alignsWith: 'Repeat of Nov 2025 Q7(iv).',
            answer: md`**Requirements of a jet fuel**
- High calorific value per unit mass *and* per unit volume (limited tank space).
- Low freezing point (about −40 to −47 °C), because air at cruise altitude is very cold.
- Low volatility, for low evaporation loss and fire risk at altitude, yet good ignition and relight.
- Good thermal stability: the fuel cools oil and engine parts, so it must not form gum or deposits.
- Low sulphur and aromatics (corrosion, smoke); clean burning; low viscosity at low temperature; free of water.

**Types**
- **Jet A / Jet A-1 (ATF in India):** kerosene-type, flash point above 38 °C. Jet A-1 freezes at −47 °C. The standard civil fuel.
- **Jet B / JP-4:** wide-cut (naphtha + kerosene), more volatile, for very cold climates. Being phased out.
- **JP-5:** high flash point, for naval carriers. **JP-8:** military version of Jet A-1.
- **Special fuels:** JP-7 for high-speed aircraft (high thermal stability).
- **Sustainable aviation fuel (SAF):** from bio-feedstocks, blended with kerosene.

Additives include antioxidants, anti-icing agents, anti-static agents, corrosion inhibitors and biocides.`,
            scheme: [
              { marks: 2, for: 'Requirements of a jet fuel' },
              { marks: 2, for: 'Types and additives' },
            ],
          },
          {
            id: 'x5-7ii',
            label: 'ii',
            marks: 4,
            prompt: md`Rocket propulsion`,
            topicIds: ['u6-rockets'],
            alignsWith: 'Repeat of May 2018 Q7(b). Rockets also appeared as propellants in Nov 2024 Q3(b).',
            answer: md`**Principle:** a rocket carries both fuel and oxidiser. The propellants burn in a chamber at high pressure, and the products expand through a convergent–divergent nozzle to very high velocity. The reaction (Newton's third law) gives thrust. It needs no atmospheric air, so it works in space.

**Thrust:** $F = \dot mV_e + (p_e - p_a)A_e$. It does not depend on flight speed.

**Performance measures**
- **Effective exhaust velocity** $c = F/\dot m$.
- **Specific impulse** $I_{sp} = F/(\dot mg) = c/g$ (s): solids 200–300 s, LOX/kerosene about 300–350 s, LOX/LH₂ about 450 s.
- **Propulsive efficiency** $\eta_p = 2(V/c)/[1 + (V/c)^2]$, equal to 1 at V = c.
- **Mass ratio** and the rocket equation $\Delta V = c\ln(m_0/m_b)$, which is why staging is used.

**Classification:** chemical (solid, liquid, hybrid); nuclear, electric (ion, Hall) and solar for space.

**Applications:** satellite and space launch, missiles, sounding rockets, JATO, spacecraft attitude control.`,
            scheme: [
              { marks: 1, for: 'Principle' },
              { marks: 2, for: 'Thrust, specific impulse, propulsive efficiency and rocket equation' },
              { marks: 1, for: 'Classification and applications' },
            ],
          },
          {
            id: 'x5-7iii',
            label: 'iii',
            marks: 4,
            prompt: md`Velocity triangles for the impeller of a centrifugal compressor`,
            topicIds: ['u2-velocity'],
            alignsWith: 'Repeat of Nov 2025 Q7(iii).',
            answer: md`**Notation:** U is the blade speed, V the absolute velocity, $V_r$ the velocity relative to the blade, $V_w$ the whirl (tangential) component of V, $V_f$ the flow (radial or axial) component. β is the blade angle and α the absolute flow angle.

**Inlet (eye):** usually no prewhirl, so $V_1 = V_{f1}$ (axial), $V_{w1} = 0$.
$$V_{r1} = \sqrt{V_1^2 + U_1^2}, \qquad \tan\beta_1 = \frac{V_1}{U_1}$$
The vanes are curved at the eye (the inducer) to match $\beta_1$, which varies with radius.

**Outlet (tip), radial vanes:** the ideal $V_{w2} = U_2$. With slip, $V_{w2} = \sigma U_2$. The flow component $V_{f2}$ is radial, and the absolute velocity $V_2 = \sqrt{V_{w2}^2 + V_{f2}^2}$ leaves at a small angle to the tangent, into the diffuser.

**Backward or forward vanes:** $V_{w2} = U_2 - V_{f2}/\tan\beta_2$.

**Use:** the Euler work per kg is
$$w = U_2V_{w2} - U_1V_{w1} = U_2V_{w2} \;(\text{no prewhirl}) = \sigma U_2^2 \;(\text{radial vanes})$$
The actual input is $\psi\sigma U_2^2$, with ψ the power input factor. The triangles also give the inlet relative Mach number and the degree of reaction.`,
            scheme: [
              { marks: 1.5, for: 'Inlet triangle' },
              { marks: 1.5, for: 'Outlet triangle with slip' },
              { marks: 1, for: 'Euler work from the triangles' },
            ],
          },
          {
            id: 'x5-7iv',
            label: 'iv',
            marks: 4,
            prompt: md`Brayton (Joule) cycle`,
            topicIds: ['u3-brayton'],
            alignsWith: 'The Brayton cycle sits in Unit 3 and underlies every gas-turbine question (Nov 2024 Q2(a), Nov 2025 Q2(a)). Its efficiency derivation is a standard short note.',
            answer: md`**Processes:** 1–2 isentropic compression; 2–3 constant-pressure heat addition; 3–4 isentropic expansion; 4–1 constant-pressure heat rejection. Show these on p-v and T-s diagrams. It is the ideal cycle of the gas turbine.

**Efficiency:** with $r_p = p_2/p_1$ and $T_2/T_1 = T_3/T_4 = r_p^{(\gamma-1)/\gamma}$,
$$\eta = 1 - \frac{c_p(T_4 - T_1)}{c_p(T_3 - T_2)} = 1 - \frac{1}{r_p^{(\gamma-1)/\gamma}}$$
It depends only on the pressure ratio.

**Work:**
$$w = c_pT_3\left(1 - \frac1x\right) - c_pT_1(x - 1), \qquad x = r_p^{(\gamma-1)/\gamma}$$
This is zero at $x = 1$ and at $x = T_3/T_1$ (where η equals Carnot), and maximum at $x = \sqrt{T_3/T_1}$, giving $w_{max} = c_p(\sqrt{T_3} - \sqrt{T_1})^2$.

**Features:** a large compressor back-work, so a low work ratio. The cycle is very sensitive to compressor and turbine efficiencies. Improved by regeneration, reheating and intercooling.`,
            scheme: [
              { marks: 1, for: 'Processes with p-v and T-s diagrams' },
              { marks: 1.5, for: 'Efficiency derivation' },
              { marks: 1.5, for: 'Work output, optimum ratio and comments' },
            ],
          },
        ],
      },
    ],
  },
]
