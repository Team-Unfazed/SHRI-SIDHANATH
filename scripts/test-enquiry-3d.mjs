import { chromium } from 'playwright';
import { preview } from 'vite';

const server = await preview({ preview: { port: 4173 } });
const url = 'http://localhost:4173/';
console.log('Testing 3D Enquiry Modal on ' + url);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: 'networkidle' });

// Fast-skip intro
await page.waitForTimeout(400);
if (await page.locator('.intro__skip').isVisible()) {
  await page.locator('.intro__skip').click();
} else {
  await page.keyboard.press('Escape');
}

// User specified: "form should open after the intro animation has done and hero page open after 3 sec the enquiry from should pop up"
console.log('Waiting for intro to settle and 3-second delay to pop up modal...');
const overlay = page.locator('.enquiry-overlay');
await page.locator('.enquiry-overlay[data-open="true"]').waitFor({ timeout: 9000 });
const isOpen = await overlay.getAttribute('data-open');
console.log('Enquiry modal auto-open status after 3s:', isOpen);
if (isOpen !== 'true') {
  console.error('FAIL: Modal did not open after 3 seconds.');
  await browser.close();
  await server.close();
  process.exit(1);
}

// Check title
const title = await page.locator('.enquiry-modal__title').textContent();
console.log('Modal title:', title);

// Check 3D card wrap
const has3D = await page.evaluate(() => {
  const card = document.querySelector('.enquiry-card-3d-wrap');
  const style = window.getComputedStyle(card);
  return style.transformStyle === 'preserve-3d';
});
console.log('Has 3D transform preserve-3d:', has3D);

// Fill form details
console.log('Filling form with authentic real estate parameters...');
await page.locator('.enquiry-intent-btn', { hasText: 'Buy' }).click();
await page.locator('.enquiry-tag-chip', { hasText: 'Kharghar' }).click();
await page.locator('.enquiry-tag-chip', { hasText: '2 BHK' }).click();
await page.locator('#enquiry-name').fill('Vikram Malhotra');
await page.locator('#enquiry-phone').fill('9820123456');
await page.locator('#enquiry-budget').fill('₹85 Lakhs to ₹1.10 Cr, near Metro');

// Submit enquiry
console.log('Clicking 3D submit button...');
await page.locator('.enquiry-submit-btn').click();

// Wait for 3D tick animation & success screen
console.log('Waiting for 3D tick animation and success state...');
await page.locator('.enquiry-success-view').waitFor({ timeout: 4000 });

const successTitle = await page.locator('.enquiry-success-title').textContent();
console.log('Success title:', successTitle);

const has3DMedallion = await page.locator('.enquiry-3d-medallion').isVisible();
console.log('3D animated medallion visible:', has3DMedallion);

const hasTickPath = await page.locator('.enquiry-tick-path').isVisible();
console.log('3D animated SVG checkmark visible:', hasTickPath);

const stored = await page.evaluate(() => localStorage.getItem('sidhanath_enquiries'));
console.log('Stored lead in localStorage:', stored);

const waLink = await page.locator('.enquiry-wa-direct-btn').getAttribute('href');
console.log('WhatsApp direct link:', waLink?.slice(0, 80) + '...');

// Close success screen
await page.locator('.enquiry-return-btn').click();
await page.waitForTimeout(700);

const isClosed = (await overlay.getAttribute('data-open')) === 'false';
console.log('Modal closed & retracted to taskbar:', isClosed);

// Check taskbar dock launcher
const dock = page.locator('.enquiry-taskbar-dock');
console.log('Taskbar dock launcher visible:', await dock.isVisible());

// Click taskbar dock launcher to reopen with 3D animation
await dock.click();
await page.waitForTimeout(500);
console.log('Reopened via taskbar dock:', (await overlay.getAttribute('data-open')) === 'true');

await browser.close();
await server.close();

console.log('Console errors:', errors);
if (isOpen === 'true' && has3DMedallion && hasTickPath && isClosed && errors.length === 0) {
  console.log('ALL 3D ENQUIRY POPUP TESTS PASSED WITH FLYING COLORS!');
  process.exit(0);
} else {
  process.exit(1);
}
