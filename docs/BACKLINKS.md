# Backlink acquisition plan — shrisidhanath.com

Scope: off-site link building for the MahaRERA-registered agency (reg.
A52000004595, est. 2004, owner Ravi Sargar) competing for "real estate
agent/agency/broker/consultant/property dealer" in Panvel, Navi Mumbai and
Raigad. Per `docs/SEO.md`: backlinks are priority #4 after GBP, reviews and
citations, and a handful of real local links (developer pages, local news,
associations) outweighs hundreds of generic directories. This file is additive
to the citation list already identified in `docs/SEO.md` (Justdial, Sulekha,
99acres, MagicBricks, Housing.com, NoBroker, MahaRERA agent page) — it does
not repeat that list except where a site doubles as a real backlink, not just
a citation.

## 1. Baseline backlink data (Tier 0 — Common Crawl only)

Credential check (`backlinks_auth.py --check`) confirmed **Tier 0**: no Moz
API key or Bing Webmaster key configured. Only Common Crawl (domain-level,
public, confidence 0.50) and the local verification crawler are available.

| Domain checked | Source | Result |
|---|---|---|
| `shrisidhanath.com` | Common Crawl web graph, release `cc-main-2026-jan-feb-mar` | **Not found** — `in_crawl: false`, no PageRank/harmonic-centrality data |
| `www.shrisidhanath.com` | same | Same result |

**Reading this correctly:** this is *not* a negative signal (no penalty, no
toxic links found) — it means the domain has too small/new a footprint to
have been picked up by Common Crawl's own crawl yet. That's consistent with
`docs/shri-sidhanath-website-deploy` history: the site was dead as recently as
mid-September 2026 and the current `.com` canonical only went live 6 Oct 2026.
A brand-new or recently-relaunched domain legitimately has ~zero external
link signal at this stage.

**No numeric Backlink Health Score is reported.** Per this skill's own
scoring rules, fewer than 4 of the 7 weighted factors (referring domains,
domain-quality distribution, anchor text, toxic ratio, link velocity,
follow/nofollow, geographic relevance) have any data source at Tier 0 with a
brand-new domain — producing a score here would be misleading.
**Status: INSUFFICIENT DATA**, not low score.

**Toxic link check:** no existing backlinks were supplied to verify, and
Common Crawl found none to flag. There is currently **no evidence of a toxic
link problem** — but also no confirmation either way; there simply isn't a
discovered link profile yet to assess. Re-run this check in Search Console
(Links report, free, already on the to-do list in `docs/SEO.md` item 5) once
the domain has a few weeks of indexing — that is a more complete source than
any free backlink tool for a domain this size.

**Upgrade path:** Moz free API signup (moz.com/products/api, 2,500 rows/mo)
would raise this to Tier 1 (DA/PA, spam score, confidence 0.85) and is worth
doing once there's an actual link profile to measure — right now it would
mostly return zeroes too.

## 2. Developer channel-partner programs — verified live this session

This is the single highest-value link type for this business model: real
estate agents get listed as registered channel partners on builder websites,
and several of the exact developers Shri Sidhanath already markets (per
`docs/maharera/README.md`, the 17 MahaRERA projects imported 5 Oct 2026) run
open partner-registration programs.

| Priority | Developer | Verified URL | What was confirmed live | Why this one |
|---|---|---|---|---|
| **High** | L&T Realty | `https://www.lntrealty.com/partner-with-us/` | Live registration form (categories, 200 OK), page states "over 3000 channel partners across India" | Shri Sidhanath already markets **5 Crestoria Estate towers** (PR1270002502889/890/891/892/927) — existing commercial relationship makes approval likely |
| **High** | Kanakia Group | `https://www.kanakia.com/channel-partner` | Live registration form (Name, **RERA ID of Channel Partner**, Firm Name, Email, Mobile); the locality filter on the same page explicitly lists **Panvel** as a project location | Shri Sidhanath already markets **Kanakia Valley** (PR1271012600320); the RERA-ID field is a direct match for A52000004595 |
| Medium | Persipina Developers | not verified live (ran out of research time) | — | Shri Sidhanath markets **8** of this developer's towers/amenities (Jasmine, Orchid, Iris, Aster, Zenia, Grandstand, Atheletica, Pavilion) — the single largest existing relationship by project count. Contact the developer directly (via the sales relationship that already exists) rather than cold-outreach; smaller developers like this one are far more likely to add a named "our channel partners" page with a real hyperlink, not just a RERA-number table |
| Medium | Saiyogi Developers LLP / Tricity Realty LLP / Ellora Heritage LLP | not verified live | — | Each has one active Shri Sidhanath listing (Sai Residency, Tricity Aspire, Rainbow Life respectively) — same direct-relationship approach as above |

**Important caveat found live:** L&T Realty's public verification page,
`https://www.lntrealty.com/our-registered-channel-partners/`, lists
Name / RERA Number / RERA State as **plain text, not hyperlinked** (confirmed
by fetching the page — no `<a>` tag around entries). Getting listed there is
a legitimacy/trust signal and is worth doing, but **it is not itself a
followed backlink** — don't count it as one when tracking link acquisition.
The real backlink value from a channel-partner program, if any, comes from
smaller/local developers who build a partner page with an actual outbound
link to the agent's site — which is why the Persipina/Saiyogi/Tricity/Ellora
relationships (medium row above) are worth pursuing even though they weren't
verified live this session.

## 3. Not yet verified this session — pursue next, in order

Ran out of research turns before reaching these. Listed from general
industry knowledge (not live-checked), so treat URLs as starting points to
confirm, not confirmed-live facts:

