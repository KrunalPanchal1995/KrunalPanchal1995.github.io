---
layout: page
title: MSO objective functions & multi-stage optimization
description: Multi-stage optimization and a power-mean objective for multi-dataset combustion mechanism calibration
img: assets/img/projects/mso-objectives/001_wmre_vs_powermean-800.png
importance: 2
category: [optimization, combustion]
related_publications: true
---
{% include project_gallery.liquid project="mso-objectives" %}


## Problem

Combustion mechanism calibration usually optimizes against many experimental datasets at once — different fuels, temperatures, pressures. Two problems recur: optimizing over an entire temperature range at once is expensive and can overfit to whichever regime dominates the objective; and when datasets have very different sizes or intrinsic scatter, a plain error-weighted objective lets the largest or noisiest dataset dominate the fit at the expense of the others.

## Approach

**Multi-stage optimization** splits the reaction-rate calibration into high-temperature and low-temperature chemistry (HTC/LTC) stages, optimizing each with the response-surface method best suited to it rather than fitting the whole range at once.

**A power-mean (Hölder) objective function** replaces the classical weighted-mean relative error (WMRE) to prevent any single dataset from dominating a joint, multi-fuel calibration.

## Results

*(Published results only — see [Disclosure Policy](https://github.com/KrunalPanchal1995) for why some numbers below are omitted.)*

The multi-stage strategy applied to n-heptane is published: {% cite panchal2023aspacc %}.

The power-mean objective work is accepted for presentation at the 64th Symposium (Japanese) on Combustion, Fukuoka, Nov 2026: {% cite panchal2026powermean %}. Per the accepted abstract, at an identical solver budget the power-mean objective reduces error to **roughly a quarter of what classical WMRE achieves**, across methyl butanoate and n-heptane case studies.

The underlying theoretical framework that makes this multi-stage, multi-dataset optimization computationally tractable is still in preparation; only the accepted abstract's own claims are reproduced here.

## Validation

Solver cross-checks (genetic algorithm vs. gradient-based SLSQP, and vs. classical WMRE) confirm the multi-stage decomposition converges to physically consistent parameter sets rather than an artifact of the search method.

## My contribution

Developed and led by me: the multi-stage decomposition and the power-mean objective function, under the supervision of Prof. Krithika Narayanaswamy. The shock-tube species-profile curve-capturing technique referenced alongside this work at the same symposium is separate, collaborative work led by Gautam Srikanth.

## Publications

{% cite panchal2023aspacc %}
{% cite panchal2026powermean %}
{% cite panchal2026mso_pprs %}

## What this enables

A mechanism calibrated jointly across several fuels and datasets, without any one dataset silently winning the fit — and at a fraction of the solver budget a naive full-range optimization would need.
