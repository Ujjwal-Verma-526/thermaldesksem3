import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 1 — Reciprocating Air Compressor (Rathore Ch. 25)
 * ========================================================================== */

export const topics: Topic[] = [
  {
    id: 'u1-basics',
    unitId: 'u1',
    title: 'Compressor basics and steady-flow analysis',
    summary: 'What a reciprocating compressor is, how its valves work, and the indicated work from the p–V diagram.',
    syllabusPhrases: ['Reciprocating Air Compressor', 'Steady flow analysis'],
    coverage: 'full',
    refs: [{ chapter: 25, section: '§25.1–25.5', pages: '838–846' }],
    diagrams: ['recip-compressor', 'comp-no-clearance'],
    sections: [
      {
        id: 'what',
        title: 'What a compressor does',
        body: md`An **air compressor** takes in atmospheric air, raises its pressure, and delivers it to a receiver. Shaft work goes in; the air leaves at higher pressure *and* higher temperature.

Compressed air drives pneumatic tools, rock drills and riveters, blast furnaces and Bessemer converters, starting systems of diesel engines, brakes on trains and buses, spray painting, and the compressors of gas turbines and jet engines (§25.1).

> [!DEF] Classification (§25.2)
> - By **principle**: *reciprocating* (positive displacement, piston) and *rotary* (vane, roots, screw — positive displacement; centrifugal and axial — dynamic).
> - By **action**: *single-acting* (one side of the piston compresses) and *double-acting* (both sides do, two deliveries per revolution).
> - By **number of stages**: single-stage, multistage.
> - By **pressure**: low (up to ~10 bar), medium (10–80 bar), high (above ~80 bar).

Reciprocating machines suit **low flow, high pressure ratio**; centrifugal machines suit **high flow, moderate pressure ratio** (Unit 2).`,
      },
      {
        id: 'working',
        title: 'Construction and working',
        body: md`A single-acting compressor is a piston–cylinder with a spring-loaded **inlet valve** and **delivery valve** in the head, driven by a crank. The cylinder is finned or water-jacketed.

1. **Suction (c → 1).** The piston moves from TDC to BDC. Pressure in the cylinder falls slightly below atmospheric; the pressure difference opens the inlet valve and air flows in at roughly constant pressure $p_1$.
2. **Compression (1 → 2).** The piston returns. Both valves are shut; the trapped air is compressed along $pV^n = C$.
3. **Delivery (2 → d).** When cylinder pressure slightly exceeds receiver pressure $p_2$, the delivery valve is pushed open and air is delivered at roughly constant $p_2$.

The valves are **not cam-operated** — they open and close on pressure difference alone (a favourite short-answer question).

![Single-acting compressor](diagram:recip-compressor)`,
      },
      {
        id: 'indicated-work',
        title: 'Indicated work without clearance',
        body: md`The indicator diagram (no clearance) is c–1–2–d. Its enclosed area is the work done on the air per cycle:

$$W = \text{area under 2–d} + \text{area under 1–2} - \text{area under c–1}$$

which evaluates (see the derivation tab) to

$$W = \frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}-1\right] = \frac{n}{n-1}\,mR\,(T_2-T_1)$$

![Indicator diagram without clearance](diagram:comp-no-clearance)

> [!NOTE] Steady-flow view
> Rathore builds the result from the three areas on the p–V diagram. The same answer comes out of the steady-flow energy equation for a reversible machine: per kg, $w = -\int v\,dp$, which is exactly the area *between the curve and the p-axis*. That is why compressor work is "$\int V\,dp$" and not "$\int p\,dV$" — the suction and delivery flow-work terms are included.

**Power.** With $N$ rpm and $k$ deliveries per revolution ($k = 1$ single-acting, $k = 2$ double-acting),

$$\text{IP} = \frac{W\,N\,k}{60}, \qquad \dot V = \frac{\pi}{4}d^2L\,N\,k$$

**Mean effective pressure** $p_m$ is the constant pressure that would do the same work over one stroke: $p_m = W/V_s$, so $\text{IP} = p_m L A N k/60$. **Mechanical efficiency** $\eta_m = \text{IP}/\text{BP}$ (BP here is the shaft power *supplied*, so BP > IP).`,
      },
    ],
    derivations: [
      {
        id: 'u1-d-work',
        title: 'Indicated work of a single-stage compressor (no clearance)',
        goal: md`Find the work done on the air per cycle for compression along $pV^n = C$ from $p_1$ to $p_2$.`,
        assumptions: ['No clearance volume', 'Suction and delivery at constant pressures p₁ and p₂', 'Compression follows pVⁿ = C', 'Air is an ideal gas'],
        steps: [
          { math: md`W = p_2V_2 + \frac{p_2V_2-p_1V_1}{n-1} - p_1V_1`, why: md`Delivery flow work (area under 2–d) **plus** compression work (area under 1–2) **minus** the work the atmosphere does on the piston during suction (area under c–1).` },
          { math: md`W = \frac{n}{n-1}\left(p_2V_2-p_1V_1\right)`, why: md`Collect the terms: $(p_2V_2 - p_1V_1)\left(1 + \tfrac{1}{n-1}\right)$.` },
          { math: md`\frac{V_2}{V_1} = \left(\frac{p_1}{p_2}\right)^{1/n}`, why: md`From $p_1V_1^n = p_2V_2^n$.` },
          { math: md`p_2V_2 = p_1V_1\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}`, why: md`Substitute $V_2$; this makes the result depend only on inlet conditions and the pressure ratio.` },
          { math: md`W = \frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}-1\right]`, why: md`Factor out $p_1V_1$.` },
          { math: md`W = \frac{n}{n-1}\,mR\,(T_2-T_1)`, why: md`Using $pV = mRT$ at both ends — handy when the delivery temperature is known.` },
        ],
        result: md`W = \frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}-1\right]`,
        ref: { chapter: 25, section: '§25.5.3', pages: '842–843' },
      },
    ],
    keyPoints: [
      'Compressor work = area enclosed on the p–V diagram = ∫V dp, not ∫p dV.',
      'W = n/(n−1)·p₁V₁[(p₂/p₁)^((n−1)/n) − 1] = n/(n−1)·mR(T₂ − T₁).',
      'Valves are automatic: they open on pressure difference, not by cams.',
      'Double-acting = 2 deliveries per revolution: multiply swept volume (and power) by 2.',
      'Mechanical efficiency of a compressor = IP / shaft power (shaft power is the larger).',
    ],
    misconceptions: [
      'Using ∫p dV (closed-system work) for a compressor — that misses the suction and delivery flow work.',
      'Forgetting the factor 2 for double-acting machines, or using N instead of N/60 for power.',
      'Taking BP < IP for a compressor: for a work-absorbing machine the shaft must supply more than the indicated work.',
    ],
    flashcards: [
      { id: 'u1-f1', front: 'Indicated work of a single-stage compressor (no clearance)?', back: 'W = n/(n−1) · p₁V₁ [ (p₂/p₁)^((n−1)/n) − 1 ]' },
      { id: 'u1-f2', front: 'Why is compressor work ∫V dp rather than ∫p dV?', back: 'The machine is open: suction and delivery flow work (p₁V₁, p₂V₂) are part of the cycle. The enclosed area against the p-axis is ∫V dp.' },
      { id: 'u1-f3', front: 'How do the valves of a reciprocating compressor open?', back: 'Automatically, by pressure difference across spring-loaded valves — no cam.' },
      { id: 'u1-f4', front: 'Swept-volume flow rate of a double-acting compressor?', back: 'V̇ = (π/4)d²·L·N·2 per minute (neglecting the piston-rod area).' },
    ],
  },
  {
    id: 'u1-processes',
    unitId: 'u1',
    title: 'Isothermal, adiabatic and polytropic compression',
    summary: 'Why cooling saves work, how the three processes compare, and the efficiencies used for compressors.',
    syllabusPhrases: ['isothermal, adiabatic and polytropic compression', 'isothermal efficiency'],
    coverage: 'full',
    refs: [{ chapter: 25, section: '§25.6', pages: '846–848' }],
    diagrams: ['comp-processes'],
    sections: [
      {
        id: 'three',
        title: 'Three ways to compress between the same pressures',
        body: md`Take the same suction state and the same delivery pressure:

| Process | Index | Cooling | Work |
|---|---|---|---|
| Isentropic 1–2″ | $n=\gamma$ | none | **largest** |
| Polytropic 1–2 | $1<n<\gamma$ | partial | intermediate |
| Isothermal 1–2′ | $n = 1$ | perfect | **smallest** |

![Three compression processes](diagram:comp-processes)

The reason is physical: compression heats the air, a hotter gas has a larger specific volume, and $\int V\,dp$ grows with $V$. **Keep the air cold and you push less volume up the pressure ladder.**

$$W_{\text{iso}} = p_1V_1\ln\frac{p_2}{p_1}, \qquad W_{\text{isen}} = \frac{\gamma}{\gamma-1}\,p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{\gamma-1}{\gamma}}-1\right]$$

> [!WHY] Why isothermal is the ideal
> Isothermal compression is the minimum-work limit for a cooled machine. It needs all the heat of compression removed as it is generated, which is only possible at very low speed — so real compressors aim to *approach* it.`,
      },
      {
        id: 'efficiencies',
        title: 'Compressor efficiencies',
        body: md`> [!DEF] Isothermal efficiency (§25.6.3)
> $$\eta_{\text{iso}} = \frac{\text{isothermal work}}{\text{actual (indicated) work}}$$
> The figure of merit for **cooled reciprocating** compressors.

> [!DEF] Adiabatic (isentropic) efficiency (§25.6.1)
> $$\eta_{\text{adia}} = \frac{\text{isentropic work}}{\text{actual work}}$$
> Rarely used for reciprocating machines; it is the standard for **uncooled rotary** machines (Unit 2).

Rathore also defines a **compressor efficiency** as isothermal work ÷ indicated work (§25.6.2). With the indicated work as the "actual" work it is numerically the isothermal efficiency.

**Ways to approach isothermal compression** (§25.6.4):
1. Water spray into the cylinder (obsolete).
2. Water jacketing — the standard practice.
3. External fins — for small compressors.
4. Intercoolers between stages of a multistage machine.
5. Cylinder proportions: large bore, short stroke, for more surface per unit volume.`,
      },
    ],
    keyPoints: [
      'For the same p₁, V₁ and p₂: W_isothermal < W_polytropic < W_isentropic.',
      'W_iso = p₁V₁ ln(p₂/p₁); W_isen uses n = γ in the polytropic formula.',
      'η_iso = isothermal work / actual work — the efficiency used for reciprocating compressors.',
      'Delivery temperature T₂ = T₁(p₂/p₁)^((n−1)/n); lower n → cooler delivery → less work.',
    ],
    misconceptions: [
      'Thinking adiabatic compression is "ideal" for a reciprocating compressor. For a cooled machine the ideal is isothermal.',
      'Mixing up which efficiency has isothermal in the numerator: it is always ideal ÷ actual for a work-absorbing machine.',
    ],
    flashcards: [
      { id: 'u1-f5', front: 'Rank isothermal, polytropic and isentropic compression by work for the same pressure ratio.', back: 'Isothermal (least) < polytropic < isentropic (most).' },
      { id: 'u1-f6', front: 'Define isothermal efficiency of a compressor.', back: 'Isothermal work ÷ actual (indicated) work input.' },
      { id: 'u1-f7', front: 'Five ways to bring compression closer to isothermal?', back: 'Water spray, water jacket, fins, intercooling between stages, large-bore short-stroke cylinder proportions.' },
    ],
  },
  {
    id: 'u1-clearance',
    unitId: 'u1',
    title: 'Clearance, volumetric efficiency and FAD',
    summary: 'Why clearance is needed, how its re-expansion cuts suction, and how to compute η_vol and free air delivery.',
    syllabusPhrases: ['compressor clearance', 'volumetric efficiency'],
    coverage: 'full',
    refs: [{ chapter: 25, section: '§25.7–25.10', pages: '849–855' }],
    diagrams: ['comp-clearance', 'comp-actual'],
    sections: [
      {
        id: 'clearance',
        title: 'Clearance volume',
        body: md`> [!DEF] Clearance volume
> The volume left in the cylinder when the piston is at TDC. **Clearance ratio** $c = V_c/V_s$, typically 2–10 %.

It is provided (§25.7) **(i)** so the piston cannot strike the cylinder head and **(ii)** to house the valves, which sit in the clearance space.

The air left in the clearance at $p_2$ must **re-expand** (3 → 4) before fresh air can enter. Suction only starts at 4, so the useful (effective) suction volume is $V_1 - V_4$, not $V_s$.

![Clearance explorer](diagram:comp-clearance)

**Effects of clearance** (§25.7.1):
1. Less air taken in per stroke than the swept volume → lower volumetric efficiency.
2. Larger cylinder (and more power to drive it) for the same delivery.
3. It limits the maximum pressure ratio: when the re-expansion line reaches $V_1$, the compressor delivers nothing.

> [!WHY] Does clearance waste work?
> In the ideal analysis, no. The work spent compressing the clearance air is returned during its re-expansion, so the indicated work is the same as compressing only the effective volume $V_1 - V_4$:
> $$W = \frac{n}{n-1}\,p_1\,(V_1-V_4)\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}-1\right]$$
> Clearance costs **capacity**, not work per kg.`,
      },
      {
        id: 'vol-eff',
        title: 'Volumetric efficiency',
        body: md`> [!DEF] Volumetric efficiency (§25.9)
> $$\eta_{\text{vol}} = \frac{\text{effective swept volume}}{\text{swept volume}} = \frac{V_1-V_4}{V_s}$$
> or, in mass terms, actual mass sucked per stroke ÷ mass that would fill the swept volume at atmospheric conditions.

With $V_c = V_3$ and re-expansion $pV^n = C$:

$$\boxed{\eta_{\text{vol}} = 1 + c - c\left(\frac{p_2}{p_1}\right)^{1/n}}$$

η<sub>vol</sub> **falls** as the pressure ratio rises and as clearance grows.

**Factors that lower volumetric efficiency** (§25.9):
1. Too large a clearance volume (more re-expansion).
2. Obstruction at the inlet valve (throttling: suction below atmospheric).
3. High compressor speed (bigger valve pressure drops, less cooling time).
4. Heated cylinder walls (incoming air expands, less mass enters).
5. Leakage past the piston.

![Actual indicator diagram](diagram:comp-actual)`,
      },
      {
        id: 'fad',
        title: 'Free air delivery (FAD)',
        body: md`> [!DEF] Free air delivery (§25.10)
> The volume of air delivered, **reduced to atmospheric (free) pressure and temperature**, in m³/min.

Suction actually happens at $p_1, T_1$ (a little below and a little hotter than free air at $p_f, T_f$). Reduce the effective volume to free conditions with $pV/T = $ const:

$$V_f = \frac{p_1 T_f}{p_f T_1}\,(V_1 - V_4)$$

and the overall volumetric efficiency referred to free air is

$$\eta_{\text{vol,overall}} = \frac{p_1T_f}{p_fT_1}\left[1+c-c\left(\frac{p_2}{p_1}\right)^{1/n}\right]$$

> [!EXAM] Typical exam question
> Given bore, stroke, rpm, clearance ratio, suction and atmospheric conditions → find FAD and η<sub>vol</sub> referred to free air. See Example 25.11.`,
      },
    ],
    derivations: [
      {
        id: 'u1-d-voleff',
        title: 'Volumetric efficiency in terms of clearance ratio',
        goal: md`Show that $\eta_{\text{vol}} = 1 + c - c\,(p_2/p_1)^{1/n}$.`,
        assumptions: ['Re-expansion 3–4 follows pVⁿ = C with the same n as compression', 'Suction at constant p₁'],
        steps: [
          { math: md`\eta_{\text{vol}} = \frac{V_1-V_4}{V_s}`, why: md`Definition: effective suction volume over swept volume.` },
          { math: md`V_1 = V_s + V_c, \qquad V_3 = V_c`, why: md`At BDC the cylinder holds swept + clearance volume; at TDC only the clearance.` },
          { math: md`V_4 = V_3\left(\frac{p_2}{p_1}\right)^{1/n} = V_c\left(\frac{p_2}{p_1}\right)^{1/n}`, why: md`Clearance air re-expands from $p_2$ to $p_1$ along $pV^n = C$.` },
          { math: md`\eta_{\text{vol}} = \frac{V_s + V_c - V_c\,(p_2/p_1)^{1/n}}{V_s}`, why: md`Substitute both volumes.` },
          { math: md`\eta_{\text{vol}} = 1 + c - c\left(\frac{p_2}{p_1}\right)^{1/n}`, why: md`Divide through by $V_s$ and write $c = V_c/V_s$.` },
        ],
        result: md`\eta_{\text{vol}} = 1 + c - c\left(\frac{p_2}{p_1}\right)^{1/n}`,
        ref: { chapter: 25, section: '§25.9', pages: '852–853' },
      },
    ],
    keyPoints: [
      'Clearance is needed for piston safety and to house the valves; c is usually 2–10 %.',
      'η_vol = 1 + c − c(p₂/p₁)^(1/n): falls with higher pressure ratio and larger clearance.',
      'Ideal clearance does not change work per kg — only capacity (it is returned on re-expansion).',
      'FAD = effective volume reduced to free-air p and T: V_f = (p₁T_f / p_fT₁)(V₁ − V₄).',
      'Clearance sets a maximum pressure ratio at which delivery becomes zero.',
    ],
    misconceptions: [
      'Using V_s instead of V₁ − V₄ when computing mass flow or FAD.',
      'Forgetting to correct suction conditions to free-air conditions for FAD.',
      'Saying clearance wastes work. Ideally it wastes capacity; work per kg delivered is unchanged.',
    ],
    flashcards: [
      { id: 'u1-f8', front: 'η_vol of a compressor with clearance ratio c?', back: '1 + c − c (p₂/p₁)^(1/n)' },
      { id: 'u1-f9', front: 'Two reasons clearance volume is provided.', back: '(1) Prevent the piston hitting the cylinder head. (2) Accommodate the valves.' },
      { id: 'u1-f10', front: 'Define free air delivery.', back: 'Volume of air delivered per minute, reduced to atmospheric (free) pressure and temperature.' },
      { id: 'u1-f11', front: 'Five causes of low volumetric efficiency.', back: 'Large clearance, inlet-valve throttling, high speed, hot cylinder walls, leakage past the piston.' },
    ],
  },
  {
    id: 'u1-multistage',
    unitId: 'u1',
    title: 'Multistage compression and minimum work',
    summary: 'Why high pressure ratios are split into stages, the ideal intermediate pressure, and the minimum work.',
    syllabusPhrases: ['single- and multi-stage compression', 'ideal intermediate pressure', 'minimum work requirement of a compressor'],
    coverage: 'full',
    refs: [{ chapter: 25, section: '§25.11–25.13', pages: '864–875' }],
    diagrams: ['comp-multistage'],
    sections: [
      {
        id: 'why',
        title: 'Why multistage?',
        body: md`A single-stage reciprocating compressor is usually limited to a pressure ratio of about **7** (§25.11). Beyond that:
- clearance air re-expands so far that volumetric efficiency collapses;
- the delivery temperature becomes high enough to char the lubricant;
- the work input grows quickly.

**Multistage compression with intercooling** splits the job between an LP and an HP cylinder (or more), cooling the air back towards $T_1$ in an **intercooler** between them.

**Advantages** (§25.12.1):
1. Very high delivery pressures become possible.
2. More effective cooling — compression is pushed towards isothermal, so less work.
3. Lower pressure ratio per stage → less leakage past the piston and **better volumetric efficiency**.
4. Better mechanical balance and a more uniform torque.
5. Lower working temperature per stage → better lubrication.
6. Higher speed possible for the same isothermal efficiency; the LP cylinder can be lighter and the HP cylinder smaller.

![Multistage explorer](diagram:comp-multistage)

> [!DEF] Perfect intercooling
> The air leaving the intercooler is at the **initial temperature** $T_1$. Then every stage starts on the isotherm through state 1.`,
      },
      {
        id: 'min-work',
        title: 'Ideal intermediate pressure and minimum work',
        body: md`For two stages with perfect intercooling and the same $n$ in both stages, the total work is minimised when

$$\boxed{p_2 = \sqrt{p_1p_3}}\qquad\Longleftrightarrow\qquad \frac{p_2}{p_1} = \frac{p_3}{p_2}$$

**Equal pressure ratios** in both stages — which also means **equal work** in each stage and **equal delivery temperatures** $T_2 = T_3$.

For $k$ stages: each stage ratio is $(p_{k+1}/p_1)^{1/k}$, and

$$W_{\min} = k\,\frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_{k+1}}{p_1}\right)^{\frac{n-1}{kn}}-1\right]$$

> [!WHY] Where the saving comes from
> In the p–V diagram the saving is the area between the single-stage curve and the saw-tooth staged path. As $k \to \infty$ the staged path becomes the isotherm, so the **isothermal work is the absolute minimum** for any compressor.

**Heat rejected.** Per stage, heat leaves during polytropic compression and in the intercooler:
$$Q = m\,c_v\frac{\gamma-n}{n-1}(T_2-T_1) + m\,c_p\,(T_2-T_1)$$
With perfect intercooling the total heat rejected equals the work input (a standard Review Question in Ch 25).

**Cylinder sizes** (§25.13). With perfect intercooling $p_1V_1 = p_2V_2$ for the two suction volumes, so for the same stroke $d_{HP}/d_{LP} = \sqrt{p_1/p_2}$.`,
      },
    ],
    derivations: [
      {
        id: 'u1-d-interp',
        title: 'Ideal intermediate pressure for two-stage compression',
        goal: md`Show that the total work of two-stage compression with perfect intercooling is a minimum when $p_2 = \sqrt{p_1 p_3}$.`,
        assumptions: ['Perfect intercooling: HP suction temperature = T₁', 'Same index n in both stages', 'No clearance (or clearance does not alter work per kg)'],
        steps: [
          { math: md`W = \frac{n}{n-1}p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}-1\right] + \frac{n}{n-1}p_2V_2\left[\left(\frac{p_3}{p_2}\right)^{\frac{n-1}{n}}-1\right]`, why: md`Add the LP and HP stage works.` },
          { math: md`p_2V_2 = p_1V_1`, why: md`Perfect intercooling returns the air to $T_1$, so $pV = mRT_1$ is the same at the start of both stages.` },
          { math: md`W = \frac{n}{n-1}p_1V_1\left[x^{m} + \left(\frac{p_3}{p_1}\right)^{m}x^{-m} - 2\right]`, why: md`Write $x = p_2/p_1$ and $m = (n-1)/n$. Then $p_3/p_2 = (p_3/p_1)/x$, and the two brackets combine into this single expression.` },
          { math: md`\frac{dW}{dx} \propto m\,x^{m-1} - m\left(\frac{p_3}{p_1}\right)^{m}x^{-m-1} = 0`, why: md`Only the bracket depends on $p_2$; set its derivative to zero.` },
          { math: md`x^{2m} = \left(\frac{p_3}{p_1}\right)^{m} \;\Rightarrow\; x^2 = \frac{p_3}{p_1}`, why: md`Rearrange and take the $m$-th root.` },
          { math: md`\frac{p_2^2}{p_1^2} = \frac{p_3}{p_1} \;\Rightarrow\; p_2 = \sqrt{p_1p_3}`, why: md`So $p_2/p_1 = p_3/p_2$: equal stage pressure ratios. The second derivative is positive, so this is a minimum.` },
          { math: md`W_{\min} = 2\,\frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_3}{p_1}\right)^{\frac{n-1}{2n}}-1\right]`, why: md`Substitute back: both stages do equal work.` },
        ],
        result: md`p_2 = \sqrt{p_1p_3}, \qquad W_{\min} = 2\,\frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_3}{p_1}\right)^{\frac{n-1}{2n}}-1\right]`,
        ref: { chapter: 25, section: '§25.12.5–25.12.6', pages: '866–868' },
      },
    ],
    keyPoints: [
      'Single-stage pressure ratio is limited to about 7.',
      'Ideal intermediate pressure (2 stages): p₂ = √(p₁p₃) → equal pressure ratio, equal work, equal temperature per stage.',
      'k stages: stage ratio = (p_final/p₁)^(1/k); W_min = k·n/(n−1)·p₁V₁[(p_final/p₁)^((n−1)/kn) − 1].',
      'Perfect intercooling = air leaves the intercooler at T₁; all stages start on the isotherm.',
      'Isothermal compression is the absolute minimum work; infinite stages would reach it.',
      'Same stroke: d_HP/d_LP = √(p₁/p₂).',
    ],
    misconceptions: [
      'Using √(p₁p₃) when intercooling is imperfect — the optimum then shifts; the formula needs T₁ = T_HP suction.',
      'Thinking more stages always pay. Each stage adds cost and friction; 2–3 stages are typical.',
    ],
    flashcards: [
      { id: 'u1-f12', front: 'Ideal intermediate pressure for 2-stage compression with perfect intercooling?', back: 'p₂ = √(p₁p₃) — equal pressure ratio in each stage.' },
      { id: 'u1-f13', front: 'Minimum work for k stages?', back: 'W = k · n/(n−1) · p₁V₁ [ (p_{k+1}/p₁)^((n−1)/(kn)) − 1 ]' },
      { id: 'u1-f14', front: 'What is perfect intercooling?', back: 'Air is cooled at constant pressure back to the initial suction temperature T₁ before the next stage.' },
      { id: 'u1-f15', front: 'Usual limit on pressure ratio of a single-stage reciprocating compressor?', back: 'About 7.' },
    ],
  },
]

