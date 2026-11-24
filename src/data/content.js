// Editorial content. Service descriptions and positioning are written from the
// company profile supplied in the brief. Locations are the markets the client
// states they cover. No statistic, award or testimonial is invented anywhere.

export const services = [
  {
    id: 'project-management',
    image: '/images/services/advisory-blueprints-900.webp',
    imageAlt: 'Two people reviewing architectural drawings at a desk.',
    number: '01',
    title: 'Project Management & Advisory',
    summary:
      'We sit between buyers, land providers and developers, and keep a project moving on the terms it was agreed on.',
    points: [
      'Superior project implementation and management',
      'Liaison across buyers, land owners and developers',
      'Technical expertise applied from first drawing to handover',
    ],
  },
  {
    id: 'exclusive-mandates',
    image: '/images/services/mandates-residential-tower-900.webp',
    imageAlt: 'A contemporary residential high-rise with terracotta and white balconies.',
    number: '02',
    title: 'Exclusive Mandates',
    summary:
      'Taking a single asset or an entire inventory to market, with one team accountable for the outcome.',
    points: [
      'Positioning and pricing strategy',
      'Channel and buyer outreach',
      'One point of accountability from launch to close',
    ],
  },
  {
    id: 'resale-rental',
    image: '/images/services/resale-apartment-living-900.webp',
    imageAlt: 'A bright, furnished apartment living room.',
    number: '03',
    title: 'Resale & Rental Expertise',
    summary:
      'Resale and leasing across Navi Mumbai and the wider region, handled with the same rigour as a primary sale.',
    points: [
      'Resale valuation grounded in local transactions',
      'Tenant and buyer qualification',
      'Documentation and handover support',
    ],
  },
  {
    id: 'property-management',
    image: '/images/services/management-home-in-hand-900.webp',
    imageAlt: 'A small model house held in an open palm.',
    number: '04',
    title: 'Property Management',
    summary:
      'Looking after an asset once it is yours, so that ownership at a distance stays uncomplicated.',
    points: [
      'Tenancy administration and renewals',
      'Upkeep coordination and inspections',
      'Compliance and society liaison',
    ],
  },
];

export const locations = [
  {
    id: 'new-panvel',
    image: '/images/locations/new-panvel-office-1200.webp',
    imageSmall: '/images/locations/new-panvel-office-800.webp',
    imageAlt: 'The Shri Sidhanath shopfront in New Panvel at night, MahaRERA seal above the door.',
    licence: 'first-party',
    name: 'New Panvel',
    role: 'Headquarters',
    note: 'Our office is on Plot 18, Sector 7, New Panvel West. Everything we know about this market, we learned on foot.',
    primary: true,
    pagePath: '/real-estate-agent-new-panvel.html',
  },
  {
    id: 'navi-mumbai',
    image: '/images/locations/navi-mumbai-lunaris-1200.webp',
    imageSmall: '/images/locations/navi-mumbai-lunaris-800.webp',
    imageAlt: 'Lunaris by Raheja, Navi Mumbai: residential towers above a wooded ridge at sunset.',
    licence: 'client-supplied',
    name: 'Navi Mumbai',
    role: 'Core market',
    note: 'Kharghar, Kamothe, Kalamboli, Taloja and Ulwe, alongside the Panvel node.',
    primary: false,
    pagePath: '/real-estate-agent-navi-mumbai.html',
  },
  {
    id: 'mumbai',
    image: '/images/locations/mumbai-passcode-mulund-1200.webp',
    imageSmall: '/images/locations/mumbai-passcode-mulund-800.webp',
    imageAlt: 'Passcode Great Guarantee, Mulund: high-rise residences overlooking the city.',
    licence: 'client-supplied',
    name: 'Mumbai',
    role: 'Market',
    note: 'Island city and suburban addresses, including south-central Mumbai.',
    primary: false,
  },
  {
    id: 'thane',
    image: '/images/locations/thane-hoabl-1200.webp',
    imageSmall: '/images/locations/thane-hoabl-800.webp',
    imageAlt: 'The House of Abhinandan Lodha: a hillside residence above a lake at dusk.',
    licence: 'client-supplied',
    name: 'Thane',
    role: 'Market',
    note: 'Residential and commercial requirements across the Thane belt.',
    primary: false,
  },
  {
    id: 'raigad',
    image: '/images/locations/raigad-aero-state-khopoli-1200.webp',
    imageSmall: '/images/locations/raigad-aero-state-khopoli-800.webp',
    imageAlt: 'Aero State T3, Khopoli: the landscaped entrance gate and approach road.',
    licence: 'client-supplied',
    name: 'Raigad',
    role: 'Market',
    note: 'Khopoli and the wider district, where land and plotted development sit.',
    primary: false,
    pagePath: '/real-estate-agent-raigad.html',
  },
  {
    id: 'pune',
    image: '/images/locations/pune-township-1200.webp',
    imageSmall: '/images/locations/pune-township-800.webp',
    imageAlt: 'A Pune township: residential towers around a central green.',
    licence: 'client-supplied',
    name: 'Pune',
    role: 'Market',
    note: 'Selective mandates and investor requirements.',
    primary: false,
  },
];

export const categories = [
  { id: 'residential', name: 'Residential', note: 'Apartments and homes, new and resale.' },
  { id: 'commercial', name: 'Commercial', note: 'Space that has to earn its rent.' },
  { id: 'shops', name: 'Shops', note: 'High street and in-development retail units.' },
  { id: 'land', name: 'Land', note: 'Parcels with clean title and a clear use case.' },
  { id: 'plots', name: 'Plots', note: 'Plotted development and individual plots.' },
  { id: 'retail', name: 'Retail', note: 'Footfall-led space in planned developments.' },
  { id: 'office', name: 'Office', note: 'Fit-out ready and warm shell floors.' },
  { id: 'godowns', name: 'Godowns', note: 'Storage and distribution near the corridors.' },
  { id: 'industrial-units', name: 'Industrial Units', note: 'Built units in established estates.' },
  { id: 'industrial-plots', name: 'Industrial Plots', note: 'Land zoned and ready for industry.' },
];

