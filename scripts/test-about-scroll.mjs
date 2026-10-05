import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/?nomotion');
await page.waitForTimeout(1000);

// Scroll down directly to #about
await page.evaluate(() => {
  const el = document.getElementById('about');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
});

await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshots/about-live-photo-desktop.png' });
console.log('Saved about-live-photo-desktop.png');

// Mobile view
const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobilePage.goto('http://localhost:5173/?nomotion');
await mobilePage.waitForTimeout(1000);

await mobilePage.evaluate(() => {
  const el = document.getElementById('about');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
});
await mobilePage.waitForTimeout(1000);
await mobilePage.screenshot({ path: 'screenshots/about-live-photo-mobile.png' });
console.log('Saved about-live-photo-mobile.png');

await browser.close();
