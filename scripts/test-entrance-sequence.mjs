/**
 * Captures the signature hero entrance frame by frame and asserts the brand sequence:
 * 1. Sky alone on screen first (golden sunset).
 * 2. Architecture estate rises upward into the empty sky.
 * 3. Typography, meta row, and featured card cascade in and settle.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (n, d) => { const idx = args.indexOf(`--${n}`); return idx === -1 ? d : args[idx + 1]; };
const URL = flag('url', 'http://localhost:5173/');
const W = +flag('w', 1440), H = +flag('h', 900);
const OUT = path.join('screenshots', flag('out', 'hero-entrance'));
const AT = [400, 750, 1100, 1400, 1700, 2100, 3000];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.banner__sky');

const read = () => page.evaluate(() => {
  const g = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const t = cs.transform;
    const p = t.startsWith('matrix(') ? t.slice(7, -1).split(',').map(Number) : null;
    return { o: +(+cs.opacity).toFixed(2), ty: p ? Math.round(p[5]) : 0 };
  };
  return {
    sky: g('.banner__sky'),
    arch: g('.banner__arch'),
    word: g('.banner__char') || g('.banner__word'),
    meta: g('.banner__meta > *'),
    claim: g('.banner__claim-char') || g('.banner__claim'),
    card: g('.banner__card'),
  };
});

const rows = [];
let prev = 0;
for (const t of AT) {
  await page.waitForTimeout(t - prev);
  prev = t;
  const r = await read();
  rows.push({ t, ...r });
  await page.screenshot({ path: path.join(OUT, `${W}-t${String(t).padStart(4, '0')}.png`) });
}
await browser.close();

const f = (l) => (l ? `${l.o.toFixed(2)}${l.ty ? `/${l.ty > 0 ? '+' : ''}${l.ty}` : ''}` : '-');
console.log('  t      sky      arch      word      meta      claim     card');
console.log('-'.repeat(66));
for (const r of rows) {
  console.log(`${String(r.t).padStart(5)}ms  ${f(r.sky).padEnd(8)} ${f(r.arch).padEnd(9)} ${f(r.word).padEnd(9)} ${f(r.meta).padEnd(9)} ${f(r.claim).padEnd(9)} ${f(r.card)}`);
}

// Beat 1: sky is arriving alone on screen first while all other layers are hidden
const skyAlone = rows.some(
  (r) => r.sky && r.sky.o > 0.5 && r.arch && r.arch.o < 0.1 && r.word && r.word.o < 0.1 && r.meta && r.meta.o < 0.1 && r.card && r.card.o < 0.1
);

// Beat 2: arch arrives after sky
const mid = rows[2]; // 1100ms
const archRising = mid.arch && mid.arch.o > 0.1;

// Beat 3: everything settled by 3000ms
const last = rows[rows.length - 1];
const allSettled = ['sky', 'arch', 'word', 'meta', 'claim', 'card'].every((k) => last[k] && last[k].o > 0.95);

console.log('');
console.log(`${skyAlone ? ' ok ' : 'FAIL'}  Beat 1: Sky is alone on screen first`);
console.log(`${archRising ? ' ok ' : 'FAIL'}  Beat 2: Architecture rises into frame by 1100ms`);
console.log(`${allSettled ? ' ok ' : 'FAIL'}  Beat 3: All typography, meta and cards settled by 3000ms`);

if (!skyAlone || !archRising || !allSettled) {
  process.exitCode = 1;
}
