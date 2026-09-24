# Assets

## What is in the repository, and where it came from

Everything in `public/images/` is derived from three files the client supplied,
which are still in the project root and were never modified:

| Source | Used for |
|---|---|
| `hero section Background.png` (2103x748, opaque) | the hero sky layer |
| `hero section in animation over the background.png` (2103x748, **RGBA**) | the hero architecture layer |
| `brand logo.jpg` (1080x1080) | the favicon and the raster logo |

```
public/images/
  hero/        the two hero layers, at every size the <picture> asks for
  scenes/      crops of the same artwork, used in About, Locations and the CTA
  branding/    alpha-keyed logo + favicon
  portfolio/   project imagery. residential/ currently holds PLACEHOLDERS (see below)
  office/      the client's own premises, from their Google Business Profile
  projects/    empty, reserved for per-project galleries
```

### Hero layers
`sky-*.webp` and `arch-*.webp` are pixel-aligned. The architecture layer keeps a
real alpha channel (`yuva420p`), which is the whole reason the monumental word
in the hero can sit *behind* the villas. **If these are ever re-exported, the
alpha must survive** — flattening them breaks the hero's core idea.

Two crops exist because the composition is different on a phone:

- `sky-*.webp` / `arch-*.webp` — the full 2103x748 scene, used above 900px.
- `sky-mobile2.webp` / `arch-mobile2.webp` — an 830x748 crop centred on the
  flagship villa, used at and below 900px. The wide crop becomes a 300px strip
  at the foot of a tall phone screen; this one gives the villa presence and
  keeps the scene's dominant palm off the right edge, where it would otherwise
  swallow the end of the word.

The hero CSS positions the monumental word in `vw`, not `%`, because the
architecture's roofline sits at a fixed `vw` offset from the bottom of the frame
regardless of viewport height. `src/sections/Hero.css` explains the numbers.
**If the artwork is replaced, those offsets have to be re-measured** —
`scripts/measure-hero.mjs` prints everything needed.

`arch-1600.png` is the fallback for the architecture layer and is deliberately
large (1.7 MB), because alpha rules out a JPEG. Every current browser takes the
WebP from the `<source>`, so in practice it is never downloaded.

### Scene crops
`scenes/estate-*.webp` are crops of the *composited* scene (sky + architecture
flattened), used as ordinary photography in About, Locations and the final CTA.

Not all of them are wired into the page. `estate-wide`, `estate-villa`,
`estate-grove` and `sky-band` are unused today and kept as a small library for
the Properties, Projects and About pages that come next. The redundant JPEG
twins of the WebP files were deleted; regenerate them from the source PNGs if a
non-WebP fallback is ever needed.

They are **brand imagery, not project photography.** The villas in them are a
render supplied for the hero; they are not a Shri Sidhanath project. They are
deliberately never captioned as one, and they never appear in Featured Projects
or Selected Work.

---

## ⚠ Project imagery is PLACEHOLDER. Do not launch with it.

Six projects currently carry a building image:

| Project | File | Source |
|---|---|---|
| Delta Prestige | `delta-prestige-tower.webp` | Google image results |
| Hiranandani Fortune City | `hiranandani-fortune-city-tower.webp` | Google image results |
| Godrej City Panvel | `godrej-city-panvel-towers.webp` | Google image results |
| Sai World Empire | `sai-world-empire-clubhouse.webp` | Google image results |
| Meraki | `meraki-panvel-tower.webp` | Google image results |
| Emporia Hillcrest | `emporia-hillcrest-towers.webp` | Google image results |

Each is tagged `licence: 'placeholder'` in `src/data/projects.js`.

**The copyright on these belongs to the developer, or to the property portal
that published them (Housing.com, 99acres, MagicBricks and similar). Shri
Sidhanath does not own them.** They are here so the client can see the design
working with real project photography. Publishing them on a live commercial
site is a genuine infringement risk.

`npm run build` prints a warning while any remain. Set `STRICT_ASSETS=1` to turn
that warning into a build failure once the real assets are in.

### How to replace them properly
The client markets these projects, which usually means the developer will
supply a media kit to a channel partner on request. That is the correct source:
official renders, correct for the current phase, cleared for partner use. Ask
for Delta, Hiranandani, Godrej, Emporia and the Sai World / Meraki developers.

