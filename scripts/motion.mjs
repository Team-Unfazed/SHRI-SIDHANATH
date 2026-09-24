/**
 * Motion assertions. Everything animated on this page is asserted here rather
 * than eyeballed: the intro curtain and its handover, the hero entrance, the
 * sticky park, the progress rule, the split-text headings, both parallax drifts
 * and the word-by-word fill.
 *
 *   node scripts/motion.mjs
 *   node scripts/motion.mjs --url http://localhost:4173/
 *
 * Most of this runs WITHOUT ?nomotion — that flag exists to switch the motion
 * off, so a suite that used it would assert nothing. The last two blocks check
 * the two opt-out paths on purpose.
 */
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const i = args.indexOf('--url');
const URL = i === -1 ? 'http://localhost:5173/' : args[i + 1];

let pass = 0;
let fail = 0;
const ok = (name, cond, extra = '') => {
  if (cond) {
    pass++;
    console.log('  ok   ' + name);
  } else {
    fail++;
    console.log('  FAIL ' + name + (extra ? '  ' + extra : ''));
  }
};

const sx = (m) => Number((String(m).match(/matrix\(([-\d.]+)/) || [])[1] ?? 0);
const settled = (t) => t === 'none' || /matrix\(1, 0, 0, 1, 0, 0\)/.test(t);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));

await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.banner__sky');

/* ---- the signature hero entrance sequence -------------------------------
   Beat 1: The sky alone on screen, settling out of over-scale.
   Beat 2: The transparent luxury villa architecture rises into the sky.
   Beat 3: The masthead letters rise out of their masks, then meta and card follow. */
await page.waitForTimeout(600);
const early = await page.evaluate(() => {
  const g = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return +(+cs.opacity).toFixed(2);
  };
  return {
    sky: g('.banner__sky'),
    arch: g('.banner__arch'),
    word: g('.banner__char'),
    meta: g('.banner__meta > *'),
    card: g('.banner__card'),
  };
});

ok('the sky arrives alone on screen first', early.sky > 0.5 && early.arch < 0.2 && early.word < 0.2, JSON.stringify(early));

await page.waitForTimeout(600);
const mid = await page.evaluate(() => {
  const el = document.querySelector('.banner__arch');
  if (!el) return 0;
  return +(+getComputedStyle(el).opacity).toFixed(2);
});
ok('the estate architecture rises into frame', mid > 0.3, String(mid));

/* ---- settling ----------------------------------------------------------- */
await page.waitForTimeout(1800);
const after = await page.evaluate(() => ({
  locked: document.body.style.overflow === 'hidden',
  chars: document.querySelectorAll('.banner__char').length,
  wordOpacity: getComputedStyle(document.querySelector('.banner__word')).opacity,
  charTransform: getComputedStyle(document.querySelector('.banner__char')).transform,
  claimLines: document.querySelectorAll('.banner__claim-line').length,
  cardOpacity: getComputedStyle(document.querySelector('.banner__card')).opacity,
}));
ok('the page is scrollable on load', !after.locked);
ok('the hero word is split per letter', after.chars > 10, String(after.chars));
ok('the hero word ends visible', Number(after.wordOpacity) > 0.99, after.wordOpacity);
ok('the letters settle at identity', settled(after.charTransform), after.charTransform);
ok('the claim is masked per line', after.claimLines >= 2, String(after.claimLines));
ok('the hero card arrives', Number(after.cardOpacity) > 0.99, after.cardOpacity);

/* ---- the sticky park --------------------------------------------------- */
const t0 = await page.evaluate(() => document.querySelector('.banner').getBoundingClientRect().top);
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(400);
const t1 = await page.evaluate(() => document.querySelector('.banner').getBoundingClientRect().top);
ok('the hero parks at the top while scrolling', Math.abs(t0) < 2 && Math.abs(t1) < 2, `${t0} -> ${t1}`);
ok(
  'the sheet covers the hero',
  await page.evaluate(() => {
    const s = getComputedStyle(document.querySelector('.sheet'));
    return s.zIndex === '1' && s.backgroundColor !== 'rgba(0, 0, 0, 0)';
  })
);

/* ---- the progress rule ------------------------------------------------- */
const p1 = await page.evaluate(() => getComputedStyle(document.querySelector('.progress')).transform);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
await page.waitForTimeout(900);
const p2 = await page.evaluate(() => getComputedStyle(document.querySelector('.progress')).transform);
ok('the progress rule fills with scroll', sx(p2) > sx(p1) + 0.2, `${sx(p1)} -> ${sx(p2)}`);

/* ---- a split heading far down the page --------------------------------- */
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
/* The element itself is made opaque the moment SplitText has rebuilt it — what
   is still hidden before entry is the letters, parked below their line mask. So
   the assertion is on the character transform, not on the element's opacity. */
