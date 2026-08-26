---
layout: page
title: Playground
permalink: /playground/
description: A public, server-free Neural ODE playground -- pick a dataset, edit the network, and watch a real model train live in your browser.
nav: true
nav_order: 2
---

This is a trimmed, public build of **vZero**, a TensorFlow-Playground-class research environment for
Neural ODEs built around a chemical-kinetics problem (H2/O2 combustion). Everything below runs
**entirely in your browser** -- no server, no data leaves this tab, and it works even if you're
offline. Pick a dataset, edit the network's width and depth, choose an activation, and watch a real
gradient-descent loop train live.

> This is intentionally a SMALL slice of the full project: the classification/regression toy-dataset
> playground only, with a from-scratch multi-layer perceptron (own weight init, own hand-derived
> backprop -- see the project write-up for what that means and why). The full local research
> environment adds Cantera chemical-kinetics trajectories, a continuous-depth Neural-ODE classifier
> peer, hyperparameter search, reinforcement learning, exportable notebooks, and multi-language code
> export (Python/JAX/Julia) -- none of which can run without a real backend, so none of it is here.
> Read the full story on the [project page](/projects/neural-ode-playground/) or browse the
> [source](https://github.com/KrunalPanchal1995) for the complete environment.
> {: .block-tip }

<div class="playground-embed" style="margin: 1.5rem 0;">
  <iframe
    src="{{ '/assets/playground/index.html' | relative_url }}"
    title="vZero Playground -- full public demo"
    width="100%"
    height="1400"
    style="border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; display: block;"
    loading="lazy"
  >
  </iframe>
</div>

## What you're actually looking at

- **The 6 datasets** (circle, XOR, two-Gaussian, spiral, plane regression, Gaussian-mixture
  regression) are a faithful re-implementation of the exact formulas TensorFlow Playground's own
  `dataset.ts` uses (Apache-2.0 licensed; re-derived a second time in this browser build from the
  main project's own Python port, not copied from the JS original -- see the project's
  `ACKNOWLEDGEMENTS.md`/`CITATIONS.bib`).
- **The network** is a real multi-layer perceptron -- Linear-then-activation, repeated per hidden
  layer, trained with Adam, mini-batches, and (optionally) L1/L2 regularization -- with its own
  independent weight initialization and hand-derived backpropagation. It is verified to reach
  comparable accuracy to the main project's PyTorch implementation on the same datasets (roughly
  75%+ test accuracy within 200 epochs on circle/gauss/xor), not to reproduce it bit-for-bit --
  different languages, different random-number streams, same architecture and same problem.
- **The decision surface, loss chart, and network diagram** are the exact same visualization
  components the full local playground uses -- this build only swaps out where the training data
  comes from (a live WebSocket from a real server, vs. a training loop running on your own CPU right
  now), not what renders it.

Built with Claude Code across an 11-session multi-week collaboration. Full continuity log, design
decisions, and the complete (non-public) research environment live in the project's own repository.
