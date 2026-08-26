---
layout: about
title: About
permalink: /about/
description: Who I am, how I think about research, and where I'm headed.
subtitle: Kinetics, optimization, and uncertainty — treated as one connected problem.
nav: true
nav_order: 5
profile:
  align: right
  image: prof_pic.png
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
social: true # includes social icons at the bottom of the page
---

## Who I am

I'm Dr. Krunal Panchal. I hold a PhD in Mechanical Engineering from IIT Madras (thesis submitted Oct 2025, degree conferred Jul 2026, advised by Prof. Krithika Narayanaswamy) and am currently a Project Associate in the same department through 30 November 2026. My work builds computational methods that connect detailed chemical models with practical combustion applications. My PhD work is a fast, robust, kinetics-based fair multi-objective optimization framework for combustion kinetic models — including mechanism reduction and reduced-order surrogate modelling — built into the open-source **MOSIAC** workbench. Alongside the computational work, I've done hands-on experimental and numerical combustion research: pool-flame characterization of n-heptane, designed and commissioned jointly with Gagan Verma, with an eye toward extending it to Methanol-to-Gasoline surrogate fuels, quantified with **flamelab**, the computer-vision measurement instrument I built for it; and, earlier, an M.Tech project on steam/catalyst-assisted downdraft gasification, paired with CFD and chemical-kinetics simulation of the same systems. I'm also building experience in quantum-chemical calculations (Gaussian) for reaction-rate estimation — an area I'm actively working to strengthen further.

## Research philosophy

I try to understand the structure of a problem before optimizing it. A rate constant is a range, not a value — uncertainty is a first-class citizen in everything I build, not an afterthought bolted on at the end. I value methods that are accurate _and_ interpretable, reproducible, and computationally honest about their own cost. When something doesn't work, I'd rather document why than quietly move on — the clearest example is a 115-run statistical audit of my own scientific-ML results that found a supposed "10× improvement" was mostly seed noise. That finding is now part of the record, not something I buried.

## Background

- **PhD, Mechanical Engineering** — Indian Institute of Technology Madras (2018–2026)
- **M.Tech, Thermal Engineering** — Nirma University, Institute of Technology (2016–2018), ISTE National Award for Best M.Tech Thesis 2018
- **B.E., Mechanical Engineering** — Government Engineering College, Modasa (2012–2016)

<figure class="loop-media">
  <img src="/assets/img/prof_pic_alt.png" alt="Krunal Panchal" loading="lazy" style="max-width: 240px;" />
</figure>

<div class="cta-row">
  <a class="btn-cta btn-cta-secondary" href="/cv/">View the full CV &rarr;</a>
</div>

## Academic timeline

**2016–2018** — M.Tech at Nirma University: experimental gasification research, first hands-on rig work.
**2018–2026** — PhD at IIT Madras: MUQ-SAC joint-Arrhenius uncertainty quantification (published, _Combustion Theory and Modelling_, 2024); multi-stage optimization strategy (ASPACC 2023); the MOSIAC workbench; pool-flame characterization.
**2026 (till 30 Nov)** — Project Associate, Department of Mechanical Engineering, IIT Madras, on a Shell-funded combustion project, while preparing the MOSIAC software paper and extending the multi-dataset objective-function work to journal form.

## Questions I'm exploring

- How can uncertainty be represented honestly when model parameters are correlated, rather than treated independently for convenience?
- Can optimization algorithms learn useful structure about a physical system, rather than merely finding parameter values that fit?
- How can scientific ML remain trustworthy — and its claimed gains distinguishable from noise — when the underlying dynamics are stiff?
- Where does a fast neural surrogate actually replace an expensive physical simulation without losing the structure that makes it scientifically meaningful?

## Contact

- Email: {% al_email_protect_link site.data.socials.email %}
- ORCID: [0000-0003-2595-8824](https://orcid.org/0000-0003-2595-8824)
- GitHub: [KrunalPanchal1995](https://github.com/KrunalPanchal1995)
- LinkedIn: [Krunal-panchal-phd](https://linkedin.com/in/Krunal-panchal-phd)
- ResearchGate: [Krunal-Panchal](https://www.researchgate.net/profile/Krunal-Panchal)
