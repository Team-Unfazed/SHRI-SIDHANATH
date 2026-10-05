# Google Business Profile checklist

Pulled from a live read of the real Google Business Profile via OpenSEO on 2026-10-06 (CID `14041933793012083293`, place ID `ChIJwSGLpwDp5zsRXeoJLGP43sI`). This is the single biggest lever for "top of Google in Panvel" — see `docs/SEO.md`'s honest expectation note. Nothing here can be done by editing the website; it all happens inside the Google Business Profile dashboard (business.google.com) or Google Maps, by whoever manages the listing.

## 1. Fix now — NAP mismatch

The live listing does not match the website on two fields. Mismatched NAP (Name/Address/Phone) data actively suppresses local ranking, and a wrong phone number may be costing real calls right now:

- **Phone**: GBP shows `+91 98207 55382`. The website (and WhatsApp, and every other channel) uses `+91 98207 59348`. **Confirmed with the owner on 2026-10-06 that `...59348` is correct** — update the GBP listing's phone field to match.
- **Address locality**: GBP shows "Shop No 1, Siddhivinayak Krupa Plot No 18, Sector 7 Khanda Colony, Greater Khanda, Panvel, Maharashtra 410206". The website uses "Office 1, Siddhivinayak Krupa CHS Ltd, Plot 18, Sector 7, New Panvel West, Navi Mumbai 410206". **Confirmed with the owner that "New Panvel West, Navi Mumbai" is the standard** — update GBP's address fields to match exactly (unit descriptor, street, and locality/city).

## 2. Category cleanup

Primary category is currently **"Real estate consultant"**. `docs/SEO.md`'s existing recommendation is primary *Real estate agency*, secondary *Real estate consultant* — consider swapping which is primary.

Additional categories currently attached: Cabin rental agency, Condominium rental agency, Corporate office, Industrial real estate agency, Office space rental agency, Real estate agency, Real estate agent, Real estate school. Several of these (Cabin rental agency, Real estate school, Corporate office) look unrelated to the actual business and may be diluting topical relevance for "real estate agent in Panvel" searches. Recommend keeping: Real estate agency, Real estate agent, Real estate consultant, Office space rental agency, Industrial real estate agency, Condominium rental agency (all genuinely match the services described below); drop Cabin rental agency, Corporate office and Real estate school unless there's a reason to keep them.

## 3. Facts verified live but under-used on the site

The GBP description confirms these and they're now reflected in the new location pages (`src/data/content.js`'s `locationPages`) — but consider surfacing them more on the homepage too:

- **Operating since 2004.** A genuine trust signal not currently stated anywhere on the website.
- **Also does construction and redevelopment consultancy** — row house and bungalow construction, interior work, redevelopment consultancy — not just brokering. The legal name (`Shri Sidhanath Constructions and Real Estate`) already hints at this but the site reads purely as a brokerage today.
- Review count is **150**, not 145 (last verified 2026-09-12). Already corrected across the site as part of this pass — keep re-checking periodically.

## 4. Review replies — one gap found

Of the last 20 reviews pulled, 19 have an owner reply. One does not: **Mahendra Dudhwadkar** (4★, "Real estate has very good service and great experience.") has no reply. Close that gap, and keep replying to every new review — recency and count both matter for ranking.

The two most recent replies (edited 2026-09, to Ahmed Nizar and Madhuri Rikame) are already doing the right thing SEO-wise: they restate specific service areas and services in natural language rather than a generic "thank you." Keep that pattern for future replies — it's free, Google-indexed, keyword-relevant content. Avoid the older boilerplate ("Thank you so much for your kind words... We count ourselves lucky for customers like you") on new replies; it reads as generic and adds no search value.

## 5. Posting cadence — 4 ready-to-use drafts

GBP posts expire after 7 days and recency is a ranking input. Aim for weekly. Draft posts below — edit the specifics (project name, price) before publishing, and attach a real photo each time, not a stock image:

1. **New listing**: "New listing in [Kharghar/Ulwe/etc.]: [BHK config] at [project/society name], [price range]. MahaRERA-registered deal, site visits available 9am–10pm. Call +91 98207 59348 or WhatsApp for details."
2. **Area expertise**: "Looking in [Panvel/Khopoli/Vashi]? We've worked this market since 2004 — resale flats, NA plots, rentals and new projects. Free shortlist, no obligation. Call +91 98207 59348."
3. **Process/trust**: "Every deal through our desk gets a title and OC (occupancy certificate) check before it reaches you — paperwork problems are harder to undo than a bad location. MahaRERA A52000004595."
4. **Review/milestone**: "Thank you to everyone who's left us a review — we're at 4.8★ from 150+ clients across Panvel, Navi Mumbai and Raigad. If we helped you find a home, a review helps the next family find us."

## 6. Other hygiene

- **Q&A section**: no visible Q&A activity on the listing. Seed it with 3-4 of the same questions already answered in the website FAQ (`src/data/content.js`) — Google lets the business post both the question and the first answer.
- **Photos**: 29 photos currently. Keep adding — office, team, signed-off deals (with client permission), the New Panvel street view. Weekly is the target cadence per `docs/SEO.md`.
- **Services list**: currently lists only "Floor Plans" and "We Serve Out Bound Meeting" (the second reads like a mis-translated category default). Replace/expand with actual services: Resale flats, Rental flats, New project sales, NA plots & land, Property management, Flat registration & stamp duty assistance, Leave & licence agreements, Property valuation.

## Off-site reminders (from `docs/SEO.md`, unchanged)

- Keep NAP identical across Justdial, Sulekha, 99acres, MagicBricks, Housing.com, NoBroker and the MahaRERA agent page — once the phone/address fix above lands, this is the list to re-check.
- Backlinks: developer channel-partner pages, local news, society associations beat directory links. A handful of real local links outweighs hundreds of directory listings.
