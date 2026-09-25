/**
 * Interaction assertions for the LivIn rebuild.
 *
 *   node scripts/interact.mjs
 *   node scripts/interact.mjs --url http://localhost:5174/studio.html
 *
 * Run the dev server first; pass --url to point at a preview build.
 * Exits non-zero on the first failure so it is usable in a pre-deploy check.
 */
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const flagIndex = args.indexOf('--url');
const URL = flagIndex === -1 ? 'http://localhost:5173/' : args[flagIndex + 1];
let pass = 0, fail = 0;
const ok = (n, c) => { c ? (pass++, console.log('  ok  ' + n)) : (fail++, console.log('  FAIL ' + n)); };

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 860 } })).newPage();
const errors = [];
page.on('console', m => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', e => errors.push(String(e)));
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

// menu
ok('menu starts closed', !(await page.locator('#fnav-menu').isVisible()));
await page.locator('.fnav__burger').click();
await page.waitForTimeout(400);
ok('menu opens on burger', await page.locator('#fnav-menu').isVisible());
ok('menu is aria-expanded', await page.locator('.fnav__burger').getAttribute('aria-expanded') === 'true');
ok('menu is a popover, not a page', await page.evaluate(() => document.querySelector('#fnav-menu').getBoundingClientRect().width < innerWidth * 0.9));
await page.mouse.click(40, 200);
await page.waitForTimeout(400);
ok('outside click closes menu', !(await page.locator('#fnav-menu').isVisible()));
await page.locator('.fnav__burger').click();
await page.waitForTimeout(400);
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
ok('escape closes menu', !(await page.locator('#fnav-menu').isVisible()));
ok('page never scroll-locked', await page.evaluate(() => document.body.style.overflow === ''));

// menu link scrolls
await page.locator('.fnav__burger').click();
await page.waitForTimeout(300);
await page.locator('#fnav-menu a[href="#services"]').click();
await page.waitForTimeout(1400);
ok('menu link closes menu', !(await page.locator('#fnav-menu').isVisible()));
ok('menu link scrolls to services', await page.evaluate(() => window.scrollY > 500));

// hero tabs
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const first = await page.locator('.banner__card-name').textContent();
await page.locator('.banner__tabs button').nth(2).click();
await page.waitForTimeout(400);
const third = await page.locator('.banner__card-name').textContent();
ok('hero tabs change the card', first !== third);
ok('active tab is marked', await page.locator('.banner__tabs button').nth(2).getAttribute('data-on') !== null);

// faq accordion
await page.locator('#faq').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const q2 = page.locator('.faq__q').nth(2);
ok('faq item starts closed', await q2.getAttribute('aria-expanded') === 'false');
await q2.click();
await page.waitForTimeout(500);
ok('faq item opens', await q2.getAttribute('aria-expanded') === 'true');
ok('only one faq open', await page.locator('.faq__q[aria-expanded="true"]').count() === 1);

// counts and links
ok('every section anchor resolves', await page.evaluate(() => {
  const hrefs = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href'));
  return hrefs.every(h => h === '#' || document.querySelector(h));
}));
ok('nav count matches project list', (await page.locator('.fnav__badge').textContent()) === '12');
ok('no external http links are unsafe', await page.evaluate(() =>
  [...document.querySelectorAll('a[target="_blank"]')].every(a => (a.rel || '').includes('noreferrer'))));
ok('all images have alt attributes', await page.evaluate(() =>
  [...document.images].every(i => i.hasAttribute('alt'))));
ok('single h1', await page.locator('h1').count() === 1);
ok('no console errors', errors.length === 0);
if (errors.length) console.log(errors.slice(0, 5));

console.log(`\n${pass} passed, ${fail} failed`);
await browser.close();
process.exit(fail ? 1 : 0);
