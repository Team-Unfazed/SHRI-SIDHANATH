# Shri Sidhanath — Studio

A single-page site for **Shri Sidhanath Constructions & Estate Consultant**, a
real-estate consultancy headquartered in New Panvel, Navi Mumbai.

The layout is a rebuild of the **LivIn** Webflow template
(`livin-studio.webflow.io`) in React, with the template's invented content
replaced by facts that can be checked.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview
```

---

## What this is

A client asked for the LivIn template rebuilt in code. It was not restyled from
a screenshot: the published site was captured with Playwright, and its computed
custom properties, type scale, tracking, leading, section rhythm and colours
were read off the running build and transcribed into
[`src/styles/tokens.css`](src/styles/tokens.css). Section for section this
follows the template's running order.

### Design system

| | |
| --- | --- |
| Ground | `#f5f5f5` whitesmoke, with full-bleed black bands |
| Accent | `#e4ed64` — one primary action per screen, and the second step of the process ladder. Nowhere else. |
| Display & body | Archivo (400/500/600/700) |
| Labels, meta, buttons | IBM Plex Mono (500), uppercase |
| Type scale | 200 / 100 / 70 / 56 / 42 / 28 / 24 / 22 / 20 / 18 / 16 / 14 / 12 px |
| Section rhythm | 140px gap, 30px gutter, 1px hairlines |

Two things carry the whole look and are worth protecting:

1. **The type is tracked in, hard.** Every step has a negative letter-spacing
   that scales with the size — `-6%` at display, `-4.2px` at h1, `-0.32px` at
   body. Set any of this type at normal tracking and it immediately reads
   generic.
2. **The two display words are sized in `vw`, not `px`.** The hero banner and
   the closing wordmark stay edge-to-edge at every width. That is the whole
   trick; do not convert them to a px scale with breakpoints.

### Sections

| # | Section | Note |
| --- | --- | --- |
| 00 | Intro | the 3D entrance: a city rises, the logo mark assembles, the camera dives down the avenue into the hero |
| 01 | Hero | `Buy. Sell. Rent` at 16.1vw over a full-bleed photograph, with a rotating project card |
| 02 | About | two-tone statement, three disciplines, two image plates |
| 03 | Services | four sticky rows that shuffle into a deck as you scroll |
| 04 | Why choose us | dark band, sticky stage: a floating 3D deck deals through the six points on scroll, with a clickable index |
| 05 | On the record | black stat band — see below |
| 06 | Projects | a four-card shortlist with *Explore all projects*, which opens `projects.html` — a 3D ring of every project, then a grid filterable by market |
| 07 | Process | four full-bleed bars that darken as the deal progresses; each unfolds in 3D on scroll, hover leans it forward and opens it |
| 08 | Developers | marquee of evidenced developers, then the published Google rating |
| 09 | FAQ | black accordion, one panel open at a time |
| 10 | Locations | the six markets in a ruled card grid |
| 11 | Closer | `Sidhanath©` at 20.4vw with the photograph clipped to the glyphs |
| 12 | Footer | contact, registration, and an enquiry field that composes a real email |

---

## Two things to know before editing

### The content layer is the source of truth

Nothing is hard-coded into a component. Changing a phone number, adding a
project or rewording a service is a one-line edit in `src/data/`:

```
src/data/
  site.js       company facts, address, phone, MahaRERA, Google profile, socials
  projects.js   the project inventory
  content.js    services, locations, categories, developers, why-points, FAQs, gallery
```

### No fact on this site is invented

There are no client counts, no years-in-business, no awards, no testimonials and
no partnership claims, because none of those could be evidenced from the
material available. Where a detail is unknown it is **omitted**, never guessed.
The credibility of a consultancy site is the only thing it is selling.

This is why three of the template's sections were replaced rather than filled
in:

