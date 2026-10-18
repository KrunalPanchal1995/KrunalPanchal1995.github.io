---
layout: project
title: Power electronics converters
description: How switching converters change voltage efficiently - buck, boost and buck-boost, inductor ripple, losses and wide-bandgap devices. A first-principles learning page.
img: assets/img/projects/power-electronics-converters/01_buck_inductor_current-800.png
importance: 38
category:
- electronics
---

A learning page: standard circuit theory from the textbooks listed at the bottom, with figures computed from the formulas shown. It makes no claim of new research results, and the component values are illustrative.

**Try it:** the [buck and boost converter](/electronics-lab/#dcdc) in Circuit Lab runs the formulas on this page.

## Intuition

To turn 12 V into 6 V you could drop the extra voltage across a resistor, but that burns half the power as heat. A switching converter instead chops the supply on and off very fast and smooths the result with an inductor and capacitor. The switch is either fully on (no voltage across it) or fully off (no current through it), so it wastes almost nothing.

## School level

- An inductor resists changes in current: it stores energy in a magnetic field while current rises and gives it back as current falls.
- A capacitor smooths the voltage in the same way.
- The **duty cycle** D is the fraction of each switching period that the switch is on. A bigger D delivers more energy per cycle.
- Common names: **buck** converters step voltage down, **boost** converters step it up, and **buck-boost** converters can do either and invert the polarity.

## College level

In steady state the average voltage across an inductor over one period must be zero (volt-second balance). Applying that to each topology gives the ideal DC conversion ratios (figure 2):

- Buck: V<sub>out</sub> / V<sub>in</sub> = D
- Boost: V<sub>out</sub> / V<sub>in</sub> = 1 / (1 − D)
- Buck-boost: V<sub>out</sub> / V<sub>in</sub> = − D / (1 − D)

For the buck converter, the inductor current ramps up at (V<sub>in</sub> − V<sub>out</sub>) / L while the switch is on and down at V<sub>out</sub> / L while it is off, giving a peak-to-peak ripple

ΔI = (V<sub>in</sub> − V<sub>out</sub>) D T / L = V<sub>out</sub> (1 − D) T / L,  T = 1 / f<sub>s</sub>.

Worked example (figure 1): V<sub>in</sub> = 12 V, D = 0.5, L = 22 µH, f<sub>s</sub> = 100 kHz gives V<sub>out</sub> = 6 V and ΔI = 6 × 0.5 × 10 µs / 22 µH ≈ 1.36 A. If the load current is 2 A, the inductor current swings between about 1.3 A and 2.7 A. While it stays above zero the converter is in continuous conduction; otherwise it enters discontinuous conduction and the ratios above no longer hold.

**Losses.** Conduction loss is I<sup>2</sup> R<sub>on</sub>; switching loss is roughly ½ V I (t<sub>r</sub> + t<sub>f</sub>) f<sub>s</sub>, so raising f<sub>s</sub> to shrink the inductor costs efficiency.

## Advanced

- **Wide-bandgap devices:** silicon carbide and gallium nitride tolerate higher electric fields and switch faster than silicon, allowing higher voltage, higher frequency and smaller magnetics.
- **Magnetics:** an inductor core can saturate if the peak current is too high, so the peak, not the average, current sets the core size.
- **Control:** a feedback loop adjusts D to hold V<sub>out</sub> against changes in load and input; its design uses the small-signal model of the converter.

## Where this shows up

- Phone chargers, laptop power adapters and the voltage regulators next to every processor.
- Electric-vehicle inverters and on-board chargers, solar inverters, LED drivers.

## Check yourself

1. A buck converter has V<sub>in</sub> = 24 V and must give 5 V. What duty cycle? *Answer: D = 5 / 24 ≈ 0.21.*
2. How does doubling the switching frequency change the inductor ripple for fixed L? *Answer: ΔI halves, because T halves.*
3. Why can a boost converter not reach arbitrarily high gain in practice? *Answer: 1 / (1 − D) grows without bound as D approaches 1, but real resistances in the inductor and switch dominate there and efficiency collapses.*

## Read next

- R. W. Erickson and D. Maksimović, *Fundamentals of Power Electronics*.
- N. Mohan, T. M. Undeland and W. P. Robbins, *Power Electronics: Converters, Applications, and Design*.
- B. J. Baliga, *Fundamentals of Power Semiconductor Devices*.
