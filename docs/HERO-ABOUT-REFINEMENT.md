# Hero and About refinement

The Hero's approved video element, source, poster, playback effect, stage, video sizing, background colour, desktop/mobile overlays and section sizing are unchanged. SHA-256 fingerprints captured before editing are in `hero-video-preservation.json` and checked by `scripts/verify-hero-about-refinement.mjs`.

Only Hero foreground copy, typography, buttons and a decorative CSS architectural study were changed. The model floats over 16 seconds with a five-degree turn; it adds no dependencies, images, canvas or WebGL. It is hidden at tablet/mobile widths and static under `prefers-reduced-motion`.

About retains its background, decorative icons, badge treatment, three-card structure, CTA row, footer and existing animation code. Main copy and card contents now introduce three projects from the existing MahaRERA inventory. A short-screen content-height safeguard prevents clipping. No imported project data was duplicated or overwritten: `projectMedia.js` joins presentation assets to existing registrations, and remains limited to the About section.

## Image provenance

The three images are **developer architectural illustrations**, not photographs of completed buildings or images retrieved from MahaRERA. Each image has a visible illustration label linking to its source. They were downloaded unchanged on 5 October 2026; combined transfer size is approximately 213 KiB and loading is lazy. Copyright remains with the respective owners; publicly accessible developer pages do not themselves grant a redistribution licence. Confirm existing channel-partner/media-use rights before publishing these assets.

| Asset | Existing registration | Official source |
|---|---|---|
| `tricity-aspire-developer.jpg` | P52000055992 | https://tricityltd.com/projects/kharghar/tricity-aspire/ |
| `jasmine-developer.webp` | P52000055578 | https://www.hiranandanicommunities.com/golden-willows/jasmine-2bhk-flats-in-panvel |
| `orchid-developer.webp` | P52000050193 | https://www.hiranandanicommunities.com/golden-willows/orchid-2bhk-flats-in-panvel |

Original image URLs:

- https://tricityltd.com/wp-content/uploads/2023/02/Aspire-Elevation2-500x900-1.jpg
- https://www.hiranandanicommunities.com/images/buildings/panvel/golden-willows/jasmine/building.webp
- https://www.hiranandanicommunities.com/images/buildings/panvel/golden-willows/orchid/building.webp

### Added 5 October 2026: pictures joined to projects by registration number

`src/data/projectMedia.js` is now keyed by MahaRERA number and applied in
`mergeProjects`, so each picture appears on its own project card (projects page
and ring) with an "Illustration: <developer>" label. Added:

| Asset | Registration(s) | Official source |
|---|---|---|
| `iris-developer.webp` | P52000050194 | https://www.hiranandanicommunities.com/images/buildings/panvel/golden-willows/iris/building.webp |
| `aster-developer.webp` | P52000055662 | https://www.hiranandanicommunities.com/images/buildings/panvel/golden-willows/aster/building.webp |
| `zenia-developer.webp` | P52000055661 | https://www.hiranandanicommunities.com/images/buildings/panvel/golden-willows/zenia/building.webp |
| `crestoria-estate-developer.webp` | PR1270002502927, …892, …891, …890, …889 (T1–T5) | https://www.lntrealty.com/residences/luxury-2-3-4-bhk-flats-in-crestoria-estate-panvel/ |

The Crestoria image is the estate's campaign masthead **cropped** to its garden
illustration (the lettering and price panel are cut away); it shows the estate,
not a tower, and is shared by all five tower registrations. The Hiranandani
files are unchanged downloads.

No official developer image was found for Symphony, Kanakia Valley, Rainbow
Life, Sai Residency, Grandstand, Atheletica or Pavilion. They keep the
typographic plate; nothing was taken from property portals.

MahaRERA fields remain the source for project names and displayed locations. Developer-page claims about prices, availability, amenities and completion dates were not imported.

## Verification

- Production build passes (the existing >500 kB bundle warning remains).
- Five viewports checked: 1440×900, 1280×720, 768×1024, 390×844 and 320×740.
- Video preservation fingerprints, muted inline looping playback, two Hero CTAs, reduced motion, three loaded images, unclipped About content and the 29-project catalog route pass.
- No lint script is configured.

Files changed: `src/sections/Hero.jsx`, `Hero.css`, `About.jsx`, `About.css`; added `src/data/projectMedia.js`, three assets under `public/images/projects/`, this note, preservation fingerprints, and the focused verification script. Existing navigation, project pages, background media and shared components were not modified for this refinement.
