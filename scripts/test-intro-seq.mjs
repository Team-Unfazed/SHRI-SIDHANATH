import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const URL = 'http://localhost:5173/';
const OUT = path.join('screenshots', '3d-starting-animation');
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: 'domcontentloaded' });

const times = [400, 900, 1500, 2200, 3200];
let prev = 0;
for (const t of times) {
  await page.waitForTimeout(t - prev);
  prev = t;
  await page.screenshot({ path: path.join(OUT, `3d-intro-t${String(t).padStart(4, '0')}.png`) });
  console.log(`Captured frame at ${t}ms`);
}

await browser.close();
console.log('3D starting animation captures saved to', OUT);
