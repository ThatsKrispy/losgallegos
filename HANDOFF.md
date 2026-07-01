# Project Handoff — Los Gallegos Miami Website Rebuild

Status as of June 30, 2026. This file lets a new conversation (or person) pick up cleanly.

## TL;DR
The website rebuild is **complete and QA'd**. It lives in this `losgallegos/` folder — a
fast, mobile-first static site ready for Cloudflare Pages. The only remaining work is
**git push to GitHub + connect Cloudflare Pages**, which the client (Andy) must do himself
because that requires authenticating with credentials.

## What's done
- Pulled all real client photos from the ThatsKrispy Firebase bucket (`thatskrispy-projects`,
  prefix `LosGallegos/`). 46 MB of originals → 4.5 MB of optimized, SEO-named WebP.
- Built a modern single-page static site: hero, family-story About, filterable 21-dish menu,
  photo gallery, reservation CTA band, visit/hours card, footer.
- Rewrote all copy (warm, conversion-focused, local Miami/Spanish SEO). No invented claims.
- SEO: one H1, semantic headings, unique title/meta, canonical, OG/Twitter cards,
  Restaurant JSON-LD (address, geo, hours, cuisine), sitemap.xml, robots.txt.
- Accessibility: skip link, landmarks, labeled icons, focus states, reduced-motion, contrast.
- Performance: WebP, lazy-load below-fold, hero preload, deferred vanilla JS, no frameworks,
  long-cache `_headers`.
- Extras: privacy.html (+terms), 404.html, favicons, PWA manifest.
- All validation passed: 1 H1, valid JSON-LD, no broken image refs, balanced HTML, CSS braces OK.

## File map
```
index.html · privacy.html · 404.html
css/styles.css · js/main.js
assets/img/  (31 WebP + 5 favicons + og-image.jpg)
robots.txt · sitemap.xml · site.webmanifest · _headers · .gitignore
README.md  (deploy guide + changelog)
CLIENT-NOTES.md  (items needing client confirmation — READ THIS)
HANDOFF.md  (this file)
```
Full-res originals + unused photo alternates preserved in sibling folder
`losgallegos-source-photos/` (NOT part of the deployed site).

## ⚠️ Known issue: leftover .git
A previous attempt to `git init` from inside this mounted folder left a **broken, half-formed
`.git/` directory** that could not be removed from the agent side (mount blocks git lock files).
**The user must run `rm -rf .git` on their own machine before initializing git.** It is harmless
but will jam git commands until deleted.

## ⚠️ Security: exposed token
Andy pasted a GitHub Personal Access Token (`ghp_…`) in plaintext in chat **three times**.
It is compromised and **must be revoked** (GitHub → Settings → Developer settings → Personal
access tokens). A fresh token should be generated for any push. The agent correctly declined to
use it — authenticating with credentials is a boundary the agent will not cross, even when asked.

## What's left (USER actions — agent cannot do these)
1. Revoke the exposed token; generate a fresh one.
2. Create an EMPTY GitHub repo (no README/.gitignore — this folder already has both).
3. Push, from inside the `losgallegos` folder:
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "v1.0 — full modern rebuild of Los Gallegos Miami"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main   # paste FRESH token when prompted for password
   ```
   Easiest alternative: GitHub Desktop (drag folder in → Create repository → Publish).
4. Cloudflare Pages → Connect to Git → repo → preset **None**, build command blank,
   output dir `/` → Deploy → add custom domain `losgallegosmiami.com`.

## Open items for the client (from CLIENT-NOTES.md)
- Menu **prices** — none public; menu shows "call for prices." Layout has a price slot ready.
- **Friday hours** conflict — used 11:30am–11:00pm (Yelp/Restaurantji majority); NetWaiter said closed. Confirm.
- Real **Facebook/Instagram** URLs — footer currently points to generic homepages.
- Online **reservation/ordering** link — CTAs are click-to-call now; swap in a system link if any.
- Confirm production **domain** if not `losgallegosmiami.com`.

## Verified business facts (safe to reuse)
- 6549 Bird Rd, Miami, FL 33155 · (305) 661-3040 · tel:+13056613040
- Spanish/tapas/seafood, $$, family-run · ~4.5★, 140+ reviews
- Reservations yes · takeout yes · beer & wine · private lot · cards accepted
- Coordinates: 25.7336979, -80.3020554
- Brand color (from original site): #1B2024; rebuild palette adds garnet #8E2A2B + gold #C8962E.

## To preview locally
Root-relative paths need a server: `python3 -m http.server 8080` from this folder, open http://localhost:8080
