---
layout: page
title: Scientific ML for stiff kinetics
description: A documented research journey toward neural surrogates for stiff H2/O2 autoignition — including a statistical audit of my own results
img: assets/img/projects/sciml/001_fig1_noise_floor-800.png
importance: 4
category: [sciml]
related_publications: false
---
{% include project_gallery.liquid project="sciml" %}


## Problem

H<sub>2</sub>/O<sub>2</sub> autoignition is a deceptively small test case for a neural surrogate: eight species, nineteen reactions — and a stiffness ratio spanning five to eight orders of magnitude, radical species that behave as transient quasi-steady-state spikes rather than smooth trajectories, and eight decades of dynamic range across species concentrations. A "tiny" mechanism turns out to be one of the harder regimes to learn.

## Approach

This is an ongoing, unpublished research effort — two NeurIPS 2027 submissions are in preparation from it, so the specific architecture and its exact results are withheld here pending submission. What I can share is the *shape* of the investigation: a long, honestly-documented sequence of architectural generations, moving from naive direct-time neural ODEs, through reparameterized time coordinates and physics-constrained formulations, to representation-level fixes for the underlying stiffness — each generation motivated by a specific, diagnosed failure of the one before it, with negative results kept in the record rather than discarded.

## The discipline that mattered most

The most consequential step wasn't a bigger model or more training — it was **stopping to statistically audit my own results** before believing them. A controlled, multi-seed re-analysis of the full experimental campaign found that a substantial fraction of what looked like a hyperparameter-driven improvement was indistinguishable from ordinary seed-to-seed noise once measured properly, while other effects held up under scrutiny. That distinction — which apparent wins are real and which are noise — is now a standing check applied before any result from this line of work is reported as fact, here or in the eventual papers.

## Recurring lessons (method-agnostic, safe to share)

- Reparameterize the independent variable before touching the network architecture.
- Make physics constraints structural — build them into the representation — rather than penalizing their violation after the fact.
- Budget explicitly for gradient amplification when training through multi-step rollouts.
- A win on one metric does not automatically compose with a win on another; each combination has to be re-verified, not assumed.
- Statistical rigor about your own results is not optional once a claim will be published.

## Validation

Every architecture generation was checked against a Cantera ground truth across a held-out condition set, and the final statistical audit re-examined the entire multi-run campaign for seed sensitivity before any headline number was treated as trustworthy.

## My contribution

Sole researcher on this line of work; developed from scratch, including the custom transforms, physics-constraint formulations, and the statistical audit methodology itself.

## What this enables

Two forthcoming NeurIPS 2027 submissions, and — more durably — a working discipline for telling a real improvement apart from noise before publishing it.
