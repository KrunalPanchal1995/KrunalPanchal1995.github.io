/**
 * Showcase slideshow (assets/js/showcase.js)
 *
 * Drives the home-page "Selected work" slideshow rendered by
 * _includes/showcase_slideshow.liquid from _data/showcase.yml.
 *
 * Behaviour:
 * - Auto-advances every 7s, wrapping around; pauses on hover/focus,
 *   while the tab is hidden, and never auto-advances (or auto-plays
 *   videos) under prefers-reduced-motion — manual controls still work.
 * - Videos are fetched lazily: the <video> element carries a poster and
 *   no src until its slide first activates, then plays muted/looped.
 * - Keyboard: ArrowLeft/ArrowRight step, Space toggles pause, on the
 *   focused carousel region. No aria-live announcements (an
 *   auto-advancing carousel must not spam screen readers); inactive
 *   slides are aria-hidden and out of the tab order.
 *
 * No dependencies; loaded with `defer` from the include itself (not from
 * _includes/scripts.liquid, which is SHA-tracked in .al-folio-overrides.yml).
 */
(function () {
  "use strict";

  function initShowcase(root) {
    var slides = root.querySelectorAll(".showcase-slide");
    var dots = root.querySelectorAll(".showcase-dot");
    if (!slides.length) return;

    var DURATION = 7000;
    var idx = 0;
    var timer = null;
    var userPaused = false;
    var hoverPaused = false;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function startVideo(slide) {
      var video = slide.querySelector("video.showcase-media");
      if (!video || !slide.dataset.videoSrc) return;
      if (!video.getAttribute("src")) {
        video.src = slide.dataset.videoSrc;
        video.load();
      }
      if (reducedMotion) return; // posters only, no motion unless asked for
      var play = video.play();
      if (play && play.catch) play.catch(function () {});
    }

    function stopVideo(slide) {
      var video = slide.querySelector("video.showcase-media");
      if (video) video.pause();
    }

    function goTo(i) {
      idx = ((i % slides.length) + slides.length) % slides.length;
      for (var j = 0; j < slides.length; j++) {
        var slide = slides[j];
        var active = j === idx;
        slide.classList.toggle("active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        var mediaLink = slide.querySelector(".showcase-media-link");
        if (mediaLink) mediaLink.tabIndex = active ? 0 : -1;
        var titleLink = slide.querySelector(".showcase-title");
        if (titleLink) titleLink.tabIndex = active ? 0 : -1;
        var video = slide.querySelector("video.showcase-media");
        if (video) video.tabIndex = -1;
        if (active) startVideo(slide);
        else stopVideo(slide);
      }
      for (var k = 0; k < dots.length; k++) {
        dots[k].classList.toggle("active", k === idx);
        dots[k].setAttribute("aria-current", k === idx ? "true" : "false");
      }
    }

    function stopTimer() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function refreshTimer() {
      stopTimer();
      if (reducedMotion || userPaused || hoverPaused || document.hidden) return;
      timer = window.setInterval(function () {
        goTo(idx + 1);
      }, DURATION);
    }

    root.addEventListener("mouseenter", function () {
      hoverPaused = true;
      refreshTimer();
    });
    root.addEventListener("mouseleave", function () {
      hoverPaused = false;
      refreshTimer();
    });
    root.addEventListener("focusin", function () {
      hoverPaused = true;
      refreshTimer();
    });
    root.addEventListener("focusout", function () {
      // focus can move between children; only resume when it leaves the carousel
      if (!root.contains(document.activeElement)) {
        hoverPaused = false;
        refreshTimer();
      }
    });
    document.addEventListener("visibilitychange", refreshTimer);

    var prev = root.querySelector("[data-showcase-prev]");
    var next = root.querySelector("[data-showcase-next]");
    if (prev) {
      prev.addEventListener("click", function () {
        goTo(idx - 1);
        refreshTimer();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        goTo(idx + 1);
        refreshTimer();
      });
    }
    for (var d = 0; d < dots.length; d++) {
      dots[d].addEventListener(
        "click",
        (function (target) {
          return function () {
            goTo(target);
            refreshTimer();
          };
        })(d)
      );
    }
    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(idx - 1);
        refreshTimer();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(idx + 1);
        refreshTimer();
      } else if (event.key === " ") {
        event.preventDefault();
        userPaused = !userPaused;
        refreshTimer();
      }
    });

    goTo(0);
    refreshTimer();
  }

  function init() {
    var showcases = document.querySelectorAll(".showcase[data-showcase]");
    for (var i = 0; i < showcases.length; i++) initShowcase(showcases[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
