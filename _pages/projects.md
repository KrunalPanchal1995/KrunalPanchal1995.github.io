---
layout: page
title: Research Projects
permalink: /projects/
description: Optimization, uncertainty quantification, combustion kinetics, scientific ML and computational engineering — eleven projects, filterable by theme.
nav: true
nav_order: 3
---

<div class="filter-bar" role="group" aria-label="Filter projects by theme">
  <button type="button" class="filter-btn active" data-filter="all">All (11)</button>
  {% assign cat_counts = "" | split: "" %}
  {% assign all_cats = "combustion,optimization,uq,sciml,cfd,experimental" | split: "," %}
  {% for cat in all_cats %}
    {% assign matches = site.projects | where_exp: "p", "p.category contains cat" %}
    <button type="button" class="filter-btn" data-filter="{{ cat }}">{{ cat | capitalize }} ({{ matches.size }})</button>
  {% endfor %}
</div>

<div class="row row-cols-1 row-cols-md-3 g-4 mt-1" id="project-grid">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% for project in sorted_projects %}
  <div class="col project-card" data-categories="{{ project.category | join: ' ' }}">
    <a href="{{ project.url | relative_url }}" style="text-decoration: none;">
      <div class="card h-100 hoverable">
        {% if project.img %}
          {% include figure.liquid loading="eager" path=project.img sizes="350px" alt=project.title class="card-img-top" %}
        {% endif %}
        <div class="card-body">
          <h2 class="card-title">{{ project.title }}</h2>
          <p class="card-text">{{ project.description }}</p>
          <div class="category-tags">
            {% for cat in project.category %}
              <span class="category-tag">{{ cat }}</span>
            {% endfor %}
          </div>
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
  }
  .filter-btn:hover { border-color: var(--global-theme-color); color: var(--global-theme-color); }
  .filter-btn.active { background: var(--global-theme-color); border-color: var(--global-theme-color); color: var(--global-bg-color); }
  .category-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.6rem; }
  .category-tag {
    font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--global-text-color-light); border: 1px solid var(--global-divider-color);
    border-radius: 4px; padding: 0.1rem 0.45rem;
  }
  .project-card.hidden { display: none; }
</style>

<script>
(function () {
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".project-card");
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
