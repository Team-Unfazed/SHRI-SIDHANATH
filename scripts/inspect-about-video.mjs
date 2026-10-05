import { chromium } from 'playwright';
import { writeFile, copyFile } from 'node:fs/promises';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:5173');

// Also make a hyphenated copy for safety
try {
  await copyFile('public/videos/about us section video.mp4', 'public/videos/about-us-video.mp4');
  console.log('Copied to public/videos/about-us-video.mp4');
} catch (e) {
  console.log('Copy notice:', e.message);
}

for (const t of [0.5, 3, 7, 12, 18]) {
  const data = await page.evaluate(async (time) => {
    const v = document.createElement('video');
    v.src = '/videos/about us section video.mp4';
    v.muted = true;
    await new Promise(r => v.onloadedmetadata = r);
    v.currentTime = time;
    await new Promise(r => v.onseeked = r);

    const c = document.createElement('canvas');
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0);
    return c.toDataURL('image/jpeg', 0.85).split(',')[1];
  }, t);

  await writeFile(`screenshots/about-video-t${t}.jpg`, Buffer.from(data, 'base64'));
  console.log(`Saved screenshots/about-video-t${t}.jpg`);
}

// Also save first frame as poster
const posterData = await page.evaluate(async () => {
  const v = document.createElement('video');
  v.src = '/videos/about us section video.mp4';
  v.muted = true;
  await new Promise(r => v.onloadedmetadata = r);
  v.currentTime = 0.5;
  await new Promise(r => v.onseeked = r);
  const c = document.createElement('canvas');
  c.width = v.videoWidth;
  c.height = v.videoHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(v, 0, 0);
  return c.toDataURL('image/jpeg', 0.85).split(',')[1];
});
await writeFile('public/videos/about-us-poster.jpg', Buffer.from(posterData, 'base64'));
console.log('Saved public/videos/about-us-poster.jpg');

await browser.close();
process.exit(0);