// Developers whose projects the client markets. Presented under "Projects We Market".
// This is deliberately NOT phrased as partnership. See docs/RESEARCH-INSTAGRAM.md
export const developers = [
  { name: 'Hiranandani', evidenced: true },
  { name: 'Godrej Properties', evidenced: true },
  { name: 'Delta Group', evidenced: true },
  { name: 'Raheja', evidenced: true },
  { name: 'Lodha', evidenced: true },
  { name: 'The House of Abhinandan Lodha', evidenced: true },
  { name: 'Adhiraj', evidenced: true },
  { name: 'Marathon Realty', evidenced: true },
  { name: 'The Wadhwa Group', evidenced: true },
  { name: 'Siddha', evidenced: true },
  { name: 'Satyam Developers', evidenced: true },
  { name: 'Emporia World', evidenced: true },
  { name: 'Tata Housing', evidenced: false },
  { name: 'Mahindra Lifespaces', evidenced: false },
  { name: 'Embassy', evidenced: false },
  { name: 'Prestige Group', evidenced: false },
  { name: 'K Raheja', evidenced: false },
  { name: 'Raheja Universal', evidenced: false },
  { name: 'L&T Realty', evidenced: false },
  { name: 'Kamdhenu', evidenced: false },
  { name: 'Paradise Group', evidenced: false },
  { name: 'Greenscape', evidenced: false },
  { name: 'Bhagwati Group', evidenced: false },
];

export const whyPoints = [
  {
    id: 'judgement',
    tag: 'Advisory',
    title: 'Judgement before inventory',
    body: 'We start with the requirement, not with what we happen to be holding. If the right answer is to wait, we will say so.',
  },
  {
    id: 'technical',
    tag: 'Construction',
    title: 'Technical expertise',
    body: 'Hands-on construction and project experience means we read a plan, a spec and a stage of completion for what they are.',
  },
  {
    id: 'local',
    tag: 'Navi Mumbai',
    title: 'Market knowledge that is actually local',
    body: 'Sector by sector across Panvel, Kharghar, Kamothe, Kalamboli, Taloja and Ulwe. Local knowledge is the whole job.',
  },
  {
    id: 'liaison',
    tag: 'Buyers · Developers',
    title: 'A genuine liaison',
    body: 'We work between buyers, land providers and developers, which means we understand what each side can and cannot move on.',
  },
  {
    id: 'efficiency',
    tag: 'Process',
    title: 'Transaction efficiency',
    body: 'Documentation, approvals and handover coordinated so that a deal closes on schedule rather than on hope.',
  },
  {
    id: 'transparency',
    tag: 'MahaRERA',
    title: 'Transparency',
    body: 'Registered with MahaRERA. What we know about a property, you know about a property.',
  },
];

export const faqs = [
  {
    q: 'Which locations do you cover?',
    a: 'Mumbai, Navi Mumbai, Thane, Raigad and Pune. Our deepest coverage is the Panvel node, where we are based, along with Kharghar, Kamothe, Kalamboli, Taloja and Ulwe.',
  },
  {
    q: 'Is Shri Sidhanath MahaRERA registered?',
    a: 'Yes. Shri Sidhanath Constructions & Estate Consultant is registered with MahaRERA under agent registration number A52000004595. A MahaRERA agent number means the agent is on the state regulator\'s public register and can be looked up on maharera.maharashtra.gov.in before you deal with them.',
  },
  {
    q: 'What is a CIDCO resale flat, and does Shri Sidhanath deal in them?',
    a: 'A CIDCO resale flat is a flat in a building originally allotted or developed by CIDCO (the City and Industrial Development Corporation) in Navi Mumbai, now being resold by its owner rather than bought fresh from CIDCO or a developer. Shri Sidhanath deals in CIDCO resale flats across Panvel, New Panvel and the wider Navi Mumbai area, including checking a building\'s OC (occupancy certificate) status before recommending it.',
  },
  {
    q: 'Does Shri Sidhanath help with flat registration and stamp duty in Panvel?',
    a: 'Yes. Once a deal is agreed, our desk coordinates flat registration and stamp duty payment alongside the transaction, so a buyer is not left to run between offices separately for the paperwork.',
  },
  {
    q: 'Does Shri Sidhanath cover property near Navi Mumbai International Airport?',
    a: 'Yes. We handle residential enquiries in Ulwe and Dronagiri, the two nodes closest to Navi Mumbai International Airport (NMIA), alongside our core coverage of Panvel, Kharghar, Kamothe, Kalamboli, Taloja and Ulwe.',
  },
  {
    q: 'What does a real estate agent in Panvel charge in brokerage?',
    a: 'Brokerage is agreed up front for each transaction rather than published as a fixed rate, since it depends on the property, the deal size and whether it is a sale, resale or rental. Call +91 80655 32578 and we will quote a figure before any work starts.',
  },
  {
    q: 'What is the difference between buying a new project flat and a resale flat in Panvel?',
    a: 'A new project flat is bought directly from a developer, usually under construction or newly completed, with the price and payment schedule set by the project\'s RERA registration. A resale flat is bought from its current owner, is typically ready to move into, and needs its own checks — OC status, society NOC, outstanding dues and clear title — which is where an on-ground local agent earns their fee.',
  },
  {
    q: 'Is Shri Sidhanath a real estate agent, a property broker, or a consultant?',
    a: 'All three terms describe the same MahaRERA-registered practice (A52000004595) — "real estate agent", "property broker" and "property consultant" are used interchangeably in Panvel and Navi Mumbai for someone who is paid brokerage to connect buyers, sellers, landlords and tenants. Shri Sidhanath has operated as a real estate agent and property broker in Panvel since 2004, handling sales, resale, rentals, land and property management under one desk.',
  },
];

// Property discovery filters
export const filters = {
  location: ['New Panvel', 'Panvel', 'Kharghar', 'Kamothe', 'Kalamboli', 'Taloja', 'Ulwe', 'Navi Mumbai', 'Mumbai', 'Thane', 'Raigad', 'Pune'],
  type: ['Residential', 'Commercial', 'Shops', 'Land', 'Plots', 'Retail', 'Office', 'Godowns', 'Industrial Units', 'Industrial Plots'],
  budget: ['Under 50 Lakh', '50 Lakh to 1 Cr', '1 Cr to 2 Cr', '2 Cr to 5 Cr', 'Above 5 Cr'],
  configuration: ['1 BHK', '2 BHK', '3 BHK', '4 BHK and above', 'Not applicable'],
  purpose: ['Buy', 'Rent', 'Sell', 'Invest', 'Lease out'],
};

