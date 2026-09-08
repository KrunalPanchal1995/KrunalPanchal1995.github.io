---
layout: page
title: dokimazo — A PIDO Optimization Workbench
description: A dependency-light process-integration-and-design-optimization workbench with a plug-and-play graph IR, closed by a reinforcement-learning conformer search that tunes a long alkane chain's rotors one at a time
img: assets/img/projects/dokimazo/02_three_way_benchmark-800.png
importance: 11
category: [optimization, sciml]
related_publications: false
---

{% include project_gallery.liquid project="dokimazo" %}

## Problem

Commercial optimization/design-of-experiments packages (Ansys, COMSOL, Mathematica, MATLAB) bundle objective functions, algorithms, and data handling into one fixed pipeline — swapping any one piece usually means switching packages entirely, or writing glue code that itself becomes unmaintainable. The everyday optimization problems across chemistry, ML training, and design search share the same shape (a decision vector, an objective, a search strategy) but never share a codebase: a conformer search, a neural-network training run, and a multi-objective engineering design each get re-implemented from scratch, with no common graph to mix and match objectives, solvers, and samplers.

**dokimazo** is a from-scratch answer: a numpy-only core (a graph intermediate representation where objective functions, solvers, adapters, samplers, and NN trainers are all swappable, lazily-discovered plugins) with every heavier capability — jax-backed neural-network training, RDKit-backed chemistry, a browser GUI — kept strictly optional and outside the kernel.

## Approach

- **A minimal, protocol-driven kernel.** Four parallel `Registry` groups (`Solver`, `Adapter`, `Trainer`, `Sampler`) share one lazy-discovery mechanism — entry points or explicit in-process registration — so a new algorithm plugs in without touching the kernel. `Problem` (a DESDEO-flavored decision-vector/objective/constraint container) and a content-addressed `Graph`/`Node` IR are the only two things every capability composes over.
- **Six solvers, cross-checked against each other.** Three clean-room native implementations (Nelder-Mead, IPOP-CMA-ES following Hansen 2001/2016 and Auger & Hansen 2005, L-BFGS-B) plus thin, tested wrappers around `scipy.optimize`, `pymoo`, `pygad`, and `optuna` — every one benchmarked head-to-head on a shared analytic/engineering/multi-objective suite (Dolan–Moré performance profiles, hypervolume/IGD indicators).
- **Sampling, uncertainty propagation, and solution mapping** as first-class graph nodes: Monte Carlo and QMC (Sobol′/Latin-Hypercube) samplers, forward uncertainty propagation, and Pareto-front solution mapping via fast-non-dominated-sort (Deb et al. 2002).
- **A jax-backed NN/training layer** — one `Trainer` protocol covering supervised and RL losses identically (a REINFORCE loss and a supervised loss are the same shape to the trainer that minimizes them), with a hard-boundary-condition decoder (Lagaris et al. 1998), a graph-convolution layer (Kipf & Welling 2017), a hand-rolled fixed-step Neural ODE (Chen et al. 2018), and REINFORCE (Williams 1992) as four ways of building that one loss.
- **A browser GUI**, built the same session a plan mistakenly called it "explicitly parked" and the user pointed out that had been the actual request — a FastAPI backend plus a dependency-free vanilla-JS node-graph editor: draw the pipeline, wire nodes by clicking output-then-input dots, run it, and watch dependency-free inline-SVG charts (histograms, Pareto scatters) render from whatever shape the run's output takes.
- **Reinforcement learning closing its own named gap, on a real application — this project's newest piece.** Every capability above ships with its fidelity gaps named in its own docstring rather than silently rounded up (`REINFORCE on a single-step contextual bandit` was RL's own stated gap). Closing that gap with a second toy bandit would have been easy; instead it's closed with **an RL agent that tunes the rotatable bonds of a real molecule — n-dodecane, a 12-carbon chain — one rotor at a time**, searching for the conformer (3D shape) with the lowest MMFF94 force-field energy. See the training curve and benchmark figures above.

## The RL rotor-tuning environment

A `RotorTuningEnv` episode is one left-to-right pass over the molecule's 11 rotatable backbone bonds: at each step the agent picks a discretized angle (24 bins, 15° resolution) for the *next* rotor, conditioned on every rotor already set. Two measurements, taken directly on this machine before writing a line of the reward design, decided its shape:

- A full relaxed MMFF94 energy evaluation (`Minimize()` + `CalcEnergy()`) costs **14.7 ms**.
- The same energy *without* relaxation — a single-point evaluation — costs **0.26 ms**: roughly **56× cheaper**.

