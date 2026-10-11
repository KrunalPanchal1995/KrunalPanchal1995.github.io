---
layout: project
title: PANSOPHIA microfluidics solver
description: In-house 2D/3D finite-element flow solver and Maxey-Riley particle tracer for inertial-microfluidics separation studies, with a validation dossier
img: assets/img/projects/microfluidics/04_mfv_a6_segre_silberberg-800.png
importance: 22
category:
- microfluidics
- cfd
source: intake
studio: atlas?ch=S61&ex=0
subjects:
- microfluidics
tier: open-source
icon: assets/img/projects/microfluidics/icon.webp
icon_video: assets/img/projects/microfluidics/icon.webm
icon_video_mp4: assets/img/projects/microfluidics/icon.mp4
recreate:
  video: assets/img/projects/microfluidics/recreate.webm
  poster: assets/img/projects/microfluidics/recreate.webp
  steps:
  - Open the controls panel
  - 'Pick example 1: Laminar flow, a parabola'
  - Type the mean velocity V = 0.2 m/s
  - Type the diameter D = 0.004 m
  - Type the viscosity nu = 0.00001
  explainer: figure.microfluidics.exact-solution-and-brinkman-checks
  route: atlas?ch=S61&ex=0
---

## Datasheet

- Code: `CFDCore.jl/src/microfluidics` (26 Julia files, e.g. FlowSolver2D, StokesFlow, ParticleForces, ParticleTracer, InertialFocusing, FieldSampler, TopologyOpt, SlipFlow, TaylorDispersion, Electrokinetics, ElectroThermal).
- `paper/mf_solver.pdf` (12 pages): Taylor-Hood P2/P1 Navier-Stokes solver on Gridap.jl, Maxey-Riley force model, validation against closed-form solutions, the Schaefer-Turek DFG 2D-1 benchmark, the Gartling backward-facing step and the Ghia lid-driven cavity; two unresolved discrepancies are reported in its abstract.
- `paper/mf_validation_dossier.pdf`: 80 pages.
- mfV figures: pipe flow vs Hagen-Poiseuille, Segre-Silberberg migration, Dean intensity, four-vortex miss, Brinkman exact profiles, Brinkman vs body-fitted, dissipated-power identity, gradient vs finite differences.
