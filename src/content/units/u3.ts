import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 3 — Gas Power Cycles (Rathore Ch. 11)   ★ highlighted on the syllabus
 * ========================================================================== */

export const topics: Topic[] = [
  {
    id: 'u3-air-standard',
    unitId: 'u3',
    title: 'Air-standard analysis, definitions and the Carnot cycle',
    summary: 'The assumptions behind every cycle in this unit, compression ratio, mean effective pressure, and the Carnot benchmark.',
    syllabusPhrases: ['Air standard cycle', 'mean effective pressure'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.1–11.3', pages: '332–335' }],
    diagrams: ['carnot-pair'],
    sections: [
      {
        id: 'defs',
        title: 'Engine definitions (§11.1)',
        body: md`For a piston engine with bore $d$ and stroke $L$:

- **Swept volume** $V_s = \frac{\pi}{4}d^2L$ — the volume displaced between TDC and BDC.
- **Clearance volume** $V_c$ — the volume left above the piston at TDC.
- **Compression ratio**
$$r = \frac{\text{total volume}}{\text{clearance volume}} = \frac{V_c + V_s}{V_c}$$
- **Mean effective pressure** $p_m$ — the constant pressure that, acting over one stroke, would produce the net work of the cycle:
$$\boxed{p_m = \frac{W_{\text{net}}}{V_s} = \frac{w_{\text{net}}}{v_1 - v_2}}$$

> [!WHY] Why mep matters
> mep is work per unit of displacement. Two engines of different size can be compared on mep: the higher it is, the more work a given cylinder delivers, so the smaller (and lighter) the engine for a given power.

- **Work ratio** — net work ÷ gross (positive) work. A low work ratio means a large fraction of the expansion work is spent on compression, so the cycle is very sensitive to component losses.`,
      },
      {
        id: 'assumptions',
        title: 'Air-standard assumptions (§11.2)',
        body: md`Real engines burn fuel in an open, changing mixture. To analyse them as cycles we idealise:

1. The working fluid is **air**, behaving as an ideal gas, of fixed mass, circulating in a **closed cycle**.
2. **Combustion is replaced by heat addition** from an external source.
3. **Exhaust is replaced by heat rejection** that restores the initial state.
4. All processes are **internally reversible**.

**Cold-air-standard** analysis adds: specific heats are **constant**, taken at ambient temperature ($c_p = 1.005$, $c_v = 0.718$ kJ/kg·K, $\gamma = 1.4$).

The resulting **air-standard efficiency** is an upper bound that shows how the main parameters (compression ratio, cut-off, pressure ratio) affect real engines.`,
      },
      {
        id: 'carnot',
        title: 'Carnot cycle (§11.3)',
        body: md`Two reversible isotherms joined by two reversible adiabats:

$$\eta_{\text{Carnot}} = 1 - \frac{T_L}{T_H}$$

![Carnot cycle](diagram:carnot-pair)

It is the **most efficient** cycle possible between two temperature limits — but **not practical**:
- isothermal heat transfer needs the process to run extremely slowly, while the isentropic legs need it to run fast;
- on the p–v diagram the cycle is very thin: large pressure and volume ranges give **very small net work and a very low mep**, so the engine would be huge and friction would swamp the output.

The Carnot efficiency remains the **benchmark** against which the practical cycles below are compared.`,
      },
    ],
    keyPoints: [
      'Compression ratio r = (V_c + V_s)/V_c.',
      'mep = W_net / V_s — work per unit swept volume; the basis for comparing engine sizes.',
      'Air standard: air, ideal gas, closed cycle, external heat addition and rejection, reversible processes; cold-air standard adds constant specific heats.',
      'η_Carnot = 1 − T_L/T_H; unattainable in practice because of tiny work output and opposing speed requirements.',
    ],
    misconceptions: [
      'Dividing net work by the total volume instead of the swept volume when finding mep.',
      'Assuming the Carnot cycle would make the best engine. It has the best efficiency but very low mep.',
    ],
    flashcards: [
      { id: 'u3-f1', front: 'Define mean effective pressure.', back: 'Net work per cycle ÷ swept volume: the constant pressure that would do the same work in one stroke.' },
      { id: 'u3-f2', front: 'Four air-standard assumptions?', back: 'Air as ideal gas in a closed cycle; combustion → external heat addition; exhaust → heat rejection; all processes reversible.' },
      { id: 'u3-f3', front: 'Why is the Carnot cycle impractical?', back: 'Isothermal processes need very slow operation, adiabatic ones fast; and the cycle gives very little net work (low mep).' },
    ],
  },
  {
    id: 'u3-otto',
    unitId: 'u3',
    title: 'Otto cycle',
    summary: 'Constant-volume heat addition: efficiency, mean effective pressure and the condition for maximum work.',
    syllabusPhrases: ['Otto', 'P-V and T-S diagrams of these cycles', 'efficiency'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.6', pages: '337–338' }],
    diagrams: ['otto-pair'],
    sections: [
      {
        id: 'processes',
        title: 'The four processes',
        body: md`The ideal cycle of the **spark-ignition (petrol) engine**:

| Process | Description |
|---|---|
| 1 → 2 | Isentropic compression |
| 2 → 3 | Heat addition at constant volume (combustion at TDC) |
| 3 → 4 | Isentropic expansion (power stroke) |
| 4 → 1 | Heat rejection at constant volume (exhaust) |

![Otto cycle](diagram:otto-pair)

$q_{\text{in}} = c_v(T_3 - T_2)$ and $q_{\text{out}} = c_v(T_4 - T_1)$.`,
      },
      {
        id: 'efficiency',
        title: 'Efficiency and mep',
        body: md`$$\boxed{\eta_{\text{Otto}} = 1 - \frac{1}{r^{\gamma-1}}}$$

It depends **only on the compression ratio** (and γ). Raising $r$ raises η, but in a petrol engine the compression ratio is limited (about 4–10) by **detonation** of the air–fuel mixture (Unit 4).

With $\alpha = p_3/p_2$ the pressure ratio during heat addition,

$$p_m = \frac{p_1\,r\,(r^{\gamma-1}-1)(\alpha-1)}{(\gamma-1)(r-1)}$$

> [!EXAM] Maximum work for given temperature limits
> For fixed $T_1$ and $T_3$, the net work is a maximum when
> $$T_2 = T_4 = \sqrt{T_1T_3}, \qquad r_{\text{opt}} = \left(\frac{T_3}{T_1}\right)^{\frac{1}{2(\gamma-1)}}$$
> and $w_{\max} = c_v\left(\sqrt{T_3}-\sqrt{T_1}\right)^2$. (Example 11.7.)`,
      },
    ],
    derivations: [
      {
        id: 'u3-d-otto',
        title: 'Air-standard efficiency of the Otto cycle',
        goal: md`Show that $\eta = 1 - 1/r^{\gamma-1}$.`,
        assumptions: ['Cold-air standard (constant cv, γ)', 'Heat added and rejected at constant volume'],
        steps: [
          { math: md`\eta = 1 - \frac{q_{\text{out}}}{q_{\text{in}}} = 1 - \frac{c_v(T_4-T_1)}{c_v(T_3-T_2)}`, why: md`Both heat transfers are at constant volume, so each equals $c_v\Delta T$.` },
          { math: md`\frac{T_2}{T_1} = \left(\frac{v_1}{v_2}\right)^{\gamma-1} = r^{\gamma-1}, \qquad \frac{T_3}{T_4} = \left(\frac{v_4}{v_3}\right)^{\gamma-1} = r^{\gamma-1}`, why: md`Both isentropic processes operate across the same volume ratio, because $v_1 = v_4$ and $v_2 = v_3$.` },
          { math: md`T_2 = T_1r^{\gamma-1}, \qquad T_3 = T_4r^{\gamma-1}`, why: md`Rearrange.` },
          { math: md`\eta = 1 - \frac{T_4-T_1}{(T_4-T_1)\,r^{\gamma-1}}`, why: md`Substitute: $T_3 - T_2 = r^{\gamma-1}(T_4 - T_1)$.` },
          { math: md`\eta = 1 - \frac{1}{r^{\gamma-1}}`, why: md`Cancel $(T_4 - T_1)$.` },
        ],
        result: md`\eta_{\text{Otto}} = 1 - \frac{1}{r^{\gamma-1}}`,
        ref: { chapter: 11, section: '§11.6', pages: '337' },
      },
      {
        id: 'u3-d-otto-max',
        title: 'Otto cycle: intermediate temperature for maximum work',
        goal: md`For fixed $T_1$ and $T_3$, show that the work is a maximum when $T_2 = \sqrt{T_1T_3}$.`,
        assumptions: ['Cold-air standard', 'T₁ and T₃ fixed; r free'],
        steps: [
          { math: md`w = c_v[(T_3-T_4)-(T_2-T_1)]`, why: md`Net work = expansion work − compression work (both isentropic).` },
          { math: md`T_4 = \frac{T_3T_1}{T_2}`, why: md`From $T_2/T_1 = T_3/T_4 = r^{\gamma-1}$.` },
          { math: md`w = c_v\left[T_3 - \frac{T_1T_3}{T_2} - T_2 + T_1\right]`, why: md`Work is now a function of the single variable $T_2$.` },
          { math: md`\frac{dw}{dT_2} = c_v\left[\frac{T_1T_3}{T_2^2} - 1\right] = 0`, why: md`Set the derivative to zero (the second derivative is negative, so this is a maximum).` },
          { math: md`T_2 = \sqrt{T_1T_3} = T_4`, why: md`Solve.` },
        ],
        result: md`T_2 = T_4 = \sqrt{T_1T_3}, \qquad w_{\max} = c_v\left(\sqrt{T_3}-\sqrt{T_1}\right)^2`,
        ref: { chapter: 11, section: 'Example 11.7', pages: '346' },
      },
    ],
    keyPoints: [
      'Otto = 2 isentropes + 2 constant-volume processes; ideal cycle of the SI engine.',
      'η_Otto = 1 − 1/r^(γ−1): depends on compression ratio only.',
      'Petrol-engine r is limited (≈ 4–10) by detonation.',
      'Max work for given T₁, T₃: T₂ = T₄ = √(T₁T₃).',
    ],
    misconceptions: [
      'Using c_p for Otto heat transfer — both heat transfers are at constant volume (c_v).',
      'Believing Otto efficiency depends on heat input. In the air-standard model it does not; only r and γ matter.',
    ],
    flashcards: [
      { id: 'u3-f4', front: 'Otto cycle efficiency?', back: 'η = 1 − 1/r^(γ−1)' },
      { id: 'u3-f5', front: 'Otto: condition for maximum work between T₁ and T₃?', back: 'T₂ = T₄ = √(T₁T₃)' },
      { id: 'u3-f6', front: 'Four processes of the Otto cycle?', back: 'Isentropic compression, constant-volume heat addition, isentropic expansion, constant-volume heat rejection.' },
    ],
  },
  {
    id: 'u3-diesel',
    unitId: 'u3',
    title: 'Diesel cycle',
    summary: 'Constant-pressure heat addition, cut-off ratio, and why Diesel efficiency falls as load (cut-off) rises.',
    syllabusPhrases: ['Diesel'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.7', pages: '338–339' }],
    diagrams: ['diesel-pair'],
    sections: [
      {
        id: 'processes',
        title: 'Processes and cut-off ratio',
        body: md`The ideal cycle of the **compression-ignition (diesel) engine**:

| Process | Description |
|---|---|
| 1 → 2 | Isentropic compression of air only |
| 2 → 3 | Heat addition at **constant pressure** (fuel injected and burnt as the piston moves down) |
| 3 → 4 | Isentropic expansion |
| 4 → 1 | Heat rejection at constant volume |

![Diesel cycle](diagram:diesel-pair)

> [!DEF] Cut-off ratio
> $$\rho = \frac{v_3}{v_2}$$
> the volume at the end of heat addition over the volume at its start.

> [!WARN] Book definition vs book analysis
> Rathore's text describes the cut-off ratio as "cut-off volume to swept volume", but every equation in §11.7 uses $\rho = V_3/V_2$. Use $V_3/V_2$. When a problem says "cut-off occurs at 8 % of the stroke", that is a different quantity: $V_3 - V_2 = 0.08V_s$, from which you then compute $\rho$.`,
      },
      {
        id: 'efficiency',
        title: 'Efficiency and mep',
        body: md`$$\boxed{\eta_{\text{Diesel}} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^{\gamma}-1}{\gamma(\rho-1)}}$$

The bracketed factor $\frac{\rho^\gamma - 1}{\gamma(\rho-1)}$ is **always greater than 1** for $\rho > 1$, so for the same $r$ the Diesel cycle is less efficient than the Otto cycle.

**Effect of cut-off ratio** (§11.7.1). As load increases, more fuel is injected, the cut-off ratio grows, and the efficiency **falls**. As $\rho \to 1$ (no heat added) the Diesel efficiency approaches the Otto value.

$$p_m = \frac{p_1\,r^\gamma\left[\gamma(\rho-1) - r^{1-\gamma}(\rho^\gamma-1)\right]}{(\gamma-1)(r-1)}$$

Diesel engines nevertheless achieve **higher real efficiencies** than petrol engines because they compress only air and can use $r = 14$–$21$ without detonation.`,
      },
    ],
    derivations: [
      {
        id: 'u3-d-diesel',
        title: 'Air-standard efficiency of the Diesel cycle',
        goal: md`Show that $\eta = 1 - \dfrac{1}{r^{\gamma-1}}\dfrac{\rho^\gamma-1}{\gamma(\rho-1)}$.`,
        assumptions: ['Cold-air standard', 'Heat added at constant pressure, rejected at constant volume'],
        steps: [
          { math: md`\eta = 1 - \frac{c_v(T_4-T_1)}{c_p(T_3-T_2)} = 1 - \frac{T_4-T_1}{\gamma(T_3-T_2)}`, why: md`Heat in at constant pressure ($c_p$), heat out at constant volume ($c_v$); $c_p/c_v = \gamma$.` },
          { math: md`T_2 = T_1r^{\gamma-1}`, why: md`Isentropic compression 1–2.` },
          { math: md`T_3 = T_2\,\rho = T_1\,\rho\,r^{\gamma-1}`, why: md`At constant pressure $T \propto v$, so $T_3/T_2 = v_3/v_2 = \rho$.` },
          { math: md`T_4 = T_3\left(\frac{v_3}{v_4}\right)^{\gamma-1} = T_3\left(\frac{\rho}{r}\right)^{\gamma-1} = T_1\rho^{\gamma}`, why: md`Isentropic expansion with $v_4 = v_1$, so $v_3/v_4 = (v_3/v_2)(v_2/v_1) = \rho/r$.` },
          { math: md`\eta = 1 - \frac{T_1(\rho^\gamma-1)}{\gamma T_1r^{\gamma-1}(\rho-1)}`, why: md`Substitute all temperatures in terms of $T_1$.` },
        ],
        result: md`\eta_{\text{Diesel}} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^{\gamma}-1}{\gamma(\rho-1)}`,
        ref: { chapter: 11, section: '§11.7', pages: '338' },
      },
    ],
    keyPoints: [
      'Diesel = 2 isentropes + constant-pressure heat addition + constant-volume rejection.',
      'Cut-off ratio ρ = v₃/v₂.',
      'η_Diesel = 1 − [1/r^(γ−1)]·(ρ^γ − 1)/[γ(ρ − 1)] — falls as ρ (load) rises.',
      'Same r: η_Diesel < η_Otto. Diesel engines win in practice through much higher r (14–21).',
    ],
    misconceptions: [
      'Using c_v for the heat added — Diesel heat addition is at constant pressure.',
      'Using the book\'s verbal definition (cut-off volume ÷ swept volume) for ρ in the formula.',
    ],
    flashcards: [
      { id: 'u3-f7', front: 'Diesel cycle efficiency?', back: 'η = 1 − (1/r^(γ−1))·(ρ^γ − 1)/(γ(ρ − 1))' },
      { id: 'u3-f8', front: 'Effect of increasing cut-off ratio on Diesel efficiency?', back: 'Efficiency decreases (more heat added late in the stroke, at lower effective expansion).' },
      { id: 'u3-f9', front: 'Define cut-off ratio.', back: 'ρ = V₃/V₂ — volume at end of constant-pressure heat addition ÷ volume at its start.' },
    ],
  },
  {
    id: 'u3-dual',
    unitId: 'u3',
    title: 'Dual (mixed / limited-pressure) cycle',
    summary: 'Heat added partly at constant volume and partly at constant pressure — the closest model of a modern fast diesel.',
    syllabusPhrases: ['dual cycles'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.8', pages: '339–340' }],
    diagrams: ['dual-pair'],
    sections: [
      {
        id: 'processes',
        title: 'Processes',
        body: md`In high-speed diesel engines, part of the fuel burns almost instantly near TDC (constant volume) and the rest burns as the piston moves down (constant pressure). The **dual cycle** models this:

| Process | Description |
|---|---|
| 1 → 2 | Isentropic compression |
| 2 → 3 | Heat addition at constant **volume**; pressure ratio $\alpha = p_3/p_2$ |
| 3 → 4 | Heat addition at constant **pressure**; cut-off ratio $\rho = v_4/v_3$ |
| 4 → 5 | Isentropic expansion |
| 5 → 1 | Heat rejection at constant volume |

![Dual cycle](diagram:dual-pair)

$q_{\text{in}} = c_v(T_3-T_2) + c_p(T_4-T_3)$, $q_{\text{out}} = c_v(T_5-T_1)$.`,
      },
      {
        id: 'efficiency',
        title: 'Efficiency',
        body: md`$$\boxed{\eta_{\text{Dual}} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\alpha\rho^{\gamma}-1}{(\alpha-1)+\gamma\alpha(\rho-1)}}$$

It contains both other cycles as special cases:
- $\rho = 1$ (no constant-pressure part) → **Otto**;
- $\alpha = 1$ (no constant-volume part) → **Diesel**.

$$p_m = \frac{p_1\,r^{\gamma}\left[(\alpha-1)+\gamma\alpha(\rho-1)\right] - p_1\,r\,(\alpha\rho^\gamma-1)}{(\gamma-1)(r-1)}$$`,
      },
    ],
    derivations: [
      {
        id: 'u3-d-dual',
        title: 'Air-standard efficiency of the dual cycle',
        goal: md`Express η in terms of $r$, $\alpha$ and $\rho$.`,
        assumptions: ['Cold-air standard'],
        steps: [
          { math: md`\eta = 1 - \frac{c_v(T_5-T_1)}{c_v(T_3-T_2)+c_p(T_4-T_3)} = 1 - \frac{T_5-T_1}{(T_3-T_2)+\gamma(T_4-T_3)}`, why: md`Divide numerator and denominator by $c_v$.` },
          { math: md`T_2 = T_1r^{\gamma-1}, \quad T_3 = \alpha T_2 = \alpha T_1 r^{\gamma-1}`, why: md`Isentropic 1–2; constant volume 2–3 so $T \propto p$.` },
          { math: md`T_4 = \rho T_3 = \alpha\rho T_1 r^{\gamma-1}`, why: md`Constant pressure 3–4 so $T \propto v$.` },
          { math: md`T_5 = T_4\left(\frac{v_4}{v_5}\right)^{\gamma-1} = T_4\left(\frac{\rho}{r}\right)^{\gamma-1} = \alpha\rho^\gamma T_1`, why: md`$v_5 = v_1$, $v_4 = \rho v_3 = \rho v_2$.` },
          { math: md`\eta = 1 - \frac{T_1(\alpha\rho^\gamma-1)}{T_1r^{\gamma-1}\left[(\alpha-1)+\gamma\alpha(\rho-1)\right]}`, why: md`Substitute and factor $T_1 r^{\gamma-1}$ from the denominator.` },
        ],
        result: md`\eta_{\text{Dual}} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\alpha\rho^{\gamma}-1}{(\alpha-1)+\gamma\alpha(\rho-1)}`,
        ref: { chapter: 11, section: '§11.8', pages: '339' },
      },
    ],
    keyPoints: [
      'Dual: heat added partly at constant volume (α = p₃/p₂) and partly at constant pressure (ρ = v₄/v₃).',
      'η_Dual = 1 − [1/r^(γ−1)]·(αρ^γ − 1)/[(α − 1) + γα(ρ − 1)].',
      'ρ = 1 gives Otto; α = 1 gives Diesel.',
      'Models modern high-speed CI engines best.',
    ],
    flashcards: [
      { id: 'u3-f10', front: 'Dual cycle efficiency?', back: 'η = 1 − (1/r^(γ−1))·(αρ^γ − 1)/((α − 1) + γα(ρ − 1))' },
      { id: 'u3-f11', front: 'Dual cycle reduces to Otto when…? to Diesel when…?', back: 'Otto when ρ = 1; Diesel when α = 1.' },
    ],
  },
  {
    id: 'u3-comparison',
    unitId: 'u3',
    title: 'Comparing Otto, Diesel and Dual cycles',
    summary: 'Same compression ratio and heat input; same maximum pressure and temperature — and why the ranking flips.',
    syllabusPhrases: ['Comparison of Otto, Diesel, dual cycles for same compression ratio and heat input'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.9', pages: '340–341' }],
    diagrams: ['compare-same-r', 'compare-same-pmax', 'eff-vs-r'],
    sections: [
      {
        id: 'method',
        title: 'How to compare on a T–s diagram',
        body: md`$$\eta = 1 - \frac{q_{\text{out}}}{q_{\text{in}}}$$

On a T–s diagram, heat is the **area under the process line**. Draw the cycles so that whichever quantity is fixed is equal, then compare the other area:
- if $q_{\text{in}}$ is fixed, the cycle that **rejects least heat** is most efficient;
- if $q_{\text{out}}$ is fixed, the cycle that **adds most heat** is most efficient.`,
      },
      {
        id: 'same-r',
        title: 'Same compression ratio and heat input (§11.9.1)',
        body: md`All three cycles share 1–2 (same $r$) and heat rejection along the same constant-volume line through 1. The constant-volume line from 2 rises **more steeply** on T–s than the constant-pressure line, so to add the same area, the Otto cycle reaches the highest temperature and finishes its expansion at the lowest $T_4$. It therefore rejects the least heat.

![Same r and heat input](diagram:compare-same-r)

$$\boxed{\eta_{\text{Otto}} > \eta_{\text{Dual}} > \eta_{\text{Diesel}}}$$`,
      },
      {
        id: 'same-pmax',
        title: 'Same maximum pressure and temperature (§11.9.2)',
        body: md`Now fix the peak state (same $p_{\max}$, $T_{\max}$) and the same heat rejection. The Diesel cycle can use a much higher compression ratio to reach the same peak pressure; it adds **more** heat for the same rejection.

![Same peak pressure and temperature](diagram:compare-same-pmax)

$$\boxed{\eta_{\text{Diesel}} > \eta_{\text{Dual}} > \eta_{\text{Otto}}}$$

> [!WHY] Which comparison reflects reality?
> The second. Real engines are limited by the **strength** of the cylinder (peak pressure) and **materials** (peak temperature), not by an arbitrary compression ratio. So under realistic constraints the diesel's high compression ratio wins — which is why diesels are the more efficient engines.

![Efficiency vs compression ratio](diagram:eff-vs-r)`,
      },
    ],
    keyPoints: [
      'Compare with η = 1 − q_out/q_in and areas on the T–s diagram.',
      'Same r and same heat input: η_Otto > η_Dual > η_Diesel.',
      'Same p_max and T_max (same heat rejected): η_Diesel > η_Dual > η_Otto.',
      'The second comparison matches real design limits, so diesels are more efficient in practice.',
    ],
    misconceptions: [
      'Quoting "Otto is always the most efficient". That is true only for the same compression ratio.',
    ],
    flashcards: [
      { id: 'u3-f12', front: 'Efficiency ranking for the same compression ratio and heat input?', back: 'Otto > Dual > Diesel' },
      { id: 'u3-f13', front: 'Efficiency ranking for the same maximum pressure and temperature?', back: 'Diesel > Dual > Otto' },
    ],
  },
  {
    id: 'u3-stirling-ericsson',
    unitId: 'u3',
    title: 'Stirling and Ericsson cycles',
    summary: 'Two reversible regenerative cycles that reach the Carnot efficiency between the same temperatures.',
    syllabusPhrases: ['Stirling cycles', 'Ericsson cycle'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.4–11.5', pages: '335–337' }],
    diagrams: ['stirling-pair', 'ericsson-pair'],
    sections: [
      {
        id: 'stirling',
        title: 'Stirling cycle (§11.4)',
        body: md`Two **isothermal** processes joined by two **constant-volume regenerative** processes:

| Process | Description |
|---|---|
| 1 → 2 | Isothermal compression at $T_L$, heat rejected |
| 2 → 3 | Constant-volume heating, heat taken **from the regenerator** |
| 3 → 4 | Isothermal expansion at $T_H$, heat added |
| 4 → 1 | Constant-volume cooling, heat given **to the regenerator** |

![Stirling cycle](diagram:stirling-pair)

The heat given to the regenerator in 4–1 exactly equals the heat taken from it in 2–3 (both are $c_v(T_H - T_L)$). With a **perfect regenerator**, the only external heat transfers are along the isotherms, so

$$\eta_{\text{Stirling}} = 1 - \frac{T_L}{T_H} = \eta_{\text{Carnot}}$$

Without regeneration, $q_{\text{in}} = RT_H\ln\frac{v_1}{v_2} + c_v(T_H-T_L)$ and the efficiency is much lower.`,
      },
      {
        id: 'ericsson',
        title: 'Ericsson cycle (§11.5)',
        body: md`Two **isothermal** processes joined by two **constant-pressure regenerative** processes:

![Ericsson cycle](diagram:ericsson-pair)

With perfect regeneration, again $\eta = 1 - T_L/T_H$ — equal to Stirling and Carnot.

> [!NOTE] Link to gas turbines (Unit 5)
> A gas turbine with **many stages of intercooling and reheating plus a perfect regenerator** approaches the Ericsson cycle: compression and expansion become nearly isothermal, and the regenerator handles the constant-pressure legs.

**Deviations from Carnot in practice:** isothermal heat transfer is slow, regenerators are never perfect (effectiveness < 1), and there is pressure drop and fluid friction in the regenerator. Even so, Stirling engines are used where quiet external-combustion operation matters (cryocoolers, solar dish engines, submarines).`,
      },
    ],
    keyPoints: [
      'Stirling: 2 isotherms + 2 constant-volume regenerative processes.',
      'Ericsson: 2 isotherms + 2 constant-pressure regenerative processes.',
      'With perfect regeneration both reach η = 1 − T_L/T_H (Carnot).',
      'The regenerator stores heat internally; it is not external heat input.',
    ],
    misconceptions: [
      'Counting the regenerator heat as heat supplied. With a perfect regenerator it is an internal exchange.',
    ],
    flashcards: [
      { id: 'u3-f14', front: 'Stirling cycle processes?', back: 'Isothermal compression, constant-volume regenerative heating, isothermal expansion, constant-volume regenerative cooling.' },
      { id: 'u3-f15', front: 'Ericsson cycle processes?', back: 'Two isotherms joined by two constant-pressure regenerative processes.' },
      { id: 'u3-f16', front: 'Efficiency of Stirling/Ericsson with perfect regeneration?', back: 'Equal to Carnot: 1 − T_L/T_H.' },
    ],
  },
  {
    id: 'u3-atkinson',
    unitId: 'u3',
    title: 'Atkinson cycle',
    summary: 'An Otto cycle whose expansion is carried all the way down to the initial pressure.',
    syllabusPhrases: ['Atkinson cycle'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.11', pages: '362–364' }],
    diagrams: ['atkinson-pair'],
    sections: [
      {
        id: 'processes',
        title: 'Processes and efficiency',
        body: md`| Process | Description |
|---|---|
| 1 → 2 | Isentropic compression, ratio $r_c = v_1/v_2$ |
| 2 → 3 | Heat addition at constant volume |
| 3 → 4 | Isentropic expansion **down to $p_1$**, ratio $r_e = v_4/v_3$ |
| 4 → 1 | Heat rejection at **constant pressure** |

![Atkinson cycle](diagram:atkinson-pair)

The expansion ratio is larger than the compression ratio ($r_e > r_c$), so more of the high-temperature energy is converted to work and less heat is rejected:

$$\boxed{\eta_{\text{Atkinson}} = 1 - \gamma\,\frac{r_e - r_c}{r_e^{\gamma} - r_c^{\gamma}}}$$

since $q_{\text{in}} = c_v(T_3-T_2)$ and $q_{\text{out}} = c_p(T_4-T_1)$.

For the same compression ratio and heat input, $\eta_{\text{Atkinson}} > \eta_{\text{Otto}}$, at the cost of a longer expansion stroke and a lower mep. Rathore also lists the **constant-volume (explosion) gas turbine** as working on the Atkinson cycle (§27.2). Modern hybrid-car engines use late intake-valve closing to imitate it.

> [!NOTE] Out of syllabus
> The book's §11.10 Lenoir cycle (heat addition at constant volume with no compression) is not in your syllabus.`,
      },
    ],
    keyPoints: [
      'Atkinson = Otto with expansion continued to the initial pressure; heat rejected at constant pressure.',
      'η = 1 − γ(r_e − r_c)/(r_e^γ − r_c^γ).',
      'More efficient than Otto for the same r_c, but lower mep.',
    ],
    flashcards: [
      { id: 'u3-f17', front: 'How does the Atkinson cycle differ from the Otto cycle?', back: 'Expansion continues down to the initial pressure; heat is rejected at constant pressure (r_e > r_c).' },
      { id: 'u3-f18', front: 'Atkinson efficiency?', back: 'η = 1 − γ (r_e − r_c)/(r_e^γ − r_c^γ)' },
    ],
  },
  {
    id: 'u3-brayton',
    unitId: 'u3',
    title: 'Brayton (Joule) cycle',
    summary: 'The ideal gas-turbine cycle — open vs closed, efficiency, back work ratio, work ratio, air rate and the optimum pressure ratio.',
    syllabusPhrases: ['basic gas turbine cycle (Brayton cycle) for open and closed systems', 'efficiency of gas turbine cycle'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 11, section: '§11.12', pages: '364–368' }],
    diagrams: ['brayton-pair', 'brayton-work-rp'],
    sections: [
      {
        id: 'open-closed',
        title: 'Open and closed systems',
        body: md`A gas turbine plant has a **compressor**, a **combustion chamber** (or heater) and a **turbine** on one shaft.

- **Open cycle:** fresh air is drawn in, fuel is burnt in it, and the products are exhausted to atmosphere.
- **Closed cycle:** the same working fluid circulates; heat is added in a heat exchanger and rejected in a cooler.

Under the air-standard assumptions both reduce to the **Brayton (Joule) cycle**:

| Process | Description |
|---|---|
| 1 → 2 | Isentropic compression (compressor) |
| 2 → 3 | Heat addition at constant pressure (combustor) |
| 3 → 4 | Isentropic expansion (turbine) |
| 4 → 1 | Heat rejection at constant pressure (exhaust / cooler) |

![Brayton cycle](diagram:brayton-pair)`,
      },
      {
        id: 'efficiency',
        title: 'Efficiency',
        body: md`With pressure ratio $r_p = p_2/p_1$:

$$\boxed{\eta_{\text{Brayton}} = 1 - \frac{1}{r_p^{(\gamma-1)/\gamma}}}$$

It depends **only on the pressure ratio** (§11.12.1). Writing $r_p^{(\gamma-1)/\gamma} = r^{\gamma-1}$ (with $r$ the volume ratio of compression) shows it is the same expression as the Otto efficiency.`,
      },
      {
        id: 'ratios',
        title: 'Back work ratio, work ratio and air rate',
        body: md`> [!DEF] Back work ratio (§11.12.3)
> $$\text{bwr} = \frac{w_C}{w_T}$$
> Fraction of turbine work used to drive the compressor. For gas turbines it is high: **40–80 %**, compared with 1–2 % for steam plants (where a pump handles a liquid).

> [!DEF] Work ratio (§11.12.4)
> $$\text{work ratio} = \frac{w_{\text{net}}}{w_T} = 1 - \text{bwr}$$
> A low work ratio means small component losses wipe out the net output.

> [!DEF] Air rate (§11.12.5)
> $$\text{air rate} = \frac{3600}{w_{\text{net}}}\ \text{kg/kWh}\quad (w_{\text{net}} \text{ in kJ/kg})$$
> Mass of air needed per kWh — it fixes the **size** of the plant.

For the ideal cycle, $\text{bwr} = \dfrac{T_1}{T_3}\,r_p^{(\gamma-1)/\gamma}$.`,
      },
      {
        id: 'optimum',
        title: 'Effect of pressure ratio for fixed temperature limits',
        body: md`For fixed $T_1$ and $T_3$ (§11.12.2, §11.12.6):

$$w_{\text{net}} = c_pT_3\left(1-\frac{1}{x}\right) - c_pT_1(x-1), \qquad x = r_p^{(\gamma-1)/\gamma}$$

- At $r_p = 1$ the work is zero.
- Work is a **maximum** when $x = \sqrt{T_3/T_1}$, i.e.
$$\boxed{r_{p,\text{opt}} = \left(\frac{T_3}{T_1}\right)^{\frac{\gamma}{2(\gamma-1)}}}$$
  where $T_2 = T_4 = \sqrt{T_1T_3}$.
- At $r_p = (T_3/T_1)^{\gamma/(\gamma-1)}$ the compressor delivers air at $T_3$: no heat can be added, work is zero, and the efficiency equals the Carnot value.

![Work and efficiency vs pressure ratio](diagram:brayton-work-rp)

So **efficiency rises continuously with $r_p$, but work peaks and then falls.** Real plants choose $r_p$ between the two, and raising $T_3$ (better blade materials and cooling) raises both.`,
      },
    ],
    derivations: [
      {
        id: 'u3-d-brayton',
        title: 'Efficiency of the Brayton cycle',
        goal: md`Show that $\eta = 1 - 1/r_p^{(\gamma-1)/\gamma}$.`,
        assumptions: ['Cold-air standard', 'Isentropic compression and expansion', 'Constant-pressure heat transfers'],
        steps: [
          { math: md`\eta = 1 - \frac{c_p(T_4-T_1)}{c_p(T_3-T_2)}`, why: md`Both heat transfers are at constant pressure.` },
          { math: md`\frac{T_2}{T_1} = r_p^{(\gamma-1)/\gamma} = \frac{T_3}{T_4}`, why: md`Both isentropes work between the same two pressures.` },
          { math: md`T_3 - T_2 = r_p^{(\gamma-1)/\gamma}\,(T_4 - T_1)`, why: md`Substitute $T_2 = T_1x$, $T_3 = T_4x$.` },
          { math: md`\eta = 1 - \frac{1}{r_p^{(\gamma-1)/\gamma}}`, why: md`Cancel $(T_4 - T_1)$.` },
        ],
        result: md`\eta_{\text{Brayton}} = 1 - \frac{1}{r_p^{(\gamma-1)/\gamma}}`,
        ref: { chapter: 11, section: '§11.12', pages: '365' },
      },
      {
        id: 'u3-d-rpopt',
        title: 'Pressure ratio for maximum specific work',
        goal: md`Show that work is a maximum at $r_p = (T_3/T_1)^{\gamma/2(\gamma-1)}$.`,
        assumptions: ['Ideal cycle', 'T₁ and T₃ fixed'],
        steps: [
          { math: md`w = c_p\left[T_3\left(1-x^{-1}\right) - T_1(x-1)\right], \quad x = r_p^{(\gamma-1)/\gamma}`, why: md`Turbine work minus compressor work.` },
          { math: md`\frac{dw}{dx} = c_p\left[\frac{T_3}{x^2} - T_1\right] = 0`, why: md`Differentiate with respect to $x$ (monotonic in $r_p$).` },
          { math: md`x = \sqrt{\frac{T_3}{T_1}}`, why: md`Solve. This means $T_2 = T_1x = \sqrt{T_1T_3} = T_4$.` },
          { math: md`r_p = x^{\gamma/(\gamma-1)} = \left(\frac{T_3}{T_1}\right)^{\frac{\gamma}{2(\gamma-1)}}`, why: md`Convert back to the pressure ratio.` },
          { math: md`w_{\max} = c_p\left(\sqrt{T_3}-\sqrt{T_1}\right)^2`, why: md`Substitute $x$ back into the work expression.` },
        ],
        result: md`r_{p,\text{opt}} = \left(\frac{T_3}{T_1}\right)^{\frac{\gamma}{2(\gamma-1)}}, \qquad w_{\max} = c_p\left(\sqrt{T_3}-\sqrt{T_1}\right)^2`,
        ref: { chapter: 11, section: '§11.12.6', pages: '368' },
      },
    ],
    keyPoints: [
      'Brayton = 2 isentropes + 2 isobars; models both open and closed gas turbines.',
      'η = 1 − 1/r_p^((γ−1)/γ): depends on pressure ratio only.',
      'Back work ratio w_C/w_T is high (40–80 %); work ratio = 1 − bwr.',
      'Air rate = 3600/w_net kg/kWh — sets plant size.',
      'For fixed T₁, T₃: work is maximum at r_p = (T₃/T₁)^(γ/2(γ−1)), where T₂ = T₄.',
    ],
    misconceptions: [
      'Assuming higher pressure ratio is always better. Efficiency rises, but specific work falls past the optimum.',
      'Forgetting that the turbine drives the compressor — the net output is only the difference.',
    ],
    flashcards: [
      { id: 'u3-f19', front: 'Brayton cycle efficiency?', back: 'η = 1 − 1/r_p^((γ−1)/γ)' },
      { id: 'u3-f20', front: 'Pressure ratio for maximum work (ideal Brayton)?', back: 'r_p = (T₃/T₁)^(γ/2(γ−1)) — makes T₂ = T₄ = √(T₁T₃).' },
      { id: 'u3-f21', front: 'Define back work ratio and work ratio.', back: 'bwr = w_C/w_T; work ratio = w_net/w_T = 1 − bwr.' },
      { id: 'u3-f22', front: 'Define air rate.', back: 'Mass of air per kWh of net output = 3600/w_net (kg/kWh).' },
    ],
  },
]

/* ----------------------------------------------------------------------------- */

export const examples: WorkedExample[] = [
  {
    id: 'ex-11-3',
    topicId: 'u3-otto',
    title: 'Otto cycle: maximum temperature, pressure and efficiency',
    source: { kind: 'textbook', ref: 'Example 11.3', page: 342 },
    difficulty: 1,
    statement: md`The pressure and temperature of air at the beginning of compression in an Otto cycle is 103 kPa and 27 °C, respectively. The heat added per kg of air is 1850 kJ. The compression ratio is 8. Determine maximum temperature, maximum pressure, thermal efficiency.`,
    given: ['p₁ = 103 kPa, T₁ = 300 K', 'q_in = 1850 kJ/kg, r = 8', 'c_v = 0.718 kJ/kg·K, γ = 1.4'],
    find: ['T₃ (max temperature)', 'p₃ (max pressure)', 'η'],
    approach: md`Isentropic 1–2, then $q_{\text{in}} = c_v(T_3 - T_2)$; at constant volume $p_3/p_2 = T_3/T_2$.`,
    steps: [
      { label: 'End of compression', work: md`$T_2 = 300(8)^{0.4} = 689.2$ K; $p_2 = 103(8)^{1.4} = 1893$ kPa` },
      { label: 'Maximum temperature', work: md`$T_3 = 689.2 + \dfrac{1850}{0.718} = 3265.8$ K` },
      { label: 'Maximum pressure', work: md`$p_3 = 1893 \times \dfrac{3265.8}{689.2} = 8970$ kPa $\approx 8.97$ MPa` },
      { label: 'Efficiency', work: md`$\eta = 1 - 8^{-0.4} = 0.5647 = 56.47\%$` },
    ],
    answer: md`T<sub>max</sub> ≈ 3266 K, p<sub>max</sub> ≈ 8.97 MPa, η = 56.47 %`,
    concept: 'Otto efficiency is fixed by r; heat input sets only the peak state.',
  },
  {
    id: 'ex-11-7',
    topicId: 'u3-otto',
    title: 'Maximum power of an Otto engine between temperature limits',
    source: { kind: 'textbook', ref: 'Example 11.7(b)', page: 346 },
    difficulty: 2,
    statement: md`(b) An engine working on an air-standard Otto cycle has an upper temperature of 1450 K and a lower temperature of 310 K. Calculate the maximum power developed by the engine if air circulation per minute is 0.38 kg.`,
    given: ['T₁ = 310 K, T₃ = 1450 K', 'ṁ = 0.38 kg/min, c_v = 0.718'],
    find: ['Maximum power'],
    approach: md`For maximum work $T_2 = T_4 = \sqrt{T_1T_3}$ (part (a) of the example).`,
    steps: [
      { label: 'Intermediate temperature', work: md`$T_2 = T_4 = \sqrt{310 \times 1450} = 670.4$ K` },
      { label: 'Maximum work', work: md`$w = c_v[(T_3 - T_4) - (T_2 - T_1)] = 0.718[779.6 - 360.4] = 300.9$ kJ/kg` },
      { label: 'Power', work: md`$P = 300.9 \times 0.38/60 = 1.906$ kW` },
    ],
    answer: md`P<sub>max</sub> ≈ 1.91 kW`,
    concept: 'Work is maximised when compression and expansion end at the same temperature.',
  },
  {
    id: 'ex-11-15',
    topicId: 'u3-diesel',
    title: 'Diesel cycle: full analysis with mep',
    source: { kind: 'textbook', ref: 'Example 11.15', page: 351 },
    difficulty: 2,
    statement: md`An engine operates on air-standard Diesel cycle. The pressure and temperature at the beginning of compression are 100 kPa and 27 °C. The compression ratio is 18. The heat added per kg of air is 1850 kJ. Determine maximum pressure, maximum temperature, thermal efficiency, net work done and mean effective pressure of the cycle. Assume $\gamma = 1.4$ and $c_p = 1.005$ kJ/kg·K.`,
    given: ['p₁ = 100 kPa, T₁ = 300 K, r = 18', 'q_in = 1850 kJ/kg', 'c_p = 1.005, c_v = 0.718, R = 0.287'],
    find: ['p_max, T_max', 'η', 'w_net', 'mep'],
    approach: md`Isentropic 1–2; constant-pressure heat addition $q = c_p(T_3 - T_2)$; $\rho = T_3/T_2$; $T_4 = T_1\rho^\gamma$.`,
    steps: [
      { label: 'End of compression', work: md`$T_2 = 300(18)^{0.4} = 953.3$ K; $p_2 = 100(18)^{1.4} = 5720$ kPa $= p_{\max}$` },
      { label: 'Max temperature', work: md`$T_3 = 953.3 + 1850/1.005 = 2794.1$ K; $\rho = 2794.1/953.3 = 2.931$` },
      { label: 'End of expansion', work: md`$T_4 = 300(2.931)^{1.4} = 1351.9$ K` },
      { label: 'Net work', work: md`$q_{\text{out}} = 0.718(1351.9 - 300) = 755.1$; $w = 1850 - 755.1 = 1094.9$ kJ/kg` },
      { label: 'Efficiency', work: md`$\eta = 1094.9/1850 = 59.2\%$` },
      { label: 'mep', work: md`$v_1 = 0.287(300)/100 = 0.861$ m³/kg; $v_1 - v_2 = 0.861(1 - 1/18) = 0.8132$; $p_m = 1094.9/0.8132 = 1346.5$ kPa` },
    ],
    answer: md`p<sub>max</sub> = 5.72 MPa, T<sub>max</sub> = 2794 K, η = 59.2 %, w = 1094.9 kJ/kg, mep = 1.35 MPa`,
    concept: 'mep = net work ÷ swept volume per kg.',
  },
  {
    id: 'ex-11-20',
    topicId: 'u3-dual',
    title: 'Dual cycle with split heat input',
    source: { kind: 'textbook', ref: 'Example 11.20', page: 355 },
    difficulty: 3,
    statement: md`In an air standard dual cycle, the pressure and temperature at the beginning of compression are 1 bar and 57 °C, respectively. The heat supplied in the cycle is 1250 kJ/kg, two third of this being added at constant volume and rest at constant pressure. If the compression ratio is 16, determine the maximum pressure, temperature in the cycle, thermal efficiency and mean effective pressure.`,
    given: ['p₁ = 100 kPa, T₁ = 330 K, r = 16', 'q_v = 833.3 kJ/kg, q_p = 416.7 kJ/kg'],
    find: ['p_max', 'T_max', 'η', 'mep'],
    approach: md`Isentropic 1–2; $q_v = c_v(T_3 - T_2)$; $q_p = c_p(T_4 - T_3)$; $T_5$ from isentropic expansion with $v_5 = v_1$.`,
    steps: [
      { label: 'Compression', work: md`$T_2 = 330(16)^{0.4} = 1000.4$ K; $p_2 = 100(16)^{1.4} = 4850$ kPa` },
      { label: 'Constant-volume heating', work: md`$T_3 = 1000.4 + 833.3/0.718 = 2161$ K; $p_3 = 4850(2161/1000.4) = 10478$ kPa $= p_{\max}$` },
      { label: 'Constant-pressure heating', work: md`$T_4 = 2161 + 416.7/1.005 = 2575.6$ K $= T_{\max}$; $\rho = 2575.6/2161 = 1.192$` },
      { label: 'Expansion', work: md`$T_5 = T_4(\rho/r)^{0.4} = 2575.6(1.192/16)^{0.4} = 911.4$ K` },
      { label: 'Efficiency', work: md`$q_{\text{out}} = 0.718(911.4 - 330) = 417.5$; $\eta = 1 - 417.5/1250 = 66.6\%$` },
      { label: 'mep', work: md`$v_1 = 0.287(330)/100 = 0.9471$; $p_m = \dfrac{832.5}{0.9471(15/16)} = 937.6$ kPa` },
    ],
    answer: md`p<sub>max</sub> ≈ 104.8 bar, T<sub>max</sub> ≈ 2576 K, η = 66.6 %, mep ≈ 9.38 bar`,
    concept: 'Peak pressure is set by the constant-volume part; peak temperature by the constant-pressure part.',
  },
  {
    id: 'ex-11-26',
    topicId: 'u3-atkinson',
    title: 'Atkinson cycle with given pressure limits',
    source: { kind: 'textbook', ref: 'Example 11.26', page: 364 },
    difficulty: 2,
    statement: md`In an ideal Atkinson cycle, the gas is compressed isentropically from 1 bar, 27 °C to 4 bar. The maximum pressure of the cycle is limited to 16 bar. Calculate (a) the work done per kg of gas, (b) the thermal efficiency of the cycle, (c) mean effective pressure of the cycle. Take $c_p = 0.761$ kJ/kg·K and $c_v = 0.573$ kJ/kg·K.`,
    given: ['p₁ = 1 bar, T₁ = 300 K, p₂ = 4 bar, p₃ = 16 bar', 'c_p = 0.761, c_v = 0.573 → γ = 1.328, R = 0.188'],
    find: ['w', 'η', 'mep'],
    approach: md`Isentropic 1–2; constant volume 2–3 ($T \propto p$); isentropic 3–4 down to $p_1$; $q_{\text{out}} = c_p(T_4 - T_1)$.`,
    steps: [
      { label: 'Gas properties', work: md`$\gamma = 0.761/0.573 = 1.328$; $R = 0.188$ kJ/kg·K` },
      { label: 'Compression', work: md`$T_2 = 300(4)^{0.328/1.328} = 422.5$ K` },
      { label: 'Heat addition', work: md`$T_3 = 422.5 \times 16/4 = 1690.1$ K; $q_{\text{in}} = 0.573(1267.6) = 726.3$ kJ/kg` },
      { label: 'Expansion to 1 bar', work: md`$T_4 = 1690.1(1/16)^{0.247} = 852.0$ K; $q_{\text{out}} = 0.761(552.0) = 420.1$ kJ/kg` },
      { label: '(a) Work and (b) efficiency', work: md`$w = 726.3 - 420.1 = 306.2$ kJ/kg; $\eta = 306.2/726.3 = 42.2\%$` },
      { label: '(c) mep', work: md`$v_2 = 0.188(422.5)/400 = 0.1986$; $v_4 = 0.188(852.0)/100 = 1.6018$; $p_m = 306.2/(1.6018 - 0.1986) = 218.2$ kPa` },
    ],
    answer: md`w = 306.2 kJ/kg, η = 42.2 %, mep = 2.18 bar`,
    concept: 'The swept volume of an Atkinson engine runs from v₂ to v₄ (the extended expansion), so its mep is low.',
  },
  {
    id: 'ex-11-29',
    topicId: 'u3-brayton',
    title: 'Brayton cycle: efficiency, back work ratio and power',
    source: { kind: 'textbook', ref: 'Example 11.29', page: 369 },
    difficulty: 1,
    statement: md`Air enters the compressor of an air-standard Brayton cycle at 100 kPa, 300 K with a volumetric flow rate of 5 m³/s. The compressor pressure ratio is 10. The turbine inlet temperature is 1400 K. Determine (a) thermal efficiency of the cycle, (b) back work ratio, (c) net power developed in kW.`,
    given: ['p₁ = 100 kPa, T₁ = 300 K, V̇₁ = 5 m³/s', 'r_p = 10, T₃ = 1400 K'],
    find: ['η', 'bwr', 'Net power'],
    approach: md`$x = 10^{0.2857}$; $T_2 = T_1x$, $T_4 = T_3/x$; $\dot m = p_1\dot V/RT_1$.`,
    steps: [
      { label: 'Temperatures', work: md`$x = 1.9307$; $T_2 = 579.2$ K; $T_4 = 725.1$ K` },
      { label: '(a) Efficiency', work: md`$\eta = 1 - 1/1.9307 = 48.2\%$` },
      { label: '(b) Back work ratio', work: md`$w_C = 1.005(279.2) = 280.6$; $w_T = 1.005(674.9) = 678.2$; bwr $= 41.4\%$` },
      { label: '(c) Net power', work: md`$\dot m = \dfrac{100 \times 5}{0.287 \times 300} = 5.807$ kg/s; $P = 5.807(678.2 - 280.6) = 2309$ kW` },
    ],
    answer: md`η = 48.2 %, bwr = 41.4 %, P ≈ 2309 kW`,
    concept: 'Even in the ideal cycle, over 40 % of the turbine work goes back into the compressor.',
  },
  {
    id: 'ex-11-32',
    topicId: 'u3-brayton',
    title: 'Brayton limits: Carnot efficiency and maximum work',
    source: { kind: 'textbook', ref: 'Example 11.32', page: 372 },
    difficulty: 2,
    statement: md`A gas turbine plant operates on an air-standard Brayton cycle between the temperature limits of 27 °C and 800 °C. (a) Find the pressure ratio at which the cycle efficiency approaches the Carnot cycle efficiency. (b) Find the pressure ratio at which the work done per kg of air would be maximum. (c) Compare the efficiency at this pressure ratio with Carnot efficiency for the given temperature.`,
    given: ['T₁ = 300 K, T₃ = 1073 K, γ = 1.4'],
    find: ['r_p for η → Carnot', 'r_p for max work', 'η at that r_p vs Carnot'],
    approach: md`η → Carnot when $T_2 = T_3$; max work when $T_2 = \sqrt{T_1T_3}$.`,
    steps: [
      { label: '(a)', work: md`$r_p = (1073/300)^{3.5} = 86.5$ (work is zero here)` },
      { label: '(b)', work: md`$r_p = (1073/300)^{1.75} = 9.30$` },
      { label: '(c)', work: md`$\eta = 1 - \sqrt{300/1073} = 47.1\%$; $\eta_{\text{Carnot}} = 1 - 300/1073 = 72.0\%$` },
    ],
    answer: md`(a) ≈ 86.5 (b) ≈ 9.30 (c) 47.1 % vs 72.0 %`,
    concept: 'The Brayton cycle can only match Carnot by producing no work; the useful design point is far below Carnot.',
  },
  {
    id: 'gen-u3-1',
    topicId: 'u3-stirling-ericsson',
    title: 'Stirling cycle with and without regeneration',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`A Stirling engine using air operates between 900 K and 300 K with a volume ratio of 4 for the isothermal processes. Find the thermal efficiency (a) with a perfect regenerator, (b) with no regenerator.`,
    given: ['T_H = 900 K, T_L = 300 K, v_max/v_min = 4', 'R = 0.287, c_v = 0.718 kJ/kg·K'],
    find: ['η with perfect regeneration', 'η without regeneration'],
    approach: md`Isothermal heat $= RT\ln 4$. Without a regenerator, the constant-volume heating $c_v(T_H - T_L)$ must also be supplied from outside.`,
    steps: [
      { label: 'Isothermal heats', work: md`$q_H = 0.287(900)\ln 4 = 358.1$; $q_L = 0.287(300)\ln 4 = 119.4$ kJ/kg` },
      { label: 'Net work', work: md`$w = 358.1 - 119.4 = 238.7$ kJ/kg` },
      { label: '(a) Perfect regenerator', work: md`$\eta = 238.7/358.1 = 66.7\% = 1 - 300/900$` },
      { label: '(b) No regenerator', work: md`$q_{\text{in}} = 358.1 + 0.718(600) = 788.9$; $\eta = 238.7/788.9 = 30.3\%$` },
    ],
    answer: md`(a) 66.7 % (equal to Carnot) (b) 30.3 %`,
    concept: 'The regenerator is what turns the Stirling cycle into a Carnot-efficient cycle.',
  },
]

/* ----------------------------------------------------------------------------- */

export const questions: Question[] = [
  {
    id: 'q-u3-1', topicId: 'u3-otto', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'The air-standard efficiency of the Otto cycle depends on:',
    options: ['Heat supplied only', 'Compression ratio (and γ) only', 'Maximum temperature only', 'Compression ratio and cut-off ratio'],
    answer: 1,
    solution: md`$\eta = 1 - 1/r^{\gamma-1}$ — only $r$ and $\gamma$.`,
  },
  {
    id: 'q-u3-2', topicId: 'u3-comparison', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'For the same compression ratio and the same heat input, the order of air-standard efficiencies is:',
    options: ['Diesel > Dual > Otto', 'Otto > Dual > Diesel', 'Dual > Otto > Diesel', 'All equal'],
    answer: 1,
    solution: md`With equal $r$ and equal $q_{\text{in}}$, Otto rejects the least heat, so $\eta_{\text{Otto}} > \eta_{\text{Dual}} > \eta_{\text{Diesel}}$.`,
  },
  {
    id: 'q-u3-3', topicId: 'u3-comparison', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'For the same maximum pressure and temperature, which cycle is the most efficient?',
    options: ['Otto', 'Diesel', 'Dual', 'All equal'],
    answer: 1,
    solution: md`With the peak state fixed, the Diesel cycle has the highest compression ratio and adds most heat for the same rejection: $\eta_{\text{Diesel}} > \eta_{\text{Dual}} > \eta_{\text{Otto}}$.`,
  },
  {
    id: 'q-u3-4', topicId: 'u3-diesel', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'With compression ratio fixed, increasing the cut-off ratio of a Diesel cycle will:',
    options: ['Increase efficiency', 'Decrease efficiency', 'Not change efficiency', 'Make it equal to Otto efficiency'],
    answer: 1,
    solution: md`The factor $(\rho^\gamma - 1)/\gamma(\rho - 1)$ grows with $\rho$, so efficiency falls. As $\rho \to 1$, η approaches the Otto value.`,
  },
  {
    id: 'q-u3-5', topicId: 'u3-stirling-ericsson', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'The Ericsson cycle consists of:',
    options: ['Two isotherms and two isentropes', 'Two isotherms and two constant-volume processes', 'Two isotherms and two constant-pressure processes', 'Two isentropes and two constant-pressure processes'],
    answer: 2,
    solution: md`Ericsson: two isotherms joined by two constant-pressure regenerative processes. (Option B is Stirling, A is Carnot, D is Brayton.)`,
  },
  {
    id: 'q-u3-6', topicId: 'u3-brayton', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'In an ideal Brayton cycle with fixed T₁ and T₃, the specific work is maximum when:',
    options: ['T₂ = T₃', 'T₂ = T₄', 'T₄ = T₁', 'r_p is as high as possible'],
    answer: 1,
    solution: md`Maximum work occurs at $T_2 = T_4 = \sqrt{T_1T_3}$, i.e. $r_p = (T_3/T_1)^{\gamma/2(\gamma-1)}$. At $T_2 = T_3$ the work is zero.`,
  },
  {
    id: 'q-u3-7', topicId: 'u3-air-standard', type: 'mcq', difficulty: 1, source: { kind: 'generated' },
    prompt: 'Mean effective pressure is defined as:',
    options: ['Average of maximum and minimum cycle pressures', 'Net work per cycle divided by swept volume', 'Net work per cycle divided by total cylinder volume', 'Pressure at the end of compression'],
    answer: 1,
    solution: md`$p_m = W_{\text{net}}/V_s$ — the constant pressure that would produce the net work over one stroke.`,
  },
  {
    id: 'q-u3-8', topicId: 'u3-atkinson', type: 'mcq', difficulty: 2, source: { kind: 'generated' },
    prompt: 'In the Atkinson cycle, heat is rejected:',
    options: ['At constant volume', 'At constant pressure', 'Isothermally', 'Isentropically'],
    answer: 1,
    solution: md`Expansion continues down to the initial pressure, so heat rejection 4–1 occurs at constant pressure.`,
  },
  {
    id: 'q-u3-9', topicId: 'u3-otto', type: 'derivation', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 11 Review Questions', page: 374 },
    prompt: 'Derive an expression for the thermal efficiency of the Otto cycle.',
    hints: ['Both heat transfers are at constant volume.', 'Both isentropes span the same volume ratio r.'],
    solution: md`See **Otto cycle → Derivations**. $\eta = 1 - \frac{T_4-T_1}{T_3-T_2}$, with $T_2 = T_1r^{\gamma-1}$ and $T_3 = T_4r^{\gamma-1}$, gives $\eta = 1 - 1/r^{\gamma-1}$.`,
  },
  {
    id: 'q-u3-10', topicId: 'u3-air-standard', type: 'conceptual', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 11 Review Questions', page: 374 },
    prompt: 'Why are engines not operated on the Carnot cycle? Write the drawbacks of the Carnot cycle.',
    solution: md`Isothermal heat addition and rejection require extremely slow processes, while the adiabatic processes need fast operation — the two cannot be combined in one machine. The p–v diagram is very thin, so the net work and mean effective pressure are very small: the engine would be huge for its output, and friction would consume most of the work. Practical heat transfer at exactly constant temperature is also not achievable with a combusting gas.`,
  },
  {
    id: 'q-u3-11', topicId: 'u3-otto', type: 'derivation', difficulty: 3, source: { kind: 'textbook', ref: 'Ch 11 Review Questions', page: 374 },
    prompt: 'Prove that the compression ratio corresponding to maximum work in the Otto cycle is r = (T_max/T_min)^(1/(2(γ−1))).',
    hints: ['Express w as a function of T₂ only.', 'Use T₂T₄ = T₁T₃.'],
    solution: md`See **Otto cycle → Derivations → maximum work**. $dw/dT_2 = 0$ gives $T_2 = \sqrt{T_1T_3}$. Since $T_2/T_1 = r^{\gamma-1}$, $r^{\gamma-1} = \sqrt{T_3/T_1}$ and $r = (T_{\max}/T_{\min})^{1/2(\gamma-1)}$.`,
  },
  {
    id: 'q-u3-12', topicId: 'u3-brayton', type: 'conceptual', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 11 Review Questions', page: 374 },
    prompt: 'Discuss the effect of pressure ratio on the thermal efficiency of the Brayton cycle.',
    hints: ['Look at both η and w_net.'],
    solution: md`$\eta = 1 - 1/r_p^{(\gamma-1)/\gamma}$ increases continuously with $r_p$. For fixed temperature limits, however, the net work rises from zero at $r_p = 1$ to a maximum at $r_p = (T_3/T_1)^{\gamma/2(\gamma-1)}$ and falls back to zero at $r_p = (T_3/T_1)^{\gamma/(\gamma-1)}$, where η would equal Carnot. A practical design chooses $r_p$ between the maximum-work and maximum-efficiency values; raising $T_3$ raises both.`,
  },
  {
    id: 'q-u3-13', topicId: 'u3-otto', type: 'numerical', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 11 Problems', page: 375 },
    prompt: 'The compression ratio in an air-standard Otto cycle is 8. At the beginning of the compression process, the pressure is 1 bar and the temperature is 300 K. The heat transfer to the air per cycle is 1900 kJ/kg of air. Calculate (a) thermal efficiency, (b) the mean effective pressure.',
    hints: ['η depends only on r.', 'mep = w / (v₁ − v₂), v₁ = RT₁/p₁.'],
    solution: md`$\eta = 1 - 8^{-0.4} = 56.47\%$. $w = 0.5647 \times 1900 = 1072.9$ kJ/kg. $v_1 = 0.861$ m³/kg, $v_1 - v_2 = 0.861 \times 7/8 = 0.7534$. $p_m = 1072.9/0.7534 = 1424$ kPa $= 14.24$ bar.`,
    bookAnswer: '(a) 56.47 % (b) 14.24 bar',
  },
  {
    id: 'q-u3-14', topicId: 'u3-diesel', type: 'numerical', difficulty: 2, source: { kind: 'textbook', ref: 'Ch 11 Problems', page: 375 },
    prompt: 'A Diesel engine has an inlet temperature and pressure of 17 °C and 1 bar, respectively. The compression ratio is 15 and the maximum cycle temperature is 1400 K. Calculate the cut-off ratio and the air-standard efficiency of the Diesel cycle. Take γ = 1.4.',
    hints: ['T₂ = T₁r^0.4; ρ = T₃/T₂.'],
    solution: md`$T_2 = 290(15)^{0.4} = 856.7$ K; $\rho = 1400/856.7 = 1.634$. $\eta = 1 - \frac{1}{15^{0.4}}\frac{1.634^{1.4}-1}{1.4(0.634)} = 1 - 0.3385 \times 1.1137 = 62.3\%$.`,
    bookAnswer: 'ρ = 1.634, η = 62.3 %',
  },
  {
    id: 'q-u3-16', topicId: 'u3-dual', type: 'numerical', difficulty: 2, source: { kind: 'generated' },
    prompt: 'An air-standard dual cycle has a compression ratio of 14, a pressure ratio during constant-volume heat addition of 1.5 and a cut-off ratio of 1.6. Find its efficiency and compare it with Otto and Diesel cycles of the same compression ratio (Diesel with the same cut-off ratio). γ = 1.4.',
    hints: ['Use the dual-cycle formula with α = 1.5, ρ = 1.6.', 'Otto: ρ = 1; Diesel: α = 1.'],
    solution: md`$14^{-0.4} = 0.3480$. Dual: $\dfrac{1.5(1.6)^{1.4} - 1}{0.5 + 1.4(1.5)(0.6)} = \dfrac{1.8966}{1.76} = 1.0776$, so $\eta = 1 - 0.3480 \times 1.0776 = 62.5\%$. Otto: $1 - 0.3480 = 65.2\%$. Diesel ($\rho = 1.6$): factor $\dfrac{1.6^{1.4} - 1}{1.4(0.6)} = 1.108$, $\eta = 61.4\%$. Order: Otto > Dual > Diesel, as expected for the same compression ratio.`,
  },
  {
    id: 'q-u3-15', topicId: 'u3-air-standard', type: 'numerical', difficulty: 1, source: { kind: 'textbook', ref: 'Ch 11 Problems', page: 374 },
    prompt: 'The engine of a car has four cylinders of 70-mm bore and 75-mm stroke. The compression ratio is 8. Determine the cubic capacity of the engine and the clearance volume of each cylinder.',
    hints: ['V_s per cylinder = (π/4)d²L.', 'V_c = V_s/(r − 1).'],
    solution: md`$V_s = \frac{\pi}{4}(7)^2(7.5) = 288.6$ cc per cylinder → capacity $= 4 \times 288.6 = 1154$ cc. $V_c = 288.6/(8-1) = 41.2$ cc.`,
    bookAnswer: '1154 cc, 41.21 cc',
  },
]

/* ----------------------------------------------------------------------------- */

export const formulas: Formula[] = [
  {
    id: 'f-u3-r', topicId: 'u3-air-standard', name: 'Compression ratio',
    latex: md`r = \frac{V_c + V_s}{V_c} = \frac{v_1}{v_2}`,
    vars: [{ sym: 'V_c, V_s', meaning: 'clearance and swept volume', unit: 'm³' }],
    conditions: '—',
    meaning: 'Total cylinder volume over clearance volume.',
    ref: { chapter: 11, section: '§11.1', pages: '332' },
  },
  {
    id: 'f-u3-mep', topicId: 'u3-air-standard', name: 'Mean effective pressure', important: true,
    latex: md`p_m = \frac{W_{\text{net}}}{V_s} = \frac{w_{\text{net}}}{v_1-v_2}`,
    vars: [{ sym: 'w_{net}', meaning: 'net work per kg', unit: 'kJ/kg' }],
    conditions: 'For Atkinson, the swept volume is v₄ − v₂.',
    meaning: 'Work output per unit of displacement.',
    ref: { chapter: 11, section: '§11.1', pages: '333' },
  },
  {
    id: 'f-u3-carnot', topicId: 'u3-air-standard', name: 'Carnot efficiency',
    latex: md`\eta = 1 - \frac{T_L}{T_H}`,
    vars: [{ sym: 'T_H, T_L', meaning: 'source and sink temperatures', unit: 'K' }],
    conditions: 'Reversible cycle between two reservoirs.',
    meaning: 'Upper limit for any cycle between the same temperatures.',
  },
  {
    id: 'f-u3-otto', topicId: 'u3-otto', name: 'Otto efficiency', important: true,
    latex: md`\eta_{\text{Otto}} = 1 - \frac{1}{r^{\gamma-1}}`,
    vars: [{ sym: 'r', meaning: 'compression ratio', unit: '—' }],
    conditions: 'Cold-air standard.',
    meaning: 'Depends only on compression ratio.',
    related: ['f-u3-brayton'],
    ref: { chapter: 11, section: '§11.6', pages: '337' },
  },
  {
    id: 'f-u3-otto-mep', topicId: 'u3-otto', name: 'Otto mean effective pressure',
    latex: md`p_m = \frac{p_1\,r\,(r^{\gamma-1}-1)(\alpha-1)}{(\gamma-1)(r-1)}`,
    vars: [{ sym: '\\alpha', meaning: 'pressure ratio p₃/p₂ during heat addition', unit: '—' }],
    conditions: 'Cold-air standard.',
    meaning: 'mep from inlet pressure, r and the explosion ratio.',
  },
  {
    id: 'f-u3-otto-max', topicId: 'u3-otto', name: 'Otto maximum work',
    latex: md`T_2 = T_4 = \sqrt{T_1T_3}, \qquad w_{\max} = c_v\left(\sqrt{T_3}-\sqrt{T_1}\right)^2`,
    vars: [],
    conditions: 'Fixed T₁ and T₃.',
    meaning: 'Optimum compression for a given temperature range.',
  },
  {
    id: 'f-u3-diesel', topicId: 'u3-diesel', name: 'Diesel efficiency', important: true,
    latex: md`\eta_{\text{Diesel}} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\rho^{\gamma}-1}{\gamma(\rho-1)}`,
    vars: [{ sym: '\\rho', meaning: 'cut-off ratio v₃/v₂', unit: '—' }],
    conditions: 'Cold-air standard.',
    meaning: 'Falls as cut-off ratio (load) increases.',
    ref: { chapter: 11, section: '§11.7', pages: '338' },
  },
  {
    id: 'f-u3-diesel-mep', topicId: 'u3-diesel', name: 'Diesel mean effective pressure',
    latex: md`p_m = \frac{p_1\,r^\gamma\left[\gamma(\rho-1) - r^{1-\gamma}(\rho^\gamma-1)\right]}{(\gamma-1)(r-1)}`,
    vars: [],
    conditions: 'Cold-air standard.',
    meaning: 'mep from inlet pressure, r and ρ.',
  },
  {
    id: 'f-u3-dual', topicId: 'u3-dual', name: 'Dual-cycle efficiency', important: true,
    latex: md`\eta_{\text{Dual}} = 1 - \frac{1}{r^{\gamma-1}}\cdot\frac{\alpha\rho^{\gamma}-1}{(\alpha-1)+\gamma\alpha(\rho-1)}`,
    vars: [
      { sym: '\\alpha', meaning: 'pressure ratio p₃/p₂', unit: '—' },
      { sym: '\\rho', meaning: 'cut-off ratio v₄/v₃', unit: '—' },
    ],
    conditions: 'Cold-air standard.',
    meaning: 'Reduces to Otto (ρ = 1) or Diesel (α = 1).',
    ref: { chapter: 11, section: '§11.8', pages: '339' },
  },
  {
    id: 'f-u3-stirling', topicId: 'u3-stirling-ericsson', name: 'Stirling / Ericsson efficiency',
    latex: md`\eta = 1 - \frac{T_L}{T_H}`,
    vars: [],
    conditions: 'Perfect regeneration.',
    meaning: 'Both regenerative cycles reach Carnot efficiency.',
    ref: { chapter: 11, section: '§11.4–11.5', pages: '335–336' },
  },
  {
    id: 'f-u3-atkinson', topicId: 'u3-atkinson', name: 'Atkinson efficiency',
    latex: md`\eta_{\text{Atkinson}} = 1 - \gamma\,\frac{r_e-r_c}{r_e^{\gamma}-r_c^{\gamma}}`,
    vars: [
      { sym: 'r_c', meaning: 'compression ratio v₁/v₂', unit: '—' },
      { sym: 'r_e', meaning: 'expansion ratio v₄/v₃', unit: '—' },
    ],
    conditions: 'Cold-air standard.',
    meaning: 'Larger expansion than compression raises efficiency over Otto.',
    ref: { chapter: 11, section: '§11.11', pages: '363' },
  },
  {
    id: 'f-u3-brayton', topicId: 'u3-brayton', name: 'Brayton efficiency', important: true,
    latex: md`\eta_{\text{Brayton}} = 1 - \frac{1}{r_p^{(\gamma-1)/\gamma}}`,
    vars: [{ sym: 'r_p', meaning: 'pressure ratio p₂/p₁', unit: '—' }],
    conditions: 'Ideal cycle.',
    meaning: 'Depends only on pressure ratio.',
    related: ['f-u3-otto'],
    ref: { chapter: 11, section: '§11.12', pages: '365' },
  },
  {
    id: 'f-u3-rpopt', topicId: 'u3-brayton', name: 'Optimum pressure ratio (max work)', important: true,
    latex: md`r_{p,\text{opt}} = \left(\frac{T_3}{T_1}\right)^{\frac{\gamma}{2(\gamma-1)}}, \qquad w_{\max} = c_p\left(\sqrt{T_3}-\sqrt{T_1}\right)^2`,
    vars: [],
    conditions: 'Ideal cycle, fixed T₁ and T₃.',
    meaning: 'Pressure ratio giving the largest net work per kg.',
    ref: { chapter: 11, section: '§11.12.6', pages: '368' },
  },
  {
    id: 'f-u3-bwr', topicId: 'u3-brayton', name: 'Back work ratio, work ratio, air rate',
    latex: md`\text{bwr} = \frac{w_C}{w_T}, \quad \text{WR} = \frac{w_{\text{net}}}{w_T} = 1 - \text{bwr}, \quad \text{air rate} = \frac{3600}{w_{\text{net}}}`,
    vars: [{ sym: 'w_{net}', meaning: 'net work', unit: 'kJ/kg' }],
    conditions: 'Air rate in kg/kWh.',
    meaning: 'How much turbine work the compressor takes, and how much air per kWh.',
    ref: { chapter: 11, section: '§11.12.3–11.12.5', pages: '367–368' },
  },
]