That asymmetry is why the reward is split in two: every step pays the cheap single-point energy improvement as a dense shaping signal, and only the final step — once every rotor is decided — pays for one real, relaxed energy evaluation as the terminal reward, which is the number that actually gets reported. The policy is trained with multi-step REINFORCE (Williams 1992): discounted reward-to-go plus a per-timestep batch-mean baseline for variance reduction, extending — not replacing — this project's existing single-step REINFORCE loss.

One invariant is load-bearing enough to be checked by its own test: the environment holds **no mutable geometry between steps.** Its entire state is the plain vector of angles chosen so far; every reward call resets to a fixed reference geometry and sets the full vector from scratch. An earlier version of this project's own conformer-energy function once violated exactly this rule by accident — mutating a molecule's 3D coordinates in place with no reset, so the same input silently returned two different energies — which is precisely the kind of bug that breaks a content-addressed cache. The new environment is built so that class of bug can't recur, and a regression test replays the same episode twice (and interleaved with an unrelated one) to confirm it.

## Results

**n-Dodecane, not this project's earlier conformer-search molecule, is the headline case specifically because it has an independent ground truth**: the global MMFF94 minimum of any unbranched alkane is its all-anti extended conformer — every backbone torsion at ±180° — a structural fact, not an agreement between two implementations. (The earlier flagship result, on a smaller molecule whose SMILES reading was never confirmed with the user, stays out of this page for exactly that reason.)

Three independent methods, same molecule, same force field, reported side by side whether or not the new one wins:

| Method | Final MMFF94 energy | Force-field evaluations | Wall time |
|---|---|---|---|
| **RL rotor-tuning** (this work) | −6.7129 kcal/mol | 230,400 | 14.7 min |
| dokimazo's IPOP-CMA-ES | −6.7129 kcal/mol | 6,600 | 1.5 min |
| RDKit ETKDG + MMFF94 (200 confs) | −5.8895 kcal/mol | 200 | 5.3 s |

**Both the RL agent and IPOP-CMA-ES reached the true global minimum** — verified directly, not inferred from the energy number alone: reading back the molecule's actual post-relaxation dihedral angles (not the pre-relaxation guess a solver proposes — MMFF94's own geometry relaxation moves torsions too, so those two are genuinely different things) shows all 9 real backbone C–C–C–C torsions sitting within numerical precision of the all-anti ±180° target, matching a directly-computed all-180° reference energy (−6.712879 kcal/mol) to 6 significant figures. The other 2 of the 11 bonds RDKit's rotatable-bond detector flags are dihedrals through a *terminal methyl group's own hydrogens* — rotating one changes the energy not at all (checked directly: bit-identical energy from −60° to 180°), since permuting three symmetric hydrogens isn't a real conformational degree of freedom. RDKit's own 200-conformer ETKDG reference, by contrast, landed on a genuine local minimum 0.82 kcal/mol above the true global one — the honest way this project's earlier conformer-search result put it still applies here, just with the roles reversed: **this time, the harder-to-reach oracle (structural ground truth) is what dokimazo's own search reached and the standard reference pipeline missed, at roughly 35× (CMA-ES) to 1,150× (RL) more force-field evaluations to get there.** The RL agent's own post-relaxation dihedrals were not independently re-extracted (would need re-running its ~15-minute training) — its evidence is the energy value matching CMA-ES's and the direct reference's to displayed precision on a continuous, 11-dimensional, non-convex function, which is itself strong, but that is what it is: an energy match, not a separately re-verified geometry, and that distinction is worth keeping straight rather than blurring the two kinds of evidence together.

