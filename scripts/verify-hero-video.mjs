import { chromium } from 'playwright';

const browser = await chromium.launch();

// 1. Desktop viewport (1440x900)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/?nomotion');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/hero-real-estate-clip0-desktop.png' });
  console.log('Saved hero-real-estate-clip0-desktop.png');

  // Switch to clip 1
  await page.evaluate(() => {
    const v1 = document.querySelector('.banner__video--0');
    if (v1) v1.dispatchEvent(new Event('ended'));
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/hero-real-estate-clip1-desktop.png' });
  console.log('Saved hero-real-estate-clip1-desktop.png');
}

// 2. Mobile viewport (390x844 - iPhone)
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173/?nomotion');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/hero-real-estate-mobile.png' });
  console.log('Saved hero-real-estate-mobile.png');
}

await browser.close();
