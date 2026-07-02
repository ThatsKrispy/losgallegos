/* =========================================================
   Los Gallegos — Accessibility widget (self-hosted, no third parties)
   Text size, contrast, underlined links, readable font,
   pause motion, strong focus. Preferences stored locally.
   ========================================================= */
(function () {
  "use strict";

  var STORE = "lg-a11y";
  var root = document.documentElement;

  var CSS =
    /* ---- effect classes ---- */
    "html.a11y-text-1{font-size:112.5%}" +
    "html.a11y-text-2{font-size:125%}" +
    "html.a11y-contrast{--bg:#000;--bg-2:#000;--panel:#0d0d0d;--line:rgba(255,210,122,.6);--line-soft:rgba(255,255,255,.35);--gold:#ffd27a;--gold-bright:#ffdf9e;--ink:#fff;--ink-2:#f0f0f0;--ink-3:#d9d9d9}" +
    "html.a11y-contrast .hero__media::after,html.a11y-contrast .interlude__media::after{background:rgba(0,0,0,.82)!important}" +
    "html.a11y-contrast .btn--gold{color:#000}" +
    "html.a11y-underline a{text-decoration:underline!important;text-underline-offset:2px}" +
    "html.a11y-sans body,html.a11y-sans h1,html.a11y-sans h2,html.a11y-sans h3,html.a11y-sans .hero__title,html.a11y-sans .hero__sub,html.a11y-sans .intro__statement,html.a11y-sans .interlude__quote,html.a11y-sans .reserve__phone,html.a11y-sans .brand__name,html.a11y-sans .dish__name,html.a11y-sans .plato__num{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif!important;font-style:normal!important}" +
    "html.a11y-no-motion *,html.a11y-no-motion *::before,html.a11y-no-motion *::after{animation:none!important;transition:none!important}" +
    "html.a11y-no-motion{scroll-behavior:auto!important}" +
    "html.a11y-no-motion .reveal{opacity:1!important;transform:none!important}" +
    "html.a11y-focus :focus{outline:3px solid #ffd27a!important;outline-offset:2px!important}" +
    /* ---- widget UI ---- */
    ".a11y-btn{position:fixed;bottom:20px;left:20px;z-index:120;width:52px;height:52px;border-radius:50%;border:2px solid #14100a;background:#c9a25e;color:#14100a;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,.55)}" +
    ".a11y-btn:hover{background:#dcb877}" +
    ".a11y-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}" +
    ".a11y-btn svg{width:30px;height:30px}" +
    ".a11y-panel{position:fixed;bottom:84px;left:20px;z-index:121;width:290px;max-width:calc(100vw - 40px);max-height:min(70vh,560px);overflow:auto;background:#1c1813;border:1px solid rgba(201,162,94,.45);box-shadow:0 18px 50px rgba(0,0,0,.6);padding:18px;color:#ece5d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif}" +
    ".a11y-panel h2{font-size:.78rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#dcb877;margin:0 0 12px;font-family:inherit}" +
    ".a11y-panel button{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;margin:0 0 8px;padding:11px 13px;background:transparent;border:1px solid rgba(236,229,216,.35);color:#ece5d8;font-size:.9rem;font-family:inherit;cursor:pointer;text-align:left;min-height:44px}" +
    ".a11y-panel button:hover{border-color:#dcb877;color:#ffdf9e}" +
    ".a11y-panel button[aria-pressed=true]{background:#c9a25e;border-color:#c9a25e;color:#14100a;font-weight:600}" +
    ".a11y-panel button:focus-visible{outline:3px solid #ffd27a;outline-offset:2px}" +
    ".a11y-panel .a11y-state{font-size:.75rem;opacity:.85;white-space:nowrap}" +
    ".a11y-panel .a11y-reset{justify-content:center;border-style:dashed;margin-top:4px}" +
    ".a11y-panel a{color:#dcb877;font-size:.78rem}" +
    ".a11y-panel p{margin:10px 0 0;font-size:.78rem;color:#bcb2a0}" +
    "@media (max-width:860px){.a11y-btn{bottom:calc(84px + env(safe-area-inset-bottom))}.a11y-panel{bottom:calc(148px + env(safe-area-inset-bottom))}}" +
    "@media (prefers-reduced-motion:reduce){.a11y-btn,.a11y-panel{transition:none}}";

  /* ---- state ---- */
  var defaults = { text: 0, contrast: false, underline: false, sans: false, motion: false, focus: false };
  var state;
  try { state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(STORE) || "{}")); }
  catch (e) { state = Object.assign({}, defaults); }

  function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} }

  function apply() {
    root.classList.toggle("a11y-text-1", state.text === 1);
    root.classList.toggle("a11y-text-2", state.text === 2);
    root.classList.toggle("a11y-contrast", !!state.contrast);
    root.classList.toggle("a11y-underline", !!state.underline);
    root.classList.toggle("a11y-sans", !!state.sans);
    root.classList.toggle("a11y-no-motion", !!state.motion);
    root.classList.toggle("a11y-focus", !!state.focus);
  }

  /* ---- inject styles + apply saved prefs ASAP ---- */
  var style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);
  apply();

  /* ---- build UI ---- */
  var TEXT_LABELS = ["Normal", "Large", "Larger"];

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "a11y-btn";
  btn.setAttribute("aria-label", "Accessibility options");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "a11y-panel");
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 5h-6.2l-.4 4.8 3.4 8.1a1 1 0 0 1-1.84.78L13 14.5h-2l-2.96 6.18a1 1 0 0 1-1.84-.78l3.4-8.1L9.2 7H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z" transform="translate(0 1.5) scale(.92)"/></svg>';

  var panel = document.createElement("div");
  panel.className = "a11y-panel";
  panel.id = "a11y-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Accessibility options");
  panel.hidden = true;

  function row(id, label, stateText) {
    return '<button type="button" data-a11y="' + id + '" aria-pressed="false"><span>' + label + "</span>" +
      (stateText ? '<span class="a11y-state" data-state="' + id + '">' + stateText + "</span>" : "") +
      "</button>";
  }

  panel.innerHTML =
    "<h2>Accessibility</h2>" +
    row("text", "Text size", TEXT_LABELS[0]) +
    row("contrast", "High contrast") +
    row("underline", "Underline links") +
    row("sans", "Readable font") +
    row("motion", "Pause animations") +
    row("focus", "Strong focus outlines") +
    '<button type="button" class="a11y-reset" data-a11y="reset">Reset all</button>' +
    '<p>Preferences are saved on this device only. See our <a href="/accessibility.html">Accessibility Statement</a>.</p>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  function syncUI() {
    panel.querySelectorAll("[data-a11y]").forEach(function (b) {
      var k = b.getAttribute("data-a11y");
      if (k === "reset") return;
      if (k === "text") {
        b.setAttribute("aria-pressed", state.text > 0 ? "true" : "false");
        var s = panel.querySelector('[data-state="text"]');
        if (s) s.textContent = TEXT_LABELS[state.text];
      } else {
        b.setAttribute("aria-pressed", state[k] ? "true" : "false");
      }
    });
  }

  function openPanel() {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    var first = panel.querySelector("button");
    if (first) first.focus();
  }
  function closePanel(refocus) {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    if (refocus) btn.focus();
  }

  btn.addEventListener("click", function () {
    panel.hidden ? openPanel() : closePanel(true);
  });

  panel.addEventListener("click", function (e) {
    var b = e.target.closest("[data-a11y]");
    if (!b) return;
    var k = b.getAttribute("data-a11y");
    if (k === "reset") { state = Object.assign({}, defaults); }
    else if (k === "text") { state.text = (state.text + 1) % 3; }
    else { state[k] = !state[k]; }
    apply(); save(); syncUI();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) closePanel(true);
  });
  document.addEventListener("click", function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) closePanel(false);
  });

  syncUI();
})();
