const request = require('request');
const cache = require('memory-cache');

const ssr = async (req, res) => {
  if (/\.[a-zA-Z0-9]{1,}$/.test(req.path)) {
    request(global.properties.ssr['base-url'] + req.originalUrl).pipe(res);
    return;
  }
  let html = cache.get(req.originalUrl);
  if (!html) {
    const page = await global.browser.newPage();
    try {
      page.setRequestInterception(true);
      page.on('request', req => {
        const whitelist = ['document', 'script', 'xhr', 'fetch', 'preflight', 'stylesheet'];
        if (!whitelist.includes(req.resourceType())) {
          req.abort();
          return;
        }
        req.continue();
      });
      await page.goto(global.properties.ssr['base-url'] + req.originalUrl, { waitUntil: 'networkidle2' });
      html = await page.content();
      cache.put(req.originalUrl, html, global.properties.ssr['cache-time']);
    } finally {
      page.close();
    }
  }
  res.send(html);
}

module.exports = {
  ssr
}