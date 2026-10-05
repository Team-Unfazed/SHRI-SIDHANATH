import { chromium } from 'playwright';

async function testMode(name, contextOptions = {}) {
  const browser = await chromium.launch();
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  console.log(`\n--- TESTING: ${name} ---`);
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(4000);

  const stats = await page.evaluate(async () => {
    const v = document.querySelector('.banner__video');
    if (!v) return { exists: false };
    const t1 = v.currentTime;
    await new Promise(r => setTimeout(r, 1000));
    const t2 = v.currentTime;
    return {
      exists: true,
      paused: v.paused,
      muted: v.muted,
      defaultMuted: v.defaultMuted,
      currentTimeT1: t1,
      currentTimeT2: t2,
      isAdvancing: t2 > t1,
      currentSrc: v.currentSrc,
      readyState: v.readyState,
      videoWidth: v.videoWidth,
      videoHeight: v.videoHeight
    };
  });

  console.log(`${name} results:`, JSON.stringify(stats, null, 2));
  await browser.close();
  return stats;
}

async function run() {
  const standard = await testMode('Standard Mode', { viewport: { width: 1440, height: 900 } });
  const reducedMotion = await testMode('Reduced Motion Mode (Windows default/toggled)', {
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  const mobile = await testMode('Mobile Viewport (iPhone)', {
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });

  console.log('\n================================');
  console.log('SUMMARY:');
  console.log('Standard advancing:', standard.isAdvancing, 'paused:', standard.paused);
  console.log('Reduced motion advancing:', reducedMotion.isAdvancing, 'paused:', reducedMotion.paused);
  console.log('Mobile advancing:', mobile.isAdvancing, 'paused:', mobile.paused);
  console.log('================================\n');
}

run().catch(console.error);
