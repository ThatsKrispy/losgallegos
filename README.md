# Los Gallegos Restaurant — Website

Modern static rebuild of LosGallegosMiami.com. Pure HTML/CSS/JS, no build step, ready for Cloudflare Pages.

## Structure

```
index.html            Single-page site (hero, about, menu, gallery, visit, footer)
privacy.html          Privacy Policy + Terms
404.html              Custom not-found page
css/styles.css        Design system + responsive styles
js/main.js            Nav, menu filter, scroll reveal, hours highlight (vanilla, no deps)
assets/img/           Optimized WebP photos (real client photos) + favicons + og image
robots.txt            Crawl directives
sitemap.xml           XML sitemap
site.webmanifest      PWA manifest
_headers              Cloudflare Pages caching + security headers
```

Original full-resolution photos and unused photo alternates are preserved in the
sibling folder `losgallegos-source-photos/` (not part of the deployed site).

## Preview locally

Root-relative paths (`/css/...`) need a server, not `file://`. From this folder:

```
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Cloudflare Pages (via GitHub)

1. Create a new GitHub repo and push the contents of THIS folder to it (commands below).
2. In Cloudflare dash → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`  (the repo root — files are already static)
4. Deploy. Then add the custom domain `losgallegosmiami.com` under the project's **Custom domains** tab.

No build step is required — Cloudflare serves the files as-is. `_headers` is applied automatically.

## Changelog

