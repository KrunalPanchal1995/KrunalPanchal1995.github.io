---
layout: page
title: Beyond Research
permalink: /beyond-research/
description: Research is what I do. It isn't all of who I am.
nav: true
nav_order: 4
map: true
---

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <h3>&#9823; Chess</h3>
    <p>Strategy, puzzles, and thoughts about calculation under uncertainty — coming soon.</p>
  </div>
  <div class="col mb-4">
    <h3>&#128247; Photography</h3>
    <p>Places, people and details worth remembering — coming soon.</p>
  </div>
</div>

## &#127760; Travel

Conference travel has been the main occasion so far — most recently the 14th Asia-Pacific Conference on Combustion (ASPACC 2023), held in Kaohsiung, Taiwan, with a side trip to Taipei. Chess took me to a few campuses during the M.Tech years at Nirma University, and there's been some exploring around Chennai during the PhD besides.

- **Conference travel:** Kaohsiung &middot; Taipei (ASPACC 2023)
- **Chess tournaments (M.Tech years, Nirma University):** IIT Guwahati (winter) &middot; IIT Kharagpur &middot; Bhopal (All India Chess Federation tournament) &middot; SVNIT, Surat
- **Exploring around Chennai (PhD years):** Yelagiri &middot; Ooty &middot; Mahabalipuram &middot; Chennai (beaches &amp; museums)

<div id="travel-map" style="position: relative; height: 400px; width: 100%; border-radius: 6px; overflow: hidden;"></div>
<p class="post-meta">Map: <a href="https://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>, tiles &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>.</p>

<script>
  window.addEventListener("load", function () {
    if (typeof L === "undefined" || document.getElementById("travel-map") === null) return;

    var map = L.map("travel-map");
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    }).addTo(map);

    var places = [
      [22.6273, 120.3014, "Kaohsiung — ASPACC 2023"],
      [25.033, 121.5654, "Taipei"],
      [26.1878, 91.6919, "IIT Guwahati — chess (winter)"],
      [22.3149, 87.3105, "IIT Kharagpur — chess"],
      [23.2599, 77.4126, "Bhopal — AICF chess tournament"],
      [21.1594, 72.7869, "SVNIT, Surat — chess"],
      [12.5833, 78.6333, "Yelagiri"],
      [11.4102, 76.695, "Ooty"],
      [12.6208, 80.1982, "Mahabalipuram"],
      [13.0827, 80.2707, "Chennai — beaches & museums"],
    ];

    var markers = places.map(function (p) {
      return L.circleMarker([p[0], p[1]], {
        radius: 7,
        color: "#a83c1a",
        weight: 2,
        fillColor: "#e2793a",
        fillOpacity: 0.85,
      })
        .bindPopup(p[2])
        .addTo(map);
    });

    map.invalidateSize(true);
    map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [24, 24] });
    // Guard against a stale container-size cache on first paint (e.g. a
    // webfont swap or a still-settling layout at window.load time) -- the
    // standard Leaflet fix is a follow-up invalidateSize() a tick later.
    setTimeout(function () {
      map.invalidateSize(true);
    }, 200);
  });
</script>

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-3">
    {% include figure.liquid loading="lazy" path="assets/img/beyond-research/kaohsiung.jpg" class="img-fluid rounded z-depth-1" alt="Kaohsiung skyline, Taiwan" %}
    <p class="post-meta">Kaohsiung skyline. Photo: 毛貓大少爺, <a href="https://commons.wikimedia.org/wiki/File:Kaohsiung_Skyline_2020_(cropped).jpg" target="_blank" rel="noopener">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener">CC BY-SA 2.0</a> — placeholder until I add my own.</p>
  </div>
  <div class="col mb-3">
    {% include figure.liquid loading="lazy" path="assets/img/beyond-research/taipei.jpg" class="img-fluid rounded z-depth-1" alt="Taipei skyline, Taiwan" %}
    <p class="post-meta">Taipei skyline. Photo: 毛貓大少爺, <a href="https://commons.wikimedia.org/wiki/File:Taipei_Skyline_2022.06.29.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener">CC BY-SA 2.0</a> — placeholder until I add my own.</p>
  </div>
</div>

## &#128218; Books & Ideas

Books and questions that shaped how I think — see the [bookshelf](/books/).

<!-- [CONTENT_REVIEW] Chess and Photography sections above are intentionally
     scaffolded, not populated -- no personal photos/chess games were in the
     surveyed source directories, and GOAL.md says the owner will add these
     personally. Travel section: the map is a hand-rolled Leaflet init (see
     the inline <script> above), not the al_charts gem's page.map + ```geojson
     auto-init -- that mechanism re-fires on a second readystatechange event
     (common once lazy images finish loading) and created a second, broken
     map instance with 404ing default marker icons; see git history on this
     file for the before/after. CircleMarker avoids the icon-image problem
     entirely, and CARTO Positron tiles give English-labeled places worldwide
     (Krunal asked for this) where the default OSM raster tiles show local
     script. Nine of the ten pinned locations have no photo yet -- Krunal
     said he'll supply his own; only Kaohsiung/Taipei have CC BY-SA Wikimedia
     placeholders. Swap assets/img/beyond-research/{kaohsiung,taipei}.jpg for
     the owner's own photos when available, and drop the "placeholder until I
     add my own" caption clause at that point; add real <figure> blocks for
     the other nine once photos exist. -->

<style>
  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background: var(--global-card-bg-color, #fff);
    color: var(--global-text-color, #111);
  }
</style>
