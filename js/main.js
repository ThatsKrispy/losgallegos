/* =========================================================
   Los Gallegos — v6 "¡Fiesta!"
   Vanilla JS. Accessible dish roulette, reduced-motion + consent aware.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header background on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 20); }
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

  /* ---- Dish Roulette ---- */
  var IMG = "/assets/img/";
  var ROULETTE = [
    { n: "Paella Valenciana",        t: "Paellas & Rice", f: "paella-valenciana-los-gallegos-miami-florida.webp" },
    { n: "Gambas al Ajillo",         t: "Tapas",          f: "gambas-al-ajillo-garlic-shrimp-los-gallegos-miami-florida.webp" },
    { n: "Pulpo a la Gallega",       t: "Tapas",          f: "pulpo-a-la-gallega-octopus-los-gallegos-miami-florida.webp" },
    { n: "Seafood Paella",           t: "Paellas & Rice", f: "seafood-paella-los-gallegos-miami-florida.webp" },
    { n: "Langostinos a la Parrilla",t: "From the Sea",   f: "grilled-langostinos-los-gallegos-miami-florida.webp" },
    { n: "Tabla Ibérica",            t: "To Share",       f: "tabla-iberica-charcuterie-los-gallegos-miami-florida.webp" },
    { n: "Filet Mignon a los Gallegos", t: "From the Grill", f: "filet-mignon-los-gallegos-miami-florida.webp" },
    { n: "Chuletas de Cordero",      t: "From the Grill", f: "chuletas-de-cordero-lamb-chops-los-gallegos-miami-florida.webp" },
    { n: "Basque Cheesecake",        t: "Desserts",       f: "basque-cheesecake-los-gallegos-miami-florida.webp" },
    { n: "Croquetas de Jamón",       t: "Tapas",          f: "croquetas-de-jamon-los-gallegos-miami-florida.webp" },
    { n: "Paella Negra con Mariscos",t: "Paellas & Rice", f: "paella-negra-seafood-los-gallegos-miami-florida.webp" },
    { n: "Flan Casero",              t: "Desserts",       f: "flan-casero-los-gallegos-miami-florida.webp" }
  ];

  var spinBtn = document.getElementById("spinBtn");
  var pan = document.getElementById("pan");
  var panPhoto = document.getElementById("panPhoto");
  var panTag = document.getElementById("panTag");
  var panName = document.getElementById("panName");
  var panLive = document.getElementById("panLive");
  var spinHint = document.getElementById("spinHint");

  if (spinBtn && pan && panPhoto && panName) {
    /* preload images so the reel is smooth */
    ROULETTE.forEach(function (d) { var i = new Image(); i.src = IMG + d.f; });

    var spinning = false, lastIdx = 0;
    function render(d) {
      panPhoto.src = IMG + d.f;
      panPhoto.alt = d.n + " at Los Gallegos Spanish restaurant in Miami, Florida";
      panTag.textContent = d.t;
      panName.textContent = d.n;
    }
    function pick() {
      var i;
      do { i = Math.floor(Math.random() * ROULETTE.length); } while (i === lastIdx && ROULETTE.length > 1);
      lastIdx = i;
      return ROULETTE[i];
    }
    function announce(d) {
      if (panLive) panLive.textContent = "Tonight, try: " + d.n + " — " + d.t + ".";
      if (spinHint) spinHint.textContent = "How about the " + d.n + "? Call (305) 661-3040 to order.";
    }

    spinBtn.addEventListener("click", function () {
      if (spinning) return;
      var chosen = pick();

      /* reduced motion: skip the reel, pick instantly */
      if (reduce) { render(chosen); announce(chosen); return; }

      spinning = true;
      spinBtn.disabled = true;
      pan.classList.add("spinning");
      if (spinHint) spinHint.textContent = "Spinning…";

      var ticks = 16, i = 0, delay = 70;
      function step() {
        render(ROULETTE[Math.floor(Math.random() * ROULETTE.length)]);
        i++;
        if (i < ticks) {
          delay += 14; /* decelerate */
          setTimeout(step, delay);
        } else {
          render(chosen);
          lastIdx = ROULETTE.indexOf(chosen);
          pan.classList.remove("spinning");
          spinBtn.disabled = false;
          spinBtn.textContent = "Spin again";
          spinning = false;
          announce(chosen);
        }
      }
      step();
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
