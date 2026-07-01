/* =========================================================
   Los Gallegos — v3 "Mesa"
   Lightweight, dependency-free, reduced-motion aware.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header: solid background after scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Dish grid filter (hide + reflow) ---- */
  var grid = document.getElementById("dish-grid");
  var filterBtns = document.querySelectorAll(".course-nav button");
  if (grid && filterBtns.length) {
    var dishes = Array.prototype.slice.call(grid.querySelectorAll(".dish"));
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        dishes.forEach(function (d) {
          var show = filter === "all" || d.getAttribute("data-course") === filter;
          d.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* ---- Highlight today's hours row ---- */
  var today = new Date().getDay();
  var row = document.querySelector('.hours-table tr[data-day="' + today + '"]');
  if (row) row.classList.add("is-today");

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
