import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 2 — Centrifugal Compressor (Rathore Ch. 26 §26.5)
 * ========================================================================== */

export const topics: Topic[] = [
  {
    id: 'u2-construction',
    unitId: 'u2',
    title: 'Centrifugal compressor: construction and working',
    summary: 'Impeller, diffuser and volute; where the pressure rise happens; how it compares with a reciprocating machine.',
    syllabusPhrases: ['Centrifugal compressor'],
    coverage: 'full',
    refs: [{ chapter: 26, section: '§26.5.1–26.5.2, §26.5.11, §26.5.13', pages: '898, 903–905' }],
    diagrams: ['centrifugal-sketch', 'centrifugal-pv'],
    sections: [
      {
        id: 'intro',
        title: 'A dynamic compressor',
        body: md`A centrifugal compressor is a **dynamic** (rotodynamic) machine: it first gives the air kinetic energy and then converts that kinetic energy into pressure. It is suited to **very high flows** (typically above 3000 m³/min) at a **moderate pressure ratio of about 4 to 6** per machine (§26.5). It is simple, light, rugged and oil-free by design, since the lubricated bearings are sealed away from the air.

**Construction** (§26.5.1):
- **Impeller** — a disc with radial vanes, usually forged or die-cast aluminium alloy. Its centre is the **eye**, where air enters.
- **Diffuser** — a ring of passages (often vaned) around the impeller.
- **Volute (scroll) casing** — collects the air and leads it to the delivery.

![Centrifugal compressor](diagram:centrifugal-sketch)`,
      },
      {
        id: 'working',
        title: 'Where the pressure rise happens',
        body: md`Air enters the eye **axially**, is turned, and is flung **outward** by the rotating vanes (§26.5.2). In the **impeller**, both the velocity and the static pressure of the air rise — the pressure because of the centrifugal action and the diffusing passages between the vanes. In the **diffuser**, the high-velocity air is slowed down and its kinetic energy becomes further static-pressure rise. The volute collects the flow.

![Pressure and velocity through the stage](diagram:centrifugal-pv)

> [!WARN] "Enters radially"
> Rathore writes that air "enters the impeller radially". In velocity-triangle language this means the absolute velocity at inlet has **no whirl component** ($\alpha_1 = 90°$, $V_{w1} = 0$), not that the air physically arrives from the side. Physically it enters the eye axially and leaves the impeller tip radially.

**Diffuser** (§26.5.11). With a radial-vane impeller, the diffuser contributes about **half** of the overall static pressure rise. Vaned diffusers use curved vanes approximating a logarithmic spiral; the small gap between impeller tip and diffuser vanes acts as a vaneless diffuser that smooths the velocity variation and reduces the incidence at the vane tips.`,
      },
      {
        id: 'compare',
        title: 'Reciprocating vs centrifugal (book table, §26.5.13)',
        body: md`| Reciprocating | Centrifugal |
|---|---|
| Greater noise and vibration | Comparatively silent operation |
| Lower mechanical efficiency (sliding parts) | Better mechanical efficiency (no sliding parts) |
| Pressure ratio 5–8 per stage; up to 500 atm with multistaging | Pressure ratio up to about 4 |
| Intermittent, pulsating delivery | Continuous, steady, pulsation-free delivery |
| Small volumes handled | Large volumes handled |
| More maintenance; heavier; low speed | Less maintenance; lighter; high speed |
| Isothermal efficiency is the yardstick | Isentropic efficiency is the yardstick |
| Better for low discharge, high pressure ratio | Better for high discharge, low pressure ratio |

> [!NOTE]
> The book's table also says a centrifugal compressor "is not suitable for multistaging". Industrial practice is different — see *Surging, performance and multistaging* for the supplementary note.`,
      },
    ],
    keyPoints: [
      'Impeller adds kinetic energy and some pressure; the diffuser converts kinetic energy to further pressure.',
      'For radial vanes, roughly half the static pressure rise occurs in the diffuser.',
      'Centrifugal: high flow, moderate ratio (≈ 4 per stage), steady oil-free delivery.',
      'Reciprocating machines are judged by isothermal efficiency; centrifugal machines by isentropic efficiency.',
    ],
    misconceptions: [
      'Believing all the pressure rise happens in the impeller — the diffuser is essential.',
      'Reading "air enters radially" literally; it means zero inlet whirl.',
    ],
    flashcards: [
      { id: 'u2-f1', front: 'Three main parts of a centrifugal compressor?', back: 'Impeller (with eye), diffuser, volute casing.' },
      { id: 'u2-f2', front: 'What does the diffuser do?', back: 'Slows the air leaving the impeller and converts its kinetic energy into static pressure.' },
      { id: 'u2-f3', front: 'Typical pressure ratio of one centrifugal stage (book)?', back: 'About 4 (4–6 for high-capacity machines).' },
    ],
  },
  {
    id: 'u2-velocity',
    unitId: 'u2',
    title: 'Velocity diagrams, Euler work and slip',
    summary: 'Inlet and outlet triangles, Euler work u₂V_w2, slip factor, power input factor and the effect of vane shape.',
    syllabusPhrases: ['Velocity diagrams'],
    coverage: 'full',
    refs: [{ chapter: 26, section: '§26.5.3, §26.5.6, §26.5.8–26.5.10', pages: '898–903' }],
    diagrams: ['velocity-triangles', 'blade-shapes'],
    sections: [
      {
        id: 'notation',
        title: 'The velocity triangles',
        body: md`At inlet (radius $r_1$) and outlet (radius $r_2$) of the impeller (§26.5.3):

| Symbol | Meaning |
|---|---|
| $u$ | blade (peripheral) speed $= \pi D N / 60$ |
| $V$ | absolute velocity of air |
| $V_r$ | velocity relative to the blade |
| $V_w$ | whirl (tangential) component of $V$ |
| $V_f$ | flow (radial) component of $V$ |
| $\alpha$ | angle of $V$; $\beta$ (book: $\theta$, $\phi$) blade angle |

$\vec V = \vec u + \vec V_r$ at each edge. Blades are shaped so that air enters and leaves the vanes **without shock**, i.e. $V_r$ lies along the blade at both edges.

With **no prewhirl** ($V_{w1} = 0$), the inlet triangle is right-angled and $V_1 = V_{f1}$.

> [!NOTE] Angle convention
> In Rathore's examples the blade angles are measured from the **tangential** direction, so $\tan\beta_1 = V_{f1}/u_1$ at inlet.`,
      },
      {
        id: 'euler',
        title: 'Euler work',
        body: md`Applying the moment-of-momentum equation to the impeller, the work done on each kg of air is

$$w = u_2V_{w2} - u_1V_{w1}$$

and with radial entry ($V_{w1} = 0$)

$$\boxed{w = u_2V_{w2}}\qquad P = \dot m\,u_2V_{w2}$$

This is **Euler's equation** (Eq. 26.6). From the steady-flow energy equation with $q = 0$, the same work appears as a rise in stagnation enthalpy: $w = h_{02} - h_{01} = c_p(T_{02}-T_{01})$.

**Combined velocity diagram** (§26.5.6). With equal flow velocity at inlet and outlet, both triangles can be drawn on a common height $V_f$, which is the construction the book uses for graphical solutions.

**Ideal radial vanes** (Fig. 26.11): the outlet relative velocity is purely radial, so $V_{w2} = u_2$ and the maximum possible work is $w = u_2^2$.

![Velocity triangle explorer](diagram:velocity-triangles)`,
      },
      {
        id: 'slip',
        title: 'Slip, slip factor and power input factor',
        body: md`> [!DEF] Slip and slip factor (§26.5.8)
> Inertia of the air in the passage (a relative eddy) means the air leaves with less whirl than the vane angle implies. For radial vanes, **slip** $= u_2 - V_{w2}$ and the **slip factor**
> $$\sigma = \frac{V_{w2}}{u_2}$$
> Typical values are about 0.9.

> [!DEF] Work factor / power input factor (§26.5.9)
> Friction and windage (disc friction) mean the shaft must supply more than the Euler work:
> $$\psi = \frac{\text{actual work input}}{\text{Euler work}}, \qquad w_{\text{actual}} = \psi\,\sigma\,u_2^2$$
> Typical $\psi \approx 1.035$–$1.04$.

> [!DEF] Pressure coefficient
> $$\phi_p = \frac{\text{isentropic work}}{\text{Euler work}} = \frac{c_p(T_{02s}-T_{01})}{u_2V_{w2}}$$

So for radial vanes the stagnation temperature rise is $T_{02} - T_{01} = \psi\sigma u_2^2/c_p$.`,
      },
      {
        id: 'blades',
        title: 'Effect of vane shape (§26.5.10)',
        body: md`Three outlet vane shapes, by outlet angle $\theta$ measured from the tangent:

| Shape | Angle | Head vs flow |
|---|---|---|
| Backward-curved | $\theta < 90°$ | head **falls** as flow rises — stable |
| Radial | $\theta = 90°$ | head roughly **constant** |
| Forward-curved | $\theta > 90°$ | head **rises** with flow — unstable |

![Vane shape characteristics](diagram:blade-shapes)

Backward vanes are normally used with $\theta \approx 20°$–$25°$ except where a high head is needed. **Radial vanes are the most common** in centrifugal compressors because:
1. the geometry is simple and easy to manufacture;
2. they have the lowest bending stress for a given diameter and speed (centrifugal force acts along the vane);
3. they give a constant pressure head in both impeller and diffuser;
4. they combine good efficiency with a high pressure head.`,
      },
    ],
    keyPoints: [
      'Euler work: w = u₂V_w2 − u₁V_w1 = u₂V_w2 with no prewhirl.',
      'Ideal radial vanes: V_w2 = u₂, so w_max = u₂².',
      'Slip factor σ = V_w2/u₂ (≈ 0.9); power input factor ψ ≈ 1.04.',
      'Actual work = ψσu₂² = c_p(T₀₂ − T₀₁).',
      'Backward vanes → stable falling characteristic; radial vanes most common (low bending stress).',
    ],
    misconceptions: [
      'Including u₁V_w1 when the problem says "radial entry" or "no prewhirl" — it is zero.',
      'Measuring blade angles from the radial direction when the book measures from the tangent.',
      'Treating slip as a loss of energy. It reduces the work the impeller can transfer; it is not a frictional loss.',
    ],
    flashcards: [
      { id: 'u2-f4', front: "Euler's work equation for a centrifugal compressor with radial entry?", back: 'w = u₂ V_w2 (J/kg)' },
      { id: 'u2-f5', front: 'Define slip factor.', back: 'σ = V_w2 / u₂ — ratio of actual outlet whirl to blade tip speed (radial vanes).' },
      { id: 'u2-f6', front: 'Define power input factor (work factor).', back: 'ψ = actual work input / Euler work; accounts for disc friction and windage.' },
      { id: 'u2-f7', front: 'Why are radial vanes most common?', back: 'Simple to make, lowest bending stress, constant head, good efficiency with high head.' },
    ],
  },
  {
    id: 'u2-efficiency',
    unitId: 'u2',
    title: 'Stage efficiency, degree of reaction and pressure rise',
    summary: 'Isentropic efficiency on stagnation states, degree of reaction, choice of reaction and the stage pressure ratio.',
    syllabusPhrases: ['efficiency of compressor stage', 'choice of reaction', 'stage pressure rise'],
    coverage: 'partial',
    coverageNote: 'Efficiency, reaction and pressure rise are covered; the "choice of reaction" discussion is brief in the book and is expanded here as supplementary material.',
    refs: [{ chapter: 26, section: '§26.5.4–26.5.5, §26.5.7, §26.5.9', pages: '900–902' }],
    diagrams: ['centrifugal-ts'],
    sections: [
      {
        id: 'eff',
        title: 'Isentropic (stage) efficiency',
        body: md`Friction between air layers and the vanes, shock at entry and turbulence (§26.5.7) all raise the air's enthalpy **without** raising its pressure. No cooling is provided, so the ideal process is **isentropic**, and the stage is judged by

$$\boxed{\eta_{\text{isen}} = \frac{h_{02s}-h_{01}}{h_{02}-h_{01}} = \frac{T_{02s}-T_{01}}{T_{02}-T_{01}}}, \qquad \frac{T_{02s}}{T_{01}} = \left(\frac{p_{02}}{p_{01}}\right)^{\frac{\gamma-1}{\gamma}}$$

Stagnation (total) states are used because the air carries significant kinetic energy at inlet and outlet: $T_0 = T + V^2/2c_p$ and $p_0/p = (T_0/T)^{\gamma/(\gamma-1)}$. If the inlet and outlet velocities are equal, static temperatures may be used instead (Eq. 26.24).

![Actual vs isentropic compression](diagram:centrifugal-ts)

The extra area under the actual line represents the **increase in work due to irreversibilities**, and the entropy rise $\Delta s = c_p\ln\frac{T_2}{T_1} - R\ln\frac{p_2}{p_1}$ is positive.`,
      },
      {
        id: 'reaction',
        title: 'Degree of reaction',
        body: md`> [!DEF] Degree of reaction (§26.5.5)
> $$R_d = \frac{\text{pressure rise in the impeller}}{\text{total pressure rise in the stage}}$$

The impeller's share comes from centrifugal action ($u_2^2 - u_1^2$) and diffusion of the relative velocity ($V_{r1}^2 - V_{r2}^2$), while the total equals the work input $u_2V_{w2}$:

$$R_d = \frac{(u_2^2-u_1^2) + (V_{r1}^2-V_{r2}^2)}{2\,u_2V_{w2}}$$

For radial entry and equal flow velocities ($V_{f1} = V_{f2}$) this simplifies to

$$\boxed{R_d = 1 - \frac{V_{w2}}{2u_2}}$$

With ideal radial vanes ($V_{w2} = u_2$), $R_d = 0.5$: the impeller and diffuser each give half of the pressure rise — consistent with the book's remark in §26.5.11.`,
      },
      {
        id: 'choice',
        title: 'Choice of reaction',
        supplementary: true,
        body: md`> [!SUPP] Choice of reaction
> Rathore defines the degree of reaction but does not discuss how it is chosen. The following is standard turbomachinery reasoning, consistent with the book's formulae.

Since $R_d = 1 - V_{w2}/2u_2$, the reaction is set by the **outlet whirl**, i.e. by the vane outlet angle and slip:

- **Backward-curved vanes** give less whirl → $R_d > 0.5$. More of the pressure rise happens in the impeller, the air leaves with less kinetic energy, and the diffuser has an easier job. Efficiency and stability are better, at the cost of less work (pressure rise) per stage for the same tip speed.
- **Radial vanes** → $R_d \approx 0.5$ (slightly above with slip). A compromise between pressure rise per stage and efficiency; also the best choice mechanically at high tip speed.
- **Forward-curved vanes** give more whirl → $R_d < 0.5$. The diffuser must recover a large kinetic energy, which is lossy; the rising head–flow curve is prone to instability (surge).

In short: **high reaction → efficiency and stable operation; low reaction → more pressure rise per stage but harder diffusion.** This is why industrial compressors favour backward-swept impellers and why high-speed aero-engine designs historically used radial vanes.`,
      },
      {
        id: 'pressure-rise',
        title: 'Stage pressure rise',
        body: md`Combine the actual work with the efficiency:

$$c_p(T_{02}-T_{01}) = \psi\sigma u_2^2 \;\Rightarrow\; T_{02s}-T_{01} = \eta_{\text{isen}}\,\frac{\psi\sigma u_2^2}{c_p}$$

$$\boxed{\frac{p_{02}}{p_{01}} = \left[1 + \frac{\eta_{\text{isen}}\,\psi\,\sigma\,u_2^2}{c_pT_{01}}\right]^{\frac{\gamma}{\gamma-1}}}$$

The pressure ratio rises steeply with **tip speed** — but tip speed is limited by the stress in the impeller (about 450–500 m/s for aluminium alloys), which caps one stage at a ratio of about 4.`,
      },
    ],
    keyPoints: [
      'Stage efficiency η = (T₀₂s − T₀₁)/(T₀₂ − T₀₁), using stagnation states.',
      'Degree of reaction = impeller pressure rise ÷ stage pressure rise = 1 − V_w2/(2u₂) for radial entry, equal V_f.',
      'Radial vanes, no slip → R_d = 0.5.',
      'p₀₂/p₀₁ = [1 + ηψσu₂²/(c_pT₀₁)]^(γ/(γ−1)); pressure ratio is limited by tip speed.',
    ],
    misconceptions: [
      'Using static temperatures with a stagnation pressure ratio — keep states consistent.',
      'Taking the isentropic efficiency as actual ÷ ideal; for a compressor it is ideal ÷ actual work.',
    ],
    flashcards: [
      { id: 'u2-f8', front: 'Isentropic efficiency of a centrifugal compressor?', back: 'η = (T₀₂s − T₀₁)/(T₀₂ − T₀₁)' },
      { id: 'u2-f9', front: 'Degree of reaction for radial entry and constant flow velocity?', back: 'R_d = 1 − V_w2/(2u₂); = 0.5 for ideal radial vanes.' },
      { id: 'u2-f10', front: 'Stage stagnation pressure ratio in terms of tip speed?', back: 'p₀₂/p₀₁ = [1 + ηψσu₂²/(c_pT₀₁)]^(γ/(γ−1))' },
    ],
  },
  {
    id: 'u2-surging',
    unitId: 'u2',
    title: 'Surging, choking, performance and multistaging',
    summary: 'The constant-speed characteristic, why flow breaks down at the surge point, choking, and multistage centrifugal machines.',
    syllabusPhrases: ['surging', 'multi-stage compressor', 'compressor performance'],
    coverage: 'partial',
    coverageNote: 'Surging and choking are covered in detail (§26.5.12). Multistage centrifugal compressors and full performance maps are not treated; supplementary notes are added and labelled.',
    refs: [{ chapter: 26, section: '§26.5.12', pages: '903–904' }],
    diagrams: ['comp-characteristic'],
    sections: [
      {
        id: 'characteristic',
        title: 'The constant-speed characteristic',
        body: md`At a fixed speed, a centrifugal compressor's delivery pressure ratio depends on the mass flow drawn from it (Fig. 26.15). Starting at high flow and gradually closing the delivery valve:

- **A → B → C → D**: flow falls and pressure ratio rises — stable operation.
- **D**: maximum pressure ratio.
- **D → E**: flow and pressure ratio *both* fall — **unstable**.

![Characteristic with surge and choke](diagram:comp-characteristic)`,
      },
      {
        id: 'surging',
        title: 'Surging',
        body: md`> [!DEF] Surging (pumping)
> Unstable, cyclic breakdown and reversal of flow that occurs when a compressor is throttled to the left of the peak of its characteristic.

**Mechanism** (§26.5.12). Beyond D, a further fall in flow *lowers* the pressure the compressor can produce. The downstream line is now at a higher pressure than the compressor delivers, so flow stops and may even reverse. Pressure downstream then falls, the compressor recovers and delivers again, the pressure rebuilds, and the cycle repeats at high frequency.

**Effects of surging:**
- rapid flow and pressure oscillations causing process instabilities;
- rising temperatures inside the compressor;
- tripping of the compressor;
- mechanical damage — radial bearing load in the initial phase, thrust-bearing load from loading and unloading, seal rubbing, and contact between stationary and rotating parts if the thrust bearing is overloaded.

The **surge line** joins the peaks of the characteristics at different speeds; operation must stay to its right.`,
      },
      {
        id: 'choking',
        title: 'Choking',
        body: md`> [!DEF] Choking
> The maximum mass flow a compressor can pass at a given speed (point A).

As the pressure ratio is lowered, the flow increases, the density of the compressed air falls and the radial velocity rises. Absolute velocity at the impeller exit and the incidence angle at the diffuser vane tips grow, until somewhere in the machine the flow reaches sonic velocity. Beyond this **choking point** no further increase in mass flow is possible, however low the delivery pressure.`,
      },
      {
        id: 'multistage',
        title: 'Multistage centrifugal compressors',
        supplementary: true,
        body: md`> [!SUPP] Not covered in Rathore
> The book lists centrifugal compressors as "not suitable for multistaging" (§26.5.13). In practice multistage centrifugal compressors are widely used; this note fills the syllabus requirement.

When a pressure ratio above about 4 is needed, several impellers are placed **in series on one shaft**. After each impeller's diffuser, a **return channel** with de-swirl vanes guides the air back inwards to the eye of the next impeller.

- **Intercooling** between groups of stages (external coolers) brings the compression closer to isothermal and reduces work — the same idea as in Unit 1.
- Later stages handle denser air, so their impellers are **narrower** (smaller blade width at the same diameter).
- Overall pressure ratio is the **product** of stage ratios; with equal stage temperature rise $\Delta T_0$, the stage pressure ratio falls slightly from stage to stage because $T_{01}$ increases.
- Typical uses: process gas compression, refrigeration plants, pipeline boosters, large plant-air systems. **Integrally geared** designs drive several impellers at different optimum speeds from one bull gear.

Each extra stage adds flow-path losses, and the surge margin of the whole machine is set by the stage that surges first — so staging requires careful matching.`,
      },
      {
        id: 'performance',
        title: 'Compressor performance map',
        supplementary: true,
        body: md`> [!SUPP] Extends Fig. 26.15
> The book shows a single constant-speed curve. Real performance is presented as a **map**.

A compressor map plots pressure ratio against (non-dimensional) mass flow $\dot m\sqrt{T_{01}}/p_{01}$ for several non-dimensional speeds $N/\sqrt{T_{01}}$:

- a family of **constant-speed lines**, each with its own surge and choke points;
- **efficiency islands** — contours of constant isentropic efficiency, peaking near the middle of the map;
- the **surge line** joining the left-hand limits, and the **choke** limit on the right.

The **operating point** is where the map meets the resistance curve of the system being supplied. Control by speed variation, inlet guide vanes or a blow-off/recycle valve keeps the operating point away from surge. Using non-dimensional groups makes one map valid at any inlet condition.`,
      },
    ],
    keyPoints: [
      'Surging: flow breakdown/reversal when operating left of the peak (D) of the characteristic.',
      'Choking: maximum mass flow at a given speed — sonic velocity reached somewhere in the passage.',
      'Surging causes pressure oscillation, heating, tripping and bearing/seal damage.',
      'Multistage centrifugal compressors use return channels between impellers; intercooling saves work. (Supplementary.)',
      'Performance maps: pressure ratio vs corrected flow at several corrected speeds, with efficiency islands. (Supplementary.)',
    ],
    misconceptions: [
      'Thinking choking is a dangerous instability like surging. Choking simply caps flow; surging is the unstable one.',
      'Assuming throttling always raises delivery pressure. Past the peak it lowers it — that is where surge begins.',
    ],
    flashcards: [
      { id: 'u2-f11', front: 'Define surging.', back: 'Unstable cyclic flow breakdown and reversal when a compressor operates left of the peak of its constant-speed characteristic.' },
      { id: 'u2-f12', front: 'Define choking.', back: 'Maximum mass flow at a given speed; further pressure reduction cannot increase flow (sonic condition).' },
      { id: 'u2-f13', front: 'Four consequences of surging?', back: 'Pressure/flow oscillation, temperature rise, tripping, mechanical damage (bearings, seals, rubbing).' },
    ],
  },
  {
    id: 'u2-vacuum',
    unitId: 'u2',
    title: 'Vacuum pump',
    summary: 'A compressor whose suction is below atmospheric — working principle, types, and what limits the ultimate vacuum.',
    syllabusPhrases: ['vacuum pump'],
    coverage: 'missing',
    coverageNote: 'Rathore mentions vacuum pumps only in passing (p 891). Everything in this topic is supplementary.',
    refs: [{ chapter: 26, section: '§26.1 (mention)', pages: '891' }],
    sections: [
      {
        id: 'principle',
        title: 'A compressor working below atmosphere',
        supplementary: true,
        body: md`> [!SUPP] Not in Rathore
> This topic is written to complete the syllabus. It applies the compressor theory of Units 1 and 2.

A **vacuum pump** removes gas from a closed space to maintain a pressure **below atmospheric**. Thermodynamically it is a compressor whose **suction** is at the vessel pressure $p_v$ and whose **delivery** is to atmosphere:

$$\text{pressure ratio} = \frac{p_{\text{atm}}}{p_v}$$

So a pump holding 0.1 bar absolute works against a pressure ratio of 10 — the same as a 1 → 10 bar compressor, though it handles a far smaller mass because the suction density is low.

**Applications:** steam-turbine condensers (removing air), vacuum distillation and drying, vacuum packaging, vacuum brakes, milking machines, laboratory and semiconductor processes.`,
      },
      {
        id: 'types',
        title: 'Types',
        supplementary: true,
        body: md`| Type | Principle | Typical ultimate pressure |
|---|---|---|
| Reciprocating piston | As in Unit 1, with suction from the vessel | ~ 10–20 mbar (one stage) |
| Rotary vane (oil-sealed) | Sliding vanes in an eccentric rotor, sealed by oil | ~ 10⁻³ mbar (two stage) |
| Liquid ring | Water ring in an eccentric casing forms the pockets; tolerates vapour | ~ 30 mbar |
| Roots blower (booster) | Two lobed rotors; used ahead of a backing pump | boosts speed in 10⁻³–10 mbar range |
| Steam ejector | High-velocity steam jet entrains air (no moving parts) | ~ 1–10 mbar with stages |
| Diffusion / turbomolecular | Momentum transfer to molecules; need a backing pump | < 10⁻⁶ mbar |

Low-vacuum duties (condensers, process plant) use liquid-ring or ejector systems; high vacuum needs a backing pump plus a diffusion or turbomolecular stage.`,
      },
      {
        id: 'limit',
        title: 'What limits the vacuum: clearance again',
        supplementary: true,
        body: md`For a reciprocating vacuum pump, Unit 1's clearance analysis gives the answer directly. Delivery is zero when $\eta_{\text{vol}} = 0$:

$$1 + c - c\left(\frac{p_{\text{atm}}}{p_v}\right)^{1/n} = 0 \;\Rightarrow\; p_{v,\min} = p_{\text{atm}}\left(\frac{c}{1+c}\right)^{n}$$

With $c = 3\%$ and $n = 1.3$: $p_{v,\min} = 1.013 \times (0.0291)^{1.3} \approx 0.010$ bar — about 10 mbar. To go lower, pumps are **staged** (exactly like multistage compressors) or use designs with near-zero clearance (oil-sealed rotary vane).

> [!EXAM] Linking question
> "Why can a single-stage reciprocating vacuum pump not reach a perfect vacuum?" — because the gas trapped in the clearance re-expands to the suction pressure; at the limiting pressure ratio it fills the whole stroke and no fresh gas enters.`,
      },
    ],
    keyPoints: [
      'A vacuum pump is a compressor with suction below atmospheric and delivery to atmosphere. (Supplementary.)',
      'Pressure ratio = p_atm / p_vessel — can be large even though the mass handled is small.',
      'Reciprocating pump ultimate vacuum: p_min = p_atm (c/(1+c))ⁿ, from η_vol = 0.',
      'Types: reciprocating, rotary vane, liquid ring, roots booster, ejector, diffusion/turbomolecular.',
    ],
    flashcards: [
      { id: 'u2-f14', front: 'What sets the ultimate vacuum of a single-stage reciprocating vacuum pump?', back: 'Clearance re-expansion: p_min = p_atm (c/(1+c))ⁿ where η_vol → 0.' },
      { id: 'u2-f15', front: 'Name four types of vacuum pump.', back: 'Reciprocating, rotary vane, liquid ring, steam ejector (also roots booster, diffusion, turbomolecular).' },
    ],
  },
]

