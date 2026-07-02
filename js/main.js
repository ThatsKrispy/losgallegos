/* =========================================================
   Los Gallegos — v7 "La Mesa Dorada"
   Vanilla JS. Accessible, reduced-motion + consent aware.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header background on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); }
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Menu filter ---- */
  var grid = document.getElementById("dishes");
  var filterBtns = document.querySelectorAll(".filter button");
  if (grid && filterBtns.length) {
    var dishes = Array.prototype.slice.call(grid.querySelectorAll(".dish"));
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });
        dishes.forEach(function (d) {
          d.classList.toggle("hide", !(f === "all" || d.getAttribute("data-course") === f));
        });
      });
    });
  }

  /* ---- Today's hours highlight ---- */
  var today = new Date().getDay();
  var row = document.querySelector('.hours tr[data-day="' + today + '"]');
  if (row) row.classList.add("is-today");

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Cookie consent (essential only until opt-in) ---- */
  var consent = document.getElementById("consent");
  var STORE = "lg-consent";
  function stored() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(STORE, v); } catch (e) {} }
  function showConsent() { if (!consent) return; consent.hidden = false; requestAnimationFrame(function () { consent.classList.add("show"); }); }
  function hideConsent() { if (!consent) return; consent.classList.remove("show"); window.setTimeout(function () { consent.hidden = true; }, 440); }
  function loadAnalytics() { /* No analytics loaded yet. Inject provider script here — never before consent. */ }

  if (consent) {
    var choice = stored();
    if (choice === "accepted") { loadAnalytics(); }
    else if (choice !== "declined") { showConsent(); }
    consent.addEventListener("click", function (e) {
      var b = e.target.closest("[data-consent]");
      if (!b) return;
      if (b.getAttribute("data-consent") === "accept") { save("accepted"); loadAnalytics(); }
      else { save("declined"); }
      hideConsent();
    });
  }
})();
