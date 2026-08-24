---
layout: page
title: vZero — A Neural ODE Research Playground
description: An interactive Neural ODE research environment unifying 44 hand-cloned training-script versions, with a live FastAPI+React GUI, a widened optimizer zoo, symbolic regression, PINN benchmarks, and an executed d2l-style curriculum
img: assets/img/projects/neural-ode-playground/001_optimizer_race-800.png
importance: 5
category: [sciml, optimization]
related_publications: false
---

## Problem

`sweep/`, `sweep_normalization/`, `sweep_temp/` and a handful of earlier one-off folders had, between them, 44 hand-cloned copies of essentially the same H<sub>2</sub>/O<sub>2</sub> autoignition Neural ODE training script — each one a small, undocumented fork exploring one axis (a different normalizer, a different time-rescaling, a different loss space) with no shared code and no record of which combination did what. Reproducing an old result meant re-reading a specific version's diff by hand. This project is that: one codebase, one `Config` object standing in for every version, plus a live, browser-based environment for running and comparing new ones — closer in spirit to [TensorFlow Playground](https://playground.tensorflow.org) and [ConvNetJS](https://cs.stanford.edu/people/karpathy/convnetjs/) than to a one-off research script.

## Approach

- **One `Config`, every axis.** A single frozen dataclass (`config.py`) is the entire specification surface — normalizer, loss space/kind, solver, optimizer, architecture — validated on every use so an invalid combination fails at construction time, not partway through a training run. All 44 original versions round-trip through it as presets, verified bit-identical against the real on-disk data and gradients (`tests/test_gradient_equivalence.py`, exact `np.array_equal`).
- **A live playground GUI.** FastAPI backend + React/D3 frontend: pick a preset, override any field, launch a real training run, and watch loss curves, gradient-flow, and value-flow diagrams update over a WebSocket while it trains — one OS process per run, not a thread, so a live run never blocks the server.
- **A widened optimizer and objective zoo.** From the original 3 gradient optimizers to 12 (SGD through L-BFGS), plus 7 gradient-free backends (CMA-ES, genetic algorithms, Bayesian optimization) driving the _same_ training loop with zero `torch.backward()` calls — which unblocks directly optimizing 22 re-implemented fairness/robustness objectives from the MUQ-SAC uncertainty-quantification literature that have no gradient at all.
- **Architecture as a set of composable slots, not a fixed network.** A custom decoder head, a hard mass-conservation constraint on the predicted state, and a dependency-free graph-convolution front layer built over the real reaction-coupling structure of the Cantera mechanism — every slot defaults to the original architecture exactly, verified byte-identical.
- **A peer model family that isn't a neural network at all.** [PySR](https://github.com/MilesCranmer/PySR) symbolic regression, sharing the same data/loss pipeline as the Neural ODE path, so a discovered closed-form right-hand side is directly comparable to a learned network's test loss.
- **PINN benchmarks, method-of-lines style.** A PDE (Raissi's viscous Burgers equation) semi-discretized in space becomes an ODE state that fits the existing trajectory machinery exactly, scored against a real [DeepXDE](https://github.com/lululxvi/deepxde) physics-informed-neural-network baseline on the same fine-grid reference solution.
- **An executed, not exported, curriculum.** [d2l.ai](https://d2l.ai)'s optimization and gradient-flow curriculum, run for real against this codebase's own 12-optimizer registry and gradient instrumentation rather than transcribed from the book.

## Results

The optimizer race above is one representative real result, not a curated highlight: all 12 gradient optimizers trained from scratch on the same tiny synthetic problem (a Van der Pol oscillator, this project's non-chemistry test family), same seed, same budget. Nadam reached the lowest final loss; L-BFGS, Adadelta, and plain SGD were still an order of magnitude worse after 80 epochs on this particular problem — reported as-is, including the optimizers that didn't do well here.

A gradient-free CMA-ES run, driven entirely through the black-box `Trainer` interface with zero `.backward()` calls anywhere, reduced a fairness-weighted residual objective from 108,204 to 6,410 over 612 evaluations — beating an equal-budget Adam/MSE run's own report on the same metric (7,385). On the PINN-vs-Neural-ODE comparison, at matched (session-time-bounded) training budgets, the method-of-lines Neural ODE reached a tighter L2 fit against a shared fine-grid reference than a from-scratch PINN (0.126 vs. 0.439) — neither fully converged, and that qualification is reported alongside the number rather than left out.

## The optimizer-race notebook, executed

The notebook behind the figure above, embedded in full — every cell was run for real (headlessly, via `nbclient`) against this project's own code, not hand-typed:

{::nomarkdown}{% jupyter_notebook "/assets/jupyter/vzero_optimizer_race.ipynb" %}{:/nomarkdown}

## Validation

Every refactor is checked against four bit-identity gates before being considered done: exact forward-pass equality (`rtol=0, atol=0`) and exact gradient equality (`np.array_equal`) against the real, pre-existing training data, plus a check that turning instrumentation on or off never perturbs the RNG stream or the numbers it produces. New architecture/optimizer/model-family additions default to the prior exact behavior and are checked against that default before anything new is exercised. The playground's own backend is tested against a real FastAPI `TestClient`, including full process-lifecycle tests that spawn an actual training run and follow it over a WebSocket to completion.

## My contribution

Sole author of the original 44 training-script versions this project unifies, and of the unification, GUI, and every extension described above.

## Where this is going

A held-out gap, reported rather than hidden: the fairness-objective library's outlier-robustness clamp is calibrated for chemistry-scale residuals and doesn't yet rescale correctly for the much larger residual magnitudes a PDE-based problem family produces — logged as open, not silently worked around. Next: TensorFlow-Playground-style 2D toy datasets and a live decision-surface view, and a read-only uncertainty-quantification panel over the MUQ-SAC optimization suite's own output artifacts.
