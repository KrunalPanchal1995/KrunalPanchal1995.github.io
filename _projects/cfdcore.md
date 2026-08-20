---
layout: page
title: CFDCore.jl — In-House CFD & Multiphysics Solver
description: A from-scratch Julia CFD/multiphysics library, with a Python frontend and a cross-engine geometry kernel, aimed at closing the gap between commercial CFD and machine learning
img: assets/img/projects/cfdcore/001_04_mms_convergence-800.png
importance: 5
category: [cfd]
related_publications: false
---
{% include project_gallery.liquid project="cfdcore" %}


## Problem

Most CFD codes in wide use today — commercial and open-source alike — carry architecture decisions from the 1980s and 2000s: a monolithic solver core that treats a machine-learning surrogate as, at best, an external post-processing step bolted on afterward, never as a first-class term inside the equations being solved. At the same time, commercial licences (Ansys, STAR-CCM+, COMSOL, CONVERGE) are an increasingly hard cost to justify for an individual researcher or a small group, which pushes real capability out of reach for exactly the people who'd benefit most from being able to look inside the solver and fix what's broken. That second problem is not hypothetical: the project's proximate trigger was a COMSOL-based inertial-microfluidics particle-separation workflow where the tool's own advertised feature (particle-tracing lift force) simply never registered with the solver, across six production channel geometries, with no way to look inside and repair it.

## Approach

CFDCore.jl is an attempt to draw the strongest available open-source components — meshing, linear algebra, automatic differentiation, SciML — together behind one coherent interface, rather than accepting either a commercial black box or a pile of disconnected open-source tools that don't talk to each other. The aim, stated plainly: match what COMSOL, STAR-CCM+, Ansys and CONVERGE can do, and go further where their architecture is the limiting factor — specifically, on native integration of neural/ML models as terms inside the governing equations, not as an afterthought. This is a long-term, actively developing effort, not a finished product, and it's described here in that spirit.

Concretely, it's a from-scratch CFD/multiphysics library in Julia (~40,000 lines across 290 source files, spanning finite-volume numerics, chemistry, combustion, multiphysics coupling, structural mechanics, stochastic/UQ methods and a SciML module), built with a Python frontend, two GUIs (a Qt desktop app and a Dash web app), and a cross-engine geometry kernel — Gmsh, a signed-distance-field kernel, and a PicoGK-compatible interface — so the same shape can be verified against three independent meshers rather than trusted on the word of one.

## Geometry kernel

A CFD solver is only as trustworthy as the geometry it meshes, and commercial CAD kernels are themselves black boxes. Alongside using Gmsh where it's the right tool, the project is building geometry-kernel capability from scratch: a signed-distance-field (SDF) representation and a PicoGK-compatible interface, developed specifically so every test shape can be cross-checked against an independent engine rather than trusted on a single implementation. The `geometry_test` suite below is the evidence for that: 15 shapes (box, cylinder, tube, torus, cone, wedge, pyramid, L-channel, boolean box-minus-cylinder, revolved nozzle, extruded L-profile, translated/rotated assembly, vessel-tube FSI geometry, and STL/STEP re-import round-trips) run through all three engines, with validity, watertightness and enclosed volume checked automatically.

## Implementation

- **Core:** Julia (Gridap for FEM assembly, Krylov/AlgebraicMultigrid for linear solves, Lux/Zygote for the SciML source-term module) — 191 source files.
- **Frontend:** Python (PyQt5, Dash), bridged to Julia via `juliacall`.
- **Geometry service:** a C#/.NET managed signed-distance-field REST service, mimicking the PicoGK API shape.
- OpenFOAM is used only as a **secondary** case-writing backend for one tutorial-derived reacting-jet case — the solver itself is original.

## Original contributions

The full finite-volume numerical stack (schemes, TVD limiters, nine time integrators); the reacting-flow arc (low-Mach compressible reacting Navier–Stokes with heat-release dilatation); the microfluidics solver and Maxey–Riley particle tracer; rocket/propulsion sizing modules; the stochastic/SDE turbulence-closure module; the from-scratch signed-distance-field and PicoGK-compatible geometry engines; and all three GUIs.

## Adopted packages

Built on, not reinvented: **Gmsh** and **Gridap**/**GridapGmsh** for meshing and FEM assembly machinery; **Krylov**, **LinearSolve** and **AlgebraicMultigrid** for linear algebra; **Lux**, **Zygote**, **Optimisers** and **ForwardDiff** for the differentiable/SciML source-term module; **KernelAbstractions** for GPU portability; **WriteVTK** for ParaView-compatible output; **FFTW** for spectral analysis. **OpenFOAM** is adopted only as a secondary case-writing backend, not as the solver. The physics interfaces, coupling terms and everything listed under Original contributions above are built on top of these libraries, not inside them.

Areas still forming, marked here rather than overstated: the ML-as-first-class-term integration that motivates the whole project is early-stage, as is the fully from-scratch geometry kernel (currently cross-checked against, not yet a full replacement for, Gmsh) — both **coming soon**, not yet delivered capability. Development has used Claude.ai as a coding aid throughout; final design and validation decisions are Krunal's.

## Validation

97 Julia test files, 2,794 passing tests at last full run, against named literature benchmarks: Ghia (1982, lid-driven cavity), Armaly (1983, backward-facing step), De Vahl Davis (1983, natural convection — measured Nu≈2.20–2.22 at Ra=10<sup>4</sup> vs. a reference 2.24), Incropera, and Cho & Kensey. A regenerative-cooling channel validation reaches 1.9% error against SSME-class literature hot-wall temperature.

Numerics are checked independently of any specific physics case: a method-of-manufactured-solutions study confirms discretization error shrinks at the theoretically predicted rate under mesh refinement (not just "looks right" on one grid); a von Neumann stability analysis gives the analytical amplification factor for each scheme/time-integrator pairing, cross-checked against the empirically measured stability regions and a CFL-number sweep.

The geometry kernel's own validation is cross-engine agreement, not just "did it run": all three independent geometry backends (Gmsh, SDF, PicoGK-compatible) report identical enclosed volume, validity and watertightness for the same test shapes — for example, the revolved-nozzle case, all three engines compute 5.4633×10<sup>-5</sup> m³, valid and watertight.

Two smaller physics studies from the pre-release planning archive round out the picture: a spherical-droplet extinction sweep reproduces the classic U-shaped extinction curve — kinetic extinction at small droplet diameter, radiative extinction at large diameter, with a stable burning window in between (d₀ ∈ [0.20, 3.0] mm in this sweep) — confirming both extinction branches are physically present, not just one. A 2D volume-of-fluid tank-slosh case measures the free-oscillation natural frequency at 5.3235 rad/s against an analytic 5.3156 rad/s (0.15% error), and confirms resonant forcing produces a larger steady-state amplitude than off-resonant forcing, as it must.

The documentation deliberately marks known gaps (no compressible density-based solver, no AMR, no radiation) rather than overstating maturity — that candor is itself part of the engineering discipline here.

## My contribution

Developed by me from scratch, including the reacting-flow arc, the microfluidics solver, the geometry kernel work, the stochastic/UQ module, and all three GUIs, on top of the open-source libraries listed above.

## Where this is going

A physics solver where every constraint that mattered for the motivating problem is implemented and testable in-house — not a black box whose failure mode has no path to a fix — moving toward native integration of machine-learning terms inside the governing equations, and a fully independent geometry kernel, as the two areas under active development.