/* ----------------------------------------------------------------------------- */

export const examples: WorkedExample[] = [
  {
    id: 'ex-26-6',
    topicId: 'u2-efficiency',
    title: 'Efficiency, power and entropy change',
    source: { kind: 'textbook', ref: 'Example 26.6', page: 905 },
    difficulty: 1,
    statement: md`A centrifugal compressor compresses air from 1 bar at 15 °C to 2.15 bar, 95 °C. The mass of air delivered is 2.2 kg/s and no heat is added to the air from external sources during compression. Find the efficiency of the compressor relative to ideal adiabatic compression and estimate the power absorbed. Also, find the change in entropy of air during compression.`,
    given: ['p₁ = 1 bar, T₁ = 288 K; p₂ = 2.15 bar, T₂ = 368 K', 'ṁ = 2.2 kg/s; adiabatic'],
    find: ['Isentropic efficiency', 'Power absorbed', 'Entropy change'],
    approach: md`$T_{2s} = T_1(p_2/p_1)^{(\gamma-1)/\gamma}$; $\eta = (T_{2s}-T_1)/(T_2-T_1)$. The power absorbed uses the **actual** temperature rise.`,
    steps: [
      { label: 'Isentropic delivery temperature', work: md`$T_{2s} = 288(2.15)^{0.2857} = 358.4\ \text{K}$` },
      { label: 'Efficiency', work: md`$\eta = \dfrac{358.4-288}{368-288} = \dfrac{70.4}{80} = 0.880 = 88.0\%$` },
      { label: 'Power absorbed', work: md`$P = \dot m c_p(T_2-T_1) = 2.2(1.005)(80) = 176.9\ \text{kW}$` },
      { label: 'Entropy change', work: md`$\Delta \dot S = \dot m\left[c_p\ln\frac{368}{288} - R\ln 2.15\right] = 2.2[0.2463 - 0.2197] = 0.0586\ \text{kW/K}$` },
    ],
    answer: md`η = 88.0 %, P = 176.9 kW, ΔṠ = 0.0586 kW/K`,
    concept: 'Irreversibility shows up as extra temperature rise and a positive entropy change in an adiabatic compressor.',
    checkNote: md`> [!ERRATA] Three slips in the printed solution
> 1. The book prints η = "0.880 or 80 %": 0.880 is **88 %**.
> 2. It computes power with the isentropic temperature rise (≈ 155.7 kW). The power **absorbed** uses the actual rise: **176.9 kW**.
> 3. It gives the entropy change as 0.586 kJ/K. With ṁ = 2.2 kg/s the rate is **0.0586 kW/K** (0.0266 kJ/kg·K).`,
  },
  {
    id: 'ex-26-7',
    topicId: 'u2-velocity',
    title: 'Work and degree of reaction from blade angles',
    source: { kind: 'textbook', ref: 'Example 26.7', page: 906 },
    difficulty: 2,
    statement: md`A centrifugal compressor running at 2000 rpm has internal and external diameters of the impeller as 300 mm and 500 mm, respectively. The blade angles at inlet and outlet are 22° and 40° respectively. The air enters the impeller radially. Determine the work done by the compressor per kg of air and degree of reaction.`,
    given: ['N = 2000 rpm, D₁ = 0.3 m, D₂ = 0.5 m', 'β₁ = 22°, β₂ = 40° (from tangent)', 'Radial entry: V_w1 = 0; assume V_f1 = V_f2'],
    find: ['Work per kg', 'Degree of reaction'],
    approach: md`Inlet triangle gives $V_f$; the outlet triangle gives $V_{w2} = u_2 - V_f/\tan\beta_2$. Then $w = u_2V_{w2}$ and $R_d = 1 - V_{w2}/2u_2$.`,
    steps: [
      { label: 'Blade speeds', work: md`$u_1 = \pi(0.3)(2000)/60 = 31.42$ m/s; $u_2 = 52.36$ m/s` },
      { label: 'Flow velocity', work: md`$V_f = u_1\tan 22° = 12.69$ m/s` },
      { label: 'Outlet whirl', work: md`$V_{w2} = u_2 - \dfrac{V_f}{\tan 40°} = 52.36 - 15.13 = 37.23$ m/s` },
      { label: 'Work', work: md`$w = u_2V_{w2} = 52.36 \times 37.23 = 1949.5\ \text{J/kg} \approx 1.95\ \text{kJ/kg}$` },
      { label: 'Degree of reaction', work: md`$R_d = 1 - \dfrac{37.23}{2(52.36)} = 0.644 = 64.4\%$ (the full relative-velocity formula gives the same value)` },
    ],
    answer: md`w ≈ 1.95 kJ/kg, R<sub>d</sub> ≈ 64.4 %`,
    concept: 'Backward-curved outlet vanes (40° < 90°) reduce whirl and give reaction above 0.5.',
    checkNote: 'The book solves this graphically from the combined velocity diagram: Vw2 = 37.3 m/s, w = 1.953 kJ/kg, R = 64.55 %. The analytical values above differ only in the third figure.',
  },
  {
    id: 'ex-26-10',
    topicId: 'u2-efficiency',
    title: 'Tip diameter, power and eye diameter',
    source: { kind: 'textbook', ref: 'Example 26.10', page: 908 },
    difficulty: 3,
    statement: md`A centrifugal compressor handles 600 kg/min of air. The ambient air conditions are 1 bar and 27 °C. The compressor runs at 18000 rpm with an isentropic efficiency of 80 %. The air is compressed in the compressor from 1 bar static pressure to 4 bar total pressure. The air enters the impeller eye with a velocity of 150 m/s with no prewhirl. Take the ratio of whirl speed to tip speed as 0.9. Calculate (a) rise in total temperature during compression if change in kinetic energy is negligible, (b) tip diameter of impeller, (c) power required, (d) eye diameter, if hub diameter is 10 cm.`,
    given: ['ṁ = 10 kg/s, N = 18000 rpm, η = 0.8', 'Eye static: 1 bar, 300 K; V₁ = 150 m/s axial', 'p₀₂ = 4 bar; σ = V_w2/u₂ = 0.9; hub d = 0.1 m'],
    find: ['ΔT₀', 'Tip diameter D₂', 'Power', 'Eye diameter'],
    approach: md`Convert the eye static state to stagnation, apply the isentropic efficiency on stagnation temperatures, then $c_p\Delta T_0 = \sigma u_2^2$.`,
    steps: [
      { label: 'Inlet stagnation state', work: md`$T_{01} = 300 + \dfrac{150^2}{2(1005)} = 311.19$ K; $p_{01} = 1\left(\dfrac{311.19}{300}\right)^{3.5} = 1.137$ bar` },
      { label: '(a) Total temperature rise', work: md`$T_{02s} - T_{01} = 311.19\left[(4/1.137)^{0.2857}-1\right] = 134.6$ K; $\Delta T_0 = 134.6/0.8 = 168.25$ K` },
      { label: '(b) Tip speed and diameter', work: md`$w = 1.005(168.25) = 169.1$ kJ/kg $= 0.9u_2^2 \Rightarrow u_2 = 433.5$ m/s; $D_2 = \dfrac{60u_2}{\pi N} = 0.460$ m` },
      { label: '(c) Power', work: md`$P = \dot m w = 10 \times 169.1 = 1691$ kW` },
      { label: '(d) Eye diameter', work: md`$\rho_1 = \dfrac{100}{0.287 \times 300} = 1.161$ kg/m³; $A = \dfrac{10}{1.161 \times 150} = 0.0574$ m²; $\dfrac{\pi}{4}(D_e^2 - 0.1^2) = 0.0574 \Rightarrow D_e = 0.288$ m` },
    ],
    answer: md`(a) 168.25 K (b) 460 mm (c) 1691 kW (d) 288 mm`,
    concept: 'Stage temperature rise is fixed by tip speed and slip; the efficiency then decides how much of it becomes pressure.',
    checkNote: 'Follows the book in treating 1 bar, 27 °C as the static state at the eye (so T₀₁ = 311.19 K, p₀₁ = 1.137 bar). The book obtains the same ΔT₀ = 168.25 K.',
  },
  {
    id: 'gen-u2-1',
    topicId: 'u2-efficiency',
    title: 'Stage pressure ratio from tip speed',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`A radial-vaned centrifugal compressor has an impeller tip speed of 400 m/s, slip factor 0.9, power input factor 1.04 and isentropic efficiency 80 %. Air enters at $T_{01} = 288$ K with no prewhirl. Find the stagnation temperature rise, the stagnation pressure ratio and the power for 1 kg/s.`,
    given: ['u₂ = 400 m/s, σ = 0.9, ψ = 1.04, η = 0.8, T₀₁ = 288 K'],
    find: ['ΔT₀', 'p₀₂/p₀₁', 'Power per kg/s'],
    approach: md`$c_p\Delta T_0 = \psi\sigma u_2^2$; $p_{02}/p_{01} = [1 + \eta\Delta T_0/T_{01}]^{3.5}$.`,
    steps: [
      { label: 'Temperature rise', work: md`$\Delta T_0 = \dfrac{1.04 \times 0.9 \times 400^2}{1005} = 149.0$ K` },
      { label: 'Pressure ratio', work: md`$\dfrac{p_{02}}{p_{01}} = \left[1 + \dfrac{0.8 \times 149.0}{288}\right]^{3.5} = (1.4139)^{3.5} = 3.36$` },
      { label: 'Power', work: md`$P = \psi\sigma u_2^2 = 149.8$ kW per kg/s` },
    ],
    answer: md`ΔT₀ = 149 K, pressure ratio ≈ 3.36, 149.8 kW per kg/s`,
    concept: 'Even at 400 m/s tip speed one stage gives only about 3.4 — the reason for multistaging.',
  },
]

