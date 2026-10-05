import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const url = process.argv[2] || 'http://127.0.0.1:5187/showcase.html';
const browser = await chromium.launch();
fs.mkdirSync('screenshots', { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
  const state = () => page.locator('.showcase').getAttribute('data-page');
  const settle = () => page.waitForFunction(() => document.querySelector('.showcase').dataset.moving === 'false');
  assert.equal(await page.locator('.showcase__panel').count(), 4);
  assert.equal(await state(), '1');
  await page.screenshot({ path: 'screenshots/showcase-desktop-1.png' });
  await page.mouse.move(650, 420);
  await page.mouse.wheel(0, 2);
  await page.waitForTimeout(350);
  const mid = await page.locator('#residences').evaluate(el => el.getBoundingClientRect().top);
  assert(mid > 0 && mid < 900, 'the next screen must visibly animate into place');
  await settle();
  assert.equal(await state(), '2');
  assert(Math.abs(await page.locator('#residences').evaluate(el => el.getBoundingClientRect().top)) < 1);
  assert(await page.locator('video').evaluate(el => el.paused), 'offscreen video must pause');
  await page.screenshot({ path: 'screenshots/showcase-desktop-2.png' });
  for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 8); await page.waitForTimeout(40); }
  await settle();
  assert.equal(await state(), '3', 'one long trackpad gesture must advance only one screen');
  await page.waitForTimeout(350);
  await page.screenshot({ path: 'screenshots/showcase-desktop-3.png' });
  await page.mouse.wheel(0, -60);
  await settle();
  assert.equal(await state(), '2', 'upward wheel must return one screen');
  await page.waitForTimeout(350);
  await page.keyboard.press('End');
  await settle();
  assert.equal(await state(), '4');
  await page.screenshot({ path: 'screenshots/showcase-desktop-4.png' });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: /A new perspective/ }).click();
  await settle();
  assert.equal(await state(), '1');
  assert.equal(await page.getByRole('dialog').count(), 0);
  await page.getByRole('button', { name: 'Pause backgrounds' }).click();
  assert(await page.locator('video').evaluate(el => el.paused));
  await page.getByRole('button', { name: 'Play backgrounds' }).click();
  await page.waitForTimeout(500);
  assert(await page.locator('video').evaluate(el => !el.paused && el.currentTime > 0));
  await page.keyboard.press('End');
  await settle();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  assert.equal(await state(), '4', 'motion preference changes must preserve the active chapter');
  assert.equal(await page.locator('.showcase__panel.is-active img').evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
  assert.equal(await page.evaluate(() => scrollY), 0);
  assert.deepEqual(errors, []);
  console.log('PASS desktop four-screen layout, tiny wheel input, smooth movement, momentum, reverse, keyboard, menu, video controls');
  await page.close();

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
  const mobile = await context.newPage();
  await mobile.goto(url);
  await mobile.waitForTimeout(1400);
  const cdp = await context.newCDPSession(mobile);
  const swipe = async (from, to) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 170, y: from }] });
    for (let i = 1; i <= 6; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 170, y: from + (to - from) * i / 6 }] });
      await mobile.waitForTimeout(30);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await mobile.waitForFunction(() => document.querySelector('.showcase').dataset.moving === 'false');
  };
  for (let i = 1; i <= 4; i++) {
    assert.equal(await mobile.locator('.showcase').getAttribute('data-page'), String(i));
    await mobile.waitForTimeout(200);
    await mobile.screenshot({ path: `screenshots/showcase-mobile-${i}.png` });
    assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const fits = await mobile.locator('.showcase__panel.is-active .showcase__content').evaluate(el => {
      const box = el.getBoundingClientRect();
      const top = document.querySelector('.showcase__header').getBoundingClientRect().bottom;
      const bottom = document.querySelector('.showcase__footer').getBoundingClientRect().top;
      return box.top >= top && box.bottom <= bottom;
    });
    assert(fits, `mobile screen ${i} content must fit between header and footer`);
    if (i < 4) await swipe(550, 330);
  }
  await swipe(330, 550);
  assert.equal(await mobile.locator('.showcase').getAttribute('data-page'), '3');
  await mobile.setViewportSize({ width: 844, height: 390 });
  await mobile.waitForTimeout(300);
  assert(Math.abs(await mobile.locator('#living').evaluate(el => el.getBoundingClientRect().top)) < 1, 'resize must retain the active screen');
  await mobile.screenshot({ path: 'screenshots/showcase-mobile-landscape.png' });
  await mobile.setViewportSize({ width: 568, height: 320 });
  await mobile.waitForTimeout(300);
  assert(await mobile.locator('.showcase__panel.is-active .showcase__content').evaluate(el => {
    const box = el.getBoundingClientRect();
    return box.top >= 56 && box.bottom < 268;
  }), 'short landscape viewport must keep content clear of navigation');
  await mobile.screenshot({ path: 'screenshots/showcase-small-landscape.png' });
  console.log('PASS real mobile touch gestures in both directions, four layouts, no horizontal overflow, orientation change');
  await context.close();
} finally { await browser.close(); }
