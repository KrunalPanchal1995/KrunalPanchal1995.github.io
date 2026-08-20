---
layout: page
title: MOSIAC
description: An open-source, uncertainty-quantified workbench for combustion kinetic mechanism optimization
img: assets/img/projects/mosiac/001_01_mso_studio_launcher-800.png
importance: 1
category: [combustion, optimization, uq]
related_publications: false
---
{% include project_gallery.liquid project="mosiac" %}


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

## Step-by-step: running an optimization campaign

1. **Launch** the MOSIAC Studio integrator — a tile gallery grouped by workflow stage (prepare · explore · quantify · optimize · compare).
2. **Prepare** — convert a CHEMKIN mechanism to Cantera YAML, run the health-check/auto-repair pass, and curate experimental targets (a plot-digitizer → ReSpecTh-XML converter with round-trip verification).
3. **Explore** — run a nominal simulation, then a brute-force or graph-based sensitivity analysis to find which reactions actually matter.
4. **Quantify** — propagate parameter uncertainty forward through trained response-surface surrogates (Monte Carlo + analytical Sobol indices).
5. **Optimize** — tune the sensitive rate constants against the curated targets, with every run logged, every figure shipped alongside its data file, and a one-click LaTeX report at the end.
6. **Compare** — a four-phase comparison pipeline against baseline mechanisms.

## Validation

The clearest validation study is an H<sub>2</sub>/O<sub>2</sub> extreme-condition sweep cross-checked across **four independent solvers** — Cantera, CHEMKIN-PRO, Zero-RK and FlameMaster — covering explosion limits, ignition delay, laminar flame speed, extinction strain rate, and jet-stirred-reactor S-curves. Where the four solvers agree, that's confidence in the physics; where they don't, MOSIAC's diagnostics (stiffness maps, rate-of-production spectra) show why.

## My contribution

Developed by me, as the primary author and PhD deliverable, building on open-source foundations (Cantera, RMG-Py conventions, ReSpecTh data format) rather than reimplementing them.

## Publications

The MOSIAC software paper is in preparation, targeting the *Journal of Open Source Software*. The uncertainty-quantification methodology at its core is published: {% cite panchal2024muqsac %}.

## Code

Repository: [github.com/KrunalPanchal1995](https://github.com/KrunalPanchal1995) *(currently under review before public release — link will go live at that point)*.

## Where this is going

A researcher can go from a raw CHEMKIN mechanism and a folder of digitized experimental plots to a calibrated, uncertainty-bounded mechanism with a publication-ready report — without hand-writing the glue between each step, and without losing track of how sure they should be about the result.
