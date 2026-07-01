/* Los Gallegos — interactions (vanilla, no dependencies) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sticky header + scroll progress bar
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".progress");
  var ticking = false;

  function updateScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (progress) {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docH > 0 ? (y / docH) * 100 : 0;
      progress.style.width = pct + "%";
    }
    // Parallax
    if (!reduceMotion) {
      parallaxEls.forEach(function (el) {
        var rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
          var offset = (rect.top - window.innerHeight / 2) * -speed;
          el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
        }
      });
    }
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(updateScroll); ticking = true; }
  }

  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateScroll();

  // Mobile nav toggle
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Animated number counters
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  // Reveal on scroll + trigger counters
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          e.target.querySelectorAll("[data-count]").forEach(animateCount);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    // counters not inside a .reveal (e.g. badge)
    document.querySelectorAll("[data-count]").forEach(function (el) {
      if (!el.closest(".reveal")) io.observe(el.parentElement);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
    document.querySelectorAll("[data-count]").forEach(animateCount);
  }

  // Highlight today's hours
  var todayIdx = new Date().getDay(); // 0 = Sun
  var row = document.querySelector('.hours-table tr[data-day="' + todayIdx + '"]');
  if (row) row.classList.add("today");

  // Footer year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