1. **CREDAI-MCHI (Navi Mumbai/Raigad unit)** — membership + directory listing
   for a real estate association. Attempted to verify a live URL this
   session: `credaimchi.in` failed DNS resolution and `credaimchi.com`
   returned a 406 (Mod_Security block on a direct fetch, which can be a bot
   filter rather than a dead site). **Action: find the current domain
   manually (search "CREDAI MCHI") rather than trusting either URL above**,
   then check their member-directory page — association membership listings
   are typically a real, editorially-earned link, not a paid directory.
2. **NAREDCO Maharashtra** (National Real Estate Development Council) —
   similar association-membership angle; verify current domain before
   outreach.
3. **Local Panvel/Raigad news and community sites** — look for a "local
   business" or real estate column in Panvel/New Panvel/Kharghar community
   Facebook-adjacent news portals and Raigad district news sites (e.g.
   Lokmat/Hindustan Times/Loksatta local editions, and any dedicated
   "Panvel/Navi Mumbai news" portal) that run small business features or
   accept local business guest posts. These were flagged as high-value in
   `docs/SEO.md` but no specific site was verified live this session —
   confirm each site accepts guest/feature content and is not a thin
   directory before pitching.
4. **99acres / MagicBricks / Housing.com / NoBroker agent profile pages** —
   already on the citation list in `docs/SEO.md`, but worth calling out
   again here because, unlike Justdial/Sulekha, these platforms' *agent
   profile pages* typically carry a real outbound link to the agent's own
   website, not just a NAP citation. Verify each platform's current
   agent-signup flow and confirm the profile template includes a website
   field with a live outbound link before assuming it counts as a backlink.
5. **MahaRERA agent page** — already identified as a citation target in
   `docs/SEO.md`. Per `docs/maharera/README.md` (this project's own prior
   research), the MahaRERA portal's project-detail pages require CAPTCHA
   verification to view; the agent-detail page likely has the same friction.
   Capture whatever public agent-search URL resolves for A52000004595 as a
   citation, but don't expect a clean hyperlinked backlink from a government
   portal — its value is NAP/registration-consistency, not link equity.

## 4. What NOT to do

- Do not buy or submit to generic/bulk directory-submission services — the
  skill's own toxic-link patterns (generic directories at scale, reciprocal
  link schemes across many domains, link networks) are explicit red flags,
  and `docs/SEO.md` already states directory volume is the wrong lever here.
- Do not treat the L&T "registered channel partners" list (section 2) as a
  backlink in reporting — it is a trust/verification listing only, per the
  live check above.

## 5. Suggested sequence

1. Apply to the L&T Realty and Kanakia channel-partner programs now (forms
   are live, relationship already exists via current project listings).
2. Contact Persipina Developers, Saiyogi Developers, Tricity Realty and
   Ellora Heritage directly (existing sales relationship) asking to be listed
   as a selling/channel partner with a link, rather than cold web outreach.
3. Confirm the current CREDAI-MCHI and NAREDCO Maharashtra URLs and apply for
   membership — this also supports the "real estate consultant" trust
   signal independent of links.
4. Identify 2-3 real (not thin-directory) Panvel/Raigad local news or
   community sites and pitch a business feature once GBP/reviews work
   (`docs/GBP-CHECKLIST.md`) has visible traction to point to.
5. Re-run the Moz API check (sign up free) once a handful of these links are
   live, to get an actual DA/spam-score baseline instead of the current
   Common-Crawl "not found" baseline.
6. Re-check Search Console's Links report monthly as the real low-cost
   backlink-discovery tool for a site this size.

## 6. Drafted form answers (ready to paste, not submitted)

Owner declined auto-submission (business registration forms should be submitted
by the owner, not an agent) and asked for the values drafted instead. Source:
this project's own verified NAP (`index.html` JSON-LD, GBP dashboard).

**L&T Realty** — https://www.lntrealty.com/partner-with-us/ (Name, Email,
Phone, City dropdown):
- Name: `Ravi Sargar`
- Email: `ravisargar@shrisidhanath.com`
- Phone: `+91 98207 59348`
- City: `Navi Mumbai`

**Kanakia Group** — https://www.kanakia.com/channel-partner (Name, RERA ID of
Channel Partner, Firm Name, Email, Mobile, project-location dropdown):
- Name: `Ravi Sargar`
- RERA ID of Channel Partner: `A52000004595`
- Firm Name: `Shri Sidhanath Constructions & Estate Consultant`
- Email: `ravisargar@shrisidhanath.com`
- Mobile: `+91 98207 59348`
- Project location: `Panvel`

Neither form's field list was confirmed exhaustive by the research agent —
open each page and check for additional required fields (e.g. years of
experience, firm address) before submitting.

## Sources and confidence

- Common Crawl domain graph: confidence 0.50, domain-level only, release
  `cc-main-2026-jan-feb-mar` (quarterly; https://commoncrawl.org/web-graphs).
- Moz / Bing: unavailable this session (Tier 0, no API keys configured).
- L&T Realty and Kanakia URLs/page content: confidence 0.95 (directly fetched
  and read this session, 06 Oct 2026).
- Persipina/Saiyogi/Tricity/Ellora, CREDAI-MCHI, NAREDCO, local news, and
  agent-profile-page claims: not independently verified live this session —
  flagged accordingly above, do not treat as confirmed facts.
- Developer/project relationships (which developers Shri Sidhanath already
  markets): sourced from `docs/maharera/README.md`, this project's own prior
  verified research, not re-verified here.