/* ----------------------------------------------------------------------------- */

export const examples: WorkedExample[] = [
  {
    id: 'ex-25-6',
    topicId: 'u1-processes',
    title: 'Power for isothermal, polytropic and isentropic compression',
    source: { kind: 'textbook', ref: 'Example 25.6', page: 848 },
    difficulty: 1,
    statement: md`A single-acting, single-stage reciprocating air compressor of 250-mm bore and 350-mm stroke runs at 200 rpm. The suction and delivery pressures are 1 bar and 6 bar, respectively. Calculate the theoretical power required to run the compressor under each of the following conditions of compression: (a) isothermal, (b) polytropic $n = 1.3$, and (c) isentropic, $\gamma = 1.4$. Neglect the effect of clearance and also calculate isothermal efficiency in each of the above cases.`,
    given: ['d = 0.25 m, L = 0.35 m, N = 200 rpm, single-acting', 'p₁ = 100 kPa, p₂ = 600 kPa', 'n = 1, 1.3, 1.4; no clearance'],
    find: ['Power for each process', 'Isothermal efficiency for each'],
    approach: md`Volume swept per second $\dot V = \frac{\pi}{4}d^2L\,\frac{N}{60}$. Then $P_{\text{iso}} = p_1\dot V\ln(p_2/p_1)$ and $P = \frac{n}{n-1}p_1\dot V[(p_2/p_1)^{(n-1)/n}-1]$.`,
    steps: [
      { label: 'Swept volume', work: md`$V_s = \frac{\pi}{4}(0.25)^2(0.35) = 0.01718\ \text{m}^3$; $\dot V = 0.01718 \times 200/60 = 0.05727\ \text{m}^3/\text{s}$` },
      { label: '(a) Isothermal', work: md`$P = 100 \times 0.05727 \times \ln 6 = 10.26\ \text{kW}$` },
      { label: '(b) n = 1.3', work: md`$P = \frac{1.3}{0.3}(100)(0.05727)\left[6^{0.2308}-1\right] = 24.82 \times 0.5120 = 12.71\ \text{kW}$` },
      { label: '(c) γ = 1.4', work: md`$P = 3.5(100)(0.05727)\left[6^{0.2857}-1\right] = 20.04 \times 0.6685 = 13.40\ \text{kW}$` },
      { label: 'Isothermal efficiencies', work: md`$\eta_{\text{iso}} = 100\%$ (a); $10.26/12.71 = 80.7\%$ (b); $10.26/13.40 = 76.6\%$ (c)` },
    ],
    answer: md`(a) 10.26 kW, 100 %  (b) 12.71 kW, 80.7 %  (c) 13.40 kW, 76.6 %`,
    concept: 'The more heat removed during compression (lower n), the less work is needed.',
    observations: ['The isentropic case needs about 31 % more power than isothermal for the same delivery.'],
    checkNote: 'Re-computed independently: 10.261 / 12.708 / 13.400 kW. The book prints 12.7 and 13.38 kW and efficiencies 80.8 % and 76.67 % (rounding).',
  },
  {
    id: 'ex-25-8',
    topicId: 'u1-clearance',
    title: 'Double-acting compressor with clearance',
    source: { kind: 'textbook', ref: 'Example 25.8', page: 851 },
    difficulty: 2,
    statement: md`A single-stage, double-acting reciprocating air compressor takes in 14 m³ of air per minute measured at 1.013 bar and 15 °C. The delivery pressure is 7 bar and the compressor speed is 300 rpm. The compressor has a clearance volume of 5 % of swept volume with a compression and re-expansion index of $n = 1.3$. Calculate the swept volume of the cylinder, the delivery temperature and the indicated power.`,
    given: ['V̇ = 14 m³/min at 1.013 bar, 288 K', 'p₂ = 7 bar, N = 300 rpm, double-acting', 'c = 0.05, n = 1.3'],
    find: ['Swept volume per cylinder end', 'Delivery temperature', 'Indicated power'],
    approach: md`Air taken per stroke = effective volume $V_1 - V_4 = \eta_{\text{vol}} V_s$. Deliveries per minute $= 2N$.`,
    steps: [
      { label: 'Volume per delivery', work: md`$\dfrac{14}{2 \times 300} = 0.02333\ \text{m}^3$` },
      { label: 'Volumetric efficiency', work: md`$\eta_{\text{vol}} = 1 + 0.05 - 0.05\left(\dfrac{7}{1.013}\right)^{1/1.3} = 1.05 - 0.05(4.425) = 0.8288$` },
      { label: 'Swept volume', work: md`$V_s = 0.02333/0.8288 = 0.02815\ \text{m}^3$` },
      { label: 'Delivery temperature', work: md`$T_2 = 288\left(\dfrac{7}{1.013}\right)^{0.3/1.3} = 449.9\ \text{K} = 176.9\ ^\circ\text{C}$` },
      { label: 'Indicated power', work: md`$P = \dfrac{1.3}{0.3}(101.3)\dfrac{14}{60}\left[\left(\dfrac{7}{1.013}\right)^{0.2308}-1\right] = 102.4 \times 0.5622 = 57.58\ \text{kW}$` },
    ],
    answer: md`$V_s = 0.0281$ m³, $T_2 \approx 177$ °C, IP = 57.58 kW`,
    concept: 'Clearance reduces the effective suction volume; the work per unit of air actually delivered is unchanged.',
    checkNote: 'Matches the book (0.0281 m³, 177 °C, 57.58 kW).',
  },
  {
    id: 'ex-25-11',
    topicId: 'u1-clearance',
    title: 'Free air delivery and overall volumetric efficiency',
    source: { kind: 'textbook', ref: 'Example 25.11', page: 856 },
    difficulty: 2,
    statement: md`A single-stage, single-acting reciprocating air compressor has a bore of 20 cm and a stroke of 30 cm. The compressor runs at 600 rpm. The clearance volume is 4 % of the swept volume and index of expansion and compression is 1.3. The suction conditions are at 0.97 bar and 27 °C and delivery pressure is 5.6 bar. The atmospheric conditions are at 1.01 bar and 17 °C. Determine (a) the free air delivered in m³/min, (b) the volumetric efficiency referred to the free air conditions, and (c) the indicated power.`,
    given: ['d = 0.2 m, L = 0.3 m, N = 600 rpm, single-acting, c = 0.04, n = 1.3', 'Suction 0.97 bar, 300 K; delivery 5.6 bar', 'Free air 1.01 bar, 290 K'],
    find: ['FAD (m³/min)', 'η_vol referred to free air', 'Indicated power'],
    approach: md`Find $V_1 - V_4$ from the clearance relation, reduce it to free conditions with $pV/T$, then use the polytropic work on the effective volume.`,
    steps: [
      { label: 'Volumes', work: md`$V_s = \frac{\pi}{4}(0.2)^2(0.3) = 0.009425$; $V_c = 0.000377$; $V_1 = 0.009802\ \text{m}^3$` },
      { label: 'Re-expansion', work: md`$V_4 = V_c\,(5.6/0.97)^{1/1.3} = 0.000377 \times 3.852 = 0.001452\ \text{m}^3$, so $V_1 - V_4 = 0.008350\ \text{m}^3$` },
      { label: 'Reduce to free air', work: md`$V_f = 0.008350 \times \dfrac{0.97}{1.01}\times\dfrac{290}{300} = 0.007752\ \text{m}^3$ per stroke` },
      { label: '(a) FAD', work: md`$0.007752 \times 600 = 4.65\ \text{m}^3/\text{min}$` },
      { label: '(b) Volumetric efficiency', work: md`$0.007752/0.009425 = 0.822 = 82.2\%$` },
      { label: '(c) Indicated power', work: md`$\dfrac{1.3}{0.3}(97)(0.008350)\left[(5.6/0.97)^{0.2308}-1\right]\times\dfrac{600}{60} = 17.5\ \text{kW}$` },
    ],
    answer: md`FAD = 4.65 m³/min, η<sub>vol</sub> = 82.2 %, IP = 17.5 kW`,
    concept: 'FAD corrects the effective suction volume to atmospheric conditions.',
    checkNote: 'Matches the book (4.65 m³/min, 82.2 %, 17.5 kW).',
  },
  {
    id: 'ex-25-23',
    topicId: 'u1-multistage',
    title: 'Two-stage compressor with ideal intermediate pressure',
    source: { kind: 'textbook', ref: 'Example 25.23', page: 871 },
    difficulty: 2,
    statement: md`A two-stage, single-acting, reciprocating air compressor takes in air at 1 bar and 300 K. Air is discharged at 10 bar. The intermediate pressure is ideal for minimum work and perfect intercooling. The law of compression is $pV^{1.3}$ = constant. The rate of discharge is 0.1 kg/s. Calculate (a) power required to drive the compressor, (b) saving in work in comparison with single stage compression, (c) isothermal efficiency, (d) heat transferred in intercooler. Take $R = 0.287$ kJ/kg·K and $c_p = 1$ kJ/kg·K.`,
    given: ['p₁ = 1 bar, T₁ = 300 K, p₃ = 10 bar', 'n = 1.3, ṁ = 0.1 kg/s', 'R = 0.287, cp = 1 kJ/kg·K'],
    find: ['Power (two-stage)', 'Saving vs single stage', 'Isothermal efficiency', 'Intercooler heat'],
    approach: md`$p_2 = \sqrt{p_1p_3}$. Two equal stages: $P = 2\frac{n}{n-1}\dot mRT_1[(p_2/p_1)^{(n-1)/n}-1]$.`,
    steps: [
      { label: 'Intermediate pressure', work: md`$p_2 = \sqrt{1 \times 10} = 3.162\ \text{bar}$` },
      { label: 'Stage delivery temperature', work: md`$T_2 = 300(3.162)^{0.3/1.3} = 391.3\ \text{K}$` },
      { label: '(a) Two-stage power', work: md`$P = 2 \times \dfrac{1.3}{0.3}(0.1)(0.287)(391.3 - 300) = 22.71\ \text{kW}$` },
      { label: 'Single-stage power', work: md`$T = 300(10)^{0.2308} = 510.4$ K; $P_s = \dfrac{1.3}{0.3}(0.1)(0.287)(210.4) = 26.16\ \text{kW}$` },
      { label: '(b) Saving', work: md`$26.16 - 22.71 = 3.45\ \text{kW}$ (13.2 %)` },
      { label: '(c) Isothermal efficiency', work: md`$P_{\text{iso}} = 0.1(0.287)(300)\ln 10 = 19.83$ kW; $\eta = 19.83/22.71 = 87.3\%$` },
      { label: '(d) Intercooler heat', work: md`$Q = \dot m c_p (T_2 - T_1) = 0.1(1)(91.3) = 9.13\ \text{kW}$` },
    ],
    answer: md`(a) 22.71 kW (b) 3.45 kW saved (13.2 %) (c) 87.3 % (d) 9.13 kW`,
    concept: 'Equal stage pressure ratios minimise total work; the intercooler removes the heat that single-stage compression would have carried forward.',
    checkNote: 'Re-computed: 22.708 kW, 26.164 kW, 87.30 %, 9.130 kW. (The book uses n = 1.3 as stated.)',
  },
  {
    id: 'ex-25-24',
    topicId: 'u1-multistage',
    title: 'Three-stage compression: saving and isothermal efficiency',
    source: { kind: 'textbook', ref: 'Example 25.24', page: 872 },
    difficulty: 2,
    statement: md`In a three-stage compressor, air is compressed from 98 kPa to 20 bar. Calculate for 1 m³ of air per second, (a) work under ideal condition for $n = 1.3$, (b) isothermal work, (c) saving in work due to multistaging, (d) isothermal efficiency.`,
    given: ['p₁ = 98 kPa, p₄ = 2000 kPa, k = 3', 'V̇₁ = 1 m³/s, n = 1.3'],
    find: ['Ideal 3-stage work', 'Isothermal work', 'Saving vs single stage', 'Isothermal efficiency'],
    approach: md`Stage ratio $r = (p_4/p_1)^{1/3}$; $W = 3\frac{n}{n-1}p_1\dot V[r^{(n-1)/n}-1]$.`,
    steps: [
      { label: 'Stage ratio', work: md`$r = (2000/98)^{1/3} = 2.733$` },
      { label: '(a) Three-stage work', work: md`$W = 3 \times \dfrac{1.3}{0.3}(98)(1)\left[2.733^{0.2308}-1\right] = 1274 \times 0.2611 = 332.7\ \text{kW}$` },
      { label: '(b) Isothermal work', work: md`$W = 98 \ln(2000/98) = 295.6\ \text{kW}$` },
      { label: '(c) Single stage and saving', work: md`$W_1 = \dfrac{1.3}{0.3}(98)\left[(20.41)^{0.2308}-1\right] = 427.1$ kW; saving $= 94.4$ kW` },
      { label: '(d) Isothermal efficiency', work: md`$295.6/332.7 = 88.9\%$` },
    ],
    answer: md`(a) 332.7 kW (b) 295.6 kW (c) 94.4 kW (d) 88.9 %`,
    concept: 'Staging recovers most of the gap between polytropic and isothermal work.',
  },
  {
    id: 'gen-u1-1',
    topicId: 'u1-clearance',
    title: 'Maximum pressure ratio set by clearance',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`A compressor has a clearance ratio of 6 % and compresses and re-expands with $n = 1.3$. (a) Find the volumetric efficiency at a pressure ratio of 7. (b) At what pressure ratio would the compressor stop delivering air?`,
    given: ['c = 0.06, n = 1.3'],
    find: ['η_vol at p₂/p₁ = 7', 'Pressure ratio for zero delivery'],
    approach: md`Use $\eta_{\text{vol}} = 1 + c - c\,r^{1/n}$ and set it to zero for the limit.`,
    steps: [
      { label: '(a)', work: md`$\eta_{\text{vol}} = 1.06 - 0.06(7)^{1/1.3} = 1.06 - 0.06(4.467) = 0.792 = 79.2\%$` },
      { label: '(b) Zero delivery', work: md`$1 + c = c\,r^{1/n} \Rightarrow r = \left(\dfrac{1+c}{c}\right)^{n} = (17.67)^{1.3} = 41.8$` },
    ],
    answer: md`(a) 79.2 %  (b) about 42`,
    concept: 'At the limiting ratio, clearance air re-expands all the way to V₁, so the suction stroke admits nothing.',
    observations: ['Try it in the clearance explorer: set c = 6 % and push the pressure-ratio slider up.'],
  },
]

