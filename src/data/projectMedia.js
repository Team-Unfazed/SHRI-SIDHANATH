// Presentation imagery for MahaRERA-registered projects, keyed by registration
// number so a picture can only ever land on the project it was published for.
// Project identity and location always come from the MahaRERA inventory; this
// adds a picture and nothing else. Applied in `mergeProjects` (projects.js).
//
// Every entry is the DEVELOPER'S OWN ARTWORK, taken from the developer's
// official site (`sourceUrl`) — a render or campaign illustration, not a
// photograph of a finished building and not an image from MahaRERA. Copyright
// stays with the developer; confirm channel-partner media rights before launch.
// See docs/HERO-ABOUT-REFINEMENT.md.
//
// Projects with no entry here keep the typographic plate. Nothing is borrowed
// from a property portal, and no project is given another project's picture.

const HIRANANDANI = 'Hiranandani Communities';
const willows = (tower) => ({
  src: `/images/projects/${tower}-developer.webp`,
  alt: `${tower[0].toUpperCase()}${tower.slice(1)}, Golden Willows, Panvel: developer's illustration of the tower.`,
  sourceUrl: `https://www.hiranandanicommunities.com/images/buildings/panvel/golden-willows/${tower}/building.webp`,
  credit: HIRANANDANI,
});

// One estate, five registered towers. The developer publishes a single
// illustration for the estate, so all five carry it — labelled as the estate,
// not as any one tower.
const crestoria = {
  src: '/images/projects/crestoria-estate-developer.webp',
  alt: "L&T Realty Crestoria Estate, Panvel: developer's illustration of the estate gardens.",
  sourceUrl: 'https://www.lntrealty.com/residences/luxury-2-3-4-bhk-flats-in-crestoria-estate-panvel/',
  credit: 'L&T Realty',
};

export const projectMedia = {
  P52000055992: {
    src: '/images/projects/tricity-aspire-developer.jpg',
    alt: "Tricity Aspire: developer's illustration of the elevation.",
    sourceUrl: 'https://tricityltd.com/projects/kharghar/tricity-aspire/',
    credit: 'Tricity Realty',
  },
  P52000055578: { ...willows('jasmine'), sourceUrl: 'https://www.hiranandanicommunities.com/golden-willows/jasmine-2bhk-flats-in-panvel' },
  P52000050193: { ...willows('orchid'), sourceUrl: 'https://www.hiranandanicommunities.com/golden-willows/orchid-2bhk-flats-in-panvel' },
  P52000050194: willows('iris'),
  P52000055662: willows('aster'),
  P52000055661: willows('zenia'),
  PR1270002502927: crestoria,
  PR1270002502892: crestoria,
  PR1270002502891: crestoria,
  PR1270002502890: crestoria,
  PR1270002502889: crestoria,
};
