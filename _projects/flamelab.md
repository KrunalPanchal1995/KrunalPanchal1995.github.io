---
layout: page
title: flamelab
description: A computer-vision instrument that measures flame length, width and flicker from pool-fire video in physical units with propagated uncertainty — regime classification, cross-run ensemble statistics, and thirteen analysis methods
img: assets/img/projects/flamelab/001_ensemble-frame-matrix-800.png
importance: 7
category: [experimental]
related_publications: false
---
{% include project_gallery.liquid project="flamelab" %}

## Agenda

flamelab is a **measurement instrument**, not a video editor: it turns 4K pool-fire footage into per-frame flame geometry (length, width, tip position) **in millimetres with propagated uncertainty**, classifies the flame's dynamical regime through its Hopf-bifurcation sequence, and aggregates repeat experiments into ensemble statistics with defensible error bars. Every number carries units, uncertainty and provenance — and where the footage cannot support a trustworthy number (e.g. a frequency near the camera's Nyquist limit), the pipeline refuses and says so rather than guessing.

## Problem

Combustion dynamics are usually measured with a ruler and a stopwatch — or with diagnostics (laser sheet imaging, chemiluminescence filters, intensified cameras) that a small lab cannot run on every experiment. A consumer 4K camera is cheap, but its footage is hard to quantify honestly: veiling glare inflates the apparent flame boundary, 4:2:0 chroma subsampling and unknown ISP processing corrupt colour-based diagnostics, and the 23.976 fps frame rate aliases the flicker frequencies that matter most. flamelab is built around those exact limits: correct the glare, propagate the segmentation uncertainty, and never report an aliased frequency as if it were physical.

## Approach

- **Sub-pixel, glare-corrected contour** — veiling-glare correction followed by a multi-gate flame-component selector (brightness, area, rim-anchoring, axis overlap), anchored to the burner rim measured once per video. On the full 13,127-frame reference recording, dropout frames went from 5.1% to **0.0%**, and the detected rim agrees with an independent measurement to 0.45 px.
- **Physical quantities with uncertainty** — length, width, area, rugosity, tip angle and pinch-off events in mm (ruler-photo calibrated, honesty-flagged as not caliper-confirmed), each with systematic (segmentation) and statistical uncertainty separated.
- **Regime classification** — a hidden-Markov classifier over sliding-window spectral features labels every frame with the literature Hopf sequence: Ignition Transient → Steady Laminar → Flickering Onset → Periodic Flickering.
- **Ensemble statistics across repeat runs** — eight repeat n-heptane pool-flame recordings (the same experiment repeated), aggregated with bootstrap confidence intervals, ICC variance decomposition, ANOVA/Levene tests, GUM-combined uncertainty, and an ignition-aligned frame matrix.
- **Thirteen analysis methods wired to figures and CSV data** — continuous wavelet transform, skeleton/pinch-off precursors, phase-averaged puff-cycle reconstruction, onion-peeling Abel inversion, correlation dimension and largest Lyapunov exponent (each with an explicit reliability flag), Hilbert–Huang/EMD, TV-L1 optical flow cross-checked against kymograph convection velocity, active contours, windowed full-frame POD/DMD, growth-rate fitting at onset, change-point onset detection, and the literature-standard 50%-intermittency height.

## Implementation

Python with OpenCV, NumPy/SciPy and scikit-image; a ~300-test suite; and three reproducible drivers — one per run (`run-analysis.py`), one for the cross-run ensemble (`run-ensemble.py`), and one for the methods (`run-methods.py`). Outputs are data-first: per-frame HDF5/CSV tables, a CSV next to every figure containing the exact plotted columns, and standalone plotting scripts so any figure can be edited and re-plotted without the pipeline.

## Results

The campaign is eight repeat n-heptane pool-flame runs from one recording session. Detection is successful on **96.8–99.8%** of frames per run. The headline measurements, with their honesty caveats on record:

