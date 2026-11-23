import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 5 — Gas Turbines (Rathore Ch. 27 + Ch. 11 §11.12)   ★ mostly highlighted
 * ========================================================================== */

export const topics: Topic[] = [
  {
    id: 'u5-intro',
    unitId: 'u5',
    title: 'Gas turbines: open and closed cycles, merits and applications',
    summary: 'Open vs closed plants, classification, the book’s comparisons with IC engines and steam plants, and where gas turbines are used.',
    syllabusPhrases: ['Simple open and close cycle gas turbine', 'Advantages and disadvantages of gas turbine', 'performance and application of gas turbine'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 27, section: '§27.1–27.3', pages: '924–927' }],
    diagrams: ['gt-open', 'gt-closed'],
    sections: [
      {
        id: 'plants',
        title: 'Open-cycle and closed-cycle plants (§27.2)',
        body: md`A simple gas turbine has three components: a **compressor**, a **combustion chamber** (or heater) and a **turbine** that drives the compressor and the load.

**Open cycle.** Fresh atmospheric air is compressed, fuel is burnt in it at nearly constant pressure, the hot gas expands through the turbine and is **exhausted to atmosphere**. Fresh charge is taken every cycle.

![Open-cycle gas turbine](diagram:gt-open)

**Closed cycle.** The same working fluid circulates continuously. Combustion is replaced by heat addition in a **heat exchanger** (from any external source), and exhaust is replaced by heat rejection in a **cooler (precooler)**.

![Closed-cycle gas turbine](diagram:gt-closed)

The book also classifies gas turbines by combustion process: **constant-pressure** turbines (Brayton cycle; slow-burning fuel) and **constant-volume or explosion** turbines (Atkinson cycle; fuel burnt at constant volume behind closed valves, then expanded through a nozzle and turbine).`,
      },
      {
        id: 'open-closed',
        title: 'Closed vs open cycle (book table, §27.3)',
        body: md`| Criterion | Closed cycle | Open cycle |
|---|---|---|
| Working fluid | Recirculated; can be helium or He–CO₂ with better properties | Air + fuel products; used once |
| Heat input | Indirect, through a heat exchanger | Direct, in the combustion chamber |
| Heat source / fuel | Any — solid, liquid, gaseous, waste, nuclear or solar heat | High-quality liquid or gaseous fuel |
| Efficiency for given limits | Higher | Lower |
| Part-load efficiency | Better (vary the pressure level, not temperature) | Comparatively less |
| Size per MW | Smaller (pressurised fluid is denser) | Larger |
| Blade life | Longer — no fouling by combustion products | Shorter — thermal stress and fouling |
| Control of output | Better | Poorer |
| Plant | Complex and costly | Simple and cheaper |`,
      },
      {
        id: 'vs-ic',
        title: 'Gas turbine vs IC engine (§27.1, §27.1.1)',
        body: md`**Merits of the gas turbine:**
- rotary machine — **mechanical efficiency approaches 95 %**;
- continuous, uniform torque — **no flywheel** needed;
- lower weight per kW, and more power per kg of air;
- higher speed;
- can burn cheaper fuels (paraffin-type, oil residues, even powdered coal); no knock problem;
- complete combustion — exhaust less polluting;
- simpler ignition and lubrication systems;
- parts are not subjected to very high pressures, so they can be made lighter — ideal for **aircraft**.

**Demerits:**
- **lower thermal efficiency: 15–20 %** for a simple plant vs 25–30 % for IC engines (book figures);
- harder to start;
- turbine blades need a special cooling system, and are difficult and costly to manufacture;
- for the same output it produces about **five times as much exhaust gas** as an IC engine.`,
      },
      {
        id: 'vs-steam',
        title: 'Gas turbine vs steam power plant (§27.1.2)',
        body: md`- A steam plant is an **external** combustion plant; the gas turbine's combustor is part of the engine.
- A steam plant needs boiler, condenser, cooling tower, feed-water treatment and plentiful water — it is **bulky**. A gas turbine has few parts, is compact and light, and needs no cooling water except for blade cooling.
- Gas turbines run **faster**, use lower pressure ratios, **start and stop quickly**, and need fewer skilled operators.
- Mature steam plants still achieve **higher efficiency** than simple gas turbines and use cheaper fuel.`,
      },
      {
        id: 'applications',
        title: 'Applications and performance',
        body: md`**Applications listed by Rathore (§27.1):** aircraft propulsion (Unit 6); electric power generation, especially for **peak loads** and standby because of quick starting; ships and marine propulsion; cogeneration (exhaust heat for process steam); racing cars; railway locomotives; hovercraft; driving high-speed pumps and rotary compressors; cross-country gas pipelines and charging stations.

> [!NOTE] Performance today
> The book's 15–20 % refers to simple-cycle plants of its era. Modern heavy-duty simple-cycle units reach about 35–40 %, aero-derivatives over 40 %, and **combined-cycle** plants (gas turbine exhaust raising steam for a steam turbine) about 60 %. The improvements in the next topics — regeneration, reheating, intercooling and higher turbine inlet temperature — are what close the gap.`,
      },
    ],
    keyPoints: [
      'Simple gas turbine: compressor + combustion chamber + turbine; open cycle exhausts to atmosphere, closed cycle recirculates the fluid through heater and cooler.',
      'Closed cycle: any fuel, any gas (He), better part-load and blade life — but complex and costly.',
      'vs IC engine: ~95 % mechanical efficiency, no flywheel, light, cheap fuels; but lower thermal efficiency (15–20 % per book), hard starting, costly cooled blades, ~5× exhaust.',
      'Applications: aircraft, peak-load power, marine, cogeneration, locomotives, pipelines.',
    ],
    misconceptions: [
      'Thinking a closed-cycle gas turbine burns fuel inside the loop — the heat is supplied externally through a heat exchanger.',
    ],
    flashcards: [
      { id: 'u5-f1', front: 'Three components of a simple gas turbine plant?', back: 'Compressor, combustion chamber, turbine.' },
      { id: 'u5-f2', front: 'Two advantages of a closed-cycle gas turbine?', back: 'Any fuel/heat source and any working gas; better part-load efficiency; longer blade life (any two).' },
      { id: 'u5-f3', front: 'Thermal efficiency of a simple gas turbine vs IC engine (book)?', back: 'Gas turbine 15–20 %; IC engine 25–30 %.' },
      { id: 'u5-f4', front: 'Why does a gas turbine need no flywheel?', back: 'It is a rotary machine giving continuous, uniform torque.' },
    ],
  },
  {
    id: 'u5-simple',
    unitId: 'u5',
    title: 'Simple cycle: actual efficiency and specific output',
    summary: 'The Brayton cycle with compressor and turbine losses — efficiency, specific work, back work ratio and why component efficiencies matter so much.',
    syllabusPhrases: ['efficiency and specific output of simple cycle'],
    coverage: 'full',
    highlighted: true,
    refs: [
      { chapter: 27, section: '§27.4–27.5', pages: '928–935' },
      { chapter: 11, section: '§11.12', pages: '364–368' },
    ],
    diagrams: ['gt-actual-ts'],
    sections: [
      {
        id: 'deviation',
        title: 'How the actual cycle deviates from Brayton (§27.5)',
        body: md`The air-standard Brayton cycle (Unit 3) models the plant. A real plant differs because:

1. **Friction in the compressor and turbine** — the actual compressor work exceeds the isentropic work, and the actual turbine work is less than isentropic. This causes a marked fall in net work.
2. **Pressure drops** in the combustor and heat exchangers (usually neglected in simple analysis).
3. **Specific heat rises with temperature**, and the gas composition changes after combustion (so different $c_p$, $\gamma$ are used for the turbine).

![Actual gas turbine cycle](diagram:gt-actual-ts)

The losses are measured by isentropic efficiencies:

$$\eta_C = \frac{T_{2s}-T_1}{T_2-T_1}, \qquad \eta_T = \frac{T_3-T_4}{T_3-T_{4s}}$$`,
      },
      {
        id: 'output',
        title: 'Efficiency and specific output',
        body: md`With $x = r_p^{(\gamma-1)/\gamma}$:

$$w_C = \frac{c_pT_1(x-1)}{\eta_C}, \qquad w_T = \eta_T\,c_pT_3\left(1-\frac{1}{x}\right)$$

**Specific output** (net work per kg of air) and efficiency:

$$\boxed{w_{\text{net}} = w_T - w_C}, \qquad \boxed{\eta = \frac{w_T - w_C}{c_p(T_3-T_2)}}$$

Specific output matters as much as efficiency: it fixes the **air rate** ($3600/w_{\text{net}}$ kg/kWh) and therefore the size of the compressor, turbine and ducts for a given power.

> [!WHY] Why component efficiency is critical
> The back work ratio of a gas turbine is 40–80 %. Net work is a *small difference of two large numbers*, so a few percent lost in each machine removes a large share of the net output. Example 27.1 shows it: with 80 % component efficiencies the efficiency falls from 48.2 % (ideal) to 25.4 %, and the back work ratio rises from 41 % to 65 %.

**Unlike the ideal cycle**, the actual efficiency depends on the **temperature ratio** $T_3/T_1$, not just $r_p$, and it has a **maximum** at some pressure ratio — explored in *Effect of operating variables*.`,
      },
    ],
    keyPoints: [
      'Real cycle: η_C and η_T < 1, pressure losses, variable c_p.',
      'w_C = c_pT₁(x − 1)/η_C; w_T = η_T c_pT₃(1 − 1/x).',
      'Specific output w_net sets the air rate 3600/w_net and hence plant size.',
      'Because back work is high, small component losses cut net work and efficiency sharply.',
    ],
    misconceptions: [
      'Multiplying compressor work by η_C — compressor actual work is isentropic work *divided* by η_C.',
    ],
    flashcards: [
      { id: 'u5-f5', front: 'Compressor and turbine isentropic efficiencies (T-form)?', back: 'η_C = (T₂s − T₁)/(T₂ − T₁); η_T = (T₃ − T₄)/(T₃ − T₄s).' },
      { id: 'u5-f6', front: 'Define specific output.', back: 'Net work per kg of air, w_net = w_T − w_C (kJ/kg).' },
      { id: 'u5-f7', front: 'Why are gas turbines so sensitive to component efficiency?', back: 'High back work ratio: net work is a small difference of two large quantities.' },
    ],
  },
  {
    id: 'u5-regeneration',
    unitId: 'u5',
    title: 'Regeneration',
    summary: 'Using hot turbine exhaust to preheat compressed air — effectiveness, efficiency gain, and the pressure-ratio limit.',
    syllabusPhrases: ['effects of regeneration … on efficiency and work output'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 27, section: '§27.6.1', pages: '935–942' }],
    diagrams: ['gt-regen', 'gt-regen-ts'],
    sections: [
      {
        id: 'idea',
        title: 'The idea',
        body: md`In a simple plant the turbine exhaust (state 4) is often **hotter than the compressed air** (state 2). A **regenerator** (counter-flow heat exchanger) transfers some of that exhaust heat to the compressed air before it reaches the combustor. The fuel then has less heating to do.

![Regenerative gas turbine](diagram:gt-regen)

![Regeneration on the T–s diagram](diagram:gt-regen-ts)

- The **turbine and compressor works are unchanged**, so the **specific output is unchanged**.
- The **heat supplied falls** (from $c_p(T_3-T_2)$ to $c_p(T_3-T_x)$), so the **efficiency rises**.`,
      },
      {
        id: 'effectiveness',
        title: 'Regenerator effectiveness',
        body: md`> [!DEF] Effectiveness (thermal ratio)
> $$\varepsilon = \frac{\text{actual heat transfer}}{\text{maximum possible heat transfer}} = \frac{T_x - T_2}{T_4 - T_2}$$
> where $T_x$ is the air temperature leaving the regenerator. A perfect regenerator ($\varepsilon = 1$) heats the air all the way to $T_4$.

Higher effectiveness needs a larger, costlier regenerator and causes more pressure drop, so practical values are about **0.6–0.85**.`,
      },
      {
        id: 'efficiency',
        title: 'Efficiency with ideal regeneration',
        body: md`For an ideal cycle with a perfect regenerator ($T_x = T_4$):

$$\boxed{\eta_{\text{regen}} = 1 - \frac{T_1}{T_3}\,r_p^{(\gamma-1)/\gamma}}$$

Compare the simple cycle, $\eta = 1 - r_p^{-(\gamma-1)/\gamma}$:
- the regenerative efficiency **falls** as $r_p$ increases (the gap $T_4 - T_2$ shrinks), while the simple-cycle efficiency rises;
- it **rises** with the temperature ratio $T_3/T_1$;
- regeneration is useful only while $T_4 > T_2$. The two curves cross at the pressure ratio of maximum work, $r_p = (T_3/T_1)^{\gamma/2(\gamma-1)}$ — above it a regenerator would *cool* the compressed air.

> [!EXAM] So what?
> Regeneration is most effective at **low pressure ratios** and **high turbine inlet temperatures**. It suits stationary plants; aircraft avoid it because of the weight and bulk of the heat exchanger.`,
      },
    ],
    derivations: [
      {
        id: 'u5-d-regen',
        title: 'Efficiency of the ideal regenerative cycle',
        goal: md`Show that $\eta = 1 - \dfrac{T_1}{T_3}r_p^{(\gamma-1)/\gamma}$ with a perfect regenerator.`,
        assumptions: ['Ideal compressor and turbine', 'Perfect regenerator: T_x = T_4', 'Constant c_p'],
        steps: [
          { math: md`q_{\text{in}} = c_p(T_3 - T_x) = c_p(T_3 - T_4)`, why: md`The air enters the combustor already at $T_4$.` },
          { math: md`w_{\text{net}} = c_p(T_3 - T_4) - c_p(T_2 - T_1)`, why: md`Turbine and compressor works are unchanged by regeneration.` },
          { math: md`\eta = 1 - \frac{T_2 - T_1}{T_3 - T_4}`, why: md`Divide net work by heat supplied.` },
          { math: md`T_2 - T_1 = T_1(x-1), \qquad T_3 - T_4 = T_3\left(1 - \frac{1}{x}\right) = \frac{T_3}{x}(x-1)`, why: md`With $x = r_p^{(\gamma-1)/\gamma}$: $T_2 = T_1x$, $T_4 = T_3/x$.` },
          { math: md`\eta = 1 - \frac{T_1\,x}{T_3}`, why: md`Cancel $(x - 1)$.` },
        ],
        result: md`\eta_{\text{regen}} = 1 - \frac{T_1}{T_3}\,r_p^{(\gamma-1)/\gamma}`,
        ref: { chapter: 27, section: '§27.6.1', pages: '936' },
      },
    ],
    keyPoints: [
      'Regenerator uses exhaust heat to preheat compressed air: same work, less fuel → higher efficiency.',
      'Effectiveness ε = (T_x − T₂)/(T₄ − T₂).',
      'Ideal regenerative η = 1 − (T₁/T₃) r_p^((γ−1)/γ): falls with r_p, rises with T₃/T₁.',
      'Useful only while T₄ > T₂, i.e. at low pressure ratios.',
    ],
    misconceptions: [
      'Thinking regeneration increases work output. It saves fuel; the net work per kg is unchanged.',
    ],
    flashcards: [
      { id: 'u5-f8', front: 'Effect of regeneration on net work and efficiency?', back: 'Net work unchanged; heat supplied falls; efficiency rises.' },
      { id: 'u5-f9', front: 'Define regenerator effectiveness.', back: 'ε = (T_x − T₂)/(T₄ − T₂): actual ÷ maximum possible heat transfer.' },
      { id: 'u5-f10', front: 'Ideal regenerative cycle efficiency?', back: 'η = 1 − (T₁/T₃) r_p^((γ−1)/γ)' },
    ],
  },
  {
    id: 'u5-reheat-intercool',
    unitId: 'u5',
    title: 'Reheating and intercooling',
    summary: 'Splitting expansion and compression into stages: more work per kg, and why they need a regenerator to raise efficiency.',
    syllabusPhrases: ['re-heating and intercooling on efficiency and work output'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 27, section: '§27.6.2–27.6.5', pages: '942–960' }],
    diagrams: ['gt-reheat', 'gt-reheat-ts', 'gt-intercool', 'gt-intercool-ts', 'gt-all-ts'],
    sections: [
      {
        id: 'reheat',
        title: 'Reheating (§27.6.2)',
        body: md`Expansion is done in two (or more) turbines. Between them, the gas is **reheated** — usually back to the maximum temperature — in a second combustor. Gas turbines burn fuel with lots of excess air, so there is enough oxygen left to burn more fuel.

![Gas turbine with reheat](diagram:gt-reheat)

![Reheat on the T–s diagram](diagram:gt-reheat-ts)

Constant-pressure lines **diverge** on the T–s diagram, so the turbine temperature drop is larger between hotter, more widely separated lines. Reheating therefore:
- **increases turbine work** and the **specific output** (and the work ratio);
- but adds heat at a lower average temperature, so it **reduces efficiency** unless a regenerator is used. With reheat the exhaust leaves hotter, so a regenerator becomes very effective.

For maximum work with equal efficiencies and reheat to $T_3$, the expansion ratio is divided equally: $p_{\text{reheat}} = \sqrt{p_{\max}\,p_{\min}}$.`,
      },
      {
        id: 'intercool',
        title: 'Intercooling (§27.6.3)',
        body: md`Compression is split into stages with an **intercooler** between them, cooling the air (ideally back to $T_1$). This is the same principle as Unit 1's multistage compressor: compression approaches isothermal, and **compressor work falls**.

![Gas turbine with intercooling](diagram:gt-intercool)

![Intercooling on the T–s diagram](diagram:gt-intercool-ts)

Intercooling:
- **reduces compressor work**, so **net work and work ratio increase**;
- but delivers the air to the combustor **colder** ($T_2$ lower), so more fuel is needed and **efficiency can fall** without a regenerator. With a regenerator, the bigger gap between exhaust and compressed-air temperatures is recovered, and efficiency rises.

For minimum work with perfect intercooling: $p_i = \sqrt{p_1p_2}$ and equal stage pressure ratios (Example 27.13).`,
      },
      {
        id: 'combined',
        title: 'Intercooling + reheating + regeneration (§27.6.4–27.6.5)',
        body: md`Combining all three raises both work output **and** efficiency:
- intercooling cuts compressor work;
- reheating raises turbine work;
- regeneration recovers the larger exhaust heat that both create.

![Many stages of intercooling and reheat](diagram:gt-all-ts)

As the number of stages tends to infinity, compression becomes isothermal at $T_1$ and expansion isothermal at $T_3$; with a perfect regenerator the cycle becomes the **Ericsson cycle** and its efficiency approaches **Carnot**: $1 - T_1/T_3$ (Unit 3). In practice two or three stages are the economic limit because of cost, size and pressure losses.

| Modification | Net work | Efficiency (alone) | Efficiency with regenerator |
|---|---|---|---|
| Regeneration | unchanged | ↑ | — |
| Reheating | ↑ | ↓ | ↑ |
| Intercooling | ↑ | ↓ | ↑ |
| All three | ↑↑ | — | ↑↑ (→ Ericsson) |`,
      },
    ],
    keyPoints: [
      'Reheating increases turbine work; intercooling reduces compressor work → both raise specific output and work ratio.',
      'Alone, each can lower efficiency (heat added at lower mean temperature / colder air to combustor).',
      'With a regenerator, both raise efficiency as well as work.',
      'Ideal intermediate pressure for either: √(p_max · p_min) — equal stage ratios.',
      'Infinite stages + perfect regenerator → Ericsson cycle → Carnot efficiency.',
    ],
    misconceptions: [
      'Assuming every modification raises efficiency. Reheat and intercooling mainly raise work; efficiency gains need regeneration.',
    ],
    flashcards: [
      { id: 'u5-f11', front: 'Effect of reheating on work and efficiency (no regenerator)?', back: 'Work ↑, work ratio ↑; efficiency usually ↓.' },
      { id: 'u5-f12', front: 'Effect of intercooling on work and efficiency (no regenerator)?', back: 'Compressor work ↓, net work ↑; efficiency may ↓ because air enters the combustor colder.' },
      { id: 'u5-f13', front: 'What does a GT with many intercoolers, reheaters and a perfect regenerator approach?', back: 'The Ericsson cycle — Carnot efficiency.' },
    ],
  },
  {
    id: 'u5-operating',
    unitId: 'u5',
    title: 'Effect of operating variables; air rate and work ratio; water injection',
    summary: 'How turbine inlet temperature, inlet temperature, pressure ratio and component efficiencies change efficiency and output — plus water injection.',
    syllabusPhrases: ['effect of operating variables on thermal efficiency', 'air rate', 'work ratio', 'water injection'],
    coverage: 'partial',
    coverageNote: 'The book covers the effect of pressure ratio, work ratio and air rate (§11.12) and the actual-cycle calculations of Ch. 27. A unified discussion of operating variables and water injection for gas turbines is not in Ch. 27; both are supplementary here. (Water–methanol injection for jet engines is in Ch. 28.)',
    refs: [
      { chapter: 11, section: '§11.12.2–11.12.6', pages: '366–368' },
      { chapter: 27, section: '§27.5', pages: '928–935' },
    ],
    diagrams: ['gt-operating'],
    sections: [
      {
        id: 'variables',
        title: 'The operating variables',
        body: md`For the actual simple cycle, efficiency and specific output depend on:

$$\eta = \frac{\eta_T\,T_3\left(1-\dfrac1x\right) - \dfrac{T_1(x-1)}{\eta_C}}{T_3 - T_1 - \dfrac{T_1(x-1)}{\eta_C}}, \qquad x = r_p^{(\gamma-1)/\gamma}$$

Try the explorer:

![Operating variables explorer](diagram:gt-operating)

1. **Turbine inlet temperature $T_3$** — the most powerful variable. Raising it increases both efficiency and specific output, and raises the optimum pressure ratio. It is limited by blade materials and cooling (metallurgical limit).
2. **Compressor inlet temperature $T_1$** — a lower $T_1$ (cold day) reduces compressor work, raising output and efficiency. Hot climates derate gas turbines noticeably.
3. **Pressure ratio $r_p$** — for the actual cycle there is one $r_p$ for **maximum specific work** and a higher one for **maximum efficiency**; beyond these both fall. Designers choose between them.
4. **Component efficiencies $\eta_C$, $\eta_T$** — because of the high back work ratio, a small drop sharply cuts output and efficiency. Below a certain value no net work is produced at all.
5. **Pressure losses** in combustor, intake and exhaust reduce the effective expansion ratio and the turbine work.`,
      },
      {
        id: 'optimum',
        title: 'Optimum pressure ratio for maximum work (actual cycle)',
        body: md`Differentiating $w_{\text{net}} = c_p\left[\eta_TT_3\left(1-\frac1x\right) - \frac{T_1(x-1)}{\eta_C}\right]$ with respect to $x$ and equating to zero:

$$\boxed{x_{\text{opt}} = \sqrt{\eta_C\,\eta_T\,\frac{T_3}{T_1}}}, \qquad r_{p,\text{opt}} = x_{\text{opt}}^{\gamma/(\gamma-1)}$$

With $\eta_C = \eta_T = 1$ this reduces to the ideal result of Unit 3, $T_2 = T_4 = \sqrt{T_1T_3}$.`,
      },
      {
        id: 'ratios',
        title: 'Work ratio and air rate',
        body: md`$$\text{Work ratio} = \frac{w_{\text{net}}}{w_T}, \qquad \text{Air rate} = \frac{3600}{w_{\text{net}}}\ \text{kg/kWh}$$

- A **high work ratio** means the plant is tolerant of component losses (less "wasted" turbine work). Intercooling and reheating raise it.
- A **low air rate** means a smaller plant for the same output. Raising $T_3$ and intercooling/reheating lower it.

Example: for the cycle of Example 27.1, $w_{\text{net}} = 191.8$ kJ/kg, so air rate = 3600/191.8 = 18.8 kg/kWh and work ratio = 191.8/542.6 = 0.354.`,
      },
      {
        id: 'water',
        title: 'Water injection',
        supplementary: true,
        body: md`> [!SUPP] Not treated in Ch. 27
> Rathore discusses water–methanol injection only as thrust augmentation for jet engines (§28.10, Unit 6). The principle for stationary gas turbines is the same.

Water (or steam) injection is used to **boost power** and/or **reduce NOₓ**:

1. **Injection at the compressor inlet or between stages (inlet fogging / wet compression).** Evaporating water cools the air — an "evaporative intercooler". Compressor work falls and the air is denser, so mass flow and **output rise** (typically 10–20 % on hot days). Efficiency improves slightly.
2. **Injection into the combustion chamber (water or steam injection).** The extra mass passes through the turbine without having been compressed by the compressor — it was pumped as a liquid, at almost no cost — so **turbine work and output rise**. It also **lowers the flame temperature, cutting NOₓ** formation sharply. With steam raised from exhaust heat (the "Cheng" or steam-injected gas turbine), efficiency also rises.

**Costs:** large quantities of demineralised water, risk of compressor blade erosion, plume of water vapour, and lost water. Efficiency can fall if liquid water is injected into the combustor (its latent heat must be supplied by fuel).`,
      },
    ],
    keyPoints: [
      'Raising T₃ raises both efficiency and specific output (limited by blade materials).',
      'Lower compressor inlet temperature → less compressor work → more output.',
      'Actual cycle: separate optimum r_p for max work and for max efficiency.',
      'Max work: x_opt = √(η_Cη_T T₃/T₁).',
      'Work ratio = w_net/w_T; air rate = 3600/w_net kg/kWh.',
      'Water injection at inlet cools air (less compressor work); in combustor adds turbine mass flow and cuts NOₓ. (Supplementary.)',
    ],
    misconceptions: [
      'Applying the ideal result "efficiency depends only on r_p" to an actual plant — real efficiency depends strongly on T₃/T₁ and component efficiencies.',
    ],
    flashcards: [
      { id: 'u5-f14', front: 'Most important variable for GT performance?', back: 'Turbine inlet temperature T₃ — raises both efficiency and specific output.' },
      { id: 'u5-f15', front: 'Optimum x for maximum work in the actual cycle?', back: 'x = √(η_C η_T T₃/T₁), with x = r_p^((γ−1)/γ).' },
      { id: 'u5-f16', front: 'Two purposes of water injection in gas turbines?', back: 'Power augmentation (cooler inlet air / extra turbine mass flow) and NOₓ reduction.' },
    ],
  },
  {
    id: 'u5-components',
    unitId: 'u5',
    title: 'Gas turbine components',
    summary: 'Compressor, combustion chamber, turbine, heat exchangers and auxiliaries — what each does and how it is built.',
    syllabusPhrases: ['gas turbine components'],
    coverage: 'missing',
    coverageNote: 'Ch. 27 has no dedicated section on components. The centrifugal compressor is in Ch. 26 (Unit 2); the rest of this topic is supplementary.',
    refs: [{ chapter: 27, section: '§27.2 (schematics only)', pages: '926–927' }],
    sections: [
      {
        id: 'overview',
        title: 'Components and their job',
        supplementary: true,
        body: md`> [!SUPP] Not treated as a section in Rathore
> Written to complete the syllabus item "gas turbine components".

**1. Compressor.**
- **Axial-flow** compressors (many stages of rotating and stationary blades) are used in large and aircraft gas turbines: high flow, high efficiency (≈ 85–90 %), overall pressure ratios of 15–40.
- **Centrifugal** compressors (Unit 2) are used in small units: rugged and compact, about 4 per stage.

**2. Combustion chamber.** Burns fuel continuously in compressed air with a stable flame and a uniform exit temperature, with minimum pressure loss.
- Only about **20–30 % of the air (primary air)** enters the flame zone near the fuel nozzle, at roughly stoichiometric strength. **Swirlers** create a recirculation zone that anchors the flame.
- **Secondary and dilution air** enters through holes in the **flame tube (liner)** to complete combustion and cool the gas to the turbine-inlet limit. Overall air–fuel ratio is about 50–100:1.
- Types: **can (tubular)**, **annular**, and **can-annular (tubo-annular)**. Annular chambers are the lightest and most compact; cans are easiest to develop and maintain.

**3. Turbine.** Usually **axial-flow**, impulse–reaction stages. First-stage nozzle guide vanes and blades face the hottest gas, so they are made of nickel-based superalloys (often single-crystal) with thermal-barrier coatings and **internal air cooling** (convection, impingement and film cooling) — this is what permits turbine inlet temperatures far above the metal's melting point.

**4. Heat exchangers.** Regenerator/recuperator (exhaust → compressed air), intercooler (between compressor stages), precooler (closed cycle). Plate-fin, tubular or rotary types.

**5. Auxiliaries.** Starting system (electric motor, starter turbine or compressed air — needed because the compressor must be spun up before self-sustained running), fuel system and nozzles, lubrication system for bearings, ignition (igniters used only for starting), governor and controls, inlet filters and exhaust silencers.`,
      },
    ],
    keyPoints: [
      'Compressor: axial (large/aircraft, high ratio) or centrifugal (small units). (Supplementary.)',
      'Combustor: primary air (~20–30 %) for stable flame, secondary/dilution air through the liner to cool the gas; can, annular, can-annular types. (Supplementary.)',
      'Turbine: axial, superalloy cooled blades; inlet temperature limited by materials. (Supplementary.)',
      'Auxiliaries: starter, fuel, lubrication, ignition for starting, controls.',
    ],
    flashcards: [
      { id: 'u5-f17', front: 'Three types of gas turbine combustion chamber?', back: 'Can (tubular), annular, can-annular (tubo-annular).' },
      { id: 'u5-f18', front: 'Why is only part of the air admitted to the flame zone?', back: 'The overall mixture (≈ 50–100:1) is far too lean to burn; primary air gives a near-stoichiometric zone for a stable flame, dilution air then cools the gas.' },
    ],
  },
]

