import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 4 — Introduction to I.C. Engines (Rathore Ch. 24 §24.1–24.7, §24.11)
 * ========================================================================== */

export const topics: Topic[] = [
  {
    id: 'u4-classification',
    unitId: 'u4',
    title: 'Classification and engine parts',
    summary: 'How IC engines are classified, the main parts and their materials, and the basic engine terminology.',
    syllabusPhrases: ['Classification', 'SI and CI engines parts'],
    coverage: 'full',
    refs: [{ chapter: 24, section: '§24.1–24.2', pages: '779–781' }],
    diagrams: ['engine-parts'],
    sections: [
      {
        id: 'classification',
        title: 'Classification (§24.1)',
        body: md`An **internal combustion (IC) engine** burns its fuel *inside* the working cylinder, so the products of combustion are themselves the working fluid. (In an external combustion engine such as a steam plant, fuel heats a separate working fluid.)

Rathore classifies IC engines by:

| Basis | Types |
|---|---|
| Thermodynamic cycle | Otto (constant volume), Diesel (constant pressure), Dual |
| Strokes per cycle | Four-stroke, two-stroke |
| Fuel | Petrol, diesel, gas, bi-fuel |
| Ignition | Spark ignition (SI), compression ignition (CI) |
| Cooling | Air-cooled, water-cooled |
| Cylinder arrangement | In-line, V, radial, opposed |
| Speed | Low, medium, high |
| Valve location | Overhead (I-head), side (L-head), F-head, T-head |
| Application | Automotive, locomotive, marine, aircraft, stationary |

The two most important for this unit are **SI vs CI** and **four-stroke vs two-stroke**.`,
      },
      {
        id: 'parts',
        title: 'Engine parts (§24.2)',
        body: md`![Main parts of an IC engine](diagram:engine-parts)

| Part | Function | Usual material |
|---|---|---|
| Cylinder block | Houses the cylinders in which the piston reciprocates | Cast iron, aluminium alloy |
| Cylinder head | Closes the top of the cylinder; carries valves, spark plug or injector | Cast iron, aluminium alloy |
| Cylinder liner | Replaceable wearing surface inside the cylinder | Alloy cast iron |
| Piston | Receives gas pressure and transmits it to the connecting rod | Aluminium alloy, cast iron |
| Piston rings | Seal the gas (compression rings) and scrape oil (oil ring) | Cast iron |
| Gudgeon (piston) pin | Joins piston to small end of connecting rod | Case-hardened steel |
| Connecting rod | Converts reciprocating motion to rotation with the crank | Forged steel |
| Crankshaft | Converts reciprocating motion into rotary output | Forged steel |
| Camshaft and cams | Open and close the valves at the right instants | Forged steel / cast iron |
| Valves (inlet, exhaust) | Admit charge and release exhaust | Alloy steel (exhaust: heat-resisting) |
| Flywheel | Stores energy to smooth the output torque | Cast iron |
| Crankcase | Encloses the crank; holds lubricating oil (sump) | Cast iron, aluminium alloy |
| Spark plug (SI) / fuel injector (CI) | Ignite the charge / inject fuel at high pressure | — |
| Carburettor (SI) / fuel pump (CI) | Prepare the mixture / pressurise fuel | — |`,
      },
      {
        id: 'terms',
        title: 'Terminology',
        body: md`- **Bore** $d$ — inside diameter of the cylinder.
- **Stroke** $L$ — distance travelled by the piston between the dead centres; $L = 2 \times$ crank radius.
- **TDC / BDC** — top and bottom dead centres, the extreme piston positions.
- **Swept volume** $V_s = \frac{\pi}{4}d^2L$; **clearance volume** $V_c$.
- **Compression ratio** $r = (V_c + V_s)/V_c$ — petrol about 4–10, diesel 14–21 (book table, §24.5).
- **Piston speed** $= 2LN/60$ m/s.`,
      },
    ],
    keyPoints: [
      'IC engine: combustion inside the cylinder; products are the working fluid.',
      'Main classifications: SI/CI, two/four stroke, cycle, fuel, cooling, cylinder arrangement, valve location.',
      'Crankshaft, connecting rod and piston form the slider–crank that turns reciprocation into rotation.',
      'Compression ratio: SI ≈ 4–10, CI ≈ 14–21.',
    ],
    flashcards: [
      { id: 'u4-f1', front: 'Function of the flywheel?', back: 'Stores energy during the power stroke and releases it during idle strokes to keep speed uniform.' },
      { id: 'u4-f2', front: 'Compression rings vs oil ring?', back: 'Compression rings seal the combustion gas; the oil ring scrapes excess oil off the liner back to the sump.' },
      { id: 'u4-f3', front: 'Typical compression ratios of SI and CI engines?', back: 'SI: about 4–10; CI: about 14–21.' },
    ],
  },
  {
    id: 'u4-four-stroke',
    unitId: 'u4',
    title: 'Four-stroke SI and CI engines',
    summary: 'Suction, compression, power and exhaust strokes in petrol and diesel engines, and how the two differ.',
    syllabusPhrases: ['four stroke', 'working principle'],
    coverage: 'full',
    refs: [{ chapter: 24, section: '§24.3.2, §24.4, §24.5', pages: '784–791' }],
    diagrams: ['four-stroke-si', 'four-stroke-ci'],
    sections: [
      {
        id: 'si',
        title: 'Four-stroke petrol (SI) engine (§24.3.2)',
        body: md`One working cycle takes **four strokes = two crankshaft revolutions**:

1. **Suction stroke** — inlet valve open, piston moves TDC → BDC, drawing a **petrol–air mixture** from the carburettor.
2. **Compression stroke** — both valves closed; piston moves up and compresses the mixture (r ≈ 6–10). Near the end, the **spark plug** fires.
3. **Power (expansion) stroke** — combustion raises pressure sharply at almost constant volume; the gas pushes the piston down. This is the only stroke that does work.
4. **Exhaust stroke** — exhaust valve open; piston moves up and expels burnt gas.

![Four-stroke SI engine](diagram:four-stroke-si)

Load is controlled by a **throttle** valve that varies the *quantity* of mixture (quantity governing).`,
      },
      {
        id: 'ci',
        title: 'Four-stroke diesel (CI) engine (§24.4)',
        body: md`The same four strokes, with three key differences:

1. **Suction** draws in **air only**.
2. **Compression** is much higher (r ≈ 14–21), so the air reaches about 30–45 bar and 500–700 °C — above the self-ignition temperature of diesel.
3. Near the end of compression, the **fuel injector** sprays fuel into the hot air; it **ignites by itself**. Burning continues as the piston moves down (≈ constant pressure).

![Four-stroke CI engine](diagram:four-stroke-ci)

Load is controlled by varying the *quantity of fuel* injected while the air is not throttled (quality governing).`,
      },
      {
        id: 'compare',
        title: 'Petrol vs diesel engine (book table, §24.5)',
        body: md`| Petrol (SI) engine | Diesel (CI) engine |
|---|---|
| Works on Otto cycle | Works on Diesel cycle |
| Petrol–air mixture drawn in | Air alone drawn in |
| Carburettor prepares the mixture | Fuel pump and injector |
| Spark ignition | Compression (self) ignition |
| Compression ratio 4–10 | Compression ratio 14–21 |
| Lighter; lower initial cost | Heavier (higher pressures); higher initial cost |
| Higher running cost (costlier fuel) | Lower running cost |
| Lower thermal efficiency | Higher thermal efficiency |
| Quantity governing (throttle) | Quality governing (fuel quantity) |
| High speed, light vehicles | Heavy vehicles, stationary plants, ships |
| Starting easy | Starting harder (high compression) |

> [!NOTE] Pollution
> The book lists petrol engines as "less polluting". That is true of smoke and particulates. Petrol engines emit more CO and unburnt hydrocarbons, while diesels emit more NOₓ and soot — see *Emissions* in the combustion topics.`,
      },
    ],
    keyPoints: [
      'Four-stroke: suction, compression, power, exhaust — one power stroke per two revolutions.',
      'SI draws in mixture and uses a spark; CI draws in air only and fuel self-ignites on injection.',
      'SI: throttle (quantity) governing; CI: fuel quantity (quality) governing.',
      'CI engines are heavier but more efficient because of their higher compression ratio.',
    ],
    misconceptions: [
      'Thinking a diesel compresses the fuel. It compresses air only; fuel is injected at the end of compression.',
    ],
    flashcards: [
      { id: 'u4-f4', front: 'How many crank revolutions per cycle in a four-stroke engine?', back: 'Two (one power stroke every two revolutions).' },
      { id: 'u4-f5', front: 'What is drawn in during suction in SI vs CI engines?', back: 'SI: air–petrol mixture. CI: air only.' },
      { id: 'u4-f6', front: 'Quantity vs quality governing?', back: 'SI varies the quantity of mixture with a throttle; CI varies the fuel quantity (mixture strength) with unthrottled air.' },
    ],
  },
  {
    id: 'u4-two-stroke',
    unitId: 'u4',
    title: 'Two-stroke engines',
    summary: 'Ports instead of valves, crankcase compression and scavenging — and the trade-offs against four-stroke engines.',
    syllabusPhrases: ['two stroke'],
    coverage: 'full',
    refs: [{ chapter: 24, section: '§24.3.1, §24.4.2, §24.6–24.7', pages: '781–792' }],
    diagrams: ['two-stroke'],
    sections: [
      {
        id: 'working',
        title: 'Working (§24.3.1)',
        body: md`A two-stroke engine completes its cycle in **two strokes = one revolution**. Valves are replaced by three **ports** in the cylinder wall, uncovered and covered by the piston itself: **inlet**, **transfer** and **exhaust**.

**Upward stroke (BDC → TDC):**
- Above the piston: the charge already in the cylinder is **compressed**; the spark fires near TDC.
- Below the piston: the rising piston creates a vacuum in the sealed **crankcase**; the inlet port opens and fresh mixture enters the crankcase.

**Downward stroke (TDC → BDC):**
- Above the piston: burning gas expands — **power**. Near the end, the piston uncovers the **exhaust port** and burnt gas rushes out.
- Below the piston: the mixture in the crankcase is **compressed lightly**. The piston then uncovers the **transfer port**, and this mixture enters the cylinder, pushing the remaining exhaust out (**scavenging**). A **deflector** on the piston crown directs the fresh charge upward to reduce its loss through the exhaust port.

![Two-stroke engine](diagram:two-stroke)

In a two-stroke **diesel**, air only is admitted (often from a blower) and fuel is injected near TDC.`,
      },
      {
        id: 'compare',
        title: 'Advantages and disadvantages (§24.6–24.7)',
        body: md`**Advantages over a four-stroke engine:**
- one power stroke **every revolution** — theoretically twice the power from the same size and speed;
- lighter, more compact, simpler (no valves or valve gear), cheaper;
- more uniform torque, so a lighter flywheel;
- can run in either direction.

**Disadvantages:**
- poorer **scavenging**: some fresh charge escapes with the exhaust, and some exhaust stays in the cylinder;
- higher **fuel consumption** and lower thermal efficiency in petrol two-strokes;
- more **lubricating oil** consumption (oil mixed with petrol in crankcase-scavenged engines) and more smoke and HC emissions;
- greater **heating** because of more frequent power strokes, which also raises wear;
- part of the stroke is lost to port opening, so actual power is about 1.6–1.8× (not 2×) that of a four-stroke engine.

Two-strokes are used in small motorcycles, scooters, lawn mowers and outboard motors, and — as large, efficient, uniflow-scavenged diesels — in ship propulsion.`,
      },
    ],
    keyPoints: [
      'Two-stroke: one power stroke per revolution; ports (inlet, transfer, exhaust) replace valves.',
      'Crankcase compression transfers fresh charge; the deflector piston aids scavenging.',
      'Pros: lighter, simpler, more uniform torque. Cons: poor scavenging, charge loss, higher fuel and oil consumption.',
      'Actual power ≈ 1.6–1.8× a comparable four-stroke, not 2×.',
    ],
    misconceptions: [
      'Assuming a two-stroke gives exactly twice the power of a four-stroke — charge losses and lost stroke prevent it.',
    ],
    flashcards: [
      { id: 'u4-f7', front: 'Three ports of a two-stroke petrol engine?', back: 'Inlet port, transfer port, exhaust port.' },
      { id: 'u4-f8', front: 'Define scavenging.', back: 'Clearing the cylinder of burnt gas by the incoming fresh charge.' },
      { id: 'u4-f9', front: 'Main disadvantage of a two-stroke petrol engine?', back: 'Fresh charge escapes with the exhaust (poor scavenging) → high fuel consumption and emissions.' },
    ],
  },
  {
    id: 'u4-timing',
    unitId: 'u4',
    title: 'Valve and port timing diagrams',
    summary: 'Why valves open early and close late, and how to read SI, CI and two-stroke timing diagrams.',
    syllabusPhrases: ['valve and port timing diagram'],
    coverage: 'full',
    refs: [{ chapter: 24, section: '§24.3, §24.4.1', pages: '783–788' }],
    diagrams: ['valve-timing-si', 'valve-timing-ci', 'port-timing-2s'],
    sections: [
      {
        id: 'why',
        title: 'Why the theoretical timing is not used',
        body: md`In the ideal four-stroke cycle each valve would open and close exactly at a dead centre. In practice valves take time to open, and gas has inertia, so **actual valve timing** spreads each event:

- **Inlet valve opens before TDC** (IVO) — so it is fully open when suction starts.
- **Inlet valve closes after BDC** (IVC) — the inertia of the incoming charge keeps it flowing in even as the piston begins to rise, improving volumetric efficiency.
- **Exhaust valve opens before BDC** (EVO) — sacrifices a little expansion work so pressure is already low when the exhaust stroke begins, reducing pumping work ("blowdown").
- **Exhaust valve closes after TDC** (EVC) — the outgoing gas's momentum scavenges the clearance space.

> [!DEF] Valve overlap
> The crank angle near TDC during which **both** inlet and exhaust valves are open (from IVO to EVC). It helps scavenging; too much overlap lets fresh charge escape, which is why SI engines use less overlap than CI engines.

Angles are read on a circle **in the direction of crank rotation, from TDC**.`,
      },
      {
        id: 'si',
        title: 'Four-stroke SI timing',
        body: md`![Valve timing — SI](diagram:valve-timing-si)

The **spark** occurs before TDC (ignition advance), so that peak pressure develops just after TDC — the mixture needs a finite time to burn.`,
      },
      {
        id: 'ci',
        title: 'Four-stroke CI timing',
        body: md`![Valve timing — CI](diagram:valve-timing-ci)

Instead of a spark, **fuel injection** starts before TDC and continues past it. CI engines usually have **larger valve overlap** because only air is admitted — any that escapes is no loss of fuel.`,
      },
      {
        id: 'port',
        title: 'Two-stroke port timing',
        body: md`Ports are opened and closed by the piston, so the diagram is **symmetrical about BDC** (for the exhaust and transfer ports) and about TDC (for the crankcase inlet port).

![Port timing — two-stroke](diagram:port-timing-2s)

Sequence around BDC: exhaust port opens → transfer port opens → (scavenging) → transfer port closes → exhaust port closes. The exhaust opens first so the cylinder pressure falls below the crankcase pressure before transfer begins.`,
      },
    ],
    keyPoints: [
      'IVO before TDC, IVC after BDC, EVO before BDC, EVC after TDC.',
      'Valve overlap: both valves open around TDC; larger in CI engines.',
      'Spark (SI) or injection (CI) begins before TDC so peak pressure occurs just after TDC.',
      'Port timing is symmetrical about the dead centres because the piston opens and closes the ports.',
    ],
    misconceptions: [
      'Drawing valve events exactly at TDC/BDC — that is the theoretical diagram, not the actual one.',
    ],
    flashcards: [
      { id: 'u4-f10', front: 'Why does the inlet valve close after BDC?', back: 'Inertia of the incoming charge keeps it flowing in → better volumetric efficiency.' },
      { id: 'u4-f11', front: 'Why does the exhaust valve open before BDC?', back: 'Blowdown lowers cylinder pressure before the exhaust stroke, reducing pumping work.' },
      { id: 'u4-f12', front: 'Define valve overlap.', back: 'Period near TDC when both inlet and exhaust valves are open.' },
    ],
  },
  {
    id: 'u4-si-combustion',
    unitId: 'u4',
    title: 'SI combustion, knocking (detonation) and emissions',
    summary: 'The three stages of SI combustion, the theory of detonation, factors that cause it, and SI emissions.',
    syllabusPhrases: ['Principles of combustion, knocking and emissions in SI engine', 'theory of detonation'],
    coverage: 'partial',
    coverageNote: 'Combustion stages and the theory of detonation are covered (§24.11.1–24.11.2). Factors affecting detonation, its control and SI emissions are not in the book and are added as supplementary sections.',
    refs: [{ chapter: 24, section: '§24.11.1–24.11.2', pages: '800–802' }],
    diagrams: ['si-combustion', 'detonation'],
    sections: [
      {
        id: 'stages',
        title: 'Stages of combustion in an SI engine (§24.11.1)',
        body: md`![Pressure–crank angle in an SI engine](diagram:si-combustion)

1. **Ignition lag (preparation phase)** — from the spark (A) to a noticeable rise in pressure (B). A small flame kernel forms around the plug and grows slowly; the time depends on the fuel's chemistry, temperature, pressure and mixture strength. It is a **chemical** process.
2. **Flame propagation** — from B to the peak pressure (C). A turbulent flame front sweeps across the chamber, and pressure rises rapidly. The rate depends on turbulence, mixture strength and compression ratio.
3. **After-burning** — from C onward. The remaining fuel burns as the piston moves down; pressure falls because of expansion.

> [!EXAM] Why advance the spark?
> Ignition lag and flame travel take a fixed **time**. At higher speed the crank turns through more degrees in that time, so the spark must be **advanced** with speed to keep peak pressure just after TDC.`,
      },
      {
        id: 'detonation',
        title: 'Theory of detonation (§24.11.2)',
        body: md`> [!DEF] Detonation (knock)
> Spontaneous, almost instantaneous auto-ignition of the **end gas** — the last part of the unburnt charge — ahead of the normal flame front.

![Detonation](diagram:detonation)

**Mechanism.** As the flame front advances it compresses and heats the unburnt end gas (by compression and by radiation from the flame). If the end gas reaches its **self-ignition temperature** and stays there longer than its **ignition delay** before the flame arrives, it ignites spontaneously throughout its volume. The resulting **pressure wave** travels at sonic speed, collides with the normal flame front and reflects from the chamber walls. These colliding waves cause the characteristic **metallic pinging** sound.

**Effects of detonation:**
- loud noise and vibration;
- mechanical damage — pitted piston crowns, broken rings, damaged bearings;
- high heat transfer to the walls (scrubbed boundary layer) → overheating, pre-ignition, loss of power and efficiency;
- carbon deposits and increased wear.`,
      },
      {
        id: 'factors',
        title: 'Factors affecting detonation',
        supplementary: true,
        body: md`> [!SUPP] Not treated in Rathore
> The book explains the mechanism but not the influencing factors. The logic: anything that makes the end gas **hotter or denser**, gives it **more time**, or uses a fuel with a **shorter ignition delay** promotes knock.

| Factor | Effect on knock | Why |
|---|---|---|
| Higher compression ratio | Increases | Hotter, denser end gas |
| Higher inlet temperature or pressure (supercharging) | Increases | Hotter end gas |
| Spark advance | Increases | Peak pressure earlier; end gas compressed longer |
| Higher coolant / wall temperature | Increases | Less cooling of end gas |
| Higher engine speed | Decreases | More turbulence → faster flame |
| Longer flame travel (large bore, off-centre plug) | Increases | End gas has more time |
| Turbulence, compact chamber, central plug | Decreases | Faster flame, shorter travel |
| Rich mixture slightly / very lean or very rich | Decreases away from ≈ stoichiometric | Slower reaction of end gas |
| Fuel with high octane number | Decreases | Longer ignition delay |
| Anti-knock additives, EGR | Decreases | Delay ignition / cooler charge |

**Octane number** is the percentage by volume of **iso-octane** in a mixture with **n-heptane** that knocks with the same intensity as the fuel under test. High octane = good anti-knock quality for SI engines.

**Control:** retard the spark (knock sensors do this automatically), use higher-octane fuel, cool the charge (intercooled turbochargers), design compact turbulent chambers with a central plug.`,
      },
      {
        id: 'emissions',
        title: 'Emissions from SI engines',
        supplementary: true,
        body: md`> [!SUPP] Not treated in Rathore
> Emissions appear in the syllabus but not in Chapter 24.

| Pollutant | Main cause in an SI engine | Control |
|---|---|---|
| **CO** (carbon monoxide) | Rich mixture — insufficient O₂ for full oxidation (cold start, full load, idle) | Correct air–fuel ratio, three-way catalyst |
| **HC** (unburnt hydrocarbons) | Flame quenching at cold walls and in crevices; oil films; misfire; charge short-circuiting in two-strokes | Better chamber design, catalyst, avoid two-stroke scavenging losses |
| **NOₓ** (NO, NO₂) | High peak flame temperature with available O₂ — maximum near slightly lean mixtures | Exhaust gas recirculation (EGR), retarded spark, three-way catalyst |
| Evaporative HC, lead (old fuels) | Fuel tank and carburettor vapour; leaded petrol | Charcoal canister; unleaded fuel |

A **three-way catalytic converter** (Pt/Pd/Rh) oxidises CO and HC and reduces NOₓ at the same time — but only in a narrow window near the **stoichiometric** air–fuel ratio (≈ 14.7:1), which is why modern SI engines use oxygen-sensor (λ) feedback control.`,
      },
    ],
    keyPoints: [
      'SI combustion stages: ignition lag → flame propagation → after-burning.',
      'Spark is advanced with speed because lag and flame travel take a fixed time.',
      'Detonation = auto-ignition of the end gas ahead of the flame; pressure waves cause knock.',
      'Knock increases with compression ratio, inlet temperature, spark advance and flame travel; decreases with turbulence and octane number. (Supplementary.)',
      'SI emissions: CO (rich), HC (quenching, crevices), NOₓ (high temperature); three-way catalyst at stoichiometric. (Supplementary.)',
    ],
    misconceptions: [
      'Confusing detonation with pre-ignition. Pre-ignition is ignition by a hot spot *before* the spark; detonation is auto-ignition of the end gas *after* it.',
      'Thinking a high-octane fuel has more energy. Octane rating measures resistance to knock, not heating value.',
    ],
    flashcards: [
      { id: 'u4-f13', front: 'Three stages of combustion in an SI engine?', back: 'Ignition lag (preparation), flame propagation, after-burning.' },
      { id: 'u4-f14', front: 'Define detonation.', back: 'Auto-ignition of the unburnt end gas ahead of the flame front, producing pressure waves and knock.' },
      { id: 'u4-f15', front: 'Define octane number.', back: '% iso-octane in an iso-octane/n-heptane blend that knocks like the test fuel.' },
      { id: 'u4-f16', front: 'Effect of compression ratio on SI knock?', back: 'Higher r → hotter, denser end gas → more knock.' },
    ],
  },
  {
    id: 'u4-ci-combustion',
    unitId: 'u4',
    title: 'CI combustion, diesel knock and emissions',
    summary: 'The four stages of CI combustion, why diesel knock happens at the start of combustion, and diesel emissions.',
    syllabusPhrases: ['Principles of combustion, knocking and emissions in CI engine'],
    coverage: 'partial',
    coverageNote: 'The stages of CI combustion are covered (§24.11.3). Diesel knock, cetane number and CI emissions are not in the book and are added as supplementary sections.',
    refs: [{ chapter: 24, section: '§24.11.3', pages: '802–803' }],
    diagrams: ['ci-combustion'],
    sections: [
      {
        id: 'stages',
        title: 'Stages of combustion in a CI engine (§24.11.3)',
        body: md`![Pressure–crank angle in a CI engine](diagram:ci-combustion)

1. **Ignition delay** — from the start of injection to the start of combustion. Fuel droplets must atomise, evaporate, mix with hot air and undergo pre-flame reactions. Divided into a **physical delay** (atomisation, evaporation, mixing) and a **chemical delay** (pre-flame reactions).
2. **Rapid (uncontrolled) combustion** — the fuel that accumulated during the delay ignites almost at once, causing a steep pressure rise. The longer the delay, the more fuel accumulates and the harsher this phase.
3. **Controlled combustion** — fuel injected from now on burns almost as soon as it enters, because the chamber is already hot; the rate of burning is controlled by the injection rate. Peak pressure and temperature occur here.
4. **After-burning** — any remaining fuel burns during expansion, after injection has stopped.`,
      },
      {
        id: 'knock',
        title: 'Diesel knock',
        supplementary: true,
        body: md`> [!SUPP] Not treated in Rathore

> [!DEF] Diesel knock
> Excessively rapid pressure rise at the **start** of combustion, caused by a long ignition delay that lets too much fuel accumulate before it ignites.

**Diesel knock vs SI detonation:**

| | SI detonation | CI knock |
|---|---|---|
| When | **End** of combustion (end gas) | **Beginning** of combustion |
| Cause | Auto-ignition of end gas — *short* ignition delay of end gas is bad | Accumulated fuel — *long* ignition delay is bad |
| Wanted fuel property | Long ignition delay → high **octane** | Short ignition delay → high **cetane** |
| Effect of higher compression ratio | Promotes knock | **Reduces** knock (hotter air, shorter delay) |
| Effect of higher inlet temperature | Promotes knock | Reduces knock |

So the factors that *cause* knock in one engine tend to *prevent* it in the other.

**Cetane number**: % of **n-cetane** in a mixture with **α-methylnaphthalene** that has the same ignition delay as the test fuel. High cetane = short delay = smooth combustion.

**Control:** high-cetane fuel, higher compression ratio, higher intake temperature, good swirl and atomisation, pilot injection (a small early injection that starts combustion before the main charge).`,
      },
      {
        id: 'emissions',
        title: 'Emissions from CI engines',
        supplementary: true,
        body: md`> [!SUPP] Not treated in Rathore

| Pollutant | Main cause in a CI engine | Control |
|---|---|---|
| **NOₓ** | High local flame temperatures in the diffusion flame; excess oxygen everywhere | EGR, injection retard, selective catalytic reduction (urea/AdBlue) |
| **Particulate matter / soot (smoke)** | Locally rich zones in the spray burn incompletely; worse at high load | High-pressure common-rail injection, swirl, diesel particulate filter (DPF) |
| **HC** | Over-lean mixture at spray edges, fuel after injection ends, cold start | Diesel oxidation catalyst |
| **CO** | Low overall, because diesels run lean | Diesel oxidation catalyst |
| **SO₂** | Sulphur in fuel | Ultra-low-sulphur diesel |

There is a classic **NOₓ–soot trade-off**: measures that lower combustion temperature (retard, EGR) reduce NOₓ but increase soot, and vice versa. Modern diesels meet emission norms (e.g. Bharat Stage VI) with EGR + DPF + SCR together.`,
      },
    ],
    keyPoints: [
      'CI combustion stages: ignition delay → rapid (uncontrolled) combustion → controlled combustion → after-burning.',
      'Ignition delay = physical (atomise, evaporate, mix) + chemical (pre-flame reactions).',
      'Diesel knock: too much fuel accumulates during a long delay; occurs at the start of combustion. (Supplementary.)',
      'High cetane, high r and high intake temperature reduce diesel knock — the opposite of SI. (Supplementary.)',
      'CI emissions: mainly NOₓ and soot, with a trade-off between them. (Supplementary.)',
    ],
    misconceptions: [
      'Assuming knock remedies are the same for SI and CI engines. Many factors act in opposite directions.',
    ],
    flashcards: [
      { id: 'u4-f17', front: 'Four stages of CI combustion?', back: 'Ignition delay, rapid (uncontrolled) combustion, controlled combustion, after-burning.' },
      { id: 'u4-f18', front: 'What causes diesel knock?', back: 'A long ignition delay that lets excess fuel accumulate and then burn all at once.' },
      { id: 'u4-f19', front: 'Define cetane number.', back: '% n-cetane in an n-cetane/α-methylnaphthalene blend with the same ignition delay as the test fuel.' },
      { id: 'u4-f20', front: 'Main pollutants of a CI engine?', back: 'NOₓ and particulate matter (soot), with a trade-off between them.' },
    ],
  },
]

