import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';
const server = await preview({ preview: { port: 4173 } });
const baseUrl = server.resolvedUrls.local[0];
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  let fail = false;
  let payload;
  let requests = 0;
  await page.route('**/rest/v1/website_enquiries', async route => {
    payload = route.request().postDataJSON();
    requests++;
    await route.fulfill({ status: fail ? 403 : 201, contentType: 'application/json', body: fail ? '{"message":"denied"}' : '' });
  });
  for (const [width, height] of [[1280,800],[390,844],[360,640],[320,568],[844,390]]) {
    await page.setViewportSize({width,height});
    await page.goto(baseUrl, {waitUntil:'domcontentloaded'});
    await page.locator('.enquiry-overlay[data-open="true"]').waitFor({timeout:10000});
    await page.waitForTimeout(700);
    const layout = await page.locator('.enquiry-modal').evaluate(el => {
      const r = el.getBoundingClientRect();
      return { scroll: el.scrollHeight > el.clientHeight + 1, left:r.left,right:r.right,bottom:r.bottom, top:r.top };
    });
    assert.equal(layout.scroll,false, 'Form has internal scroll');
    assert(layout.left >= 0 && layout.right <= width, 'Form exceeds width');
    if(height>=568) assert(layout.top>=0 && layout.bottom<=height, `Form exceeds height: ${JSON.stringify(layout)}`);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.enquiry-overlay').getAttribute('data-open'),'false');
    await page.locator('.enquiry-taskbar-dock').click();
    await page.waitForTimeout(700);
    await page.screenshot({path:`screenshots/enquiry-${width}x${height}.png`});
    console.log(`Layout passed ${width}x${height}`);
  }
  await page.setViewportSize({width:1280,height:800});
  await page.goto(`${baseUrl}?nomotion`);
  await page.locator('#enquiry-name').fill('Rohan Sharma');
  await page.locator('#enquiry-phone').fill('+91 98200 12345');
  await page.locator('#enquiry-req').fill('2 BHK near Panvel Station');
  fail = true;
  await page.locator('.enquiry-submit-btn').click();
  await page.locator('[role="alert"]').waitFor();
  assert.equal(await page.locator('.enquiry-success').count(),0);
  assert.equal(await page.locator('#enquiry-name').inputValue(),'Rohan Sharma');
  fail = false;
  await page.locator('.enquiry-submit-btn').click();
  await page.locator('.enquiry-success__title').waitFor();
  assert.deepEqual(payload,{full_name:'Rohan Sharma',phone:'+91 98200 12345',property_type:'Buy',message:'2 BHK near Panvel Station'});
  assert.equal(requests,2);
  assert.equal(await page.evaluate(()=>localStorage.getItem('sidhanath_enquiries')),null);
  await page.locator('.enquiry-dismiss-btn').click();
  await page.reload();
  await page.locator('.enquiry-overlay[data-open="true"]').waitFor({timeout:1500});
  console.log('Submission payload, failure/retry, success, dismissal, reload and responsive checks passed.');
} finally {
  await browser.close();
  await server.close();
}
