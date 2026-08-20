---
layout: page
title: Vaporizer & Combustion Rig Design
description: Fabrication-grade design of a fuel vaporizer and five combustion experiment rigs
img: assets/img/projects/vaporizer-rigs/001_rig01_001_general_arrangement-1-800.png
importance: 8
category: [experimental, cfd]
related_publications: false
---
{% include project_gallery.liquid project="vaporizer-rigs" %}


## Problem

Feeding a liquid surrogate fuel (a methanol-to-gasoline blend, with 0–50% ethanol) into an atmospheric non-premixed counterflow burner requires a vaporizer sized correctly for boiling glide, critical heat flux, and flow instability — get any of those wrong and the rig either doesn't vaporize cleanly or destabilizes under its own boiling dynamics.

## Approach

Two vaporizer design generations and a fabrication-grade drawing package for five combustion rigs (counterflow burner, soot/pool/Bunsen burners, a spray atomizer and fuel vaporizer, an IC-engine injector rig, and a water-mist suppression rig):

- **v6** — a straight-tube atmospheric vaporizer with temperature-dependent real-gas fuel properties (PCHIP-interpolated, Peng–Robinson), full boiling-glide modeling (Liu–Winterton, Schlünder degradation, Katto–Ohno critical heat flux, drift-flux void fraction), and Ledinegg flow-instability checking.
- **v7** — a pumpless, nitrogen-induction vaporizer design (40% fuel vapor / 60% N<sub>2</sub>, 180°C bulk limit), where the carrier gas itself does the pressure work.

Every rig dimension in the fabrication package is provenance-tagged — literature-derived, standard, or engineering-judgment-based — and DXF fabrication drawings are generated directly from the same parametric source.

## Validation

Twelve automated safety and sanity checks (`v7/tests/test_v7_sanity.py`) plus centralized constraint aggregation across every subsystem before a design is released for fabrication.

## My contribution

Designed by me: the thermal-hydraulic sizing, the boiling-instability analysis, and the DXF-generating parametric fabrication package. Physical fabrication of the rigs is outsourced; my role is design, specification, and commissioning oversight, not manual fabrication.

## What this enables

A vaporizer and burner rig set that goes from a parametric design study straight to a vendor-ready fabrication drawing, with every safety margin checked before a single part is cut.