| LivIn | Here | Why |
| --- | --- | --- |
| Success stats — `180+ properties`, `98% satisfaction`, `4M+ clients`, `$44,540,086 sold` | **On the record** | Every figure is now one a visitor can check: the Google rating and review count, the project and market counts, the MahaRERA number, the opening hours. |
| Testimonials | **Developers** | There are no testimonials. The slot carries the marketed-developer list — phrased explicitly as *not* a claim of partnership or agency — and the Google rating as Google publishes it. |
| Blog grid | **Locations** | There is no blog. The markets fit the same card grid, and it was the section the page was missing anyway. |

The featured-property cards also drop land size, built area and bedroom/bathroom
counts, because none of those are evidenced for these projects. A chip is simply
absent where the value is `null`.

The dark band's quote is the practice's own position, unattributed — attributing
a sentence to a named person who did not say it is the same fabrication as
inventing a statistic.

---

## Two values that were measured, not copied

The hero word and the closing wordmark are set in `vw`, and the template's
values (`16.88vw` and `27.6vw`) assume **Creato Display**, which is not a free
face. Archivo runs wider, so both were scaled to the largest size that still
clears the gutter — measured at 1024, 1440 and 1920, not guessed:

| | LivIn | Here |
| --- | --- | --- |
| `--t-banner` | `16.88vw` | `16.1vw` |
| `--t-cta` | `27.6vw` | `20.4vw` |

**Re-measure if the font family or either word changes.** The check is in
`scripts/` territory — load the page and compare `.banner__word` `scrollWidth`
against its `clientWidth` at each width; they should be equal.

The hero's closing claim is capped in `vw` for the same class of reason: the
floating nav is centred on the viewport, so a `ch`-based cap cannot guarantee
the claim stops short of it.

---

## Checks

```bash
npm test                    # 19 interaction assertions in a real browser
npm run test:motion         # 33 motion assertions — every scroll effect, asserted
npm run shoot               # full-page screenshots at 11 widths + a layout audit
npm run check:assets        # flags any image still marked licence: "placeholder"

node scripts/shoot.mjs --w 390 --viewport      # one width, above the fold
node scripts/shoot.mjs --clip "#services"      # one section
node scripts/interact.mjs --url http://localhost:4173/   # against a preview build
```

`motion.mjs` runs deliberately **without** `?nomotion` — that flag exists to
switch the motion off, so a suite that used it would assert nothing. It checks
that the hero word starts hidden and settles at an identity transform, that the
hero actually parks while the sheet slides over it, that the progress rule
fills, that a reveal 16,000px down the page still fires, that both parallax
drifts change between scroll positions, and that the fill is mid-scrub. It
covers the curtain too: that it is up on load, above the nav, locking the page,
counting, and that it leaves and hands the page back. It then reloads twice more
— once with `?nomotion=1`, once under an emulated `prefers-reduced-motion:
reduce` — and asserts the curtain is skipped and nothing is left hidden. A
reveal that never plays leaves its content at opacity 0 forever, which is the
expensive failure.

`shoot.mjs` fails loudly on horizontal overflow, elements wider than the
viewport, broken images, failed requests and console errors — **that report is
worth more than the screenshots.** Current state: 11/11 widths clean, 19/19
interaction assertions and 33/33 motion assertions passing.

`?nomotion=1` renders the page in its final state with all animation suppressed.
It behaves exactly like the user's own reduced-motion preference and is what the
screenshot harness uses. Every effect also answers to
`prefers-reduced-motion: reduce` on its own — the progress rule hides entirely,
the fill jumps to its *finished* colour rather than its resting one (a paragraph
frozen at the muted end is a readability bug dressed up as a style choice), and
reveals render complete.

---

## Structure

