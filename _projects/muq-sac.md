---
layout: page
title: MUQ-SAC — Joint Arrhenius Uncertainty Quantification
description: A fast uncertainty-quantification methodology and sampling technique for the joint probability distribution of the Arrhenius rate expression
img: assets/img/projects/muq-sac/001_fig1_ellipsoid_containment-800.png
importance: 3
category: [uq, combustion]
related_publications: true
---
{% include project_gallery.liquid project="muq-sac" %}


## Problem

The three parameters of a modified-Arrhenius rate expression (pre-exponential factor *A*, temperature exponent *n*, activation energy *Ea*) are not independent — their uncertainties are correlated, and the physically valid region of joint (*A*, *n*, *Ea*) space is a curved, non-trivial manifold, not a box. Sampling that manifold efficiently, without either missing valid parameter combinations or wasting enormous compute exploring invalid ones, is the core difficulty.

## Approach

MUQ-SAC (*Method of Uncertainty Quantification and Sampling of Arrhenius Curves*) is a temperature-dependent, correlation-aware uncertainty quantification methodology: it characterizes the joint probability distribution of the Arrhenius parameters directly, respecting the physically valid region rather than treating each parameter's uncertainty independently.

## Results

Published in *Combustion Theory and Modelling* (2024), applied to the H<sub>2</sub>/CO kinetic mechanism: {% cite panchal2024muqsac %}.

## Validation

The sampling methodology is benchmarked across multiple curve-generation classes and inversion strategies (least-squares, matrix-based, Moore–Penrose pseudo-inverse), with sampling-validity and projection checks confirming every sampled point respects the physically valid region.

## My contribution

Developed by me as lead author, in collaboration with Vaisakh Vasudavan, Sivaram Ambikasaran, and my advisor Prof. Krithika Narayanaswamy — conceptualization, methodology, software and the primary formal analysis.

## Publications

{% cite panchal2024muqsac %}

## What this enables

Rate-constant uncertainty that is sampled and reported honestly, correlation and all — the foundation MOSIAC's optimization and forward-UQ stages build on.
