/**
 * Visual QA harness.
 *
 *   node scripts/shoot.mjs                      full-page shots at every breakpoint
 *   node scripts/shoot.mjs --viewport           above-the-fold only
 *   node scripts/shoot.mjs --w 390,1440         only these widths
 *   node scripts/shoot.mjs --out hero           write into screenshots/hero/
 *   node scripts/shoot.mjs --clip "#services"   shoot one section
 *
 * Also reports console errors, failed requests, horizontal overflow and any
 * element wider than the viewport, which is where most of the real bugs are.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const URL = flag('url', 'http://localhost:5173/');
const OUT = path.join('screenshots', flag('out', 'latest'));
const CLIP = flag('clip', null);
const FULL = !has('viewport') && !CLIP;

const ALL = [
  { w: 1920, h: 1080, name: '1920-desktop' },
  { w: 1440, h: 900, name: '1440-desktop' },
  { w: 1280, h: 832, name: '1280-desktop' },
  { w: 1024, h: 800, name: '1024-tablet' },
  { w: 768, h: 1024, name: '0768-tablet' },
  { w: 430, h: 932, name: '0430-mobile' },
  { w: 412, h: 915, name: '0412-mobile' },
  { w: 393, h: 852, name: '0393-mobile' },
  { w: 390, h: 844, name: '0390-mobile' },
  { w: 375, h: 812, name: '0375-mobile' },
  { w: 360, h: 780, name: '0360-mobile' },
];

const only = flag('w');
const sizes = only
  ? ALL.filter((s) => only.split(',').map(Number).includes(s.w))
  : ALL;

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const size of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: size.w, height: size.h },
    deviceScaleFactor: 1,
    isMobile: size.w < 768,
    hasTouch: size.w < 768,
  });
  const page = await ctx.newPage();

  const errors = [];
  const failed = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 300));
  });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`.slice(0, 300)));
  page.on('requestfailed', (r) =>
    failed.push(`${r.url().slice(0, 140)} :: ${r.failure()?.errorText}`)
  );
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url().slice(0, 140)}`);
  });

  // Full-page captures load with motion suppressed. Driving scroll-linked
  // reveals from a script is unreliable (the page grows as lazy images resolve,
  // so a sweep can finish before the document does), and a half-revealed
  // screenshot reads as a layout bug. Viewport captures keep motion on.
  const target = FULL && !has('motion') ? `${URL}${URL.includes('?') ? '&' : '?'}nomotion=1` : URL;
  await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 });
  // The hero intro timeline runs to ~3s. Shooting earlier catches elements
  // mid-fade and reads as a layout bug when it is only timing.
  await page.waitForTimeout(3600);

  // Drive the whole page so every ScrollTrigger fires, then return to the top.
  if (FULL) {
    await page.evaluate(async () => {
      // The page sets `scroll-behavior: smooth`, which makes every scrollTo an
      // animation. Firing them 110ms apart means the browser never arrives and
      // the sweep stalls a couple of screens down, leaving most ScrollTriggers
      // unfired. Force instant scrolling for the duration of the sweep.
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';

      const step = window.innerHeight * 0.8;
      // Re-read the height each pass: lazy images keep extending the document
      // while the sweep is running, and a bound captured up front stops short.
      for (let y = 0, guard = 0; guard < 400; y += step, guard++) {
        if (y > document.body.scrollHeight) break;
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 110));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 450));
      html.style.scrollBehavior = prev;
    });
  }

  const audit = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const overflowing = [];

    // An element sticking out past the viewport only matters if nothing above
    // it clips. Parked drawers, masked line reveals and marquee tracks all sit
    // outside their box on purpose, inside an ancestor that hides them.
    const isClipped = (el, rect) => {
      let p = el.parentElement;
      while (p && p !== document.documentElement) {
        const cs = getComputedStyle(p);
        if (/hidden|clip|auto|scroll/.test(cs.overflowX)) {
          const pr = p.getBoundingClientRect();
          if (rect.right > pr.right - 1 || rect.left < pr.left + 1) return true;
        }
        p = p.parentElement;
      }
      return false;
    };

    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > docW + 1.5 || r.left < -1.5) {
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed' && r.width <= docW + 2) return;
        if (isClipped(el, r)) return;
        overflowing.push(
          `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ').filter(Boolean).slice(0, 2).join('.')} [${Math.round(r.left)}..${Math.round(r.right)}]`
        );
      }
    });
    const brokenImgs = [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src);
    return {
      scrollW: document.documentElement.scrollWidth,
      clientW: docW,
      horizontalOverflow: document.documentElement.scrollWidth > docW + 1,
      overflowing: [...new Set(overflowing)].slice(0, 12),
      brokenImgs,
      docHeight: document.body.scrollHeight,
    };
  });

  const file = path.join(OUT, `${size.name}.png`);
  if (CLIP) {
    const el = await page.$(CLIP);
    if (!el) throw new Error(`No element matches ${CLIP}`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await el.screenshot({ path: file });
  } else {
    await page.screenshot({ path: file, fullPage: FULL });
  }

  report.push({ ...size, ...audit, errors, failed: [...new Set(failed)].slice(0, 10) });
  await ctx.close();
}

await browser.close();
await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));

let bad = 0;
for (const r of report) {
  const issues = [];
  if (r.horizontalOverflow) issues.push(`H-OVERFLOW ${r.scrollW}>${r.clientW}`);
  if (r.overflowing.length) issues.push(`wide: ${r.overflowing.join(' | ')}`);
  if (r.brokenImgs.length) issues.push(`broken img: ${r.brokenImgs.join(', ')}`);
  if (r.errors.length) issues.push(`console: ${r.errors.join(' ~ ')}`);
  if (r.failed.length) issues.push(`net: ${r.failed.join(' ~ ')}`);
  if (issues.length) bad++;
  console.log(
    `${issues.length ? 'FAIL' : ' ok '}  ${r.name.padEnd(14)} h=${String(r.docHeight).padStart(6)}  ${issues.join('\n        ') || ''}`
  );
}
console.log(`\n${report.length - bad}/${report.length} clean -> ${OUT}`);
