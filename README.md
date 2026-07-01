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
