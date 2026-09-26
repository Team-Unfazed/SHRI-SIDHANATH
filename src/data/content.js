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
    note: 'Our office is on Plot 18, Sector 7. Everything we know about this market, we learned on foot.',
    primary: true,
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
    q: 'Why choose Shri Sidhanath as your real estate agent in Panvel?',
    a: 'We are a MahaRERA-registered consultancy (A52000004595) with our own office in New Panvel, open 9:00 to 22:00 every day, and rated 4.8 on Google from 145 reviews. One desk handles buying, selling, resale, rentals and property management across Panvel, Kharghar, Kamothe, Kalamboli, Taloja and Ulwe.',
  },
  {
    q: 'How does Shri Sidhanath help buyers?',
    a: 'We begin with your requirement, budget and timeline, then shortlist only what genuinely fits. We arrange site visits, read the technical and legal position of each option with you, negotiate, and stay involved through documentation and handover.',
  },
  {
    q: 'Do you handle resale?',
    a: 'Yes. Resale is a core part of the practice. We value against real local transactions rather than asking prices, qualify buyers properly, and manage the paperwork through to registration.',
  },
  {
    q: 'Do you handle rentals?',
    a: 'Yes. We handle residential and commercial leasing, including tenant qualification, agreement drafting support and renewals.',
  },
  {
    q: 'Do you handle commercial property?',
    a: 'Yes. Shops, retail, office floors, godowns, industrial units and industrial plots, alongside our residential work.',
  },
  {
    q: 'Do you work with land and plots?',
    a: 'Yes. We work on land and plotted development, including branded land products. Title, zoning and approvals are examined before anything is recommended.',
  },
  {
    q: 'Which locations do you cover?',
    a: 'Mumbai, Navi Mumbai, Thane, Raigad and Pune. Our deepest coverage is the Panvel node, where we are based, along with Kharghar, Kamothe, Kalamboli, Taloja and Ulwe.',
  },
  {
    q: 'Do you provide property management?',
    a: 'Yes. Tenancy administration, upkeep coordination, inspections and society liaison, which suits owners who are not living locally.',
  },
  {
    q: 'Can I schedule a site visit?',
    a: 'Yes. Call or message us on WhatsApp and we will arrange a visit at a time that works for you, including weekends.',
  },
  {
    q: 'How can I contact Shri Sidhanath?',
    a: 'Call or WhatsApp 9820759348, email us, or visit the office at Plot 18, Sector 7, New Panvel West. We reply to every enquiry.',
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
