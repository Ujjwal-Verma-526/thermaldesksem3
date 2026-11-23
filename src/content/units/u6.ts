import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 6 — Jet Propulsion (Rathore Ch. 28)
 * ========================================================================== */

export const topics: Topic[] = [
  {
    id: 'u6-intro',
    unitId: 'u6',
    title: 'Principles of jet propulsion',
    summary: 'Newton’s third law applied to a gas stream — thrust, thrust power, propulsive, thermal and overall efficiency, and the advantages and disadvantages of jet propulsion.',
    syllabusPhrases: ['Introduction to jet propulsion', 'advantages and disadvantages of jet propulsion'],
    coverage: 'full',
    refs: [{ chapter: 28, section: '§28.1–28.2, §28.8', pages: '963–970' }],
    diagrams: ['propulsive-eff'],
    sections: [
      {
        id: 'principle',
        title: 'The principle (§28.1)',
        body: md`Jet propulsion works by **Newton's second and third laws**: an engine accelerates a mass of fluid rearward, and the equal and opposite reaction pushes the engine forward.

The book classifies propulsion devices (§28.1.2):
- **Air-breathing engines** use atmospheric oxygen — *without a compressor*: ramjet, pulsejet, scramjet; *with a compressor*: turbojet, turboprop, turbofan.
- **Rockets** carry both fuel and oxidiser, so they work outside the atmosphere.`,
      },
      {
        id: 'thrust',
        title: 'Thrust and thrust power (§28.8)',
        body: md`For an engine flying at $V_a$ that takes in air at mass flow $\dot m_a$ and ejects it at relative jet velocity $V_j$:

$$\boxed{F = \dot m_a(V_j - V_a)}$$

(more precisely $F = (\dot m_a + \dot m_f)V_j - \dot m_aV_a + A_e(p_e - p_a)$, including fuel mass and any pressure thrust).

- **Thrust power** — the useful rate of work on the aircraft: $TP = F\,V_a$.
- **Propulsive power** — the rate of kinetic energy given to the gas: $\tfrac12\dot m_a(V_j^2 - V_a^2)$.
- **Specific thrust** $F/\dot m_a$ (N per kg/s); **thrust specific fuel consumption** TSFC $= \dot m_f/F$ (kg/N·h).
- **Specific impulse** $I_{sp} = F/(\dot m\,g)$ (seconds).`,
      },
      {
        id: 'efficiency',
        title: 'Propulsive, thermal and overall efficiency',
        body: md`> [!DEF] Propulsive efficiency
> $$\eta_p = \frac{\text{thrust power}}{\text{propulsive power}} = \frac{2V_a}{V_j + V_a} = \frac{2\sigma}{1+\sigma}, \qquad \sigma = \frac{V_a}{V_j}$$

![Propulsive efficiency](diagram:propulsive-eff)

$\eta_p \to 1$ as $V_j \to V_a$ — but then the thrust $\dot m(V_j - V_a) \to 0$. Large thrust at high propulsive efficiency therefore needs a **large mass flow with a small velocity increase**. This single idea explains why propellers and turbofans are efficient at moderate speed, while pure jets suit high speed.

- **Thermal efficiency** $\eta_{th} = \dfrac{\tfrac12\dot m_a(V_j^2 - V_a^2)}{\dot m_f\,CV}$.
- **Overall efficiency** $\eta_o = \eta_p\,\eta_{th} = \dfrac{F\,V_a}{\dot m_f\,CV}$.`,
      },
      {
        id: 'pros-cons',
        title: 'Advantages and disadvantages of jet propulsion',
        body: md`**Advantages** (compared with piston-engine propeller aircraft):
- very high power-to-weight ratio, and thrust that does not fall off with speed as propeller thrust does;
- simple rotating machinery, uniform torque, low vibration, high reliability;
- can fly at much higher speeds and altitudes; less frontal area per unit thrust;
- burns cheap kerosene; no cooling system as complex as a piston engine's.

**Disadvantages:**
- poor propulsive efficiency and **high fuel consumption at low speeds** (take-off, low-speed flight);
- **noise** of the high-velocity jet;
- needs long runways for take-off; slow acceleration from low thrust;
- high cost of materials and manufacture for hot-section parts.

These are drawn from the book's merits and demerits of the turbojet (§28.5) and the jet-vs-propeller discussion; Rathore does not give a single general list.`,
      },
    ],
    keyPoints: [
      'Thrust F = ṁ(V_j − V_a); thrust power = F·V_a.',
      'Propulsive efficiency η_p = 2V_a/(V_j + V_a) — high when jet velocity is close to flight speed.',
      'Large mass flow + small velocity increase = efficient thrust.',
      'Overall efficiency η_o = η_p × η_th = FV_a/(ṁ_f CV).',
      'Air-breathing engines need atmospheric oxygen; rockets carry their own oxidiser.',
    ],
    misconceptions: [
      'Thinking a jet "pushes against the air behind it". Thrust is the reaction to accelerating the gas — which is why rockets work in vacuum.',
      'Trying to maximise propulsive efficiency alone. At η_p = 1, thrust is zero.',
    ],
    flashcards: [
      { id: 'u6-f1', front: 'Propulsive efficiency of a jet engine?', back: 'η_p = 2V_a/(V_j + V_a) = 2σ/(1 + σ), σ = V_a/V_j.' },
      { id: 'u6-f2', front: 'Thrust power?', back: 'TP = F × V_a (thrust × flight speed).' },
      { id: 'u6-f3', front: 'Overall efficiency of a jet engine?', back: 'η_o = η_p × η_th = F V_a/(ṁ_f × CV).' },
      { id: 'u6-f4', front: 'Define TSFC.', back: 'Thrust specific fuel consumption = fuel flow ÷ thrust (kg/N·h).' },
    ],
  },
  {
    id: 'u6-turbojet',
    unitId: 'u6',
    title: 'Turbojet engine',
    summary: 'Diffuser, compressor, combustor, turbine and nozzle — the ideal turbojet cycle and its merits and demerits.',
    syllabusPhrases: ['turbojet engine with and without afterburner'],
    coverage: 'full',
    refs: [{ chapter: 28, section: '§28.5, §28.9', pages: '966–972' }],
    diagrams: ['turbojet', 'turbojet-ts'],
    sections: [
      {
        id: 'working',
        title: 'Working (§28.5)',
        body: md`![Turbojet](diagram:turbojet)

1. **Diffuser (intake)** — slows the incoming air, converting its kinetic energy into a pressure rise (**ram compression**).
2. **Compressor** (axial or centrifugal) — raises the pressure further.
3. **Combustion chamber** — fuel burns at nearly constant pressure.
4. **Turbine** — expands the gas **only enough to drive the compressor** (turbine work = compressor work).
5. **Nozzle** — expands the remaining pressure to the atmosphere, producing a **high-velocity jet**.

The turbojet is suited to speeds **above about 800 km/h**.`,
      },
      {
        id: 'cycle',
        title: 'The ideal turbojet cycle (§28.9)',
        body: md`The turbojet is a **Brayton cycle** whose net work appears as jet kinetic energy instead of shaft work.

![Ideal turbojet on T–s](diagram:turbojet-ts)

| Process | Device | Relation |
|---|---|---|
| 1 → 2 | Diffuser | $T_2 = T_1 + \dfrac{V_1^2}{2c_p}$, $\dfrac{p_2}{p_1} = \left(\dfrac{T_2}{T_1}\right)^{\gamma/(\gamma-1)}$ |
| 2 → 3 | Compressor | $T_3 = T_2\,r_p^{(\gamma-1)/\gamma}$ |
| 3 → 4 | Combustor | $p_4 = p_3$; heat added to reach $T_4$ |
| 4 → 5 | Turbine | $T_4 - T_5 = T_3 - T_2$ (turbine drives compressor) |
| 5 → 6 | Nozzle | $V_6 = \sqrt{2c_p(T_5 - T_6)}$, $T_6 = T_5(p_6/p_5)^{(\gamma-1)/\gamma}$ |`,
      },
      {
        id: 'merits',
        title: 'Merits and demerits (book)',
        body: md`**Merits:** simple and light; high power-to-weight ratio; no propeller, so thrust is not limited at high speed; smooth running without vibration; uses cheap fuel; works well at high speed and altitude.

**Demerits:** low propulsive efficiency and high fuel consumption at low speeds — **inefficient below about 550 km/h**; high noise; needs **long runways**; high TSFC; poor take-off thrust.`,
      },
    ],
    keyPoints: [
      'Turbojet = diffuser + compressor + combustor + turbine + nozzle.',
      'Turbine work just equals compressor work; the rest of the enthalpy becomes jet kinetic energy.',
      'Ram effect in the diffuser pre-compresses the air.',
      'Efficient above ~800 km/h; poor below ~550 km/h.',
    ],
    misconceptions: [
      'Assuming the turbine produces the thrust. It only drives the compressor; the nozzle produces the jet.',
    ],
    flashcards: [
      { id: 'u6-f5', front: 'Five components of a turbojet in flow order?', back: 'Diffuser, compressor, combustion chamber, turbine, nozzle.' },
      { id: 'u6-f6', front: 'What fixes the turbine exit temperature in an ideal turbojet?', back: 'Turbine work = compressor work: T₄ − T₅ = T₃ − T₂.' },
      { id: 'u6-f7', front: 'What is ram compression?', back: 'Pressure rise in the intake diffuser from slowing the incoming air.' },
    ],
  },
  {
    id: 'u6-afterburner',
    unitId: 'u6',
    title: 'Thrust augmentation: afterburner and others',
    summary: 'Reheating the exhaust to raise jet velocity, and the water–methanol injection and bleed-burn alternatives.',
    syllabusPhrases: ['turbojet engine with and without afterburner'],
    coverage: 'full',
    refs: [{ chapter: 28, section: '§28.10', pages: '972–974' }],
    diagrams: ['afterburner'],
    sections: [
      {
        id: 'afterburner',
        title: 'Afterburner (reheat) (§28.10)',
        body: md`The turbine exhaust still contains a lot of unused oxygen (gas turbines run with large excess air). An **afterburner** is a duct between the turbine and the nozzle where **extra fuel is injected and burnt**.

![Turbojet with afterburner](diagram:afterburner)

- The gas temperature before the nozzle rises sharply, so the **jet velocity and thrust increase** (typically 30–50 % or more for short periods).
- A **variable-area nozzle** is needed: the hotter gas has a larger volume, and the nozzle must open when the afterburner is lit to avoid back-pressuring the turbine.
- **Fuel consumption rises steeply** — the fuel is burnt at low pressure (low efficiency) — so afterburners are used only for **take-off, climb and combat** in military aircraft.`,
      },
      {
        id: 'others',
        title: 'Other methods',
        body: md`- **Water–methanol injection** into the compressor inlet or combustion chamber. Evaporation cools the air, so it is denser and the compressor needs less work; more mass flows through the engine. Thrust increases by about **30 %** for take-off on hot days or at high-altitude airfields. Methanol prevents freezing and burns to add energy.
- **Bleed burn cycle** — some compressed air is bled off and burnt separately with fuel, then expanded through its own nozzle, adding thrust.

With and without afterburner (exam framing): **without** — best fuel economy, used for cruise; **with** — much more thrust, much higher TSFC, used briefly.`,
      },
    ],
    keyPoints: [
      'Afterburner: extra fuel burnt between turbine and nozzle → higher jet velocity and thrust.',
      'Needs a variable-area nozzle; TSFC rises sharply; used for take-off and combat only.',
      'Water–methanol injection: cooler, denser air → ~30 % more thrust for take-off.',
    ],
    misconceptions: [
      'Thinking the afterburner improves efficiency. It raises thrust at the cost of much higher fuel consumption.',
    ],
    flashcards: [
      { id: 'u6-f8', front: 'Why can an afterburner burn extra fuel without extra air?', back: 'The turbine exhaust still has a lot of unused oxygen because gas turbines run with large excess air.' },
      { id: 'u6-f9', front: 'Why must the nozzle area increase when the afterburner is lit?', back: 'The hotter gas has larger volume; without a larger nozzle the turbine would be back-pressured.' },
      { id: 'u6-f10', front: 'Three methods of thrust augmentation?', back: 'Afterburning, water–methanol injection, bleed burn.' },
    ],
  },
  {
    id: 'u6-turboprop',
    unitId: 'u6',
    title: 'Turboprop (and turbofan)',
    summary: 'Driving a propeller from the turbine: high propulsive efficiency at moderate speeds; the turbofan as the middle ground.',
    syllabusPhrases: ['turboprop'],
    coverage: 'full',
    refs: [{ chapter: 28, section: '§28.6–28.7', pages: '967–969' }],
    diagrams: ['turboprop', 'turbofan'],
    sections: [
      {
        id: 'turboprop',
        title: 'Turboprop (§28.6)',
        body: md`A turboprop is a turbojet whose turbine is made large enough to **drive a propeller** (through a reduction gearbox) as well as the compressor. The turbine extracts most of the gas energy.

![Turboprop](diagram:turboprop)

- About **80 % of the thrust comes from the propeller** and about **20 % from the exhaust jet**.
- The propeller accelerates a **large mass of air by a small amount**, so the propulsive efficiency is high at moderate speeds (about **600 km/h**).

**Advantages:** high propulsive efficiency and low fuel consumption at moderate speeds; high take-off thrust, so shorter runways; lower noise than a turbojet; lighter and smaller than a piston engine of the same power.

**Limitations:** propeller efficiency falls rapidly at high speed (tip shock waves) — unsuitable for high-speed flight; needs a heavy, complex reduction gearbox; more noise and vibration than a turbofan.`,
      },
      {
        id: 'turbofan',
        title: 'Turbofan (§28.7)',
        body: md`> [!NOTE] Not in your syllabus, but useful
> The turbofan is the engine of modern airliners and sits between the turbojet and turboprop.

![Turbofan](diagram:turbofan)

A large ducted **fan** at the front compresses a big airflow. Part of it goes through the core (a turbojet); the rest **bypasses** the core and leaves through the fan nozzle. The **bypass ratio** (bypass mass flow ÷ core mass flow) is 5–12 in airliners. Like a turboprop it accelerates a large mass of air modestly, but the duct lets it stay efficient up to about **Mach 1.6** (book), it is quieter, and it needs no gearbox in most designs.`,
      },
    ],
    keyPoints: [
      'Turboprop: turbine drives compressor + propeller; ~80 % thrust from propeller, ~20 % from jet.',
      'Best around 600 km/h: high propulsive efficiency, short take-off, low fuel consumption.',
      'Limited at high speed by propeller tip effects; needs a reduction gearbox.',
      'Turbofan: ducted fan + bypass air; efficient up to about Mach 1.6.',
    ],
    flashcards: [
      { id: 'u6-f11', front: 'Share of thrust from propeller and jet in a turboprop?', back: 'About 80 % propeller, 20 % jet.' },
      { id: 'u6-f12', front: 'Why is a turboprop efficient at moderate speed?', back: 'The propeller accelerates a large mass of air by a small velocity increase → high propulsive efficiency.' },
      { id: 'u6-f13', front: 'Define bypass ratio.', back: 'Mass flow bypassing the core ÷ mass flow through the core.' },
    ],
  },
  {
    id: 'u6-ramjet-pulsejet',
    unitId: 'u6',
    title: 'Ramjet and pulsejet',
    summary: 'The two air-breathing engines with no compressor: continuous ram compression vs intermittent combustion behind flap valves.',
    syllabusPhrases: ['ramjet', 'pulsejet'],
    coverage: 'full',
    refs: [{ chapter: 28, section: '§28.3.1–28.3.3', pages: '964–966' }],
    diagrams: ['ramjet', 'pulsejet'],
    sections: [
      {
        id: 'ramjet',
        title: 'Ramjet (§28.3.1)',
        body: md`The simplest jet engine — a shaped duct with **no moving parts**.

![Ramjet](diagram:ramjet)

1. **Supersonic diffuser** — at high flight speed, the incoming air is slowed (through shocks, then subsonic diffusion) and its pressure rises by **ram effect** alone.
2. **Combustion chamber** — fuel is injected and burnt continuously; flame holders stabilise the flame.
3. **Nozzle** — the hot gas expands to a high-velocity jet.

**Features:** very simple and light; no compressor or turbine, so no turbine-temperature limit from rotating blades; works best around **Mach 3** and up to about **Mach 5**.

**Limitation:** **it cannot produce static thrust** — at rest there is no ram compression. It must be launched or boosted (by a rocket or another engine) to high speed first. Used in guided missiles (Mach 2–4) and target drones.

**Scramjet** (§28.3.3): a *supersonic-combustion* ramjet for hypersonic flight (above about Mach 5), where slowing the air to subsonic speed would heat it too much.`,
      },
      {
        id: 'pulsejet',
        title: 'Pulsejet (§28.3.2)',
        body: md`![Pulsejet](diagram:pulsejet)

A duct with a bank of spring-loaded **flap (non-return) valves** at the front, a combustion chamber and a long tailpipe. It works **intermittently**:

1. Air enters through the open flap valves and mixes with fuel.
2. The mixture is ignited — a **spark plug is needed only for starting**; afterwards hot residual gas ignites each new charge.
3. Combustion pressure **closes the flap valves** and the gas rushes out of the tailpipe as a jet.
4. The momentum of the outgoing gas leaves a partial vacuum, the valves reopen and fresh air enters; the cycle repeats about 40–50 times per second.

**Advantages:** very simple and cheap; light; unlike a ramjet it **can produce static thrust**, so it can start from rest.

**Limitations:** short flight duration (about 30–60 minutes); severe **noise and vibration**; very low efficiency (about **2–3 %**); flap-valve life is short; limited to subsonic speeds and low altitudes. Historically used in the V-1 flying bomb and target drones.`,
      },
    ],
    keyPoints: [
      'Ramjet: no moving parts; ram compression only; cannot start from rest; best near Mach 3.',
      'Scramjet: combustion at supersonic speed, for hypersonic flight.',
      'Pulsejet: flap valves, intermittent combustion; spark only for starting; can give static thrust.',
      'Pulsejet limits: noise, vibration, ~2–3 % efficiency, short life.',
    ],
    misconceptions: [
      'Confusing which engine can start from rest. The pulsejet can (flap valves); the ramjet cannot.',
    ],
    flashcards: [
      { id: 'u6-f14', front: 'Why can a ramjet not take off on its own?', back: 'It has no compressor; at zero speed there is no ram compression, so no thrust.' },
      { id: 'u6-f15', front: 'What closes the pulsejet flap valves?', back: 'The pressure rise from combustion.' },
      { id: 'u6-f16', front: 'Best speed range of a ramjet?', back: 'Around Mach 3 (up to about Mach 5).' },
    ],
  },
  {
    id: 'u6-rockets',
    unitId: 'u6',
    title: 'Rocket engines and propellants',
    summary: 'How rockets differ from jets, rocket thrust and specific impulse, solid, liquid and hybrid propellants.',
    syllabusPhrases: ['rocket engines – operation', 'solid and Liquid propellants'],
    coverage: 'full',
    refs: [{ chapter: 28, section: '§28.11–28.17', pages: '986–994' }],
    diagrams: ['rockets'],
    sections: [
      {
        id: 'operation',
        title: 'Operation (§28.11)',
        body: md`A rocket carries **both fuel and oxidiser** (together, the **propellant**). They burn in a combustion chamber at high pressure, and the gas expands through a **convergent–divergent nozzle** to supersonic velocity. Because no atmospheric air is used, a rocket works **in space** and its thrust is independent of flight speed.

**Thrust:**

$$\boxed{F = \dot m\,V_e + A_e(p_e - p_a)}$$

— a **momentum thrust** plus a **pressure thrust** (non-zero when the nozzle exit pressure $p_e$ differs from the ambient pressure $p_a$).

- **Effective jet velocity** $V_{\text{eff}} = F/\dot m$.
- **Specific impulse** $I_{sp} = \dfrac{F}{\dot m\,g} = \dfrac{V_{\text{eff}}}{g}$, in seconds — typically **100–450 s**.
- **Specific propellant consumption** $= 1/I_{sp}$.
- **Propulsive efficiency** (σ = flight speed ÷ jet speed): $\eta_p = \dfrac{2\sigma}{1+\sigma^2}$, maximum (= 1) at σ = 1 — and, unlike a jet, σ can exceed 1.

Rockets have a very high **thrust-to-weight ratio** (over 100 for large engines), but a very high propellant consumption.

| Jet engine | Rocket |
|---|---|
| Uses atmospheric oxygen | Carries its own oxidiser |
| Ceiling limited by air density | Works in vacuum |
| Thrust depends on flight speed | Thrust nearly independent of speed |
| Lower fuel consumption per unit thrust | Very high propellant consumption |
| Unlimited operating time with refuelling | Short burning time |`,
      },
      {
        id: 'solid',
        title: 'Solid-propellant rockets (§28.12, §28.16)',
        body: md`![Solid and liquid rockets](diagram:rockets)

The fuel and oxidiser are mixed into a solid **grain** cast in the casing. The grain burns from its exposed surface; the **grain shape** (e.g. a star-shaped core) controls how the burning area — and therefore the thrust — varies with time.

**Types of solid propellant:**
- **Homogeneous (double-base)** — fuel and oxidiser in the same molecule, e.g. nitrocellulose + nitroglycerine.
- **Heterogeneous (composite)** — separate oxidiser crystals (e.g. ammonium perchlorate) held in a fuel binder (e.g. polybutadiene) with aluminium powder.

**Desirable properties:** high energy release and $I_{sp}$; high density; stable, long storage life; low sensitivity to temperature and shock; smooth, predictable burning; non-toxic, smoke-free exhaust.

**Advantages:** simple; always ready; long storage; high thrust; no pumps or plumbing; reliable.
**Disadvantages:** **cannot be throttled, stopped and restarted** once ignited; lower $I_{sp}$ than liquids; cracks in the grain can cause explosion; heavy casing (it is also the combustion chamber).`,
      },
      {
        id: 'liquid',
        title: 'Liquid-propellant rockets (§28.13, §28.16)',
        body: md`Fuel and oxidiser are stored in separate tanks and fed by **pumps** (or pressurised gas) to the injector of the combustion chamber. The chamber and nozzle are **regeneratively cooled** — fuel flows through jackets around them before injection.

**Types of liquid propellant:**
- **Monopropellant** — a single liquid that decomposes or burns alone (e.g. hydrazine, hydrogen peroxide over a catalyst).
- **Bipropellant** — separate fuel and oxidiser, e.g. **liquid hydrogen + liquid oxygen**, kerosene + LOX, UDMH + N₂O₄. Some combinations are **hypergolic** (ignite on contact).

**Requirements:** high heat of combustion and low molecular-weight products (high $I_{sp}$); high density (smaller tanks); low freezing point and high boiling point; stability and safe handling; good cooling properties; low toxicity and corrosion.

**Advantages:** higher $I_{sp}$; thrust can be **controlled, stopped and restarted**; the engine can be tested and reused.
**Disadvantages:** complex — pumps, valves, plumbing; cryogenic propellants are hard to store; less ready for instant use; heavier system.`,
      },
      {
        id: 'others',
        title: 'Hybrid and nuclear rockets (§28.14–28.15)',
        body: md`- **Hybrid** — a solid fuel grain with a liquid (or gaseous) oxidiser sprayed onto it. It can be throttled and shut down like a liquid rocket, with a simpler system than a bipropellant engine.
- **Nuclear** — a reactor heats a working fluid (usually hydrogen) that expands through a nozzle. Low molecular weight gives a very high $I_{sp}$; under development.`,
      },
    ],
    keyPoints: [
      'Rocket carries fuel + oxidiser; works in vacuum; thrust independent of speed.',
      'F = ṁV_e + A_e(p_e − p_a); I_sp = F/(ṁg), typically 100–450 s.',
      'Rocket η_p = 2σ/(1 + σ²), maximum at σ = 1.',
      'Solid: simple, storable, cannot be throttled or restarted. Homogeneous (double-base) or heterogeneous (composite).',
      'Liquid: higher I_sp, controllable and restartable, but complex. Mono- or bipropellant.',
    ],
    misconceptions: [
      'Forgetting the pressure thrust when the nozzle exit pressure differs from ambient.',
      'Using the air-breathing η_p formula for rockets — the rocket form is 2σ/(1 + σ²).',
    ],
    flashcards: [
      { id: 'u6-f17', front: 'Rocket thrust equation?', back: 'F = ṁV_e + A_e(p_e − p_a) — momentum thrust + pressure thrust.' },
      { id: 'u6-f18', front: 'Define specific impulse.', back: 'I_sp = F/(ṁg) = V_eff/g, in seconds.' },
      { id: 'u6-f19', front: 'Homogeneous vs heterogeneous solid propellant?', back: 'Homogeneous: fuel and oxidiser in one compound (double-base). Heterogeneous: separate oxidiser crystals in a fuel binder (composite).' },
      { id: 'u6-f20', front: 'Main advantage of liquid over solid rockets?', back: 'Thrust can be controlled, stopped and restarted; higher I_sp.' },
    ],
  },
]

