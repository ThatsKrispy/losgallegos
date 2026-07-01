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
