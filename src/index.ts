import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';

import * as puppeteer from 'puppeteer';

export const sendEmail: HttpFunction = async (req, res) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 960,
    deviceScaleFactor: 1,
  });
  await page.goto(
    'https://www.google.com/maps/d/u/0/viewer?ie=UTF8&oe=UTF8&msa=0&mid=1tVDxFDX4mB3KrVz0LmEveKotOG8&ll=40.22862853228307%2C-74.38368600000001&z=13',
    {
      waitUntil: 'load',
      timeout: 60000,
    }
  );
  const selector =
    '#map-canvas > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3)';
  await page.waitForSelector(selector);
  const element = await page.$(selector);
  if (element) {
    const buffer = await element.screenshot();
    await browser.close();
    res.setHeader('Content-Type', 'image/png');
    if (Buffer.isBuffer(buffer)) {
      res.end(buffer);
    }
  }
};