/* ----------------------------------------------------------------------------- */

export const examples: WorkedExample[] = [
  {
    id: 'gen-u4-1',
    topicId: 'u4-classification',
    title: 'Swept volume, clearance volume and piston speed',
    source: { kind: 'generated' },
    difficulty: 1,
    statement: md`A single-cylinder four-stroke petrol engine has a bore of 80 mm, a stroke of 100 mm and a compression ratio of 8. It runs at 3000 rpm. Find the swept volume, the clearance volume, the mean piston speed and the number of power strokes per minute.`,
    given: ['d = 0.08 m, L = 0.1 m, r = 8, N = 3000 rpm, four-stroke'],
    find: ['V_s', 'V_c', 'Mean piston speed', 'Power strokes per minute'],
    approach: md`$V_s = \frac{\pi}{4}d^2L$; $V_c = V_s/(r-1)$; piston speed $= 2LN/60$; a four-stroke engine fires once every two revolutions.`,
    steps: [
      { label: 'Swept volume', work: md`$V_s = \frac{\pi}{4}(0.08)^2(0.1) = 5.027 \times 10^{-4}$ m³ $= 502.7$ cc` },
      { label: 'Clearance volume', work: md`$V_c = 502.7/(8-1) = 71.8$ cc` },
      { label: 'Mean piston speed', work: md`$\bar u_p = 2(0.1)(3000)/60 = 10$ m/s` },
      { label: 'Power strokes', work: md`$N/2 = 1500$ per minute (a two-stroke engine would give 3000)` },
    ],
    answer: md`V<sub>s</sub> = 502.7 cc, V<sub>c</sub> = 71.8 cc, 10 m/s, 1500 power strokes/min`,
    concept: 'Basic engine geometry links bore, stroke and compression ratio to the volumes used in every cycle calculation.',
  },
  {
    id: 'gen-u4-2',
    topicId: 'u4-timing',
    title: 'Reading a valve timing diagram',
    source: { kind: 'generated' },
    difficulty: 1,
    statement: md`A four-stroke SI engine has the following valve timing: inlet valve opens 15° before TDC and closes 30° after BDC; exhaust valve opens 50° before BDC and closes 10° after TDC. Find the duration of the inlet and exhaust valve openings and the valve overlap, in degrees of crank angle.`,
    given: ['IVO 15° bTDC, IVC 30° aBDC', 'EVO 50° bBDC, EVC 10° aTDC'],
    find: ['Inlet open period', 'Exhaust open period', 'Valve overlap'],
    approach: md`Add the angles on either side of the 180° stroke; overlap is the period both are open around TDC.`,
    steps: [
      { label: 'Inlet', work: md`$15 + 180 + 30 = 225°$` },
      { label: 'Exhaust', work: md`$50 + 180 + 10 = 240°$` },
      { label: 'Overlap', work: md`IVO 15° before TDC to EVC 10° after TDC: $15 + 10 = 25°$` },
    ],
    answer: md`Inlet 225°, exhaust 240°, overlap 25°`,
    concept: 'Each valve is open for more than 180° because it opens early and closes late.',
  },
]

