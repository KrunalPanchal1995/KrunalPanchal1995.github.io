---
layout: page
title: Neural ODEs and Transformations — A Self-Built Course
description: A multi-month, derivation-first course on Neural ODEs, coordinate transformations and stiff chemical kinetics, with a verified animation for every session
img: assets/img/projects/neural-ode-course/s022_anim_rober_simplex-800.png
importance: 4
category: [sciml]
related_publications: false
---

## What this is

A personal, multi-month course I am building in the open to understand Neural ODEs properly: what a coordinate transformation does to a vector field, why stiff chemical kinetics breaks naive training, and how operator-theoretic ideas (Carleman, Koopman) and hard constraints fit on top. Every session is a full derivation (no skipped algebra), runnable Python, matplotlib figures, and a written document, and each one is organised by Bloom's revised taxonomy from remembering up to creating.

Everything below is teaching material built on standard results. Each animation carries a numeric check that was actually run against it, listed in its caption.

## Plan

Roughly 61 sessions from October 2026 to April 2027, foundations first.

| Month | Focus |
| --- | --- |
| Oct 2026 | ODE theory, linearization, stiffness, first integrators |
| Nov | Adaptive steps, change of variables, objective audit |
| Dec | Neural-network recap, Neural ODEs, adjoint, regularization |
| Jan 2027 | Stiff Neural ODEs, ChemNODE, objectives and power means |
| Feb | Flows, slow manifolds, H<sub>2</sub>/air capstones, hard constraints, CRNN, reaction graphs, GNN+NODE |
| Mar | Carleman, Koopman/DMD, PINNs, DeepONet, ACA, KAN, topology |
| Apr | PyTorch, ONNX, quantization, synthesis |

## How the topics connect

- **Spine:** ODE theory → integrators → change of variables → Neural ODEs → objectives → H<sub>2</sub>/air capstones.
- **Operator branch:** the Jacobian from ODE theory leads to Carleman linearization, then Koopman, DMD and EDMD.
- **Constraint branch:** stiffness leads to hard constraints and the stoichiometric matrix, then CRNN and SPIN-ODE, and separately reaction graphs and GNN+NODE.
- **Systems and operators:** Neural ODEs also lead to PINNs, DeepONet, ACA, KAN and topology, and to PyTorch, ONNX and quantization.

## Animations and figures

Grouped by phase: maps (P0), transformations (P1), ODE theory (P2) and numerical integrators (P3), sessions S001 to S027. The videos loop silently; click a still figure for full size.

{% include project_gallery.liquid project="neural-ode-course" %}

## Method

- **Derive first.** Each result is built from first principles before any code runs.
- **Verify every figure.** Animations are produced by scripts that also write a `verification.json` of numeric checks, such as a measured convergence order against the theoretical one, or a conservation drift at machine precision.
- **Test the code.** The course code base has an automated test suite that has to pass before a session counts as done.
- **State limits.** Each session records claims written from memory that still need a source check.

## Related

The experimental setting behind the course, a stiff H<sub>2</sub>/O<sub>2</sub> autoignition Neural ODE, is described in the [Neural ODE playground]({{ site.baseurl }}/projects/neural-ode-playground/) project.
