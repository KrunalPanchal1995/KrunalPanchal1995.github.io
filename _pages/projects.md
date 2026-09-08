---
layout: page
title: Research Projects
permalink: /projects/
description: Optimization, uncertainty quantification, combustion kinetics, scientific ML and computational engineering — filterable by theme.
nav: true
nav_order: 3
---

<div class="filter-bar" role="group" aria-label="Filter projects by theme">
  <button type="button" class="filter-btn active" data-filter="all">All ({{ site.projects.size }})</button>
  {% assign all_cats = "combustion,optimization,uq,sciml,cfd,experimental" | split: "," %}
  {% for cat in all_cats %}
    {% assign matches = site.projects | where_exp: "p", "p.category contains cat" %}
    {% if matches.size > 0 %}
      <button type="button" class="filter-btn" data-filter="{{ cat }}" style="--chip-color: var(--cat-{{ cat }});">{{ cat | capitalize }} ({{ matches.size }})</button>
    {% endif %}
  {% endfor %}
</div>

{% assign sorted_projects = site.projects | sort: "importance" %}
{% assign featured = sorted_projects | where_exp: "p", "p.importance <= 3" %}
{% assign rest = sorted_projects | where_exp: "p", "p.importance > 3" %}

<div class="project-featured-row">
  {% for project in featured %}
    {% assign slug = project.path | split: "/" | last | remove: ".md" %}
    {% assign gallery = site.data.project_images[slug] %}
    {% assign media_count = gallery.size | default: 0 %}
    {% assign has_video = false %}
    {% for item in gallery %}
      {% if item.video %}{% assign has_video = true %}{% endif %}
    {% endfor %}
    {% assign fi = forloop.index %}
    <a href="{{ project.url | relative_url }}" class="project-card project-card--featured" data-categories="{{ project.category | join: ' ' }}">
      <div class="project-card__media">
        {% if project.img %}
          {% include figure.liquid loading="eager" path=project.img class="project-card__img" alt=project.title %}
        {% endif %}
      </div>
      <div class="project-card__body">
        <div class="project-card__eyebrow">
          <span class="project-card__index">{% if fi < 10 %}0{{ fi }}{% else %}{{ fi }}{% endif %}</span>
          <span class="project-card__stack">Featured</span>
        </div>
        <h2 class="project-card__title">{{ project.title }}</h2>
        <p class="project-card__desc">{{ project.description }}</p>
        <div class="project-card__footer">
          <div class="category-tags">
            {% for cat in project.category %}
              <span class="category-tag" style="--chip-color: var(--cat-{{ cat }});">{{ cat }}</span>
            {% endfor %}
          </div>
          {% if media_count > 0 %}
            <span class="media-badge">
              {% if has_video %}<span class="media-badge__video">video</span>{% endif %}
              &#9656; {{ media_count }}
            </span>
          {% endif %}
        </div>
      </div>
    </a>
  {% endfor %}
</div>

<div class="project-grid" id="project-grid">
  {% for project in rest %}
    {% assign slug = project.path | split: "/" | last | remove: ".md" %}
    {% assign gallery = site.data.project_images[slug] %}
    {% assign media_count = gallery.size | default: 0 %}
    {% assign has_video = false %}
    {% for item in gallery %}
      {% if item.video %}{% assign has_video = true %}{% endif %}
    {% endfor %}
    {% assign gi = forloop.index | plus: featured.size %}
  <div class="project-card-col" data-categories="{{ project.category | join: ' ' }}">
    <a href="{{ project.url | relative_url }}" class="project-card">
      <div class="project-card__media">
        {% if project.img %}
          {% include figure.liquid loading="eager" path=project.img sizes="350px" class="project-card__img" alt=project.title %}
        {% endif %}
      </div>
      <div class="project-card__body">
        <div class="project-card__eyebrow">
          <span class="project-card__index">{% if gi < 10 %}0{{ gi }}{% else %}{{ gi }}{% endif %}</span>
        </div>
        <h2 class="project-card__title">{{ project.title }}</h2>
        <p class="project-card__desc">{{ project.description }}</p>
        <div class="project-card__footer">
          <div class="category-tags">
            {% for cat in project.category %}
              <span class="category-tag" style="--chip-color: var(--cat-{{ cat }});">{{ cat }}</span>
            {% endfor %}
          </div>
          {% if media_count > 0 %}
            <span class="media-badge">
              {% if has_video %}<span class="media-badge__video">video</span>{% endif %}
              &#9656; {{ media_count }}
            </span>
          {% endif %}
        </div>
      </div>
    </a>
  </div>
  {% endfor %}
</div>

