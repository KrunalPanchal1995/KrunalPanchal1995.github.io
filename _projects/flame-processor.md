---
layout: page
title: Flame Processor
description: A GUI to automatically detect burners and post-process combustion experiment video, replacing four brittle MATLAB scripts
img: assets/img/projects/flame-processor/001_Flame_Calibrator_-_MVI_8025_screenshot_01.07.2026-800.png
importance: 7
category: [experimental]
related_publications: false
---
{% include project_gallery.liquid project="flame-processor" %}


## Problem

Post-processing pool-fire video — cropping to the burner, drawing reference lines, extracting time-normalized frames — was previously done with four separate MATLAB scripts, each requiring hand-edited pixel-coordinate constants per video. Any camera shift between recordings broke the calibration and meant starting over.

## Approach

Flame Processor (v0.3.0) replaces all four scripts with one Python tool: automatic burner detection (a bright-rim gradient detector, with Hough-line and template-matching fallbacks), camera-jerk compensation via phase correlation on the static burner body with the flickering flame masked out, and time-normalized, fps-independent frame extraction.

## Implementation

Python, OpenCV, a Tkinter interactive calibration GUI (draggable burner box, ruler tool, zoom/pan, undo/redo), and a legacy OpenCV-HighGUI backend for compatibility. Batch mode with parallel workers, YAML-driven configuration — no hardcoded coordinates anywhere.

## Validation

75 of 75 tests passing, verified end-to-end on a 2160×3840 portrait-rotated pool-fire recording (533 frames), including a synthetic camera-jerk stress test.

## My contribution

Developed by me, replacing my own earlier MATLAB workflow.

## Where this is going

Pointing the tool at a new pool-fire recording and getting calibrated, annotated frames out — without re-deriving pixel coordinates by hand every time the camera moves.
