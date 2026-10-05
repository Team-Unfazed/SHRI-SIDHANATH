import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

for (const name of ['hero-real-estate-1.mp4', 'hero-real-estate-2.mp4']) {
  const meta = await page.evaluate(async (videoSrc) => {
    const v = document.createElement('video');
    v.src = videoSrc;
    await new Promise((resolve, reject) => {
      v.onloadedmetadata = () => resolve();
      v.onerror = (e) => reject(new Error('Video load error'));
    });
    return {
      duration: v.duration,
      width: v.videoWidth,
      height: v.videoHeight
    };
  }, `http://localhost:5173/videos/${name}`);
  console.log(name, meta);
}

await browser.close();
