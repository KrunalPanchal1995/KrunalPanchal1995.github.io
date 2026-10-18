---
layout: project
title: MOSFET and CMOS scaling
description: How the transistor works and why shrinking it helped, then stopped helping - square-law operation, subthreshold leakage and Dennard scaling. A first-principles learning page.
img: assets/img/projects/mosfet-cmos-scaling/01_mosfet_output_characteristics-800.png
importance: 36
category:
- electronics
---

A learning page: standard device physics from the textbooks listed at the bottom, with figures computed from the formulas shown. It makes no claim of new research results, and the device parameters are illustrative.

**Try it:** the [diode and MOSFET curve instrument](/electronics-lab/#dev) in Circuit Lab runs the formulas on this page.

## Intuition

A MOSFET is a voltage-controlled valve. A thin insulator separates a metal gate from the silicon below it. Put a voltage on the gate and the electric field pulls electrons into a channel under the insulator, opening a path between the source and the drain. No gate voltage, no channel, no current. Billions of these valves switching on and off are a processor.

## School level

- The gate voltage must exceed a **threshold voltage** V<sub>T</sub> before the channel forms.
- Above V<sub>T</sub>, more gate voltage means more current. At small drain voltages the device behaves like a voltage-controlled resistor; at larger ones the current flattens out (saturates).
- A **CMOS** circuit pairs an n-type and a p-type MOSFET so that one is always off when the output is steady. That is why a CMOS gate uses almost no power while it is not switching.

## College level

In the long-channel square-law model, with overdrive V<sub>ov</sub> = V<sub>GS</sub> − V<sub>T</sub> and k' = μ C<sub>ox</sub>:

- Triode (V<sub>DS</sub> < V<sub>ov</sub>): I<sub>D</sub> = k' (W/L) (V<sub>ov</sub> V<sub>DS</sub> − V<sub>DS</sub><sup>2</sup> / 2)
- Saturation (V<sub>DS</sub> ≥ V<sub>ov</sub>): I<sub>D</sub> = (k' / 2)(W/L) V<sub>ov</sub><sup>2</sup>

The dotted curve in figure 1 marks the edge of saturation. The transconductance g<sub>m</sub> = ∂I<sub>D</sub>/∂V<sub>GS</sub> = k' (W/L) V<sub>ov</sub> = 2 I<sub>D</sub> / V<sub>ov</sub> measures the device as an amplifier.

**Below threshold** the current does not stop; it falls exponentially, I<sub>D</sub> ∝ exp(V<sub>GS</sub> / (n k T / q)). The subthreshold swing S = n (k T / q) ln 10, which is about 60 mV per decade of current at 300 K for the ideal n = 1 (figure 2). So lowering V<sub>T</sub> to speed a circuit up raises the leakage current of every off transistor by a factor of ten for each 60 mV or so.

**Scaling.** In Dennard scaling, shrinking all dimensions and the supply voltage by a factor κ makes gates κ times faster, the area 1/κ<sup>2</sup> and the power per gate 1/κ<sup>2</sup>, so power density stays constant. It worked for decades, then broke down when V<sub>T</sub> and supply voltage could no longer fall without leakage rising, which is the main reason clock speeds stopped climbing.

## Advanced

- **Short-channel effects:** velocity saturation (current no longer follows the square law), drain-induced barrier lowering (the drain voltage lowers the threshold), and channel-length modulation.
- **Structure changes** to regain gate control: strained silicon, high-k metal gates, FinFETs (a gate on three sides of a fin) and gate-all-around nanosheets (the gate surrounds the channel).
- Beyond silicon, research on two-dimensional channels and steep-slope devices targets the 60 mV/decade limit.

## Where this shows up

- All digital logic, memory and analog interface circuits.
- SPICE-level circuit models and process design kits.

## Check yourself

1. A MOSFET has V<sub>T</sub> = 0.5 V, k' W/L = 2 mA/V<sup>2</sup>, V<sub>GS</sub> = 1.0 V in saturation. What is I<sub>D</sub>? *Answer: (2 / 2) × 0.5<sup>2</sup> = 0.25 mA.*
2. What is the ideal subthreshold swing at 300 K, and what is it at n = 1.5? *Answer: about 60 mV/decade, and about 89 mV/decade.*
3. Why did Dennard scaling stop? *Answer: the supply and threshold voltages could not keep shrinking because subthreshold leakage rises exponentially as V<sub>T</sub> falls, so power density started to rise.*

## Read next

- S. M. Sze and K. K. Ng, *Physics of Semiconductor Devices*.
- Y. Taur and T. H. Ning, *Fundamentals of Modern VLSI Devices*.
- C. Hu, *Modern Semiconductor Devices for Integrated Circuits*.
