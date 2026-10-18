---
layout: project
title: Sensors, MEMS and control
description: How tiny mechanical sensors work and how feedback makes systems behave - MEMS resonators, capacitive sensing and PID control. A first-principles learning page.
img: assets/img/projects/sensors-mems-control/01_mems_resonator_response-800.png
importance: 40
category:
- electronics
---

A learning page: standard theory from the textbooks listed at the bottom, with figures computed from the formulas shown. It makes no claim of new research results, and the parameters are illustrative.

**Try it:** the [Bode filter instrument](/electronics-lab/#bode) in Circuit Lab runs the formulas on this page.

## Intuition

A MEMS sensor is a microscopic mechanical part, usually a small mass on springs etched into silicon, whose motion is read out electrically. Shake the chip and the mass lags behind; measure how far it lags and you have measured the acceleration. Control is the other half of the story: use the measurement to push the system back towards where you want it.

## School level

- A mass on a spring bounces at a natural frequency f<sub>0</sub> = (1 / 2π) √(k / m): stiffer springs and lighter masses ring faster.
- Friction (damping) makes the bouncing die away. Light damping gives a long ring; heavy damping gives a slow, sluggish return.
- **Feedback**: measure the output, compare it with the target, and act on the difference. A thermostat does this with heat.

## College level

**MEMS resonator.** The mass-spring-damper has natural angular frequency ω<sub>0</sub> = √(k / m) and quality factor Q = ω<sub>0</sub> m / b. Its response to a force at frequency ω is flat at low frequency, peaks by a factor of about Q at ω<sub>0</sub>, then falls (figure 1). A high Q gives a narrow, sharp resonance, which makes small shifts easy to detect.

**Accelerometer.** Well below resonance the proof mass moves by x = a / ω<sub>0</sub><sup>2</sup>, so sensitivity grows as the resonant frequency falls, but bandwidth shrinks: a basic trade-off. Capacitive read-out uses C = ε A / d, so a displacement Δd changes the capacitance by ΔC / C ≈ Δd / d. The mechanical noise floor (Brownian motion) corresponds to an acceleration of about √(4 k<sub>B</sub> T ω<sub>0</sub> / (m Q)) per root hertz, so heavier masses and higher Q give quieter sensors.

**PID control.** The controller output is u = K<sub>p</sub> e + K<sub>i</sub> ∫ e dt + K<sub>d</sub> de/dt, with e the error. For the plant G(s) = 1 / (s + 1)<sup>3</sup> in figure 2:

- Proportional only (K<sub>p</sub> = 2) settles at K<sub>p</sub> / (1 + K<sub>p</sub>) = 0.67 of the target, a steady-state error.
- Adding integral action removes that error, at the cost of overshoot and slower settling.
- Adding derivative action damps the overshoot.

## Advanced

- Frequency-domain design (Bode and Nyquist plots, gain and phase margin) predicts stability before building anything.
- Sensor fusion (for example, a Kalman filter combining a gyroscope with an accelerometer) beats any single sensor.
- Real controllers must handle noise, saturation of the actuator and integral wind-up.

## Where this shows up

- Phone motion sensors, airbag accelerometers, gyroscopes in drones, pressure sensors.
- Motor drives, temperature controllers and cruise control.

## Check yourself

1. A resonator has Q = 50. By roughly what factor is the response at resonance larger than at DC? *Answer: about 50.*
2. Why does a proportional-only controller on a plant with unit DC gain leave an error? *Answer: it needs a non-zero error to produce any output; with gain K<sub>p</sub> the loop settles where the output is K<sub>p</sub> / (1 + K<sub>p</sub>) of the target.*
3. An accelerometer's natural frequency doubles. What happens to its low-frequency sensitivity a / ω<sub>0</sub><sup>2</sup>? *Answer: it falls to one quarter.*

## Read next

- S. D. Senturia, *Microsystem Design*.
- K. J. Åström and R. M. Murray, *Feedback Systems: An Introduction for Scientists and Engineers*.
- G. F. Franklin, J. D. Powell and A. Emami-Naeini, *Feedback Control of Dynamic Systems*.
