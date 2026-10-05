import { chromium } from 'playwright';
import { createServer } from 'vite';
import { writeFile } from 'node:fs/promises';

const server = await createServer({ configFile: false, server: { host: '127.0.0.1', port: 5190 } });
await server.listen();
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #000; overflow: hidden; }
        canvas { width: 100vw; height: 100vh; object-fit: cover; }
      </style>
    </head>
    <body>
      <canvas id="c" width="3840" height="2160"></canvas>
      <video id="v1" src="/public/videos/hero-real-estate-1.mp4" muted playsinline></video>
      <video id="v2" src="/public/videos/hero-real-estate-2.mp4" muted playsinline></video>
    </body>
    </html>
  `);

  await page.goto(`${server.resolvedUrls.local[0]}`);
  
  // Test loading and seeking to 3 seconds
  const result = await page.evaluate(async () => {
    const v1 = document.createElement('video');
    v1.src = '/public/videos/hero-real-estate-1.mp4';
    await new Promise(r => v1.onloadeddata = r);
    v1.currentTime = 3.0;
    await new Promise(r => v1.onseeked = r);

    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(v1, 0, 0, 3840, 2160);

    // Draw architectural "Shri Sidhanath" illuminated crown signage on top of the central skyscraper
    // In hero-real-estate-1, the central white skyscraper is at ~x: 1300 to 1700, y: 700 to 1100
    ctx.save();
    
    // Signage backplate (architectural dark bronze plaque)
    ctx.fillStyle = 'rgba(18, 20, 22, 0.92)';
    ctx.strokeStyle = '#c6ad75';
    ctx.lineWidth = 6;
    
    // Rounded building crown plaque
    const px = 1320, py = 760, pw = 480, ph = 70;
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeRect(px, py, pw, ph);
    
    // Signage text
    ctx.fillStyle = '#fbf0d9';
    ctx.shadowColor = '#e4ed64';
    ctx.shadowBlur = 18;
    ctx.font = '600 38px "Archivo", "Helvetica Neue", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('SHRI SIDHANATH', px + pw / 2, py + ph / 2);
    
    ctx.restore();

    return canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
  });

  await writeFile('screenshots/test-composite-frame.jpg', Buffer.from(result, 'base64'));
  console.log('Saved screenshots/test-composite-frame.jpg');
} finally {
  await browser.close();
  await server.close();
}
