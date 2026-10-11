---
layout: project
title: MUQSAC++
description: 'Software engineering: fourteen copies of a kinetics pipeline merged into one tested code base'
importance: 14
category:
- uq
- combustion
- software
source: intake
icon: assets/img/projects/muqsac-plus-plus/icon.webp
icon_video: assets/img/projects/muqsac-plus-plus/icon.webm
icon_video_mp4: assets/img/projects/muqsac-plus-plus/icon.mp4
---

## What was done

- The pipeline existed as **14 near-duplicate copies**, one per experiment (461 files audited); 28 of the 33 distinct file names were byte-identical across all copies.
- The copies were **merged into one source tree**. The behaviours that differed between copies are kept as registered variants, **selected by a single input-file setting**, instead of by copying the tree again.
- **Byte-diff equivalence tests** run each original variant next to the unified code on the same synthetic input and compare the output files byte for byte.

## Direction

Sampling strategies for species-concentration profiles; results are not shown here.

## Credit

The related curve-capturing technique is joint work led by Gautam Srikanth (accepted abstract, 64th Symposium (Japanese) on Combustion, Fukuoka, Nov 2026).