<!-- ENSEMBLE-NUMBERS: from analysis/ensemble/data/ensemble-summary.json, 2026-08-26 regeneration -->

- **Ensemble flame height** — **110.1 mm** (bootstrap 95% CI [75.0, 124.5] across the 8-run campaign; GUM-combined uncertainty ±12.7 mm). Restricting to the three runs with a validated burner-rim anchor gives **117.2 mm [107.9, 123.7]** — the two reference-frame definitions are kept separate on purpose.
- **Ensemble width** — **16.3 mm [14.6, 18.2]** across all runs; **13.7 mm [12.3, 14.4]** for the anchored subset (width at one burner diameter above the rim — a different physical quantity than the unanchored fallback, documented, not pooled silently).
- **Run-to-run structure** — variance decomposition: ICC 0.42 (height) / 0.52 (width) — real between-run differences exist on top of within-run flicker, and ANOVA confirms the run means differ.
- **Puffing frequency** — **0.40 Hz [0.29, 0.52]**, consistent across all runs, ~35× below the classical pool-fire correlation's ~13.9 Hz prediction. Two honest candidate explanations are on record: a genuinely different flow regime at this small scale, or aliasing of a true 10–15 Hz oscillation against the 11.99 Hz Nyquist limit. Resolving this needs higher-frame-rate re-acquisition — flagged, not spun.
- **Regime sequence** — every run follows the same Ignition → Steady → Flickering Onset → Periodic sequence, with the onset time located to a bootstrap confidence interval per run, and positive oscillation growth rates (0.004–0.047 s⁻¹) across all runs at onset — the supercritical-Hopf signature.

The gallery above shows the ignition-aligned frame matrix (same physical field of view in every cell), the seismograph-style tip and width fluctuation charts, the ensemble traces with uncertainty bands, kymographs, POD/DMD modes, and the per-regime overlay videos with the detected contour burned onto the real footage. A sample of the live measurement:

<figure class="loop-media">
  <img src="/assets/img/projects/flamelab/015_onset_tracking.gif" alt="The measured contour, centerline and tip tracking the flame through the flickering-onset transition" loading="lazy" />
  <figcaption>The flickering-onset transition with the measurement burned onto the real frames — green: measured boundary, cyan: centerline, red cross: tip, blue: burner axis (full-resolution overlay videos are in the gallery).</figcaption>
</figure>

## Validation

Every method is validated against synthetic truth before touching real footage: the forward-model oracle (rolling shutter, exposure, noise, H.264 round-trip), known-answer nonlinear diagnostics (Lyapunov on the logistic map, Abel round-trip on Gaussian profiles, aliasing fold-back algebra), and real-data cross-checks that don't share an assumption (50%-intermittency height vs. time-averaged length; TV-L1 flow vs. kymograph convection velocity; rim anchor vs. modal observed base). The full suite passes — currently **299 tests** (plus the newer regression tests, run for this page, not quoted from memory).

## My contribution

The instrument is mine: the measurement pipeline, the uncertainty and refusal policy, the regime classifier, the ensemble statistics and every figure in the gallery. The experimental rig (tube burner, pool-fire configuration) was designed and commissioned jointly with Gagan Verma.

## Where this is going

- **High-frame-rate re-acquisition (≥240 fps)** — the single highest-value next step: it removes the Nyquist ambiguity outright, and the pipeline accepts it unchanged.
- **Multi-fuel campaign** — the same instrument applied to Methanol-to-Gasoline (MtG) surrogate and ethanol blends, where the fuel-dependent sooting behaviour is itself a measurable.
- **Bifurcation analysis** — the growth-rate fit at onset is the seed of a supercritical/subcritical Hopf classification, the strongest publishable claim this footage can support.
- **Physics-informed boundary dynamics** — a PINN-consistent surrogate for the boundary dynamics, once the calibrated multi-fuel dataset exists.
