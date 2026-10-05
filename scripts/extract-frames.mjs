import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:5173');

const times = [0, 3, 6, 9, 12, 15];
for (const t of times) {
  const data = await page.evaluate(async (time) => {
    const v = document.createElement('video');
    v.src = '/videos/hero-real-estate-1.mp4';
    v.muted = true;
    await new Promise(r => v.onloadedmetadata = r);
    v.currentTime = time;
    await new Promise(r => v.onseeked = r);

    const c = document.createElement('canvas');
    c.width = 1280;
    c.height = 720;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0, 1280, 720);
    return c.toDataURL('image/jpeg', 0.85).split(',')[1];
  }, t);

  await writeFile(`screenshots/clip1-t${t}.jpg`, Buffer.from(data, 'base64'));
  console.log(`Saved clip1-t${t}.jpg`);
}

await browser.close();