```
index.html            metadata, fonts, JSON-LD, the nomotion switch
src/
  main.jsx            entry
  App.jsx             the thirteen sections, the sheet, the trigger refresh
  data/               site.js, projects.js, content.js — all copy and facts
  lib/motion.js       GSAP setup and the four shared reveal primitives
  lib/intro.js        the curtain-to-hero handshake
  sections/           one component + one stylesheet each
  components/         FloatingNav, Intro, Pill, Label, Reveal, SplitReveal, ScrollFill, ScrollProgress
  styles/             tokens.css (the design system), base.css (reset + primitives)
scripts/              shoot.mjs, interact.mjs, motion.mjs, check-assets.mjs
docs/                 research provenance and the asset handover notes
public/images/        branding, locations, office, portfolio, scenes
```

There is no UI framework and no utility CSS. The layouts are asymmetric and
grid-ruled, and utility defaults pull that kind of work back towards a template
— which is the one thing a rebuild of a template must not do.

### Motion

GSAP with ScrollTrigger, set up once in [`src/lib/motion.js`](src/lib/motion.js),
which exports the three house primitives — `revealUp`, `revealLines` and
`parallax` — plus `reducedMotion()`. Nothing in the app registers a plugin or
reaches for `gsap` directly except the four sections that own a scrubbed effect.

| Effect | Where | How |
| --- | --- | --- |
| **Hero entrance** | `Hero.jsx` | A load timeline, not a scroll one, and gated on the curtain. The photograph settles out of a 1.08 over-scale alone, then the masthead sets itself letter by letter, then the meta row, the claim and the card follow — all upward, so it reads as one move rather than five fades. |
| **Sticky park** | `Hero.css`, `.sheet` in `base.css` | The hero is `position: sticky; top: 0` and everything after it is one opaque sheet at `z-index: 1`. The first band arrives as a plane sliding across the photograph instead of the photograph being pushed off screen. Disabled below 860px. |
| **Intro curtain** | `Intro.jsx` | The starting animation. A black panel carrying the wordmark, the five markets and a counter, which lifts to hand over to the hero. See below. |
| **Split-text headings** | seven headings | `SplitReveal` splits each heading three ways — lines, words, letters — masks each *line* and staggers the *letters* up out of it. This is the technique the source template uses, and it is what makes the page read as type being set rather than blocks sliding. |
| **Generic reveals** | everywhere else | `Reveal` — a 26px rise with a fade, once, on entry. `stagger` animates direct children so a grid beats rather than fading as a block. |
| **Scrubbed parallax** | the dark band, the about plates, the closing strip | `scrub: 1` against `top bottom` → `bottom top`. The two about plates drift at *different* rates, which is what stops a pair of equal rectangles reading as one static block. |
| **Word-by-word fill** | two paragraphs | `ScrollFill` inks a paragraph in word by word against the scroll. The words stay one uninterrupted text run — nothing is inserted between them and nothing is hidden from the accessibility tree — so a screen reader reads a sentence and copy/paste behaves normally. |
| **Progress rule** | `ScrollProgress` | A 2px accent rule that fills with reading progress. This page is 21,000px tall and its only chrome is a pill at the bottom, so it is the sole wayfinding a visitor gets. One scrubbed `scaleX`. |

The card stacking in **Services** stays pure `position: sticky`
with a per-index offset — no JavaScript involved.

**Three things that will break if you touch them carelessly:**

1. **Start states live in CSS as well as in the tween.** `index.html` marks the
   document `.js` before first paint. Without the matching `.js .reveal { opacity: 0 }`
   rule the browser paints the finished page, React mounts, GSAP sets opacity to
   0, and the whole thing blinks. A crawler never gets `.js`, so it never gets
   the hidden state.
2. **Triggers are re-measured after fonts and images land.** See the effect in
   `App.jsx`. Web fonts swapping in and images gaining height move the page by
   thousands of pixels; without the refresh, triggers stay pinned to positions
   that no longer exist and whole sections sit at opacity 0 forever.
3. **Parallax and hover cannot share `transform`.** GSAP writes an inline
   transform, which beats any hover rule. The about plates lost their hover zoom
   for exactly this reason — the drift owns the property now.
