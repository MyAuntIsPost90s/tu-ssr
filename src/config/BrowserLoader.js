const puppeteer = require('puppeteer');

module.exports = async () => {
  return await puppeteer.launch({
    headless: true,
    args: [
      '--disable-features=site-per-process',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run'
    ]
  });
}