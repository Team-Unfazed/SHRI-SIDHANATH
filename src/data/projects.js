// Portfolio inventory extracted from the client's own Instagram (@shrisidhanath.estate).
//
//   verified: true  the detail was stated in the client's own post
//   null            not evidenced anywhere. Rendered as omitted, never guessed.
//                   DO NOT fill these in with assumptions.
//   image: null     no photograph available, so the tile renders as a typographic plate.
//
//   licence: 'placeholder'
//                   DO NOT LAUNCH WITH THESE. Sourced from Google image results, so the
//                   copyright sits with the developer or the property portal that published
//                   them, not with Shri Sidhanath. They are comps, good enough to show the
//                   client the design. Replace with official developer media-kit assets
//                   before the site goes live. See docs/ASSETS.md.
//   licence: 'client-supplied'
//                   campaign artwork the client supplied (the Locations banners, cropped
//                   to the card). Theirs to publish as the developer's channel partner.
//   licence: 'first-party'
//                   the client's own photograph. Safe to publish.
//   licence: 'developer-artwork'
//                   the developer's own render, from the developer's official site,
//                   joined on by registration number from projectMedia.js. Shown with
//                   an "illustration" credit. Confirm media rights before launch.

import mahareraProjects from './maharera-projects.json' with { type: 'json' };
import { projectMedia } from './projectMedia.js';
import { registerEntries, REGISTER_UPDATED } from './projectRegister.js';

