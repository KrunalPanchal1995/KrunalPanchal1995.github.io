---
layout: page
title: Research
permalink: /research/
description: Optimization, uncertainty quantification, combustion kinetics, and scientific machine learning.
nav: true
nav_order: 1
---

## Overview

I develop optimization, uncertainty-quantification and scientific-ML methods for expensive, stiff physical simulations — using combustion chemical kinetics as a primary proving ground, and reaching into CFD, propulsion and quantum chemistry as the same methods generalize. My PhD work produced **MOSIAC**, an open-source workbench for uncertainty-aware combustion mechanism optimization, alongside hands-on experimental characterization of pool flames and a downdraft gasifier.

## Research themes

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <h3>Combustion Kinetics</h3>
    <p>Chemical kinetic mechanism development, validation and reduction — from H<sub>2</sub>/O<sub>2</sub> to n-heptane, methyl butanoate and 1,3-butadiene.</p>
  </div>
  <div class="col mb-4">
    <h3>Optimization & Uncertainty Quantification</h3>
    <p>Multi-stage and multi-objective optimization of Arrhenius rate parameters; correlated-parameter Bayesian uncertainty quantification and its propagation forward through the model.</p>
  </div>
  <div class="col mb-4">
    <h3>Scientific Machine Learning</h3>
    <p>Neural surrogates for stiff dynamical systems — where they work, where they don't, and why.</p>
  </div>
  <div class="col mb-4">
    <h3>Computational Engineering</h3>
    <p>An in-house CFD/multiphysics solver, vaporizer and burner rig design, and early-stage differentiable quantum chemistry.</p>
  </div>
</div>

## Featured projects

<a href="/projects/">Browse the full, filterable project list &rarr;</a>

The strongest single thread: **MOSIAC**, the optimization workbench built during the PhD — see its [step-by-step guide](/projects/mosiac/) — feeding into the [MSO objective-function work](/projects/mso-objectives/) and the published [MUQ-SAC uncertainty quantification method](/projects/muq-sac/).

## Research experiments

Smaller, self-contained studies that show how I work, not just what I've published:

- **[Scientific ML for stiff kinetics](/projects/sciml/)** — a documented, 50-generation journey from an untrainable neural ODE to a working surrogate, closing with a 115-run statistical audit of my own results.
- **[Symbolic regression for rate rules](/projects/pysr-rate-rules/)** — using SR to rediscover the Evans–Polanyi relation from data, with a leave-one-class-out generalization check.
- **[Flame Processor](/projects/flame-processor/)** — a GUI under active development to post-process pool-fire video, replacing four brittle MATLAB scripts.

## Methods & tools

Every tool below links to a project that actually used it — no skill bars.

- **Optimization** — genetic algorithms, CMA-ES, gradient/NLLS, Bayesian & GP optimization, surrogate-assisted search — see [MSO objectives](/projects/mso-objectives/)
- **Uncertainty quantification** — correlated-parameter UQ, Sobol sensitivity analysis — see [MUQ-SAC](/projects/muq-sac/)
- **Scientific ML** — physics-informed neural networks, neural ODEs — see [SciML](/projects/sciml/)
- **Simulation** — Cantera, CHEMKIN-PRO, FlameMaster, OpenFOAM — see [MOSIAC](/projects/mosiac/) and [CFDCore.jl](/projects/cfdcore/)
- **Experimental** — rig design and commissioning, gas chromatography, thermocouple instrumentation — see [gasification](/projects/gasification/)

## Publications

<a href="/publications/">Full publication list &rarr;</a>

5 refereed journal articles, 1 published conference paper, 1 manuscript under review, and 3 accepted conference abstracts (64th Symposium (Japanese) on Combustion, Fukuoka, Nov 2026).

## CV

<a href="/cv/">View the full CV &rarr;</a>