/* ----------------------------------------------------------------------------- */

export const examples: WorkedExample[] = [
  {
    id: 'ex-28-1',
    topicId: 'u6-intro',
    title: 'Propeller thrust, specific impulse and thrust power',
    source: { kind: 'textbook', ref: 'Example 28.1', page: 974 },
    difficulty: 1,
    statement: md`The diameter of the propeller of an aircraft is 2.5 m. It flies at a speed of 540 km/h at an elevation of 8000 m, where air density is 0.525 kg/m³. The flight to jet speed ratio is 0.75. Calculate: (a) the air-flow rate through the propeller, (b) thrust produced, (c) specific thrust, (d) specific impulse, (e) thrust power.`,
    given: ['D = 2.5 m, V_a = 150 m/s, ρ = 0.525 kg/m³', 'V_a/V_j = 0.75 → V_j = 200 m/s'],
    find: ['ṁ', 'F', 'Specific thrust', 'I_sp', 'TP'],
    approach: md`Follow the book: mass flow from the flight speed through the disc area, thrust $= \dot m(V_j - V_a)$.`,
    steps: [
      { label: '(a) Air flow', work: md`$\dot m = \rho\,\frac{\pi}{4}D^2\,V_a = 0.525(4.909)(150) = 386.6$ kg/s` },
      { label: '(b) Thrust', work: md`$F = 386.6(200 - 150) = 19\,328$ N` },
      { label: '(c) Specific thrust', work: md`$F/\dot m = 50$ N per kg/s` },
      { label: '(d) Specific impulse', work: md`$I_{sp} = 50/9.81 = 5.10$ s` },
      { label: '(e) Thrust power', work: md`$TP = 19\,328 \times 150 = 2899$ kW` },
    ],
    answer: md`(a) 386.6 kg/s (b) 19.33 kN (c) 50 N/(kg/s) (d) 5.10 s (e) 2899 kW`,
    concept: 'A propeller moves a big mass of air slowly: low specific thrust but good propulsive efficiency (2σ/(1+σ) = 0.857 here).',
    checkNote: 'Following the book, the mass flow uses the flight speed. Actuator-disc theory would use the mean velocity through the disc, (V_a + V_j)/2 = 175 m/s, giving 451 kg/s.',
  },
  {
    id: 'ex-28-3',
    topicId: 'u6-intro',
    title: 'Twin-jet aircraft: jet velocity, air flow, fuel consumption',
    source: { kind: 'textbook', ref: 'Example 28.3', page: 975 },
    difficulty: 2,
    statement: md`A jet propelled engine having two jets and working on turbojet has a velocity of 210 m/s, when flying at an altitude of 12000 m. The density of air at this altitude is 0.172 kg/m³. The resistance or drag of the plane is 6670.8 N and propulsive efficiency of the jet is 50%. The overall efficiency of the unit is 18%. Calorific value of the fuel is 4.895 × 10⁴ kJ/kg. Calculate (a) absolute velocity of jet, (b) quantity of air compressed per minute, (c) diameter of jet, (d) net power output of the plant, (e) thrust specific fuel consumption, (f) air–fuel ratio.`,
    given: ['V_a = 210 m/s, ρ = 0.172 kg/m³', 'F = drag = 6670.8 N', 'η_p = 0.5, η_o = 0.18, CV = 48 950 kJ/kg'],
    find: ['V_j', 'Air per minute', 'Thrust power', 'TSFC', 'A/F'],
    approach: md`In steady flight thrust = drag. $\eta_p = 2V_a/(V_j + V_a)$ gives $V_j$ relative to the aircraft; $\eta_o = FV_a/(\dot m_f CV)$ gives fuel flow.`,
    steps: [
      { label: '(a) Jet velocity', work: md`$0.5 = \dfrac{2(210)}{V_j + 210} \Rightarrow V_j = 630$ m/s relative to the aircraft (absolute $= 630 - 210 = 420$ m/s rearward)` },
      { label: '(b) Air flow', work: md`$\dot m = \dfrac{F}{V_j - V_a} = \dfrac{6670.8}{420} = 15.88$ kg/s $\Rightarrow \dfrac{15.88 \times 60}{0.172} = 5540$ m³/min` },
      { label: '(d) Thrust power', work: md`$TP = FV_a = 6670.8 \times 210 = 1400.9$ kW` },
      { label: 'Fuel flow', work: md`$\dot m_f = \dfrac{1400.9}{0.18 \times 48\,950} = 0.159$ kg/s` },
      { label: '(e) TSFC', work: md`$\dfrac{0.159 \times 3600}{6670.8} = 0.0858$ kg/N·h` },
      { label: '(f) Air–fuel ratio', work: md`$15.88/0.159 = 99.9$` },
    ],
    answer: md`V<sub>j</sub> = 630 m/s (relative), 5540 m³/min, TP ≈ 1401 kW, TSFC ≈ 0.086 kg/N·h, A/F ≈ 100`,
    concept: 'Thrust equals drag in level flight; overall efficiency links thrust power to fuel energy.',
    checkNote: 'Part (c), the jet diameter, is omitted: it needs the gas density in the jet, which the problem does not give, and the book’s value could not be reproduced. The scan shows "500%" for propulsive efficiency; the solution uses 50 %.',
  },
  {
    id: 'ex-28-5',
    topicId: 'u6-turbojet',
    title: 'Ideal turbojet: states and jet velocity',
    source: { kind: 'textbook', ref: 'Example 28.5', page: 977 },
    difficulty: 2,
    statement: md`Air enters a turbojet engine at 80 kPa, 240 K and an inlet velocity of 280 m/s. The pressure ratio across the compressor is 8. The turbine inlet temperature is 1200 K and the pressure at the nozzle exit is 80 kPa. The work developed by the turbine equals the compressor work input. The diffuser, compressor, turbine and nozzle processes are isentropic, and there is no pressure drop for flow through the combustor. For operation at steady state, determine the velocity at the nozzle exit and the pressure at each principal state. Neglect kinetic energy at the exit of all components except the nozzle and neglect potential energy throughout.`,
    given: ['p₁ = 80 kPa, T₁ = 240 K, V₁ = 280 m/s', 'r_p = 8, T₄ = 1200 K, p₆ = 80 kPa', 'All processes isentropic'],
    find: ['V₆', 'p at each state'],
    approach: md`Diffuser: kinetic energy → temperature rise. Turbine work = compressor work. Nozzle expands from $p_5$ to $p_6$.`,
    steps: [
      { label: 'Diffuser', work: md`$T_2 = 240 + \dfrac{280^2}{2(1005)} = 279.0$ K; $p_2 = 80(279.0/240)^{3.5} = 135.5$ kPa` },
      { label: 'Compressor', work: md`$p_3 = 8(135.5) = 1084$ kPa; $T_3 = 279.0(8)^{0.2857} = 505.4$ K` },
      { label: 'Combustor', work: md`$p_4 = 1084$ kPa, $T_4 = 1200$ K` },
      { label: 'Turbine', work: md`$T_5 = 1200 - (505.4 - 279.0) = 973.6$ K; $p_5 = 1084(973.6/1200)^{3.5} = 521.5$ kPa` },
      { label: 'Nozzle', work: md`$T_6 = 1200(80/1084)^{0.2857} = 569.8$ K; $V_6 = \sqrt{2(1005)(973.6 - 569.8)} = 900.9$ m/s` },
    ],
    answer: md`V<sub>6</sub> ≈ 901 m/s; p₂ = 135.5, p₃ = p₄ = 1084, p₅ = 521.5, p₆ = 80 kPa`,
    concept: 'All the enthalpy not needed to drive the compressor becomes jet kinetic energy in the nozzle.',
  },
  {
    id: 'ex-28-6',
    topicId: 'u6-turbojet',
    title: 'Turbojet: turbine exit state, jet velocity and propulsive efficiency',
    source: { kind: 'textbook', ref: 'Example 28.6', page: 978 },
    difficulty: 2,
    statement: md`A turbojet engine aircraft flies with a velocity of 260 m/s at an altitude where the air is at 35 kPa and −40 °C. The compressor has a pressure ratio of 10 and the temperature of the gases at the turbine inlet is 1095 °C. The air enters the compressor at a rate of 8.5 kg/s. Using the cold air-standard assumptions, determine (a) temperature and the pressure of the gases at the turbine exit, (b) velocity of the gases at the nozzle exit, and (c) propulsive efficiency of the cycle.`,
    given: ['V = 260 m/s, p₁ = 35 kPa, T₁ = 233 K', 'r_p = 10, T₄ = 1368 K, ṁ = 8.5 kg/s'],
    find: ['T₅, p₅', 'V₆', 'η_p'],
    approach: md`Same chain as Example 28.5, then $\eta_p = 2V/(V + V_6)$.`,
    steps: [
      { label: 'Diffuser', work: md`$T_2 = 233 + \dfrac{260^2}{2010} = 266.6$ K; $p_2 = 35(266.6/233)^{3.5} = 56.1$ kPa` },
      { label: 'Compressor', work: md`$p_3 = 561.1$ kPa; $T_3 = 266.6(10)^{0.2857} = 514.8$ K` },
      { label: '(a) Turbine exit', work: md`$T_5 = 1368 - (514.8 - 266.6) = 1119.8$ K; $p_5 = 561.1(1119.8/1368)^{3.5} = 278.5$ kPa` },
      { label: '(b) Nozzle', work: md`$T_6 = 1368(35/561.1)^{0.2857} = 619.2$ K; $V_6 = \sqrt{2(1005)(1119.8 - 619.2)} = 1003$ m/s` },
      { label: '(c) Propulsive efficiency', work: md`$\eta_p = \dfrac{2(260)}{260 + 1003} = 41.2\%$` },
      { label: 'Beyond the book: thrust and overall efficiency', work: md`$F = 8.5(1003 - 260) = 6317$ N; heat added $= 8.5(1.005)(1368 - 514.8) = 7289$ kW; $\eta_o = \dfrac{6317 \times 260}{7289 \times 10^3} = 22.5\%$` },
    ],
    answer: md`(a) 1120 K, 278.5 kPa (b) ≈ 1003 m/s (c) η<sub>p</sub> ≈ 41.2 %`,
    concept: 'A pure jet has a jet velocity far above flight speed, so its propulsive efficiency is modest at 260 m/s.',
  },
  {
    id: 'ex-28-11',
    topicId: 'u6-rockets',
    title: 'Rocket thrust, thrust power and propulsive efficiency',
    source: { kind: 'textbook', ref: 'Example 28.11', page: 994 },
    difficulty: 1,
    statement: md`The effective jet velocity from a rocket engine is 3000 m/s. The forward velocity is 1500 m/s and propellant consumption is 80 kg/s. Calculate the thrust, thrust power and propulsive efficiency.`,
    given: ['V_eff = 3000 m/s, V = 1500 m/s, ṁ = 80 kg/s'],
    find: ['F', 'TP', 'η_p'],
    approach: md`Rocket thrust does not depend on flight speed: $F = \dot mV_{\text{eff}}$; $\eta_p = 2\sigma/(1+\sigma^2)$.`,
    steps: [
      { label: 'Thrust', work: md`$F = 80 \times 3000 = 240$ kN` },
      { label: 'Thrust power', work: md`$TP = 240 \times 10^3 \times 1500 = 360$ MW` },
      { label: 'Propulsive efficiency', work: md`$\sigma = 0.5$: $\eta_p = \dfrac{2(0.5)}{1 + 0.25} = 0.80$` },
    ],
    answer: md`F = 240 kN, TP = 360 MW, η<sub>p</sub> = 80 %`,
    concept: 'For a rocket the whole propellant is carried, so the propulsive efficiency formula differs from that of an air-breathing jet.',
  },
  {
    id: 'ex-28-12',
    topicId: 'u6-rockets',
    title: 'Rocket: pressure thrust, jet velocity and specific impulse',
    source: { kind: 'textbook', ref: 'Example 28.12', page: 995 },
    difficulty: 2,
    statement: md`The following data refer to a rocket engine: thrust 380 kN, propellant flow rate 200 kg/s, nozzle exit diameter 0.6 m, nozzle exit pressure 1.1 bar, ambient pressure 0.6 bar (chamber 37 bar, 3000 K). Find (i) the effective jet velocity, (ii) the actual jet velocity, (iii) the specific impulse, and (iv) the specific propellant consumption.`,
    given: ['F = 380 kN, ṁ = 200 kg/s', 'd_e = 0.6 m, p_e = 1.1 bar, p_a = 0.6 bar'],
    find: ['V_eff', 'Actual V_e', 'I_sp', 'spc'],
    approach: md`$F = \dot mV_e + A_e(p_e - p_a)$; $V_{\text{eff}} = F/\dot m$.`,
    steps: [
      { label: '(i) Effective jet velocity', work: md`$V_{\text{eff}} = 380\,000/200 = 1900$ m/s` },
      { label: 'Pressure thrust', work: md`$A_e = \frac{\pi}{4}(0.6)^2 = 0.2827$ m²; $F_p = 0.2827 \times (1.1 - 0.6) \times 10^5 = 14.14$ kN` },
      { label: '(ii) Actual jet velocity', work: md`$V_e = \dfrac{380 - 14.14}{200} \times 10^3 = 1829$ m/s` },
      { label: '(iii) Specific impulse', work: md`$I_{sp} = 1900/9.81 = 193.7$ s` },
      { label: '(iv) Specific propellant consumption', work: md`$1/I_{sp} = 5.16 \times 10^{-3}$ s⁻¹` },
    ],
    answer: md`V<sub>eff</sub> = 1900 m/s, V<sub>e</sub> ≈ 1829 m/s, I<sub>sp</sub> ≈ 193.7 s, spc ≈ 5.16 × 10⁻³ s⁻¹`,
    concept: 'Because the nozzle is under-expanded (p_e > p_a), part of the thrust comes from pressure.',
    checkNote: md`> [!ERRATA] Unit slip in the printed solution
> The book computes the pressure thrust as $\frac{\pi}{4}(0.6)^2(1.1 - 0.6) \times 10^3 = 141.37$ kN. A pressure difference of 0.5 bar is $0.5 \times 10^5$ Pa, so the pressure thrust is **14.14 kN**, and the actual jet velocity becomes **1829 m/s** (book: 1193.15 m/s). The book's specific propellant consumption "5.16" should read **5.16 × 10⁻³ s⁻¹**.
>
> The problem statement is reconstructed from the data table in the scan, whose two-column layout did not survive text extraction.`,
  },
]

