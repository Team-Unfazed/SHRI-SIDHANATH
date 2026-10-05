import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://localhost:5173/?nomotion');
await page.waitForTimeout(1500);

const aboutEl = await page.locator('#about');
if (await aboutEl.count()) {
  await aboutEl.screenshot({ path: 'screenshots/current-about.png' });
  console.log('Saved current-about.png');
}

const dockBtn = await page.locator('.enquiry-taskbar-dock');
if (await dockBtn.count()) {
  await dockBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/current-modal.png' });
  console.log('Saved current-modal.png');
}

await browser.close();
