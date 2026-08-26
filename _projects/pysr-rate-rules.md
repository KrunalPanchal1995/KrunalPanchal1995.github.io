---
layout: page
title: Symbolic Regression for Universal Rate Rules
description: Using symbolic regression to discover interpretable rate rules for unimolecular decomposition reactions
img: assets/img/projects/pysr-rate-rules/004_01_collinearity-800.png
importance: 9
category: [sciml, combustion]
related_publications: false
---

{% include project_gallery.liquid project="pysr-rate-rules" %}

## Problem

Unimolecular decomposition rate constants for NH<sub>3</sub>–hydrocarbon fuel chemistry are scattered across decades of literature, each measured under different conditions and with different uncertainty. Can a compact, interpretable formula — rather than a lookup table — predict a reaction's rate parameters from physically meaningful features?

## Approach

A curated, provenance-tracked database of 325 high-pressure-limit unimolecular reactions (23 nitrogen-containing), each carrying its literature source, DOI, and an uncertainty factor. Symbolic regression (PySR) is run against physics-informed, low-collinearity feature sets: Evans–Polanyi-motivated features (bond-dissociation energy, reaction enthalpy, a Marcus quadratic term) for the activation energy, and reaction-path degeneracy/symmetry features for the pre-exponential factor — comparing a plain-MSE model against one weighted by each reaction's literature uncertainty.

## Validation

Two checks beyond a standard train/test split: does the discovered formula **rediscover the known Evans–Polanyi linear free-energy relation** from data alone, and does it **transfer across an entirely held-out reaction class** (leave-one-class-out), not just across held-out samples of classes it has already seen.

## Results

Exploratory, unpublished work. The symbolic regression front shows the expected shape — the discovered low-complexity term closely tracks the Evans–Polanyi form, and the model generalizes to the held-out class rather than only interpolating within seen chemistry — but no manuscript results are quoted here pending write-up.

## My contribution

Developed by me: the database curation and provenance pipeline, the physics-informed feature engineering, the uncertainty-weighted model formulation, and both validation protocols. PySR itself (Miles Cranmer) is the external symbolic-regression engine.

## Where this is going

A rate rule that's a formula, not a black box — one that can be checked against known physical chemistry and used with some confidence outside the exact reactions it was trained on.
