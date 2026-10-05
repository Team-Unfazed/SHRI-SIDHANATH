import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:5173');

const meta = await page.evaluate(async () => {
  const v = document.createElement('video');
  v.src = '/videos/main%20bg%20video%20.mp4';
  await new Promise((resolve, reject) => {
    v.onloadedmetadata = () => resolve();
    v.onerror = (e) => reject(new Error('Failed to load video'));
  });
  return {
    duration: v.duration,
    width: v.videoWidth,
    height: v.videoHeight
  };
});

console.log('User video:', meta);

// Extract frame at 1s, 5s, 10s, 15s, 20s
for (const t of [0.5, 3, 6, 10, 15]) {
  if (t < meta.duration) {
    const data = await page.evaluate(async (time) => {
      const v = document.createElement('video');
      v.src = '/videos/main%20bg%20video%20.mp4';
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

    await writeFile(`screenshots/user-video-t${t}.jpg`, Buffer.from(data, 'base64'));
    console.log(`Saved screenshots/user-video-t${t}.jpg`);
  }
}

await browser.close();
