# SEO

Target searches: "best / top real estate agent, agency, consultant, property
dealer in Panvel" and the same for New Panvel, Kharghar, Kamothe, Taloja, Ulwe
— then, in priority order, Raigad district and Navi Mumbai more broadly.

The live domain is **`shrisidhanath.com`** (confirmed by the owner 2026-10-03;
`shrisidhanath.in` is no longer registered/resolving as of 2026-10-06). Every
canonical, Open Graph and JSON-LD URL across the site uses `.com` — if that
ever changes, grep the repo for the old domain and fix every occurrence, the
same way it was fixed on 2026-10-06.

## What the site does (on-page)

- **Title and description** (`index.html`) lead with those phrases and back
  "top-rated" with the visible 4.8 Google rating. `projects.html` targets
  "new projects / flats for sale in Panvel, Kharghar, Navi Mumbai".
- **Location landing pages** (Panvel, Raigad, Navi Mumbai added 2026-10-06; **Kharghar added 2026-11-13**; **Kamothe added 2026-11-21**; **Kalamboli added 2026-11-22** — `real-estate-agent-kharghar.html`, targeting "real estate agent in Kharghar", 590/mo KD 0 in OpenSEO's Sep 2026 India data), one per priority area,
  linked from the homepage Locations cards and the footer (not the primary
  nav — reached by search, AI answers and those internal links):
  - `real-estate-agent-panvel.html` — New Panvel, Old Panvel, Kharghar,
    Kamothe, Kalamboli, Taloja, Ulwe.
  - `real-estate-agent-raigad.html` — Khopoli, Karjat, the Pen–Alibaug
    corridor; land and plotted development.
  - `real-estate-agent-navi-mumbai.html` — Kharghar, Ulwe and the Panvel node, plus Vashi, Nerul, Belapur.
  Each page's content lives in `src/data/content.js`'s `locationPages` array
  (edit there, not the JSX or the fallback); layout is the shared
  `src/pages/LocationPage.jsx`.
- **Structured data:** `RealEstateAgent` (name, address, phone, hours,
  MahaRERA, areas served, services), `WebSite`, `FAQPage` and, on the projects
  page, an `ItemList` of projects. Each location page additionally gets its
  own area-scoped `RealEstateAgent`, a `BreadcrumbList` and a `FAQPage`
  (see `scripts/seo-fallback.js`'s `locationSchema`).
- **Internal links (2026-11-16):** Search Console showed the Panvel and Navi
  Mumbai pages as "Discovered - currently not indexed" (Google knew the URLs
  but had never crawled them) while Raigad and Kharghar were indexed. Every
  location page's crawlable HTML now links to all its sibling location pages
  ("Also serving", mirroring `LocationPage.jsx`), and the homepage HTML carries
  an "Area guides" line linking all four (mirroring the footer). The
  `aggregateRating` JSON-LD was removed from the homepage and location pages:
  the 4.8 / review count are Google reviews, and Google's review-snippet rules
  do not allow marking up ratings collected on another site (and do not show
  self-serving LocalBusiness stars anyway). The rating stays visible as text.
- **Homepage title (2026-11-17):** "Real Estate Agents & Property Brokers in
  Panvel | Shri Sidhanath", description opening with the phone number. Search
  Console showed the plural and "contact number" phrasings ("real estate
  agents panvel", "panvel real estate agents contact number", "broker panvel")
  earning the homepage's impressions with zero clicks. The Panvel page keeps
  the singular "Real Estate Agent & Property Broker in Panvel".
- **IndexNow (2026-11-17):** `public/aed531e9c00e40249eb56514efd4fa2d.txt` is
  the IndexNow key (created through OpenSEO). It lets us tell Bing, which
  ChatGPT search reads, that a page changed. Do not delete or rename it; after
  a deploy, submit changed URLs through OpenSEO's `submit_indexnow_urls`.
  Google does not use IndexNow.
- **Navi Mumbai page + "property dealer" (2026-11-18):** the Navi Mumbai page
  title was 86 characters (cut off in Google) and led with Vashi, Nerul and
  Belapur, the nodes covered only on an advisory basis. New title "Real Estate
  Agent & Property Consultant in Navi Mumbai | Shri Sidhanath"; H1 and
  description now lead with Kharghar, Kamothe, Ulwe and the Panvel node where
  coverage is deepest. "Property dealer" (a tracked Panvel / Navi Mumbai search
  phrase, position ~19 for "property dealers in panvel") was only in an HTML
  comment; it now appears in the Panvel and Navi Mumbai descriptions and the
  Panvel intro. Both descriptions put the phone number before Google's snippet
  cut-off. llms.txt review count synced to 149 (it still said 150).
- **New Panvel West / Khanda Colony (2026-11-20):** Search Console showed the
  homepage for "property in khanda colony" (pos 5.5), "new panvel real estate
  agents" (6.6) and "real estate agents in new panvel" (11.7), but no page
  named Khanda Colony. The homepage New Panvel card now says "New Panvel
  West"; the Panvel page's New Panvel submarket covers East and West,
  including Khanda Colony.
- **Kamothe page (2026-11-21):** `real-estate-agent-kamothe.html`, targeting
  "real estate agent in kamothe" (260/mo, KD 0 in OpenSEO's Sep 2026 India
  data). Search Console (3 months) already showed the homepage for "real estate
  agents in kamothe" (position 15.6) and "kamothe broker contact number" (33)
  with no page about Kamothe. Content is resale, rentals and shops (the work
  the business actually does there; no Kamothe projects are marketed). Same
  day: Google indexed the Panvel and Navi Mumbai pages (crawled 20 Nov
  evening, after the deploy), so all six earlier pages are now indexed.
- **Kalamboli page (2026-11-22):** `real-estate-agent-kalamboli.html`.
  Search Console (3 months) showed the homepage for "kalamboli real estate
  agents" (8 impressions, position 17.1; 4 impressions at 17.8 in 8-22 Nov)
  and "real estate agents in kalamboli", with no Kalamboli page. Monthly
  search volume could NOT be checked (OpenSEO credits exhausted) — the
  evidence is first-party impressions only. Content is resale, rentals and
  shops/commercial frontage (what the Panvel page already says the desk does
  in Kalamboli); no Kalamboli projects are claimed. Built on top of the
  unmerged Kamothe commit, so merging this branch publishes both.
- **Deployment (2026-11-20):** the live site deploys from
  `Team-Unfazed/SHRI-SIDHANATH` `main` (Vercel repo connection switched by the
  owner on 2026-11-20). A push to `main` is what triggers a deploy.
- **Crawlable fallback:** `scripts/seo-fallback.js` writes services, areas,
  projects and FAQs into the HTML at build time from `src/data`, so crawlers
  that do not run JavaScript read the same content visitors see. Edit the
  data, never the fallback. The same mechanism now also generates each
  location page's fallback content and schema.
- **AEO/GEO:** `public/llms.txt` summarizes the business for AI agents/answer
  engines. `public/robots.txt` explicitly allows GPTBot, OAI-SearchBot,
  ChatGPT-User, Google-Extended, PerplexityBot and ClaudeBot (on top of the
  default `Allow: /`, so this is belt-and-suspenders, not a behavior change).
  FAQ answers across the site (`src/data/content.js`) are written as direct,
  specific, snippet-ready answers — the kind an AI Overview or ChatGPT quotes
  verbatim — rather than vague marketing copy.
- **Share image:** `public/images/og/shri-sidhanath-panvel.jpg` (1200×630 JPG).
- `public/sitemap.xml` and `public/robots.txt`.

Keep the name, address and phone **identical** everywhere (site, Google, Justdial,
99acres, Facebook): consistent NAP is a local-ranking signal. **As of
2026-10-06 the live Google Business Profile does not match the site** on
phone number and address locality — see `docs/GBP-CHECKLIST.md` section 1,
confirmed with the owner, fix pending on the GBP side.

## What decides "top of Google in Panvel" (off-site, not code)

For "real estate agent in Panvel", Google mostly shows the **Map pack** first.
It ranks on the Google Business Profile far more than on the website:

1. **Google Business Profile:** primary category *Real estate agency*, secondary
   *Real estate consultant*. Website field set to the live URL. Weekly photos
   and posts. Services and products filled in. See `docs/GBP-CHECKLIST.md`
   for the full, current-as-of-2026-10-06 checklist, including a NAP mismatch
   that needs fixing and ready-to-post drafts.
2. **Reviews:** keep asking every closed client. Reply to every review. Recency
   and count both matter.
3. **Citations:** list on Justdial, Sulekha, 99acres, MagicBricks, Housing.com,
   NoBroker and the MahaRERA agent page, with the same NAP.
4. **Backlinks:** developer channel-partner pages, local news, society
   associations. A handful of real local links beats hundreds of directory ones.
5. **Search Console:** verify the domain, submit `sitemap.xml`, watch the
   queries report for "panvel" terms. Once the `.com` canonical fix is live,
   use URL Inspection to request indexing on the homepage and the three new
   location pages — that's a manual, one-time nudge, not something a code
   change can trigger.

## Honest expectation

No code change guarantees the #1 position. The on-page work makes the site
eligible and clear; the Business Profile, reviews and links decide the order.
Expect movement over weeks to months, not days.

## Still to fix before launch

- 7 project images are Google-sourced placeholders (`npm run check:assets`).
- Symphony (Kharghar) has no image: two projects share the name, confirm
  which one with the client.
- Passcode Great Guarantee is listed at Wadala, but its banner says Mulund.
  Confirm the location with the client.
