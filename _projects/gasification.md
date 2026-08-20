---
layout: page
title: Steam-Catalytic Downdraft Gasification
description: M.Tech thesis — steam and catalyst effects on lignite gasification in a pilot-scale downdraft gasifier
img: assets/img/projects/gasification/001_02_h2_vs_sbr-800.png
importance: 6
category: [experimental, combustion]
related_publications: true
---
{% include project_gallery.liquid project="gasification" %}


## Problem

Steam gasification of low-rank lignite coal, with and without a catalyst, was studied to understand how steam-to-biomass ratio (SBR) and a magnesium-carbonate catalyst affect syngas quality — but the resulting hydrogen yield behaved in a way no simple model predicted.

## Approach

A pilot-scale downdraft fixed-bed gasifier (525 mm ID, 2.165 m tall, mild steel) was instrumented with four K-type thermocouples across the drying/pyrolysis/combustion/reduction zones and a gas chromatograph for H<sub>2</sub>, CO, CO<sub>2</sub>, CH<sub>4</sub>, N<sub>2</sub>. Fourteen runs spanned seven steam-to-biomass ratios (0–0.47 kg/kg) with and without a 7 wt% MgCO<sub>3</sub> catalyst.

## Results

Published, {% cite upadhyay2020airsteam %}, {% cite upadhyay2019equivalence %}, {% cite sakhiya2019elemental %}, {% cite upadhyay2018thermodynamic %}.

The catalyst raised hydrogen yield from 24.1–32.6% to 23.2–34.7%, cold-gas efficiency from 62.2–75.2% to 68.1–86.9%, and lower heating value from 4.48–5.19 to 4.67–6.65 MJ/Nm<sup>3</sup>. The headline finding was a **non-monotonic hydrogen response**: with the catalyst, H<sub>2</sub> climbed to a 34.7% peak around SBR ≈ 0.26 and then *collapsed* to 23.2% by SBR ≈ 0.47 — falling below the no-catalyst case — moving in lockstep with cold-gas efficiency and heating value.

A later re-analysis (2026) found the mechanism: combustion-zone temperature is itself non-monotonic across the same SBR sweep, and hydrogen yield tracks that temperature (Pearson r = 0.80 pooled, r = 0.96 in the catalytic case) far more closely than it tracks SBR directly (r = 0.10). This re-analysis is ongoing exploratory work, reported here qualitatively; the original 2018 experimental results and their equilibrium-model comparison are the validated, published record.

## Validation

Mass-balance closure between 0.920 and 0.995 across all fourteen runs.

## My contribution

Experimental design, rig operation, and primary analysis, under the supervision of Prof. D. S. Upadhyay and Prof. R. N. Patel at Nirma University. Awarded the ISTE National Award for Best M.Tech Thesis 2018 (First Prize).

## Publications

{% cite upadhyay2020airsteam %}
{% cite upadhyay2019equivalence %}
{% cite sakhiya2019elemental %}
{% cite upadhyay2018thermodynamic %}

## Where this is going

A rare downdraft-gasification dataset where the "obvious" steam-ratio-controls-hydrogen story turns out to be incomplete — and a reminder that a null or reversing trend is often more informative than a monotonic one.