4. **Splitting has to wait for the fonts.** SplitText measures rendered line
   boxes. Split against the fallback face and the line breaks are wrong the
   moment Archivo swaps in — words stranded in the wrong mask, permanently. Both
   `splitReveal` and the hero await `document.fonts.ready`.
5. **One global property, two owners.** The curtain and the mobile menu both
   lock `body.overflow`. The menu used to write `''` on every mount, which
   silently unlocked the curtain; it now only touches the property while it is
   actually open. If you add a third thing that locks scroll, give it the same
   treatment.

### The intro curtain

A WebGL entrance (`src/lib/introScene.js`) under a type-and-HUD layer
(`src/components/Intro.jsx`), in one sequence:

1. **Build (~3.2s).** An avenue of towers rises out of a dark grid, front rows
   first, while the camera cranes up from street level. The three frames of the
   logo mark fly in from depth and lock together, the red stair draws itself,
   and the wordmark rises letter by letter out of its mask.
2. **Exit (~1.7s).** The mark parts like a pair of doors, the camera accelerates
   down the avenue into the warm light at its end, and a soft iris opens from
   that point onto the hero's sunset sky.

The scene is built once and every movement is a GSAP tween or a function of
elapsed time — never a per-frame increment — so it runs at the same speed on
60Hz and 120Hz screens. The city is generated from a fixed seed, so it is the
same on every visit. Without WebGL the scene is skipped and the type still plays.

Two things make it a loader rather than a splash screen:

- **The counter is real.** It runs to 90 with the build and only completes once
  `window.load` has fired.
- **It has a floor and a cap.** The curtain stays up for at least **3.6s** and at
  most **6.5s**. Without the floor a warm cache would cut the build off half-way;
  without the cap a slow connection would hold the page shut. Click, the
  *Enter site* button, Enter, Space or Escape leave at any point.

The handover is a promise (`src/lib/intro.js`), not a callback: the curtain and
the hero mount together and React gives no ordering guarantee between two
siblings' effects, so the hero awaits `introDone` instead of asking. When the
intro is skipped that promise is **already resolved at module load**, before any
component mounts, so the hero never waits on something that will not arrive.

`finishIntro()` fires as the curtain *starts* to lift, not once it has gone — so
the photograph is already settling behind it rather than the visitor being shown
an empty frame for a beat.

---

## Before this goes live

- [ ] **Six project images are still marked `licence: "placeholder"`.** They were
      sourced from image results, so copyright sits with the developer or the
      property portal, not with Shri Sidhanath. Fine for a client presentation;
      replace with official media-kit assets before publishing. `npm run check:assets`
      lists them. See [`docs/ASSETS.md`](docs/ASSETS.md).
- [ ] The canonical, Open Graph and JSON-LD URLs in `index.html` assume
      `https://www.shrisidhanath.com/`. Update if that changes.
- [ ] Add `robots.txt` and `sitemap.xml` to `public/` for the production host.
- [ ] The footer enquiry field composes a `mailto:` — it has no backend. If a
      real form is wanted, that is a server, not a CSS change.
- [ ] Google figures (4.8, 145 reviews) were verified on the client's Business
      Profile on **12 September 2026**. Re-check before launch and update
      `src/data/site.js`; the date is printed on the page.

## Deployment

Static. `npm run build` emits `dist/`. Any static host will do.

## Provenance

- Layout and design system: the LivIn Webflow template, `livin-studio.webflow.io`.
  Fonts substituted as noted above.
- Company facts: the client brief and the client's own Instagram — see
  [`docs/RESEARCH-INSTAGRAM.md`](docs/RESEARCH-INSTAGRAM.md).
- Rating, review count and opening hours: the client's Google Business Profile —
  see [`docs/RESEARCH-GOOGLE-FACEBOOK.md`](docs/RESEARCH-GOOGLE-FACEBOOK.md).