const before = await page.evaluate(() => {
  const el = document.querySelector('#locations .split');
  const ch = el.querySelector('.split__char');
  return ch ? getComputedStyle(ch).transform : 'missing';
});
await page.locator('#locations').scrollIntoViewIfNeeded();
await page.waitForTimeout(1800);
const shown = await page.evaluate(() => {
  const el = document.querySelector('#locations .split');
  const line = el.querySelector('.split__line');
  return {
    opacity: getComputedStyle(el).opacity,
    chars: el.querySelectorAll('.split__char').length,
    masked: getComputedStyle(line.parentElement).overflow,
    settled: getComputedStyle(el.querySelector('.split__char')).transform,
  };
});
ok('a late-page heading is parked below its mask before entry', !settled(before), before);
ok('it splits into letters', shown.chars > 10, String(shown.chars));
ok('each line is masked', shown.masked === 'hidden' || shown.masked === 'clip', shown.masked);
ok('it plays on entry', Number(shown.opacity) > 0.95, shown.opacity);
ok('its letters settle at identity', settled(shown.settled), shown.settled);

/* ---- a generic reveal far down the page -------------------------------- */
ok(
  'a late-page reveal plays',
  await page.evaluate(
    () => Number(getComputedStyle(document.querySelector('#locations .reveal')).opacity) > 0.95
  )
);

/* ---- scrubbed parallax ------------------------------------------------- */
await page.evaluate(() => {
  const y = document.querySelector('#why').getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, y - 400);
});
await page.waitForTimeout(900);
const w1 = await page.evaluate(
  () => getComputedStyle(document.querySelector('.why__bg img')).transform
);
await page.evaluate(() => {
  const el = document.querySelector('#why');
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight - 500);
});
await page.waitForTimeout(1100);
const w2 = await page.evaluate(
  () => getComputedStyle(document.querySelector('.why__bg img')).transform
);
ok('the dark-band photograph drifts against the scroll', w1 !== w2, `${w1} vs ${w2}`);

await page.evaluate(() => window.scrollTo(0, 1100));
await page.waitForTimeout(900);
const plates = await page.evaluate(() =>
  [...document.querySelectorAll('.about__plate img')].map((im) => getComputedStyle(im).transform)
);
ok('the two about plates drift at different rates', plates[0] !== plates[1], JSON.stringify(plates));

/* ---- the word-by-word fill --------------------------------------------- */
await page.locator('#developers').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const fill = await page.evaluate(() => {
  const w = document.querySelectorAll('#developers .sfill__w');
  return {
    n: w.length,
    first: getComputedStyle(w[0]).color,
    last: getComputedStyle(w[w.length - 1]).color,
  };
});
ok('the claim is split into words for the fill', fill.n > 5, JSON.stringify(fill));
ok('the fill is mid-scrub (ends differ)', fill.first !== fill.last, JSON.stringify(fill));

ok('no console or page errors', errs.length === 0, errs.slice(0, 3).join(' | '));

/* ---- opt-out: ?nomotion ------------------------------------------------ */
const nm = await ctx.newPage();
await nm.goto(URL + '?nomotion=1', { waitUntil: 'networkidle' });
await nm.waitForTimeout(900);
const nomotion = await nm.evaluate(() => ({
  curtain: !!document.querySelector('.intro'),
  hidden: [...document.querySelectorAll('.reveal, .split, .banner__word, .banner__card')].filter(
    (el) => Number(getComputedStyle(el).opacity) < 0.95
  ).length,
}));
ok('?nomotion skips the curtain entirely', !nomotion.curtain);
ok('?nomotion leaves nothing hidden', nomotion.hidden === 0, String(nomotion.hidden));

/* ---- opt-out: the user's own preference -------------------------------- */
const rmCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
const rm = await rmCtx.newPage();
await rm.goto(URL, { waitUntil: 'networkidle' });
await rm.waitForTimeout(1800);
const reduced = await rm.evaluate(() => {
  const hidden = [
    ...document.querySelectorAll('.reveal, .split, .banner__word, .banner__claim, .banner__card'),
  ].filter((el) => Number(getComputedStyle(el).opacity) < 0.95);
  const fills = [...document.querySelectorAll('.sfill')].map((p) => {
    const cols = [...p.querySelectorAll('.sfill__w')].map((w) => getComputedStyle(w).color);
    return new Set(cols).size === 1;
  });
  return {
    curtain: !!document.querySelector('.intro'),
    hidden: hidden.length,
    sample: hidden.slice(0, 3).map((e) => e.className),
    progress: getComputedStyle(document.querySelector('.progress')).display,
    scrollable: document.body.style.overflow !== 'hidden',
    fills: fills.length > 0 && fills.every(Boolean),
  };
});
ok('reduced motion skips the curtain', !reduced.curtain);
ok('reduced motion never locks the page', reduced.scrollable);
ok('reduced motion leaves nothing hidden', reduced.hidden === 0, JSON.stringify(reduced.sample));
ok('reduced motion hides the progress rule', reduced.progress === 'none', reduced.progress);
ok('reduced motion settles each fill at its finished colour', reduced.fills);

console.log(`\n${pass} passed, ${fail} failed`);
await browser.close();
process.exit(fail ? 1 : 0);
