---
layout: project
title: Lasers and photodetectors
description: How semiconductors make light and detect it - LEDs, laser diodes, photodiodes and solar cells. A first-principles learning page.
img: assets/img/projects/lasers-photodetectors/01_photodiode_responsivity-800.png
importance: 32
category:
- photonics
---

A learning page: standard physics from the textbooks listed at the bottom, with figures computed from the formulas shown. It makes no claim of new research results.

## Intuition

A semiconductor has an energy gap that electrons must cross. When an electron falls back across the gap it can give up a photon, which is how an LED or laser makes light. Run the process in reverse and a photon can lift an electron across the gap, which is how a photodiode or solar cell turns light into current. The size of the gap decides the colour.

## School level

- Photon energy is E = h c / λ, which in convenient units is E[eV] = 1.2398 / λ[µm].
- A photon can only be absorbed if E exceeds the gap E<sub>g</sub>, so each material has a cutoff wavelength λ<sub>c</sub> = 1.2398 / E<sub>g</sub>.
- Silicon (E<sub>g</sub> about 1.12 eV) cuts off near 1.1 µm, germanium (about 0.66 eV) near 1.9 µm, and indium gallium arsenide matched to indium phosphide (about 0.75 eV) near 1.65 µm. That is why optical-fibre receivers use InGaAs or germanium rather than silicon.

## College level

**Detector.** One photon can free at most one electron, so the current per watt (the responsivity) is

R = η q λ / (h c) = η λ[µm] / 1.2398  A/W,

where η is the quantum efficiency. It rises linearly with wavelength because longer-wavelength photons carry less energy, so a watt contains more of them (figure 1).

**Laser.** A laser needs gain to beat loss. Population inversion in the junction gives gain, and mirrors at the cleaved ends give feedback. Lasing starts when the gain meets the threshold condition

g<sub>th</sub> = α<sub>i</sub> + (1 / 2L) ln(1 / R<sub>1</sub>R<sub>2</sub>).

Below threshold the device is a weak LED. Above it, output power grows linearly, P = η<sub>d</sub> (h ν / q)(I − I<sub>th</sub>), with a slope set by the differential efficiency η<sub>d</sub> (figure 2).

## Advanced

- **Solar cells** are photodiodes run to deliver power. The Shockley-Queisser analysis shows a single-junction cell cannot exceed roughly 33 % efficiency, because photons below the gap are wasted and the excess energy of photons well above the gap becomes heat.
- **Direct versus indirect gaps.** Silicon has an indirect gap, so it emits light very poorly. Compound semiconductors (gallium arsenide, indium phosphide) have direct gaps, which is why lasers are made from them and grown or bonded onto silicon photonic chips.
- **Noise.** A detector's sensitivity is limited by shot noise from the random arrival of photons and by thermal noise in its load.

## Where this shows up

- Fibre-optic communication, laser pointers, barcode and LiDAR sensing.
- Cameras, photodiode light meters and solar panels.

## Check yourself

1. Why can a silicon photodiode not detect 1.55 µm light? *Answer: the photon energy, 1.2398 / 1.55 ≈ 0.8 eV, is below silicon's 1.12 eV gap.*
2. A detector has η = 0.8 at 1.55 µm. What is its responsivity? *Answer: 0.8 × 1.55 / 1.2398 ≈ 1.0 A/W.*
3. A laser has threshold 10 mA and slope 0.3 mW/mA. What power at 40 mA? *Answer: 0.3 × (40 − 10) = 9 mW.*

## Read next

- B. E. A. Saleh and M. C. Teich, *Fundamentals of Photonics*.
- L. A. Coldren, S. W. Corzine and M. L. Mašanović, *Diode Lasers and Photonic Integrated Circuits*.
- S. M. Sze and K. K. Ng, *Physics of Semiconductor Devices*.
