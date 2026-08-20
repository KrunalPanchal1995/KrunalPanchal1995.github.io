---
layout: page
title: MOSIAC
description: An open-source, uncertainty-quantified workbench for combustion kinetic mechanism optimization
img: assets/img/projects/mosiac/018_01_launcher-800.png
importance: 1
category: [combustion, optimization, uq]
related_publications: false
---

## Problem

Building a trustworthy chemical kinetic mechanism means calibrating hundreds of Arrhenius rate constants against experimental data — ignition delays, flame speeds, species profiles — while keeping every calibrated parameter within its physically justified uncertainty range. Doing this by hand, or with disconnected scripts, doesn't scale past a handful of reactions, and it makes uncertainty an afterthought rather than something enforced throughout.

## Why it matters

A mechanism that fits data without honest uncertainty bounds is a mechanism nobody can trust outside the exact conditions it was tuned on. Treating a rate constant as a *range*, not a value, and propagating that range forward through every simulation, is what makes an optimized mechanism usable for prediction rather than just curve-fitting.

## Approach

MOSIAC (formerly named RMIP, now retired) unifies the full workflow behind one configuration file: mechanism conversion and health-checking, sensitivity analysis, response-surface-based optimization, forward uncertainty propagation, and reporting — all with uncertainty treated as a first-class citizen rather than bolted on at the end.

## Implementation

- **Core:** Python + C++ (pybind11) for performance-critical kernels, Cantera for chemistry, PySide6 (Qt) for the GUI, run as an isolated environment from the science stack.
- **Architecture:** a pure-Python core (`mso_studio.core`, zero Qt) cleanly separated from the GUI layer, joined by a run-configuration/run-record contract — so every campaign is reproducible and every run can be paused, patched, and resumed.
- **~2,300 Python files**, with a documented, tested public API (Sphinx + ReadTheDocs).

{% include project_gallery.liquid project="mosiac" topic="hero" %}

## Step-by-step: a real H2/O2 case study, run live for this page

Everything below is from an actual session driving MOSIAC Studio on the bundled H2/O2 mechanism (29 reactions) — not a description of what the GUI is supposed to do. Screenshots and log output are unedited; where something didn't work, that's shown too.

### 1. Launch

MOSIAC Studio opens on a tile gallery, grouped by workflow stage (Prepare · Explore · Quantify · Optimise · Compare · Utilities — 20 tools total). The status bar along the bottom checks every backend before anything runs: repository, the `.venv-gui` PySide6 environment, the separate science-stack Python, Cantera, and disk space all read green here.

{% include project_gallery.liquid project="mosiac" topic="wt-1-launcher" %}

### 2. Configure a nominal simulation

Clicking the **Nominal Simulation** tile opens its own window with a plain form: run label, mechanism file, target file, thermo/transport files, target count. Filled in here with the real bundled case — `h2o2_he.yaml`, its thermo and transport data, and the 426-target experimental file that ships with it (426 targets total; run at 52 here so the demo finishes in under a minute rather than the ~4 minutes a full pass takes).

{% include project_gallery.liquid project="mosiac" topic="wt-2-nominal-config" %}

### 3. Run it

Nominal Simulation runs on a background thread specifically so the window doesn't lock up mid-run — Run becomes Stop, and a live log strip shows progress underneath the form.

{% include project_gallery.liquid project="mosiac" topic="wt-3-nominal-running" %}

### 4. Real results, not a mock-up

52 tables in 23.5 seconds. The Tables tab shows per-target predicted-vs-observed rows — dataset `TIG_0001` at 1000 K is the first one here — and the run wrote a full case-by-case output tree to disk: 52 numbered case directories under `SIM_RUNS/nominal_htc/NOMINAL/`, each with its own `time_history.csv`, a copy of the mechanism actually used, and a solver log, plus a `Plot/Dataset/` tree of generated figures.

{% include project_gallery.liquid project="mosiac" topic="wt-4-nominal-done" %}

### 5. A second tool: ignition-delay sensitivity

A different, self-contained diagnostic — "which reactions actually control ignition delay, at one condition" — rather than a full optimization run. Configured for H<sub>2</sub> fuel at T=1200 K, P=13.5 atm, phi=1.0, constant-volume reactor, brute-force method, top 20 reactions.

