---
layout: page
title: Flame Processor
description: GUI-driven computer vision for combustion experiments — automatic burner detection and post-processing for pool-fire video, replacing four brittle MATLAB scripts
img: assets/img/projects/flame-processor/001_Flame_Calibrator_-_MVI_8025_screenshot_01.07.2026-800.png
importance: 7
category: [experimental]
related_publications: false
---
{% include project_gallery.liquid project="flame-processor" %}


## Agenda

This is computer vision applied to flame–material experiments: a GUI-driven tool that finds a burner in pool-fire video automatically, tracks it through camera jerks, and turns raw footage into calibrated, time-normalized frames — the substrate everything downstream (flame-shape analysis, temperature estimation, run-to-run comparison) is built on. The point isn't the GUI itself; it's removing the hand-edited pixel coordinates that made every previous recording a fresh calibration exercise.

## Problem

Post-processing pool-fire video — cropping to the burner, drawing reference lines, extracting time-normalized frames — was previously done with four separate MATLAB scripts, each requiring hand-edited pixel-coordinate constants per video. Any camera shift between recordings broke the calibration and meant starting over.

## Approach

Flame Processor replaces all four scripts with one Python tool: automatic burner detection (a bright-rim gradient detector, with Hough-line and template-matching fallbacks), camera-jerk compensation via phase correlation on the static burner body with the flickering flame masked out, and time-normalized, fps-independent frame extraction.

## Implementation

Python, OpenCV, a Tkinter interactive calibration GUI (draggable burner box, ruler tool, zoom/pan, undo/redo), and a legacy OpenCV-HighGUI backend for compatibility. Batch mode with parallel workers, YAML-driven configuration — no hardcoded coordinates anywhere.

## A real run

Two runs against real footage, headless (`flame-processor process`, no GUI), not a synthetic demo:

<figure class="loop-media">
  <img src="/assets/img/projects/flame-processor/006_burner_tracking.gif" alt="Detected burner rim and reference bracket tracked across the 22-second calibration recording" loading="lazy" />
  <figcaption>All 75 sampled frames from the calibration-recording run, in sequence — the detected rim and reference bracket hold steady across five camera jerks the run log recorded and re-anchored.</figcaption>
</figure>

**The 22 s calibration recording** (a ruler in frame, unlit burner) processed clean: 75 sampled frames, **0 stale detections**, **5 camera jerks** correctly detected and re-anchored, average detection confidence **0.69**. Scale was set manually (28.8 px/cm, the ruler-derived value from the tool's own calibration log) rather than from the on-disk calibration JSON, whose `scale_px_per_cm` was null — auto-falling-through to burner-width scale on this footage is a documented failure mode (it produces a nonsense 606 px/cm), so this run made that choice explicit instead.

**A 40 s clip of the actual pool-fire experiment** — a second, uncalibrated rig, no ruler in frame — is the honest counter-result. Detection confidence dropped to an average of **0.61**, with **10 of 134** sampled frames marked stale, because the bright-rim detector occasionally locked onto a metal support rail in the background instead of the burner. This is a real, quantified limitation, not a hedge: automatic detection needs a calibration pass (or a rig-specific detector tune) before it can be trusted on an unfamiliar setup, and that calibration step doesn't yet exist for this rig.

One implementation finding from running this for real, worth recording here rather than only in the tool's own issue tracker: `--start-frame` does not seek — the pipeline decodes every frame sequentially from 0 regardless of where sampling begins, so processing a window late in a long recording costs the same as decoding the whole prefix. Extracting the window with `ffmpeg -c copy` first, then processing that shorter file from its own frame 0, sidesteps it.

Test suite: **88 of 88 passing** (re-run for this page, not quoted from memory).

## Validation

Verified end-to-end on a 2160×3840 portrait-rotated pool-fire recording (533 frames), including a synthetic camera-jerk stress test, plus the two real runs above.

## My contribution

Developed by me, replacing my own earlier MATLAB workflow.

## Where this is going

In construction. Four concrete next steps, in the order they build on each other:

- **A calibration pass for the pool-fire rig** — closing the gap the 0.61-confidence run above surfaced, so detection is trustworthy on the rig that actually matters, not just the calibration recording.
- **Phase and tip-oscillation tracking** — turning the calibrated frame sequence into a time series of flame-tip position, not just a cropped image per frame.
- **Flame-temperature estimation from video**, using ML rather than a physical probe in the flame.
- **Run-to-run comparison at matched boundary conditions** — using the time-normalized sampling this tool already does to line up two recordings of the same nominal case and quantify how much they actually agree.
