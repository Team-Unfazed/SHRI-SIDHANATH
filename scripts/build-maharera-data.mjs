// Builds the static content layer exclusively from retained official search evidence.
import { readFileSync, writeFileSync } from 'node:fs';
const requested = JSON.parse(readFileSync('docs/maharera/requested.json', 'utf8'));
const clean = (value) => value?.replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim() || null;
const records = [];
const results = new Map();
for (const rera of new Set(requested)) {
  const html = readFileSync(`docs/maharera/${rera}.html`, 'utf8');
  if (!html.includes(`# ${rera}</p>`)) {
    results.set(rera, { found: false, reason: 'Official search returned No Records Found after retries; not proof of an invalid registration.' });
    continue;
  }
  const field = (label) => clean(html.match(new RegExp(`<div class="greyColor">${label}</div>\\s*<p>([^<]*)</p>`))?.[1]);
  const name = clean(html.match(/<strong>(.*?)<\/strong>/)?.[1]);
  const developer = clean(html.match(/<p class="darkBlue bold ">(.*?)<\/p>/)?.[1]);
  const location = clean(html.match(/fa-location-dot"><\/em>(.*?)<\/a>/)?.[1]);
  const sourceUrl = html.match(/href="([^"]+)" title="View Details"/)?.[1];
  if (!name || !developer || !/^https:\/\/maharerait\.maharashtra\.gov\.in\/public\/project\/view\/\d+$/.test(sourceUrl)) throw new Error(`Incomplete identity: ${rera}`);
  records.push({
    id: rera.toLowerCase(), name, reraNumber: rera, developer,
    location, area: location, district: field('District'), pincode: field('Pincode'), state: field('State'),
    category: null, projectType: null, status: null, registryStatus: 'Registered',
    registrationDate: null, completionDate: null, address: null, taluka: null,
    surveyDetails: null, buildings: null, units: null, configurations: [], amenities: [],
    config: null, detail: null, priceFrom: null, image: null, featured: false,
    source: 'MahaRERA', sourceUrl, sourceLastModified: field('Last Modified'),
    retrievedAt: html.match(/retrieved ([^ ]+)/)?.[1],
    verificationScope: 'Official registered-project search result. Full project details require CAPTCHA verification.',
  });
  results.set(rera, { found: true, extracted: true, reason: 'Search fields verified; full details CAPTCHA-protected.' });
}
writeFileSync('src/data/maharera-projects.json', JSON.stringify(records, null, 2) + '\n');
const seen = new Set();
const checklist = requested.map((reraNumber, index) => {
  const duplicate = seen.has(reraNumber);
  seen.add(reraNumber);
  return { inputRow: index + 1, reraNumber, duplicate, ...results.get(reraNumber) };
});
writeFileSync('docs/maharera/checklist.json', JSON.stringify(checklist, null, 2) + '\n');
console.log(`${records.length} verified records; ${requested.length} input rows; ${seen.size} unique registration numbers.`);
