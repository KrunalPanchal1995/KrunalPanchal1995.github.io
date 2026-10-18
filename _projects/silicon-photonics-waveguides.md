---
layout: project
title: Silicon photonics waveguides
description: How light is guided on a chip - slab and wire waveguides, ring resonators and optical interconnects. A first-principles learning page.
img: assets/img/projects/silicon-photonics-waveguides/01_ring_resonator_transmission-800.png
importance: 31
category:
- photonics
---

A learning page: standard physics and engineering from the textbooks listed at the bottom, with figures computed from the formulas shown. It makes no claim of new research results.

## Intuition

Light stays inside a material of higher refractive index the way a marble stays inside a gutter. Make a thin strip of silicon (index about 3.5), surround it with glass (index about 1.4), and light travelling along the strip is trapped by repeated total internal reflection. That strip is a **waveguide**. Wires carry electrons; waveguides carry light.

## School level

- Snell's law: n<sub>1</sub> sin θ<sub>1</sub> = n<sub>2</sub> sin θ<sub>2</sub>. Past the critical angle, sin θ<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub>, light cannot leave the high-index material.
- For silicon in glass, θ<sub>c</sub> = arcsin(1.44 / 3.48) ≈ 24.4°. Anything steeper than that is trapped, which is why silicon guides so tightly and bends can be very small.
- Silicon is transparent for wavelengths beyond about 1.1 µm (its band gap is 1.12 eV), which is why chip photonics works at 1.3 µm and 1.55 µm, the wavelengths of optical fibre.

## College level

Treat the guide as a symmetric slab of thickness d. A mode is a field pattern that repeats itself after a round trip, and that condition gives

V √(1 − b) = m π + 2 arctan √( b / (1 − b) ),  with V = (2π d / λ) √(n<sub>1</sub><sup>2</sup> − n<sub>2</sub><sup>2</sup>)  and  b = (n<sub>eff</sub><sup>2</sup> − n<sub>2</sub><sup>2</sup>) / (n<sub>1</sub><sup>2</sup> − n<sub>2</sub><sup>2</sup>).

Mode m only exists when V > m π (figure 2), so the guide is single-mode when V < π. Worked example: a 220 nm silicon layer in glass at λ = 1.55 µm gives V ≈ 2.8, so the slab carries one TE mode.

A **ring resonator** is a waveguide bent into a loop next to a straight one. Light that returns in phase reinforces itself, which happens when n<sub>eff</sub> L = m λ. Resonances repeat every free spectral range

FSR = λ<sup>2</sup> / (n<sub>g</sub> L),  where the group index n<sub>g</sub> = n<sub>eff</sub> − λ dn<sub>eff</sub>/dλ.

For the all-pass ring in figure 1, with self-coupling r and single-pass amplitude transmission a, the through-port power is T = (a<sup>2</sup> − 2 a r cos φ + r<sup>2</sup>) / (1 − 2 a r cos φ + (a r)<sup>2</sup>), with round-trip phase φ = 2π n<sub>eff</sub> L / λ. Light is fully extinguished at resonance only when **r = a** (critical coupling).

## Advanced

- **Loss.** Sidewall roughness scatters light, and bends radiate once the radius gets small, so real wire waveguides trade footprint against loss.
- **Tuning.** Silicon's thermo-optic coefficient (about 1.8 × 10<sup>-4</sup> per kelvin) shifts a ring's resonance by of the order of 0.1 nm per kelvin, so rings need heaters or feedback to stay on target.
- **Platform.** Silicon-on-insulator wafers let photonic chips use CMOS factories, which is the main economic argument for the field.

## Where this shows up

- Optical transceivers and data-centre links that replace copper at high data rates.
- Chip-scale sensors, where a ring's resonance shifts when a substance sticks to its surface.
- LiDAR and optical switching research.

## Check yourself

1. Why would a waveguide with a 100 nm silicon layer, not 220 nm, stop guiding the 1.55 µm light well? *Answer: V falls to about 1.3. The fundamental mode never has a hard cutoff, but here it is only weakly confined (b is about 0.3, so n<sub>eff</sub> is close to the glass index), so most of its field spreads into the glass and bends or roughness leak it easily.*
2. A ring has n<sub>g</sub> = 4.2 and radius 10 µm. What is its FSR at 1550 nm? *Answer: λ<sup>2</sup> / (n<sub>g</sub> 2π R) ≈ 9.1 nm.*
3. What does critical coupling mean physically? *Answer: the power coupled into the ring each round trip equals the power lost there, so the two contributions cancel at the through port.*

## Read next

- B. E. A. Saleh and M. C. Teich, *Fundamentals of Photonics*.
- L. Chrostowski and M. Hochberg, *Silicon Photonics Design*.
- W. Bogaerts et al., "Silicon microring resonators", *Laser & Photonics Reviews* 6 (2012).