/* ----------------------------------------------------------------------------- */

export const questions: Question[] = [
  {
    id: 'q-u1-1', topicId: 'u1-processes', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'For the same suction state and delivery pressure, which compression process requires the least work?',
    options: ['Isentropic', 'Polytropic with n = 1.3', 'Isothermal', 'All require the same work'],
    answer: 2,
    solution: md`Isothermal compression keeps the air coolest, so its specific volume — and $\int V\,dp$ — is smallest. Isentropic needs the most.`,
  },
  {
    id: 'q-u1-2', topicId: 'u1-clearance', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Volumetric efficiency of a reciprocating compressor with clearance ratio c, pressure ratio r and index n is:',
    options: ['1 − c + c·r^(1/n)', '1 + c − c·r^(1/n)', '1 + c − c·r^((n−1)/n)', 'c·r^(1/n) − c'],
    answer: 1,
    solution: md`$\eta_{\text{vol}} = (V_1 - V_4)/V_s = 1 + c - c\,(p_2/p_1)^{1/n}$. The exponent is $1/n$ because it comes from $p V^n = C$ on the re-expansion line.`,
  },
  {
    id: 'q-u1-3', topicId: 'u1-clearance', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'Increasing the delivery pressure of a single-stage compressor (same clearance) will:',
    options: ['Increase volumetric efficiency', 'Decrease volumetric efficiency', 'Not affect volumetric efficiency', 'Increase FAD'],
    answer: 1,
    solution: md`A higher $p_2/p_1$ means the clearance air re-expands over a larger volume ($V_4$ grows), so the effective suction volume and $\eta_{\text{vol}}$ fall.`,
  },
  {
    id: 'q-u1-4', topicId: 'u1-multistage', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'In two-stage compression with perfect intercooling, the intermediate pressure for minimum work is:',
    options: ['(p₁ + p₃)/2', '√(p₁p₃)', 'p₃/2', '√(p₃/p₁)'],
    answer: 1,
    solution: md`Minimising the total work gives $p_2/p_1 = p_3/p_2$, i.e. $p_2 = \sqrt{p_1p_3}$ — the geometric mean.`,
  },
  {
    id: 'q-u1-5', topicId: 'u1-processes', type: 'mcq', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 25 Objective Questions', page: 888 },
    prompt: 'For isothermal compression in a compressor, the compressor should run at:',
    options: ['very high speed', 'very slow speed', 'constant speed', 'none of the above'],
    answer: 1,
    solution: md`All heat of compression must be removed as it is generated, which needs time: isothermal compression is approached only at very slow speed (§25.6.4).`,
  },
  {
    id: 'q-u1-6', topicId: 'u1-multistage', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'With perfect intercooling and the ideal intermediate pressure, which statement is FALSE?',
    options: ['Both stages do equal work', 'Delivery temperatures from both stages are equal', 'The HP cylinder is larger than the LP cylinder', 'Pressure ratios of both stages are equal'],
    answer: 2,
    solution: md`Both cylinders handle the same mass at the same suction temperature but at higher pressure in the HP stage, so the HP cylinder is **smaller**: $V_{HP}/V_{LP} = p_1/p_2$.`,
  },
  {
    id: 'q-u1-7', topicId: 'u1-clearance', type: 'conceptual', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 25 Review Questions', page: 885 },
    prompt: 'Why is the clearance volume provided in each reciprocating compressor? Is it desirable to have a high clearance volume in a compressor?',
    hints: ['Think about what sits in the cylinder head.', 'What happens to the air left in the clearance at the end of delivery?'],
    solution: md`Clearance is provided **(i)** so the piston cannot strike the cylinder head and **(ii)** to accommodate the inlet and delivery valves.

A **high** clearance is **not** desirable. The air trapped at delivery pressure re-expands during the next suction stroke, so suction starts late and the effective suction volume $V_1 - V_4$ shrinks. Volumetric efficiency falls, a larger cylinder is needed for the same delivery, and clearance also limits the maximum pressure ratio the machine can reach.`,
  },
  {
    id: 'q-u1-8', topicId: 'u1-multistage', type: 'long', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 25 Review Questions', page: 886 },
    prompt: 'What are the advantages of multistage compression over single-stage compression? Why is the intercooler provided between stages?',
    hints: ['List effects on work, volumetric efficiency, temperature, balance.'],
    solution: md`**Advantages:** high delivery pressures become possible; cooling between stages brings compression closer to isothermal, reducing work; the lower pressure ratio per stage improves volumetric efficiency and reduces leakage; lower temperatures give better lubrication; forces are better balanced and torque more uniform; LP cylinder can be lighter and HP cylinder smaller.

**Intercooler:** cools the air at constant pressure (ideally back to $T_1$) between stages. This lowers the specific volume of the air entering the next stage, so the next stage needs less work — the saving is the area between the single-stage curve and the staged path on the p–V diagram.`,
  },
  {
    id: 'q-u1-9', topicId: 'u1-multistage', type: 'derivation', difficulty: 3, source: { kind: 'textbook', ref: 'Ch 25 Review Questions', page: 886 },
    prompt: 'Prove that for complete intercooling between two stages, the compression work is a minimum when the intermediate pressure p₂ = √(p₁p₃).',
    hints: ['Write the work of each stage with the same n.', 'Perfect intercooling: p₂V₂ = p₁V₁.', 'Differentiate the total work with respect to p₂.'],
    solution: md`See the full step-by-step derivation in **Multistage compression → Derivations**. Outline: $W = \frac{n}{n-1}p_1V_1[x^m + (p_3/p_1)^m x^{-m} - 2]$ with $x = p_2/p_1$, $m = (n-1)/n$; $dW/dx = 0$ gives $x^2 = p_3/p_1$, so $p_2 = \sqrt{p_1p_3}$.`,
  },
  {
    id: 'q-u1-10', topicId: 'u1-processes', type: 'numerical', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 25 Problems', page: 886 },
    prompt: 'A single-acting, single-cylinder reciprocating air compressor has a cylinder diameter of 300 mm and a stroke of 400 mm. It runs at 100 rpm. Air enters the cylinder at 1 bar, 20 °C. It is then compressed to 5 bar. Calculate the mean effective pressure and indicated power input to the compressor when compression is (a) isothermal, (b) according to the law pV^1.2 = constant, (c) adiabatic. Calculate isothermal efficiency for each case. Neglect clearance.',
    hints: ['V_s = (π/4)d²L = 0.02827 m³.', 'Mean effective pressure = W / V_s.', 'IP = W × N / 60 for single-acting.'],
    solution: md`$V_s = 0.02827$ m³.

(a) $W = p_1V_s\ln 5 = 4.551$ kJ; $p_m = 1.61$ bar; IP $= 7.58$ kW; $\eta = 100\%$.
(b) $W = 6(100)(0.02827)[5^{1/6}-1] = 5.219$ kJ; $p_m = 1.85$ bar; IP $= 8.70$ kW; $\eta = 87.2\%$.
(c) $W = 3.5(100)(0.02827)[5^{0.2857}-1] = 5.777$ kJ; $p_m = 2.04$ bar; IP $= 9.63$ kW; $\eta = 78.8\%$.`,
    bookAnswer: '(a) 1.61 bar, 7.58 kW, 100 % (b) 1.85 bar, 8.7 kW, 87.2 % (c) 2.043 bar, 9.63 kW, 78.8 %',
  },
  {
    id: 'q-u1-11', topicId: 'u1-multistage', type: 'numerical', difficulty: 3, source: { kind: 'textbook', ref: 'Ch 25 Problems', page: 887 },
    prompt: 'Calculate the power required to drive a single-stage, single-acting reciprocating air compressor to compress 8 m³/min of air, received at 1 bar, 20 °C, to 7 bar. The index of compression is 1.3. Also calculate the percentage saving in indicated power by compressing the same mass of air (a) in two stages with optimum intercooler pressure and perfect intercooling, (b) in two stages with imperfect intercooling to 27 °C, intercooler pressure remaining the same as in (a), (c) in three stages with optimum intercooler pressure and perfect cooling.',
    hints: ['Single stage: P = n/(n−1)·p₁V̇[(7)^0.2308 − 1].', 'For (b) the HP stage starts at 300 K instead of 293 K, so its work scales by 300/293.'],
    solution: md`Single stage: $P = \frac{1.3}{0.3}(100)\frac{8}{60}[7^{0.2308}-1] = 32.75$ kW.

(a) $p_2 = \sqrt7 = 2.646$ bar; $P = 2(57.78)[7^{0.1154}-1] = 29.09$ kW → saving 11.2 %.
(b) LP stage as before (14.55 kW); HP stage $= 14.55 \times 300/293 = 14.90$ kW; total 29.44 kW → saving 10.1 %.
(c) $P = 3(57.78)[7^{0.0769}-1] = 27.99$ kW → saving 14.5 %.`,
    bookAnswer: '32.8 kW; (a) 11.3 % (b) 10.2 % (c) 14.63 %',
  },
  {
    id: 'q-u1-12', topicId: 'u1-multistage', type: 'numerical', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 25 Problems', page: 887 },
    prompt: 'A power cylinder is charged with compressed air at 170 bar from a four-stage compressor with perfect intercooling between stages, working in the best conditions, taking air from 1 bar. What are the most economical intermediate pressures?',
    hints: ['Each stage has the same pressure ratio (170)^(1/4).'],
    solution: md`Stage ratio $= 170^{1/4} = 3.611$. Intermediate pressures: $3.61$, $3.61^2 = 13.04$, $3.61^3 = 47.08$ bar.`,
    bookAnswer: '3.61 bar, 13.04 bar, 47.08 bar',
  },
  {
    id: 'q-u1-13', topicId: 'u1-basics', type: 'short', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 25 Review Questions', page: 885 },
    prompt: 'How do the suction and delivery valves activate in a reciprocating air compressor?',
    solution: md`They are spring-loaded, automatic valves. The inlet valve opens when cylinder pressure falls slightly below atmospheric during the suction stroke; the delivery valve opens when cylinder pressure slightly exceeds receiver pressure. No cams are involved — the pressure difference across each valve does the work.`,
  },
  {
    id: 'q-u1-14', topicId: 'u1-clearance', type: 'diagram', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 25 Review Questions', page: 886 },
    prompt: 'Show the effect of increasing the compression ratio of a single-stage reciprocating compressor on a p–V diagram and explain it physically.',
    hints: ['Open the clearance explorer and move the pressure-ratio slider.'],
    solution: md`Raising $p_2$ moves the delivery line up and the compression curve further left. The clearance air now starts its re-expansion from a higher pressure, so point 4 moves right: the effective suction volume $V_1 - V_4$ shrinks and η<sub>vol</sub> falls. At the limiting ratio $r = ((1+c)/c)^n$ point 4 reaches point 1 and delivery stops. The delivery temperature also rises as $T_2 = T_1 r^{(n-1)/n}$.`,
  },
]