/* ----------------------------------------------------------------------------- */

export const examples: WorkedExample[] = [
  {
    id: 'ex-27-1',
    topicId: 'u5-simple',
    title: 'Actual cycle: efficiency, back work ratio and power',
    source: { kind: 'textbook', ref: 'Example 27.1', page: 929 },
    difficulty: 1,
    statement: md`Air enters the compressor of a gas turbine plant operating on air-standard cycle at 100 kPa and 300 K with a volumetric flow rate of 5 m³/s. The compressor pressure ratio is 10. The turbine inlet temperature is 1400 K. The turbine and compressor each has an isentropic efficiency of 80%. Calculate (a) the thermal efficiency of the cycle, (b) the back work ratio, (c) the net power developed in kW.`,
    given: ['p₁ = 100 kPa, T₁ = 300 K, V̇ = 5 m³/s', 'r_p = 10, T₃ = 1400 K, η_C = η_T = 0.8'],
    find: ['η', 'bwr', 'Net power'],
    approach: md`Find isentropic end states, correct them with the efficiencies, then compute works and heat.`,
    steps: [
      { label: 'Compressor', work: md`$T_{2s} = 300(10)^{0.2857} = 579.2$ K; $T_2 = 300 + \dfrac{279.2}{0.8} = 649.0$ K; $w_C = 1.005(349.0) = 350.8$ kJ/kg` },
      { label: 'Turbine', work: md`$T_{4s} = 1400/10^{0.2857} = 725.1$ K; $T_4 = 1400 - 0.8(674.9) = 860.1$ K; $w_T = 1.005(539.9) = 542.6$ kJ/kg` },
      { label: '(a) Efficiency', work: md`$q_{\text{in}} = 1.005(1400 - 649.0) = 754.7$; $\eta = \dfrac{542.6-350.8}{754.7} = 25.4\%$` },
      { label: '(b) Back work ratio', work: md`$350.8/542.6 = 64.6\%$` },
      { label: '(c) Power', work: md`$\dot m = \dfrac{100 \times 5}{0.287 \times 300} = 5.807$ kg/s; $P = 5.807 \times 191.8 = 1114$ kW` },
    ],
    answer: md`η = 25.4 %, bwr = 64.6 %, P ≈ 1114 kW`,
    concept: 'Compare with the ideal Example 11.29 (same data): η 48.2 %, bwr 41.4 %, 2309 kW. 80 % machines halve the output.',
  },
  {
    id: 'ex-27-2',
    topicId: 'u5-simple',
    title: 'Generator output with different gas properties',
    source: { kind: 'textbook', ref: 'Example 27.2', page: 930 },
    difficulty: 2,
    statement: md`A gas turbine unit has a pressure ratio of 6 and maximum cycle temperature of 610 °C. The isentropic efficiency of the turbine and compressor are 0.82 and 0.8, respectively. Calculate the power output in kW of an electric generator, geared to the turbine, when air enters the compressor at 15 °C at a rate of 16 kg/s. Take $c_p = 1.005$ kJ/kg·K and $\gamma = 1.4$ for compression process and $c_p = 1.11$ kJ/kg·K and $\gamma = 1.333$ for expansion process.`,
    given: ['r_p = 6, T₃ = 883 K, T₁ = 288 K, ṁ = 16 kg/s', 'η_T = 0.82, η_C = 0.8', 'Gas: c_p = 1.11, γ = 1.333'],
    find: ['Power output'],
    approach: md`Use air properties for the compressor and gas properties for the turbine.`,
    steps: [
      { label: 'Compressor', work: md`$T_2 = 288 + \dfrac{288(6^{0.2857}-1)}{0.8} = 528.7$ K; $w_C = 1.005(240.7) = 241.9$ kJ/kg` },
      { label: 'Turbine', work: md`$T_{4s} = 883/6^{0.25} = 564.2$ K; $T_4 = 883 - 0.82(318.8) = 621.7$ K; $w_T = 1.11(261.3) = 290.0$ kJ/kg` },
      { label: 'Power', work: md`$P = 16(290.0 - 241.9) = 770$ kW` },
    ],
    answer: md`P ≈ 770 kW`,
    concept: 'Combustion products have higher c_p and lower γ than air, which changes the turbine calculation.',
  },
  {
    id: 'ex-27-7',
    topicId: 'u5-regeneration',
    title: 'Regenerative cycle with perfect and 85 % heat exchanger',
    source: { kind: 'textbook', ref: 'Example 27.7', page: 937 },
    difficulty: 2,
    statement: md`In a gas turbine plant, the compressor takes in air at a temperature of 15 °C and compresses it to four times the initial pressure with an isentropic efficiency of 85%. The air is then passed through a heat exchanger, heated by the turbine exhaust before reaching the combustion chamber. The turbine inlet temperature is 600 °C and its efficiency is 80%. Neglecting all losses except those mentioned, and treating the working fluid throughout the cycle to have the properties of air, calculate thermal efficiency and work ratio of the cycle if (a) heat exchanger is perfect, and (b) heat exchanger gives 85% of available heat to air.`,
    given: ['T₁ = 288 K, r_p = 4, η_C = 0.85', 'T₃ = 873 K, η_T = 0.8', 'ε = 1 and ε = 0.85'],
    find: ['η and work ratio for each ε'],
    approach: md`Works do not depend on ε; only the air temperature after the regenerator $T_x = T_2 + \varepsilon(T_4 - T_2)$ changes.`,
    steps: [
      { label: 'Compressor', work: md`$T_{2s} = 288(4)^{0.2857} = 428$ K; $T_2 = 288 + 140/0.85 = 452.7$ K; $w_C = 165.5$ kJ/kg` },
      { label: 'Turbine', work: md`$T_{4s} = 873/4^{0.2857} = 587.5$ K; $T_4 = 873 - 0.8(285.5) = 644.6$ K; $w_T = 229.6$ kJ/kg` },
      { label: 'Net work, work ratio', work: md`$w = 64.1$ kJ/kg; work ratio $= 64.1/229.6 = 0.279$` },
      { label: '(a) ε = 1', work: md`$T_x = 644.6$ K; $q = 1.005(873 - 644.6) = 229.6$; $\eta = 27.9\%$` },
      { label: '(b) ε = 0.85', work: md`$T_x = 452.7 + 0.85(191.9) = 615.8$ K; $q = 258.5$; $\eta = 24.8\%$` },
    ],
    answer: md`(a) η = 27.9 % (b) η = 24.8 %; work ratio 0.279 in both`,
    concept: 'Regenerator effectiveness changes only the heat supplied, so it changes efficiency but not work.',
  },
  {
    id: 'ex-27-11',
    topicId: 'u5-reheat-intercool',
    title: 'Ideal cycle with reheat and regeneration',
    source: { kind: 'textbook', ref: 'Example 27.11', page: 943 },
    difficulty: 2,
    statement: md`Air enters the compressor of an ideal air-standard Brayton cycle at 100 kPa, 300 K and is compressed to 1000 kPa. The temperature at the inlet to the first turbine is 1400 K. The expansion takes place isentropically in two stages with reheat to 1400 K between the two stages at a constant pressure of 300 kPa. A regenerator having an effectiveness of 100% is also incorporated in the cycle. Determine the thermal efficiency of the cycle.`,
    given: ['T₁ = 300 K, p: 100 → 1000 kPa', 'T₃ = T₅ = 1400 K, reheat at 300 kPa', 'ε = 1'],
    find: ['η'],
    approach: md`Ideal states; with ε = 1 the air leaves the regenerator at the final turbine exhaust temperature.`,
    steps: [
      { label: 'Compressor', work: md`$T_2 = 300(10)^{0.2857} = 579.2$ K; $w_C = 280.6$ kJ/kg` },
      { label: 'HP turbine (1000 → 300 kPa)', work: md`$T_4 = 1400(0.3)^{0.2857} = 992.5$ K; $w = 409.5$ kJ/kg` },
      { label: 'LP turbine (300 → 100 kPa)', work: md`$T_6 = 1400(1/3)^{0.2857} = 1022.8$ K; $w = 379.1$ kJ/kg` },
      { label: 'Net work', work: md`$w_{\text{net}} = 788.6 - 280.6 = 508.0$ kJ/kg` },
      { label: 'Heat supplied', work: md`Air enters the combustor at $T_6 = 1022.8$ K: $q = 1.005(1400 - 1022.8) + 1.005(1400 - 992.5) = 788.6$ kJ/kg` },
      { label: 'Efficiency', work: md`$\eta = 508.0/788.6 = 64.4\%$` },
    ],
    answer: md`η ≈ 64.4 %`,
    concept: 'Reheat makes the exhaust hot; a regenerator recovers it, so reheat + regeneration gives a large efficiency gain.',
    checkNote: 'The effectiveness value is illegible in the scanned statement; the book’s solution uses ε = 1.0, as shown here.',
  },
  {
    id: 'ex-27-13',
    topicId: 'u5-reheat-intercool',
    title: 'Two-stage compression with intercooling',
    source: { kind: 'textbook', ref: 'Example 27.13', page: 947 },
    difficulty: 1,
    statement: md`Air is compressed from 100 kPa, 300 K to 1000 kPa in a two-stage compressor with intercooling between stages. The air is compressed to 300 kPa and is cooled back to 300 K in an intercooler before entering the second stage compressor. Each compression stage is isentropic. For steady state operation and negligible changes in kinetic and potential energy from inlet to exit, determine (a) temperature at exit of second compressor, (b) the total compressor work input per unit of mass flow, (c) reduction in work input by intercooling and two-stage compression, (d) isothermal compression work.`,
    given: ['p: 100 → 300 → 1000 kPa', 'T₁ = 300 K, intercooled to 300 K', 'Isentropic stages'],
    find: ['T at exit', 'Total work', '% reduction', 'Isothermal work'],
    approach: md`Each stage is isentropic from 300 K; compare with single-stage isentropic and isothermal work.`,
    steps: [
      { label: 'Stage 1', work: md`$T_2 = 300(3)^{0.2857} = 410.6$ K` },
      { label: '(a) Stage 2', work: md`$T_4 = 300(10/3)^{0.2857} = 423.2$ K` },
      { label: '(b) Total work', work: md`$w = 1.005[(410.6 - 300) + (423.2 - 300)] = 235.0$ kJ/kg` },
      { label: '(c) Single stage', work: md`$T = 300(10)^{0.2857} = 579.2$ K; $w = 280.6$ kJ/kg → saving $= 45.6$ kJ/kg $= 16.3\%$` },
      { label: '(d) Isothermal', work: md`$w = RT_1\ln 10 = 0.287(300)\ln 10 = 198.3$ kJ/kg` },
    ],
    answer: md`(a) 423.2 K (b) 235.0 kJ/kg (c) 16.3 % (d) 198.3 kJ/kg`,
    concept: 'Intercooling moves compression toward the isothermal minimum.',
    observations: ['300 kPa is not the optimum intermediate pressure: √(100 × 1000) = 316 kPa would give slightly less work.'],
  },
  {
    id: 'ex-27-16',
    topicId: 'u5-reheat-intercool',
    title: 'Intercooled regenerative plant',
    source: { kind: 'textbook', ref: 'Example 27.16', page: 950 },
    difficulty: 3,
    statement: md`The air supplied to a gas turbine plant is 10 kg/s. The pressure ratio is 6 and pressure at the inlet of compressor is 1 bar. The compressor is two-stage and is provided with perfect intercooling. The inlet temperature is 300 K and maximum temperature is limited to 1073 K. Take the following data: isentropic efficiency of compressor at each stage 80%, isentropic efficiency of turbine 85%. A regenerator is included in a plant whose effectiveness is 0.7. Neglecting the mass of fuel, determine the thermal efficiency of the plant. Take $c_p$ for air as 1.005 kJ/kg·K.`,
    given: ['ṁ = 10 kg/s, r_p = 6, T₁ = 300 K, T_max = 1073 K', 'η_C = 0.8 per stage, η_T = 0.85, ε = 0.7', 'Perfect intercooling → stage ratio √6'],
    find: ['η'],
    approach: md`Equal stage ratios $\sqrt 6 = 2.449$; both stages identical. Single turbine expands through 6.`,
    steps: [
      { label: 'Each compressor stage', work: md`$T_{2s} = 300(2.449)^{0.2857} = 387.5$ K; $T_2 = 300 + 87.5/0.8 = 409.4$ K; $w_C = 2(1.005)(109.4) = 219.9$ kJ/kg` },
      { label: 'Turbine', work: md`$T_{s} = 1073/6^{0.2857} = 643.1$ K; $T_7 = 1073 - 0.85(429.9) = 707.6$ K; $w_T = 1.005(365.4) = 367.3$ kJ/kg` },
      { label: 'Regenerator', work: md`$T_x = 409.4 + 0.7(707.6 - 409.4) = 618.1$ K` },
      { label: 'Efficiency', work: md`$q = 1.005(1073 - 618.1) = 457.2$; $\eta = \dfrac{367.3 - 219.9}{457.2} = 32.2\%$` },
    ],
    answer: md`η ≈ 32.2 % (net power ≈ 1474 kW for 10 kg/s)`,
    concept: 'Intercooling lowers T₂, so the regenerator has more temperature difference to recover.',
  },
  {
    id: 'ex-27-19',
    topicId: 'u5-reheat-intercool',
    title: 'Ideal two-stage compression and expansion with regeneration',
    source: { kind: 'textbook', ref: 'Example 27.19', page: 958 },
    difficulty: 2,
    statement: md`An ideal gas turbine cycle with two stages of compression and two stages of expansion has an overall pressure ratio of 8. Air enters each stage of compressor at 300 K and each stage of turbine at 1300 K. Determine the back work ratio and thermal efficiency of the gas turbine cycle, assuming an ideal regenerator with 100 per cent effectiveness.`,
    given: ['r_p = 8 overall, stage ratio √8', 'Compressor inlets 300 K, turbine inlets 1300 K', 'ε = 1'],
    find: ['bwr', 'η'],
    approach: md`Ideal, equal stages. With ε = 1 the air is preheated to the LP-turbine exhaust temperature.`,
    steps: [
      { label: 'Compressor', work: md`$T_2 = 300(2.828)^{0.2857} = 403.8$ K; $w_C = 2(1.005)(103.8) = 208.6$ kJ/kg` },
      { label: 'Turbine', work: md`$T_4 = 1300/2.828^{0.2857} = 965.9$ K; $w_T = 2(1.005)(334.1) = 671.6$ kJ/kg` },
      { label: 'Back work ratio', work: md`$208.6/671.6 = 31.1\%$` },
      { label: 'Heat supplied', work: md`Air preheated to 965.9 K: $q = 1.005(1300 - 965.9) \times 2 = 671.6$ kJ/kg` },
      { label: 'Efficiency', work: md`$\eta = (671.6 - 208.6)/671.6 = 68.9\%$` },
    ],
    answer: md`bwr = 31.1 %, η = 68.9 %`,
    concept: 'Staging cut the back work ratio from 41.8 % (single stage, same limits) to 31 %, and regeneration takes efficiency close to Carnot (76.9 %).',
  },
  {
    id: 'gen-u5-1',
    topicId: 'u5-operating',
    title: 'Air rate, work ratio and optimum pressure ratio',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`For an actual simple gas turbine with $T_1 = 300$ K, $T_3 = 1200$ K and $\eta_C = \eta_T = 0.85$, find the pressure ratio for maximum specific work, the corresponding specific work, work ratio, air rate and thermal efficiency.`,
    given: ['T₁ = 300 K, T₃ = 1200 K, η_C = η_T = 0.85, γ = 1.4'],
    find: ['r_p,opt', 'w_net', 'work ratio', 'air rate', 'η'],
    approach: md`$x_{\text{opt}} = \sqrt{\eta_C\eta_T T_3/T_1}$, then evaluate each quantity.`,
    steps: [
      { label: 'Optimum x and r_p', work: md`$x = \sqrt{0.7225 \times 4} = 1.70$; $r_p = 1.70^{3.5} = 6.40$` },
      { label: 'Works', work: md`$w_C = \dfrac{1.005(300)(0.70)}{0.85} = 248.3$; $w_T = 0.85(1.005)(1200)\left(1 - \dfrac{1}{1.70}\right) = 422.1$ kJ/kg` },
      { label: 'Net work, work ratio', work: md`$w = 173.8$ kJ/kg; WR $= 173.8/422.1 = 0.412$` },
      { label: 'Air rate', work: md`$3600/173.8 = 20.7$ kg/kWh` },
      { label: 'Efficiency', work: md`$T_2 = 300 + 247.1 = 547.1$ K; $q = 1.005(1200 - 547.1) = 656.2$; $\eta = 26.5\%$` },
    ],
    answer: md`r<sub>p</sub> ≈ 6.4, w ≈ 174 kJ/kg, WR ≈ 0.41, air rate ≈ 20.7 kg/kWh, η ≈ 26.5 %`,
    concept: 'Component losses lower the optimum pressure ratio below the ideal value (11.3 for these temperatures).',
  },
]

