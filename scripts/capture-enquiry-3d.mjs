import { chromium } from 'playwright';
import { preview } from 'vite';

const server = await preview({ preview: { port: 4173 } });
const url = 'http://localhost:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto(url, { waitUntil: 'networkidle' });

// Fast-skip intro
await page.waitForTimeout(400);
if (await page.locator('.intro__skip').isVisible()) {
  await page.locator('.intro__skip').click();
} else {
  await page.keyboard.press('Escape');
}

// Wait for modal to pop up after 3s
await page.locator('.enquiry-overlay[data-open="true"]').waitFor({ timeout: 9000 });
await page.waitForTimeout(800); // let GSAP 3D entrance finish

// Capture Form Screenshot
await page.screenshot({ path: 'screenshots/enquiry-modal-form.png' });
console.log('Saved screenshots/enquiry-modal-form.png');

// Fill details and submit
await page.locator('#enquiry-name').fill('Vikram Malhotra');
await page.locator('#enquiry-phone').fill('9820123456');
await page.locator('.enquiry-submit-btn').click();

// Wait for 3D tick animation
await page.locator('.enquiry-success-view').waitFor({ timeout: 4000 });
await page.waitForTimeout(1000); // let 3D tick flip & draw checkmark

// Capture Success State Screenshot
await page.screenshot({ path: 'screenshots/enquiry-modal-success.png' });
console.log('Saved screenshots/enquiry-modal-success.png');

await browser.close();
await server.close();