### v7.0 — "La Mesa Dorada" elegant fine-dining redesign (July 2026)
- Full pivot to a dark, elegant, photo-led fine-dining direction: warm near-black canvas (#100e0c), champagne-gold hairline accents, generous whitespace, and a calm, premium rhythm. Removed the v6 playful concept (roulette, marquee, greca ribbons, script accents).
- Typography: **Cormorant Garamond** (400/400-italic/500/600) for display + statements, letter-spaced small-caps system sans for UI. The four faces are subsetted (~13 KB each) and inlined as data URIs in the stylesheet — **zero third-party requests, zero extra font requests**.
- New flow: full-screen cinematic hero (dining room, slow settle-zoom, scroll hint) → serif philosophy statement → **Los Platos** editorial signature-dish features (I/II/III, alternating photo/text) → **La Carta** 22-dish filterable grid (minimal cards: photo, gold course tag, serif name, hairline) → wine-toast interlude quote → **Nuestra Casa** family story → **El Comedor** gallery → serif phone-number reserve band → visit/hours cards → footer.
- Preserved all foundations: facts/contact/hours unchanged, one H1, meta/canonical/OG/Twitter + Restaurant JSON-LD, SEO image names, skip link + focus states + semantic landmarks + accessibility.html, cookie consent (essential-only until opt-in), mobile call bar, reduced-motion support.
- Updated 404/privacy/accessibility pages, manifest + theme-color to the new palette; cache version bumped to `?v=7`.
- Verified in a headless browser (desktop 1440 + mobile 390): valid HTML + JSON-LD, one H1, every image/font reference resolves, filter + consent + mobile nav work, no horizontal overflow, no console errors.

### v6.0 — "¡Fiesta!" playful concept + Dish Roulette (July 2026)
- Fresh, fun creative direction: a Spanish-azulejo palette (cobalt blue, terracotta, saffron on cream), bold display type with Georgia-italic Spanish accents (¡Vamos a comer!), a "sol" glow, a cobalt marquee, and hand-built greca (zig-zag tile) ribbons — all in pure CSS.
- **New interactive centerpiece — Dish Roulette** ("¿Qué comemos hoy?"): a spinning "paella pan" that reels through featured dishes and lands on a suggestion with a call-to-order prompt. Fully accessible — keyboard-operable button, `aria-live` announcement, and reduced-motion users get an instant pick instead of the reel (no flashing). Dish name/tag render in a caption below the pan so long names never clip.
- Media throughout: kinetic hero, marquee, roulette, 22-dish filterable menu, full-bleed feature, ambiance gallery.
- Preserved all v5 foundations: SEO image names (Miami, FL), semantic ADA markup + focus states + skip link + accessibility.html, cookie consent (essential-only until opt-in), system fonts (no third-party), and the cache-busting fix.
- Cache version bumped to `?v=6` on css/js; manifest/theme recolored to cobalt.
- Verified in a headless browser (desktop 1440 + mobile 390): valid HTML + JSON-LD + JS, one H1, every image reference (incl. all roulette images) resolves, filter + spin + consent work, no horizontal overflow.

### v5.0 — "Clean Modern" ground-up rebuild (July 2026)
- Brand-new, from-scratch iteration: a clean, modern, editorial layout — warm off-white canvas, deep Spanish wine-red (#9e2b25) accent with sparing gold, Georgia serif display + system sans body. Light, airy, lots of whitespace; mobile-first.
- **Zero third-party requests:** dropped Google Fonts in favor of a self-contained system/serif font stack. Faster, privacy-friendly, and it means no external provider is contacted before consent.
- **Cookie consent:** accessible consent banner (role="dialog", keyboard-operable) that stores the choice in localStorage and only loads optional analytics after opt-in — non-essential scripts never run before consent. New Cookie Policy section in `privacy.html`.
- **ADA / accessibility:** semantic landmarks, one H1 + ordered headings, skip link, visible focus outlines, `aria-*` on nav/filter/consent, descriptive alt text, AA-minded contrast, reduced-motion support, and a dedicated `accessibility.html` statement. (Built-in accessibility rather than an overlay widget, per best practice.)
- **SEO image rename:** all 31 photos + the OG image renamed keyword-first with location, e.g. `paella-valenciana-los-gallegos-miami-florida.webp`, `los-gallegos-storefront-bird-road-miami-florida.webp`. "Miami, FL / Florida" woven naturally through titles, meta, headings, and alt text.
- Media used throughout: full-bleed hero, info strip, about split, 22-dish filterable menu grid, full-bleed feature banner, ambiance gallery, and CTA.
- New pages/links: `accessibility.html`; footer now links Privacy, Cookie Policy, Terms, and Accessibility. Updated `404.html`, `site.webmanifest` (new colors), and `sitemap.xml`.
- Verified in a headless browser (desktop + mobile): every renamed image reference resolves, valid HTML + JSON-LD, one H1, all images carry alt text, filter + consent work, no horizontal overflow.

### v4.0 — "Fiesta" vibrant, media-rich redesign (July 2026)
- Full pivot to a dramatic, exciting, vibrant look: warm cream canvas with a bold Spanish palette (garnet red #c01f2b, saffron/marigold #f4a613, terracotta) and heavy Fraunces display type. Sections alternate cream, full-bleed photo bands, and a saturated garnet color band for rhythm and energy.
- Media-forward: a two-row auto-scrolling **photo marquee** (16 dishes), the **La Mesa** grid now uses a fixed-row masonry with a big paella hero + wide feature tiles and vibrant course tags (22 dishes, filterable), plus the ambiance gallery and full-bleed interludes. Nearly every client photo is used, several more than once.
- Fixed the v3 mobile bug: dish tiles had a black void while lazy images loaded. Now tiles use a warm saffron→terracotta placeholder (never black), fixed row heights, and a global `figure` margin reset — verified full-bleed with no gaps and no horizontal overflow on 390px mobile.
- Motion: hero slow-zoom, marquee, hover lifts/zooms, staggered reveals — all reduced-motion safe.
- Preserved: all facts, contact info, hours, single H1, meta/canonical/OG/Twitter, Restaurant JSON-LD, accessibility patterns (skip link, focus-visible, semantic HTML, alt text, keyboard nav, reduced-motion), Cloudflare deploy setup, every real photo.
- Verified in a headless browser (desktop 1440px + mobile 390px): valid HTML + JSON-LD, balanced CSS, one H1, all 31 images carry alt text, dish grid packs cleanly, filter works, no horizontal overflow, mobile call bar and clickable tel: links intact.

### v3.0 — "Mesa" refined redesign (July 2026)
- Full visual remix toward quiet elegance: restrained deep warm-black canvas, muted saffron gold used as a fine accent (hairlines, small caps) rather than heavy gradients. Type moved to Cormorant Garamond (elegant high-contrast serif) + Inter, at lighter weights with more whitespace and a calmer rhythm.
- New centerpiece — **La Mesa**, an immersive image-led dish gallery: a dense photo mosaic featuring 22 real dishes, names only (course kicker + dish name on hover/caption), with a course filter (Everything / Tapas / Arroces / Del Mar / A la Parrilla / Postres) that highlights matches in place. Experience over exact detail — no prices, no long descriptions.
- Motion dialed back and reduced-motion safe: gentle fade-up reveals, subtle image hover-zoom, sticky header blur. Removed the marquee, parallax, scroll-progress bar, and animated counters from v2.
- New flow: cinematic hero → short story statement → La Mesa mosaic → "made by hand" interlude → family-table story → The Room (ambiance) → reserve CTA → visit/hours.
- Preserved: all content facts, contact info, hours, address, phone, single H1, meta/canonical/OG/Twitter, Restaurant JSON-LD, accessibility patterns (skip link, focus-visible, semantic HTML, alt text, keyboard nav, reduced-motion), Cloudflare deployment setup, and every real client photo. Total HTML+CSS+JS ≈ 52 KB.
- Verified: valid HTML + JSON-LD, balanced CSS, one H1, all 31 images carry alt text, all image refs resolve, all nav anchors resolve to section ids, clickable tel: links, mobile call bar, no horizontal overflow.

### v2.0 — Bold showcase redesign (July 2026)
- Complete visual redesign: bolder, image-forward, "showcase" feel while staying premium. v1 files preserved in `_backup-v1/`.
- Richer palette layered on the brand: deep warm-black backgrounds with saffron-gold gradient + Spanish garnet accents; gold-gradient headlines, eyebrows, and buttons.
- New/upgraded sections: kinetic hero (entrance animation + slow zoom + parallax), a scrolling Spanish-dish marquee, an expanded **Our Story / history** block told from verified facts only (family-run, Galician/Spanish roots, Bird Road — no invented dates or names), a **Signature Dishes** image-card grid, larger 8-image gallery, parallax interstitial + CTA band.
- Motion (all vanilla JS, reduced-motion safe): scroll progress bar, staggered scroll reveals, animated stat counters (4.5★, 140+ reviews), background parallax, hover zoom on gallery/cards.
- Preserved: all content facts, contact info, hours, SEO (single H1, meta, canonical, OG/Twitter, Restaurant JSON-LD), accessibility patterns, deployment setup, and every real client photo.
- Verified: valid HTML + JSON-LD, balanced CSS, one H1, all image refs resolve, all nav anchors resolve, clickable tel: links, no horizontal overflow rules intact. Total HTML+CSS+JS ≈ 68 KB.

### v1.0 — Full rebuild (June 2026)
- Rebuilt from scratch as a fast static site (previous site was a client-rendered JS app).
- Pulled and re-optimized all real client photos: 46 MB of source images → 4.4 MB of WebP, SEO-named (e.g. `los-gallegos-miami-paella-valenciana.webp`).
- New mobile-first, conversion-focused design: garnet/gold/charcoal palette built on the original brand color (#1B2024).
- Sections: hero with CTAs, family-story about block, filterable 21-item menu, photo gallery, reservation CTA band, visit/hours card.
- Rewrote all copy for clarity, warmth, and local Miami/Spanish-cuisine SEO. No invented claims.
- SEO: one H1, semantic headings, unique title + meta description, canonical, Open Graph/Twitter cards, Restaurant JSON-LD schema (address, geo, hours, cuisine), sitemap, robots.txt.
- Accessibility: skip link, semantic landmarks, labeled icons, visible focus states, keyboard-friendly nav, reduced-motion support, color contrast on dark/light sections.
- Performance: WebP, lazy-loaded below-fold images, hero preload, deferred JS, no frameworks, long-cache headers.
- Mobile: hamburger nav, sticky click-to-call + directions bar, no horizontal scroll.
- Added privacy/terms page, custom 404, favicons, PWA manifest.
