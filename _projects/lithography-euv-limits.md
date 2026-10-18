---
layout: project
title: Lithography and EUV limits
description: Why printing smaller chips needs shorter light and bigger lenses - Rayleigh resolution, depth of focus, EUV and photon shot noise. A first-principles learning page.
img: assets/img/projects/lithography-euv-limits/01_rayleigh_resolution-800.png
importance: 35
category:
- electronics
---

A learning page: standard optics from the textbooks listed at the bottom, with figures computed from the formulas shown. It makes no claim of new research results, and the tool numbers are idealised, not specifications of any machine.

## Intuition

Lithography is a very precise slide projector: a mask is shrunk and projected onto a wafer so that light prints the pattern in a light-sensitive film. Light spreads out as it passes through any opening (diffraction), and that blur sets the smallest feature you can print. To print finer detail you either use light with a shorter wavelength or collect more of the spread-out light with a bigger lens.

## School level

- A wave bends around edges by an amount that grows with its wavelength, so shorter wavelengths give sharper images.
- Chip makers moved from visible and ultraviolet light to deep ultraviolet at 193 nm, and then to **extreme ultraviolet (EUV)** at 13.5 nm.
- A lens with a wider opening (a larger numerical aperture) gathers more of the diffracted light and prints finer detail, at the price of a shallower zone where the image stays sharp.

## College level

The Rayleigh criteria give the smallest half-pitch R and the depth of focus DOF:

R = k<sub>1</sub> λ / NA,  DOF = k<sub>2</sub> λ / NA<sup>2</sup>,

where NA = n sin θ and k<sub>1</sub>, k<sub>2</sub> are process factors (k<sub>1</sub> has a theoretical floor of 0.25 for a single exposure). With k<sub>1</sub> = 0.3:

- 193 nm immersion (NA 1.35, using water as the immersion liquid): R ≈ 43 nm.
- EUV at 13.5 nm, NA 0.33: R ≈ 12 nm.
- High-NA EUV, NA 0.55: R ≈ 7 nm.

Real printing has additional steps (multiple exposures, resolution-enhancement techniques), so these are idealised limits (figure 1). Note DOF shrinks as 1 / NA<sup>2</sup>, so a larger NA demands much flatter wafers.

**Shot noise (stochastics).** Photon energy is E = h c / λ, about 6.4 eV at 193 nm and about 91.8 eV at 13.5 nm, 14 times more. At the same dose (an assumed 30 mJ/cm<sup>2</sup>), a 10 nm × 10 nm pixel receives about 29,000 photons at 193 nm but only about 2,000 at 13.5 nm. Photon arrivals are random, so the relative noise is 1 / √N: about 0.6 % versus 2.2 % (figure 2). Edges print rougher unless the dose is raised.

## Advanced

- EUV light is absorbed by almost every material, including air, so EUV machines work in vacuum and use **multilayer mirrors** (alternating thin molybdenum and silicon layers) instead of lenses.
- The light comes from a laser-produced tin plasma; source power, mirror reflectivity and resist sensitivity together set throughput.
- **Resolution enhancement**: phase-shift masks, off-axis illumination, optical proximity correction and computational lithography push k<sub>1</sub> towards its limit.

## Where this shows up

- The cost and pace of every new chip generation.
- Mask design software and process-control analysis of line-edge roughness.

## Check yourself

1. Why can a larger NA hurt manufacturing even though it improves resolution? *Answer: the depth of focus falls as 1 / NA<sup>2</sup>, so the wafer surface must be much flatter and focus much tighter.*
2. Halving the wavelength at fixed NA and k<sub>1</sub> does what to R? *Answer: it halves R.*
3. Why do EUV photons make noisier images at equal dose? *Answer: each photon carries about 14 times more energy, so the same energy per area is delivered by 14 times fewer photons, and the relative noise 1 / √N rises.*

## Read next

- C. A. Mack, *Fundamental Principles of Optical Lithography*.
- H. J. Levinson, *Principles of Lithography*.
- A. K.-K. Wong, *Resolution Enhancement Techniques in Optical Lithography*.
