# Four-screen property showcase

Open `/showcase.html` during development or from the production build. This is
an independent Vite entry; it does not import or replace the current homepage,
Hero component, or homepage scrolling controller.

The reference requested was `https://www.damacproperties.com/en/`. The live
site returned HTTP 403 during inspection and no connected browser was available.
This implementation recreates the requested full-screen property experience;
it does not contain scraped DAMAC code or claim to be an exact reproduction.

## Content and backgrounds

Edit `CHAPTERS` in `src/pages/ShowcasePage.jsx`:

1. Perspective: existing local city video and its poster.
2. Residences: existing architectural image with an animated camera movement.
3. Living: existing interior photograph with an animated camera movement.
4. Advisory: the company's existing office photograph with camera movement.

Every chapter accepts an `image` fallback and an optional `video` URL. Only the
active video plays. Backgrounds pause when the tab is hidden or Pause is selected.
Reduced-motion preferences disable camera motion and animated transitions.
The page is marked noindex as a separate design preview.

## Interaction

Wheel, vertical swipe, Arrow/Page keys, Space, Home/End, chapter markers and
the menu navigate the collection. Each gesture advances one screen. A quiet
interval absorbs trackpad momentum after arrival; a held touch cannot skip
multiple chapters. The last screen's footer button returns to the beginning.

All enquiry and catalogue actions link to existing destinations. No new lead
collection or external submission is introduced.

## Verification

`node scripts/verify-showcase.mjs [url]` checks the actual page in Chromium,
including browser-level mobile touch input. Desktop and mobile screenshots are
written to `screenshots/showcase-*.png`. `npm run build` emits `dist/showcase.html`.