/* ----------------------------------------------------------------------------- */

export const questions: Question[] = [
  {
    id: 'q-u4-1', topicId: 'u4-four-stroke', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'In a four-stroke engine, one power stroke is obtained in every:',
    options: ['Half revolution', 'One revolution', 'Two revolutions', 'Four revolutions'],
    answer: 2,
    solution: md`Four strokes take two crankshaft revolutions, and only one of them is a power stroke.`,
  },
  {
    id: 'q-u4-2', topicId: 'u4-four-stroke', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'During the suction stroke of a CI engine, the cylinder receives:',
    options: ['Air–fuel mixture', 'Air only', 'Fuel only', 'Exhaust gas'],
    answer: 1,
    solution: md`A diesel engine compresses air only; fuel is injected near the end of compression.`,
  },
  {
    id: 'q-u4-3', topicId: 'u4-timing', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'In an actual valve timing diagram, the inlet valve closes:',
    options: ['Before BDC', 'At BDC', 'After BDC', 'At TDC'],
    answer: 2,
    solution: md`The charge's inertia keeps it flowing into the cylinder after BDC, so the inlet valve is closed late to improve volumetric efficiency.`,
  },
  {
    id: 'q-u4-4', topicId: 'u4-si-combustion', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Detonation in an SI engine is caused by:',
    options: ['Ignition of the charge by a hot spot before the spark', 'Auto-ignition of the end gas ahead of the flame front', 'Too long an ignition delay of the injected fuel', 'Low compression ratio'],
    answer: 1,
    solution: md`Detonation is spontaneous ignition of the unburnt end gas. Option A is pre-ignition; option C describes diesel knock.`,
  },
  {
    id: 'q-u4-5', topicId: 'u4-ci-combustion', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Which change reduces knock in a CI engine?',
    options: ['Lower compression ratio', 'Lower intake temperature', 'Higher cetane fuel', 'Longer ignition delay'],
    answer: 2,
    solution: md`High cetane means a short ignition delay, so less fuel accumulates before ignition. The others all lengthen the delay and worsen diesel knock. (Supplementary topic.)`,
  },
  {
    id: 'q-u4-6', topicId: 'u4-two-stroke', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'In a two-stroke petrol engine, fresh charge enters the cylinder through the:',
    options: ['Inlet valve', 'Transfer port', 'Exhaust port', 'Inlet port directly'],
    answer: 1,
    solution: md`The charge first enters the crankcase through the inlet port, is compressed there, then passes into the cylinder through the transfer port.`,
  },
  {
    id: 'q-u4-7', topicId: 'u4-si-combustion', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'The anti-knock rating of petrol is expressed by its:',
    options: ['Cetane number', 'Octane number', 'Calorific value', 'Flash point'],
    answer: 1,
    solution: md`Octane number rates SI fuels' resistance to knock; cetane number rates CI fuels' ignition quality. (Supplementary.)`,
  },
  {
    id: 'q-u4-8', topicId: 'u4-four-stroke', type: 'long', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 24 Review Questions', page: 834 },
    prompt: 'Explain the working of a four-stroke petrol engine with neat sketches.',
    hints: ['Name each stroke and the state of the valves.', 'Where does ignition occur?'],
    solution: md`**Suction:** inlet valve open, piston TDC → BDC, mixture drawn in. **Compression:** both valves closed, piston BDC → TDC, mixture compressed (r ≈ 6–10), spark near the end. **Power:** combustion at near-constant volume, high-pressure gas drives the piston down. **Exhaust:** exhaust valve open, piston pushes burnt gas out. One power stroke per two revolutions; a flywheel carries the engine through the other three strokes. Sketch: piston in cylinder with inlet/exhaust valves and spark plug for each stroke.`,
  },
  {
    id: 'q-u4-9', topicId: 'u4-four-stroke', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 24 Review Questions', page: 834 },
    prompt: 'Compare SI and CI engines.',
    solution: md`Cycle (Otto vs Diesel); charge (mixture vs air); fuel system (carburettor vs injection pump); ignition (spark vs compression); compression ratio (4–10 vs 14–21); weight and cost (lighter, cheaper vs heavier, costlier); efficiency (lower vs higher); governing (quantity vs quality); use (light, high-speed vs heavy-duty).`,
  },
  {
    id: 'q-u4-10', topicId: 'u4-two-stroke', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 24 Review Questions', page: 834 },
    prompt: 'What are the advantages and disadvantages of a two-stroke engine over a four-stroke engine?',
    solution: md`**Advantages:** one power stroke per revolution, so more power for the same size; lighter, simpler (no valves), cheaper; more uniform torque, lighter flywheel. **Disadvantages:** poor scavenging and loss of fresh charge; higher fuel and lube-oil consumption; more emissions; more heating and wear; actual power only about 1.6–1.8× a four-stroke.`,
  },
  {
    id: 'q-u4-11', topicId: 'u4-timing', type: 'diagram', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 24 Review Questions', page: 834 },
    prompt: 'Draw the actual valve timing diagram of a four-stroke diesel engine and explain why the valves are not opened and closed at the dead centres.',
    hints: ['Mark IVO, IVC, EVO, EVC, injection start and end.'],
    solution: md`See the **CI valve timing** diagram. Typical: IVO 10–25° before TDC, IVC 25–50° after BDC, EVO 30–50° before BDC, EVC 10–15° after TDC, injection starting about 10–15° before TDC. Reasons: valves need time to open fully; inertia of the incoming air keeps it entering after BDC; early exhaust opening gives blowdown and less pumping work; late exhaust closing uses the gas momentum for scavenging. Overlap is larger than in SI engines because only air is admitted.`,
  },
  {
    id: 'q-u4-12', topicId: 'u4-si-combustion', type: 'long', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 24 Review Questions', page: 834 },
    prompt: 'Explain the stages of combustion in an SI engine and the phenomenon of detonation.',
    hints: ['Use the p–θ diagram.', 'What happens to the end gas?'],
    solution: md`Stages: ignition lag (spark to visible pressure rise; chemical), flame propagation (rapid pressure rise to the peak), after-burning (remaining fuel burns during expansion). Detonation: the advancing flame compresses and heats the end gas; if it reaches its self-ignition temperature and its ignition delay runs out before the flame arrives, it auto-ignites, sending pressure waves that collide with the flame front and walls — the knock. Effects: noise, vibration, overheating, mechanical damage, power loss.`,
  },
  {
    id: 'q-u4-13', topicId: 'u4-ci-combustion', type: 'long', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Explain the stages of combustion in a CI engine. Why is a long ignition delay undesirable?',
    solution: md`Stages: ignition delay (physical + chemical); rapid uncontrolled combustion of the fuel accumulated during the delay; controlled combustion governed by the injection rate; after-burning. A long delay lets more fuel accumulate, so when it ignites the pressure rises very steeply — harsh running and diesel knock.`,
  },
  {
    id: 'q-u4-14', topicId: 'u4-ci-combustion', type: 'conceptual', difficulty: 3, source: { kind: 'generated' },
    prompt: 'A higher compression ratio promotes knock in a petrol engine but reduces it in a diesel engine. Explain.',
    solution: md`In an SI engine knock is auto-ignition of the *end gas*: higher r makes the end gas hotter and denser, shortening its ignition delay so it auto-ignites before the flame arrives. In a CI engine knock is caused by a *long* ignition delay of the injected fuel; higher r makes the compressed air hotter, which *shortens* the delay, so less fuel accumulates and combustion starts smoothly. The same physical change helps one engine and harms the other because the knock mechanisms are opposite. (Supplementary.)`,
  },
  {
    id: 'q-u4-15', topicId: 'u4-classification', type: 'numerical', difficulty: 1, source: { kind: 'generated' },
    prompt: 'A four-cylinder engine has a bore of 75 mm and a stroke of 90 mm. Its total clearance volume is 200 cc. Find the cubic capacity and the compression ratio.',
    hints: ['Compression ratio uses one cylinder\'s V_s and V_c (or totals of both).'],
    solution: md`$V_s = \frac{\pi}{4}(7.5)^2(9) = 397.6$ cc per cylinder → $4 \times 397.6 = 1590$ cc. Clearance per cylinder $= 50$ cc. $r = (397.6 + 50)/50 = 8.95$.`,
  },
]

