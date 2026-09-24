import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';

const videoFile = 'C:/Users/dev01/OneDrive/PROJECTS/Shri Sidhanath/WhatsApp Video 2026-09-06 at 1.39.48 AM.mp4';
const server = http.createServer((req, res) => {
  const stat = fs.statSync(videoFile);
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Length': stat.size,
  });
  fs.createReadStream(videoFile).pipe(res);
});

server.listen(8999, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  await page.setContent(`
    <body style="margin:0; background:black; display:flex; justify-content:center; align-items:center; height:100vh;">
      <video id="v" src="http://localhost:8999" muted autoplay style="max-width:100%; max-height:100%;"></video>
    </body>
  `);

  await page.waitForTimeout(1000);
  const duration = await page.evaluate(() => document.getElementById('v').duration);
  console.log('Video duration:', duration);

  for (const time of [0.5, 1.5, 3.0, 5.0, 8.0, 12.0]) {
    if (time <= duration) {
      await page.evaluate((t) => {
        const v = document.getElementById('v');
        v.currentTime = t;
      }, time);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `screenshots/video1-t${time}.png` });
    }
  }

  await browser.close();
  server.close();
  console.log('Done');
});