/* ----------------------------------------------------------------------------- */

export const questions: Question[] = [
  {
    id: 'q-u2-1', topicId: 'u2-velocity', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'For a centrifugal compressor with radial entry, the work done per kg of air is:',
    options: ['u₁V_w1', 'u₂V_w2', 'u₂V_w2 − u₁V_w1 with V_w2 = 0', 'V_f2 · u₂'],
    answer: 1,
    solution: md`Radial entry (no prewhirl) makes $V_{w1} = 0$, so Euler's equation reduces to $w = u_2V_{w2}$.`,
  },
  {
    id: 'q-u2-2', topicId: 'u2-velocity', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Slip factor in a radial-vaned centrifugal compressor is defined as:',
    options: ['u₂ / V_w2', 'V_w2 / u₂', '(u₂ − V_w2) / u₂', 'actual work / Euler work'],
    answer: 1,
    solution: md`$\sigma = V_{w2}/u_2$. Option C is (slip ÷ tip speed) = $1 - \sigma$; option D is the power input factor.`,
  },
  {
    id: 'q-u2-3', topicId: 'u2-velocity', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Which impeller vane shape gives a stable (falling) head–flow characteristic?',
    options: ['Forward-curved', 'Radial', 'Backward-curved', 'All are equally stable'],
    answer: 2,
    solution: md`Backward-curved vanes reduce whirl as flow increases, so head falls with flow — the stable shape. Forward-curved vanes give a rising curve that invites surge.`,
  },
  {
    id: 'q-u2-4', topicId: 'u2-surging', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Surging in a centrifugal compressor occurs when it operates:',
    options: ['At maximum mass flow', 'To the left of the peak of its constant-speed characteristic', 'At the design point', 'With zero slip'],
    answer: 1,
    solution: md`Left of the peak, a drop in flow lowers the pressure the machine can produce; the downstream pressure exceeds delivery pressure and flow breaks down cyclically.`,
  },
  {
    id: 'q-u2-5', topicId: 'u2-efficiency', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'For ideal radial vanes with radial entry and equal flow velocities, the degree of reaction is:',
    options: ['0', '0.25', '0.5', '1'],
    answer: 2,
    solution: md`$R_d = 1 - V_{w2}/2u_2$ and $V_{w2} = u_2$ for ideal radial vanes, so $R_d = 0.5$.`,
  },
  {
    id: 'q-u2-6', topicId: 'u2-surging', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Choking of a centrifugal compressor refers to:',
    options: ['Reverse flow at low mass flow', 'The maximum mass flow it can pass at a given speed', 'Blockage of the eye by dirt', 'Vibration of the impeller'],
    answer: 1,
    solution: md`At choke the flow reaches sonic velocity somewhere in the passage; lowering delivery pressure further cannot increase flow.`,
  },
  {
    id: 'q-u2-7', topicId: 'u2-vacuum', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'A single-stage reciprocating vacuum pump with clearance ratio c and index n cannot go below:',
    options: ['p_atm · c', 'p_atm (c/(1+c))ⁿ', 'p_atm / (1 + c)', 'zero'],
    answer: 1,
    solution: md`Delivery stops when $\eta_{\text{vol}} = 1 + c - c(p_{\text{atm}}/p_v)^{1/n} = 0$, giving $p_v = p_{\text{atm}}(c/(1+c))^n$. (Supplementary topic.)`,
  },
  {
    id: 'q-u2-8', topicId: 'u2-velocity', type: 'conceptual', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 26 Review Questions', page: 921 },
    prompt: 'Discuss the effect of impeller blade shape on the performance of a centrifugal compressor.',
    hints: ['Compare head–flow curves.', 'Which shape has the lowest bending stress?'],
    solution: md`Backward-curved vanes ($\theta < 90°$): head falls with flow — stable, efficient, used with $\theta \approx 20$–$25°$. Radial vanes ($\theta = 90°$): head about constant; simplest to make, lowest bending stress because centrifugal force acts along the vane, good efficiency with high head — hence the most common. Forward-curved vanes ($\theta > 90°$): head rises with flow — more work per stage but unstable and harder to diffuse.`,
  },
  {
    id: 'q-u2-9', topicId: 'u2-velocity', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 26 Review Questions', page: 921 },
    prompt: 'Define slip, slip factor and pressure coefficient.',
    solution: md`**Slip** = $u_2 - V_{w2}$ (blade tip speed minus actual outlet whirl). **Slip factor** $\sigma = V_{w2}/u_2$. **Pressure coefficient** $\phi_p$ = isentropic work ÷ Euler work = $c_p(T_{02s}-T_{01})/u_2V_{w2}$.`,
  },
  {
    id: 'q-u2-10', topicId: 'u2-surging', type: 'long', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 26 Review Questions', page: 921 },
    prompt: 'Explain the phenomenon of surging and its effects in the compressor.',
    hints: ['Use the constant-speed characteristic A–B–C–D–E.'],
    solution: md`Throttling the delivery moves the operating point left along the characteristic: flow falls, pressure ratio rises up to the peak D. Throttled further, the machine moves onto D–E, where both flow and pressure fall. The downstream pressure now exceeds what the compressor delivers, so flow stops or reverses; downstream pressure then falls, flow resumes, pressure builds and the cycle repeats rapidly — **surging**.

**Effects:** flow and pressure oscillation and process instability; rising internal temperature; tripping; mechanical damage through radial and thrust bearing loads, seal rubbing and rotor–stator contact.`,
  },
  {
    id: 'q-u2-11', topicId: 'u2-efficiency', type: 'numerical', difficulty: 3, source: { kind: 'textbook', ref: 'Ch 26 Problems', page: 922 },
    prompt: 'A centrifugal compressor handles 16.5 kg/s of air with a total pressure ratio of 4. The speed of the compressor is 15000 rpm. Inlet stagnation temperature is 20 °C, slip factor is 0.9, power input factor is 1.04 and isentropic efficiency is 80 %. Calculate the diameter of the impeller and the power input to the compressor.',
    hints: ['ΔT₀ = T₀₁[(4)^0.2857 − 1]/η.', 'c_pΔT₀ = ψσu₂².'],
    solution: md`$\Delta T_0 = 293[4^{0.2857}-1]/0.8 = 178.0$ K. $w = 1.005 \times 178.0 = 178.9$ kJ/kg $= \psi\sigma u_2^2 \Rightarrow u_2 = 437.2$ m/s. $D_2 = 60u_2/(\pi N) = 0.5566$ m $= 55.7$ cm. $P = 16.5 \times 178.9 = 2951.6$ kW.`,
    bookAnswer: '55.67 cm, 2951.7 kW',
  },
  {
    id: 'q-u2-12', topicId: 'u2-construction', type: 'short', difficulty: 1, source: { kind: 'generated' },
    prompt: 'State four differences between reciprocating and centrifugal compressors.',
    solution: md`Any four from the book's table (§26.5.13): noise/vibration (high vs low); mechanical efficiency (lower vs higher); pressure ratio per stage (5–8 vs about 4); delivery (pulsating vs steady); volume handled (small vs large); speed (low vs high); maintenance and weight (more vs less); yardstick (isothermal vs isentropic efficiency).`,
  },
]