/* ----------------------------------------------------------------------------- */

export const questions: Question[] = [
  {
    id: 'q-u5-1', topicId: 'u5-regeneration', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Regeneration in a gas turbine plant:',
    options: ['Increases net work output', 'Reduces heat supplied, raising efficiency', 'Reduces compressor work', 'Increases turbine work'],
    answer: 1,
    solution: md`Works are unchanged; exhaust heat preheats the compressed air, so less fuel is needed.`,
  },
  {
    id: 'q-u5-2', topicId: 'u5-regeneration', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Efficiency of an ideal Brayton cycle with a perfect regenerator, for fixed T₁ and T₃, as pressure ratio increases:',
    options: ['Increases', 'Decreases', 'Stays constant', 'First increases then decreases'],
    answer: 1,
    solution: md`$\eta = 1 - (T_1/T_3)r_p^{(\gamma-1)/\gamma}$ decreases with $r_p$, because the exhaust–air temperature gap shrinks.`,
  },
  {
    id: 'q-u5-3', topicId: 'u5-reheat-intercool', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Intercooling in a gas turbine without a regenerator generally:',
    options: ['Increases both work and efficiency', 'Increases work but may decrease efficiency', 'Decreases work but increases efficiency', 'Has no effect'],
    answer: 1,
    solution: md`Compressor work falls (net work up) but colder air enters the combustor, so more heat is needed and efficiency may fall. A regenerator recovers that.`,
  },
  {
    id: 'q-u5-4', topicId: 'u5-intro', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Which is an advantage of a closed-cycle gas turbine over an open cycle?',
    options: ['Simpler and cheaper plant', 'Can use any fuel and gases like helium', 'No heat exchanger needed', 'Lower cost per kW'],
    answer: 1,
    solution: md`Heat is supplied externally, so any heat source can be used and any working gas circulated. Closed plants are more complex and costly.`,
  },
  {
    id: 'q-u5-5', topicId: 'u5-simple', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'The back work ratio of a gas turbine plant is typically:',
    options: ['1–2 %', '10–20 %', '40–80 %', 'Above 100 %'],
    answer: 2,
    solution: md`The compressor handles a gas and absorbs 40–80 % of the turbine work. (1–2 % is typical of steam plants.)`,
  },
  {
    id: 'q-u5-6', topicId: 'u5-operating', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Air rate of a gas turbine plant is:',
    options: ['Mass of air per kg of fuel', '3600 / w_net in kg/kWh', 'Volume flow of air per second', 'w_net / w_T'],
    answer: 1,
    solution: md`Air rate = mass of air per kWh of net output $= 3600/w_{\text{net}}$. Option D is the work ratio.`,
  },
  {
    id: 'q-u5-7', topicId: 'u5-operating', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Which change increases both the efficiency and specific output of a simple gas turbine?',
    options: ['Raising compressor inlet temperature', 'Raising turbine inlet temperature', 'Lowering turbine efficiency', 'Adding pressure loss in the combustor'],
    answer: 1,
    solution: md`Higher $T_3$ raises turbine work and the effective mean temperature of heat addition.`,
  },
  {
    id: 'q-u5-8', topicId: 'u5-components', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'In a gas turbine combustion chamber, the dilution (secondary) air is used to:',
    options: ['Atomise the fuel', 'Bring the gas temperature down to what the turbine can withstand', 'Start the engine', 'Lubricate the bearings'],
    answer: 1,
    solution: md`Primary air burns the fuel near stoichiometric; dilution air cools the products to the turbine-inlet limit. (Supplementary.)`,
  },
  {
    id: 'q-u5-9', topicId: 'u5-intro', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 27 Review Questions', page: 960 },
    prompt: 'Compare closed-cycle and open-cycle gas turbines.',
    solution: md`Closed: working fluid recirculated (helium possible); indirect heat via exchanger; any fuel or heat source; higher efficiency and better part load; smaller size per MW; longer blade life; better control; complex and costly. Open: fresh air each cycle; direct combustion; needs high-grade liquid/gaseous fuel; lower efficiency; larger; blade fouling and thermal stress; simpler and cheaper.`,
  },
  {
    id: 'q-u5-10', topicId: 'u5-intro', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 27 Review Questions', page: 960 },
    prompt: 'What are the merits and demerits of gas turbines over IC engines?',
    solution: md`Merits: mechanical efficiency ≈ 95 %; uniform torque, no flywheel; lower weight per kW; more power per kg of air; higher speed; cheaper fuels; complete combustion; simple ignition and lubrication; suitable for aircraft. Demerits: lower thermal efficiency (15–20 % vs 25–30 %); difficult starting; blades need cooling and are costly to make; about five times more exhaust gas.`,
  },
  {
    id: 'q-u5-11', topicId: 'u5-reheat-intercool', type: 'long', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 27 Review Questions', page: 960 },
    prompt: 'Explain with T–s diagrams the effect of reheating and intercooling on the efficiency and work output of a gas turbine plant.',
    hints: ['Constant-pressure lines diverge.', 'What happens to the exhaust temperature?'],
    solution: md`**Reheat:** expansion split with reheating to T₃; because isobars diverge, turbine work increases → net work and work ratio rise; but heat is added at a lower mean temperature and exhaust is hotter → efficiency falls unless a regenerator is used. **Intercooling:** compression split with cooling to T₁; compressor work falls → net work rises; air enters the combustor colder → more heat → efficiency may fall without a regenerator. **With regeneration** both raise efficiency too; in the limit (infinite stages, perfect regenerator) the cycle becomes Ericsson with Carnot efficiency.`,
  },
  {
    id: 'q-u5-12', topicId: 'u5-simple', type: 'numerical', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 27 Problems', page: 960 },
    prompt: 'In a gas turbine plant working on the Joule cycle, air is drawn at 288 K and compressed through a pressure ratio of 6. The maximum temperature is 1000 K. The isentropic efficiencies of compressor and turbine are 0.85 and 0.9 respectively. Find the net work per kg of air, the thermal efficiency and the work ratio.',
    hints: ['T₂ = T₁ + T₁(x − 1)/η_C.', 'T₄ = T₃ − η_T T₃(1 − 1/x).'],
    solution: md`$x = 6^{0.2857} = 1.6685$. $T_2 = 288 + 288(0.6685)/0.85 = 514.5$ K; $w_C = 227.6$ kJ/kg. $T_4 = 1000 - 0.9(1000)(1 - 1/1.6685) = 639.4$ K; $w_T = 362.4$ kJ/kg. $w = 134.8$ kJ/kg. $q = 1.005(485.5) = 487.9$; $\eta = 27.6\%$. Work ratio $= 134.8/362.4 = 0.372$.`,
    bookAnswer: '134.8 kJ/kg, 27.6 %, 0.372',
  },
  {
    id: 'q-u5-13', topicId: 'u5-regeneration', type: 'numerical', difficulty: 3, source: { kind: 'textbook', ref: 'Ch 27 Problems', page: 960 },
    prompt: 'A gas turbine plant takes in air at 300 K and compresses it through a pressure ratio of 4. The turbine inlet temperature is 833 K. Isentropic efficiencies of compressor and turbine are 0.83 and 0.85, and a regenerator of effectiveness 0.75 is fitted. Find the thermal efficiency.',
    hints: ['Find T₂ and T₄ first.', 'T_x = T₂ + ε(T₄ − T₂).'],
    solution: md`$x = 1.486$. $T_2 = 300 + 300(0.486)/0.83 = 475.7$ K. $T_4 = 833 - 0.85(833)(1 - 1/1.486) = 601.4$ K. $w = 1.005[(833 - 601.4) - (475.7 - 300)] = 56.2$ kJ/kg. $T_x = 475.7 + 0.75(125.7) = 570.0$ K; $q = 1.005(263.0) = 264.3$. $\eta = 21.3\%$.`,
    bookAnswer: '21.24 %',
  },
  {
    id: 'q-u5-14', topicId: 'u5-operating', type: 'conceptual', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Why does a gas turbine produce less power on a hot day? How can water injection help?',
    solution: md`Hot inlet air is less dense (lower mass flow for the same volume) and needs more compressor work ($w_C \propto T_1$), so net output and efficiency fall. Spraying water at the inlet cools the air by evaporation — denser air, less compressor work — restoring output. Injecting water or steam into the combustor adds turbine mass flow (pumped as liquid, almost free) and lowers flame temperature, which also cuts NOₓ. (Supplementary.)`,
  },
]