{% include project_gallery.liquid project="mosiac" topic="wt-5-idt-config" %}

### 6. Done in 2.4 seconds — and the physics checks out

The tool writes a JSON of normalized sensitivity coefficients (d ln(tau)/d ln(k)) for all 29 reactions in the mechanism. The result is exactly what combustion chemistry says it should be: **H + O2 ⇌ O + OH**, the dominant chain-branching step, has the single largest-magnitude coefficient (−1.62) — speed that reaction up and ignition delay drops. **H + O2 + N2 ⇌ HO2 + N2**, a chain-*terminating* three-body step, is next largest and has the *opposite* sign (+0.79) — speed that one up and ignition delay gets longer. A tool that didn't understand the chemistry couldn't get that sign flip right by accident.

{% include project_gallery.liquid project="mosiac" topic="wt-6-idt-done" %}

### 7. Attempting an optimization run

The Optimization tool needs a fully-populated `target.opt` project file (mechanism, targets, thermo/transport, and every optimizer setting in one place) rather than a form — MOSIAC's real campaigns aren't quick, so this is the one tool built around editing a config file directly rather than re-filling a form each time. For this demo, a copy of the bundled H2 project config had its generation count cut from 20,000 to 5 and its target count from 426 to 30 (the real settings would run for hours); everything else — mechanism, solver, targets — is the same real H2/O2 case as steps 2–6. The design-space plot below is generated automatically as the run's first step, before any fitting starts:

{% include project_gallery.liquid project="mosiac" topic="wt-7-design-space" %}

{% include project_gallery.liquid project="mosiac" topic="wt-8-opt-running" %}

### 8. Where it actually broke — shown, not hidden

The run got through target export, the design-space plot above, and parsing the joint-uncertainty data (a 3-reaction test fixture, used here since the bundled H2 project's own uncertainty file turned out to be a plain-text target file rather than the XML the optimizer expects — a real gap in the demo data, fixed by pointing at a smaller uncertainty fixture already in the repository's own test suite). It then failed one step later: the sensitivity-analysis sub-step expects a nominal-simulation case directory at a specific relative path (`nominal/case-7`) that this standalone optimization run hadn't produced itself. That's a real, undocumented dependency between two of the GUI's own tools — Nominal Simulation and Optimization apparently need to be run from a shared working directory for the second to find the first's output — caught only by actually running them back to back, not by reading the source.

{% include project_gallery.liquid project="mosiac" topic="wt-9-opt-error" %}

This is the honest state of a standalone Optimization run today: three of the four Explore/Optimise-stage tools (Nominal Simulation, Ignition-Delay Sensitivity, and the first three stages of Optimization) run cleanly end to end on real data; the fourth needs its working-directory contract with Nominal Simulation tightened up. Left as a finding, not smoothed over.

## Validation

The clearest validation study is an H<sub>2</sub>/O<sub>2</sub> extreme-condition sweep cross-checked across **four independent solvers** — Cantera, CHEMKIN-PRO, Zero-RK and FlameMaster — covering explosion limits, ignition delay, laminar flame speed, extinction strain rate, and jet-stirred-reactor S-curves. Where the four solvers agree, that's confidence in the physics; where they don't, MOSIAC's diagnostics (stiffness maps, rate-of-production spectra) show why.

{% include project_gallery.liquid project="mosiac" topic="h2o2-validation" %}

## My contribution

Developed by me, as the primary author and PhD deliverable, building on open-source foundations (Cantera, RMG-Py conventions, ReSpecTh data format) rather than reimplementing them.

## Publications

The MOSIAC software paper is in preparation, targeting the *Journal of Open Source Software*. The uncertainty-quantification methodology at its core is published: {% cite panchal2024muqsac %}.

## Code

Repository: [github.com/KrunalPanchal1995](https://github.com/KrunalPanchal1995) *(currently under review before public release — link will go live at that point)*.

## Where this is going

A researcher can go from a raw CHEMKIN mechanism and a folder of digitized experimental plots to a calibrated, uncertainty-bounded mechanism with a publication-ready report — without hand-writing the glue between each step, and without losing track of how sure they should be about the result.