Swap procedure: drop the official file into
`public/images/portfolio/residential/`, point `image` at it, and change
`licence: 'placeholder'` to `licence: 'developer-supplied'`.

Two images are NOT placeholders and are safe:
`delta-prestige-courtyard-*.webp` and `delta-prestige-water-garden-*.webp` came
off the client's own Facebook page — still Delta's artwork, but at least
material the client already publishes. Confirm with the client before use.

The three files in `public/images/office/` are the client's own premises,
captured from their Google Business Profile. Those are `first-party` and clean.


## Location imagery (`public/images/locations/`)

Supplied by the client as PNGs in the project root and converted to WebP at
1200px and 800px. Each market in `src/data/content.js` carries its own.

| Market | File | Shows | Licence |
|---|---|---|---|
| New Panvel | `new-panvel-office-*` | the client's own shopfront at night, MahaRERA seal above the door | `first-party` |
| Navi Mumbai | `navi-mumbai-lunaris-*` | Lunaris by Raheja | `client-supplied` |
| Mumbai | `mumbai-passcode-mulund-*` | Passcode Great Guarantee, Mulund | `client-supplied` |
| Thane | `thane-hoabl-*` | The House of Abhinandan Lodha | `client-supplied` |
| Raigad | `raigad-aero-state-khopoli-*` | Aero State T3, Khopoli | `client-supplied` |
| Pune | `pune-township-*` | a Pune township | `client-supplied` |

Five of the six are **developer campaign artwork with the developer's own
typography burned in**. They are marked `client-supplied` rather than
`first-party`: the client handed them over, which implies they believe they may
use them, but the copyright still sits with Raheja, Lodha and the rest. Worth
one confirmation before launch. The New Panvel shot is the client's own
premises and is clean.

They are displayed at their native 16:9 rather than cropped to a portrait box,
because each one has its wordmark set into the left third; a tighter crop either
cuts the type off or loses the building it belongs to.

`commercial shop.png` was also supplied. It shows "The Workroom", a retail
building, and is converted into
`public/images/portfolio/commercial/the-workroom-retail-*.webp`. It is not wired
into any section yet — it suits the Commercial property category.

## Adding the client's real photography

No Instagram media was collected — see `docs/RESEARCH-INSTAGRAM.md` for why.
Any project without an `image` renders as a designed typographic plate marked
"Photography to follow"; six currently carry placeholder photography instead.

To turn a plate into a photographic tile:

1. Put the image in `public/images/portfolio/<category>/`, named for what it is:

   ```
   public/images/portfolio/residential/delta-prestige-new-panvel-01.jpg
   public/images/portfolio/commercial/paradise-mall-exterior.jpg
   public/images/portfolio/land/hoabl-plot-aerial.jpg
   ```

   Not `IMG_8372.jpg`.

2. Set the `image` field on that project in `src/data/projects.js`:

   ```js
   { id: 'delta-prestige', …, image: '/images/portfolio/residential/delta-prestige-new-panvel-01.jpg' }
   ```

Nothing else changes. `PropertyCard` switches from its typographic plate to the
photographic branch and the hover zoom activates.

**Sizing:** 1600px on the long edge is plenty. Landscape 4:3 for the standard
tiles, 2:1 for the large featured tile. Convert to WebP:

```bash
ffmpeg -i photo.jpg -vf "scale=1600:-2:flags=lanczos" -quality 82 photo.webp
```

**Before publishing any developer-supplied creative, confirm the client has the
right to use it.** Most of what is on their Instagram is other companies'
advertising artwork.

---

## Things that are still outstanding

These are content gaps, not bugs. Each is marked in the data or the copy rather
than filled in with a guess:

- Licensed project photography (six are on placeholders, six are on plates).
- Developer attribution for Sai World Empire, Meraki, Aero Estate T3 and
  Symphony — shown as "To be verified" in the index.
- The award referenced on Instagram. The post does not name it, so the site
  does not mention it.
- Whether "Lodha Preferred Partner", which appears on the client's own
  creatives, is a formal status. Until confirmed, the site says only
  "Projects We Market".
- Testimonials. `src/sections/Trust.jsx` has a `testimonials` array and the
  markup to render it; it is empty, so that block does not render at all.
