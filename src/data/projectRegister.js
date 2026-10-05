// The client's own RERA project register ("Master property knowledge base",
// updated 3 October 2026), keyed by MahaRERA registration number.
//
// Two jobs, both done in `applyRegister` (projects.js):
//   1. A registration already in the inventory gains the detail below. Its
//      name, promoter and market stay exactly as MahaRERA records them.
//   2. A registration not in the inventory becomes a new project.
//
// What is deliberately NOT carried over from the register, by its own rules:
//   - prices, offers, live availability and booking/sold snapshots (dynamic);
//   - any field the register itself marks "verify" or says sources disagree
//     on. Those are left out here rather than stated, e.g. the unit count of
//     Rainbow Life, the configuration of Crestoria T4, Zenia, Atheletica and
//     Olive Boulevard, the carpet size of Crestoria T2, the building count of
//     Olive Boulevard, and the status of Parivaramm and Orchid.
//   - amenity lists (promoter marketing, not registration facts).
//
// `completionDate` is the declared RERA timeline — proposed or revised — and
// is always shown as "proposed", never as a promise.
//
// DO NOT fill a gap in here with an assumption. Add a field only when the
// register states it without a caveat.

export const REGISTER_UPDATED = '3 October 2026';

const UC = 'Under Construction';
const WILLOWS = 'Golden Willows, Hiranandani Fortune City, Bhokarpada, Panvel';
const ARENA = 'The Arena, Hiranandani Fortune City, Khalapur';
const CRESTORIA = 'Bhokarpada, Panvel (Old Mumbai–Pune Highway)';