The training-curve figure above shows the RL agent's batch-mean and best-so-far energy over 400 REINFORCE training steps against both reference methods as horizontal lines — the best-so-far curve reaches CMA-ES's exact value by step ~30 and holds it for the rest of training, while the batch mean keeps improving as the policy gets more consistent at finding it. The torsion-convergence figure shows the 11 raw rotor-angle proposals (including the two degenerate methyl ones, since it's tracking what the agent actually proposed) over the same training run. The video is the same optimization process, rendered as the molecule's real 3D structure at each improving checkpoint.

## Solver, sampler, and solution-mapping visualization

The Approach section above names six cross-checked solvers, quasi-Monte-Carlo sampling, and Pareto-front solution mapping as capabilities — the gallery's "solver visualization" group is the first time any of that is shown rather than just described, built with a small new instrumentation layer (`dokimazo.viz`) that wraps a real `Solver.minimize` call and records every evaluation against a shared cumulative-function-evaluation clock, not iteration count (different solvers do very different amounts of work per iteration, so comparing by iteration alone would make a gradient method look free next to a population-based one for no principled reason).

The two solver races make the same point two different ways. On Rosenbrock's single smooth valley, all four solvers (two independent L-BFGS-B implementations included) take visibly the same route — genuinely informative on its own (two independent implementations agreeing is a real cross-check, not a redundant image), but the convergence panel is what actually shows the two L-BFGS-B curves reaching machine precision in a fraction of CMA-ES's evaluation budget, since the search-path panel alone can't distinguish "these agree" from "one is missing." Rastrigin's many local minima, on the same shared budget, tell the story a smooth valley can't: the gradient methods stall in whichever nearby local minimum they land in first, and only CMA-ES's population-wide search — visibly spanning the whole box, not following one path — escapes far enough via restarts to reach the true global optimum.

The trajectory figure is this page's literal answer to "a 3D surface trace for a three-variable system": a height-map surface (z = f(x, y)) only exists for exactly 2 inputs and 1 output, so for a genuine 3-decision-variable problem the mathematically honest visualization is every evaluated point plotted at its own (x1, x2, x3) coordinate, colored by objective value, with the converging search path traced through that space rather than a surface mislabeled as one.

The sampler and solution-mapping figures are each an honest demonstration of one specific capability, not a cherry-picked result: quasi-Monte-Carlo's more even coverage is shown both visually and via its actual discrepancy number against plain Monte Carlo, and the extracted Pareto front is captioned for what it does and doesn't show — it correctly extracts the non-dominated subset of whatever sample it's given, but a sample built by plain random search sits visibly above the true front, which is a fact about the sampling, not the extraction, and the honest reason a real multi-objective solver (open roadmap item, see below) is a different, still-needed piece.

For the two-variable case a height-map surface is the honest visualization the trajectory figure above deliberately avoids for three variables: two rotating 3D surfaces (Rosenbrock's single curved valley, and Himmelblau's four separate equal-depth basins) each carry a real CMA-ES run's full evaluation cloud and best-so-far path traced directly on the log-scaled surface, with a companion fixed-slice figure showing exactly how that changes once a third variable is added — the (x1, x2) path from the earlier 3-variable trajectory result, projected onto a 2D slice held at the run's own found x3, with the figure's own title stating plainly that the slice height and each point's true 3D objective are different quantities. Forward uncertainty propagation gets the same "just another graph node" treatment as sampling and solution mapping: Monte Carlo propagation of Normal input uncertainty through Rosenbrock, mean and ±1σ read directly off the output histogram.

## Validation

Every algorithm in this package is oracle-tested against an independent reference before being trusted, never "it looks right": the native solvers against `scipy`'s own convergence on the same analytic functions; MMFF94 energies against RDKit's own force-field implementation (the same numbers, since dokimazo calls RDKit's force field directly — the *search strategy* is what's independent, not the physics); the RL rotor-tuning environment's purity against a bit-for-bit replay test; and the REINFORCE loss (both the original single-step version and this session's multi-step generalization) against a synthetic environment with a known-optimal action, checked directly rather than by "reward went up." The full test suite has grown to 369 passing (1 skipped by design) as the package picked up its browser GUI and benchmark harness — up from 184 at the time of the RL rotor-tuning result above.

A standing benchmark harness now cross-checks 7 solvers (including two independent L-BFGS-B implementations) across 16 analytic problems plus a constrained-engineering suite, reporting Dolan–Moré performance profiles rather than a single leaderboard number — a losing row is kept in the table exactly as visibly as a winning one, the same discipline as the RL-vs-CMA-ES-vs-RDKit table above.

## My contribution

Sole author of the kernel, every solver/sampler/trainer/adapter, the web GUI, and the RL rotor-tuning environment and loss described above — a personal, from-scratch package, built and cited against the published algorithms it reimplements (Hansen, Williams, Halgren, Deb et al., Kipf & Welling, Chen et al., Lagaris et al.), not a wrapper around them.

## Where this is going

Named, not hidden: the rotor-tuning environment discretizes each angle into 24 bins rather than searching continuously, decides each rotor exactly once in a fixed left-to-right order rather than revisiting earlier choices, and uses only a batch-mean variance-reduction baseline rather than a learned value function. The broader package still has an open roadmap toward automatic differentiation, a wider deterministic and global-optimization solver suite, full multi-objective algorithms (NSGA-II/III, MOEA/D), Bayesian optimization with surrogate models, global sensitivity analysis, and inverse/calibration uncertainty quantification — this RL result is one closed gap on a workbench still being built, not a finished product.