export const existingProjects = [
  {
    id: 'delta-prestige',
    name: 'Delta Prestige',
    location: 'New Panvel, Sector 17, Plot No. 25',
    area: 'New Panvel',
    category: 'Residential',
    developer: 'Delta Group',
    config: '2 & 3 BHK',
    detail:
      'Usable carpet of 826 sq.ft for 2 BHK, and 1108 and 1137 sq.ft for 3 BHK, with tailor-made combinations creating spacious 5 BHK homes.',
    priceFrom: null,
    image: '/images/portfolio/residential/delta-prestige-tower.webp',
    imageAlt: 'Delta Prestige, New Panvel: a mid-rise residential tower with a retail plinth.',
    licence: 'placeholder',
    source: 'instagram',
    verified: true,
    featured: true,
  },
  {
    id: 'hiranandani-fortune-city',
    name: 'Hiranandani Fortune City',
    location: 'Panvel',
    area: 'Panvel',
    category: 'Residential',
    developer: 'Hiranandani Communities',
    config: '2 & 3 BHK',
    detail:
      'Balcony homes inside a planned township. 2 BHK from 1.25 Cr and 3 BHK from 1.65 Cr, all inclusive.',
    priceFrom: '1.25 Cr*',
    image: '/images/portfolio/residential/hiranandani-fortune-city-tower.webp',
    imageAlt: 'Hiranandani Fortune City, Panvel: a tower in the township signature elevation.',
    licence: 'placeholder',
    source: 'instagram',
    verified: true,
    featured: true,
  },
  {
    id: 'godrej-city-panvel',
    name: 'Godrej City Panvel',
    location: 'Panvel',
    area: 'Panvel',
    category: 'Residential',
    developer: 'Godrej Properties',
    config: '2 & 3 BHK',
    detail:
      'A township address marketed across its phases, including The Highlands, Pavilion at The Highlands and Aerophase.',
    priceFrom: '74.99 Lakh*',
    image: '/images/portfolio/residential/godrej-city-panvel-towers.webp',
    imageAlt: 'Godrej City Panvel: a cluster of towers above a landscaped podium at dusk.',
    licence: 'placeholder',
    source: 'instagram',
    verified: true,
    featured: true,
  },
  {
    id: 'sai-world-empire',
    name: 'Sai World Empire',
    location: 'Sector 36, opposite CIDCO Valleyshilp, near Swapnapoorti, Kharghar',
    area: 'Kharghar',
    category: 'Residential',
    developer: null,
    config: null,
    detail:
      'A landmark Kharghar address, positioned opposite CIDCO Valleyshilp in Sector 36.',
    priceFrom: null,
    image: '/images/portfolio/residential/sai-world-empire-clubhouse.webp',
    imageAlt: 'Sai World Empire, Kharghar: the domed clubhouse and landscaped central garden.',
    licence: 'placeholder',
    source: 'instagram',
    verified: true,
    featured: true,
  },
  {
    id: 'meraki-panvel',
    name: 'Meraki',
    location: 'Panvel',
    area: 'Panvel',
    category: 'Residential',
    developer: null,
    config: '1 & 2 BHK',
    detail: 'Centrally located, with 45+ amenities. 1 BHK from 40 Lakh and 2 BHK from 67 Lakh.',
    priceFrom: '40 Lakh*',
    image: '/images/portfolio/residential/meraki-panvel-tower.webp',
    imageAlt: 'Meraki, Panvel: the tower elevation with its retail frontage.',
    licence: 'placeholder',
    source: 'instagram',
    verified: true,
    featured: false,
  },
  {
    id: 'emporia-hillcrest',
    name: 'Emporia Hillcrest',
    location: 'Panvel',
    area: 'Panvel',
    category: 'Residential',
    developer: 'Emporia World',
    config: '1 & 2 BHK',
    detail: 'Hillside residences. 1 BHK from 42 Lac and 2 BHK from 63 Lac, plus tax.',
    priceFrom: '42 Lac*',
    image: '/images/portfolio/residential/emporia-hillcrest-towers.webp',
    imageAlt: 'Emporia Hillcrest, Panvel: stepped towers above a retail plinth.',
    licence: 'placeholder',
    source: 'instagram',
    verified: true,
    featured: false,
  },
  {
    id: 'lunaris-raheja-district',
    name: 'Lunaris, Raheja District',
    location: null,
    area: 'Navi Mumbai',
    category: 'Residential',
    developer: 'Raheja',
    config: '2 BHK',
    detail: '2 BHK Optima from 1.10 Cr and 2 BHK Premium from 1.49 Cr.',
    priceFrom: '1.10 Cr*',
    image: '/images/portfolio/residential/lunaris-raheja-towers.webp',
    imageAlt: 'Lunaris, Raheja District, Navi Mumbai: residential towers above a wooded ridge at sunset.',
    licence: 'client-supplied',
    source: 'instagram',
    verified: true,
    featured: false,
  },
  {
    id: 'aero-estate-t3',
    name: 'Aero State T3',
    location: 'Khopoli',
    area: 'Raigad',
    category: 'Residential',
    developer: null,
    config: null,
    detail:
      'A gated Khopoli address, marketed at 55.99 Lakh and 1.17 Crore, all inclusive. Name corrected from the client-supplied campaign artwork, which reads AERO STATE T3.',
    priceFrom: '55.99 Lakh*',
    image: '/images/portfolio/residential/aero-state-t3-gate.webp',
    imageAlt: 'Aero State T3, Khopoli: the stone entrance sign and landscaped approach.',
    licence: 'client-supplied',
    source: 'instagram',
    verified: true,
    featured: false,
  },
  {
    id: 'hoabl-land',
    name: 'The House of Abhinandan Lodha',
    location: null,
    area: 'Maharashtra',
    category: 'Land',
    developer: 'The House of Abhinandan Lodha',
    config: 'Plotted development',
    detail:
      'Branded land, with documented transparency, buy-back assurance and legal assistance before booking.',
    priceFrom: null,
    image: '/images/portfolio/land/hoabl-hillside-residence.webp',
    imageAlt: 'The House of Abhinandan Lodha: a hillside residence and infinity pool at dusk.',
    licence: 'client-supplied',
    source: 'instagram',
    verified: true,
    featured: false,
  },
  {
    id: 'siddha-sejal-wadala',
    name: 'Passcode Great Guarantee',
    location: 'Wadala, Mumbai',
    area: 'Mumbai',
    category: 'Residential',
    developer: 'Siddha and Sejal',
    config: '1, 2 & 3 BHK',
    detail: 'South-central Mumbai residences at Wadala.',
    priceFrom: null,
    image: '/images/portfolio/residential/passcode-great-guarantee-tower.webp',
    imageAlt: 'Passcode Great Guarantee: a high-rise residential tower above a landscaped podium.',
    licence: 'client-supplied',
    source: 'instagram',
    verified: true,
    featured: false,
  },
  {
    id: 'symphony-kharghar',
    name: 'Symphony',
    location: 'Kharghar',
    area: 'Kharghar',
    category: 'Residential',
    developer: null,
    config: null,
    detail: 'Kharghar residences with a full amenity deck, including a dedicated fitness centre.',
    priceFrom: null,
    image: null,
    source: 'instagram',
    verified: true,
    featured: false,
  },
  {
    id: 'adhiraj-kharghar',
    name: 'Adhiraj, Kharghar',
    location: 'Kharghar',
    area: 'Kharghar',
    category: 'Residential',
    developer: 'Adhiraj Constructions',
    config: null,
    detail: 'Among the tallest towers rising in Navi Mumbai.',
    priceFrom: null,
    image: '/images/portfolio/residential/adhiraj-capital-towers.webp',
    imageAlt: 'Adhiraj Capital City, Kharghar: twin high-rise towers above a landscaped garden.',
    licence: 'placeholder',
    source: 'instagram',
    verified: true,
    featured: false,
  },
];