/* ----------------------------------------------------------------------------- */

export const formulas: Formula[] = [
  {
    id: 'f-u4-vs', topicId: 'u4-classification', name: 'Swept volume and compression ratio', important: true,
    latex: md`V_s = \frac{\pi}{4}d^2L, \qquad r = \frac{V_c + V_s}{V_c}`,
    vars: [
      { sym: 'd', meaning: 'bore', unit: 'm' },
      { sym: 'L', meaning: 'stroke', unit: 'm' },
      { sym: 'V_c', meaning: 'clearance volume', unit: 'm³' },
    ],
    conditions: 'Per cylinder.',
    meaning: 'Engine displacement and compression ratio.',
    ref: { chapter: 24, section: '§24.2', pages: '780' },
  },
  {
    id: 'f-u4-piston', topicId: 'u4-classification', name: 'Mean piston speed',
    latex: md`\bar u_p = \frac{2LN}{60}`,
    vars: [
      { sym: 'L', meaning: 'stroke', unit: 'm' },
      { sym: 'N', meaning: 'speed', unit: 'rpm' },
    ],
    conditions: '—',
    meaning: 'Average piston velocity; limits engine speed.',
  },
  {
    id: 'f-u4-cycles', topicId: 'u4-four-stroke', name: 'Power strokes per minute',
    latex: md`n = \frac{N}{2}\ \text{(four-stroke)}, \qquad n = N\ \text{(two-stroke)}`,
    vars: [{ sym: 'N', meaning: 'crank speed', unit: 'rpm' }],
    conditions: 'Per cylinder.',
    meaning: 'Number of working cycles per minute.',
  },
]
