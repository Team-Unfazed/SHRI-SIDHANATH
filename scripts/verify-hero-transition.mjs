import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const url = process.argv[2] || 'http://127.0.0.1:5187/';
const browser = await chromium.launch();
const errors = [];
const position = page => page.evaluate(() => ({
  y: scrollY,
  about: document.getElementById('about').getBoundingClientRect().top,
}));
const arrived = async page => {
  await page.waitForFunction(() => !document.documentElement.dataset.heroScrolling);
  assert(Math.abs((await position(page)).about) <= 2, 'gesture must stop at About');
};
const reset = async page => {
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(350);
};
const open = async mobile => {
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    isMobile: mobile, hasTouch: mobile, reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('#top').waitFor();
  if (await page.locator('.intro').count()) await page.keyboard.press('Escape');
  await page.locator('.intro').waitFor({ state: 'detached' });
  return { context, page };
};

try {
  const { context, page } = await open(false);
  await page.mouse.move(750, 300);
  await page.mouse.wheel(0, 2);
  await page.waitForTimeout(200);
  const mid = await position(page);
  assert(mid.y > 0 && mid.about > 10, 'a tiny trackpad gesture must animate');
  await arrived(page);
  await page.waitForTimeout(3200);
  assert.equal(await page.locator('.enquiry-overlay').getAttribute('data-open'), 'false', 'auto enquiry must not interrupt scrolling');
  console.log('PASS gentle trackpad gesture, smooth intermediate position, no popup interruption');

  await reset(page);
  for (let i = 0; i < 45; i++) {
    await page.mouse.wheel(0, 8);
    await page.waitForTimeout(40);
  }
  assert(Math.abs((await position(page)).about) <= 2, 'momentum must not overshoot About');
  await arrived(page);
  await page.mouse.wheel(0, 60);
  await page.waitForTimeout(250);
  const next = await position(page);
  assert(next.about < -20 && next.about > -150, 'the next gesture should scroll About normally');
  console.log('PASS long momentum tail and normal scrolling after arrival');

  await reset(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.mouse.wheel(0, 60);
  await page.waitForTimeout(150);
  const withOsSetting = await position(page);
  assert(withOsSetting.y > 0 && withOsSetting.about > 10, 'scroll must follow the same motion policy as the site');
  await arrived(page);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  console.log('PASS consistent site animation with OS animation effects disabled');

  await reset(page);
  await page.keyboard.press('PageDown');
  await page.waitForTimeout(100);
  await arrived(page);
  await reset(page);
  await page.locator('.banner__scroll').click();
  await page.waitForTimeout(100);
  await arrived(page);
  console.log('PASS keyboard and visible scroll link');

  await reset(page);
  await page.getByRole('button', { name: 'Open Property Advisory Enquiry' }).click();
  await page.waitForTimeout(1100);
  await page.mouse.wheel(0, 60);
  await page.waitForTimeout(250);
  assert.equal((await position(page)).y, 0, 'modal must retain its own scroll handling');
  await page.getByRole('button', { name: 'Close enquiry modal' }).click();
  await page.locator('.enquiry-overlay[data-open="true"]').waitFor({ state: 'hidden' });
  await page.mouse.move(750, 300);
  await page.mouse.wheel(0, 60);
  await page.waitForTimeout(100);
  await arrived(page);
  console.log('PASS modal interaction and scrolling after closing it');
  await context.close();

  const mobile = await open(true);
  const session = await mobile.context.newCDPSession(mobile.page);
  const touch = (type, points = []) => session.send('Input.dispatchTouchEvent', { type, touchPoints: points });
  await touch('touchStart', [{ x: 180, y: 500 }]);
  for (const y of [496, 490, 475, 450, 410, 350]) {
    await touch('touchMove', [{ x: 180, y }]);
    await mobile.page.waitForTimeout(25);
  }
  await mobile.page.waitForTimeout(1200);
  await touch('touchMove', [{ x: 180, y: 300 }]);
  assert(Math.abs((await position(mobile.page)).about) <= 2, 'holding a swipe must not scroll past About');
  await touch('touchEnd');
  await arrived(mobile.page);
  await touch('touchStart', [{ x: 180, y: 500 }]);
  for (const y of [480, 440, 400, 360]) {
    await touch('touchMove', [{ x: 180, y }]);
    await mobile.page.waitForTimeout(35);
  }
  await touch('touchEnd');
  await mobile.page.waitForTimeout(700);
  assert((await position(mobile.page)).about < -30, 'next mobile swipe must scroll About naturally');
  console.log('PASS native touch gesture, held finger, next swipe');

  await reset(mobile.page);
  const box = await mobile.page.locator('.banner__actions a').first().boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await touch('touchStart', [{ x, y }]);
  await touch('touchMove', [{ x, y: y - 25 }]);
  await touch('touchMove', [{ x, y: y - 100 }]);
  await touch('touchEnd');
  await mobile.page.waitForTimeout(100);
  await arrived(mobile.page);
  assert.equal(new URL(mobile.page.url()).hash, '', 'swiping over a CTA must not activate its link');
  assert(await mobile.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  console.log('PASS swipe starting on hero action and mobile overflow');
  await mobile.context.close();
  assert.deepEqual(errors, []);
  console.log('All hero scroll regression checks passed.');
} finally {
  await browser.close();
}
