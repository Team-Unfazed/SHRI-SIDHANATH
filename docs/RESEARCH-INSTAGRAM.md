# Instagram Research — @shrisidhanath.estate

Researched via an authenticated Claude-in-Chrome session on 2026-09-12.
All 86 grid posts were loaded and their captions read. Nothing below is invented;
anything not directly supported by a post is marked **TO BE VERIFIED**.

## Account facts (directly from the profile)

| Field | Value |
|---|---|
| Handle | `@shrisidhanath.estate` |
| Display name | SHRI SIDDHANATH ESTATE *(note: profile spells it "SIDDHANATH"; the brief uses "SIDHANATH" — site uses the brief's spelling)* |
| Category | Real Estate Service |
| Proprietor | **RAVI SARGAR** |
| Contact in bio | 9820759348 |
| Second number seen across creatives | 9820755382 — **TO BE VERIFIED** as an official line |
| Location in bio | Panvel 410206 |
| Posts / followers | 86 / 123 |
| Linked site | `www.shrisidhanath.in` — **does not resolve** (checked; also `shrisidhanath.com` does not resolve) |

## Story highlights (these are the projects they actively market)
DELTA PRESTIGE · HIRANANDANI · ESTRELLA · RAHEJA · HOABL · MERAKI

## Projects evidenced in posts

| Project | Location | Category | Developer | Detail found in post | Confidence |
|---|---|---|---|---|---|
| Delta Prestige | New Panvel, Sector 17, Plot No. 25 | Residential | Delta Group | "Launching a New Address in Panvel"; Premium 2BHK & 3BHK; 2BHK usable carpet 826 sqft; 3BHK usable carpet 1108 & 1137 sqft; tailor-made combinations up to 5BHK | High |
| Hiranandani Fortune City | Panvel | Residential | Hiranandani Communities | 2BHK balcony homes ₹1.25 Cr* all-inclusive; 3BHK ₹1.65 Cr* all-inclusive; "Just pay ₹21,999 per month*" | High |
| Godrej City Panvel | Panvel | Residential | Godrej Properties | Sub-phases seen: "The Highlands", "Pavilion at The Highlands" (2 & 3 BHK from ₹74.99 Lakh**), "Aerophase" | High |
| Sai World Empire | Sector 36, opp. CIDCO Valleyshilp, nr Swapnapoorti, Kharghar | Residential | **TO BE VERIFIED** (Paradise Group per market knowledge — not stated in post) | Location stated verbatim in caption | High (project) / Low (developer) |
| Meraki | Panvel | Residential | **TO BE VERIFIED** | 1BHK from ₹40 Lakh*, 2BHK from ₹67 Lakh*; 45+ amenities; "No EMI for 18 months" | High |
| Emporia Hillcrest | Panvel | Residential | Emporia World | 1BHK ₹42 Lac*+tax, 2BHK ₹63 Lac*+tax | High |
| Lunaris (Raheja District) | **TO BE VERIFIED** | Residential | Raheja | 2BHK Optima ₹1.10 Cr++, 2BHK Premium ₹1.49 Cr++ | Medium |
| Aero **State** T3 | Khopoli, Raigad | Residential | **TO BE VERIFIED** | ₹55.99 Lakh all-inclusive / ₹1.17 Crore all-inclusive | Medium. **Name corrected:** read as "Aero Estate" off a low-resolution Instagram creative; the client-supplied campaign image (`raigad.png`) clearly reads AERO STATE T3. |
| Adhiraj (Kharghar) | Kharghar | Residential | Adhiraj Constructions | Creative reads "The Tallest Skyscrapers of Navi Mumbai" — exact project name **TO BE VERIFIED** | Medium |
| Lodha Villa Royale | **TO BE VERIFIED** | Residential | Lodha | Creatives carry a "LODHA PREFERRED PARTNER" badge — **TO BE VERIFIED**, do not claim on site | Medium |
| Symphony, Kharghar | Kharghar | Residential | **TO BE VERIFIED** | Amenity footage (fitness centre) | Medium |
| Paradise Mall | **TO BE VERIFIED** | Commercial / Retail | **TO BE VERIFIED** | Named in a caption | Low |
| HOABL — "Peace of Land" | **TO BE VERIFIED** | Land / Plots | The House of Abhinandan Lodha | Land-product creative: transparency / buy-back / legal-assistance promises | Medium |
| Siddha \| Sejal — Passcode Great Guarantee | Wadala, Mumbai | Residential | Siddha Group / Sejal | 1, 2 & 3 bed homes | Medium |
| Wadhwa (tower) | **TO BE VERIFIED** | Residential | The Wadhwa Group | "modern residential tower featuring premium 1 BHK and 2 BHK homes" | Medium |
| Marathon Realty | **TO BE VERIFIED** | Residential | Marathon Group | "we have launched a new tower at…" — project name not captured | Low |
| Satyam Developers (R. Gulati Group) | — | — | Satyam Developers | Brand appears in a post | Low |
| Estrella | **TO BE VERIFIED** | **TO BE VERIFIED** | — | Story highlight only | Low |

Also posted: Navi Mumbai International Airport (NMIA) infrastructure content, and Emaar /
Dubai Hills Estate reposts. The Dubai content is aspirational reposting, **not** inventory
they market — deliberately excluded from the site.

## Areas they state they cover (verbatim from a caption)
New Panvel | Panvel | Kharghar | Kamothe | Kalamboli | Taloja | Ulwe | Navi Mumbai
(The brief additionally lists Mumbai, Thane, Raigad and Pune. Khopoli is in Raigad.)

## Credibility signals found
- A post captioned "One more achievement award added" — **the specific award is not named. TO BE VERIFIED.**
- A photograph of the proprietor receiving a certificate at a Hiranandani Communities
  event. Supports "recognised by developers"; does **not** establish a formal partnership.
- Creatives carry a "Lodha Preferred Partner" badge — **TO BE VERIFIED** before any public claim.

**Because of this, the site never uses the words "official / authorised / exclusive partner".
The developer section is titled "Projects We Market".**

## Imagery — why none was downloaded
The browser extension's privacy guard blocks reading image `src`/`srcset` values
(they carry signed query strings), so Instagram media could not be collected
programmatically. Two further reasons not to work around this:

1. The large majority of the grid is **developer-supplied ad creative** (Hiranandani,
   Godrej, Raheja price banners with phone numbers burned into the artwork). That is
   other companies' advertising, not Shri Sidhanath's own photography, and it would
   look wrong in an editorial layout.
2. Re-publishing those creatives on a client site is a rights question for the client,
   not something to decide here.

**What the site does instead:** every project tile is a designed typographic plate
carrying the real, verified project data, with the image slot already wired up. Dropping
an authorised photo into `public/images/portfolio/<category>/` and adding its filename to
the `image` field in `src/data/projects.js` turns the plate into a photographic tile with
no other change. See `docs/ASSETS.md`.
