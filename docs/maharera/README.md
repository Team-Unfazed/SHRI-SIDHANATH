# MahaRERA import — 5 October 2026

All 25 supplied input rows were processed as 17 unique registration numbers. Eight repeated entries reuse the same records. All 17 were found and integrated into the existing `/projects.html` catalog; the original 12 projects are unchanged (29 total).

## Imported projects

All entries appear in MahaRERA's **Registered Projects** search. Construction status is unavailable and is stored as `null`; “Registered” is a registry classification, not a construction/completion claim.

| Project | Registration number | Promoter |
|---|---|---|
| KANAKIA VALLEY | PR1271012600320 | KANAKIA TRANSPARENT DEVELOPERS PRIVATE LIMITED |
| Rainbow Life | P52000078843 | Ellora Heritage LLP |
| Sai Residency | P52000054611 | Saiyogi Developers LLP |
| Tricity Aspire | P52000055992 | Tricity Realty LLP |
| L&T REALTY CRESTORIA ESTATE T1 | PR1270002502927 | Larsen & Toubro Ltd. (Realty Division) |
| L&T REALTY CRESTORIA ESTATE T2 | PR1270002502892 | Larsen & Toubro Ltd. (Realty Division) |
| L&T REALTY CRESTORIA ESTATE T3 | PR1270002502891 | Larsen & Toubro Ltd. (Realty Division) |
| L&T REALTY CRESTORIA ESTATE T4 | PR1270002502890 | Larsen & Toubro Ltd. (Realty Division) |
| L&T REALTY CRESTORIA ESTATE T5 | PR1270002502889 | Larsen & Toubro Ltd. (Realty Division) |
| Jasmine | P52000055578 | Persipina Developers Private Limited |
| Orchid | P52000050193 | Persipina Developers Private Limited |
| Iris | P52000050194 | Persipina Developers Private Limited |
| Aster | P52000055662 | Persipina Developers Private Limited |
| Zenia | P52000055661 | Persipina Developers Private Limited |
| Grandstand | PR1270002501603 | Persipina Developers Private Limited |
| Atheletica | PR1270002501610 | Persipina Developers Private Limited |
| Pavilion | PR1270002501589 | Persipina Developers Private Limited |

## Source and unavailable fields

Authoritative source: https://www.maharera.maharashtra.gov.in/projects-search-result

Each adjacent `<RERA>.html` file retains the exact official search-result excerpt and retrieval timestamp. Each imported project retains the exact public project URL returned by that result. `requested.json` preserves input order and repetitions; `checklist.json` tracks every input row through verification.

No missing registrations. Search sometimes returned transient “No Records Found”; bounded retries recovered exact matches for every requested number.

Full project-detail applications require CAPTCHA verification. The application shell was opened for each project; the rendered public application was checked and displayed the CAPTCHA instead of full details. Its protected login/API was not bypassed. The separate public certificate mechanism returned no usable document.

Verified fields: registration number, project name, promoter, displayed location, district, state, pincode, last-modified date, and official detail URL. Preserve source spellings, including “Raigarh” and “Atheletica”. The search result does not label its location as a taluka, so `taluka` remains null. Last-modified date is not treated as registration date.

Unavailable: construction status, project type, registration/completion dates, full address, taluka, survey/CTS/plot details, buildings, units, configurations, amenities, descriptions, and project imagery. These remain null/empty and are hidden. Imported cards use the existing typographic image placeholder.

## Integration

- `src/data/maharera-projects.json`: static verified records, with field limitations and source references.
- `src/data/projects.js`: existing inventory plus idempotent merge by RERA number, ID, or matching project/promoter identity. Distinct registered phases remain distinct from broader marketed township entries.
- `src/components/ProjectCard.jsx`, `ProjectCard.css`, `ProjectRegistration.jsx`: existing card design with verified metadata and expandable RERA information/source links.
- `src/components/ProjectRing.jsx`, `ProjectRing.css`: registration number and wrapping in the existing carousel.
- `src/pages/ProjectsPage.jsx`, `ProjectsPage.css`: existing market filters plus case-insensitive search and empty state.
- `scripts/seo-fallback.js`: omit absent descriptions, include RERA references, avoid assigning an unverified residential type.
- `scripts/fetch-maharera.mjs`, `build-maharera-data.mjs`: explicit offline research/import tooling; never called on page load.
- `scripts/verify-maharera.mjs`: source, data, duplicates, listing, disclosure, search, carousel and responsive checks.
- `scripts/interact.mjs`: catalog-count expectation now follows the inventory.

There were no existing project-detail routes, so verified details are integrated into the existing catalog as accessible native disclosures. Existing enquiry links remain available. No database, dependencies, live scraping, unrelated redesign, or deployment was introduced.

## Verification

| Check | Result |
|---|---|
| Production build (`npm.cmd run build`) | PASS; existing >500 kB bundle warning remains |
| Listing | PASS: 29 cards, including all 17 imports |
| Project details | PASS for inline RERA disclosures and exact official links; no standalone detail routes existed |
| Responsive UI | PASS at 1440, 768 and 390 px |
| Duplicate protection | PASS: 17 distinct registrations, idempotent merge, 25 input rows accounted for |
| Existing inventory | PASS: original 12 records unchanged |
| Search / market filters | PASS |
| Source comparison | PASS for every populated imported field |
| Runtime MahaRERA requests | None |
| Existing homepage regression suite | FAIL at obsolete `.banner__card-name` selector after nine passing checks; that hero markup is absent in the pre-existing workspace changes |

No TypeScript or ESLint check is configured in this JavaScript repository. Screenshots are generated under the existing ignored `screenshots/maharera/` directory.

To verify again with the local server running: `node scripts/verify-maharera.mjs`. Set `TEST_URL` to test another local preview URL.
