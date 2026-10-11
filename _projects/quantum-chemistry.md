---
layout: project
title: Quantum chemistry
description: A differentiable electronic-structure engine in early development, and a self-study course in quantum chemistry
img: assets/img/projects/quantum-chemistry/02_h3_surface-800.png
importance: 13
category:
- quantum-chemistry
source: intake
icon: assets/img/projects/quantum-chemistry/icon.webp
icon_video: assets/img/projects/quantum-chemistry/icon.webm
icon_video_mp4: assets/img/projects/quantum-chemistry/icon.mp4
recreate:
  video: assets/img/projects/quantum-chemistry/recreate.webm
  poster: assets/img/projects/quantum-chemistry/recreate.webp
  steps:
  - Open the controls panel
  - 'Choose the example: H + H2 on a potential-energy surface'
  - Press Play
  - Raise the LEPS Sato parameter to 0.3
  - Press Re-run
  explainer: figure.quantum-chemistry.potential-energy-surface-barrier-and-rate
  route: molecules?preset=13
---

## Where it stands

Early stage. The engine, `qchem` 0.0.1, is aimed at a JAX-native, GPU-resident, end-to-end differentiable electronic-structure code. Status from the project notes of 2026-09-07:

- **Built:** numeric foundation (precision, device handling, linear algebra, fixed-point solvers), core (molecule, basis, units), and one- and two-electron integrals through a vendored libcint 6.1.3 exposed as a differentiable JAX primitive.
- **Kinetics layer:** an engine interface with an analytic Müller-Brown surrogate engine and a GFN2-xTB engine that calls the external xtb program (geometry optimisation through geomeTRIC). The native engine is a stub.
- **Gates passed:** Gate 0 (numeric foundation) and Gate 1A (integrals, checked against PySCF as an oracle in the tests; 115 tests in that gate).
- **Tests:** full suite 177 passed, 5 skipped.
- **Empty placeholder modules:** scf, dft, mp, cc, mcscf, response, derivatives, hess, properties, dispersion, solvation, io.

**Not built yet:** SCF, DFT, MP, CC and a native geometry optimizer. Nothing on this page is a result of the engine; the figures are from a 14-session self-study course in quantum chemistry.
