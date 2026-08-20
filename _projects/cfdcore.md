---
layout: page
title: CFDCore.jl — In-House CFD & Multiphysics Solver
description: A from-scratch Julia CFD/multiphysics library, with a Python frontend and cross-engine geometry kernel
img: assets/img/projects/cfdcore/001_04_mms_convergence-800.png
importance: 5
category: [cfd]
related_publications: false
---
{% include project_gallery.liquid project="cfdcore" %}


## Problem

Some physics problems — a COMSOL-based inertial-microfluidics particle-separation workflow, in the case that motivated this project — hit a wall where the commercial tool's own advertised feature (particle-tracing lift force) simply never registered with the solver, across six production channel geometries, with no path to look inside and fix it.

## Approach

CFDCore.jl is a from-scratch CFD/multiphysics library in Julia (~40,000 lines), aimed at matching or exceeding specific capabilities of Ansys/OpenFOAM/COMSOL where those tools fall short — built with a Python frontend, two GUIs (a Qt desktop app and a Dash web app), and a cross-engine geometry kernel (Gmsh, a signed-distance-field kernel, and a PicoGK-compatible interface) so the same shape can be verified against three independent meshers.

## Implementation

- **Core:** Julia (Gridap for FEM assembly, Krylov/AlgebraicMultigrid for linear solves, Lux/Zygote for the SciML source-term module) — 191 source files.
- **Frontend:** Python (PyQt5, Dash), bridged to Julia via `juliacall`.
- **Geometry service:** a C#/.NET managed signed-distance-field REST service, mimicking the PicoGK API shape.
- OpenFOAM is used only as a **secondary** case-writing backend for one tutorial-derived reacting-jet case — the solver itself is original.

## What's new vs. what's borrowed

**Original:** the full finite-volume numerical stack (schemes, TVD limiters, nine time integrators), the reacting-flow arc (low-Mach compressible reacting Navier–Stokes with heat-release dilatation), the microfluidics solver and Maxey–Riley particle tracer, rocket/propulsion sizing modules, and all three GUIs.
**Borrowed:** Gmsh for meshing, Gridap for FEM assembly machinery, Krylov/AlgebraicMultigrid for linear algebra — the physics interfaces and coupling terms built on top of them are original.

## Validation

97 Julia test files, 2,794 passing tests at last full run, against named literature benchmarks: Ghia (1982, lid-driven cavity), Armaly (1983, backward-facing step), De Vahl Davis (1983, natural convection — measured Nu≈2.20–2.22 at Ra=10<sup>4</sup> vs. a reference 2.24), Incropera, and Cho & Kensey. A regenerative-cooling channel validation reaches 1.9% error against SSME-class literature hot-wall temperature. The documentation deliberately marks known gaps (no compressible density-based solver, no AMR, no radiation) rather than overstating maturity — that candor is itself part of the engineering discipline here.

## My contribution

Developed by me from scratch, including the reacting-flow arc, the microfluidics solver, the geometry kernel integration, and all three GUIs, on top of the open-source libraries listed above.

## What this enables

A physics solver where every constraint that mattered for the motivating problem is implemented and testable in-house — not a black box whose failure mode has no path to a fix.