// The mosaic gallery. Project exteriors first, then the two amenity views the
// client already publishes, then the office. Order matters: the first entry is
// what the large panel shows before anyone interacts.
export const gallery = [
  { id: 'g-delta', img: '/images/portfolio/residential/delta-prestige-tower.webp',
    name: 'Delta Prestige', where: 'New Panvel',
    alt: 'Delta Prestige, New Panvel: a mid-rise residential tower with a retail plinth.' },
  { id: 'g-godrej', img: '/images/portfolio/residential/godrej-city-panvel-towers.webp',
    name: 'Godrej City Panvel', where: 'Panvel',
    alt: 'Godrej City Panvel: a cluster of towers above a landscaped podium at dusk.' },
  { id: 'g-hiranandani', img: '/images/portfolio/residential/hiranandani-fortune-city-tower.webp',
    name: 'Hiranandani Fortune City', where: 'Panvel',
    alt: 'Hiranandani Fortune City, Panvel: a tower in the township elevation.' },
  { id: 'g-courtyard', img: '/images/portfolio/residential/delta-prestige-courtyard-900.webp',
    name: 'Courtyard deck', where: 'Delta Prestige',
    alt: 'A landscaped courtyard deck with seating and lawn.' },
  { id: 'g-sai', img: '/images/portfolio/residential/sai-world-empire-clubhouse.webp',
    name: 'Sai World Empire', where: 'Kharghar',
    alt: 'Sai World Empire, Kharghar: the domed clubhouse and central garden.' },
  { id: 'g-water', img: '/images/portfolio/residential/delta-prestige-water-garden-900.webp',
    name: 'Water garden', where: 'Delta Prestige',
    alt: 'A water feature and yoga lawn framed by pergolas.' },
  { id: 'g-meraki', img: '/images/portfolio/residential/meraki-panvel-tower.webp',
    name: 'Meraki', where: 'Panvel',
    alt: 'Meraki, Panvel: the tower elevation with its retail frontage.' },
  { id: 'g-emporia', img: '/images/portfolio/residential/emporia-hillcrest-towers.webp',
    name: 'Emporia Hillcrest', where: 'Panvel',
    alt: 'Emporia Hillcrest, Panvel: stepped towers above a retail plinth.' },
  { id: 'g-office', img: '/images/office/office-interior-signage-900.webp',
    name: 'The office', where: 'Sector 7, New Panvel',
    alt: 'The Shri Sidhanath office interior with brand signage and award shelving.' },
];

