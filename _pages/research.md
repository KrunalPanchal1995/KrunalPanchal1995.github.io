---
layout: page
title: Research
permalink: /research/
description: Combustion kinetics and mechanism reduction, fair multi-objective optimization and uncertainty quantification, reduced-order and scientific machine learning.
nav: true
nav_order: 1
---

## Overview

I develop fair multi-objective optimization, uncertainty-quantification and reduced-order/scientific-ML methods for expensive, stiff physical simulations — using combustion chemical kinetics and mechanism reduction as a primary proving ground, and reaching into CFD, propulsion and quantum chemistry as the same methods generalize. My PhD work produced **MOSIAC**, an open-source workbench for uncertainty-aware combustion mechanism optimization, alongside hands-on experimental and numerical combustion work: pool-flame characterization, a downdraft gasifier, and the GUI-driven computer-vision tooling that post-processes the pool-flame video.

<figure class="loop-media">
  <img src="/assets/img/projects/muq-sac/009_classC_ls_sample_005_10x.gif" alt="Arrhenius-curve uncertainty sampling animation, tightening in real time" loading="lazy" />
  <figcaption>MUQ-SAC in motion: each frame is one sampled Arrhenius curve tightening the joint uncertainty band for an n-heptane reaction (10&times; real speed) — see <a href="/projects/muq-sac/">MUQ-SAC</a>.</figcaption>
</figure>

## Research themes

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <h3>Combustion Kinetics & Mechanism Reduction</h3>
    <p>Chemical kinetic mechanism development, validation and reduction to tractable, simulation-ready form — from H<sub>2</sub>/O<sub>2</sub> to n-heptane, methyl butanoate and 1,3-butadiene.</p>
  </div>
  <div class="col mb-4">
    <h3>Fair Multi-Objective Optimization & UQ</h3>
    <p>Multi-stage, multi-dataset optimization of Arrhenius rate parameters built around a fair mean objective across datasets; correlated-parameter Bayesian uncertainty quantification and its propagation forward through the model.</p>
  </div>
  <div class="col mb-4">
    <h3>Reduced-Order Modelling & Scientific ML</h3>
    <p>Neural and response-surface surrogates that stand in for expensive stiff simulations — where they work, where they don't, and why.</p>
  </div>
  <div class="col mb-4">
    <h3>Experimental & Numerical Combustion, CFD</h3>
    <p>Pool-flame characterization and downdraft gasification alongside an in-house CFD/multiphysics solver, reacting-flow studies, vaporizer/burner rig design, and early-stage quantum-chemical rate-constant estimation.</p>
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
- **[Flame Processor](/projects/flame-processor/)** — GUI-driven computer vision for pool-fire video, replacing four brittle MATLAB scripts; run against real footage, honest limitations included.

## Methods & tools

Every tool below links to a project that actually used it — no skill bars.

- **Fair Multi-Objective Optimization** — genetic algorithms, CMA-ES, gradient/NLLS, Bayesian & GP optimization, surrogate-assisted search — see [MSO objectives](/projects/mso-objectives/)
- **Uncertainty quantification** — correlated-parameter UQ, Sobol sensitivity analysis — see [MUQ-SAC](/projects/muq-sac/)
- **Reduced-order modelling & scientific ML** — physics-informed neural networks, neural ODEs, response-surface surrogates — see [SciML](/projects/sciml/)
- **Simulation & CFD** — Cantera, CHEMKIN-PRO, FlameMaster, OpenFOAM, an in-house CFD/multiphysics solver — see [MOSIAC](/projects/mosiac/) and [CFDCore.jl](/projects/cfdcore/)
- **Experimental combustion** — rig design and commissioning, gas chromatography, thermocouple instrumentation, gasification, GUI-driven video post-processing — see [gasification](/projects/gasification/) and [Flame Processor](/projects/flame-processor/)

## Publications

<div class="cta-row">
  <a class="btn-cta btn-cta-secondary" href="/publications/">Full publication list &rarr;</a>
</div>

5 refereed journal articles, 1 published conference paper, 1 manuscript under review, and 3 accepted conference abstracts (64th Symposium (Japanese) on Combustion, Fukuoka, Nov 2026).

## CV

<div class="cta-row">
  <a class="btn-cta btn-cta-secondary" href="/cv/">View the full CV &rarr;</a>
</div>