export const registerEntries = [
  // ---- not previously on the site ---------------------------------------
  {
    reraNumber: 'P52000077541', name: 'Jeswani Luxurios', developer: 'Jeswani Properties LLP',
    area: 'Panvel', district: 'Raigarh', location: 'Village Panvel, Taluka Panvel',
    category: 'Residential', projectType: 'Others', status: UC,
    buildings: 1, floors: '8', units: '38 (12 × 3 BHK, 11 × 4 BHK, 15 shops)',
    config: '3 & 4 BHK, shops', carpet: 'About 47–255 sq m', completionDate: '30 June 2028',
  },
  {
    reraNumber: 'P52000030422', name: 'Parivaramm Phase I', developer: 'Vijay Ashok Jeswani',
    area: 'Khalapur', district: 'Raigarh', location: 'Survey No. 40/1/A, Vavandhal, Khalapur',
    category: 'Residential', projectType: 'Residential',
    buildings: 2, units: 98, config: '1 RK, 1 & 2 BHK', carpet: 'About 220–551 sq ft',
    registrationDate: '25 August 2021', completionDate: 'December 2024',
  },
  {
    reraNumber: 'P52000030442', name: 'Parivaramm Phase II', developer: 'Vijay Ashok Jeswani',
    area: 'Khalapur', district: 'Raigarh', location: 'Survey No. 40/1/A, Vavandhal, Khalapur',
    category: 'Residential', projectType: 'Residential / Group Housing',
    buildings: 2, units: 84, config: '1 RK, 1 & 2 BHK', carpet: 'About 23–48 sq m',
    registrationDate: '25 August 2021', completionDate: 'August 2026',
  },
  {
    reraNumber: 'P52000048037', name: 'Today Global Anandam Phase II', developer: 'Today Global Homes',
    area: 'Panvel', district: 'Raigarh', location: 'Rohinjan, Panvel',
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 3, floors: '23, 23 and 29', units: 807, config: '1 & 2 BHK',
    carpet: 'Average about 34.5 sq m (1 BHK) and 51.2 sq m (2 BHK)',
    registrationDate: '7 December 2022', completionDate: '31 December 2027',
  },
  {
    reraNumber: 'PR1270002502999', name: 'Dhanraj Legacy', developer: 'Dhanraj Realbuild LLP',
    area: 'Khalapur', district: 'Raigarh', pincode: '410207', location: 'Survey No. 08, Lodhivali, Khalapur',
    category: 'Residential', projectType: 'Residential / Group Housing', status: 'New Launch',
    buildings: 1, floors: '15', units: 177, config: '1 & 2 BHK', carpet: 'About 375–555 sq ft',
    completionDate: '30 January 2031',
  },
  {
    reraNumber: 'PR1270002500699', name: 'Park 11', developer: 'Homely Land Developers and Builders',
    area: 'New Panvel', district: 'Raigarh', pincode: '410206', location: 'New Panvel',
    category: 'Residential', projectType: 'Residential / Group Housing', status: 'New Launch',
    buildings: 1, units: 107, config: '1 & 2 BHK', carpet: 'About 323–532 sq ft',
    completionDate: '31 May 2029',
  },
  {
    reraNumber: 'P52000055382', name: 'Sai Vrindavan', developer: 'K T Infra',
    area: 'New Panvel', district: 'Raigarh', pincode: '410206',
    location: 'Plot 30+31, Sector 17, New Panvel West',
    category: 'Residential', status: UC,
    buildings: 4, floors: '10', units: 280,
    registrationDate: '22 March 2024', completionDate: '31 December 2029',
  },
  {
    reraNumber: 'P51700079145', name: 'The Oasis (Paradise CHS)', developer: 'Paradise CHS Ltd',
    area: 'Navi Mumbai', pincode: '400705', location: 'Sector 7, Sanpada, Navi Mumbai',
    category: 'Residential', projectType: 'Residential',
    buildings: 3, floors: '35', units: 336, config: '2 & 3 BHK', carpet: 'About 872–1,256 sq ft',
    completionDate: 'December 2030',
  },
  {
    reraNumber: 'PR1271012502204', name: 'Olive Boulevard', developer: 'Olive Infra & Lifestyle LLP',
    area: 'Panvel', district: 'Raigarh', pincode: '410206', location: 'Akurli, Panvel',
    category: 'Residential', projectType: 'Residential / Group Housing', status: 'New Launch',
    floors: 'About 17', units: 441,
    registrationDate: 'January 2026', completionDate: '31 December 2029',
  },
  {
    reraNumber: 'PM1270002502941', name: 'Deep Destiny-2', developer: 'Sambhav Arena LLP',
    area: 'Panvel', district: 'Raigarh', pincode: '410206', location: 'Sector 2A, Karanjade, Panvel',
    category: 'Mixed use', projectType: 'Mixed', status: UC,
    buildings: 2, floors: '3 per building', units: '29 (20 residential, 9 other)',
    config: '1 & 2 BHK', carpet: 'About 396–434 sq ft',
    registrationDate: '18 March 2026', completionDate: '31 December 2029',
  },
  {
    reraNumber: 'PM1270002502349', name: 'Deep Niketan', developer: 'Sambhav Buildcon',
    area: 'Panvel', district: 'Raigarh', pincode: '410206', location: 'Sector 4, Karanjade, Panvel',
    category: 'Mixed use', projectType: 'Mixed', status: UC,
    buildings: 1, floors: '8', units: '54 (46 residential, 8 other)',
    registrationDate: '13 February 2026', completionDate: '31 December 2029',
  },
  {
    reraNumber: 'PR1270002501448', name: 'J Prime Swastik', developer: 'Venkatesha Realty Partnership',
    area: 'Panvel', district: 'Raigarh', pincode: '410206', location: 'Giravale, Panvel',
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 2, floors: '8 sanctioned (7 habitable)', units: 105,
    config: '1 RK, 1 & 2 BHK', carpet: 'About 402–940 sq ft',
    registrationDate: '11 November 2025', completionDate: '31 December 2030',
  },
  {
    reraNumber: 'PC1330002601859', name: 'ONE BCC', developer: 'Krishi Infratech LLP',
    area: 'Navi Mumbai', pincode: '400705', location: 'Turbhe, Navi Mumbai',
    category: 'Commercial', projectType: 'Commercial', status: 'Registered',
    buildings: 1, floors: '11', units: '90 (commercial)',
    config: 'Office space', carpet: 'About 395–1,190 sq ft',
    registrationDate: '10 September 2026', completionDate: '31 December 2033',
  },

  // ---- the client's "Meraki" listing, which the register identifies as
  //      9 Meraki, Shedung (1 & 2 BHK, Panvel) ------------------------------
  {
    reraNumber: 'P52000054448', attachTo: 'meraki-panvel', developer: 'Ekdant Emperia LLP',
    district: 'Raigarh', location: 'Shedung, Panvel', projectType: 'Others', status: UC,
    buildings: 2, units: 325,
    registrationDate: '25 January 2024', completionDate: '31 December 2028',
  },

  // ---- already on the site from MahaRERA: detail added -------------------
  {
    reraNumber: 'PR1271012600320', location: 'Bhokarpada, Panvel',
    category: 'Residential', projectType: 'Residential / Group Housing', status: 'New Launch',
    buildings: 2, floors: '34 per tower (33 habitable)', units: 500,
    config: '1 & 2 BHK', carpet: 'About 375–618 sq ft',
    registrationDate: '30 April 2026', completionDate: '31 December 2030',
  },
  {
    reraNumber: 'P52000078843', // Ellora Siddhi Rainbow Life
    buildings: 1, config: '2 & 3 BHK', carpet: '698 & 737 sq ft (2 BHK); 928 & 952 sq ft (3 BHK)',
    registrationDate: '15 January 2025', completionDate: '31 December 2030',
  },
  {
    reraNumber: 'P52000055992', location: 'Sector 34A, Kharghar',
    category: 'Residential', projectType: 'Residential',
    buildings: 1, floors: '42 sanctioned (29 habitable)', units: 148,
    config: '2 & 3 BHK', carpet: 'About 622–670 sq ft (2 BHK); about 906 sq ft (3 BHK)',
    registrationDate: '6 May 2024', completionDate: '31 December 2029',
  },
  {
    reraNumber: 'P52000054611', location: 'Gut No. 77, Adivali, Panvel',
    category: 'Residential', projectType: 'Others', status: UC,
    buildings: 2, floors: '17 and 14', units: 193, config: '1 & 2 BHK',
    carpet: 'Average about 31.8 sq m (1 BHK) and 47.7 sq m (2 BHK)',
    registrationDate: '31 January 2024', completionDate: '31 December 2027',
  },
  {
    reraNumber: 'PR1270002502927', location: CRESTORIA, // T1
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 1, floors: '37 sanctioned (35 habitable)', units: 258,
    config: '2 BHK', carpet: 'About 720–870 sq ft',
    registrationDate: '18 March 2026', completionDate: '30 September 2030',
  },
  {
    reraNumber: 'PR1270002502892', location: CRESTORIA, // T2
    category: 'Residential',
    buildings: 1, floors: '37 sanctioned (35 habitable)', units: 193, config: '3 BHK',
    registrationDate: '18 March 2026', completionDate: '31 July 2030',
  },
  {
    reraNumber: 'PR1270002502891', location: CRESTORIA, // T3
    category: 'Residential', status: UC,
    buildings: 1, floors: '37 sanctioned (35 habitable)', units: 258,
    config: '2 BHK', carpet: 'About 720–870 sq ft',
    registrationDate: '18 March 2026', completionDate: '31 July 2030',
  },
  {
    reraNumber: 'PR1270002502890', location: CRESTORIA, // T4
    category: 'Residential', status: UC,
    buildings: 1, floors: '36 sanctioned (34 habitable)', units: 131,
    registrationDate: '18 March 2026', completionDate: '28 February 2030',
  },
  {
    reraNumber: 'PR1270002502889', location: CRESTORIA, // T5
    category: 'Residential', status: UC,
    buildings: 1, floors: '36 sanctioned (34 habitable)', units: 131,
    config: '2, 3 & 4 BHK', carpet: 'About 85–145 sq m',
    registrationDate: '18 March 2026', completionDate: '31 March 2030',
  },
  {
    reraNumber: 'P52000055578', location: WILLOWS, // Jasmine
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 1, units: 288, config: '2 BHK', carpet: 'About 650 and 725 sq ft',
    registrationDate: 'April 2024', completionDate: '31 December 2031',
  },
  {
    reraNumber: 'P52000050193', location: WILLOWS, // Orchid
    category: 'Residential', projectType: 'Residential / Group Housing',
    buildings: 1, units: 281, config: '2 BHK', carpet: '776 and 780 sq ft',
    registrationDate: '21 March 2023', completionDate: '31 December 2028',
  },
  {
    reraNumber: 'P52000050194', location: WILLOWS, // Iris
    category: 'Residential', projectType: 'Residential',
    buildings: 1, units: 137, config: '3 & 4 BHK', carpet: '1,064 sq ft (3 BHK); 1,652 sq ft (4 BHK)',
    registrationDate: '21 March 2023', completionDate: '31 December 2028',
  },
  {
    reraNumber: 'P52000055662', location: WILLOWS, // Aster
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 1, floors: '39', units: 144, config: '3 BHK', carpet: 'About 974 sq ft',
    registrationDate: '5 April 2024', completionDate: '31 December 2031',
  },
  {
    reraNumber: 'P52000055661', location: WILLOWS, // Zenia
    category: 'Residential', projectType: 'Residential / Group Housing',
    buildings: 1, units: 144,
    registrationDate: '5 April 2024', completionDate: '31 December 2031',
  },
  {
    reraNumber: 'PR1270002501603', location: ARENA, // Grandstand
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 1, floors: '44', units: 313, config: '2 BHK', carpet: 'About 694–911 sq ft',
    registrationDate: '27 November 2025', completionDate: 'June 2032',
  },
  {
    reraNumber: 'PR1270002501610', location: ARENA, // Atheletica
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 1, floors: '44 (40 habitable)', units: 160,
    registrationDate: '28 November 2025', completionDate: 'June 2032',
  },
  {
    reraNumber: 'PR1270002501589', location: ARENA, // Pavilion
    category: 'Residential', projectType: 'Residential / Group Housing', status: UC,
    buildings: 1, floors: '44', units: 160, config: '3 & 4 BHK',
    carpet: 'About 1,090 sq ft (3 BHK); about 1,522 sq ft (4 BHK)',
    registrationDate: '27 November 2025', completionDate: 'June 2032',
  },
];
