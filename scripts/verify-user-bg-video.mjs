import { chromium } from 'playwright';

const browser = await chromium.launch();

// Desktop view
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/?nomotion');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'screenshots/hero-user-video-desktop.png' });
  console.log('Saved hero-user-video-desktop.png');
}

// Mobile view
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173/?nomotion');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'screenshots/hero-user-video-mobile.png' });
  console.log('Saved hero-user-video-mobile.png');
}

await browser.close();