// Data for the three location landing pages added 2026-10-06, in the owner's
// stated priority order: Panvel first, then Raigad, then Navi Mumbai. Each
// page is a thin wrapper (src/pages/PanvelPage.jsx etc.) around the shared
// src/pages/LocationPage.jsx layout, and scripts/seo-fallback.js reads this
// same array to generate each page's no-JS fallback and JSON-LD at build
// time — edit this data, not the fallback or the JSX.
//
// Micro-market names come from three places only, never invented:
//   1. this file's existing `locations` array,
//   2. the business's own live Google Business Profile description, and
//   3. the business's own owner-authored replies to real Google reviews
//      (pulled via OpenSEO on 2026-10-06; see docs/GBP-CHECKLIST.md).
// No rating, review count, RERA number or address is restated here — every
// page pulls those straight from src/data/site.js so there is one source for
// the facts that must never drift.
export const locationPages = [
  {
    id: 'panvel',
    slug: 'real-estate-agent-panvel.html',
    path: '/real-estate-agent-panvel.html',
    navLabel: 'Panvel',
    breadcrumbLabel: 'Panvel',
    title: 'Real Estate Agent & Property Broker in Panvel | Shri Sidhanath',
    metaDescription:
      "Real estate agent & property dealer in Panvel — call +91 80655 32578. MahaRERA-registered, 4.8★ on Google (149 reviews). Buy, sell or rent flats, land and shops in Panvel, Kharghar, Kamothe, Taloja & Ulwe.",
    kicker: 'Panvel desk',
    h1: 'Real estate agent in Panvel — New Panvel, Kharghar, Kamothe, Taloja, Ulwe & Kalamboli',
    lede:
      'The practice is based in New Panvel and the Panvel node is where its knowledge runs deepest: six micro-markets, one desk, one MahaRERA registration.',
    intro: [
      "Shri Sidhanath Constructions & Estate Consultant is headquartered on Plot 18, Sector 7, New Panvel West — a MahaRERA-registered (A52000004595) real estate agency, property dealer and consultant rated 4.8 on Google from 149 reviews. Panvel is not one market from this desk's side of the table; it is six, and each one gets treated differently.",
      "Buying, selling, resale, renting and property management are handled across all six, alongside CIDCO resale flats, flat registration, stamp duty coordination and OC (occupancy certificate) checks on older buildings before they are recommended to anyone.",
    ],
    heroImage: '/images/locations/new-panvel-office-1200.webp',
    heroImageSmall: '/images/locations/new-panvel-office-800.webp',
    heroImageAlt: 'The Shri Sidhanath shopfront in New Panvel at night, MahaRERA seal above the door.',
    serviceAreas: ['New Panvel', 'Panvel', 'Kharghar', 'Kamothe', 'Kalamboli', 'Taloja', 'Ulwe'],
    submarkets: [
      {
        name: 'New Panvel',
        note:
          'Headquarters. Office 1, Siddhivinayak Krupa CHS Ltd, Plot 18, Sector 7, New Panvel West — the desk\'s own neighbourhood, within walking distance of Panvel railway station. Flats, shops and rentals on both sides of New Panvel, East and West, including Khanda Colony.',
      },
      {
        name: 'Old Panvel',
        note:
          'The older town centre around the station: resale flats, shops and godowns, where title history and society paperwork need a closer look than a new-build does.',
      },
      {
        name: 'Kharghar',
        note:
          'An established Navi Mumbai node with a deep resale and rental market — 1, 2 and 3 BHK flats, CIDCO-origin buildings and newer towers side by side.',
      },
      {
        name: 'Kamothe',
        note:
          'Residential blocks and a working retail strip along the Panvel–Kharghar corridor; a steady source of resale and rental enquiries.',
      },
      {
        name: 'Taloja',
        note:
          'Industrial estate alongside residential growth — godowns and industrial units as well as flats, with Taloja\'s MIDC belt a factor in demand.',
      },
      {
        name: 'Ulwe',
        note:
          'A CIDCO node that sits closest to Navi Mumbai International Airport, alongside neighbouring Dronagiri — the area drawing the most new-project interest right now.',
      },
      {
        name: 'Kalamboli',
        note:
          'The circle and junction area on the Mumbai–Pune highway side of Panvel: resale flats and commercial frontage with heavy footfall.',
      },
    ],
    faqs: [
      {
        q: 'Who is a reliable real estate agent in Panvel?',
        a: 'Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agent based in New Panvel, rated 4.8 on Google from 149 reviews, covering New Panvel, Old Panvel, Kharghar, Kamothe, Kalamboli, Taloja and Ulwe. Call or WhatsApp +91 80655 32578.',
      },
      {
        q: 'Which parts of Panvel does Shri Sidhanath cover?',
        a: 'New Panvel (where the office is), Old Panvel, Kharghar, Kamothe, Kalamboli, Taloja and Ulwe — buying, selling, resale, rental and property management in each.',
      },
      {
        q: 'Can I find a CIDCO resale flat in New Panvel through Shri Sidhanath?',
        a: 'Yes. CIDCO resale flats across New Panvel, Old Panvel and Kharghar are a core part of the practice, including an OC (occupancy certificate) check on the building before it is shown as an option.',
      },
      {
        q: 'Is Ulwe a good place to buy near Navi Mumbai International Airport?',
        a: 'Ulwe and neighbouring Dronagiri are the CIDCO nodes closest to Navi Mumbai International Airport (NMIA), which is why they are currently drawing the most new-project enquiries the desk sees. Whether it suits a specific budget and timeline is a conversation, not a blanket yes.',
      },
      {
        q: 'Is there a broker in Panvel for rent — flats, rooms or shops?',
        a: 'Yes. Shri Sidhanath takes rental requirements from tenants and landlords across New Panvel, Old Panvel, Kharghar, Kamothe, Kalamboli, Taloja and Ulwe — flats, row houses, shops and offices — with the brokerage agreed up front before any work starts. In Maharashtra a residential rental is normally signed as a leave and licence agreement, which has to be registered, and landlords are expected to share tenant details with the local police for verification; plan for both before the move-in date. Call or WhatsApp +91 80655 32578 with your budget, area and move-in date.',
      },
      {
        q: 'Does Shri Sidhanath handle commercial property in Panvel, like shops or godowns?',
        a: 'Yes. Shops, retail frontage, office floors, godowns and industrial units in Panvel and Taloja, alongside the residential practice.',
      },
      {
        q: 'How do I book a site visit in Panvel?',
        a: 'Call or WhatsApp +91 80655 32578, or visit the office at Plot 18, Sector 7, New Panvel West (open 9:00 to 22:00, daily) and a visit will be arranged at a time that suits you.',
      },
    ],
  },
  {
    // Added 2026-11-24. Search Console (21 Aug–21 Nov 2026) showed the
    // homepage, not a dedicated page, earning New Panvel searches: "real
    // estate agents in new panvel" (32 impressions, position 10.1), "new
    // panvel real estate agents" (23, 5.0), "property in khanda colony" (16,
    // 5.3), "real estate agents in khanda colony" (7, 1.3). Khanda Colony is
    // the locality the business's own Google Business Profile gives for the
    // office ("Sector 7 Khanda Colony", docs/GBP-CHECKLIST.md). The projects
    // named below come from src/data/projects.js and projectRegister.js.
    id: 'new-panvel',
    slug: 'real-estate-agent-new-panvel.html',
    path: '/real-estate-agent-new-panvel.html',
    navLabel: 'New Panvel',
    breadcrumbLabel: 'New Panvel',
    title: 'Real Estate Agent in New Panvel & Khanda Colony | Shri Sidhanath',
    metaDescription:
      'Real estate agent & property broker in New Panvel — call +91 80655 32578. Office in Sector 7, Khanda Colony, New Panvel West. MahaRERA-registered, 4.8★ on Google (149 reviews). Flats, rentals, shops.',
    kicker: 'New Panvel desk',
    h1: 'Real estate agent in New Panvel — East, West and Khanda Colony',
    lede:
      'The office is in New Panvel itself, on Plot 18, Sector 7, New Panvel West, in the Khanda Colony area. This is the market the desk works every day: flats to buy or rent, shops, and new projects inside the node.',
    intro: [
      "Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agency, property broker and consultant rated 4.8 on Google from 149 reviews, and New Panvel is its home ground. The office is within walking distance of Panvel railway station, so buyers and tenants can drop in, talk through a requirement and go straight on to a site visit.",
      'New Panvel is a CIDCO-planned node of numbered sectors on both sides, East and West. Most enquiries start with a sector, a budget and a flat size. Before a resale flat is shown as an option the desk checks occupancy certificate (OC) status for the building, the society NOC and share certificate, outstanding dues and clear title, and once a deal is agreed it coordinates flat registration and stamp duty payment.',
    ],
    heroImage: '/images/locations/new-panvel-office-1200.webp',
    heroImageSmall: '/images/locations/new-panvel-office-800.webp',
    heroImageAlt: 'The Shri Sidhanath shopfront in New Panvel at night, MahaRERA seal above the door.',
    serviceAreas: ['New Panvel', 'Khanda Colony', 'Panvel', 'Kamothe', 'Kalamboli', 'Kharghar'],
    submarkets: [
      {
        name: 'New Panvel West and Khanda Colony',
        note:
          "The office's own neighbourhood: Google lists it at Sector 7, Khanda Colony. Resale and rental flats in society buildings, plus shops on the neighbourhood's main roads, shown by a desk that is a short walk away.",
      },
      {
        name: 'New Panvel East',
        note:
          'Flats to buy or rent on the East side, handled by the same desk and the same phone number, so a shortlist can mix options from East and West.',
      },
      {
        name: 'New projects in New Panvel',
        note:
          'Projects the desk markets inside the node include Delta Prestige (Delta Group, Sector 17, 2 and 3 BHK), Sai Vrindavan (K T Infra, Plot 30+31, Sector 17, New Panvel West, MahaRERA P52000055382) and Park 11 (Homely Land Developers and Builders, 1 and 2 BHK, MahaRERA PR1270002500699). Details are on the projects page.',
      },
      {
        name: 'Rentals near Panvel station',
        note:
          'Flats and rooms on rent for tenants who want the station within reach, and for landlords looking for a tenant, with the brokerage agreed up front before any work starts.',
      },
    ],
    faqs: [
      {
        q: 'Who is a reliable real estate agent in New Panvel?',
        a: 'Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agent and property broker with its office in Sector 7, New Panvel West, rated 4.8 on Google from 149 reviews. It handles buying, selling, resale and rentals across New Panvel East and West. Call or WhatsApp +91 80655 32578.',
      },
      {
        q: 'What is the contact number for a property broker in New Panvel?',
        a: 'Call or WhatsApp Shri Sidhanath on +91 80655 32578, open 9:00 to 22:00 daily. Tell the desk the sector, budget and flat size you want and whether you are buying or renting, and it will shortlist what is currently available in New Panvel.',
      },
      {
        q: 'Is there a real estate agent in Khanda Colony?',
        a: 'Yes. The Shri Sidhanath office is in Khanda Colony itself: Office 1, Siddhivinayak Krupa CHS Ltd, Plot 18, Sector 7, New Panvel West, Navi Mumbai 410206. Walk in between 9:00 and 22:00 any day, or call +91 80655 32578 first.',
      },
      {
        q: 'Which new projects can I buy into in New Panvel?',
        a: 'Projects the desk markets in New Panvel include Delta Prestige (2 and 3 BHK, Sector 17), Sai Vrindavan (Sector 17, New Panvel West, MahaRERA P52000055382, proposed completion December 2029) and Park 11 (1 and 2 BHK, MahaRERA PR1270002500699, proposed completion May 2029). Availability and prices change, so call for what is open today.',
      },
      {
        q: 'Can you help me rent a flat in New Panvel?',
        a: 'Yes. The desk takes rental requirements from tenants and landlords across New Panvel, with the brokerage agreed before any work starts. In Maharashtra a residential rental is normally signed as a leave and licence agreement, which has to be registered, and landlords are expected to share tenant details with the local police for verification; plan for both before the move-in date.',
      },
      {
        q: 'What checks are done on a resale flat in New Panvel?',
        a: 'Occupancy certificate (OC) status for the building, the society NOC and share certificate, outstanding maintenance and other dues, and clear title, before the flat is shown as an option. Flat registration and stamp duty payment are coordinated once a deal is agreed.',
      },
    ],
  },
  {
    id: 'raigad',
    slug: 'real-estate-agent-raigad.html',
    path: '/real-estate-agent-raigad.html',
    navLabel: 'Raigad',
    breadcrumbLabel: 'Raigad',
    title: 'Real Estate Agent in Raigad District | Khopoli, Karjat, Pen & Alibaug | Shri Sidhanath',
    metaDescription:
      "Shri Sidhanath: MahaRERA-registered real estate agent (A52000004595) for land, plots and property across Raigad district — Khopoli, Karjat, and the wider Pen–Alibaug corridor. Rated 4.8★ on Google. Call +91 80655 32578.",
    kicker: 'Raigad district',
    h1: 'Real estate agent in Raigad district — Khopoli, Karjat and the Pen–Alibaug corridor',
    lede:
      'Where land and plotted development sit: NA plots, villa plots and agricultural land across Raigad, advised on from the same MahaRERA-registered desk that runs the Panvel practice.',
    intro: [
      "Raigad district, south of Panvel, is where Shri Sidhanath's land and plotted-development work concentrates — NA (non-agricultural) plots, villa plots and agricultural land, alongside flats and bungalows, handled by the same MahaRERA-registered (A52000004595) desk based in New Panvel.",
      "Khopoli and Karjat anchor that coverage, with enquiries extending into the wider corridor toward Pen and Alibaug. Title, zoning and approval status are checked on every parcel before it is put in front of a buyer — a non-negotiable step with land, where paperwork problems are harder to undo than with a flat.",
    ],
    heroImage: '/images/locations/raigad-aero-state-khopoli-1200.webp',
    heroImageSmall: '/images/locations/raigad-aero-state-khopoli-800.webp',
    heroImageAlt: 'Aero State T3, Khopoli: the landscaped entrance gate and approach road.',
    serviceAreas: ['Raigad', 'Khopoli', 'Karjat'],
    submarkets: [
      {
        name: 'Khopoli',
        note:
          'A core node for plotted development in the practice\'s Raigad coverage — land and plots, including branded projects such as Aero State.',
      },
      {
        name: 'Karjat',
        note:
          'NA plots, villa plots and agricultural land, extending the practice\'s Khopoli coverage further along the Mumbai–Pune rail and road corridor.',
      },
      {
        name: 'Neral',
        note:
          'Neighbouring Karjat on the same corridor; enquiries here are usually for agricultural land and weekend-home plots rather than ready flats.',
      },
      {
        name: 'Pen & Alibaug corridor',
        note:
          'The wider district toward Pen and Alibaug, where the desk advises buyers and investors evaluating land on the same title, zoning and approval basis as the Khopoli–Karjat belt — this is advisory coverage, not a claim of an office or a completed transaction in every town named.',
      },
    ],
    faqs: [
      {
        q: 'Does Shri Sidhanath deal in land and plots in Raigad district?',
        a: 'Yes. NA plots, villa plots and agricultural land across Khopoli, Karjat and the wider Raigad district are a core part of the practice, alongside flats and bungalows. Title, zoning and approvals are checked on every parcel before it is recommended.',
      },
      {
        q: 'What is an NA plot?',
        a: 'An NA (non-agricultural) plot is agricultural land that has been officially converted for non-agricultural use — residential, commercial or industrial — by the relevant authority. Buying agricultural land that has not been converted carries real restrictions on what can be built, which is why conversion status is checked before any Raigad land deal is recommended.',
      },
      {
        q: 'Is Khopoli a good place to invest in a plot?',
        a: 'Khopoli is one of the desk\'s core areas in Raigad district for plotted development, including branded projects. Whether it suits a specific budget, timeline and use case (residence, weekend home or investment) depends on the individual parcel — call +91 80655 32578 to discuss a shortlist.',
      },
      {
        q: 'Does Shri Sidhanath cover Alibaug or Pen?',
        a: 'The desk advises buyers and investors looking in the wider corridor toward Pen and Alibaug on the same basis as its core Khopoli–Karjat coverage — title, zoning and approval checks first. Depth of coverage there is less than in Khopoli and Karjat, so it is worth a direct call to confirm fit for a specific parcel.',
      },
      {
        q: 'How do I contact a real estate agent for Raigad district property?',
        a: 'Call or WhatsApp +91 80655 32578. The desk is based in New Panvel (Plot 18, Sector 7, New Panvel West), open 9:00 to 22:00 daily, and is MahaRERA-registered under A52000004595.',
      },
    ],
  },
  {
    id: 'navi-mumbai',
    slug: 'real-estate-agent-navi-mumbai.html',
    path: '/real-estate-agent-navi-mumbai.html',
    navLabel: 'Navi Mumbai',
    breadcrumbLabel: 'Navi Mumbai',
    title: 'Real Estate Agent & Property Consultant in Navi Mumbai | Shri Sidhanath',
    metaDescription:
      "Real estate agent, property consultant & dealer for Navi Mumbai — call +91 80655 32578. MahaRERA-registered, 4.8★ on Google (149 reviews). Kharghar, Kamothe, Ulwe and the Panvel node, plus Vashi, Nerul & Belapur.",
    kicker: 'Navi Mumbai',
    h1: 'Real estate agent & property consultant in Navi Mumbai — Kharghar, Ulwe, Vashi, Nerul & Belapur',
    lede:
      'From the Panvel node outward: the same MahaRERA-registered desk extends its advisory to Navi Mumbai\'s established nodes for buyers who want one point of contact across the city.',
    intro: [
      "Shri Sidhanath's deepest coverage in Navi Mumbai is the Panvel node — Kharghar, Kamothe, Kalamboli, Taloja and Ulwe — run from the practice's own office in New Panvel. The same MahaRERA-registered (A52000004595) desk also takes buying, selling, resale and rental requirements in Navi Mumbai's other established nodes: Vashi, Nerul and Belapur.",
      "This is advisory coverage in the same vein as the practice's selective mandates in Mumbai, Thane and Pune — real requirements the desk works on, not a claim of an office or an exclusive listing in every node named. For a buyer who wants a shortlist across more than one part of Navi Mumbai without talking to five different agents, it is one desk and one phone number.",
    ],
    heroImage: '/images/locations/navi-mumbai-lunaris-1200.webp',
    heroImageSmall: '/images/locations/navi-mumbai-lunaris-800.webp',
    heroImageAlt: 'Lunaris by Raheja, Navi Mumbai: residential towers above a wooded ridge at sunset.',
    serviceAreas: ['Navi Mumbai', 'Kharghar', 'Vashi', 'Nerul', 'Belapur'],
    submarkets: [
      {
        name: 'Kharghar',
        note:
          'The desk\'s deepest Navi Mumbai coverage outside Panvel itself — resale and rental flats across CIDCO-origin and newer buildings alike.',
      },
      {
        name: 'Vashi',
        note:
          'Navi Mumbai\'s established commercial and residential hub; enquiries here are handled on the same advisory basis as the practice\'s Mumbai and Thane work.',
      },
      {
        name: 'Nerul',
        note:
          'A planned residential node with a steady resale market; requirements are shortlisted and checked the same way as the Panvel-side markets.',
      },
      {
        name: 'Belapur (CBD Belapur)',
        note:
          'Navi Mumbai\'s administrative and commercial centre; the desk takes residential and office-space requirements here on request.',
      },
    ],
    faqs: [
      {
        q: 'Does Shri Sidhanath work as a real estate agent in Navi Mumbai outside Panvel?',
        a: 'Yes. Alongside its deepest coverage in the Panvel node (Kharghar, Kamothe, Kalamboli, Taloja, Ulwe), the desk takes buying, selling, resale and rental requirements in Vashi, Nerul and Belapur on an advisory basis, the same way it handles selective mandates in Mumbai, Thane and Pune.',
      },
      {
        q: 'Which part of Navi Mumbai does Shri Sidhanath know best?',
        a: 'Kharghar and the Panvel node — Kamothe, Kalamboli, Taloja and Ulwe — where the practice is based and where it has the deepest local knowledge. Vashi, Nerul and Belapur are covered on request.',
      },
      {
        q: 'Can Shri Sidhanath help with a flat in Vashi or Nerul?',
        a: 'Yes, on an advisory basis — call +91 80655 32578 with the budget, configuration and timeline and the desk will work the requirement, drawing on the same documentation, valuation and registration process used across its Panvel-node transactions.',
      },
      {
        q: 'Is Shri Sidhanath MahaRERA registered for work across Navi Mumbai?',
        a: 'Yes. The registration (MahaRERA A52000004595) is held by the agency, not by a single locality, so it applies to every transaction the desk handles, in any Navi Mumbai node.',
      },
      {
        q: 'How do I contact Shri Sidhanath about a Navi Mumbai property?',
        a: 'Call or WhatsApp +91 80655 32578, email, or visit the office at Plot 18, Sector 7, New Panvel West, open 9:00 to 22:00 daily.',
      },
    ],
  },
  {
    id: 'kharghar',
    slug: 'real-estate-agent-kharghar.html',
    path: '/real-estate-agent-kharghar.html',
    navLabel: 'Kharghar',
    breadcrumbLabel: 'Kharghar',
    title: 'Real Estate Agent in Kharghar | Flats for Sale & Rent | Shri Sidhanath',
    metaDescription:
      "Shri Sidhanath: MahaRERA-registered real estate agent for Kharghar — resale and rental flats, new projects such as Sai World Empire, plus registration and stamp duty help. Rated 4.8★ on Google (149 reviews). Call +91 80655 32578.",
    kicker: 'Kharghar',
    h1: 'Real estate agent in Kharghar — flats to buy, resale and rent',
    lede:
      "Kharghar sits inside the Panvel node the practice knows best: the same MahaRERA-registered desk that works New Panvel and Kamothe handles Kharghar buying, resale and rental requirements.",
    intro: [
      "Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agency and property consultant based in New Panvel. Kharghar is part of its core coverage alongside Kamothe, Kalamboli, Taloja and Ulwe, and the desk takes buying, selling, resale and rental requirements there.",
      "The practice markets Kharghar projects including Sai World Empire (Sector 36, opposite CIDCO Valleyshilp), Symphony and Adhiraj. For resale and rental flats the desk checks the paperwork that matters before a flat is shown as an option — occupancy certificate (OC) status for older buildings, society NOC, outstanding dues and clear title — and coordinates flat registration and stamp duty once a deal is agreed.",
    ],
    heroImage: '/images/locations/new-panvel-office-1200.webp',
    heroImageSmall: '/images/locations/new-panvel-office-800.webp',
    heroImageAlt: 'The Shri Sidhanath shopfront in New Panvel at night, MahaRERA seal above the door.',
    serviceAreas: ['Kharghar', 'Navi Mumbai', 'Kamothe', 'New Panvel', 'Panvel'],
    submarkets: [
      {
        name: 'Resale flats in Kharghar',
        note:
          'CIDCO-origin buildings and newer towers side by side. Each resale option is checked for OC status, society NOC, dues and title before it is recommended.',
      },
      {
        name: 'Rental flats in Kharghar',
        note:
          'Rental requirements for tenants and landlords, agreed with the brokerage fixed up front rather than discovered at the end.',
      },
      {
        name: 'New projects in Kharghar',
        note:
          'Projects the desk markets here include Sai World Empire (Sector 36, opposite CIDCO Valleyshilp), Symphony and Adhiraj. See the projects page for the current list.',
      },
      {
        name: 'Beyond Kharghar',
        note:
          'Buyers comparing Kharghar with its neighbours can shortlist across Kamothe, New Panvel and Ulwe with the same desk and the same phone number.',
      },
    ],
    faqs: [
      {
        q: 'Who is a reliable real estate agent in Kharghar?',
        a: 'Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agent based in New Panvel, rated 4.8 on Google from 149 reviews. Kharghar is part of its core coverage for buying, selling, resale and rentals.',
      },
      {
        q: 'Does Shri Sidhanath have flats for sale in Kharghar?',
        a: 'The desk markets Kharghar projects including Sai World Empire (Sector 36), Symphony and Adhiraj, and also handles resale flats. Call +91 80655 32578 with your budget and configuration and the desk will shortlist what is currently available.',
      },
      {
        q: 'Can you help me rent a flat in Kharghar?',
        a: 'Yes. The desk takes rental requirements from both tenants and landlords in Kharghar. Brokerage is agreed up front before any work starts.',
      },
      {
        q: 'What checks are done on a resale flat in Kharghar?',
        a: 'Occupancy certificate (OC) status for the building, society NOC, outstanding dues and clear title, before the flat is shown as an option. Flat registration and stamp duty payment are coordinated once a deal is agreed.',
      },
      {
        q: 'How do I contact Shri Sidhanath about a Kharghar property?',
        a: 'Call or WhatsApp +91 80655 32578, or visit the office at Plot 18, Sector 7, New Panvel West, open 9:00 to 22:00 daily.',
      },
    ],
  },
  {
    id: 'kamothe',
    slug: 'real-estate-agent-kamothe.html',
    path: '/real-estate-agent-kamothe.html',
    navLabel: 'Kamothe',
    breadcrumbLabel: 'Kamothe',
    title: 'Real Estate Agent & Broker in Kamothe | Shri Sidhanath',
    metaDescription:
      "Real estate agent & property broker for Kamothe, Navi Mumbai — call +91 80655 32578. MahaRERA-registered, 4.8★ on Google (149 reviews). Resale flats, rentals and shops, from the New Panvel desk next door.",
    kicker: 'Kamothe',
    h1: 'Real estate agent in Kamothe — resale flats, rentals and shops',
    lede:
      'Kamothe sits between Kharghar and Kalamboli, a short drive from the New Panvel office: resale and rental flats in its numbered sectors, and shops along its main roads.',
    intro: [
      "Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agency, property broker and consultant based in New Panvel, rated 4.8 on Google from 149 reviews. Kamothe is part of its core coverage alongside Kharghar, Kalamboli, Taloja and Ulwe, and most of the Kamothe work is resale and rental: buyers and tenants looking for a flat, owners looking to sell or let one, and shopkeepers looking for frontage.",
      "Kamothe is a CIDCO-planned node laid out in numbered sectors along the Sion–Panvel Highway, so most enquiries start with a sector and a budget rather than a project name. Before a resale flat is shown as an option the desk checks the paperwork that matters: occupancy certificate (OC) status for the building, the society's NOC and share certificate, outstanding dues and clear title. Flat registration and stamp duty are coordinated once a deal is agreed.",
    ],
    heroImage: '/images/locations/new-panvel-office-1200.webp',
    heroImageSmall: '/images/locations/new-panvel-office-800.webp',
    heroImageAlt: 'The Shri Sidhanath shopfront in New Panvel at night, MahaRERA seal above the door.',
    serviceAreas: ['Kamothe', 'Navi Mumbai', 'Kharghar', 'Kalamboli', 'New Panvel', 'Panvel'],
    submarkets: [
      {
        name: 'Resale flats in Kamothe',
        note:
          '1, 2 and 3 BHK flats in CIDCO-origin society buildings and newer towers. Each option is checked for OC status, society NOC, dues and title before it is recommended.',
      },
      {
        name: 'Flats and rooms on rent in Kamothe',
        note:
          'Rental requirements from tenants and landlords, with the brokerage agreed up front. Commuters usually ask about the Harbour line first: Mansarovar and Khandeshwar are the nearby stations.',
      },
      {
        name: 'Shops and commercial frontage',
        note:
          "Shops and small commercial units on Kamothe's main roads and its retail strip, to buy or to rent, alongside the residential work.",
      },
      {
        name: 'Kamothe and its neighbours',
        note:
          'Buyers comparing Kamothe with Kharghar, Kalamboli or New Panvel can shortlist across all four with the same desk and the same phone number.',
      },
    ],
    faqs: [
      {
        q: 'Who is a reliable real estate agent in Kamothe?',
        a: 'Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agent and property broker based in New Panvel, rated 4.8 on Google from 149 reviews. Kamothe is part of its core coverage for buying, selling, resale and rentals. Call or WhatsApp +91 80655 32578.',
      },
      {
        q: 'What is the contact number for a property broker in Kamothe?',
        a: 'Call or WhatsApp Shri Sidhanath on +91 80655 32578, open 9:00 to 22:00 daily. Share the sector, budget and configuration you want and the desk will shortlist what is currently available in Kamothe.',
      },
      {
        q: 'Can you help me rent a flat or a room in Kamothe?',
        a: 'Yes. The desk takes rental requirements from tenants and landlords in Kamothe, with the brokerage agreed before any work starts. In Maharashtra a residential rental is normally signed as a leave and licence agreement, which has to be registered, and landlords are expected to share tenant details with the local police for verification; plan for both before the move-in date.',
      },
      {
        q: 'What checks are done on a resale flat in Kamothe?',
        a: 'Occupancy certificate (OC) status for the building, the society NOC and share certificate, outstanding maintenance and other dues, and clear title, before the flat is shown as an option. Flat registration and stamp duty payment are coordinated once a deal is agreed.',
      },
      {
        q: 'Is Kamothe or Kharghar better for buying a flat?',
        a: 'It depends on budget and commute. Kamothe and Kharghar are neighbouring nodes, and buyers often compare the two on price, building age and distance to the station. The desk covers both, so a shortlist can include options from each.',
      },
      {
        q: 'Where is the Shri Sidhanath office for Kamothe enquiries?',
        a: 'Office 1, Siddhivinayak Krupa CHS Ltd, Plot 18, Sector 7, New Panvel West, Navi Mumbai 410206, open 9:00 to 22:00 daily. Site visits in Kamothe are arranged at a time that suits you.',
      },
    ],
  },
  {
    id: 'kalamboli',
    slug: 'real-estate-agent-kalamboli.html',
    path: '/real-estate-agent-kalamboli.html',
    navLabel: 'Kalamboli',
    breadcrumbLabel: 'Kalamboli',
    title: 'Real Estate Agent & Broker in Kalamboli | Shri Sidhanath',
    metaDescription:
      'Real estate agent & property broker for Kalamboli, Navi Mumbai — call +91 80655 32578. MahaRERA-registered, 4.8★ on Google (149 reviews). Resale flats, rentals and commercial space, from the New Panvel office.',
    kicker: 'Kalamboli',
    h1: 'Real estate agent in Kalamboli — resale flats, rentals and commercial space',
    lede:
      'Kalamboli sits at the junction where the Sion–Panvel Highway meets the Mumbai–Pune Expressway, next to New Panvel: CIDCO-sector flats to buy or rent, and shops and commercial units along its busy roads.',
    intro: [
      "Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agency, property broker and consultant based in New Panvel, rated 4.8 on Google from 149 reviews. Kalamboli is part of its core coverage alongside Kharghar, Kamothe, Taloja and Ulwe. Most of the Kalamboli work is resale and rental — families and working tenants looking for a flat, owners looking to sell or let one — plus shops and commercial frontage, where the junction's traffic brings footfall.",
      'Kalamboli is a CIDCO-planned node of numbered sectors, best known for its road links and for the steel market on its edge. It has no Harbour line station of its own, so tenants and buyers who commute by train usually ask first how far a flat is from Khandeshwar or Panvel station; those who drive to Mumbai or Pune ask about the Expressway. Before a resale flat is recommended, the desk checks occupancy certificate (OC) status, the society NOC and share certificate, outstanding dues and clear title, and coordinates flat registration and stamp duty once a deal is agreed.',
    ],
    heroImage: '/images/locations/new-panvel-office-1200.webp',
    heroImageSmall: '/images/locations/new-panvel-office-800.webp',
    heroImageAlt: 'The Shri Sidhanath shopfront in New Panvel at night, MahaRERA seal above the door.',
    serviceAreas: ['Kalamboli', 'Navi Mumbai', 'New Panvel', 'Kamothe', 'Taloja', 'Panvel'],
    submarkets: [
      {
        name: 'Resale flats in Kalamboli',
        note:
          '1, 2 and 3 BHK flats in CIDCO-origin society buildings and newer towers across its sectors, each checked for OC status, society NOC, dues and title before it is shown.',
      },
      {
        name: 'Flats on rent in Kalamboli',
        note:
          'Rental requirements from tenants and landlords, brokerage agreed up front. A common brief: a flat that keeps the Expressway, the JNPT road and Khandeshwar or Panvel station within easy reach.',
      },
      {
        name: 'Shops and commercial units',
        note:
          'Shops and commercial frontage on Kalamboli’s main roads, to buy or to rent. Godown enquiries along the highway corridors are taken by the same commercial desk that covers Taloja.',
      },
      {
        name: 'Kalamboli and New Panvel',
        note:
          'The office is a short drive away in New Panvel West, so buyers weighing Kalamboli against New Panvel, Kamothe or Taloja can shortlist across all of them with one desk and one phone number.',
      },
    ],
    faqs: [
      {
        q: 'Who is a reliable real estate agent in Kalamboli?',
        a: 'Shri Sidhanath Constructions & Estate Consultant is a MahaRERA-registered (A52000004595) real estate agent and property broker based in New Panvel, next to Kalamboli, rated 4.8 on Google from 149 reviews. It handles buying, selling, resale and rentals in Kalamboli. Call or WhatsApp +91 80655 32578.',
      },
      {
        q: 'What is the contact number for a property broker in Kalamboli?',
        a: 'Call or WhatsApp Shri Sidhanath on +91 80655 32578, open 9:00 to 22:00 daily. Tell the desk the sector, budget and flat size you want in Kalamboli, and whether you are buying or renting, and it will shortlist what is available.',
      },
      {
        q: 'Can you find me a flat on rent in Kalamboli?',
        a: 'Yes. The desk takes rental requirements from tenants and landlords in Kalamboli, with the brokerage agreed before any work starts. A residential rental in Maharashtra is normally signed as a registered leave and licence agreement, and landlords are expected to share tenant details with the local police for verification, so allow time for both before moving in.',
      },
      {
        q: 'Do you handle shops or commercial property in Kalamboli?',
        a: 'Yes. Shops and commercial units on Kalamboli’s main roads, to buy or rent, alongside the residential work. Godown and warehouse requirements near the highway corridors are handled by the same desk that covers Taloja’s godowns and industrial units.',
      },
      {
        q: 'Is Kalamboli or New Panvel better for buying a flat?',
        a: 'It depends on how you commute. Kalamboli suits buyers who drive, with the Mumbai–Pune Expressway, the Sion–Panvel Highway and the JNPT road at its junction; New Panvel suits buyers who want to walk to Panvel station. The desk covers both, so a shortlist can include options from each.',
      },
      {
        q: 'Where is the Shri Sidhanath office for Kalamboli enquiries?',
        a: 'Office 1, Siddhivinayak Krupa CHS Ltd, Plot 18, Sector 7, New Panvel West, Navi Mumbai 410206, open 9:00 to 22:00 daily — a short drive from Kalamboli. Site visits in Kalamboli are arranged at a time that suits you.',
      },
    ],
  },
];
