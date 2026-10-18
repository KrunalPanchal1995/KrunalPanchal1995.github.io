---
layout: project
title: Circuit Lab
description: Five interactive instruments for electrical and electronics engineering - RLC and phasors, Bode filters, a Smith chart, diode and MOSFET curves, and buck and boost converters
img: assets/img/projects/electronics-lab/lab-800.png
importance: 34
app: /electronics-lab/
category:
- apps
- electronics
- visualization
---

An interactive companion to the electronics learning pages on this site. Move a slider and watch the textbook formula's answer move, with the key numbers read out under each plot. [Open the lab](/electronics-lab/) or [open it full screen](/assets/apps/electronics-lab/index.html).

## The five instruments

1. **RLC and phasors.** A series RLC circuit driven by a 1 V source: current against frequency, resonance f₀ = 1/(2π√LC), quality factor Q, bandwidth, and a phasor diagram drawn tip to tail.
2. **Bode plots.** First- and second-order low-pass, high-pass and band-pass filters: gain, phase, the −3 dB point and the effect of Q.
3. **Smith chart.** Load impedance on a lossless line: reflection coefficient, VSWR, return loss, mismatch loss, and the impedance seen after moving a fraction of a wavelength toward the generator.
4. **Diode and MOSFET.** A diode with a series resistor and its load line, and square-law MOSFET output curves with the triode and saturation regions and the transconductance.
5. **Buck and boost converters.** Output voltage, inductor ripple, output ripple, critical inductance and a three-period inductor-current waveform, with a warning when the converter leaves continuous conduction.

## Related learning pages

[Power electronics converters](/projects/power-electronics-converters/), [RF, antennas and microwaves](/projects/rf-antennas-microwaves/), [MOSFET and CMOS scaling](/projects/mosfet-cmos-scaling/), [Sensors, MEMS and control](/projects/sensors-mems-control/).

## Models and limits

- Lumped RLC, Shockley diode (I_S = 1 pA, 300 K), square-law MOSFET with channel-length modulation (no subthreshold current), lossless transmission line, ideal switches and components in the converter.
- Intended for learning and for checking hand calculations, not for design sign-off.
- The formulas were checked against independent Python calculations (resonance, Smith chart rotation, diode operating point, converter ripple) and the Bode peak against the exact second-order result.
