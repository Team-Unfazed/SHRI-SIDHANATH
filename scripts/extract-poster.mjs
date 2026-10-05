import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const browser = await chromium.launch();
const page = await browser.newPage();
const videoUrl = pathToFileURL(path.resolve('public/videos/about us section video.mp4')).href;

await page.setContent(`
  <body style="margin:0;background:#000;">
    <video src="${videoUrl}" width="1280" height="720" muted playsinline></video>
  </body>
`);

await page.evaluate(async () => {
  const video = document.querySelector('video');
  video.currentTime = 1.0;
  await new Promise((resolve) => {
    video.onseeked = resolve;
  });
});

const videoEl = await page.$('video');
await videoEl.screenshot({ path: 'public/videos/about-us-poster.jpg', type: 'jpeg', quality: 85 });
console.log('Saved public/videos/about-us-poster.jpg');
await browser.close();
