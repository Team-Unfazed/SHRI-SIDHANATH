# SEO

Target searches: "best / top real estate agent, agency, consultant, property
dealer in Panvel" and the same for New Panvel, Kharghar, Kamothe, Taloja, Ulwe.

## What the site does (on-page)

- **Title and description** (`index.html`) lead with those phrases and back
  "top-rated" with the visible 4.8 Google rating. `projects.html` targets
  "new projects / flats for sale in Panvel, Kharghar, Navi Mumbai".
- **Structured data:** `RealEstateAgent` (name, address, phone, hours,
  MahaRERA, areas served, services), `WebSite`, `FAQPage` and, on the projects
  page, an `ItemList` of projects.
- **Crawlable fallback:** `scripts/seo-fallback.js` writes services, areas,
  projects and FAQs into the HTML at build time from `src/data`, so crawlers
  that do not run JavaScript read the same content visitors see. Edit the
  data, never the fallback.
- **Share image:** `public/images/og/shri-sidhanath-panvel.jpg` (1200×630 JPG).
- `public/sitemap.xml` and `public/robots.txt`.

Keep the name, address and phone **identical** everywhere (site, Google, Justdial,
99acres, Facebook): consistent NAP is a local-ranking signal.

## What decides "top of Google in Panvel" (off-site, not code)

For "real estate agent in Panvel", Google mostly shows the **Map pack** first.
It ranks on the Google Business Profile far more than on the website:

1. **Google Business Profile:** primary category *Real estate agency*, secondary
   *Real estate consultant*. Website field set to the live URL. Weekly photos
   and posts. Services and products filled in.
2. **Reviews:** keep asking every closed client. Reply to every review. Recency
   and count both matter.
3. **Citations:** list on Justdial, Sulekha, 99acres, MagicBricks, Housing.com,
   NoBroker and the MahaRERA agent page, with the same NAP.
4. **Backlinks:** developer channel-partner pages, local news, society
   associations. A handful of real local links beats hundreds of directory ones.
5. **Search Console:** verify the domain, submit `sitemap.xml`, watch the
   queries report for "panvel" terms.

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
- The domain `www.shrisidhanath.com` is assumed in canonical and schema URLs.
  Change it everywhere if the live domain differs.