<style>
  .filter-bar { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
  .filter-btn {
    background: var(--global-card-bg-color); border: 1px solid var(--global-divider-color);
    color: var(--global-text-color); border-radius: 999px; padding: 0.35rem 1rem;
    font-size: 0.85rem; cursor: pointer; font-family: inherit;
    transition: border-color 0.15s ease, color 0.15s ease;
  }
  .filter-btn:hover { border-color: var(--chip-color, var(--global-theme-color)); color: var(--chip-color, var(--global-theme-color)); }
  .filter-btn.active { background: var(--chip-color, var(--global-theme-color)); border-color: var(--chip-color, var(--global-theme-color)); color: #fff; }
  .filter-btn.active[data-filter="all"] { background: var(--global-theme-color); border-color: var(--global-theme-color); }

  /* ---- Featured row: full-width hero cards, importance 1-3 ---- */
  .project-featured-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 2.5rem;
  }
  .project-card.project-card--featured {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    align-items: stretch;
  }

  /* ---- 3-up grid: self-contained, no dependency on gem/Bootstrap row/col
     utility classes (purgecss trims unused ones at build time; this stays
     correct regardless of what else on the site currently uses them). ---- */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
    margin-top: 0.5rem;
  }
  @media (max-width: 991px) {
    .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 639px) {
    .project-grid { grid-template-columns: 1fr; }
  }
  .project-card-col { display: block; }
  .project-card--featured .project-card__media { aspect-ratio: 16 / 9; }
  .project-card--featured:nth-child(even) { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
  .project-card--featured:nth-child(even) .project-card__media { order: 2; }
  .project-card--featured .project-card__title { font-size: 1.5rem; }
  .project-card--featured .project-card__desc { -webkit-line-clamp: 4; }
  .project-card__stack {
    font-family: 'Roboto Mono', 'SF Mono', monospace; font-size: 0.68rem;
    text-transform: uppercase; letter-spacing: 0.1em; color: var(--global-theme-color);
  }

  /* ---- Shared card anatomy ---- */
  .project-card {
    display: flex; flex-direction: column;
    text-decoration: none; color: inherit;
    background: var(--global-card-bg-color);
    border: 1px solid var(--global-divider-color);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    height: 100%;
  }
  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14), 0 4px 10px rgba(0, 0, 0, 0.08);
    border-color: var(--global-theme-color);
  }
  @media (prefers-reduced-motion: reduce) {
    .project-card { transition: none; }
    .project-card:hover { transform: none; }
  }
  .project-card__media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--global-divider-color);
  }
  /* figure.liquid may wrap the <img> in its own container (picture/div) --
     force any wrapper to fill the aspect-ratio box, then force the actual
     <img> (at any nesting depth) to cover it. */
  .project-card__media > * {
    display: block; width: 100%; height: 100%;
  }
  .project-card__media img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .project-card__body {
    padding: 1.1rem 1.25rem 1.25rem;
    display: flex; flex-direction: column; flex: 1;
  }
  .project-card__eyebrow {
    display: flex; align-items: center; gap: 0.6rem;
    margin-bottom: 0.35rem;
  }
  .project-card__index {
    font-family: 'Roboto Mono', 'SF Mono', monospace; font-size: 0.72rem;
    color: var(--global-text-color-light); letter-spacing: 0.05em;
  }
  .project-card__title {
    font-size: 1.1rem; line-height: 1.3; margin: 0 0 0.4rem;
    color: var(--global-theme-color); font-weight: 600;
  }
  .project-card__desc {
    font-size: 0.9rem; line-height: 1.45; color: var(--global-text-color);
    margin: 0; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .project-card__footer {
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 0.75rem; margin-top: 0.9rem;
  }
  .category-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .category-tag {
    font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--chip-color, var(--global-text-color-light));
    border: 1px solid var(--chip-color, var(--global-divider-color));
    border-radius: 4px; padding: 0.1rem 0.45rem;
    white-space: nowrap;
  }
  .media-badge {
    font-family: 'Roboto Mono', 'SF Mono', monospace; font-size: 0.72rem;
    color: var(--global-text-color-light); white-space: nowrap;
    display: flex; align-items: center; gap: 0.4rem;
  }
  .media-badge__video {
    font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.05em;
    background: var(--global-theme-color); color: #fff;
    border-radius: 3px; padding: 0.05rem 0.35rem;
  }

  .project-card-col.hidden, .project-featured-row .project-card.hidden { display: none; }

  @media (max-width: 767px) {
    .project-card.project-card--featured,
    .project-card.project-card--featured:nth-child(even) {
      grid-template-columns: 1fr;
    }
    .project-card.project-card--featured .project-card__media,
    .project-card.project-card--featured:nth-child(even) .project-card__media {
      order: unset;
    }
  }
</style>

<script>
(function () {
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll("[data-categories]");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var cats = card.getAttribute("data-categories").split(" ");
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        card.classList.toggle("hidden", !show);
      });
    });
  });
})();
</script>
