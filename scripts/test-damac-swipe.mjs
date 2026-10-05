import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:5173');
await page.waitForTimeout(1000);

const enterBtn = await page.$('.intro__btn');
if (enterBtn) {
  await enterBtn.click();
  await page.waitForTimeout(1500);
}

// 1. Initial position
const initialY = await page.evaluate(() => window.scrollY);
console.log('1. Initial scrollY (at Hero):', initialY);

// 2. Wheel down to slide to About
await page.mouse.wheel(0, 60);
await page.waitForTimeout(1000);

const slideDownY = await page.evaluate(() => window.scrollY);
console.log('2. After slide down to About:', slideDownY);

// 3. Wheel up to slide back to Hero
await page.mouse.wheel(0, -60);
await page.waitForTimeout(1000);

const slideUpY = await page.evaluate(() => window.scrollY);
console.log('3. After slide up back to Hero:', slideUpY);

await browser.close();
