---
layout: page
title: Research
permalink: /research/
description: Combustion kinetics and mechanism reduction, fair multi-objective optimization and uncertainty quantification, reduced-order and scientific machine learning.
nav: true
nav_order: 1
---

## Overview

I develop fair multi-objective optimization, uncertainty-quantification and reduced-order/scientific-ML methods for expensive, stiff physical simulations — using combustion chemical kinetics and mechanism reduction as a primary proving ground, and reaching into CFD, propulsion and quantum chemistry as the same methods generalize. My PhD work produced **MOSIAC**, an open-source workbench for uncertainty-aware combustion mechanism optimization, alongside hands-on experimental and numerical combustion work: pool-flame characterization, a downdraft gasifier, and the computer-vision measurement instrument ([flamelab](/projects/flamelab/)) that quantifies pool-flame video in physical units.

<figure class="loop-media">
  <img src="/assets/img/projects/muq-sac/009_classC_ls_sample_005_10x.gif" alt="Arrhenius-curve uncertainty sampling animation, tightening in real time" loading="lazy" />
  <figcaption>MUQ-SAC in motion: each frame is one sampled Arrhenius curve tightening the joint uncertainty band for an n-heptane reaction (10&times; real speed) — see <a href="/projects/muq-sac/">MUQ-SAC</a>.</figcaption>
</figure>

## Research themes

<!-- B5 (GOAL_SCORECARD.md, session 11): each theme card is now a real link into
     the project that best represents it, with a representative figure -- the
     hover-preview system (hover_previews.liquid, B1) picks these links up
     automatically at build time (it indexes every real internal URL), so
     hovering any card title now shows the linked project's own title +
     description with zero extra work here. -->
<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <a href="/projects/mosiac/" style="text-decoration: none; color: inherit;">
      <img src="/assets/img/projects/mosiac/007_02b_ignitability_3d_map-800.png" alt="MOSIAC ignitability 3D map" loading="lazy" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;" />
      <h3>Combustion Kinetics &amp; Mechanism Reduction &rarr;</h3>
    </a>
    <p>Chemical kinetic mechanism development, validation and reduction to tractable, simulation-ready form — from H<sub>2</sub>/O<sub>2</sub> to n-heptane, methyl butanoate and 1,3-butadiene. Workbench: <a href="/projects/mosiac/">MOSIAC</a>.</p>
  </div>
  <div class="col mb-4">
    <a href="/projects/muq-sac/" style="text-decoration: none; color: inherit;">
      <img src="/assets/img/projects/muq-sac/001_fig1_ellipsoid_containment-800.png" alt="MUQ-SAC correlated-parameter uncertainty ellipsoid" loading="lazy" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;" />
      <h3>Fair Multi-Objective Optimization &amp; UQ &rarr;</h3>
    </a>
    <p>Multi-stage, multi-dataset optimization of Arrhenius rate parameters built around a fair mean objective across datasets; correlated-parameter Bayesian uncertainty quantification and its propagation forward through the model. Method: <a href="/projects/muq-sac/">MUQ-SAC</a>, applied via <a href="/projects/mso-objectives/">MSO objectives</a>.</p>
  </div>
  <div class="col mb-4">
    <a href="/projects/sciml/" style="text-decoration: none; color: inherit;">
      <img src="/assets/img/projects/sciml/001_fig1_noise_floor-800.png" alt="SciML noise-floor figure from the Neural ODE surrogate study" loading="lazy" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;" />
      <h3>Reduced-Order Modelling &amp; Scientific ML &rarr;</h3>
    </a>
    <p>Neural and response-surface surrogates that stand in for expensive stiff simulations — where they work, where they don't, and why. Deep dive: <a href="/projects/sciml/">SciML</a>; live demo: <a href="/playground/">the Neural ODE playground</a>.</p>
  </div>
  <div class="col mb-4">
    <a href="/projects/vaporizer-rigs/" style="text-decoration: none; color: inherit;">
      <img src="/assets/img/projects/vaporizer-rigs/004_pressure_drop_vs_diameter-800.png" alt="Vaporizer rig pressure-drop-vs-diameter design chart" loading="lazy" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;" />
      <h3>Experimental &amp; Numerical Combustion, CFD &rarr;</h3>
    </a>
    <p>Pool-flame characterization and downdraft gasification alongside an in-house CFD/multiphysics solver, reacting-flow studies, vaporizer/burner rig design, and early-stage quantum-chemical rate-constant estimation. Rig design: <a href="/projects/vaporizer-rigs/">vaporizer rigs</a>; imaging: <a href="/projects/flamelab/">flamelab</a>.</p>
  </div>
</div>

## Featured projects

<div class="cta-row">
  <a class="btn-cta btn-cta-secondary" href="/projects/">Browse the full, filterable project list &rarr;</a>
</div>

The strongest single thread: **MOSIAC**, the optimization workbench built during the PhD — see its [step-by-step guide](/projects/mosiac/) — feeding into the [MSO objective-function work](/projects/mso-objectives/) and the published [MUQ-SAC uncertainty quantification method](/projects/muq-sac/).

## Research experiments

Smaller, self-contained studies that show how I work, not just what I've published:

- **[Scientific ML for Stiff Kinetics](/projects/sciml/)** — a documented, 50-generation journey from an untrainable neural ODE to a working surrogate, closing with a 115-run statistical audit of my own results.
- **[Symbolic Regression for Rate Rules](/projects/pysr-rate-rules/)** — using SR to rediscover the Evans–Polanyi relation from data, with a leave-one-class-out generalization check.
- **[flamelab](/projects/flamelab/)** — a computer-vision instrument that measures flame length, width and flicker from pool-fire video in physical units with propagated uncertainty: eight-run ensemble campaign, regime classification, thirteen analysis methods, honest limitations included.

## Methods & tools

Every tool below links to a project that actually used it — no skill bars.

- **Fair Multi-Objective Optimization** — genetic algorithms, CMA-ES, gradient/NLLS, Bayesian & GP optimization, surrogate-assisted search — see [MSO objectives](/projects/mso-objectives/)
- **Uncertainty quantification** — correlated-parameter UQ, Sobol sensitivity analysis — see [MUQ-SAC](/projects/muq-sac/)
- **Reduced-order modelling & scientific ML** — physics-informed neural networks, neural ODEs, response-surface surrogates — see [SciML](/projects/sciml/)
- **Simulation & CFD** — Cantera, CHEMKIN-PRO, FlameMaster, OpenFOAM, an in-house CFD/multiphysics solver — see [MOSIAC](/projects/mosiac/) and [CFDCore.jl](/projects/cfdcore/)
- **Experimental combustion** — rig design and commissioning, gas chromatography, thermocouple instrumentation, gasification, computer-vision flame measurement — see [gasification](/projects/gasification/) and [flamelab](/projects/flamelab/)

## Publications

<div class="cta-row">
  <a class="btn-cta btn-cta-secondary" href="/publications/">Full publication list &rarr;</a>
</div>

5 refereed journal articles, 1 published conference paper, 1 manuscript under review, and 3 accepted conference abstracts (64th Symposium (Japanese) on Combustion, Fukuoka, Nov 2026).

## CV

<div class="cta-row">
  <a class="btn-cta btn-cta-secondary" href="/cv/">View the full CV &rarr;</a>
</div>
