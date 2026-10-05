// Company facts. Every value here comes from the client brief or is evidenced on
// their Instagram. Nothing in this file is inferred. See docs/RESEARCH-INSTAGRAM.md

export const site = {
  legalName: 'Shri Sidhanath Constructions and Real Estate',
  name: 'Shri Sidhanath',
  fullName: 'Shri Sidhanath Constructions & Estate Consultant',
  tagline: 'Your Trusted Partner in Premium Real Estate Solutions',
  proprietor: 'Ravi Sargar',
  rera: 'A52000004595',
  reraAuthority: 'MahaRERA',
  headquarters: 'New Panvel, Navi Mumbai',

  phone: '9820759348',
  phoneIntl: '+919820759348',
  phoneDisplay: '+91 98207 59348',
  whatsapp: 'https://wa.me/919820759348',

  emails: [
    'ravisargar@gmail.com',
    'ravisargar@shrisidhanath.com',
    'shrisidhanathestate2000@gmail.com',
  ],

  address: {
    line1: 'Office 1, Siddhivinayak Krupa CHS Ltd',
    line2: 'Plot 18, Sector 7',
    line3: 'New Panvel West',
    city: 'Navi Mumbai',
    pincode: '410206',
    region: 'Maharashtra',
    country: 'IN',
  },

  // Verified live on the client's Google Business Profile via OpenSEO,
  // 2026-10-06 (re-check of the 2026-09-12 figures in
  // docs/RESEARCH-GOOGLE-FACEBOOK.md — rating unchanged, review count moved
  // 145 -> 150). These are the only rating, review-count and opening-hours
  // figures on the site, and they are not rounded or restated.
  google: {
    rating: '4.8',
    reviews: 150,
    opens: '09:00',
    closes: '22:00',
    hoursLabel: '9:00 to 22:00, daily',
    url: 'https://www.google.com/maps/search/?api=1&query=Shri+Sidhanath+Constructions+%26+Estate+Consultant%2C+Sector+7%2C+Panvel',
  },

  social: {
    instagram: 'https://www.instagram.com/shrisidhanath.estate/',
    facebook: 'https://www.facebook.com/shrisidhanath/',
    youtube: 'https://www.youtube.com/@ShriSidhanathEstate',
  },
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
];

export const tel = `tel:${site.phoneIntl}`;
export const mailto = `mailto:${site.emails[0]}`;
