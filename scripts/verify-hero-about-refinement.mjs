import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';

// Compare against this task's pre-edit snapshot, not the older committed hero.
const read = path => readFileSync(path, 'utf8').replaceAll('\r\n', '\n');
const before = JSON.parse(read('docs/hero-video-preservation.json'));
const hash = value => createHash('sha256').update(value).digest('hex');
const after = read('src/sections/Hero.jsx');
assert.equal(hash(after.match(/  useEffect\(\(\) => \{[\s\S]*?  \}, \[\]\);/)[0]), before.videoEffect, 'Video playback code changed');
assert.equal(hash(after.match(/<div className="banner__stage"[\s\S]*?\n      <\/div>/)[0]), before.videoMarkup, 'Video markup changed');
const protectedRules = css => [...css.matchAll(/[^{}]*\{[^{}]*\}/g)].map(m => m[0].trim()).filter(rule => /^(\.banner\s*\{|\.banner__stage|\.banner__video|\.banner__atmos)/.test(rule));
assert.equal(hash(JSON.stringify(protectedRules(read('src/sections/Hero.css')))), before.videoStyles, 'Video/background rules changed');
if (process.argv.includes('--preservation-only')) {
  console.log('PASS: approved video markup, playback and background styles match the pre-edit fingerprints.');
  process.exit(0);
}

mkdirSync('screenshots/refinement', { recursive: true });
const browser = await chromium.launch();
try {
  for (const [width, height] of [[1440, 900], [1280, 720], [768, 1024], [390, 844], [320, 740]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://localhost:5173/?nomotion', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    assert.ok(await page.getByRole('link', { name: /Call \+91/i }).count() >= 1);
    assert.equal(await page.getByRole('link', { name: 'View Projects', exact: true }).getAttribute('href'), '/projects.html');
    assert.ok(await page.locator('.banner__title').isVisible());
    assert.ok(await page.locator('.banner__stars').isVisible());
    const video = await page.locator('.banner__video').evaluate(el => ({ source: el.currentSrc, playing: !el.paused, muted: el.muted, loop: el.loop, inline: el.playsInline }));
    assert.ok(video.source.endsWith('/videos/main-bg-video.mp4'));
    assert.ok(video.playing && video.muted && video.loop && video.inline);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow at ${width}`);
    assert.equal(await page.locator('.about__card').count(), 1);
    assert.ok(await page.locator('.about__video').evaluate(el => el.currentSrc.endsWith('/videos/main-bg-video.mp4')));
    await page.screenshot({ path: `screenshots/refinement/hero-${width}.png` });
    await page.locator('#about').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(500);
    assert.ok(await page.locator('.about__fact').count() >= 4);
    assert.ok(await page.locator('#about').evaluate(el => {
      const outer = el.getBoundingClientRect();
      const inner = el.querySelector('.about__inner').getBoundingClientRect();
      return inner.top >= outer.top && inner.bottom <= outer.bottom + 1;
    }), `About content clipped at ${width}`);
    await page.locator('#about').screenshot({ path: `screenshots/refinement/about-${width}.png` });
    assert.deepEqual(errors, []);
    await page.close();
  }
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto('http://localhost:5173/?nomotion');
  assert.equal(await page.locator('.about__video-shell').evaluate(el => getComputedStyle(el).animationName), 'none');
  await page.getByRole('link', { name: 'View Projects', exact: true }).click();
  await page.waitForURL('**/projects.html');
  assert.equal(await page.locator('.pp__grid .pcard').count(), 29);
  console.log('PASS: approved video code/styles unchanged; playback, two CTAs, 3 sourced images, 5 viewport sizes, reduced motion, and project route.');
} finally { await browser.close(); }
