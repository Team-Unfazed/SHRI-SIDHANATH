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
- **Three location landing pages**, added 2026-10-06, one per priority area,
  linked from the homepage Locations cards and the footer (not the primary
  nav — reached by search, AI answers and those internal links):
  - `real-estate-agent-panvel.html` — New Panvel, Old Panvel, Kharghar,
    Kamothe, Kalamboli, Taloja, Ulwe.
  - `real-estate-agent-raigad.html` — Khopoli, Karjat, the Pen–Alibaug
    corridor; land and plotted development.
  - `real-estate-agent-navi-mumbai.html` — Vashi, Nerul, Kharghar, Belapur.
  Each page's content lives in `src/data/content.js`'s `locationPages` array
  (edit there, not the JSX or the fallback); layout is the shared
  `src/pages/LocationPage.jsx`.
- **Structured data:** `RealEstateAgent` (name, address, phone, hours,
  MahaRERA, areas served, services), `WebSite`, `FAQPage` and, on the projects
  page, an `ItemList` of projects. Each location page additionally gets its
  own area-scoped `RealEstateAgent`, a `BreadcrumbList` and a `FAQPage`
  (see `scripts/seo-fallback.js`'s `locationSchema`).
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
