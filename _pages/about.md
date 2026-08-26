---
layout: about
title: Home
permalink: /
subtitle: Computational methods for complex physical systems — combustion kinetics, optimization &amp; uncertainty quantification, reduced-order &amp; scientific ML.

profile:
  align: right
  image: prof_pic.jpg # [CONTENT_REVIEW] placeholder until a headshot is selected from krunal_2026_photo.jpeg / KRUNAL.png
  image_circular: false # crops the image to make it circular
  degree: PhD, Mechanical Engineering
  institute: IIT Madras
  degree_year: "2026"
  research_areas:
    - Experimental &amp; Numerical Combustion
    - Combustion Kinetics &amp; Mechanism Reduction
    - Fair Multi-Objective Optimization &amp; UQ
    - Reduced-Order Modelling &amp; Scientific ML
    - Gasification
    - CFD
  current_role:
    title: Project Associate
    org: Dept. of Mechanical Engineering, IIT Madras
    until: 30 Nov 2026
  address: Dept. of Mechanical Engineering, IIT Madras, Chennai 600036, India

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false # re-enable once real posts exist in _posts/ -- see /writing/
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

{% include hero-value-flow.liquid %}
{% include hero-flow-field.liquid %}
{% include hero-playground.liquid %}

I build computational methods that connect detailed chemical models with practical combustion applications — kinetics, mechanism reduction, fair multi-objective optimization, uncertainty quantification, and scientific ML, treated as one connected problem rather than separate tools. [The full story &rarr;](/about/)

<div class="cta-row">
  <a class="btn-cta btn-cta-primary" href="/research/">Explore Research &rarr;</a>
  <a class="btn-cta btn-cta-secondary" href="/playground/">Try the Playground &rarr;</a>
  <a class="btn-cta btn-cta-secondary" href="/cv/">CV</a>
  <a class="btn-cta btn-cta-secondary" href="/about/#contact">Contact</a>
</div>

### Research at a glance

- **Combustion Kinetics & Mechanism Reduction** — mechanism development, validation, and reduction of detailed kinetic models to tractable, simulation-ready form
- **Experimental & Numerical Combustion** — [pool-flame characterization](/projects/vaporizer-rigs/) and downdraft gasification alongside CFD and chemical-kinetics simulation of the same systems
- **Fair Multi-Objective Optimization & Uncertainty Quantification** — multi-stage, multi-dataset calibration of Arrhenius parameters with correlated-parameter Bayesian UQ, built around [MOSIAC](/projects/mosiac/), my open-source optimization framework
- **Reduced-Order Modelling & Scientific ML** — neural and response-surface surrogates that stand in for expensive stiff simulations
- **[Gasification](/projects/gasification/)** — steam/catalyst-assisted downdraft fixed-bed gasification, from rig commissioning to syngas analysis
- **CFD** — an in-house CFD/multiphysics solver, and reacting-flow and rig-design studies built on top of it

### Selected results

<figure class="loop-media">
  <a href="/projects/flame-processor/">
    <img src="/assets/img/projects/flame-processor/006_burner_tracking-800.png" alt="Automatic burner detection tracking a pool-fire flame -- static preview, click through for the live animated tracking" loading="lazy" />
  </a>
  <figcaption>Automatic burner tracking on real pool-fire footage, replacing four brittle MATLAB scripts — static preview here (the 1.8&nbsp;MB animated version is on the project page, not the home page); see <a href="/projects/flame-processor/">Flame Processor</a> for it live.</figcaption>
</figure>

<figure class="loop-media">
  <img src="/assets/img/projects/muq-sac/010_classC_ls_sample_002_10x.gif" alt="A second Arrhenius-curve uncertainty sampling animation, tightening in real time" loading="lazy" />
  <figcaption>MUQ-SAC sampling a second class-C reaction's joint uncertainty band (10&times; real speed) — see <a href="/projects/muq-sac/">MUQ-SAC</a>.</figcaption>
</figure>