/* ----------------------------------------------------------------------------- */

export const questions: Question[] = [
  {
    id: 'q-u6-1', topicId: 'u6-ramjet-pulsejet', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Which engine cannot produce thrust at zero flight speed?',
    options: ['Turbojet', 'Pulsejet', 'Ramjet', 'Rocket'],
    answer: 2,
    solution: md`A ramjet has no compressor and relies on ram compression, which is zero at rest.`,
  },
  {
    id: 'q-u6-2', topicId: 'u6-intro', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'The propulsive efficiency of an air-breathing jet engine is:',
    options: ['2V_j/(V_j + V_a)', '2V_a/(V_j + V_a)', 'V_a/V_j', '2σ/(1 + σ²)'],
    answer: 1,
    solution: md`$\eta_p = 2V_a/(V_j + V_a)$. Option D is the rocket formula.`,
  },
  {
    id: 'q-u6-3', topicId: 'u6-afterburner', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'An afterburner in a turbojet is located between the:',
    options: ['Diffuser and compressor', 'Compressor and combustor', 'Turbine and nozzle', 'Combustor and turbine'],
    answer: 2,
    solution: md`Extra fuel is burnt in the turbine exhaust, before the nozzle.`,
  },
  {
    id: 'q-u6-4', topicId: 'u6-turboprop', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'In a turboprop engine, the major part of the thrust is produced by the:',
    options: ['Exhaust jet', 'Propeller', 'Compressor', 'Diffuser'],
    answer: 1,
    solution: md`About 80 % of the thrust comes from the propeller and 20 % from the jet (§28.6).`,
  },
  {
    id: 'q-u6-5', topicId: 'u6-rockets', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'The main advantage of a liquid-propellant rocket over a solid-propellant rocket is that it:',
    options: ['Is simpler', 'Can be stored indefinitely', 'Can be throttled, stopped and restarted', 'Needs no pumps'],
    answer: 2,
    solution: md`Liquid rockets control propellant flow, so thrust can be varied and the engine restarted. The other options describe solid rockets.`,
  },
  {
    id: 'q-u6-6', topicId: 'u6-ramjet-pulsejet', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'In a pulsejet the spark plug is required:',
    options: ['Throughout operation', 'Only for starting', 'Only at high altitude', 'Never'],
    answer: 1,
    solution: md`After starting, hot residual gases ignite each fresh charge.`,
  },
  {
    id: 'q-u6-7', topicId: 'u6-rockets', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'A double-base (homogeneous) solid propellant is one in which:',
    options: ['Fuel and oxidiser are separate crystals in a binder', 'Fuel and oxidiser are in the same compound', 'A liquid oxidiser is sprayed on a solid fuel', 'Two liquids are mixed'],
    answer: 1,
    solution: md`Homogeneous propellants (e.g. nitrocellulose + nitroglycerine) contain fuel and oxidiser in the same molecule. A is composite; C is hybrid.`,
  },
  {
    id: 'q-u6-8', topicId: 'u6-turbojet', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'In an ideal turbojet, the turbine work is:',
    options: ['Greater than compressor work by the jet kinetic energy', 'Equal to compressor work', 'Zero', 'Equal to the heat added'],
    answer: 1,
    solution: md`The turbine only drives the compressor; the remaining enthalpy expands in the nozzle.`,
  },
  {
    id: 'q-u6-9', topicId: 'u6-intro', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 28 Review Questions', page: 997 },
    prompt: 'Define thrust, thrust power, propulsive efficiency and overall efficiency of a jet engine.',
    solution: md`Thrust $F = \dot m(V_j - V_a)$. Thrust power $= FV_a$. Propulsive efficiency $= FV_a / \tfrac12\dot m(V_j^2 - V_a^2) = 2V_a/(V_j + V_a)$. Overall efficiency $= FV_a/(\dot m_f CV) = \eta_p\eta_{th}$.`,
  },
  {
    id: 'q-u6-10', topicId: 'u6-turbojet', type: 'long', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 28 Review Questions', page: 997 },
    prompt: 'With a neat sketch explain the working of a turbojet engine. State its merits and demerits.',
    hints: ['Diffuser → compressor → combustor → turbine → nozzle.'],
    solution: md`See **Turbojet → Working** and **Merits and demerits**. Diffuser gives ram compression; compressor raises pressure; fuel burns at constant pressure; turbine expands just enough to drive the compressor; nozzle produces the high-velocity jet. Merits: simple, light, high power/weight, works at high speed and altitude. Demerits: poor efficiency below ~550 km/h, noise, long runways, high TSFC.`,
  },
  {
    id: 'q-u6-11', topicId: 'u6-ramjet-pulsejet', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 28 Review Questions', page: 997 },
    prompt: 'Differentiate between a ramjet and a pulsejet.',
    solution: md`Ramjet: continuous combustion; no valves or moving parts; compression by ram effect only; cannot start from rest; best near Mach 3. Pulsejet: intermittent combustion; flap valves at inlet; can produce static thrust; subsonic only; noisy, vibrating, very low efficiency (~2–3 %).`,
  },
  {
    id: 'q-u6-12', topicId: 'u6-rockets', type: 'long', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 28 Review Questions', page: 997 },
    prompt: 'Explain solid and liquid propellant rockets. Compare their advantages and limitations.',
    solution: md`See **Rocket engines and propellants**. Solid: grain of mixed fuel and oxidiser cast in the casing; simple, storable, high thrust, always ready — but cannot be throttled or restarted, lower $I_{sp}$, grain cracks are dangerous. Liquid: separate tanks, pumps, injector, regeneratively cooled chamber; higher $I_{sp}$, controllable and restartable, reusable — but complex, cryogenic storage problems, heavier.`,
  },
  {
    id: 'q-u6-13', topicId: 'u6-intro', type: 'numerical', difficulty: 2, source: { kind: 'generated' },
    prompt: 'A turbojet flies at 250 m/s and ejects gas at 600 m/s relative to the engine. Air flow is 50 kg/s and fuel flow 0.8 kg/s (CV 43 000 kJ/kg). Neglecting fuel mass in the jet, find thrust, thrust power, propulsive, thermal and overall efficiency.',
    hints: ['F = ṁ(V_j − V_a).', 'η_th = ½ṁ(V_j² − V_a²)/(ṁ_f CV).'],
    solution: md`$F = 50(350) = 17\,500$ N. $TP = 17.5 \times 250 = 4375$ kW. $\eta_p = 500/850 = 58.8\%$. Kinetic energy rate $= \tfrac12(50)(600^2 - 250^2) = 7437.5$ kW; heat $= 0.8 \times 43\,000 = 34\,400$ kW; $\eta_{th} = 21.6\%$. $\eta_o = 4375/34\,400 = 12.7\% = 0.588 \times 0.216$.`,
  },
  {
    id: 'q-u6-14', topicId: 'u6-rockets', type: 'numerical', difficulty: 1, source: { kind: 'generated' },
    prompt: 'A rocket engine burns 150 kg/s of propellant with an exit velocity of 2500 m/s, exit area 0.5 m², exit pressure 0.9 bar and ambient pressure 0.3 bar. Find the thrust and the specific impulse.',
    solution: md`$F = 150(2500) + 0.5(0.9 - 0.3)(10^5) = 375 + 30 = 405$ kN. $I_{sp} = 405\,000/(150 \times 9.81) = 275$ s.`,
  },
]