/* ----------------------------------------------------------------------------- */

export const formulas: Formula[] = [
  {
    id: 'f-u2-euler', topicId: 'u2-velocity', name: "Euler's work", important: true,
    latex: md`w = u_2V_{w2} - u_1V_{w1} \;\overset{V_{w1}=0}{=}\; u_2V_{w2}`,
    vars: [
      { sym: 'u', meaning: 'blade speed πDN/60', unit: 'm/s' },
      { sym: 'V_w', meaning: 'whirl component of absolute velocity', unit: 'm/s' },
    ],
    conditions: 'Steady flow; V_w1 = 0 for radial entry (no prewhirl).',
    meaning: 'Work transferred by the impeller per kg of air.',
    ref: { chapter: 26, section: '§26.5.3', pages: '899' },
  },
  {
    id: 'f-u2-actual', topicId: 'u2-velocity', name: 'Actual work with slip and power input factor', important: true,
    latex: md`w = \psi\,\sigma\,u_2^2 = c_p(T_{02}-T_{01})`,
    vars: [
      { sym: '\\sigma', meaning: 'slip factor V_w2/u₂', unit: '—' },
      { sym: '\\psi', meaning: 'power input factor', unit: '—' },
    ],
    conditions: 'Radial vanes, radial entry.',
    meaning: 'Shaft work per kg, including slip and friction/windage.',
    ref: { chapter: 26, section: '§26.5.8–26.5.9', pages: '902' },
  },
  {
    id: 'f-u2-eta', topicId: 'u2-efficiency', name: 'Isentropic (stage) efficiency', important: true,
    latex: md`\eta_{\text{isen}} = \frac{T_{02s}-T_{01}}{T_{02}-T_{01}}, \qquad \frac{T_{02s}}{T_{01}} = \left(\frac{p_{02}}{p_{01}}\right)^{\frac{\gamma-1}{\gamma}}`,
    vars: [{ sym: 'T_0', meaning: 'stagnation temperature', unit: 'K' }],
    conditions: 'Adiabatic machine, constant c_p.',
    meaning: 'Ideal over actual work for the same pressure ratio.',
    ref: { chapter: 26, section: '§26.5.7', pages: '902' },
  },
  {
    id: 'f-u2-stag', topicId: 'u2-efficiency', name: 'Stagnation temperature and pressure',
    latex: md`T_0 = T + \frac{V^2}{2c_p}, \qquad \frac{p_0}{p} = \left(\frac{T_0}{T}\right)^{\frac{\gamma}{\gamma-1}}`,
    vars: [{ sym: 'V', meaning: 'flow velocity', unit: 'm/s' }],
    conditions: 'c_p in J/kg·K when V is in m/s.',
    meaning: 'State the gas would reach if brought to rest isentropically.',
  },
  {
    id: 'f-u2-reaction', topicId: 'u2-efficiency', name: 'Degree of reaction', important: true,
    latex: md`R_d = \frac{(u_2^2-u_1^2)+(V_{r1}^2-V_{r2}^2)}{2u_2V_{w2}} = 1 - \frac{V_{w2}}{2u_2}`,
    vars: [{ sym: 'V_r', meaning: 'relative velocity', unit: 'm/s' }],
    conditions: 'Simplified form: radial entry and V_f1 = V_f2.',
    meaning: 'Share of the stage pressure rise that happens in the impeller.',
    ref: { chapter: 26, section: '§26.5.5', pages: '900' },
  },
  {
    id: 'f-u2-pr', topicId: 'u2-efficiency', name: 'Stage pressure ratio',
    latex: md`\frac{p_{02}}{p_{01}} = \left[1 + \frac{\eta_{\text{isen}}\,\psi\,\sigma\,u_2^2}{c_pT_{01}}\right]^{\frac{\gamma}{\gamma-1}}`,
    vars: [{ sym: 'u_2', meaning: 'tip speed', unit: 'm/s' }],
    conditions: 'Radial vanes; c_p in J/kg·K.',
    meaning: 'Pressure ratio of one stage set by tip speed, slip and efficiency.',
    ref: { chapter: 26, section: '§26.5.9', pages: '902' },
  },
  {
    id: 'f-u2-width', topicId: 'u2-velocity', name: 'Impeller blade width (continuity)',
    latex: md`\dot m = \rho\,\pi D B\,V_f \;\Rightarrow\; B = \frac{\dot m}{\rho\,\pi D\,V_f}`,
    vars: [
      { sym: 'B', meaning: 'blade width at diameter D', unit: 'm' },
      { sym: 'V_f', meaning: 'flow (radial) velocity', unit: 'm/s' },
    ],
    conditions: 'Neglects blade thickness (otherwise use πD − nt).',
    meaning: 'Width needed to pass the mass flow.',
    ref: { chapter: 26, section: '§26.5.4', pages: '900' },
  },
  {
    id: 'f-u2-vacuum', topicId: 'u2-vacuum', name: 'Ultimate vacuum, reciprocating pump',
    latex: md`p_{v,\min} = p_{\text{atm}}\left(\frac{c}{1+c}\right)^{n}`,
    vars: [{ sym: 'c', meaning: 'clearance ratio', unit: '—' }],
    conditions: 'Single stage; supplementary result derived from η_vol = 0.',
    meaning: 'Lowest pressure a single-stage reciprocating vacuum pump can hold.',
  },
]
