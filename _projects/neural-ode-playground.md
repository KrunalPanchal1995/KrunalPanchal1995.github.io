---
layout: page
title: vZero — A Neural ODE Research Playground
description: An interactive Neural ODE research environment unifying 44 hand-cloned training-script versions, with a live FastAPI+React GUI, a widened optimizer zoo, RL-as-a-trainer, symbolic regression, PINN benchmarks, and an executed d2l-style curriculum
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
- **An executed, not exported, curriculum.** [d2l.ai](https://d2l.ai)'s optimization and gradient-flow curriculum, run for real against this codebase's own 12-optimizer registry and gradient instrumentation, rendered directly inside the playground's own Learn view (not only exported as a download).
- **An open plugin registry, not a closed enum.** Drop a `.py` file defining a custom activation, regularizer, gradient transform, or ODE-solver time-reparameterization; it's auto-discovered at startup and shows up in the GUI's own dropdowns next to the built-ins — the same schema-derives-from-the-real-registry discipline the optimizer list already used, extended to let a user add to it without touching this codebase.
- **Reinforcement learning as a third training strategy**, alongside the gradient path and the gradient-free black-box search: a PPO policy (Stable-Baselines3) that treats the loss landscape itself as the environment and a bounded weight perturbation as the action — reachable from the same GUI form as every other training mode, not a separate tool. **Session 11**: a live RL Arena view closes the last ConvNetJS gap this project had (`rldemo.html`'s interactive agent canvas) — the real PPO agent's actual weight-space trajectory, projected onto a fixed 2D slice (Li et al. 2018's loss-landscape-visualization technique), with a trailing path and a live action arrow:

  <figure class="loop-media">
    <img src="/assets/img/projects/neural-ode-playground/003_rl_arena_screenshot-1600.png" alt="RL Arena view: the real PPO agent's weight-space trajectory, live" loading="lazy" />
    <figcaption>The RL Arena, live against a real running `trainer_kind='rl'` job — not a mockup. Purple trail: the agent's actual path through a 2D slice of weight space; orange arrow: the current step's action.</figcaption>
  </figure>

- **A five-view instrument shell**, not one long scrolling form: a working Instrument view (edit the network, watch the decision surface and flow field update live, before you even press Run), a narrated Atlas of every visualization technique, a Lab for optimizer races/hyperparameter search/config exports, the Learn curriculum, and a Data view with a real pre-processing pipeline (channel selection, rescaling, resampling, outlier clipping, live before/after) over whatever dataset is currently loaded.
- **A public build with zero server dependency.** The classification/regression toy-dataset half of the playground — datasets, feature picker, network editor, decision surface — re-runs entirely client-side: a from-scratch multi-layer perceptron (own initialization, own hand-derived backpropagation) trained with `requestAnimationFrame`, verified to clear the same accuracy bar as the real PyTorch path on the same problems, not to match it bit-for-bit. Reuses the exact same visualization components as the local app; only the training loop underneath is swapped out. Live at [/playground/]({{ site.baseurl }}/playground/).
- **A scroll-driven explainer for people who've never seen a Neural ODE.** Four live-canvas beats — a vector field, discrete layers dissolving into continuous depth, a real network training in front of you, and this project's own dynamic-range finding (below) made visible — replacing a static onboarding modal as the playground's first-visit landing page.

## Results

The optimizer race above is one representative real result, not a curated highlight: all 12 gradient optimizers trained from scratch on the same tiny synthetic problem (a Van der Pol oscillator, this project's non-chemistry test family), same seed, same budget. Nadam reached the lowest final loss; L-BFGS, Adadelta, and plain SGD were still an order of magnitude worse after 80 epochs on this particular problem — reported as-is, including the optimizers that didn't do well here.

A gradient-free CMA-ES run, driven entirely through the black-box `Trainer` interface with zero `.backward()` calls anywhere, reduced a fairness-weighted residual objective from 108,204 to 6,410 over 612 evaluations — beating an equal-budget Adam/MSE run's own report on the same metric (7,385). On the PINN-vs-Neural-ODE comparison, at matched (session-time-bounded) training budgets, the method-of-lines Neural ODE reached a tighter L2 fit against a shared fine-grid reference than a from-scratch PINN (0.126 vs. 0.439) — neither fully converged, and that qualification is reported alongside the number rather than left out.

<figure class="loop-media">
  <img src="/assets/img/projects/neural-ode-playground/002_ablation_comparison-1600.png" alt="Normalization ablation study: test loss for the raw baseline vs. 9 normalized arms, matched-seed paired comparison" loading="lazy" />
  <figcaption>The project's own headline finding, published here for the first time (session 11): a real 50-run, 5-seed factorial ablation (matched-seed paired t-test) shows normalizing temperature cuts test loss by roughly an order of magnitude (2.314×10<sup>5</sup> &rarr; 2.662×10<sup>4</sup>, p&nbsp;=&nbsp;3×10<sup>-15</sup>) — normalizing species alone, with temperature left raw, changes <em>nothing</em>, bit-for-bit, because temperature's gradient already owns effectively 100% of an equal-weight loss.</figcaption>
</figure>

The flow-field view above (the demo embedded on the home page) is the newest of these: a Neural ODE's learned right-hand side dy/dt = f(y) genuinely _is_ a vector field, so the playground animates it directly — particles advecting through the model's own learned dynamics, with the known true right-hand side overlaid whenever one exists (the Van der Pol system, μ=1). On a short, bounded training run, the learned-vs-true RMS error over that field measurably shrinks with training, checked directly rather than assumed — the concrete claim the feature makes, not just "the picture looks reasonable."

## The optimizer-race notebook, executed

The notebook behind the figure above, embedded in full — every cell was run for real (headlessly, via `nbclient`) against this project's own code, not hand-typed:

{::nomarkdown}{% jupyter_notebook "/assets/jupyter/vzero_optimizer_race.ipynb" %}{:/nomarkdown}

## Validation

Every refactor is checked against four bit-identity gates before being considered done: exact forward-pass equality (`rtol=0, atol=0`) and exact gradient equality (`np.array_equal`) against the real, pre-existing training data, plus a check that turning instrumentation on or off never perturbs the RNG stream or the numbers it produces. New architecture/optimizer/model-family additions default to the prior exact behavior and are checked against that default before anything new is exercised. The playground's own backend is tested against a real FastAPI `TestClient`, including full process-lifecycle tests that spawn an actual training run and follow it over a WebSocket to completion.

## My contribution

Sole author of the original 44 training-script versions this project unifies, and of the unification, GUI, and every extension described above.

## Where this is going

Held-out gaps, reported rather than hidden: the fairness-objective library's outlier-robustness clamp is calibrated for chemistry-scale residuals and doesn't yet rescale correctly for the much larger residual magnitudes a PDE-based problem family produces; the reinforcement-learning trainer ships as a real, tested capability but without ConvNetJS's own `rldemo.html`-style live interactive canvas view of an agent stepping; and the pre-processing panel is an exploration tool over an already-generated dataset, not yet a way to commit a chosen pipeline back into a real training run. None of these are silently worked around — each is a stated, scoped-out follow-up.
