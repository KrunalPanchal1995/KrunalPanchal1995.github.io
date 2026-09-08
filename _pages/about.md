---
layout: about
title: Home
permalink: /
subtitle: Computational methods for complex physical systems — combustion kinetics, optimization &amp; uncertainty quantification, reduced-order &amp; scientific ML.

selected_papers: true # includes a list of papers marked as "selected={true}"

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false # re-enable once real posts exist in _posts/ -- see /writing/
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I build computational methods that connect detailed chemical models with practical combustion applications — kinetics, mechanism reduction, fair multi-objective optimization, uncertainty quantification, and scientific ML, treated as one connected problem rather than separate tools. Every figure on this site is backed by real runs — pool-flame experiments measured with instruments I built, stiff autoignition chemistry validated against 426 experimental targets, an open-source optimization workbench, and a live Neural ODE research playground — with the honest failures on record next to the results. [The full story &rarr;](/about/)

<div class="cta-row">
  <a class="btn-cta btn-cta-primary" href="/research/">Explore Research &rarr;</a>
  <a class="btn-cta btn-cta-secondary" href="/projects/">Browse Projects &rarr;</a>
  <a class="btn-cta btn-cta-secondary" href="/playground/">Try the Playground &rarr;</a>
  <a class="btn-cta btn-cta-secondary" href="/cv/">CV</a>
</div>

### Selected work

{% include showcase_slideshow.liquid %}

A rotating sample of the best results across every research area — each slide links to its full project page. [Browse all projects &rarr;](/projects/)

### Research at a glance

- **Combustion Kinetics & Mechanism Reduction** — mechanism development, validation, and reduction of detailed kinetic models to tractable, simulation-ready form
- **Experimental & Numerical Combustion** — [pool-flame characterization](/projects/flamelab/) and downdraft gasification alongside CFD and chemical-kinetics simulation of the same systems
- **Fair Multi-Objective Optimization & Uncertainty Quantification** — multi-stage, multi-dataset calibration of Arrhenius parameters with correlated-parameter Bayesian UQ, built around [MOSIAC](/projects/mosiac/), my open-source optimization framework
- **Reduced-Order Modelling & Scientific ML** — neural and response-surface surrogates that stand in for expensive stiff simulations
- **[Gasification](/projects/gasification/)** — steam/catalyst-assisted downdraft fixed-bed gasification, from rig commissioning to syngas analysis
- **CFD** — [PANSOPHIA](/projects/cfdcore/), an in-house CFD/multiphysics solver, and reacting-flow and rig-design studies built on top of it
- **Optimization & Reinforcement Learning** — [dokimazo](/projects/dokimazo/), an open-source, dependency-light optimization/RL workbench with a plug-and-play graph IR — closed with an RL agent that tunes a real molecule's rotatable bonds to find its lowest-energy 3D shape

The full research overview — themes, methods, experiments, and publications — is on the [Research page](/research/).

### Try the research live

Three live slices of the Neural ODE research playground, running entirely in your browser — real dynamics and a real training loop, not recordings.

{% include hero-value-flow.liquid %}
{% include hero-flow-field.liquid %}
{% include hero-playground.liquid %}

### Selected results

<figure class="loop-media">
  <a href="/projects/flamelab/">
    <img src="/assets/img/projects/flamelab/001_ensemble-frame-matrix-800.png" alt="Ignition-aligned flame development across eight repeat pool-flame runs, every cell the same physical field of view" loading="lazy" />
  </a>
  <figcaption>Flame development across eight repeat n-heptane pool-flame runs, ignition-aligned and shown at a common physical scale — measured with <a href="/projects/flamelab/">flamelab</a>, the computer-vision instrument behind it (animated overlay videos on the project page).</figcaption>
</figure>

<figure class="loop-media">
  <video src="/assets/img/projects/muq-sac/011_four_classes_live.mp4" poster="/assets/img/projects/muq-sac/011_four_classes_live_poster-800.png" autoplay loop muted playsinline aria-label="All four MUQ-SAC sampling-method classes building their uncertainty bands live, one frame" style="width: 100%; border-radius: 6px;"></video>
  <figcaption>All four MUQ-SAC sampling-method classes (A, B, C, D) building their joint-uncertainty bands at once, each panel's own real measured compute time ticking at its true rate — one crawls, three finish almost instantly — see <a href="/projects/muq-sac/">MUQ-SAC</a>.</figcaption>
</figure>

<figure class="loop-media">
  <a href="/projects/dokimazo/">
    <img src="/assets/img/projects/dokimazo/02_three_way_benchmark-800.png" alt="Three-way benchmark: RL rotor-tuning, dokimazo's IPOP-CMA-ES, and RDKit's ETKDG+MMFF94 reference, converging on n-dodecane's conformer energy" loading="lazy" />
  </a>
  <figcaption>An RL agent and dokimazo's own IPOP-CMA-ES both independently reach n-dodecane's true global-minimum conformer energy, verified against a directly-computable structural ground truth — see <a href="/projects/dokimazo/">dokimazo</a> (optimization-process video on the project page).</figcaption>
</figure>
