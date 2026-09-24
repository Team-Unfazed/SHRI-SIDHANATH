# Research: Google Business Profile and Facebook

Collected 2026-09-12 via an authenticated Claude-in-Chrome session, after the
Instagram pass (see docs/RESEARCH-INSTAGRAM.md).

## Google Business Profile — the most valuable source found

| Field | Value |
|---|---|
| Name | Shri Sidhanath Constructions & Estate Consultant |
| Marathi | श्री सिद्धनाथ कंस्ट्रक्शन्स & एस्टेट कंसलटंट |
| Category | Real estate consultant |
| **Rating** | **4.8 from 145 reviews** |
| Hours | 09:00 to 22:00 |
| Address | Shop No 1, Siddhivinayak Krupa, Plot No 18, Sector 7, **Khanda Colony, Greater Khanda**, Panvel, Maharashtra 410206 |
| Phone | 098207 59348 |
| Website listed | shrisidhanath.com (does not resolve) |

### Why this matters for the site
1. **Testimonials exist.** `src/sections/Trust.jsx` currently states that the
   site carries no testimonials "because we would only publish ones we can
   evidence". With 145 reviews at 4.8, that copy is now wrong and should be
   replaced with the real rating, ideally linked to the Google listing.
2. **Opening hours exist** and are not in the brief. The final CTA block
   currently says only "Site visits arranged on weekdays and weekends."
3. **Awards are real.** The office interior photo shows trophies and plaques on
   the shelving, which corroborates the "One more achievement award added"
   Instagram post. The specific awards are still unnamed. **TO BE VERIFIED.**

### Address discrepancy — needs the client to confirm
Three different versions are in circulation:

| Source | Address |
|---|---|
| Brief | Office 1, Siddhivinayak Krupa CHS Ltd, Plot 18, Sector 7, **New Panvel West** |
| Facebook | Shop No. 1, Siddhivinayak krupa CHS LTD., Plot No. 18, Sector 7, **New Panvel (W)** |
| Google | Shop No 1, Siddhivinayak Krupa, Plot No 18, Sector 7, **Khanda Colony, Greater Khanda, Panvel** |

The site currently uses the brief's version. "Office 1" vs "Shop No 1" and
"New Panvel West" vs "Khanda Colony, Greater Khanda" should be settled before
launch, because this address also feeds the JSON-LD in index.html.

## Facebook

| Field | Value |
|---|---|
| Page name | Shri Sidhanath **Construction & Real Estate** (differs again from the other two) |
| Followers | 350 |
| Reviews | none ("Not yet rated") |
| Address | Shop No. 1, ... New Panvel (W) |
| Second phone seen | **9820755382** — appears across creatives and in post copy. TO BE VERIFIED as an official line. |

### Photo grid, 9 images, assessed
| # | Content | Usable |
|---|---|---|
| 0 | Brand logo card | marginal |
| 1 | Tower at sunset, "This Ganesh Chaturthi" greeting overlay | yes, if the greeting is cropped |
| 2 | Balcony / terrace render at night, Delta branding + price chips | yes, if chips cropped |
| 3 | Model in red couture, price chips | no, pure ad |
| 4 | 3-panel amenity renders (water feature, pergola, terrace) | **yes, clean** |
| 5 | Couple on sofa, price chips, amenity icons | no, pure ad |
| 6 | 3-panel amenity renders (rooftop, play area) | **yes, clean** |
| 7 | Tower exterior, price chips | yes, if chips cropped |
| 8 | 3-panel renders (tower, pool, aerial) | **yes, clean** |

All of it is **Delta Prestige** developer artwork. Delta Prestige is a project
the client genuinely markets (it is first in `src/data/projects.js`), so the
imagery is on-topic, but the artwork belongs to Delta, not to Shri Sidhanath.
**Confirm reuse rights with the client before publishing any of it.**

Prices in this artwork (2 BHK from ₹1.35 Cr, 3 BHK from ₹1.84 Cr) are **higher
than the Instagram figures** already in `projects.js`. Whichever is current
needs confirming before it goes on the site.

## Technique notes
- Chrome downloads are blocked in this environment. Both a cross-origin
  `<a download>` and a fetch-to-blob download fire silently and write nothing.
- What works: render the image at native size in the page, then capture with
  the screenshot tool's save-to-disk, then crop with ffmpeg.
- Google image URLs carry no query string and their `=w{n}-h{n}` size token can
  be rewritten (`=w2048`), so Google is the highest-fidelity source.
- Facebook signs its size parameters, so each photo must be opened in the
  viewer, which serves 1440x1799.
- **Both Google Maps and Instagram mix third-party content into the same DOM.**
  A bulk grab off Google returned a "Divine Homes" shopfront and a building
  from Chandigarh; a bulk grab off Instagram returned a stranger's personal
  photo. Every image must be eyeballed before it is kept. Nothing unverified
  was retained.
