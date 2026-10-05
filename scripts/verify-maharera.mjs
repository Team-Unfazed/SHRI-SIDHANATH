import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import { existingProjects, projects, registeredProjects, mergeProjects } from '../src/data/projects.js';
import imported from '../src/data/maharera-projects.json' with { type: 'json' };

const requested = JSON.parse(readFileSync('docs/maharera/requested.json', 'utf8'));
assert.equal(requested.length, 25);
assert.equal(new Set(requested).size, 17);
assert.equal(imported.length, 17);
assert.equal(registeredProjects.length, 29);
assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
assert.equal(new Set(imported.map(p => p.reraNumber)).size, 17);
assert.deepEqual(registeredProjects.slice(0, existingProjects.length), existingProjects);
assert.deepEqual(mergeProjects(registeredProjects, imported), registeredProjects, 'Import must be idempotent');
for (const p of imported) {
  const evidence = readFileSync(`docs/maharera/${p.reraNumber}.html`, 'utf8').replaceAll('&amp;', '&');
  for (const value of [p.name, p.reraNumber, p.developer, p.location, p.district, p.pincode, p.sourceUrl, p.sourceLastModified]) {
    assert.ok(evidence.includes(value), `${p.reraNumber}: missing source evidence for ${value}`);
  }
  for (const key of ['status', 'projectType', 'registrationDate', 'completionDate', 'address', 'taluka', 'surveyDetails', 'units', 'buildings', 'image']) assert.equal(p[key], null);
  assert.deepEqual(p.amenities, []);
  assert.deepEqual(p.configurations, []);
}

const base = process.env.TEST_URL || 'http://localhost:5173';
const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
const externalRequests = [];
page.on('pageerror', e => errors.push(e.message));
page.on('request', req => { if (new URL(req.url()).hostname.includes('maharera')) externalRequests.push(req.url()); });
mkdirSync('screenshots/maharera', { recursive: true });
try {
  await page.goto(`${base}/projects.html`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.pp__grid .pcard').count(), projects.length);
  assert.equal(await page.locator('.ring__card').count(), projects.length);
  assert.equal(await page.locator('.pcard__registration').count(), projects.filter(p => p.reraNumber).length);
  const search = page.getByRole('searchbox');
  for (const p of imported) {
    await search.fill(p.reraNumber.toLowerCase());
    assert.equal(await page.locator('.pp__item').count(), 1);
    assert.equal(await page.locator('.pcard__name').textContent(), p.name);
    await page.locator('.pcard__registration summary').click();
    assert.ok(await page.locator('.pcard__registration dl').isVisible());
    assert.equal(await page.getByRole('link', { name: 'View on MahaRERA' }).getAttribute('href'), p.sourceUrl);
    assert.ok((await page.locator('.pcard__registration').innerText()).includes(p.pincode));
  }
  await search.fill('  eLLoRa  ');
  assert.equal(await page.locator('.pcard__name').textContent(), 'Rainbow Life');
  await search.fill('no matching project 12345');
  assert.ok(await page.getByText('No matching projects. Try another search or market.').isVisible());
  await search.fill('');
  for (const market of ['Panvel', 'Khalapur', 'Mumbai']) {
    await page.getByRole('button', { name: market, exact: true }).click();
    const expected = projects.filter(p => (p.area === 'New Panvel' ? 'Panvel' : p.area) === market).length;
    assert.equal(await page.locator('.pp__item').count(), expected);
  }
  await page.getByRole('button', { name: 'All', exact: true }).click();
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 960 });
    await search.fill('PR1270002502927');
    await page.locator('.pcard__registration summary').click();
    await page.locator('.pp__search').scrollIntoViewIfNeeded();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Page overflows at ${width}`);
    assert.ok(await page.locator('.pcard').evaluate(el => el.scrollWidth <= el.clientWidth + 1), `Card overflows at ${width}`);
    await page.screenshot({ path: `screenshots/maharera/projects-${width}.png` });
    await page.locator('.pcard-entry').screenshot({ path: `screenshots/maharera/card-${width}.png` });
    await search.fill('');
  }
  await page.getByRole('button', { name: 'Next project', exact: true }).click();
  await page.waitForTimeout(1300);
  assert.equal(await page.locator('.ring__title').textContent(), projects[1].name);
  assert.deepEqual(errors, []);
  assert.deepEqual(externalRequests, [], 'Public site must not fetch MahaRERA at runtime');
  const checklist = JSON.parse(readFileSync('docs/maharera/checklist.json', 'utf8'));
  for (const row of checklist) { row.added = imported.some(p => p.reraNumber === row.reraNumber); row.verified = row.added; }
  writeFileSync('docs/maharera/checklist.json', JSON.stringify(checklist, null, 2) + '\n');
  console.log('PASS: 17 exact-source records, all 25 input rows, 29 cards, 17 disclosures, duplicate protection, existing inventory, search, market filters, and desktop/tablet/mobile layouts.');
} finally { await browser.close(); }