/* ----------------------------------------------------------------------------- */

export const formulas: Formula[] = [
  {
    id: 'f-u1-work', topicId: 'u1-basics', name: 'Indicated work, single stage (no clearance)', important: true,
    latex: md`W = \frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}-1\right] = \frac{n}{n-1}\,mR(T_2-T_1)`,
    vars: [
      { sym: 'p_1, p_2', meaning: 'suction and delivery pressure', unit: 'kPa' },
      { sym: 'V_1', meaning: 'volume sucked per cycle', unit: 'm³' },
      { sym: 'n', meaning: 'polytropic index', unit: '—' },
      { sym: 'm', meaning: 'mass per cycle', unit: 'kg' },
    ],
    conditions: 'Polytropic compression pVⁿ = C; constant-pressure suction and delivery.',
    meaning: 'Work per cycle = area of the indicator diagram = ∫V dp.',
    ref: { chapter: 25, section: '§25.5.3', pages: '842' },
  },
  {
    id: 'f-u1-iso', topicId: 'u1-processes', name: 'Isothermal work',
    latex: md`W_{\text{iso}} = p_1V_1\ln\frac{p_2}{p_1}`,
    vars: [{ sym: 'p_1V_1', meaning: 'suction pressure × volume', unit: 'kJ' }],
    conditions: 'Perfect cooling, T = const.',
    meaning: 'The minimum work for compressing between two pressures.',
    ref: { chapter: 25, section: '§25.6', pages: '847' },
  },
  {
    id: 'f-u1-t2', topicId: 'u1-processes', name: 'Delivery temperature',
    latex: md`\frac{T_2}{T_1} = \left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}`,
    vars: [{ sym: 'T', meaning: 'absolute temperature', unit: 'K' }],
    conditions: 'Polytropic process.',
    meaning: 'How hot the air leaves the cylinder.',
  },
  {
    id: 'f-u1-etaiso', topicId: 'u1-processes', name: 'Isothermal efficiency', important: true,
    latex: md`\eta_{\text{iso}} = \frac{\text{isothermal work}}{\text{actual work}}`,
    vars: [],
    conditions: 'Reciprocating (cooled) compressors.',
    meaning: 'How close the machine gets to the minimum-work process.',
    ref: { chapter: 25, section: '§25.6.3', pages: '848' },
  },
  {
    id: 'f-u1-power', topicId: 'u1-basics', name: 'Indicated power and swept-volume rate',
    latex: md`\text{IP} = \frac{W\,N\,k}{60}, \qquad \dot V_s = \frac{\pi}{4}d^2L\,\frac{N k}{60}`,
    vars: [
      { sym: 'N', meaning: 'speed', unit: 'rpm' },
      { sym: 'k', meaning: '1 single-acting, 2 double-acting', unit: '—' },
      { sym: 'd, L', meaning: 'bore and stroke', unit: 'm' },
    ],
    conditions: 'W is work per delivery stroke.',
    meaning: 'Converts work per cycle into power.',
  },
  {
    id: 'f-u1-voleff', topicId: 'u1-clearance', name: 'Volumetric efficiency', important: true,
    latex: md`\eta_{\text{vol}} = \frac{V_1-V_4}{V_s} = 1 + c - c\left(\frac{p_2}{p_1}\right)^{1/n}`,
    vars: [
      { sym: 'c', meaning: 'clearance ratio V_c/V_s', unit: '—' },
      { sym: 'V_1 - V_4', meaning: 'effective suction volume', unit: 'm³' },
    ],
    conditions: 'Same n for compression and re-expansion.',
    meaning: 'Fraction of the swept volume actually filled with fresh air.',
    ref: { chapter: 25, section: '§25.9', pages: '853' },
  },
  {
    id: 'f-u1-fad', topicId: 'u1-clearance', name: 'Free air delivery',
    latex: md`V_f = \frac{p_1T_f}{p_fT_1}\,(V_1-V_4)`,
    vars: [
      { sym: 'p_f, T_f', meaning: 'free (atmospheric) conditions', unit: 'kPa, K' },
      { sym: 'p_1, T_1', meaning: 'actual suction conditions', unit: 'kPa, K' },
    ],
    conditions: 'Ideal gas.',
    meaning: 'Delivered air expressed at atmospheric conditions.',
    ref: { chapter: 25, section: '§25.10', pages: '854' },
  },
  {
    id: 'f-u1-clwork', topicId: 'u1-clearance', name: 'Work with clearance',
    latex: md`W = \frac{n}{n-1}\,p_1(V_1-V_4)\left[\left(\frac{p_2}{p_1}\right)^{\frac{n-1}{n}}-1\right]`,
    vars: [{ sym: 'V_1 - V_4', meaning: 'effective suction volume', unit: 'm³' }],
    conditions: 'Compression and re-expansion indices equal.',
    meaning: 'Clearance air does no net work; only the effective volume counts.',
    ref: { chapter: 25, section: '§25.7.2', pages: '850' },
  },
  {
    id: 'f-u1-interp', topicId: 'u1-multistage', name: 'Ideal intermediate pressure', important: true,
    latex: md`p_2 = \sqrt{p_1p_3}, \qquad \frac{p_{i+1}}{p_i} = \left(\frac{p_{k+1}}{p_1}\right)^{1/k}`,
    vars: [{ sym: 'k', meaning: 'number of stages', unit: '—' }],
    conditions: 'Perfect intercooling, same n in every stage.',
    meaning: 'Equal pressure ratio per stage gives minimum total work.',
    ref: { chapter: 25, section: '§25.12.5', pages: '866' },
  },
  {
    id: 'f-u1-minwork', topicId: 'u1-multistage', name: 'Minimum work, k stages', important: true,
    latex: md`W_{\min} = k\,\frac{n}{n-1}\,p_1V_1\left[\left(\frac{p_{k+1}}{p_1}\right)^{\frac{n-1}{kn}}-1\right]`,
    vars: [{ sym: 'p_{k+1}', meaning: 'final delivery pressure', unit: 'kPa' }],
    conditions: 'Ideal intermediate pressures, perfect intercooling.',
    meaning: 'Total work when every stage does equal work.',
    ref: { chapter: 25, section: '§25.12.6', pages: '868' },
  },
  {
    id: 'f-u1-heat', topicId: 'u1-multistage', name: 'Heat rejected per stage',
    latex: md`Q = m\,c_v\frac{\gamma-n}{n-1}(T_2-T_1) + m\,c_p(T_2-T_1)`,
    vars: [{ sym: 'T_2', meaning: 'stage delivery temperature', unit: 'K' }],
    conditions: 'Polytropic compression then intercooling back to T₁.',
    meaning: 'First term: heat lost during compression; second: heat removed in the intercooler.',
    ref: { chapter: 25, section: '§25.12.3', pages: '866' },
  },
]
