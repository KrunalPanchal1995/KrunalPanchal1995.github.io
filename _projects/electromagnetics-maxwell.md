---
layout: project
title: Electromagnetics and Maxwell
description: From Maxwell's equations to waves, reflection and the skin effect - the physics under every antenna, waveguide and chip wire. A first-principles learning page.
img: assets/img/projects/electromagnetics-maxwell/01_fresnel_reflectance-800.png
importance: 33
category:
- photonics
---

A learning page: standard physics from the textbooks listed at the bottom, with figures computed from the formulas shown. It makes no claim of new research results.

## Intuition

Electric charges push on each other, moving charges make magnetic fields, and changing fields make each other. Put those facts together and the fields can carry on without any charges nearby: a self-sustaining wave. Light, radio and the signal on a chip's wire are the same thing at different frequencies.

## School level

- Light, radio waves and microwaves are all electromagnetic waves. They differ only in frequency, and they all travel at c ≈ 3 × 10<sup>8</sup> m/s in vacuum.
- Wavelength is λ = c / f. A 2.4 GHz Wi-Fi signal has a wavelength of about 12.5 cm; light of wavelength 1550 nm has a frequency of about 193 THz.
- When a wave meets a boundary, some of it reflects and the rest enters the second material. A glass window reflects about 4 % of the light that hits it straight on.

## College level

In vacuum, Maxwell's equations are

- ∇ · E = ρ / ε<sub>0</sub>  and  ∇ · B = 0
- ∇ × E = − ∂B/∂t  and  ∇ × B = μ<sub>0</sub> J + μ<sub>0</sub> ε<sub>0</sub> ∂E/∂t

Taking the curl of the curl in empty space gives the wave equation ∇<sup>2</sup>E = μ<sub>0</sub> ε<sub>0</sub> ∂<sup>2</sup>E/∂t<sup>2</sup>, so waves travel at c = 1 / √(μ<sub>0</sub> ε<sub>0</sub>) and carry an impedance of η<sub>0</sub> = √(μ<sub>0</sub>/ε<sub>0</sub>) ≈ 377 Ω.

**Reflection.** Matching the fields across a boundary gives the Fresnel equations. At normal incidence the reflectance is R = ((n<sub>1</sub> − n<sub>2</sub>) / (n<sub>1</sub> + n<sub>2</sub>))<sup>2</sup>, which is 4 % for air to glass (n = 1.5). For p-polarised light there is a Brewster angle, tan θ<sub>B</sub> = n<sub>2</sub> / n<sub>1</sub> ≈ 56.3° for air to glass, at which nothing is reflected (figure 1).

**Conductors.** Inside a metal a wave decays over the skin depth δ = √(2 / (ω μ σ)). For copper at 1 GHz that is about 2 µm, so at high frequency current flows only in a thin surface layer and the wire's effective resistance rises (figure 2).

## Advanced

- Boundary conditions (tangential E and H continuous) are the origin of every reflection, waveguide cutoff and antenna pattern.
- Waveguides, cavities and photonic crystals are all solutions of Maxwell's equations with particular boundaries; numerical solvers (finite-difference time-domain, finite elements) do this for geometries that have no closed form.
- At optical frequencies the same equations, with a complex refractive index, describe absorption and the colour of metals.

## Where this shows up

- Antenna design, PCB trace layout and on-chip interconnects (skin effect, reflections).
- Polarising sunglasses (Brewster angle), anti-reflection coatings, optical fibres.

## Check yourself

1. Why do polarising sunglasses cut glare from a road or water surface? *Answer: glare is mostly s-polarised, because near the Brewster angle the p component is hardly reflected, so a filter that blocks s-polarisation removes most of it.*
2. What is the skin depth of copper at 1 GHz? *Answer: about 2.1 µm, from √(2 / (2π × 10<sup>9</sup> × 4π × 10<sup>-7</sup> × 5.8 × 10<sup>7</sup>)).*
3. What fraction of light is lost to reflection at each surface of a glass lens (n = 1.5) at normal incidence? *Answer: 4 %, from ((1 − 1.5) / (1 + 1.5))<sup>2</sup>.*

## Read next

- D. J. Griffiths, *Introduction to Electrodynamics*.
- D. M. Pozar, *Microwave Engineering*.
- E. Hecht, *Optics*.