/* ----------------------------------------------------------------------------- */

export const formulas: Formula[] = [
  {
    id: 'f-u5-eta-c-t', topicId: 'u5-simple', name: 'Compressor and turbine isentropic efficiencies', important: true,
    latex: md`\eta_C = \frac{T_{2s}-T_1}{T_2-T_1}, \qquad \eta_T = \frac{T_3-T_4}{T_3-T_{4s}}`,
    vars: [{ sym: 'T_{2s}, T_{4s}', meaning: 'isentropic end temperatures', unit: 'K' }],
    conditions: 'Adiabatic machines, constant c_p.',
    meaning: 'Measure of friction losses in each machine.',
    ref: { chapter: 27, section: '§27.5', pages: '929' },
  },
  {
    id: 'f-u5-actual', topicId: 'u5-simple', name: 'Actual simple-cycle works and efficiency', important: true,
    latex: md`w_C = \frac{c_pT_1(x-1)}{\eta_C},\quad w_T = \eta_Tc_pT_3\left(1-\frac1x\right),\quad \eta = \frac{w_T-w_C}{c_p(T_3-T_2)}`,
    vars: [{ sym: 'x', meaning: 'r_p^((γ−1)/γ)', unit: '—' }],
    conditions: 'Constant c_p, no pressure losses.',
    meaning: 'Specific output and efficiency of a real simple plant.',
  },
  {
    id: 'f-u5-eps', topicId: 'u5-regeneration', name: 'Regenerator effectiveness', important: true,
    latex: md`\varepsilon = \frac{T_x - T_2}{T_4 - T_2}`,
    vars: [{ sym: 'T_x', meaning: 'air temperature leaving regenerator', unit: 'K' }],
    conditions: 'Constant c_p, equal mass flows.',
    meaning: 'Fraction of the maximum possible exhaust heat recovered.',
    ref: { chapter: 27, section: '§27.6.1', pages: '935' },
  },
  {
    id: 'f-u5-regen', topicId: 'u5-regeneration', name: 'Ideal regenerative cycle efficiency', important: true,
    latex: md`\eta = 1 - \frac{T_1}{T_3}\,r_p^{(\gamma-1)/\gamma}`,
    vars: [],
    conditions: 'Ideal machines, perfect regenerator.',
    meaning: 'Falls with r_p, rises with T₃/T₁.',
    related: ['f-u3-brayton'],
  },
  {
    id: 'f-u5-intermediate', topicId: 'u5-reheat-intercool', name: 'Optimum intermediate pressure',
    latex: md`p_i = \sqrt{p_{\max}\,p_{\min}}`,
    vars: [],
    conditions: 'Two stages; perfect intercooling (or reheat to T₃); equal efficiencies.',
    meaning: 'Equal stage pressure ratios minimise compressor work / maximise turbine work.',
    related: ['f-u1-interp'],
  },
  {
    id: 'f-u5-xopt', topicId: 'u5-operating', name: 'Optimum pressure ratio (actual cycle)', important: true,
    latex: md`x_{\text{opt}} = \sqrt{\eta_C\,\eta_T\,\frac{T_3}{T_1}}, \qquad r_{p,\text{opt}} = x_{\text{opt}}^{\gamma/(\gamma-1)}`,
    vars: [],
    conditions: 'Constant c_p; maximises specific work.',
    meaning: 'Pressure ratio for maximum net work with component losses.',
    related: ['f-u3-rpopt'],
  },
  {
    id: 'f-u5-ratios', topicId: 'u5-operating', name: 'Work ratio and air rate', important: true,
    latex: md`\text{WR} = \frac{w_{\text{net}}}{w_T}, \qquad \text{air rate} = \frac{3600}{w_{\text{net}}}\ \text{kg/kWh}`,
    vars: [{ sym: 'w_{net}', meaning: 'net work', unit: 'kJ/kg' }],
    conditions: '—',
    meaning: 'Sensitivity to losses, and plant size per kW.',
    related: ['f-u3-bwr'],
  },
]
