# Appleberry Farm: Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.appleberryfarm.com/ (Appleberry Farm, Marshalltown, Iowa; owned by the Mason family).
Preview: https://abf.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom build. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, the Blueprint WebStudio concept widget in `src/concept.jsx`, and **all season info in `src/season.js`**.

## Updating the season (the farm's main job on the site)

Everything that changes week to week lives in one small file, `src/season.js`:

- `hours`: open and close hour for each weekday (24-hour numbers, or `null` for closed).
- `openThrough` / `openThroughLabel`: the last open day. After that date the hours board switches to the `offSeason` message automatically.
- `inTheCooler`: the apples available right now. These are also highlighted in the variety crate.
- `notes`: dated farm notes, newest first. The newest one is shown as the big pinned note; older ones collapse under "Earlier notes".
- `quickFacts`: short lines kept for reuse (free admission, hayrides, food, carside service).

The hours board also shows a live "Open now / Opens today at / Closed for the day" badge computed in Central time.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `appleberry-farm` (framework: Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
Domain `abf.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional): `VITE_CONCEPT_END_DATE` (countdown end, defaults to 2026-11-30), `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` for the "Order a pie or ask a question" form (`api/contact.js`; without them the form answers in demo mode). The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## Design

- No logo file exists on the original (the Weebly header is plain text), so the wordmark is drawn from their roadside sign: a red apple with a green leaf over "The APPLEBERRY Farm", set in Lilita One with the sign's red. The apple is also the favicon. The sign photo itself leads the hero photo strip.
- Colors from the sign and the original site: apple red (#c62f2b, with their nav red #ec403c as the bright accent), leaf green, cream and a chalkboard green; the dark red of their "APPLEBERRY FARM" heading and the gingham from their honey photo.
- Fraunces (soft, slightly wonky serif) for headings, Nunito for body, Caveat as the hand-lettered chalkboard voice (it replaces their Architects Daughter).
- Farm-stand motif: red-and-white gingham strip, a scalloped awning under the header, a wood-framed chalkboard for today's hours, tilted polaroids of their own photos on a kraft table, a pinned sticky note for the latest news, a food-truck menu board with a striped awning, and the apple varieties shown as an apple crate.
- Section order: gingham strip → header → hero (headline, directions, address) with the "Today at the farm" chalkboard (open/closed badge, fall hours, open through Dec 19, apples in the cooler, call button) → polaroid strip → farm notes → things to do → Apple Wagon menu and store treats → 26 apple varieties → farm market and gift shop → the Mason family → visit (map, contact, order form) → footer.

## What changed from the current site

- Hours and news were long, dated text blocks pasted down the home page (with stray spacing and a 2025 winter note still showing in the fall). The concept moves hours to a chalkboard near the top with a live open/closed badge, and news to dated notes with the newest pinned, all fed from one editable file.
- The "Orchard Map" page has said "Coming Soon" for years and the footer still reads "COPYRIGHT © 2015". The empty page is gone (replaced by a real map and directions in the Visit section) and the footer year is current.
- Product info was a long unstyled list; the concept groups it into Pantry, Fresh produce, Garden and Farm fresh, and shows the 26 varieties as a crate with the ones in the cooler highlighted.
- Typos fixed: "Cheifton/Cheiftain" → Chieftain, "Honey Crisp" → Honeycrisp, "Mcintosh" → McIntosh, "Fal;l mums", "Cant".
- Phone, address, hours and directions are within the first scroll on desktop and phone; the phone number is in the top strip and header on every screen.
- Checked at 1280px and 390px with no sideways scrolling.

## Owner should confirm

- Fall hours (Mon–Thu 11–6, Fri–Sat 10–6, Sun 12–6) continue unchanged through December 19, 2026.
- Hayrides "during apple season" vs. "on weekends or by appointment": both phrases are on the site; the concept uses "weekends or by appointment".
- Off-season message: based on last winter's note (gift shop open year round, baked goods to order, call for an appointment). The text-message number 515-480-2502 from that note is not used on the page; confirm whether to add it.
- Whether chicks, ducklings and duck eggs are still offered (from the May 2026 note), and whether the 26-variety list is still current.
- Honey brands (Ebert, Rinehart, Dolezal), VanManen sweet corn, Door County coffee and gift certificates are still carried.
- The Facebook (facebook.com/appleberryfarmiowa) and Instagram (@appleberryfarms) links.
- The farm-note headlines (e.g. "Nearing the end of apple season") were added for scannability; the note text is theirs with typos fixed.
- Reviews: the original site has no testimonials, so the page only links to their Google listing.

## Photos

All photos are their own from appleberryfarm.com (orchard, sign, caramel apples, scarecrow, pumpkins, honey, produce, hanging baskets, and the Mason family photo from the About page). Several are small (about 400px wide), so higher-resolution originals should replace them before launch. The map is a Google Maps embed of the street address.
