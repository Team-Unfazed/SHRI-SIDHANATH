import { chromium } from 'playwright';

const browser = await chromium.launch();

// Desktop view
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/?nomotion');
  await page.waitForTimeout(2000);

  const videoStats = await page.evaluate(() => {
    const v = document.querySelector('.banner__video');
    const cinemaBar = document.querySelector('.banner__cinema-bar');
    const signage = document.querySelector('.banner__building-signage');
    const pins = document.querySelector('.banner__skyline-pins');
    return {
      src: v?.src,
      loop: v?.loop,
      autoplay: v?.autoplay,
      muted: v?.muted,
      paused: v?.paused,
      hasCinemaBar: !!cinemaBar,
      hasSignage: !!signage,
      hasPins: !!pins
    };
  });
  console.log('Desktop video evaluation:', JSON.stringify(videoStats, null, 2));

  await page.screenshot({ path: 'screenshots/hero-clean-desktop.png' });
  console.log('Saved screenshots/hero-clean-desktop.png');
}

// Mobile view
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173/?nomotion');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/hero-clean-mobile.png' });
  console.log('Saved screenshots/hero-clean-mobile.png');
}

await browser.close();
console.log('Clean Hero verification completed successfully.');