/* ----------------------------------------------------------------------------- */

export const formulas: Formula[] = [
  {
    id: 'f-u6-thrust', topicId: 'u6-intro', name: 'Thrust of an air-breathing engine', important: true,
    latex: md`F = \dot m_a(V_j - V_a) \quad \left[\,= (\dot m_a+\dot m_f)V_j - \dot m_aV_a + A_e(p_e-p_a)\right]`,
    vars: [
      { sym: 'V_j', meaning: 'jet velocity relative to engine', unit: 'm/s' },
      { sym: 'V_a', meaning: 'flight speed', unit: 'm/s' },
    ],
    conditions: 'Simple form neglects fuel mass and pressure thrust.',
    meaning: 'Rate of change of momentum of the gas through the engine.',
    ref: { chapter: 28, section: '§28.8', pages: '969' },
  },
  {
    id: 'f-u6-etap', topicId: 'u6-intro', name: 'Propulsive efficiency (jet)', important: true,
    latex: md`\eta_p = \frac{FV_a}{\tfrac12\dot m(V_j^2-V_a^2)} = \frac{2V_a}{V_j+V_a} = \frac{2\sigma}{1+\sigma}`,
    vars: [{ sym: '\\sigma', meaning: 'V_a/V_j', unit: '—' }],
    conditions: 'Air-breathing engines.',
    meaning: 'Thrust power ÷ kinetic energy given to the gas.',
    related: ['f-u6-rocket-etap'],
    ref: { chapter: 28, section: '§28.8', pages: '969' },
  },
  {
    id: 'f-u6-eff', topicId: 'u6-intro', name: 'Thermal and overall efficiency',
    latex: md`\eta_{th} = \frac{\tfrac12\dot m(V_j^2-V_a^2)}{\dot m_f\,CV}, \qquad \eta_o = \eta_p\,\eta_{th} = \frac{FV_a}{\dot m_f\,CV}`,
    vars: [{ sym: 'CV', meaning: 'calorific value of fuel', unit: 'J/kg' }],
    conditions: '—',
    meaning: 'How well fuel energy becomes jet energy, and then thrust power.',
  },
  {
    id: 'f-u6-tsfc', topicId: 'u6-intro', name: 'Specific thrust and TSFC',
    latex: md`\frac{F}{\dot m_a}\ \text{(N per kg/s)}, \qquad \text{TSFC} = \frac{\dot m_f}{F}\ \text{(kg/N·h)}`,
    vars: [],
    conditions: '—',
    meaning: 'Thrust per unit air flow; fuel burnt per unit thrust.',
  },
  {
    id: 'f-u6-turbojet', topicId: 'u6-turbojet', name: 'Ideal turbojet relations', important: true,
    latex: md`T_2 = T_1 + \frac{V_1^2}{2c_p}, \quad T_4 - T_5 = T_3 - T_2, \quad V_6 = \sqrt{2c_p(T_5-T_6)}`,
    vars: [{ sym: 'c_p', meaning: 'specific heat', unit: 'J/kg·K' }],
    conditions: 'Isentropic components; kinetic energy neglected except at diffuser inlet and nozzle exit.',
    meaning: 'Diffuser ram rise, turbine-drives-compressor balance, nozzle exit velocity.',
    ref: { chapter: 28, section: '§28.9', pages: '970' },
  },
  {
    id: 'f-u6-rocket-thrust', topicId: 'u6-rockets', name: 'Rocket thrust', important: true,
    latex: md`F = \dot m\,V_e + A_e(p_e - p_a), \qquad V_{\text{eff}} = \frac{F}{\dot m}`,
    vars: [
      { sym: 'V_e', meaning: 'actual exit velocity', unit: 'm/s' },
      { sym: 'A_e', meaning: 'nozzle exit area', unit: 'm²' },
    ],
    conditions: 'Pressure in Pa.',
    meaning: 'Momentum thrust + pressure thrust.',
    ref: { chapter: 28, section: '§28.17', pages: '993' },
  },
  {
    id: 'f-u6-isp', topicId: 'u6-rockets', name: 'Specific impulse', important: true,
    latex: md`I_{sp} = \frac{F}{\dot m\,g} = \frac{V_{\text{eff}}}{g}`,
    vars: [{ sym: 'g', meaning: '9.81 m/s²', unit: 'm/s²' }],
    conditions: '—',
    meaning: 'Seconds of 1 N thrust per N of propellant weight; typically 100–450 s.',
    ref: { chapter: 28, section: '§28.17', pages: '993' },
  },
  {
    id: 'f-u6-rocket-etap', topicId: 'u6-rockets', name: 'Propulsive efficiency (rocket)',
    latex: md`\eta_p = \frac{2\sigma}{1+\sigma^2}, \qquad \sigma = \frac{V}{V_{\text{eff}}}`,
    vars: [{ sym: 'V', meaning: 'flight speed', unit: 'm/s' }],
    conditions: 'All propellant is carried on board.',
    meaning: 'Maximum (= 1) when flight speed equals jet speed.',
    related: ['f-u6-etap'],
    ref: { chapter: 28, section: '§28.17', pages: '994' },
  },
]