// Registration numbers identify individual phases; do not merge phases merely
// because they share a promoter or belong to an existing township listing.
const identity = (value) => value?.trim().toLowerCase();
export function mergeProjects(existing, incoming) {
  const merged = existing.map((project) => ({ ...project }));
  for (const project of incoming) {
    const index = merged.findIndex((p) =>
      (p.reraNumber && identity(p.reraNumber) === identity(project.reraNumber)) ||
      p.id === project.id ||
      (!p.reraNumber && identity(p.name) === identity(project.name) &&
        identity(p.developer) === identity(project.developer))
    );
    if (index === -1) merged.push(project);
    else merged[index] = { ...merged[index], ...project, id: merged[index].id };
  }
  // Pictures are joined on last, by registration number, so re-importing the
  // register (which records `image: null`) can never strip them off again.
  return merged.map((project) => {
    const media = projectMedia[project.reraNumber];
    return media
      ? {
          ...project,
          image: media.src,
          imageAlt: media.alt,
          imageCredit: media.credit,
          imageSourceUrl: media.sourceUrl,
          licence: 'developer-artwork',
        }
      : project;
  });
}

// The client's own project register, laid over the inventory by registration
// number: detail for what is already here, new entries for what is not. An
// existing project keeps its name, promoter and market; only a missing
// promoter is filled. See projectRegister.js for what is left out and why.
export function applyRegister(list, entries = registerEntries) {
  const out = list.map((project) => ({ ...project }));
  for (const { attachTo, name, developer, area, district, pincode, ...detail } of entries) {
    const index = out.findIndex((p) =>
      (p.reraNumber && identity(p.reraNumber) === identity(detail.reraNumber)) ||
      (attachTo && p.id === attachTo)
    );
    if (index !== -1) {
      const had = out[index];
      out[index] = {
        ...had,
        ...detail,
        developer: had.developer || developer || null,
        district: had.district || district || null,
        register: REGISTER_UPDATED,
      };
    } else {
      out.push({
        id: detail.reraNumber.toLowerCase(),
        name,
        developer,
        area,
        district: district ?? null,
        pincode: pincode ?? null,
        state: 'Maharashtra',
        priceFrom: null,
        image: null,
        featured: false,
        source: 'client-register',
        ...detail,
        register: REGISTER_UPDATED,
      });
    }
  }
  return out;
}

// `registeredProjects` is the inventory as evidenced by the client's posts and
// the MahaRERA search; `projects` is that plus the client's register.
export const registeredProjects = mergeProjects(existingProjects, mahareraProjects);
export const projects = applyRegister(registeredProjects);
export const featuredProjects = projects.filter((p) => p.featured);
